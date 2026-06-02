# Plan de implementación · Máquina de vending como interfaz

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir la web de Baixter de una landing de scroll a una máquina de vending interactiva donde cada botón "dispensa" una sección a pantalla completa.

**Architecture:** Un solo `index.html` con vistas conmutadas por JavaScript (home-máquina + 6 paneles de sección ocultos), routing por hash con `history` para back/forward y deep-linking. Sin build ni dependencias: sigue siendo estático.

**Tech Stack:** HTML5, CSS3 (variables de marca ya existentes en `:root`), JavaScript vanilla, i18n por diccionario (`translations.js`). Tipografías Montserrat/Inter (Google Fonts, ya enlazadas).

**Verificación:** El proyecto NO tiene framework de tests (es estático, sin build). Cada tarea se verifica en navegador: se sirve con `python -m http.server 8000` desde la raíz y se comprueba con el navegador (o Playwright MCP: `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`). Añadir un test-runner queda fuera de alcance (YAGNI).

**Referencia:** Diseño aprobado en `docs/superpowers/specs/2026-06-02-maquina-vending-interfaz-design.md`.

---

## Estructura de archivos

| Archivo | Responsabilidad | Acción |
|---------|-----------------|--------|
| `index.html` | Home-máquina + 6 paneles de sección + barras de panel | Reestructurar |
| `assets/css/styles.css` | Estilos de máquina, botonera, animación, paneles (reutiliza tokens `:root`) | Ampliar |
| `assets/js/script.js` | Router por hash, dispensado, foco, formulario, fade-in | Reescribir lógica de navegación |
| `assets/js/translations.js` | Cadenas nuevas (display, botones, "Tornar", pegatinas, confianza) CA/ES | Ampliar |
| `.gitignore` | Excluir artefactos (`.superpowers/`, `.playwright-mcp/`, PDFs) | Crear |
| `README.md` | Documentar el nuevo modelo de interacción | Actualizar |

Las imágenes (`assets/images/`) y la identidad de marca no cambian.

**Rutas y secciones (fuente de verdad para todo el plan):**

```
serveis        → #serveis        → botón código 11
avantatges     → #avantatges     → botón código 12
com-funciona   → #com-funciona   → botón código 21
a-qui-servim   → #a-qui-servim   → botón código 22
atencio        → #atencio        → botón código 31 (contenido SAT)
contacte       → #contacte       → botón código 32 (formulario + CTA)
```

---

## Task 1: Versionado del proyecto (git init + baseline)

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Inicializar el repositorio**

Run:
```bash
git init
git branch -M main
```
Expected: "Initialized empty Git repository …"

- [ ] **Step 2: Crear `.gitignore`**

Create `.gitignore`:
```gitignore
# Artefactos del acompañante visual de brainstorming
.superpowers/

# Capturas y logs de Playwright MCP
.playwright-mcp/

# PDFs generados
*.pdf

# Sistema operativo / editor
Thumbs.db
.DS_Store
```

- [ ] **Step 3: Commit baseline (estado actual antes del rediseño)**

Run:
```bash
git add .
git commit -m "chore: baseline del sitio antes del rediseño de máquina de vending"
```
Expected: commit creado con `index.html`, `assets/`, `docs/`, `README.md`, `.gitignore`.

- [ ] **Step 4: Verificar**

Run: `git log --oneline -1` y `git status`
Expected: 1 commit; working tree limpio (los directorios ignorados no aparecen).

---

## Task 2: Markup de la home-máquina

Construye la estructura de la portada (máquina estática, sin estilos finales ni interactividad).
El contenido actual del `<body>` se reorganizará; en esta tarea creamos el contenedor `#app`, la
home y dejamos los 6 paneles como contenedores vacíos (se rellenan en la Task 4).

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Sustituir el contenido del `<body>`**

Reemplaza TODO el contenido entre `<body>` y los `<script>` finales por esta estructura. Conserva
los `<script src="...translations.js">` y `<script src="...script.js">` al final, y el `<head>` tal
cual.

```html
<body>
<main id="app">

  <!-- ════════ HOME · MÀQUINA ════════ -->
  <section class="machine-home" id="home" aria-label="Màquina de vending Baixter">
    <div class="product-wall" aria-hidden="true">
      <div style="background-image:url('assets/images/snack.jpg')"></div>
      <div style="background-image:url('assets/images/refrescos.jpg')"></div>
      <div style="background-image:url('assets/images/snack.jpg')"></div>
      <div style="background-image:url('assets/images/refrescos.jpg')"></div>
      <div style="background-image:url('assets/images/snack.jpg')"></div>
      <div style="background-image:url('assets/images/refrescos.jpg')"></div>
    </div>
    <div class="home-glow" aria-hidden="true"></div>

    <header class="topbar">
      <a href="#home" class="logo" aria-label="Baixter – Inici">
        <img src="assets/images/logo-baixter.jpg" alt="Baixter" class="logo-img" />
      </a>
      <div class="lang-switcher">
        <button class="lang-btn active" data-lang="ca" aria-label="Català"><span class="fi fi-es-ct fis"></span><span class="lang-code">CA</span></button>
        <button class="lang-btn" data-lang="es" aria-label="Español"><span class="fi fi-es fis"></span><span class="lang-code">ES</span></button>
      </div>
    </header>

    <div class="machine-wrap">
      <span class="sticker sticker--1" data-i18n="machine.sticker1">0€ instal·lació</span>
      <span class="sticker sticker--2" data-i18n="machine.sticker2">0€ manteniment</span>
      <span class="sticker sticker--3" data-i18n="machine.sticker3">24/7</span>

      <div class="machine" role="group" aria-label="Selector de seccions">
        <div class="machine-head">
          <span class="machine-logo">BAIX<b>TER</b></span>
          <span class="machine-sub" data-i18n="machine.sub">Serveis de Vending</span>
        </div>

        <div class="machine-body">
          <div class="showcase" aria-hidden="true">
            <div style="background-image:url('assets/images/snack.jpg')"></div>
            <div style="background-image:url('assets/images/refrescos.jpg')"></div>
          </div>

          <div class="control">
            <div class="display" id="display" aria-live="polite">
              <span class="display-eyebrow" data-i18n="machine.displayEyebrow">Selecciona</span>
              <span class="display-main" data-i18n="machine.displayIdle">una secció</span>
            </div>
            <nav class="keypad" aria-label="Seccions del lloc">
              <button class="vbtn" data-route="serveis"><span class="vbtn-code">11</span><span class="vbtn-label" data-i18n="nav.services">Serveis</span></button>
              <button class="vbtn" data-route="avantatges"><span class="vbtn-code">12</span><span class="vbtn-label" data-i18n="nav.advantages">Avantatges</span></button>
              <button class="vbtn" data-route="com-funciona"><span class="vbtn-code">21</span><span class="vbtn-label" data-i18n="nav.howItWorks">Com funciona</span></button>
              <button class="vbtn" data-route="a-qui-servim"><span class="vbtn-code">22</span><span class="vbtn-label" data-i18n="nav.clients">A qui servim</span></button>
              <button class="vbtn" data-route="atencio"><span class="vbtn-code">31</span><span class="vbtn-label" data-i18n="nav.customerService">Atenció al client</span></button>
              <button class="vbtn" data-route="contacte"><span class="vbtn-code">32</span><span class="vbtn-label" data-i18n="nav.contact">Contacte</span></button>
            </nav>
          </div>
        </div>

        <div class="tray" id="tray" aria-hidden="true">
          <span class="capsule" id="capsule"></span>
        </div>
      </div>
    </div>

    <div class="confidence-bar">
      <p class="confidence-text" data-i18n="trust.text">Presents a tot el Baix Ter i comarques veïnes</p>
      <div class="confidence-items">
        <span data-i18n="trust.item1">Empreses industrials</span>
        <span data-i18n="trust.item2">Oficines i coworkings</span>
        <span data-i18n="trust.item3">Centres educatius</span>
        <span data-i18n="trust.item4">Hotels i residències</span>
        <span data-i18n="trust.item5">Gimnasos i centres esportius</span>
      </div>
    </div>
  </section>

  <!-- ════════ PANELS (se rellenan en Task 4) ════════ -->
  <section class="panel" id="serveis" hidden></section>
  <section class="panel" id="avantatges" hidden></section>
  <section class="panel" id="com-funciona" hidden></section>
  <section class="panel" id="a-qui-servim" hidden></section>
  <section class="panel" id="atencio" hidden></section>
  <section class="panel" id="contacte" hidden></section>

</main>

  <script src="assets/js/translations.js"></script>
  <script src="assets/js/script.js"></script>
</body>
```

- [ ] **Step 2: Servir y verificar el markup**

Run: `python -m http.server 8000` (déjalo corriendo) y abre `http://localhost:8000`.
Verificar con Playwright MCP: `browser_navigate` a `http://localhost:8000`, luego `browser_snapshot`.
Expected: la home muestra logo, switcher CA/ES, logo "BAIXTER" de la máquina, display "Selecciona / una secció", 6 botones (11–32) y la barra de confianza. Sin estilos finales todavía (aspecto básico). No hay errores en consola (`browser_console_messages`).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: estructura HTML de la home-máquina y contenedores de paneles"
```

---

## Task 3: Estilos de la máquina (home)

Da a la home su aspecto final de marca. Reutiliza los tokens de `:root` ya existentes.

**Files:**
- Modify: `assets/css/styles.css` (añadir bloque al final, antes de `/* ── RESPONSIVE ── */` o tras él como sección nueva)

- [ ] **Step 1: Añadir estilos de la home-máquina**

Añade al final de `styles.css`:

```css
/* ═══════════ MÀQUINA · HOME ═══════════ */
.machine-home {
  position: relative; z-index: 2;
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center;
  padding: 0 24px;
  overflow: hidden;
}
.product-wall {
  position: absolute; inset: 0; z-index: 0;
  display: grid; grid-template-columns: repeat(6, 1fr);
  opacity: .42;
  filter: grayscale(100%) brightness(.5) blur(3px);
}
.product-wall div { background-size: cover; background-position: center; }
.home-glow {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(55% 45% at 50% 8%, rgba(242,169,0,.10), transparent 60%),
    radial-gradient(70% 60% at 50% 120%, rgba(10,34,64,.88), transparent 70%),
    linear-gradient(180deg, rgba(11,11,11,.55), rgba(11,11,11,.25));
}

.topbar {
  position: relative; z-index: 4;
  width: 100%; max-width: 1180px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 0;
}

.machine-wrap {
  position: relative; z-index: 3;
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  width: 100%;
}

/* Pegatinas */
.sticker {
  position: absolute; z-index: 5;
  background: var(--amber); color: #111;
  font-family: var(--font-display); font-weight: 800; font-size: .82rem;
  padding: 7px 12px; border-radius: var(--radius-xs);
  box-shadow: 0 6px 18px rgba(242,169,0,.4);
}
.sticker--1 { top: 4%;  left: calc(50% - 230px); transform: rotate(-7deg); }
.sticker--2 { top: 22%; left: calc(50% + 150px); transform: rotate(6deg); }
.sticker--3 { top: 60%; left: calc(50% + 165px); transform: rotate(-4deg); font-size: 1rem; }

/* Cabina */
.machine {
  position: relative;
  width: 360px; max-width: 86vw;
  background: linear-gradient(150deg, #262626 0%, #161616 45%, #0e0e0e 100%);
  border: 1px solid #3a3a3a;
  border-radius: 16px 16px 6px 6px;
  box-shadow: 0 36px 80px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.06);
  padding: 16px;
  display: flex; flex-direction: column; gap: 14px;
}
.machine-head { display: flex; align-items: baseline; justify-content: space-between; }
.machine-logo { font-family: var(--font-display); font-weight: 800; font-size: 1.8rem; letter-spacing: -.03em; color: #fff; }
.machine-logo b { color: var(--amber); }
.machine-sub { font-family: var(--font-data); font-size: .6rem; letter-spacing: .25em; text-transform: uppercase; color: var(--text-dim); }

.machine-body { display: flex; gap: 14px; }
.showcase {
  width: 130px; flex-shrink: 0;
  border-radius: var(--radius-sm); border: 1px solid #333; overflow: hidden;
  position: relative; display: grid; grid-template-rows: 1fr 1fr;
}
.showcase div { background-size: cover; background-position: center; filter: grayscale(100%) contrast(1.05) brightness(.9); }
.showcase::after { content: ""; position: absolute; inset: 0; background: linear-gradient(115deg, rgba(255,255,255,.16) 0%, transparent 32%, transparent 70%, rgba(255,255,255,.07) 100%); }

.control { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.display {
  border-radius: var(--radius-sm);
  background: linear-gradient(160deg, var(--navy), var(--navy-deep));
  border: 1px solid #1b3f68;
  box-shadow: inset 0 0 16px rgba(0,0,0,.6);
  padding: 10px; min-height: 52px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  transition: box-shadow .3s, border-color .3s;
}
.display-eyebrow { font-family: var(--font-data); font-weight: 700; font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; color: var(--amber); }
.display-main { font-family: var(--font-display); font-weight: 800; font-size: .95rem; color: #cfe0f5; text-align: center; }

.keypad { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.vbtn {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px;
  background: #1b1b1b; border: 1px solid #343434; border-radius: var(--radius-xs);
  cursor: pointer; transition: var(--transition);
  font-family: var(--font-data); text-align: left;
}
.vbtn-code { font-weight: 700; font-size: .6rem; color: var(--text-dim); background: #0c0c0c; border: 1px solid #2d2d2d; border-radius: 2px; padding: 2px 4px; flex-shrink: 0; }
.vbtn-label { font-weight: 700; font-size: .74rem; color: var(--text-muted); line-height: 1.1; }
.vbtn:hover, .vbtn:focus-visible {
  background: var(--surface-3); border-color: var(--amber); outline: none;
  box-shadow: 0 0 0 2px rgba(242,169,0,.25);
}
.vbtn:hover .vbtn-label, .vbtn:focus-visible .vbtn-label { color: #fff; }
.vbtn.is-active { background: rgba(242,169,0,.16); border-color: var(--amber); box-shadow: 0 0 16px rgba(242,169,0,.4); }
.vbtn.is-active .vbtn-label { color: var(--amber-light); }

.tray {
  position: relative; height: 38px;
  background: #070707; border: 1px solid #2a2a2a; border-radius: var(--radius-sm);
  box-shadow: inset 0 8px 16px rgba(0,0,0,.85);
  overflow: hidden;
}
.capsule {
  position: absolute; left: 50%; top: -40px; transform: translateX(-50%);
  width: 70px; height: 18px; border-radius: 3px;
  background: var(--amber); box-shadow: 0 6px 16px rgba(242,169,0,.5);
  opacity: 0;
}

/* Barra de confianza */
.confidence-bar {
  position: relative; z-index: 3;
  width: 100%; max-width: 1180px;
  border-top: 1px solid var(--border);
  padding: 16px 0 22px;
  display: flex; align-items: center; gap: 24px; flex-wrap: wrap; justify-content: center;
}
.confidence-text { font-family: var(--font-data); font-size: .72rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--text-dim); }
.confidence-items { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
.confidence-items span { font-family: var(--font-data); font-size: .82rem; color: var(--text-muted); }
.confidence-items span::before { content: "✓ "; color: var(--amber); }
```

- [ ] **Step 2: Verificar el aspecto**

Recarga `http://localhost:8000`. Con Playwright MCP: `browser_navigate` + `browser_take_screenshot` (fullPage).
Expected: máquina oscura centrada con escaparate grayscale, display navy, botonera 2×3 con códigos, pegatinas ámbar rotadas, barra de confianza inferior y pared de productos difuminada de fondo. Hover en un botón lo resalta en ámbar.

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat: estilos de marca de la home-máquina (cabina, botonera, pegatinas)"
```

---

## Task 4: Rellenar los paneles con el contenido (recortado)

Mueve el contenido existente (que ya está en tu historial git baseline y en el spec) dentro de cada
panel, envuelto con barra de panel + footer. Recorta los textos.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Definir el patrón de panel reutilizable**

Cada `<section class="panel" id="..." hidden>` adopta esta plantilla (cambia el `id`, el
`data-i18n` del título y el contenido interno):

```html
<section class="panel" id="serveis" hidden aria-labelledby="serveis-title">
  <header class="panel-bar">
    <a href="#home" class="logo" aria-label="Baixter – Inici"><img src="assets/images/logo-baixter.jpg" alt="Baixter" class="logo-img" /></a>
    <button type="button" class="back-btn" data-back>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      <span data-i18n="machine.back">Tornar a la màquina</span>
    </button>
    <div class="lang-switcher">
      <button class="lang-btn active" data-lang="ca" aria-label="Català"><span class="fi fi-es-ct fis"></span><span class="lang-code">CA</span></button>
      <button class="lang-btn" data-lang="es" aria-label="Español"><span class="fi fi-es fis"></span><span class="lang-code">ES</span></button>
    </div>
  </header>
  <div class="panel-content" tabindex="-1">
    <!-- contenido de la sección -->
  </div>
  <footer class="footer panel-footer"><!-- footer compartido (Step 7) --></footer>
</section>
```

- [ ] **Step 2: Panel `serveis`**

Dentro de `.panel-content` de `#serveis`, pega el `section-header` + `services-grid` del baseline
(las 3 `service-card`: Cafè destacada, Snacks, Begudes), con el título:
```html
<div class="section-header">
  <span class="section-tag" data-i18n="services.tag">Els nostres serveis</span>
  <h2 class="section-title" id="serveis-title" data-i18n-html="services.title">Tot el que el teu equip necessita,<br />en un sol espai</h2>
</div>
```
**Recorte:** elimina el `section-subtitle` y reduce cada `service-desc` a una sola frase (máx. ~12
palabras). Conserva las 3 tarjetas, sus imágenes y las `service-features`.

- [ ] **Step 3: Paneles `avantatges`, `com-funciona`, `a-qui-servim`**

- `#avantatges`: pega `section-header` + `advantages-grid` (6 `advantage-card`). Recorta cada `<p>`
  a una frase. Título `id="avantatges-title"`.
- `#com-funciona`: pega `section-header` + `steps` (3 `step` + `step-connector`). Recorta cada `p` a
  una frase. Título `id="com-funciona-title"`.
- `#a-qui-servim`: pega `section-header` + `sectors-wrap` (diagrama SVG + `sectors-grid` con los 8
  nodos + hub central). Título `id="a-qui-servim-title"`. Sin recorte (son etiquetas).

- [ ] **Step 4: Panel `atencio` (SAT)**

Pega el bloque `sat-layout` del baseline (la `sat-card` con `sat-header`, `sat-contacts` con Pere
605 91 39 63 / Jordi 605 91 39 64 / sat@vendingbaixter.com, **`sat-machine-field` con el input
`#numMaquina`**, y `sat-footer-brand`). Conserva el campo nº de màquina íntegro. Añade
`id="atencio-title"` en el primer título del bloque.

- [ ] **Step 5: Panel `contacte` (formulario + CTA fusionado)**

Dentro de `.panel-content` de `#contacte`:
1. Intro con el texto del CTA actual:
```html
<div class="section-header">
  <span class="section-tag" data-i18n="contact.tag">Contacta amb nosaltres</span>
  <h2 class="section-title" id="contacte-title" data-i18n="cta.title">La teva empresa encara no té vending?</h2>
  <p class="section-subtitle" data-i18n="cta.desc">Uneix-te als negocis del Baix Ter que ja gaudeixen d'un servei de qualitat sense pagar res.</p>
</div>
```
2. Debajo, pega el `contact-form` completo del baseline (todos los campos, validación, `#formSuccess`,
   `#submitBtn`). Conserva los `contact-methods` (telèfon, email, WhatsApp). **No** elimines ningún
   campo del formulario.

- [ ] **Step 6: Recortar el formulario/contacto solo en textos**

Acorta únicamente descripciones; los `label`, `input`, `select`, `textarea` y la checkbox de
privacidad se mantienen intactos.

- [ ] **Step 7: Footer compartido en cada panel**

Pega el `footer-inner` + `footer-bottom` del baseline dentro del `<footer class="footer panel-footer">`
de los 6 paneles (idéntico en todos). Mantén los enlaces; cambia los `href` de navegación interna a
las nuevas rutas hash correspondientes (p. ej. `#serveis`, `#avantatges`, `#com-funciona`,
`#contacte`).

- [ ] **Step 8: Verificar**

Recarga `http://localhost:8000`. Como los paneles tienen `hidden`, no se ven aún. Quita
temporalmente `hidden` de `#serveis` con DevTools (o `browser_evaluate`: `document.getElementById('serveis').hidden=false`) y haz `browser_snapshot`.
Expected: el panel Serveis muestra título, 3 tarjetas, barra de panel con "Tornar" y footer. Vuelve a poner `hidden`.

- [ ] **Step 9: Commit**

```bash
git add index.html
git commit -m "feat: contenido de las 6 secciones movido a paneles con barra y footer"
```

---

## Task 5: Estilos de los paneles

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Añadir estilos de panel**

```css
/* ═══════════ PANELS ═══════════ */
.panel {
  position: relative; z-index: 2;
  min-height: 100vh;
  background:
    radial-gradient(900px 500px at 50% -10%, rgba(10,34,64,.30), transparent 60%),
    var(--bg);
}
.panel-bar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; gap: 16px;
  padding: 12px 24px;
  background: rgba(12,12,12,.86); backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.panel-bar .logo { margin-right: auto; }
.back-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--amber); color: #111;
  font-family: var(--font-display); font-weight: 700; font-size: .82rem;
  border: none; border-radius: var(--radius-sm); padding: 9px 16px; cursor: pointer;
  transition: var(--transition);
}
.back-btn:hover { background: var(--amber-light); transform: translateX(-2px); }
.back-btn:focus-visible { outline: 2px solid var(--amber-light); outline-offset: 2px; }
.panel-content { max-width: 1180px; margin: 0 auto; padding: 70px 24px; outline: none; }
.panel-footer { margin-top: 0; }
```

- [ ] **Step 2: Verificar**

Con `#serveis` visible temporalmente (`browser_evaluate`), `browser_take_screenshot`.
Expected: barra superior pegajosa con logo + botón ámbar "Tornar" + switcher; contenido centrado; footer al fondo. Restaura `hidden`.

- [ ] **Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat: estilos de los paneles de sección"
```

---

## Task 6: Router por hash (sin animación)

Implementa la navegación: mostrar home/paneles según la ruta, clic de botón, "Tornar",
back/forward y deep-linking. La animación se añade en la Task 7.

**Files:**
- Modify: `assets/js/script.js` (reemplaza el bloque NAVBAR/HAMBURGER/SMOOTH-SCROLL; conserva
  formulario y fade-in adaptándolos)

- [ ] **Step 1: Escribir el router**

Sustituye el inicio de `script.js` (las secciones de navbar scroll, hamburger y smooth-scroll, que
ya no aplican) por:

```js
// ── ROUTER MÀQUINA ──
const ROUTES = ['serveis','avantatges','com-funciona','a-qui-servim','atencio','contacte'];
const home = document.getElementById('home');
const display = document.getElementById('display');
const panels = {};
ROUTES.forEach(r => { panels[r] = document.getElementById(r); });

function setDisplay(eyebrowKey, mainText) {
  const eb = display.querySelector('.display-eyebrow');
  const mn = display.querySelector('.display-main');
  if (eb) { eb.setAttribute('data-i18n', eyebrowKey); applyI18nTo(eb); }
  if (mn) { mn.textContent = mainText; mn.removeAttribute('data-i18n'); }
}
function resetDisplay() {
  const lang = window.currentLang || 'ca';
  const eb = display.querySelector('.display-eyebrow');
  const mn = display.querySelector('.display-main');
  if (eb) { eb.setAttribute('data-i18n','machine.displayEyebrow'); applyI18nTo(eb); }
  if (mn) { mn.setAttribute('data-i18n','machine.displayIdle'); applyI18nTo(mn); }
}

function render(route) {
  const valid = ROUTES.includes(route);
  home.hidden = valid;
  ROUTES.forEach(r => { panels[r].hidden = (r !== route); });
  if (valid) {
    const content = panels[route].querySelector('.panel-content');
    content.focus();
    panels[route].scrollIntoView({ block: 'start' });
    window.scrollTo(0, 0);
  } else {
    resetDisplay();
    document.querySelectorAll('.vbtn').forEach(b => b.classList.remove('is-active'));
  }
}

function navigate(route, { push = true } = {}) {
  render(route);
  const hash = ROUTES.includes(route) ? '#' + route : '#home';
  if (push) history.pushState({ route }, '', hash);
}

// Clic en botón de la máquina
document.querySelectorAll('.vbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const route = btn.dataset.route;
    btn.classList.add('is-active');
    navigate(route);
  });
});

// "Tornar a la màquina"
document.querySelectorAll('[data-back]').forEach(b => {
  b.addEventListener('click', () => navigate('home'));
});

// Back / forward del navegador
window.addEventListener('popstate', () => {
  const route = location.hash.replace('#','') || 'home';
  render(ROUTES.includes(route) ? route : 'home');
});

// Carga inicial (deep-link)
(function initRoute() {
  const route = location.hash.replace('#','') || 'home';
  render(ROUTES.includes(route) ? route : 'home');
})();

// Helper i18n por elemento (definido en translations.js, ver Task 9)
function applyI18nTo(el) { if (window.applyI18nElement) window.applyI18nElement(el); }
```

- [ ] **Step 2: Adaptar el formulario y el fade-in (conservar)**

Mantén el bloque del formulario de contacto del baseline. Para el `fade-in`, ajusta el observer
para que observe dentro de los paneles (el contenido se revela al hacer scroll dentro del panel).
No cambies la lógica de validación/éxito.

- [ ] **Step 3: Verificar navegación**

Recarga. Con Playwright MCP: `browser_navigate` a `http://localhost:8000`, `browser_click` en el
botón "Serveis" (ref del snapshot), luego `browser_snapshot`.
Expected: se oculta la home y se muestra el panel Serveis; la URL pasa a `#serveis`. Click en
"Tornar" → vuelve la máquina, URL `#home`. `browser_navigate` directo a `http://localhost:8000/#contacte` → abre Contacte. `browser_navigate_back` → vuelve al estado anterior.

- [ ] **Step 4: Commit**

```bash
git add assets/js/script.js
git commit -m "feat: router por hash (botones, tornar, back/forward, deep-link)"
```

---

## Task 7: Animación de dispensado

Añade la secuencia caída + subida al pulsar un botón, con fallback de `prefers-reduced-motion`.

**Files:**
- Modify: `assets/css/styles.css`, `assets/js/script.js`

- [ ] **Step 1: CSS de animación**

Añade a `styles.css`:
```css
/* ═══════════ ANIMACIÓ DE DISPENSAT ═══════════ */
.display.is-dispensing { box-shadow: 0 0 20px rgba(242,169,0,.6); border-color: var(--amber); }
.display.is-dispensing .display-main { color: var(--amber-light); }

.capsule.drop { animation: capsuleDrop .6s cubic-bezier(.5,0,.6,1) forwards; }
@keyframes capsuleDrop {
  0%   { opacity: 1; top: -40px; transform: translateX(-50%) rotate(0); }
  100% { opacity: 1; top: 12px;  transform: translateX(-50%) rotate(8deg); }
}
.tray.flash { animation: trayFlash .4s ease; }
@keyframes trayFlash {
  0%,100% { box-shadow: inset 0 8px 16px rgba(0,0,0,.85); }
  50%     { box-shadow: inset 0 0 18px rgba(242,169,0,.7), 0 0 16px rgba(242,169,0,.4); }
}

.panel.is-entering { animation: panelRise .55s cubic-bezier(.2,.7,.2,1); transform-origin: bottom center; }
@keyframes panelRise {
  0%   { opacity: 0; transform: translateY(60%) scale(.85); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .capsule.drop, .tray.flash { animation: none; }
  .panel.is-entering { animation: panelFade .25s ease; }
  @keyframes panelFade { from { opacity: 0; } to { opacity: 1; } }
}
```

- [ ] **Step 2: Orquestar la animación en JS**

Reemplaza el listener del clic de botón (Task 6, Step 1) por una versión con animación:

```js
const tray = document.getElementById('tray');
const capsule = document.getElementById('capsule');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function labelFor(route) {
  const lang = window.currentLang || 'ca';
  const btn = document.querySelector(`.vbtn[data-route="${route}"] .vbtn-label`);
  return btn ? btn.textContent.trim() : '';
}

function dispense(route) {
  const btn = document.querySelector(`.vbtn[data-route="${route}"]`);
  btn.classList.add('is-active');
  const lang = window.currentLang || 'ca';
  const dispensingTxt = (window.i18nData?.[lang]?.['machine.dispensing']) || 'Dispensant…';
  setDisplay('machine.displayEyebrow', `${dispensingTxt} ${labelFor(route)}`);
  display.classList.add('is-dispensing');

  if (prefersReduced) { revealPanel(route); afterReveal(); return; }

  capsule.classList.add('drop');
  tray.classList.add('flash');
  setTimeout(() => {
    revealPanel(route);
    panels[route].classList.add('is-entering');
    setTimeout(() => panels[route].classList.remove('is-entering'), 600);
    afterReveal();
  }, 550);
}

function revealPanel(route) {
  home.hidden = true;
  ROUTES.forEach(r => { panels[r].hidden = (r !== route); });
  const content = panels[route].querySelector('.panel-content');
  content.focus();
  window.scrollTo(0, 0);
}
function afterReveal() {
  history.pushState({ route: location.hash }, '', '#' + currentDispenseRoute);
  capsule.classList.remove('drop');
  tray.classList.remove('flash');
  display.classList.remove('is-dispensing');
}

let currentDispenseRoute = 'home';
document.querySelectorAll('.vbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentDispenseRoute = btn.dataset.route;
    dispense(currentDispenseRoute);
  });
});
```
(Conserva los listeners de `[data-back]`, `popstate` e `initRoute` de la Task 6. `render()` sigue
usándose para back/forward y deep-link sin animación.)

- [ ] **Step 3: Verificar la animación**

Recarga. Con Playwright MCP `browser_click` en "Serveis" y `browser_take_screenshot` inmediato (para
captar transición) y otro tras ~1s.
Expected: el botón se ilumina, el display muestra "Dispensant… Serveis", la cápsula cae a la bandeja
con destello y el panel sube a pantalla completa. Emular reduced-motion (`browser_evaluate` con
`matchMedia` no es trivial; verifica manualmente con el SO o DevTools) → debe ser un fundido simple.

- [ ] **Step 4: Commit**

```bash
git add assets/css/styles.css assets/js/script.js
git commit -m "feat: animación de dispensado (caída + subida) con fallback reduced-motion"
```

---

## Task 8: i18n — cadenas nuevas (CA/ES)

**Files:**
- Modify: `assets/js/translations.js`

- [ ] **Step 1: Inspeccionar la API i18n existente**

Lee `translations.js` para confirmar la forma del diccionario (`window.i18nData`,
`window.currentLang`) y la función que aplica traducciones. Si no existe una función por-elemento,
expón una: `window.applyI18nElement = function(el){ /* aplica data-i18n/-html/-placeholder a un solo nodo */ }` reutilizando la lógica existente.

- [ ] **Step 2: Añadir las claves nuevas**

Añade a los objetos `ca` y `es` del diccionario:
```js
// CA
'nav.clients': 'A qui servim',
'machine.sub': 'Serveis de Vending',
'machine.displayEyebrow': 'Selecciona',
'machine.displayIdle': 'una secció',
'machine.dispensing': 'Dispensant…',
'machine.back': 'Tornar a la màquina',
'machine.sticker1': '0€ instal·lació',
'machine.sticker2': '0€ manteniment',
'machine.sticker3': '24/7',
```
```js
// ES
'nav.clients': 'A quién servimos',
'machine.sub': 'Servicios de Vending',
'machine.displayEyebrow': 'Selecciona',
'machine.displayIdle': 'una sección',
'machine.dispensing': 'Dispensando…',
'machine.back': 'Volver a la máquina',
'machine.sticker1': '0€ instalación',
'machine.sticker2': '0€ mantenimiento',
'machine.sticker3': '24/7',
```
(Si `nav.clients` ya existía con otro texto, no lo dupliques; reutilízalo.)

- [ ] **Step 3: Verificar cambio de idioma**

Recarga. `browser_click` en el botón "ES". `browser_snapshot`.
Expected: botones de la máquina, pegatinas, display y "Tornar" pasan a español; al abrir un panel y
cambiar idioma, su contenido también cambia. La selección de idioma persiste al navegar entre
home y paneles.

- [ ] **Step 4: Commit**

```bash
git add assets/js/translations.js
git commit -m "feat: i18n CA/ES para la interfaz de la máquina"
```

---

## Task 9: Responsive y accesibilidad

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Reglas responsive de la máquina**

Añade dentro de los media queries (o como bloque nuevo):
```css
@media (max-width: 600px) {
  .machine { width: 100%; max-width: 420px; }
  .machine-body { flex-direction: column; }
  .showcase { width: 100%; height: 110px; grid-template-rows: none; grid-template-columns: 1fr 1fr; }
  .keypad { grid-template-columns: 1fr; }
  .sticker--1 { left: 8px; }
  .sticker--2 { right: 8px; left: auto; }
  .sticker--3 { right: 8px; left: auto; top: 50%; }
  .panel-content { padding: 40px 18px; }
  .panel-bar { gap: 10px; padding: 10px 16px; }
  .back-btn span { display: none; } /* solo icono en móvil */
}
```

- [ ] **Step 2: Verificar móvil**

`browser_resize` a 390×800, `browser_navigate` a la home, `browser_take_screenshot`.
Expected: máquina a ancho completo, escaparate en 2 columnas arriba, botones apilados, pegatinas
reposicionadas sin solaparse. Abrir una sección: barra con solo icono "Tornar"; contenido legible.

- [ ] **Step 3: Verificar teclado y foco**

`browser_navigate` a la home. Con `browser_press_key` (Tab) recorre hasta un `.vbtn`; comprueba foco
visible (`browser_take_screenshot`). `browser_press_key` Enter → abre la sección. Tab hasta "Tornar"
+ Enter → vuelve.
Expected: todos los botones alcanzables por Tab con anillo de foco ámbar; Enter/Espacio activan;
al abrir panel el foco entra en `.panel-content`.

- [ ] **Step 4: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat: responsive móvil y mejoras de accesibilidad de teclado"
```

---

## Task 10: Documentación, limpieza y subida a GitHub

**Files:**
- Modify: `README.md`
- Modify: `scripts/generate_pdf.py` (solo si referencia secciones por scroll — verificar)

- [ ] **Step 1: Actualizar README**

Actualiza la sección "Estructura del proyecto" y añade una breve descripción del nuevo modelo de
interacción (home-máquina + paneles dispensados por hash). Documenta que se navega por rutas
`#serveis`, `#avantatges`, etc.

- [ ] **Step 2: Revisar `generate_pdf.py`**

Lee `scripts/generate_pdf.py`. Si capturaba la web por scroll continuo, ahora la home no tiene
scroll y las secciones están ocultas; ajusta el script para navegar a cada hash y capturar cada
panel, o deja una nota en el README de que el PDF necesita revisión. (No bloquea el rediseño.)

- [ ] **Step 3: Verificación final completa**

Servir y recorrer con Playwright MCP: home → cada uno de los 6 botones → Tornar; cambio CA/ES;
deep-link a `#contacte` y envío del formulario (validación + mensaje de éxito); `#atencio` con campo
nº de màquina. Revisa `browser_console_messages` (sin errores).
Expected: se cumplen los 7 criterios de aceptación del spec §14.

- [ ] **Step 4: Commit final**

```bash
git add README.md scripts/generate_pdf.py
git commit -m "docs: actualizar README al nuevo modelo de máquina-interfaz"
```

- [ ] **Step 5: Crear el repositorio en GitHub y subir**

Con GitHub CLI autenticado (`gh auth status`):
```bash
gh repo create baixter-web --source=. --remote=origin --push --private
```
(Ajusta nombre y `--private`/`--public` según prefieras.) Si no usas `gh`, crea el repo vacío en
GitHub y:
```bash
git remote add origin https://github.com/<usuario>/baixter-web.git
git push -u origin main
```

- [ ] **Step 6: Verificar la subida**

Run: `git remote -v` y `git log --oneline origin/main -1`
Expected: remoto `origin` configurado y `main` publicado en GitHub.

---

## Self-review (cobertura del spec)

- §3 decisiones 1–6 → Tasks 2,3,6,7 (concepto, máquina a medida, 6 botones, animación, home A).
- §5 home (topbar, máquina, pegatinas, confianza, fondo) → Tasks 2–3.
- §6 botonera + códigos + rutas → Task 2 (markup) + Task 6 (lógica).
- §7 animación + reduced-motion + móvil → Task 7 (+ Task 9 móvil).
- §8 6 secciones + barra panel + footer + recortes + SAT nº màquina + CTA fusionado → Task 4.
- §9 i18n CA/ES + cambio en home y paneles → Task 8.
- §10 accesibilidad (button real, foco, aria) → Tasks 2,6,9.
- §11 responsive → Task 9.
- §12 marca/tokens → reutilizados en Tasks 3,5,7.
- §13 archivos → coinciden con la tabla de estructura.
- §14 criterios de aceptación → Task 10 Step 3.
- Preparación GitHub → Task 1 (init) + Task 10 (push).
