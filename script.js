(function(){
  "use strict";
})();
// Replace the LEVEL_INFO/THEMES generation with an explicit THEMES array:
const THEMES = [
  { id: "myself", idx: 0, label: "Myself", hint: "Describe yourself", icon: "🧍", image: "img/myself.png" },
  { id: "family", idx: 1, label: "Family & Friends", hint: "Describe your family and friends", icon: "👪", image: "img/family.png" },
  { id: "home", idx: 2, label: "Home", hint: "Describe your home/room", icon: "🏠", image: "img/home.png" },
  // ... add the rest of your theme objects here
];

// Recreate THEME_BY_ID (code relies on it)
const THEME_BY_ID = Object.fromEntries(THEMES.map(t => [t.id, t]));

})();
