// three-bg.js - Premium Interactive 3D Holographic Background
(function initThreeBg() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  let scene, camera, renderer, particleGeometry, particleSystem, wireframeMesh;
  let trailGeometry, trailSystem;
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Mouse tracking
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Setup scene, camera, renderer
  scene = new THREE.Scene();
  
  // Camera
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles parameters
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const particleCount = isMobile ? 2000 : 6000;
  const radius = 2.1;

  particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Generate sphere coordinates
  for (let i = 0; i < particleCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    originalPositions[i * 3] = x;
    originalPositions[i * 3 + 1] = y;
    originalPositions[i * 3 + 2] = z;

    // Initial color - neon blue
    colors[i * 3] = 0.1;
    colors[i * 3 + 1] = 0.36;
    colors[i * 3 + 2] = 1.0;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Draw circular particles instead of square ones
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }

  // Material
  const material = new THREE.PointsMaterial({
    size: isMobile ? 0.045 : 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    map: createCircleTexture()
  });

  particleSystem = new THREE.Points(particleGeometry, material);
  scene.add(particleSystem);

  // Holographic Wireframe Grid Core
  const wireframeGeom = new THREE.IcosahedronGeometry(1.3, isMobile ? 1 : 2);
  const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0x1a5cff,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
  });
  wireframeMesh = new THREE.Mesh(wireframeGeom, wireframeMat);
  scene.add(wireframeMesh);

  // Setup trail particles for mouse cursor glow
  const trailCount = isMobile ? 25 : 55;
  trailGeometry = new THREE.BufferGeometry();
  const trailPositions = new Float32Array(trailCount * 3);
  const trailColors = new Float32Array(trailCount * 3);

  // Hide off-screen initially
  for (let i = 0; i < trailCount; i++) {
    trailPositions[i * 3] = 999;
    trailPositions[i * 3 + 1] = 999;
    trailPositions[i * 3 + 2] = 0;
  }

  trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

  const trailMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.065 : 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    map: createCircleTexture()
  });

  trailSystem = new THREE.Points(trailGeometry, trailMaterial);
  scene.add(trailSystem);

  // Trail state pool
  const trailState = [];
  for (let i = 0; i < trailCount; i++) {
    trailState.push({
      x: 999, y: 999, z: 0,
      vx: 0, vy: 0, vz: 0,
      life: 0,
      maxLife: 20 + Math.random() * 25
    });
  }
  let spawnIndex = 0;

  // Scroll variables & progress bar handler
  let scrollProgress = 0;
  const progressBar = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = docH > 0 ? window.scrollY / docH : 0;
    if (progressBar) {
      progressBar.style.width = (scrollProgress * 100) + '%';
    }
  }, { passive: true });

  // Mouse move listener
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / width) * 2 - 1;
    mouse.targetY = -(e.clientY / height) * 2 + 1;
  }, { passive: true });

  // Handle Resize
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();
    const posAttr = particleGeometry.attributes.position;
    const colorAttr = particleGeometry.attributes.color;

    // Mouse target position in 3D (projected roughly on the z=0 plane)
    const targetX3D = mouse.x * 2.8;
    const targetY3D = mouse.y * 2.8;

    // Color transition interpolation limits
    const currentMixRatio = Math.min(1, Math.max(0, scrollProgress * 1.3));
    const targetR = THREE.MathUtils.lerp(0.1, 1.0, currentMixRatio);
    const targetG = THREE.MathUtils.lerp(0.36, 0.16, currentMixRatio);
    const targetB = THREE.MathUtils.lerp(1.0, 0.62, currentMixRatio);

    // Apply color update to core wireframe
    wireframeMesh.material.color.setRGB(targetR, targetG, targetB);

    // Morph sphere with wave functions & mouse repel force-field
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const x = originalPositions[idx];
      const y = originalPositions[idx + 1];
      const z = originalPositions[idx + 2];

      // Wave morphing (Turbulence)
      const wave = Math.sin(x * 1.5 + time * 1.2) * 
                   Math.cos(y * 1.5 + time * 1.2) * 
                   Math.sin(z * 1.5 + time * 0.8);
      
      const factor = 1.0 + wave * 0.22;
      const baseMorphedX = x * factor;
      const baseMorphedY = y * factor;
      const baseMorphedZ = z * factor;

      // Mouse Force-field Repel calculations
      const dx = baseMorphedX - targetX3D;
      const dy = baseMorphedY - targetY3D;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      let repelX = 0;
      let repelY = 0;
      let repelZ = 0;

      if (dist < 1.3) {
        const force = (1.3 - dist) * 0.35;
        repelX = (dx / dist) * force;
        repelY = (dy / dist) * force;
        repelZ = (baseMorphedZ > 0 ? 1 : -1) * force * 0.4;
      }

      posAttr.array[idx] = baseMorphedX + repelX;
      posAttr.array[idx + 1] = baseMorphedY + repelY;
      posAttr.array[idx + 2] = baseMorphedZ + repelZ;

      // Color transition
      const pNoise = Math.sin(x * 0.4 + time * 0.6) * 0.15;
      const mixRatio = Math.min(1, Math.max(0, scrollProgress * 1.3 + pNoise));
      
      colorAttr.array[idx] = THREE.MathUtils.lerp(0.1, 1.0, mixRatio);
      colorAttr.array[idx + 1] = THREE.MathUtils.lerp(0.36, 0.16, mixRatio);
      colorAttr.array[idx + 2] = THREE.MathUtils.lerp(1.0, 0.62, mixRatio);
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;

    // Spawn new cursor trail particles
    const mouseSpeed = Math.sqrt(Math.pow(mouse.targetX - mouse.x, 2) + Math.pow(mouse.targetY - mouse.y, 2));
    if (mouseSpeed > 0.002) {
      const spawnCount = isMobile ? 1 : 2;
      for (let k = 0; k < spawnCount; k++) {
        const p = trailState[spawnIndex];
        p.x = targetX3D + (Math.random() - 0.5) * 0.05;
        p.y = targetY3D + (Math.random() - 0.5) * 0.05;
        p.z = (Math.random() - 0.5) * 0.05;
        p.vx = (Math.random() - 0.5) * 0.012;
        p.vy = (Math.random() - 0.5) * 0.012;
        p.vz = (Math.random() - 0.5) * 0.012;
        p.life = p.maxLife;
        spawnIndex = (spawnIndex + 1) % trailCount;
      }
    }

    // Update trail particle physics and geometry attributes
    const trailPosAttr = trailGeometry.attributes.position;
    const trailColAttr = trailGeometry.attributes.color;

    for (let i = 0; i < trailCount; i++) {
      const p = trailState[i];
      const idx = i * 3;

      if (p.life > 0) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.life--;

        trailPosAttr.array[idx] = p.x;
        trailPosAttr.array[idx + 1] = p.y;
        trailPosAttr.array[idx + 2] = p.z;

        const lifeRatio = p.life / p.maxLife;
        trailColAttr.array[idx] = targetR * lifeRatio;
        trailColAttr.array[idx + 1] = targetG * lifeRatio;
        trailColAttr.array[idx + 2] = targetB * lifeRatio;
      } else {
        // Offscreen
        trailPosAttr.array[idx] = 999;
        trailPosAttr.array[idx + 1] = 999;
        trailPosAttr.array[idx + 2] = 0;
      }
    }

    trailPosAttr.needsUpdate = true;
    trailColAttr.needsUpdate = true;

    // Rotations
    particleSystem.rotation.y = time * 0.035;
    wireframeMesh.rotation.y = -time * 0.08;
    wireframeMesh.rotation.x = time * 0.04;

    // Inertial mouse tracking
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    // Additional rotate particles based on mouse coordinates
    particleSystem.rotation.x = -mouse.y * 0.18;
    particleSystem.rotation.y += mouse.x * 0.18;

    // Scale systems dynamically
    const targetScale = 1.0 - scrollProgress * 0.25;
    particleSystem.scale.setScalar(THREE.MathUtils.lerp(particleSystem.scale.x, targetScale, 0.06));
    wireframeMesh.scale.setScalar(THREE.MathUtils.lerp(wireframeMesh.scale.x, targetScale, 0.06));

    // Camera orbit float motion
    camera.position.x = Math.sin(time * 0.06) * 0.12;
    camera.position.y = Math.cos(time * 0.06) * 0.12;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
})();
