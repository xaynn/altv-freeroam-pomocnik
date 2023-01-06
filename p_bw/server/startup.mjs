import * as alt from 'alt';
import * as chat from 'chat';
import * as p_core from 'p_core'




function onDeath(player){
let HaveBW = player.getMeta('BWMODE')
//console.log('czy ma bw?')
if (HaveBW){
    player.setSyncedMeta('Dead', true)
    //console.log('ma wiec trigger')
    alt.emitClient(player,'p->ShowBWGui')
   //console.log('triggered')
    //wyswietlenie gui
}else{
    const x = alt.setTimeout(() => {
        player.spawn(-29.84, -1573.50, 29.313, 0);
        player.model = 'mp_m_freemode_01';
        player.health = 200;
        player.clearBloodDamage();
        alt.emitClient(player,'p_ac->UpdateStatistic', 200)


    }, 200);

}
}
alt.on('playerDeath', onDeath);


function HandleDamage(victim){
    if (!victim || !victim.valid)
    return;
    
    if (victim.getSyncedMeta('creatingCharacter')) 
    return;


  const GotDamage = victim.getMeta('GotDamage');
  if (GotDamage)
    return;

  victim.setSyncedMeta('GotDamage', 'true');
  setTimeout(() => {
    victim.deleteSyncedMeta('GotDamage');
  }, 2000);
}
alt.on('playerDamage', HandleDamage)

alt.onClient("bw:respawnplayer", (player) => {
    player.spawn(player.pos.x, player.pos.y, player.pos.z, 0);
    player.clearBloodDamage();
    p_core.giveAllWeapons(player)
  
    player.deleteSyncedMeta('Dead');
    player.giveWeapon(player.getMeta('SlotWeapon'), 999, true);
    alt.emitClient(player, 'bw:end')

});

alt.on('playerWeaponChange', (player, oldWeapon, weapon) => {
    const currentWeapon = player.currentWeapon;
    player.setMeta('SlotWeapon', currentWeapon)
  
  });
  //alt.log('Loaded p_bw')
//console.log('Loaded p_bw')