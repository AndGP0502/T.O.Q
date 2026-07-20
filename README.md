# T.O.Q — Transforma O Quiebra

Sitio web oficial de **T.O.Q**, desarrolladora de software. Landing + páginas internas + tienda con checkout (interfaz de pago lista, pasarelas pendientes de integrar).

**Fundadores:** André Garzón (CEO fundador) · Dennys Chanchicocha (COO Co-fundador)

---

## 🚀 Cómo ver el sitio

No requiere instalación. Dos opciones:

**Opción A — abrir directo:** doble clic en `index.html`.

**Opción B — servidor local (recomendado, evita problemas con rutas):**
```bash
python3 -m http.server 8742
```
Luego abre <http://localhost:8742> en el navegador.

---

## 📁 Estructura

```
T.O.Q.py/
├── index.html              # Home (hero, nosotros, servicios, productos, contacto)
├── tienda.html             # Catálogo de productos
├── checkout.html           # Pago (resumen + carrusel de métodos + confirmación)
├── sobre-nosotros.html     # Historia y fundadores
├── mision-vision.html      # Misión, visión y valores
├── terminos-condiciones.html
├── politica-privacidad.html
├── css/
│   └── styles.css          # TODO el estilo (variables de tema en :root)
└── js/
    ├── main.js             # Menú móvil, animaciones, formulario de contacto
    └── checkout.js         # Productos, precios, carrusel de pago, confirmación
```

> El header y el footer están duplicados en cada HTML (no hay includes). Para cambiar el menú en todas las páginas, usa **Buscar en todos los archivos** (`Cmd+Shift+F` en VS Code).

---

## 🛒 Agregar o editar productos

Un producto vive en **dos lugares** que deben coincidir:

1. **`js/checkout.js`** → objeto `PRODUCTS` (nombre, descripción, precio, slug).
2. **`tienda.html`** → una tarjeta `.product-card` con enlace `checkout.html?producto=SLUG`.

Precios actuales: Medicore $899 · Gym System Medicore $499 · Prosperly $299.

---

## 💳 Integrar pasarelas de pago (pendiente)

El checkout es **solo interfaz** por ahora. Busca los comentarios `TODO` en `js/checkout.js`:

- **Stripe** (tarjeta) → pegar clave **pública** (`pk_live_...`) e inicializar Stripe Elements.
- **PayPal / Payphone** → pegar `client-id` / token de comercio.

⚠️ **Nunca pongas claves secretas (`sk_...`) en el frontend.** Van solo en un backend, como variables de entorno (`.env`, ya ignorado por git).

El formulario de contacto también está pendiente de backend (`TODO` en `js/main.js`; opción rápida: [Formspree](https://formspree.io)).

---

## 🎨 Cambiar colores

Todo el tema sale de las variables en `css/styles.css` → bloque `:root`:
`--accent` (cian), `--accent-2` (violeta), `--bg` (fondo).

---

## 🔧 Placeholders por completar

Búscalos con `Cmd+Shift+F` escribiendo `[` — están entre corchetes:
correo, WhatsApp, redes sociales, datos bancarios y textos legales.

---

## 👥 Colaboración

Repo mantenido por el equipo T.O.Q. Para contribuir: crea una rama, haz tus cambios y abre un Pull Request.
