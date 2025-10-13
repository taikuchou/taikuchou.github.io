/** ========= 資料定義 ========= **/
const VERSION = "v2.0";
const STORAGE_KEY = "sushi-flowcheck-" + VERSION;
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const DATA = {
  meta: {
    title: "壽司部門幫廚｜一日工作流程",
    date: TODAY,
    shift: "08:30–17:30"
  },
  sections: {
    prep: [
      "一早拌三鍋醋飯（加入前一天剩餘的醋飯）",
      "煮兩鍋白飯 + 一鍋醋飯",
      "記錄兩張表：出餐表、醋飯酸鹼度（8:00／中午／16:00）",
      "送三文魚 + 兩份烤雞至熱廚部加熱"
    ],
    during: [
      "開始做手捲：先切牛油果",
      "依「卷2」早上卷 81 卷壽司",
      "09:30–10:00 準備便當：6 三文魚／6 鰻魚／12 烤雞",
      "便當貼公司標籤與價格，打包後用鐵籤戳洞",
      "確認下午便當素材：3 條鰻魚、3 盒雞腿排、2 盒鰻魚片",
      "續煮三鍋飯：2 白飯 + 1 壽司飯",
      "煮完飯後休息吃飯"
    ],
    post: [
      "下午備壽司料",
      "檢查庫存（含冷凍櫃），適當品項移至冷藏；庫存含：玉子燒／雞肉／鰻魚；冷藏含：薑片／雞汁／雞醬油",
      "送 3 盒烤雞 + 1 盒三文魚給後廚（炸／加熱）",
      "製作下午便當",
      "（便當出完）啟動 2 小時回查；逾時貼折價標籤",
      "準備明日：檢查鰻魚片／雞肉片；至少切 2 盒雞肉；冷藏保有 3 包雞塊、6 份鰻魚",
      "若鰻魚汁不足，請 Toby 申請",
      "補醬料與玉米粒",
      "打掃所有廚具",
      "拍照上傳到群組"
    ]
  }
};

/** ========= 狀態載入／儲存 ========= **/
function defaultState() {
  const s = { date: TODAY, checks: { prep: [], during: [], post: [] }, bentoTimer: null };
  for (const key of Object.keys(DATA.sections)) {
    s.checks[key] = DATA.sections[key].map(() => false);
  }
  return s;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState();
  try {
    const parsed = JSON.parse(raw);
    // 換日自動重設
    if (parsed.date !== TODAY) return defaultState();
    // 結構保險
    for (const k of Object.keys(DATA.sections)) {
      if (!Array.isArray(parsed.checks?.[k]) || parsed.checks[k].length !== DATA.sections[k].length) {
        parsed.checks = parsed.checks || {};
        parsed.checks[k] = DATA.sections[k].map(() => false);
      }
    }
    return parsed;
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** ========= DOM 元素 ========= **/
const els = {
  lists: {
    prep: document.getElementById("list-prep"),
    during: document.getElementById("list-during"),
    post: document.getElementById("list-post")
  },
  badges: {
    prep: document.getElementById("badge-prep"),
    during: document.getElementById("badge-during"),
    post: document.getElementById("badge-post")
  },
  overallDone: document.getElementById("overall-done"),
  overallTotal: document.getElementById("overall-total"),
  completionRate: document.getElementById("completion-rate"),
  startBento: document.getElementById("start-bento"),
  stopBento: document.getElementById("stop-bento"),
  bentoRemaining: document.getElementById("bento-remaining"),
  timerCard: document.getElementById("timer-card"),
  timerStatus: document.getElementById("timer-status"),
  resetToday: document.getElementById("reset-today")
};

// Debug: Check if timer elements exist
console.log("Timer elements check:", {
  startBento: !!els.startBento,
  stopBento: !!els.stopBento,
  bentoRemaining: !!els.bentoRemaining,
  timerCard: !!els.timerCard,
  timerStatus: !!els.timerStatus
});

let state = loadState();
let bentoTick = null;

console.log("Initial state:", state);

/** ========= 渲染函數 ========= **/
function renderSection(key) {
  const items = DATA.sections[key];
  const list = els.lists[key];
  list.innerHTML = "";

  items.forEach((text, idx) => {
    const id = `${key}-${idx}`;
    const isChecked = state.checks[key][idx];

    const wrap = document.createElement("div");
    wrap.className = `checklist-item${isChecked ? " checked" : ""}`;
    wrap.innerHTML = `
      <input type="checkbox" id="${id}" ${isChecked ? "checked" : ""} />
      <label for="${id}">${text}</label>
    `;

    const cb = wrap.querySelector("input");
    cb.addEventListener("change", () => {
      state.checks[key][idx] = cb.checked;
      wrap.classList.toggle("checked", cb.checked);
      saveState();
      updateBadges();
    });

    list.appendChild(wrap);
  });
}

function updateBadges() {
  let total = 0, done = 0;

  for (const k of Object.keys(DATA.sections)) {
    const arr = state.checks[k];
    const t = arr.length;
    const d = arr.filter(Boolean).length;

    const badge = els.badges[k];
    badge.textContent = `${d}/${t}`;
    badge.classList.toggle("complete", d === t && t > 0);

    total += t;
    done += d;
  }

  els.overallTotal.textContent = total;
  els.overallDone.textContent = done;

  const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
  els.completionRate.textContent = `${percentage}%`;
  els.completionRate.classList.toggle("complete", percentage === 100);
}

/** ========= 批量操作 ========= **/
document.querySelectorAll("[data-check]").forEach(btn => {
  btn.addEventListener("click", () => {
    const k = btn.getAttribute("data-check");
    state.checks[k] = state.checks[k].map(() => true);
    saveState();
    renderSection(k);
    updateBadges();
  });
});

document.querySelectorAll("[data-uncheck]").forEach(btn => {
  btn.addEventListener("click", () => {
    const k = btn.getAttribute("data-uncheck");
    state.checks[k] = state.checks[k].map(() => false);
    saveState();
    renderSection(k);
    updateBadges();
  });
});

/** ========= 全域操作 ========= **/
els.resetToday.addEventListener("click", () => {
  if (confirm("確定要將今天的勾選與計時器全部重設嗎？")) {
    state = defaultState();
    saveState();
    for (const k of Object.keys(DATA.sections)) renderSection(k);
    updateBadges();
    stopBentoTimer(true);
  }
});

/** ========= 兩小時回查計時器 ========= **/
function startBentoTimer() {
  const twoHours = 2 * 60 * 60 * 1000;
  const now = Date.now();
  state.bentoTimer = { start: now, end: now + twoHours, active: true };
  saveState();

  // Update UI immediately
  els.startBento.disabled = true;
  els.stopBento.disabled = false;
  els.startBento.textContent = "計時中...";
  els.timerCard.classList.add("active");
  els.timerStatus.textContent = "計時進行中";

  tickBento();
  if (!bentoTick) bentoTick = setInterval(tickBento, 500);

  console.log("Timer started:", new Date(now), "→", new Date(now + twoHours));
}

function stopBentoTimer(clearOnly = false) {
  if (bentoTick) {
    clearInterval(bentoTick);
    bentoTick = null;
  }
  state.bentoTimer = null;
  if (!clearOnly) {
    saveState();
  }

  // Update UI
  els.bentoRemaining.textContent = "--:--:--";
  els.startBento.disabled = false;
  els.stopBento.disabled = true;
  els.startBento.textContent = "開始計時";
  els.timerCard.classList.remove("active");
  els.timerStatus.textContent = "待啟動";

  console.log("Timer stopped");
}

function tickBento() {
  if (!state.bentoTimer?.active) {
    els.bentoRemaining.textContent = "--:--:--";
    return;
  }

  const remain = state.bentoTimer.end - Date.now();

  if (remain <= 0) {
    stopBentoTimer();

    // iOS-compatible notification with vibration
    try {
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
      }
    } catch (e) {
      console.log("Vibration not supported");
    }

    // Alert with clear message
    alert("⏱️ 便當兩小時回查\n\n便當已超過 2 小時\n請檢查並貼上折價標籤");
    return;
  }

  els.bentoRemaining.textContent = fmtHHMMSS(remain);
}

function fmtHHMMSS(ms) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map(n => String(n).padStart(2, "0")).join(":");
}

// Event listeners
els.startBento.addEventListener("click", () => {
  console.log("Start button clicked");
  startBentoTimer();
});

els.stopBento.addEventListener("click", () => {
  console.log("Stop button clicked");
  stopBentoTimer();
});

/** ========= 初始渲染 ========= **/
for (const k of Object.keys(DATA.sections)) renderSection(k);
updateBadges();

// 初始化按鈕狀態
els.stopBento.disabled = true;

// 恢復計時器
if (state.bentoTimer?.active) {
  console.log("Restoring timer from state");
  els.startBento.disabled = true;
  els.stopBento.disabled = false;
  els.startBento.textContent = "計時中...";
  els.timerCard.classList.add("active");
  els.timerStatus.textContent = "計時進行中";
  tickBento();
  bentoTick = setInterval(tickBento, 500);
} else {
  console.log("No active timer in state");
  els.timerStatus.textContent = "待啟動";
}
