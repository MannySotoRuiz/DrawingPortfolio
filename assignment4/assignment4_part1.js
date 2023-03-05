window.addEventListener('load', function() {
    fetchImages();
});

const galleryContainer = document.getElementById("galleryContainer");

async function fetchImages() {
    console.log("fetching images");
    const query = "soccer stadium";
    let endPoint = `https://api.unsplash.com/search/photos?page=1&per_page=20&query=${query}&client_id=KD3JlHXUemNJy8AIoBejnopOYu4gbmvTsuoal9N4jZk`;
    const response = await fetch(endPoint);
    if (response.status !== 200) {
        alert("Error happened with Unsplash API");
        return;
    } else {
        const data = await response.json();
        displayImages(data);
    }
}

function displayImages(allImages) {
    for (let i = 0; i < allImages.results.length; i++) {
        const randomSize = Math.floor(Math.random() * 3);
        let picSize;
        if (randomSize === 0) { picSize = "small"; } 
        else if (randomSize === 1) { picSize = "medium"; } 
        else { picSize = "large"; }

        let galleryCardDiv = document.createElement("div");
        galleryCardDiv.addEventListener("mouseover", (e) => e.target.style.opacity = "1.0"); // event listener, user action hw requirement
        galleryCardDiv.classList.add("galleryCard");
        galleryCardDiv.classList.add("card");
        galleryCardDiv.classList.add(picSize);

        let holdImg = document.createElement("img");
        holdImg.classList.add("imgStyle");
        holdImg.src = allImages.results[i].urls.regular;
        holdImg.alt = "pic";

        galleryCardDiv.appendChild(holdImg);
        galleryContainer.appendChild(galleryCardDiv);
    }
    startAnimation();
}

let currentIndex = 0;
function startAnimation() {
    const allCards = document.querySelectorAll(".galleryCard");
    setInterval(function() {
        for (let i = 0; i < allCards.length; i++) {
            if (i === currentIndex) {
                allCards[i].children[0].style.opacity = "1.0";
                allCards[i].children[0].classList.add("cardAnimation");
            } else {
                allCards[i].children[0].style.opacity = "0.6";
            }
        }
        currentIndex++;
        if (currentIndex > allCards.length) {
            currentIndex = 0;
            for (let i = 0; i < allCards.length; i++) {
                allCards[i].children[0].style.opacity = "1.0";
                allCards[i].children[0].classList.remove("cardAnimation");
            }
        }

    }, 2500);            
}