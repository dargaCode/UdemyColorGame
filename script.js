var swatches = document.querySelectorAll(".swatch");
var pickedColorSpan = document.querySelector(".picked-color");

var colors = [
  "rgb(255, 000, 000)",
  "rgb(255, 255, 000)",
  "rgb(255, 000, 255)",
  "rgb(000, 255, 000)",
  "rgb(000, 255, 255)",
  "rgb(000, 000, 255)"
]

pickedColorRGB = colors[3];

for (var i = 0; i < swatches.length; i++) {
  swatches[i].style.backgroundColor = colors[i];
}

pickedColorSpan.innerHTML = pickedColorRGB.toUpperCase();
