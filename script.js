var SWATCH_COUNT = 6;
var BODY_COLOR = "#232323";

var swatches = document.querySelectorAll(".swatch");
var answerDisplaySpan = document.querySelector(".answer-rgb-display");

var colors = Array(SWATCH_COUNT);

for (var i = 0; i < colors.length; i++) {
  var swatchColor = getRandomColorString();
  colors[i] = swatchColor;
  swatches[i].style.backgroundColor = swatchColor;
  swatches[i].addEventListener("click", swatchClicked);
}

var answerColorIndex = getRandomIntWithMax(SWATCH_COUNT - 1);
var answerColorRGB = colors[answerColorIndex];
answerDisplaySpan.innerHTML = answerColorRGB.toUpperCase();

function swatchClicked() {
  if (isSwatchCorrect(this)) {
    console.log("correct!");
  }
  else {
    console.log("incorrect!");
    this.style.backgroundColor = BODY_COLOR;
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
