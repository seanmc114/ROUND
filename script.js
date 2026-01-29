(function(){
  "use strict";

  // =========================
  // THEMES (Home Screen Tiles)
  // =========================
  const THEMES = [
    { id: "myself", label: "Myself", image: "img/myself.png" },
    { id: "family", label: "Family & Friends", image: "img/family.png" },
    { id: "home", label: "Home", image: "img/home.png" },
    { id: "school", label: "School", image: "img/school.png" },
    { id: "freetime", label: "Free Time", image: "img/freetime.png" },
    { id: "food", label: "Food & Daily Life", image: "img/food.png" },
    { id: "health", label: "Health & Wellbeing", image: "img/health.png" },
    { id: "town", label: "My Town", image: "img/town.png" },
    { id: "travel", label: "Holidays & Travel", image: "img/travel.png" }
  ];

  // =================================
  // HOME RENDER (Tiles Screen)
  // =================================
  function renderHome(){
    const app = document.getElementById("app");
    if(!app) return;

    app.innerHTML = `
      <div class="tile-grid">
        ${THEMES.map(t => `
          <div class="tile" data-theme="${t.id}">
            <div class="tile-img" style="background-image:url('${t.image}')"></div>
            <div class="tile-title">${t.label}</div>
          </div>
        `).join("")}
      </div>
    `;

    // Temporary click handler (safe placeholder)
    document.querySelectorAll(".tile").forEach(tile => {
      tile.addEventListener("click", () => {
        alert("Theme selected: " + tile.dataset.theme);
      });
    });
  }

  // =========================
  // BOOT
  // =========================
  document.addEventListener("DOMContentLoaded", renderHome);

})();
