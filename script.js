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

var answerColorRGB = colors[3];
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
