lucide.createIcons();

(function initParticles() {
    const container = document.getElementById("particle-container");
    if (!container) return;

   for (let i = 0; i < 16; i += 1) {
         const el = document.createElement("div");
         el.className = "particle";
         const size = 1 + Math.random() * 2;
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

(function initHeader() {
    const header = document.getElementById("main-header");
    if (!header) return;

   const bar = document.createElement("div");
    bar.id = "scroll-progress";
    bar.style.cssText = `
        position: fixed;
            top: 0; left: 0;
                height: 2px;
                    width: 0%;
                        background: #1a5cff;
                            z-index: 9999;
                                transition: width 0.1s linear;
                                    pointer-events: none;
                                      `;
    document.body.prepend(bar);

   window.addEventListener("scroll", () => {
         header.classList.toggle("scrolled", window.scrollY > 40);
         const docH = document.documentElement.scrollHeight - window.innerHeight;
         bar.style.width = docH > 0 ? `${(window.scrollY / docH) * 100}%` : "0%";
   }, { passive: true });
})();

(function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    if (!toggle) return;

   const menu = document.createElement("div");
    menu.id = "mobile-menu";
    menu.innerHTML = `
        <button class="menu-close" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="1.5">
                                 <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                       </svg>
                                           </button>
                                               <a href="#work" onclick="closeMobileMenu()">Works</a>
                                                   <a href="#about" onclick="closeMobileMenu()">About</a>
                                                       <a href="#contact" onclick="closeMobileMenu()">Contact</a>
                                                         `;
    document.body.appendChild(menu);

   window.closeMobileMenu = () => menu.classList.remove("open");
    toggle.addEventListener("click", () => menu.classList.add("open"));
    menu.querySelector(".menu-close").addEventListener("click", () => menu.classList.remove("open"));
})();

(function initGlitch() {
    document.querySelectorAll(".glitch-text").forEach((el) => {
          setInterval(() => {
                  el.classList.add("glitching");
                  setTimeout(() => el.classList.remove("glitching"), 160);
          }, 3500 + Math.random() * 2000);
    });
})();

function observeReveal(els) {
    const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {

                              entries.forEach((entry) => {
                                      if (!entry.isIntersecting) return;
                                      entry.target.classList.add("visible");
                                      observer.unobserve(entry.target);
                              });
          }, { threshold: 0.12 });

                                                els.forEach((el) => observer.observe(el));
    }

                                              observeReveal(document.querySelectorAll(".reveal"));

const projects = [
  {
        year: "2026",
        title: "Neural Campaign",
        category: "AI Visuals",
        description: "Series of prompt systems and visuals for a digital campaign launch.",
        tags: ["Midjourney", "ComfyUI", "Figma"],
        accent: "#1a5cff",
  },
  {
        year: "2025",
        title: "Aether Core",
        category: "WebGL / 3D",
        description: "Interactive web scene with procedural graphics and smooth animation.",
        tags: ["Three.js", "WebGL", "GSAP"],
        accent: "#00c4ff",
  },
  {
        year: "2025",
        title: "Quantum UI",
        category: "Interface",
        description: "Interface concept for an AI product with a dense visual system.",
        tags: ["Figma", "React", "Motion"],
        accent: "#b224ef",
  },
  {
        year: "2024",
        title: "Synthetic Motion",
        category: "Video AI",
        description: "A set of short motion scenes for presentations and social formats.",
        tags: ["Runway", "After Effects", "AI"],
        accent: "#f97316",
  },
  ];

(function initPortfolio() {
    const section = document.getElementById("work");
    if (!section) return;

   const listEl = document.createElement("div");
    listEl.className = "border-t border-white/5 reveal";

   projects.forEach((project, index) => {
         const row = document.createElement("button");
         row.type = "button";
         row.className = "project-row reveal text-left w-full";
         row.style.transitionDelay = `${index * 0.07}s`;
         row.innerHTML = `
               <span class="project-year">${project.year}</span>
                     <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
                           <h3 class="project-title">${project.title}</h3>
                                 <span class="project-category hidden md:block">${project.category}</span>
                                       <svg class="project-arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                                          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                                                                </svg>
                                                                    `;
         row.addEventListener("cli
                                  `;
                                      row.addEventListener("click", () => openModal(project));
                                          listEl.appendChild(row);
                                            });

                                              const container = section.querySelector(".max-w-7xl");
                                                if (container) container.appendChild(listEl);
                                                  observeReveal(listEl.querySelectorAll(".reveal"));
                                                  })();

                                                  let modalEl = null;

                                                  function openModal(project) {
                                                    if (!modalEl) {
                                                        modalEl = document.createElement("div");
                                                            modalEl.id = "project-modal";
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
               <div id="modal-tags" style="display:flex;flex-wrap:wrap;gap:0.5rem"></div>
           </div>
           </div>
         `;
             document.body.appendChild(modalEl);
                 modalEl.querySelector(".modal-backdrop").addEventListener("click", closeModal);
                     modalEl.querySelector("#modal-close").addEventListener("click", closeModal);
                         document.addEventListener("keydown", (event) => {
                               if (event.key === "Escape") closeModal();
                                   });
             }

               modalEl.querySel
                 modalEl.querySelector("#modal-accent").style.background = project.accent;
                   modalEl.querySelector("#modal-category").textContent = `${project.category} / ${project.year}`;
       modalEl.querySelector("#modal-title").textContent = project.title;
       modalEl.querySelector("#modal-letter").textContent = project.title.charAt(0);
       modalEl.querySelector("#modal-letter").style.color = project.accent;
       modalEl.querySelector("#modal-preview").style.background = `${project.accent}15`;
       modalEl.querySelector("#modal-desc").textContent = project.description;
       modalEl.querySelector("#modal-tags").innerHTML = project.tags
         .map((tag) => `<span class="tag">${tag}</span>`)
         .join("");

                      modalEl.classList.add("open");
       document.body.style.overflow = "hidden";
   }

                    function closeModal() {
       if (modalEl) modalEl.classList.remove("open");
       document.body.style.overflow = "";
   }

 document.querySelectorAll('a[href^="#"]').forEach((link) => {
     link.addEventListener("click", (event) => {
           const target = document.querySelector(link.getAttribute("href"));
           if (!target) return;
           event.preventDefault();
           target.scrollIntoView({ behavior: "smooth" });
     });
 });

 (function initBackToTop() {
     const btn = document.getElementById("back-to-top");
     if (!btn) return;

    window.addEventListener("scroll", () => {
          if (window.scrollY > 400) {
                  btn.classList.remove("hidden");
                  btn.style.opacity = "1";
                  btn.style.pointerEvents = "auto";
          } else {
                  btn.style.opacity = "0";
                  btn.style.pointerEvents = "none";
                  setTimeout(() => {
                            if (window.scrollY <= 400) btn.classList.add("hidden");
                  }, 300);
          }
    }, { passive: true });

    btn.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
    });
 })();

 (function initActiveNav() {
     const sections = ["work", "about", "contact"];
     const navLinks = document.querySelectorAll(".nav-links a");

    const setActive = (id) => {
          navLinks.forEach((link) => {
                  link.style.color = link.getAttribute("href") === `#${id}` ? "#1a5cff" : "";
          });
    };

    const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
                  if (entry.isIntersecting) setActive(e
                                                            if (entry.isIntersecting) setActive(entry.target.id);
          });
    }, { threshold: 0.35, rootMargin: "-80px 0px -50% 0px" });

    sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el) observer.observe(el);
    });
 })();

 (function initCursor() {
     if (window.matchMedia("(hover: none)").matches) return;

    const dot = document.createElement("div");
     dot.id = "cursor-dot";
     dot.style.cssText = `
         position: fixed;
             width: 6px;
                 height: 6px;
                     background: #1a5cff;
                         border-radius: 50%;
                             pointer-events: none;
                                 z-index: 99999;
                                     transform: translate(-50%, -50%);
                                         transition: opacity 0.3s ease, width 0.3s ease, height 0.3s ease;
                                             mix-blend-mode: difference;
                                               `;
     document.body.appendChild(dot);

    const ring = document.createElement("div");
     ring.id = "cursor-ring";
     ring.style.cssText = `
         position: fixed;
             width: 32px;
                 height: 32px;
                     border: 1px solid rgba(26,92,255,0.5);
                         border-radius: 50%;
                             pointer-events: none;
                                 z-index: 99998;
                                     transform: translate(-50%, -50%);
                                         transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
                                           `;
     document.body.appendChild(ring);

    window.addEventListener("mousemove", (event) => {
          dot.style.left = `${event.clientX}px`;
          dot.style.top = `${event.clientY}px`;
          ring.style.left = `${event.clientX}px`;
          ring.style.top = `${event.clientY}px`;
    }, { passive: true });

    document.querySelectorAll("a, button, .project-row").forEach((el) => {
          el.addEventListener("mouseenter", () => {
                  ring.style.width = "56px";
                  ring.style.height = "56px";
                  ring.style.borderColor = "rgba(26,92,255,0.9)";
          });
          el.addEventListener("mouseleave", () => {
                  ring.style.width = "32px";
                  ring.style.height = "32px";
                  ring.style.borderColor = "rgba(26,92,255,0.5)";
          });
    });
 })();

 (function initThemeToggle() {
     const btn = document.getElementById("theme-toggle");
     if (!btn) return;

    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
     const html = document.documentElement;

    function applyTheme(theme) {
          if (theme === "light") {
                  html.setAttribute("data-theme", "light");
                  btn.innerHTML = '<i data-lucide="moon" style="width:14px;height:14px"></i>';
                  btn.style.borderColor = "rgba(0,0,0,0.15)";
                  btn.style.color = "rgba(0,0,0,0.4)";
          } else {
                  html.removeAttribute("data-theme");
                  btn.innerHTML = '<i data-lucide="sun" style="width:14px;height:14px"></i>';
                  btn.style.borderColor = "rgba(255,255,255,0.12)";
                  btn.style.color = "rgba(255,255,255,0.5)";
          }
          lucide.createIcons();
          localStorage.setItem("portfolio-theme", theme);
    }

    applyTheme(savedTheme);

    btn.addEventListener("click", () => {
          const current = html.getAttribute("data-theme") === "light" ? "light" : "dark";
          applyTheme(current === "light" ? "dark" : "light");
    });
 })();
