// Sample quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 2
    },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById('question');
const choiceButtons = document.querySelectorAll('.choice');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    nextButton.disabled = true;
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choiceButtons.forEach((button, index) => {
        button.textContent = currentQuestion.choices[index];
    });
    feedbackElement.textContent = '';
    selectedAnswer = null;
    nextButton.disabled = true;
}

function selectAnswer(index) {
    selectedAnswer = index;
    feedbackElement.textContent = selectedAnswer === quizData[currentQuestionIndex].correctAnswer ? "Correct!" : "Wrong!";
    nextButton.disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    scoreElement.textContent = `You scored ${score} out of ${quizData.length}`;
}

function restartQuiz() {
    startQuiz();
}

startQuiz();
