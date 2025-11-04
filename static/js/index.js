// === DARK MODE TOGGLE ===
  const html = document.documentElement;
  const toggleButton = document.getElementById('theme-toggle');
  const mobileToggleButton = document.getElementById('mobile-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');

  const savedTheme = localStorage.getItem('theme');
  // Only start in dark mode if the user explicitly saved 'dark'.
  // This forces the default to light mode even if the OS prefers dark.
  const startDark = savedTheme === 'dark';

  function updateTheme(willBeDark) {
    html.classList.toggle('dark', willBeDark);
    themeIcon.textContent = willBeDark ? 'light_mode' : 'dark_mode';
    mobileThemeIcon.textContent = willBeDark ? 'light_mode' : 'dark_mode';
    localStorage.setItem('theme', willBeDark ? 'dark' : 'light');
  }

  if (startDark) {
    updateTheme(true);
  }

  toggleButton?.addEventListener('click', () => {
    updateTheme(!html.classList.contains('dark'));
  });

  mobileToggleButton?.addEventListener('click', () => {
    updateTheme(!html.classList.contains('dark'));
  });

  // === LOGO SWITCH (if you have it) ===
  const logoImg = document.querySelector('.logo-switch');
  if (logoImg) {
    const lightSrc = logoImg.src;
    const darkSrc = logoImg.dataset.darkSrc;
    const updateLogo = () => {
      const isDark = html.classList.contains('dark');
      logoImg.src = isDark ? darkSrc : lightSrc;
    };
    updateLogo();
    toggleButton?.addEventListener('click', updateLogo);
  }

  // === SMOOTH SCROLL + CLOSE MOBILE MENU ===
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        // account for fixed header
        const header = document.getElementById('site-header');
        const headerOffset = header ? header.offsetHeight : 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8; // small gap
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        // Close mobile/desktop menu
        const menu = document.getElementById('mobile-menu');
        if (menu) {
          menu.classList.remove('open');
        }
        // reset any menu buttons icons
        document.querySelectorAll('#mobile-menu-btn span, #desktop-menu-btn span').forEach(s => s.textContent = 'menu');
      }
    });
  });

  // === ACTIVE SECTION HIGHLIGHT ===
  const sections = document.querySelectorAll('section[id], div[id^=home], div[id^=projects]');
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  const updateActive = () => {
    let current = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 150) current = sec.id;
    });

    allNavLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  };

  window.addEventListener('scroll', updateActive);
  updateActive(); // on load

  // === MENU TOGGLE (supports mobile + desktop button)
  const menuBtns = Array.from(document.querySelectorAll('#mobile-menu-btn, #desktop-menu-btn'));
  const mobileMenu = document.getElementById('mobile-menu');
  let closeTimeout;

  const openMenu = (btn) => {
    clearTimeout(closeTimeout);
    mobileMenu.classList.add('open');
    const span = btn?.querySelector('span');
    if (span) {
      span.textContent = 'close';
      span.style.transform = 'rotate(180deg)';
    }
  };

  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    menuBtns.forEach(b => {
      const s = b.querySelector('span');
      if (s) { s.textContent = 'menu'; s.style.transform = 'rotate(0)'; }
    });
  };

  menuBtns.forEach(btn => {
    // click toggles
    btn?.addEventListener('click', () => {
      if (!mobileMenu) return;
      if (mobileMenu.classList.contains('open')) closeMenu();
      else openMenu(btn);
    });

    // hover opens (good for desktop)
    btn?.addEventListener('mouseenter', () => openMenu(btn));
    btn?.addEventListener('mouseleave', () => { closeTimeout = setTimeout(closeMenu, 300); });
  });

  mobileMenu?.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
  mobileMenu?.addEventListener('mouseleave', () => { closeTimeout = setTimeout(closeMenu, 300); });
