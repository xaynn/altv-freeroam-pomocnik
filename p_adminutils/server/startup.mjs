import * as alt from 'alt';
import * as chat from 'chat';
import mysql from 'mysql'
import db from '../../p_db/server/db.mjs'
import webhook from "webhook-discord";

const logHook = new webhook.Webhook('yourwebhook');

export function addServerLog(name, title) {
  const message = new webhook.MessageBuilder()
    .setName(name)
    .setColor('#139927')
    .setTitle(title)
    .setTime()
  logHook.send(message);
}




//var db = require('../../p_accounts/server/startup');

//import * as p_core from 'p_core'

const red = "{FF0000}"
const green = "{00BE00}"
const ServerName = "[Pomocnik]"
const YouDontHavePermissionsForThisCommand = 'TIP: Nie posiadasz uprawnien do tej komendy.';
function SendNotificationToPlayer(forwho, text ){
    const info = text
	chat.send(forwho, `${red}${ServerName} {FFFFFF}${info}`);
}



export function getAllPrivilligedGuys(player) { // all adminlevels
    let adminlevel = player.getMeta('adminlevel')
    if (adminlevel)
        return true;
    else
        return false;
}


export function isHelper(player) { // 1-3 adminlevels
    let adminlevel = player.getMeta('adminlevel');
    if (adminlevel == 1)
        return true;
    else
        return false;
}

export function isAdmin(player) { // 2-4 adminlevels
    let adminlevel = player.getMeta('adminlevel');
    if (adminlevel == 2 || adminlevel == 3 || adminlevel == 4)
        return true;
    else
        return false;
}

export function isOwner(player) {
    let adminlevel = player.getMeta('adminlevel');
    if (adminlevel == 4)
        return true;
    else
        return false;
}

let done = 'brak';

export function getTitleAdmin(player) {
    let rank = player.getMeta('adminlevel');
    //console.log(rank);
    switch (rank) {
        case 1:
            done = "Support";
            return done;
        case 2:
            done = "Community Manager";
            return done;
        case 3:
            done = "Administrator";
            //console.log(done)
            return done;
        case 4:
            done = "Wlasciciel";
            return done;
        default:
            done = "Gracz"
            return done;
        //console.log("Nie posiada zadnej rangi.");
    }
    
}

let limitrank = 0;
export function getMaxBanTimesForRank(player) {
    let rank = player.getMeta('adminlevel')
    //console.log(rank)
    switch (rank) {
        case 1:
            //suppek
            limitrank = 32;
            return limitrank;
        case 2:
            //CM
            limitrank = 128;
            return limitrank;
        case 3:
            //Admin
            limitrank = 9999;
            return limitrank;
        case 4:
            //wlasciciel
            limitrank = 9999;
            return limitrank;
        default:
            return false;
        //console.log("Nie posiada zadnej rangi.");
    }
}

chat.registerCmd('kick', (player, args) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand);

    if (!args[0] || !args[1])
        return SendNotificationToPlayer(player, 'TIP: /kick [ID] [POWÓD].');

    if (isNaN(args[0]))
        return SendNotificationToPlayer(player, 'Nie podałeś ID!')

        const target = alt.Player.all.filter(p => p.name == args[0] || p.getSyncedMeta('ID') == parseInt(args[0]))
        //if (target[0] === player)
       // return SendNotificationToPlayer(player, "Nie mozesz skickować samego siebie!")

    if (!target || !target[0])
        return SendNotificationToPlayer(player, `Podany gracz nie istnieje!`);
    if (Array.isArray(target) && target.length >= 2)
		return SendNotificationToPlayer(player,`Za duzo graczy jest o podobnym nicku, podaj dokladniej.`);

  

    const whokickedyou = player.getSyncedMeta('globalName');
    let msg = args.slice(1).join(" ");
    //const uid = target.getMeta('GUID')

    target.forEach((gracz) => {
        //AddForPlayerPenalty(gracz.getMeta('GUID'), gracz.name, msg, 'KICK', 0, whokickedyou)


        gracz.kick(`Zostales wyrzucony przez ${whokickedyou} z powodem ${msg}. `);
        alt.log(`Gracz ${gracz.name} zostal wyrzucony przez ${whokickedyou} z powodem ${msg} przez ${whokickedyou}.`)
        addServerLog('KICK', `Gracz ${gracz.name} zostal wyrzucony przez  ${whokickedyou} z powodem ${msg}.`)

        
    });
});



chat.registerCmd('ban', (player, args) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand);

    if (!args[0] || !args[1] || !args[2])
        return SendNotificationToPlayer(player, 'TIP: /ban [ID] [GODZINY] [POWÓD].'); //arg 0 arg 1

    if (isNaN(args[1]))
        return SendNotificationToPlayer(player, 'TIP: Czas bana nie jest podany liczbowo.');

    let limit = getMaxBanTimesForRank(player);
    if (args[1] > limit)
        return SendNotificationToPlayer(player, `Nie możesz nadać bana dłuższego niż ${limit} godziny.`);

    //const target = alt.Player.all.filter(p => p.getSyncedMeta('ID') == parseInt(args[0]));
    const target = alt.Player.all.filter(p => p.name == args[0] || p.getSyncedMeta('ID') == parseInt(args[0]))

    if (!target || !target[0])
        return SendNotificationToPlayer(player, `Nie znaleziono gracza o podanym ID lub nicku!`);
    if (Array.isArray(target) && target.length >= 2)
		return SendNotificationToPlayer(player,`Za duzo graczy jest o podobnym nicku, podaj dokladniej.`);

    const whokickedyou = player.getSyncedMeta('globalName');
    const reason = args.slice(2).join(" ");

    const timeban = Date.now();
    const finaltimefromarg = args[1];
    const przeliczenie = args[1] * 3600000;
    const final = timeban + przeliczenie;
    let playerid 
    let GUID
    let playernickname
    target.forEach((player) => {
    playerid = player.getSyncedMeta('ID')
    GUID = player.getMeta('GUID')
    playernickname = player.getSyncedMeta('globalName')
    player.kick(`Zostales zbanowany \n Banujacy: ${whokickedyou}.\n Powod: ${reason} \n Na ${args[1]} godzin.`)
    })
    chat.send(null,`{d63e36} Gracz ${playernickname} zostal zbanowany z powodem ${reason} oraz na czas ${args[1]} godzin.`)
    addServerLog('BAN', `Gracz ${playernickname} zostal zbanowany przez ${whokickedyou} z powodem ${reason} oraz na czas ${args[1]} godzin.`)
    db.query("UPDATE accounts SET b_timestamp = ?, b_reason = ? WHERE id = ?", [final, reason + ` przez ${whokickedyou}`, GUID], function(error, res) {
        alt.log(`Konto o ID ${GUID} ${playernickname} zostalo zbanowane przez ${whokickedyou} na czas ${args[1]} godzin z powodem ${reason}.`)
    });
 

    });







    chat.registerCmd('unban', (player, args) => {
        if (!isAdmin(player))
            return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand);
    
        if (!args[0] || !args[1])
            return SendNotificationToPlayer(player, 'TIP: /unban [login] [POWÓD].');
    
        if (!args[0])
            return SendNotificationToPlayer(player, 'Nie podałeś loginu!')
            let loginplayer = args[0]
            const reason = args.slice(1).join(" ");

            db.query("UPDATE accounts SET b_timestamp = '0', b_reason = '0' WHERE login = ?", [loginplayer], function(error, res) {
            if (res.changedRows === 0) return SendNotificationToPlayer(player,'Nie znaleziono takiego loginu w bazie danych lub nie posiada bana.')

            alt.log(`Gracz o loginie ${loginplayer} zostal odbanowany przez ${player.getSyncedMeta('globalName')} z powodem ${reason}.`)
            SendNotificationToPlayer(player,`Pomyslnie odbanowano gracza ${loginplayer}.`)
            addServerLog('UNBAN', `Gracz o loginie ${loginplayer} zostal odbanowany przez ${player.getSyncedMeta('globalName')} z powodem ${reason}.`)

            });
        //if (target[0] === player)
           // return SendNotificationToPlayer(player, "Nie mozesz skickować samego siebie!")
    
        //if (!xd || !xd[0])
           // return SendNotificationToPlayer(player, `Podany login nie istnieje w bazie danych!`);

        

    });


    // komendy admina
chat.registerCmd('ac', (player, args) => {
    if (!getAllPrivilligedGuys(player)) 
    return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand);

    if (!args[0])
        return;

    let msg = args.join(' ');
    alt.Player.all.forEach(target => {
        let Admins = getAllPrivilligedGuys(target);

        if (Admins)
            chat.send(target, `{ff0000}(( AdminChat [${player.getSyncedMeta('ID')}] ${getTitleAdmin(player)} ${player.getSyncedMeta('globalName').replace('_', ' ')} : ${msg} ))`);
    });
    // logi
});

chat.registerCmd('sethp', (player, args) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand);

    if (!args[0])
        return SendNotificationToPlayer(player, 'TIP: /sethp [ID] [HP].');
        let admin = player.getSyncedMeta('globalName')
        const target = alt.Player.all.filter(p => p.name == args[0] || p.getSyncedMeta('ID') == parseInt(args[0]))

        if (!target || !target[0])
            return SendNotificationToPlayer(player, `Nie znaleziono gracza o podanym ID lub nicku!`);
        if (Array.isArray(target) && target.length >= 2)
            return SendNotificationToPlayer(player,`Za duzo graczy jest o podobnym nicku, podaj dokladniej.`);
            let amount = parseInt(args[1])
            amount += 100;

            if (args[1] > 100 || args[1] < 1) return SendNotificationToPlayer(player,`TIP: Podana wartość jest za niska lub za wysoka.`);

            //SendNotificationToPlayer(player,amount)
  alt.emitClient(target,'p_ac->UpdateStatistic', amount)

    target[0].health = amount   
    SendNotificationToPlayer(player,`Ustawiles graczowi ${target[0].name} ${args[1]} HP.`)
    SendNotificationToPlayer(target[0],`${admin} ustawil ci ${args[1]} HP.`)

});

chat.registerCmd('setpos', (player, args) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand);

    if (!args[0])
        return SendNotificationToPlayer(player, 'TIP: /setpos [X] [Y] [Z].');

    player.pos = { x: args[0], y: args[1], z: args[2] };
});


chat.registerCmd('invis', (player, args) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand);
        if (player.getSyncedMeta('invis')){
            player.deleteSyncedMeta('invis')
            player.visible = true;
        }else{
            player.setSyncedMeta('invis', true)
            player.visible = false;
        }
      // alt.emitClient(player, 'invis')


    
});

chat.registerCmd('tphere', (player, args) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand)

    if (!args || !args[0])
        return SendNotificationToPlayer(player, 'TIP: /tphere [ID/NICK].');

        const target = alt.Player.all.filter(p => p.name == args[0] || p.getSyncedMeta('ID') == parseInt(args[0]))
        if (!target || !target[0])
        return SendNotificationToPlayer(player, `Nie znaleziono gracza o podanym ID lub nicku!`);
    if (Array.isArray(target) && target.length >= 2)
        return SendNotificationToPlayer(player,`Za duzo graczy jest o podobnym nicku, podaj dokladniej.`);

    target[0].pos = player.pos;
    target[0].dimension = player.dimension;
    SendNotificationToPlayer(player, `Przeteleportowałeś gracza o ID ${args[0]} | ${target[0].name}.`);
    SendNotificationToPlayer(target[0], `Przeteleportował Ciebie ${getTitleAdmin(player)} ${player.getSyncedMeta('globalName')} do siebie.`);
});

chat.registerCmd('tp', (player, args) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand)

    if (!args || !args[0])
        return SendNotificationToPlayer(player, 'TIP: /tp [ID/NICK].');

        const target = alt.Player.all.filter(p => p.name == args[0] || p.getSyncedMeta('ID') == parseInt(args[0]))
        if (!target || !target[0])
        return SendNotificationToPlayer(player, `Nie znaleziono gracza o podanym ID lub nicku!`);
    if (Array.isArray(target) && target.length >= 2)
        return SendNotificationToPlayer(player,`Za duzo graczy jest o podobnym nicku, podaj dokladniej.`);

    player.pos = target[0].pos;
    player.dimension = target[0].dimension;
    SendNotificationToPlayer(player, `Przeteleportowałeś sie do gracza o ID ${args[0]} | ${target[0].name}.`)
    SendNotificationToPlayer(target[0], `Przeteleportował sie do ciebie ${getTitleAdmin(player)} ${player.getSyncedMeta('globalName')}.`)
});

chat.registerCmd('aduty', (player) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand)

    if (player.getSyncedMeta('Duty'))
        return alt.emitClient(player, 'AdminDutyState', true),
            //SendNotificationToPlayer(player, 'Wyszedles ze sluzby.'),
            SendMessageToAdmins(`${getTitleAdmin(player)} ${player.getSyncedMeta('globalName')} zszedł ze służby.`);

    let rank = getTitleAdmin(player);
    SendMessageToAdmins(`${getTitleAdmin(player)} ${player.getSyncedMeta('globalName')} wszedł na służbe.`);
    player.setSyncedMeta('Duty', rank)

    alt.emitClient(player, 'AdminDutyState', true)
    //SendNotificationToPlayer(player, 'Włączyłeś admin duty!');
});

chat.registerCmd('asay', (player, args) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand)
    if (!args[0])
        return SendNotificationToPlayer(player, `TIP: /asay [wiadomość].`);

    const x = args.join(' ');
    chat.send(null, `{c90606}${getTitleAdmin(player)} ${player.getSyncedMeta('globalName')} ${x}`);
    addServerLog(`ASAY - Ogłoszenie ${player.getSyncedMeta('globalName')}`,`${x}`)
});



chat.registerCmd('generatepass', (player, args) => {
    if (!getAllPrivilligedGuys(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand)
    if (!args[0])
        return SendNotificationToPlayer(player, `TIP: /generatepass pass`);
        let haslo = args[0]
       let huj = hashPassword(`${haslo}`)
       console.log(`Wygenerowane haslo: ${huj}`)
       SendNotificationToPlayer(player,`Wygenerowano haslo, jest podane w konsoli.`)
});



chat.registerCmd('givevip', (player, args) => {
    if (!isOwner(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand);


    if (!args[0] || isNaN(args[1]) ||  !args[1])
        return SendNotificationToPlayer(player, 'TIP: /givevip [login] [Czas w dniach, podaj liczbe].');

        let loginplayer = args[0]


        const now = Date.now();
        const przeliczenie = args[1] * 86400000;
        const final = now + przeliczenie;
        
        //console.log(timenow)
       // console.log(final)

        db.query("UPDATE accounts SET p_timestamp = ? WHERE login = ?", [final, loginplayer], function(error, res) {
        if (res.changedRows === 0) return SendNotificationToPlayer(player,'Nie znaleziono takiego loginu w bazie danych.')

        alt.log(`Gracz o loginie ${loginplayer} otrzymal VIPA od ${player.getSyncedMeta('globalName')} na czas ${args[1]} dni.`.yellow)
        SendNotificationToPlayer(player,`Pomyslnie nadano vipa graczowi ${loginplayer} na ${args[1]} dni.`)
        addServerLog('GIVERANK', `Gracz o loginie ${loginplayer} otrzymal VIPA od ${player.getSyncedMeta('globalName')} na czas ${args[1]} dni.`)

        });
    //if (target[0] === player)
       // return SendNotificationToPlayer(player, "Nie mozesz skickować samego siebie!")

    //if (!xd || !xd[0])
       // return SendNotificationToPlayer(player, `Podany login nie istnieje w bazie danych!`);

    

});


chat.registerCmd('giverank', (player, args) => {
    if (!isOwner(player))
        return SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand);


    if (!args[0] || isNaN(args[1]) ||  !args[1])
        return SendNotificationToPlayer(player, 'TIP: /giverank [login] [AdminLevel 1-4].');

        let loginplayer = args[0]
        let adminlevel = args[1]
        if (adminlevel > 4 || adminlevel < 1) return SendNotificationToPlayer(player,'Podany adminlevel jest za maly lub za duzy.')
        

        db.query("UPDATE accounts SET adminlevel = ? WHERE login = ?", [adminlevel, loginplayer], function(error, res) {
        if (res.changedRows === 0) return SendNotificationToPlayer(player,'Nie znaleziono takiego loginu w bazie danych lub posiada identyczna range.')

        alt.log(`Gracz o loginie ${loginplayer} otrzymal range od ${player.getSyncedMeta('globalName')}  adminlevel: ${args[1]}.`.red)
        SendNotificationToPlayer(player,`Pomyslnie nadales range ${loginplayer} nadajac mu  ${args[1]} AL.`)
        addServerLog('GIVERANK', `Gracz o loginie ${loginplayer} otrzymal range od ${player.getSyncedMeta('globalName')}  AL: ${adminlevel}.`)

        });

    

});





alt.onClient('DeleteDuty', (player) => {
    player.deleteSyncedMeta('Duty');
});

export function SendMessageToAdmins(text) {
    const textadmins = text;
    alt.Player.all.forEach(target => {
        let Admins = getAllPrivilligedGuys(target)

        if (Admins)
            chat.send(target, `{c90606}${textadmins}`);
    });
}


function CharacterCreator(player, args) {
    alt.emitClient(player, "p_ac->globaldisabled", true);

    alt.emitClient(player, 'character:Edit', player);

}


alt.on('character:Done', (player, data) => {
    alt.emit('character:Sync', player, data);
    player.pos = player.pos; // This is used to prevent interior bugs. May require a small delay.
    //console.log(data);
    player.setMeta('Character', data)

});



chat.registerCmd('character', CharacterCreator);

alt.onClient("NoClip:PlayerVisible", (player, bool) => {
    player.visible = !bool;
});

alt.onClient("p_ac->Noclip", (player,state) => {
    if (state){
        alt.emitClient(player,'p_ac->UpdateNoclip', true)
        SendNotificationToPlayer(player,'Włączyłeś noclipa.')
    }else{
        alt.emitClient(player,'p_ac->UpdateNoclip', false)

        SendNotificationToPlayer(player,'Wyłączyłeś noclipa.')

    }
});



