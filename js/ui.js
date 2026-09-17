/* ============================================
   LEVEL UP PROTOCOL — UI Helpers
   ============================================ */

const UI = {
  // ---- Toast ----
  toast(icon, msg) {
    const el = document.getElementById('toast');
    const iconEl = el.querySelector('.toast-icon');
    const msgEl = document.getElementById('toastMsg');
    // Support both SVG icon keys and raw HTML
    iconEl.innerHTML = ICONS[icon] || icon;
    msgEl.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  },

  // ---- Modal ----
  openModal(title, sub, bodyHtml) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalSub').textContent = sub;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    document.getElementById('modal').classList.add('open');
  },

  closeModal() {
    document.getElementById('modal').classList.remove('open');
  },

  // ---- Escape HTML ----
  esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  },

  // ---- View Switching ----
  switchView(viewName) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.mobile-nav-item').forEach(n => n.classList.remove('active'));

    const section = document.getElementById('view-' + viewName);
    if (section) {
      section.classList.add('active');
      section.classList.add('view-enter');
      setTimeout(() => section.classList.remove('view-enter'), 400);
    }

    const navItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
    if (navItem) navItem.classList.add('active');
    const mobileItem = document.querySelector(`.mobile-nav-item[data-view="${viewName}"]`);
    if (mobileItem) mobileItem.classList.add('active');

    if (window.Quests && viewName === 'quests') Quests.render();
    if (window.Habits && viewName === 'habits') Habits.render();
    if (window.Achievements && viewName === 'achievements') Achievements.render();
    if (window.Shop && viewName === 'shop') Shop.render();
    if (viewName === 'settings') {
      document.getElementById('settingsName').value = state.get('name');
      const statsEl = document.getElementById('settingsStats');
      if (statsEl) {
        const s = state.get();
        statsEl.innerHTML = Object.entries(s.stats).map(([k, v]) =>
          `<div style="text-transform:capitalize;display:flex;align-items:center;gap:8px">
            <span style="color:var(--accent)">${v}</span> ${k} (${s.statXp[k] || 0} / ${v * 200} XP)
          </div>`
        ).join('');
      }
    }

    document.querySelector('.main').scrollTo(0, 0);
  },

  // ---- Activity Log ----
  renderActivity() {
    const el = document.getElementById('recentActivity');
    const activity = state.get('activity');
    if (!activity || !activity.length) {
      el.innerHTML = '<div style="padding:8px 0;font-family:var(--mono);font-size:11px;color:var(--ink-dim)">No activity yet. Complete a quest or habit to get started.</div>';
      return;
    }
    el.innerHTML = activity.slice(0, 10).map(a => `
      <div class="activity-item">
        <span class="activity-time">${a.time}</span>
        <span class="activity-icon">${ICONS[a.icon] || a.icon}</span>
        <span class="activity-text">${a.text}
          ${a.xp ? `<span class="activity-xp">+${a.xp} XP</span>` : ''}
          ${a.gold ? `<span class="activity-gold">+${a.gold}g</span>` : ''}
        </span>
      </div>
    `).join('');
  },

  updateDashboard() {
    const s = state.get();
    document.getElementById('totalLevel').textContent = s.level;
    document.getElementById('totalGold').textContent = s.gold;
    document.getElementById('totalStreak').textContent = s.streak + 'D';
    document.getElementById('xpToday').textContent = s.xpToday;
    document.getElementById('questsDone').textContent = s.questsDoneToday;

    const xpPct = (s.xp / s.xpMax) * 100;
    const bar = document.querySelector('.sidebar-footer .user-bar');
    if (bar) bar.style.setProperty('--xp', xpPct + '%');
    const sidebarXp = document.getElementById('sidebarXp');
    const sidebarXpMax = document.getElementById('sidebarXpMax');
    if (sidebarXp) sidebarXp.textContent = s.xp;
    if (sidebarXpMax) sidebarXpMax.textContent = s.xpMax;

    const statMap = [
      { key: 'cognition', lvId: 'lvCog', pctId: 'pctCog' },
      { key: 'posture', lvId: 'lvPos', pctId: 'pctPos' },
      { key: 'cardio', lvId: 'lvCar', pctId: 'pctCar' },
      { key: 'core', lvId: 'lvCor', pctId: 'pctCor' },
      { key: 'mobility', lvId: 'lvMob', pctId: 'pctMob' },
    ];

    statMap.forEach(({ key, lvId, pctId }) => {
      const lv = s.stats[key];
      const xp = s.statXp[key] || 0;
      const needed = lv * 200;
      const pct = Math.min(95, (xp / needed) * 100);
      const lvEl = document.getElementById(lvId);
      const pctEl = document.getElementById(pctId);
      if (lvEl) lvEl.textContent = 'LV.' + lv;
      if (pctEl) pctEl.style.setProperty('--pct', pct + '%');
    });

    const tagMap = [
      { key: 'cognition', id: 'tagCog' },
      { key: 'posture', id: 'tagPos' },
      { key: 'core', id: 'tagCor' },
      { key: 'mobility', id: 'tagMob' },
    ];
    tagMap.forEach(({ key, id }) => {
      const el = document.getElementById(id);
      if (el) el.textContent = 'LV.' + s.stats[key];
    });

    const questBadge = document.getElementById('questBadge');
    if (questBadge) questBadge.textContent = s.quests.filter(q => !q.done).length;
    const habitBadge = document.getElementById('habitBadge');
    if (habitBadge) habitBadge.textContent = s.habits.length;

    this.renderActivity();
  },

  triggerLevelUpFx() {
    const fp = document.getElementById('figurePanel');
    const sw = document.getElementById('sweep');
    if (fp && sw) {
      fp.classList.add('leveling');
      sw.classList.remove('active');
      void sw.offsetWidth;
      sw.classList.add('active');
      setTimeout(() => fp.classList.remove('leveling'), 1200);
    }
  }
};

window.UI = UI;
