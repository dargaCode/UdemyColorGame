// CONSTANTS

var SWATCH_COUNT = 6;
var BODY_COLOR = "#333333";
var BANNER_COLOR = "#666666";

// SELECTORS

var resetButton = document.querySelector("#reset-btn");
var easyButton = document.querySelector("#easy-btn");
var hardButton = document.querySelector("#hard-btn");
var difficultyButtons = document.querySelectorAll(".header .menu button");

var jumbotronBanner = document.querySelector(".jumbotron .banner");
var answerDisplaySpan = document.querySelector("#answer-rgb-display");
var swatches = document.querySelectorAll(".gallery .swatch");

// VARIABLES

var colors = Array(SWATCH_COUNT);
var correctAnswerRGB = "";
var gameOver = false;

// EVENTS

resetButton.addEventListener("click", resetGame);
easyButton.addEventListener("click", setDifficultyEasy);
hardButton.addEventListener("click", setDifficultyHard);
jumbotronBanner.addEventListener("click", resetGame);

for (var i = 0; i < swatches.length; i++) {
  swatches[i].addEventListener("click", swatchClicked);
}

// FUNCTIONS

function setDifficultyEasy() {
  setActiveDifficultyButton(this);
}

function setDifficultyHard() {
  setActiveDifficultyButton(this);
}

function swatchClicked() {
  if (gameOver) {
    resetGame();
  }
  else {
    if (isSwatchCorrect(this)) {
      winGame();
    }
    else {
      this.style.backgroundColor = BODY_COLOR;
    }
  }
}

function resetGame() {
  gameOver = false;
  jumbotronBanner.style.backgroundColor = BANNER_COLOR;
  randomizeSwatches();
  correctAnswerRGB = generateCorrectAnswer();
  answerDisplaySpan.innerHTML = correctAnswerRGB.toUpperCase();
}

function randomizeSwatches() {
  for (var i = 0; i < colors.length; i++) {
    var swatchColor = getRandomColorString();
    colors[i] = swatchColor;
    swatches[i].style.backgroundColor = swatchColor;
  }
}

function generateCorrectAnswer() {
  var stringsLastIndex = colors.length - 1;
  var answerIndex = getRandomIntWithMax(stringsLastIndex);
  return colors[answerIndex];
}

function isSwatchCorrect(chosenSwatch) {
  var swatchColor = chosenSwatch.style.backgroundColor;
  return swatchColor === correctAnswerRGB;
}

function winGame () {
  gameOver = true;
  jumbotronBanner.style.backgroundColor = correctAnswerRGB;
  colorAllSwatches(correctAnswerRGB);
}

function getRandomColorString() {
  var red = getRandomIntWithMax(255);
  var green = getRandomIntWithMax(255);
  var blue = getRandomIntWithMax(255);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function getRandomIntWithMax(maxRandom) {
  var result = Math.random() * maxRandom;
  return Math.round(result);
}

function colorAllSwatches(color) {
  for (var i = 0; i < swatches.length; i++) {
    swatches[i].style.backgroundColor = color;
  }
}

function setActiveDifficultyButton(button) {
  clearActiveDifficultyButtons();
  button.classList.add("active");
}

function clearActiveDifficultyButtons() {
  for (var i = 0; i < difficultyButtons.length; i++) {
    difficultyButtons[i].classList.remove("active");
  }
}

// MAIN

resetGame();
