const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
    { question: "Who developed JavaScript?", options: ["Brendan Eich", "Elon Musk", "Mark Zuckerberg", "Bill Gates"], answer: "Brendan Eich" },
    { question: "What is the largest planet in our solar system?", options: ["Mars", "Jupiter", "Saturn", "Venus"], answer: "Jupiter" },
    { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "NaCl"], answer: "H2O" },
    // Add more questions up to 100
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

// Function to select 50 random questions per session
function getRandomQuestions() {
    return questions.sort(() => Math.random() - 0.5).slice(0, 50);
}

function startQuiz() {
    selectedQuestions = getRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-container").innerHTML = `
        <h1>SkillUp9aija Quiz</h1>
        <h2 id="question-text">Loading question...</h2>
        <div id="options-container"></div>
        <p id="timer"></p>
        <p id="feedback"></p>
        <button onclick="nextQuestion()">Next</button>
    `;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResults();
        return;
    }
    document.getElementById("question-text").innerText = selectedQuestions[currentQuestionIndex].question;
    let optionsHTML = "";
    selectedQuestions[currentQuestionIndex].options.forEach(option => {
        optionsHTML += `<button class='option-btn' onclick='checkAnswer("${option}")'>${option}</button>`;
    });
    document.getElementById("options-container").innerHTML = optionsHTML;
    startTimer();
}

function startTimer() {
    let timeLeft = 15;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedOption) {
    clearInterval(timer);
    let correctAnswer = selectedQuestions[currentQuestionIndex].answer;
    let message = (selectedOption === correctAnswer) ? "Correct!" : `Wrong! The correct answer is: ${correctAnswer}`;
    
    if (selectedOption === correctAnswer) {
        score++;
    }
    
    document.getElementById("feedback").innerText = message;
    setTimeout(() => {
        document.getElementById("feedback").innerText = "";
        nextQuestion();
    }, 2000);
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex === 25) { // Show an intermediate score at halfway
        showIntermediateScore();
    } else {
        loadQuestion();
    }
}

function showIntermediateScore() {
    document.getElementById("quiz-container").innerHTML = `<h2>Your Score so far: ${score}/25</h2>
        <button onclick='loadQuestion()'>Continue</button>`;
}

function showResults() {
    let message = score >= 25 ? "Congratulations!" : "Try Again!";
    document.getElementById("quiz-container").innerHTML = `<h2>${message} Your Final Score: ${score}/50</h2>
        <button onclick='startQuiz()'>Restart Quiz</button>`;
}

// Ensure quiz starts on page load
window.onload = startQuiz;
