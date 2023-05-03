window.addEventListener("load", function() {
    setup()
});

function setup() {
    const img1 = "https://soto-ruiz-art.s3.amazonaws.com/campnou.webp";
    const img2 = "https://soto-ruiz-art.s3.amazonaws.com/outside2.webp"
    const backgroundImages = [img1, img2];
    const randomIdx = Math.floor(Math.random() * backgroundImages.length);
    const randomImg = backgroundImages[randomIdx];
    const imgs = document.querySelectorAll("img");
    if (randomImg === img1) {
        console.log(imgs);
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].classList.add("animate-right");
        }
    } else {
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].classList.add("animate-left");
        }
    }

    document.body.style.backgroundImage = `url(${randomImg})`;
}