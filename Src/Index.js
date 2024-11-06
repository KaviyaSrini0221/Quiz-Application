const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

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
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
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
    Array.from(answerButton.children).forEach(button => {
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
    nextButton.style.display = "block"
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", () => location.reload());
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

loadQuestions("Mathematics");