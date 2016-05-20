/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber = generateWinningNumber();

var whatsLeft;
var whatsLeftArray = [];
var realDistance;
var hintGiven = false;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
  return Math.round(Math.random() * 100);
}

// Fetch the Players Guess

// function playersGuessSubmission(){
// 	// add code here
// }

function clickSubmit () {
   playersGuess = +$('.guesstext input').val();
   $('.guesshelper').removeClass('hinter');

        // if total tries is more than 0
        if(whatsLeft > 0 && loopThrough(playersGuess, whatsLeftArray)) {
          if (checkGuess()) {
            $('#resultsbox').text('CHA CHING! You win. #herostatus');
            $('#resultsbox').addClass('success');
            $('.glyphicon').addClass('success');
            distanceFar();
          } else {
            // say try again
            whatsLeft--;
            if (whatsLeft > 0) {
              $('#resultsbox').html('<h3 id=\"resultsbox\">Nope! <span id=\'guessesleft\'>' + whatsLeft + '</span> guesses remaining</h3>');
              distanceFar();
            } else {
              $('#resultsbox').html('<h3 id=\"resultsbox\">Nope! <span id=\'guessesleft\'>' + whatsLeft + '</span> guesses remaining #failure #comeonbro</h3>');
              $('#resultsbox').addClass('failure'); 
              $('.glyphicon').addClass('failure');
              $('.guesshelper').text('');
            }
            // store to array
            whatsLeftArray.push(playersGuess);
          }
        }
}


// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
  if (winningNumber > playersGuess) {
    return 'LOWER';
  } else {
    return 'HIGHER';
  }

}

function distanceFar () {
  realDistance = winningNumber - playersGuess;
  var rounded = Math.ceil(realDistance / 10) * 10;
  if (rounded < 0) {rounded = rounded * -1;}
  if (realDistance === 0) {
    return $('.guesshelper').html('<br><p>Don\'t let it get to your head...</p>').css({"color": "black"}); 
  } else if (rounded < 10) {
    return $('.guesshelper').html('<br><p>Your guess was ' + lowerOrHigher() + ' but hella close dude.</p>');  
  } else {
    return $('.guesshelper').html('<br><p>Your guess was ' + lowerOrHigher() + ' and within ' + rounded + ' of the answer</p>');  

    }
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
  if (playersGuess === winningNumber) {
    return true; 
  } else {return false;}
}

function loopThrough (currentGuess, guessArray){
  var test = true;
  for (var i = 0; i < guessArray.length; i++) {
    if (currentGuess === guessArray[i]) {
      test = false;
    }
  }
  return test;
}

// Create a provide hint button that provides additional clues to the "Player"
function randomplusorminus1to10 (){
  var randomNum = Math.floor(Math.random() * 10) + 1;
  if (Math.random()*10 > 5) {
    return randomNum + winningNumber;
  } else {
    return (randomNum * -1) + winningNumber;
  }
}

function provideHint(){
if (hintGiven === false) {
  if (whatsLeft === 1) {
    hintGiven = true;
    var arrayH = [];
    arrayH.push(winningNumber);
    arrayH.push(randomplusorminus1to10());
    arrayH.push(randomplusorminus1to10());
    arrayH.sort();
    return $('.guesshelper').html('<br><p>Ok fine... it\'s one of these: ' + arrayH[0] + ' // ' + arrayH[1] + ' // ' + arrayH[2] + '</p>').addClass('hinter');  
  } else {
    return $('.guesshelper').html('<br><p>You serious? No hints unless you\'re on your last chance.</p>').addClass('hinter');  
  }
}
}

// Allow the "Player" to Play Again

function playAgain(){
        winningNumber = generateWinningNumber();
        $('#resultsbox').html('<h3 id="resultsbox"><span id=\'guessesleft\'>5</span> guesses remaining</h3>');
        whatsLeft = +$('#guessesleft').text();
        $('.guesshelper').text('').removeClass('hinter');
        whatsLeftArray = [];  
        $('#resultsbox').removeClass('failure success'); 
        $('.glyphicon').removeClass('failure success');
      }


/* **** Event Listeners/Handlers ****  */

