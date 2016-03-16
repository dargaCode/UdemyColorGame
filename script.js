var swatches = document.querySelectorAll(".swatch");
var pickedColorSpan = document.querySelector(".answer-rgb-display");

var colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 255, 0)",
  "rgb(255, 0, 255)",
  "rgb(0, 255, 0)",
  "rgb(0, 255, 255)",
  "rgb(0, 0, 255)"
]

pickedColorRGB = colors[3];

for (var i = 0; i < swatches.length; i++) {
  swatches[i].style.backgroundColor = colors[i];
}

pickedColorSpan.innerHTML = pickedColorRGB.toUpperCase();
