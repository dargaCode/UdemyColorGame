// CONSTANTS

var SWATCH_COUNT_EASY = 3;
var SWATCH_COUNT_HARD = 6;
var DEFAULT_BODY_COLOR = "#333333";
var DEFAULT_BANNER_COLOR = "#666666";
var DEFAULT_H1_TEXT = "RGB Color Match Game";
var WON_H1_TEXT = "You Win!";
var DEFAULT_RESET_BUTTON_TEXT = "New Colors";
var WON_RESET_BUTTON_TEXT = "Play Again";

// SELECTORS

var resetButton = document.querySelector("#reset-btn");
var easyButton = document.querySelector("#easy-btn");
var hardButton = document.querySelector("#hard-btn");
var difficultyButtons = document.querySelectorAll(".header .menu button");

var h1 = document.querySelector("h1");
var jumbotronBanner = document.querySelector(".jumbotron .banner");
var answerDisplaySpan = document.querySelector("#answer-rgb-display");
var swatches = document.querySelectorAll(".gallery .swatch");

// VARIABLES

var difficultySwatchCount = SWATCH_COUNT_EASY;
var colors = Array(difficultySwatchCount);
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
  difficultySwatchCount = SWATCH_COUNT_EASY;
  resetGame();
}

function setDifficultyHard() {
  setActiveDifficultyButton(this);
  difficultySwatchCount = SWATCH_COUNT_HARD;
  resetGame()
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
      this.style.backgroundColor = DEFAULT_BODY_COLOR;
    }
  }
}

function resetGame() {
  gameOver = false;
  applyDefaultText();
  jumbotronBanner.style.backgroundColor = DEFAULT_BANNER_COLOR;
  hideSwatches();
  randomizeSwatches(difficultySwatchCount);
  correctAnswerRGB = generateCorrectAnswer(difficultySwatchCount);
  answerDisplaySpan.innerHTML = correctAnswerRGB.toUpperCase();
}

function hideSwatches() {
  for (var i = 0; i < swatches.length; i++) {
    swatches[i].classList.add("hidden");
  }
}

function randomizeSwatches(swatchCount) {
  for (var i = 0; i < swatchCount; i++) {
    var swatchColor = getRandomColorString();
    colors[i] = swatchColor;
    swatches[i].classList.remove("hidden");
    swatches[i].style.backgroundColor = swatchColor;
  }
}

function generateCorrectAnswer(swatchCount) {
  var stringsLastIndex = swatchCount - 1;
  var answerIndex = getRandomIntWithMax(stringsLastIndex);
  return colors[answerIndex];
}

function isSwatchCorrect(chosenSwatch) {
  var swatchColor = chosenSwatch.style.backgroundColor;
  return swatchColor === correctAnswerRGB;
}

function winGame () {
  gameOver = true;
  applyWinText();
  jumbotronBanner.style.backgroundColor = correctAnswerRGB;
  colorAllSwatches(correctAnswerRGB);
}

function applyWinText() {
  resetButton.innerHTML = WON_RESET_BUTTON_TEXT;
  h1.innerHTML = WON_H1_TEXT;
}

function applyDefaultText() {
  resetButton.innerHTML = DEFAULT_RESET_BUTTON_TEXT;
  h1.innerHTML = DEFAULT_H1_TEXT;
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
