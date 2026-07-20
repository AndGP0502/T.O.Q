/* T.O.Q — main.js · Nav móvil, animaciones y formulario de contacto (vanilla JS) */
(function () {
  "use strict";

  /* ---------- Nav móvil ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open"));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---------- Marcar enlace activo ---------- */
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href").split("#")[0];
    if (href === current) a.classList.add("active");
  });

  /* ---------- Reveal on scroll ---------- */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- Respaldo del producto elegido (por si el entorno pierde el query string) ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[href*='checkout.html']") : null;
    if (!a) return;
    var m = a.getAttribute("href").match(/[?&]producto=([\w-]+)/);
    if (m) {
      try { localStorage.setItem("toq-producto", m[1]); } catch (err) {}
    }
  });

  /* ---------- Año dinámico en footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      form.querySelectorAll("[required]").forEach(function (field) {
        var error = field.parentElement.querySelector(".form-error");
        var value = field.value.trim();
        var bad =
          !value ||
          (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        field.classList.toggle("invalid", bad);
        if (error) error.style.display = bad ? "block" : "none";
        if (bad) valid = false;
      });

      if (!valid) return;

      // TODO: conectar con un backend real o servicio de formularios
      // (ej. Formspree, EmailJS o endpoint propio) para enviar el mensaje.
      form.reset();
      var ok = document.getElementById("contact-success");
      if (ok) {
        ok.style.display = "block";
        setTimeout(function () { ok.style.display = "none"; }, 6000);
      }
    });
  }
})();
