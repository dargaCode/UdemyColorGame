// CONSTANTS

var DIFFICULTIES = {
  easy: {swatchCount: 3},
  hard: {swatchCount: 6},
  expert: {swatchCount: 9}
};
var DEFAULT_DIFFICULTY = "easy";
var DEFAULT_BODY_COLOR = "#333333";
var DEFAULT_BANNER_COLOR = "#666666";
var DEFAULT_H1_TEXT = "RGB Color Match Game";
var WON_H1_TEXT = "You Win!";
var DEFAULT_RESET_BUTTON_TEXT = "New Colors";
var WON_RESET_BUTTON_TEXT = "Play Again?";

// SELECTORS

var resetButton = document.querySelector("#reset-btn");
var easyButton = document.querySelector("#easy-btn");
var hardButton = document.querySelector("#hard-btn");
var expertButton = document.querySelector("#expert-btn");
var difficultyButtons = document.querySelectorAll(".header .menu button");

var h1 = document.querySelector("h1");
var jumbotronBanner = document.querySelector(".jumbotron .banner");
var answerDisplaySpan = document.querySelector("#answer-rgb-display");
var swatches = document.querySelectorAll(".gallery .swatch");

// VARIABLES

var game = {
  difficulty: "",
  swatchCount: 0,
  colors: [],
  correctAnswerRGB: "",
  over: false
}

// EVENTS

function createEvents() {
  resetButton.addEventListener("click", resetGame);
  jumbotronBanner.addEventListener("click", resetGame);

  easyButton.addEventListener("click", function() {
    setActiveDifficultyButton(this);
    setGameDifficulty("easy");
  });

  hardButton.addEventListener("click", function() {
    setActiveDifficultyButton(this);
    setGameDifficulty("hard");
  });

  expertButton.addEventListener("click", function() {
    setActiveDifficultyButton(this);
    setGameDifficulty("expert");
  });

  for (var i = 0; i < swatches.length; i++) {
    swatches[i].addEventListener("click", swatchClicked);
  }
}

function swatchClicked() {
  if (game.over) {
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

// FUNCTIONS

function setGameDifficulty(difficulty) {
  game.difficulty = difficulty;
  game.swatchCount = DIFFICULTIES[game.difficulty].swatchCount;
  game.colors = Array(game.swatchCount);
  saveGameSettings();
  resetGame();
};

function saveGameSettings() {
  localStorage.setItem("difficulty", game.difficulty);
}

function loadSavedDifficulty() {
    if (localStorage.length === 0) {
    setGameDifficulty(DEFAULT_DIFFICULTY);
  } else {
    var savedDifficulty = localStorage.getItem("difficulty");
    setGameDifficulty(savedDifficulty);
  }
}

function resetGame() {
  game.over = false;
  applyDefaultText();
  jumbotronBanner.style.backgroundColor = DEFAULT_BANNER_COLOR;
  hideSwatches();
  randomizeSwatches(game.swatchCount);
  game.correctAnswerRGB = generateCorrectAnswer(game.swatchCount);
  answerDisplaySpan.innerHTML = game.correctAnswerRGB.toUpperCase();
}

function hideSwatches() {
  for (var i = 0; i < swatches.length; i++) {
    swatches[i].classList.add("hidden");
  }
}

function randomizeSwatches(swatchCount) {
  for (var i = 0; i < swatchCount; i++) {
    var swatchColor = getRandomColorString();
    game.colors[i] = swatchColor;
    swatches[i].classList.remove("hidden");
    swatches[i].style.backgroundColor = swatchColor;
  }
}

function generateCorrectAnswer(swatchCount) {
  var stringsLastIndex = swatchCount - 1;
  var answerIndex = getRandomIntWithMax(stringsLastIndex);
  return game.colors[answerIndex];
}

function isSwatchCorrect(chosenSwatch) {
  var swatchColor = chosenSwatch.style.backgroundColor;
  return swatchColor === game.correctAnswerRGB;
}

function winGame () {
  game.over = true;
  applyWinText();
  jumbotronBanner.style.backgroundColor = game.correctAnswerRGB;
  colorAllSwatches(game.correctAnswerRGB);
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

createEvents();
loadSavedDifficulty();
