(function(){
  "use strict";

  // --- THEMES (minimal, safe) ---
  const THEMES = [
    { id: "myself", label: "Myself", image: "img/myself.png" },
    { id: "family", label: "Family & Friends", image: "img/family.png" },
    { id: "home", label: "Home", image: "img/home.png" }
  ];

  // --- HOME RENDER (diagnostic version) ---
  function renderHome(){
    const app = document.getElementById("app");

    if(!app){
      alert("NO #app FOUND");
      return;
    }

    // Force visible output
    app.innerHTML = `
      <h2 style="color:red; margin:20px 0;">RENDER HOME RAN</h2>
      <div class="tile-grid">
        ${THEMES.map(t => `
          <div class="tile" style="border:2px solid red; padding:12px; margin:10px;">
            <strong>${t.label}</strong>
          </div>
        `).join("")}
      </div>
    `;
  }

  // --- RUN ON LOAD ---
  document.addEventListener("DOMContentLoaded", renderHome);

})();
