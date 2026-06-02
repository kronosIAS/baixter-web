# Baixter · Serveis de Vending — Web

Landing page corporativa estática de **Vending Baix Ter (Baixter)**: servicio de
máquinas de vending de café, snacks y bebidas para empresas del Baix Ter.

Sitio en HTML/CSS/JS puro (sin build ni dependencias), con tema oscuro premium,
soporte multiidioma (Català / Español) y diseño según el manual de marca.

## Estructura del proyecto

```
.
├── index.html                  # Página principal (única página del sitio)
├── assets/
│   ├── css/
│   │   └── styles.css          # Sistema de diseño completo (tokens de marca, layout, responsive)
│   ├── js/
│   │   ├── script.js           # Interacciones: navbar, menú móvil, scroll, formulario, animaciones
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
    └── generate_pdf.py         # Genera un PDF de la web (Playwright) en la raíz del proyecto
```

> `.vscode/` y `.claude/` contienen configuración del editor y del asistente.

## Cómo previsualizar

Al usar rutas relativas, basta con un servidor estático desde la raíz:

```bash
python -m http.server 8000
```

Y abrir <http://localhost:8000>.

## Generar el PDF

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
