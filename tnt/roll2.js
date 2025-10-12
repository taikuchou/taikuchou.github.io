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

const STORAGE_KEY = "juan2-orders-with-ingredients-v3-mobile";

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

function render() {
  tbody.innerHTML = "";
  const nameCounter = {};
  let totalRemaining = 0;

  for (const item of state) {
    if (item.remaining <= 0) continue;

    nameCounter[item.name] = (nameCounter[item.name] || 0) + 1;
    const idxForName = nameCounter[item.name];

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
        saveState(state);
        if (item.remaining <= 0) {
          removeIngredientRowIfAny(tr);
          tr.remove();
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
