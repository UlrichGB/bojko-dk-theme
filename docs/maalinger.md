# Målinger ved 1900px

Målt på testnoten "Automatisk mærkning i Purview" (siden er bygget mod et rigtigt site) i et vindue på 1900px, som giver en layoutbredde på 1851px og en ramme på 1128px (kant til kant: x=354 til x=1482). Skærmbillederne ligger i `shots/` ved siden af designbeskrivelsen (`/home/ulrich/perkins/data/notes-wiki-layout/shots/`).

Tegn-til-tegn-tallene er læst fra skærmbilleder: første og sidste pixelrække med blæk. Er det en versalhøjde, står det som "versal"; en grundlinje er rækken lige under de flade bogstaver. Afrunding til hele pixels giver ±1px på alt, hvad der er målt fra tegn. Kolonnerne "Guide" er tallene i `design-guide.md`.

## Gitter og kolonner (målt i DOM)

| Mål | Guide | Målt | |
|---|---|---|---|
| Ramme | 1128 | 1128 (x 354–1482) | ✓ |
| Tekst (kolonne 1–8) | 744 | 744 (x 354–1098) | ✓ |
| Sidespalte (kolonne 10–12) | 264, fra x=1218 | 264, x 1218–1482 | ✓ |
| Indholdsfortegnelse | 168, 24 til kolonne 1 | 168, x 162–330 (24 til 354) | ✓ |
| `{{< wide >}}` | 1128 | 1128, x 354–1482 | ✓ |
| Om noten, etiketter (kolonne 10) | x=1218 | 1218 | ✓ |
| Om noten, værdier | 72 fra kolonne 10's venstrekant | x=1290 (72) | ✓ |
| Emne-knap, højde / afstand | 16 / 8 | 16 / 8 (pitch 24) | ✓ |
| Bundens grupper | kolonne 1, 5, 9 | x 354, 738, 1122 | ✓ |
| Bundens polstring over / under | 64 / 48 | 64 / 48 | ✓ |
| Bundens linkrække | 32 | 32 (blæk 2798, 2830, 2862) | ✓ |

## Hovedet

| Mål | Guide | Målt | |
|---|---|---|---|
| Højde, til streg | 88 | stregen i række 88 | ✓ |
| Logoets bogstavgrundlinje ("ulrich", uden j) | 48 | 48 | ✓ |
| Menuens grundlinje | 48 | 48 (NOTER, ARKIV, PROFIL) | ✓ |
| Menuens versaler | 40 over / 40 under | versal 39–48: 39 over / 40 under (9px versalhøjde ved 13,5px skrift) | ±1 |
| RSS-ikonets underkant | 48 | 48 | ✓ |
| LinkedIn-ikonets underkant | 48 | 48 | ✓ |
| Undertitel | versalen 64 fra toppen | blæk 62–77 (62 er ascenderen, versalen ca. 63) | ±1 |

## Lodret rytme, øverst i noten

| Mål | Guide | Målt (blæk til blæk) | |
|---|---|---|---|
| Streg → rubrikkens versal | 48 | INDHOLD og OM NOTEN: versal i række 136 (48). Rubrikken selv: flade versaler i række 135 (47) | ±1 |
| INDHOLD / OM NOTEN mod rubrikken | samme linje | 136 / 136 mod 135 | ±1 |
| Rubrik → manchet | 24 | 24 (rubrikkens grundlinje 227, manchettens top 251) | ✓ |
| Manchet → første afsnit | 24 | 24 (manchettens bund 317, afsnittets top 341) | ✓ |
| Linjehøjde, brødtekst / manchet / rubrik | 32 / 40 / 56 | 32 / 40 / 56 (DOM) | ✓ |

## Sektionsoverskrifter og sidespalte

| Mål | Guide | Målt | |
|---|---|---|---|
| Overskrift, versalhøjde | 18px skrift | 12 høj (136–148) | ✓ |
| Grundlinje → første linjes grundlinje, INDHOLD → Forløbet | 24 | 24 (148 → 172) | ✓ |
| OM NOTEN → Udgivet | 24 | 23–24 (148 → ca. 171,5) | ±1 |
| HENVISER TIL → første link | 24 | 23 (350 → 373) | ±1 |
| RELATERET → første link | 24 | 23–24 | ±1 |
| DOWNLOADS → første link | 24 | 23–24 | ±1 |
| Linjeafstand i et link / inde i en ombrudt titel | 24 | 24 (versaltop 363 → 387) | ✓ |
| Mellem to punkter | 32 | 32 (387 → 419) | ✓ |
| Sidste linjes grundlinje → skillestreg (3 streger) | 40 | 40 / 41 / 40 (streg i række 309, 470, 775) | ±1 |
| Skillestreg → næste overskrifts grundlinje | 40 | 41 / 41 / 41 | ±1 |
| Om noten, rækker | 24 | 24 (versaltop 162, 186, 210; Emner 235) | ±1 |
| Skillestregens bredde | 50 % af spalten | 132 af 264 | ✓ |

## Indholdsfortegnelsen (forslag)

| Mål | Forslag | Målt | |
|---|---|---|---|
| Overskriftens versal | samme linje som rubrikken | 136 | ✓ |
| Grundlinje → første punkt | 24 | 24 (148 → 172) | ✓ |
| Punkt til punkt | 24 | 24 (versaltop 161, 185, 209, 233, 257) | ✓ |

## Brødtekst (målt i selve noten)

| Mål | Guide | Målt | |
|---|---|---|---|
| Linjeafstand i et afsnit | 32 | 32, 32, 31 (versaltop 1533, 1565, 1597, 1628) | ✓ |
| Mellem afsnit | 32 | 32 (kasse 912 → 944) | ✓ |
| h2 → første linje | 16 kasse | 24 blæk (grundlinje 1509 → top 1533) | ✓ |
| h3 → første linje | 16 kasse | 23 blæk (1715 → 1738) | ✓ |
| Afsnit → h3 | 48 kasse | 53 blæk (1647 → 1700) | ✓ |
| Afsnit → h2 | 64 kasse | 73 blæk, afsnit uden nedløbere (998 → 1071) | ✓ |

(Blæk-tallene er større end kassetallene, fordi sidste linje har nedløbere og første linje opløbere.)

## Enhederne

Én skærm er taget med browserens grundskrift sat til 20px: `final-note-1900-font20.png`. Roden er 20px, rammen er 1410px (70,5rem × 20px), og layoutet er "mellem": 97em er 1940px, så indholdsfortegnelsen venter, til vinduet er større. Alt skalerer med: skrift, afstande, kolonner og brudpunkter.

## Skærmbilleder

| Hvad | Fil |
|---|---|
| Note, 1900, øverst | `final-note-1900-top.png` |
| Note, 1900, hele siden (1851 × 2977) | `final-note-1900-full.png` |
| Note, mellem (indre bredde 1200) | `final-note-1200-top.png` |
| Note, lille (indre bredde 341), hele siden | `final-note-390-full.png` |
| Note med bredt element lige under første afsnit, 1900, hele siden | `final-wide-top-1900-full.png` |
| Blogindlæg, 1900 | `final-blog-1900-top.png` |
| Forside, 1900 | `final-front-1900-top.png` |
| Note, 1900 med browserens grundskrift 20px | `final-note-1900-font20.png` |
