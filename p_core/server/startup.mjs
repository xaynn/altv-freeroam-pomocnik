import * as alt from 'alt';
import * as chat from 'chat';
import colors from 'colors'
//import { sendWebHook, sendWebHookAsync } from "p_webhook";

const version = "0.1"
const red = "{FF0000}"
const green = "{00BE00}"
const ServerName = "[Pomocnik]"
console.log(`${ServerName} Core ${version}`);
let players = 0
var PlayersPD = [];
export function Distance(vector1, vector2) {
	if (vector1 === undefined || vector2 === undefined) {
		throw new Error('AddVector => vector1 or vector2 is undefined');
	}

	return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2));
}

function getPlayersInDimension(dimension) {
	if (dimension === undefined) {
	throw new Error('getPlayersInDimension => dimension is undefined');
	}
	var inDimension = [];
	alt.Player.all.forEach((value) => {
			if (value.dimension == dimension )
				
			inDimension.push(value);
			
		});
		return inDimension;
	}
	export function GetPlayersInRange(pos, range) {
		if (pos === undefined || range === undefined) {
			throw new Error('GetPlayersInRange => pos or range is undefined');
		}
		
		var inRange = [];
		
		alt.Player.all.forEach((value) => {
			if (Distance(pos, value.pos) > range)
				return;
			inRange.push(value);
		});
	
		return inRange;
	}








function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  


  function playerSetup( player, first ) {

	if (first)
	player.vehicles = [];
else
    player.spawn( -29.84, -1573.50, 29.313, 0 ); //-740.911, y: 5599.341, z: 47.25
    player.model = 'mp_m_freemode_01';
    player.health = 200;
    player.clearBloodDamage();



};

alt.onClient('reczny', (player, state) => {
	if (player.vehicle.getSyncedMeta('Handbrake')) {
	  alt.emitClient(player, 'SetHandbrake', false)
	  player.vehicle.deleteSyncedMeta('Handbrake')
	} else {
	  player.vehicle.setSyncedMeta('Handbrake', true)
	  alt.emitClient(player, 'SetHandbrake', true)
	}
  
  
  });


  alt.onClient('p_core->greenzone', (player, state) => {
	if (state) {
	  alt.emitClient(player, 'p_ac->greenzone', true)
	} else {
	  alt.emitClient(player, 'p_ac->greenzone', false)
	}
  
  
  });

export function SendNotificationToPlayer(forwho, text ){
    const info = text
	chat.send(forwho, `${red}${ServerName} {FFFFFF}${info}`);
}
let ids = [];

alt.on('playerConnect', async (player) => {
  if(player.name.includes("Admin") || player.name.includes("Player")){
    player.kick(`Zmien nick, twoj nick (${player.name})`);
    return;
}




let slot
for (var i = 1; i < 1024; i++) {
	if(ids[i]===undefined){
	slot = i
	//console.log(i)
	//console.log(slot)
	break
	}
 }
 //console.log(lol)
ids[slot] = player
let id = player.setSyncedMeta("ID", slot)
//alt.log(slot)
 //console.log(ids[slot])
//player.customID = player.id - alt.Vehicle.all.length;
let playerid = player.getSyncedMeta('ID')
chat.broadcast(`${player.name} (${playerid}) dolaczyl na serwer.`);
alt.log("[JOIN] ".green + `${player.name} (${playerid})`.green);
playerSetup(player)
playerSetup(player,"first")
giveAllWeapons(player)
player.setMeta("vehicles", []);
players = players + 1


});

alt.on('playerDisconnect', async (player, reason) => {
  players = players - 1
  let playerid = player.getSyncedMeta('ID')
  alt.log("[LEFT] ".red + `${player.name} (${playerid})`.red);
  chat.broadcast(`${player.name} (${playerid}) opuscil serwer.`);
  let slot = player.getSyncedMeta('ID')
  if (slot){
	  ids[slot] = undefined
  }
  player.getMeta("vehicles").forEach(vehicle => {
    if(vehicle != null){
        vehicle.destroy();
    }
	player.vehicles.forEach(vehicle => {
        vehicle.destroy();
	});
});
player.setMeta("vehicles", undefined);

  //sendWebHook(webhookurl,`Gracze online: ${players}`);

});













chat.registerCmd('getpos', (player,args) => {
//dodanie permisji
SendNotificationToPlayer(player,`Twoje kordynaty X: ${green}${player.pos.x}, Y: ${player.pos.y}, Z: ${player.pos.z}`)
});

chat.registerCmd('ping', (player,args) => {
  SendNotificationToPlayer(player,`Twoj ping to ${player.ping} MS`)
 
  });
  



chat.registerCmd('kill', (player,args) => {
    player.health = 0;
    SendNotificationToPlayer(player,`Usmierciles postac.`)
    });

chat.registerCmd('vgod', (player,args) => {
		let veh = player.vehicle
		if (!veh) return SendNotificationToPlayer(player,'Nie jestes w pojezdzie.')
		SendNotificationToPlayer(player,`Nadales vgod pojazdu.`)
		alt.emitClient(player,'ProofForVehicle')
		});
	



    chat.registerCmd('bwmode', (player,args) => {
      const BW = player.getMeta('BWMODE');
      if (BW) {
        SendNotificationToPlayer(player,'Wylaczyles tryb BW.')
        player.deleteMeta('BWMODE');
        // wylacz
    } else {
      SendNotificationToPlayer(player,'Wlaczyles tryb BW.')
      player.setMeta('BWMODE', true);
       // wlacz
    }
          });






chat.registerCmd('hp', (player,args) => {
  if (!args[0]) return SendNotificationToPlayer(player,`/hp [ilosc HP]`);


 let amount = parseInt(args[0])
 if (amount > 100 || amount < 1) return SendNotificationToPlayer(player,`TIP: Podana wartość jest za niska lub za wysoka.`);
amount += 100;
  SendNotificationToPlayer(player,`Ustawiles sobie ${amount} HP`)
  player.health = amount;
  alt.emitClient(player,'p_ac->UpdateStatistic', amount)


})






alt.on('nametags:Config', handleConfig);

/**
 * @param  {alt.Player} player
 * @param  {Boolean} showNametags Draw nametags for all players for player?
 * @param  {Boolean} hideNamesInVehicles=false
 * @param  {Boolean} showBarsOnAim=false
 * @param  {Number} maxDrawDistance=100
 */

function handleConfig(
    player,
    showNametags = true,
    hideNamesInVehicles = false,
    showBarsOnAim = false,
    maxDrawDistance = 25
) {
    alt.emitClient(player, 'nametags:Config', showNametags, hideNamesInVehicles, showBarsOnAim, maxDrawDistance);
}



chat.registerCmd( 'wt', ( player, arg ) => {
	if (!arg[0])
  return SendNotificationToPlayer(player,`/wt [nick].`);
	let playernick
	const target = alt.Player.all.filter(p => p.name == arg[0] || p.getSyncedMeta('ID') == parseInt(arg[0]))

	if (!target || !target[0])
		return  SendNotificationToPlayer(player,`Gracz nie istnieje.`);

	if (Array.isArray(target) && target.length >= 2)
		return SendNotificationToPlayer(player,`Za duzo graczy jest o podobnym nicku, podaj dokladniej.`);

	if (target[0].dimension !== player.dimension)
		return SendNotificationToPlayer(player,`Nie jestescie na tym samym worldzie.`);
    const WarpDisabled = player.getMeta('WarpDisabled');
    if (WarpDisabled) {
      return  SendNotificationToPlayer(player,`Gracz posiada wylaczone warpowanie do siebie`);
    }

  SendNotificationToPlayer(player,`Pomyslnie przeteleportowales sie do gracza ${target[0].getSyncedMeta('globalName')}`)
	player.pos = target[0].pos;
}
 );





 chat.registerCmd('world', (player, arg) => {
	if (!arg[0])
	  return SendNotificationToPlayer(player, `/world [id]`);
	if (player.vehicle) return SendNotificationToPlayer(player, `Jesteś w pojezdzie nie możesz zmienić świata.`)
  
	player.dimension = arg[0];
	SendNotificationToPlayer(player, `Dołączyłeś na world o ID ${arg[0]}.`);
  });



chat.registerCmd('wd', (player,args) => {

  const WarpDisabled = player.getMeta('WarpDisabled');
  if (WarpDisabled) {
    SendNotificationToPlayer(player,'Wlaczyles warpowanie do siebie.')
    player.deleteMeta('WarpDisabled');

} else {
  SendNotificationToPlayer(player,'Wylaczyles warpowanie do siebie.')
  player.setMeta('WarpDisabled', true);

}

})




chat.registerCmd("veh", function (player, args) {
  if (args.length === 0) {
    SendNotificationToPlayer(player,'/veh [nazwa].')
      return;
  }
  try {
      var vehicle = new alt.Vehicle(args[0], player.pos.x, player.pos.y, player.pos.z, 0, 0, 0);
	  vehicle.dimension = player.dimension 
	  alt.emitClient(player, 'SetPedIntoVehicle', vehicle);

  }catch{
      SendNotificationToPlayer(player,`Pojazd ${args[0]} nie istnieje.`);
  }finally {
      var pvehs = player.getMeta("vehicles");
      if(pvehs.length >= 3){
          var toDestroy = pvehs.pop();
          if(toDestroy != null){
              toDestroy.destroy();
          }
      }
      pvehs.unshift(vehicle);
      player.setMeta("vehicles", pvehs);
  }
});





chat.registerCmd('repair', (player,args) => {
	if (player.vehicle) {
		SendNotificationToPlayer(player,`Naprawiono pomyslnie pojazd.`)
		player.vehicle.repair()
	}
	
  
  
  })
  


  const newShape = new alt.ColshapeCylinder(-29, -1573, 29, 20, 9999);
  newShape.name = "greenzone";
  
  newShape.playersOnly = true;
  alt.on('entityEnterColshape', (colshape, entity) => {
	if (colshape !== newShape)
	  return;
  
	alt.emitClient(entity, 'onTryToEnableGodMode');
	alt.emitClient(entity, 'p_ac->greenzone', true);

  });
  
  alt.on('entityLeaveColshape', (colshape, entity) => {
	if (colshape !== newShape)
	  return;
  
	alt.emitClient(entity, 'onTryToEnableGodMode');
	alt.emitClient(entity, 'p_ac->greenzone', false);

  });

// usefull functions
export function giveAllWeapons( player ) {

  var weapons = [
    "dagger",
    "bat",
    "bottle",
    "crowbar",
    "flashlight",
    "golfclub",
    "hammer",
    "hatchet",
    "knuckle",
    "knife",
    "machete",
    "switchblade",
    "nightstick",
    "wrench",
    "battleaxe",
    "poolcue",
    "stone_hatchet",
    "pistol",
    "pistol_mk2",
    "combatpistol",
    "appistol",
    "stungun",
    "pistol50",
    "snspistol",
    "snspistol_mk2",
    "heavypistol",
    "vintagepistol",
    "flaregun",
    "marksmanpistol",
    "revolver",
    "revolver_mk2",
    "doubleaction",
    "raypistol",
    "microsmg",
    "smg",
    "smg_mk2",
    "assaultsmg",
    "combatpdw",
    "machinepistol",
    "minismg",
    "raycarbine",
    "pumpshotgun",
    "pumpshotgun_mk2",
    "sawnoffshotgun",
    "assaultshotgun",
    "bullpupshotgun",
    "musket",
    "heavyshotgun",
    "dbshotgun",
    "autoshotgun",
    "assaultrifle",
    "assaultrifle_mk2",
    "carbinerifle",
    "carbinerifle_mk2",
    "advancedrifle",
    "specialcarbine",
    "specialcarbine_mk2",
    "bullpuprifle",
    "bullpuprifle_mk2",
    "compactrifle",
    "mg",
    "combatmg",
    "combatmg_mk2",
    "gusenberg",
    "sniperrifle",
    "heavysniper",
    "heavysniper_mk2",
    "marksmanrifle",
    "marksmanrifle_mk2",
    "rpg",
    "grenadelauncher",
    "grenadelauncher_smoke",
    "minigun",
    "firework",
    "railgun",
    "hominglauncher",
    "compactlauncher",
    "rayminigun",
    "grenade",
    "bzgas",
    "smokegrenade",
    "flare",
    "molotov",
    "stickybomb",
    "proxmine",
    "snowball",
    "pipebomb",
    "ball"
  ];
  weapons.forEach(element => {
    player.giveWeapon(alt.hash("weapon_" + element), 500, true);
  });


};




chat.registerCmd('skin', (player,arg) => {

	if (!arg[0])
		return SendNotificationToPlayer(player,`Nieprawidlowy skin.`)

	try {
		player.model = arg[0];
		loadModelForPlayers(player);
		SendNotificationToPlayer(player,`Zmieniles skin.`)
		player.health = 175
	} catch(err) {
		SendNotificationToPlayer(player,`Zla nazwa skina.`)
	}
}
  
  )



  export function loadModelForPlayers(player) {
	alt.Player.all.forEach((target) => {
		alt.emitClient(target, 'updateModel', player.model);
	});
}

export function loadModelsForPlayer(player) {
	alt.Player.all.forEach((target) => {
		alt.emitClient(player, 'updateModel', target.model);
	});
}



export const skinList = [
	'a_f_m_beach_01',
	'a_f_m_bevhills_01',
	'a_f_m_bevhills_02',
	'a_f_m_bodybuild_01',
	'a_f_m_business_02',
	'a_f_m_downtown_01',
	'a_f_m_eastsa_01',
	'a_f_m_eastsa_02',
	'a_f_m_fatbla_01',
	'a_f_m_fatcult_01',
	'a_f_m_fatwhite_01',
	'a_f_m_ktown_01',
	'a_f_m_ktown_02',
	'a_f_m_prolhost_01',
	'a_f_m_salton_01',
	'a_f_m_skidrow_01',
	'a_f_m_soucent_01',
	'a_f_m_soucent_02',
	'a_f_m_soucentmc_01',
	'a_f_m_tourist_01',
	'a_f_m_tramp_01',
	'a_f_m_trampbeac_01',
	'a_f_o_genstreet_01',
	'a_f_o_indian_01',
	'a_f_o_ktown_01',
	'a_f_o_salton_01',
	'a_f_o_soucent_01',
	'a_f_o_soucent_02',
	'a_f_y_beach_01',
	'a_f_y_bevhills_01',
	'a_f_y_bevhills_02',
	'a_f_y_bevhills_03',
	'a_f_y_bevhills_04',
	'a_f_y_business_01',
	'a_f_y_business_02',
	'a_f_y_business_03',
	'a_f_y_business_04',
	'a_f_y_eastsa_01',
	'a_f_y_eastsa_02',
	'a_f_y_eastsa_03',
	'a_f_y_epsilon_01',
	'a_f_y_fitness_01',
	'a_f_y_fitness_02',
	'a_f_y_genhot_01',
	'a_f_y_golfer_01',
	'a_f_y_hiker_01',
	'a_f_y_hippie_01',
	'a_f_y_hipster_01',
	'a_f_y_hipster_02',
	'a_f_y_hipster_03',
	'a_f_y_hipster_04',
	'a_f_y_indian_01',
	'a_f_y_juggalo_01',
	'a_f_y_runner_01',
	'a_f_y_rurmeth_01',
	'a_f_y_scdressy_01',
	'a_f_y_skater_01',
	'a_f_y_soucent_01',
	'a_f_y_soucent_02',
	'a_f_y_soucent_03',
	'a_f_y_tennis_01',
	'a_f_y_topless_01',
	'a_f_y_tourist_01',
	'a_f_y_tourist_02',
	'a_f_y_vinewood_01',
	'a_f_y_vinewood_02',
	'a_f_y_vinewood_03',
	'a_f_y_vinewood_04',
	'a_f_y_yoga_01',
	'a_m_m_afriamer_01',
	'a_m_m_beach_01',
	'a_m_m_beach_02',
	'a_m_m_bevhills_01',
	'a_m_m_bevhills_02',
	'a_m_m_business_01',
	'a_m_m_eastsa_01',
	'a_m_m_eastsa_02',
	'a_m_m_farmer_01',
	'a_m_m_fatlatin_01',
	'a_m_m_genfat_01',
	'a_m_m_genfat_02',
	'a_m_m_golfer_01',
	'a_m_m_hasjew_01',
	'a_m_m_hillbilly_01',
	'a_m_m_hillbilly_02',
	'a_m_m_indian_01',
	'a_m_m_ktown_01',
	'a_m_m_malibu_01',
	'a_m_m_mexcntry_01',
	'a_m_m_mexlabor_01',
	'a_m_m_og_boss_01',
	'a_m_m_paparazzi_01',
	'a_m_m_polynesian_01',
	'a_m_m_prolhost_01',
	'a_m_m_rurmeth_01',
	'a_m_m_salton_01',
	'a_m_m_salton_02',
	'a_m_m_salton_03',
	'a_m_m_salton_04',
	'a_m_m_skater_01',
	'a_m_m_skidrow_01',
	'a_m_m_socenlat_01',
	'a_m_m_soucent_01',
	'a_m_m_soucent_02',
	'a_m_m_soucent_03',
	'a_m_m_soucent_04',
	'a_m_m_stlat_02',
	'a_m_m_tennis_01',
	'a_m_m_tourist_01',
	'a_m_m_tramp_01',
	'a_m_m_trampbeac_01',
	'a_m_m_tranvest_01',
	'a_m_m_tranvest_02',
	'a_m_o_acult_01',
	'a_m_o_acult_02',
	'a_m_o_beach_01',
	'a_m_o_genstreet_01',
	'a_m_o_ktown_01',
	'a_m_o_salton_01',
	'a_m_o_soucent_01',
	'a_m_o_soucent_02',
	'a_m_o_soucent_03',
	'a_m_o_tramp_01',
	'a_m_y_acult_01',
	'a_m_y_acult_02',
	'a_m_y_beach_01',
	'a_m_y_beach_02',
	'a_m_y_beach_03',
	'a_m_y_beachvesp_01',
	'a_m_y_beachvesp_02',
	'a_m_y_bevhills_01',
	'a_m_y_bevhills_02',
	'a_m_y_breakdance_01',
	'a_m_y_busicas_01',
	'a_m_y_business_01',
	'a_m_y_business_02',
	'a_m_y_business_03',
	'a_m_y_cyclist_01',
	'a_m_y_dhill_01',
	'a_m_y_downtown_01',
	'a_m_y_eastsa_01',
	'a_m_y_eastsa_02',
	'a_m_y_epsilon_01',
	'a_m_y_epsilon_02',
	'a_m_y_gay_01',
	'a_m_y_gay_02',
	'a_m_y_genstreet_01',
	'a_m_y_genstreet_02',
	'a_m_y_golfer_01',
	'a_m_y_hasjew_01',
	'a_m_y_hiker_01',
	'a_m_y_hippy_01',
	'a_m_y_hipster_01',
	'a_m_y_hipster_02',
	'a_m_y_hipster_03',
	'a_m_y_indian_01',
	'a_m_y_jetski_01',
	'a_m_y_juggalo_01',
	'a_m_y_ktown_01',
	'a_m_y_ktown_02',
	'a_m_y_latino_01',
	'a_m_y_methhead_01',
	'a_m_y_mexthug_01',
	'a_m_y_motox_01',
	'a_m_y_motox_02',
	'a_m_y_musclbeac_01',
	'a_m_y_musclbeac_02',
	'a_m_y_polynesian_01',
	'a_m_y_roadcyc_01',
	'a_m_y_runner_01',
	'a_m_y_runner_02',
	'a_m_y_salton_01',
	'a_m_y_skater_01',
	'a_m_y_skater_02',
	'a_m_y_soucent_01',
	'a_m_y_soucent_02',
	'a_m_y_soucent_03',
	'a_m_y_soucent_04',
	'a_m_y_stbla_01',
	'a_m_y_stbla_02',
	'a_m_y_stlat_01',
	'a_m_y_stwhi_01',
	'a_m_y_stwhi_02',
	'a_m_y_sunbathe_01',
	'a_m_y_surfer_01',
	'a_m_y_vindouche_01',
	'a_m_y_vinewood_01',
	'a_m_y_vinewood_02',
	'a_m_y_vinewood_03',
	'a_m_y_vinewood_04',
	'a_m_y_yoga_01',
	'g_f_importexport_01',
	'g_f_y_ballas_01',
	'g_f_y_families_01',
	'g_f_y_lost_01',
	'g_f_y_vagos_01',
	'g_m_importexport_01',
	'g_m_m_armboss_01',
	'g_m_m_armgoon_01',
	'g_m_m_armlieut_01',
	'g_m_m_chemwork_01',
	'g_m_m_chiboss_01',
	'g_m_m_chicold_01',
	'g_m_m_chigoon_01',
	'g_m_m_chigoon_02',
	'g_m_m_korboss_01',
	'g_m_m_mexboss_01',
	'g_m_m_mexboss_02',
	'g_m_y_armgoon_02',
	'g_m_y_azteca_01',
	'g_m_y_ballaeast_01',
	'g_m_y_ballaorig_01',
	'g_m_y_ballasout_01',
	'g_m_y_famca_01',
	'g_m_y_famdnf_01',
	'g_m_y_famfor_01',
	'g_m_y_korean_01',
	'g_m_y_korean_02',
	'g_m_y_korlieut_01',
	'g_m_y_lost_01',
	'g_m_y_lost_02',
	'g_m_y_lost_03',
	'g_m_y_mexgang_01',
	'g_m_y_mexgoon_01',
	'g_m_y_mexgoon_02',
	'g_m_y_mexgoon_03',
	'g_m_y_pologoon_01',
	'g_m_y_pologoon_02',
	'g_m_y_salvaboss_01',
	'g_m_y_salvagoon_01',
	'g_m_y_salvagoon_02',
	'g_m_y_salvagoon_03',
	'g_m_y_strpunk_01',
	'g_m_y_strpunk_02',
	'mp_f_boatstaff_01',
	'mp_f_cardesign_01',
	'mp_f_chbar_01',
	'mp_f_cocaine_01',
	'mp_f_counterfeit_01',
	'mp_f_deadhooker',
	'mp_f_execpa_01',
	'mp_f_forgery_01',
	'mp_f_freemode_01',
	'mp_f_helistaff_01',
	'mp_f_meth_01',
	'mp_f_misty_01',
	'mp_f_stripperlite',
	'mp_f_weed_01',
	'mp_g_m_pros_01',
	'mp_headtargets',
	'mp_m_boatstaff_01',
	'mp_m_claude_01',
	'mp_m_cocaine_01',
	'mp_m_counterfeit_01',
	'mp_m_exarmy_01',
	'mp_m_execpa_01',
	'mp_m_famdd_01',
	'mp_m_fibsec_01',
	'mp_m_forgery_01',
	'mp_m_freemode_01',
	'mp_m_g_vagfun_01',
	'mp_m_marston_01',
	'mp_m_meth_01',
	'mp_m_securoguard_01',
	'mp_m_shopkeep_01',
	'mp_m_waremech_01',
	'mp_m_weed_01',
	'mp_s_m_armoured_01',
	'player_one',
	'player_two',
	'player_zero',
	's_f_m_fembarber',
	's_f_m_maid_01',
	's_f_m_shop_high',
	's_f_m_sweatshop_01',
	's_f_y_airhostess_01',
	's_f_y_bartender_01',
	's_f_y_baywatch_01',
	's_f_y_cop_01',
	's_f_y_factory_01',
	's_f_y_hooker_01',
	's_f_y_hooker_02',
	's_f_y_hooker_03',
	's_f_y_migrant_01',
	's_f_y_movprem_01',
	's_f_y_ranger_01',
	's_f_y_scrubs_01',
	's_f_y_sheriff_01',
	's_f_y_shop_low',
	's_f_y_shop_mid',
	's_f_y_stripper_01',
	's_f_y_stripper_02',
	's_f_y_stripperlite',
	's_f_y_sweatshop_01',
	's_m_m_ammucountry',
	's_m_m_armoured_01',
	's_m_m_armoured_02',
	's_m_m_autoshop_01',
	's_m_m_autoshop_02',
	's_m_m_bouncer_01',
	's_m_m_chemsec_01',
	's_m_m_ciasec_01',
	's_m_m_cntrybar_01',
	's_m_m_dockwork_01',
	's_m_m_doctor_01',
	's_m_m_fiboffice_01',
	's_m_m_fiboffice_02',
	's_m_m_gaffer_01',
	's_m_m_gardener_01',
	's_m_m_gentransport',
	's_m_m_hairdress_01',
	's_m_m_highsec_01',
	's_m_m_highsec_02',
	's_m_m_janitor',
	's_m_m_lathandy_01',
	's_m_m_lifeinvad_01',
	's_m_m_linecook',
	's_m_m_lsmetro_01',
	's_m_m_mariachi_01',
	's_m_m_marine_01',
	's_m_m_marine_02',
	's_m_m_migrant_01',
	's_m_m_movalien_01',
	's_m_m_movprem_01',
	's_m_m_movspace_01',
	's_m_m_paramedic_01',
	's_m_m_pilot_01',
	's_m_m_pilot_02',
	's_m_m_postal_01',
	's_m_m_postal_02',
	's_m_m_prisguard_01',
	's_m_m_scientist_01',
	's_m_m_security_01',
	's_m_m_snowcop_01',
	's_m_m_strperf_01',
	's_m_m_strpreach_01',
	's_m_m_strvend_01',
	's_m_m_trucker_01',
	's_m_m_ups_01',
	's_m_m_ups_02',
	's_m_o_busker_01',
	's_m_y_airworker',
	's_m_y_ammucity_01',
	's_m_y_armymech_01',
	's_m_y_autopsy_01',
	's_m_y_barman_01',
	's_m_y_baywatch_01',
	's_m_y_blackops_01',
	's_m_y_blackops_02',
	's_m_y_busboy_01',
	's_m_y_chef_01',
	's_m_y_clown_01',
	's_m_y_construct_01',
	's_m_y_construct_02',
	's_m_y_cop_01',
	's_m_y_dealer_01',
	's_m_y_devinsec_01',
	's_m_y_dockwork_01',
	's_m_y_doorman_01',
	's_m_y_dwservice_01',
	's_m_y_dwservice_02',
	's_m_y_factory_01',
	's_m_y_fireman_01',
	's_m_y_garbage',
	's_m_y_grip_01',
	's_m_y_hwaycop_01',
	's_m_y_marine_01',
	's_m_y_marine_02',
	's_m_y_marine_03',
	's_m_y_mime',
	's_m_y_pestcont_01',
	's_m_y_pilot_01',
	's_m_y_prismuscl_01',
	's_m_y_prisoner_01',
	's_m_y_ranger_01',
	's_m_y_robber_01',
	's_m_y_sheriff_01',
	's_m_y_shop_mask',
	's_m_y_strvend_01',
	's_m_y_swat_01',
	's_m_y_uscg_01',
	's_m_y_valet_01',
	's_m_y_waiter_01',
	's_m_y_winclean_01',
	's_m_y_xmech_01',
	's_m_y_xmech_02',
	's_m_y_xmech_02_mp',
	'u_f_m_corpse_01',
	'u_f_m_miranda',
	'u_f_m_promourn_01',
	'u_f_o_moviestar',
	'u_f_o_prolhost_01',
	'u_f_y_bikerchic',
	'u_f_y_comjane',
	'u_f_y_corpse_01',
	'u_f_y_corpse_02',
	'u_f_y_hotposh_01',
	'u_f_y_jewelass_01',
	'u_f_y_mistress',
	'u_f_y_poppymich',
	'u_f_y_princess',
	'u_f_y_spyactress',
	'u_m_m_aldinapoli',
	'u_m_m_bankman',
	'u_m_m_bikehire_01',
	'u_m_m_fibarchitect',
	'u_m_m_filmdirector',
	'u_m_m_glenstank_01',
	'u_m_m_griff_01',
	'u_m_m_jesus_01',
	'u_m_m_jewelsec_01',
	'u_m_m_jewelthief',
	'u_m_m_markfost',
	'u_m_m_partytarget',
	'u_m_m_prolsec_01',
	'u_m_m_promourn_01',
	'u_m_m_rivalpap',
	'u_m_m_spyactor',
	'u_m_m_willyfist',
	'u_m_o_finguru_01',
	'u_m_o_taphillbilly',
	'u_m_o_tramp_01',
	'u_m_y_abner',
	'u_m_y_antonb',
	'u_m_y_babyd',
	'u_m_y_baygor',
	'u_m_y_burgerdrug_01',
	'u_m_y_chip',
	'u_m_y_cyclist_01',
	'u_m_y_fibmugger_01',
	'u_m_y_guido_01',
	'u_m_y_gunvend_01',
	'u_m_y_hippie_01',
	'u_m_y_imporage',
	'u_m_y_justin',
	'u_m_y_mani',
	'u_m_y_militarybum',
	'u_m_y_paparazzi',
	'u_m_y_party_01',
	'u_m_y_pogo_01',
	'u_m_y_prisoner_01',
	'u_m_y_proldriver_01',
	'u_m_y_rsranger_01',
	'u_m_y_sbike',
	'u_m_y_staggrm_01',
	'u_m_y_tattoo_01',
	'u_m_y_zombie_01'
];


//alt.emitClient(player, 'aliveTeamMembers', blueTeam, 'blue');



var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

	

chat.registerCmd('setduty', (player, args) => {
	if (format.test(args[0]))
	return SendNotificationToPlayer(player,'Podales znaki specjalne, komenda przerwana.');
    if (!args[0])
        return SendNotificationToPlayer(player, '/setduty duty /setduty usun');

        if (args[0] == 'Support' || args[0] == 'Wlasciciel' || args[0] == 'Administrator' || args[0] == 'Community Manager' || args[0] == 'LSPD')
            return SendNotificationToPlayer(player, 'Nie możesz ustawić takiego duty.')

    if (args[0] == 'usun')
        return player.deleteSyncedMeta('Duty'), SendNotificationToPlayer(player, 'Usunąłeś duty.');

    if (args[0].length >= 20)
        return SendNotificationToPlayer(player, 'Zbyt długa nazwa duty, limit znaków to 20!');
        let dutyhuj = args.slice(0).join(" ");
        player.setSyncedMeta('Duty', dutyhuj);
    //player.setSyncedMeta('Duty', [args[0]]);
    SendNotificationToPlayer(player, `Włączyłeś duty ${dutyhuj}!`);
});


chat.registerCmd('name', (player, args) => {
    if (!args[0])
        return notifications.SendNotificationToPlayer(player, `Nie podałeś nazwy postaci jaką chcesz miec!`);

    if (args[0].length > 23)
        return notifications.SendNotificationToPlayer(player, `Zbyt długa nazwa, limit znaków to 23!`);

    let name = args[0];
    player.setSyncedMeta('NAME', name);
});



	function changemodel(player, model) {
		player.model = model, player.health = 200
	};

	alt.onClient("changemodel", (player, model) => changemodel(player, model));


	chat.registerCmd('me', (player, args) => {
		if (!args[0])
			return;
	
		let x = player.pos.x;
		let y = player.pos.y;
		let z = player.pos.z;
	
		let vec3 = new alt.Vector3(x, y, z);
		let msg = args.join(' ');
		let ICNickname = player.getSyncedMeta('NAME')
		let InRange = GetPlayersInRange(vec3, 10);
		InRange.forEach(target => {
			chat.send(target, `{c5a5de}${ICNickname.replace('_', ' ')} ${msg}`);
		});
		// logi
	});
	
	chat.registerCmd('do', (player, args) => {
		if (!args[0])
			return;
	
		let x = player.pos.x;
		let y = player.pos.y;
		let z = player.pos.z;
		let ICNickname = player.getSyncedMeta('NAME')
	
		let vec3 = new alt.Vector3(x, y, z);
		let msg = args.join(' ');
		let InRange = GetPlayersInRange(vec3, 10);
		InRange.forEach(target => {
			chat.send(target, `{8982bd} ${msg} ((${ICNickname.replace('_', ' ')})) `);
		});
		// logi
	});
	
	chat.registerCmd('c', (player, args) => {
		if (!args[0])
			return;
	
		let x = player.pos.x;
		let y = player.pos.y;
		let z = player.pos.z;
		let ICNickname = player.getSyncedMeta('NAME')
	
	
		let vec3 = new alt.Vector3(x, y, z);
		let msg = args.join(' ');
		let InRange = GetPlayersInRange(vec3, 3);
		InRange.forEach(target => {
			chat.send(target, `${ICNickname.replace('_', ' ')} szepcze: ${msg}`);
		});
		// logi
	});
	
	chat.registerCmd('b', (player, args) => {
		if (!args[0])
			return;
	
		let x = player.pos.x;
		let y = player.pos.y;
		let z = player.pos.z;
		let ICNickname = player.getSyncedMeta('NAME')
	
	
		let vec3 = new alt.Vector3(x, y, z);
		let msg = args.join(' ');
		let InRange = GetPlayersInRange(vec3, 10)
		InRange.forEach(target => {
			chat.send(target, ` {c2b6b2}${ICNickname.replace('_', ' ')} : (( ${msg} ))`);
		});
		// logi
	});
	
	
	chat.registerCmd('d', (player, args) => {
		if (!args[0])
			return;
		const getLSPDDuty = player.getSyncedMeta('Duty') == 'LSPD';
	
	
		if (!getLSPDDuty)
			return SendNotificationToPlayer(player, 'Nie należysz do grupy PD!');
	
	
	
		let ICNickname = player.getSyncedMeta('NAME')
		let msg = args.join(' ');
		alt.Player.all.forEach(target => {
			const getLSPDDuty = target.getSyncedMeta('Duty') == 'LSPD';
	
	
			if (getLSPDDuty)
				chat.send(target, `{325ea8}${ICNickname.replace('_', ' ')} : ${msg}`)
	
		});
	
	});
	
	
	
	
	chat.registerCmd('w', (player, args) => {
		if (!args[0] || !args[1])
			return SendNotificationToPlayer(player, 'TIP: /w [ID] [wiadomość]');
	
			const target = alt.Player.all.filter(p => p.name == args[0] || p.getSyncedMeta('ID') == parseInt(args[0]))
			if (!target || !target[0])
			return SendNotificationToPlayer(player, `Gracz nie istnieje.`);
			if (Array.isArray(target) && target.length >= 2)
       		return SendNotificationToPlayer(player,`Za duzo graczy jest o podobnym nicku, podaj dokladniej.`);
	
	
		let msg = args.slice(1).join(" ");
		target.forEach(drugi => { //.replace('_', ' ')
			chat.send(player, `{e0e02f}${player.getSyncedMeta('globalName').replace('_', ' ')} -> ${target[0].getSyncedMeta('globalName')} (${target[0].getSyncedMeta('ID')}): ${msg}`);
			chat.send(drugi, `{dea909}${player.getSyncedMeta('globalName').replace('_', ' ')} (${player.getSyncedMeta('ID')}) -> ${target[0].getSyncedMeta('globalName').replace('_', ' ')} : ${msg}`);
		});
		// logi
	});
	
	
	
	alt.onClient('doTheTeleport', (player, coords) => {
		player.pos = coords;
	});
	
	chat.registerCmd('tpwp', (player) => {
		alt.emitClient(player, 'triggerTP');
		SendNotificationToPlayer(player, 'Przeteleportowano cie do WayPointa.');
	});
	
	
	chat.registerCmd('settime', (player, arg) => {
		if (!arg[0]) return SendNotificationToPlayer(player, 'TIP: /settime godzina minuta freeze')
		if (isNaN(arg[0]) || isNaN(arg[1])) return SendNotificationToPlayer(player, 'Podana wartość czasu nie jest liczbą.')
		let hour = arg[0]
		let minute = arg[1]
		let freeze = arg[2]
		let hourconverted = parseInt(hour, 10);
		let minuteconverted = parseInt(minute, 10);
	
		if (freeze) {
			alt.emitClient(player, 'ChangeTime', hourconverted, minuteconverted, 'true');
			SendNotificationToPlayer(player, `Ustawiles czas na ${hour} : ${minute} oraz zatrzymałes czas.`);
	
		} else {
			alt.emitClient(player, 'ChangeTime', hourconverted, minuteconverted);
			SendNotificationToPlayer(player, `Ustawiles czas na ${hour} : ${minute}.`);
	
		}
	});
	
	
	chat.registerCmd('pb', (player) => {
		const getLSPDDuty = player.getSyncedMeta('Duty') == 'LSPD';
	
		if (!getLSPDDuty)
			return SendNotificationToPlayer(player, 'Nie należysz do grupy PD!');
	
		let ICNickname = player.getSyncedMeta('NAME');
		let x = player.pos.x;
		let y = player.pos.y;
		alt.Player.all.forEach(target => {
			const graczepd = target.getSyncedMeta('Duty') == 'LSPD';
	
			if (graczepd) {
				alt.emitClient(target, 'panicButton', x, y);
				chat.send(target, `{d91616}${ICNickname.replace('_', ' ')} użył przycisku paniki!`);
			}
		});
	});
	
	
	
	chat.registerCmd('szyba', (player) => {
	
	
		alt.emitClient(player, 'RollDownWindows');
		//chat.sendRP(player, 'Huj')
	
	
	});
	
	function DodatekDoBroni(player, args) {
		

		

		let addon = parseInt(args[0], 16)


		//const dodano = player.addWeaponComponent(player.currentWeapon, addon)
		alt.emitClient(player, 'addComponent', player.currentWeapon, addon)
		//chat.sendRP(player,`Pomyslnie dodano dodatek do broni.`)
	}
	
	
	chat.registerCmd('dodatek', DodatekDoBroni);



	//alt.emit('character:Edit', player);

	chat.registerCmd('pd', (player, args) => {

		if (args[0] == 'usun'){
			player.deleteSyncedMeta('Duty')
			SendNotificationToPlayer(player, 'Usunieto Duty PD.');
			
  let index = PlayersPD.findIndex(x => x === player);
  if (index !== -1)
    PlayersPD.splice(index, 1);
			alt.emitClient(player, 'player:deleteBlipPlayers')
			return
		  }

		const getLSPDDuty = player.getSyncedMeta('Duty') == 'LSPD';
		if (getLSPDDuty)
		  return SendNotificationToPlayer(player, 'Posiadasz już włączoną grupę LSPD, wpisz /pd usun aby wyłączyć.');
	
		player.setSyncedMeta('Duty', 'LSPD');
		SendNotificationToPlayer(player, `Włączyłeś duty LSPD.`)
		PlayersPD.push(player);

		alt.Player.all.forEach(target => {
			const graczepd = target.getSyncedMeta('Duty') == 'LSPD';
			if (graczepd){

				console.log(PlayersPD)
				alt.emitClient(target, 'player:deleteBlipPlayers')

				alt.emitClient(target, 'CreateBlipsForLSPD', {
					players: PlayersPD,
				  });

			} 
		});
	  
	  })
	  

	//  alt.on("syncedMetaChange", (entity, meta, value) => {
	//	if(entity instanceof alt.Player) {
	//	  if(meta === "Duty") {
			  	//		if (value === undefined) {
						//	 // console.log(value)
						//	let index = PlayersPD.findIndex(x => x === entity);
							////if (index !== -1)
								//	  PlayersPD.splice(index, 1);
									///  alt.Player.all.forEach(target => {
									//	  const graczepd = target.getSyncedMeta('Duty') == 'LSPD';
										 // if (graczepd){
						  
											//  alt.emitClient(target,'player:deleteBlipPlayers')
											 // alt.emitClient(target, 'CreateBlipsForLSPD', {
											//	  players: PlayersPD,
											//	});
										//  }
									 // });
								//	}
									  
									  
						 // }
		
		//}
	  //});