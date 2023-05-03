window.addEventListener("load", function() {
    setup()
});
function setup() {
    const backgroundAudio = ["audioPlayer", "audioPlayer2"];
    const randomIdx = Math.floor(Math.random() * backgroundAudio.length);
    const randomAudio = backgroundAudio[randomIdx];
    document.getElementById(randomAudio).classList.remove("hidden");
}