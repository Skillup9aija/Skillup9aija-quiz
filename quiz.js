<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skillup9aija Quiz</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        #quiz-container { border: 1px solid #ddd; padding: 20px; display: inline-block; }
        .option-btn { display: block; margin: 5px auto; padding: 10px; width: 80%; }
    </style>
</head>
<body>
    <div id="quiz-container">
        <h2>Skillup9aija Quiz</h2>
        <p id="question-text">Loading question...</p>
        <div id="options-container"></div>
        <p id="timer"></p>
        <p id="feedback"></p>
        <button onclick="nextQuestion()">Next Question</button>
    </div>

    <script src="quiz.js"></script> <!-- This loads the JavaScript file -->
</body>
</html>
