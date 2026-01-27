export async function aiCorrect(payload){
  const items = payload.items || [];
  const text = items[0]?.answer || "";

  const costliestTag = text.length < 6 ? "too_short" : "verb_form";

  return {
    coachLine: costliestTag === "too_short"
      ? "Not enough to score. Add detail."
      : "Verb breaks the sentence.",
    modelAnswer: "Mi colegio es grande y tiene un patio."
  };
}
