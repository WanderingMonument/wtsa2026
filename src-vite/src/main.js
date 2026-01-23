/*import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

 Vite allows for dynamic content like this, may be of use to ya. you can read more on the Vite guides
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))


*/

import OpenAI from "openai";

const client = new OpenAI({
    apiKey: 'sk-voidai-loahJybpl-oBGcFwZRf4d6OuxFnqOLHkjn9g5dU1M-0j-EJcchiaLtdLiue3EcKmidGv6gufPWowkaTJvg6uWi00zFOvynUReFrwNHNBVjKBWhKYVSXsFtUmWj-MmnE_6pM1Ow',
    baseURL: 'https://api.voidai.app/v1',
    dangerouslyAllowBrowser: true
});

async function takeScreenshot() {

    // takes in images encoded in base64 to be displayed
    const image = await igniteView.commandBridge.screenshot();
    document.querySelector("#ss-image").src = "data:image/jpeg;base64," + image;
    document.getElementById("voidai-result").textContent = "generatng";

    // sends an http request to voidai with the image data
    try {
        const response = await fetch("https://long-dew-6497.echorw927-c17.workers.dev/", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: image,
        });

        const responseText = await response.text();

        document.getElementById("voidai-result").textContent = responseText;

        var msg = new SpeechSynthesisUtterance(responseText);

        if (document.getElementById("morning").checked) {
            window.speechSynthesis.speak(msg);
        }
        
    }
    catch(error) {
        document.getElementById("voidai-result").textContent = error;
    }
    

}

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#screenshot").onclick = function () {
        takeScreenshot();
    };
});