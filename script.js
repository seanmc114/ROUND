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

  // =========================
  // HOME RENDER (FORCED TILES)
  // =========================
  function renderHome(){
    const app = document.getElementById("app");
    if(!app) return;

    app.innerHTML = `
      <div style="
        display:grid;
        grid-template-columns:repeat(3, 1fr);
        gap:20px;
        padding:20px;
      ">
        ${THEMES.map(t => `
          <div style="
            cursor:pointer;
            border-radius:14px;
            overflow:hidden;
            background:#ffffff;
            box-shadow:0 12px 28px rgba(0,0,0,.15);
            transition:transform .15s ease, box-shadow .15s ease;
          " onclick="alert('Theme selected: ${t.label}')">
            
            <div style="
              height:140px;
              background-image:url('${t.image}');
              background-size:cover;
              background-position:center;
            "></div>

            <div style="
              padding:14px;
              font-weight:700;
              text-align:center;
              font-size:1rem;
            ">
              ${t.label}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

 
