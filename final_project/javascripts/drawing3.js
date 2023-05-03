window.addEventListener("load", function () {
  setup();
});

const trophy = document.getElementById("trophy");

function displayFireworks() {
  trophy.classList.add("animate-up");

  document.getElementById("audioPlayer").play();
  const backgroundvids = ["fireworks", "fireworks2"];
  const randomIdx = Math.floor(Math.random() * backgroundvids.length);
  const randomvid = backgroundvids[randomIdx];
  document.getElementById(randomvid).style.display = "block";

  // Remove the onclick event listener after the fireworks have been displayed
  trophy.onclick = null;
}
