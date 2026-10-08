/* INDHOLD-SPION — markerer i indholdsfortegnelsen den overskrift, læseren er nået til. */

(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;

  var links = document.querySelectorAll(".note-indhold nav a[href^='#']");
  if (!links.length) return;

  var punkter = [];
  Array.prototype.forEach.call(links, function (a) {
    var id = decodeURIComponent(a.getAttribute("href").slice(1));
    var overskrift = document.getElementById(id);
    if (overskrift) punkter.push({ a: a, h: overskrift });
  });
  if (!punkter.length) return;

  var aktiv = null;

  function opdater() {
    var grænse = window.innerHeight * 0.3;
    var valgt = null;
    punkter.forEach(function (p) {
      if (p.h.getBoundingClientRect().top <= grænse) valgt = p;
    });
    if (valgt === aktiv) return;
    if (aktiv) {
      aktiv.a.classList.remove("aktiv");
      aktiv.a.removeAttribute("aria-current");
    }
    aktiv = valgt;
    if (aktiv) {
      aktiv.a.classList.add("aktiv");
      aktiv.a.setAttribute("aria-current", "location");
    }
  }

  var iagttager = new IntersectionObserver(opdater, {
    rootMargin: "0px 0px -70% 0px",
    threshold: [0, 1]
  });
  punkter.forEach(function (p) { iagttager.observe(p.h); });
  window.addEventListener("scroll", opdater, { passive: true });
  opdater();
})();
