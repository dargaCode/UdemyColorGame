// CONSTANTS

var SWATCH_COUNT = 6;
var BODY_COLOR = "#232323";

// SELECTORS

var swatches = document.querySelectorAll(".swatch");
var answerDisplaySpan = document.querySelector(".answer-rgb-display");

// VARIABLES

var colors = Array(SWATCH_COUNT);
var correctAnswerString = "";

// EVENTS

for (var i = 0; i < swatches.length; i++) {
  swatches[i].addEventListener("click", swatchGuessed);
}

function swatchGuessed() {
  if (isSwatchCorrect(this)) {
    console.log("correct!");
    colorAllSwatches(this.style.backgroundColor);
  }
  else {
    console.log("incorrect!");
    this.style.backgroundColor = BODY_COLOR;
  }
}

// LOGIC

function resetGame() {
  randomizeSwatches();
  correctAnswerString = generateCorrectAnswer();
  answerDisplaySpan.innerHTML = correctAnswerString.toUpperCase();
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
  console.log(swatchColor, correctAnswerString);
  return swatchColor === correctAnswerString;
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

// MAIN

resetGame();
