/* ===========================================================================
   KODE-KOPI — kopiér-knappen på en kodeblok
   ===========================================================================
   ★ DETTE ER TEMAETS FØRSTE OG ENESTE JAVASCRIPT.

   Det var et udtrykkeligt valg, at der ikke var noget. README siger det om
   "Kopiér link" blandt delknapperne: "Den skriver til udklipsholderen,
   hvilket er JavaScript, og der er ikke en linje af det i dette tema."
   Den linje er der nu, og det er fordi Ulrich bad om knappen. Resten af
   beslutningen står ved magt: der kommer ikke et bibliotek, ikke et
   byggeskridt og ikke et eksternt kald med den.

   Reglerne, filen er skrevet under:

     - Ingen afhængigheder. Ingen npm, ingen bundler. Hugo minificerer og
       fingeraftrykker den med sine egne pipes, præcis som CSS'en.
     - Ingen byggeskridt. Det er den fil, der kører — der er ikke en kilde
       et andet sted, den er kompileret fra.
     - PROGRESSIV FORBEDRING. Knappen findes ikke i HTML'en. Den bliver LAVET
       her, og kun hvis browseren faktisk kan kopiere. Uden JavaScript er der
       derfor ingen knap — og ikke en knap, der ikke virker, hvilket er værre
       end ingen. Blokken er lige så læselig og lige så nem at markere med
       musen uden dette script som med det.
     - Ingen ændring af koden. Scriptet læser; det skriver ikke i blokken.

   HVORFOR .cl OG IKKE HELE BLOKKEN: Chroma skriver hver linje som
   <span class="line"><span class="ln">7</span><span class="cl">kode</span></span>,
   hvor .ln er linjenummeret. Læser man pre.textContent, får man numrene med
   ind i det kopierede — nøjagtig den fejl, markup.toml frarådede linjenumre
   for i første omgang. Ved at samle .cl og kun .cl kopieres koden og intet
   andet. CSS'en sætter desuden user-select: none på .ln, så numrene heller
   ikke følger med, når man markerer med musen.
   =========================================================================== */

(function () {
  "use strict";

  // Udklipsholderen kræver en sikker kontekst (https eller localhost). Er den
  // der ikke, laves knappen slet ikke — se "progressiv forbedring" ovenfor.
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

    // Der kan være mange kodeblokke på en side, så knappen skal sige HVAD den
    // kopierer. Sproget er Chromas eget data-lang, når det er sat.
    var kode = pre.querySelector("code");
    var sprog = kode && kode.getAttribute("data-lang");
    knap._blok = sprog ? "Kodeblokken (" + sprog + ")" : "Kodeblokken";
    knap.setAttribute("aria-label", navn(ETIKET, knap._blok));

    // Kvitteringen skal også nå en skærmlæser. aria-live på selve knappen
    // læser den nye etiket op, når teksten skifter.
    //
    // ★ MEN aria-label VINDER OVER TEKSTEN. Et element med aria-label får sit
    // tilgængelige navn DERFRA og ikke fra sit indhold, også når indholdet
    // skifter. Knappen sagde derfor stadig "Kopiér kodeblokken (bash)", i det
    // øjeblik der stod "Kopieret" på den — kvitteringen nåede øjet og aldrig
    // øret. Derfor skriver kvittér() etiketten ind i BEGGE dele. Navnet på
    // blokken gemmes ovenfor, så den kan sætte den sammen igen.
    knap.setAttribute("aria-live", "polite");

    knap.addEventListener("click", function () {
      // Kun kodesporene. Se forklaringen i hovedet af filen.
      var spor = pre.querySelectorAll(".cl");
      var tekst;

      if (spor.length) {
        tekst = Array.prototype.map
          .call(spor, function (s) { return s.textContent; })
          .join("");
      } else {
        // Ingen linjenumre slået til: så er der ikke noget at sortere fra.
        tekst = pre.textContent;
      }

      // Chroma lægger et afsluttende linjeskift i den sidste linje. Det skal
      // ikke med — ellers indsætter et terminalvindue en tom linje og kører
      // kommandoen, før man har set på den.
      tekst = tekst.replace(/\n+$/, "");

      navigator.clipboard.writeText(tekst).then(
        function () { kvittér(knap, KVITTERING); },
        function () { kvittér(knap, FEJL); }
      );
    });

    blok.appendChild(knap);
  });

  // Det tilgængelige navn er en hel sætning og ikke etiketten plus et ord.
  // "Kopieret kodeblokken (bash)" er ikke dansk; "Kodeblokken (bash) er
  // kopieret" er. Etiketten på knappen er stadig de to ord, designet har.
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
