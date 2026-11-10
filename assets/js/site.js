/* 김예진 포트폴리오 · site script
   Interactive parts are ported from Lucian UX/UI Prompt (MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/).
   Each ported block keeps its license line. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Conversion events for Google Tag Manager (GTM-N8SN6TNB). In GTM, add Custom Event triggers
     for these names and GA4 event tags; mark contact_click / contact_copy as key events in GA4. */
  function track(name, params) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, params || {})); } catch (e) { /* 무시 */ }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    if (/^tel:/.test(h)) track('contact_click', { contact_method: 'phone' });
    else if (/^mailto:/.test(h)) track('contact_click', { contact_method: 'email' });
    else if (/behance\.net/.test(h)) track('contact_click', { contact_method: 'behance' });
  });

  /* Smooth wheel scrolling (Lenis). Skipped with reduced motion or if the library did not load. */
  var lenis = null;
  if (!rm && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, anchors: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    window.__lenis = lenis;
  }
  // 부드러운 이동: Lenis가 있으면 그것으로, 없으면 브라우저 기본 스크롤로
  function glide(target, offset) {
    if (lenis) { lenis.scrollTo(target, { offset: offset || 0 }); return; }
    var y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + (offset || 0);
    window.scrollTo({ top: y, behavior: rm ? 'auto' : 'smooth' });
  }
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Lucian UX/UI Prompt #212 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#212
     Header, driven by the window scroll. Adapted: the header stays fixed (no hiding); once scrolled it turns frosted. */
  (function () {
    var hd = $('.u212-hd');
    var links = $$('.hd-nav a'), secs = links.map(function (l) { return document.getElementById(l.getAttribute('href').slice(1)); });
    // 화면 위쪽 40% 지점을 지난 마지막 섹션의 메뉴에 밑줄을 긋습니다 (첫 화면에서는 없음)
    function onScroll() {
      var y = window.scrollY, line = window.innerHeight * 0.4, cur = -1;
      hd.classList.toggle('is-solid', y > 20);
      secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) cur = i; });
      if (window.innerHeight + y >= doc.scrollHeight - 2) cur = secs.length - 1;
      links.forEach(function (l, i) {
        l.classList.toggle('is-on', i === cur);
        if (i === cur) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
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
    var d = 300, label = h.textContent.replace(/\s+/g, ' ').trim();
    h.textContent = '';
    lines.forEach(function (line) {
      var ln = document.createElement('span'); ln.className = 'u216-ln';
      line.forEach(function (w, i) {
        var box = document.createElement('span'), inner = document.createElement('span');
        box.className = 'u216-w'; box.setAttribute('aria-hidden', 'true');
        // *낱말* 은 세리프 이탤릭으로 씁니다 (PDF 표지의 "Action." 처럼)
        if (/^\*.+\*$/.test(w)) { w = w.slice(1, -1); box.classList.add('it'); }
        inner.textContent = w; inner.style.setProperty('--d', d); d += 70;
        box.appendChild(inner); ln.appendChild(box); if (i < line.length - 1) ln.appendChild(document.createTextNode(' '));
      });
      h.appendChild(ln);
    });
    var sr = document.createElement('span');
    sr.className = 'sr-only'; sr.textContent = label;
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

  /* Hero headline: font size is fitted so the headline spans exactly the content grid width.
     Works for any text in data-words (the widest line is fitted on narrow screens). */
  (function () {
    var h = $('.u216-h'), box = h.parentElement;
    function fit() {
      var cs = getComputedStyle(box);
      var target = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      h.style.fontSize = '100px'; h.style.width = 'max-content';
      var w = h.getBoundingClientRect().width;
      h.style.width = '';
      if (w > 0) h.style.fontSize = (100 * target / w).toFixed(2) + 'px';
    }
    fit();
    window.addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    window.addEventListener('load', fit);
  })();

  /* Lucian UX/UI Prompt #044 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#044
     FAQ accordion: one item open at a time, arrow keys move between questions. */
  (function () {
    var root = $('.u044');
    // 항목은 두 열에 나뉘어 있으므로, 키보드 이동은 번호(order) 순서를 따릅니다
    var items = $$('.u044-it', root).sort(function (a, b) { return (parseInt(a.style.order, 10) || 0) - (parseInt(b.style.order, 10) || 0); });
    var qs = items.map(function (it) { return $('.u044-q', it); });
    items.forEach(function (it, i) {
      var q = qs[i], body = $('.u044-body', it);
      q.id = 'fit-q' + i; body.id = 'fit-a' + i;
      q.setAttribute('aria-controls', body.id); body.setAttribute('aria-labelledby', q.id);
    });
    function set(it, open) {
      it.classList.toggle('open', open);
      $('.u044-q', it).setAttribute('aria-expanded', String(open));
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

  /* Fit Check: items 1·2, 3·4, … share one header height so both columns end at the same line */
  (function () {
    var its = $$('.u044-it').sort(function (a, b) { return (parseInt(a.style.order, 10) || 0) - (parseInt(b.style.order, 10) || 0); });
    var qs = its.map(function (it) { return $('.u044-q', it); });
    function even() {
      qs.forEach(function (q) { q.style.minHeight = ''; });
      if (!window.matchMedia('(min-width: 900px)').matches) return;
      for (var i = 0; i + 1 < qs.length; i += 2) {
        var h = Math.max(qs[i].offsetHeight, qs[i + 1].offsetHeight);
        qs[i].style.minHeight = qs[i + 1].style.minHeight = h + 'px';
      }
    }
    even();
    window.addEventListener('resize', even);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(even);
  })();

  /* Lucian UX/UI Prompt #039 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#039
     Sliding pill: 애드 작업물 / 개인 작업물. The bar sticks under the header, the pill follows the scroll,
     and clicking jumps to that group. Marketing / design checks filter both groups. */
  (function () {
    var bar = $('#work .u039'), slot = $('.u039-slot'), work = $('#work'), tabs = $$('.u039-tab'), pill = $('.u039-pill'), cards = $$('.works .work');
    var groups = tabs.map(function (t) { return document.getElementById(t.getAttribute('href').slice(1)); });
    var chips = $$('.cat-chk input'), cats = { dsn: true, mkt: true }, cur = 0, line = 140;
    function movePill(animate) {
      var t = tabs[cur];
      if (!animate) pill.style.transition = 'none';
      pill.style.setProperty('--x', t.offsetLeft + 'px');
      pill.style.setProperty('--w', t.offsetWidth + 'px');
      if (!animate) { void pill.offsetWidth; pill.style.transition = ''; }
    }
    function setCur(i) {
      if (i === cur) return;
      cur = i;
      tabs.forEach(function (t, k) { if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      movePill(true);
    }
    // 헤더 + 바 높이: 고정 바 아래 기준선이자, 블로그·메일 고정 무대의 위치입니다
    function stick() {
      var hd = $('.u212-hd').offsetHeight;
      line = hd + 12 + bar.offsetHeight + 12;
      doc.style.setProperty('--hd-h', hd + 'px');
      doc.style.setProperty('--work-stick', line + 'px');
    }
    // 화면 위쪽 1/3 지점을 지난 마지막 그룹의 탭이 켜집니다
    // 원래 자리의 바가 화면 위로 지나가면, Work 섹션 안에 있는 동안만 화면 아래 가운데에 떠 있는 바로 바뀝니다
    // 바는 제자리에서 스크롤되다가 헤더 아래 고정 위치에 닿으면 그대로 붙어 따라옵니다 (CSS sticky)
    function spy() {
      var y = line + (window.innerHeight - line) / 3, i = 0;
      groups.forEach(function (g, k) { if (g.offsetParent !== null && g.getBoundingClientRect().top <= y) i = k; });
      setCur(i);
      bar.classList.toggle('is-dark', i === 1 && groups[1].getBoundingClientRect().top <= line);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        glide(groups[i], -line);
      });
    });
    function apply() {
      chips.forEach(function (c) { c.checked = !!cats[c.value]; });
      cards.forEach(function (c) { c.classList.toggle('is-out', !cats[c.getAttribute('data-group').split('-')[1]]); });
      reveal();
      spy();
    }
    // 둘 다 체크가 기본. 하나만 체크하면 그 분류만 보이고, 마지막 하나는 해제되지 않습니다
    chips.forEach(function (c) {
      c.addEventListener('change', function () {
        cats[c.value] = c.checked;
        if (!cats.dsn && !cats.mkt) { cats[c.value] = true; c.checked = true; return; }
        apply();
      });
    });
    // 숨겨진 작업으로 가는 링크는 그 분류를 다시 켭니다
    $$('a[href^="#w-"]').forEach(function (a) {
      a.addEventListener('click', function () {
        var t = document.getElementById(a.getAttribute('href').slice(1));
        if (t && t.classList.contains('is-out')) { cats[t.getAttribute('data-group').split('-')[1]] = true; apply(); }
      });
    });
    var raf = 0;
    window.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; spy(); });
    }, { passive: true });
    window.addEventListener('resize', function () { stick(); movePill(false); spy(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { stick(); movePill(false); });
    stick();
    movePill(false);
    apply();
    // 뒤로 가기·새로 고침 때 브라우저가 체크 상태를 복원해도 목록과 다시 맞춥니다
    window.addEventListener('pageshow', apply);
    window.addEventListener('load', apply);
  })();

  /* Work detail viewer: "자세히 보기" opens the work's pages stacked vertically */
  (function () {
    var dv = $('.dv'), body = $('.dv-body', dv), title = $('.dv-title', dv), x = $('.dv-x', dv), opener = null;
    function open(card, from) {
      var tpl = $('.work-pages', card);
      if (!tpl) return;
      opener = from;
      track('work_detail_open', { work_id: card.id, work_title: $('h4', card).textContent.trim() });
      title.textContent = $('h4', card).textContent;
      body.textContent = '';
      body.appendChild(tpl.content.cloneNode(true));
      body.scrollTop = 0;
      dv.hidden = false;
      if (lenis) lenis.stop();
      doc.classList.add('dv-open');
      requestAnimationFrame(function () { dv.classList.add('is-on'); });
      x.focus({ preventScroll: true });
    }
    function close() {
      if (dv.hidden) return;
      dv.classList.remove('is-on');
      doc.classList.remove('dv-open');
      if (lenis) lenis.start();
      setTimeout(function () { dv.hidden = true; body.textContent = ''; }, rm ? 0 : 320);
      if (opener) opener.focus({ preventScroll: true });
    }
    $$('[data-detail]').forEach(function (b) {
      b.addEventListener('click', function () { open(b.closest('.work'), b); });
    });
    x.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (dv.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Tab') { e.preventDefault(); (document.activeElement === x ? body : x).focus(); }
    });
  })();

  /* Articles → Blog → Mail pinned scroller (desktop only).
     The stage sticks under the bar. For each card: scroll reveals the rest of it (if taller than the screen),
     then it holds for a moment, then the next card glides in from the right. Works for any number of cards. */
  (function () {
    var hs = $('.hs');
    if (!hs) return;
    var stage = $('.hs-stage', hs), track = $('.hs-track', hs);
    var inners = $$('.hs-inner', hs), panels = $$('.hs-panel', hs);
    var mq = window.matchMedia('(min-width: 900px)');
    var on = false, o = 0, X = 0, top = 68, D = 0, S = 0;
    var vStart = [], slideAt = [];
    function measure() {
      on = mq.matches && !rm && hs.offsetParent !== null;
      hs.classList.toggle('hs-on', on);
      track.style.transform = '';
      inners.forEach(function (i) { i.style.transform = ''; });
      hs.style.removeProperty('--hs-h'); hs.style.removeProperty('--hs-card');
      stage.style.marginRight = '';
      if (!on) { hs.style.height = ''; hs.style.removeProperty('--hs-w'); return; }
      top = parseFloat(getComputedStyle(stage).top) || $('.u212-hd').offsetHeight;
      // 카드 폭 = 아래 2단 카드 두 장 + 사이 여백. 무대는 화면 오른쪽 끝까지 늘려 다음 카드가 살짝 보이게 합니다
      hs.style.setProperty('--hs-w', hs.clientWidth + 'px');
      stage.style.marginRight = -(doc.clientWidth - hs.getBoundingClientRect().right) + 'px';
      // 모든 카드를 같은 높이(가장 긴 쪽)로 맞추고, 화면보다 길면 남는 만큼은 세로로 먼저 보여 줍니다
      var H = Math.max.apply(null, inners.map(function (i) { return i.offsetHeight; }));
      var avail = stage.clientHeight - 2 * parseFloat(getComputedStyle(stage).paddingTop);
      var ph = Math.min(H, avail);
      hs.style.setProperty('--hs-card', H + 'px');
      hs.style.setProperty('--hs-h', ph + 'px');
      o = H - ph;
      X = panels[1].offsetLeft - panels[0].offsetLeft;
      // D: 카드를 다 본 뒤 제자리에 머무는 구간(스크롤 두어 번), S: 다음 카드가 미끄러져 들어오는 동안의 구간
      D = Math.round(window.innerHeight * 0.3);
      S = Math.round(window.innerHeight * 0.45);
      var c = 0;
      vStart = []; slideAt = [];
      panels.forEach(function (_, i) {
        vStart.push(c); c += o;
        if (i < panels.length - 1) { c += D; slideAt.push(c); c += S; }
      });
      hs.style.height = (stage.offsetHeight + c) + 'px';
      update();
    }
    function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
    function update() {
      if (!on) return;
      var p = Math.max(0, top - hs.getBoundingClientRect().top);
      inners.forEach(function (el, i) { el.style.transform = 'translateY(' + (-clamp(p - vStart[i], 0, o)) + 'px)'; });
      var k = slideAt.filter(function (v) { return p > v; }).length;
      track.style.transform = 'translateX(' + (-k * X) + 'px)';
    }
    var raf = 0;
    window.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; update(); });
    }, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    // 탭이나 체크박스로 목록이 바뀌면 다시 잽니다
    $$('.u039-tab, .cat-chk input').forEach(function (el) {
      el.addEventListener(el.tagName === 'INPUT' ? 'change' : 'click', function () { setTimeout(measure, 0); });
    });
    measure();
  })();

  /* Lucian UX/UI Prompt #008 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#008
     Copy button that turns into a check; one per contact box (phone, email). */
  // 실제 클립보드에 쓰고, 막힌 환경에서도 화면 반응은 똑같이 보여 줍니다
  function write(s) {
    try { if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(s).catch(function () {}); } catch (e) { /* 무시 */ }
    return Promise.resolve();
  }
  /* Header "2024–2026 WORKS": letters roll up one by one on hover */
  (function () {
    var el = $('.hd-pill');
    if (!el) return;
    var text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    var wrap = document.createElement('span');
    wrap.className = 'roll';
    wrap.setAttribute('aria-hidden', 'true');
    text.split('').forEach(function (ch, i) {
      var c = document.createElement('span');
      c.textContent = ch;
      c.style.setProperty('--i', i);
      if (ch === ' ') c.className = 'sp';
      wrap.appendChild(c);
    });
    el.textContent = '';
    el.appendChild(wrap);
  })();

  /* Back to top: shows after the first screen */
  (function () {
    var b = $('.to-top');
    if (!b) return;
    function on() { b.classList.toggle('is-on', window.scrollY > window.innerHeight * 0.8); }
    b.addEventListener('click', function (e) {
      e.preventDefault();
      glide(0);
      $('.brand').focus({ preventScroll: true });
    });
    window.addEventListener('scroll', on, { passive: true });
    on();
  })();

  /* Cursor: a white dot (difference blend) trails the pointer; over [data-cursor-text] it grows and shows the label.
     Mouse/trackpad only; the system cursor stays. */
  (function () {
    var cur = $('.cur'), dot = $('.cur-dot'), txt = $('.cur-txt');
    if (!cur || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var x = -100, y = -100, tx = -100, ty = -100, shown = false;
    var k = rm ? 1 : 0.16;
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      if (!shown) { x = tx; y = ty; shown = true; cur.classList.add('is-on'); }
      var t = e.target.closest && e.target.closest('[data-cursor-text]');
      var link = !t && e.target.closest && e.target.closest('a, button, label, [role="button"], summary');
      dot.classList.toggle('is-label', !!t);
      dot.classList.toggle('is-link', !!link);
      if (t) txt.textContent = t.getAttribute('data-cursor-text');
    }, { passive: true });
    doc.addEventListener('mouseleave', function () { cur.classList.remove('is-on'); shown = false; });
    window.addEventListener('mousedown', function () { dot.classList.add('is-down'); });
    window.addEventListener('mouseup', function () { dot.classList.remove('is-down'); });
    (function loop() {
      x += (tx - x) * k; y += (ty - y) * k;
      cur.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      requestAnimationFrame(loop);
    })();
  })();

  (function () {
    var h = $('[data-grow]');
    if (!h || rm || !('IntersectionObserver' in window)) return;
    h.classList.add('grow-init');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { h.classList.add('is-grown'); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(h);
  })();

  $$('.u008:not(.u008-link)').forEach(function (root) {
    var btn = $('.u008-btn', root), tip = $('.u008-tip', root), t = 0;
    var text = $('.u008-cmd', root).textContent.trim();
    btn.addEventListener('click', function () {
      write(text);
      track('contact_copy', { contact_method: /@/.test(text) ? 'email' : 'phone' });
      clearTimeout(t);
      root.classList.remove('is-copied');
      void root.offsetWidth;
      root.classList.add('is-copied');
      tip.textContent = '복사됨';
      t = setTimeout(function () { root.classList.remove('is-copied'); tip.textContent = ''; }, 1800);
    });
  });
})();
