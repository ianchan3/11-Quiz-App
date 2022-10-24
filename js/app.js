class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }
  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }
  guess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++
    }
    this.questionIndex++
  }
  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}

class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

function displayQuestion() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionIndex().text;
    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess)
    displayQuestion();
  }
}

function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let progressElement = document.getElementById("progress");
  progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

function showScores() {
  let quizEndHTML = `
  <h1>Quiz Completed</h1>
  <h2 id="score">You got ${quiz.score} out of ${quiz.questions.length}</h2>
  <div class="quiz-repeat">
    <a href="index.html">Take Quiz Again</a>
  </div>
  `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
}


let questions = [
  new Question(
      "Hyper Text Markup Language Stands For?", ["JQuery", "XHTML", "CSS", "HTML"], "HTML"
  ),
  new Question(
      "Cascading Style sheet stands for?", ["HTML", "JQuery", "CSS", "XML"], "CSS"
  ),
  new Question(
      "Which is a JavaScript Framework?", ["React", "Laravel", "Django", "Sass"], "React"
  ),
  new Question(
      "Which is a backend language?", ["PHP", "HTML", "React", "All"], "PHP"
  ),
  new Question(
      "Which is best for Artificial intelligence?", ["React", "Laravel", "Python", "Sass"], "Python"
  )
];


let quiz = new Quiz(questions);

displayQuestion();

let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down")

function startCoundown() {
  let quizTimer = setInterval(function() {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      showScores();
    } else {
      quizTime--;
      let sec = Math.floor(quizTime % 60);
      let min = Math.floor(quizTime / 60) % 60;
      counting.innerHTML = `Time: ${min}: ${sec}`;
    }
  }, 1000)
}

startCoundown();