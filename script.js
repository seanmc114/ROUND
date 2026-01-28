/* =========================================
   ROUND — Stable Home + Tiles + Progress
   ========================================= */

const THEMES = [
  {
    id: "school",
    title: "My School",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    total: 50
  },
  {
    id: "family",
    title: "Family & Friends",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    total: 50
  },
  {
    id: "town",
    title: "My Town",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
    total: 50
  },
  {
    id: "freetime",
    title: "Free Time",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    total: 50
  }
];

function loadProgress() {
  return JSON.parse(localStorage.getItem("round-progress") || "{}");
}

function saveProgress(p) {
  localStorage.setItem("round-progress", JSON.stringify(p));
}

function renderHome() {
  const app = document.getElementById("app");
  if (!app) {
    document.body.innerHTML = "<h1>APP ROOT MISSING</h1>";
    return;
  }

  const progress = loadProgress();

  app.innerHTML = `
    <div style="padding:20px">
      <h1 style="margin-bottom:10px">ROUND</h1>
      <p style="opacity:.7;margin-bottom:20px">Turn the cogs. Build the answer.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
        ${THEMES.map(t => {
          const done = progress[t.id] || 0;
          const pct = Math.min(100, Math.round((done / t.total) * 100));
          return `
            <div onclick="startTheme('${t.id}')"
                 style="
                   height:160px;
                   background-image:url('${t.image}');
                   background-size:cover;
                   background-position:center;
                   border-radius:16px;
                   cursor:pointer;
                   position:relative;
                   overflow:hidden;
                 ">
              <div style="
                position:absolute;
                inset:0;
                background:rgba(0,0,0,.45);
                color:white;
                padding:14px;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
              ">
                <div>
                  <h2 style="margin:0">${t.title}</h2>
                  <div style="font-size:14px;opacity:.8">⚙️ ⚙️ ⚙️</div>
                </div>
                <div>
                  <div style="height:8px;background:rgba(255,255,255,.3);border-radius:6px">
                    <div style="height:8px;width:${pct}%;background:#4ade80;border-radius:6px"></div>
                  </div>
                  <div style="font-size:12px;margin-top:4px">${done} / ${t.total}</div>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function startTheme(id) {
  const p = loadProgress();
  p[id] = (p[id] || 0) + 1;
  saveProgress(p);
  alert("Level start → Coach & game logic hook here");
  renderHome();
}

document.addEventListener("DOMContentLoaded", renderHome);
