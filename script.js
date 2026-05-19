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
  },
  {
    id: 2, year: '2024', title: 'QUANTUM UI', category: 'INTERFACE DESIGN',
    description: 'Дизайн-система для B2B SaaS-платформы с фокусом на dense information architecture. Тёмная тема, кастомные charts, микроанимации.',
    tags: ['FIGMA', 'REACT', 'FRAMER MOTION', 'DESIGN SYSTEM'],
    accent: '#ff2a9d',
  },
  {
    id: 3, year: '2024', title: 'SYNTHETIC VOICES', category: 'AUDIO AI',
    description: 'Эксперименты с генерацией аудио через ИИ — музыкальные текстуры, voice cloning, синтез ambient-пространств. Визуализация звука в реальном времени на WebGL.',
    tags: ['ELEVEN LABS', 'WEBGL', 'AUDIO API', 'PYTHON'],
    accent: '#b224ef',
  },
  {
    id: 4, year: '2023', title: 'AETHER CORE', category: 'WEBGL / 3D',
    description: 'Интерактивный 3D-опыт, построенный на Three.js и GLSL. Процедурные геометрии реагируют на звук и движение мыши. Полностью в браузере, без плагинов.',
    tags: ['THREE.JS', 'GLSL', 'WEBGL', 'GSAP'],
    accent: '#00c4ff',
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
            <span class="modal-preview-letter" id="modal-letter"></span>
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
  modalEl.querySelector('#modal-letter').textContent = project.title.charAt(0);
  modalEl.querySelector('#modal-letter').style.color = project.accent;
  modalEl.querySelector('#modal-preview').style.background = project.accent + '15';
  modalEl.querySelector('#modal-desc').textContent = project.description;

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
    hero_title_1: 'ПРЕВРАЩАЮ',
    hero_title_2: 'ШУМ В',
    hero_title_3: 'СМЫСЛ',
    hero_desc: 'AI-креатор с 3-летним опытом. Экспертиза на стыке кода и визуального искусства. Создаю реальность, в которой ошибки ИИ становятся артефактами стиля.',
    hero_btn: 'СМОТРЕТЬ РАБОТЫ',
    filter_all: 'ВСЕ',
    filter_ai: 'AI GENERATIVE',
    filter_3d: 'WEBGL / 3D',
    filter_design: 'UI/UX DESIGN',
    filter_audio: 'AUDIO AI',
    terminal_welcome: 'ВВЕДИТЕ <span class="text-blue-accent">help</span> ДЛЯ СПИСКА КОМАНД.'
  },
  en: {
    nav_work: 'WORK',
    nav_about: 'ABOUT',
    nav_contact: 'CONTACT',
    hero_title_1: 'TURNING',
    hero_title_2: 'NOISE INTO',
    hero_title_3: 'MEANING',
    hero_desc: 'AI creator with 3 years of experience. Expertise at the intersection of code and visual art. I create reality where AI errors become style artifacts.',
    hero_btn: 'VIEW WORK',
    filter_all: 'ALL',
    filter_ai: 'AI GENERATIVE',
    filter_3d: 'WEBGL / 3D',
    filter_design: 'UI/UX DESIGN',
    filter_audio: 'AUDIO AI',
    terminal_welcome: 'ENTER <span class="text-blue-accent">help</span> FOR THE LIST OF COMMANDS.'
  },
  kk: {
    nav_work: 'ЖҰМЫС',
    nav_about: 'ТУРАЛЫ',
    nav_contact: 'БАЙЛАНЫС',
    hero_title_1: 'ШУДЫ',
    hero_title_2: 'МАҒЫНАҒА',
    hero_title_3: 'АЙНАЛДЫРАМЫН',
    hero_desc: '3 жылдық тәжірибесі бар AI креаторы. Код пен визуалды өнер тоғысындағы сараптама. ЖИ қателері стиль артефактілеріне айналатын шындықты жасаймын.',
    hero_btn: 'ЖҰМЫСТАРДЫ КӨРУ',
    filter_all: 'БАРЛЫҒЫ',
    filter_ai: 'AI GENERATIVE',
    filter_3d: 'WEBGL / 3D',
    filter_design: 'UI/UX DESIGN',
    filter_audio: 'AUDIO AI',
    terminal_welcome: 'КОМАНДАЛАР ТІЗІМІ ҮШІН <span class="text-blue-accent">help</span> ЕНГІЗІҢІЗ.'
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

// ─── Interactive Terminal Logic ───────────
(function initInteractiveTerminal() {
  const input = document.getElementById('terminal-input');
  const history = document.getElementById('terminal-history');
  if (!input || !history) return;

  function printLine(text, className = '') {
    const p = document.createElement('p');
    if (className) p.className = className;
    p.innerHTML = text;
    history.appendChild(p);
    history.scrollTop = history.scrollHeight;
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      input.value = '';
      if (!cmd) return;

      printLine(`<span class="text-blue-accent">$</span> ${cmd}`);

      const parts = cmd.toLowerCase().split(' ');
      const action = parts[0];

      switch(action) {
        case 'help':
          printLine('Доступные команды / Available commands:', 'text-white/50');
          printLine('  <span class="text-blue-accent">help</span>     - Показать этот список / Show this list');
          printLine('  <span class="text-blue-accent">skills</span>   - Список технологий / Display skills & stack');
          printLine('  <span class="text-blue-accent">projects</span> - Мои проекты / List current projects');
          printLine('  <span class="text-blue-accent">contact</span>  - Контактные данные / Display contact info');
          printLine('  <span class="text-blue-accent">theme</span>    - Переключить тему / Toggle color theme');
          printLine('  <span class="text-blue-accent">clear</span>    - Очистить терминал / Clear history');
          break;
        case 'clear':
          history.innerHTML = '';
          break;
        case 'skills':
        case 'stack':
          printLine('Используемый стек / Tech Stack:', 'text-white/50');
          printLine('  ● COMFYUI / STABLE DIFFUSION');
          printLine('  ● MIDJOURNEY / RUNWAY GEN-3');
          printLine('  ● THREE.JS / WEBGL / GLSL');
          printLine('  ● PYTHON / AUTOMATION');
          break;
        case 'projects':
        case 'work':
          const projs = getCombinedProjects();
          printLine('Список проектов / Projects List:', 'text-white/50');
          projs.forEach((p, idx) => {
            printLine(`  [${idx+1}] <span style="color:${p.accent || '#1a5cff'}">${p.title}</span> — ${p.category} (${p.year})`);
          });
          break;
        case 'contact':
        case 'mail':
          printLine('Контакты / Contact details:', 'text-white/50');
          printLine('  Email: <a href="mailto:hello@aether.ai" class="text-blue-accent hover:underline">hello@aether.ai</a>');
          printLine('  Location: DIGITAL DIMENSION');
          break;
        case 'theme':
          const toggleBtn = document.getElementById('theme-toggle');
          if (toggleBtn) {
            toggleBtn.click();
            printLine('Тема успешно переключена / Theme toggled.', 'text-green-400');
          } else {
            printLine('Ошибка переключения темы / Theme toggle element not found.', 'text-red-400');
          }
          break;
        default:
          printLine(`Команда не найдена / Command not found: ${action}. Введите <span class="text-blue-accent">help</span>.`, 'text-red-400/80');
      }
    }
  });
})();


