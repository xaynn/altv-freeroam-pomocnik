/*
 * © 2021 - 2021 Alec S. - DerEchteAlec - All Rights Reserved.
 * Last Updated : 01/06/2021 22:00:00
 */

import alt from 'alt-server';
import db from '../p_db/server/db.mjs'
import * as chat from 'chat';



alt.log("============================================================================");
alt.log("                            Better Clothing Menu                            ");
alt.log("        © 2021 - 2021 Alec S. - DerEchteAlec - All Rights Reserved.         ")
alt.log("============================================================================");
function SendNotificationToPlayer(forwho, text ){
    const info = text
	chat.send(forwho, `{FFFFFF}${info}`);
}



alt.onClient('getClothesAndSaveToDb', (player, clothes) => {
     let guid = player.getMeta('GUID')
    let isPlayerVip = player.getMeta('premium')
    let value
    if (isPlayerVip){
       value = getLimitClothes(1)
    }else{
       value = getLimitClothes(2)
    }
     
     db.query('SELECT * FROM clothes WHERE guid = ?', [guid], function(error, res) { 
         if (res.length >= value) {
             chat.send(player,`Posiadasz juz zapisane ${value} ciuchow, nie mozesz zapisac wiecej.`)
            // SendNotificationToPlayer(player,`Posiadasz juz zapisane ${value} ciuchy, nie mozesz zapisac wiecej.`)
         }else{
            db.query('INSERT INTO clothes SET guid = ?, clothes = ?', [guid, clothes], function(error, res) { 
                console.log(error)
                console.log(res)
               chat.send(player,'Zapisano ubrania do bazy danych.')
                //console.log('zapisano ubrania')
            });
         }
     });
   
});







 let clothesLimit 
 function getLimitClothes(isVip){
     switch(isVip) {
         case 1: //vip
         clothesLimit = 60
           break;
         case 2:
         clothesLimit = 1
         default: 
 
       }
       return clothesLimit
 }



 chat.registerCmd('myclothes', (player, args) => {

    let guid = player.getMeta('GUID')

   
    db.query('SELECT * FROM clothes WHERE guid = ?', [guid], function(error, res) { 
        if (res.length == 0){
         chat.send(player,'Nie posiadasz zadnych ubran przypisanych do konta.')   
           return;
        }

        chat.send(player,'Twoje ID ciuchow:')
        res.forEach(element => {
            //alt.log(element.id)
            SendNotificationToPlayer(player,element.id)
            });
    });
});

chat.registerCmd('loadclothes', (player, args) => {
   if (!args[0]){
       chat.send(player,'Wybierz ubranie które chcesz mieć ID(jeżeli posiadasz).')
       return;
   }
   let charselect = parseInt(args[0])
    let guid = player.getMeta('GUID')

    db.query('SELECT * FROM clothes WHERE guid = ? AND id = ?', [guid, charselect], function(error, res) { 
       if (res.length <= 0) {
           chat.send(player,'Nie posiadasz zadnych ciuchow o tym ID.')
           return;
       }
        let cloth = res[0].clothes
   

        alt.emitClient(player, 'setCharClothes', cloth);

    });
});