/* ==========================================================================
   Clínica de Estética — JavaScript único (vanilla, sem build)
   ========================================================================== */

/* ---- Cole aqui o endpoint do Formspree (ex: "https://formspree.io/f/abcdwxyz").
        Enquanto estiver vazio, o formulário abre o WhatsApp com os dados preenchidos. ---- */
const FORM_ENDPOINT = "";

/* ---- Dados da clínica: troque TUDO aqui. O site inteiro é preenchido a partir deste objeto. ---- */
const CONFIG = {
  name: "Lumière Estética Avançada",              // REVISAR
  tagline: "Estética & Bem-estar",                // REVISAR
  siteUrl: "https://www.lumiereestetica.com.br",  // REVISAR
  city: "São Paulo",                              // REVISAR
  whatsapp: "5511999999999",                      // REVISAR (55 + DDD + número, só dígitos)
  phone: "(11) 3000-0000",                        // REVISAR
  email: "contato@lumiereestetica.com.br",        // REVISAR
  instagram: "@lumiereestetica",                  // REVISAR
  social: {                                       // REVISAR (deixe "" para ocultar)
    instagram: "https://www.instagram.com/lumiereestetica",
    facebook: ""
  },
  address: {                                      // REVISAR
    street: "Alameda Lorena, 1000, sala 51",
    district: "Jardins",
    city: "São Paulo",
    state: "SP",
    zip: "01424-001",
    geo: { lat: -23.5658, lng: -46.6528 }
  },
  hours: "Seg a Sex 9h às 19h, Sáb 9h às 13h",    // REVISAR
  openingHours: ["Mo-Fr 09:00-19:00", "Sa 09:00-13:00"], // REVISAR (formato schema.org)
  responsible: {                                  // REVISAR
    name: "Dra. Helena Duarte",
    role: "Biomédica esteta",
    registry: "CRBM 00000"
  },
  cnpj: "00.000.000/0001-00",                     // REVISAR
  defaultMessage: "Olá! Vim pelo site e gostaria de agendar uma avaliação.",
  /* IDs de rastreamento: preencha para ativar. Só são carregados APÓS o aceite de cookies. */
  ids: { META_PIXEL_ID: "", GA4_ID: "", GTM_ID: "" }
};

/* ---- Tratamentos: para adicionar um novo, copie um objeto e ajuste. category: Facial | Corporal | Injetáveis | Laser ---- */
const TREATMENTS = [
  {
    id: "harmonizacao-facial", name: "Harmonização Facial", category: "Injetáveis",
    image: "harmonizacao-facial",
    imageAlt: "Mulher recebendo avaliação facial em consulta de estética",
    short: "Procedimentos combinados para equilibrar proporções do rosto de forma personalizada.",
    what: "Conjunto de técnicas que, a partir de uma avaliação individual, busca equilibrar proporções e contornos da face.",
    indicated: "Pessoas que desejam suavizar assimetrias ou realçar traços, após avaliação profissional.",
    how: "Após análise facial, a profissional define quais técnicas fazem sentido e as aplica com anestesia tópica quando indicada.",
    duration: "Cerca de 60 a 90 minutos", recovery: "Retorno às atividades habituais costuma ser rápido, conforme orientação"
  },
  {
    id: "limpeza-de-pele", name: "Limpeza de Pele", category: "Facial",
    image: "limpeza-de-pele",
    imageAlt: "Profissional realizando limpeza de pele em cliente deitada",
    short: "Higienização profunda com extração e hidratação, adaptada ao seu tipo de pele.",
    what: "Procedimento de higienização que remove impurezas e células mortas, finalizado com ativos e proteção.",
    indicated: "Quem busca manutenção da saúde da pele ou apresenta oleosidade, cravos e textura irregular.",
    how: "Inclui higienização, esfoliação, extração quando necessária, máscara calmante e protetor solar.",
    duration: "Cerca de 60 minutos", recovery: "Pode haver leve vermelhidão temporária"
  },
  {
    id: "toxina-botulinica", name: "Toxina Botulínica", category: "Injetáveis",
    image: "toxina-botulinica",
    imageAlt: "Close do rosto de mulher com pele cuidada",
    short: "Aplicação avaliada caso a caso para suavizar linhas de expressão.",
    what: "Aplicação de toxina botulínica em pontos específicos para relaxar a musculatura responsável por linhas de expressão.",
    indicated: "Adultos com linhas dinâmicas na testa, entre as sobrancelhas e ao redor dos olhos, após avaliação.",
    how: "Aplicação com microagulhas em pontos definidos no planejamento. O efeito aparece gradualmente.",
    duration: "Cerca de 30 minutos", recovery: "Sem afastamento; há orientações de cuidado nas primeiras horas"
  },
  {
    id: "preenchimento", name: "Preenchimento com Ácido Hialurônico", category: "Injetáveis",
    image: "preenchimento",
    imageAlt: "Mulher sorrindo durante consulta de estética facial",
    short: "Reposição de volume e definição de contornos com produtos registrados na Anvisa.",
    what: "Aplicação de ácido hialurônico para repor volume, definir contornos ou hidratar regiões da face.",
    indicated: "Pessoas com perda de volume ou que desejam realçar contornos, mediante avaliação.",
    how: "O produto é aplicado com agulha ou cânula, com planejamento prévio da região e da quantidade.",
    duration: "Cerca de 45 a 60 minutos", recovery: "Edema e sensibilidade leves podem ocorrer por alguns dias"
  },
  {
    id: "bioestimuladores", name: "Bioestimuladores de Colágeno", category: "Injetáveis",
    image: "bioestimuladores",
    imageAlt: "Produtos de skincare organizados sobre bancada clara",
    short: "Estímulo à produção natural de colágeno para melhorar a qualidade e firmeza da pele.",
    what: "Substâncias aplicadas na derme que estimulam o organismo a produzir colágeno ao longo das semanas.",
    indicated: "Pessoas com flacidez leve a moderada ou que buscam melhora da qualidade da pele, após avaliação.",
    how: "Aplicação em sessões espaçadas, com número definido no plano individual.",
    duration: "Cerca de 45 minutos por sessão", recovery: "Leve inchaço ou desconforto local por poucos dias"
  },
  {
    id: "depilacao-a-laser", name: "Depilação a Laser", category: "Laser",
    image: "depilacao-a-laser",
    imageAlt: "Equipamento de laser em sala de procedimentos de estética",
    short: "Redução progressiva dos pelos com equipamento adequado ao seu fototipo.",
    what: "Tecnologia que atua nos folículos para reduzir os pelos de forma progressiva ao longo das sessões.",
    indicated: "Pessoas que desejam reduzir pelos em diferentes áreas do corpo, após avaliação do fototipo.",
    how: "O equipamento é ajustado ao tipo de pele e pelo; as sessões seguem intervalos definidos pela profissional.",
    duration: "De 15 a 60 minutos, conforme a área", recovery: "Vermelhidão leve e cuidados com exposição solar"
  },
  {
    id: "peeling-quimico", name: "Peeling Químico", category: "Facial",
    image: "peeling-quimico",
    imageAlt: "Máscara facial sendo aplicada em tratamento de pele",
    short: "Renovação superficial da pele com ácidos escolhidos conforme a sua necessidade.",
    what: "Aplicação controlada de ácidos que promove renovação da camada superficial da pele.",
    indicated: "Pessoas com manchas, textura irregular ou sinais de envelhecimento, após avaliação.",
    how: "A profissional define o ácido e a concentração, aplica, neutraliza e orienta os cuidados em casa.",
    duration: "Cerca de 40 minutos", recovery: "Descamação leve e fotoproteção rigorosa nos dias seguintes"
  },
  {
    id: "criolipolise", name: "Criolipólise", category: "Corporal",
    image: "criolipolise",
    imageAlt: "Ambiente de spa com toalhas e pedras",
    short: "Redução de gordura localizada por resfriamento controlado, com indicação profissional.",
    what: "Tecnologia que utiliza resfriamento controlado para atuar em áreas de gordura localizada.",
    indicated: "Pessoas com gordura localizada resistente e peso estável, após avaliação.",
    how: "Aplicadores posicionados na área tratada; o número de sessões é definido no plano.",
    duration: "De 45 a 75 minutos", recovery: "Sensibilidade local temporária; rotina normal em geral mantida"
  },
  {
    id: "drenagem-linfatica", name: "Drenagem Linfática", category: "Corporal",
    image: "drenagem-linfatica",
    imageAlt: "Massagem corporal relaxante em ambiente de spa",
    short: "Técnica manual suave que auxilia no bem-estar e na sensação de leveza.",
    what: "Técnica de massagem com movimentos suaves e ritmados, que auxilia no bem-estar corporal.",
    indicated: "Quem busca relaxamento e sensação de leveza, ou como complemento de outros cuidados.",
    how: "Movimentos manuais lentos seguindo o trajeto linfático, em maca confortável.",
    duration: "Cerca de 60 minutos", recovery: "Não há tempo de recuperação; recomenda-se hidratação"
  }
];

/* ======================== Utilitários ======================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const safe = {
  get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
  lget(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  lset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const fullAddress = () => { const a = CONFIG.address; return `${a.street}, ${a.district}, ${a.city} - ${a.state}, CEP ${a.zip}`; };
/* Fotos: ID do Unsplash por imagem. Se a foto não carregar, usa a ilustração local (assets/img/<nome>.svg).
   Para usar foto própria, troque o valor por um caminho, ex.: "assets/img/limpeza.jpg". */
const PHOTOS = {
  "harmonizacao-facial": "1522337360788-8b13dee7a37e", "limpeza-de-pele": "1570172619644-dfd03ed5d881",
  "toxina-botulinica": "1512290923902-8a9f81dc236c", "preenchimento": "1598440947619-2c35fc9aa908",
  "bioestimuladores": "1559599101-f09722fb4948", "depilacao-a-laser": "1596755389378-c31d21fd1273",
  "peeling-quimico": "1487058792275-0ad4aaf24ca7", "criolipolise": "1540555700478-4be289fbecef",
  "drenagem-linfatica": "1544161515-4ab6ce6db874"
};
const photoUrl = (id, w) => PHOTOS[id] ? (/[\/.]/.test(PHOTOS[id]) ? PHOTOS[id] : `https://images.unsplash.com/photo-${PHOTOS[id]}?auto=format&fit=crop&w=${w}&q=80`) : `assets/img/${id}.svg`;
const IMG = id => `assets/img/${id}.svg`;
const SVG_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.45 15.07L2 22l5.05-1.55A9.9 9.9 0 1 0 12.04 2Zm5.8 14.02c-.25.7-1.45 1.34-2 1.4-.5.06-1.13.09-1.82-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.18-4.95-4.38-.14-.2-1.18-1.57-1.18-3 0-1.43.75-2.13 1.01-2.42.26-.29.57-.36.76-.36l.55.01c.18 0 .42-.07.65.5.25.6.84 2.07.91 2.22.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.09 1.31 2.39 1.46.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.12.07.72-.18 1.42Z"/></svg>';

/* ======================== UTM ======================== */
function captureUTM() {
  const params = new URLSearchParams(location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
  const found = {};
  keys.forEach(k => { if (params.get(k)) found[k] = params.get(k); });
  if (Object.keys(found).length) safe.set("utm", JSON.stringify(found));
}
function getUTM() { try { return JSON.parse(safe.get("utm") || "{}"); } catch (e) { return {}; } }
function utmText() {
  const u = getUTM(); const parts = Object.entries(u).map(([k, v]) => `${k}=${v}`);
  return parts.length ? `\n\n(Origem: ${parts.join(", ")})` : "";
}

/* ======================== WhatsApp ======================== */
function waLink(message) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent((message || CONFIG.defaultMessage) + utmText())}`;
}
function fillWhatsApp() {
  $$("[data-wa]").forEach(a => {
    a.href = waLink(a.dataset.wa || ""); a.target = "_blank"; a.rel = "noopener noreferrer";
  });
}

/* ======================== CONFIG → página ======================== */
function fillConfig() {
  const r = CONFIG.responsible, a = CONFIG.address;
  const map = {
    name: CONFIG.name, tagline: CONFIG.tagline, city: CONFIG.city, phone: CONFIG.phone, email: CONFIG.email,
    instagram: CONFIG.instagram, hours: CONFIG.hours, address: fullAddress(), district: `${a.district}, ${a.city}`,
    cnpj: CONFIG.cnpj, "resp-name": r.name, "resp-role": r.role, "resp-registry": r.registry,
    "resp-full": `${r.name} — ${r.role}, ${r.registry}`
  };
  $$("[data-cfg]").forEach(el => { const v = map[el.dataset.cfg]; if (v !== undefined) el.textContent = v; });
  $$("[data-tel]").forEach(el => { el.href = "tel:+" + ("55" + CONFIG.phone.replace(/\D/g, "")); });
  $$("[data-mailto]").forEach(el => { el.href = "mailto:" + CONFIG.email; });
  $$("[data-social]").forEach(el => {
    const url = CONFIG.social[el.dataset.social];
    if (url) { el.href = url; el.target = "_blank"; el.rel = "noopener noreferrer"; } else { el.hidden = true; }
  });
  $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(fullAddress());
  $$("[data-map-link]").forEach(a => { a.href = mapUrl; });
  /* O mapa só é carregado quando a visitante pede (evita cookies do Google sem aviso e falhas de bloqueio). */
  $$("[data-map-load]").forEach(btn => btn.addEventListener("click", () => {
    const box = btn.closest("[data-map-box]"); const f = document.createElement("iframe");
    f.title = "Mapa com a localização da clínica"; f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade";
    f.src = "https://www.google.com/maps?q=" + encodeURIComponent(fullAddress()) + "&output=embed";
    box.replaceChildren(f);
  }));
}

function injectJsonLd() {
  const a = CONFIG.address;
  const data = {
    "@context": "https://schema.org", "@type": "BeautySalon", name: CONFIG.name, url: CONFIG.siteUrl,
    telephone: "+55" + CONFIG.phone.replace(/\D/g, ""), email: CONFIG.email,
    image: CONFIG.siteUrl + "/assets/img/og.png",
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.city, addressRegion: a.state, postalCode: a.zip, addressCountry: "BR" },
    geo: { "@type": "GeoCoordinates", latitude: a.geo.lat, longitude: a.geo.lng },
    openingHours: CONFIG.openingHours,
    sameAs: Object.values(CONFIG.social).filter(Boolean)
  };
  const s = document.createElement("script");
  s.type = "application/ld+json"; s.textContent = JSON.stringify(data);
  document.head.appendChild(s);
}

/* ======================== Rastreamento (só após consentimento) ======================== */
let trackingLoaded = false;
function hasConsent() { return safe.lget("cookie_consent") === "accepted"; }
function loadScript(src) { const s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s); }

function loadTracking() {
  if (trackingLoaded || !hasConsent()) return;
  trackingLoaded = true;
  const { META_PIXEL_ID, GA4_ID, GTM_ID } = CONFIG.ids;
  window.dataLayer = window.dataLayer || [];

  if (GTM_ID) {   // Google Tag Manager
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript("https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(GTM_ID));
  }
  if (GA4_ID) {   // Google Analytics 4
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", GA4_ID);
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID));
  }
  if (META_PIXEL_ID) {   // Meta Pixel
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq("init", META_PIXEL_ID); window.fbq("track", "PageView");
  }
}

/* Dispara o evento no Meta Pixel, GA4 e dataLayer (GTM) — apenas com consentimento. */
function track(metaEvent, ga4Event, params) {
  if (!hasConsent()) return;
  const data = Object.assign({}, params, getUTM());
  if (typeof window.fbq === "function") window.fbq("track", metaEvent, params || {});
  if (typeof window.gtag === "function") window.gtag("event", ga4Event, data);
  if (CONFIG.ids.GTM_ID) (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ga4Event }, data));
}

function bindContactEvents() {
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]"); if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href.includes("wa.me")) track("Contact", "contact", { method: "whatsapp", label: a.dataset.label || a.textContent.trim().slice(0, 40) });
    else if (href.startsWith("tel:")) track("Contact", "contact", { method: "phone" });
  });
}

/* ======================== Cookies ======================== */
function initCookies() {
  const banner = $("#cookie-banner"); if (!banner) return;
  const choice = safe.lget("cookie_consent");
  if (choice) { loadTracking(); return; }
  banner.hidden = false; document.body.classList.add("has-cookie");
  const close = value => {
    safe.lset("cookie_consent", value); banner.hidden = true; document.body.classList.remove("has-cookie");
    if (value === "accepted") loadTracking();
  };
  $("#cookie-accept").addEventListener("click", () => close("accepted"));
  $("#cookie-refuse").addEventListener("click", () => close("refused"));
}

/* ======================== Header / menu ======================== */
function initHeader() {
  const header = $(".site-header"), toggle = $(".nav-toggle"), nav = $("#nav");
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 40 || !header.classList.contains("on-hero"));
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  const setOpen = open => {
    toggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); } });
  /* No mobile, o menu fechado fica fora do alcance do teclado */
  const mq = window.matchMedia("(min-width: 900px)");
  const sync = () => { if (mq.matches) { nav.removeAttribute("inert"); nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); } else { nav.toggleAttribute("inert", !nav.classList.contains("is-open")); } };
  mq.addEventListener("change", sync); sync();
  new MutationObserver(sync).observe(nav, { attributes: true, attributeFilter: ["class"] });
}

/* ======================== Animações ao rolar ======================== */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("is-visible")); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  items.forEach(i => io.observe(i));
}

function initCounters() {
  const els = $$("[data-count]"); if (!els.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (el, v) => {
    const d = Number(el.dataset.decimals || 0);
    el.textContent = (el.dataset.prefix || "") + v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }) + (el.dataset.suffix || "");
  };
  const run = el => {
    const target = Number(el.dataset.count); if (reduce) return fmt(el, target);
    const start = performance.now(), dur = 1600;
    const step = now => { const p = Math.min((now - start) / dur, 1); fmt(el, target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .5 });
  els.forEach(el => { fmt(el, Number(el.dataset.count)); io.observe(el); });
}

/* ======================== Imagens com falha ======================== */
function initImageFallback() {
  const swap = img => { const fb = img.dataset.fb; if (fb && !img.src.endsWith(fb)) { img.src = fb; } else { img.classList.add("is-broken"); } };
  $$("img").forEach(img => {
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) swap(img);
  });
  /* imagens criadas depois (lista de tratamentos) */
  document.addEventListener("error", e => { if (e.target.tagName === "IMG") swap(e.target); }, true);
}

/* ======================== FAQ ======================== */
function initFaq() {
  $$(".faq__q").forEach(btn => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      panel.classList.toggle("is-open", !open);
      panel.firstElementChild.toggleAttribute("inert", open);
    });
  });
}

/* ======================== Carrossel ======================== */
function initCarousel() {
  const track = $(".carousel__track"); if (!track) return;
  const step = () => { const c = track.firstElementChild; return c ? c.getBoundingClientRect().width + 24 : 300; };
  $(".carousel__prev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  $(".carousel__next").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); track.scrollBy({ left: step(), behavior: "smooth" }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); track.scrollBy({ left: -step(), behavior: "smooth" }); }
  });
}

/* ======================== Lightbox ======================== */
function initLightbox() {
  const dlg = $("#lightbox"); if (!dlg) return;
  const buttons = $$("[data-lightbox]"); let idx = 0, opener = null;
  const img = $("img", dlg), cap = $(".lightbox__caption", dlg);
  const show = i => {
    idx = (i + buttons.length) % buttons.length;
    const src = buttons[idx].dataset.lightbox; img.dataset.fb = buttons[idx].dataset.fb || ""; img.src = src; img.alt = buttons[idx].dataset.alt || ""; cap.textContent = img.alt;
  };
  buttons.forEach((b, i) => b.addEventListener("click", () => { opener = b; show(i); dlg.showModal(); }));
  $(".lightbox__close", dlg).addEventListener("click", () => dlg.close());
  $(".lightbox__prev", dlg).addEventListener("click", () => show(idx - 1));
  $(".lightbox__next", dlg).addEventListener("click", () => show(idx + 1));
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", e => { if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1); });
  dlg.addEventListener("close", () => opener && opener.focus());
}

/* ======================== Tratamentos (página) ======================== */
function treatmentWaMessage(t) { return `Olá! Vim pelo site e gostaria de saber mais sobre ${t.name}.`; }

function renderTreatments() {
  const list = $("#treatments-list"); if (!list) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  list.innerHTML = TREATMENTS.map((t, i) => `
    <article class="card treat reveal" id="${t.id}" data-category="${esc(t.category)}">
      <div class="media"><span class="tag">${esc(t.category)}</span>
        <img src="${photoUrl(t.image, 640)}" data-fb="${IMG(t.image)}" alt="${esc(t.imageAlt)}" width="640" height="480" loading="lazy" decoding="async"></div>
      <div class="card__body">
        <h2 class="h3" style="font-size:1.5rem">${esc(t.name)}</h2>
        <p>${esc(t.short)}</p>
        <button type="button" class="treat__toggle" aria-expanded="false" aria-controls="det-${t.id}">Ver detalhes</button>
        <div class="treat__details" id="det-${t.id}"><div inert><dl>
          <dt>O que é</dt><dd>${esc(t.what)}</dd>
          <dt>Para quem é indicado</dt><dd>${esc(t.indicated)}</dd>
          <dt>Como funciona</dt><dd>${esc(t.how)}</dd>
          <dt>Duração da sessão</dt><dd>${esc(t.duration)}</dd>
          <dt>Tempo de recuperação</dt><dd>${esc(t.recovery)}</dd>
        </dl></div></div>
        <a class="btn btn--wa btn--sm" href="${waLink(treatmentWaMessage(t))}" target="_blank" rel="noopener noreferrer" data-label="${esc(t.name)}">${SVG_WA} Quero saber mais</a>
      </div>
    </article>`).join("");

  list.addEventListener("click", e => {
    const btn = e.target.closest(".treat__toggle"); if (!btn) return;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open)); btn.textContent = open ? "Ver detalhes" : "Ocultar detalhes";
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    panel.classList.toggle("is-open", !open); panel.firstElementChild.toggleAttribute("inert", open);
    if (!open) { const t = TREATMENTS.find(x => "det-" + x.id === panel.id); track("ViewContent", "view_item", { content_name: t.name, content_category: t.category }); }
  });

  /* filtros gerados a partir das categorias do array */
  const bar = $("#filters");
  const cats = ["Todos", ...new Set(TREATMENTS.map(t => t.category))];
  bar.innerHTML = cats.map((c, i) => `<button type="button" class="chip" aria-pressed="${i === 0}" data-cat="${c}">${c}</button>`).join("");
  const status = $("#filter-status");
  const apply = cat => {
    let n = 0;
    $$(".treat", list).forEach(card => { const show = cat === "Todos" || card.dataset.category === cat; card.hidden = !show; if (show) { n++; card.classList.add("is-visible"); } });
    $$(".chip", bar).forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cat === cat)));
    status.textContent = `${n} ${n === 1 ? "tratamento exibido" : "tratamentos exibidos"}`;
  };
  bar.addEventListener("click", e => { const b = e.target.closest(".chip"); if (b) apply(b.dataset.cat); });
  const hash = decodeURIComponent(location.hash.slice(1));
  const hashed = hash && document.getElementById(hash);
  if (hashed) { hashed.classList.add("is-visible"); setTimeout(() => hashed.scrollIntoView({ block: "center" }), 150); }
}

/* Select de tratamentos no formulário de contato */
function fillTreatmentSelect() {
  const sel = $("#tratamento"); if (!sel) return;
  TREATMENTS.forEach(t => sel.add(new Option(t.name, t.name)));
  sel.add(new Option("Ainda não sei — quero uma avaliação", "Avaliação geral"));
  const q = new URLSearchParams(location.search).get("tratamento");
  if (q) sel.value = q;
}

/* ======================== Formulário ======================== */
function maskPhone(v) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function initForm() {
  const form = $("#contact-form"); if (!form) return;
  const phone = $("#whatsapp", form);
  phone.addEventListener("input", () => { phone.value = maskPhone(phone.value); });

  const rules = {
    nome: v => v.trim().split(/\s+/).length >= 2 && v.trim().length >= 5 ? "" : "Informe seu nome e sobrenome.",
    whatsapp: v => v.replace(/\D/g, "").length >= 10 ? "" : "Informe um WhatsApp válido com DDD, por exemplo (11) 91234-5678.",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Informe um e-mail válido, por exemplo nome@email.com.",
    tratamento: v => v ? "" : "Escolha um tratamento ou a opção de avaliação.",
    consentimento: (v, el) => el.checked ? "" : "Para enviar, é necessário concordar com a Política de Privacidade."
  };
  const validateField = el => {
    const rule = rules[el.name]; if (!rule) return true;
    const msg = rule(el.value, el), err = document.getElementById(el.id + "-erro");
    el.setAttribute("aria-invalid", msg ? "true" : "false"); if (err) err.textContent = msg; return !msg;
  };
  $$("input, select", form).forEach(el => { if (rules[el.name]) { el.addEventListener("blur", () => validateField(el)); el.addEventListener("input", () => el.getAttribute("aria-invalid") === "true" && validateField(el)); } });

  const status = $("#form-status");
  const showStatus = (kind, text) => { status.hidden = false; status.className = "form-status form-status--" + kind; status.textContent = text; };

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if ($(".hp", form).value) return; // honeypot
    const fields = $$("input, select", form).filter(el => rules[el.name]);
    const results = fields.map(validateField);
    if (results.includes(false)) { showStatus("err", "Revise os campos destacados e tente novamente."); fields.find(el => el.getAttribute("aria-invalid") === "true").focus(); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    delete data._gotcha; delete data.consentimento; data.consentimento_lgpd = "sim"; data.pagina = location.href;
    Object.assign(data, getUTM());
    const submit = $("button[type=submit]", form); submit.disabled = true;

    const message = `Olá! Vim pelo site e gostaria de agendar uma avaliação.\n\n` +
      `Nome: ${data.nome}\nWhatsApp: ${data.whatsapp}\nE-mail: ${data.email}\nTratamento de interesse: ${data.tratamento}\n` +
      `Melhor horário: ${data.horario || "Não informado"}\n` + (data.mensagem ? `Mensagem: ${data.mensagem}` : "");

    if (!FORM_ENDPOINT) {
      track("Lead", "generate_lead", { content_name: data.tratamento });
      window.open(waLink(message), "_blank", "noopener");
      showStatus("ok", "Abrimos o WhatsApp com seus dados já preenchidos. É só tocar em enviar para falar com a nossa equipe.");
      submit.disabled = false; return;
    }
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("HTTP " + res.status);
      track("Lead", "generate_lead", { content_name: data.tratamento });
      form.reset(); showStatus("ok", "Mensagem enviada. Entraremos em contato em breve pelo WhatsApp ou e-mail informado.");
    } catch (err) {
      showStatus("err", "Não foi possível enviar agora. Tente novamente ou fale conosco direto pelo WhatsApp.");
    } finally { submit.disabled = false; }
  });
}

/* ======================== Início ======================== */
document.documentElement.classList.remove("no-js");
document.addEventListener("DOMContentLoaded", () => {
  captureUTM(); fillConfig(); fillWhatsApp(); injectJsonLd();
  renderTreatments(); fillTreatmentSelect(); fillWhatsApp();
  initHeader(); initReveal(); initCounters(); initFaq(); initCarousel(); initLightbox(); initForm(); initImageFallback();
  bindContactEvents(); initCookies();
});
