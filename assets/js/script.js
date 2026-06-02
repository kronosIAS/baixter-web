// ── HELPER i18n PER ELEMENT ──
// (definit a translations.js: window.applyI18nElement)
function applyI18nTo(el) {
  if (el && window.applyI18nElement) window.applyI18nElement(el);
}

// ── ROUTER MÀQUINA ──
const ROUTES = ['serveis', 'avantatges', 'com-funciona', 'a-qui-servim', 'atencio', 'contacte'];
const home = document.getElementById('home');
const display = document.getElementById('display');
const tray = document.getElementById('tray');
const capsule = document.getElementById('capsule');
const panels = {};
ROUTES.forEach(r => { panels[r] = document.getElementById(r); });

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setDisplay(eyebrowKey, mainText) {
  if (!display) return;
  const eb = display.querySelector('.display-eyebrow');
  const mn = display.querySelector('.display-main');
  if (eb) { eb.setAttribute('data-i18n', eyebrowKey); applyI18nTo(eb); }
  if (mn) { mn.textContent = mainText; mn.removeAttribute('data-i18n'); }
}

function resetDisplay() {
  if (!display) return;
  const eb = display.querySelector('.display-eyebrow');
  const mn = display.querySelector('.display-main');
  if (eb) { eb.setAttribute('data-i18n', 'machine.displayEyebrow'); applyI18nTo(eb); }
  if (mn) { mn.setAttribute('data-i18n', 'machine.displayIdle'); applyI18nTo(mn); }
  display.classList.remove('is-dispensing');
}

// Mostra una vista sense animació (deep-link, back/forward)
function render(route) {
  const valid = ROUTES.includes(route);
  if (home) home.hidden = valid;
  ROUTES.forEach(r => { if (panels[r]) panels[r].hidden = (r !== route); });

  if (valid) {
    const content = panels[route].querySelector('.panel-content');
    if (content) content.focus();
    window.scrollTo(0, 0);
  } else {
    resetDisplay();
    document.querySelectorAll('.vbtn').forEach(b => b.classList.remove('is-active'));
  }
}

// Navegació no animada + sincronització d'historial
function navigate(route, { push = true } = {}) {
  render(route);
  const hash = ROUTES.includes(route) ? '#' + route : '#home';
  if (push) history.pushState({ route }, '', hash);
}

// ── ANIMACIÓ DE DISPENSAT ──
function labelFor(route) {
  const btn = document.querySelector(`.vbtn[data-route="${route}"] .vbtn-label`);
  return btn ? btn.textContent.trim() : '';
}

function revealPanel(route) {
  if (home) home.hidden = true;
  ROUTES.forEach(r => { if (panels[r]) panels[r].hidden = (r !== route); });
  const content = panels[route] ? panels[route].querySelector('.panel-content') : null;
  if (content) content.focus();
  window.scrollTo(0, 0);
}

function afterReveal(route) {
  history.pushState({ route }, '', '#' + route);
  if (capsule) capsule.classList.remove('drop');
  if (tray) tray.classList.remove('flash');
  if (display) display.classList.remove('is-dispensing');
}

function dispense(route) {
  if (!ROUTES.includes(route)) { navigate(route); return; }

  const btn = document.querySelector(`.vbtn[data-route="${route}"]`);
  if (btn) btn.classList.add('is-active');

  const lang = window.currentLang || 'ca';
  const dispensingTxt = (window.i18nData && window.i18nData[lang] && window.i18nData[lang]['machine.dispensing']) || 'Dispensant…';
  setDisplay('machine.displayEyebrow', `${dispensingTxt} ${labelFor(route)}`);
  if (display) display.classList.add('is-dispensing');

  if (prefersReduced) {
    revealPanel(route);
    if (panels[route]) {
      panels[route].classList.add('is-entering');
      setTimeout(() => panels[route].classList.remove('is-entering'), 300);
    }
    afterReveal(route);
    return;
  }

  if (capsule) capsule.classList.add('drop');
  if (tray) tray.classList.add('flash');
  setTimeout(() => {
    revealPanel(route);
    if (panels[route]) {
      panels[route].classList.add('is-entering');
      setTimeout(() => { if (panels[route]) panels[route].classList.remove('is-entering'); }, 600);
    }
    afterReveal(route);
  }, 550);
}

// Clic en botó de la màquina → camí animat (dispensat)
document.querySelectorAll('.vbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const route = btn.dataset.route;
    dispense(route);
  });
});

// "Tornar a la màquina" → torna a la home (no animat)
document.querySelectorAll('[data-back]').forEach(b => {
  b.addEventListener('click', () => navigate('home'));
});

// Back / forward del navegador → render sense animació
window.addEventListener('popstate', () => {
  const route = location.hash.replace('#', '') || 'home';
  render(ROUTES.includes(route) ? route : 'home');
});

// Càrrega inicial (deep-link) → render sense animació
(function initRoute() {
  const route = location.hash.replace('#', '') || 'home';
  render(ROUTES.includes(route) ? route : 'home');
})();

// ── FADE-IN ON SCROLL (dins dels paneles) ──
const fadeEls = document.querySelectorAll(
  '.service-card, .advantage-card, .testimonial-card, .step, .section-header, .contact-method, .sector-node, .sat-card'
);

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  // Esglaona les targetes dins de la mateixa graella
  const parent = el.parentElement;
  if (!parent) return;
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

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validació bàsica
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

    // Simulació d'enviament (substituir per endpoint real)
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    const lang = window.currentLang || 'ca';
    const sendingText = (window.i18nData && window.i18nData[lang]) ? window.i18nData[lang]['contact.form.sending'] : 'Enviant…';
    const submitSpan = submitBtn ? submitBtn.querySelector('span') : null;
    if (submitSpan) submitSpan.textContent = sendingText;

    setTimeout(() => {
      if (formSuccess) formSuccess.classList.add('visible');
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        const l = window.currentLang || 'ca';
        const submitText = (window.i18nData && window.i18nData[l]) ? window.i18nData[l]['contact.form.submit'] : 'Enviar sol·licitud gratuïta';
        submitBtn.innerHTML = `<span>${submitText}</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      }
      if (formSuccess) setTimeout(() => formSuccess.classList.remove('visible'), 6000);
    }, 1200);
  });
}
