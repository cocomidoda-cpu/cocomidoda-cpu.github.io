/* 김예진 포트폴리오 · site script
   Interactive parts are ported from Lucian UX/UI Prompt (MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/).
   Each ported block keeps its license line. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Lucian UX/UI Prompt #212 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#212
     Hide-on-scroll header, driven by the window scroll. */
  (function () {
    var hd = $('.u212-hd'), pg = $('.u212-pg', hd);
    var last = window.scrollY, acc = 0;
    // 내려가는 중이면 숨기고, 6px 넘게 올라오면 다시 보입니다. 맨 위 근처에서는 투명한 큰 헤더로 돌아갑니다
    function onScroll() {
      var y = window.scrollY, d = y - last; last = y;
      acc = (d > 0) === (acc > 0) ? acc + d : d;
      hd.classList.toggle('is-solid', y > 20);
      if (y < 60) hd.classList.remove('is-hide');
      else if (acc > 8) hd.classList.add('is-hide');
      else if (acc < -6) hd.classList.remove('is-hide');
      pg.style.width = (y / Math.max(1, doc.scrollHeight - window.innerHeight) * 100).toFixed(1) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    hd.addEventListener('focusin', function () { hd.classList.remove('is-hide'); });
    onScroll();
  })();

  /* Lucian UX/UI Prompt #219 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#219
     Circular-reveal dark mode for the whole page (View Transitions API). */
  (function () {
    var tg = $('.u219-tg');
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    function isDark() {
      var t = doc.getAttribute('data-theme');
      return t ? t === 'dark' : mq.matches;
    }
    function sync() {
      var on = isDark();
      tg.setAttribute('aria-pressed', String(on));
      tg.setAttribute('aria-label', on ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기');
    }
    function apply(dark) {
      doc.setAttribute('data-theme', dark ? 'dark' : 'light');
      try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
      sync();
    }
    tg.addEventListener('click', function () {
      var next = !isDark();
      // 원의 중심 = 누른 버튼의 가운데
      var b = tg.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
      var r = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
      doc.style.setProperty('--cx', cx.toFixed(0) + 'px');
      doc.style.setProperty('--cy', cy.toFixed(0) + 'px');
      doc.style.setProperty('--cr', Math.ceil(r) + 'px');
      if (!document.startViewTransition || rm) { apply(next); return; }
      doc.classList.add('vt-run');
      var vt = document.startViewTransition(function () { apply(next); });
      vt.finished.then(function () { doc.classList.remove('vt-run'); }, function () { doc.classList.remove('vt-run'); });
    });
    mq.addEventListener && mq.addEventListener('change', sync);
    sync();
  })();

  /* Lucian UX/UI Prompt #216 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#216
     Staggered hero entrance (no replay button on the live page). */
  (function () {
    var root = $('.u216'), h = $('.u216-h', root);
    var lines = h.getAttribute('data-words').split('|').map(function (l) { return l.split(' '); });
    // 제목: 낱말마다 가림 상자를 두고, 안쪽 글자가 아래에서 밀려 올라오게 합니다
    var d = 300;
    h.textContent = '';
    lines.forEach(function (line, li) {
      var ln = document.createElement('span'); ln.className = 'u216-ln' + (li === lines.length - 1 ? ' acc' : '');
      line.forEach(function (w, i) {
        var box = document.createElement('span'), inner = document.createElement('span');
        box.className = 'u216-w'; box.setAttribute('aria-hidden', 'true');
        inner.textContent = w; inner.style.setProperty('--d', d); d += 70;
        box.appendChild(inner); ln.appendChild(box); if (i < line.length - 1) ln.appendChild(document.createTextNode(' '));
      });
      h.appendChild(ln);
    });
    var sr = document.createElement('span');
    sr.className = 'sr-only'; sr.textContent = lines.map(function (l) { return l.join(' '); }).join(' ');
    sr.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
    h.appendChild(sr);
    // 첫 그림이 그려진 뒤 등장을 시작합니다 (탭이 가려져 rAF가 멈춰도 시작되도록 setTimeout 사용)
    setTimeout(function () { root.classList.add('is-in'); }, 60);
  })();

  /* Lucian UX/UI Prompt #251 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#251
     Staggered scroll-in cards and section headings, observed against the viewport. */
  var reveal = (function () {
    var R = $$('[data-rv], .u251-cd');
    if (rm || !('IntersectionObserver' in window)) { R.forEach(function (el) { el.classList.add('is-in'); }); return function () {}; }
    // 화면에 들어오면 켜고, 아래로 다시 빠져나가면 꺼서 다음에 다시 재생합니다
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('is-in');
        else if (e.boundingClientRect.top > e.rootBounds.bottom - 1) e.target.classList.remove('is-in');
      });
    }, { threshold: 0.12 });
    function stagger() {
      // 같은 줄 두 카드 중 오른쪽 열은 .09s 늦게 떠오릅니다
      var col = 0;
      $$('.works .work').forEach(function (c) {
        if (c.classList.contains('is-out')) return;
        if (c.classList.contains('work-wide')) { c.style.setProperty('--d', '0s'); col = 0; return; }
        c.style.setProperty('--d', (col % 2) * 0.09 + 's'); col++;
      });
    }
    stagger();
    R.forEach(function (el) { io.observe(el); });
    return stagger;
  })();

  /* Lucian UX/UI Prompt #370 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#370
     Timeline that lights up, following the page scroll. */
  (function () {
    var tl = $('.u370-tl'), ln = $('.u370-ln', tl), evs = $$('.u370-ev', tl), raf = 0;
    if (rm) { ln.style.setProperty('--p', '1'); evs.forEach(function (e) { e.classList.add('on'); }); return; }
    // 선 끝은 화면 높이의 60% 지점을 따라가고, 끝이 지난 점은 켜집니다
    function draw() {
      raf = 0;
      var top = ln.getBoundingClientRect().top, tip = innerHeight * 0.6 - top, h = ln.offsetHeight;
      var p = Math.max(0, Math.min(1, tip / h));
      ln.style.setProperty('--p', p.toFixed(4));
      evs.forEach(function (el) { el.classList.toggle('on', el.offsetTop - ln.offsetTop + 18 <= tip); });
    }
    window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
    window.addEventListener('resize', function () { if (!raf) raf = requestAnimationFrame(draw); });
    requestAnimationFrame(draw);
  })();

  /* Lucian UX/UI Prompt #044 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#044
     FAQ accordion: one item open at a time, arrow keys move between questions. */
  (function () {
    var root = $('.u044');
    var items = $$('.u044-it', root);
    var qs = items.map(function (it) { return $('.u044-q', it); });
    items.forEach(function (it, i) {
      var q = qs[i], body = $('.u044-body', it);
      q.id = 'fit-q' + i; body.id = 'fit-a' + i;
      q.setAttribute('aria-controls', body.id); body.setAttribute('aria-labelledby', q.id);
    });
    function set(it, open) {
      it.classList.toggle('open', open);
      $('.u044-q', it).setAttribute('aria-expanded', String(open));
      // 접힌 답변 속 링크는 탭 순서에서 빠집니다
      $('.u044-a a', it).tabIndex = open ? 0 : -1;
    }
    items.forEach(function (it, i) {
      set(it, it.classList.contains('open'));
      qs[i].addEventListener('click', function () {
        var willOpen = !it.classList.contains('open');
        items.forEach(function (o) { if (o !== it) set(o, false); });
        set(it, willOpen);
      });
      qs[i].addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowUp' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? qs.length - 1 : -2;
        if (n === -2) return;
        e.preventDefault();
        qs[(n + qs.length) % qs.length].focus();
      });
    });
  })();

  /* Lucian UX/UI Prompt #039 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#039
     Sliding pill tabs, filtering the work cards. */
  var selectFilter = (function () {
    var tabs = $$('.u039-tab'), pill = $('.u039-pill'), cards = $$('.works .work'), cur = 0;
    function movePill(animate) {
      var t = tabs[cur];
      if (!animate) pill.style.transition = 'none';
      pill.style.setProperty('--x', t.offsetLeft + 'px');
      pill.style.setProperty('--w', t.offsetWidth + 'px');
      if (!animate) { void pill.offsetWidth; pill.style.transition = ''; }
    }
    // 새 목록은 이동한 방향에서 들어옵니다. 카드마다 조금씩 늦게 움직입니다
    function select(i, focus) {
      if (i === cur) return;
      var dir = i > cur ? 1 : -1, f = tabs[i].getAttribute('data-filter');
      cur = i;
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      if (focus) tabs[i].focus();
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: rm ? 'auto' : 'smooth' });
      movePill(true);
      var shown = [];
      cards.forEach(function (c) {
        var on = f === 'all' || c.getAttribute('data-group') === f;
        c.classList.toggle('is-out', !on);
        if (on) shown.push(c);
      });
      reveal();
      if (rm) return;
      shown.forEach(function (c, k) {
        c.classList.add('is-in');
        c.animate([{ transform: 'translateX(' + (dir * 70) + 'px)', opacity: 0 }, { transform: 'none', opacity: 1 }],
          { duration: 550, delay: k * 45, easing: 'cubic-bezier(.34,1.45,.64,1)', fill: 'backwards' });
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); select((i + d + tabs.length) % tabs.length, true); }
      });
      t.tabIndex = i === 0 ? 0 : -1;
    });
    var panel = $('.works'); panel.id = 'work-panel';
    tabs.forEach(function (t) { t.setAttribute('aria-controls', panel.id); });
    movePill(false);
    window.addEventListener('resize', function () { movePill(false); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { movePill(false); });
    return function (name) {
      var i = tabs.findIndex(function (t) { return t.getAttribute('data-filter') === name; });
      if (i >= 0) select(i);
    };
  })();
  // Fit 섹션의 "작업 보기" 링크는 해당 분류 탭을 켜고 이동합니다
  $$('[data-filter]').forEach(function (a) {
    if (a.tagName !== 'A') return;
    a.addEventListener('click', function () { selectFilter(a.getAttribute('data-filter')); });
  });
  // 특정 작업으로 가는 링크는 그 작업이 숨겨져 있으면 "전체"로 돌립니다
  $$('a[href^="#w-"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var t = document.getElementById(a.getAttribute('href').slice(1));
      if (t && t.classList.contains('is-out')) selectFilter('all');
    });
  });

  /* Lucian UX/UI Prompt #061 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#061
     Thumbnail-to-lightbox zoom with real images; each work's images form one gallery. */
  (function () {
    var view = $('.u061-view'), img = $('.u061-img', view), pic = $('img', img), scrim = $('.u061-scrim');
    var xBtn = $('.u061-x', view), prev = $('.u061-prev', view), next = $('.u061-next', view), cap = $('.u061-cap', view);
    var set = [], cur = -1, isOpen = false, z = 1, tx = 0, ty = 0, opener = null;
    function rectOf(t) { var r = t.getBoundingClientRect(); return { l: r.left, t: r.top, w: r.width, h: r.height }; }
    function show(i) {
      var t = set[i];
      pic.src = t.getAttribute('data-full');
      pic.alt = $('img', t).alt;
      $('b', cap).textContent = t.getAttribute('data-cap') || '';
      $('em', cap).textContent = (i + 1) + ' / ' + set.length;
      prev.hidden = next.hidden = set.length < 2;
    }
    function setZoom(nz, ox, oy) {
      var W = view.clientWidth, H = view.clientHeight;
      if (nz > 1) { tx = Math.min(0, Math.max(W - W * nz, ox - (ox - tx) * nz / z)); ty = Math.min(0, Math.max(H - H * nz, oy - (oy - ty) * nz / z)); }
      else { tx = 0; ty = 0; }
      z = nz;
      img.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + z + ')';
      doc.classList.toggle('lb-zoom', z > 1);
    }
    // 열 때는 썸네일 자리·크기에서 시작해 전체로 커지고, 닫을 때는 그 반대로 돌아갑니다
    function morph(from, to, done) {
      var full = { l: 0, t: 0, w: innerWidth, h: innerHeight };
      var a = from || full, b = to || full;
      if (rm || !view.animate) { done && done(); return; }
      view.animate([
        { left: a.l + 'px', top: a.t + 'px', width: a.w + 'px', height: a.h + 'px', borderRadius: from ? '16px' : '0px' },
        { left: b.l + 'px', top: b.t + 'px', width: b.w + 'px', height: b.h + 'px', borderRadius: to ? '16px' : '0px' }
      ], { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = function () { done && done(); };
    }
    function open(t) {
      if (isOpen) return;
      isOpen = true; opener = t;
      set = $$('.u061-th', t.closest('.u061-grid'));
      cur = set.indexOf(t);
      show(cur);
      setZoom(1);
      doc.classList.add('lb-open');
      view.setAttribute('aria-hidden', 'false');
      t.classList.add('away');
      morph(rectOf(t), null, function () { doc.classList.add('lb-ready'); xBtn.focus({ preventScroll: true }); });
    }
    function close() {
      if (!isOpen) return;
      var t = set[cur];
      doc.classList.remove('lb-ready', 'lb-zoom');
      setZoom(1);
      view.style.transform = '';
      doc.style.removeProperty('--so');
      scrim.style.opacity = '0';
      morph(null, rectOf(t), function () {
        isOpen = false;
        doc.classList.remove('lb-open');
        scrim.style.opacity = '';
        view.setAttribute('aria-hidden', 'true');
        t.classList.remove('away');
        t.focus({ preventScroll: true });
      });
    }
    function go(d) {
      if (!isOpen || set.length < 2) return;
      set[cur].classList.remove('away');
      cur = (cur + d + set.length) % set.length;
      set[cur].classList.add('away');
      setZoom(1);
      show(cur);
      if (!rm && img.animate) img.animate([{ transform: 'translateX(' + (d * 40) + 'px)', opacity: .2 }, { transform: 'none', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    $$('.u061-th').forEach(function (t) { t.addEventListener('click', function () { open(t); }); });
    xBtn.addEventListener('click', close);
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    scrim.addEventListener('click', close);
    view.addEventListener('dblclick', function (e) {
      if (e.target.closest('button')) return;
      img.classList.remove('now');
      setZoom(z > 1 ? 1 : 2, e.clientX, e.clientY);
    });
    view.addEventListener('wheel', function (e) {
      if (!isOpen) return;
      e.preventDefault();
      img.classList.add('now');
      setZoom(Math.max(1, Math.min(3, z * (e.deltaY < 0 ? 1.12 : 0.89))), e.clientX, e.clientY);
    }, { passive: false });
    // 확대 중에는 끌어서 둘러보고, 확대가 아니면 좌우로 넘기거나 아래로 끌어 닫습니다
    var sx = 0, sy = 0, ox = 0, oy = 0, mode = '';
    view.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button') || !isOpen) return;
      sx = e.clientX; sy = e.clientY; ox = tx; oy = ty; mode = 'wait';
      view.setPointerCapture(e.pointerId);
    });
    view.addEventListener('pointermove', function (e) {
      if (!mode) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (mode === 'wait' && Math.hypot(dx, dy) > 6) mode = z > 1 ? 'pan' : Math.abs(dy) > Math.abs(dx) ? 'down' : 'side';
      if (mode === 'pan') {
        img.classList.add('now');
        var W = view.clientWidth, H = view.clientHeight;
        tx = Math.min(0, Math.max(W - W * z, ox + dx)); ty = Math.min(0, Math.max(H - H * z, oy + dy));
        img.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + z + ')';
      } else if (mode === 'down') {
        var d = Math.max(0, dy);
        view.style.transform = 'translateY(' + d + 'px) scale(' + (1 - d / 1600) + ')';
        doc.style.setProperty('--so', Math.max(0.2, 1 - d / 300).toFixed(2));
      } else if (mode === 'side') {
        img.classList.add('now');
        img.style.transform = 'translateX(' + dx * 0.5 + 'px)';
      }
    });
    function up(e) {
      if (!mode) return;
      var dx = e.clientX - sx, dy = e.clientY - sy, m = mode;
      mode = '';
      img.classList.remove('now');
      if (m === 'down') {
        if (dy > 110) { close(); return; }
        view.style.transition = 'transform .4s cubic-bezier(.34,1.4,.64,1)';
        view.style.transform = '';
        doc.style.removeProperty('--so');
        setTimeout(function () { view.style.transition = ''; }, 420);
      } else if (m === 'side') {
        img.style.transform = '';
        if (Math.abs(dx) > 70) go(dx < 0 ? 1 : -1);
      }
    }
    view.addEventListener('pointerup', up);
    view.addEventListener('pointercancel', up);
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Tab') {
        // 열린 동안 포커스는 뷰어 안 버튼들 사이에서만 돕니다
        var f = $$('button:not([hidden])', view), i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
  })();

  /* Lucian UX/UI Prompt #008 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#008
     Copy button that turns into a check, copying the email address. */
  (function () {
    var root = $('.u008'), btn = $('.u008-btn', root), tip = $('.u008-tip', root), t = 0;
    var text = $('.u008-cmd', root).textContent.trim();
    // 실제 클립보드에 쓰고, 막힌 환경에서도 화면 반응은 똑같이 보여 줍니다
    function write(s) {
      try { if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(s).catch(function () {}); } catch (e) { /* 무시 */ }
      return Promise.resolve();
    }
    btn.addEventListener('click', function () {
      write(text);
      clearTimeout(t);
      root.classList.remove('is-copied');
      void root.offsetWidth;
      root.classList.add('is-copied');
      tip.textContent = '복사됨';
      t = setTimeout(function () { root.classList.remove('is-copied'); tip.textContent = ''; }, 1800);
    });
  })();
})();
