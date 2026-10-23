/* Confluence prototype — rendering, scroll-linked environment, interactions.
   No dependencies. Classic script so the page also works from file://. */
(function () {
  "use strict";
  var C = window.CONFLUENCE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var PLUS = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M7 1v12M1 7h12"/></svg>';
  var TBA = "To be announced";

  /* ---------- Static text from config ---------- */
  $("[data-about-lead]").textContent = C.ABOUT_LEAD || "";
  $("[data-about-text]").textContent = C.ABOUT_TEXT || "";
  $("[data-themes-intro]").textContent = C.THEMES_INTRO || "";
  $("[data-roadmap-intro]").textContent = C.ROADMAP_INTRO || "";
  $("[data-closing-text]").textContent = C.CLOSING_TEXT || "";
  $("[data-year]").textContent = C.YEAR || "";
  var loc = $("[data-location]"); if (loc) loc.textContent = C.LOCATION || "";

  $("#facts").innerHTML = (C.FACTS || []).map(function (f) {
    return "<div><dt>" + f.label + "</dt><dd" + (f.value ? "" : ' class="tba"') + ">" + (f.value || TBA) + "</dd></div>";
  }).join("");

  var fc = [];
  if (C.CONTACT_EMAIL) fc.push('<a href="mailto:' + C.CONTACT_EMAIL + '">' + C.CONTACT_EMAIL + "</a>");
  (C.SOCIAL_LINKS || []).forEach(function (s) { fc.push('<a href="' + s.url + '" rel="noopener">' + s.label + "</a>"); });
  $("#footer-contact").innerHTML = fc.join(" · ");

  /* ---------- Official public registration ---------- */
  var registrationUrl = C.REGISTRATION_URL || "https://REPLACE-WITH-OFFICIAL-GOOGLE-FORM-URL";
  var registrationUnset = !registrationUrl || registrationUrl.indexOf("REPLACE-WITH-OFFICIAL-GOOGLE-FORM-URL") !== -1;
  var toast = $("#toast"), toastTimer;
  $$('[data-register]').forEach(function (a) {
    a.href = registrationUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    if (registrationUnset) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        toast.textContent = "Official Google Form not configured. Replace REGISTRATION_URL in public/js/content.js with the organisers’ URL.";
        toast.classList.add("is-on");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.classList.remove("is-on"); }, 5000);
      });
    }
  });

  /* ---------- Themes (tabs) ---------- */
  var tabsEl = $("#tabs"), panel = $("#theme-panel"), themes = C.THEMES || [];
  tabsEl.innerHTML = themes.map(function (t, i) {
    return '<button class="tab" role="tab" id="tab-' + i + '" aria-controls="theme-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + t.name + "</button>";
  }).join("");
  var tabs = $$(".tab", tabsEl);
  function selectTheme(i, focus) {
    tabs.forEach(function (b, n) { b.setAttribute("aria-selected", n === i); b.tabIndex = n === i ? 0 : -1; });
    var t = themes[i];
    panel.setAttribute("aria-labelledby", "tab-" + i);
    panel.innerHTML = "<h3>" + t.name + "</h3><p>" + t.description + "</p>" + (t.placeholder ? '<span class="status">Placeholder — official theme to be announced</span>' : "");
    panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap");
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function (b, i) {
    b.addEventListener("click", function () { selectTheme(i); });
    b.addEventListener("keydown", function (e) {
      var n = tabs.length, k = e.key, j = null;
      if (k === "ArrowDown" || k === "ArrowRight") j = (i + 1) % n;
      else if (k === "ArrowUp" || k === "ArrowLeft") j = (i - 1 + n) % n;
      else if (k === "Home") j = 0; else if (k === "End") j = n - 1;
      if (j !== null) { e.preventDefault(); selectTheme(j, true); }
    });
  });
  if (themes.length) selectTheme(0);

  /* ---------- Roadmap ---------- */
  var tl = $("#timeline"), road = C.ROADMAP || [];
  tl.innerHTML = road.map(function (m, i) {
    return '<li class="ms" data-open="' + (i === 0) + '">' +
      '<div class="ms__date' + (m.date ? "" : " tba") + '">' + (m.date || "Date to be announced") + "</div>" +
      '<span class="ms__node" aria-hidden="true"></span>' +
      '<div class="ms__body"><h3><button class="ms__btn" aria-expanded="' + (i === 0) + '" aria-controls="ms-' + i + '">' + m.title + PLUS + "</button></h3>" +
      '<div class="ms__detail" id="ms-' + i + '" role="region"><div><p>' + m.detail + "</p></div></div></div></li>";
  }).join("");
  $$(".ms", tl).forEach(function (li) {
    var btn = $(".ms__btn", li);
    btn.addEventListener("click", function () {
      var open = li.getAttribute("data-open") === "true";
      $$(".ms", tl).forEach(function (o) { o.setAttribute("data-open", "false"); $(".ms__btn", o).setAttribute("aria-expanded", "false"); });
      if (!open) { li.setAttribute("data-open", "true"); btn.setAttribute("aria-expanded", "true"); }
    });
  });

  /* ---------- FAQ (native <details>: keyboard + screen-reader support built in) ---------- */
  $("#faq-list").innerHTML = (C.FAQS || []).map(function (f) {
    return "<details><summary>" + f.q + PLUS + "</summary><p>" + f.a + "</p></details>";
  }).join("");

  /* ---------- Mobile menu ---------- */
  var header = $("#site-header"), burger = $("#burger"), mnav = $("#mobile-nav");
  function setMenu(open, restoreFocus) {
    header.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) { var a = $("a", mnav); a && a.focus(); } else if (restoreFocus) burger.focus();
  }
  burger.addEventListener("click", function () { setMenu(!header.classList.contains("is-open")); });
  mnav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && header.classList.contains("is-open")) setMenu(false, true); });
  window.addEventListener("resize", function () { if (window.innerWidth > 880) setMenu(false); });

  /* ---------- Scroll-linked environment + active nav ----------
     Maps scroll position to a single journey value p (0 nightfall → 1 dawn)
     by interpolating between the sections' positions, so the light follows
     the content rather than raw pixels. Only CSS variables are written. */
  var ids = ["home", "about", "themes", "roadmap", "faq", "register"];
  var stops = [0, 0.24, 0.5, 0.72, 0.84, 1];
  var secs = ids.map(function (id) { return document.getElementById(id); });
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tops = [], root = document.documentElement, ticking = false, current = "";
  function measure() { tops = secs.map(function (s) { return s.getBoundingClientRect().top + window.scrollY; }); }
  function smooth(x, a, b) { var t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  function update() {
    ticking = false;
    var vh = window.innerHeight, sy = window.scrollY;
    var max = Math.max(1, document.documentElement.scrollHeight - vh);
    var y = sy + vh * (0.35 + 0.4 * Math.min(1, sy / max));
    var p = 1;
    for (var i = 0; i < tops.length - 1; i++) {
      if (y < tops[i + 1]) { p = stops[i] + (stops[i + 1] - stops[i]) * Math.max(0, (y - tops[i]) / (tops[i + 1] - tops[i])); break; }
    }
    var s = root.style;
    s.setProperty("--p", p.toFixed(4));
    s.setProperty("--k-blue", smooth(p, 0, 0.38).toFixed(4));
    s.setProperty("--k-lav", Math.max(0, 1 - Math.abs(p - 0.5) / 0.3).toFixed(4));
    s.setProperty("--k-dawn", Math.pow(smooth(p, 0.62, 1), 1.2).toFixed(4));
    /* Sun + clouds. The sun's height is tied directly to scroll progress (0 = just
       below the horizon at page load, 1 = fully risen at the registration section).
       With reduced motion it holds one still composition; only its light follows p. */
    var sun = reduce ? 0.24 : Math.min(1, Math.max(0, (p - 0.084) / 0.916));
    s.setProperty("--sun", sun.toFixed(4));
    s.setProperty("--k-vis", smooth(sun, 0.02, 0.35).toFixed(4));
    s.setProperty("--k-halo", (0.2 + 0.8 * smooth(p, 0.05, 0.95)).toFixed(4));
    s.setProperty("--k-lit", (0.28 + 0.72 * smooth(p, 0.1, 0.8)).toFixed(4));
    s.setProperty("--k-cloud", smooth(p, 0.1, 0.6).toFixed(4));
    s.setProperty("--k-warm", smooth(p, 0.55, 1).toFixed(4));
    header.classList.toggle("is-scrolled", sy > 24);

    var probe = sy + 140, act = ids[0];
    for (var j = 0; j < tops.length; j++) { if (tops[j] <= probe + vh * 0.2) act = ids[j]; }
    if (sy + vh >= document.documentElement.scrollHeight - 4) act = "register";
    if (act !== current) {
      current = act;
      $$(".nav a, .mobile-nav a:not(.btn)").forEach(function (a) {
        if (a.getAttribute("href") === "#" + act || (act === "register" && false)) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { measure(); onScroll(); });
  window.addEventListener("load", function () { measure(); update(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); update(); });
  measure(); update();
})();
