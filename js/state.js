/* ============================================
   LEVEL UP PROTOCOL — State Manager
   ============================================ */

const STORAGE_KEY = 'levelup_state';

const DEFAULT_STATE = {
  level: 1,
  xp: 0,
  xpMax: 500,
  gold: 0,
  streak: 0,
  lastActive: null,
  stats: { cognition: 1, posture: 1, cardio: 1, core: 1, mobility: 1 },
  statXp: { cognition: 0, posture: 0, cardio: 0, core: 0, mobility: 0 },
  quests: [],
  habits: [],
  achievements: [],
  xpToday: 0,
  questsDoneToday: 0,
  name: 'Agent_001',
  timerSessions: 0,
  activity: []
};

class StateManager {
  constructor() {
    this.state = this.load();
    this.listeners = [];
  }

  load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load state:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
    this.notify();
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => { this.listeners = this.listeners.filter(l => l !== fn); };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  get(key) {
    return key ? this.state[key] : this.state;
  }

  set(key, value) {
    this.state[key] = value;
    this.save();
  }

  update(fn) {
    fn(this.state);
    this.save();
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
  }

  // ---- XP & Leveling ----
  xpForLevel(level) {
    return 300 + (level * 200);
  }

  addXp(amount, stat) {
    this.state.xp += amount;
    this.state.xpToday += amount;

    if (stat && this.state.stats[stat] !== undefined) {
      this.state.statXp[stat] = (this.state.statXp[stat] || 0) + amount;
      this.checkStatLevel(stat);
    }

    let leveledUp = false;
    while (this.state.xp >= this.state.xpMax) {
      this.state.xp -= this.state.xpMax;
      this.state.level++;
      this.state.xpMax = this.xpForLevel(this.state.level);
      leveledUp = true;
    }

    this.save();
    return leveledUp;
  }

  checkStatLevel(stat) {
    const xpNeeded = this.state.stats[stat] * 200;
    if (this.state.statXp[stat] >= xpNeeded) {
      this.state.stats[stat]++;
      this.state.statXp[stat] -= xpNeeded;
      return true;
    }
    return false;
  }

  addGold(amount) {
    this.state.gold += amount;
    this.save();
  }

  spendGold(amount) {
    if (this.state.gold >= amount) {
      this.state.gold -= amount;
      this.save();
      return true;
    }
    return false;
  }

  // ---- Streak ----
  checkStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (this.state.lastActive === today) return;

    if (this.state.lastActive === yesterday) {
      this.state.streak++;
    } else if (this.state.lastActive !== today) {
      this.state.streak = 1;
    }

    this.state.lastActive = today;
    this.save();
  }

  // ---- Activity Log ----
  logActivity(icon, text, xp, gold) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.state.activity.unshift({ time, icon, text, xp, gold, ts: Date.now() });
    if (this.state.activity.length > 50) this.state.activity = this.state.activity.slice(0, 50);
    this.save();
  }
}

window.state = new StateManager();
