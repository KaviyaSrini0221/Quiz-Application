const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const leaderboardList = document.getElementById("leaderboard-list");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let username = prompt("Enter your username:");

// Fetch questions from JSON file
async function loadQuestions(category) {
    try {
        const response = await fetch(`data/${category}.json`); // Adjust the path if necessary
        questions = await response.json();
        startQuiz();
    } catch (error) {
        console.error("Error loading questions:", error);
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
        showScore();
        return;
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Score: ${score} / ${currentQuestionIndex + 1}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", () => {
        saveScore(username, score);
        location.reload();
    });
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Add event listeners to each category link
document.getElementById("math").addEventListener("click", () => loadQuestions("Mathematics"));
document.getElementById("english").addEventListener("click", () => loadQuestions("English"));
document.getElementById("physics").addEventListener("click", () => loadQuestions("Physics"));
document.getElementById("chemistry").addEventListener("click", () => loadQuestions("Chemistry"));
document.getElementById("biology").addEventListener("click", () => loadQuestions("Biology"));
document.getElementById("cs").addEventListener("click", () => loadQuestions("Computer"));
document.getElementById("aptitude").addEventListener("click", () => loadQuestions("Aptitude"));

// Load Mathematics questions by default
loadQuestions("Mathematics");

// Function to save scores to localStorage
function saveScore(username, score) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

// Function to display leaderboard
function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardList.innerHTML = '';
    leaderboard.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.innerText = `${entry.username}: ${entry.score}`;
        leaderboardList.appendChild(listItem);
    });
}

// Display leaderboard when the page loads
displayLeaderboard();
