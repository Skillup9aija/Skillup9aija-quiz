const questions = [
    { question: "What is the primary programming language used in Data Science?", options: ["Java", "Python", "C++", "Ruby"], answer: "Python" },
    { question: "Which library is commonly used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], answer: "Pandas" },
    { question: "What does CSV stand for in Data Science?", options: ["Comma-Separated Values", "Common System Variables", "Complex Storage View", "Coded Sequence Variables"], answer: "Comma-Separated Values" },
    { question: "Which Python library is used for deep learning?", options: ["TensorFlow", "BeautifulSoup", "OpenCV", "Flask"], answer: "TensorFlow" },
    { question: "Which SQL statement retrieves data from a database?", options: ["GET", "SELECT", "RETRIEVE", "FETCH"], answer: "SELECT" },
    { question: "Which of these is a Machine Learning algorithm?", options: ["K-Means", "HTML", "CSS", "JavaScript"], answer: "K-Means" },
    { question: "What is supervised learning?", options: ["Learning with labeled data", "Learning without labeled data", "Self-learning", "None of the above"], answer: "Learning with labeled data" },
    { question: "Which Python package is used for data visualization?", options: ["Scikit-learn", "Matplotlib", "Pandas", "Seaborn"], answer: "Matplotlib" },
    { question: "What is the purpose of feature scaling?", options: ["Reduce dataset size", "Make features comparable", "Remove missing values", "Speed up processing"], answer: "Make features comparable" },
    { question: "Which tool is used for big data processing?", options: ["Tableau", "Hadoop", "Excel", "Photoshop"], answer: "Hadoop" }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

// Function to select 10 random questions
function getRandomQuestions() {
    return questions.sort(() => Math.random() - 0.5).slice(0, 10);
}

// Function to start the quiz
function startQuiz() {
    selectedQuestions = getRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Function to load a question
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

// Timer function
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

// Function to check answer
function checkAnswer(selectedOption) {
    clearInterval(timer);
    let correctAnswer = selectedQuestions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    nextQuestion();
}

// Function to load the next question
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Function to show results
function showResults() {
    document.getElementById("quiz-container").innerHTML = `<h2>Your Score: ${score}/10</h2>
        <button onclick='startQuiz()'>Retry Quiz</button>
        <button onclick='shareScore()'>Share Score</button>`;
    updateLeaderboard();
}

// Function to update leaderboard
function updateLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    document.getElementById("leaderboard").innerHTML = "Leaderboard: " + leaderboard.join(", ");
}

// Function to share score
function shareScore() {
    let message = `I scored ${score}/10 on the Data Science Quiz! Can you beat me?`;
    let url = encodeURIComponent(window.location.href);
    let whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}%20${url}`;
    let twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${url}`;
    document.getElementById("quiz-container").innerHTML += `<br><a href='${whatsappLink}' target='_blank'>Share on WhatsApp</a>
        <br><a href='${twitterLink}' target='_blank'>Share on Twitter</a>`;
}

// Start the quiz on page load
startQuiz();
