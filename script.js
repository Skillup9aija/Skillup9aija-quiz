const questions = [...]; // Add 100 questions here

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

// Function to select 50 random questions per session
function getRandomQuestions() {
    if (!questions || questions.length === 0) {
        console.error("No questions available");
        return [];
    }
    return questions.sort(() => Math.random() - 0.5).slice(0, 50);
}

function startQuiz() {
    selectedQuestions = getRandomQuestions();
    if (selectedQuestions.length === 0) {
        document.getElementById("quiz-container").innerHTML = "<h2>No questions available</h2>";
        return;
    }
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResults();
        return;
    }
    console.log("Loading question", currentQuestionIndex + 1);
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
    
    if (currentQuestionIndex % 50 === 0 || currentQuestionIndex >= selectedQuestions.length) {
        showIntermediateScore();
    } else {
        loadQuestion();
    }
}

function showIntermediateScore() {
    document.getElementById("quiz-container").innerHTML = `<h2>Your Score so far: ${score}/${selectedQuestions.length}</h2>
        <button onclick='loadQuestion()'>Continue</button>`;
}

function showResults() {
    let message = score >= 25 ? "Congratulations!" : "Try Again!";
    document.getElementById("quiz-container").innerHTML = `<h2>${message} Your Final Score: ${score}/${selectedQuestions.length}</h2>
        <button onclick='startQuiz()'>Restart Quiz</button>`;
}

// Start quiz automatically on page load
window.onload = startQuiz;
