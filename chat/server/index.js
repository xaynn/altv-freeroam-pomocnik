import * as alt from "alt-server";

let cmdHandlers = {};
let mutedPlayers = new Map();

let colorForRank 
function getColorForRank(player){
  let rank = player.getMeta('adminlevel');
  //console.log(rank);
  switch (rank) {
      case 1:
        colorForRank = `{0873ff}`;
          return colorForRank;
      case 2:
        colorForRank = `{4deb00}`;
          return colorForRank;
      case 3:
        colorForRank = `{d63e36}`;
          return colorForRank;
      case 4:
        colorForRank = `{d63e36}`;
          return colorForRank;
      default:
        colorForRank = `{ffffff}`
          return colorForRank;
      //console.log("Nie posiada zadnej rangi.");
  }

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
	let done 
function getTitleAdmin(player) {
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

function invokeCmd(player, cmd, args) {
  cmd = cmd.toLowerCase();
  const callback = cmdHandlers[cmd];
  if (!player.getSyncedMeta('globalName')) return;
  if (callback) {
    callback(player, args);
  } else {
    send(player, `{FF0000} Unknown command /${cmd}`);
  }
}

alt.onClient("chat:message", (player, msg) => {
  if (!player.getSyncedMeta('globalName')){
    return;
  }
  if (msg[0] === "/") {
    msg = msg.trim().slice(1);

    if (msg.length > 0) {
      alt.log("[chat:cmd] " + player.name + ": /" + msg);

      let args = msg.split(" ");
      let cmd = args.shift();

      invokeCmd(player, cmd, args);
    }
  } else {
    if (mutedPlayers.has(player) && mutedPlayers[player]) {
      send(player, "a You are currently muted.");
      return;
    }

    msg = msg.trim();

    if (msg.length > 0) {
      alt.log("[chat:msg] " + player.name + ": " + msg);
      let world = player.dimension;
        let xd = getPlayersInDimension(world)
  
  
        

      xd.forEach(target => { 
        send(target,`[WORLD:${world}] ${getColorForRank(player)}${getTitleAdmin(player)} {e1e8e3}${player.getSyncedMeta('globalName')} [${player.getSyncedMeta('ID')}]: `+ msg)
}); // koniec loopy
      //alt.emitClient(null, "chat:message", player.name, msg.replace(/</g, "&lt;").replace(/'/g, "&#39").replace(/"/g, "&#34"));
    }
  }
});

export function send(player, msg) {
  alt.emitClient(player, "chat:message", null, msg);
}

export function broadcast(msg) {
  send(null, msg);
}

export function registerCmd(cmd, callback) {
  cmd = cmd.toLowerCase();

  if (cmdHandlers[cmd] !== undefined) {
    alt.logError(`Failed to register command /${cmd}, already registered`);
  } else {
    cmdHandlers[cmd] = callback;
  }
}

export function mutePlayer(player, state) {
  mutedPlayers.set(player, state);
}

// Used in an onConnect function to add functions to the player entity for a seperate resource.
export function setupPlayer(player) {
  player.sendMessage = (msg) => {
    send(player, msg);
  };

  player.mute = (state) => {
    mutePlayer(player, state);
  };
}

// Arbitrary events to call.
alt.on("sendChatMessage", (player, msg) => {
  alt.logWarning("Usage of chat events is deprecated use export functions instead");
  send(player, msg);
});

alt.on("broadcastMessage", (msg) => {
  alt.logWarning("Usage of chat events is deprecated use export functions instead");
  send(null, msg);
});


alt.onClient('ChangeValueForChat', (player,state) => {
  if (state) {
  player.setSyncedMeta('Chatting', 'true');
  } else 
  player.deleteSyncedMeta('Chatting')
});