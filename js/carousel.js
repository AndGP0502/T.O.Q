/* T.O.Q — carousel.js · Carrusel de imágenes por producto (vanilla JS)
   ------------------------------------------------------------------
   Uso en HTML:
     <div class="product-carousel" data-carousel
          data-name="Prosperly"
          data-dir="assets/img/productos/prosperly"
          data-preview="prosperly-preview"
          data-count="4"></div>

   Convención de archivos: <data-dir>/1.webp, 2.webp, ... hasta data-count.
   (La extensión puede cambiarse con data-ext="png|jpg|webp"; por defecto webp.)

   data-preview (opcional): nombre base, sin extensión, de la captura real
   para la primera diapositiva. La extensión se detecta probando en orden
   png → jpeg → jpg → webp; se usa la primera que cargue.

   data-images (opcional): lista separada por comas de archivos (con
   extensión) dentro de data-dir, en el orden exacto de las diapositivas.
   Tiene prioridad sobre data-preview y la convención numérica; las
   diapositivas sin archivo en la lista quedan como placeholder.

   Mientras un archivo no exista, la diapositiva muestra un placeholder
   ("Screenshot próximamente"). Al subir la imagen real a esa ruta, se
   muestra automáticamente sin tocar código. */
(function () {
  "use strict";

  var SWIPE_MIN_PX = 40;  // arrastre mínimo para cambiar de diapositiva
  var FLICK_MS = 250;     // gesto rápido (flick)…
  var FLICK_MIN_PX = 30;  // …con este desplazamiento también cambia

  /* Extensiones que se prueban, en orden, para data-preview */
  var IMG_EXTS = ["png", "jpeg", "jpg", "webp"];

  /* Icono de monitor para el placeholder */
  var PLACEHOLDER_ICON =
    '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" ' +
    'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="2.5" y="4" width="19" height="13" rx="1.5"></rect>' +
    '<path d="M12 17v3.5"></path><path d="M8 20.5h8"></path></svg>';

  /* ---------- Construcción de piezas ---------- */

  function buildSlide(sources, name, i, total) {
    var slide = document.createElement("div");
    slide.className = "pc-slide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "diapositiva");
    slide.setAttribute("aria-label", i + " de " + total);

    var ph = document.createElement("div");
    ph.className = "pc-placeholder";
    ph.setAttribute("aria-hidden", "true");
    ph.innerHTML = PLACEHOLDER_ICON + "<span>Screenshot próximamente</span>";
    slide.appendChild(ph);

    var img = document.createElement("img");
    img.alt = name + " — captura " + i;
    /* La primera captura se ve al entrar: carga inmediata; el resto, lazy */
    img.loading = i === 1 ? "eager" : "lazy";
    img.decoding = "async";
    img.draggable = false;
    /* La imagen solo se muestra cuando carga bien. Si una ruta falla (404)
       se prueba la siguiente candidata; agotadas todas, queda el placeholder. */
    var k = 0;
    img.addEventListener("load", function () { slide.classList.add("has-img"); });
    img.addEventListener("error", function () {
      k++;
      if (k < sources.length) img.src = sources[k];
      else slide.classList.remove("has-img");
    });
    /* Sin candidatas (p. ej. diapositiva reservada como placeholder en
       data-images) no se pide nada: el placeholder queda visible. */
    if (sources.length) img.src = sources[0];
    slide.appendChild(img);

    return slide;
  }

  function buildArrow(dirCls, label) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "pc-arrow " + dirCls;
    b.setAttribute("aria-label", label);
    b.textContent = dirCls === "prev" ? "‹" : "›";
    return b;
  }

  /* ---------- Swipe / arrastre (Pointer Events: táctil + ratón) ---------- */

  function attachSwipe(root, track, state) {
    var startX = 0, startTime = 0, delta = 0, active = false, width = 0;

    function release() {
      if (!active) return;
      active = false;
      root.classList.remove("dragging");

      var isFlick = Date.now() - startTime < FLICK_MS && Math.abs(delta) > FLICK_MIN_PX;
      var isFar = Math.abs(delta) > Math.max(SWIPE_MIN_PX, width * 0.15);

      if ((isFar || isFlick) && delta < 0) state.goTo(state.index + 1);
      else if ((isFar || isFlick) && delta > 0) state.goTo(state.index - 1);
      else state.goTo(state.index); // no llegó al umbral: vuelve a su sitio
      delta = 0;
    }

    root.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest(".pc-arrow, .pc-dots")) return;
      active = true;
      delta = 0;
      startX = e.clientX;
      startTime = Date.now();
      width = root.clientWidth;
      root.classList.add("dragging");
      try { root.setPointerCapture(e.pointerId); } catch (err) { /* puntero ya inactivo */ }
    });

    root.addEventListener("pointermove", function (e) {
      if (!active) return;
      delta = e.clientX - startX;
      /* Resistencia en los extremos (no hay más diapositivas) */
      var atEdge =
        (state.index === 0 && delta > 0) ||
        (state.index === state.count - 1 && delta < 0);
      if (atEdge) delta = delta / 3;
      track.style.transform =
        "translateX(calc(" + (-state.index * 100) + "% + " + delta + "px))";
    });

    root.addEventListener("pointerup", release);
    root.addEventListener("pointercancel", release);
  }

  /* ---------- Inicialización de un carrusel ---------- */

  function initCarousel(root) {
    var name = root.getAttribute("data-name") || "Producto";
    var dir = (root.getAttribute("data-dir") || "").replace(/\/+$/, "");
    var count = parseInt(root.getAttribute("data-count"), 10) || 3;
    var ext = root.getAttribute("data-ext") || "webp";
    var preview = root.getAttribute("data-preview") || "";
    var images = (root.getAttribute("data-images") || "")
      .split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean);

    root.setAttribute("role", "region");
    root.setAttribute("aria-roledescription", "carrusel");
    root.setAttribute("aria-label", "Capturas de " + name);

    var track = document.createElement("div");
    track.className = "pc-track";
    for (var i = 1; i <= count; i++) {
      var sources;
      if (images.length) {
        /* Lista explícita: la diapositiva i usa images[i-1]; sin entrada,
           queda como placeholder */
        sources = i <= images.length ? [dir + "/" + images[i - 1]] : [];
      } else if (i === 1 && preview) {
        sources = IMG_EXTS.map(function (e) { return dir + "/" + preview + "." + e; });
      } else {
        sources = [dir + "/" + i + "." + ext];
      }
      track.appendChild(buildSlide(sources, name, i, count));
    }
    root.appendChild(track);

    var state = { index: 0, count: count, goTo: goTo };

    /* Con una sola imagen no hacen falta controles */
    if (count < 2) return;

    var prev = buildArrow("prev", "Imagen anterior");
    var next = buildArrow("next", "Imagen siguiente");
    root.appendChild(prev);
    root.appendChild(next);

    var dots = document.createElement("div");
    dots.className = "pc-dots";
    var dotEls = [];
    for (var d = 0; d < count; d++) {
      (function (d) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "pc-dot";
        b.setAttribute("aria-label", "Ir a la imagen " + (d + 1));
        b.addEventListener("click", function () { goTo(d); });
        dots.appendChild(b);
        dotEls.push(b);
      })(d);
    }
    root.appendChild(dots);

    function goTo(i) {
      state.index = Math.max(0, Math.min(count - 1, i));
      track.style.transform = "translateX(" + (-state.index * 100) + "%)";
      prev.disabled = state.index === 0;
      next.disabled = state.index === count - 1;
      dotEls.forEach(function (b, j) {
        b.classList.toggle("active", j === state.index);
        if (j === state.index) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });
    }

    prev.addEventListener("click", function () { goTo(state.index - 1); });
    next.addEventListener("click", function () { goTo(state.index + 1); });

    attachSwipe(root, track, state);
    goTo(0);
  }

  document.querySelectorAll("[data-carousel]").forEach(function (el) {
    initCarousel(el);
  });
})();
