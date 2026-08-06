/* ============================================================
   T.O.Q — main.js
   Nav móvil · revelado en scroll · planos 3D · carrusel · formulario
   Vanilla JS. Sin dependencias, sin build.
   ============================================================ */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var motion = document.documentElement.getAttribute("data-motion") || "completo";
  var motionOff = reduced || motion === "ninguno";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function rgba(hex, a) {
    var h = String(hex).replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var v = parseInt(h, 16);
    if (isNaN(v)) return "rgba(59,130,246," + a + ")";
    return "rgba(" + ((v >> 16) & 255) + "," + ((v >> 8) & 255) + "," + (v & 255) + "," + a + ")";
  }
  var ACCENT = (getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#3b82f6").trim();

  /* ---------- Año en el footer ---------- */
  var yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav móvil ---------- */
  var burger = $("[data-burger]");
  var mobileNav = $("[data-mobilenav]");
  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      var open = mobileNav.hasAttribute("data-open");
      if (open) mobileNav.removeAttribute("data-open");
      else mobileNav.setAttribute("data-open", "");
      burger.setAttribute("aria-expanded", String(!open));
    });
    $$("[data-navclose]", mobileNav).forEach(function (a) {
      a.addEventListener("click", function () { mobileNav.removeAttribute("data-open"); });
    });
  }

  /* ---------- Revelado en scroll ---------- */
  function show(el) {
    var d = motionOff ? 0 : parseInt(el.getAttribute("data-d") || "0", 10);
    el.style.transitionDelay = d + "ms";
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.filter = "none";
    el.setAttribute("data-seen", "1");
  }
  if (motionOff || !("IntersectionObserver" in window)) {
    $$("[data-reveal]").forEach(show);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        show(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$("[data-reveal]").forEach(function (el) { io.observe(el); });
  }

  /* ---------- Header compacto al hacer scroll ---------- */
  var header = $("[data-header]");
  var nav = $("[data-nav]");
  if (header && nav && "IntersectionObserver" in window) {
    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:70px;pointer-events:none";
    document.body.insertBefore(sentinel, document.body.firstChild);
    new IntersectionObserver(function (entries) {
      var top = entries[0].isIntersecting;
      header.style.background = top ? "rgba(8,9,11,.66)" : "rgba(8,9,11,.9)";
      header.style.borderBottomColor = top ? "var(--border)" : "var(--border-strong)";
      header.style.boxShadow = top ? "none" : "0 12px 34px -26px rgba(0,0,0,.9)";
      nav.style.padding = top ? "16px 26px" : "11px 26px";
    }, { threshold: 0 }).observe(sentinel);
  }

  /* ---------- Hero: resplandor que sigue al puntero + wordmark 3D ---------- */
  var hero = $("[data-hero]");
  var glow = $("[data-glow]");
  var word = $("[data-word3d]");
  if (hero && !motionOff) {
    var raf = null;
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      var nx = x / r.width - 0.5, ny = y / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        if (glow) {
          glow.style.opacity = "1";
          glow.style.transform = "translate3d(" + x + "px," + y + "px,0)";
        }
        if (word) word.style.transform = "rotateY(" + (nx * 11).toFixed(2) + "deg) rotateX(" + (-ny * 7).toFixed(2) + "deg)";
      });
    });
    hero.addEventListener("pointerleave", function () {
      if (glow) glow.style.opacity = "0";
      if (word) word.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  }

  /* ---------- Botón magnético ---------- */
  $$("[data-magnet]").forEach(function (el) {
    if (motionOff) return;
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = "translate3d(" + (dx * 7).toFixed(1) + "px," + (dy * 4 - 2).toFixed(1) + "px,0)";
    });
    el.addEventListener("pointerleave", function () { el.style.transform = "translate3d(0,0,0)"; });
  });

  /* ---------- Marco 3D del producto insignia ---------- */
  $$("[data-tiltzone]").forEach(function (host) {
    var stage = $("[data-tilt3d]", host);
    var frame = $("[data-frame]", host);
    var glare = frame ? $("[data-glare]", frame) : null;
    if (!stage || motionOff) return;
    host.addEventListener("pointermove", function (e) {
      var r = host.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      stage.style.transform = "rotateY(" + (px * 11).toFixed(2) + "deg) rotateX(" + (-py * 9).toFixed(2) + "deg)";
      if (frame) frame.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,.09),0 14px 32px -12px rgba(0,0,0,.55),0 36px 74px -26px rgba(0,0,0,.6),0 26px 62px -20px " + rgba(ACCENT, 0.22);
      if (glare) {
        glare.style.opacity = "1";
        glare.style.background = "radial-gradient(420px circle at " + ((px + 0.5) * 100).toFixed(1) + "% " + ((py + 0.5) * 100).toFixed(1) + "%, rgba(255,255,255,.12), transparent 45%)";
      }
    });
    host.addEventListener("pointerleave", function () {
      stage.style.transform = "rotateY(0deg) rotateX(0deg)";
      if (frame) frame.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,.07),0 10px 26px -10px rgba(0,0,0,.5),0 28px 60px -24px rgba(0,0,0,.55)";
      if (glare) glare.style.opacity = "0";
    });
  });

  /* ---------- Tarjetas: inclinación 3D + reflejo ---------- */
  $$("[data-card]").forEach(function (el) {
    if (motionOff) return;
    var ready = false;
    el.addEventListener("pointermove", function (e) {
      if (!el.hasAttribute("data-seen")) return;
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      if (!ready) {
        ready = true;
        el.style.transitionDelay = "0ms";
        el.style.transitionProperty = "transform,border-color,background,box-shadow,filter,opacity";
        el.style.transitionDuration = ".3s,.3s,.3s,.45s,.3s,.3s";
      }
      el.style.transform = "perspective(1000px) rotateY(" + ((px - 0.5) * 7).toFixed(2) + "deg) rotateX(" + ((0.5 - py) * 6).toFixed(2) + "deg) translateY(-4px)";
      var g = $("[data-glare]", el);
      if (g) g.style.background = "radial-gradient(460px circle at " + (px * 100).toFixed(1) + "% " + (py * 100).toFixed(1) + "%, rgba(255,255,255,.10), transparent 44%)";
    });
    el.addEventListener("pointerleave", function () {
      if (ready) el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)";
    });
  });

  /* ---------- Fundadores: click fija el color ---------- */
  $$("[data-team]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (el.hasAttribute("data-color")) el.removeAttribute("data-color");
      else el.setAttribute("data-color", "");
    });
    el.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      el.click();
    });
  });

  /* ---------- Carrusel de capturas de ObtenYA ---------- */
  var slides = $$("[data-slide]");
  var tabs = $$("[data-tab]");
  var shot = 0, shotTimer = null;
  function showShot(i) {
    if (!slides.length) return;
    shot = ((i % slides.length) + slides.length) % slides.length;
    slides.forEach(function (el, k) { if (k === shot) el.setAttribute("data-on", ""); else el.removeAttribute("data-on"); });
    tabs.forEach(function (el, k) { if (k === shot) el.setAttribute("data-on", ""); else el.removeAttribute("data-on"); });
  }
  function startShots() {
    if (shotTimer) clearInterval(shotTimer);
    if (motionOff || !slides.length) return;
    shotTimer = setInterval(function () { showShot(shot + 1); }, 4600);
  }
  tabs.forEach(function (el, i) {
    el.addEventListener("click", function () {
      showShot(parseInt(el.getAttribute("data-i") || String(i), 10));
      startShots();
    });
  });
  startShots();

  /* ---------- Formulario de contacto ---------- */
  var form = $("[data-form]");
  if (form) {
    var spinner = $("[data-spinner]", form);
    var okBox = $("[data-sent]", form);
    var errBox = function (name) { return $('[data-err="' + name + '"]', form); };
    var setErr = function (name, on) {
      var el = errBox(name);
      if (!el) return;
      if (on) el.setAttribute("data-on", "");
      else el.removeAttribute("data-on");
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.nombre.value || "").trim();
      var mail = (form.email.value || "").trim();
      var msg = (form.mensaje.value || "").trim();
      var bad = [!name, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail), !msg];
      setErr("nombre", bad[0]);
      setErr("email", bad[1]);
      setErr("mensaje", bad[2]);
      if (bad[0] || bad[1] || bad[2]) return;

      /* Envío por WhatsApp (Click to Chat): abre WhatsApp con el mensaje ya
         escrito; el visitante solo pulsa enviar. Gratis, sin backend ni API.
         window.open va aquí, dentro del gesto de envío, para que no lo bloquee
         el navegador como popup. */
      var texto =
        "Hola T.O.Q, soy " + name + " (" + mail + ").\n\nMi proyecto:\n" + msg;
      window.open(
        "https://wa.me/593983760090?text=" + encodeURIComponent(texto),
        "_blank", "noopener"
      );

      if (spinner) spinner.setAttribute("data-on", "");
      if (okBox) okBox.removeAttribute("data-on");
      setTimeout(function () {
        form.reset();
        if (spinner) spinner.removeAttribute("data-on");
        if (okBox) okBox.setAttribute("data-on", "");
        setTimeout(function () { if (okBox) okBox.removeAttribute("data-on"); }, 6000);
      }, 700);
    });
  }

  /* ---------- Índice lateral de páginas legales ---------- */
  var tocLinks = $$("[data-toc] a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var heads = tocLinks.map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    }).filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        tocLinks.forEach(function (a) {
          if (a.getAttribute("href").slice(1) === e.target.id) a.setAttribute("data-on", "");
          else a.removeAttribute("data-on");
        });
      });
    }, { rootMargin: "-104px 0px -68% 0px", threshold: 0 });
    heads.forEach(function (h) { spy.observe(h); });
  }
})();
