/* ============================================
   LEVEL UP PROTOCOL — Particles
   ============================================ */

const Particles = {
  canvas: null,
  ctx: null,
  particles: [],
  count: 50,

  init() {
    this.canvas = document.getElementById('particles');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    for (let i = 0; i < this.count; i++) {
      this.particles.push(this.create());
    }
    this.animate();
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  create() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.2 + 0.04,
      life: Math.random() * 600 + 200,
      maxLife: 0
    };
  },

  reset(p) {
    p.x = Math.random() * this.canvas.width;
    p.y = Math.random() * this.canvas.height;
    p.size = Math.random() * 1.2 + 0.4;
    p.vx = (Math.random() - 0.5) * 0.2;
    p.vy = (Math.random() - 0.5) * 0.2;
    p.opacity = Math.random() * 0.2 + 0.04;
    p.life = Math.random() * 600 + 200;
    p.maxLife = p.life;
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      if (p.life <= 0 || p.x < -10 || p.x > this.canvas.width + 10 ||
          p.y < -10 || p.y > this.canvas.height + 10) {
        this.reset(p);
      }

      const fade = p.maxLife ? p.life / p.maxLife : 1;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(242,239,230,${p.opacity * fade})`;
      this.ctx.fill();
    });
    requestAnimationFrame(() => this.animate());
  }
};

window.Particles = Particles;
