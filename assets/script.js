var goEl = document.querySelector("#go");
var questionsEl = document.querySelector("#questions");
var quizEl = document.querySelector("#quiz");
var endEl = document.querySelector("#end");
var startBtn = document.querySelector("start");
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

function goPage() {
    goEl.style.display = "block";
    quizEl.style.display = "none";
    endEl.style.display = "none";
}

function quizPage() {
    goEl.style.display = "none";
    quizEl.style.display = "block";
    endEl.style.display = "none";
    showQuestion();
}

function showQuestion() {
    var question = questions[cursor];

    for (var i = 0; i < question.options.length; i++) {
        var item = question.options[i];
        var answerBtn = document.createElement("button");
        answerBtn.textContent = i + 1 + ". " + item;
        quizEl.appendChild(answerBtn);
    }
}

function endPage() {
    goEl.style.display = "none";
    quizEl.style.display = "none";
    endEl.style.display = "block";
}

function start() {
    goPage();
}

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

start();