const video = document.querySelector("video");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let width;
let height;

// get ratio of the resolution in physical pixels to the resolution in CSS pixels
let pxScale = window.devicePixelRatio;

function setup() {
	// make sure video begins to play (some browsers diregard autoplay attribute)
	video.play();

	// fixed canvas size
	width = canvas.width;
	height = canvas.height;

	// set the CSS display size
	canvas.style.width = width + "px";
	canvas.style.height = height + "px";

	// set the number of display pixels, scaled for device resolution
	canvas.width = width * pxScale;
	canvas.height = height * pxScale;

	// normalize the coordinate system
	context.scale(pxScale, pxScale);
}

let imgScale = 10;
let scaleFactor = imgScale * pxScale; // scaling relative to pixel density

function draw() {
	// draw video image, scaled down by a factor of imgScale * pxScale
	// draw sun and cloud icons
	// drawImage uses img src (or video src in this case)
	// putImageData uses what is on the canvas
	// we need to drawImage to canvas first, then getImageData for putImageData to work
	context.drawImage(video, 0, 0, 533 / scaleFactor, 300 / scaleFactor);

	// access video image data
	// getImageData after we drawImage to canvas
	// getImageData only works on localhost! (try it without localhost to see error)
	let imageData = context.getImageData(
		0,
		0,
		width / imgScale,
		height / imgScale
	);
	let data = imageData.data;

	// clear original video
	// clear canvas so that putImageData is the only line drawing to canvas
	// otherwise, we wouldn't know if drawImage or putImageData is the one drawing to canvas
	// we will draw the video with circles using canvas.arc later
	context.clearRect(0, 0, width, height);

	// iterate over every row and column of video image
	for (let y = 0; y < imageData.height; y++) {
		for (let x = 0; x < imageData.width; x++) {
			let index = (x + y * imageData.width) * 4; // index position of every pixel

			let r = data[index + 0]; // red
			let g = data[index + 1]; // green
			let b = data[index + 2]; // blue
			let a = data[index + 3]; // alpha (not used but this reminds us that the data contains rgba and not just rgb)

			// apply rgb as fill color to subsequent shapes
			context.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)";

			context.save();
			// adjust position of circles
			context.translate(imgScale / 2, imgScale / 2); // optional to center in frame
			context.beginPath();
			// draw circle at appropriate location
			context.arc(x * imgScale, y * imgScale, 5, 0, Math.PI * 2);
			context.fill();
			context.restore();
		}
	}

	requestAnimationFrame(draw);
}

// y coordinate of the fireball and snowball that fall
// let y = 2;

// const video = document.getElementById("videoPlayer");
// const audio = document.getElementById("audioPlayer");
// let videoLength;

// const canvas = document.querySelector("canvas");
// const context = canvas.getContext("2d");
// const trophy = document.getElementById("trophy");

// let width;
// let height;

// // get ratio of the resolution in physical pixels to the resolution in CSS pixels
// let pxScale = window.devicePixelRatio;

// function setup() {
// 	// make sure video begins to plays
// 	trophy.play();

// 	// fixed cavnas size
// 	width = canvas.width;
// 	height = canvas.height;

// 	// set the css display size
// 	canvas.style.width = width + "px";
// 	canvas.style.height = height + "px";

// 	// set the number of display pixels, scaled for device resolution
// 	canvas.width = width * pxScale;
// 	canvas.height = height * pxScale;

// 	// normalize the coordinate system
// 	context.scale(pxScale, pxScale);
// }

// let imgScale = 5;
// let scaleFactor = imgScale * pxScale; // scaling relative to pixel density

// function draw() {
// 	// draw video image, scaled down by a factor of imgScale * pxScale
// 	// context.drawImage(trophy, 0, 0, 533 / scaleFactor, 300 / scaleFactor);
// 	context.drawImage(trophy, 0, 0, 533 / scaleFactor, 300 / scaleFactor);

// 	// access video image data
// 	let imageData = context.getImageData(
// 		0,
// 		0,
// 		width / imgScale,
// 		height / imgScale
// 	);
// 	let data = imageData.data;

// 	// clear original video
// 	context.clearRect(0, 0, width, height);

// 	// iterate over every row and column of video image
// 	for (let y = 0; y < imageData.height; y++) {
// 		for (let x = 0; x < imageData.width; x++) {
// 			let index = (x + y * imageData.width) * 4; // index position of every pixel

// 			let r = data[index + 0]; // red
// 			let g = data[index + 1]; // green
// 			let b = data[index + 2]; // blue
// 			let a = data[index + 3]; // alpha

// 			// apply rgb as fill color to subsequent shapes
// 			context.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)";

// 			context.save();
// 			// adjust position of squares
// 			context.translate(imgScale / 2, imgScale / 2); // optional to center in frame
// 			context.fillRect(x * imgScale, y * imgScale, imgScale / 2, imgScale / 2);
// 			context.restore();
// 		}
// 	}

// 	requestAnimationFrame(draw);
// }

// // wait for DOM to load before drawing to the canvas
// window.addEventListener("load", () => {
// 	setup();
// 	draw();
// 	// get video duration
// 	video.addEventListener(
// 		"loadedmetadata",
// 		function () {
// 			videoLength = video.duration.toFixed(1);
// 		},
// 		false
// 	);

// 	// display the current and remaining times
// 	video.addEventListener(
// 		"timeupdate",
// 		function () {
// 			//  Current time
// 			let videoTime = video.currentTime;
// 			// audio start playing after 16 seconds but we also use <18 b/c w/out it
// 			// user won't be able to pause the audio and forces them to listen to it
// 			if (videoTime.toFixed(1) > 16 && videoTime.toFixed(1) < 18) {
// 				audio.play();
// 			} else if (videoTime.toFixed(1) < 16) {
// 				// this is to make sure the audio is not played during this time
// 				audio.pause();
// 			}
// 		},
// 		false
// 	);
// });
