const questions = [
  {
    question: "What do you enjoy the most?",
    options: [
      { text: "Solving puzzles", type: "Analytical" },
      { text: "Drawing or painting", type: "Creative" },
      { text: "Helping others", type: "Helper" },
      { text: "Taking charge in a group", type: "Leader" }
    ]
  },
  {
    question: "How do you make decisions?",
    options: [
      { text: "Logically", type: "Analytical" },
      { text: "With emotions", type: "Helper" },
      { text: "Based on instinct", type: "Creative" },
      { text: "Quickly and confidently", type: "Leader" }
    ]
  },
  // Add more questions if you want
];

let currentQuestion = 0;
let scores = {
  Analytical: 0,
  Creative: 0,
  Helper: 0,
  Leader: 0
};

const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const resultText = document.getElementById("result");

function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  optionButtons.forEach((button, index) => {
    button.textContent = q.options[index].text;
    button.onclick = () => {
      const type = q.options[index].type;
      scores[type]++;
      nextButton.style.display = "block";
      optionButtons.forEach(b => b.disabled = true);
    };
  });
  nextButton.style.display = "none";
  optionButtons.forEach(b => b.disabled = false);
}

nextButton.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";

  let topType = "";
  let topScore = 0;

  for (let type in scores) {
    if (scores[type] > topScore) {
      topScore = scores[type];
      topType = type;
    }
  }

  const insights = {
    Analytical: "You are logical and love solving problems.",
    Creative: "You are imaginative and love expressing yourself.",
    Helper: "You care about others and want to support them.",
    Leader: "You take initiative and like to guide people."
  };

  resultText.textContent = `${topType} - ${insights[topType]}`;
}

showQuestion();
