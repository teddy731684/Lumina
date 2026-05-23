'use strict';

/* =====================================================
   LUMINA INTERIORS — script.js
   ===================================================== */

const SUN_SVG = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const MOON_SVG = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initScrollAnimations();
  initStatsCounter();
  initPortfolioFilter();
  initLightbox();
  initCarousel();
  initForm();
  initBackToTop();
});

/* =====================================================
   NAVBAR
   ===================================================== */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !navbar.contains(e.target)) {
      closeMobileNav();
    }
  });

  function closeMobileNav() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
}

/* =====================================================
   THEME TOGGLE
   ===================================================== */
function initThemeToggle() {
  const btn   = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('themeToggle');
  btn.innerHTML = theme === 'dark' ? SUN_SVG : MOON_SVG;
  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

/* =====================================================
   SCROLL FADE-IN ANIMATIONS
   ===================================================== */
function initScrollAnimations() {
  // Stagger children of these groups
  document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
  });
  document.querySelectorAll('.stats-grid .stat-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* =====================================================
   STATS COUNTER
   ===================================================== */
function initStatsCounter() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.counted) return;
      el.dataset.counted = 'true';
      animateCounter(el);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item[data-target]').forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const suffix   = el.dataset.suffix || '';
  const numEl    = el.querySelector('.stat-number');
  const duration = 2000;
  const start    = performance.now();

  function easeOutQuad(t) { return t * (2 - t); }

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    numEl.textContent = Math.ceil(easeOutQuad(progress) * target) + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

/* =====================================================
   PORTFOLIO FILTER
   ===================================================== */
function initPortfolioFilter() {
  const buttons  = document.querySelectorAll('.filter-btn');
  const items    = document.querySelectorAll('.portfolio-item');
  const FADE_MS  = 400;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) {
          // Un-hide: restore display first, then fade in
          item.style.display = '';
          requestAnimationFrame(() => item.classList.remove('hidden'));
        } else {
          // Fade out, then remove from layout
          item.classList.add('hidden');
          setTimeout(() => {
            if (item.classList.contains('hidden')) item.style.display = 'none';
          }, FADE_MS);
        }
      });
    });
  });
}

/* =====================================================
   LIGHTBOX
   ===================================================== */
let lbItems     = [];
let lbIndex     = 0;
let lbKeydown   = null;
let savedScrollY = 0;

function initLightbox() {
  const lightbox  = document.getElementById('lightbox');
  const img       = document.getElementById('lightboxImg');
  const caption   = document.getElementById('lightboxCaption');
  const closeBtn  = document.getElementById('lightboxClose');
  const prevBtn   = document.getElementById('lightboxPrev');
  const nextBtn   = document.getElementById('lightboxNext');
  const grid      = document.getElementById('portfolioGrid');

  grid.addEventListener('click', e => {
    const item = e.target.closest('.portfolio-item');
    if (!item || item.style.display === 'none') return;

    // Build array from currently visible items only
    const visible = Array.from(document.querySelectorAll('.portfolio-item'))
      .filter(el => el.style.display !== 'none' && !el.classList.contains('hidden'));

    lbItems = visible.map(el => ({
      src:      el.dataset.full,
      title:    el.dataset.title,
      category: el.dataset.category,
    }));
    lbIndex = visible.indexOf(item);
    openLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click',  () => navigate(-1));
  nextBtn.addEventListener('click',  () => navigate(1));

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  function openLightbox() {
    showItem(lbIndex);
    lightbox.hidden = false;
    lockScroll();
    lbKeydown = e => {
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   navigate(-1);
      if (e.key === 'ArrowRight')  navigate(1);
    };
    document.addEventListener('keydown', lbKeydown);
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    unlockScroll();
    if (lbKeydown) {
      document.removeEventListener('keydown', lbKeydown);
      lbKeydown = null;
    }
  }

  function navigate(dir) {
    lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length;
    showItem(lbIndex);
  }

  function showItem(i) {
    const { src, title, category } = lbItems[i];
    img.src = src;
    img.alt = title;
    caption.textContent = `${title}  ·  ${category.replace('-', ' ')}`;
  }
}

function lockScroll() {
  savedScrollY = window.scrollY;
  const sbWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = sbWidth + 'px';
  document.body.style.overflow     = 'hidden';
  // iOS Safari: prevent elastic scrolling leaking through
  document.body.style.position     = 'fixed';
  document.body.style.width        = '100%';
  document.body.style.top          = `-${savedScrollY}px`;
}

function unlockScroll() {
  document.body.style.paddingRight = '';
  document.body.style.overflow     = '';
  document.body.style.position     = '';
  document.body.style.width        = '';
  document.body.style.top          = '';
  window.scrollTo(0, savedScrollY);
}

/* =====================================================
   TESTIMONIAL CAROUSEL
   ===================================================== */
function initCarousel() {
  const track   = document.getElementById('carouselTrack');
  const dots    = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevArrow');
  const nextBtn = document.getElementById('nextArrow');
  const wrapper = track.closest('.carousel-wrapper');

  const slides  = Array.from(track.querySelectorAll('.testimonial-slide'));
  const total   = slides.length;
  let current   = 0;
  let timer     = null;

  // Generate dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.setAttribute('aria-selected', String(i === 0));
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
    dots.appendChild(dot);
  });

  // Set initial aria-hidden on non-active slides
  slides.forEach((s, i) => { if (i !== 0) s.setAttribute('aria-hidden', 'true'); });

  function goTo(index) {
    slides[current].setAttribute('aria-hidden', 'true');
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      const active = i === current;
      d.classList.toggle('active', active);
      d.setAttribute('aria-selected', String(active));
    });

    slides[current].removeAttribute('aria-hidden');
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  wrapper.addEventListener('mouseenter', () => clearInterval(timer));
  wrapper.addEventListener('mouseleave', startTimer);

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    document.hidden ? clearInterval(timer) : startTimer();
  });

  // Swipe support
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(current + (diff > 0 ? 1 : -1)); resetTimer(); }
  }, { passive: true });

  startTimer();
}

/* =====================================================
   ENQUIRY FORM
   ===================================================== */
function initForm() {
  const form      = document.getElementById('enquiryForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const btnText   = submitBtn.querySelector('.btn-text');
  const spinner   = submitBtn.querySelector('.btn-spinner');

  // Live validation: clear error when user types
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => clearError(field));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const payload = {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      phone:   form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const res  = await fetch('https://formsubmit.co/ajax/teddy01190@gmail.com', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success === 'true' || json.success === true) {
        showToast("Message sent! We'll be in touch within 24 hours.", 'success');
        if ('speechSynthesis' in window) {
          const utter = new SpeechSynthesisUtterance('HURRAY, YOUR FORM IS SUBMITTED SUCCESSFULLY');
          window.speechSynthesis.speak(utter);
        }
        form.reset();
        clearAllErrors();
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      showToast('Something went wrong. Please try again or email us directly.', 'error');
    } finally {
      setLoading(false);
    }
  });

  function setLoading(on) {
    submitBtn.disabled = on;
    btnText.hidden     = on;
    spinner.hidden     = !on;
  }

  function validate() {
    let ok = true;

    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const phone   = form.querySelector('#phone');
    const message = form.querySelector('#message');

    if (!name.value.trim()) {
      setError(name, 'Please enter your full name.');
      ok = false;
    }
    if (!email.value.trim()) {
      setError(email, 'Please enter your email address.');
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setError(email, 'Please enter a valid email address.');
      ok = false;
    }
    if (phone.value.trim() && !/^[\+\d\s\-\(\)]{7,}$/.test(phone.value.trim())) {
      setError(phone, 'Please enter a valid phone number.');
      ok = false;
    }
    if (!message.value.trim()) {
      setError(message, 'Please tell us about your project.');
      ok = false;
    }

    return ok;
  }

  function setError(field, msg) {
    field.classList.add('invalid');
    const err = field.parentElement.querySelector('.field-error');
    if (err) err.textContent = msg;
  }

  function clearError(field) {
    field.classList.remove('invalid');
    const err = field.parentElement.querySelector('.field-error');
    if (err) err.textContent = '';
  }

  function clearAllErrors() {
    form.querySelectorAll('.invalid').forEach(f => f.classList.remove('invalid'));
    form.querySelectorAll('.field-error').forEach(e => e.textContent = '');
  }
}

/* =====================================================
   TOAST NOTIFICATIONS
   ===================================================== */
function showToast(msg, type) {
  const container = document.getElementById('toastContainer');
  const toast     = document.createElement('div');
  toast.className = `toast toast-${type || 'success'}`;
  toast.textContent = msg;
  container.appendChild(toast);

  // Double rAF ensures transition plays
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('visible')));

  setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 4500);
}

/* =====================================================
   BACK TO TOP
   ===================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 400;
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
