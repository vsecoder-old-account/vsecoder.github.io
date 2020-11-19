let color;
var canvas = document.getElementById("canvas");
// Инициализируем переменные
// Генерируем палитру в элемент #palette
generatePalette(document.getElementById("palette"));

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// переменные для рисования
context.lineCap = "round";
context.lineWidth = 2;
rnt.oninput = function() {
    palettef(palette, this.value);;
}
rng.oninput = function() {
    context.lineWidth = this.value;
    p.innerHTML = this.value;
}
document.getElementById("clear").onclick = function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
};
document.getElementById("download").onclick = function download() {
    canvas.toBlob(function(blob) {
        saveAs(blob, "макет.png");
    });
};
// На любое движение мыши по canvas будет выполнятся эта функция
canvas.onmousemove = function drawIfPressed (e) {
  // в "e"  попадает экземпляр MouseEvent
  var x = e.offsetX;
  var y = e.offsetY;
  var dx = e.movementX;
  var dy = e.movementY;

  // Проверяем зажата ли какая-нибудь кнопка мыши
  // Если да, то рисуем
  if (e.buttons > 0) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x - dx, y - dy);
    context.stroke();
    context.closePath();
  }
};

function palettef(palette, color) {
    var paletteBlock = document.createElement('div');
    paletteBlock.className = 'button';
    paletteBlock.addEventListener('click', function changeColor(e) {
      context.strokeStyle = e.target.style.backgroundColor;
    });

    paletteBlock.style.backgroundColor = (
      '#' + color
    );
    palette.appendChild(paletteBlock);
}
function generatePalette(palette) {
    color = '000000'
    palettef(palette, color);
    color = 'ffffff'
    palettef(palette, color);
    color = 'a3a3a3'
    palettef(palette, color);
    color = '525252'
    palettef(palette, color);
    color = '4157a6'
    palettef(palette, color);
}