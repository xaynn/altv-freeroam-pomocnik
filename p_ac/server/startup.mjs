import * as alt from 'alt';
import * as chat from 'chat';
import colors from 'colors'
//import { sendWebHook, sendWebHookAsync } from "p_webhook";

import db from '../../p_db/server/db.mjs'

import * as p_adminutils from 'p_adminutils'



const TableDmgWeapon = {
    "-1716589765": 183,
    "453432689": 26,
    "3219281620": 32,
    "-1076751822": 28,
    "-771403250": 40,
    "1593441988": 27,
    "137902532": 34,
    "584646201": 25,
    "911657153": 1,
    "736523883": 22,
    "2024373456": 25,



    

}

//console.log(TableDmgWeapon["-1716589765"])
//"pistol50": -1716589765, DMG: 51,

//console.log(weapons["pistol50"].DMG[0])

const weapons = {
    // melee

    // pistols

  
    // machine guns
    "microsmg": 324215364, DMG: 100,
    "machinepistol": -619010992, DMG: 100,
    "smg": 736523883, DMG: 100,
    "smgmk2": 2024373456, DMG: 100,
    "assaultsmg": -270015777, DMG: 100,
    "combatpdw": 171789620, DMG: 100,
    "mg": -1660422300, DMG: 100,
    "combatmg": 2144741730, DMG: 100,
    "combatmgmk2": 3686625920, DMG: 100,
    "gusenberg": 1627465347, DMG: 100,
    "minismg": -1121678507, DMG: 100,
    // assault rifles
    "assaultrifle": -1074790547, DMG: 100,
    "assaultriflemk2": 961495388, DMG: 100,
    "carbinerifle": -2084633992, DMG: 100,
    "carbineriflemk2": 4208062921, DMG: 100,
    "advancedrifle": -1357824103, DMG: 100,
    "specialcarbine": -1063057011, DMG: 100,
    "bullpuprifle": 2132975508, DMG: 100,
    "compactrifle": 1649403952, DMG: 100,
    // snipers
    "sniperrifle": 100416529, DMG: 100,
    "heavysniper": 205991906, DMG: 100,
    "heavysnipermk2": 177293209, DMG: 100,
    "marksmanrifle": -952879014, DMG: 100,
    // shotguns
    "pumpshotgun": 487013001, DMG: 100,
    "sawnoffshotgun": 2017895192, DMG: 100,
    "bullpupshotgun": -1654528753, DMG: 100,
    "assaultshotgun": -494615257, DMG: 100,
    "musket": -1466123874, DMG: 100,
    "heavyshotgun": 984333226, DMG: 100,
    "doublebarrelshotgun": -275439685, DMG: 100,
    "autoshotgun": 317205821, DMG: 100,
    // heavy weapons
    "grenadelauncher": -1568386805, DMG: 100,
    "rpg": -1312131151, DMG: 100,
    "minigun": 1119849093, DMG: 100,
    "firework": 2138347493, DMG: 100,
    "railgun": 1834241177, DMG: 100,
    "hominglauncher": 1672152130, DMG: 100,
    "grenadelaunchersmoke": 1305664598, DMG: 100,
    "compactlauncher": 125959754, DMG: 100,
    // thrown
    "grenade": -1813897027, DMG: 100,
    "stickybomb": 741814745, DMG: 100,
    "proximitymine": -1420407917, DMG: 100,
    "bzgas": -1600701090, DMG: 100,
    "molotov": 615608432, DMG: 100,
    "fireextinguisher": 101631238, DMG: 100,
    "petrolcan": 883325847, DMG: 100,
    "flare": 1233104067, DMG: 100,
    "ball": 600439132, DMG: 100,
    "snowball": 126349499, DMG: 100,
    "pipebomb": -1169823560, DMG: 100,
}
//player.giveWeapon(weapons[weaponName], 999, true);




function HandleDamage(victim, attacker, weapon, healthDamage, armourDamage){



    if (!victim || !victim.valid)
    return;
    if (victim.getSyncedMeta('creatingCharacter')) return;

    if (attacker && weapon){
      alt.log(weapon)
      alt.log(healthDamage)
    }

    let hpPlayer = victim.health;

    alt.emitClient(victim,'p_ac->UpdateStatistic', hpPlayer)



}
alt.on('playerDamage', HandleDamage)

let detection = "Unknown"

function getDetection(detectioncode) {
  switch (detectioncode) {
    case 1312:
      detection = 'Health Cheat'
      break;
    case 1313:
      detection = 'Godmode Cheat'
      break;
    case 1314:
      detection = 'Super Jump'
      break;
    default:
      detection = 'Unknown'

  }
  //console.log(detection)
 // console.log(detectioncode)
  return detection;
}





alt.onClient('p_ac->BanPlayerForCheating', (player, whatdetected) => {
    let globalPlayer = player.getSyncedMeta('globalName')
    let detectionType = getDetection(whatdetected)
    p_adminutils.addServerLog('AntiCheat', `Zkickowano gracza ${globalPlayer} z powodu ${detectionType}`)

  player.kick(`[AntiCheat] Detected cheat: #${whatdetected}`)
  
  });