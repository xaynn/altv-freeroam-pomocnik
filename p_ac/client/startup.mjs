
import * as alt from 'alt';
import * as native from 'natives';


function drawText(msg, x, y, scale, fontType, r, g, b, a, useOutline = true, useDropShadow = true, layer = 0) {
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);

    if (useOutline)
        native.setTextOutline();

    if (useDropShadow)
        native.setTextDropShadow();

    native.endTextCommandDisplayText(x, y, 0);
}

let globalDisabled = false
let hp = 200
let greenzone = false
let noclip = false


alt.onServer("p_ac->globaldisabled", (state) => {
   // alt.log('event?')
    globalDisabled = state
   // alt.log(globalDisabled)
    //alt.log(state)

});

alt.onServer("p_ac->greenzone", (state) => {
        greenzone = state

});
alt.onServer("p_ac->UpdateStatistic", (playerHP) => {
hp = playerHP

});

alt.onServer("p_ac->UpdateNoclip", (noclipAC) => {
noclip = noclipAC
});


const acTick = alt.everyTick(() => {
    //    
    if (globalDisabled == true){
        return;
    }


    //console.log(hp)
   // let xdddddd = native.isPedJumpingOutOfVehicle(alt.Player.local.scriptID)
         //  drawText(`skacze czy niez  auta ${xdddddd}`, 0.48, 0.90, 0.4, 4, 255, 255, 255, 255, true);


 if (native.isPedJumping(alt.Player.local.scriptID) && noclip == false && !native.isPedInAnyVehicle(alt.Player.local.scriptID, true) && !native.isPedJumpingOutOfVehicle(alt.Player.local.scriptID)){
     //while native.isPedJu
//petle while dodac przy skakaniu
    let first =  native.getEntityCoords(alt.Player.local.scriptID, true)
    const xjump = alt.setTimeout(() => {
        let second = native.getEntityCoords(alt.Player.local.scriptID, true)
        let jump = native.getDistanceBetweenCoords(first.x, first.y, first.z, second.x, second.y, second.z, true)
        if (jump > 10.0 ){
            alt.clearEveryTick(acTick)  
            alt.clearTimeout(xjump)
            alt.emitServer('p_ac->BanPlayerForCheating', 1314);    
           
     }
    }, 500);
    }
    let hpNative = native.getEntityHealth(alt.Player.local.scriptID)
    let xd = native.getPlayerInvincible(alt.Player.local.scriptID)
    if (!greenzone && xd) {
        alt.emitServer('p_ac->BanPlayerForCheating', 1313);
        alt.clearEveryTick(acTick);

    }


   // if (hp == 0 || hpNative == 0) {
    //    return;
  //  }
   // if (parseInt(hp, 16) !== parseInt(hpNative, 16)) {
    //    if (parseInt(hp, 16) > parseInt(hpNative, 16) + 1 || parseInt(hp, 16) > parseInt(hpNative, 16) - 1) {

    //        return;
    //    }

        //drawText(`Po chuj cheatujesz ${hp} ${hpNative}`, 0.48, 0.90, 0.4, 4, 255, 255, 255, 255, true);
      //  alt.emitServer('p_ac->BanPlayerForCheating', 1312);
      //  alt.clearEveryTick(acTick);


  //  }

});