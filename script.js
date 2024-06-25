document.getElementById('nextButton').addEventListener('click', function() {
    document.querySelector('.container').style.display = 'none';
    loadQuiz();
});

const questions = [
    {
        question: "Where did we meet?",
        type: "multiple-choice",
        options: ["At a coffee shop", "At a party", "Charles University in Prague", "On a bus"],
        answer: "Charles University in Prague"
    },
    {
        question: "When did I realise we were soulmates?",
        type: "text",
        answer: "when we got home to Madrid and went to pick up some Lebanese food 40 minutes away, life with you just felt like peace"
    },
    {
        question: "How many countries have we been in together?",
        type: "multiple-choice",
        options: ["5", "7", "9", "11"],
        answer: "9"
    },
    {
        question: "What game did we first play together?",
        type: "text",
        answer: "Fortnite"
    },
    {
        question: "What was the first meal we shared together?",
        type: "text",
        answer: "trick question, it’s those ice cream cones in Prague"
    },
    {
        question: "Where did we first become girlfriend and boyfriend?",
        type: "multiple-choice",
        options: ["Romantic getaway", "At a dinner", "In a swamp"],
        answer: "In a swamp"
    },
    {
        question: "What was our first crackhead activity?",
        type: "text",
        answer: "trying to get into a casino in Prague"
    },
    {
        question: "What was our last crackhead activity?",
        type: "text",
        answer: "almost dying at the edge of a cliff surrounded by sheep while bad bunny was playing"
    },
    {
        question: "What is our song?",
        type: "text",
        answer: "For my hand by Bourna hoy"
    },
    {
        question: "Where do I feel the safest in the world?",
        type: "text",
        answer: "your arms"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuiz() {
    const quizContainer = document.createElement('div');
    quizContainer.classList.add('quiz-container');
    document.body.appendChild(quizContainer);
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showScore();
        return;
    }

    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = '';

    const questionObj = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<p>${questionObj.question}</p>`;
    quizContainer.appendChild(questionElement);

    if (questionObj.type === "multiple-choice") {
        questionObj.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => handleAnswer(option));
            quizContainer.appendChild(button);
        });
    } else {
        const input = document.createElement('input');
        input.type = "text";
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleAnswer(input.value.trim());
            }
        });
        quizContainer.appendChild(input);
    }
}

function handleAnswer(selectedAnswer) {
    const questionObj = questions[currentQuestionIndex];
    const quizContainer = document.querySelector('.quiz-container');
    const answerElement = document.createElement('div');
    answerElement.classList.add('answers');

    if (selectedAnswer === questionObj.answer) {
        answerElement.textContent = "Correct!";
        answerElement.classList.add('correct-answer');
        score += 10;
        // Animation for correct answer
        answerElement.style.animation = 'correctAnimation 1s';
    } else {
        answerElement.textContent = `Incorrect. The correct answer is: ${questionObj.answer}`;
        answerElement.classList.add('incorrect-answer');
    }

    quizContainer.appendChild(answerElement);
    currentQuestionIndex++;

    setTimeout(showQuestion, 2000);
}

function showScore() {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = '';
    const scoreElement = document.createElement('div');
    scoreElement.classList.add('score');
    scoreElement.textContent = `Your score: ${score}/100`;
    quizContainer.appendChild(scoreElement);
}

@keyframes correctAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}
