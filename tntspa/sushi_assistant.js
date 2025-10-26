// ========================================
// i18n Initialization & Language Switcher
// ========================================
(function () {
  // Initialize i18n on page load
  document.addEventListener('DOMContentLoaded', () => {
    i18n.updateUI();

    // Set active language button
    const currentLang = i18n.getCurrentLanguage();
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === currentLang) {
        btn.classList.add('active');
      }
    });
  });

  // Language switcher
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');

      // Remove active from all buttons
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));

      // Add active to clicked button
      btn.classList.add('active');

      // Change language
      i18n.setLanguage(lang);
    });
  });

  // Listen for language changes to update dynamic content
  window.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant' :
      lang === 'zh-CN' ? 'zh-Hans' : 'en';

    // Re-render all sections to update dynamic content
    if (window.roll1Render) window.roll1Render();
    if (window.roll2Render) window.roll2Render();
    if (window.notesRebuild) window.notesRebuild();
    if (window.checklistRebuild) window.checklistRebuild();
    if (window.checklist2Rebuild) window.checklist2Rebuild();
  });
})();

// ========================================
// SPA Navigation System
// ========================================
(function () {
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
  if (initialHash && ['checklist', 'checklist2', 'roll2', 'notes', 'roll1'].includes(initialHash)) {
    switchPage(initialHash);
  }
})();

// ========================================
// Roll 1 - 出餐紀錄
// ========================================
(function () {
  // Ingredient data with translation keys
  const INGREDIENTS_DATA = {
    "california": {
      type: "ing.type2Inside",
      toppings: ["ing.whiteSesame", "ing.orangeTobiko"],
      fillings: ["ing.crabmeat 60g", "ing.cucumber 10g", "ing.avocado 15g"]
    },
    "whiteCalifornia": {
      type: "ing.type2Inside",
      fillings: ["ing.crabmeat 60g", "ing.cucumber 25g"]
    },
    "salmonAvocado": {
      type: "ing.type2Inside",
      toppings: ["ing.whiteSesame", "ing.seaweed"],
      fillings: ["ing.avocado 20g", "ing.salmon 40g"]
    },
    "spicySeafood": {
      type: "ing.type2Inside",
      toppings: ["ing.whiteSesame", "ing.orangeTobiko"],
      fillings: ["ing.cucumber 10g", "ing.crabmeat 20g", "ing.salmon 15g", "ing.tamago 10g"]
    },
    "seafood": {
      type: "ing.type2Inside",
      toppings: ["ing.whiteSesame", "ing.orangeTobiko"],
      fillings: ["ing.cucumber 10g", "ing.crabmeat 20g", "ing.salmon 15g", "ing.tamago 10g"]
    },
    "avocado": {
      type: "ing.type2Inside",
      toppings: ["ing.whiteSesame", "ing.seaweed"],
      fillings: ["ing.avocado 60g"]
    },
    "cucumberAvocado": {
      type: "ing.type2Inside",
      toppings: ["ing.whiteSesame", "ing.seaweed"],
      fillings: ["ing.avocado 30g", "ing.cucumber 30g"]
    },
    "crispyDragon": {
      type: "ing.type2Inside",
      fillings: ["ing.cucumber 10g", "ing.crabmeat 10g", "ing.shrimpPair"]
    },
    "miniShrimp": {
      type: "ing.type2Inside",
      toppings: ["ing.whiteSesame"],
      fillings: ["ing.cucumber 20g", "ing.shrimpPair"]
    },
    "largeTempuraShrimp": {
      type: "ing.type3Inside",
      toppings: ["ing.whiteSesame"],
      fillings: ["ing.lettuce 2", "ing.cucumber 25g", "ing.carrotJulienne 15g", "ing.shrimpPair", "ing.crabmeat"]
    },
    "gardenDelight": {
      type: "ing.multiType",
      variants: ["instruction.roll1Type1", "instruction.roll2Type1", "instruction.roll3Type1", "instruction.roll4Type3"]
    },
    "miniCucumber": {
      type: "ing.type1Outside",
      fillings: ["ing.cucumber 30g"]
    },
    "miniSalmon": {
      type: "ing.type1Outside",
      fillings: ["ing.salmon 30g"]
    },
    "cookedSalmon": {
      type: "ing.type2Inside",
      toppings: ["ing.whiteSesame"],
      fillings: ["ing.cookedSalmon", "ing.cucumber"],
      note: "instruction.note"
    },
    "futomaki": {
      type: "ing.type3Outside",
      fillings: ["ing.crabmeat", "ing.cucumber", "ing.egg", "ing.pickledRadish", "ing.redTobiko"]
    },
    "egg": {
      type: "ing.type1Normal",
      fillings: ["ing.tamago"]
    }
  };

  // Function to get translated ingredients
  function getTranslatedIngredients(key) {
    const data = INGREDIENTS_DATA[key];
    if (!data) return [i18n.t('ingredients.notAvailable')];

    const result = [];
    result.push(i18n.t(data.type));

    if (data.variants) {
      return [i18n.t(data.type), ...data.variants.map(v => i18n.t(v))];
    }

    if (data.toppings && data.toppings.length > 0) {
      result.push(data.toppings.map(t => i18n.t(t)).join('、'));
    }

    if (data.fillings && data.fillings.length > 0) {
      result.push(data.fillings.map(f => {
        const parts = f.split(' ');
        if (parts.length > 1) {
          return i18n.t(parts[0]) + ' ' + parts[1];
        }
        return i18n.t(f);
      }).join('、'));
    }

    if (data.note) {
      result.push(i18n.t(data.note));
    }

    return result;
  }

  // Initial items definition with translation keys
  const initialItemsData = [
    { nameKey: "gardenDelight", target: 1, note: "", ingKey: "gardenDelight" },
    { nameKey: "avocado", target: 4, note: "", ingKey: "avocado" },
    { nameKey: "cucumberAvocado", target: 2, note: "", ingKey: "cucumberAvocado" },
    { nameKey: "miniCucumber", target: 16, noteKey: "note.midAutumn 4", ingKey: "miniCucumber" },
    { nameKey: "egg", target: 1, noteKey: "note.midAutumn 4, note.dropShape 1", ingKey: "egg" },
    // { nameKey: "tofuSeafood", target: 5, note: "", ingKey: "seafood" },
    { nameKey: "salmonAvocado", target: 12, noteKey: "note.triangle 3 - note.canadaA／2 - note.thousandIsland／2／5-ST2", ingKey: "salmonAvocado" },
    { nameKey: "futomaki", target: 1, note: "", ingKey: "futomaki" },
    { nameKey: "cookedSalmon", target: 9, noteKey: "note.redTobiko 2 - note.thousandIsland／2 - note.chargrilled／5-ST2", ingKey: "cookedSalmon" },
    { nameKey: "miniShrimp", target: 1, noteKey: "note.dropShape", ingKey: "miniShrimp" },
    { nameKey: "crispyDragon", target: 4, note: "", ingKey: "crispyDragon" },
    { nameKey: "largeShrimp", target: 6, note: "", ingKey: "largeTempuraShrimp" },
    { nameKey: "miniCucumber", target: 8, note: "", ingKey: "miniCucumber" }
  ];

  function buildInitialItems() {
    return initialItemsData.map((it, i) => ({
      id: String(i + 1),
      remaining: it.target,
      name: i18n.t(`product.${it.nameKey}`),
      note: it.noteKey ? it.noteKey.split(',').map(n => {
        const parts = n.trim().split(' ');
        return parts.length > 1 ? i18n.t(parts[0]) + ' ' + parts[1] : i18n.t(n.trim());
      }).join('，') : it.note,
      ...it
    }));
  }

  let initialItems = buildInitialItems();

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
    return idxForName > 1 ? `${item.name}（${i18n.t('product.batch')} ${idxForName}）` : item.name;
  }

  function renderIngredients(key) {
    const lines = getTranslatedIngredients(key);
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
          <span class="item-target"><span data-i18n="common.targetLabel">${i18n.t('common.targetLabel')}</span>: ${item.target}</span>
          <span class="item-remaining ${remainingClass}" id="roll1-mobile-remain-${item.id}">${item.remaining}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn primary" id="roll1-mobile-btn-${item.id}" data-i18n="roll1.serveOne" aria-label="${i18n.t('roll1.serveOne')}">${i18n.t('roll1.serveOne')}</button>
        <button class="btn" id="roll1-mobile-all-btn-${item.id}" data-i18n="roll1.serveAll" aria-label="${i18n.t('roll1.serveAll')}">${i18n.t('roll1.serveAll')}</button>
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

    // Sort items: non-zero first, then zero items at the end
    const sortedState = [...state].sort((a, b) => {
      if (a.remaining === 0 && b.remaining > 0) return 1;
      if (a.remaining > 0 && b.remaining === 0) return -1;
      return 0;
    });

    for (const item of sortedState) {
      nameCounter[item.name] = (nameCounter[item.name] || 0) + 1;
      const idxForName = nameCounter[item.name];

      // Desktop table row
      const tr = document.createElement("tr");
      tr.dataset.id = item.id;
      const isZero = item.remaining === 0;
      tr.innerHTML = `
        <td class="name">
          <span class="tap" id="roll1-tap-${item.id}" data-i18n-title="roll1.clickToExpand" title="${i18n.t('roll1.clickToExpand')}">${displayLabel(item, idxForName)}</span>
          ${item.note ? `<div class="note">${item.note}</div>` : ""}
        </td>
        <td class="count">${item.target}</td>
        <td class="count ${isZero ? 'zero' : ''}" id="roll1-remain-${item.id}">${item.remaining}</td>
        <td>
          <button class="btn primary" id="roll1-btn-${item.id}" ${isZero ? 'disabled' : ''} data-i18n="roll1.serve" aria-label="${i18n.t('roll1.serveOne')}">${i18n.t('roll1.serve')}</button>
          <button class="btn" id="roll1-all-btn-${item.id}" ${isZero ? 'disabled' : ''} data-i18n="roll1.serveAll" aria-label="${i18n.t('roll1.serveAll')}">${i18n.t('roll1.serveAll')}</button>
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
            btn.disabled = true;
            const mobileBtn = document.getElementById(`roll1-mobile-btn-${item.id}`);
            if (mobileBtn) mobileBtn.disabled = true;
            const allBtn = document.getElementById(`roll1-all-btn-${item.id}`);
            if (allBtn) allBtn.disabled = true;
            const mobileAllBtn = document.getElementById(`roll1-mobile-all-btn-${item.id}`);
            if (mobileAllBtn) mobileAllBtn.disabled = true;
            // Re-render to move zero items to end
            render();
            return;
          }
          updateTotals();
        }
      });

      const allBtn = tr.querySelector(`#roll1-all-btn-${item.id}`);
      allBtn.addEventListener("click", () => {
        if (item.remaining > 0) {
          item.remaining = 0;
          document.getElementById(`roll1-remain-${item.id}`).textContent = item.remaining;
          const mobileRemain = document.getElementById(`roll1-mobile-remain-${item.id}`);
          if (mobileRemain) {
            mobileRemain.textContent = item.remaining;
            mobileRemain.className = 'item-remaining zero';
          }
          saveState(state);
          removeIngredientRowIfAny(tr);
          btn.disabled = true;
          allBtn.disabled = true;
          const mobileBtn = document.getElementById(`roll1-mobile-btn-${item.id}`);
          if (mobileBtn) mobileBtn.disabled = true;
          const mobileAllBtn = document.getElementById(`roll1-mobile-all-btn-${item.id}`);
          if (mobileAllBtn) mobileAllBtn.disabled = true;
          // Re-render to move zero items to end
          render();
        }
      });

      // Mobile card
      const mobileCard = renderMobileCard(item, idxForName);
      mobileItems.appendChild(mobileCard);

      mobileCard.querySelector(`#roll1-mobile-tap-${item.id}`).addEventListener("click", () => {
        toggleMobileIngredients(mobileCard);
      });

      const mobileBtn = mobileCard.querySelector(`#roll1-mobile-btn-${item.id}`);
      const mobileAllBtn = mobileCard.querySelector(`#roll1-mobile-all-btn-${item.id}`);
      if (isZero) {
        mobileBtn.disabled = true;
        mobileAllBtn.disabled = true;
      }
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
            mobileBtn.disabled = true;
            mobileAllBtn.disabled = true;
            const desktopBtn = document.getElementById(`roll1-btn-${item.id}`);
            if (desktopBtn) desktopBtn.disabled = true;
            const desktopAllBtn = document.getElementById(`roll1-all-btn-${item.id}`);
            if (desktopAllBtn) desktopAllBtn.disabled = true;
            // Re-render to move zero items to end
            render();
            return;
          }
          updateTotals();
        }
      });

      mobileAllBtn.addEventListener("click", () => {
        if (item.remaining > 0) {
          item.remaining = 0;
          const desktopRemain = document.getElementById(`roll1-remain-${item.id}`);
          if (desktopRemain) desktopRemain.textContent = item.remaining;
          document.getElementById(`roll1-mobile-remain-${item.id}`).textContent = item.remaining;
          document.getElementById(`roll1-mobile-remain-${item.id}`).className = 'item-remaining zero';
          saveState(state);
          removeIngredientRowIfAny(tr);
          mobileBtn.disabled = true;
          mobileAllBtn.disabled = true;
          const desktopBtn = document.getElementById(`roll1-btn-${item.id}`);
          if (desktopBtn) desktopBtn.disabled = true;
          const desktopAllBtn = document.getElementById(`roll1-all-btn-${item.id}`);
          if (desktopAllBtn) desktopAllBtn.disabled = true;
          // Re-render to move zero items to end
          render();
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
    if (confirm(i18n.t('roll1.confirmReset'))) {
      state = state.map(it => ({ ...it, remaining: it.target }));
      saveState(state);
      render();
      updateTotals();
    }
  });

  // Expose rebuild function for i18n updates
  window.roll1Render = function () {
    // Rebuild initialItems with new translations
    initialItems = buildInitialItems();

    // Update state with new translations while preserving remaining counts
    state = state.map(item => {
      const newItem = initialItems.find(it => it.id === item.id);
      if (newItem) {
        return {
          ...newItem,
          remaining: item.remaining
        };
      }
      return item;
    });

    // Re-render the UI
    render();
    updateTotals();
  };

  render();
})();

// ========================================
// Roll 2 - 出餐紀錄
// ========================================
(function () {
  // 成分庫 with translation keys
  const INGREDIENTS_DATA = {
    "california": {
      type: "ing.type2Inside",
      toppings: ["ing.whiteSesame", "ing.orangeTobiko"],
      fillings: ["ing.crabmeat 60g", "ing.cucumber 10g", "ing.avocado 15g"]
    },
    "californiaGreenGrass": {
      variants: ["ing.californiaGreenGrass"]
    },
    "whiteCalifornia": {
      type: "ing.type2Inside",
      fillings: ["ing.crabmeat 60g", "ing.cucumber 25g"]
    },
    "miniSalmon": {
      type: "ing.type1Normal",
      fillings: ["ing.salmon 30g"]
    },
    "seafood": {
      type: "ing.seafoodMix",
      toppings: ["ing.whiteSesame", "ing.orangeTobiko"],
      fillings: ["ing.cucumber 10g", "ing.crabmeat 20g", "ing.salmon 15g", "ing.tamagoyaki 10g"]
    }
  };

  function getTranslatedIngredients(key) {
    const data = INGREDIENTS_DATA[key];
    if (!data) return [i18n.t('ingredients.notAvailable')];

    const result = [];

    if (data.variants) {
      return data.variants.map(v => i18n.t(v));
    }

    if (data.type) {
      result.push(i18n.t(data.type));
    }

    if (data.toppings && data.toppings.length > 0) {
      result.push(data.toppings.map(t => i18n.t(t)).join('、'));
    }

    if (data.fillings && data.fillings.length > 0) {
      result.push(data.fillings.map(f => {
        const parts = f.split(' ');
        if (parts.length > 1) {
          return i18n.t(parts[0]) + ' ' + parts[1];
        }
        return i18n.t(f);
      }).join('、'));
    }

    if (data.note) {
      result.push(i18n.t(data.note));
    }

    return result;
  }

  // Initial items definition with translation keys
  const initialItemsData = [
    { nameKey: "whiteCalifornia", target: 9, noteKey: "ing.noTobiko 5, ing.orangeTobiko 4", ingKey: "whiteCalifornia" },
    { nameKey: "california", target: 20, noteKey: "ing.greenGrass 4, ing.orangeTobiko 16", ingKey: "california" },
    { nameKey: "miniSalmon", target: 12, note: "", ingKey: "miniSalmon" },
    { nameKey: "california", target: 10, note: "", ingKey: "california" },
    { nameKey: "seafood", target: 5, note: "", ingKey: "seafood" },
    { nameKey: "california", target: 15, note: "", ingKey: "california" },
    { nameKey: "miniSalmon", target: 10, note: "", ingKey: "miniSalmon" }
  ];

  function buildInitialItems() {
    return initialItemsData.map((it, i) => ({
      id: String(i + 1),
      remaining: it.target,
      name: i18n.t(`product.${it.nameKey}`),
      note: it.noteKey ? it.noteKey.split(',').map(n => {
        const parts = n.trim().split(' ');
        return parts.length > 1 ? i18n.t(parts[0]) + ' ' + parts[1] : i18n.t(n.trim());
      }).join('，') : it.note,
      ...it
    }));
  }

  let initialItems = buildInitialItems();

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
    return idxForName > 1 ? `${item.name}（${i18n.t('product.batch')} ${idxForName}）` : item.name;
  }

  function renderIngredients(key) {
    const lines = getTranslatedIngredients(key);
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
          <span class="item-target"><span data-i18n="common.targetLabel">${i18n.t('common.targetLabel')}</span>: ${item.target}</span>
          <span class="item-remaining ${remainingClass}" id="roll2-mobile-remain-${item.id}">${item.remaining}</span>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn primary" id="roll2-mobile-btn-${item.id}" data-i18n="roll2.serveOne" aria-label="${i18n.t('roll2.serveOne')}">${i18n.t('roll2.serveOne')}</button>
        <button class="btn" id="roll2-mobile-all-btn-${item.id}" data-i18n="roll2.serveAll" aria-label="${i18n.t('roll2.serveAll')}">${i18n.t('roll2.serveAll')}</button>
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

    // Sort items: non-zero first, then zero items at the end
    const sortedState = [...state].sort((a, b) => {
      if (a.remaining === 0 && b.remaining > 0) return 1;
      if (a.remaining > 0 && b.remaining === 0) return -1;
      return 0;
    });

    for (const item of sortedState) {
      nameCounter[item.name] = (nameCounter[item.name] || 0) + 1;
      const idxForName = nameCounter[item.name];

      // Desktop table row
      const tr = document.createElement("tr");
      tr.dataset.id = item.id;
      const isZero = item.remaining === 0;
      tr.innerHTML = `
        <td class="name">
          <span class="tap" id="roll2-tap-${item.id}" data-i18n-title="roll2.clickToExpand" title="${i18n.t('roll2.clickToExpand')}">${displayLabel(item, idxForName)}</span>
          ${item.note ? `<div class="note">${item.note}</div>` : ""}
        </td>
        <td class="count">${item.target}</td>
        <td class="count ${isZero ? 'zero' : ''}" id="roll2-remain-${item.id}">${item.remaining}</td>
        <td>
          <button class="btn primary" id="roll2-btn-${item.id}" ${isZero ? 'disabled' : ''} data-i18n="roll2.serve" aria-label="${i18n.t('roll2.serveOne')}">${i18n.t('roll2.serve')}</button>
          <button class="btn" id="roll2-all-btn-${item.id}" ${isZero ? 'disabled' : ''} data-i18n="roll2.serveAll" aria-label="${i18n.t('roll2.serveAll')}">${i18n.t('roll2.serveAll')}</button>
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
            btn.disabled = true;
            const mobileBtn = document.getElementById(`roll2-mobile-btn-${item.id}`);
            if (mobileBtn) mobileBtn.disabled = true;
            const allBtn = document.getElementById(`roll2-all-btn-${item.id}`);
            if (allBtn) allBtn.disabled = true;
            const mobileAllBtn = document.getElementById(`roll2-mobile-all-btn-${item.id}`);
            if (mobileAllBtn) mobileAllBtn.disabled = true;
            // Re-render to move zero items to end
            render();
            return;
          }
          updateTotals();
        }
      });

      const allBtn = tr.querySelector(`#roll2-all-btn-${item.id}`);
      allBtn.addEventListener("click", () => {
        if (item.remaining > 0) {
          item.remaining = 0;
          document.getElementById(`roll2-remain-${item.id}`).textContent = item.remaining;
          const mobileRemain = document.getElementById(`roll2-mobile-remain-${item.id}`);
          if (mobileRemain) {
            mobileRemain.textContent = item.remaining;
            mobileRemain.className = 'item-remaining zero';
          }
          saveState(state);
          removeIngredientRowIfAny(tr);
          btn.disabled = true;
          allBtn.disabled = true;
          const mobileBtn = document.getElementById(`roll2-mobile-btn-${item.id}`);
          if (mobileBtn) mobileBtn.disabled = true;
          const mobileAllBtn = document.getElementById(`roll2-mobile-all-btn-${item.id}`);
          if (mobileAllBtn) mobileAllBtn.disabled = true;
          // Re-render to move zero items to end
          render();
        }
      });

      // Mobile card
      const mobileCard = renderMobileCard(item, idxForName);
      mobileItems.appendChild(mobileCard);

      mobileCard.querySelector(`#roll2-mobile-tap-${item.id}`).addEventListener("click", () => {
        toggleMobileIngredients(mobileCard);
      });

      const mobileBtn = mobileCard.querySelector(`#roll2-mobile-btn-${item.id}`);
      const mobileAllBtn = mobileCard.querySelector(`#roll2-mobile-all-btn-${item.id}`);
      if (isZero) {
        mobileBtn.disabled = true;
        mobileAllBtn.disabled = true;
      }
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
            mobileBtn.disabled = true;
            mobileAllBtn.disabled = true;
            const desktopBtn = document.getElementById(`roll2-btn-${item.id}`);
            if (desktopBtn) desktopBtn.disabled = true;
            const desktopAllBtn = document.getElementById(`roll2-all-btn-${item.id}`);
            if (desktopAllBtn) desktopAllBtn.disabled = true;
            // Re-render to move zero items to end
            render();
            return;
          }
          updateTotals();
        }
      });

      mobileAllBtn.addEventListener("click", () => {
        if (item.remaining > 0) {
          item.remaining = 0;
          const desktopRemain = document.getElementById(`roll2-remain-${item.id}`);
          if (desktopRemain) desktopRemain.textContent = item.remaining;
          document.getElementById(`roll2-mobile-remain-${item.id}`).textContent = item.remaining;
          document.getElementById(`roll2-mobile-remain-${item.id}`).className = 'item-remaining zero';
          saveState(state);
          removeIngredientRowIfAny(tr);
          mobileBtn.disabled = true;
          mobileAllBtn.disabled = true;
          const desktopBtn = document.getElementById(`roll2-btn-${item.id}`);
          if (desktopBtn) desktopBtn.disabled = true;
          const desktopAllBtn = document.getElementById(`roll2-all-btn-${item.id}`);
          if (desktopAllBtn) desktopAllBtn.disabled = true;
          // Re-render to move zero items to end
          render();
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
    if (confirm(i18n.t('roll2.confirmReset'))) {
      state = state.map(it => ({ ...it, remaining: it.target }));
      saveState(state);
      render();
      updateTotals();
    }
  });

  // Expose rebuild function for i18n updates
  window.roll2Render = function () {
    // Rebuild initialItems with new translations
    initialItems = buildInitialItems();

    // Update state with new translations while preserving remaining counts
    state = state.map(item => {
      const newItem = initialItems.find(it => it.id === item.id);
      if (newItem) {
        return {
          ...newItem,
          remaining: item.remaining
        };
      }
      return item;
    });

    // Re-render the UI
    render();
    updateTotals();
  };

  render();
})();

// ========================================
// Notes - 壽司卷筆記
// ========================================
(function () {
  const DATA_KEYS = [
    { nameKey: "california", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame", "ing.orangeTobiko"], fillingsKeys: ["ing.crabmeat 60g", "ing.cucumber 10g", "ing.avocado 15g"] },
    { nameKey: "whiteCalifornia", styleKey: "ing.type2Inside", toppingsKeys: [], fillingsKeys: ["ing.crabmeat 60g", "ing.cucumber 25g"] },
    { nameKey: "salmonAvocado", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame", "ing.seaweed"], fillingsKeys: ["ing.avocado 20g", "ing.salmon 40g"] },
    { nameKey: "spicySeafood", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame", "ing.orangeTobiko"], fillingsKeys: ["ing.cucumber 10g", "ing.crabmeat 20g", "ing.salmon 15g", "ing.tamagoyaki 10g"] },
    { nameKey: "seafood", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame", "ing.orangeTobiko"], fillingsKeys: ["ing.cucumber 10g", "ing.crabmeat 20g", "ing.salmon 15g", "ing.tamagoyaki 10g"] },
    { nameKey: "avocado", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame", "ing.seaweed"], fillingsKeys: ["ing.avocado 60g"] },
    { nameKey: "cucumberAvocado", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame", "ing.seaweed"], fillingsKeys: ["ing.avocado 30g", "ing.cucumber 30g"] },
    { nameKey: "spiderRoll", styleKey: "ing.type2Inside", toppingsKeys: [], fillingsKeys: ["ing.cucumber 10g", "ing.crabmeat 10g", "ing.onePairShrimp"] },
    { nameKey: "miniShrimp", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame"], fillingsKeys: ["ing.cucumber 20g", "ing.onePairShrimp"] },
    { nameKey: "largeTempuraShrimp", styleKey: "ing.type3Inside", toppingsKeys: ["ing.whiteSesame"], fillingsKeys: ["ing.lettuce 2pcs", "ing.cucumber 25g", "ing.carrotShred 15g", "ing.onePairShrimp", "ing.crabmeat"] },
    {
      nameKey: "gardenDelight",
      styleKey: "note.multipleTypes",
      variants: [
        { titleKey: "note.gardenDelight1", toppingsKeys: ["ing.blackWhiteSesame"], fillingsKeys: ["ing.pickledRadish 30g", "ing.redPepperShred 25g"] },
        { titleKey: "note.gardenDelight2", toppingsKeys: ["ing.blackWhiteSesame"], fillingsKeys: ["ing.cucumber 20g", "ing.avocado 25g"] },
        { titleKey: "note.gardenDelight3", toppingsKeys: ["ing.blackWhiteSesame"], fillingsKeys: ["ing.cucumber 20g", "ing.redPepperShred 10g", "ing.carrotShred 20g"] },
        { titleKey: "note.gardenDelight4", toppingsKeys: [], fillingsKeys: ["ing.lettuce 2pcs", "ing.cucumber 30g", "ing.avocado 20g", "ing.pickledRadish 30g", "ing.redPepperShred 20g", "ing.carrotShred 15g"] }
      ]
    },
    { nameKey: "miniSalmon", styleKey: "ing.type1Normal", toppingsKeys: [], fillingsKeys: ["ing.salmon 30g"] },
    { nameKey: "miniCucumber", styleKey: "ing.type1Normal", toppingsKeys: [], fillingsKeys: ["ing.cucumber 30g"] },
    { nameKey: "mapleLeafRoll", styleKey: "ing.type3Inside", toppingsKeys: ["ing.whiteSesame", "ing.orangeTobiko"], fillingsKeys: ["note.mapleLeafFilling"] },
    { nameKey: "cookedSalmon", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame"], fillingsKeys: ["ing.cookedSalmon", "ing.cucumber"], notesKey: "note.cookedSalmonNote" },
    { nameKey: "bigRoll", styleKey: "ing.type3Normal", toppingsKeys: [], fillingsKeys: ["ing.crabmeat", "ing.cucumber", "ing.egg", "ing.pickledBamboo", "ing.redTobiko"] },
    { nameKey: "spicyTunaRoll", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame"], fillingsKeys: ["ing.tunaSashimi", "ing.cucumber"] }
  ];

  function buildData() {
    return DATA_KEYS.map(item => ({
      name: i18n.t(`product.${item.nameKey}`),
      style: i18n.t(item.styleKey),
      toppings: item.toppingsKeys ? item.toppingsKeys.map(k => {
        const parts = k.split(' ');
        return parts.length > 1 ? i18n.t(parts[0]) + ' ' + parts[1] : i18n.t(k);
      }) : [],
      fillings: item.fillingsKeys ? item.fillingsKeys.map(k => {
        const parts = k.split(' ');
        return parts.length > 1 ? i18n.t(parts[0]) + ' ' + parts[1] : i18n.t(k);
      }) : [],
      notes: item.notesKey ? i18n.t(item.notesKey) : undefined,
      variants: item.variants ? item.variants.map(v => ({
        title: i18n.t(v.titleKey),
        toppings: v.toppingsKeys ? v.toppingsKeys.map(k => {
          const parts = k.split(' ');
          return parts.length > 1 ? i18n.t(parts[0]) + ' ' + parts[1] : i18n.t(k);
        }) : [],
        fillings: v.fillingsKeys ? v.fillingsKeys.map(k => {
          const parts = k.split(' ');
          return parts.length > 1 ? i18n.t(parts[0]) + ' ' + parts[1] : i18n.t(k);
        }) : []
      })) : undefined,
      nameKey: item.nameKey
    }));
  }

  let DATA = buildData();

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

  // Expose rebuild function for i18n language changes
  window.notesRebuild = function () {
    DATA = buildData();
    buildPicker();
    result.innerHTML = `<div class="empty">${i18n.t('notes.empty')}</div>`;
  };
})();

// ========================================
// Checklist - 工作流程
// ========================================
(function () {
  const VERSION = "v2.0";
  const STORAGE_KEY = "checklist-spa-" + VERSION;
  const TODAY = new Date().toISOString().slice(0, 10);

  function buildData() {
    return {
      meta: {
        title: i18n.t('checklist.title'),
        date: TODAY,
        shift: "08:30–17:00"
      },
      sections: {
        prep: [
          i18n.t('checklist.task.prep1'),
          i18n.t('checklist.task.prep2'),
          // i18n.t('checklist.task.prep3'),
          // i18n.t('checklist.task.prep4')
        ],
        during: [
          i18n.t('checklist.task.during1'),
          i18n.t('checklist.task.during2'),
          i18n.t('checklist.task.during6'),
          i18n.t('checklist.task.during3'),
          i18n.t('checklist.task.during4'),
          i18n.t('checklist.task.during5'),
          i18n.t('checklist.task.during6'),
          i18n.t('checklist.task.during7')
        ],
        post: [
          i18n.t('checklist.task.post1'),
          i18n.t('checklist.task.post2'),
          i18n.t('checklist.task.post3'),
          i18n.t('checklist.task.post4'),
          i18n.t('checklist.task.post5'),
          i18n.t('checklist.task.post6'),
          // i18n.t('checklist.task.post7'),
          // i18n.t('checklist.task.post8'),
          // i18n.t('checklist.task.post9'),
          // i18n.t('checklist.task.post11'),
          // i18n.t('checklist.task.post10')
        ]
      }
    };
  }

  let DATA = buildData();

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
    if (confirm(i18n.t('checklist.confirmReset'))) {
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
    els.startBento.textContent = i18n.t('checklist.timerRunning');
    els.timerCard.classList.add("active");
    els.timerStatus.textContent = i18n.t('checklist.timerStatusActive');

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
    els.startBento.textContent = i18n.t('checklist.startTimer');
    els.timerCard.classList.remove("active");
    els.timerStatus.textContent = i18n.t('checklist.timerStatusPending');
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

      alert(i18n.t('checklist.timerAlert'));
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
    els.startBento.textContent = i18n.t('checklist.timerRunning');
    els.timerCard.classList.add("active");
    els.timerStatus.textContent = i18n.t('checklist.timerStatusActive');
    tickBento();
    bentoTick = setInterval(tickBento, 500);
  } else {
    els.timerStatus.textContent = i18n.t('checklist.timerStatusPending');
  }

  // Expose rebuild function for i18n language changes
  window.checklistRebuild = function () {
    DATA = buildData();
    for (const k of Object.keys(DATA.sections)) renderSection(k);
    updateBadges();

    // Update timer button texts
    if (state.bentoTimer?.active) {
      els.startBento.textContent = i18n.t('checklist.timerRunning');
      els.timerStatus.textContent = i18n.t('checklist.timerStatusActive');
    } else {
      els.timerStatus.textContent = i18n.t('checklist.timerStatusPending');
    }
  };
})();

// ========================================
// Checklist 2 - 工作流程二
// ========================================
(function () {
  const VERSION = "v2.0";
  const STORAGE_KEY = "checklist2-spa-" + VERSION;
  const TODAY = new Date().toISOString().slice(0, 10);

  function buildData() {
    return {
      meta: {
        title: i18n.t('checklist2.title'),
        date: TODAY,
        shift: "08:30–17:30"
      },
      sections: {
        prep: [
          i18n.t('checklist2.task.prep1'),
          i18n.t('checklist2.task.prep2'),
          i18n.t('checklist2.task.prep3'),
          i18n.t('checklist2.task.prep4')
        ],
        during: [
          i18n.t('checklist2.task.during1'),
          i18n.t('checklist2.task.during2'),
          i18n.t('checklist2.task.during3'),
          i18n.t('checklist2.task.during4'),
          i18n.t('checklist2.task.during5'),
          i18n.t('checklist2.task.during6'),
          i18n.t('checklist2.task.during7')
        ],
        post: [
          i18n.t('checklist2.task.post1'),
          i18n.t('checklist2.task.post2'),
          i18n.t('checklist2.task.post3'),
          i18n.t('checklist2.task.post4'),
          i18n.t('checklist2.task.post5'),
          i18n.t('checklist2.task.post6'),
          i18n.t('checklist2.task.post7'),
          i18n.t('checklist2.task.post8'),
          i18n.t('checklist2.task.post9'),
          i18n.t('checklist2.task.post11'),
          i18n.t('checklist2.task.post10')
        ]
      }
    };
  }

  let DATA = buildData();

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
      prep: document.getElementById("checklist2-list-prep"),
      during: document.getElementById("checklist2-list-during"),
      post: document.getElementById("checklist2-list-post")
    },
    badges: {
      prep: document.getElementById("checklist2-badge-prep"),
      during: document.getElementById("checklist2-badge-during"),
      post: document.getElementById("checklist2-badge-post")
    },
    overallDone: document.getElementById("checklist2-overall-done"),
    overallTotal: document.getElementById("checklist2-overall-total"),
    completionRate: document.getElementById("checklist2-completion-rate"),
    startBento: document.getElementById("checklist2-start-bento"),
    stopBento: document.getElementById("checklist2-stop-bento"),
    bentoRemaining: document.getElementById("checklist2-bento-remaining"),
    timerCard: document.getElementById("checklist2-timer-card"),
    timerStatus: document.getElementById("checklist2-timer-status"),
    resetToday: document.getElementById("checklist2-reset-today")
  };

  let state = loadState();
  let bentoTick = null;

  function renderSection(key) {
    const items = DATA.sections[key];
    const list = els.lists[key];
    list.innerHTML = "";

    items.forEach((text, idx) => {
      const id = `checklist2-${key}-${idx}`;
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

  document.querySelectorAll("[data-check2]").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-check2");
      state.checks[k] = state.checks[k].map(() => true);
      saveState();
      renderSection(k);
      updateBadges();
    });
  });

  document.querySelectorAll("[data-uncheck2]").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-uncheck2");
      state.checks[k] = state.checks[k].map(() => false);
      saveState();
      renderSection(k);
      updateBadges();
    });
  });

  els.resetToday.addEventListener("click", () => {
    if (confirm(i18n.t('checklist.confirmReset'))) {
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
    els.startBento.textContent = i18n.t('checklist.timerRunning');
    els.timerCard.classList.add("active");
    els.timerStatus.textContent = i18n.t('checklist.timerStatusActive');

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
    els.startBento.textContent = i18n.t('checklist.startTimer');
    els.timerCard.classList.remove("active");
    els.timerStatus.textContent = i18n.t('checklist.timerStatusPending');
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

      alert(i18n.t('checklist.timerAlert'));
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
    els.startBento.textContent = i18n.t('checklist.timerRunning');
    els.timerCard.classList.add("active");
    els.timerStatus.textContent = i18n.t('checklist.timerStatusActive');
    tickBento();
    bentoTick = setInterval(tickBento, 500);
  } else {
    els.timerStatus.textContent = i18n.t('checklist.timerStatusPending');
  }

  // Expose rebuild function for i18n language changes
  window.checklist2Rebuild = function () {
    DATA = buildData();
    for (const k of Object.keys(DATA.sections)) renderSection(k);
    updateBadges();

    // Update timer button texts
    if (state.bentoTimer?.active) {
      els.startBento.textContent = i18n.t('checklist.timerRunning');
      els.timerStatus.textContent = i18n.t('checklist.timerStatusActive');
    } else {
      els.timerStatus.textContent = i18n.t('checklist.timerStatusPending');
    }
  };
})();
