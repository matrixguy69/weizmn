/* ============================================
   LEVEL UP PROTOCOL — Reward Shop
   ============================================ */

const Shop = {
  ITEMS: [
    { id: 'xp_boost', icon: 'bolt', name: 'XP Boost', desc: '+100 bonus XP instantly', cost: 50,
      action: () => { state.addXp(100); UI.toast('bolt', '+100 bonus XP!'); } },
    { id: 'streak_freeze', icon: 'shield', name: 'Streak Freeze', desc: 'Protect one habit streak for a day', cost: 30,
      action: () => { UI.toast('shield', 'Streak freeze activated'); } },
    { id: 'gold_mine', icon: 'gem', name: 'Gold Mine', desc: 'Instant 25 gold', cost: 0,
      action: () => { state.addGold(25); UI.toast('gem', '+25 Gold'); } },
    { id: 'stat_boost', icon: 'medal', name: 'Stat Boost', desc: '+50 XP to a random stat', cost: 40,
      action: () => {
        const stats = ['cognition', 'posture', 'cardio', 'core', 'mobility'];
        state.addXp(50, stats[Math.floor(Math.random() * 5)]);
        UI.toast('medal', 'Stat boosted!');
      }},
    { id: 'rename', icon: 'scroll', name: 'Rename Token', desc: 'Change your subject name', cost: 20,
      action: () => {
        const n = prompt('New name:');
        if (n && n.trim()) {
          state.set('name', n.trim());
          UI.toast('scroll', 'Name updated');
        }
      }},
    { id: 'double_xp', icon: 'star', name: 'Double XP Session', desc: 'Next quest gives 2x XP', cost: 60,
      action: () => { UI.toast('star', 'Double XP activated for next quest'); } },
    { id: 'heal_potion', icon: 'potion', name: 'Heal Potion', desc: 'Restore focus energy', cost: 25,
      action: () => { UI.toast('potion', 'Focus restored'); } },
    { id: 'lucky_charm', icon: 'key', name: 'Lucky Charm', desc: 'Double gold from next 3 quests', cost: 80,
      action: () => { UI.toast('key', 'Lucky charm active for 3 quests'); } },
  ],

  buy(id) {
    const item = this.ITEMS.find(i => i.id === id);
    if (!item) return;

    if (state.get('gold') < item.cost) {
      UI.toast('warning', 'Not enough gold');
      return;
    }

    state.spendGold(item.cost);
    item.action();
    state.logActivity(item.icon, `Purchased: ${item.name}`, 0, -item.cost);
    this.render();
    UI.updateDashboard();
  },

  render() {
    const el = document.getElementById('shopList');
    const gold = state.get('gold');

    document.getElementById('shopGold').textContent = gold + ' Gold';

    el.innerHTML = this.ITEMS.map(item => {
      const iconSvg = ICONS[item.icon] || ICONS.gem;
      return `
        <div class="shop-item arc-wrap">
          <div class="arc"></div>
          <div class="shop-icon">${iconSvg}</div>
          <div class="shop-info">
            <div class="shop-name">${item.name}</div>
            <div class="shop-desc">${item.desc}</div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;flex-shrink:0">
            <div class="shop-cost"><span class="coin"></span>${item.cost}</div>
            <button class="btn sm" onclick="Shop.buy('${item.id}')" ${gold < item.cost ? 'disabled' : ''}>Buy</button>
          </div>
        </div>`;
    }).join('');
  }
};

window.Shop = Shop;
