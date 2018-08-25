function Question(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

var gameState = {
    questionIndex: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    unanswered: 0,
    pauseGame: false
}

var questionList = [];
var q1 = new Question("Why didn't the Eagles fly the Ring into Mordor?", ["They are a proud race", "They had to defend their own lands", "Tolkien was a lazy writer"], "Tolkien was a lazy writer")
var q2 = new Question("Was Carthage salted?", ["Yes", "No", "Carthago Delenda Est"], "Carthago Delenda Est")
var q3 = new Question("Was the kinslaying at Alquolonde justified?", ["Feanor did nothing wrong", "The Teleri were right", "Both sides were at fault"], "Feanor did nothing wrong")
var q4 = new Question("Which was the last movie Orson Wells appeared in?", ["Citizen Kane", "Transformers: The Movie", "Birdemic Shock and Terror"], "Transformers: The Movie")
var q5 = new Question("What is the greatest band of all time", ["Chumbawumba", "Nickelback", "The Mighty Mighty Bosstones"], "Chumbawumba")

questionList.push(q1);
questionList.push(q2);
questionList.push(q3);
questionList.push(q4);
questionList.push(q5);


function makeChoice(a) {
    var newChoice = $("<button>" + a + "</button>");
    newChoice.attr("choice-txt", a);
    $("#top-container").append(newChoice)
}

function Initiate(index) {
    $("#top-container").empty()
    $("#center-container").empty()

    var q = questionList[index]
    $("#top-container").html(q.question)

    beginTimer(11);

    for (var i = 0; i < q.choices.length; i++) {
        makeChoice(q.choices[i]);
    }

    $("button").on("click", function () {
        $("#center-container").empty()

        if (gameState.pauseGame == false) {
            //what to do if correct answer
            if ($(this).attr("choice-txt") == q.answer) {
                gameState.correctAnswers++;
                $("#center-container").html("Correct!")
                gameState.pauseGame = true;
                gameState.questionIndex++;

            }
            //what to do if incorrect answer
            else {
                gameState.wrongAnswers++;
                $("#center-container").html("Wrong! The correct answer is: " + q.answer)
                gameState.pauseGame = true;
                gameState.questionIndex++;

            }
        }


        //waits a little bit before sending out the next question
        setTimeout(function () {
            //ends game if all out of questions
            if (gameState.questionIndex > q.choices.length) {
                gameOver();
            }

            //otherwise continues game and gets next question
            else {
                Initiate(gameState.questionIndex);
                gameState.pauseGame = false;
            }
        }, 2000);



    });

}

//begins the game
$("#start").on("click", function () {
    console.log("hey")
    $("#start").remove();
    Initiate(gameState.questionIndex);
});

//Displays what happens when the game is over
function gameOver() {
    $("#top-container").empty()
    $("#center-container").empty()
    $("#timer").empty();

    $("#center-container").append("You got: " + gameState.correctAnswers + " questions correct! ")
    $("#center-container").append("You got: " + gameState.wrongAnswers + " questions wrong! ")
    $("#center-container").append("You didn't answer: " + gameState.unanswered + " questions! ")
}
//needs to be outside scope of beginTimer
var timer;

//This starts a new timer whenever called
function beginTimer(sec) {
    function showTime(val) { return val }
    clearInterval(timer);
    
    timer = setInterval(function () {
        if (sec == 0) {
            gameState.questionIndex++;
            gameState.unanswered++;

            if (gameState.questionIndex > q.choices.length) {
                gameOver();
            }

            else {
                Initiate(gameState.questionIndex)
            }
        }
        $("#seconds").html(showTime(--sec));
    }, 1000);
}



