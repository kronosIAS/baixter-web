# Baixter · Serveis de Vending — Web

Landing page corporativa estática de **Vending Baix Ter (Baixter)**: servicio de
máquinas de vending de café, snacks y bebidas para empresas del Baix Ter.

Sitio en HTML/CSS/JS puro (sin build ni dependencias), con tema oscuro premium,
soporte multiidioma (Català / Español) y diseño según el manual de marca.

## Modelo de navegación — Màquina de vending

La página de inicio **es** una máquina de vending interactiva renderizada en CSS.
El usuario pulsa uno de los **6 botones** de la máquina (códigos 11 / 12 / 21 / 22 / 31 / 32)
para "dispensar" la sección correspondiente, que se abre como un panel a pantalla completa.
Un botón **"Tornar a la màquina"** en cada panel devuelve al inicio.

La navegación usa hash routing; las rutas disponibles son:

| Código | Hash | Sección |
|--------|------|---------|
| 11 | `#serveis` | Serveis |
| 12 | `#avantatges` | Avantatges |
| 21 | `#com-funciona` | Com funciona |
| 22 | `#a-qui-servim` | A qui servim |
| 31 | `#atencio` | Atenció al client |
| 32 | `#contacte` | Contacte |

El idioma (CA/ES) y el formulario de contacto (incluido el campo número de máquina SAT)
se conservan en todos los paneles.

## Estructura del proyecto

```
.
├── index.html                  # Página principal (única página del sitio)
├── assets/
│   ├── css/
│   │   └── styles.css          # Sistema de diseño completo (tokens de marca, layout, responsive)
│   ├── js/
│   │   ├── script.js           # Interacciones: máquina-interfaz, hash routing, formulario, i18n
│   │   └── translations.js     # Diccionario i18n (CA/ES) + lógica de cambio de idioma
│   └── images/                 # Logo, banner y fotografías
│       ├── logo-baixter.jpg
│       ├── banner-baixter.jpg
│       ├── maquina-baixter.jpg
│       ├── refrescos.jpg
│       └── snack.jpg
├── docs/
│   └── brandIdentity.md        # Manual de identidad visual y design system
└── scripts/
    └── generate_pdf.py         # Genera un PDF de la web (Playwright) — ver nota más abajo
```

> `.vscode/` y `.claude/` contienen configuración del editor y del asistente.

## Cómo previsualizar

Al usar rutas relativas, basta con un servidor estático desde la raíz:

```bash
python -m http.server 8000
```

Y abrir <http://localhost:8000>. El sitio se sirve siempre desde la raíz del proyecto;
las secciones se abren añadiendo el hash correspondiente a la URL (p. ej. `http://localhost:8000/#serveis`).

## Generar el PDF

> **Nota:** el generador de PDF está pendiente de actualización para el nuevo modelo
> de navegación por hash. Actualmente solo captura la pantalla de la máquina (inicio);
> los 6 paneles de sección quedan fuera del PDF. Ver el comentario en `scripts/generate_pdf.py`.

Requiere Python con Playwright instalado (`pip install playwright` y
`playwright install chromium`):

```bash
python scripts/generate_pdf.py
```

Genera `baixter-vending-ca.pdf` en la raíz del proyecto.

## Convenciones

- **Todo asset nuevo** va dentro de `assets/` (`css/`, `js/` o `images/`).
- Las rutas en `index.html` son **relativas** (`assets/...`) para que el sitio
  funcione igual servido localmente o desplegado.
- Los colores, tipografías y radios están centralizados como variables CSS en
  `:root` (ver `assets/css/styles.css`); cambia ahí para ajustar la marca.
