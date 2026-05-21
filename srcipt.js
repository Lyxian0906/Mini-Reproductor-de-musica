// script.js

const songs = [
	{
		name: "Off My Face",
		file: "Justin_Bieber_-_Off_My_Face_Live_from_Paris_48KBPS.wav",
		image: "Justin_Bieber_in_2015.jpg",
	},

	{
		name: "Bloody Mary",
		file: "Lady_Gaga_-_Bloody_Mary_Official_Audio_256kbps.wav",
		image: "download.webp",
	},
];

let current = 0;

const player = document.getElementById("player");
const songName = document.getElementById("songName");

// Cargar canción inicial
loadSong();

const player = document.getElementById("player");
const songName = document.getElementById("songName");
const cover = document.getElementById("cover");

let current = 0;

function loadSong() {
	player.src = songs[current].file;

	songName.textContent = songs[current].name;

	cover.src = songs[current].image;
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