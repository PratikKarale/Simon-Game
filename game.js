var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = []; 

var userClickedPattern = []; 

var started = false;

var level = 0; //

//nextSequence generates random color and adds its to the gamePattern
function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];
    
    console.log(randomChosenColor);
    
    gamePattern.push(randomChosenColor);

    $("." + randomChosenColor).fadeOut(100).fadeIn(100); 

    playSound(randomChosenColor);

    $("h1").text("level " + level); //

    level++;

}

function checkAnswer(currentIndex){
    if(gamePattern[currentIndex] === userClickedPattern[currentIndex]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence();}, 1000); 
        }
    }else{
        console.log("wrong");
        playSound("wrong"); 

        $("body").addClass("game-over"); 

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);  

        $("h1").text("Game Over! Press any key to play again."); 

        startOver();
    }
}

function startOver (){
    gamePattern = [];
    level = 0;
    started = false;
}

$(".btn").click(function(){

    var userChosenColor =  $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

$("html").keydown(function() {
    if(!started){
        nextSequence();
        started = true;
    }
})

$(".start-button").click(function(){
    if(!started){
        nextSequence();
        started = true;
        $(this).hide();
    }
})

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");

    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function playSound (currentColor){

    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();

}