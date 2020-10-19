let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


$(document).ready(function () {

    $(".btn").click(function () {

        let userChosenColour = $(this).attr("id");

        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);

    });





    function nextSequence() {
        userClickedPattern = [];
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        $("#level-title").text("Level " + level);
        playSound(randomChosenColour);
        animatePress(randomChosenColour);
        level++;

    }

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (gamePattern.length === userClickedPattern.length) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }


    $(document).keypress(function () {
        if (!started) {
            nextSequence();
            started = true;
        }
    })

});