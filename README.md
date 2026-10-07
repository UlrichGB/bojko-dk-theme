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

## Designguiden

Alle mål i temaet — gitter, hoved, lodret rytme, sidespalte, bund, skriftstørrelser og enhedsreglen — står i [`docs/design-guide.md`](docs/design-guide.md), hvert i px og i rem/em. Koden følger guiden; er de uenige, er det koden, der er forkert.

## Noter

En note (sektionen `noter`, eller `type: noter`) er en wiki-side, ikke en artikel. Blog, forside, arkiv og profil beholder deres egen brødtekst og deler kun hoved, bund og ramme med noterne.

Siden står på det samme gitter som resten af sitet: 12 kolonner á 72px (4,5rem) med 24px (1,5rem) imellem er rammen på 1128px (70,5rem). Teksten står i kolonne 1–8 (744px, 46,5rem), sidespalten i 10–12 (264px, 16,5rem), og indholdsfortegnelsen to kolonner uden for rammen (168px, 10,5rem). Tabeller, billeder og diagrammer har som standard tekstens bredde; kun det, der står i `{{< wide >}}`, går over alle 12 kolonner.

| Skærmbredde | Layout |
|---|---|
| fra 97em | tekst, sidespalte og indholdsfortegnelsen i venstre margen. Den følger med, når man ruller, og kræver mindst tre overskrifter |
| 73,5em til 97em | tekst og sidespalte på rammen; ingen indholdsfortegnelse |
| under 73,5em | gitteret er 8 kolonner; teksten bruger alle 8, og sidespalten står under teksten og bruger de samme 8 |

Brudpunkterne er målt: 97em er rammen (70,5rem) plus indholdsfortegnelsen og mellemrummet (10,5 + 1,5rem) i hver side og 1rem til skærmkanten; 73,5em er rammen plus 1,5rem margen i hver side. Mellemrum og margener under 73,5em er et forslag, se guiden.

Sidespalten bygges af det, Hugo og forsidematerialet allerede har. En afdeling uden indhold udelades:

| Afdeling | Kommer fra |
|---|---|
| Om noten | `date`, `lastmod`, læsetid og `tags` (emnerne som små knapper til emnesiderne) |
| Henviser til | interne links i notens tekst (`](/…)`) til sider, der findes |
| Henvist fra | de sider på sitet, hvis tekst linker hertil |
| Relateret | Hugos `Related` (sitets `related`-opsætning), noter og blogindlæg (sektionerne i `params.skrivesektion`), højst fem |
| Downloads | bundtets øvrige filer, når de ikke er billeder eller sider |

Der er ingen afdeling for eksterne links: de står allerede i teksten, og forsidematerialet har ikke en liste at hente dem fra. Sidens slutning (skillestreg, Del, linket tilbage) står i kolonne 1–8; Relaterede og Tags står ikke dér, for sidespalten har dem.

### Bredt: `{{< wide >}}`

```markdown
{{< wide >}}
![Forløbet i seks trin](forlob.svg)
{{< /wide >}}
```

Et billede, et diagram eller en tabel i `{{< wide >}}` fylder hele rammen: alle 12 kolonner (1128px). Et bredt element ligger aldrig over sidespalten. Står det, før sidespalten er slut, begynder det under den, og teksten før det står, hvor den er. Under 73,5em er der kun én spalte, så er bredt det samme som almindeligt.

`{{< bred >}}` er det gamle navn og gør det samme. På blogindlæg er begge uændret udbruddet ud af læsespalten og ud i arket (`fuld="ja"` går helt ud).

### Tegninger i noter

Reglerne for diagrammer (tegnebredde 744px, 1128px i `{{< wide >}}`, mindste tekst 14px, hvad der sker på smalle skærme) står i [`docs/design-guide.md`](docs/design-guide.md), afsnit 12.

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
