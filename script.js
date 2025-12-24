const quizData = [
  {
    question: "What does HTML stand for?",
    a: "Hyper Text Markup Language",
    b: "High Text Machine Language",
    c: "Hyperlinks Text Mark Language",
    d: "None of these",
    correct: "a"
  },
  {
    question: "Which language is used for styling web pages?",
    a: "HTML",
    b: "JQuery",
    c: "CSS",
    d: "XML",
    correct: "c"
  },
  {
    question: "Which is not a JavaScript framework?",
    a: "Python Script",
    b: "JQuery",
    c: "Django",
    d: "NodeJS",
    correct: "c"
  }
];

const questionEl = document.getElementById("question");
const answersEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentQuiz = 0;
let score = 0;
let userAnswers = [];

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const q = quizData[currentQuiz];
  questionEl.innerText = q.question;
  a_text.innerText = q.a;
  b_text.innerText = q.b;
  c_text.innerText = q.c;
  d_text.innerText = q.d;

  if (userAnswers[currentQuiz]) {
    document.getElementById(userAnswers[currentQuiz]).checked = true;
  }

  prevBtn.disabled = currentQuiz === 0;

  if (currentQuiz === quizData.length - 1) {
    nextBtn.innerText = "Submit";
  } else {
    nextBtn.innerText = "Next";
  }
}

function deselectAnswers() {
  answersEls.forEach(el => el.checked = false);
}

function getSelected() {
  let answer;
  answersEls.forEach(el => {
    if (el.checked) answer = el.id;
  });
  return answer;
}

nextBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (!answer) return;

  userAnswers[currentQuiz] = answer;

  if (currentQuiz === quizData.length - 1) {
    calculateScore();
    return;
  }

  currentQuiz++;
  loadQuiz();
});

prevBtn.addEventListener("click", () => {
  currentQuiz--;
  loadQuiz();
});

function calculateScore() {
  score = 0;
  quizData.forEach((q, index) => {
    if (q.correct === userAnswers[index]) {
      score++;
    }
  });

  document.querySelector(".quiz-container").innerHTML = `
    <h2>You scored ${score} / ${quizData.length}</h2>
    <button onclick="location.reload()">Restart</button>
  `;
}
