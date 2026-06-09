// script.js

const songs = [
	{
		name: "Off My Face",
		file: "Justin/Justin_Bieber_-_Off_My_Face_Live_from_Paris_48KBPS.wav",
		image: "Photoos/Justin_Bieber_in_2015.jpg",
		artist: "justin",
		background: "Photoos/20e0b398e970-gettyimages-2263415244.webp",
		logo: "https://1000marcas.net/wp-content/uploads/2021/12/Justin-Bieber-logo.png"

	},

	{
		name: "Bloody Mary",
		file: "LadyGaga/Lady_Gaga_-_Bloody_Mary_Official_Audio_256kbps.wav",
		image: "Phootos/download.webp",
		artist: "ladygaga",
		background: "https://ichef.bbci.co.uk/news/1024/cpsprodpb/197d/live/62057290-fa95-11ef-a24f-f97f794e18ea.jpg.webp",
		logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Lady_Gaga_-_ARTPOP_logo.png",
		hoverSound: "sounds/zelda-hover.mp3"
	},

	{
		name: "Midna's Lament",
		file: "Zelda's Sound/4-11 Midna's Lament.wav",
		image: "Photoos/midna_zelda_tp.jpg",
		artist: "zelda",
		background: "Photoos/midna_imp.jpg",
		logo: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/9/9c/TLoZ_Series_Triforce_Artwork.png/revision/latest?cb=20190214050338",
		hoverSound: "Zelda's Sound/2-33 Wolf Song 1 - Song of Healing (Duo).wav"
	},

	{
		name: "Intro Music",
		file: "Zelda's Sound/1-02 Title.wav",
		image: "Photoos/midna_zelda_tp.jpg",
		artist: "zelda",
		background: "Photoos/midna_imp.jpg",
		logo: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/9/9c/TLoZ_Series_Triforce_Artwork.png/revision/latest?cb=20190214050338",
		hoverSound: "Zelda's Sound/2-33 Wolf Song 1 - Song of Healing (Duo).wav"
	},

];

let current = 0;

// Cargar canción inicial

const player = document.getElementById("player");
const songName = document.getElementById("songName");
const cover = document.getElementById("cover");
const container = document.getElementById("playerContainer");
const logo = document.getElementById("logo");
const hoverAudio = new Audio();
const sound = songs[current].hoverSound || "Zelda's Sound\link_hyah.wav.wav";

function loadSong() {
	player.src = songs[current].file;

	songName.textContent = songs[current].name;

	cover.src = songs[current].image;
	
	container.style.backgroundImage = `url('${songs[current].background}')`;
	logo.src = songs[current].logo;
	hoverAudio.src = songs[current].hoverSound;
}

let canPlay = true;

logo.addEventListener("mouseenter", () => {
    const sound = songs[current].hoverSound;
    if (!sound) return;

    hoverAudio.src = sound;
    hoverAudio.currentTime = 0;
    hoverAudio.play();
});

logo.addEventListener("mouseleave", () => {
    hoverAudio.pause(); // opcional
});

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
function mute() {
	player.volume = 0;
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

const barra = document.getElementById("barra");

const actual = document.getElementById("actual");
const restante = document.getElementById("restante");

function formatearTiempo(segundos) {
	const min = Math.floor(segundos / 60);
	const sec = Math.floor(segundos % 60);

	return `${min}:${sec.toString().padStart(2, "0")}`;
}

// actualizar barra visual
function updateBar() {
	const percent = player.currentTime / player.duration || 0 * 100;

	barra.style.background = `linear-gradient(to right,
        #1db954 0%,
        #1db954 ${percent}%,
        #444 ${percent}%,
        #444 100%)`;
}

player.addEventListener("loadedmetadata", () => {
	barra.max = player.duration;
	actual.textContent = "0:00";
	restante.textContent = "-" + formatearTiempo(player.duration);
});

player.addEventListener("timeupdate", () => {
	barra.value = player.currentTime;

	actual.textContent = formatearTiempo(player.currentTime);
	restante.textContent =
		"-" + formatearTiempo(player.duration - player.currentTime);

	updateBar();
});

// mover barra
barra.addEventListener("input", () => {
	player.currentTime = barra.value;
	updateBar();
});
const sidebar = document.getElementById("sidebar");
const songsList = document.getElementById("songsList");

function toggleMenu() {
	sidebar.classList.toggle("open");
}

function showSongs(artist) {
	songsList.innerHTML = "";

	const filtered = songs.filter((s) => s.artist === artist);

	filtered.forEach((song, index) => {
		const btn = document.createElement("button");
		btn.textContent = song.name;

		btn.onclick = () => {
			current = songs.indexOf(song);
			loadSong();
			player.play();
		};

		songsList.appendChild(btn);
	});
}
loadSong();
