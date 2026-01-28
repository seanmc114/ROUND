/* =========================================================
   ROUND — Home, Themes, Progress, Launch
   Clean, safe foundation for JC language practice
   ========================================================= */

/* ---------- CONFIG ---------- */

const THEMES = [
  {
    id: "myself",
    title: "Myself & My World",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    levels: 10
  },
  {
    id: "school",
    title: "My School",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    levels: 10
  },
  {
    id: "family",
    title: "Family & Friends",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    levels: 10
  },
  {
    id: "town",
    title: "My Town / Area",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
    levels: 10
  },
  {
    id: "freetime",
    title: "Free Time & Hobbies",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    levels: 10
  },
  {
    id: "food",
    title: "Food & Daily Life",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    levels: 10
  },
  {
    id: "travel",
    title: "Holidays & Travel",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    levels: 10
  },
  {
    id: "health",
    title: "Health & Wellbeing",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    levels: 10
  }
];

const QUESTIONS_PER_LEVEL = 5;

/* ---------- STATE ---------- */

const STATE = {
  currentTheme: null,
  currentLevel: null
};

/* ---------- STORAGE ---------- */

function loadProgress() {
  return JSON.parse(localStorage.getItem("round-progress") || "{}");
}

function saveProgress(p) {
  localStorage.setItem("round-progress", JSON.stringify(p));
}

/* ---------- HOME RENDER ---------- */

function renderHome() {
  const root = document.getElementById("app");
  root.innerHTML = `
    <div class="home">
      <div class="crest-watermark"></div>
      <h1 class="home-title">ROUND</h1>
      <p class="home-sub">Turn the cogs. Build the answer.</p>
      <div class="tile-grid" id="tileGrid"></div>
    </div>
  `;

  const grid = document.getElementById("tileGrid");
  const progress = loadProgress();

  THEMES.forEach(theme => {
    const completed = progress[theme.id] || 0;
    const totalQs = theme.levels * QUESTIONS_PER_LEVEL;
    const pct = Math.round((completed / totalQs) * 100);

    const tile = document.createElement("div");
    tile.className = "theme-tile";
    tile.style.backgroundImage = `url(${theme.image})`;

    tile.innerHTML = `
      <div class="tile-overlay">
        <h2>${theme.title}</h2>
        <div class="cog-row">⚙️ ⚙️ ⚙️</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="progress-text">${completed} / ${totalQs}</div>
      </div>
    `;

    tile.onclick = () => startTheme(theme.id);
    grid.appendChild(tile);
  });
}

/* ---------- THEME / LEVEL ---------- */

function startTheme(themeId) {
  STATE.currentTheme = themeId;
  STATE.currentLevel = 1;
  startLevel();
}

function startLevel() {
  const root = document.getElementById("app");
  root.innerHTML = `
    <div class="level">
      <div class="coach-header">
        <img src="coach.svg" class="coach-avatar" />
        <div class="coach-line">Let’s turn this cog.</div>
      </div>
      <div class="question-box">
        <p><b>Question ${STATE.currentLevel} / 10</b></p>
        <p>Write a short paragraph on the topic.</p>
        <textarea placeholder="Type your answer here..."></textarea>
        <button id="submitBtn">Submit</button>
      </div>
    </div>
  `;

  document.getElementById("submitBtn").onclick = completeQuestion;
}

/* ---------- PROGRESS ---------- */

function completeQuestion() {
  const progress = loadProgress();
  const theme = STATE.currentTheme;

  progress[theme] = (progress[theme] || 0) + 1;
  saveProgress(progress);

  STATE.currentLevel++;
  if (STATE.currentLevel > 10) {
    renderHome();
  } else {
    startLevel();
  }
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", renderHome);
