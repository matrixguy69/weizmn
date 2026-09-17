/* ============================================
   LEVEL UP PROTOCOL — Quest System
   ============================================ */

const Quests = {
  STAT_NAMES: ['cognition', 'posture', 'cardio', 'core', 'mobility'],
  XP_MAP: { easy: 15, medium: 30, hard: 60 },
  GOLD_MAP: { easy: 3, medium: 6, hard: 12 },

  add() {
    const input = document.getElementById('questInput');
    const diff = document.getElementById('questDiff').value;
    const title = input.value.trim();
    if (!title) return;

    state.update(s => {
      s.quests.push({
        id: Date.now(),
        title,
        diff,
        xp: this.XP_MAP[diff],
        gold: this.GOLD_MAP[diff],
        done: false,
        createdAt: Date.now()
      });
    });

    input.value = '';
    this.render();
    UI.updateDashboard();
    UI.toast('star', 'Quest added');
  },

  toggle(id) {
    const s = state.get();
    const quest = s.quests.find(q => q.id === id);
    if (!quest) return;

    quest.done = !quest.done;

    if (quest.done) {
      s.questsDoneToday++;
      const stat = this.STAT_NAMES[Math.floor(Math.random() * this.STAT_NAMES.length)];
      const leveledUp = state.addXp(quest.xp, stat);
      state.addGold(quest.gold);
      state.logActivity('star', `Completed: ${quest.title}`, quest.xp, quest.gold);

      UI.toast('star', `+${quest.xp} XP +${quest.gold} Gold`);

      if (leveledUp) {
        setTimeout(() => {
          UI.triggerLevelUpFx();
          UI.openModal('Level Up!', `// NOW LEVEL ${state.get('level')}`, `
            <div style="font-family:var(--mono);font-size:12px;color:var(--ink-dim)">
              New level reached. XP curve: ${state.xpForLevel(state.get('level'))}
            </div>
          `);
        }, 400);
      }

      Achievements.check();
    } else {
      s.questsDoneToday = Math.max(0, s.questsDoneToday - 1);
      state.save();
    }

    this.render();
    UI.updateDashboard();
  },

  remove(id) {
    state.update(s => {
      s.quests = s.quests.filter(q => q.id !== id);
    });
    this.render();
    UI.updateDashboard();
  },

  resetDaily() {
    state.update(s => {
      s.quests.forEach(q => { q.done = false; });
      s.questsDoneToday = 0;
      s.xpToday = 0;
    });
    this.render();
    UI.updateDashboard();
    UI.toast('info', 'Daily quests reset');
  },

  render() {
    const el = document.getElementById('questList');
    const quests = state.get('quests');

    if (!quests.length) {
      el.innerHTML = `
        <div style="padding:48px 20px;text-align:center">
          <div style="margin-bottom:12px;opacity:0.2">${ICONS.quest}</div>
          <div style="font-family:var(--mono);font-size:12px;color:var(--ink-dim)">No quests yet. Add one above to start earning XP.</div>
        </div>`;
      return;
    }

    el.innerHTML = quests.map(q => `
      <div class="quest-item ${q.done ? 'done' : ''}">
        <div class="quest-check ${q.done ? 'checked' : ''}" onclick="Quests.toggle(${q.id})">
          ${q.done ? ICONS.check : ''}
        </div>
        <div class="quest-info">
          <div class="quest-title">${UI.esc(q.title)}</div>
          <div class="quest-meta">
            <span class="quest-diff ${q.diff}"></span>
            ${q.diff.toUpperCase()}
          </div>
        </div>
        <div class="quest-xp">+${q.xp} XP</div>
        <div class="quest-gold">+${q.gold}g</div>
        <button class="btn sm icon-btn" onclick="Quests.remove(${q.id})" title="Delete">${ICONS.delete}</button>
      </div>
    `).join('');
  }
};

window.Quests = Quests;
