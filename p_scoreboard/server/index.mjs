import * as alt from 'alt-server';

function getPlayerWorld(player) {

  let world = player.dimension
  if (world > 0) {
    world = 'Other World'
  }else{
    world = player.dimension

  }
  //console.log(world)
  return world
}

//console.log(getPlayerWorld())

alt.onClient('playersList:getPlayers', (player) => {
  alt.emitClient(player, 'playersList:setPlayers', alt.Player.all.map(player => ({
    id: player.getSyncedMeta('ID'),
    name: player.getSyncedMeta('globalName'),
    ping: player.ping,
    world: getPlayerWorld(player) 
  })));
});

alt.onClient('playersList:optionExecute', (_, id, optionName) => {
  const player = alt.Player.all.find(player => player.id === id);

  if (player) {
    options[optionName].execute(player);
  }
});
