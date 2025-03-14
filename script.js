const allQuestions = [
    { question: "What is the primary programming language used in Data Science?", options: ["Java", "Python", "C++", "Ruby"], answer: "Python" },
    { question: "Which library is commonly used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], answer: "Pandas" },
    { question: "What does CSV stand for in Data Science?", options: ["Comma-Separated Values", "Common System Variables", "Complex Storage View", "Coded Sequence Variables"], answer: "Comma-Separated Values" },
    { question: "Which Python library is used for deep learning?", options: ["TensorFlow", "BeautifulSoup", "OpenCV", "Flask"], answer: "TensorFlow" },
    { question: "Which SQL statement retrieves data from a database?", options: ["GET", "SELECT", "RETRIEVE", "FETCH"], answer: "SELECT" },
    { question: "Which of these is a Machine Learning algorithm?", options: ["K-Means", "HTML", "CSS", "JavaScript"], answer: "K-Means" },
    { question: "What is supervised learning?", options: ["Learning with labeled data", "Learning without labeled data", "Self-learning", "None of the above"], answer: "Learning with labeled data" },
    { question: "Which Python package is used for data visualization?", options: ["Scikit-learn", "Matplotlib", "Pandas", "Seaborn"], answer: "Matplotlib" },
    { question: "What is the purpose of feature scaling?", options: ["Reduce dataset size", "Make features comparable", "Remove missing values", "Speed up processing"], answer: "Make features comparable" },
    { question: "Which tool is used for big data processing?", options: ["Tableau", "Hadoop", "Excel", "Photoshop"], answer: "Hadoop" },
    // Add 90 more questions here for a total of 100
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 50;

// Function to get 50 random questions
function getRandomQuestions() {
    return allQuestions.sort(() => Math.random() - 0.5).slice(0, totalQuestions);
}

// Function to start the quiz
function startQuiz() {
    selectedQuestions = getRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-container").innerHTML = `
        <h2 id="question-text"></h2>
        <div id="options-container"></div>
        <p id="feedback"></p>
        <p id="score-display"></p>
        <button id="next-btn" onclick="nextQuestion()" disabled>Next Question</button>
        <button id="restart-btn" onclick="startQuiz()" style="display:none;">Restart Quiz</button>
    `;
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
    document.getElementById("feedback").innerText = "";
    document.getElementById("next-btn").disabled = true;
}

// Function to check answer and show correct/incorrect feedback
function checkAnswer(selectedOption) {
    let correctAnswer = selectedQuestions[currentQuestionIndex].answer;
    let feedbackElement = document.getElementById("feedback");
    
    if (selectedOption === correctAnswer) {
        score++;
        feedbackElement.innerHTML = `<span style="color:green;">Correct! ✅</span>`;
    } else {
        feedbackElement.innerHTML = `<span style="color:red;">Wrong ❌ The correct answer is: <b>${correctAnswer}</b></span>`;
    }

    document.getElementById("score-display").innerText = `Score: ${score}/${currentQuestionIndex + 1}`;
    document.getElementById("next-btn").disabled = false;
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Function to show final results
function showResults() {
    let resultMessage = score >= totalQuestions * 0.7 ? "🎉 Congratulations! You did great!" : "😔 Try Again! Keep practicing!";
    
    document.getElementById("quiz-container").innerHTML = `
        <h2>${resultMessage}</h2>
        <h3>Your Final Score: ${score}/${totalQuestions}</h3>
        <button onclick="startQuiz()">Restart Quiz</button>
    `;

    updateLeaderboard();
}

// Function to update leaderboard
function updateLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Start the quiz on page load
startQuiz();
