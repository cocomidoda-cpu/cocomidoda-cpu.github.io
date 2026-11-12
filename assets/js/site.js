/* 김예진 포트폴리오 · site script
   Interactive parts are ported from Lucian UX/UI Prompt (MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/).
   Each ported block keeps its license line. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Conversion events for Google Tag Manager (GTM-N8SN6TNB). In GTM, add Custom Event triggers
     for these names and GA4 event tags; mark contact_click / contact_copy as key events in GA4. */
  // Every event also carries portfolio_version (the ?for= version, 'common' without one; set in <head> before GTM).
  function track(name, params) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name, portfolio_version: window.pfVersion || 'common' }, params || {})); } catch (e) { /* 무시 */ }
  }
  window.pfTrack = track; // for the About script below, which runs outside this closure
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

  /* Job-specific versions: ?for=<key> swaps the hero lines, the Work intro, the three featured works,
     the category order and the first open How I Work item. The versions are written in index.html (#job-versions).
     A version can also hide works that don't fit the posting (hide), change short labels such as a menu item (text),
     and replace a whole block with its own <template data-for="<key>" data-swap="<selector>"> (e.g. How I Work).
     Runs before everything below, so the accordion, card reveal and category list see the final page. */
  var jobKey = (/[?&]for=([a-z0-9-]+)/.exec(location.search) || [])[1] || '';
  (function () {
    var data = $('#job-versions');
    if (!jobKey || !data) return;
    var v;
    try { v = JSON.parse(data.textContent)[jobKey]; } catch (e) { return; }
    if (!v) return;
    function put(sel, val, asHtml) { var el = $(sel); if (el && val) el[asHtml ? 'innerHTML' : 'textContent'] = val; }
    put('.hero-pos', v.pos);
    put('.hero-intro', v.intro, true);
    put('.hero-lbl', v.label);
    put('#work .sec-hd .sec-ko', v.lead, true);
    if (v.title) document.title = v.title;
    // 공고 전용 블록: <template data-for>의 내용으로 data-swap 자리의 내용을 바꿉니다
    $$('template[data-for]').forEach(function (t) {
      if ((' ' + t.getAttribute('data-for') + ' ').indexOf(' ' + jobKey + ' ') < 0) return;
      var el = $(t.getAttribute('data-swap')); if (!el) return;
      el.textContent = ''; el.appendChild(t.content.cloneNode(true));
    });
    if (v.text) Object.keys(v.text).forEach(function (sel) { $$(sel).forEach(function (el) { el.textContent = v.text[sel]; }); });
    // 이 공고와 관련이 적은 작업은 첫 페이지에서 빼고, 전체 작업 보기(archive)에만 둡니다
    if (v.hide) v.hide.forEach(function (id) { var c = document.getElementById(id); if (c && c.parentNode) c.parentNode.removeChild(c); });
    // 대표 작업: 지정한 카드를 각자의 묶음(data-home) 맨 앞으로 올리고 '대표 작업' 배지를 답니다
    if (v.featured) {
      $$('#work .work.is-feat').forEach(function (c) {
        c.classList.remove('is-feat');
        var b = $('.work-badge', c); if (b) b.remove();
      });
      v.featured.slice().reverse().forEach(function (id) {
        var c = document.getElementById(id); if (!c) return;
        var home = document.getElementById(c.getAttribute('data-home'));
        if (home) { var first = $('.work', home); if (first !== c) home.insertBefore(c, first); }
        c.classList.add('is-feat');
        var tag = $('.work-tag', c);
        if (tag && !$('.work-badge', tag)) tag.insertAdjacentHTML('afterbegin', '<span class="work-badge">Main</span>');
      });
    }
    // 목록의 분류 순서 (예: 디자인 공고는 Design 먼저)
    if (v.order) {
      var list = $('#work .wk-list'), cats = $('#work .wk-cats');
      v.order.forEach(function (id) {
        var g = document.getElementById(id), a = $('.wk-cat[href="#' + id + '"]');
        if (g && list) list.appendChild(g);
        if (a && cats) cats.appendChild(a.closest('li'));
      });
    }
    if (v.open) $$('.u044-it').forEach(function (it) { it.classList.toggle('open', it.style.order === String(v.open)); });
    track('portfolio_version', { version: jobKey });
  })();

  /* Category counts are read from the cards, so they stay right whichever works are featured */
  $$('.wk-cat, .wk-sub').forEach(function (a) {
    var g = document.getElementById(a.getAttribute('href').slice(1)), n = g ? $$('.work', g).length : 0;
    var el = $(a.classList.contains('wk-cat') ? 'sup' : 'span', a);
    if (el) el.textContent = (n < 10 ? '0' : '') + n;
  });

  /* Keep the version when moving between the home page and the archive */
  if (jobKey) {
    $$('a[href^="index.html"], a[href^="archive.html"]').forEach(function (a) {
      var h = a.getAttribute('href'), i = h.indexOf('#'), base = i < 0 ? h : h.slice(0, i);
      if (base.indexOf('?') === -1) a.setAttribute('href', base + '?for=' + jobKey + (i < 0 ? '' : h.slice(i)));
    });
  }

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
    if (!root || !h) return;
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
    var h = $('.u216-h');
    if (!h) return;
    var box = h.parentElement;
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
    if (!root) return;
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
        if (willOpen) track('how_item_open', { item: ($('.u044-n', qs[i]) || {}).textContent || String(i + 1), item_title: (($('.u044-t', qs[i]) || qs[i]).textContent || '').trim() });
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

  /* Work: Marketing / Design list sticks on the left, each with small addd / 개인 sub-items.
     The category and sub-group whose cards are on screen turn dark; clicking glides to them. */
  (function () {
    var wk = $('.wk');
    if (!wk) return;
    var links = $$('.wk-cat, .wk-sub', wk), cats = $$('.wk-cat', wk), subs = $$('.wk-sub', wk);
    function target(a) { return document.getElementById(a.getAttribute('href').slice(1)); }
    var catG = cats.map(target), subG = subs.map(target), cc = -1, cs = -1;
    function mark(list, i) { list.forEach(function (a, k) { if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }); }
    function spy() {
      var line = window.innerHeight * 0.5, i = 0, k = 0;
      catG.forEach(function (g, n) { if (g && g.getBoundingClientRect().top <= line) i = n; });
      subG.forEach(function (g, n) { if (g && g.getBoundingClientRect().top <= line) k = n; });
      if (i !== cc) { cc = i; mark(cats, i); }
      if (k !== cs) { cs = k; mark(subs, k); }
    }
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = target(a);
        if (!t) return;
        e.preventDefault();
        glide(t, -($('.u212-hd') ? $('.u212-hd').offsetHeight : 0) - 32);
      });
    });
    var raf = 0;
    window.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; spy(); });
    }, { passive: true });
    spy();
  })();

  /* Lucian UX/UI Prompt #039 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#039
     Archive page: All / Marketing / Design tabs filter the cards; the pill slides under the current tab. */
  (function () {
    var arc = $('.arc');
    if (!arc) return;
    var tabs = $$('.u039-tab', arc), pill = $('.u039-pill', arc), cards = $$('.work', arc), cur = 0;
    function cat(c) { return (c.getAttribute('data-group') || '').split('-')[1]; }
    tabs.forEach(function (t) {
      var f = t.getAttribute('data-filter'), sm = $('small', t);
      if (sm) sm.textContent = f === 'all' ? cards.length : cards.filter(function (c) { return cat(c) === f; }).length;
    });
    function movePill(animate) {
      var t = tabs[cur];
      if (!animate) pill.style.transition = 'none';
      pill.style.setProperty('--x', t.offsetLeft + 'px');
      pill.style.setProperty('--w', t.offsetWidth + 'px');
      if (!animate) { void pill.offsetWidth; pill.style.transition = ''; }
    }
    function show(i, animate) {
      cur = i;
      var f = tabs[i].getAttribute('data-filter');
      tabs.forEach(function (t, k) { if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      cards.forEach(function (c) { c.classList.toggle('is-out', f !== 'all' && cat(c) !== f); });
      movePill(animate);
      reveal();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        show(i, true);
        try { history.replaceState(null, '', t.getAttribute('href')); } catch (er) { /* 무시 */ }
      });
    });
    var start = 0;
    tabs.forEach(function (t, i) { if (t.getAttribute('href') === location.hash) start = i; });
    show(start, false);
    window.addEventListener('resize', function () { movePill(false); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { movePill(false); });
  })();

  /* Work detail viewer: "자세히 보기" opens the work's pages stacked vertically */
  (function () {
    var dv = $('.dv'), body = $('.dv-body', dv), title = $('.dv-title', dv), x = $('.dv-x', dv), opener = null;
    // 무음 반복 영상(GIF를 바꾼 것): 움직임 줄이기 설정이면 재생하지 않고 첫 화면에 멈춰 둡니다 (WCAG 2.3.3)
    function playClips(root) {
      $$('video', root).forEach(function (v) {
        v.muted = true;
        if (rm) { v.autoplay = false; v.removeAttribute('autoplay'); v.pause(); return; }
        var p = v.play && v.play(); if (p && p.catch) p.catch(function () {});
      });
    }
    // 창이 열려 있는 동안 뒤 페이지는 키보드·보조기기에서 빠지게 합니다 (Tab은 창 안 버튼을 차례로 돕니다)
    function setInert(on) {
      Array.prototype.forEach.call(document.body.children, function (el) {
        if (el === dv || el.tagName === 'SCRIPT') return;
        if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert');
      });
    }
    function open(card, from) {
      var tpl = $('.work-pages', card);
      if (!tpl) return;
      opener = from; doneSent = false;
      track('work_detail_open', { work_id: card.id, work_title: $('h4', card).textContent.trim() });
      title.textContent = $('h4', card).textContent;
      body.textContent = '';
      body.appendChild(tpl.content.cloneNode(true));
      playClips(body);
      body.scrollTop = 0;
      dv.hidden = false;
      setInert(true);
      // 스크롤되는 구간 박스는 포트폴리오 슬라이드에서 보여 주던 위치에서 시작합니다
      $$('.ds-scroll[data-pct]', body).forEach(function (b) {
        var st = b.firstElementChild;
        if (st) b.scrollTop = st.offsetHeight * (parseFloat(b.getAttribute('data-pct')) || 0) / 100;
      });
      current = card;
      story = storyFor(body);
      if (story) story();
      progress();
      if (lenis) lenis.stop();
      doc.classList.add('dv-open');
      requestAnimationFrame(function () { dv.classList.add('is-on'); });
      x.focus({ preventScroll: true });
    }
    function close() {
      if (dv.hidden) return;
      var zz = $('.sl-zoom'); if (zz) zz.remove();
      dv.classList.remove('is-on');
      doc.classList.remove('dv-open');
      setInert(false);
      if (lenis) lenis.start();
      setTimeout(function () { dv.hidden = true; body.textContent = ''; }, rm ? 0 : 320);
      if (opener) opener.focus({ preventScroll: true });
    }
    $$('[data-detail]').forEach(function (b) {
      b.addEventListener('click', function () { open(b.closest('.work'), b); });
    });
    x.addEventListener('click', close);

    /* Story pages (잘룸 · 금강버섯농장): the page runs down the left; the sticky note on the right switches to the note
       whose page part has reached the middle of the viewer — the same idea as the Work section's category list. */
    var story = null, storyRaf = 0, current = null, doneSent = false;
    function storyFor(root) {
      var st = $('.ds-story', root);
      if (!st) return null;
      var notes = $$('.ds-note', st);
      var marks = notes.map(function (n) {
        var part = n.getAttribute('data-part');
        return { el: part === '0' ? null : $('.ds-part[data-part="' + part + '"]', st), f: parseFloat(n.getAttribute('data-frac')) || 0 };
      });
      var cur = -1, endAt = notes.length - 1, hasEnd = notes[endAt].classList.contains('ds-end');
      var partsAll = $$('.ds-part', st), lastPart = partsAll[partsAll.length - 1];
      return function () {
        var line = body.getBoundingClientRect().top + body.clientHeight * 0.5, k = 0;
        marks.forEach(function (m, i) {
          if (m.el && m.el.getBoundingClientRect().top + m.el.offsetHeight * m.f <= line) k = i;
        });
        // 페이지 맨 끝에 닿으면 마무리 카드(체크 목록 + 다음 작업)로 바뀝니다
        var atBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 24;
        if (hasEnd && ((lastPart && lastPart.getBoundingClientRect().bottom <= line) || atBottom)) k = endAt;
        if (k === cur) return;
        cur = k;
        notes.forEach(function (n, i) { n.classList.toggle('is-on', i === k); });
      };
    }

    /* Reading progress: a thin bar under the viewer's title bar fills as you read; full = done */
    var prog = document.createElement('div');
    prog.className = 'dv-progress';
    prog.setAttribute('aria-hidden', 'true');
    prog.innerHTML = '<i></i>';
    dv.insertBefore(prog, body);
    var progBar = prog.firstChild;
    function progress() {
      var max = body.scrollHeight - body.clientHeight;
      var p = max > 0 ? Math.min(1, body.scrollTop / max) : 1;
      progBar.style.transform = 'scaleX(' + p + ')';
      prog.classList.toggle('is-done', p >= 0.995);
      // scrolled to the end: once per opening
      if (p >= 0.995 && max > 0 && !doneSent && current) { doneSent = true; track('work_detail_complete', { work_id: current.id }); }
    }

    body.addEventListener('scroll', function () {
      if (storyRaf) return;
      storyRaf = requestAnimationFrame(function () { storyRaf = 0; progress(); if (story) story(); });
    }, { passive: true });

    // 마무리 카드 버튼: 다음 작업 보기 / 목록으로
    body.addEventListener('click', function (e) {
      if (e.target.closest('.ds-close')) { close(); return; }
      if (!e.target.closest('.ds-next')) return;
      var all = $$('.works .work').filter(function (c) { return $('[data-detail]', c) && c.offsetParent !== null; });
      var i = all.indexOf(current);
      var next = all[(i + 1) % all.length];
      if (next && next !== current) open(next, $('[data-detail]', next));
    });

    // 작업 이름 링크(a[data-open]: How I Work·공고 전용 블록·타임라인 카드)는 해당 작업 상세보기를 바로 엽니다
    // (상세보기가 없는 작업은 링크대로 카드로 스크롤). 한 곳에서만 처리해 열기 이벤트가 두 번 쌓이지 않게 합니다.
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-open]'); if (!a) return;
      var card = document.getElementById(a.getAttribute('data-open'));
      if (!card || !$('.work-pages', card)) return;
      e.preventDefault(); open(card, a);
    });

    /* Slide artboards: a page column opens at full size above the viewer; click outside, × or Esc closes it */
    var zoom = null;
    function unzoom() { if (zoom) { zoom.remove(); zoom = null; } }
    function zoomIn(box) {
      unzoom();
      zoom = document.createElement('div');
      zoom.className = 'sl-zoom';
      zoom.setAttribute('data-lenis-prevent', '');
      zoom.innerHTML = '<button type="button" class="sl-zoom-x" aria-label="크게 보기 닫기">×</button>';
      var st = $('.sl-stack', box).cloneNode(true);
      zoom.appendChild(st);
      document.body.appendChild(zoom);
      playClips(zoom);
      var pct = parseFloat(box.getAttribute('data-pct')) || 0;
      requestAnimationFrame(function () { zoom.scrollTop = st.offsetHeight * pct / 100; });
      zoom.addEventListener('click', function (ev) { if (!st.contains(ev.target) || ev.target.closest('.sl-zoom-x')) unzoom(); });
      $('.sl-zoom-x', zoom).focus({ preventScroll: true });
    }
    body.addEventListener('click', function (e) {
      var box = e.target.closest && e.target.closest('.sl-box[data-zoom]');
      if (box) zoomIn(box);
    });
    body.addEventListener('keydown', function (e) {
      var box = e.target.closest && e.target.closest('.sl-box[data-zoom]');
      if (box && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); zoomIn(box); }
    });

    document.addEventListener('keydown', function (e) {
      if (dv.hidden) return;
      if (e.key === 'Escape' && zoom) { e.preventDefault(); unzoom(); return; }
      if (e.key === 'Escape') { e.preventDefault(); close(); }
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

/* About: one page shown as a miniature card (the page is laid out at screen size and scaled into the card).
   Scroll: the card zooms up to fill the screen → Profile holds → Career plays the 2019 → 2026 timeline sideways →
   Education → Skills (each slides up like the next section of a page) → the page zooms back down into the card.
   Sections taller than the screen pause on their title, then scroll through before the next one comes.
   The full-screen page sits under the site header (which never hides), so nothing slides under it. */
(function () {
  var wrap = document.querySelector('.ab-scroll'); if (!wrap) return;
  var frame = wrap.querySelector('.ab-frame'), win = wrap.querySelector('.ab-win'), page = wrap.querySelector('.ab-page'), track = wrap.querySelector('.ab-track');
  var secs = [].slice.call(track.children);
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vw = 0, vh = 0, hdH = 0, pageH = 0, card = null, plan = [], total = 0, ticking = false, stacked = false;
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  // GA4: an About section or a timeline year counts as seen once it stays on screen for 0.8 s (once per visit),
  // so passing through About on the way to another section (menu links, fast scrolling) does not count
  var sent = {}, wait = {};
  function seen(name, key, params, on) {
    var id = name + key;
    if (sent[id] || !window.pfTrack) return;
    if (!on) { clearTimeout(wait[id]); wait[id] = 0; }
    else if (!wait[id]) wait[id] = setTimeout(function () { sent[id] = 1; window.pfTrack(name, params); }, 800);
  }
  /* timeline inside the Career card (ported from PR #3) */
  var TL = (function () {
    var root = page.querySelector('.ab-tl'); if (!root) return null;
    var track = root.querySelector('.tl-track'), scenes = [].slice.call(root.querySelectorAll('.tl-scene'));
    var fill = root.querySelector('.tl-axis-fill'), list = root.querySelector('.tl-axis ol'), labels = [];
    var truck = root.querySelector('.tl-truck'), drive = truck ? truck.closest('.tl-scene') : null;
    var peds = drive ? [].slice.call(drive.querySelectorAll('.tl-ped')) : [], dlist = drive ? drive.querySelector('.tl-list') : null;
    var W = 0, total = 0, plan = [], K = 0.62, last = 0, fit = true;
    // 2024: the street takes the height left under the text (never under it); false when even the truck doesn't fit
    function fit2024(h) {
      if (!drive) return true;
      drive.style.removeProperty('--street-h');
      var bottom = 0;
      [drive.querySelector('.tl-addd-hd'), dlist].forEach(function (el) {
        if (el) bottom = Math.max(bottom, el.offsetTop + el.offsetHeight);
      });
      var pb = parseFloat(getComputedStyle(drive).paddingBottom) || 88;
      var room = h - pb - 4 - bottom - 20, need = (truck ? truck.offsetHeight : 90) + 34;   // truck + its tag
      var sh = Math.min(Math.max(150, Math.min(240, h * .26)), room);
      if (sh < need) return false;
      drive.style.setProperty('--street-h', Math.floor(sh) + 'px');
      return true;
    }
    scenes.forEach(function (s) { var li = document.createElement('li'); li.textContent = s.getAttribute('data-label') || ''; list.appendChild(li); labels.push(li); });
    function measure(w, h) {
      W = w; root.style.setProperty('--tl-w', W + 'px');
      fit = fit2024(h);
      var last = scenes[scenes.length - 1], maxX = Math.max(0, last.offsetLeft + last.offsetWidth - W), y = 0;
      plan = scenes.map(function (s, i) {
        var L = Math.min(s.offsetLeft, maxX), next = i < scenes.length - 1 ? Math.min(scenes[i + 1].offsetLeft, maxX) : maxX;
        // a scene taller than the screen holds at its top and its content scrolls up while it holds (at most 1:1 with the scroll),
        // done by 80% of the hold so the whole scene rests readable before the next one slides in
        var rd = 0, g = s !== drive && s.querySelector('.tl-grid');
        s.classList.remove('is-tall'); s.style.removeProperty('--rd');
        if (g) {
          var cs = getComputedStyle(s);
          rd = Math.max(0, Math.ceil(g.offsetHeight + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) - s.clientHeight));
          if (rd) s.classList.add('is-tall');
        }
        var p = { s: s, L: L, W: s.offsetWidth, y0: y, rd: rd, hold: Math.max((parseFloat(s.getAttribute('data-hold')) || 0) * h, rd / .8), items: [].slice.call(s.querySelectorAll('[data-at]')) };
        p.dx = Math.max(0, next - L); y += p.hold; p.m0 = y; y += p.dx * K; p.m1 = y;
        return p;
      });
      total = y + Math.round(h * .3);                                     // a short rest at the end, with the 2024 list in full view
      return total;
    }
    function update(y) {
      var x = 0, cur = 0, dh = 0; y = clamp(y, 0, total);
      plan.forEach(function (p, i) {
        if (y >= p.y0) { x = p.L + clamp((y - p.m0) / K, 0, p.dx); cur = i; }
        var h = p.hold ? clamp((y - p.y0) / p.hold, 0, 1) : (y >= p.y0 ? 1 : 0);
        p.s.style.setProperty('--h', h.toFixed(3));
        if (p.rd) p.s.style.setProperty('--rd', (Math.min(1, h / .8) * p.rd).toFixed(1));
        p.items.forEach(function (el) { el.classList.toggle('is-on', h >= (parseFloat(el.getAttribute('data-at')) || 0)); });
        if (p.s === drive) dh = h;
      });
      last = cur;
      track.style.transform = 'translate3d(' + (-x).toFixed(1) + 'px,0,0)';
      if (fill) fill.style.setProperty('--p', (total ? y / total : 0).toFixed(4));
      labels.forEach(function (li, i) { li.classList.toggle('is-on', i === cur); });
      if (!drive) return;
      var d = plan[scenes.indexOf(drive)], rel = x - d.L, tw = truck.offsetWidth;
      var spot = W * (0.1 + 0.42 * clamp(rel / Math.max(1, d.W - W), 0, 1));
      var tx = rel + (dh < 1 ? -tw + dh * (spot + tw) : spot);
      truck.style.setProperty('--tx', tx.toFixed(1) + 'px');
      truck.style.setProperty('--rot', (tx * 1.4).toFixed(1) + 'deg');
      peds.forEach(function (p, i) { byTruck[i] = tx + tw * 0.9 >= p.offsetLeft; mark(i); });
      if (dlist) dlist.classList.toggle('is-on', dlist.offsetLeft - rel < W * 0.85);
    }
    // 2024: a person gets a box when the truck has passed them or the PTZ camera has them in view
    var byTruck = [], byCam = [];
    function mark(i) { peds[i].classList.toggle('is-seen', !!(byTruck[i] || byCam[i])); }
    // PTZ camera on the billboard: pans left and right on its own while the timeline is showing
    var cam = drive ? drive.querySelector('.tl-cam') : null, lens = cam && cam.querySelector('.tl-lens'), cone = cam && cam.querySelector('.tl-cone');
    var near = false, sweepRaf = 0, t0 = 0; // only while the Career section is the one on screen (others are inert)
    function sweep(t) {
      sweepRaf = 0;
      if (!near || !cam) return;
      var r = drive.getBoundingClientRect();
      if (!root.closest('[inert]') && r.right > 0 && r.left < window.innerWidth) {
        if (!t0) t0 = t;
        var a = rm ? 0 : Math.sin((t - t0) / 1000 * 1.1) * 0.85; // ±49°, one sweep there and back in about 5.7 s
        cam.style.setProperty('--pan', a.toFixed(3) + 'rad');
        var l = lens.getBoundingClientRect(), lx = l.left + l.width / 2, ly = l.top + l.height / 2, R = cone.offsetHeight;
        peds.forEach(function (p, i) {
          var b = p.getBoundingClientRect(), px = b.left + b.width / 2, py = b.top + 8;
          var seen = Math.abs(Math.atan2(px - lx, py - ly) - a) < 0.3 && Math.hypot(px - lx, py - ly) < R;
          if (seen !== !!byCam[i]) { byCam[i] = seen; mark(i); }
        });
      }
      sweepRaf = requestAnimationFrame(sweep);
    }
    if (cam && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        near = es.some(function (e) { return e.isIntersecting; });
        if (near && !sweepRaf) sweepRaf = requestAnimationFrame(sweep);
      }).observe(root);
    }
    function report(on) { scenes.forEach(function (s, i) { seen('timeline_scene_view', i, { scene: s.getAttribute('data-label') || String(i) }, on && i === last); }); }
    // vertical story: the scene across the middle of the screen is the current one
    function pick(line) {
      for (var i = 0; i < scenes.length; i++) { var b = scenes[i].getBoundingClientRect(); if (b.top <= line && b.bottom > line) { last = i; return true; } }
      return false;
    }
    // back to the plain layout (no transforms or sizes left over from the sideways one)
    function reset() {
      track.style.transform = '';
      scenes.forEach(function (s) { s.style.removeProperty('--h'); s.style.removeProperty('--rd'); s.classList.remove('is-tall'); });
      if (drive) drive.style.removeProperty('--street-h');
      if (truck) { truck.style.removeProperty('--tx'); truck.style.removeProperty('--rot'); }
    }
    return { root: root, measure: measure, update: update, report: report, pick: pick, reset: reset, fits: function () { return fit; } };
  })();

  // the header's height once the page is scrolled (it turns frosted and a little shorter; it never hides)
  function headerHeight() {
    var hd = document.getElementById('top-header'); if (!hd) return 0;
    var was = hd.classList.contains('is-solid');
    hd.style.transition = 'none'; hd.classList.add('is-solid');
    var h = hd.offsetHeight;
    if (!was) hd.classList.remove('is-solid');
    void hd.offsetHeight; hd.style.transition = '';
    return h;
  }
  var career = TL ? TL.root.closest('.ab-card') : null;
  function layout() {
    wrap.classList.add('is-on');
    vw = document.documentElement.clientWidth; vh = window.innerHeight;
    hdH = headerHeight(); pageH = vh - hdH;
    var inner = wrap.parentElement.getBoundingClientRect();           // the About .wrap: content column of the site
    var cs = getComputedStyle(wrap.parentElement);
    var colL = inner.left + parseFloat(cs.paddingLeft), colW = inner.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    page.style.setProperty('--pg-w', vw + 'px'); page.style.setProperty('--pg-h', pageH + 'px');
    page.style.setProperty('--pg-x', Math.round(colL) + 'px'); page.style.setProperty('--pg-t', Math.round(Math.max(24, Math.min(56, vh * .06))) + 'px');
    // card: same proportions as the page (the screen under the header), as wide as the content column
    var top = hdH + (vw < 640 ? 12 : 24), maxH = vh - top - (vw < 640 ? 12 : 32);
    var w = Math.min(colW, maxH * vw / pageH), h = w * pageH / vw;
    card = { l: (vw - w) / 2, t: top, w: w, h: h, r: vw < 640 ? 20 : 28 };
    // Career: the sideways timeline when it fits the screen, otherwise the same scenes as a vertical story
    var tlLen = 0; stacked = false;
    if (TL) {
      career.classList.remove('is-stack'); TL.root.classList.add('tl-on');
      tlLen = TL.measure(vw, pageH);
      if (!TL.fits()) { stacked = true; TL.root.classList.remove('tl-on'); career.classList.add('is-stack'); TL.reset(); }
    }
    // scroll plan
    var E = Math.round(vh * .7), HOLD = Math.round(vh * .45), PEEK = Math.round(pageH * .22);
    plan = []; total = 0;
    function seg(kind, len, a, b, extra) { plan.push({ kind: kind, y0: total, len: Math.max(1, len), a: a, b: b, extra: extra }); total += Math.max(1, len); }
    var offs = [], o = 0;
    secs.forEach(function (sct) { offs.push(o); o += sct.offsetHeight; });
    seg('zoom', E, 0, 1);
    secs.forEach(function (sct, i) {
      var hgt = sct.offsetHeight;
      if (i > 0) seg('move', pageH, offs[i] - pageH, offs[i]);             // next section slides up, 1:1 with the scroll
      if (hgt > pageH + 1) {
        seg('hold', PEEK, offs[i], offs[i]);                                // a tall section pauses on its title first
        seg('move', hgt - pageH, offs[i], offs[i] + hgt - pageH);           // then reads through
      }
      if (sct.querySelector('.ab-tl') && TL && !stacked) seg('tl', tlLen, offs[i], offs[i]);
      else seg('hold', i === secs.length - 1 ? HOLD * .6 : HOLD, offs[i] + Math.max(0, hgt - pageH), offs[i] + Math.max(0, hgt - pageH));
    });
    // shrinking back into the card, the page slides back to the last section's title (the card never shows a cut-off title)
    var last = plan[plan.length - 1].b;
    seg('unzoom', E, last, offs[secs.length - 1]);
    wrap.style.height = Math.round(total + vh) + 'px';
    wrap.abPlan = plan;
    update();
  }
  function update() {
    ticking = false;
    var top = -wrap.getBoundingClientRect().top, live = top >= 0 && top <= total, kind = '';
    var y = clamp(top, 0, total), x = 0, ty = 0, cur = 0;
    for (var k = 0; k < plan.length; k++) {
      var p = plan[k]; if (y < p.y0 && k) break;
      kind = p.kind;
      var t = clamp((y - p.y0) / p.len, 0, 1);
      if (p.kind === 'zoom') { x = ease(t); ty = 0; }
      else if (p.kind === 'unzoom') { x = 1 - ease(t); ty = lerp(p.a, p.b, ease(Math.min(1, t / .5))); }
      else { x = 1; ty = p.kind === 'move' ? lerp(p.a, p.b, t) : p.a; }
      if (p.kind === 'tl') TL.update(y - p.y0);
    }
    if (TL && !stacked && y < plan[0].len) TL.update(0);
    if (TL) TL.report(live && (kind === 'tl' || (stacked && x > .9 && TL.pick(hdH + pageH * .5))));
    var fx = frame.getBoundingClientRect().left;
    var l = lerp(card.l, 0, x) - fx, tp = lerp(card.t, hdH, x), w = lerp(card.w, vw, x), h = lerp(card.h, pageH, x);
    win.style.left = l.toFixed(1) + 'px'; win.style.top = tp.toFixed(1) + 'px';
    win.style.width = w.toFixed(1) + 'px'; win.style.height = h.toFixed(1) + 'px';
    win.style.borderRadius = (card.r * (1 - x)).toFixed(1) + 'px';
    page.style.transform = 'scale(' + (w / vw).toFixed(5) + ')';
    track.style.transform = 'translate3d(0,' + (-ty).toFixed(1) + 'px,0)';
    // only the section in view can take focus
    secs.forEach(function (sct, i) {
      var top = sct.offsetTop - ty, vis = top < pageH * .5 && top + sct.offsetHeight > pageH * .5;
      if (vis) sct.removeAttribute('inert'); else sct.setAttribute('inert', '');
      seen('about_section_view', i, { section: (sct.className.match(/\bab-(?!card\b)([a-z]+)/) || [])[1] || String(i) }, live && vis && x > .9);
    });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  var rt, lw = window.innerWidth, lh = window.innerHeight;
  window.addEventListener('resize', function () {
    if (window.innerWidth === lw && Math.abs(window.innerHeight - lh) < 120) return;
    lw = window.innerWidth; lh = window.innerHeight; clearTimeout(rt); rt = setTimeout(layout, 150);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  window.addEventListener('load', layout);
  layout();
})();
