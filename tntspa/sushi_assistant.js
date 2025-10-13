// ========================================
// SPA Navigation System
// ========================================
(function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page-content');

  function switchPage(pageName) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));

    // Remove active from all nav links
    navLinks.forEach(link => link.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // Activate selected nav link
    const targetLink = document.querySelector(`[data-page="${pageName}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
    }

    // Update URL hash
    window.location.hash = pageName;
  }

  // Add click handlers to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageName = link.getAttribute('data-page');
      switchPage(pageName);
    });
  });

  // Handle browser back/forward
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      switchPage(hash);
    }
  });

  // Initialize from URL hash on load
  const initialHash = window.location.hash.slice(1);
  if (initialHash && ['roll1', 'roll2', 'notes', 'checklist'].includes(initialHash)) {
    switchPage(initialHash);
  }
})();

// ========================================
// Roll 1 - 出餐紀錄
// ========================================
(function() {
  // 成分庫
  const INGREDIENTS = {
    "加州卷": ["(2號反卷)", "白芝麻、橙魚子", "蟹肉碎 60g、青瓜 10g、牛油果 15g"],
    "白加州": ["(2號反卷)", "蟹肉碎 60g、青瓜 25g"],
    "三文魚牛油果": ["(2號反卷)", "白芝麻、海藻", "牛油果 20g、三文魚 40g"],
    "香辣海鮮卷": ["(2號反卷)", "白芝麻、橙魚子", "青瓜 10g、蟹肉碎 20g、三文魚 15g、玉子蛋 10g"],
    "海鮮": ["(2號反卷 / 雜錦)", "白芝麻、橙魚子", "青瓜 10g、蟹肉碎 20g、三文魚 15g、玉子蛋 10g"],
    "牛油果卷": ["(2號反卷)", "白芝麻、海藻", "牛油果 60g"],
    "青瓜牛油卷": ["(2號反卷)", "白芝麻、海藻", "牛油果 30g、青瓜 30g"],
    "脆龍卷": ["(2號反卷)", "青瓜 10g、蟹肉碎 10g、一對炸蝦"],
    "小蝦卷": ["(2號反卷)", "白芝麻", "青瓜 20g、一對炸蝦"],
    "大炸蝦卷": ["(3號反卷)", "白芝麻", "生菜 2片、青瓜 25g、胡蘿蔔絲 15g、一對炸蝦、蟹肉碎"],
    "田園卷": [
      "(多款)",
      "第一條(1號反/邊補米)：黑白芝麻；黃蘿蔔 30g、紅椒絲 25g",
      "第二條(1號反/邊補米)：黑白芝麻；青瓜 20g、牛油果 25g",
      "第三條(1號反/邊補米)：黑白芝麻；青瓜 20g、紅椒絲 10g、胡蘿蔔絲 20g",
      "第四條(3號正)：生菜 2片、青瓜 30g、牛油果 20g、黃蘿蔔 30g、紅椒絲 20g、胡蘿蔔絲 15g"
    ],
    "小青瓜卷": ["(1號正卷)", "青瓜 30g"],
    "三文小卷": ["(1號正卷)", "三文魚 30g"],
    "熟三文魚卷": ["(2號反卷)", "白芝麻", "熟三文魚、青瓜", "備註：千島壽司盤可加紅魚子"],
    "太卷": ["(3號正卷)", "蟹肉碎、青瓜、蛋、醃竹筍、紅魚子"],
    "蛋卷": ["(2號反卷)", "玉子蛋"]
  };

  // 最新清單
  const initialItems = [
    { name: "田園卷", target: 1, note: "", ingKey: "田園卷" },
    { name: "牛油果卷", target: 4, note: "", ingKey: "牛油果卷" },
    { name: "青瓜牛油捲", target: 2, note: "", ingKey: "青瓜牛油卷" },
    { name: "青瓜卷", target: 16, note: "4條中秋", ingKey: "小青瓜卷" },
    { name: "蛋卷", target: 5, note: "4條中秋，1條水滴", ingKey: "蛋卷" },
    { name: "豆皮-海鮮卷", target: 5, note: "", ingKey: "海鮮" },
    { name: "三文魚牛油果", target: 12, note: "3條三角形-加拿大A／2-雜錦／2-千島／5-ST2", ingKey: "三文魚牛油果" },
    { name: "太卷", target: 1, note: "", ingKey: "太卷" },
    { name: "熟三文魚卷", target: 9, note: "2條紅魚子-千島／2-炭燒三文魚／5-ST2", ingKey: "熟三文魚卷" },
    { name: "小蝦卷", target: 1, note: "水滴", ingKey: "小蝦卷" },
    { name: "脆龍卷", target: 4, note: "", ingKey: "脆龍卷" },
    { name: "大蝦卷", target: 6, note: "", ingKey: "大炸蝦卷" },
    { name: "青瓜卷", target: 8, note: "", ingKey: "小青瓜卷" }
  ].map((it, i) => ({ id: String(i + 1), remaining: it.target, ...it }));

  const STORAGE_KEY = "roll1-orders-spa";

  function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialItems;
    try {
      const parsed = JSON.parse(raw);
      return initialItems.map(it => {
        const f = parsed.find(p => p.id === it.id);
        return f ? { ...it, remaining: Math.max(0, f.remaining) } : it;
      });
    } catch {
      return initialItems;
    }
  }

  function saveState(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  let state = loadState();
  const tbody = document.getElementById("roll1-tbody");
  const mobileItems = document.getElementById("roll1-mobile-items");
  const totalRemainingEl = document.getElementById("roll1-total-remaining");
  const doneBadge = document.getElementById("roll1-done-badge");

  function displayLabel(item, idxForName) {
    return idxForName > 1 ? `${item.name}（批次${idxForName}）` : item.name;
  }

  function renderIngredients(key) {
    const lines = INGREDIENTS[key] || ["（成分待補）"];
    return `<ul class="ing-list">${lines.map(t => `<li>${t}</li>`).join("")}</ul>`;
  }

  function removeIngredientRowIfAny(tr) {
    const next = tr.nextElementSibling;
    if (next && next.dataset && next.dataset.role === "ing") next.remove();
  }

  function insertIngredientRowAfter(tr, item) {
    const next = tr.nextElementSibling;
    if (next && next.dataset && next.dataset.role === "ing") {
      next.remove();
      return;
    }
    const ingTr = document.createElement("tr");
    ingTr.dataset.role = "ing";
    ingTr.innerHTML = `<td class="ing-cell" colspan="4">${renderIngredients(item.ingKey)}</td>`;
    tr.parentNode.insertBefore(ingTr, tr.nextElementSibling);
  }

  function toggleMobileIngredients(cardEl) {
    const panel = cardEl.querySelector('.ing-panel');
    if (panel.classList.contains('show')) {
      panel.classList.remove('show');
    } else {
      panel.classList.add('show');
    }
  }

  function renderMobileCard(item, idxForName) {
    const card = document.createElement("div");
    card.className = "item-card";
    card.dataset.id = item.id;

    const remainingClass = item.remaining === 0 ? 'zero' : (item.remaining <= 2 ? 'low' : '');

    card.innerHTML = `
      <div class="item-header">
        <div class="item-title">
          <h3 class="item-name tap" id="roll1-mobile-tap-${item.id}">${displayLabel(item, idxForName)}</h3>
          ${item.note ? `<p class="item-note">${item.note}</p>` : ""}
        </div>
        <div class="item-counts">
          <span class="item-target">目標: ${item.target}</span>
          <span class="item-remaining ${remainingClass}" id="roll1-mobile-remain-${item.id}">${item.remaining}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn primary" id="roll1-mobile-btn-${item.id}" aria-label="為『${item.name}』出餐 1 份">出餐 1 份</button>
      </div>
      <div class="ing-panel" id="roll1-mobile-ing-${item.id}">
        ${renderIngredients(item.ingKey)}
      </div>
    `;

    return card;
  }

  function render() {
    tbody.innerHTML = "";
    mobileItems.innerHTML = "";
    const nameCounter = {};
    let totalRemaining = 0;

    for (const item of state) {
      if (item.remaining <= 0) continue;

      nameCounter[item.name] = (nameCounter[item.name] || 0) + 1;
      const idxForName = nameCounter[item.name];

      // Desktop table row
      const tr = document.createElement("tr");
      tr.dataset.id = item.id;
      tr.innerHTML = `
        <td class="name">
          <span class="tap" id="roll1-tap-${item.id}" title="點擊展開/收合成分">${displayLabel(item, idxForName)}</span>
          ${item.note ? `<div class="note">${item.note}</div>` : ""}
        </td>
        <td class="count">${item.target}</td>
        <td class="count" id="roll1-remain-${item.id}">${item.remaining}</td>
        <td>
          <button class="btn primary" id="roll1-btn-${item.id}" aria-label="為『${item.name}』出餐 1 份">出</button>
        </td>
      `;
      tbody.appendChild(tr);

      tr.querySelector(`#roll1-tap-${item.id}`).addEventListener("click", () => {
        insertIngredientRowAfter(tr, item);
      });

      const btn = tr.querySelector(`#roll1-btn-${item.id}`);
      btn.addEventListener("click", () => {
        if (item.remaining > 0) {
          item.remaining -= 1;
          document.getElementById(`roll1-remain-${item.id}`).textContent = item.remaining;
          const mobileRemain = document.getElementById(`roll1-mobile-remain-${item.id}`);
          if (mobileRemain) {
            mobileRemain.textContent = item.remaining;
            mobileRemain.className = 'item-remaining ' + (item.remaining === 0 ? 'zero' : (item.remaining <= 2 ? 'low' : ''));
          }
          saveState(state);
          if (item.remaining <= 0) {
            removeIngredientRowIfAny(tr);
            tr.remove();
            const mobileCard = mobileItems.querySelector(`.item-card[data-id="${item.id}"]`);
            if (mobileCard) mobileCard.remove();
          }
          updateTotals();
        }
      });

      // Mobile card
      const mobileCard = renderMobileCard(item, idxForName);
      mobileItems.appendChild(mobileCard);

      mobileCard.querySelector(`#roll1-mobile-tap-${item.id}`).addEventListener("click", () => {
        toggleMobileIngredients(mobileCard);
      });

      const mobileBtn = mobileCard.querySelector(`#roll1-mobile-btn-${item.id}`);
      mobileBtn.addEventListener("click", () => {
        if (item.remaining > 0) {
          item.remaining -= 1;
          const desktopRemain = document.getElementById(`roll1-remain-${item.id}`);
          if (desktopRemain) desktopRemain.textContent = item.remaining;
          document.getElementById(`roll1-mobile-remain-${item.id}`).textContent = item.remaining;
          document.getElementById(`roll1-mobile-remain-${item.id}`).className = 'item-remaining ' + (item.remaining === 0 ? 'zero' : (item.remaining <= 2 ? 'low' : ''));
          saveState(state);
          if (item.remaining <= 0) {
            removeIngredientRowIfAny(tr);
            tr.remove();
            mobileCard.remove();
          }
          updateTotals();
        }
      });

      totalRemaining += Math.max(0, item.remaining);
    }

    totalRemainingEl.textContent = totalRemaining;
    doneBadge.style.display = totalRemaining === 0 ? "inline-block" : "none";
  }

  function updateTotals() {
    const total = state.reduce((s, it) => s + Math.max(0, it.remaining), 0);
    totalRemainingEl.textContent = total;
    doneBadge.style.display = total === 0 ? "inline-block" : "none";
  }

  document.getElementById("roll1-reset-btn").addEventListener("click", () => {
    if (confirm("確認恢復所有剩餘至每日目標？")) {
      state = state.map(it => ({ ...it, remaining: it.target }));
      saveState(state);
      render();
      updateTotals();
    }
  });

  render();
})();

// ========================================
// Roll 2 - 出餐紀錄
// ========================================
(function() {
  // 成分庫
  const INGREDIENTS = {
    "加州卷": ["2號反卷", "白芝麻、橙魚子", "蟹肉碎 60g、青瓜 10g、牛油果 15g"],
    "加州卷-綠草": ["2號反卷 / 綠草版", "※（待補）"],
    "白加州": ["2號反卷", "蟹肉碎 60g、青瓜 25g"],
    "三文小卷": ["1號正卷", "三文魚 30g"],
    "海鮮": ["2號反卷 / 雜錦組合", "白芝麻、橙魚子", "青瓜 10g、蟹肉碎 20g、三文魚 15g、玉子蛋 10g"]
  };

  // 最新清單
  const initialItems = [
    { name: "白加州", target: 9, note: "没魚子 5、橙魚子 4", ingKey: "白加州" },
    { name: "加州卷", target: 20, note: "綠草 4、橙魚子 16", ingKey: "加州卷" },
    { name: "三文小卷", target: 12, note: "", ingKey: "三文小卷" },
    { name: "加州卷", target: 10, note: "", ingKey: "加州卷" },
    { name: "海鮮", target: 5, note: "", ingKey: "海鮮" },
    { name: "加州卷", target: 15, note: "", ingKey: "加州卷" },
    { name: "三文小卷", target: 10, note: "", ingKey: "三文小卷" }
  ].map((it, i) => ({ id: String(i + 1), remaining: it.target, ...it }));

  const STORAGE_KEY = "roll2-orders-spa";

  function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialItems;
    try {
      const parsed = JSON.parse(raw);
      return initialItems.map(it => {
        const f = parsed.find(p => p.id === it.id);
        return f ? { ...it, remaining: Math.max(0, f.remaining) } : it;
      });
    } catch {
      return initialItems;
    }
  }

  function saveState(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  let state = loadState();
  const tbody = document.getElementById("roll2-tbody");
  const mobileItems = document.getElementById("roll2-mobile-items");
  const totalRemainingEl = document.getElementById("roll2-total-remaining");
  const doneBadge = document.getElementById("roll2-done-badge");

  function displayLabel(item, idxForName) {
    return idxForName > 1 ? `${item.name}（批次${idxForName}）` : item.name;
  }

  function renderIngredients(key) {
    const lines = INGREDIENTS[key] || ["（成分待補）"];
    return `<ul class="ing-list">${lines.map(t => `<li>${t}</li>`).join("")}</ul>`;
  }

  function removeIngredientRowIfAny(tr) {
    const next = tr.nextElementSibling;
    if (next && next.dataset && next.dataset.role === "ing") next.remove();
  }

  function insertIngredientRowAfter(tr, item) {
    const next = tr.nextElementSibling;
    if (next && next.dataset && next.dataset.role === "ing") {
      next.remove();
      return;
    }
    const ingTr = document.createElement("tr");
    ingTr.dataset.role = "ing";
    ingTr.innerHTML = `<td class="ing-cell" colspan="4">${renderIngredients(item.ingKey)}</td>`;
    tr.parentNode.insertBefore(ingTr, tr.nextElementSibling);
  }

  function toggleMobileIngredients(cardEl) {
    const panel = cardEl.querySelector('.ing-panel');
    if (panel.classList.contains('show')) {
      panel.classList.remove('show');
    } else {
      panel.classList.add('show');
    }
  }

  function renderMobileCard(item, idxForName) {
    const card = document.createElement("div");
    card.className = "item-card";
    card.dataset.id = item.id;

    const remainingClass = item.remaining === 0 ? 'zero' : (item.remaining <= 2 ? 'low' : '');

    card.innerHTML = `
      <div class="item-header">
        <div class="item-title">
          <h3 class="item-name tap" id="roll2-mobile-tap-${item.id}">${displayLabel(item, idxForName)}</h3>
          ${item.note ? `<p class="item-note">${item.note}</p>` : ""}
        </div>
        <div class="item-counts">
          <span class="item-target">目標: ${item.target}</span>
          <span class="item-remaining ${remainingClass}" id="roll2-mobile-remain-${item.id}">${item.remaining}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn primary" id="roll2-mobile-btn-${item.id}" aria-label="為『${item.name}』出餐 1 份">出餐 1 份</button>
      </div>
      <div class="ing-panel" id="roll2-mobile-ing-${item.id}">
        ${renderIngredients(item.ingKey)}
      </div>
    `;

    return card;
  }

  function render() {
    tbody.innerHTML = "";
    mobileItems.innerHTML = "";
    const nameCounter = {};
    let totalRemaining = 0;

    for (const item of state) {
      if (item.remaining <= 0) continue;

      nameCounter[item.name] = (nameCounter[item.name] || 0) + 1;
      const idxForName = nameCounter[item.name];

      // Desktop table row
      const tr = document.createElement("tr");
      tr.dataset.id = item.id;
      tr.innerHTML = `
        <td class="name">
          <span class="tap" id="roll2-tap-${item.id}" title="點擊展開/收合成分">${displayLabel(item, idxForName)}</span>
          ${item.note ? `<div class="note">${item.note}</div>` : ""}
        </td>
        <td class="count">${item.target}</td>
        <td class="count" id="roll2-remain-${item.id}">${item.remaining}</td>
        <td>
          <button class="btn primary" id="roll2-btn-${item.id}" aria-label="為『${item.name}』出餐 1 份">出</button>
        </td>
      `;
      tbody.appendChild(tr);

      tr.querySelector(`#roll2-tap-${item.id}`).addEventListener("click", () => {
        insertIngredientRowAfter(tr, item);
      });

      const btn = tr.querySelector(`#roll2-btn-${item.id}`);
      btn.addEventListener("click", () => {
        if (item.remaining > 0) {
          item.remaining -= 1;
          document.getElementById(`roll2-remain-${item.id}`).textContent = item.remaining;
          const mobileRemain = document.getElementById(`roll2-mobile-remain-${item.id}`);
          if (mobileRemain) {
            mobileRemain.textContent = item.remaining;
            mobileRemain.className = 'item-remaining ' + (item.remaining === 0 ? 'zero' : (item.remaining <= 2 ? 'low' : ''));
          }
          saveState(state);
          if (item.remaining <= 0) {
            removeIngredientRowIfAny(tr);
            tr.remove();
            const mobileCard = mobileItems.querySelector(`.item-card[data-id="${item.id}"]`);
            if (mobileCard) mobileCard.remove();
          }
          updateTotals();
        }
      });

      // Mobile card
      const mobileCard = renderMobileCard(item, idxForName);
      mobileItems.appendChild(mobileCard);

      mobileCard.querySelector(`#roll2-mobile-tap-${item.id}`).addEventListener("click", () => {
        toggleMobileIngredients(mobileCard);
      });

      const mobileBtn = mobileCard.querySelector(`#roll2-mobile-btn-${item.id}`);
      mobileBtn.addEventListener("click", () => {
        if (item.remaining > 0) {
          item.remaining -= 1;
          const desktopRemain = document.getElementById(`roll2-remain-${item.id}`);
          if (desktopRemain) desktopRemain.textContent = item.remaining;
          document.getElementById(`roll2-mobile-remain-${item.id}`).textContent = item.remaining;
          document.getElementById(`roll2-mobile-remain-${item.id}`).className = 'item-remaining ' + (item.remaining === 0 ? 'zero' : (item.remaining <= 2 ? 'low' : ''));
          saveState(state);
          if (item.remaining <= 0) {
            removeIngredientRowIfAny(tr);
            tr.remove();
            mobileCard.remove();
          }
          updateTotals();
        }
      });

      totalRemaining += Math.max(0, item.remaining);
    }

    totalRemainingEl.textContent = totalRemaining;
    doneBadge.style.display = totalRemaining === 0 ? "inline-block" : "none";
  }

  function updateTotals() {
    const total = state.reduce((s, it) => s + Math.max(0, it.remaining), 0);
    totalRemainingEl.textContent = total;
    doneBadge.style.display = total === 0 ? "inline-block" : "none";
  }

  document.getElementById("roll2-reset-btn").addEventListener("click", () => {
    if (confirm("確認恢復所有剩餘至每日目標？")) {
      state = state.map(it => ({ ...it, remaining: it.target }));
      saveState(state);
      render();
      updateTotals();
    }
  });

  render();
})();

// ========================================
// Notes - 壽司卷筆記
// ========================================
(function() {
  const DATA = [
    { name: "加州卷", style: "2號反卷", toppings: ["白芝麻", "橙魚子"], fillings: ["蟹肉碎 60g", "青瓜 10g", "牛油果 15g"] },
    { name: "白加州卷", style: "2號反卷", toppings: [], fillings: ["蟹肉碎 60g", "青瓜 25g"] },
    { name: "三文魚牛油果", style: "2號反卷", toppings: ["白芝麻", "海藻"], fillings: ["牛油果 20g", "三文魚 40g"] },
    { name: "香辣海鮮卷", style: "2號反卷", toppings: ["白芝麻", "橙魚子"], fillings: ["青瓜 10g", "蟹肉碎 20g", "三文魚 15g", "玉子蛋 10g"] },
    { name: "海鮮卷（雜錦）", style: "2號反卷", toppings: ["白芝麻", "橙魚子"], fillings: ["青瓜 10g", "蟹肉碎 20g", "三文魚 15g", "玉子蛋 10g"] },
    { name: "牛油果卷", style: "2號反卷", toppings: ["白芝麻", "海藻"], fillings: ["牛油果 60g"] },
    { name: "青瓜牛油卷", style: "2號反卷", toppings: ["白芝麻", "海藻"], fillings: ["牛油果 30g", "青瓜 30g"] },
    { name: "脆龍卷", style: "2號反卷", toppings: [], fillings: ["青瓜 10g", "蟹肉碎 10g", "一對炸蝦"] },
    { name: "小蝦卷", style: "2號反卷", toppings: ["白芝麻"], fillings: ["青瓜 20g", "一對炸蝦"] },
    { name: "大炸蝦卷（供天婦羅/辣炸蝦）", style: "3號反卷", toppings: ["白芝麻"], fillings: ["生菜 2片", "青瓜 25g", "胡蘿蔔絲 15g", "一對炸蝦", "蟹肉碎"] },
    {
      name: "田園喜悅",
      style: "多款",
      variants: [
        { title: "第一條（1號反卷，邊緣補米飯）", toppings: ["黑白芝麻"], fillings: ["黃蘿蔔 30g", "紅椒絲 25g"] },
        { title: "第二條（1號反卷，邊緣補米飯）", toppings: ["黑白芝麻"], fillings: ["青瓜 20g", "牛油果 25g"] },
        { title: "第三條（1號反卷，邊緣補米飯）", toppings: ["黑白芝麻"], fillings: ["青瓜 20g", "紅椒絲 10g", "胡蘿蔔絲 20g"] },
        { title: "第四條（3號正卷）", toppings: [], fillings: ["生菜 2片", "青瓜 30g", "牛油果 20g", "黃蘿蔔 30g", "紅椒絲 20g", "胡蘿蔔絲 15g"] }
      ]
    },
    { name: "小三文魚卷", style: "1號正卷", toppings: [], fillings: ["三文魚 30g"] },
    { name: "小青瓜卷", style: "1號正卷", toppings: [], fillings: ["青瓜 30g"] },
    { name: "楓葉卷", style: "3號反卷", toppings: ["白芝麻", "橙魚子"], fillings: ["蟹肉碎/蟹棒/玉子/三文魚/青瓜"] },
    { name: "熟三文魚卷", style: "2號反卷", toppings: ["白芝麻"], fillings: ["熟三文魚", "青瓜"], notes: "千島壽司盤，加紅魚子" },
    { name: "太卷", style: "3號正卷", toppings: [], fillings: ["蟹肉碎", "青瓜", "蛋", "醃竹筍", "紅魚子"] },
    { name: "辣吞拿魚卷", style: "2號反卷", toppings: ["白芝麻"], fillings: ["吞拿魚刺身切碎（少量拉差醬拌）", "青瓜"] }
  ];

  const picker = document.getElementById("notes-picker");
  const result = document.getElementById("notes-result");

  function renderList(arr) {
    if (!arr || !arr.length) return '<div class="meta">（未註明）</div>';
    return `<ul>${arr.map(x => `<li>${x}</li>`).join("")}</ul>`;
  }

  function renderItem(item) {
    if (!item) {
      result.innerHTML = '<div class="empty">查無此品項。</div>';
      return;
    }
    if (!item.variants) {
      result.innerHTML = `
        <div class="note-card">
          <div class="title">${item.name}&nbsp;&nbsp;<span class="tag">${item.style || "卷型號未註明"}</span></div>
          <div class="grid">
            <div class="sec">${renderList(item.fillings)}</div>
          </div>
        </div>`;
    } else {
      result.innerHTML = `
        <div class="note-card">
          <div class="title">${item.name}</div>
          ${item.variants.map(v => `
            <div class="sec" style="border-top:1px dashed var(--border);padding-top:10px;margin-top:10px;">
              <div class="meta"><strong>${v.title}</strong></div>
              <div class="grid">
                <div>${renderList(v.fillings)}</div>
              </div>
            </div>`).join("")}
        </div>`;
    }
  }

  function buildPicker() {
    picker.innerHTML = "";
    DATA.forEach((item, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = item.name;
      picker.appendChild(opt);
    });
  }

  buildPicker();
  document.getElementById("notes-view-btn").addEventListener("click", () => {
    const idx = parseInt(picker.value, 10);
    renderItem(DATA[idx]);
  });
})();

// ========================================
// Checklist - 工作流程
// ========================================
(function() {
  const VERSION = "v2.0";
  const STORAGE_KEY = "checklist-spa-" + VERSION;
  const TODAY = new Date().toISOString().slice(0, 10);

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
      if (parsed.date !== TODAY) return defaultState();
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

  const els = {
    lists: {
      prep: document.getElementById("checklist-list-prep"),
      during: document.getElementById("checklist-list-during"),
      post: document.getElementById("checklist-list-post")
    },
    badges: {
      prep: document.getElementById("checklist-badge-prep"),
      during: document.getElementById("checklist-badge-during"),
      post: document.getElementById("checklist-badge-post")
    },
    overallDone: document.getElementById("checklist-overall-done"),
    overallTotal: document.getElementById("checklist-overall-total"),
    completionRate: document.getElementById("checklist-completion-rate"),
    startBento: document.getElementById("checklist-start-bento"),
    stopBento: document.getElementById("checklist-stop-bento"),
    bentoRemaining: document.getElementById("checklist-bento-remaining"),
    timerCard: document.getElementById("checklist-timer-card"),
    timerStatus: document.getElementById("checklist-timer-status"),
    resetToday: document.getElementById("checklist-reset-today")
  };

  let state = loadState();
  let bentoTick = null;

  function renderSection(key) {
    const items = DATA.sections[key];
    const list = els.lists[key];
    list.innerHTML = "";

    items.forEach((text, idx) => {
      const id = `checklist-${key}-${idx}`;
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

  els.resetToday.addEventListener("click", () => {
    if (confirm("確定要將今天的勾選與計時器全部重設嗎？")) {
      state = defaultState();
      saveState();
      for (const k of Object.keys(DATA.sections)) renderSection(k);
      updateBadges();
      stopBentoTimer(true);
    }
  });

  function startBentoTimer() {
    const twoHours = 2 * 60 * 60 * 1000;
    const now = Date.now();
    state.bentoTimer = { start: now, end: now + twoHours, active: true };
    saveState();

    els.startBento.disabled = true;
    els.stopBento.disabled = false;
    els.startBento.textContent = "計時中...";
    els.timerCard.classList.add("active");
    els.timerStatus.textContent = "計時進行中";

    tickBento();
    if (!bentoTick) bentoTick = setInterval(tickBento, 500);
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

    els.bentoRemaining.textContent = "--:--:--";
    els.startBento.disabled = false;
    els.stopBento.disabled = true;
    els.startBento.textContent = "開始計時";
    els.timerCard.classList.remove("active");
    els.timerStatus.textContent = "待啟動";
  }

  function tickBento() {
    if (!state.bentoTimer?.active) {
      els.bentoRemaining.textContent = "--:--:--";
      return;
    }

    const remain = state.bentoTimer.end - Date.now();

    if (remain <= 0) {
      stopBentoTimer();

      try {
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200, 100, 200]);
        }
      } catch (e) {
        console.log("Vibration not supported");
      }

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

  els.startBento.addEventListener("click", () => {
    startBentoTimer();
  });

  els.stopBento.addEventListener("click", () => {
    stopBentoTimer();
  });

  for (const k of Object.keys(DATA.sections)) renderSection(k);
  updateBadges();

  els.stopBento.disabled = true;

  if (state.bentoTimer?.active) {
    els.startBento.disabled = true;
    els.stopBento.disabled = false;
    els.startBento.textContent = "計時中...";
    els.timerCard.classList.add("active");
    els.timerStatus.textContent = "計時進行中";
    tickBento();
    bentoTick = setInterval(tickBento, 500);
  } else {
    els.timerStatus.textContent = "待啟動";
  }
})();
