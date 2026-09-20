// ============================================================
// Mobile menu toggle
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const menu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    toggle.classList.add('is-active');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-active');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  function toggleMenu() {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener('click', toggleMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close when any link inside menu is clicked
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close on backdrop click (clicking the menu background, not its content)
  menu.addEventListener('click', function (e) {
    if (e.target === menu) {
      closeMenu();
    }
  });

  // Close menu if window resized back to desktop
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 900 && menu.classList.contains('is-open')) {
        closeMenu();
      }
    }, 100);
  });
});


// ============================================================
// Prevent duplicate valuation form submissions
// ============================================================
// Some visitors (often on mobile, sometimes on a carrier network that
// rotates their IP) end up submitting the exact same valuation request
// more than once, days apart. This keeps a fingerprint of the last
// submission in the visitor's own browser storage: if they somehow
// submit the identical info again, we skip creating a second Netlify
// form entry but still show the normal confirmation page, so nothing
// looks different or broken to them. A genuinely different submission
// (new details, or more than 60 days later) always goes through.

document.addEventListener('DOMContentLoaded', function () {
  var valuationForm = document.querySelector('form[name="valuation"]');
  if (!valuationForm) return;

  var STORAGE_KEY = 'valuationLastSubmission';
  var EXPIRY_MS = 60 * 24 * 60 * 60 * 1000; // 60 days

  function hashString(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString(36);
  }

  function getSubmissionFingerprint() {
    var fields = ['firstName', 'lastName', 'company', 'email', 'phone', 'segment', 'revenue', 'timeline', 'notes'];
    var values = fields.map(function (name) {
      var el = valuationForm.elements[name];
      return el ? String(el.value || '').trim().toLowerCase() : '';
    });
    return hashString(values.join('|'));
  }

  valuationForm.addEventListener('submit', function (e) {
    var fingerprint = getSubmissionFingerprint();
    var stored = null;
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (err) {
      stored = null;
    }

    var isRecentDuplicate = stored && stored.fingerprint === fingerprint && (Date.now() - stored.ts) < EXPIRY_MS;

    if (isRecentDuplicate) {
      e.preventDefault();
      window.location.href = '/thank-you';
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ fingerprint: fingerprint, ts: Date.now() }));
    } catch (err) {
      // localStorage unavailable (e.g. private browsing) - let the submission through normally.
    }
  });
});
