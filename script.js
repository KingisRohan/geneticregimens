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

  // ---- Consultation enquiry form ----
  // Every consultation CTA on the site opens this form. Name, Location,
  // Date of Birth, and WhatsApp Number are sent to a Google Form, which
  // records them into a linked Google Sheet in Drive. There is no WhatsApp
  // handoff: submitting the form is the entire enquiry, and the visitor
  // sees a confirmation right in the modal.
  (function () {
    var GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSen74VqhmGCu86Nkl-iZnoCQx-W7tSOPJ--MXyXdWsC-y8glw/formResponse';
    var FIELD_NAME = 'entry.23463595';
    var FIELD_LOCATION = 'entry.975406406';
    var FIELD_DOB = 'entry.969334037';
    var FIELD_PHONE = 'entry.2033626420';

    var ctaLinks = Array.prototype.slice.call(document.querySelectorAll('.js-consult-cta'));
    if (ctaLinks.length === 0) return;

    var overlay = document.createElement('div');
    overlay.className = 'gr-modal-overlay';
    overlay.id = 'grModalOverlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<div class="gr-modal" role="dialog" aria-modal="true" aria-labelledby="grModalTitle">' +
        '<button type="button" class="gr-modal-close" id="grModalClose" aria-label="Close">&times;</button>' +
        '<div id="grModalFormView">' +
          '<span class="label eyebrow">Start Your Consultation</span>' +
          '<h3 id="grModalTitle">Tell us a bit about you.</h3>' +
          '<p class="gr-modal-sub">We record every enquiry ourselves and reach out directly.</p>' +
          '<form id="grConsultForm" novalidate>' +
            '<div class="gr-field"><label for="grName">Name</label><input type="text" id="grName" required autocomplete="name"></div>' +
            '<div class="gr-field"><label for="grLocation">Location</label><input type="text" id="grLocation" required autocomplete="address-level2"></div>' +
            '<div class="gr-field"><label for="grDob">Date of Birth</label><input type="date" id="grDob" required autocomplete="bday"></div>' +
            '<div class="gr-field"><label for="grPhone">WhatsApp Number</label><input type="tel" id="grPhone" required autocomplete="tel" placeholder="e.g. 9876543210"></div>' +
            '<button type="submit" class="btn btn-primary gr-modal-submit">Send Enquiry</button>' +
          '</form>' +
        '</div>' +
        '<div id="grModalSuccessView" class="gr-modal-success" hidden>' +
          '<span class="label eyebrow">Received</span>' +
          '<h3>Thank you.</h3>' +
          '<p class="gr-modal-sub">Your details have been recorded. Siddhesh will reach out to you directly.</p>' +
          '<button type="button" class="btn btn-ghost gr-modal-done" id="grModalDone">Close</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var closeBtn = document.getElementById('grModalClose');
    var doneBtn = document.getElementById('grModalDone');
    var form = document.getElementById('grConsultForm');
    var formView = document.getElementById('grModalFormView');
    var successView = document.getElementById('grModalSuccessView');

    function openModal() {
      formView.hidden = false;
      successView.hidden = true;
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('gr-modal-lock');
      var nameInput = document.getElementById('grName');
      if (nameInput) { setTimeout(function () { nameInput.focus(); }, 50); }
    }

    function closeModal() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('gr-modal-lock');
    }

    ctaLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    closeBtn.addEventListener('click', closeModal);
    doneBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) { closeModal(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) { closeModal(); }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('grName').value.trim();
      var location = document.getElementById('grLocation').value.trim();
      var dob = document.getElementById('grDob').value;
      var phone = document.getElementById('grPhone').value.trim();

      if (!name || !location || !dob || !phone) {
        form.reportValidity();
        return;
      }

      var body = new URLSearchParams();
      body.append(FIELD_NAME, name);
      body.append(FIELD_LOCATION, location);
      body.append(FIELD_DOB, dob);
      body.append(FIELD_PHONE, phone);

      fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      }).catch(function () {
        // Network hiccup — the enquiry may not have recorded, but the
        // visitor still sees a confirmation rather than getting stuck.
      });

      form.reset();
      formView.hidden = true;
      successView.hidden = false;
    });
  })();

});
