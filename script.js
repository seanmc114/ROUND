/* ===========================
   LOOPS / ROUND — script.js
   Coach-safe version
   =========================== */

/* ---------- Utilities ---------- */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/* ---------- COACH CORE ---------- */
/*
  HARD RULE:
  - learner language is NEVER used for generation
  - answers are DISPLAY ONLY
*/

function pickRoundFocus(items, lang, rubric) {
  const counts = {};
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

  // count tags
  items.forEach(it => {
    (it.tags || []).forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });

  let best = "detail";
  let bestScore = -1;

  Object.keys(counts).forEach(tag => {
    const score = counts[tag] * (weight[tag] || 1);
    if (
      score > bestScore ||
      (score === bestScore && (weight[tag] || 0) > (weight[best] || 0))
    ) {
      bestScore = score;
      best = tag;
    }
  });

  // 🔒 critical: only indices, never learner language
  const indices = [];
  items.forEach((it, i) => {
    if ((it.tags || []).includes(best)) {
      indices.push(i + 1); // human-friendly numbering
    }
  });

  // return structured focus, not text
  return {
    tag: best,
    indices
  };
}

/* ---------- MODEL ANSWERS ---------- */
/*
  Prompt-based only.
  Never derived from learner answers.
*/

function modelFromPrompt(prompt, lang, level) {
  const p = prompt.toLowerCase();

  // Spanish v1 — safe, boring, exam-valid
  if (p.includes("colegio"))
    return "Mi colegio es grande y está en el centro.";
  if (p.includes("profesor") || p.includes("clase"))
    return "Mi profesor es simpático y explica bien.";
  if (p.includes("asignatura"))
    return "Mi asignatura favorita es el inglés.";
  if (p.includes("amigo"))
    return "Mi mejor amigo es divertido.";
  if (p.includes("familia"))
    return "Mi familia es pequeña y nos llevamos bien.";

  return "Es interesante y me gusta bastante.";
}

/* ---------- ROUND FLOW ---------- */

let STATE = {
  focusTag: null,
  errorIndices: []
};

function analyseRound(items, lang, rubric, level) {
  const focus = pickRoundFocus(items, lang, rubric);

  // Identify where the error occurs (indices only)
  const indices = [];
  items.forEach((it, i) => {
    if ((it.tags || []).includes(focus)) {
      indices.push(i + 1); // human-readable
    }
  });

  STATE.focusTag = focus;
  STATE.errorIndices = indices;

  return {
    focusTag: focus,
    errorIndices: indices,
    modelAnswer: modelFromPrompt(
      items[0]?.prompt || "",
      lang,
      level
    )
  };
}

/* ---------- EXPORT ---------- */

window.LOOPS = {
  analyseRound
};
