document.addEventListener('DOMContentLoaded', () => {
       // --- PARTICLES ------------------------------------------------------------
                              const container = document.getElementById('particle-container');
       if (container) {
                  const createParticle = () => {
                                 const particle = document.createElement('div');
                                 particle.style.position = 'absolute';
                                 particle.style.width = '1px';
                                 particle.style.height = '1px';
                                 particle.style.background = 'rgba(26, 92, 255, 0.4)';
                                 particle.style.left = Math.random() * 100 + '%';
                                 particle.style.top = Math.random() * 100 + '%';
                                 particle.style.opacity = Math.random();
                                 container.appendChild(particle);

                                 const duration = 3000 + Math.random() * 5000;
                                 const animation = particle.animate([
                                    { transform: 'translateY(0)', opacity: 0 },
                                    { transform: 'translateY(-100px)', opacity: 0.5 },
                                    { transform: 'translateY(-200px)', opacity: 0 }
                                                ], {
                                                    duration: duration,
                                                    iterations: Infinity
                                 });
                  };

           for (let i = 0; i < 50; i++) {
                          createParticle();
           }
       }

                              // --- GLITCH EFFECT --------------------------------------------------------
                              const glitchElements = document.querySelectorAll('.glitch-text');
       glitchElements.forEach(el => {
                  el.setAttribute('data-text', el.textContent);
       });

                              // --- HEADER SCROLL --------------------------------------------------------
                              const header = document.getElementById('main-header');
       window.addEventListener('scroll', () => {
                  if (window.scrollY > 50) {
                                 header.classList.add('scrolled');
                  } else {
                                 header.classList.remove('scrolled');
                  }
       });

                              // --- BACK TO TOP ----------------------------------------------------------
                              const backToTop = document.getElementById('back-to-top');
       if (backToTop) {
                  backToTop.addEventListener('click', (e) => {
                                 e.preventDefault();
                                 window.scrollTo({ top: 0, behavior: 'smooth' });
                  });
       }

                              // --- REVEAL ON SCROLL -----------------------------------------------------
                              const reveal = () => {
                                         const reveals = document.querySelectorAll('.reveal');
                                         reveals.forEach(el => {
                                                        const windowHeight = window.innerHeight;
                                                        const elementTop = el.getBoundingClientRect().top;
                                                        const elementVisible = 150;
                                                        if (elementTop < windowHeight - elementVisible) {
                                                                           el.classList.add('active');
                                                        }
                                         });
                              };
       window.addEventListener('scroll', reveal);
       reveal(); // Initial check
});

                                                        if (elementTop < windowHeight - elementVisible) {
                                                                           el.classList.add('active')
