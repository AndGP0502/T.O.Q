/* ============================================================
   T.O.Q — checkout.js
   Catálogo, selección de método de pago y confirmación del pedido.
   Vanilla JS. Sin dependencias, sin build.
   ============================================================ */
(function () {
  "use strict";

  var WA = "593983760090";

  /* Catálogo: la clave es el slug de checkout.html?producto=<slug> */
  var CATALOGO = {
    "obtenya": {
      nombre: "ObtenYA",
      desc: "Prospección y scraping con IA para toda Latinoamérica",
      total: '$0 · $25 · $65 <span style="font-size:.72rem;color:var(--muted);font-weight:300;letter-spacing:0">/mes USD</span>',
      nota: "Suscripción · empieza gratis",
      logo: "assets/img/productos/obtenya/obtenya-logo.png"
    },
    "medicore-clinicas": {
      nombre: "Medicore",
      desc: "Administración para clínicas: pacientes, citas, historiales y facturación",
      total: '$25 – $55 <span style="font-size:.72rem;color:var(--muted);font-weight:300;letter-spacing:0">/mes USD</span>',
      nota: "Suscripción mensual",
      logo: "assets/img/productos/medicore/medicore-logo.png"
    },
    "gym-system": {
      nombre: "Gym System",
      desc: "Gestión integral para gimnasios con facturación conectada al SRI",
      total: '$150 – $300 <span style="font-size:.72rem;color:var(--muted);font-weight:300;letter-spacing:0">USD</span>',
      nota: "Pago único · licencia",
      logo: "assets/img/productos/gym/gym-system-logo.png"
    },
    "portales-web": {
      nombre: "Portales Web",
      desc: "Tienda digital completa con catálogo, panel de administración y pagos",
      total: "Previa cotización",
      nota: "Según proyecto",
      logo: "assets/img/productos/portales-web/portales-web-logo.png"
    },
    "software-medida": {
      nombre: "Software a medida",
      desc: "Desarrollo desde cero según los procesos de tu operación",
      total: "A cotizar",
      nota: "Según alcance",
      logo: ""
    }
  };

  var METODOS = {
    card: "Tarjeta de crédito o débito",
    payphone: "Payphone",
    transfer: "Transferencia bancaria",
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Producto desde la URL ---------- */
  var slug = "";
  try { slug = new URLSearchParams(window.location.search).get("producto") || ""; } catch (e) {}
  var prod = CATALOGO[slug] || {
    nombre: "Software T.O.Q",
    desc: "Cuéntanos qué necesitas y armamos el alcance contigo",
    total: "A cotizar",
    nota: "Según alcance",
    logo: ""
  };

  var elName = $("#order-name"), elDesc = $("#order-desc"), elTotal = $("#order-total"),
      elNote = $("#order-note"), elLogo = $("#order-logo");
  if (elName) elName.textContent = prod.nombre;
  if (elDesc) elDesc.textContent = prod.desc;
  if (elTotal) elTotal.innerHTML = prod.total;
  if (elNote) elNote.textContent = prod.nota;
  if (elLogo) {
    if (prod.logo) { elLogo.src = prod.logo; elLogo.alt = prod.nombre; }
    else elLogo.style.display = "none";
  }
  document.title = prod.nombre + " — Checkout T.O.Q";

  /* ---------- Selección de método ---------- */
  var metodo = null;
  var cards = $$("[data-pay]");
  var panels = $$("[data-panel]");
  var hint = $("[data-hint]");

  function seleccionar(m) {
    metodo = m;
    cards.forEach(function (c) {
      var on = c.getAttribute("data-method") === m;
      if (on) c.setAttribute("data-on", ""); else c.removeAttribute("data-on");
      var chk = $("[data-checkmark]", c);
      if (chk) chk.style.opacity = on ? "1" : "0";
    });
    panels.forEach(function (p) {
      if (p.id === "panel-" + m) p.setAttribute("data-on", ""); else p.removeAttribute("data-on");
    });
    if (hint) hint.removeAttribute("data-on");
  }

  cards.forEach(function (c) {
    if (c.hasAttribute("data-off")) return;
    c.addEventListener("click", function () { seleccionar(c.getAttribute("data-method")); });
    c.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      c.click();
    });
  });

  /* ---------- Confirmar pedido ---------- */
  var btn = $("#confirm-purchase");
  var main = $("#checkout-main");
  var conf = $("#confirmation");
  if (btn) {
    btn.addEventListener("click", function () {
      if (!metodo) {
        if (hint) hint.setAttribute("data-on", "");
        var grid = $("[data-paygrid]");
        if (grid) window.scrollTo({ top: grid.getBoundingClientRect().top + window.pageYOffset - 120, behavior: "smooth" });
        return;
      }

      /* TODO backend/pasarela: aquí se dispara el cobro real.
         Tarjeta  -> Stripe Elements / PaymentIntent con la clave del comercio.
         PayPal   -> SDK de PayPal Buttons con el client-id real.
         Payphone -> Cajita de Pagos / API con el token del comercio.
         Mientras no exista pasarela conectada, se registra la solicitud
         y se deriva el cierre del pago a WhatsApp. */

      var texto = "Hola T.O.Q, quiero comprar " + prod.nombre +
        " (" + (METODOS[metodo] || metodo) + "). Referencia: " + (slug || "sin-slug") + ".";
      var wa = $("#conf-whatsapp");
      if (wa) wa.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(texto);
      var cp = $("#conf-product");
      if (cp) cp.textContent = prod.nombre + " · " + (METODOS[metodo] || metodo);

      if (main) main.style.display = "none";
      if (conf) conf.setAttribute("data-on", "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


})();
