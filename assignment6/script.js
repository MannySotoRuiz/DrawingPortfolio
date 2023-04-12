const apiKey = "KD3JlHXUemNJy8AIoBejnopOYu4gbmvTsuoal9N4jZk"
const query = "soccer stadium";
let endPoint = `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${query}&client_id=${apiKey}`;

const canvas1 = document.querySelector('#c1');
const canvas2 = document.querySelector('#c2');

const context1 = canvas1.getContext('2d');
const context2 = canvas2.getContext('2d');

let width;
let height;
// determine pixel density of display
let pxScale = window.devicePixelRatio;


// access image from the DOM


function setup() {
    // full-browser canvas
    width = 600;
    height = 400;
  
    // set the CSS display size
    canvas1.style.width = width + 'px';
    canvas1.style.height = height + 'px';
  
    // set the canvas pixel density
    canvas1.width = width * pxScale;
    canvas1.height = height * pxScale;
  
    // normalize the coordinate system
    context1.scale(pxScale, pxScale);

    // set the CSS display size
    canvas2.style.width = width + 'px';
    canvas2.style.height = height + 'px';
  
    // set the canvas pixel density
    canvas2.width = width * pxScale;
    canvas2.height = height * pxScale;
  
    // normalize the coordinate system
    context2.scale(pxScale, pxScale);
}


function drawBall(ctx) {
    // Draw ball
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(200, 150, 100, 0, Math.PI * 2);
    ctx.fill();

    // draw pentagon
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.lineWidth = 1;
    const numberOfSides = 5;
    const size = 50;
    const Xcenter = 200;
    const Ycenter = 150;
    const step  = 2 * Math.PI / numberOfSides;
    const shift = (Math.PI / 180.0) * -18;
    ctx.beginPath();
    for (let i = 0; i <= numberOfSides;i++) {
    	const curStep = i * step + shift;
        ctx.lineTo (Xcenter + size * Math.cos(curStep), Ycenter + size * Math.sin(curStep));
    }
    ctx.stroke();
    ctx.fill();

    // draw lines
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.lineTo(200, 50);
    ctx.stroke();

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.lineTo(105, 120);
    ctx.stroke();

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.lineTo(295, 120);
    ctx.stroke();

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.lineTo(260, 232);
    ctx.stroke();

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.lineTo(140, 232);
    ctx.stroke();
}


async function draw() {
    
    width = 600;
    height = 400;
    
    let userData;

    console.log("fetching images");
    const response = await fetch(endPoint);
    let data;
    let photographer = '';
    if (response.status !== 200) {
        alert("Error happened with Unsplash API");
        return;
    } else {
        data = await response.json();
        const imageUrl = data.results[0].urls.small;
        photographer = (data.results[0].user.name.length > 0) ? data.results[0].user.name : "No name";
        userData = data.results[0].user.total_photos;
        const image = new Image();
        
        image.src = imageUrl;
        image.onload = () => {
            context2.drawImage(image, 350, 100, 200, 200);
        }
    }

    // Draw a rectangle around the whole canvas
    context1.beginPath();
    context1.rect(0, 0, width, height);
    context1.fillStyle = "#ccc";
    context1.fill();

    context2.beginPath();
    context2.rect(0, 0, width, height);
    const r = userData ? userData : 150;
    const color = `rgba(0,${r},0,0.5)`;
    context2.fillStyle = color;
    context2.fill();

    context2.textBaseline = 'middle';
    context2.strokeStyle = "white";
    context2.textAlign = 'center';
    context2.font = '30px serif';
    context2.strokeText(`Photographer: ${photographer}`, width/2, height/1.1);

    drawBall(context1);
    drawBall(context2);

}

window.addEventListener('load', () => {
    setup();
    draw();
});
  
  window.addEventListener('resize', () => {
    setup();
    draw();
});