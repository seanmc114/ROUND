/* =====================================================
   ROUND — Bright Game Tiles + Progress + Play Loop
   ===================================================== */

/* ---------- THEMES (Junior Cycle aligned) ---------- */

const THEMES = [
  {
    id: "myself",
    title: "Myself",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "family",
    title: "Family & Friends",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "freetime",
    title: "Free Time",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "school",
    title: "School",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "food",
    title: "Food & Daily Life",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "health",
    title: "Health & Wellbeing",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "home",
    title: "My Home",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "town",
    title: "My Town",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "travel",
    title: "Holidays & Travel",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "future",
    title: "Future Plans",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
  }
];

const LEVELS_PER_THEME = 10;

/* ---------- STATE ---------- */

let STATE = {
  theme: null,
  level: 1,
  startTime: null
};

/* ---------- PROGRESS ---------- */

function loadProgress() {
  return JSON.parse(localStorage.getItem("round-progress") || "{}");
}

function saveProgress(p) {
  localStorage.setItem("round-progress", JSON.stringify(p));
}

/* ---------- HOME (TILES) ---------- */

function renderHome() {
  const app = document.getElementById("app");
  const progress = loadProgress();

  app.innerHTML = `
    <div class="tile-grid">
      ${THEMES.map(t => {
        const done = progress[t.id] || 0;
        const pct = Math.round((done / LEVELS_PER_THEME) * 100);

        return `
          <div class="tile"
               style="background-image:url('${t.image}')"
               onclick="startTheme('${t.id}')">
            <div class="tile-content">
              <div>
                <h2>${t.title}</h2>
                <div class="cogs">⚙️ ⚙️ ⚙️</div>
              </div>
              <div>
                <div class="progress">
                  <div class="progress-fill" style="width:${pct}%"></div>
                </div>
                <div class="progress-text">
                  ${done} / ${LEVELS_PER_THEME} levels
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

/* ---------- GAME LOOP ---------- */

function startTheme(themeId) {
  STATE.theme = themeId;
  STATE.level = 1;
  startLevel();
}

function startLevel() {
  STATE.startTime = Date.now();
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="level-screen">
      <h2>${STATE.theme.toUpperCase()} — Level ${STATE.level}</h2>
      <p>Write a short paragraph.</p>
      <textarea placeholder="Go on… put something down."></textarea>
      <button onclick="submitAnswer()">Submit</button>
    </div>
  `;
}

function submitAnswer() {
  const timeTaken = Date.now() - STATE.startTime;

  // 🔑 Coach logic hooks in here (gold preserved)
  const passed = Math.random() > 0.35;

  if (passed) {
    const p = loadProgress();
    p[STATE.theme] = (p[STATE.theme] || 0) + 1;
    saveProgress(p);
    alert("Coach: Good. That cog turned.");
  } else {
    alert("Coach: That cog slipped. Gym time.");
  }

  renderHome();
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", renderHome);
