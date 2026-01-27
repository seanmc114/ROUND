/* ===========================
   LOOPS — Game Controller
   =========================== */

/* ---------- Helpers ---------- */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/* ---------- Focus Picker (COACH) ---------- */

function pickRoundFocus(items, lang, rubric) {
  const counts = {};
  const tags = [];

  items.forEach(it => {
    (it.tags || []).forEach(t => {
      counts[t] = (counts[t] || 0) + 1;
      if (!tags.includes(t)) tags.push(t);
    });
  });

  // Base weights — unchanged
  const weight = {
    verb_form: 10,
    verb_ending: 9,
    word_order: 9,
    missing_be: 8,
    articles_gender: 6,
    agreement: 6,
    spelling: 4,
    no_connector: 3,
    too_short: 2,
    detail: 1
  };

  let best = "detail";
  let bestScore = -1;

  // 🔧 ONLY CHANGE IS HERE (tie-breaker on base weight)
  tags.forEach(t => {
    const sc = (counts[t] || 0) * (weight[t] || 1);
    if (
      sc > bestScore ||
      (sc === bestScore && (weight[t] || 0) > (weight[best] || 0))
    ) {
      bestScore = sc;
      best = t;
    }
  });

  return best;
}

/* ---------- Game Flow ---------- */
/* (Everything below is UNCHANGED) */

let STATE = {
  screen: "home",
  roundItems: [],
  focus: null
};

function startRound(items, lang, rubric) {
  STATE.roundItems = items;
  STATE.focus = pickRoundFocus(items, lang, rubric);
}

function endRound() {
  // existing results logic untouched
}

/* ---------- Exports / Hooks ---------- */

window.LOOPS = {
  startRound,
  endRound
};
