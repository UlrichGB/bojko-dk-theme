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
| `params.author` | konfiguration | ingen forfatter i `<meta name="author">` og JSON-LD og ingen `dc:creator` i feedet |
| `undertitel` i forsidens `_index.md` | indhold | forsiden har kun sit skjulte `<h1>` med sitets titel. Er den sat, bliver forsidens `<h1>` forfatterens navn (`params.author`), skjult for øjet men i siden, og linjen står som synlig undertitel under ordmærket i topbaren, kun på forsiden. Den er ikke `description`, så forsidens `<meta description>` ikke ændres |
| `params.stilling`, `params.arbejdsgiver`, `params.arbejdsgiverUrl`, `params.arbejdsgiverProfil` | konfiguration | felterne `jobTitle`, `worksFor` (navn + url) og `knowsAbout` (læses fra `faerdigheder` i profilsidens forsidemateriale, liste eller enkelt tekst) i `Person`-JSON-LD'en. `arbejdsgiverProfil` er en hel artikel-URL (arbejdsgiverens side om personen) og kommer i `sameAs` efter LinkedIn. Hvert felt udelades, når dets param mangler; `arbejdsgiverUrl` uden `arbejdsgiver` giver intet `worksFor` |
| `params.feedTitle` | konfiguration | feedet hedder det samme som sitet |
| `params.description` | konfiguration | sidste udvej for `<meta name="description">`. Temaet udleder selv en til mærkesider, arkiv og indlæg, så den er sjældent i brug |
| `params.licens` (`navn`, `url`) | konfiguration | kolofonen står uden licensled. Det er en gyldig kolofon |
| `params.ogBillede` | konfiguration + `static/` | sider uden omslagsbillede får intet `og:image`. Artikler bruger deres eget omslag |
| en side med `layout: aar`, fx `content/blog/aar/_index.md` med `outputs: ["html"]` | indhold | arkivet viser årene under emnerne i stedet for på deres egen side |
| `favicon.svg`, `apple-touch-icon.png`, webmanifest | `static/` | ingen ikoner. Temaet kan ikke levere dem uden at gætte på et bomærke |

## Hvad sitet HEDDER

Temaet kender ikke sitets mapper. To navne, det ellers ville skulle gætte,
står i konfigurationen — med en standard, så et site, der ikke sætter dem,
stadig virker.

| Hvad | Standard | Hvad den styrer |
|---|---|---|
| `params.skrivesektion` | `["blog", "noter"]` | sektionerne i forsidens strøm — som også er hovedfeedet og 404-sidens "Nyeste indlæg". Den FØRSTE af dem er arkivet: "Hele arkivet" peger på den |
| `params.profilside` | `/om/` | siden bag navnet i kolofonen og i JSON-LD'ens `author.url`. Personen har `@id` = denne adresse + `#person`; `Person`-JSON-LD'en står på forsiden (side 1) og her, og hvert indlægs `author` og `publisher` (begge med profilsidens url) peger på samme `@id`. `sameAs` bygges af `params.social.linkedin` |

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

En tidslinje er en side med `tidslinje: true` og indledningen som tekst.
Et indlæg kommer med i den ved at skrive samme navn i sit eget hoved:

```yaml
# blog/microsoft-recall-tidslinje/index.md
tidslinje: true
timeline: Microsoft Recall

# blog/<indlæg>/index.md
timeline: Microsoft Recall
```

Navnene skal være ens tegn for tegn. Har tidslinjesiden ingen `timeline`,
er dens navn `title` uden et afsluttende ": en tidslinje", så
"Microsoft Recall: en tidslinje" hedder `Microsoft Recall`.

Siden viser indledningen og derefter ét kort pr. indlæg i datoorden: dato,
rubrik med link til indlægget, indlæggets `description` som tekst og Læs
mere. Indlægget selv får øverst en boks, "Del af tidslinjen … · 5 af 13",
med én streg pr. kort, Forrige og Næste. Boksen bruger tidslinjens
`linkTitle`, hvis den har en, ellers `title`.

Indtil videre læses også hændelsesfiler i tidslinjens bundle,
`ÅÅÅÅ-MM-DD-slug.md` ved siden af `index.md` med `title` og `date` og et til
tre korte afsnit. Har en hændelse `indlaeg: "/blog/<slug>/"`, viser kortet et
uddrag og linker til indlægget; har det indlæg selv `timeline`, springes
hændelsen over, så intet står der to gange. Hændelser og indlæg flettes efter
dato; billeder til dem ligger i samme mappe, uden undermapper. En ny hændelse:
`hugo new content --kind haendelse blog/<tidslinje>/ÅÅÅÅ-MM-DD-slug.md`.

## Noter

En note (sektionen `noter`, eller `type: noter`) er en wiki-side, ikke en
artikel. Blog, forside, arkiv og profil er uændrede. Siden er et gitter i
arkets ramme på 1120px, kant i kant med topbaren:

| Hvad | Mål | Hvor |
|---|---|---|
| Teksten | 805px (omkring 80 tegn pr. linje) | venstre |
| Mellemrum | 25px | |
| Sidespalten | 290px | højre, ved siden af hoved og første stykke tekst |
| Indholdsfortegnelsen | 200px, højrestillet | i margenen uden for rammen, 5px fra teksten |

Tabeller, billeder og diagrammer har som standard tekstens bredde og ikke
arkets. Kun det, der står i `{{< wide >}}`, er bredt (se nedenfor).

| Skærmbredde | Layout |
|---|---|
| fra 1568px | tekst + sidespalte, indholdsfortegnelsen i venstre margen. Den følger med, når man ruller, og kræver mindst tre overskrifter |
| 1024px til 1568px | tekst + sidespalte, ingen indholdsfortegnelse. Under 1140px følger rammen skærmen (10px luft på hver side som topbaren), og teksten bliver smallere end 805px |
| under 1024px | én spalte, sidespalten under teksten, ingen indholdsfortegnelse. Topbaren er stablet som i dag |

Brudpunkterne er målt: 1568px er rammen (1120px) plus indholdsfortegnelsen
(200px) og luft (5px) i hver side af en centreret ramme, og lidt til
skærmkanten; 1024px er det, hvor teksten stadig har omkring 680px ved siden
af en sidespalte på 290px.

Sidespalten bygges af det, Hugo og forsidematerialet allerede har. En
afdeling uden indhold udelades:

Rækkefølgen er den, tabellen har. Alle links i den er understregede som
links i teksten, også emnerne.

| Afdeling | Kommer fra |
|---|---|
| Om noten | `date`, `lastmod`, læsetid og `tags` (emnerne som links til emnesiderne) |
| Henviser til | interne links i notens tekst (`](/…)`) til sider, der findes |
| Henvist fra | de sider på sitet, hvis tekst linker hertil |
| Relaterede noter | Hugos `Related` (sitets `related`-opsætning), kun noter, højst fem |
| Filer | bundtets øvrige filer, når de ikke er billeder eller sider |

Der er ingen afdeling for eksterne links: de står allerede i teksten, og
forsidematerialet har ikke en liste at hente dem fra.

### Bredt: `{{< wide >}}`

```markdown
{{< wide >}}
![Forløbet i seks trin](forlob.svg)
{{< /wide >}}
```

Et billede, et diagram eller en tabel i `{{< wide >}}` fylder hele rammen:
teksten plus sidespalten (1120px). Et bredt element ligger aldrig over
sidespalten. Står det, før sidespalten er slut, begynder det under den, og
teksten før det står, hvor den er. Under 1024px er der kun én spalte, så
er bredt det samme som almindeligt.

`{{< bred >}}` er det gamle navn og gør det samme. På blogindlæg er begge
uændret udbruddet ud af læsespalten og ud i arket (`fuld="ja"` går helt ud).

### Tegninger i noter

Tegn, så tegningen vises i den bredde, den er tegnet i. Så er tekstens
størrelse den, der står i tegningen.

| | Almindelig | `{{< wide >}}` |
|---|---|---|
| Tegnebredde (`viewBox`) | 805 | 1120 |
| Mindste tekst, som den vises | 14px | 14px |

Regler:

- **`viewBox` og `width`/`height` skal passe sammen**, fx `viewBox="0 0 805 330"`
  med `width="805" height="330"`. Temaet læser `viewBox` og skriver målene på
  `<img>`, så siden ikke hopper, når tegningen hentes. Et billede, der ikke er
  tegnet i et af de to mål, bliver ikke skaleret op, kun ned.
- **Tekst på 14px eller større**, målt i tegningens egne enheder. 14px i en
  tegning på 805 er 14px på skærmen; tegn aldrig bredere og regn med, at den
  skrumper.
- **Skrift: `font-family="system-ui, sans-serif"`.** En SVG, der vises som
  billede, kan ikke bruge sidens skrifter, så et navn, siden har indlæst, hjælper
  ikke.
- **Billeder (png, jpeg, webp)** skaleres ned til 805px (1120px i
  `{{< wide >}}`) og leveres i flere størrelser; et skærmbillede er ikke et
  diagram og skal ikke tegnes om.
- **På smalle skærme** skalerer tegningen med spalten ned til 90 % af
  tegnebredden (725px for 805, 1008px for 1120). Er spalten smallere, bliver
  tegningen i de 90 % og kan rulles sidelæns i sit eget afsnit, ligesom en
  tabel. Teksten i den er derfor aldrig under 12,6px.

## Links til andre websteder

Et link til et andet websted (en absolut `http(s)`-adresse med en anden
vært end sitets egen; `www.` tæller ikke) åbner i en ny fane med
`rel="noopener noreferrer"` og får et lille ikon efter sig. Det gælder
markdown-links overalt (`_markup/render-link.html`, så noter og blogindlæg
ens) og de links, temaet selv skriver: bunden, profilens kontaktlinks,
delerækken og tidslinjens hændelser. Interne links, `mailto:` og `#anker`
er uændrede, og ikonknappen til LinkedIn i topbaren får kun teksten
"åbner i en ny fane" i sit `aria-label`, ikke et ikon til.

Ikonet er `span.ekstern` med `aria-label="åbner i en ny fane"`; CSS tegner det
og binder det til linkets sidste ord, så det ikke står alene på en linje.
Det står hverken i meta-beskrivelser, JSON-LD, feed eller `llms.txt`
(`_partials/uden-anker.html` tager det ud) og tæller ikke med i ordtal eller
læsetid. Rå `<a>` i indholdet røres ikke.

Hooken overtager også det, Hugo ellers selv gør ved et link: et link til en
side eller en fil i bundtet går til sidens rigtige adresse, ikke til
mappenavnet i teksten.

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
