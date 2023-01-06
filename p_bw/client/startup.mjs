import * as alt from 'alt';
import * as native from 'natives';
let webView = null;
console.log('p_bw -> loaded')
let bw = false
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

//alt.onServer("p->ShowBWGui", () => { //stare


        //alt.showCursor(true);
       // alt.toggleGameControls(false);

      //  webView = new alt.WebView("http://resource/client/html/bw.html");
      //  webView.focus();

        //webView.on("bw:trigger", () => {
         //   alt.emitServer("bw:respawnplayer");
        //});
//});
alt.onServer("p->ShowBWGui", () => { 
bw = true
alt.toggleGameControls(false);
native.displayRadar(false);
//console.log(bw)
});

alt.on('keydown', (key) => {
    if (bw == true)
    if (key == 'E'.charCodeAt(0)) {
        alt.emit('p_ac->UpdateStatistic', 200);
        alt.emitServer("bw:respawnplayer");
    }
   
  });

 const DrawTextForRevive = alt.everyTick(() => {
     if (bw == true) {
        drawText(`Aby sie zrespic uzyj klawisza ~r~E  ` , 0.48, 0.90, 0.4, 4, 255, 255, 255, 255, true);

     }
  
});
//trigger client
alt.onServer("bw:end", () => {
        
    //webView.destroy();
    native.setPedSuffersCriticalHits(alt.Player.local.scriptID,false)
    //alt.showCursor(false)
    alt.toggleGameControls(true);
    native.displayRadar(true);
    bw = false
    //webView = false;

});