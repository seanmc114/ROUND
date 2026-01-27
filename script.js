import { aiCorrect } from './ai.js';

const submitBtn = document.getElementById('submitBtn');
const answerInput = document.getElementById('answerInput');
const screenResults = document.getElementById('screenResults');
const coachLine = document.getElementById('coachLine');
const yourAnswer = document.getElementById('yourAnswer');
const modelAnswer = document.getElementById('modelAnswer');

submitBtn.onclick = async () => {
  const payload = {
    level: 1,
    items: [{ prompt: 'Describe your school', answer: answerInput.value }]
  };

  const mark = await aiCorrect(payload);

  coachLine.textContent = mark.coachLine;
  yourAnswer.textContent = payload.items[0].answer;
  modelAnswer.textContent = mark.modelAnswer;

  screenResults.classList.remove('hidden');
};
