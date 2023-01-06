import * as alt from 'alt';
import * as native from 'natives';
import * as game from "natives";
const localPlayer = alt.Player.local.scriptID

let recoils = [];
recoils.push(3173288789,125959754,317205821,1649403952,4019527611,-879347409,3249783761,3675956304,1834241177,3696079510,171789620,1198879012,1672152130,1785463520,3342088282,984333226,2828843422,137902532,-2066285827,2132975508,3523564046,-1768145561,3231910285,1627465347,3218215474,1119849093,1752584910,2982836145,1305664598,2726580491,856002082,177293209,205991906,100416529,911657153,2640438543,3800352039,2017895192,1432025498,487013001,453432689,3219281620,1593441988,584646201,2578377531,324215364,736523883,2024373456,4024951519,3220176749,961495388,2210333304,4208062921,2937143193,2634544996,2144741730,3686625920); 









//console.log(recoils[1])
let p
const recoil = alt.everyTick(() => {
    let shoot = native.isPedShooting(alt.Player.local.scriptID)
    let driveby = native.isPedDoingDriveby(alt.Player.local.scriptID)
    let weapon = native.getCurrentPedWeapon(alt.Player.local.scriptID, true)
    //(fruits.includes("Banana"));    if (SerialBan.includes(socialconverted) || (SerialBan.includes(hwid))){

    //if (recoils.includes(weapon[1]))
    if (weapon)
    //console.log(weapon) 
    if (shoot && driveby) {
      
        p = native.getGameplayCamRelativePitch()
        native.setGameplayCamRelativePitch(p+3.5, 0.5)
    }else{
    if (shoot) {
        p = native.getGameplayCamRelativePitch()
        native.setGameplayCamRelativePitch(p+1.2, 0.2)
    }
    }


});
