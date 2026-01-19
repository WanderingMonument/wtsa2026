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
    apiKey: 'API_KEY_GOES_HERE',
    baseURL: 'https://api.voidai.app/v1',
    dangerouslyAllowBrowser: true
});

async function takeScreenshot() {

    // takes in images encoded in base64 to be displayed
    const image = await igniteView.commandBridge.screenshot();
    document.querySelector("#ss-image").src = "data:image/jpeg;base64," + image;
    document.getElementById("voidai-result").textContent = "";

    // sends an http request to voidai with the image data
    const response = await client.chat.completions.create({
        model: 'gpt-5.1',
        messages: [
            { role: 'system', content: 'You are a helpful assistant designed to describe the contents of screenshots provided to you for accessibility purposes. Keep the responses somewhat brief.' },
            {
                role: 'user', content: [
                    { "type": "text", "text": "Describe this screenshot" },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "data:image/jpeg;base64," + image
                        }
                    }
                ]
            }
        ]
    });

    document.getElementById("voidai-result").textContent = response.choices[0].message.content;

}

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#screenshot").onclick = function () {
        takeScreenshot();
    };
});