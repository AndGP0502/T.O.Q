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
