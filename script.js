let historyList = [];
let notificationCount = 0;

// 사용 기록 저장
function saveHistory() {
    let now = new Date();
    let startTime = now.toLocaleString();
    let endTime = new Date(now.getTime() + 600000).toLocaleString(); // 10분 후
    historyList.push(`${startTime} ~ ${endTime}`);
}

// 기록 보기
function viewHistory() {
    let historyDiv = document.getElementById("history");
    let historyUl = document.getElementById("history-list");
    historyUl.innerHTML = historyList.map(item => `<li>${item}</li>`).join("");
    historyDiv.classList.toggle("hidden");
}

// 10분마다 알림
setInterval(() => {
    notificationCount++;
    alert(`유튜브 사용 알림 (${notificationCount}번째)`);
    saveHistory();
}, 600000);

// 페이지 이동 기능 (예제)
function goHome() {
    alert("홈 화면으로 이동");
}

function viewMyPage() {
    alert("마이페이지 이동");
}
