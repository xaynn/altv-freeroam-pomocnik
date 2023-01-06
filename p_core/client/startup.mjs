import * as alt from 'alt';
import * as native from 'natives';
import * as game from "natives";
var localPlayer = alt.Player.local.scriptID
var secondsBW = 5
var IntegerBW = 5


var PlayersPD = [];

let hasGodModeEnabled = true


native.setPedSuffersCriticalHits(alt.Player.local.scriptID, false);
native.setPedConfigFlag( localPlayer, 241, true );
native.setPedConfigFlag( localPlayer, 184, true );
native.setPedConfigFlag( localPlayer, 35, false );

native.startAudioScene( "FBI_HEIST_H5_MUTE_AMBIENCE_SCENE" );
native.cancelCurrentPoliceReport( );

native.clearAmbientZoneState( "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", true );
native.clearAmbientZoneState( "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", true );
native.clearAmbientZoneState( "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", true );


//@ts-ignore
native.setAmbientZoneState( 0, 0, 0 );
native.clearAmbientZoneState( "AZ_DISTANT_SASQUATCH", false );

native.setAudioFlag( "LoadMPData", true );
native.setAudioFlag( "DisableFlightMusic", true );
game.disableControlAction(0, 36, true);

alt.requestIpl('ex_dt1_02_office_02b');
alt.requestIpl('chop_props');
alt.requestIpl('FIBlobby');
alt.removeIpl('FIBlobbyfake');
alt.requestIpl('FBI_colPLUG');
alt.requestIpl('FBI_repair');
alt.requestIpl('v_tunnel_hole');
alt.requestIpl('TrevorsMP');
alt.requestIpl('TrevorsTrailer');
alt.requestIpl('TrevorsTrailerTidy');
alt.removeIpl('farm_burnt');
alt.removeIpl('farm_burnt_lod');
alt.removeIpl('farm_burnt_props');
alt.removeIpl('farmint_cap');
alt.removeIpl('farmint_cap_lod');
alt.requestIpl('farm');
alt.requestIpl('farmint');
alt.requestIpl('farm_lod');
alt.requestIpl('farm_props');
alt.requestIpl('facelobby');
alt.removeIpl('CS1_02_cf_offmission');
alt.requestIpl('CS1_02_cf_onmission1');
alt.requestIpl('CS1_02_cf_onmission2');
alt.requestIpl('CS1_02_cf_onmission3');
alt.requestIpl('CS1_02_cf_onmission4');
alt.requestIpl('v_rockclub');
alt.requestIpl('v_janitor');
alt.removeIpl('hei_bi_hw1_13_door');
alt.requestIpl('bkr_bi_hw1_13_int');
alt.requestIpl('ufo');
alt.requestIpl('ufo_lod');
alt.requestIpl('ufo_eye');
alt.removeIpl('v_carshowroom');
alt.removeIpl('shutter_open');
alt.removeIpl('shutter_closed');
alt.removeIpl('shr_int');
alt.requestIpl('csr_afterMission');
alt.requestIpl('v_carshowroom');
alt.requestIpl('shr_int');
alt.requestIpl('shutter_closed');
alt.requestIpl('smboat');
alt.requestIpl('smboat_distantlights');
alt.requestIpl('smboat_lod');
alt.requestIpl('smboat_lodlights');
alt.requestIpl('cargoship');
alt.requestIpl('railing_start');
alt.removeIpl('sp1_10_fake_interior');
alt.removeIpl('sp1_10_fake_interior_lod');
alt.requestIpl('sp1_10_real_interior');
alt.requestIpl('sp1_10_real_interior_lod');
alt.removeIpl('id2_14_during_door');
alt.removeIpl('id2_14_during1');
alt.removeIpl('id2_14_during2');
alt.removeIpl('id2_14_on_fire');
alt.removeIpl('id2_14_post_no_int');
alt.removeIpl('id2_14_pre_no_int');
alt.removeIpl('id2_14_during_door');
alt.requestIpl('id2_14_during1');
alt.removeIpl('Coroner_Int_off');
alt.requestIpl('coronertrash');
alt.requestIpl('Coroner_Int_on');
alt.removeIpl('bh1_16_refurb');
alt.removeIpl('jewel2fake');
alt.removeIpl('bh1_16_doors_shut');
alt.requestIpl('refit_unload');
alt.requestIpl('post_hiest_unload');
alt.requestIpl('Carwash_with_spinners');
alt.requestIpl('KT_CarWash');
alt.requestIpl('ferris_finale_Anim');
alt.removeIpl('ch1_02_closed');
alt.requestIpl('ch1_02_open');
alt.requestIpl('AP1_04_TriAf01');
alt.requestIpl('CS2_06_TriAf02');
alt.requestIpl('CS4_04_TriAf03');
alt.removeIpl('scafstartimap');
alt.requestIpl('scafendimap');
alt.removeIpl('DT1_05_HC_REMOVE');
alt.requestIpl('DT1_05_HC_REQ');
alt.requestIpl('DT1_05_REQUEST');
alt.requestIpl('dt1_05_hc_remove');
alt.requestIpl('dt1_05_hc_remove_lod');
alt.requestIpl('FINBANK');
alt.removeIpl('DT1_03_Shutter');
alt.removeIpl('DT1_03_Gr_Closed');
alt.requestIpl('golfflags');
alt.requestIpl('airfield');
alt.requestIpl('v_garages');
alt.requestIpl('v_foundry');
alt.requestIpl('hei_yacht_heist');
alt.requestIpl('hei_yacht_heist_Bar');
alt.requestIpl('hei_yacht_heist_Bedrm');
alt.requestIpl('hei_yacht_heist_Bridge');
alt.requestIpl('hei_yacht_heist_DistantLights');
alt.requestIpl('hei_yacht_heist_enginrm');
alt.requestIpl('hei_yacht_heist_LODLights');
alt.requestIpl('hei_yacht_heist_Lounge');
alt.requestIpl('hei_carrier');
alt.requestIpl('hei_Carrier_int1');
alt.requestIpl('hei_Carrier_int2');
alt.requestIpl('hei_Carrier_int3');
alt.requestIpl('hei_Carrier_int4');
alt.requestIpl('hei_Carrier_int5');
alt.requestIpl('hei_Carrier_int6');
alt.requestIpl('hei_carrier_LODLights');
alt.requestIpl('bkr_bi_id1_23_door');
alt.requestIpl('lr_cs6_08_grave_closed');
alt.requestIpl('hei_sm_16_interior_v_bahama_milo_');
alt.requestIpl('CS3_07_MPGates');
alt.requestIpl('cs5_4_trains');
alt.requestIpl('v_lesters');
alt.requestIpl('v_trevors');
alt.requestIpl('v_michael');
alt.requestIpl('v_comedy');
alt.requestIpl('v_cinema');
alt.requestIpl('V_Sweat');
alt.requestIpl('V_35_Fireman');
alt.requestIpl('redCarpet');
alt.requestIpl('triathlon2_VBprops');
alt.requestIpl('jetstenativeurnel');
alt.requestIpl('Jetsteal_ipl_grp1');
alt.requestIpl('v_hospital');
alt.removeIpl('RC12B_Default');
alt.removeIpl('RC12B_Fixed');
alt.requestIpl('RC12B_Destroyed');
alt.requestIpl('RC12B_HospitalInterior');
alt.requestIpl('canyonriver01');
alt.requestIpl('canyonriver01_lod');
alt.requestIpl('cs3_05_water_grp1');
alt.requestIpl('cs3_05_water_grp1_lod');
alt.requestIpl('trv1_trail_start');
alt.requestIpl('CanyonRvrShallow');

// CASINO
alt.requestIpl('vw_casino_penthouse');
alt.requestIpl('vw_casino_main');
alt.requestIpl('vw_casino_carpark');
alt.requestIpl('vw_dlc_casino_door');
alt.requestIpl('vw_casino_door');
alt.requestIpl('hei_dlc_windows_casino');
alt.requestIpl('hei_dlc_casino_door');
alt.requestIpl('hei_dlc_casino_aircon');
alt.requestIpl('vw_casino_garage');




native.setPedConfigFlag(alt.Player.local.scriptID, 184, true); // Disable Seat Shuffling
native.setPedSuffersCriticalHits(alt.Player.local.scriptID,false)




const getDistance = (vector1, vector2) => {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2));
  }
  
  alt.on('keydown', (key) => {
    if (key == 'G'.charCodeAt(0)) {
      const playerPed = alt.Player.local.scriptID;
      if (!native.isPedSittingInAnyVehicle(playerPed)) {
        const coords = native.getEntityCoords(playerPed, false);
        const offset = native.getOffsetFromEntityInWorldCoords(playerPed, 0.0, 1.0, 0.0);
        const rayHandle = native.startShapeTestCapsule(coords.x, coords.y, coords.z - 0.5, offset.x, offset.y, offset.z, 0.8, 10, playerPed, 7);
        const result = native.getShapeTestResult(rayHandle)[4];
        if (!result) return;
        if (native.doesEntityExist(result)) {
          const seatBones = ['seat_pside_f', 'seat_dside_r', 'seat_pside_r'];
          let closestSeat = [null, 3.0];
          seatBones.forEach((item, i) => {
            if (native.getEntityBoneIndexByName(result, item) != -1 && !native.getPedInVehicleSeat(result, i, false)) {
              const boneIndex = native.getEntityBoneIndexByName(result, item);
              const boneCoords = native.getWorldPositionOfEntityBone(result, boneIndex);
              const distance = getDistance(coords, boneCoords);
              if (distance < closestSeat[1]) {
                closestSeat = [i, distance];
              }
            }
          });
          if (closestSeat[0] !== null) {
            native.setPedConfigFlag(playerPed, 184, true);
            native.taskEnterVehicle(playerPed, result, -1, closestSeat[0], 1.0, 1, 0);
          }
        }
      }
    }
  });



  (function() {
    var days = ['Niedziela','Poniedzialek','Wtorek','Sroda','Czwartek','Piatek','Sobota'];

    var months = ['Styczen','Luty','Marzec','Kwiecien','Maj','Czerwiec','Lipiec','Sierpien','Wrzesien','Pazdziernik','Listopad','Grudzien'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
})();
var d = new Date();
var now = new Date();
var day = now.getDayName();
var month = now.getMonthName();

const DisableCtrlWhenShoot = alt.everyTick(() => {
    if (native.isRadarHidden()) return;
    drawText(`Serwer Pomocniczy 0.1b | ${now.getFullYear()} | ${now.getDate()}  | ${d.getMonth()+ 1} | ${day}  ` , 0.92, 0.97, 0.4, 4, 255, 255, 255, 255, true);
  
    if (!native.isPlayerTargettingAnything(alt.Player.local.scriptID)) {
        native.disableControlAction(0, 140, true);
        native.disableControlAction(0, 142, true);
      }
    if (alt.Player.local.isAiming)
    native.disableControlAction(1, 36, true);
});



alt.onServer('onTryToEnableGodMode', () => {

    hasGodModeEnabled ? native.setEntityInvincible(alt.Player.local.scriptID, true ) : native.setEntityInvincible( alt.Player.local.scriptID, false );
    hasGodModeEnabled = !hasGodModeEnabled;



});

//alt.onServer('DisableHeadshot', () => {

    //native.setPedSuffersCriticalHits(alt.Player.local.scriptID, false); deprecated function



//});

alt.on('gameEntityCreate', (entity) => {
    if (entity instanceof (alt.Player)) {
        //native.setPedSuffersCriticalHits(entity.scriptID,false)
    }
   // if (entity instanceof (alt.Vehicle)) {
       // vehiclesInRange.push(entity);
  //  }
});

alt.on('keyup', key => {
    const { vehicle, scriptID } = alt.Player.local
  
    // Key: 'L'
    if (key === 76 && !vehicle) {
      native.taskClimbLadder(scriptID, 0)
    }
    if (key === 114) {
    if (native.isRadarHidden()){
        native.displayRadar(true)
        //alt.emit('ChangeWebViewChat');

                return;
    } 
    native.displayRadar(false)
    //alt.emit('ChangeWebViewChat', 'true');


    }
  })


alt.onServer('triggerTP', tpToWaypoint)
function tpToWaypoint() {
    let waypoint = native.getFirstBlipInfoId(8);

    if (native.doesBlipExist(waypoint)) {
        let coords = native.getBlipInfoIdCoord(waypoint);
       // alt.log(coords.x, coords.y, coords.z);
        alt.emitServer('doTheTeleport', coords);
    }
};

alt.everyTick(() => {
    if (!native.isRadarHidden()) {
        let [_unk, _street, _cross] = native.getStreetNameAtCoord(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 0, 0);
        let zone = native.getLabelText(native.getNameOfZone(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z));
        let streetName = native.getStreetNameFromHashKey(_street);

        drawText(`${zone}, ${streetName}`, 0.5, 0.975, 0.35, 6, 255, 255, 255, 255);
    }
});


alt.onServer('updateModel', (model) => {
	if (native.hasModelLoaded(native.getHashKey(model)))
		return;

	native.requestModel(native.getHashKey(model));
});

alt.onServer('ProofForVehicle', () => {
    let veh = native.getVehiclePedIsUsing( alt.Player.local.scriptID );

    native.setEntityInvincible(veh, true, true, true);
});



alt.onServer('SetHandbrake', (state) => {
    let veh = native.getVehiclePedIsUsing( alt.Player.local.scriptID );
 

        native.freezeEntityPosition(veh, state)

 
});


alt.on('keyup', key => {
 

    
    if (key === 18) {
        
        let veh = native.getVehiclePedIsUsing( alt.Player.local.scriptID );
        if (veh) {
            let speed = native.getEntitySpeed(veh);
            let kmh = speed * 3.6;
            if (kmh > 5) return;
            alt.emitServer('reczny')
        }
   
    }
  })






alt.setStat( 'stamina', 100 );
alt.setStat( 'strength', 100 );
alt.setStat( 'lung_capacity', 100 );
alt.setStat( 'wheelie_ability', 100 );
alt.setStat( 'flying_ability', 100 );
alt.setStat( 'shooting_ability', 100 );
alt.setStat( 'stealth_ability', 100 );


    


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
    





alt.onServer('SetPedIntoVehicle', (vehicle) => {
    alt.setTimeout(() => {
       
        native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle, -1);
    }, 500);
});

let hideNametagsInVehicle = false;
let drawDistance = 50;
let showNametags = false;
let interval;
function distance2d(vector1, vector2) {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}
alt.onServer('nametags:Config', handleConfig);

/**
 * @param  {Boolean} _showNametags
 * @param  {Boolean} _hideNamesInVehicles
 * @param  {Number} _maxDrawDistance
 */
 let cos
function handleConfig(_showNametags, _hideNamesInVehicles, _cos, _maxDrawDistance) {
    showNametags = _showNametags;
    hideNametagsInVehicle = _hideNamesInVehicles;
	cos = _cos
    drawDistance = _maxDrawDistance;

    if (!showNametags) {
        if (interval) {
            alt.clearInterval(interval);
            interval = null;
        }
        return;
    }

    interval = alt.setInterval(drawNametags, 0);
}







alt.onServer('AdminDutyState', () => {
    if (aduty == false)
        aduty = true, alt.emitServer('DeleteDuty'), drawDistance = 25, alt.emitServer('p_core->greenzone', false);
    else
        aduty = false, drawDistance = 500,     alt.emitServer('p_core->greenzone', true);
});

let invis = false

alt.onServer('invis', () => {
if (invis === false) {
    invis = true
    //console.log('niewidzialnosc wlaczona')
    native.setEntityAlpha(alt.Player.local.scriptID,0, true)
  } else {
    invis = false
    //console.log('niewidzialnosc off')

    native.resetEntityAlpha(alt.Player.local.scriptID)
  }


});

let aduty = true;
function drawNametags() {
    if (native.isRadarHidden()) return;
   // if (alt.Player.local.getSyncedMeta('STOP_DRAWS'))


    for (let i = 0, n = alt.Player.all.length; i < n; i++) {
        let player = alt.Player.all[i];
        //console.log(native.getEntityAlpha(player.scriptID))

        if (player.getSyncedMeta('invis')) 
        continue;
        
        if (!player.valid)
            continue;

        if (hideNametagsInVehicle && player.vehicle && alt.Player.local.vehicle !== player.vehicle)
            continue;

        let r = 255;
        let g = 255;
        let b = 255;
        const name = player.getSyncedMeta('NAME');
        if (!name)
            continue;

        if (!native.hasEntityClearLosToEntity(alt.Player.local.scriptID, player.scriptID, 17))
            continue;

        let dist = distance2d(player.pos, alt.Player.local.pos);
        if (dist > drawDistance)
            continue;

        let premium = player.getSyncedMeta('goldnickname');
        if (premium) {
            r = 255;
            g = 187;
            b = 23;
        }

        const GotDamage = player.getSyncedMeta('GotDamage');
        if (GotDamage) {
            r = 255;
            g = 0;
            b = 0;
        }

        const Dead = player.getSyncedMeta('Dead');
        if (Dead) {
            r = 0;
            g = 0;
            b = 0;
        }

        const isChatting = player.getSyncedMeta('Chatting');
        const pos = { ...native.getPedBoneCoords(player.scriptID, 12844, 0, 0, 0) };
        pos.z += 0.45;

        let scale = 0.8 - (0.8 * dist) / drawDistance;
        let fontSize = 0.6 * scale;

        const entity = player.vehicle ? player.vehicle.scriptID : player.scriptID;
        const vector = native.getEntityVelocity(entity);
        const frameTime = native.getFrameTime();

        // Names
        native.setDrawOrigin(
            pos.x + vector.x * frameTime,
            pos.y + vector.y * frameTime,
            pos.z + vector.z * frameTime,
            0
        );

        native.beginTextCommandDisplayText('STRING');
        native.setTextFont(4);
        native.setTextScale(fontSize, fontSize);
        native.setTextProportional(true);
        native.setTextCentre(true);
        native.setTextColour(r, g, b, 255);
        native.setTextOutline();
        let Duty = player.getSyncedMeta('Duty');

        if (!Duty) {
            Duty = ''
        } else if (Duty == 'Wlasciciel' || Duty == 'Administrator') {
            Duty = `~r~(~r~${Duty}~r~)~w~`;
        } else if (Duty == 'Support' || Duty == 'Support (S1)' || Duty == 'Support (S2)' || Duty == 'Support (S3)') {
            Duty = `~b~(~b~${Duty}~b~)~w~`;
        } else if (Duty == 'Community Manager') {
            Duty = `~g~(~g~${Duty}~g~)~w~`;
        } else if (Duty == 'LSPD') {
            Duty = `~b~(~b~${Duty}~b~)~w~`;
        } else {
            Duty = `~y~(~w~${Duty}~y~)~w~`;
        }

        // is chatting
        let text = `${name.replace('_', ' ')} ${Duty} ~w~(~w~${player.getSyncedMeta('ID')}~w~)`;
        let adutytext = `${name.replace('_', ' ')} ${Duty} ~r~((~r~${player.getSyncedMeta('globalName')}~r~))~w~ (${player.getSyncedMeta('ID')})`;

        //tylko settowac duty przy aduty albo zwyklym duty
        if (aduty == false)
            native.addTextComponentSubstringPlayerName(isChatting ? `${adutytext}~r~*` : `${adutytext}`);
        else
            native.addTextComponentSubstringPlayerName(isChatting ? `${text}~r~*` : `${text}`);

        native.endTextCommandDisplayText(0, 0, 0);
        native.clearDrawOrigin();
    }
}


alt.onServer('ChangeTime', (hour, minute, freeze) => {
    if (freeze) {
        alt.setMsPerGameMinute(1000 * 60);

    }
   native.setClockTime(hour, minute, 1)
})


alt.onServer('panicButton', LEAPanicButton);

function LEAPanicButton(x,y) {
    native.setNewWaypoint(x, y);
   // console.log(x, y)
}

alt.onServer('RollDownWindows', RollDown);
function RollDown() {
    let veh = native.getVehiclePedIsUsing( alt.Player.local.scriptID );
    native.rollDownWindows(veh)
 }



 alt.onServer('addComponent', Ahuj);

 function Ahuj(currentWeapon, addon) {
    // console.log(currentWeapon, addon)
    //console.log(currentWeapon, addon + "Client sie")
     native.giveWeaponComponentToPed(alt.Player.local.scriptID,currentWeapon,addon)
    // console.log(x, y)
 }
 



 alt.onServer('CreateBlipsForLSPD', ({players}) => {
     PlayersPD = players
     PlayersPD.forEach(_player => {
        _player.blip = new alt.PointBlip(_player.pos.x, _player.pos.y, _player.pos.z);
        _player.blip.name = _player.name;
        _player.blip.color = 3;
        _player.blip.shortRange = false;
        _player.blip.owner = _player;
    })
})

alt.everyTick(() => {
    alt.Player.all.forEach(_player => {
        if (!_player.valid)
            return;
  
        if (_player.blip && _player.blip !== null)
            _player.blip.pos = _player.pos;
    });
})

alt.onServer('player:deleteBlipPlayers', () => {
    alt.Player.all.forEach(_player => {
        if (_player.blip && _player.blip !== null) {
            _player.blip.destroy();
            _player.blip = null;
        }
    })
})

