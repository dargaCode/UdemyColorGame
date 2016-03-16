var SWATCH_COUNT = 6;

var swatches = document.querySelectorAll(".swatch");
var answerDisplaySpan = document.querySelector(".answer-rgb-display");

var colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 255, 0)",
  "rgb(255, 0, 255)",
  "rgb(0, 255, 0)",
  "rgb(0, 255, 255)",
  "rgb(0, 0, 255)"
]

var answerColorIndex = getRandomIntWithMax(SWATCH_COUNT - 1);
var answerColorRGB = colors[answerColorIndex];
answerDisplaySpan.innerHTML = answerColorRGB.toUpperCase();

for (var i = 0; i < swatches.length; i++) {
  swatches[i].style.backgroundColor = colors[i];
}

for (var i = 0; i < swatches.length; i++) {
  swatches[i].addEventListener("click", swatchClicked);
}

function swatchClicked() {
  if (isSwatchCorrect(this)) {
    console.log("correct!");
  }
  else {
    console.log("incorrect!");
  }
}

function isSwatchCorrect(chosenSwatch) {
  var swatchColor = chosenSwatch.style.backgroundColor;
  console.log(swatchColor, answerColorRGB);
  return swatchColor === answerColorRGB;
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
