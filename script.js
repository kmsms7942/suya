let timerInterval;
let timeElapsed = 0;
let isTimerRunning = false;
let timerDisplay = document.getElementById('time');

// 웹 페이지가 실행되면 자동으로 타이머 시작
window.addEventListener('load', () => {
    startTimer();
    startNotification();
});

function startTimer() {
    isTimerRunning = true;
    timerInterval = setInterval(updateTimer, 1000); // 1초마다 갱신
}

// 타이머 업데이트
function updateTimer() {
    timeElapsed++;
    let hours = Math.floor(timeElapsed / 3600);
    let minutes = Math.floor((timeElapsed % 3600) / 60);
    let seconds = timeElapsed % 60;
    timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

// 유튜브 비디오 종료 확인
document.getElementById('confirmExit').addEventListener('click', () => {
    stopTimer();
    window.close();
});

document.getElementById('cancelExit').addEventListener('click', () => {
    document.getElementById('exit-confirmation').classList.add('hidden');
});

// 알림창 띄우기 (앱 또는 유튜브가 실행되면)
function startNotification() {
    if (Notification.permission === "granted") {
        new Notification("타이머가 시작되었습니다. 유튜브를 보고 계십니다.");
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("타이머가 시작되었습니다. 유튜브를 보고 계십니다.");
            }
        });
    }
}

// 모바일에서 알림 기능 (Notification API)
if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            setInterval(() => {
                new Notification("타이머: 유튜브를 보고 계십니다. 시간 확인이 필요합니다.");
            }, 60000); // 매분마다 알림
        }
    });
}

// 안드로이드 유튜브 앱 열기
document.getElementById('openYouTubeApp').addEventListener('click', () => {
    const youtubeUrl = 'vnd.youtube://www.youtube.com'; // 안드로이드 유튜브 앱 URI 스킴

    // 유튜브 앱이 설치되어 있는지 확인
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = youtubeUrl;

    document.body.appendChild(iframe);

    // 2초 후 iframe 제거
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 2000);

    // 앱이 설치되지 않았을 경우 플레이스토어로 이동
    setTimeout(() => {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.google.android.youtube'; // 유튜브 앱 설치 페이지
    }, 1000); // 1초 후 플레이스토어로 이동
});
