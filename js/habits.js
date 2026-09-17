/* ============================================
   LEVEL UP PROTOCOL — Habit Tracker
   ============================================ */

const Habits = {
  ICON_MAP: {
    cognition: 'brain',
    posture: 'posture',
    cardio: 'run',
    core: 'core',
    mobility: 'stretch'
  },

  add() {
    const input = document.getElementById('habitInput');
    const cat = document.getElementById('habitCat').value;
    const name = input.value.trim();
    if (!name) return;

    state.update(s => {
      s.habits.push({
        id: Date.now(),
        name,
        cat,
        streak: 0,
        bestStreak: 0,
        lastDone: null,
        count: 0,
        createdAt: Date.now()
      });
    });

    input.value = '';
    this.render();
    UI.updateDashboard();
    UI.toast('habit', 'Habit added');
  },

  doPositive(id) {
    const s = state.get();
    const habit = s.habits.find(h => h.id === id);
    if (!habit) return;

    const today = new Date().toDateString();
    if (habit.lastDone === today) {
      UI.toast('info', 'Already completed today');
      return;
    }

    habit.count++;
    habit.streak++;
    if (habit.streak > habit.bestStreak) habit.bestStreak = habit.streak;
    habit.lastDone = today;

    const xp = 10 + Math.min(habit.streak * 2, 30);
    const leveledUp = state.addXp(xp, habit.cat);
    state.addGold(2 + Math.floor(habit.streak / 3));
    state.logActivity('fire', `${habit.name} (streak: ${habit.streak}D)`, xp, 2);

    UI.toast('fire', `+${xp} XP | Streak: ${habit.streak}D`);

    if (leveledUp) {
      setTimeout(() => {
        UI.triggerLevelUpFx();
        UI.openModal('Level Up!', `// NOW LEVEL ${state.get('level')}`, `
          <div style="font-family:var(--mono);font-size:12px;color:var(--ink-dim)">
            New level reached. Keep building those habits.
          </div>
        `);
      }, 400);
    }

    Achievements.check();
    this.render();
    UI.updateDashboard();
  },

  doNegative(id) {
    const s = state.get();
    const habit = s.habits.find(h => h.id === id);
    if (!habit) return;

    habit.streak = Math.max(0, habit.streak - 1);
    state.logActivity('warning', `${habit.name} streak reduced`, 0, 0);

    UI.toast('warning', 'Streak reduced');
    state.save();
    this.render();
    UI.updateDashboard();
  },

  remove(id) {
    state.update(s => {
      s.habits = s.habits.filter(h => h.id !== id);
    });
    this.render();
    UI.updateDashboard();
  },

  render() {
    const el = document.getElementById('habitList');
    const habits = state.get('habits');

    if (!habits.length) {
      el.innerHTML = `
        <div style="padding:48px 20px;text-align:center">
          <div style="margin-bottom:12px;opacity:0.2">${ICONS.habit}</div>
          <div style="font-family:var(--mono);font-size:12px;color:var(--ink-dim)">No habits yet. Add one above to start building streaks.</div>
        </div>`;
      return;
    }

    el.innerHTML = habits.map(h => {
      const today = new Date().toDateString();
      const doneToday = h.lastDone === today;
      const iconKey = this.ICON_MAP[h.cat] || 'habit';
      return `
        <div class="habit-item" style="${doneToday ? 'opacity:0.5' : ''}">
          <div class="habit-icon">${ICONS[iconKey]}</div>
          <div class="habit-info">
            <div class="habit-name">${UI.esc(h.name)}</div>
            <div class="habit-streak">
              ${h.streak > 0 ? `<span class="streak-fire">${ICONS.fire}</span> ${h.streak}D streak` : 'No streak'}
              <span class="best">Best: ${h.bestStreak}D</span>
              ${doneToday ? `<span style="color:var(--xp-green)">${ICONS.check} Done</span>` : ''}
            </div>
          </div>
          <div class="habit-btns">
            <button class="habit-btn" onclick="Habits.doPositive(${h.id})" title="Complete" ${doneToday ? 'disabled' : ''}>${ICONS.plus}</button>
            <button class="habit-btn neg" onclick="Habits.doNegative(${h.id})" title="Miss">${ICONS.minus}</button>
          </div>
          <button class="btn sm icon-btn" onclick="Habits.remove(${h.id})" title="Delete">${ICONS.delete}</button>
        </div>`;
    }).join('');
  }
};

window.Habits = Habits;
