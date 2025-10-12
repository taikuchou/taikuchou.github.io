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

const picker = document.getElementById("picker");
const result = document.getElementById("result");

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
document.getElementById("view-btn").addEventListener("click", () => {
  const idx = parseInt(picker.value, 10);
  renderItem(DATA[idx]);
});
