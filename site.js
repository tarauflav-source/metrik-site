// Metrik — interactions légères
(function () {
  document.documentElement.classList.add('js');

  // Sticky header background on scroll
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile drawer
  var drawer = document.querySelector('.mobile-drawer');
  var openBtn = document.querySelector('.hamburger');
  var closeBtn = document.querySelector('.drawer-close');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (openBtn) openBtn.addEventListener('click', function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setDrawer(false); });
    });
  }

  // FAQ accordion — single open
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      items.forEach(function (other) {
        other.classList.remove('open');
        var oa = other.querySelector('.faq-a');
        if (oa) oa.style.maxHeight = null;
        var oq = other.querySelector('.faq-q');
        if (oq) oq.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Reveal on scroll — scroll/load based for reliability
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function revealVisible() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = reveals.length - 1; i >= 0; i--) {
      var el = reveals[i];
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add('in');
        reveals.splice(i, 1);
      }
    }
  }
  revealVisible();
  window.addEventListener('scroll', revealVisible, { passive: true });
  window.addEventListener('resize', revealVisible, { passive: true });
  window.addEventListener('load', revealVisible);
  // Safety net: reveal everything after 1.8s no matter what
  window.setTimeout(function () {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }, 1800);
})();
