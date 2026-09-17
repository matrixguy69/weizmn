/* ============================================
   LEVEL UP PROTOCOL — Achievements
   ============================================ */

const Achievements = {
  BADGES: [
    { id: 'first_quest', icon: 'star', name: 'First Steps', desc: 'Complete your first quest',
      check: (s) => s.quests.some(q => q.done) },
    { id: 'five_quests', icon: 'star', name: 'Quest Runner', desc: 'Complete 5 quests',
      check: (s) => s.quests.filter(q => q.done).length >= 5 },
    { id: 'ten_quests', icon: 'star', name: 'Quest Master', desc: 'Complete 10 quests',
      check: (s) => s.quests.filter(q => q.done).length >= 10 },
    { id: 'streak_3', icon: 'fire', name: 'On Fire', desc: '3-day streak on any habit',
      check: (s) => s.habits.some(h => h.streak >= 3) },
    { id: 'streak_7', icon: 'fire', name: 'Week Warrior', desc: '7-day streak on any habit',
      check: (s) => s.habits.some(h => h.streak >= 7) },
    { id: 'streak_14', icon: 'fire', name: 'Unstoppable', desc: '14-day streak on any habit',
      check: (s) => s.habits.some(h => h.streak >= 14) },
    { id: 'level_5', icon: 'bolt', name: 'Getting Strong', desc: 'Reach level 5',
      check: (s) => s.level >= 5 },
    { id: 'level_10', icon: 'bolt', name: 'Dedicated', desc: 'Reach level 10',
      check: (s) => s.level >= 10 },
    { id: 'level_25', icon: 'bolt', name: 'Elite', desc: 'Reach level 25',
      check: (s) => s.level >= 25 },
    { id: 'gold_100', icon: 'gem', name: 'Gold Hoarder', desc: 'Earn 100 gold',
      check: (s) => s.gold >= 100 },
    { id: 'gold_500', icon: 'gem', name: 'Wealthy', desc: 'Earn 500 gold',
      check: (s) => s.gold >= 500 },
    { id: 'timer_5', icon: 'timer', name: 'Focused', desc: 'Complete 5 focus sessions',
      check: (s) => s.timerSessions >= 5 },
    { id: 'timer_20', icon: 'timer', name: 'Deep Worker', desc: 'Complete 20 focus sessions',
      check: (s) => s.timerSessions >= 20 },
    { id: 'habits_5', icon: 'habit', name: 'Routine Builder', desc: 'Have 5 active habits',
      check: (s) => s.habits.length >= 5 },
    { id: 'stat_3', icon: 'medal', name: 'Specialist', desc: 'Get any stat to level 3',
      check: (s) => Object.values(s.stats).some(v => v >= 3) },
    { id: 'stat_5', icon: 'medal', name: 'Master', desc: 'Get any stat to level 5',
      check: (s) => Object.values(s.stats).some(v => v >= 5) },
    { id: 'all_stats_2', icon: 'shield', name: 'Balanced', desc: 'All stats at level 2+',
      check: (s) => Object.values(s.stats).every(v => v >= 2) },
    { id: 'all_stats_5', icon: 'shield', name: 'Well-Rounded', desc: 'All stats at level 5+',
      check: (s) => Object.values(s.stats).every(v => v >= 5) },
  ],

  check() {
    const s = state.get();
    let newBadge = false;

    this.BADGES.forEach(b => {
      if (!s.achievements.includes(b.id) && b.check(s)) {
        s.achievements.push(b.id);
        newBadge = true;
        UI.toast(b.icon, `Achievement: ${b.name}`);
        state.logActivity(b.icon, `Unlocked: ${b.name}`, 0, 0);
      }
    });

    if (newBadge) state.save();
    this.render();
  },

  render() {
    const el = document.getElementById('badgeGrid');
    const s = state.get();
    const earned = s.achievements || [];

    el.innerHTML = this.BADGES.map(b => {
      const isEarned = earned.includes(b.id);
      const iconSvg = ICONS[b.icon] || ICONS.star;
      return `
        <div class="badge ${isEarned ? 'earned' : 'locked'} arc-wrap">
          <div class="arc"></div>
          <span class="icon">${iconSvg}</span>
          <div class="name">${b.name}</div>
          <div class="desc">${b.desc}</div>
        </div>`;
    }).join('');

    document.getElementById('badgeCount').textContent =
      `${earned.length} / ${this.BADGES.length}`;
  }
};

window.Achievements = Achievements;
