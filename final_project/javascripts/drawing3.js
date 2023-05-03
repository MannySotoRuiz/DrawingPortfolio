window.addEventListener("load", function () {
  setup();
});

const trophy = document.getElementById("trophy");

function displayFireworks() {
  const fireworks = document.getElementById("fireworks");
  trophy.classList.add("animate-up");

  document.getElementById("audioPlayer").play();

  fireworks.style.display = "block"; // Display the fireworks video

  // Remove the onclick event listener after the fireworks have been displayed
  trophy.onclick = null;
}
