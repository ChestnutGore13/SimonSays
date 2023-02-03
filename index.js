var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var proceed = true;
var canPlay = true;

$(".start").click(startGame);

$(".btn").click(function () {
  if (started && canPlay) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    proceed = checkAnswer(userClickedPattern.length);
    if (!proceed) {
      gameOver();
    }
    if (userClickedPattern.length == gamePattern.length) {
      if (proceed) {
        canPlay = false;
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
        canPlay = true;
      }
    }
  }
});

function startGame() {
  $("#level-title").text("Level 1");
  if (!started) {
    $("#level-title2").slideUp();
    $(".start").hide();
    $(".sol").remove();
    setTimeout(function () {
      started = true;
      nextSequence();
    }, 800);
  }
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour)
    .fadeOut(200)
    .fadeIn(200);
  console.log(gamePattern[randomNumber]);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  console.log(audio);
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  for (var i = 0; i < currentLevel; i++) {
    console.log(userClickedPattern[i] === gamePattern[i]);
    if (userClickedPattern[i] !== gamePattern[i]) {
      return false;
      break;
    }
  }
  return true;
}

function gameOver() {
  started = false;
  canPlay = false;
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text(
    "Game over, you made it to level " +
      level +
      ". Press 'Start' to play again!"
  );
  $("#level-title").css("font-size", "1.5rem");
  $("#level-title").after(
    "<h4 class= 'sol'>You pressed: " + userClickedPattern + "</h4>"
  );
  $("#level-title").after(
    "<h4 class= 'sol'>Sequence was: " + gamePattern + "</h4>"
  );
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  canPlay = true;
  $(".start").slideDown();
}
