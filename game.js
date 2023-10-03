let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(document).on("keydown", function() {
    if($("h1")[0].innerText === "Press A Key to Start") {
        nextSequence()
    }
});


$(".btn").on("click", function(e) {
    
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(e.target)
    
    let index = userClickedPattern.length-1;
    checkAnswer(index)
});


function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
        
    } else {

        console.log("wrong");

        let audio = new Audio ("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
        
    }
}

function nextSequence() {
    $("h1").text("Level " + level)
    level++

    userClickedPattern = [];
    let randomNumber = (Math.floor(Math.random() * 4))
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);   
    playSound(randomChosenColour)
}

function startOver() {
    level = 0;
    gamePattern = [];
    $("h1")[0].innerText = "Press A Key to Start";
}



function playSound(name) {

    switch(name) {
        case "blue":
            let audioBlue = new Audio ("sounds/blue.mp3");
            audioBlue.play();
            break;
        case "green":
            let audioGreen = new Audio ("sounds/green.mp3");
            audioGreen.play();
            break;
        case "red":
            let audioRed = new Audio ("sounds/red.mp3");
            audioRed.play();
            break;
        case "yellow":
            let audioYellow = new Audio ("sounds/yellow.mp3");
            audioYellow.play();
            break;
        default:
            console.log(name)
    }
}

function animatePress(currentColour) {
    $(currentColour).addClass("pressed")
    setTimeout(function(){
        $(currentColour).removeClass("pressed")
    }, 100)
}




