/* LIGHTBOX — klik på et billede i en artikel eller note åbner det stort.
   Billedets title (eller dets figcaption/kursiv billedtekst) står ved siden
   af billedet på brede skærme og under det på smalle. Uden script er
   billedet, som det altid har været. */

(function () {
  "use strict";

  if (typeof HTMLDialogElement !== "function") return;

  var billeder = Array.prototype.filter.call(
    document.querySelectorAll("img[data-stor]"),
    function (img) { return !img.closest("a, button"); }
  );
  if (!billeder.length) return;

  var knapper = billeder.map(function (img) {
    var knap = document.createElement("button");
    knap.type = "button";
    knap.className = "lightbox-knap";
    knap.setAttribute("aria-haspopup", "dialog");
    img.parentNode.insertBefore(knap, img);
    knap.appendChild(img);
    return knap;
  });

  var dialog, figur, stort, tekst, forrige, naeste, tael, aktuel;

  function tekstFor(knap) {
    var img = knap.querySelector("img");
    if (img.title) return img.title;
    var fig = img.closest("figure");
    var fc = fig && fig.querySelector("figcaption");
    if (fc) return fc.textContent.trim();
    var em = knap.nextElementSibling;
    if (em && em.tagName === "EM") return em.textContent.trim();
    return "";
  }

  function bygDialog() {
    dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Billede i stor udgave");
    dialog.innerHTML =
      '<button type="button" class="lightbox-luk" aria-label="Luk">' +
        '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
        '<path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '</button>' +
      '<button type="button" class="lightbox-pil lightbox-pil--forrige" aria-label="Forrige billede">' +
        '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
        '<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>' +
      '<button type="button" class="lightbox-pil lightbox-pil--naeste" aria-label="Næste billede">' +
        '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
        '<path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>' +
      '<div class="lightbox-indhold">' +
        '<div class="lightbox-billede"><img alt=""></div>' +
        '<p class="lightbox-tekst" hidden></p>' +
      '</div>' +
      '<p class="lightbox-tael" aria-live="polite"></p>';

    figur = dialog.querySelector(".lightbox-indhold");
    stort = dialog.querySelector("img");
    tekst = dialog.querySelector(".lightbox-tekst");
    forrige = dialog.querySelector(".lightbox-pil--forrige");
    naeste = dialog.querySelector(".lightbox-pil--naeste");
    tael = dialog.querySelector(".lightbox-tael");

    dialog.querySelector(".lightbox-luk").addEventListener("click", function () { dialog.close(); });
    forrige.addEventListener("click", function () { vis(aktuel - 1); });
    naeste.addEventListener("click", function () { vis(aktuel + 1); });

    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target === figur ||
          e.target.classList.contains("lightbox-billede")) dialog.close();
    });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") vis(aktuel - 1);
      else if (e.key === "ArrowRight") vis(aktuel + 1);
    });
    dialog.addEventListener("close", function () {
      stort.removeAttribute("src");
      document.documentElement.classList.remove("lightbox-aaben");
      if (knapper[aktuel]) knapper[aktuel].focus();
    });

    document.body.appendChild(dialog);
  }

  function vis(i) {
    if (i < 0 || i >= knapper.length) return;
    aktuel = i;
    var img = knapper[i].querySelector("img");
    stort.removeAttribute("width");
    stort.removeAttribute("height");
    if (img.dataset.storB) stort.setAttribute("width", img.dataset.storB);
    if (img.dataset.storH) stort.setAttribute("height", img.dataset.storH);
    stort.src = img.dataset.stor;
    stort.alt = img.alt;

    var t = tekstFor(knapper[i]);
    tekst.textContent = t;
    tekst.hidden = !t;
    dialog.classList.toggle("har-tekst", !!t);

    var flere = knapper.length > 1;
    forrige.hidden = naeste.hidden = !flere;
    forrige.disabled = i === 0;
    naeste.disabled = i === knapper.length - 1;
    tael.textContent = flere ? (i + 1) + " af " + knapper.length : "";
  }

  knapper.forEach(function (knap, i) {
    knap.addEventListener("click", function () {
      if (!dialog) bygDialog();
      vis(i);
      document.documentElement.classList.add("lightbox-aaben");
      dialog.showModal();
    });
  });
})();
