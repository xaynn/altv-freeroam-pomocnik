import * as alt from 'alt';
import * as chat from 'chat';
import mysql from 'mysql'
import dotenv from 'dotenv';
import colors from 'colors'
import sjcl from 'sjcl'
import * as p_adminutils from 'p_adminutils'
import db from '../../p_db/server/db.mjs'
import * as p_core from 'p_core'


var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;


var SerialBan = [];

function SerialBans(){
    db.query("SELECT * FROM serialbans", [], function(error, res) {
        if (res.length <= 0) {
            alt.log('[BANS] Nie ma zadnych banow na serial.'.green)
            return;
        }

        res.forEach(el => {
        SerialBan.push(el.socialclub)
       SerialBan.push(el.hwid)
        });
       //erialBan.push(res.socialclub)
       //SerialBan.push(res.hwid)
       //console.log(SerialBan)
        


    });
}
SerialBans()

const RefreshArray = alt.setInterval(() => {
  
    alt.log('[BANS] Zrefreshowano tabele z manualnymi banami.'.red)
    SerialBan = []
    SerialBans()
    
    }, 8640000);




chat.registerCmd('refreshbanlist', (player) => {
    if (!p_adminutils.getAllPrivilligedGuys(player))
        return p_core.SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand)

    p_core.SendNotificationToPlayer(player,'Zrefreshowales ban liste.')
    SerialBan = []
    SerialBans()

});


chat.registerCmd('unbanmanual', (player, args) => {
    if (!p_adminutils.isAdmin(player))
        return p_core.SendNotificationToPlayer(player, YouDontHavePermissionsForThisCommand)
        if (!args[0] || isNaN(args[0])){
            return p_core.SendNotificationToPlayer(player,'TIP: /unbanmanual socialclubid')
        }
        let social = args[0]
        let socialconverted = parseInt(social, 10);

        db.query('DELETE FROM serialbans WHERE socialclub = ?', [socialconverted], function(error, res) {
          //console.log(res)

          if (res.affectedRows === 0){
            p_core.SendNotificationToPlayer(player,'Nie znaleziono bana o podanym socialclubie.')
            return;
          }
          
          p_core.SendNotificationToPlayer(player,'Ban zostal usuniety.')
        });
        

            
        
});

export function msToTime(ms) {
    var d = new Date(null)
    d.setMilliseconds(ms)
    return d.toLocaleTimeString("pl-PL")
}


alt.on("playerConnect", (player) => {
    let social = player.socialID
    if (social == '0') {
        player.kick('Nie odnaleziono socialcluba, grasz na trybie offline?')
        return;
   }
    let socialconverted = parseInt(social, 10);
    let hwid = player.hwidExHash;
    if (SerialBan.includes(socialconverted) || (SerialBan.includes(hwid))){
alt.emitClient(player, "Banned:Notification",'', 'Twoj serial jest zbanowany', '');
return;

    }
    alt.emitClient(player, "p->accounts:ShowPanel");
});

function testquery(pass){
    db.query("SELECT * FROM accounts WHERE login = ?", [`babahasan`], function(error, res) {
        if (res.length <= 0) {
            console.log('blad')
            return;
        }
        let haslo = 'babahasanm'
        let Check = verifyPassword(haslo, res[0].password)
        if (Check) return console.log('hurra dziala')
        if (error) throw error;
        //console.log(res);
        alt.log(res[0].socialclub);
        alt.log(res[0].password);


    });

}
//testquery()

export function hashPassword(password) {
    const saltBits = sjcl.random.randomWords(2, 0);
    const salt = sjcl.codec.base64.fromBits(saltBits);
    const key = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(password, saltBits, 2000, 256));
    return `${key}$${salt}`;
}

export function verifyPassword(password, storedPasswordHash) {
    const [_key, _salt] = storedPasswordHash.split('$');
    const saltBits = sjcl.codec.base64.toBits(_salt);
    const derivedKey = sjcl.misc.pbkdf2(password, saltBits, 2000, 256);
    const derivedBaseKey = sjcl.codec.base64.fromBits(derivedKey);

    if (_key != derivedBaseKey) {
        return false;
    }

    return true;
}

//let haselko = hashPassword("pizda")
//console.log(haselko)
//@login

alt.onClient("server:auth:validate:data", (player, account_name, account_password) => {
    
    db.query("SELECT * FROM accounts WHERE login = ?", [account_name], function(error, res) {
        if (res.length <= 0) {
            alt.emitClient(player, "client:notification:show", "Nie istnieje takie konto!", true, 162);
            return;
        }


        if (!verifyPassword(account_password, res[0].password)) {
            alt.emitClient(player, "client:notification:show", `Zle haslo!`, false, 121);
            return;
        }

        if (res[0].b_timestamp > Date.now()) {
            const msToTimee = msToTime(res[0].b_timestamp);
            const banTime = (new Date(res[0].b_timestamp * 1)).toLocaleDateString();
            alt.emitClient(player, "client:notification:show", `Zostales zbanowany na serwerze z powodem ${res[0].b_reason}, do ${banTime} | ${msToTimee}`, false, 121);
            return;
        }


        if (res[0].socialclub != player.socialID || res[0].hwid != player.hwidExHash){
            alt.emitClient(player, "client:notification:show", `Nie zgadza sie serial lub socialclub podany do konta, zglos to adminowi.`, false, 121);
            return;
        }
//});
        //if (res.length <= 0) return alt.emitClient(player, "client:notification:show", `Error`, false, 121);
        //if (!verifyPassword(account_password, res[0].password)) return alt.emitClient(player, "client:notification:show", `Zle`, false, 121);
       // if (!res.length) return alt.emitClient(player, "client:notification:show", `Error`, false, 121);
       //let pass =  res[0].password
      //  alt.log(pass);
        if (res[0].p_timestamp > Date.now()) {
            const msx = msToTime(res[0].p_timestamp);
            const mstime = (new Date(res[0].p_timestamp * 1)).toLocaleDateString();
            player.setMeta('premium', true)
            player.setSyncedMeta('goldnickname', true)
            chat.send(player, `{d63e36}Dziekujemy za wsparcie serwera! posiadasz range premium do ${msx} | ${mstime}`);
        }
            if (res[0].adminlevel != 0) {
            player.setMeta('adminlevel', res[0].adminlevel)
            }
            let getTitleAdmin = p_adminutils.getTitleAdmin(player)
            alt.emitClient(player, "client:auth:success");
            player.setSyncedMeta('NAME', account_name); 
            alt.emit('nametags:Config', player, true, false, true, 25);
            alt.emitClient(player, "client:notification:show", `Posiadasz range ${getTitleAdmin}`, false, 121);
            chat.send(player, `Witamy na serwerze ${account_name} (UID: ${res[0].id}).`);
            player.setMeta('GUID', res[0].id)
            player.setSyncedMeta('globalName',res[0].login)



        
            
            
        
        
    });
});

//@register
alt.onClient("server:auth:register:data", (player, account_name, account_password) => {



    if (format.test(account_name)){
        alt.emitClient(player, "client:notification:show", "W loginie sa podane nieprawidlowe znaki, nie uzywaj znakow specjalnych.", true, 50);
        return;
    }
    if (!account_name || !account_password){
        alt.emitClient(player, "client:notification:show", "Nie podales loginu do konta.", true, 60);
        return;
    }
    if (account_name.length >= 15){
        alt.emitClient(player, "client:notification:show", "Login do konta moze posiadac maksymalnie 15 znaków.", true, 10);
        return;
    }

    const hash = hashPassword(account_password)
    account_password = hash
    db.query("SELECT * FROM accounts WHERE login = ?", [account_name], function(error, res) {

        if (res.length > 0) {
            alt.emitClient(player, "client:notification:show", "Aktualnie znajduje sie konto z podanym loginem, zmien login.", true, 162);
        } else {
            db.query("INSERT INTO accounts SET login = ?, password = ?, socialclub = ?, hwid = ?, adminlevel = ?, p_timestamp = ?, b_timestamp = ?, b_reason = ?", [account_name, account_password, player.socialID, player.hwidExHash, 0, 0, 0, 0], function(error, res) { 
                //console.log(error)                   
                alt.emitClient(player, "client:notification:show", `Pomyslnie zarejestrowano!`, false, 121);
            });
        }
    });
});


//@account counter

function logAccountCount() {
    let ms = Date.now()
    db.query("SELECT * FROM accounts", [], function(error, res=[]) {
        if (error) {
            alt.log("[ERROR]".red + " Failed: " + "logAccountCount".gray);
        }
        if (res.length > 0) {
            var accountCounter = 0;
            res.forEach(() => {
                accountCounter += 1;
            });
            let ms2 = Date.now()
            let Time = ms2 - ms 
            alt.log("[DATABASE]".green + " Loaded Accounts: " + `${accountCounter}`.grey + ` in ${Time}ms`.yellow);
            
        
        }
    });
}

logAccountCount();

alt.log("[SERVER]".green + " Loaded: " + "authentication".green);

