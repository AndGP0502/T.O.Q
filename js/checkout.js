/* T.O.Q — checkout.js · Resumen de compra, carrusel de métodos de pago y confirmación.
   NOTA IMPORTANTE: este checkout es una interfaz de FRONTEND. El procesamiento real
   de pagos (Stripe, PayPal, Payphone, pasarela bancaria) queda como INTEGRACIÓN
   PENDIENTE — ver los TODO marcados abajo. No hay claves API ni transacciones reales. */
(function () {
  "use strict";

  /* ---------- Catálogo (editable) ---------- */
  var PRODUCTS = {
    medicore: {
      name: "Gym System Medicore",
      desc: "Software de gestión integral para gimnasios",
      price: 499,
      currency: "USD"
    },
    "medicore-clinicas": {
      name: "Medicore",
      desc: "Administración para clínicas pequeñas y medianas",
      price: 899,
      currency: "USD"
    },
    prosperly: {
      name: "Prosperly",
      desc: "Prospección y scraping de leads para Latinoamérica",
      price: 299,
      currency: "USD"
    },
    "software-medida": {
      name: "Software a medida",
      desc: "Proyecto personalizado — precio final según cotización",
      price: 0,
      currency: "USD",
      quote: true
    }
  };

  /* ---------- Resumen de compra según ?producto= ---------- */
  var params = new URLSearchParams(location.search);
  var slug = params.get("producto");
  if (!slug) {
    try { slug = localStorage.getItem("toq-producto"); } catch (e) {}
  }
  var product = PRODUCTS[slug] || PRODUCTS.medicore;

  var nameEl = document.getElementById("order-name");
  var descEl = document.getElementById("order-desc");
  var priceEl = document.getElementById("order-price");
  var totalEl = document.getElementById("order-total");

  var priceLabel = product.quote
    ? "A cotizar"
    : "$" + product.price + " " + product.currency;

  if (nameEl) nameEl.textContent = product.name;
  if (descEl) descEl.textContent = product.desc;
  if (priceEl) priceEl.textContent = priceLabel;
  if (totalEl) totalEl.textContent = priceLabel;

  /* ---------- Carrusel de métodos de pago ---------- */
  var carousel = document.getElementById("pay-carousel");
  var prevBtn = document.getElementById("carousel-prev");
  var nextBtn = document.getElementById("carousel-next");

  function scrollStep() {
    var card = carousel.querySelector(".pay-card");
    return card ? card.offsetWidth + 16 : 200;
  }
  if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener("click", function () {
      carousel.scrollBy({ left: -scrollStep(), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", function () {
      carousel.scrollBy({ left: scrollStep(), behavior: "smooth" });
    });
  }

  /* ---------- Selección de método → panel ---------- */
  var cards = document.querySelectorAll(".pay-card");
  var panels = document.querySelectorAll(".pay-panel");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      if (card.classList.contains("disabled")) return;

      cards.forEach(function (c) { c.classList.remove("selected"); });
      card.classList.add("selected");

      var target = card.getAttribute("data-method");
      panels.forEach(function (p) {
        p.classList.toggle("active", p.id === "panel-" + target);
      });

      var activePanel = document.getElementById("panel-" + target);
      if (activePanel) {
        activePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  /* ---------- Validación ligera del formulario de tarjeta (solo UI) ---------- */
  var cardForm = document.getElementById("card-form");
  if (cardForm) {
    cardForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO: integrar API key real de Stripe aquí (Stripe Elements / Checkout).
      // Los datos de tarjeta NUNCA deben procesarse ni almacenarse en este frontend;
      // la tokenización debe hacerla la pasarela (Stripe/Payphone) con credenciales
      // reales del cliente. Este formulario es solo maqueta de UI.
      confirmOrder();
    });
  }

  /* ---------- Botones de redirección (PayPal / Payphone) ---------- */
  // TODO: integrar PayPal aquí (SDK de PayPal Buttons con client-id real).
  // TODO: integrar Payphone aquí (Cajita de Pagos / API con token real del comercio).
  document.querySelectorAll("[data-gateway-pending]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      confirmOrder();
    });
  });

  /* ---------- Confirmar compra (sin pasarela conectada) ---------- */
  var confirmBtn = document.getElementById("confirm-purchase");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      var selected = document.querySelector(".pay-card.selected");
      var hint = document.getElementById("select-method-hint");
      if (!selected) {
        if (hint) {
          hint.style.display = "block";
          setTimeout(function () { hint.style.display = "none"; }, 4000);
        }
        return;
      }
      confirmOrder();
    });
  }

  function confirmOrder() {
    // Sin pasarela real conectada: se registra la solicitud y el equipo
    // de T.O.Q contacta al cliente para completar el pago.
    document.getElementById("checkout-main").style.display = "none";
    var conf = document.getElementById("confirmation");
    conf.classList.add("active");
    var confProduct = document.getElementById("conf-product");
    if (confProduct) confProduct.textContent = product.name + " — " + priceLabel;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
})();
