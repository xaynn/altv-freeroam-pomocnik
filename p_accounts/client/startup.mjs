import * as alt from 'alt';
import * as native from 'natives';


let webViewAuth = null;
let webViewAuthCam = null;

let blocked = false

//const checkbutton = alt.setInterval(() => {
//if (blocked){
//blocked = false
//}

//}, 4000);

alt.onServer("client:notification:show", notifyShow);

export function notifyShow (
    message,
    flashing = false,
    textColor = -1,
    bgColor = -1,
    flashColor = [0, 0, 0, 50]
) {
    native.beginTextCommandThefeedPost('STRING');
    if (textColor > -1) native.setColourOfNextTextComponent(textColor);
	if (bgColor > -1) native.thefeedSetNextPostBackgroundColor(bgColor);
	if (flashing) {
		native.thefeedSetAnimpostfxColor(
			flashColor[0],
			flashColor[1],
			flashColor[2],
			flashColor[3]
		);
	}
    native.addTextComponentSubstringPlayerName(message);
    native.endTextCommandThefeedPostTicker(flashing, true);
}
let ms
alt.onServer("p->accounts:ShowPanel", () => {
    if (webViewAuth == null) {
        const camPosition = { x: 450.718, y: 5566.614, z: 806.183 };
        const webViewAuthCam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', 0, 0, 0, 0, 0, 0, 10, false, 2);
        const getPointAt = (pos, angle) => { const p = {x: 0, y: 0}; let s = Math.sin(angle); let c = Math.cos(angle); p.x -= pos.x; p.y -= pos.y; let xnew = p.x * c - p.y * s; let ynew = p.x * s + p.y * c; p.x = xnew + pos.x; p.y = ynew + pos.y; return p; };
        let angle = 0;
        const interval = alt.setInterval(() => { const np = camPosition; const p  = getPointAt(np, angle); native.setCamCoord(webViewAuthCam, p.x + camPosition.x, p.y + camPosition.x, camPosition.z); native.pointCamAtCoord(webViewAuthCam, camPosition.x, camPosition.y, camPosition.z); angle += 0.00007; }, 16.666667);
        
        native.setCamActive(webViewAuthCam, true);
        native.renderScriptCams(true, true, 16.6667, false, false, 0);
        native.newLoadSceneStartSphere(camPosition.x, camPosition.y, camPosition.z, 500, 0);
        native.displayRadar(false);

        alt.showCursor(true);
        alt.toggleGameControls(false);

        webViewAuth = new alt.WebView("http://resource/client/html/auth.html");
        webViewAuth.focus();

        webViewAuth.on("client:auth:login:send:data", (account_name, account_password) => {
            if (Date.now() - ms < 4000) return notifyShow('Poczekaj chwile przed nastepna proba zalogowania sie badz rejestracji.', true); ms = Date.now()


            //console.log(ms)
            //if (blocked) return notifyShow('Poczekaj chwile przed nastepna proba zalogowania sie badz rejestracji.')
            alt.emitServer("server:auth:validate:data", account_name, account_password);
            //console.log('zablokowano')

            //blocked = true

            
        });

        webViewAuth.on("client:auth:register:send:data", (account_name, account_password) => {
            if (Date.now() - ms < 4000) return notifyShow('Poczekaj chwile przed nastepna proba zalogowania sie badz rejestracji.', true); ms = Date.now()


            //console.log(ms)
            //if (blocked) return notifyShow('Poczekaj chwile przed nastepna proba zalogowania sie badz rejestracji.')
            alt.emitServer("server:auth:register:data", account_name, account_password);
           // console.log('zablokowano')

            //blocked = true

        });
		alt.onServer("client:auth:success", () => {
			webViewAuth.destroy();

			alt.showCursor(false)
			alt.toggleGameControls(true);
			alt.clearInterval(interval);

			native.renderScriptCams(false, false, 0, true, false, 0);
			native.destroyCam(webViewAuthCam, true);
			native.setFollowPedCamViewMode(1);
			native.clearFocus();
			native.newLoadSceneStop();
			native.displayRadar(true);

			//@replaces colors
			native.replaceHudColourWithRgba(142, 255, 255, 33, 255);
			native.replaceHudColourWithRgba(143, 255, 255, 33, 255);
			native.replaceHudColourWithRgba(144, 255, 255, 33, 255);
			native.replaceHudColourWithRgba(145, 255, 255, 33, 255);
            //alt.clearInterval(checkbutton);
            //blocked = false

		});
    }
});


function drawError(title, text, text2) {
    alt.addGxtText('warning_error', title);
    alt.addGxtText('warning_text', text);
    alt.addGxtText('warning_text2', text2);

    const tick = alt.everyTick(() => {
        native.setWarningMessageWithHeader('warning_error', 'warning_text', 0, 'warning_text2', false, -1, 0, 0, true, 0);
    });
     {
        //alt.clearInterval(timeout);
        //alt.clearEveryTick(tick);
    };
}
//drawError('', 'Twoj serial jest zbanowany', '')
alt.onServer("Banned:Notification", drawError);
