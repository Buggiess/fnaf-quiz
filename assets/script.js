var homeEl = document.querySelector("#home");
var questionsEl = document.querySelector("#questions");
var quizEl = document.querySelector("#quiz");
var endEl = document.querySelector("#end");
var titleEl = document.querySelector("#title");
var timerEl = document.querySelector("timer");
var startBtn = document.querySelector("#start");
var nameInput = document.querySelector("#name");
var cursor = 0;

var questions = [
    {
        text: "What is another name for Funtime Foxy?",
        options: [
            "Michael Afton",
            "Mangle",
            "Circus Baby",
            "Springtrap",
        ],
        answer: 1
    },
    {
        text: "Where is Sister Location?",
        options: [
            "Denver",
            "In the original diner",
            "Under the Afton house",
            "Under Freddy's house",
        ],
        answer: 2
    },
    {
        text: "Who is the Marionette?",
        options: [
            "Elizabeth Afton",
            "One of the 5 dead children",
            "Henry's daughter",
            "Vanny",
        ],
        answer: 0
    },
    {
        text: "What is underneath the Pizzaplex?",
        options: [
            "The Blob",
            "Freddy Fazbear's Pizzeria",
            "William Afton",
            "All of the above",
        ],
        answer: 3
    },
    {
        text: "Who is not an original animatronic?",
        options: [
            "Roxy",
            "Freddy",
            "Chica",
            "Bonnie",
        ],
        answer: 0
    },
];

function homePage() {
    homeEl.style.display = "block";
    quizEl.style.display = "none";
    endEl.style.display = "none";
}

function quizPage() {
    homeEl.style.display = "none";
    quizEl.style.display = "block";
    endEl.style.display = "none";
    showQuestion();
}

function showQuestion() {
    questionsEl.innerHTML = "";
    var question = questions[cursor];
    titleEl.textContent = question.text;
    for (var i = 0; i < question.options.length; i++) {
        var item = question.options[i];
        var answerBtn = document.createElement("button");
        answerBtn.textContent = i + 1 + ". " + item;
        questionsEl.appendChild(answerBtn);
    }
    timerEl.textContent = seconds;
    var timer = setInterval(function () {
        seconds--;
        timerEl.textContent = seconds;
        if (seconds < 0) {
            clearInterval(timer)
        }
    }, 1000);
}

function endPage() {
    homeEl.style.display = "none";
    quizEl.style.display = "none";
    endEl.style.display = "block";
}

function start() {
    homePage();
}

start();

startBtn.addEventListener("click", quizPage);
quizEl.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        console.log(event.target);
        cursor++;
        if (cursor < questions.length) {
            showQuestion();
        } else {
            endPage();
        }
    }
});


