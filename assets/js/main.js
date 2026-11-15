/**
 * Ehsan Lak Portfolio - Interactive Scripts
 * Fully interactive developer terminal experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypewriter();
  initScrollSpy();
  initThemeToggle();
  initMobileMenu();
  initTerminal();
  initContactForm();
});

/* ==========================================================================
   1. Interactive Neural Network Constellation Canvas
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = 1 - dist / maxDistance;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Dynamic Typewriter Effect for Hero
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  const phrases = [
    'سیستم‌های هدایت و ناوبری پرنده خودران (Autonomous UAV)',
    'مدل‌های زبانی بالینی و پردازش زبان طبیعی (Clinical BERT & NLP)',
    'طراحی دستیار هوشمند سازمانی و معماری‌های پیشرفته RAG',
    'مهندسی داده‌های کلان و شبیه‌سازی در دانشگاه صنعتی امیرکبیر',
    'کارشناسی و داوری تخصصی مقالات مجله بین‌المللی ISTAM'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before new phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Scroll Spy for Navigation Highlighting
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400', 'font-bold');
      }
    });
  });
}

/* ==========================================================================
   4. Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('ehsan-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ehsan-theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`تم به حالت ${newTheme === 'dark' ? 'تیره' : 'روشن'} تغییر کرد.`);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeToggleIcon');
  if (!icon) return;
  if (theme === 'light') {
    // Sun icon
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
  } else {
    // Moon icon
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
  }
}

/* ==========================================================================
   5. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   6. Copy to Clipboard & Toast Notifications
   ========================================================================== */
window.copyToClipboard = function(text, label = 'متن') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} در کلیپ‌بورد کپی شد ✓`);
  }).catch(() => {
    showToast(`کپی انجام نشد. لطفاً دستی کپی کنید.`);
  });
};

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   7. BibTeX Citation Modal
   ========================================================================== */
const bibtexEntry = `@article{lak2026asd,
  title={Detection of Autism Spectrum Disorder (ASD) Using Clinical BERT Language Model and Comparison with Classical Machine Learning Methods},
  author={Lak, Ehsan and Hosseini, Rahil},
  journal={International Journal of Intelligent Systems: Theory and Applications in Medical Science and Industries (ISTAM)},
  year={2026},
  doi={10.83303/ISTAM.2026.1253602},
  url={https://doi.org/10.83303/ISTAM.2026.1253602}
}`;

window.openBibtexModal = function() {
  const modal = document.getElementById('bibtexModal');
  const codeEl = document.getElementById('bibtexCode');
  if (!modal || !codeEl) return;
  codeEl.textContent = bibtexEntry;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeBibtexModal = function() {
  const modal = document.getElementById('bibtexModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
};

window.copyBibtex = function() {
  copyToClipboard(bibtexEntry, 'کد BibTeX ارجاع مقاله');
};

/* ==========================================================================
   8. Interactive Terminal Modal & Commands
   ========================================================================== */
function initTerminal() {
  const modal = document.getElementById('terminalModal');
  const openBtn = document.getElementById('terminalOpenBtn');
  const closeBtn = document.getElementById('terminalCloseBtn');
  const form = document.getElementById('terminalForm');
  const input = document.getElementById('terminalInput');
  const history = document.getElementById('terminalHistory');

  if (!modal) return;

  function toggleTerminal() {
    const isHidden = modal.classList.contains('hidden');
    if (isHidden) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (input) input.focus();
    } else {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  if (openBtn) openBtn.addEventListener('click', toggleTerminal);
  if (closeBtn) closeBtn.addEventListener('click', toggleTerminal);

  // Keyboard shortcut: Ctrl + K or `
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 'k') || e.key === '~') {
      e.preventDefault();
      toggleTerminal();
    }
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      toggleTerminal();
    }
  });

  const commands = {
    help: `دستورات در دسترس:
  whoami       - معرفی و هویت احسان لک
  skills       - مهارت‌های هوش مصنوعی و رباتیک
  projects     - پروژه‌های پرنده خودران، وزارت راه و RAG
  papers       - مقالات علمی، ژورنال ISTAM و DOI
  experience   - سوابق در دانشگاه صنعتی امیرکبیر و تدریس
  contact      - راه‌های ارتباطی و لینک‌ها
  clear        - پاک کردن صفحه ترمینال
  exit         - بستن پنجره ترمینال`,

    whoami: `احسان لک (Ehsan Lak)
---------------------------------------------
- متخصص و پژوهشگر هوش مصنوعی، رباتیک و یادگیری عمیق
- عضو تیم پژوهشی و مهندس داده دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران)
- کارشناس و داور علمی مجله بین‌المللی ISTAM
- توسعه‌دهنده سیستم‌های ناوبری خودمختار پهپاد (UAV)
- طراح دستیار هوشمند مبتنی بر RAG وزارت راه و شهرسازی
- پژوهشگر مدل‌های بالینی زبان (Clinical BERT)`,

    skills: `مهارت‌های تخصصی:
---------------------------------------------
[AI & Deep Learning]  : PyTorch, TensorFlow, Transformers, Clinical BERT, CNN, RNN
[NLP & LLMs]          : RAG Architectures, Hugging Face, Semantic Search, LangChain
[Autonomous & UAV]    : Computer Vision, OpenCV, Edge AI, Sensor Fusion, Drone Control
[Data Engineering]    : Pandas, NumPy, SQL, FastAPI, ETL Pipelines, Docker
[Academic Research]   : Journal Reviewing (ISTAM), LaTeX, Biostatistics, Data Analysis`,

    projects: `پروژه‌های شاخص:
---------------------------------------------
1. پرنده خودران (Autonomous UAV Navigation) [فعال / Active]
   - سامانه ناوبری مستقل و هوشمند پهپاد با بینایی ماشین و هوش مصنوعی لبه.
2. دستیار هوشمند وزارت راه و شهرسازی [تکمیل‌شده]
   - سامانه پاسخگویی سازمانی و تحلیل اسناد بر پایه مدل‌های زبان و معماری RAG.
3. مدل بالینی تشخیص طیف اوتیسم (ASD via Clinical BERT) [منتشر شده]
   - غربالگری هوشمند اوتیسم و انتشار در ژورنال بین‌المللی با نمایه DOI.
4. زیرساخت مهندسی داده دانشگاه صنعتی امیرکبیر [فعال]`,

    papers: `انتشارات علمی و نقش ژورنال:
---------------------------------------------
- مقاله ژورنال ISTAM (۲۰۲۶):
  عنوان: تشخیص اختلال طیفی اوتیسم (ASD) با مدل بالینی BERT
  شناسه DOI: 10.83303/ISTAM.2026.1253602
- کارشناس و داور علمی مجله بین‌المللی ISTAM (Sanad IAU)
- مقالات کنفرانس‌های بین‌المللی و ملی در سیویلیکا (کد پژوهشگر: 622818)
- مشاهده کامل در: https://civilica.com/p/622818/`,

    experience: `سوابق، افتخارات و موقعیت‌ها:
---------------------------------------------
• دانشگاه صنعتی امیرکبیر: عضو تیم پژوهشی و مهندس داده (۱۴۰۴-۱۴۰۵)
• مجله بین‌المللی ISTAM: کارشناس و داور علمی مقالات
• سامانه پرنده خودران: توسعه‌دهنده سیستم ناوبری هوشمند (۱۴۰۴-اکنون)
• وزارت راه و شهرسازی: توسعه‌دهنده دستیار هوشمند NLP/RAG
• دانشگاه علوم پزشکی لرستان: مدرس آموزش پایتون و یادگیری ماشین سلامت‌محور
• افتخارات: نفر اول مسابقات هوشمند استانی لرستان و دو دوره مقام دوم مسابقات ایده‌شو
• دانشگاه آزاد تهران شمال: کارشناسی ارشد هوش مصنوعی و رباتیکز (دستیار تخصصی UA)`,

    contact: `راه‌های ارتباط:
---------------------------------------------
- GitHub           : https://github.com/Ehsunpy
- LinkedIn         : https://ir.linkedin.com/in/ehsanlak
- Civilica         : https://civilica.com/p/622818/
- Journal          : https://sanad.iau.ir/journal/istam
- Email (Academic) : ehsan.lak@iau.ir
- Email (Direct)   : ehsanlak279@gmail.com`
  };

  if (form && input && history) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const cmd = input.value.trim().toLowerCase();
      input.value = '';

      if (!cmd) return;

      const cmdLine = document.createElement('div');
      cmdLine.className = 'flex items-center gap-2 text-cyan-400 font-mono text-sm mt-3';
      cmdLine.innerHTML = `<span class="text-emerald-400">visitor@ehsanlak:~$</span> <span>${cmd}</span>`;
      history.appendChild(cmdLine);

      if (cmd === 'clear') {
        history.innerHTML = '';
        return;
      }

      if (cmd === 'exit') {
        toggleTerminal();
        return;
      }

      const responseEl = document.createElement('pre');
      responseEl.className = 'text-slate-300 font-mono text-xs leading-relaxed mt-1 whitespace-pre-wrap';

      if (commands[cmd]) {
        responseEl.textContent = commands[cmd];
      } else {
        responseEl.textContent = `دستور ناشناخته: '${cmd}'. برای مشاهده لیست دستورات 'help' را وارد کنید.`;
      }

      history.appendChild(responseEl);
      history.scrollTop = history.scrollHeight;
    });
  }
}

/* ==========================================================================
   9. Simulated Terminal Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusBox = document.getElementById('formStatus');

  if (!form || !statusBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const subject = form.querySelector('[name="subject"]').value;
    const message = form.querySelector('[name="message"]').value;

    statusBox.classList.remove('hidden');
    statusBox.innerHTML = `
      <div class="font-mono text-xs space-y-1 text-slate-300">
        <p class="text-cyan-400">$ ./send-message.sh --to="ehsanlak279@gmail.com" --cc="ehsan.lak@iau.ir"</p>
        <p class="text-yellow-400">[WAIT] Packaging message packet from ${name} &lt;${email}&gt;...</p>
        <p class="text-emerald-400">[SUCCESS] پیام شما آماده ارسال شد! نرم‌افزار ایمیل فعال گردید.</p>
      </div>
    `;

    // Create mailto link sending to both emails
    const mailto = `mailto:ehsanlak279@gmail.com?cc=ehsan.lak@iau.ir&subject=${encodeURIComponent(subject + ' - از وبسایت احسان لک')}&body=${encodeURIComponent('فرستنده: ' + name + '\nایمیل: ' + email + '\n\nمتن پیام:\n' + message)}`;
    
    setTimeout(() => {
      window.location.href = mailto;
      showToast('برنامه ایمیل شما باز شد. همچنین پیام کپی گردید.');
    }, 1200);
  });
}
