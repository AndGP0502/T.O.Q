# Imágenes del sitio

Reemplaza estos archivos placeholder por los reales manteniendo **el mismo nombre y extensión**.
Si cambias la extensión (ej. a `.jpg`), actualiza también el `src` en el HTML correspondiente.

## productos/&lt;producto&gt;/ — capturas del carrusel de tienda.html (horizontales 16:10, ~1280×800 px, WebP)
Cada producto tiene su carpeta; las capturas se nombran `1.webp`, `2.webp`, `3.webp` (en ese orden se muestran).
Mientras un archivo no exista, el carrusel muestra un placeholder "Screenshot próximamente"; al subirlo aparece solo, sin tocar código.
- `prosperly/1.webp … 3.webp`
- `medicore/1.webp … 3.webp`
- `gym/1.webp … 3.webp`
- `portales-web/1.webp … 3.webp`
- `software-medida/1.webp … 3.webp`

Para más o menos capturas, ajusta `data-count` en la tarjeta correspondiente de tienda.html.
Si usas otra extensión (ej. `.png`), añade `data-ext="png"` en esa tarjeta.

## productos/&lt;producto&gt;/ — logos (cuadrados, 256×256 px mín., PNG con fondo transparente)
- `gym/gym-system-logo.png` → index.html, tienda.html
- `medicore/medicore-logo.png` → index.html, tienda.html
- `prosperly/prosperly-logo.png` → index.html, tienda.html
- `software-medida/software-medida-logo.png` → tienda.html

## productos/&lt;producto&gt;/ — vistas previas (horizontales, PNG/JPEG)
- `prosperly/prosperly-preview.png` → index.html
- `medicore/medicore-preview.jpeg` → index.html
- `gym/gym-system-preview.png` → index.html
- `portales-web/portales-web-preview.png` → index.html
- `software-medida/software-medida-preview.png` → (sin uso actual en HTML)

## servicios/ — íconos o fotos (cuadrados, 256×256 px mín.)
- `individuos.png` → index.html (sección Servicios)
- `empresas.png` → index.html (sección Servicios)

## equipo/ — fotos de perfil (cuadradas 1:1, 400×400 px mín.)
- `andre-garzon.png` → index.html, sobre-nosotros.html
- `dennys-chanchicocha.png` → index.html, sobre-nosotros.html

Las fotos se recortan en círculo y se muestran en blanco y negro; recuperan el color al pasar el cursor.
