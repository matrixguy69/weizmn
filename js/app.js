/* ============================================
   LEVEL UP PROTOCOL — App Init
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Populate icons from data-icon attributes
  document.querySelectorAll('[data-icon]').forEach(el => {
    const iconName = el.getAttribute('data-icon');
    if (ICONS[iconName]) el.innerHTML = ICONS[iconName];
  });

  // Init state
  state.checkStreak();

  // Init modules
  Particles.init();
  Reveals.init();
  Timer.init();

  // Initial renders
  Quests.render();
  Habits.render();
  Achievements.render();
  Shop.render();
  UI.updateDashboard();

  // State listener for live updates
  state.subscribe(() => {
    UI.updateDashboard();
  });

  // Nav click handlers
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      UI.switchView(item.dataset.view);
    });
  });

  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      UI.switchView(item.dataset.view);
    });
  });

  // Quest input enter key
  const questInput = document.getElementById('questInput');
  if (questInput) {
    questInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') Quests.add();
    });
  }

  // Habit input enter key
  const habitInput = document.getElementById('habitInput');
  if (habitInput) {
    habitInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') Habits.add();
    });
  }

  // Modal close on overlay click
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) {
      UI.closeModal();
    }
  });

  // Settings stats
  const statsEl = document.getElementById('settingsStats');
  if (statsEl) {
    const s = state.get();
    statsEl.innerHTML = Object.entries(s.stats).map(([k, v]) =>
      `<div style="text-transform:capitalize">${k}: Level ${v} (${s.statXp[k] || 0} / ${v * 200} XP)</div>`
    ).join('');
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') UI.closeModal();
    // Ctrl+1-6 for view switching
    if (e.ctrlKey || e.metaKey) {
      const views = ['dashboard', 'quests', 'habits', 'timer', 'achievements', 'shop'];
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx < views.length) {
        e.preventDefault();
        UI.switchView(views[idx]);
      }
    }
  });
});
