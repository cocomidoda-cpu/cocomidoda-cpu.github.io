/* 김예진 포트폴리오 · Hoptimist lamp for the 2019 scene of the About timeline
   Model: Hoptimist Bumble LED Lamp L · Chrome, rebuilt in Blender from the official product photo
   (assets/3d/hoptimist-bumble.glb). The spiral is the only light.

   - The light flickers on when the 2019 scene's hold starts, and the head pops up on its spring.
   - Each time a new item appears, the lamp hops: crouch → stretch in the air → squash on landing →
     the head wobbles on the spring, and it turns toward the list.
   - Lit and left alone, it bobs now and then.
   three.js and the model load only when the About section comes near. Reduced motion: no hops or flicker.
   If WebGL or the files fail, the canvas hides and the warm glow still follows the scroll (CSS --glow). */
const box = document.querySelector('.tl-walker');          // the lamp itself: a layer on the About stage (site.js moves it)
const slot = document.querySelector('.tl-bulb-slot');      // its place in the 2019 scene; holds the glow and the floor light
const room = slot && slot.closest('.tl-scene');
const tl = document.querySelector('.tl');
const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (box && slot && room && tl) {
  const near = new IntersectionObserver((es) => {
    if (!es.some((e) => e.isIntersecting)) return;
    near.disconnect();
    start().catch(() => box.classList.add('is-off'));
  }, { rootMargin: '600px 0px' });
  near.observe(box.parentElement);
}

async function start() {
  const THREE = await import('three');
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');

  const canvas = box.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.22; // a dark room: the chrome only just reads until the spiral lights up

  const camera = new THREE.PerspectiveCamera(24, 3 / 4, 0.01, 10);
  camera.position.set(0, 0.122, 0.5);
  camera.lookAt(0, 0.086, 0);

  const gltf = await new GLTFLoader().loadAsync(box.getAttribute('data-src'));
  const root = gltf.scene.getObjectByName('product_root') || gltf.scene;
  const body = new THREE.Group(); // hops and squashes from the floor (the model's origin is the floor)
  body.add(gltf.scene);
  scene.add(body);
  ['battery_concept', 'control_charge_concept'].forEach((n) => { const o = root.getObjectByName(n); if (o) o.visible = false; });
  gltf.scene.updateMatrixWorld(true);

  // Rig: the head turns and wobbles around its own centre; the spiral stretches from its base to the head
  const head = new THREE.Group(); head.position.set(0, 0.1, 0); root.add(head);
  ['head_shell', 'led_module_concept'].forEach((n) => { const o = root.getObjectByName(n); if (o) head.attach(o); });
  const COIL_Y = 0.044, COIL_H = 0.0301;
  const coil = new THREE.Group(); coil.position.set(0, COIL_Y, 0); root.add(coil);
  const helix = root.getObjectByName('diffuser_concept'); if (helix) coil.attach(helix);

  // The light: the spiral (and the LED face under the head) glow, with a warm point light inside the spiral
  const WARM = new THREE.Color(0xffd9a8);
  const glowMats = [];
  root.traverse((o) => {
    if (!o.isMesh || !/Diffuser|LED/i.test(o.material.name)) return;
    o.material = o.material.clone();
    o.material.emissive = WARM.clone();
    o.material.emissiveIntensity = 0;
    glowMats.push(o.material);
  });
  const bulb = new THREE.PointLight(0xffd2a0, 0, 0.5, 2);
  bulb.position.set(0, COIL_Y + COIL_H / 2, 0.004);
  root.add(bulb);

  // Size follows the box
  function fit() {
    const w = box.clientWidth, h = box.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(fit).observe(box);
  fit();

  /* ---------- motion ---------- */
  const G = 4.2; // gravity, m/s² (a light, toy-like hop)
  const S = {
    y: 0, vy: 0, air: false, crouch: 0, power: 0, wait: -1,
    s: 0, vs: 0, hy: 0, vhy: 0, look: 0, vlook: 0, lookTo: 0, tilt: 0, vtilt: 0, tiltTo: 0,
    lux: 0, luxTo: 0, flick: -1, quiet: 0, idleAt: 2.6, bounces: 0, sway: 0, vsway: 0, swayTo: 0, lean: 0, vlean: 0, leanTo: 0
  };
  const FLICK = [[0, 0], [0.05, 0.85], [0.11, 0.18], [0.18, 1], [0.25, 0.45], [0.36, 1]];
  // 'boing': the head is pushed down on the spring and bounces back; the base never leaves the floor
  function hop(power) {
    if (rm) return;
    S.vhy -= power * 0.62; S.vtilt += (Math.random() - 0.5) * power * 1.4; S.quiet = 0;
    if (S.bounces > 0) { S.bounces--; S.wait = 0.36; }
  }
  function spring(x, v, to, k, c, dt) { v += (-k * (x - to) - c * v) * dt; return [x + v * dt, v]; }

  const MARKS = [0.3, 0.42, 0.54, 0.66];
  let lit = false, step = 0, first = true;
  function read() {
    const W = box._walk;
    const h = tl.classList.contains('tl-on') ? (parseFloat(room.style.getPropertyValue('--h')) || 0) : 1;
    // the light comes on the moment the lamp lands in the 2019 scene
    return { lit: (!W || W.home) && h > 0.004, step: MARKS.filter((m) => h >= m).length };
  }
  function events() {
    const now = read();
    if (now.lit !== lit) {
      lit = now.lit;
      if (lit) {
        S.luxTo = 1;
        S.lux = 1; S.flick = -1;            // on at once, with a small pop of the head
        if (!rm && !first) { S.vhy += 0.38; S.wait = 0.42; S.bounces = 1; }
        S.tiltTo = 0; S.lookTo = 0;
      } else {
        S.luxTo = 0; S.flick = -1; S.tiltTo = rm ? 0 : -0.1; S.lookTo = 0;
        if (rm) S.lux = 0; else S.vhy -= 0.2;
      }
      S.quiet = 0;
    }
    if (now.step !== step) {
      const up = now.step > step;
      step = now.step;
      if (!first) hop(up ? 0.58 : 0.42);
      S.lookTo = step ? 0.42 : 0;
      S.tiltTo = step ? (step % 2 ? 0.07 : -0.05) : 0;
    }
    first = false;
  }

  function tick(dt) {
    S.quiet += dt;
    if (S.wait >= 0 && (S.wait -= dt) < 0) hop(0.5);
    // crouch, then launch
    if (S.crouch > 0 && (S.crouch -= dt) <= 0) { S.crouch = 0; S.air = true; S.vy = S.power; S.vs += 3.4; S.vhy -= S.power * 0.5; }
    if (S.air) {
      S.vy -= G * dt; S.y += S.vy * dt;
      if (S.y <= 0) { S.y = 0; S.air = false; S.vs -= Math.abs(S.vy) * 4.4; S.vhy -= Math.abs(S.vy) * 0.6; S.vy = 0; }
    }
    const sTo = S.air ? Math.max(-0.03, Math.min(0.07, S.vy * 0.12)) : (S.crouch > 0 ? -0.09 : 0);
    [S.s, S.vs] = spring(S.s, S.vs, sTo, 380, 13, dt);
    [S.hy, S.vhy] = spring(S.hy, S.vhy, 0, 150, 3.2, dt);   // a loose, springy coil
    S.hy = Math.max(-0.016, Math.min(0.03, S.hy));
    [S.look, S.vlook] = spring(S.look, S.vlook, S.lookTo, 70, 11, dt);
    [S.tilt, S.vtilt] = spring(S.tilt, S.vtilt, S.tiltTo, 120, 4.5, dt); // the head wobbles on top of the coil
    // sway: the whole lamp rocks left and right on its feet (hover pushes it), a loose spring so it boings
    [S.sway, S.vsway] = spring(S.sway, S.vsway, S.swayTo, 60, 2.6, dt);
    [S.lean, S.vlean] = spring(S.lean, S.vlean, S.leanTo, 90, 3.2, dt);   // sideways spring wobble
    S.lean = Math.max(-0.35, Math.min(0.35, S.lean));
    S.sway = Math.max(-0.32, Math.min(0.32, S.sway));
    // the light
    if (S.flick >= 0) {
      S.flick += dt;
      const k = FLICK.findIndex((f) => f[0] > S.flick);
      if (k < 0) { S.flick = -1; S.lux = 1; }
      else { const a = FLICK[k - 1], b = FLICK[k]; S.lux = a[1] + (b[1] - a[1]) * (S.flick - a[0]) / (b[0] - a[0]); }
    } else S.lux += (S.luxTo - S.lux) * Math.min(1, dt * 9);
    // alive: a small bob or glance when lit and left alone
    if (lit && !rm && !S.air && S.quiet > S.idleAt) {
      S.quiet = 0; S.idleAt = 2.4 + Math.random() * 2.4;
      if (Math.random() < 0.25) hop(0.32); else S.vhy += 0.16 + Math.random() * 0.08;
    }
  }

  const spot = new THREE.Vector3(), floor = new THREE.Vector3();
  let lastLux = -1, lastGx = '', lastGy = '', lastPool = '', lastFx = '', lastFy = '';
  const pct = (v) => (v * 100).toFixed(1) + '%';
  function apply() {
    // walking (site.js gives the distance walked as a phase) and the jump into Career (0 → 1)
    const W = box._walk || {};
    const ph = W.phase || 0, j = W.jump || 0, moving = W.moving ? 1 : 0;
    const step = Math.abs(Math.sin(ph));
    const air = j > 0 && j < 1 ? Math.sin(Math.PI * j) : 0;
    const crouch = j > 0 && j < 0.12 ? Math.sin(Math.PI * j / 0.12) : 0;
    body.position.y = S.y + step * 0.006 * moving;
    body.rotation.z = Math.sin(ph) * 0.09 * moving;
    const sq = S.s + air * 0.08 - crouch * 0.09 - (1 - step) * 0.015 * moving;
    body.scale.set(1 - sq * 0.5, 1 + sq, 1 - sq * 0.5);
    S.hy += (W.moving ? -Math.cos(ph * 2) * 0.0006 : 0);
    scene.environmentIntensity = 0.22 + 0.6 * (W.bright || 0);   // brighter chrome on the white Profile screen
    // the coil bends sideways from its base; the head rides on top of it
    coil.rotation.z = S.lean;
    head.position.x = -Math.sin(S.lean) * (COIL_H + S.hy) * 1.6;
    head.position.y = 0.1 + S.hy - (1 - Math.cos(S.lean)) * 0.02;
    head.rotation.set(0, S.look, S.tilt + S.lean * 1.2);
    coil.scale.y = (COIL_H + S.hy) / COIL_H;
    glowMats.forEach((m) => { m.emissiveIntensity = S.lux * 2.4; });
    bulb.intensity = S.lux * 0.02;
    if (Math.abs(S.lux - lastLux) > 0.003) { lastLux = S.lux; room.style.setProperty('--lux', S.lux.toFixed(3)); slot.style.setProperty('--lux', S.lux.toFixed(3)); }
    // keep the CSS glow centred on the spiral, wherever the lamp is
    spot.set(0, COIL_Y + COIL_H / 2, 0); coil.parent.localToWorld(spot); spot.project(camera);
    const gx = pct((spot.x + 1) / 2), gy = pct((1 - spot.y) / 2);
    if (gx !== lastGx || gy !== lastGy) { lastGx = gx; lastGy = gy; slot.style.setProperty('--gx', gx); slot.style.setProperty('--gy', gy); }
    // the pool of light on the floor (CSS, so it is never cut off by the canvas) dims as the lamp rises
    const pool = Math.max(0.3, 1 - S.y * 9).toFixed(2);
    if (pool !== lastPool) { lastPool = pool; slot.style.setProperty('--pool', pool); }
    // where the lamp's base meets the floor, in the box (recomputed every frame, so it stays under the lamp after a resize)
    floor.set(0, 0, 0).project(camera);
    const fx = pct((floor.x + 1) / 2), fy = pct((1 - floor.y) / 2);
    if (fx !== lastFx || fy !== lastFy) { lastFx = fx; lastFy = fy; slot.style.setProperty('--fx', fx); slot.style.setProperty('--fy', fy); box.dataset.fy = ((1 - floor.y) / 2).toFixed(4); }
  }

  // Hover: the lamp leans away from the mouse and boings back and forth; moving across it gives it a push
  if (!rm) {
    let lastX = null;
    room.addEventListener('pointermove', (e) => {
      const r = box.getBoundingClientRect();
      const inside = e.clientX > r.left - 40 && e.clientX < r.right + 40 && e.clientY > r.top && e.clientY < r.bottom;
      if (!inside) { if (lastX !== null) { S.leanTo = 0; lastX = null; } return; }
      const rel = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1 … 1
      S.leanTo = -rel * 0.12;                                      // the spring leans away from the mouse
      if (lastX !== null) { const dx = e.clientX - lastX; S.vlean += -dx * 0.012; }   // and wobbles side to side; no squash
      lastX = e.clientX; S.quiet = 0;
    });
    room.addEventListener('pointerleave', () => { S.leanTo = 0; lastX = null; });
  }

  // The loop runs while the About section is on screen; it only animates and draws while the lamp itself is
  // in view (the timeline moves it with a transform, which IntersectionObserver on the box does not catch)
  let near = false, raf = 0, last = 0;
  // inside the About page, only the section on screen is live; the others are marked inert
  function inView() {
    const r = box.getBoundingClientRect();
    return r.right > 0 && r.left < window.innerWidth && r.bottom > 0 && r.top < window.innerHeight;
  }
  function frame(t) {
    raf = 0;
    if (inView()) {
      const dt = last ? Math.min(1 / 30, (t - last) / 1000) : 0;
      last = t;
      events();
      tick(dt);
      apply();
      renderer.render(scene, camera);
    } else last = 0;
    if (near) raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver((es) => {
    near = es.some((e) => e.isIntersecting);
    if (near && !raf) raf = requestAnimationFrame(frame);
  }).observe(box.parentElement);
  frame(0);
}
