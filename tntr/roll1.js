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
  "太卷": ["(3號正卷)", "蟹肉碎、青瓜、蛋、醃竹筍、紅魚子"]
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

const STORAGE_KEY = "juan3-orders-with-ingredients-v3-mobile";

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
const tbody = document.getElementById("tbody");
const mobileItems = document.getElementById("mobile-items");
const totalRemainingEl = document.getElementById("total-remaining");
const doneBadge = document.getElementById("done-badge");

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

function toggleMobileIngredients(cardEl, item) {
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
        <h3 class="item-name tap" id="mobile-tap-${item.id}">${displayLabel(item, idxForName)}</h3>
        ${item.note ? `<p class="item-note">${item.note}</p>` : ""}
      </div>
      <div class="item-counts">
        <span class="item-target">目標: ${item.target}</span>
        <span class="item-remaining ${remainingClass}" id="mobile-remain-${item.id}">${item.remaining}</span>
      </div>
    </div>
    <div class="item-actions">
      <button class="btn primary" id="mobile-btn-${item.id}" aria-label="為『${item.name}』出餐 1 份">出餐 1 份</button>
    </div>
    <div class="ing-panel" id="mobile-ing-${item.id}">
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
        <span class="tap" id="tap-${item.id}" title="點擊展開/收合成分">${displayLabel(item, idxForName)}</span>
        ${item.note ? `<div class="note">${item.note}</div>` : ""}
      </td>
      <td class="count">${item.target}</td>
      <td class="count" id="remain-${item.id}">${item.remaining}</td>
      <td>
        <button class="btn primary" id="btn-${item.id}" aria-label="為『${item.name}』出餐 1 份">出</button>
      </td>
    `;
    tbody.appendChild(tr);

    tr.querySelector(`#tap-${item.id}`).addEventListener("click", () => {
      insertIngredientRowAfter(tr, item);
    });

    const btn = tr.querySelector(`#btn-${item.id}`);
    btn.addEventListener("click", () => {
      if (item.remaining > 0) {
        item.remaining -= 1;
        document.getElementById(`remain-${item.id}`).textContent = item.remaining;
        const mobileRemain = document.getElementById(`mobile-remain-${item.id}`);
        if (mobileRemain) {
          mobileRemain.textContent = item.remaining;
          mobileRemain.className = 'item-remaining ' + (item.remaining === 0 ? 'zero' : (item.remaining <= 2 ? 'low' : ''));
        }
        saveState(state);
        if (item.remaining <= 0) {
          removeIngredientRowIfAny(tr);
          tr.remove();
          const mobileCard = document.querySelector(`.item-card[data-id="${item.id}"]`);
          if (mobileCard) mobileCard.remove();
        }
        updateTotals();
      }
    });

    // Mobile card
    const mobileCard = renderMobileCard(item, idxForName);
    mobileItems.appendChild(mobileCard);

    mobileCard.querySelector(`#mobile-tap-${item.id}`).addEventListener("click", () => {
      toggleMobileIngredients(mobileCard, item);
    });

    const mobileBtn = mobileCard.querySelector(`#mobile-btn-${item.id}`);
    mobileBtn.addEventListener("click", () => {
      if (item.remaining > 0) {
        item.remaining -= 1;
        const desktopRemain = document.getElementById(`remain-${item.id}`);
        if (desktopRemain) desktopRemain.textContent = item.remaining;
        document.getElementById(`mobile-remain-${item.id}`).textContent = item.remaining;
        document.getElementById(`mobile-remain-${item.id}`).className = 'item-remaining ' + (item.remaining === 0 ? 'zero' : (item.remaining <= 2 ? 'low' : ''));
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

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("確認恢復所有剩餘至每日目標？")) {
    state = state.map(it => ({ ...it, remaining: it.target }));
    saveState(state);
    render();
    updateTotals();
  }
});

render();
