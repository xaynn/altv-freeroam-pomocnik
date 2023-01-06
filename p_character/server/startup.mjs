
import alt from 'alt-server';
import * as chat from 'chat';
import db from '../../p_db/server/db.mjs'

alt.on('character:Edit', handleCharacterEdit);
alt.on('character:Sync', handleCharacterSync);
alt.onClient('character:Done', handleDone);
alt.onClient(`character:AwaitModel`, handleAwaitModel);


function SendNotificationToPlayer(forwho, text ){
    const info = text
	chat.send(forwho, `{FFFFFF}${info}`);
}


function handleCharacterEdit(player, oldData = null) {
    if (!player || !player.valid) {
        return;
    }

    player.setSyncedMeta('creatingCharacter', true)
    
   // alt.log('try to send event ac')

    alt.emitClient(player, 'character:Edit', oldData);
}

function handleAwaitModel(player, characterSex) {
    player.model = characterSex === 0 ? 'mp_f_freemode_01' : 'mp_m_freemode_01';
    alt.emitClient(player, `character:FinishSync`);
}

function handleCharacterSync(player, data) {
    if (!player || !player.valid) {
        return;
    }

    alt.emitClient(player, 'p_ac->globaldisabled', true);

    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch(err) {
            throw new Error(`[Character Editor] Failed to sync character. Character data format is not object or JSON string.`);
        }
    }

    if (data.sex === 0) {
        player.model = 'mp_f_freemode_01';
    } else {
        player.model = 'mp_m_freemode_01';
    }

    alt.emitClient(player, 'character:Sync', data);
    player.health = 175
    const x = alt.setTimeout(() => {
        alt.emitClient(player, 'p_ac->globaldisabled', false);

    }, 5000);


}

function handleDone(player, newData) {
    alt.emit('character:Done', player, newData);
    //alt.log(newData)
    player.deleteSyncedMeta('creatingCharacter');
    player.setMeta('LastCharData', newData)
    player.health = 175

    alt.emitClient(player, 'p_ac->globaldisabled', false);

}


chat.registerCmd('savechar', (player, args) => {
   let char = player.getMeta('LastCharData')
   if (!char){
        SendNotificationToPlayer(player,'Nie posiadasz zadnej utworzonej postaci, stworz ja pod /character')
       return;
   }
    let guid = player.getMeta('GUID')
    let converted = JSON.stringify(char)
   let isPlayerVip = player.getMeta('premium')
   let value
   if (isPlayerVip){
      value = getLimitChars(1)
   }else{
      value = getLimitChars(2)
   }
    
    db.query('SELECT * FROM characters WHERE guid = ?', [guid], function(error, res) { 
        if (res.length >= value) {
            SendNotificationToPlayer(player,`Posiadasz juz zapisane ${value} postaci/e, nie mozesz zapisac wiecej.`)
        }else{
            db.query('INSERT INTO characters SET guid = ?, appearance = ?', [guid, converted], function(error, res) { 

               SendNotificationToPlayer(player,'Zapisano postac.')
            });
        }
    });
 
});
let charLimit 
function getLimitChars(isVip){
    switch(isVip) {
        case 1: //vip
        charLimit = 60
          break;
        case 2:
        charLimit = 1
        default: 

      }
      return charLimit
}


chat.registerCmd('mychars', (player, args) => {

     let guid = player.getMeta('GUID')




     
    
     db.query('SELECT * FROM characters WHERE guid = ?', [guid], function(error, res) { 
         if (res.length == 0){
          SendNotificationToPlayer(player,'Nie posiadasz zadnej postaci przypisanej do konta.')   
            return
         }
        // alt.log(res)
         SendNotificationToPlayer(player,'Twoje ID postaci:')
        res.forEach(el => {
            SendNotificationToPlayer(player,el.id)
            });


     });
 });

chat.registerCmd('loadchar', (player, args) => {
    if (!args[0]){
        SendNotificationToPlayer(player,'Wybierz ubranie które chcesz mieć ID(jeżeli posiadasz).')
        return;
    }
    let charselect = parseInt(args[0])
     let guid = player.getMeta('GUID')
 
     db.query('SELECT * FROM characters WHERE guid = ? AND id = ?', [guid, charselect], function(error, res) { 
        if (res.length <= 0) {
            SendNotificationToPlayer(player,'Nie posiadasz zadnej postaci o tym ID.')
            return;
        }
         let char = res[0].appearance
    

         //console.log(char)
         //console.log('znaleziono')
         alt.emit('character:Edit', player, JSON.parse(char));

     });
 });