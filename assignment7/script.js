const video = document.getElementById("videoPlayer");
const audio = document.getElementById("audioPlayer");
let videoLength;

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const trophy = document.getElementById("trophy");

let width;
let height;

let pxScale = window.devicePixelRatio;

function setup() {
	trophy.play();

	width = canvas.width;
	height = canvas.height;

	canvas.style.width = width + "px";
	canvas.style.height = height + "px";

	canvas.width = width * pxScale;
	canvas.height = height * pxScale;

	context.scale(pxScale, pxScale);
}

let imgScale = 5;
let scaleFactor = imgScale * pxScale;

function draw() {
	context.drawImage(trophy, 0, 0, 533 / scaleFactor, 300 / scaleFactor);

	let imageData = context.getImageData(
		0,
		0,
		width / imgScale,
		height / imgScale
	);
	let data = imageData.data;

	context.clearRect(0, 0, width, height);

	for (let y = 0; y < imageData.height; y++) {
		for (let x = 0; x < imageData.width; x++) {
			let index = (x + y * imageData.width) * 4;

			let r = data[index + 0]; // red
			let g = data[index + 1]; // green
			let b = data[index + 2]; // blue
			let a = data[index + 3]; // alpha

			context.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)";

			context.save();
			context.translate(imgScale / 2, imgScale / 2); 
			context.fillRect(x * imgScale, y * imgScale, imgScale / 2, imgScale / 2);
			context.restore();
		}
	}

	requestAnimationFrame(draw);
}

// wait for DOM to load before drawing to the canvas
window.addEventListener("load", () => {
	setup();
	draw();
	// get video duration
	video.addEventListener(
		"loadedmetadata",
		function () {
			videoLength = video.duration.toFixed(1);
		},
		false
	);

	// display the current and remaining times
	video.addEventListener(
		"timeupdate",
		function () {
			//  Current time
			let videoTime = video.currentTime;
			// audio start playing after 16 seconds but we also use <18 b/c w/out it
			// user won't be able to pause the audio and forces them to listen to it
			if (videoTime.toFixed(1) > 16 && videoTime.toFixed(1) < 18) {
				audio.play();
			} else if (videoTime.toFixed(1) < 16) {
				// this is to make sure the audio is not played during this time
				audio.pause();
			}
		},
		false
	);
});
