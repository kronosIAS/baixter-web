// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── SMOOTH SCROLL for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── FADE-IN ON SCROLL ──
const fadeEls = document.querySelectorAll(
  '.service-card, .advantage-card, .testimonial-card, .step, .hero-stats, .section-header, .contact-method, .sector-node'
);

fadeEls.forEach((el, i) => {
  el.classList.add('fade-in');
  // Stagger cards in grids
  const parent = el.parentElement;
  const siblings = [...parent.children].filter(c => c.classList.contains(el.classList[0]));
  const idx = siblings.indexOf(el);
  if (idx > 0) el.classList.add(`fade-in-delay-${Math.min(idx, 3)}`);
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Basic validation
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      valid = false;
      field.style.borderColor = '#e85050';
      field.addEventListener('input', () => (field.style.borderColor = ''), { once: true });
    }
  });

  if (!valid) return;

  // Simulate form submit (replace with real endpoint)
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  const lang = window.currentLang || 'ca';
  const sendingText = (window.i18nData && window.i18nData[lang]) ? window.i18nData[lang]['contact.form.sending'] : 'Enviant…';
  submitBtn.querySelector('span').textContent = sendingText;

  setTimeout(() => {
    formSuccess.classList.add('visible');
    form.reset();
    submitBtn.disabled = false;
    const lang = window.currentLang || 'ca';
    const submitText = (window.i18nData && window.i18nData[lang]) ? window.i18nData[lang]['contact.form.submit'] : 'Enviar sol·licitud gratuïta';
    submitBtn.innerHTML = `<span>${submitText}</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    setTimeout(() => formSuccess.classList.remove('visible'), 6000);
  }, 1200);
});
