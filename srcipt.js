// script.js

const songs = [
	"Justin_Bieber_-_Off_My_Face_Live_from_Paris_48KBPS.wav",
	"Lady_Gaga_-_Bloody_Mary_Official_Audio_256kbps.wav",
	"song3.wav",
];

let current = 0;

const player = document.getElementById("player");
const songName = document.getElementById("songName");

// Cargar canción inicial
loadSong();

function loadSong() {
	player.src = songs[current];
	songName.textContent = "Playing: " + songs[current];
}

function playSong() {
	player.play();
}

function stopSong() {
	player.pause();
}

function restart() {
	player.currentTime = 0;
	player.play();
}

function volUp() {
	player.volume = Math.min(player.volume + 0.1, 1);
}

function volDown() {
	player.volume = Math.max(player.volume - 0.1, 0);
}

function next() {
	current = (current + 1) % songs.length;
	loadSong();
	player.play();
}

function previous() {
	current = (current - 1 + songs.length) % songs.length;
	loadSong();
	player.play();
}