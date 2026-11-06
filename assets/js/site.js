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
     Sliding pill tabs: 애드 작업물 / 개인 작업물. Inside 애드, design & marketing chips (both on by default). */
  var selectFilter = (function () {
    var tabs = $$('.u039-tab'), pill = $('.u039-pill'), cards = $$('.works .work');
    var chipBox = $('.cat-chips'), chips = $$('.cat-chk input');
    var cur = 0, cats = { dsn: true, mkt: true };
    function movePill(animate) {
      var t = tabs[cur];
      if (!animate) pill.style.transition = 'none';
      pill.style.setProperty('--x', t.offsetLeft + 'px');
      pill.style.setProperty('--w', t.offsetWidth + 'px');
      if (!animate) { void pill.offsetWidth; pill.style.transition = ''; }
    }
    // 새 목록은 이동한 방향에서 들어옵니다. 카드마다 조금씩 늦게 움직입니다
    function apply(dir) {
      var tab = tabs[cur].getAttribute('data-tab'), shown = [];
      chipBox.hidden = tab !== 'addd';
      chips.forEach(function (c) { c.checked = !!cats[c.value]; });
      cards.forEach(function (c) {
        var g = c.getAttribute('data-group').split('-');
        var on = g[0] === tab && (tab !== 'addd' || !!cats[g[1]]);
        c.classList.toggle('is-out', !on);
        if (on) shown.push(c);
      });
      reveal();
      if (rm || !dir) return;
      shown.forEach(function (c, k) {
        c.classList.add('is-in');
        c.animate([{ transform: 'translateX(' + (dir * 70) + 'px)', opacity: 0 }, { transform: 'none', opacity: 1 }],
          { duration: 550, delay: k * 45, easing: 'cubic-bezier(.34,1.45,.64,1)', fill: 'backwards' });
      });
    }
    function select(i, focus) {
      var dir = i >= cur ? 1 : -1;
      cur = i;
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      if (focus) tabs[i].focus();
      movePill(true);
      apply(dir);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { if (i !== cur) select(i); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); select((i + d + tabs.length) % tabs.length, true); }
      });
      t.tabIndex = i === 0 ? 0 : -1;
    });
    // 체크박스: 둘 다 체크가 기본. 하나만 체크하면 그 분류만 보이고, 마지막 하나는 해제되지 않습니다
    chips.forEach(function (c) {
      c.addEventListener('change', function () {
        cats[c.value] = c.checked;
        if (!cats.dsn && !cats.mkt) { cats[c.value] = true; c.checked = true; return; }
        apply(1);
      });
    });
    var panel = $('.works'); panel.id = 'work-panel';
    tabs.forEach(function (t) { t.setAttribute('aria-controls', panel.id); });
    movePill(false);
    apply(0);
    window.addEventListener('resize', function () { movePill(false); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { movePill(false); });
    // 'addd-mkt' 같은 이름이나 카드 요소를 받아 그 작업이 보이도록 탭과 칩을 맞춥니다
    return function (name, card) {
      var g = (card ? card.getAttribute('data-group') : name).split('-');
      var i = tabs.findIndex(function (t) { return t.getAttribute('data-tab') === g[0]; });
      if (g[0] === 'addd') {
        if (card) { if (!cats[g[1]]) cats[g[1]] = true; }
        else { cats = { dsn: g[1] === 'dsn', mkt: g[1] === 'mkt' }; }
      }
      if (i >= 0 && i !== cur) select(i); else apply(1);
    };
  })();
  // Fit 섹션의 "작업 보기" 링크는 해당 분류를 켜고 이동합니다
  $$('a[data-filter]').forEach(function (a) {
    a.addEventListener('click', function () { selectFilter(a.getAttribute('data-filter')); });
  });
  // 특정 작업으로 가는 링크는 그 작업이 숨겨져 있으면 보이게 바꿉니다
  $$('a[href^="#w-"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var t = document.getElementById(a.getAttribute('href').slice(1));
      if (t && t.classList.contains('is-out')) selectFilter(null, t);
    });
  });

  /* Work detail viewer: "자세히 보기" opens the work's pages stacked vertically */
  (function () {
    var dv = $('.dv'), body = $('.dv-body', dv), title = $('.dv-title', dv), x = $('.dv-x', dv), opener = null;
    function open(card, from) {
      var tpl = $('.work-pages', card);
      if (!tpl) return;
      opener = from;
      title.textContent = $('h3', card).textContent;
      body.textContent = '';
      body.appendChild(tpl.content.cloneNode(true));
      body.scrollTop = 0;
      dv.hidden = false;
      doc.classList.add('dv-open');
      requestAnimationFrame(function () { dv.classList.add('is-on'); });
      x.focus({ preventScroll: true });
    }
    function close() {
      if (dv.hidden) return;
      dv.classList.remove('is-on');
      doc.classList.remove('dv-open');
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

  /* Lucian UX/UI Prompt #008 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#008
     Copy button that turns into a check; one per contact box (phone, email). */
  // 실제 클립보드에 쓰고, 막힌 환경에서도 화면 반응은 똑같이 보여 줍니다
  function write(s) {
    try { if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(s).catch(function () {}); } catch (e) { /* 무시 */ }
    return Promise.resolve();
  }
  $$('.u008').forEach(function (root) {
    var btn = $('.u008-btn', root), tip = $('.u008-tip', root), t = 0;
    var text = $('.u008-cmd', root).textContent.trim();
    btn.addEventListener('click', function () {
      write(text);
      clearTimeout(t);
      root.classList.remove('is-copied');
      void root.offsetWidth;
      root.classList.add('is-copied');
      tip.textContent = '복사됨';
      t = setTimeout(function () { root.classList.remove('is-copied'); tip.textContent = ''; }, 1800);
    });
  });
})();
