/* Configuracao: dados de contato e rastreamento. Altere aqui. */
var CONFIG = {
  WHATSAPP: "5544998451566",   // numero usado nos botoes de curso do site atual (CONFIRMAR se e o numero da clinica)
  GTM_ID: "",                  // site atual usa GTM-TDTT6NVK; deixe vazio na demonstracao para nao poluir as metricas
  FORM_ENDPOINT: ""            // nao ha formulario nesta versao
};

(function () {
  "use strict";

  // WhatsApp com mensagem contextualizada
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + CONFIG.WHATSAPP + "?text=" + encodeURIComponent(a.getAttribute("data-wa"));
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Google Tag Manager (opcional)
  if (CONFIG.GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(CONFIG.GTM_ID);
    document.head.appendChild(s);
  }

  // Menu mobile
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("menu");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  btn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); btn.focus(); }
  });
  window.matchMedia("(min-width: 981px)").addEventListener("change", function () { setMenu(false); });

  // Videos do YouTube: so carrega o player ao clicar (modo sem cookies)
  document.querySelectorAll(".video[data-yt]").forEach(function (el) {
    var id = el.getAttribute("data-yt");
    el.style.backgroundImage = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";
    el.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      f.title = "Depoimento em vídeo";
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      el.replaceChildren(f);
      el.style.cursor = "default";
    }, { once: true });
  });

  // Imagens externas que falharem: esconde para mostrar o fundo/monograma
  document.querySelectorAll(".frame img, .g img, .post img").forEach(function (img) {
    img.addEventListener("error", function () { img.style.visibility = "hidden"; });
  });
})();
