// src/main.js
var { invoke } = window.__TAURI__.core;
var greetInputEl;
var greetMsgEl;
async function greet() {
  greetMsgEl.src = await invoke("greet");
}
window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#ss-image");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});
