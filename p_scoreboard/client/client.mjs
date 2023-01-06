import * as alt from 'alt-client';

const playerList = {
  isLoaded: false,
  isShowed: false,
  view: null
};

alt.on('connectionComplete', () => {
  playerList.view = new alt.WebView('http://resource/client/view/index.html');
  playerList.view.on('playersList:loaded', () => {
    playerList.isLoaded = true;
    alt.emitServer('playersList:getOptions');
  });

  playerList.view.on('playersList:optionExecute', (id, optionName) => {
    alt.emitServer('playersList:optionExecute', id, optionName);
  });
});

alt.on('keydown', (key) => {
  if (key === 0xC0 && playerList.isLoaded) {
    if (playerList.isShowed) {
      playerList.view.emit('playersList:hide');
      playerList.isShowed = false;
      playerList.view.unfocus();
      //alt.showCursor(false);
     // alt.toggleGameControls(true);
    } else {
      playerList.view.emit('playersList:show');
      alt.emitServer('playersList:getPlayers');
      playerList.isShowed = true;
      playerList.view.focus();
      //alt.showCursor(true);
      //alt.toggleGameControls(false);
    }
  }
});

alt.onServer('playersList:setPlayers', (data) => {
  if (playerList.isLoaded) {
    playerList.view.emit('playersList:setPlayers', data);
  }
});

alt.onServer('playersList:setOptions', (options) => {
  if (playerList.isLoaded) {
    playerList.view.emit('playersList:setOptions', options);
  }
});
