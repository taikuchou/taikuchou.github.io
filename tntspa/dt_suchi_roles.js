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
    if (window.notesRebuild) window.notesRebuild();
    if (window.checklistRebuild) window.checklistRebuild();
    if (window.checklistbRebuild) window.checklistbRebuild();
    if (window.roll1Rebuild) window.roll1Rebuild();
    if (window.roll2Rebuild) window.roll2Rebuild();
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
  if (initialHash && ['checklist', 'checklistb', 'roll1', 'roll2', 'notes'].includes(initialHash)) {
    switchPage(initialHash);
  }
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
    { nameKey: "spiderRoll", styleKey: "ing.type2Inside", toppingsKeys: [], fillingsKeys: ["ing.cucumber 15g", "ing.crabstick 2", "ing.onePairShrimp"] },
    { nameKey: "miniShrimp", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame"], fillingsKeys: ["ing.cucumber 20g", "ing.onePairShrimp", "ing.crabstick 2"] },
    { nameKey: "largeTempuraShrimp", styleKey: "ing.type3Inside", toppingsKeys: ["ing.whiteSesame"], fillingsKeys: ["ing.lettuce 2pcs", "ing.cucumber 25g", "ing.carrotShred 15g", "ing.onePairShrimp", "ing.crabmeat"] },
    {
      nameKey: "gardenDelight",
      styleKey: "note.multipleTypes",
      variants: [
        { titleKey: "note.gardenDelight1", styleKey: "ing.type1Inside", toppingsKeys: ["ing.blackWhiteSesame"], fillingsKeys: ["ing.pickledRadish 30g", "ing.redPepperShred 25g"] },
        { titleKey: "note.gardenDelight2", styleKey: "ing.type1Inside", toppingsKeys: ["ing.blackWhiteSesame"], fillingsKeys: ["ing.cucumber 20g", "ing.avocado 25g"] },
        { titleKey: "note.gardenDelight3", styleKey: "ing.type1Inside", toppingsKeys: ["ing.blackWhiteSesame"], fillingsKeys: ["ing.cucumber 20g", "ing.redPepperShred 10g", "ing.carrotShred 20g"] },
        { titleKey: "note.gardenDelight4", styleKey: "ing.type3Normal", toppingsKeys: [], fillingsKeys: ["ing.yellowPickle 30g", "ing.cucumber 30g", "ing.redPepperShred 20g", "ing.avocado 20g", "ing.carrotShred 15g", "ing.lettuce 2pcs"] }
      ]
    },
    { nameKey: "miniSalmon", styleKey: "ing.type1Normal", toppingsKeys: [], fillingsKeys: ["ing.salmon 30g"] },
    { nameKey: "miniCucumber", styleKey: "ing.type1Normal", toppingsKeys: [], fillingsKeys: ["ing.cucumber 30g"] },
    { nameKey: "mapleLeafRoll", styleKey: "ing.type3Inside", toppingsKeys: ["ing.whiteSesame", "ing.orangeTobiko"], fillingsKeys: ["note.mapleLeafFilling"] },
    { nameKey: "cookedSalmon", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame"], fillingsKeys: ["ing.cookedSalmon", "ing.cucumber"], notesKey: "note.cookedSalmonNote" },
    { nameKey: "bigRoll", styleKey: "ing.type3Normal", toppingsKeys: [], fillingsKeys: ["ing.crabstick 2", "ing.cucumber 30g", "ing.egg 30g", "ing.pickledRadish 2", "ing.redTobiko"] },
    { nameKey: "spicyTunaRoll", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame"], fillingsKeys: ["ing.tunaSashimi 80g", "ing.cucumber"] },
    { nameKey: "spicySalmonRoll", styleKey: "ing.type2Inside", toppingsKeys: ["ing.whiteSesame"], fillingsKeys: ["ing.salmonSashimi 80g", "ing.cucumber"] }
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
        style: i18n.t(v.styleKey),
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
  const searchInput = document.getElementById("notes-search-input");
  const searchBtn = document.getElementById("notes-search-btn");
  const clearBtn = document.getElementById("notes-clear-btn");

  // Mode toggle elements
  const modeToggleBtn = document.getElementById("notes-mode-toggle");
  const modeIcon = document.getElementById("notes-mode-icon");
  const modeText = document.getElementById("notes-mode-text");
  const currentModeText = document.getElementById("notes-current-mode");
  const selectModeUI = document.getElementById("notes-select-mode");
  const searchModeUI = document.getElementById("notes-search-mode");

  let currentMode = "select"; // "select" or "search"

  // Toggle between select and search modes
  function toggleMode() {
    if (currentMode === "select") {
      // Switch to search mode
      currentMode = "search";
      selectModeUI.style.display = "none";
      searchModeUI.style.display = "flex";
      modeIcon.textContent = "📋";
      modeText.textContent = i18n.t('notes.switchToSelect');
      currentModeText.textContent = i18n.t('notes.modeSearch');
      result.innerHTML = `<div class="empty">${i18n.t('notes.emptySearch')}</div>`;
      // Clear select picker
      picker.value = "";
    } else {
      // Switch to select mode
      currentMode = "select";
      selectModeUI.style.display = "flex";
      searchModeUI.style.display = "none";
      modeIcon.textContent = "🔍";
      modeText.textContent = i18n.t('notes.switchToSearch');
      currentModeText.textContent = i18n.t('notes.modeSelect');
      result.innerHTML = `<div class="empty">${i18n.t('notes.empty')}</div>`;
      // Clear search input
      searchInput.value = "";
    }
  }

  function renderList(arr) {
    if (!arr || !arr.length) return `<div class="meta">${i18n.t('notes.none')}</div>`;
    return `<ul>${arr.map(x => `<li>${x}</li>`).join("")}</ul>`;
  }

  function renderItem(item) {
    if (!item) {
      result.innerHTML = '<div class="empty">查無此品項。</div>';
      return;
    }
    if (!item.variants) {
      const hasToppings = item.toppings && item.toppings.length > 0;
      result.innerHTML = `
        <div class="note-card">
          <div class="title">${item.name}&nbsp;&nbsp;</div>
          <div class="grid">
            <div class="sec">
             <span class="tag">${item.style || i18n.t('notes.styleUnknown')}</span>&nbsp;&nbsp;
              ${hasToppings ? `
             <span class="tag">${(item.toppings)}</span>
            ` : ''}
              ${renderList(item.fillings)}
            </div>
          </div>
          ${item.notes ? `<div class="meta" style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);"><strong>備註：</strong>${item.notes}</div>` : ''}
        </div>`;
    } else {
      result.innerHTML = `
        <div class="note-card">
          <div class="title">${item.name}</div>
          ${item.variants.map(v => {
        const hasToppings = v.toppings && v.toppings.length > 0;
        console.log(v)
        return `
            <div class="sec" style="border-top:1px dashed var(--border);padding-top:10px;margin-top:10px;">
              <div class="meta"><strong>${v.title}</strong></div>
              <div class="grid">
                <div class="sec">
                  <span class="tag">${i18n.t(v.style) || i18n.t('notes.styleUnknown')}</span>&nbsp;&nbsp;
                    ${hasToppings ? `
                  <span class="tag">${(v.toppings)}</span>
                  ` : ''}
                    ${renderList(v.fillings)}
                </div>
              </div>
            </div>`;
      }).join("")}
        </div>`;
    }
  }

  // Search function - filters DATA based on search term
  function searchSushi(searchTerm) {
    if (!searchTerm || searchTerm.trim() === "") {
      return [];
    }

    const term = searchTerm.toLowerCase().trim();
    return DATA.filter(item => {
      // Search in name
      if (item.name.toLowerCase().includes(term)) return true;

      // Search in style
      if (item.style && item.style.toLowerCase().includes(term)) return true;

      // Search in toppings
      if (item.toppings && item.toppings.some(t => t.toLowerCase().includes(term))) return true;

      // Search in fillings
      if (item.fillings && item.fillings.some(f => f.toLowerCase().includes(term))) return true;

      // Search in notes
      if (item.notes && item.notes.toLowerCase().includes(term)) return true;

      // Search in variants
      if (item.variants) {
        return item.variants.some(v => {
          if (v.title && v.title.toLowerCase().includes(term)) return true;
          if (v.toppings && v.toppings.some(t => t.toLowerCase().includes(term))) return true;
          if (v.fillings && v.fillings.some(f => f.toLowerCase().includes(term))) return true;
          return false;
        });
      }

      return false;
    });
  }

  // Render multiple items
  function renderMultipleItems(items) {
    if (!items || items.length === 0) {
      result.innerHTML = `<div class="empty">${i18n.t('notes.noResults')}</div>`;
      return;
    }

    const header = `<div class="meta" style="margin-bottom:15px;"><strong>${i18n.t('notes.searchResults')}</strong>: ${items.length} ${i18n.t('notes.selectSushi')}</div>`;

    const cardsHtml = items.map(item => {
      if (!item.variants) {
        const hasToppings = item.toppings && item.toppings.length > 0;
        return `
          <div class="note-card" style="margin-bottom:20px;">
            <div class="title">${item.name}&nbsp;&nbsp;</div>
            <div class="grid">
              <div class="sec">
               <span class="tag">${item.style || i18n.t('notes.styleUnknown')}</span>&nbsp;&nbsp;
                ${hasToppings ? `
               <span class="tag">${(item.toppings)}</span>
              ` : ''}
                ${renderList(item.fillings)}
              </div>
            </div>
            ${item.notes ? `<div class="meta" style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);"><strong>備註：</strong>${item.notes}</div>` : ''}
          </div>`;
      } else {
        return `
          <div class="note-card" style="margin-bottom:20px;">
            <div class="title">${item.name}</div>
            ${item.variants.map(v => {
          const hasToppings = v.toppings && v.toppings.length > 0;
          return `
              <div class="sec" style="border-top:1px dashed var(--border);padding-top:10px;margin-top:10px;">
                <div class="meta"><strong>${v.title}</strong></div>
                <div class="sec">
                  <span class="tag">${v.style || i18n.t('notes.styleUnknown')}</span>&nbsp;&nbsp;
                    ${hasToppings ? `
                  <span class="tag">${(v.toppings)}</span>
                  ` : ''}
                    ${renderList(v.fillings)}
                </div>
              </div>`;
        }).join("")}
          </div>`;
      }
    }).join("");

    result.innerHTML = header + cardsHtml;
  }

  function buildPicker() {
    picker.innerHTML = "";

    // Add placeholder option
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = i18n.t('notes.placeholder');
    placeholder.disabled = true;
    placeholder.selected = true;
    picker.appendChild(placeholder);

    // Add sushi roll options
    DATA.forEach((item, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = item.name;
      picker.appendChild(opt);
    });
  }

  buildPicker();

  // Mode toggle button handler
  modeToggleBtn.addEventListener("click", () => {
    toggleMode();
  });

  // Select mode: picker change handler
  picker.addEventListener("change", () => {
    if (picker.value === "") {
      result.innerHTML = `<div class="empty">${i18n.t('notes.empty')}</div>`;
      return;
    }
    const idx = parseInt(picker.value, 10);
    renderItem(DATA[idx]);
  });

  // Search mode: search button click handler
  searchBtn.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    const results = searchSushi(searchTerm);
    renderMultipleItems(results);
  });

  // Search mode: clear button click handler
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    result.innerHTML = `<div class="empty">${i18n.t('notes.emptySearch')}</div>`;
  });

  // Search mode: enter key in search input
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
  });

  // Show empty message by default (select mode)
  result.innerHTML = `<div class="empty">${i18n.t('notes.empty')}</div>`;

  // Expose rebuild function for i18n language changes
  window.notesRebuild = function () {
    DATA = buildData();
    buildPicker();
    searchInput.placeholder = i18n.t('notes.searchPlaceholder');

    // Update mode toggle button text based on current mode
    if (currentMode === "select") {
      modeText.textContent = i18n.t('notes.switchToSearch');
      currentModeText.textContent = i18n.t('notes.modeSelect');
      result.innerHTML = `<div class="empty">${i18n.t('notes.empty')}</div>`;
    } else {
      modeText.textContent = i18n.t('notes.switchToSelect');
      currentModeText.textContent = i18n.t('notes.modeSearch');
      result.innerHTML = `<div class="empty">${i18n.t('notes.emptySearch')}</div>`;
    }
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
          i18n.t('checklist.task.prep3'),
          i18n.t('checklist.task.prep4'),
          i18n.t('checklist.task.prep5'),
          i18n.t('checklist.task.prep6'),
          i18n.t('checklist.task.prep7')
        ]
      }
    };
  }

  let DATA = buildData();

  function defaultState() {
    const s = { date: TODAY, checks: { prep: [] }, bentoTimer: null };
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
      prep: document.getElementById("checklist-list-prep")
    },
    badges: {
      prep: document.getElementById("checklist-badge-prep")
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
// Checklist B - 出餐Ｂ工作流程
// ========================================
(function () {
  const VERSION = "v2.0";
  const STORAGE_KEY = "checklistb-spa-" + VERSION;
  const TODAY = new Date().toISOString().slice(0, 10);

  function buildData() {
    return {
      meta: {
        title: i18n.t('checklistb.title') || i18n.t('checklist.title'),
        date: TODAY,
        shift: "08:30–17:00"
      },
      sections: {
        prepb: [
          i18n.t('checklistb.task.prep1'),
          i18n.t('checklistb.task.prep2'),
          i18n.t('checklistb.task.prep3'),
          i18n.t('checklistb.task.prep4'),
          i18n.t('checklistb.task.prep5'),
          i18n.t('checklistb.task.prep6')
        ]
      }
    };
  }

  let DATA = buildData();

  function defaultState() {
    const s = { date: TODAY, checks: { prepb: [] }, bentoTimer: null };
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
      prepb: document.getElementById("checklistb-list-prepb")
    },
    badges: {
      prepb: document.getElementById("checklistb-badge-prepb")
    },
    overallDone: document.getElementById("checklistb-overall-done"),
    overallTotal: document.getElementById("checklistb-overall-total"),
    completionRate: document.getElementById("checklistb-completion-rate"),
    startBento: document.getElementById("checklistb-start-bento"),
    stopBento: document.getElementById("checklistb-stop-bento"),
    bentoRemaining: document.getElementById("checklistb-bento-remaining"),
    timerCard: document.getElementById("checklistb-timer-card"),
    timerStatus: document.getElementById("checklistb-timer-status"),
    resetToday: document.getElementById("checklistb-reset-today")
  };

  let state = loadState();
  let bentoTick = null;

  function renderSection(key) {
    const items = DATA.sections[key];
    const list = els.lists[key];
    list.innerHTML = "";

    items.forEach((text, idx) => {
      const id = `checklistb-${key}-${idx}`;
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

  document.querySelectorAll("[data-checkb]").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-checkb");
      state.checks[k] = state.checks[k].map(() => true);
      saveState();
      renderSection(k);
      updateBadges();
    });
  });

  document.querySelectorAll("[data-uncheckb]").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-uncheckb");
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
  window.checklistbRebuild = function () {
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
// Roll 1 - 卷1工作流程
// ========================================
(function () {
  const VERSION = "v2.0";
  const STORAGE_KEY = "roll1-spa-" + VERSION;
  const TODAY = new Date().toISOString().slice(0, 10);

  function buildData() {
    return {
      meta: {
        title: i18n.t('roll1.title') || i18n.t('checklist.title'),
        date: TODAY,
        shift: "08:30–17:00"
      },
      sections: {
        roll1prep: [
          i18n.t('roll1.task.prep1'),
          i18n.t('roll1.task.prep2'),
          i18n.t('roll1.task.prep3'),
          i18n.t('roll1.task.prep4'),
          i18n.t('roll1.task.prep5'),
          i18n.t('roll1.task.prep6'),
          i18n.t('roll1.task.prep7'),
          i18n.t('roll1.task.prep8')
        ]
      }
    };
  }

  let DATA = buildData();

  function defaultState() {
    const s = { date: TODAY, checks: { roll1prep: [] }, bentoTimer: null };
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
      roll1prep: document.getElementById("roll1-list-roll1prep")
    },
    badges: {
      roll1prep: document.getElementById("roll1-badge-roll1prep")
    },
    overallDone: document.getElementById("roll1-overall-done"),
    overallTotal: document.getElementById("roll1-overall-total"),
    completionRate: document.getElementById("roll1-completion-rate"),
    startBento: document.getElementById("roll1-start-bento"),
    stopBento: document.getElementById("roll1-stop-bento"),
    bentoRemaining: document.getElementById("roll1-bento-remaining"),
    timerCard: document.getElementById("roll1-timer-card"),
    timerStatus: document.getElementById("roll1-timer-status"),
    resetToday: document.getElementById("roll1-reset-today")
  };

  let state = loadState();
  let bentoTick = null;

  function renderSection(key) {
    const items = DATA.sections[key];
    const list = els.lists[key];
    list.innerHTML = "";

    items.forEach((text, idx) => {
      const id = `roll1-${key}-${idx}`;
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

  document.querySelectorAll("[data-checkroll1]").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-checkroll1");
      state.checks[k] = state.checks[k].map(() => true);
      saveState();
      renderSection(k);
      updateBadges();
    });
  });

  document.querySelectorAll("[data-uncheckroll1]").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-uncheckroll1");
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
  window.roll1Rebuild = function () {
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
// Roll 2 - 卷2工作流程
// ========================================
(function () {
  const VERSION = "v2.0";
  const STORAGE_KEY = "roll2-spa-" + VERSION;
  const TODAY = new Date().toISOString().slice(0, 10);

  function buildData() {
    return {
      meta: {
        title: i18n.t('roll2.title') || i18n.t('checklist.title'),
        date: TODAY,
        shift: "08:30–17:00"
      },
      sections: {
        roll2prep: [
          i18n.t('roll2.task.prep1'),
          i18n.t('roll2.task.prep2'),
          i18n.t('roll2.task.prep3'),
          i18n.t('roll2.task.prep4'),
          i18n.t('roll2.task.prep5'),
          i18n.t('roll2.task.prep6'),
          i18n.t('roll2.task.prep7'),
          i18n.t('roll2.task.prep8'),
          i18n.t('roll2.task.prep9'),
          i18n.t('roll2.task.prep10'),
          i18n.t('roll2.task.prep11')
        ]
      }
    };
  }

  let DATA = buildData();

  function defaultState() {
    const s = { date: TODAY, checks: { roll2prep: [] }, bentoTimer: null };
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
      roll2prep: document.getElementById("roll2-list-roll2prep")
    },
    badges: {
      roll2prep: document.getElementById("roll2-badge-roll2prep")
    },
    overallDone: document.getElementById("roll2-overall-done"),
    overallTotal: document.getElementById("roll2-overall-total"),
    completionRate: document.getElementById("roll2-completion-rate"),
    startBento: document.getElementById("roll2-start-bento"),
    stopBento: document.getElementById("roll2-stop-bento"),
    bentoRemaining: document.getElementById("roll2-bento-remaining"),
    timerCard: document.getElementById("roll2-timer-card"),
    timerStatus: document.getElementById("roll2-timer-status"),
    resetToday: document.getElementById("roll2-reset-today")
  };

  let state = loadState();
  let bentoTick = null;

  function renderSection(key) {
    const items = DATA.sections[key];
    const list = els.lists[key];
    list.innerHTML = "";

    items.forEach((text, idx) => {
      const id = `roll2-${key}-${idx}`;
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

  document.querySelectorAll("[data-checkroll2]").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-checkroll2");
      state.checks[k] = state.checks[k].map(() => true);
      saveState();
      renderSection(k);
      updateBadges();
    });
  });

  document.querySelectorAll("[data-uncheckroll2]").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-uncheckroll2");
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
  window.roll2Rebuild = function () {
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
