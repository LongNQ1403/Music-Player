let playBtn = document.querySelector('.play-btn');
let iElement = document.querySelector('.play');
let isPlaying = false;
let disk = document.querySelector('.disk');
let currentSong = 0;
const audio = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const songArtist = document.querySelector('.artist-name');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const nextBtn = document.querySelector('.next-btn');
const backBtn = document.querySelector('.pre-btn');
getSong(currentSong);
// Lắng nghe sự kiện người dùng click vào nút play nhạc
playBtn.onclick = function () {
    if (isPlaying) {
        iElement.classList.replace("fa-pause", "fa-play");
        isPlaying = false;
        disk.style.animationPlayState = "paused";
        audio.pause();
    } else {
        iElement.classList.replace("fa-play", "fa-pause");
        isPlaying = true;
        disk.style.animation = 'rotate 20s linear infinite';
        audio.play();
        setInterval(() => {
            seekBar.value = audio.currentTime;
            currentTime.innerHTML = formatTime(audio.currentTime);
        }, 1000);
    }
}
// Lắng nghe  sự kiện khi người dùng click trên thanh tua nhạc
seekBar.addEventListener('change', () => {
    audio.currentTime = seekBar.value;
});
// Lắng nghe sự kiện khi người dùng click vào nút next
nextBtn.addEventListener('click', () => {
    if (currentSong >= songs.length) {
        currentSong = 0;
    } else {
        currentSong = currentSong + 1;
    }
    isPlaying = false;
    getSong(currentSong);
    playBtn.click();
});
// Lắng nghe sự kiện khi người dùng click vào nút back
backBtn.addEventListener('click', () => {
    if (currentSong <= 0) {
        currentSong = songs.length - 1;
    } else {
        currentSong = currentSong - 1;
    }
    getSong(currentSong);
    isPlaying = false;
    playBtn.click();
});
function getSong(index) {
    seekBar.value = 0;
    let song = songs[index];
    currentSong = index;
    audio.src = song.path;
    songName.innerHTML = song.name;
    songArtist.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.image}')`;
    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = audio.duration;
        musicDuration.innerHTML = formatTime(audio.duration);
    }, 300);
};

// Hàm thay đổi từ giây sang phút
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}
