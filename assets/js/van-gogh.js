/**
 * ============================================================================
 * Vincent van Gogh "The Starry Night" - Authentic Masterpiece Live Canvas Engine
 * ============================================================================
 * Features:
 * - Direct integration with the authentic original "The Starry Night" painting
 * - Living pulsating celestial bodies:
 *   * Radiant Golden Crescent Moon / Sun with warm cadmium & amber halos
 *   * Sparkling Morning Star (Venus) with concentric diamond sparkle
 *   * Pulsating constellation stars with breathing starlight rings
 * - Interactive 3D gallery raking light that follows the cursor across the canvas
 * - Mouse-driven celestial painter sparks & stardust trail
 * - Parallax depth movement on mouse hover
 */

(function () {
  'use strict';

  class VanGoghMasterpieceSky {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d', { alpha: true });
      this.container = this.canvas.parentElement;
      this.paintingImg = this.container.querySelector('.starry-night-painting-img');

      this.width = 0;
      this.height = 0;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.config = {
        enabled: true,
        starGlow: 1.25,
        pulseSpeed: 1.0,
        interactiveSparks: true,
        galleryLight: true
      };

      this.time = 0;
      this.sparks = [];
      this.mouse = {
        x: -1000,
        y: -1000,
        smoothX: -1000,
        smoothY: -1000,
        vx: 0,
        vy: 0,
        prevX: -1000,
        prevY: -1000,
        isHovering: false
      };

      this.isVisible = true;

      // Positions aligned with Van Gogh's actual Starry Night celestial bodies
      this.stars = [];

      this.init();
    }

    init() {
      this.resize();
      this.setupStars();
      this.bindEvents();
      this.injectControls();
      this.animate();
    }

    resize() {
      const rect = this.container.getBoundingClientRect();
      this.width = Math.max(rect.width, window.innerWidth);
      this.height = Math.max(rect.height, this.container.offsetHeight || window.innerHeight);

      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;

      this.ctx.scale(this.dpr, this.dpr);

      this.setupStars();
    }

    setupStars() {
      // Coords aligned with the actual Starry Night masterpiece composition
      this.stars = [
        // 1. The Radiant Golden Crescent Moon / Sun (Upper Right)
        {
          type: 'moon',
          xRatio: 0.81,
          yRatio: 0.22,
          radius: 52,
          rings: 5,
          colorInner: '#fef08a',
          colorMid: '#facc15',
          colorOuter: '#f59e0b',
          speed: 0.024
        },
        // 2. Venus (The Bright Morning Star - Large luminous star beside the cypress)
        {
          type: 'venus',
          xRatio: 0.34,
          yRatio: 0.44,
          radius: 26,
          rings: 4,
          colorInner: '#ffffff',
          colorMid: '#bae6fd',
          colorOuter: '#fde047',
          speed: 0.032
        },
        // 3. Central Swirling Constellation Stars
        {
          type: 'star',
          xRatio: 0.48,
          yRatio: 0.23,
          radius: 19,
          rings: 3,
          colorInner: '#ffffff',
          colorMid: '#fde047',
          colorOuter: '#f59e0b',
          speed: 0.028
        },
        {
          type: 'star',
          xRatio: 0.62,
          yRatio: 0.35,
          radius: 17,
          rings: 3,
          colorInner: '#fef9c3',
          colorMid: '#f59e0b',
          colorOuter: '#38bdf8',
          speed: 0.022
        },
        {
          type: 'star',
          xRatio: 0.17,
          yRatio: 0.20,
          radius: 18,
          rings: 3,
          colorInner: '#fef08a',
          colorMid: '#facc15',
          colorOuter: '#38bdf8',
          speed: 0.027
        },
        {
          type: 'star',
          xRatio: 0.92,
          yRatio: 0.46,
          radius: 15,
          rings: 2,
          colorInner: '#ffffff',
          colorMid: '#bae6fd',
          colorOuter: '#facc15',
          speed: 0.035
        },
        {
          type: 'star',
          xRatio: 0.08,
          yRatio: 0.48,
          radius: 14,
          rings: 2,
          colorInner: '#fef08a',
          colorMid: '#38bdf8',
          colorOuter: '#0284c7',
          speed: 0.026
        }
      ];
    }

    drawLivingCelestials() {
      const ctx = this.ctx;
      const t = this.time;
      const glowScale = this.config.starGlow;

      this.stars.forEach(s => {
        const sx = s.xRatio * this.width;
        const sy = s.yRatio * this.height;

        const pulse = 1.0 + Math.sin(t * s.speed * 60) * 0.12 * glowScale;
        const r = s.radius * pulse;

        ctx.save();
        ctx.translate(sx, sy);

        if (s.type === 'moon') {
          // ==========================================
          // The Living Golden Sun / Crescent Moon Aura
          // ==========================================
          // 1. Warm breathing radiance bloom
          const bloom = ctx.createRadialGradient(0, 0, 10, 0, 0, r * 3.4);
          bloom.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
          bloom.addColorStop(0.35, 'rgba(245, 158, 11, 0.22)');
          bloom.addColorStop(0.70, 'rgba(56, 189, 248, 0.08)');
          bloom.addColorStop(1, 'rgba(5, 7, 13, 0)');
          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(0, 0, r * 3.4, 0, Math.PI * 2);
          ctx.fill();

          // 2. Concentric animated Van Gogh impasto halos
          for (let i = 1; i <= s.rings; i++) {
            const ringR = r * (0.8 + i * 0.38);
            const rot = t * (i % 2 === 0 ? 0.003 : -0.003);
            const strokeCount = 10 + i * 6;
            const strokeW = 3.2 - i * 0.3;

            ctx.lineWidth = strokeW;
            ctx.lineCap = 'round';

            for (let k = 0; k < strokeCount; k++) {
              const theta = (k / strokeCount) * Math.PI * 2 + rot;
              const len = (Math.PI * 2 / strokeCount) * 0.62;

              const strokeColor = i <= 2
                ? (k % 2 === 0 ? 'rgba(254, 240, 138, 0.75)' : 'rgba(250, 204, 21, 0.65)')
                : (k % 3 === 0 ? 'rgba(245, 158, 11, 0.55)' : 'rgba(56, 189, 248, 0.40)');

              ctx.strokeStyle = strokeColor;
              ctx.beginPath();
              ctx.arc(0, 0, ringR, theta, theta + len);
              ctx.stroke();

              // Specular light crest on brushstroke
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.arc(0, 0, ringR - 0.8, theta + 0.04, theta + len * 0.65);
              ctx.stroke();
            }
          }

          // 3. Central Luminous Golden Crescent
          ctx.fillStyle = 'rgba(254, 240, 138, 0.9)';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(10, 25, 47, 0.85)';
          ctx.beginPath();
          ctx.arc(-r * 0.28, -r * 0.16, r * 0.65, 0, Math.PI * 2);
          ctx.fill();

          // Bright sparkling core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.12, r * 0.08, r * 0.22, 0, Math.PI * 2);
          ctx.fill();

        } else {
          // ==========================================
          // Living Van Gogh Stars with Halos
          // ==========================================
          // 1. Soft star glow
          const sGlow = ctx.createRadialGradient(0, 0, 2, 0, 0, r * 2.8);
          sGlow.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
          sGlow.addColorStop(0.35, 'rgba(254, 240, 138, 0.35)');
          sGlow.addColorStop(0.70, 'rgba(56, 189, 248, 0.12)');
          sGlow.addColorStop(1, 'rgba(5, 7, 13, 0)');
          ctx.fillStyle = sGlow;
          ctx.beginPath();
          ctx.arc(0, 0, r * 2.8, 0, Math.PI * 2);
          ctx.fill();

          // 2. Concentric dashed halos
          for (let i = 1; i <= s.rings; i++) {
            const ringR = r * (0.6 + i * 0.42);
            const rot = t * (i % 2 === 0 ? 0.005 : -0.004);
            const strokeCount = 6 + i * 4;

            ctx.lineWidth = 2.4;
            ctx.lineCap = 'round';

            for (let k = 0; k < strokeCount; k++) {
              const theta = (k / strokeCount) * Math.PI * 2 + rot;
              const len = (Math.PI * 2 / strokeCount) * 0.55;

              ctx.strokeStyle = i === 1
                ? 'rgba(254, 240, 138, 0.75)'
                : (k % 2 === 0 ? 'rgba(56, 189, 248, 0.55)' : 'rgba(250, 204, 21, 0.5)');

              ctx.beginPath();
              ctx.arc(0, 0, ringR, theta, theta + len);
              ctx.stroke();
            }
          }

          // 3. Bright sparkling core & cross
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.32, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 1.4;
          const crossLen = r * 0.95;
          ctx.beginPath();
          ctx.moveTo(-crossLen, 0);
          ctx.lineTo(crossLen, 0);
          ctx.moveTo(0, -crossLen);
          ctx.lineTo(0, crossLen);
          ctx.stroke();
        }

        ctx.restore();
      });
    }

    drawInteractiveGalleryLight() {
      // Dynamic raking light following the mouse cursor across the canvas
      if (!this.config.galleryLight || !this.mouse.isHovering) return;

      const ctx = this.ctx;
      const x = this.mouse.smoothX;
      const y = this.mouse.smoothY;

      ctx.save();
      const lightGrad = ctx.createRadialGradient(x, y, 10, x, y, 320);
      lightGrad.addColorStop(0, 'rgba(254, 240, 138, 0.18)');
      lightGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.08)');
      lightGrad.addColorStop(1, 'rgba(5, 7, 13, 0)');

      ctx.fillStyle = lightGrad;
      ctx.beginPath();
      ctx.arc(x, y, 320, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawSparks() {
      if (this.sparks.length === 0) return;

      const ctx = this.ctx;
      ctx.save();

      for (let i = this.sparks.length - 1; i >= 0; i--) {
        const p = this.sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.022;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size < 0.5) {
          this.sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.size > 2.0) {
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + (p.alpha * 0.8) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 1.5, p.y);
          ctx.lineTo(p.x + p.size * 1.5, p.y);
          ctx.moveTo(p.x, p.y - p.size * 1.5);
          ctx.lineTo(p.x, p.y + p.size * 1.5);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    addSparks(x, y, count = 3) {
      const colors = ['#fde047', '#fef08a', '#38bdf8', '#ffffff', '#f59e0b'];
      for (let i = 0; i < count; i++) {
        this.sparks.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 2.5 + this.mouse.vx * 0.2,
          vy: (Math.random() - 0.5) * 2.5 + this.mouse.vy * 0.2,
          size: 2.2 + Math.random() * 3.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.95
        });
      }
    }

    render() {
      if (!this.isVisible || !this.config.enabled) return;

      this.time += 0.016 * this.config.pulseSpeed;

      // Mouse smooth interpolation
      this.mouse.smoothX += (this.mouse.x - this.mouse.smoothX) * 0.12;
      this.mouse.smoothY += (this.mouse.y - this.mouse.smoothY) * 0.12;

      this.ctx.clearRect(0, 0, this.width, this.height);

      // 1. Draw Living Celestials (Sun/Moon & Stars pulsating over the painting)
      this.drawLivingCelestials();

      // 2. Draw Interactive Gallery Light
      this.drawInteractiveGalleryLight();

      // 3. Draw Celestial Sparks
      this.drawSparks();
    }

    animate() {
      this.render();
      requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => this.resize(), 150);
      });

      const handleMouseMove = (clientX, clientY) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        this.mouse.vx = x - this.mouse.prevX;
        this.mouse.vy = y - this.mouse.prevY;
        this.mouse.prevX = this.mouse.x;
        this.mouse.prevY = this.mouse.y;
        this.mouse.x = x;
        this.mouse.y = y;
        this.mouse.isHovering = true;

        // Subtle 3D parallax on the authentic masterpiece painting
        if (this.paintingImg) {
          const normX = (x / rect.width - 0.5) * 16;
          const normY = (y / rect.height - 0.5) * 12;
          this.paintingImg.style.transform = `scale(1.05) translate(${normX}px, ${normY}px)`;
        }

        if (this.config.interactiveSparks && (Math.abs(this.mouse.vx) > 2 || Math.abs(this.mouse.vy) > 2)) {
          this.addSparks(x, y, 2);
        }
      };

      this.container.addEventListener('mousemove', (e) => {
        handleMouseMove(e.clientX, e.clientY);
      });

      this.container.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          handleMouseMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      this.container.addEventListener('mouseleave', () => {
        this.mouse.isHovering = false;
        this.mouse.x = -1000;
        this.mouse.y = -1000;
        if (this.paintingImg) {
          this.paintingImg.style.transform = 'scale(1.04) translate(0px, 0px)';
        }
      });

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isVisible = entry.isIntersecting;
          });
        }, { threshold: 0.05 });
        observer.observe(this.canvas);
      }
    }

    injectControls() {
      if (document.getElementById('vanGoghControlPill')) return;

      const pill = document.createElement('div');
      pill.id = 'vanGoghControlPill';
      pill.className = 'van-gogh-pill';
      pill.innerHTML = `
        <div class="van-gogh-pill-inner">
          <button id="vgToggleMenu" class="vg-pill-btn" title="تنظیمات شاهکار شب پر ستاره ونگوگ">
            <span class="vg-palette-icon">🎨</span>
            <span class="vg-pill-text">اثر اصلی شب پر ستاره (Starry Night)</span>
            <span class="vg-live-dot"></span>
          </button>

          <div id="vgMenuDropdown" class="vg-dropdown hidden">
            <div class="vg-dropdown-header">
              <span class="font-bold text-amber-300">Vincent van Gogh · The Starry Night (1889)</span>
              <span class="text-[10px] text-cyan-300 font-mono">Masterpiece & Living Celestials</span>
            </div>

            <div class="vg-control-row">
              <span>درخشش خورشید و ستاره‌ها:</span>
              <div class="vg-btn-group">
                <button data-glow="0.8" class="vg-btn">ملایم</button>
                <button data-glow="1.3" class="vg-btn active">تابان</button>
                <button data-glow="2.0" class="vg-btn">فوق‌العاده</button>
              </div>
            </div>

            <div class="vg-control-row">
              <span>تکسچر بوم کتان فیزیکی:</span>
              <button id="vgToggleTexture" class="vg-btn active">فعال و ملموس ✓</button>
            </div>

            <div class="vg-control-row">
              <span>نور گالری و جرقه ستاره‌ها:</span>
              <button id="vgToggleSparks" class="vg-btn active">فعال ✓</button>
            </div>
          </div>
        </div>
      `;

      this.container.appendChild(pill);

      const toggleMenuBtn = pill.querySelector('#vgToggleMenu');
      const dropdown = pill.querySelector('#vgMenuDropdown');
      const toggleTextureBtn = pill.querySelector('#vgToggleTexture');
      const toggleSparksBtn = pill.querySelector('#vgToggleSparks');
      const glowBtns = pill.querySelectorAll('[data-glow]');

      toggleMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!pill.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });

      glowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          glowBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.config.starGlow = parseFloat(btn.dataset.glow);
        });
      });

      toggleTextureBtn.addEventListener('click', () => {
        const tactile = document.querySelector('.starry-night-tactile-overlay');
        const bodyTexture = document.querySelector('.van-gogh-canvas-texture');
        const isHidden = tactile ? tactile.classList.toggle('hidden') : false;
        if (bodyTexture) bodyTexture.classList.toggle('hidden', isHidden);
        toggleTextureBtn.classList.toggle('active', !isHidden);
        toggleTextureBtn.textContent = !isHidden ? 'فعال و ملموس ✓' : 'غیرفعال';
      });

      toggleSparksBtn.addEventListener('click', () => {
        this.config.interactiveSparks = !this.config.interactiveSparks;
        this.config.galleryLight = !this.config.galleryLight;
        toggleSparksBtn.classList.toggle('active', this.config.interactiveSparks);
        toggleSparksBtn.textContent = this.config.interactiveSparks ? 'فعال ✓' : 'غیرفعال';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.vanGoghMasterpiece = new VanGoghMasterpieceSky('vanGoghCanvas');
  });

})();
