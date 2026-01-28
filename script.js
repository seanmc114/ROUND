/* =========================================
   ROUND — Internal Logic Improved
   (UI, tiles, flow preserved)
   ========================================= */

/* ---------- CONFIG ---------- */

const GAME_NAME = "ROUND";
const LEVELS_PER_THEME = 10;

/* ---------- THEMES (unchanged) ---------- */

const THEMES = [
  { id: "myself", title: "Myself", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80" },
  { id: "family", title: "Family & Friends", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80" },
  { id: "freetime", title: "Free Time", image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1200&q=80" },
  { id: "school", title: "School", image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80" },
  { id: "food", title: "Food & Daily Life", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" },
  { id: "health", title: "Health & Wellbeing", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80" },
  { id: "home", title: "My Home", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80" },
  { id: "town", title: "My Town", image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80" },
  { id: "travel", title: "Holidays & Travel", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" }
];

/* ---------- STATE ---------- */

let STATE = {
  theme: null,
  level: 1,
  answers: [],        // learner answers (stored but never reused by coach)
  marks: [],          // marking objects with tags
  startTime: null
};

/* ---------- PROGRESS ---------- */

function loadProgress() {
  return JSON.parse(localStorage.getItem("round-progress") || "{}");
}

function saveProgress(p) {
  localStorage.setItem("round-progress", JSON.stringify(p));
}

/* ---------- HOME (tiles unchanged) ---------- */

function renderHome() {
  const app = document.getElementById("app");
  const progress = loadProgress();

  app.innerHTML = `
    <div class="tile-wrap">
      ${THEMES.map(t => {
        const done = progress[t.id] || 0;
        const pct = Math.round((done / LEVELS_PER_THEME) * 100);
        return `
          <div class="tile"
               style="background-image:url('${t.image}')"
               onclick="startRound('${t.id}')">
            <div class="tile-content">
              <div>
                <h2>${t.title}</h2>
                <div class="cogs">⚙️ ⚙️ ⚙️</div>
              </div>
              <div>
                <div class="progress">
                  <div class="progress-fill" style="width:${pct}%"></div>
                </div>
                <div class="progress-text">${done} / ${LEVELS_PER_THEME} levels</div>
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

/* ---------- ROUND START (🔧 rewired) ---------- */

function startRound(themeId) {
  STATE.theme = themeId;
  STATE.level = 1;
  STATE.answers = [];
  STATE.marks = [];
  loadLevel();
}

/* ---------- LEVEL ---------- */

function loadLevel() {
  STATE.startTime = Date.now();
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="level-screen">
      <h2>${STATE.theme.toUpperCase()} — Level ${STATE.level}</h2>
      <p>Write a short paragraph.</p>
      <textarea id="answerBox"></textarea>
      <button onclick="submitAnswer()">Submit</button>
    </div>
  `;
}

/* ---------- MARKING (internal) ---------- */

function markAnswer(text) {
  // 🔧 INTERNAL CHANGE: coach NEVER reuses learner text
  // learner text is stored but not echoed

  const tags = [];

  if (!text.match(/\b(estoy|soy|es|está|voy|me gusta)\b/i)) {
    tags.push("verb_form");
  }
  if (text.split(" ").length < 10) {
    tags.push("too_short");
  }
  if (!text.match(/\b(y|pero|porque)\b/i)) {
    tags.push("no_connector");
  }

  return {
    score: Math.max(0, 10 - tags.length * 2),
    tags
  };
}

/* ---------- SUBMIT ---------- */

function submitAnswer() {
  const text = document.getElementById("answerBox").value.trim();
  if (!text) return;

  STATE.answers.push(text);
  const mark = markAnswer(text);
  STATE.marks.push(mark);

  if (STATE.level < 5) {
    STATE.level++;
    loadLevel();
  } else {
    endRound();
  }
}

/* ---------- ROUND END ---------- */

function pickMostExpensiveError(marks) {
  // 🔧 INTERNAL CHANGE: round-wide aggregation
  const weights = {
    verb_form: 10,
    verb_ending: 9,
    word_order: 9,
    no_connector: 6,
    too_short: 4
  };

  const counts = {};
  marks.forEach(m =>
    (m.tags || []).forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    })
  );

  let best = null;
  let bestScore = 0;

  Object.keys(counts).forEach(tag => {
    const score = counts[tag] * (weights[tag] || 1);
    if (score > bestScore) {
      bestScore = score;
      best = tag;
    }
  });

  return best;
}

function endRound() {
  const focus = pickMostExpensiveError(STATE.marks);
  showCoachFeedback(focus);
}

/* ---------- COACH ---------- */

function showCoachFeedback(focus) {
  // 🔧 INTERNAL CHANGE: clean coach language only
  const explanations = {
    verb_form: {
      explain: "Your verbs need to be in the correct form to score marks.",
      model: "Me gusta mi colegio porque es moderno y interesante."
    },
    no_connector: {
      explain: "Using connectives helps your writing flow and scores higher.",
      model: "Mi colegio es grande y moderno, pero es muy acogedor."
    },
    too_short: {
      explain: "Short answers limit your marks. Add detail and opinion.",
      model: "Mi colegio está en el centro y me gusta porque los profesores son simpáticos."
    }
  };

  const info = explanations[focus];

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="level-screen">
      <h2>Coach</h2>
      <p>${info.explain}</p>
      <p><strong>Model:</strong> ${info.model}</p>
      <button onclick="startGym('${focus}')">Gym</button>
      <button onclick="renderHome()">Back to tiles</button>
    </div>
  `;
}

/* ---------- GYM ---------- */

function startGym(focus) {
  const drills = {
    verb_form: "Choose the correct verb form: Me ___ (gustar) el fútbol.",
    no_connector: "Join the ideas using a connector: Mi colegio es grande. Es moderno.",
    too_short: "Add one extra sentence to give more detail."
  };

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="level-screen">
      <h2>Gym</h2>
      <p>${drills[focus]}</p>
      <textarea></textarea>
      <button onclick="renderHome()">Back to tiles</button>
    </div>
  `;
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", renderHome);
