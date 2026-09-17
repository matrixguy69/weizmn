/* ============================================
   LEVEL UP PROTOCOL — Scroll Reveals
   ============================================ */

const Reveals = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
};

window.Reveals = Reveals;

function exportData() {
  const data = JSON.stringify(state.get(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'levelup-data-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  UI.toast('&#128229;', 'Data exported');
}

window.exportData = exportData;
