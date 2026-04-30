/* ============================================
   CONSOLID — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL REVEAL ──────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── NAV ACTIVE LINK ON SCROLL ──────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // ── NAV BACKGROUND ON SCROLL ──────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 60
      ? 'rgba(10,10,10,0.95)'
      : 'rgba(13,13,13,0.75)';
  });

  // ── HAMBURGER MOBILE MENU ─────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ── IMAGE SLIDERS ─────────────────────────────────────
  document.querySelectorAll('.slider-dots').forEach(dotsEl => {
    const sliderId = dotsEl.dataset.slider;
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const images = slider.querySelectorAll('img');
    const dots = dotsEl.querySelectorAll('.dot');
    let current = 0;

    const goTo = (idx) => {
      current = idx;
      // Slide by transforming
      slider.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    // Enable CSS transform on the flex container
    slider.style.transition = 'transform 0.5s ease';
    slider.style.display = 'flex';
    slider.style.transform = 'translateX(0)';
    images.forEach(img => { img.style.flexShrink = '0'; img.style.width = '100%'; });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Auto-advance every 3.5s
    let interval = setInterval(() => goTo((current + 1) % images.length), 3500);
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => {
      interval = setInterval(() => goTo((current + 1) % images.length), 3500);
    });
  });

  // ── VIDEO PLAY ────────────────────────────────────────
  const playBtn = document.getElementById('playBtn');
  const demoVideo = document.getElementById('demoVideo');
  const videoWrap = document.querySelector('.video-wrap');

  if (playBtn && demoVideo && videoWrap) {
    playBtn.addEventListener('click', () => {
      const overlay = videoWrap.querySelector('.video-overlay');
      const thumb = videoWrap.querySelector('.video-thumb');
      if (overlay) overlay.style.display = 'none';
      if (thumb) thumb.style.display = 'none';
      demoVideo.style.display = 'block';
      demoVideo.play();
    });
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── FAQ CLOSE OTHER OPEN DETAILS ─────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        document.querySelectorAll('.faq-item[open]').forEach(other => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

});
