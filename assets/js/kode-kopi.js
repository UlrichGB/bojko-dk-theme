/* KODE-KOPI — kopiér-knappen på en kodeblok.
   Sætter en knap i hver .highlight og skriver blokkens kode til
   udklipsholderen. */

(function () {
  "use strict";

  if (!navigator.clipboard || !window.isSecureContext) return;

  var blokke = document.querySelectorAll(".highlight");
  if (!blokke.length) return;

  var ETIKET = "Kopiér kode";
  var KVITTERING = "Kopieret";
  var FEJL = "Kunne ikke kopiere";

  Array.prototype.forEach.call(blokke, function (blok) {
    var pre = blok.querySelector("pre");
    if (!pre) return;

    var knap = document.createElement("button");
    knap.type = "button";
    knap.className = "kopi-knap";
    knap.textContent = ETIKET;

    var kode = pre.querySelector("code");
    var sprog = kode && kode.getAttribute("data-lang");
    knap._blok = sprog ? "Kodeblokken (" + sprog + ")" : "Kodeblokken";
    knap.setAttribute("aria-label", navn(ETIKET, knap._blok));

    knap.setAttribute("aria-live", "polite");

    knap.addEventListener("click", function () {
      var spor = pre.querySelectorAll(".cl");
      var tekst;

      if (spor.length) {
        tekst = Array.prototype.map
          .call(spor, function (s) { return s.textContent; })
          .join("");
      } else {
        tekst = pre.textContent;
      }

      tekst = tekst.replace(/\n+$/, "");

      navigator.clipboard.writeText(tekst).then(
        function () { kvittér(knap, KVITTERING); },
        function () { kvittér(knap, FEJL); }
      );
    });

    blok.appendChild(knap);
  });

  function navn(besked, blok) {
    if (besked === KVITTERING) return blok + " er kopieret";
    if (besked === FEJL) return "Kunne ikke kopiere " + blok.toLowerCase();
    return "Kopiér " + blok.toLowerCase();
  }

  function kvittér(knap, besked) {
    if (knap._ur) clearTimeout(knap._ur);
    knap.textContent = besked;
    knap.setAttribute("aria-label", navn(besked, knap._blok));
    knap.setAttribute("data-kopieret", "");
    knap._ur = setTimeout(function () {
      knap.textContent = ETIKET;
      knap.setAttribute("aria-label", navn(ETIKET, knap._blok));
      knap.removeAttribute("data-kopieret");
    }, 2000);
  }
})();
