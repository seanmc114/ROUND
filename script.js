(function(){
  "use strict";

// Replace the LEVEL_INFO/THEMES generation with an explicit THEMES array:
const THEMES = [
  { id: "myself", idx: 0, label: "Myself", hint: "Describe yourself", icon: "🧍", image: "img/myself.png" },
  { id: "family", idx: 1, label: "Family & Friends", hint: "Describe your family and friends", icon: "👪", image: "img/family.png" },
  { id: "home", idx: 2, label: "Home", hint: "Describe your home/room", icon: "🏠", image: "img/home.png" },
  // ... add the rest of your theme objects here
];

// Recreate THEME_BY_ID (code relies on it)
const THEME_BY_ID = Object.fromEntries(THEMES.map(t => [t.id, t]));
function renderHome(){
  const app = document.getElementById("app");
  if(!app) return;

  app.innerHTML = `
    <div class="tile-grid">
      ${THEMES.map(t => `
        <div class="tile" onclick="alert('Clicked: ${t.title}')">
          <div class="tile-img" style="background-image:url('${t.image}')"></div>
          <div class="tile-title">${t.label}</div>
        </div>
      `).join("")}
    </div>
  `;
}
document.addEventListener("DOMContentLoaded", renderHome);


})();
