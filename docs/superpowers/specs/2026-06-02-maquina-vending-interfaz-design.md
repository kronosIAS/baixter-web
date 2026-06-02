# Diseño · La máquina de vending como interfaz de navegación

- **Proyecto:** Vending Baix Ter (Baixter) — web corporativa
- **Fecha:** 2026-06-02
- **Estado:** Aprobado (pendiente de plan de implementación)
- **Autor:** Sergi + Claude (sesión de brainstorming)

---

## 1. Contexto

La web actual (`index.html`) es una landing estática de scroll vertical en HTML/CSS/JS puro
(sin build ni dependencias), con tema oscuro premium, marca Navy `#0A2240` + Ámbar `#F2A900`,
tipografías Montserrat/Inter e i18n CA/ES. Secciones actuales: Hero, Trust bar, A qui servim
(sectores), Serveis, Avantatges, Com funciona, CTA banner, Atenció al client (SAT), Contacte,
Footer.

## 2. Objetivo

Cambiar el **modelo de interacción**: en lugar de una página de scroll, el usuario navega
**operando una máquina de vending**. Al entrar ve la máquina Baixter con el logo impreso y un
fondo de productos de vending (snacks, bebidas, café). Pulsa los botones de la máquina —como si
comprara— y cada botón "dispensa" una sección de la web.

**No-objetivos (YAGNI):** no se añade backend, carrito real, pasarela de pago, CMS ni framework.
Sigue siendo estático sin build. No se rediseña la identidad de marca (se respeta el manual
existente en `docs/brandIdentity.md`).

## 3. Decisiones de diseño (aprobadas)

| # | Decisión | Elección | Motivo |
|---|----------|----------|--------|
| 1 | Modelo de interacción | **Máquina-portada que "dispensa" secciones** como página completa, con vuelta a la máquina | Equilibrio entre efecto-sorpresa, legibilidad y móvil |
| 2 | Construcción de la máquina | **Dibujada a medida en CSS/SVG** (no foto) | Botones nítidos y 100% clicables, responsive perfecto, animación fluida y accesible |
| 3 | Animación al pulsar | **Caída a la bandeja + subida a pantalla completa** ("vending real") | Es la más literal: se siente como comprar |
| 4 | Botonera | **6 botones** = 6 secciones | Cubre todo el contenido actual sin saturar |
| 5 | Contenido | **Conservar todo, recortando textos** | Reutiliza el contenido y funciones; los textos se acortan para el formato "panel" |
| 6 | Home | **Máquina + pegatinas (0€, 24/7) + barra de confianza** | Inmersiva pero el negocio se entiende de un vistazo |

## 4. Arquitectura técnica

**Single `index.html` con vistas conmutadas por JavaScript**, manteniendo el carácter estático
(sin build, sin dependencias).

- La **home** (máquina) es la vista por defecto.
- Cada **sección** es un panel (`<section class="panel">`) oculto por defecto; se muestra al
  pulsar su botón.
- **Routing por hash:** cada sección tiene una ruta (`#serveis`, `#avantatges`, `#com-funciona`,
  `#a-qui-servim`, `#atencio`, `#contacte`). La home es `#` (sin hash) o `#inici`.
  - Enlaces compartibles y recarga: abrir `…/#contacte` muestra directamente ese panel.
  - El botón **atrás** del navegador vuelve a la máquina (gestión vía `hashchange` + `history`).

### Alternativas descartadas
- **Páginas HTML separadas por sección:** provoca recarga completa (mata la animación de
  dispensado), duplica el markup de máquina/footer e complica el i18n.
- **Scroll-to-section (como ahora):** no transmite la sensación de "comprar"; contradice el
  objetivo.

## 5. La home (máquina)

Ocupa el viewport completo, **sin scroll** (experiencia inmersiva). Composición de arriba abajo:

1. **Barra superior:** logo Baixter (izquierda) + selector de idioma **CA/ES** (derecha). Se
   conserva la lógica actual del switcher.
2. **Máquina central (CSS/SVG):**
   - **Cabezal** con el logo Baixter impreso.
   - **Escaparate** con productos reales tras un "cristal" (reflejo/sheen), imágenes en
     **grayscale** según regla de marca (`snack.jpg`, `refrescos.jpg`).
   - **Display** navy con texto dinámico: estado reposo = *"SELECCIONA UNA SECCIÓ"*.
   - **Botonera** de 6 botones (ver §6).
   - **Bandeja** de recogida en la base (zona donde "cae" la sección).
3. **Pegatinas** adheridas a la máquina (estilo etiqueta, ligera rotación): `0€ instal·lació`,
   `0€ manteniment`, `24/7`.
4. **Barra de confianza** inferior: sectores a los que sirve (Indústria, Oficines, Hotels,
   Gimnasos, Centres educatius…), reaprovechando el contenido del actual *Trust bar*.

**Fondo:** pared de productos de vending difuminada (grayscale + blur + oscurecido) con glows
navy/ámbar, para dar ambiente sin restar legibilidad.

## 6. Botonera (6 botones)

Cada botón es un `<button>` real con código tipo vending + etiqueta, y refuerza la metáfora de
compra:

| Código | Etiqueta (CA) | Ruta (hash) | Sección destino |
|--------|---------------|-------------|-----------------|
| 11 | Serveis | `#serveis` | Serveis |
| 12 | Avantatges | `#avantatges` | Avantatges |
| 21 | Com funciona | `#com-funciona` | Com funciona |
| 22 | A qui servim | `#a-qui-servim` | Sectores |
| 31 | Atenció al client | `#atencio` | SAT |
| 32 | Contacte | `#contacte` | Contacte |

- El CTA "Sol·licitar gratis" de la barra superior apunta al botón/ruta **Contacte**.
- Estados visuales: reposo, hover/focus (resalte ámbar), activo (`aria-current`).

## 7. Animación de dispensado

Secuencia al pulsar un botón (duración total objetivo ~1,1–1,3 s, ágil):

1. El botón pulsado **se ilumina** en ámbar; el display cambia a *"DISPENSANT… {SECCIÓ}"*.
2. Una **cápsula/producto cae** a la bandeja (caída con leve rotación + **destello** en la
   bandeja).
3. El **panel de la sección sube** a pantalla completa desde la bandeja (origen inferior).
4. **Volver:** "← Tornar a la màquina" → el panel baja/se desvanece y reaparece la máquina; el
   display vuelve a reposo.

**Accesibilidad de movimiento:** con `prefers-reduced-motion: reduce` se sustituye toda la
secuencia por un **fundido simple** (sin caída ni desplazamientos). En **móvil** la animación se
acorta/simplifica para mantener la fluidez.

## 8. Secciones (paneles)

Cada panel es una **página completa scrollable** con:
- **Barra superior del panel:** logo + botón **"← Tornar a la màquina"** (y selector de idioma).
- **Contenido** de la sección (textos recortados respecto al actual).
- **Footer** al final (reaprovecha el footer actual).

Contenido por sección (todo reaprovechado del `index.html` actual, con textos más breves):

- **Serveis** — 3 tarjetas: Màquines de Cafè (destacada), Snacks, Begudes.
- **Avantatges** — 6 motivos: cost zero, resposta ràpida, sense compromisos, màquines
  homologades, benestar de l'equip, servei local.
- **Com funciona** — 3 passos: Contacta'ns → Planifiquem junts → Instal·lem i llest.
- **A qui servim** — diagrama de sectores (hospitals, col·legis, indústria, oficines, hotels,
  gimnasos, residències, administracions).
- **Atenció al client (SAT)** — filas de contacto (Pere 605 91 39 63, Jordi 605 91 39 64,
  sat@vendingbaixter.com) + **campo "NUM. MÀQUINA"** (se conserva).
- **Contacte** — formulario completo (nom, empresa, email, telèfon, tipus de màquina, missatge,
  acceptació privacitat) con validación y mensaje de éxito (se conserva). Se le **fusiona** el
  contenido del CTA intermedio actual ("La teva empresa encara no té vending?") como intro.

**Reubicación de elementos actuales:**
- *Trust bar* → barra de confianza de la **home**.
- *Hero* (stats 0€/0€/24/7) → **pegatinas** de la máquina en la home.
- *CTA banner* intermedio → **intro de Contacte**.

## 9. i18n (CA/ES)

- Se mantiene `translations.js` y el patrón `data-i18n` / `data-i18n-html` /
  `data-i18n-placeholder`.
- Se **añaden** las cadenas nuevas de la interfaz-máquina: texto del display en reposo y en
  dispensado, etiquetas de los 6 botones, botón "Tornar a la màquina", pegatinas, textos de la
  barra de confianza.
- El cambio de idioma debe funcionar tanto en la home como dentro de los paneles.

## 10. Accesibilidad

- Botones de la máquina = `<button>` reales: navegables por teclado (Tab), activables con
  Enter/Espacio, con **foco visible**.
- `aria-current="page"` o estado activo en el botón/sección abierta.
- El cambio de vista mueve el **foco** al inicio del panel; "Tornar" devuelve el foco al botón
  de origen.
- El routing por hash permite navegación con teclado y compatibilidad con lectores de pantalla.
- Contraste de texto conforme a AA (overlay oscuro sobre imágenes, regla de marca).

## 11. Responsive

- **Escritorio:** máquina centrada, botonera en rejilla (p. ej. 2×3), pegatinas visibles.
- **Tablet:** la máquina escala; pegatinas reposicionadas.
- **Móvil:** la máquina se adapta a ancho; los botones se **apilan**; los paneles son
  full-screen con scroll; la animación de dispensado se simplifica.

## 12. Marca y design tokens

Se respeta el sistema existente (`:root` en `styles.css` y `docs/brandIdentity.md`):
Navy `#0A2240`, Ámbar `#F2A900`, Onyx `#111`/`#1A1A1A`, bordes `#2D2D2D`, Montserrat (display) +
Inter (data), radios industriales (2–8px), imágenes en grayscale con overlay.

## 13. Archivos afectados

- `index.html` — reestructuración: home-máquina + 6 paneles de sección + barras de panel.
- `assets/css/styles.css` — nuevos estilos: máquina (cabezal, escaparate/cristal, display,
  botonera, bandeja), pegatinas, barra de confianza, animación de dispensado, paneles de sección;
  reutilizando tokens existentes.
- `assets/js/script.js` — router por hash, lógica de dispensado (estados del display,
  animación), gestión de foco, integración con el botón "Tornar"; se conserva la lógica de
  navbar/scroll/formulario adaptada al nuevo modelo.
- `assets/js/translations.js` — cadenas nuevas (display, botones, "Tornar", pegatinas, confianza)
  en CA y ES.
- **Sin cambios:** imágenes (`assets/images/`), identidad de marca, dependencias (ninguna).

## 14. Criterios de aceptación

1. Al cargar la web se ve la **máquina** (no scroll) con logo, escaparate, display, 6 botones,
   pegatinas y barra de confianza, sobre fondo de productos.
2. Pulsar un botón reproduce la **animación de dispensado** (caída + subida) y abre la sección
   correspondiente a pantalla completa.
3. "← Tornar a la màquina" devuelve a la home.
4. Las rutas por hash funcionan: recargar en `#contacte` abre Contacte; el botón atrás vuelve a
   la máquina.
5. **Todo el contenido y funciones actuales** siguen presentes (6 secciones, formulario con
   validación, campo nº de màquina, i18n CA/ES), con textos recortados.
6. Funciona en escritorio y móvil; respeta `prefers-reduced-motion`; botones navegables por
   teclado con foco visible.
7. Se mantiene la identidad de marca (colores, tipografías, grayscale) y el sitio sigue siendo
   estático sin build.
