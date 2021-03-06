var homeEl = document.querySelector("#home");
var questionsEl = document.querySelector("#questions");
var quizEl = document.querySelector("#quiz");
var endEl = document.querySelector("#end");
var titleEl = document.querySelector("#title");
var timerEl = document.querySelector("#timer");
var scoresEl = document.querySelector("#scores")
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit");
var nameInput = document.querySelector("#name");
var cursor = 0;
var seconds = 90;
var finalScoreEl = document.querySelector("#finalscore");
var timer;

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
        answer: 2
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
    scoresEl.style.display = "none";
}

function quizPage() {
    homeEl.style.display = "none";
    quizEl.style.display = "block";
    endEl.style.display = "none";
    scoresEl.style.display = "none";
    showQuestion();
    //sets timer on quizpage and when time runs out takes player to endpage
    timerEl.textContent = seconds;
    timer = setInterval(function () {
        seconds--;
        timerEl.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(timer)
            endPage()
        }
    }, 1000);
}

//shows question and answers
//button click goes to the next item in the index
function showQuestion() {
    questionsEl.innerHTML = "";
    var question = questions[cursor];
    titleEl.textContent = question.text;
    for (var i = 0; i < question.options.length; i++) {
        var item = question.options[i];
        var answerBtn = document.createElement("button");
        answerBtn.textContent = item;
        answerBtn.addEventListener("click", function (event) {
            checkAnswer(event);
        });
        questionsEl.appendChild(answerBtn); 
    }
}
//checks answer to see if correct
//takes off 15s if player answer does not equal actual answer
function checkAnswer(event) {
    var correctAnswer = questions[cursor].answer;
    if (event.target.textContent !== questions[cursor].options[correctAnswer]) {
        seconds = Math.max(seconds - 15, 0);
        console.log(event.target.textContent);
    }
}

function endPage() {
    homeEl.style.display = "none";
    quizEl.style.display = "none";
    endEl.style.display = "flex";
    scoresEl.style.display = "none";
    finalScoreEl.textContent = `Score: ${seconds}`;
    clearInterval(timer);
}

function start() {
    homePage();
}

function scoresPage() {
    homeEl.style.display = "none";
    quizEl.style.display = "none";
    endEl.style.display = "none";
    scoresEl.style.display = "flex";
    //stored will grab from the local storage
    var stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
    //sorts the scores from highest to lowest
    stored.sort(function(a, b){
        return(b.score-a.score)
    });
    console.log(stored);
    //adds a p item to the scores page so that scores are displayed on screen and not just in local storage
    for( var i = 0; i < stored.length; i++){
        var scoreItem = stored[i];
        console.log(scoreItem);
        var pEl = document.createElement("p");
        pEl.textContent = scoreItem.name + ": " + scoreItem.score
        scoresEl.append(pEl);
     }
}
//instructor provided
function handleInitialSubmit(event) {
    event.preventDefault();
    var stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
    var updatedScores = stored.concat({
      score: `${seconds}`,
      name: nameInput.value
    });
  
    localStorage.setItem("leaderboard", JSON.stringify(updatedScores));

     scoresPage();
}

//instructor provided
startBtn.addEventListener("click", quizPage);
quizEl.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        console.log(event.target.innerText);
        cursor++;
        if (cursor < questions.length) {
            showQuestion();
        } else {
            endPage();
        }
    }
});

submitBtn.addEventListener("click", handleInitialSubmit);
//enter key submits name just like button click
nameInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitBtn.click();
    }
});
start();