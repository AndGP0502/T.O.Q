# T.O.Q — Transforma o Quiebra

Landing estática. Sin build, sin Node, sin dependencias.

## Estructura

```
index.html                Landing principal
tienda.html               Catálogo: insignia ObtenYA + 4 productos
checkout.html             Resumen sticky, métodos de pago y confirmación
sobre-nosotros.html       Manifiesto, el nombre y fundadores
mision-vision.html        Misión, visión y valores
terminos-condiciones.html Legal con índice lateral
politica-privacidad.html  Legal con índice lateral
css/styles.css            Variables, keyframes, media queries y estados hover/focus/active
js/main.js                Nav móvil, revelado en scroll, planos 3D, carrusel, formulario e índice legal
js/checkout.js            Catálogo de productos, método de pago y confirmación del pedido
assets/img/...            Retratos, iconos de servicios y capturas de producto
```

## Ejecutar en local

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Alternativas: `npx serve .` · `php -S localhost:8000` · o abrir `index.html` con doble clic.

## Desplegar

Cualquier hosting estático sirve la carpeta tal cual:

- **Netlify / Vercel**: arrastra la carpeta, sin comando de build.
- **GitHub Pages**: sube el contenido a la rama `gh-pages` o a `/docs` en `main`.
- **Nginx / Apache**: copia la carpeta al `document root`.

## Pendientes

- El formulario de contacto simula el envío. El punto de integración está marcado con `TODO backend` en `js/main.js`.
- `js/checkout.js` define el catálogo en la constante `CATALOGO` (slug → nombre, descripción, total, nota, logo). Los slugs vigentes son `obtenya`, `medicore-clinicas`, `gym-system`, `portales-web` y `software-medida`.
- El botón "Confirmar compra" registra la solicitud y deriva el cierre a WhatsApp. Los puntos de integración de Stripe, PayPal y Payphone están marcados con `TODO` en `js/checkout.js`.
- Los textos legales incluyen dos marcadores por definir: el país de constitución en Términos §10 y la revisión legal local.
- Falta el logo propio de ObtenYA: `assets/img/productos/obtenya/obtenya-logo.png` es una copia temporal del anterior.

## Movimiento

Las animaciones respetan `prefers-reduced-motion`. Para bajar la intensidad de forma global, añade
`data-motion="sutil"` (o `"ninguno"`) a la etiqueta `<html>` de `index.html`.
