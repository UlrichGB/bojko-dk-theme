# bojko-dk-theme

Hugo-temaet til [bojko.dk](https://bojko.dk).

Et tema til ét site. Det er ikke bygget til at passe til alle sites, og det er
derfor, det ikke har fyrre konfigurationsflag.

## Krav

- Hugo **extended**, minimum `0.146.0`. Den almindelige udgave kan ikke skalere
  billeder, og omslaget kræver det.

## Brug

Temaet hentes som et Hugo Module:

```toml
# config/_default/module.toml
[module]
  [[module.imports]]
    path = "github.com/UlrichGB/bojko-dk-theme"
```

Fire indstillinger er nødvendige, og de fejler lydløst, hvis de mangler:

```toml
# config/_default/markup.toml
[goldmark.renderer]
  unsafe = true
[highlight]
  noClasses           = false
  lineNos             = true
  lineNumbersInTable  = false
```

To indstillinger mere, hvis du vil have `robots.txt` og `llms.txt`. Begge
skabeloner ligger i temaet; de to opslag er dem, Hugo kun læser fra sitet:

```toml
# hugo.toml
enableRobotsTXT = true

[outputs]
  home = ["html", "rss", "llms"]
```

Der ligger ingen `exampleSite/` i repoet. Et tema er ikke et site, og indholdet
bor i sitets eget repo.

## Hvad sitet selv skal levere

Temaet gætter ikke på disse. Mangler de, udelader det dem — det skriver ikke
et plausibelt gæt ud, som ville se ud som en beslutning.

| Hvad | Hvor | Uden den |
|---|---|---|
| `params.author` | konfiguration | ingen byline under rubrikken, ingen forfatter i JSON-LD og ingen `dc:creator` i feedet |
| `params.feedTitle` | konfiguration | feedet hedder det samme som sitet |
| `params.description` | konfiguration | sidste udvej for `<meta name="description">`. Temaet udleder selv en til mærkesider, arkiv og indlæg, så den er sjældent i brug |
| `params.licens` (`navn`, `url`) | konfiguration | kolofonen står uden licensled. Det er en gyldig kolofon |
| `params.ogBillede` | konfiguration + `static/` | sider uden omslagsbillede får intet `og:image`. Artikler bruger deres eget omslag |
| `favicon.svg`, `apple-touch-icon.png`, webmanifest | `static/` | ingen ikoner. Temaet kan ikke levere dem uden at gætte på et bomærke |

## Hvad sitet HEDDER

Temaet kender ikke sitets mapper. To navne, det ellers ville skulle gætte,
står i konfigurationen — med en standard, så et site, der ikke sætter dem,
stadig virker.

| Hvad | Standard | Hvad den styrer |
|---|---|---|
| `params.skrivesektion` | `["blog", "noter"]` | sektionerne i forsidens strøm — som også er hovedfeedet og 404-sidens "Nyeste indlæg". Den FØRSTE af dem er arkivet: "Hele arkivet" og "År" peger på den |
| `params.profilside` | `/om/` | siden bag bylinen `Af …`, bag navnet i kolofonen og i JSON-LD'ens `author.url` |

`skrivesektion` tager begge former:

```toml
skrivesektion = ["blog", "noter"]   # en strøm af flere sektioner
skrivesektion = "blog"              # kun én — samme som ["blog"]
```

★ **En standard, der er uenig med sitet, siger ikke fra.** Hedder sektionen
noget andet end `blog`, bygger sitet uden en eneste fejl — forsiden er bare
tom. Sæt derfor navnene udtrykkeligt, også når de er standarden:

```toml
# config/_default/params.toml
skrivesektion = ["blog", "noter"]
```

Rækkefølgen betyder noget: artiklerne først, fordi arkivet er deres.

## Tidslinjer

En tidslinje er ét leaf bundle: en mappe med `index.md`, der har
`tidslinje: true` og indledningen, og ved siden af den én fil pr. hændelse,
`ÅÅÅÅ-MM-DD-slug.md`, med `title`, `date`, `type` (ét dansk ord) og `kilder`
(en liste af `titel` og `url`) i hovedet og et til tre korte afsnit som tekst.
Billeder ligger i samme mappe, uden undermapper. Siden viser indledningen og
derefter hændelserne i datoorden; hændelserne bliver aldrig sider for sig.
En ny hændelse: `hugo new content --kind haendelse blog/<tidslinje>/ÅÅÅÅ-MM-DD-slug.md`.

## Skrifterne

De tre familier i `assets/fonts/` — Merriweather, Source Sans 3 og Comfortaa —
er SIL Open Font License 1.1 og **ikke** dækket af `LICENSE`. Licensteksterne
ligger i `static/fonts/` og skal følge med, hvis skrifterne følger med.

Filerne får fingeraftryk som CSS'en, og `@font-face`-adresserne skrives af
`_partials/skrifter.html`. Derfor er der ingen `/fonts/`-adresse skrevet i
hånden nogen steder, og temaet kan serveres fra en undermappe. De to skrifter,
der bærer første skærmbillede — Merriweather-Bold og SourceSans3 — bliver
`preload`'et; resten hentes, når stylesheettet er læst.

## Licens

MIT — se [`LICENSE`](LICENSE). Skrifterne har deres egen licens, se ovenfor.
