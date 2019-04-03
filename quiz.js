// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const choiceE = document.getElementById("E");
const choiceF = document.getElementById("F");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");



// create questions
let questions = [
    {
        question: "1. Danon disease?",
        choiceA: "Blood",
        choiceB: "Heart",
        choiceC: "Skin",
        choiceD: "Muscle",
        choiceE: "Brain",
        choiceF: "Mental",
        correct: "B"
    },
    {
        question: "2. Diamond-Blackfan anemia?",
        choiceA: "Blood",
        choiceB: "Heart",
        choiceC: "Skin",
        choiceD: "Muscle",
        choiceE: "Brain",
        choiceF: "Mental",
        correct: "A"
    },
    {
        question: "3. Acanthosis Nigricans?",
        choiceA: "Blood",
        choiceB: "Heart",
        choiceC: "Skin",
        choiceD: "Muscle",
        choiceE: "Brain",
        choiceF: "Mental",
        correct: "C"
    },
    {
        question: "4. Fibromyalgia?",
        choiceA: "Blood",
        choiceB: "Heart",
        choiceC: "Skin",
        choiceD: "Muscle",
        choiceE: "Brain",
        choiceF: "Mental",
        correct: "D"
    },
    {
        question: "5. Uterine Leiomyosarcoma?",
        choiceA: "Blood",
        choiceB: "Heart",
        choiceC: "Skin",
        choiceD: "Muscle",
        choiceE: "Brain",
        choiceF: "Mental",
        correct: "D"
    },
    {
        question: "6. Progressive supranuclear palsy?",
        choiceA: "Blood",
        choiceB: "Heart",
        choiceC: "Skin",
        choiceD: "Muscle",
        choiceE: "Brain",
        choiceF: "Mental",
        correct: "E"
    },



];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15;
const gaugeWidth = 15; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    choiceE.innerHTML = q.choiceE;
    choiceF.innerHTML = q.choiceF;
}


// start quiz
start.addEventListener("click", startQuiz);
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}


// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0F9D58";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#DB4437";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "flex";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 75) ? "img/love.png" :
        (scorePerCent >= 60) ? "img/ouff.png" :
            (scorePerCent >= 40) ? "img/confused.png" :
                "img/crying.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}