/* =====================================================================
   Ortobom Norte Sul — JavaScript compartilhado por todas as páginas
   Tudo que você precisa trocar fica nesta primeira parte do arquivo.
   ===================================================================== */

/* Endpoint do Formspree. Exemplo: "https://formspree.io/f/abcdwxyz"
   Enquanto estiver vazio, o formulário abre o WhatsApp com os dados preenchidos. */
const FORM_ENDPOINT = ""; // REVISAR: colar o endpoint do Formspree

/* Dados da loja — troque aqui e o site atualiza (o HTML já traz os mesmos dados escritos). */
const CONFIG = {
  nomeLoja: "Ortobom Norte Sul",
  razaoSocial: "Nei Norte Sul Colchões",
  cnpj: "62.644.944/0001-59",
  whatsapp: "5519991861327", // só números, com 55 + DDD
  telefone: "(19) 99186-1327",
  telefoneLink: "+5519991861327",
  email: "contato@ortobomnortesul.com.br", // REVISAR
  instagram: "https://www.instagram.com/ortobomnortesul/", // REVISAR
  instagramUsuario: "@ortobomnortesul", // REVISAR
  facebook: "", // REVISAR: URL da página, se existir
  endereco: "Av. José de Sousa Campos, 1822 - Chácara da Barra, Campinas/SP, CEP 13090-615",
  horario: "Segunda a sexta, das 9h às 18h · Sábado, das 9h às 15h",
  comoChegar:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Av. José de Sousa Campos, 1822, Chácara da Barra, Campinas, SP, 13090-615"),
  mensagemPadrao: "Olá! Vim pelo site e quero falar com um consultor da Ortobom Norte Sul.",
  /* Rastreamento — só carrega depois que o visitante aceita os cookies.
     Deixe vazio ("") para desativar a ferramenta. */
  GTM_ID: "GTM-M77GRQG5",
  META_PIXEL_ID: "", // REVISAR: colar o ID do Pixel da Meta
  GA4_ID: "", // REVISAR: colar o ID do GA4 (G-XXXXXXXXXX). Se o GA4 já está dentro do GTM, deixe vazio.
};

/* Produtos da página /produtos/ — para adicionar um novo, copie um bloco e ajuste.
   categoria: "colchoes" | "camas-e-bases" | "travesseiros" | "acessorios"
   firmeza: 1 (macio) a 5 (firme); use null para itens sem firmeza.
   Imagens: use o código da foto do Unsplash (placeholder) ou um arquivo seu, ex: "/assets/img/colchao-1.jpg". */
const CATEGORIAS = [
  { id: "colchoes", nome: "Colchões" },
  { id: "camas-e-bases", nome: "Camas e bases" },
  { id: "travesseiros", nome: "Travesseiros" },
  { id: "acessorios", nome: "Acessórios para cama" },
];

const un = (id) => "https://images.unsplash.com/photo-" + id;
const PRODUCTS = [
  /* REVISAR: todos os nomes abaixo são exemplos genéricos. Troque pelos modelos reais da loja. */
  {
    id: "colchao-acolhimento",
    categoria: "colchoes",
    nome: "Colchão Acolhimento (exemplo)", // REVISAR
    img: un("1606796913825-2b02883605e9"),
    alt: "Cama com lençóis brancos ao lado de uma planta, exemplo de colchão macio",
    indicado: "Para quem gosta de sensação de maciez e dorme de lado.", // REVISAR
    firmeza: 2,
    firmezaTexto: "Macio",
    tamanhos: ["Solteiro", "Casal", "Queen", "King"], // REVISAR
    descricao:
      "Sensação de acolhimento logo ao deitar. Um bom ponto de partida para quem prefere um colchão mais macio. Venha deitar e comparar na loja.", // REVISAR
  },
  {
    id: "colchao-equilibrio",
    categoria: "colchoes",
    nome: "Colchão Equilíbrio (exemplo)", // REVISAR
    img: un("1660407761025-539c2dbc1dc6"),
    alt: "Cama arrumada com travesseiros brancos, exemplo de colchão de conforto médio",
    indicado: "Para quem alterna de posição durante a noite ou divide a cama.", // REVISAR
    firmeza: 3,
    firmezaTexto: "Médio",
    tamanhos: ["Solteiro", "Casal", "Queen", "King"], // REVISAR
    descricao:
      "Meio-termo entre maciez e firmeza, a escolha mais comum de quem ainda não sabe qual conforto prefere. Nosso consultor ajuda a confirmar.", // REVISAR
  },
  {
    id: "colchao-suporte",
    categoria: "colchoes",
    nome: "Colchão Suporte (exemplo)", // REVISAR
    img: un("1658928785462-d57013ae4d0c"),
    alt: "Cama com travesseiro branco e lençol claro, exemplo de colchão firme",
    indicado: "Para quem prefere dormir sobre uma superfície mais firme.", // REVISAR
    firmeza: 4,
    firmezaTexto: "Firme",
    tamanhos: ["Solteiro", "Casal", "Queen", "King"], // REVISAR
    descricao:
      "Superfície firme para quem não gosta de afundar no colchão. Teste na loja para sentir a diferença entre os níveis.", // REVISAR
  },
  {
    id: "colchao-casal-confort",
    categoria: "colchoes",
    nome: "Colchão Casal Confort (exemplo)", // REVISAR
    img: un("1634208006171-6713e0c9a25e"),
    alt: "Cama de casal com edredom branco e almofadas, exemplo de colchão para casal",
    indicado: "Para casais que querem conforto e espaço para dormir a dois.", // REVISAR
    firmeza: 3,
    firmezaTexto: "Médio",
    tamanhos: ["Casal", "Queen", "King"], // REVISAR
    descricao:
      "Pensado para dividir a cama com mais espaço. Fale com um consultor para escolher o tamanho certo para o seu quarto.", // REVISAR
  },
  {
    id: "box-bau-casal",
    categoria: "camas-e-bases",
    nome: "Cama Box Baú (exemplo)", // REVISAR
    img: un("1703783010857-9bd7a7b97c50"),
    alt: "Cama sob uma janela ao lado de uma mesa de cabeceira, exemplo de cama box",
    indicado: "Para quem quer mais espaço de guarda no quarto.", // REVISAR
    firmeza: null,
    firmezaTexto: "",
    tamanhos: ["Solteiro", "Casal", "Queen", "King"], // REVISAR
    descricao:
      "Base com baú para guardar roupa de cama e outros itens. Consulte as medidas disponíveis com nosso consultor.", // REVISAR
  },
  {
    id: "base-box-simples",
    categoria: "camas-e-bases",
    nome: "Base Box (exemplo)", // REVISAR
    img: un("1612152605347-f93296cb657d"),
    alt: "Cama com roupa de cama branca ao lado de uma porta de madeira clara, exemplo de base box",
    indicado: "Para quem busca uma base estável e visual limpo.", // REVISAR
    firmeza: null,
    firmezaTexto: "",
    tamanhos: ["Solteiro", "Casal", "Queen", "King"], // REVISAR
    descricao:
      "Base para apoiar o colchão e deixar a cama na altura certa. Combine com o colchão do seu perfil.", // REVISAR
  },
  {
    id: "conjunto-box-colchao",
    categoria: "camas-e-bases",
    nome: "Conjunto Box + Colchão (exemplo)", // REVISAR
    img: un("1552858725-2758b5fb1286"),
    alt: "Cama com abajur aceso ao lado, exemplo de conjunto de base e colchão",
    indicado: "Para quem quer resolver base e colchão juntos.", // REVISAR
    firmeza: 3,
    firmezaTexto: "Médio",
    tamanhos: ["Solteiro", "Casal", "Queen"], // REVISAR
    descricao:
      "Conjunto de base e colchão para montar a cama completa de uma vez. Pergunte as combinações disponíveis.", // REVISAR
  },
  {
    id: "travesseiro-macio",
    categoria: "travesseiros",
    nome: "Travesseiro Macio (exemplo)", // REVISAR
    img: un("1587614977104-693ef4e858e4"),
    alt: "Travesseiro branco sobre a cama, exemplo de travesseiro macio",
    indicado: "Para quem gosta de travesseiro baixo e macio.", // REVISAR
    firmeza: 2,
    firmezaTexto: "Macio",
    tamanhos: ["Padrão"], // REVISAR
    descricao: "Sensação leve e acolhedora para o dia a dia. Peça ao consultor para apresentar as opções de altura.", // REVISAR
  },
  {
    id: "travesseiro-medio",
    categoria: "travesseiros",
    nome: "Travesseiro Suporte (exemplo)", // REVISAR
    img: un("1582582621959-48d27397dc69"),
    alt: "Travesseiros brancos sobre roupa de cama clara, exemplo de travesseiro de apoio",
    indicado: "Para quem prefere mais apoio para a cabeça e o pescoço.", // REVISAR
    firmeza: 4,
    firmezaTexto: "Firme",
    tamanhos: ["Padrão", "Alto"], // REVISAR
    descricao: "Mais firmeza e altura para quem não gosta de travesseiro que afunda. Teste na loja.", // REVISAR
  },
  {
    id: "protetor-colchao",
    categoria: "acessorios",
    nome: "Protetor de Colchão (exemplo)", // REVISAR
    img: un("1598535746036-87d13382f6a6"),
    alt: "Tecido branco sobre a cama, exemplo de protetor de colchão",
    indicado: "Para manter o colchão limpo por mais tempo.", // REVISAR
    firmeza: null,
    firmezaTexto: "",
    tamanhos: ["Solteiro", "Casal", "Queen", "King"], // REVISAR
    descricao: "Camada de proteção para o dia a dia. Consulte os modelos e tamanhos disponíveis.", // REVISAR
  },
  {
    id: "jogo-cama",
    categoria: "acessorios",
    nome: "Roupa de cama (exemplo)", // REVISAR
    img: un("1539438050859-39219d86bde8"),
    alt: "Roupa de cama branca com travesseiro encostado em uma parede clara",
    indicado: "Para completar o quarto com conforto.", // REVISAR
    firmeza: null,
    firmezaTexto: "",
    tamanhos: ["Solteiro", "Casal", "Queen", "King"], // REVISAR
    descricao: "Complementos para deixar a cama pronta. Pergunte ao consultor o que temos disponível.", // REVISAR
  },
];

/* =====================================================================
   A partir daqui não é preciso editar.
   ===================================================================== */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var safe = function (fn) { try { return fn(); } catch (e) { return null; } };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------- Preenche dados da CONFIG nos elementos marcados ---------- */
  function applyConfig() {
    $$("[data-cfg]").forEach(function (el) {
      var v = CONFIG[el.getAttribute("data-cfg")];
      if (v) el.textContent = v;
    });
    $$("[data-cfg-href]").forEach(function (el) {
      var k = el.getAttribute("data-cfg-href");
      var map = {
        telefone: "tel:" + CONFIG.telefoneLink,
        email: "mailto:" + CONFIG.email,
        instagram: CONFIG.instagram,
        facebook: CONFIG.facebook,
        comoChegar: CONFIG.comoChegar,
      };
      if (map[k]) el.setAttribute("href", map[k]);
    });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- UTM e gclid ---------- */
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
  function captureUtm() {
    safe(function () {
      var p = new URLSearchParams(location.search);
      var saved = JSON.parse(sessionStorage.getItem("ons_utm") || "{}");
      var changed = false;
      UTM_KEYS.forEach(function (k) {
        if (p.get(k)) { saved[k] = p.get(k); changed = true; }
      });
      if (changed) sessionStorage.setItem("ons_utm", JSON.stringify(saved));
    });
  }
  function getUtm() {
    return safe(function () { return JSON.parse(sessionStorage.getItem("ons_utm") || "{}"); }) || {};
  }
  function utmText() {
    var u = getUtm();
    var parts = UTM_KEYS.filter(function (k) { return u[k]; }).map(function (k) { return k + "=" + u[k]; });
    return parts.length ? "\n\n(ref: " + parts.join(", ") + ")" : "";
  }

  /* ---------- WhatsApp ---------- */
  function waUrl(msg) {
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent((msg || CONFIG.mensagemPadrao) + utmText());
  }
  function sectionOf(el) {
    var s = el.closest("[data-section]");
    return s ? s.getAttribute("data-section") : "pagina";
  }
  function initContactLinks() {
    $$("a.js-wa").forEach(function (a) {
      a.setAttribute("href", waUrl(a.getAttribute("data-msg")));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (!a) return;
      if (a.classList.contains("js-wa")) {
        a.setAttribute("href", waUrl(a.getAttribute("data-msg"))); // atualiza com UTM mais recente
        track("Contact", { method: "whatsapp", section: sectionOf(a) });
      } else if ((a.getAttribute("href") || "").indexOf("tel:") === 0) {
        track("Contact", { method: "phone", section: sectionOf(a) });
      }
    });
  }

  /* ---------- Cookies e rastreamento (só após o aceite) ---------- */
  var CONSENT_KEY = "ons_consent";
  function getConsent() { return safe(function () { return localStorage.getItem(CONSENT_KEY); }); }
  function setConsent(v) { safe(function () { localStorage.setItem(CONSENT_KEY, v); }); }

  var trackersLoaded = false;
  function loadTrackers() {
    if (trackersLoaded) return;
    trackersLoaded = true;
    window.dataLayer = window.dataLayer || [];
    if (CONFIG.GTM_ID) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      var g = document.createElement("script");
      g.async = true;
      g.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(CONFIG.GTM_ID);
      document.head.appendChild(g);
    }
    if (CONFIG.GA4_ID) {
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", CONFIG.GA4_ID);
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CONFIG.GA4_ID);
      document.head.appendChild(s);
    }
    if (CONFIG.META_PIXEL_ID) {
      /* eslint-disable */
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */
      window.fbq("init", CONFIG.META_PIXEL_ID);
      window.fbq("track", "PageView");
    }
  }

  var GA_NAMES = { Lead: "generate_lead", Contact: "contact", ViewContent: "view_item" };
  function track(name, params) {
    if (getConsent() !== "granted") return;
    params = params || {};
    var u = getUtm();
    var data = Object.assign({}, params, u);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, data)); // GTM (evento com o nome do Pixel)
    window.dataLayer.push(Object.assign({ event: GA_NAMES[name] }, data)); // GTM (evento equivalente do GA4)
    if (window.fbq) window.fbq("track", name, params);
    if (window.gtag && CONFIG.GA4_ID) window.gtag("event", GA_NAMES[name], data);
  }

  function initCookies() {
    var banner = $("#cookie-banner");
    var state = getConsent();
    if (state === "granted") loadTrackers();
    if (banner && !state) banner.hidden = false;
    $$("[data-cookie]").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-cookie");
        setConsent(v);
        if (banner) banner.hidden = true;
        if (v === "granted") loadTrackers();
      });
    });
    $$("[data-cookie-open]").forEach(function (b) {
      b.addEventListener("click", function () { if (banner) { banner.hidden = false; $("[data-cookie='granted']", banner).focus(); } });
    });
  }

  /* ---------- Header e menu ---------- */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-solid", window.scrollY > 24 || !document.body.classList.contains("has-hero")); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var btn = $(".menu-toggle");
    var nav = $("#menu");
    if (!btn || !nav) return;
    var close = function () {
      btn.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      nav.style.top = open ? Math.max(header.getBoundingClientRect().bottom, 0) + "px" : "";
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      header.classList.toggle("is-solid", open || window.scrollY > 24 || !document.body.classList.contains("has-hero"));
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { close(); btn.focus(); }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", close);
  }

  /* ---------- Revelar ao rolar ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!els.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Carrossel de depoimentos ---------- */
  function initCarousel() {
    var root = $("[data-carousel]");
    if (!root) return;
    var track = $(".carousel__track", root);
    var prev = $("[data-prev]", root);
    var next = $("[data-next]", root);
    var step = function () {
      var card = $(".quote", track);
      return card ? card.getBoundingClientRect().width + 16 : 320;
    };
    var smooth = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    var update = function () {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: smooth }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: smooth }); });
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Lightbox (fotos da loja) ---------- */
  function initLightbox() {
    var dlg = $("#lightbox");
    var triggers = $$("[data-lightbox]");
    if (!dlg || !triggers.length) return;
    var img = $("img", dlg);
    var cap = $("figcaption", dlg);
    var last = null;
    triggers.forEach(function (t) {
      t.addEventListener("click", function () {
        last = t;
        img.src = t.getAttribute("data-lightbox");
        img.alt = t.getAttribute("data-alt") || "";
        cap.textContent = t.getAttribute("data-alt") || "";
        dlg.showModal();
      });
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });
    dlg.addEventListener("close", function () { img.removeAttribute("src"); if (last) last.focus(); });
  }

  /* ---------- Produtos ---------- */
  function meter(p) {
    if (!p.firmeza) return "";
    var dots = "";
    for (var i = 1; i <= 5; i++) dots += '<i class="' + (i <= p.firmeza ? "on" : "") + '"></i>';
    return '<div class="meter" role="img" aria-label="Nível de firmeza: ' + esc(p.firmezaTexto) + " (" + p.firmeza + ' de 5)">' +
      '<span class="meter__dots">' + dots + '</span><span class="meter__txt">' + esc(p.firmezaTexto) + "</span></div>";
  }
  function productCard(p) {
    var msg = "Olá! Vim pelo site e quero saber mais sobre: " + p.nome + ".";
    return '<article class="product" data-id="' + esc(p.id) + '">' +
      '<div class="product__img ph"><img src="' + esc(p.img) + '?auto=format&fit=crop&w=640&q=70" alt="' + esc(p.alt) + '" width="640" height="480" loading="lazy" decoding="async"></div>' +
      '<div class="product__body"><h3>' + esc(p.nome) + "</h3>" +
      '<p class="product__for">' + esc(p.indicado) + "</p>" + meter(p) +
      '<p class="product__sizes"><span class="muted">Tamanhos:</span> ' + esc(p.tamanhos.join(", ")) + "</p>" +
      '<p class="product__note muted">Consulte condições com nosso consultor.</p>' +
      '<div class="product__actions">' +
      '<a class="btn btn-wa btn-sm js-wa" data-msg="' + esc(msg) + '" href="#">Quero saber mais</a>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-details="' + esc(p.id) + '">Ver detalhes</button>' +
      "</div></div></article>";
  }
  function initProducts() {
    var root = $("#product-list");
    if (!root) return;
    var filters = $("#product-filters");

    root.innerHTML = CATEGORIAS.map(function (c) {
      var items = PRODUCTS.filter(function (p) { return p.categoria === c.id; });
      if (!items.length) return "";
      return '<section class="product-group" id="' + c.id + '" data-group="' + c.id + '" aria-labelledby="h-' + c.id + '">' +
        '<h2 id="h-' + c.id + '">' + esc(c.nome) + '</h2><div class="product-grid">' + items.map(productCard).join("") + "</div></section>";
    }).join("");

    var buttons = [{ id: "todos", nome: "Todos" }].concat(CATEGORIAS);
    filters.innerHTML = buttons.map(function (b) {
      return '<button type="button" class="chip" data-filter="' + b.id + '" aria-pressed="false">' + esc(b.nome) + "</button>";
    }).join("");

    function apply(id, scroll) {
      $$("[data-filter]", filters).forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === id));
      });
      $$("[data-group]", root).forEach(function (g) {
        g.hidden = !(id === "todos" || g.getAttribute("data-group") === id);
      });
      if (scroll && id !== "todos") {
        var t = document.getElementById(id);
        if (t) t.scrollIntoView({ block: "start" });
      }
    }
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filter]");
      if (!b) return;
      var id = b.getAttribute("data-filter");
      apply(id, false);
      safe(function () { history.replaceState(null, "", id === "todos" ? location.pathname : "#" + id); });
    });
    var h = location.hash.replace("#", "");
    var valid = CATEGORIAS.some(function (c) { return c.id === h; });
    apply(valid ? h : "todos", valid);

    $$("a.js-wa", root).forEach(function (a) {
      a.setAttribute("href", waUrl(a.getAttribute("data-msg")));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });

    /* Detalhes do produto */
    var dlg = $("#product-dialog");
    var last = null;
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-details]");
      if (!b) return;
      var p = PRODUCTS.filter(function (x) { return x.id === b.getAttribute("data-details"); })[0];
      if (!p || !dlg) return;
      last = b;
      var msg = "Olá! Vim pelo site e quero saber mais sobre: " + p.nome + ".";
      $(".dialog__img", dlg).innerHTML = '<img src="' + esc(p.img) + '?auto=format&fit=crop&w=900&q=72" alt="' + esc(p.alt) + '" width="900" height="675">';
      $(".dialog__body", dlg).innerHTML = "<h2>" + esc(p.nome) + "</h2><p>" + esc(p.descricao) + "</p>" +
        '<p class="product__for">' + esc(p.indicado) + "</p>" + meter(p) +
        '<p><span class="muted">Tamanhos:</span> ' + esc(p.tamanhos.join(", ")) + "</p>" +
        '<p class="muted">Consulte condições com nosso consultor.</p>' +
        '<a class="btn btn-wa js-wa" data-msg="' + esc(msg) + '" target="_blank" rel="noopener" href="' + waUrl(msg) + '">Quero saber mais</a>';
      dlg.showModal();
      track("ViewContent", { content_name: p.nome, content_category: p.categoria, content_ids: [p.id], content_type: "product" });
    });
    if (dlg) {
      dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });
      dlg.addEventListener("close", function () { if (last) last.focus(); });
    }
  }

  /* ---------- Formulário de contato ---------- */
  function maskPhone(v) {
    var d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length > 6) return "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
    if (d.length > 2) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    return d ? "(" + d : "";
  }
  function initForm() {
    var form = $("#contact-form");
    if (!form) return;
    var status = $("#form-status");
    var phone = $("#f-whatsapp", form);
    phone.addEventListener("input", function () { phone.value = maskPhone(phone.value); });

    var rules = {
      nome: function (v) { return v.trim().length >= 3 ? "" : "Informe seu nome (mínimo de 3 letras)."; },
      whatsapp: function (v) {
        var d = v.replace(/\D/g, "");
        return d.length === 10 || d.length === 11 ? "" : "Informe um WhatsApp válido com DDD. Exemplo: (19) 99999-9999.";
      },
      email: function (v) { return !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Esse e-mail parece incompleto. Exemplo: nome@email.com."; },
      mensagem: function (v) { return v.trim().length <= 1000 ? "" : "A mensagem pode ter no máximo 1000 caracteres."; },
      lgpd: function (_v, el) { return el.checked ? "" : "Para enviar, marque a autorização de uso dos seus dados."; },
    };
    function check(el) {
      var rule = rules[el.name];
      var box = document.getElementById(el.id + "-erro");
      if (!rule || !box) return true;
      var msg = rule(el.value, el);
      box.textContent = msg;
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      return !msg;
    }
    $$("input, textarea, select", form).forEach(function (el) {
      el.addEventListener("blur", function () { check(el); });
      el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true") check(el); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";
      var fields = $$("input, textarea, select", form).filter(function (el) { return rules[el.name]; });
      var bad = fields.filter(function (el) { return !check(el); });
      if (bad.length) {
        status.className = "form-status is-error";
        status.textContent = "Revise os campos destacados e envie novamente.";
        bad[0].focus();
        return;
      }
      var fd = new FormData(form);
      var data = {
        nome: fd.get("nome").trim(),
        whatsapp: fd.get("whatsapp"),
        email: (fd.get("email") || "").trim(),
        produto: fd.get("produto"),
        cidade: (fd.get("cidade") || "").trim(),
        horario: fd.get("horario"),
        mensagem: (fd.get("mensagem") || "").trim(),
        consentimento_lgpd: "sim",
      };
      Object.assign(data, getUtm());
      track("Lead", { form: "contato", produto_interesse: data.produto || "" });

      var lines = [
        "Olá! Vim pelo site e quero falar com um consultor da Ortobom Norte Sul.",
        "",
        "Nome: " + data.nome,
        "WhatsApp: " + data.whatsapp,
      ];
      if (data.email) lines.push("E-mail: " + data.email);
      if (data.produto) lines.push("Interesse: " + data.produto);
      if (data.cidade) lines.push("Bairro/cidade: " + data.cidade);
      if (data.horario) lines.push("Melhor horário para contato: " + data.horario);
      if (data.mensagem) lines.push("Mensagem: " + data.mensagem);

      var openWhats = function () {
        var url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(lines.join("\n") + utmText());
        var w = window.open(url, "_blank", "noopener");
        status.className = "form-status is-ok";
        status.innerHTML = 'Pronto! Abrimos o WhatsApp com seus dados. Se nada abriu, <a href="' + url + '" target="_blank" rel="noopener">toque aqui para continuar a conversa</a>.';
        if (!w) status.focus();
      };

      if (!FORM_ENDPOINT) { openWhats(); return; }

      var submit = $("button[type=submit]", form);
      submit.disabled = true;
      status.textContent = "Enviando…";
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(function (r) {
        if (!r.ok) throw new Error("http " + r.status);
        form.reset();
        status.className = "form-status is-ok";
        status.textContent = "Recebemos sua mensagem. Um consultor vai falar com você pelo WhatsApp no horário que você escolheu.";
      }).catch(function () {
        status.className = "form-status is-error";
        status.innerHTML = 'Não conseguimos enviar agora. <a href="' + waUrl(lines.join("\n")) + '" target="_blank" rel="noopener">Fale com a gente pelo WhatsApp</a> ou tente novamente em instantes.';
      }).then(function () { submit.disabled = false; });
    });
  }

  /* ---------- Início ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    captureUtm();
    initContactLinks();
    initCookies();
    initHeader();
    initReveal();
    initCarousel();
    initLightbox();
    initProducts();
    initForm();
  });
})();
