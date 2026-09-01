// ============================================================
// GENETIC REGIMENS — site behaviour
// Plain JS, no build step, no external dependencies.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu after tapping a link (mobile)
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Scroll reveal ----
  // Elements start fully visible (see CSS). Only once we know JS and
  // IntersectionObserver both work do we prime an element to fade in —
  // this way a slow network or a JS error never leaves content hidden.
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pre');
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      // Only prime (hide-then-fade) elements currently below the fold.
      // Anything already visible on load stays visible, no flash of blank content.
      if (rect.top > window.innerHeight * 0.85) {
        el.classList.add('reveal-pre');
      }
      io.observe(el);
    });
  }
  // No else needed: without IntersectionObserver support, elements simply
  // never get reveal-pre added, so they remain visible by default.

  // ---- Helix spine draw-in on scroll ----
  var helixPath = document.getElementById('helix-a');
  if (helixPath) {
    var pathLength = helixPath.getTotalLength();
    helixPath.style.strokeDasharray = pathLength;
    helixPath.style.strokeDashoffset = pathLength;

    var updateHelix = function () {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = docHeight > 0 ? window.scrollY / docHeight : 0;
      var offset = pathLength - Math.min(scrolled, 1) * pathLength;
      helixPath.style.strokeDashoffset = offset;
    };

    updateHelix();
    window.addEventListener('scroll', updateHelix, { passive: true });
    window.addEventListener('resize', updateHelix);
  }

  // ---- Lightweight local visit counter (privacy-friendly, no external service) ----
  // Note: this counts on-device only. Swap for Google Analytics / Plausible
  // once a real analytics account is wired up — see DECISIONS.md.
  try {
    var key = 'gr_visit_count';
    var count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, String(count));
  } catch (e) {
    // localStorage unavailable (private browsing etc.) — fail silently
  }

});
