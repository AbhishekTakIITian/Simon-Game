var buttonColors = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickPattern=[];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    level++;

    $("#level-title").text("Level "+level);
    
    var num = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[num];
    
    gamePattern.push(randomChosenColor);
    var i = 0;
    animateSequence();
    function animateSequence(){
        setTimeout(function() {    
            $("#"+gamePattern[i]).animate({opacity:'0.25'}).animate({opacity:'1'});
            playSound(gamePattern[i]);
            i++;
            if(i<gamePattern.length){
                animateSequence();
            }
        },1000);
    }
}



$(".btn").on("click",function(){
    var clickedButton = $(this).attr("id");
    userClickPattern.push(clickedButton);

    animatePress(clickedButton);
    playSound(clickedButton);
    checkAnswer(userClickPattern.length - 1);
})

function checkAnswer(index){
    if(userClickPattern[index]===gamePattern[index]){
        console.log("Success");
        if((index+1) === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickPattern.length = 0;
            },1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
     gamePattern.length=0;
     userClickPattern.length=0;
     level = 0;
     started = false;
}
function animatePress(key){
    $("#"+key).addClass("pressed");
    setTimeout(function() {
        $("#"+key).removeClass("pressed");
    }, 500);
}
function playSound(key){
    var audio = new Audio('sounds/'+key+'.mp3');
    audio.play();
}
