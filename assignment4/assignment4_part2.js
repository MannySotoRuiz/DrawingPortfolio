const player = document.querySelector("#player");
const soccerField = document.getElementById("imgContainer");
const goal = document.getElementById("goal");
const letsGo = document.getElementById("letsGo");
const almost = document.getElementById("almost");

let position = -400;
let animation = requestAnimationFrame(runPlayer);

function runPlayer() {
    animation = requestAnimationFrame(runPlayer);

    if (position < 1000) {
        position += 2;
        player.style.left = position + "px";

    } else {
        position = -400;
    }

    if (position <= 200) {
        letsGo.classList.remove("hidden");
        goal.classList.add("hidden");
    } else if (position > 200 && position <= 700) {
        letsGo.classList.add("hidden");
        almost.classList.remove("hidden");
    } else if (position > 700) {
        almost.classList.add("hidden");
        goal.classList.remove("hidden");
    } else {
        goal.classList.add("hidden");
        letsGo.classList.add("hidden");
        almost.classList.add("hidden");
    }
}

// soccerField.addEventListener();