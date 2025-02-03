const PASSWORD = "2580";
let musicList = JSON.parse(localStorage.getItem("musicFiles") || "[]");
let currentIndex = -1;
let isEditable = false;
const audioPlayer = document.getElementById("audioPlayer");

// ✅ 비밀번호 확인
function checkPassword() {
    let inputPass = document.getElementById("password").value;
    if (inputPass === PASSWORD) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-screen").style.display = "block";
        loadMusicList();
    } else {
        alert("비밀번호가 틀렸습니다.");
    }
}

// ✅ 화면 잠그기
function lockScreen() {
    document.getElementById("password").value = "";
    document.getElementById("main-screen").style.display = "none";
    document.getElementById("login-screen").style.display = "block";
}

// ✅ 수정 잠금 해제
function unlockEdit() {
    let inputPass = prompt("비밀번호를 입력하세요:");
    if (inputPass === PASSWORD) {
        isEditable = true;
        loadMusicList();
        alert("수정이 가능합니다.");
    } else {
        alert("비밀번호가 틀렸습니다.");
    }
}

// ✅ 파일 업로드 (MP3만 가능)
function uploadFile() {
    let fileInput = document.getElementById("fileInput");
    let file = fileInput.files[0];

    if (!file) {
        alert("파일을 선택해주세요.");
        return;
    }

    if (!file.name.endsWith(".mp3")) {
        alert("MP3 파일만 업로드할 수 있습니다.");
        return;
    }

    let songName = file.name.replace(".mp3", ""); // 기본 제목 설정
    let artistName = "Unknown"; // 기본 가수 이름

    let reader = new FileReader();
    reader.onload = function (event) {
        // 파일을 Base64 데이터로 읽어서 배열에 저장
        let songData = {
            title: songName,
            artist: artistName,
            fileData: event.target.result, // Base64 데이터
        };
        musicList.push(songData);
        localStorage.setItem("musicFiles", JSON.stringify(musicList));

        alert("업로드 완료!");
        loadMusicList();
    };

    // 파일을 읽어서 Base64로 변환
    reader.readAsDataURL(file);
}

// ✅ 저장된 음악 리스트 불러오기
function loadMusicList() {
    let listElement = document.getElementById("musicList");
    listElement.innerHTML = "";

    musicList.forEach((song, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td contenteditable="${isEditable}">${song.title}</td>
            <td contenteditable="${isEditable}">${song.artist}</td>
            <td><button onclick="playSong(${index})">▶️</button></td>
            <td><button onclick="downloadSong(${index})">⬇️</button></td>
            <td><button onclick="deleteSong(${index})">🗑 삭제</button></td>
        </tr>`;
        listElement.innerHTML += row;
    });
}

// ✅ 노래 재생
function playSong(index) {
    currentIndex = index;
    audioPlayer.src = musicList[index].fileData; // Base64 데이터 사용
    audioPlayer.play();
    updatePlayButton();
}

// ✅ 재생/정지 버튼 변경
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updatePlayButton();
}

function updatePlayButton() {
    document.getElementById("playPauseBtn").innerHTML = audioPlayer.paused ? "▶️ 재생" : "⏸ 정지";
}

// ✅ 정지 기능
function stopSong() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    updatePlayButton();
}

// ✅ 이전곡 재생
function prevSong() {
    if (currentIndex > 0) playSong(currentIndex - 1);
}

// ✅ 다음곡 재생
function nextSong() {
    if (currentIndex < musicList.length - 1) playSong(currentIndex + 1);
}

// ✅ 자동 다음곡 재생
function autoNextSong() {
    if (currentIndex < musicList.length - 1) nextSong();
}

// ✅ 노래 삭제
function deleteSong(index) {
    if (confirm("정말 삭제하시겠습니까?")) {
        musicList.splice(index, 1);
        localStorage.setItem("musicFiles", JSON.stringify(musicList));
        loadMusicList();
    }
}

// ✅ 노래 다운로드 (파일명 변경)
function downloadSong(index) {
    let song = musicList[index];
    let fileName = `SUYA! 수야닷-[${song.title}]-[${song.artist}].mp3`;

    let link = document.createElement("a");
    link.href = song.fileData; // Base64 데이터 사용
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ✅ 현재 시간 표시
function updateTime() {
    let now = new Date();
    let ampm = now.getHours() >= 12 ? "오후" : "오전";
    let hours = now.getHours() % 12 || 12;
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${ampm} ${hours}:${minutes}`;
    document.getElementById("current-time").innerText = dateStr;
}
setInterval(updateTime, 1000);
updateTime();
