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
