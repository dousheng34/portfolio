lucide.createIcons();

(function initParticles(){
    const c=document.getElementById('particle-container');
    if(!c)return;
    for(let i=0;i<20;i++){
          const el=document.createElement('div');
          el.className='particle';
          const s=1+Math.random()*2.5;
          el.style.cssText=`left:${Math.random()*100}%;width:${s}px;height:${s}px;animation-duration:${14+Math.random()*14}s;animation-delay:${Math.random()*20}s;`;
          c.appendChild(el);
    }
})();

(function initHeader(){
    const h=document.getElementById('main-header');
    if(!h)return;
    window.addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>40),{passive:true});
})();

(function initMobileMenu(){
    const toggle=document.querySelector('.menu-toggle');
    if(!toggle)return;
    const menu=document.createElement('div');
    menu.id='mobile-menu';
    menu.innerHTML=`<button class="menu-close" onclick="document.getElementById('mobile-menu').classList.remove('open')"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><a href="#work" onclick="document.getElementById('mobile-menu').classList.remove('open')">WORK</a><a href="#about" onclick="document.getElementById('mobile-menu').classList.remove('open')">ABOUT</a><a href="#contact" onclick="document.getElementById('mobile-menu').classList.remove('open')">CONTACT</a>`;
    document.body.appendChild(menu);
    toggle.addEventListener('click',()=>menu.classList.add('open'));
})();
(function initGlitch(){
    document.querySelectorAll('.glitch-text').forEach(el=>{
          setInterval(()=>{el.classList.add('glitching');setTimeout(()=>el.classList.remove('glitching'),160);},3500+Math.random()*2000);
    });
})();

(function initReveal(){
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

const projects=[
  {id:1,year:'2025',title:'NEURAL DREAMS',category:'GENERATIVE ART',description:'A series of generative works created at the intersection of code and randomness. Stable Diffusion + custom GLSL shaders form unique visual worlds.',tags:['STABLE DIFFUSION','GLSL','PYTHON','COMFYUI'],accent:'#1a5cff'},
  {id:2,year:'2024',title:'QUANTUM UI',category:'INTERFACE DESIGN',description:'Design system for B2B SaaS platform with a focus on dense information architecture. Dark theme, custom charts, micro-animations.',tags:['FIGMA','REACT','FRAMER MOTION','DESIGN SYSTEM'],accent:'#ff2a9d'},
  {id:3,year:'2024',title:'SYNTHETIC VOICES',category:'AUDIO AI',description:'Experiments with AI audio generation - musical textures, voice cloning, ambient space synthesis. Real-time sound visualization on WebGL.',tags:['ELEVEN LABS','WEBGL','AUDIO API','PYTHON'],accent:'#b224ef'},
  {id:4,year:'2023',title:'AETHER CORE',category:'WEBGL / 3D',description:'Interactive 3D experience built on Three.js and GLSL. Procedural geometries react to sound and mouse movement.',tags:['THREE.JS','GLSL','WEBGL','GSAP'],accent:'#00c4ff'},
  ];
(function initProjectRows(){
    const container=document.getElementById('project-list-container');
    if(!container)return;
    projects.forEach((p,i)=>{
          const row=document.createElement('div');
          row.className='project-row reveal';
          row.innerHTML=`<span class="project-year">${p.year}</span><span class="project-index">0${i+1}</span><h3 class="project-title">${p.title}</h3><span class="project-category">${p.category}</span><div class="project-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></div>`;
          row.onclick=()=>openProjectModal(p);
          container.appendChild(row);
    });
})();

function openProjectModal(p){
    const modal=document.getElementById('project-modal');
    if(!modal)return;
    const content=modal.querySelector('.modal-content');
    const accentBar=modal.querySelector('.modal-accent-bar');
    accentBar.style.background=p.accent;
    content.innerHTML=`<div class="modal-preview" style="background:rgba(${parseInt(p.accent.slice(1,3),16)},${parseInt(p.accent.slice(3,5),16)},${parseInt(p.accent.slice(5,7),16)},0.1)"><span class="modal-preview-letter" style="color:${p.accent}">${p.title[0]}</span></div><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem"><div class="label-mono">${p.category}</div><div class="label-mono">${p.year}</div></div><h2 class="font-display" style="font-size:2.5rem;margin-bottom:1.5rem;text-transform:uppercase">${p.title}</h2><p class="font-mono" style="font-size:0.875rem;line-height:1.7;color:rgba(255,255,255,0.7);margin-bottom:2rem">${p.description}</p><div style="display:flex;flex-wrap:wrap;gap:0.5rem">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`;
    modal.classList.add('open');
    document.body.style.overflow='hidden';
}

(function initModalClose(){
    const modal=document.getElementById('project-modal');
    if(!modal)return;
    modal.querySelector('.modal-backdrop').onclick=closeModal;
    window.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
})();

function closeModal(){
    const m=document.getElementById('project-modal');
    if(m){m.classList.remove('open');document.body.style.overflow='';}
}
