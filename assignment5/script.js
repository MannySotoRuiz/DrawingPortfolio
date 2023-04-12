const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let width;
let height;

let pxScale = window.devicePixelRatio;

const image = document.querySelector('img');
const imgScale = 40;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  canvas.width = width * pxScale;
  canvas.height = height * pxScale;

  context.scale(pxScale, pxScale);
}

function draw() {

  if (width >= height) {
    context.drawImage(image, 0, 0, width/imgScale, width/imgScale * (image.height/image.width));
  } else {
    context.drawImage(image, 0, 0, height/imgScale * (image.width/image.height), height/imgScale);
  }

  let imageData = context.getImageData(0, 0, canvas.width/imgScale, canvas.height/imgScale);
  let data = imageData.data;
  let pixelColors = [];
  // organize all colors in an array of RGBA values
  for (let channel = 0; channel < data.length; channel += 4) {
    let color = 'rgba(' + data[channel] + ',' + data[channel + 1] + ',' + data[channel + 2] + ',' + data[channel + 3] + ')';
    pixelColors.push(color);
  }

  context.clearRect(0, 0, width, height);

  context.textBaseline = 'middle';
  context.strokeStyle = "green";
  context.textAlign = 'center';
  context.font = 'bold 80px serif';
  context.strokeText("UEFA Champions League⚽⚽", canvas.width/4, canvas.height/5);


  for (let y = 0; y < imageData.height; y++) { 
    for (let x = 0; x < imageData.width; x++) { 
      let index = (x + y * imageData.width) * 4; 

      let r = data[index + 0];
      let g = data[index + 1]; 
      let b = data[index + 2]; 
      let a = data[index + 3];

      // context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
      context.fillStyle = pixelColors[Math.floor(Math.random() * pixelColors.length)];

      context.save();
      context.translate(10, 10);
      context.beginPath();
      if ((x % 2 === 0) && (y % 2 === 0)) {
        context.arc(x * imgScale / pxScale, y * imgScale / pxScale, 10, 0, Math.PI * 2);
      } else if (x % 2 === 0) {
        context.arc(x * imgScale / pxScale, y * imgScale / pxScale, 8, 0, Math.PI * .5);
      } else if (y % 2 === 0) {
        context.arc(x * imgScale / pxScale, y * imgScale / pxScale, 8, 0, Math.PI * 1);
      } else {
        context.arc(x * imgScale / pxScale, y * imgScale / pxScale, 5, 0, Math.PI * 2);
      }
      context.fill();
      context.restore();
    }
  }
}

window.addEventListener('load', () => {
  setup();
  draw();
});

window.addEventListener('resize', () => {
  setup();
  draw();
});