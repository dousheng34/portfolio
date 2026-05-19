/* ─────────────────────────────────────────
   AETHER Portfolio — script.js
   Static vanilla JS, no build step needed
───────────────────────────────────────── */

// ─── Init Lucide Icons ───────────────────
lucide.createIcons();

// ─── Particles ───────────────────────────
(function initParticles() {
  const container = document.getElementById('particle-container');
  if (!container) return;
  const COUNT = 20;
  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const size = 1 + Math.random() * 2.5;
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${14 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 20}s;
    `;
    container.appendChild(el);
  }
})();

// ─── Header scroll effect + Progress bar ────
(function initHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  // Scroll progress bar
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, #1a5cff, #ff2a9d);
    z-index: 9999;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docH > 0 ? (window.scrollY / docH * 100) + '%' : '0%';
  }, { passive: true });
})();

// ─── Typing effect in Hero ────────────────
(function initTyping() {
  const el = document.querySelector('.hero-content .label-mono');
  if (!el) return;
  const phrases = [
    'AI CREATIVE STRATEGIST',
    'GENERATIVE ART DIRECTOR',
    'NEURAL INTERFACE DESIGNER',
    'WEBGL / 3D SPECIALIST',
  ];
  let pi = 0, ci = 0, deleting = false;
  const TYPE_SPEED = 70, DELETE_SPEED = 35, PAUSE = 1800;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(tick, PAUSE); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }
  tick();
})();

// ─── Mobile menu ─────────────────────────
(function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;

  // Create mobile menu
  const menu = document.createElement('div');
  menu.id = 'mobile-menu';
  menu.innerHTML = `
    <button class="menu-close" aria-label="Close menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <a href="#work"         onclick="closeMobileMenu()">WORK</a>
    <a href="#about"        onclick="closeMobileMenu()">ABOUT</a>
    <a href="#contact"      onclick="closeMobileMenu()">CONTACT</a>
  `;
  document.body.appendChild(menu);

  window.closeMobileMenu = () => menu.classList.remove('open');

  toggle.addEventListener('click', () => menu.classList.add('open'));
  menu.querySelector('.menu-close').addEventListener('click', () => menu.classList.remove('open'));
})();

// ─── Glitch effect ───────────────────────
(function initGlitch() {
  const els = document.querySelectorAll('.glitch-text');
  els.forEach(el => {
    setInterval(() => {
      el.classList.add('glitching');
      setTimeout(() => el.classList.remove('glitching'), 160);
    }, 3500 + Math.random() * 2000);
  });
})();

// ─── Scroll reveal ───────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
})();

// ─── Animated counters ────────────────────
(function initCounters() {
  function animateCount(el, target, suffix, duration) {
    const start = performance.now();
    const isInfinity = target === Infinity;
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      if (isInfinity) {
        el.textContent = '∞';
        return;
      }
      el.textContent = Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Map text content to numeric targets
  const map = { '3+': { val: 3, suffix: '+' }, '50+': { val: 50, suffix: '+' }, '∞': { val: Infinity, suffix: '' } };

  const els = document.querySelectorAll('.achievements [class*="text-3xl"]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const original = e.target.textContent.trim();
      const cfg = map[original];
      if (cfg) animateCount(e.target, cfg.val, cfg.suffix, 1200);
      observer.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
})();


// ─── Project Modal ───────────────────────
const projects = [
  {
    id: 1, year: '2025', title: 'NEURAL DREAMS', category: 'GENERATIVE ART',
    description: 'Серия генеративных работ, созданных на стыке кода и случайности. Stable Diffusion + кастомные GLSL-шейдеры формируют уникальные визуальные миры, где каждый артефакт ИИ становится частью нарратива.',
    tags: ['STABLE DIFFUSION', 'GLSL', 'PYTHON', 'COMFYUI'],
    accent: '#1a5cff',
    image: 'neural_dreams.png'
  },
  {
    id: 2, year: '2024', title: 'QUANTUM UI', category: 'INTERFACE DESIGN',
    description: 'Дизайн-система для B2B SaaS-платформы с фокусом на dense information architecture. Тёмная тема, кастомные charts, микроанимации.',
    tags: ['FIGMA', 'REACT', 'FRAMER MOTION', 'DESIGN SYSTEM'],
    accent: '#ff2a9d',
    image: 'quantum_ui.png'
  },
  {
    id: 3, year: '2024', title: 'SYNTHETIC VOICES', category: 'AUDIO AI',
    description: 'Эксперименты с генерацией аудио через ИИ — музыкальные текстуры, voice cloning, синтез ambient-пространств. Визуализация звука в реальном времени на WebGL.',
    tags: ['ELEVEN LABS', 'WEBGL', 'AUDIO API', 'PYTHON'],
    accent: '#b224ef',
    image: 'synthetic_voices.png'
  },
  {
    id: 4, year: '2023', title: 'AETHER CORE', category: 'WEBGL / 3D',
    description: 'Интерактивный 3D-опыт, построенный на Three.js и GLSL. Процедурные геометрии реагируют на звук и движение мыши. Полностью в браузере, без плагинов.',
    tags: ['THREE.JS', 'GLSL', 'WEBGL', 'GSAP'],
    accent: '#00c4ff',
    image: 'aether_core.png'
  },
];

let currentFilter = 'ALL';
let currentLang = 'en';

function getCombinedProjects() {
  const localData = localStorage.getItem('aether_projects');
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed)) {
        const combined = [...projects];
        parsed.forEach(p => {
          if (!combined.some(cp => cp.id === p.id || cp.title.toUpperCase() === p.title.toUpperCase())) {
            combined.push(p);
          }
        });
        return combined;
      }
    } catch(e) {
      console.error("Error parsing local projects", e);
    }
  }
  return [...projects];
}

function renderProjects() {
  const section = document.getElementById('work');
  if (!section) return;

  const container = section.querySelector('.max-w-7xl');
  if (!container) return;

  let listEl = section.querySelector('.projects-list');
  if (!listEl) {
    listEl = document.createElement('div');
    listEl.className = 'projects-list border-t border-white/5 reveal';
    container.appendChild(listEl);
  } else {
    listEl.innerHTML = '';
  }

  const activeProjects = getCombinedProjects();
  
  const filtered = activeProjects.filter(p => {
    if (currentFilter === 'ALL') return true;
    return p.category.toUpperCase() === currentFilter.toUpperCase();
  });

  if (filtered.length === 0) {
    const emptyRow = document.createElement('div');
    emptyRow.style.cssText = 'padding: 4rem 0; text-align: center; color: rgba(255,255,255,0.25); font-family: "Space Mono", monospace; font-size: 11px; letter-spacing: 0.05em;';
    emptyRow.textContent = currentLang === 'ru' ? 'НЕТ ПРОЕКТОВ В ДАННОЙ КАТЕГОРИИ' : (currentLang === 'kk' ? 'БҰЛ САНАТТА ЖҰМЫСТАР ЖОҚ' : 'NO PROJECTS IN THIS CATEGORY');
    listEl.appendChild(emptyRow);
    return;
  }

  filtered.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'project-row reveal';
    row.style.transitionDelay = `${i * 0.05}s`;
    row.innerHTML = `
      <span class="project-year">${p.year}</span>
      <span class="project-index">${String(i+1).padStart(2,'0')}</span>
      <h3 class="project-title">${p.title}</h3>
      <span class="project-category hidden md:block">${p.category}</span>
      <svg class="project-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
      </svg>
    `;
    row.addEventListener('click', () => openModal(p));
    listEl.appendChild(row);
  });

  const container = section.querySelector('.max-w-7xl');
  if (container) container.appendChild(listEl);

  // Re-observe new reveal elements
  initRevealObs(listEl.querySelectorAll('.reveal'));
})();

function initRevealObs(els) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// ─── Modal ───────────────────────────────
let modalEl = null;

function openModal(project) {
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'project-modal';
    modalEl.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-box">
        <div class="modal-accent-bar" id="modal-accent"></div>
        <div class="modal-content">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.5rem">
            <div>
              <p class="section-number" id="modal-category" style="margin-bottom:0.5rem"></p>
              <h2 id="modal-title" style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(1.6rem,4vw,2.4rem);color:#fff;text-transform:uppercase;letter-spacing:-0.03em;line-height:1"></h2>
            </div>
            <button id="modal-close" style="background:none;border:none;color:rgba(255,255,255,0.5);cursor:pointer;padding:4px;margin:-4px -4px 0 1rem" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="modal-preview" id="modal-preview">
            <img id="modal-image" src="" alt="Project Preview">
          </div>
          <p id="modal-desc" style="color:rgba(255,255,255,0.6);font-size:0.95rem;line-height:1.7;margin-bottom:1.5rem"></p>
          <div id="modal-tags" style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.5rem"></div>
          <div style="display:flex;gap:0.75rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.07)">
            <button class="btn-primary">LIVE DEMO</button>
            <button class="btn-outline">VIEW SOURCE</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);
    modalEl.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    modalEl.querySelector('#modal-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  modalEl.querySelector('#modal-accent').style.background = project.accent;
  modalEl.querySelector('#modal-category').textContent = `${project.category} — ${project.year}`;
  modalEl.querySelector('#modal-title').textContent = project.title;
  modalEl.querySelector('#modal-preview').style.background = project.accent + '15';
  modalEl.querySelector('#modal-desc').textContent = project.description;

  const imgEl = modalEl.querySelector('#modal-image');
  if (project.image) {
    imgEl.src = project.image;
    imgEl.style.display = 'block';
  } else {
    imgEl.style.display = 'none';
  }

  const tagsEl = modalEl.querySelector('#modal-tags');
  tagsEl.innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

  modalEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (modalEl) modalEl.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── Contact form ────────────────────────
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ ОТПРАВЛЕНО';
    btn.style.background = 'rgba(34,197,94,0.1)';
    btn.style.color = '#22c55e';
    btn.style.border = '1px solid rgba(34,197,94,0.3)';
    setTimeout(() => {
      btn.innerHTML = 'ОТПРАВИТЬ <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-left:6px"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
      btn.style.background = '';
      btn.style.color = '';
      btn.style.border = '';
    }, 3000);
  });
})();

// ─── Smooth scroll for nav links ─────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Back-to-top button ───────────────────
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('hidden');
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        if (window.scrollY <= 400) btn.classList.add('hidden');
      }, 300);
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ─── Active nav link on scroll ────────────
(function initActiveNav() {
  const sections = ['work', 'about', 'contact'];
  const navLinks = document.querySelectorAll('.nav-links a');

  const setActive = (id) => {
    navLinks.forEach(a => {
      const isActive = a.getAttribute('href') === `#${id}`;
      a.style.color = isActive ? '#1a5cff' : '';
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();



// ─── i18n & THEME & VIDEO SEQUENCE ───────────────────────

const translations = {
  ru: {
    nav_work: 'WORK',
    nav_about: 'ABOUT',
    nav_contact: 'CONTACT',
    nav_cv: 'РЕЗЮМЕ',
    hero_role: 'CREATIVE DEVELOPER & WEBGL ENGINEER',
    hero_title_1: 'ПРЕВРАЩАЮ',
    hero_title_2: 'ШУМ В',
    hero_title_3: 'СМЫСЛ',
    hero_desc: 'Креативный фронтенд-разработчик и 3D WebGL инженер с 3-летним коммерческим опытом. Создаю высокопроизводительные интерактивные интерфейсы и генеративное искусство.',
    hero_btn: 'СМОТРЕТЬ РАБОТЫ',
    hero_cv: 'СКАЧАТЬ CV',
    metric_exp: 'ЛЕТ КОММЕРЧ. ОПЫТА',
    metric_projects: 'ПРОЕКТОВ ЗАПУЩЕНО',
    metric_awards: 'ДИЗАЙН-НАГРАДЫ',
    tech_stack_title: 'КОММЕРЧЕСКИЙ СТЕК',
    filter_all: 'ВСЕ',
    filter_ai: 'AI GENERATIVE',
    filter_3d: 'WEBGL / 3D',
    filter_design: 'UI/UX DESIGN',
    filter_audio: 'AUDIO AI'
  },
  en: {
    nav_work: 'WORK',
    nav_about: 'ABOUT',
    nav_contact: 'CONTACT',
    nav_cv: 'RESUME',
    hero_role: 'CREATIVE DEVELOPER & WEBGL ENGINEER',
    hero_title_1: 'TURNING',
    hero_title_2: 'NOISE INTO',
    hero_title_3: 'MEANING',
    hero_desc: 'Creative Frontend Developer & 3D WebGL Engineer with 3+ years of commercial experience. Crafting high-performance interactive interfaces, custom shaders, and generative layouts.',
    hero_btn: 'VIEW WORK',
    hero_cv: 'DOWNLOAD CV',
    metric_exp: 'YEARS COMMERCIAL EXP',
    metric_projects: 'PROJECTS SHIPPED',
    metric_awards: 'DESIGN AWARDS',
    tech_stack_title: 'COMMERCIAL TECH STACK',
    filter_all: 'ALL',
    filter_ai: 'AI GENERATIVE',
    filter_3d: 'WEBGL / 3D',
    filter_design: 'UI/UX DESIGN',
    filter_audio: 'AUDIO AI'
  },
  kk: {
    nav_work: 'ЖҰМЫС',
    nav_about: 'ТУРАЛЫ',
    nav_contact: 'БАЙЛАНЫС',
    nav_cv: 'ТҮЙІНДЕМЕ',
    hero_role: 'CREATIVE DEVELOPER & WEBGL ENGINEER',
    hero_title_1: 'ШУДЫ',
    hero_title_2: 'MAҒЫНАҒА',
    hero_title_3: 'АЙНАЛДЫРАМЫН',
    hero_desc: '3 жылдық коммерциялық тәжірибесі бар креативті фронтенд-әзірлеуші және 3D WebGL инженері. Жоғары өнімді интерактивті интерфейстер мен генеративті өнерді жасаймын.',
    hero_btn: 'ЖҰМЫСТАРДЫ КӨРУ',
    hero_cv: 'CV ЖҮКТЕУ',
    metric_exp: 'КОММЕРЦ. ТӘЖІРИБЕ ЖЫЛЫ',
    metric_projects: 'ЖОБАЛАР ІСКЕ ҚОСЫЛДЫ',
    metric_awards: 'ДИЗАЙН ЖҮЛДЕЛЕРІ',
    tech_stack_title: 'КОММЕРЦИЯЛЫҚ СТЕК',
    filter_all: 'БАРЛЫҒЫ',
    filter_ai: 'AI GENERATIVE',
    filter_3d: 'WEBGL / 3D',
    filter_design: 'UI/UX DESIGN',
    filter_audio: 'AUDIO AI'
  }
};

let currentLang = 'ru';

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      if (el.classList.contains('glitch-text')) {
        el.setAttribute('data-text', translations[lang][key]);
      }
      el.innerHTML = translations[lang][key];
    }
  });

  const termInput = document.getElementById('terminal-input');
  if (termInput) {
    termInput.placeholder = lang === 'ru' ? 'Введите команду...' : (lang === 'kk' ? 'Команда енгізіңіз...' : 'Enter command...');
  }
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.style.opacity = btn.getAttribute('data-lang') === lang ? '1' : '0.5';
  });

  renderProjects();
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
});

// Init language
setLanguage('ru');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const darkIcon = themeToggle.querySelector('.dark-icon');
  const lightIcon = themeToggle.querySelector('.light-icon');
  
  let currentTheme = localStorage.getItem('theme') || 'light';
  
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
      darkIcon.classList.remove('hidden');
      lightIcon.classList.add('hidden');
    } else {
      document.body.removeAttribute('data-theme');
      darkIcon.classList.add('hidden');
      lightIcon.classList.remove('hidden');
    }
    localStorage.setItem('theme', theme);
  }
  
  applyTheme(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });
}



// ─── 3D Tilt Effect on Project Rows ───────
(function initTiltEffect() {
  // Only on non-touch hover devices
  if (window.matchMedia('(hover: none)').matches) return;

  document.addEventListener('mousemove', e => {
    const row = e.target.closest('.project-row');
    const allRows = document.querySelectorAll('.project-row');
    
    allRows.forEach(r => {
      if (r !== row) {
        r.style.transform = '';
        r.style.boxShadow = '';
      }
    });
    
    if (row) {
      const rect = row.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      
      const tiltX = -(y - midY) / (rect.height) * 12;
      const tiltY = (x - midX) / (rect.width) * 12;
      
      row.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.025)`;
      row.style.boxShadow = `0 10px 30px rgba(26, 92, 255, 0.12)`;
    }
  });
})();

// ─── Cyber Decrypt Headers Effect ─────────
(function initDecryptHeaders() {
  function decryptText(el) {
    if (el.classList.contains('decrypting')) return;
    el.classList.add('decrypting');

    const originalText = el.getAttribute('data-original') || el.innerText;
    if (!el.getAttribute('data-original')) {
      el.setAttribute('data-original', originalText);
    }
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+';
    let iterations = 0;
    
    const interval = setInterval(() => {
      el.innerText = originalText.split('').map((char, index) => {
        if (char === ' ' || char === '\n' || char === '<' || char === '>') return char;
        if (index < iterations) return originalText[index];
        return chars[String(char).charCodeAt(0) % chars.length];
      }).join('');
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
        el.classList.remove('decrypting');
      }
      iterations += 1/3;
    }, 25);
  }

  // Setup Observer for h2 headings
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        decryptText(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('h2').forEach(h => observer.observe(h));
})();


