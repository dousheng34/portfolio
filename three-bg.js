// three-bg.js - Interactive 3D particle sphere background
(function initThreeBg() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  let scene, camera, renderer, particleGeometry, particleSystem;
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
  const particleCount = isMobile ? 1200 : 3200;
  const radius = 2.1;

  particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Generate sphere coordinates
  for (let i = 0; i < particleCount; i++) {
    // Spherical coordinates
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

    // Initial color - neon blue/purple
    colors[i * 3] = 0.1; // R
    colors[i * 3 + 1] = 0.36; // G
    colors[i * 3 + 2] = 1.0; // B
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Draw circular particles instead of square ones using canvas texture
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }

  // Material
  const material = new THREE.PointsMaterial({
    size: isMobile ? 0.055 : 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    map: createCircleTexture()
  });

  particleSystem = new THREE.Points(particleGeometry, material);
  scene.add(particleSystem);

  // Scroll variables
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = docH > 0 ? window.scrollY / docH : 0;
  }, { passive: true });

  // Mouse move listener
  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = (e.clientX / width) * 2 - 1;
      mouse.targetY = -(e.clientY / height) * 2 + 1;
    }, { passive: true });
  }

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

    // Morph sphere with noise-like wave functions
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const x = originalPositions[idx];
      const y = originalPositions[idx + 1];
      const z = originalPositions[idx + 2];

      // Frequency and amplitude for distortion
      const wave = Math.sin(x * 1.4 + time * 1.1) * 
                   Math.cos(y * 1.4 + time * 1.1) * 
                   Math.sin(z * 1.4 + time * 0.7);
      
      const factor = 1.0 + wave * 0.25;

      posAttr.array[idx] = x * factor;
      posAttr.array[idx + 1] = y * factor;
      posAttr.array[idx + 2] = z * factor;

      // Color transition based on scroll progress and position
      // Blue base: #1a5cff (0.1, 0.36, 1.0)
      // Pink base: #ff2a9d (1.0, 0.16, 0.62)
      const mixRatio = Math.min(1, Math.max(0, scrollProgress * 1.4 + Math.sin(x * 0.5 + time * 0.5) * 0.25));
      
      colorAttr.array[idx] = THREE.MathUtils.lerp(0.1, 1.0, mixRatio);
      colorAttr.array[idx + 1] = THREE.MathUtils.lerp(0.36, 0.16, mixRatio);
      colorAttr.array[idx + 2] = THREE.MathUtils.lerp(1.0, 0.62, mixRatio);
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;

    // Slow rotation
    particleSystem.rotation.y = time * 0.04;

    // Inertial mouse movement
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    particleSystem.rotation.x = -mouse.y * 0.22;
    particleSystem.rotation.y += mouse.x * 0.22;

    // Scale sphere based on scroll (shrinks slightly as user scrolls down to avoid covering text)
    const targetScale = 1.0 - scrollProgress * 0.3;
    particleSystem.scale.setScalar(THREE.MathUtils.lerp(particleSystem.scale.x, targetScale, 0.05));

    // Rotate camera slightly
    camera.position.x = Math.sin(time * 0.08) * 0.15;
    camera.position.y = Math.cos(time * 0.08) * 0.15;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
})();
