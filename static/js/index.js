// === DARK MODE TOGGLE ===
  const html = document.documentElement;
  const toggleButton = document.getElementById('theme-toggle');
  const mobileToggleButton = document.getElementById('mobile-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const startDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

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
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu
        const menu = document.getElementById('mobile-menu');
        const btn = document.getElementById('mobile-menu-btn');
        if (menu && btn) {
          menu.classList.remove('open');
          btn.querySelector('span').textContent = 'menu';
        }
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

  // === MOBILE MENU TOGGLE ===
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = mobileBtn?.querySelector('span');
  let closeTimeout;

  const openMenu = () => {
    clearTimeout(closeTimeout);
    mobileMenu.classList.add('open');
    menuIcon.textContent = 'close';
    menuIcon.style.transform = 'rotate(180deg)';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    menuIcon.textContent = 'menu';
    menuIcon.style.transform = 'rotate(0)';
  };

  // Handle click events
  mobileBtn?.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Handle hover events
  mobileBtn?.addEventListener('mouseenter', openMenu);
  
  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    closeTimeout = setTimeout(closeMenu, 300);
  };

  mobileBtn?.addEventListener('mouseleave', handleMouseLeave);
  mobileMenu?.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
  mobileMenu?.addEventListener('mouseleave', handleMouseLeave);
