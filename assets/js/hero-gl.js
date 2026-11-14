/* 김예진 포트폴리오 · moving background for the hero (after davidecarusio.it, in gray)
   A soft, glossy shape of light and shadow that keeps flowing, with fine grain on top. The pointer pushes it a little.
   Plain WebGL (no library). It renders at reduced resolution (the shape is soft anyway), only while the hero is
   on screen, and follows the light / dark theme. Reduced motion: one still frame. If WebGL is missing, the old
   CSS blobs stay. */
(function () {
  var hero = document.querySelector('.hero');
  var bg = hero && hero.querySelector('.hero-bg');
  if (!bg) return;
  var canvas = document.createElement('canvas');
  canvas.className = 'hero-gl';
  canvas.setAttribute('aria-hidden', 'true');
  var gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) return;
  bg.appendChild(canvas);
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = [
    'precision highp float;',
    'uniform vec2 R;uniform float T;uniform vec2 M;uniform vec3 C0;uniform vec3 C1;uniform vec3 C2;uniform float G;',
    'vec3 perm(vec3 x){return mod(((x*34.)+1.)*x,289.);}',
    // 2D simplex noise (Ashima Arts, MIT)
    'float sn(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);',
    'vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);',
    'vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);',
    'vec3 p=perm(perm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));',
    'vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;',
    'vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;',
    'm*=1.79284291400159-.85373472095314*(a0*a0+h*h);',
    'vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}',
    'float fbm(vec2 p){float f=0.,a=.5;for(int i=0;i<2;i++){f+=a*sn(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return f;}',
    'float H(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}',
    'void main(){',
    '  vec2 uv=gl_FragCoord.xy/R;vec2 p=(gl_FragCoord.xy-.5*R)/R.y;',
    '  p+=M*.08;float t=T*.07;',
    '  vec2 q=vec2(fbm(p*.35+vec2(t,-t*.7)),fbm(p*.35+vec2(5.2-t*.6,1.3+t*.5)));',
    '  vec2 r=vec2(fbm(p*.4+.9*q+vec2(1.7+t*.4,9.2)),fbm(p*.4+.9*q+vec2(8.3,2.8-t*.3)));',
    '  float f=fbm(p*.45+1.2*r);',
    // a smooth height field → light from the top left: soft glossy folds
    '  float e=.004;float fx=fbm((p+vec2(e,0.))*.45+1.2*r)-f;float fy=fbm((p+vec2(0.,e))*.45+1.2*r)-f;',
    '  vec3 n=normalize(vec3(-fx*60.,-fy*60.,1.));float l=clamp(dot(n,normalize(vec3(-.5,.6,.65))),0.,1.);',
    '  float body=smoothstep(-.35,.55,f);',
    '  vec3 col=mix(C0,C1,body);',
    '  col=mix(col,C2,pow(l,6.)*.85*body);',
    '  col=mix(col,C0,(1.-l)*.35*(1.-body*.4));',
    // the lower part calms toward the page tone so the big headline stays readable
    '  col=mix(col,C1,smoothstep(.55,.0,uv.y)*.55);',
    '  col+=(H(gl_FragCoord.xy+fract(T)*61.)-.5)*G;',
    '  gl_FragColor=vec4(col,1.);',
    '}'
  ].join('\n');

  function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  var prog = gl.createProgram();
  try { gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); }
  catch (e) { canvas.remove(); console.warn('hero-gl', e); return; }
  gl.linkProgram(prog); gl.useProgram(prog);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var U = {}; ['R', 'T', 'M', 'C0', 'C1', 'C2', 'G'].forEach(function (k) { U[k] = gl.getUniformLocation(prog, k); });

  // shadow / base / highlight, light and dark
  var PAL = {
    light: [[0.66, 0.66, 0.65], [0.89, 0.89, 0.88], [1.0, 1.0, 0.995], 0.05],
    dark: [[0.03, 0.03, 0.035], [0.11, 0.11, 0.12], [0.33, 0.33, 0.35], 0.04]
  };
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function setPal() {
    var P = PAL[isDark() ? 'dark' : 'light'];
    gl.uniform3fv(U.C0, P[0]); gl.uniform3fv(U.C1, P[1]); gl.uniform3fv(U.C2, P[2]); gl.uniform1f(U.G, P[3]);
  }
  setPal();
  new MutationObserver(function () { setPal(); if (rm || !on) draw(performance.now()); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  var SCALE = 0.5;
  function fit() {
    var w = Math.max(1, Math.round(bg.clientWidth * SCALE)), h = Math.max(1, Math.round(bg.clientHeight * SCALE));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    gl.uniform2f(U.R, w, h);
  }
  // pointer: eases toward the mouse (−1…1)
  var mx = 0, my = 0, tx = 0, ty = 0;
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = -((e.clientY - r.top) / r.height - 0.5) * 2;
  });
  var t0 = performance.now(), on = false, raf = 0;
  function draw(now) {
    fit();
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
    gl.uniform1f(U.T, rm ? 12 : (now - t0) / 1000 + 12);
    gl.uniform2f(U.M, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function loop(now) { raf = 0; if (!on) return; draw(now); raf = requestAnimationFrame(loop); }
  new IntersectionObserver(function (es) {
    on = !rm && es.some(function (e) { return e.isIntersecting; });
    if (on && !raf) raf = requestAnimationFrame(loop);
  }).observe(hero);
  window.addEventListener('resize', function () { if (rm || !on) draw(performance.now()); });
  draw(performance.now());
  bg.classList.add('is-gl');
})();
