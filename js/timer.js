/* ============================================
   LEVEL UP PROTOCOL — Focus Timer
   ============================================ */

const Timer = {
  interval: null,
  running: false,
  seconds: 25 * 60,
  total: 25 * 60,

  init() {
    this.updateDisplay();
    this.updateCircle();
  },

  setMode(mins, btn) {
    if (this.running) return;
    document.querySelectorAll('.timer-mode').forEach(m => m.classList.remove('active'));
    btn.classList.add('active');
    this.seconds = mins * 60;
    this.total = mins * 60;
    this.updateDisplay();
    this.updateCircle();
  },

  toggle() {
    if (this.running) {
      this.pause();
    } else {
      this.start();
    }
  },

  start() {
    this.running = true;
    document.getElementById('timerStartBtn').textContent = 'Pause';
    document.getElementById('timerLabel').textContent = 'Focusing...';

    this.interval = setInterval(() => {
      this.seconds--;
      this.updateDisplay();
      this.updateCircle();
      if (this.seconds <= 0) this.complete();
    }, 1000);
  },

  pause() {
    clearInterval(this.interval);
    this.running = false;
    document.getElementById('timerStartBtn').textContent = 'Resume';
    document.getElementById('timerLabel').textContent = 'Paused';
  },

  reset() {
    clearInterval(this.interval);
    this.running = false;
    this.seconds = this.total;
    document.getElementById('timerStartBtn').textContent = 'Start';
    document.getElementById('timerLabel').textContent = 'Ready to focus';
    document.getElementById('timerXpReward').classList.remove('show');
    this.updateDisplay();
    this.updateCircle();
  },

  complete() {
    clearInterval(this.interval);
    this.running = false;

    const xp = Math.floor(this.total / 60) * 10;
    const gold = Math.floor(xp / 4);
    const stats = ['cognition', 'cardio', 'core'];
    const stat = stats[Math.floor(Math.random() * stats.length)];
    const leveledUp = state.addXp(xp, stat);
    state.addGold(gold);
    state.state.timerSessions++;
    state.save();

    state.logActivity('timer', `Focus session (${this.total / 60}m)`, xp, gold);

    document.getElementById('timerLabel').textContent = 'Session complete!';
    document.getElementById('timerXpReward').textContent = `+${xp} XP +${gold} Gold earned!`;
    document.getElementById('timerXpReward').classList.add('show');

    UI.toast('bolt', `Focus done: +${xp} XP +${gold} Gold`);

    if (leveledUp) {
      setTimeout(() => {
        UI.triggerLevelUpFx();
        UI.openModal('Level Up!', `// NOW LEVEL ${state.get('level')}`, `
          <div style="font-family:var(--mono);font-size:12px;color:var(--ink-dim)">
            Focus session completed. XP earned: ${xp}
          </div>
        `);
      }, 600);
    }

    Achievements.check();
    UI.updateDashboard();

    setTimeout(() => {
      this.seconds = this.total;
      this.updateDisplay();
      this.updateCircle();
      document.getElementById('timerStartBtn').textContent = 'Start';
      document.getElementById('timerLabel').textContent = 'Ready to focus';
    }, 2500);
  },

  updateDisplay() {
    const m = Math.floor(this.seconds / 60);
    const s = this.seconds % 60;
    document.getElementById('timerDisplay').textContent =
      `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  },

  updateCircle() {
    const circle = document.getElementById('timerCircle');
    if (!circle) return;
    const circumference = 2 * Math.PI * 90;
    const progress = this.seconds / this.total;
    circle.style.strokeDashoffset = circumference * (1 - progress);
  }
};

window.Timer = Timer;
