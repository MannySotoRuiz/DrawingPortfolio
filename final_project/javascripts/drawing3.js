function displayFireworks() {
  var trophy = document.getElementById("trophy");
  var fireworks = document.getElementById("fireworks");

  document.getElementById("audioPlayer").play();

  trophy.style.top = "30%";
  fireworks.style.display = "block"; // Display the fireworks video

  // Remove the onclick event listener after the fireworks have been displayed
  trophy.onclick = null;
}
