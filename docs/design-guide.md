# Designguide

Alle mål i temaet, samlet ét sted. Hvert mål står i px (tegnet ved en rod på 16px) og i det, der skrives i CSS'en: rem eller em. Koden følger dette dokument; er de uenige, er det koden, der er forkert.

Noterne er tegnet først og tættest. Blog, forside og arkiv beholder deres egen brødtekst og deler kun rammen, hovedet og bunden med noterne.

## 1. Enhederne

| Hvad | Enhed |
|---|---|
| Skriftstørrelser, afstande, linjehøjder, kolonner, ramme | `rem` |
| Brudpunkter (`@media`) | `em` |
| Indeni en komponent: bogstavafstand, knappers polstring, ikoners størrelse | `em` |
| Hårstreger og kanter på 1px | `px` |

- **Linjehøjder står i rem, aldrig uden enhed.** Så holder også små skrifter sig på 8px-nettet, og en linje er altid et helt antal px ved en rod på 16px.
- **Alt skalerer med browserens grundskrift.** Står den på 20px, er hele siden 25 % større, kolonner og brudpunkter med.
- Tabellerne herunder skriver rem med tre decimaler, hvor det er nødvendigt (13,5px = 0,84375rem).

## 2. Gitteret

12 kolonner á 72px, 24px mellem dem, i en ramme på 1128px. Rammen står midt på siden og afløser den gamle på 1120px.

| Mål | px | rem |
|---|---|---|
| Kolonne | 72 | 4,5 |
| Mellemrum (gutter) | 24 | 1,5 |
| Ramme (12 kolonner + 11 mellemrum) | 1128 | 70,5 |
| 8 kolonner (teksten) | 744 | 46,5 |
| 3 kolonner (sidespalten) | 264 | 16,5 |
| 2 kolonner + 1 mellemrum (indholdsfortegnelsen) | 168 | 10,5 |
| Luft mellem tekst og sidespalte (kolonne 9 + to mellemrum) | 120 | 7,5 |

Hovedet, noterne og bunden står på samme ramme. Logoet begynder i kolonne 1; menuen og ikonerne slutter i kolonne 12.

## 3. Afstandsskalaen

Kun multipla af 8px. Tokenerne hedder efter deres værdi og er skrevet i rem.

| Token | px | rem |
|---|---|---|
| `--s-8` | 8 | 0,5 |
| `--s-16` | 16 | 1 |
| `--s-24` | 24 | 1,5 |
| `--s-32` | 32 | 2 |
| `--s-40` | 40 | 2,5 |
| `--s-48` | 48 | 3 |
| `--s-64` | 64 | 4 |
| `--s-96` | 96 | 6 |

Skalaen gælder alt det nye: hovedet, bunden og noterne. Blog, forside og arkiv beholder deres nuværende værdier; de skiftes først, når Ulrich har godkendt `spacing-map.md` for dem.

## 4. Skrift og linjehøjde

| Hvad | Størrelse px / rem | Linjehøjde px / rem |
|---|---|---|
| Brødtekst i en note | 18 / 1,125 | 32 / 2 |
| Brødtekst, blog og andre sider | 18 / 1,125 | 30 / 1,875 |
| Manchet (beskrivelse) under rubrikken | 28 / 1,75 | 40 / 2,5 |
| Rubrik i en note | 52 / 3,25 (følger skærmen op til det) | 56 / 3,5 |
| Underrubrik h2 i brødteksten | 27 / 1,6875 | som brødteksten |
| Underrubrik h3 | 21 / 1,3125 | som brødteksten |
| Sektionsoverskrift (INDHOLD, OM NOTEN …) | 18 / 1,125, versaler, bogstavafstand 0,08em | 24 / 1,5 |
| Link i sidespalten | 15 / 0,9375 | 24 / 1,5 |
| Om noten: etiketter og værdier | 13,5 / 0,84375 | 24 / 1,5 |
| Emne-knap i Om noten | 12 / 0,75 | 16 / 1 |
| Menuens versaler | 13,5 / 0,84375 | |
| Logoet | 42 / 2,625 | |
| Link i bunden | 15 / 0,9375 | 32 / 2 |

Skriftfamilierne er uændrede: Merriweather til brødtekst, Source Sans 3 til alt det korte og til rubrikker, Comfortaa til logoet.

## 5. Hovedet (hele sitet)

| Mål | px | rem |
|---|---|---|
| Højde, til streg under hovedet | 88 | 5,5 |
| Fælles grundlinje, målt fra toppen | 48 | 3 |
| Menuens versaler: luft over og under | 40 / 40 | 2,5 / 2,5 |
| Undertitlens versalhøjde, fra toppen | 64 | 4 |

**Én fælles grundlinje på 48px.** Logoets bogstavgrundlinje (j'ets hale hænger under den med vilje), menuens grundlinje (NOTER, ARKIV, PROFIL) og underkanten af RSS- og LinkedIn-ikonerne står alle på den. Ikonerne er bundjusteret, ikke centreret. Det betyder, at ikonknapperne står 5px højere end før, og at LinkedIn-tegnet er tegnet 2px lavere i sin æske, så begge ikoner ender på samme linje.

Undertitlen står 16px under logoets grundlinje.

Hovedet på smalle skærme (op til 35em / 560px) er uændret: logo og ikoner i første række, menuen i anden. Sidemargenen er `--rand`: 0 på bred og mellem, 24px (1,5rem) under 73,5em, 16px (1rem) under 35em.

## 6. En note, bred skærm

Fra 97em (1552px) står alt tre steder (de to mindre layouts står i afsnit 13):

| Hvad | Kolonner | px | rem |
|---|---|---|---|
| Indholdsfortegnelsen | to kolonner uden for rammen, et mellemrum til venstre for kolonne 1 | 168 | 10,5 |
| Teksten (rubrik, manchet, brødtekst, figurer, tabeller) | 1–8 | 744 | 46,5 |
| Tom luft | 9 | | |
| Sidespalten | 10–12 | 264 | 16,5 |
| `{{< wide >}}` | 1–12 | 1128 | 70,5 |

Indholdsfortegnelsen står 24px (1,5rem) fra kolonne 1. Dens punkter er venstrestillede, og underoverskrifter er rykket ind.

Tabeller, billeder og diagrammer har som standard tekstens bredde. Kun `{{< wide >}}` (og det gamle `{{< bred >}}`) går ud over den, og aldrig over sidespalten: står det, før sidespalten er slut, begynder det under den.

## 7. Lodret rytme øverst i en note

Alle tal måles fra tegn til tegn (blæk til blæk), ikke fra tekstkasserne. Den nederste kant af manchetten er derfor bunden af dens `g`, `y` og `p`, og første afsnits øverste kant er dets øverste ascender; versalhøjden og grundlinjen er det, CSS'en regner med, og de måles på samme skærmbilleder.

| Mål | px | rem |
|---|---|---|
| Streg under hovedet til rubrikkens versalhøjde | 48 | 3 |
| Rubrik til manchet | 24 | 1,5 |
| Manchet til første afsnit | 24 | 1,5 |

INDHOLD og OM NOTEN begynder på samme linje som rubrikkens versalhøjde.

I brødteksten er afsnitsafstanden 32px (2rem): linjehøjden er 32px og mellemrummet mellem afsnit ét linjeskift. Over en h2 er der to (64px), over en h3 halvanden (48px), og under begge en halv (16px).

## 8. Sektionsoverskrifter

INDHOLD, OM NOTEN, HENVISER TIL, RELATERET og DOWNLOADS: 18px (1,125rem), versaler, bogstavafstand 0,08em som før. Fra overskriftens grundlinje til første linjes grundlinje er der 24px (1,5rem).

## 9. Sidespalten

Rækkefølge: Om noten, Henviser til, Relateret (noter og blogindlæg, højst fem), Downloads. Et "Henvist fra" kommer efter Henviser til, hvis noten har backlinks.

| Mål | px | rem |
|---|---|---|
| Link | 15, understreget | 0,9375 |
| Linjehøjde, også inde i en ombrudt titel | 24 | 1,5 |
| Mellem to punkter (grundlinje til grundlinje) | 32 | 2 |
| Fra sidste linjes grundlinje til skillestregen | 40 | 2,5 |
| Fra skillestregen til næste overskrifts grundlinje | 40 | 2,5 |

Skillestregen er forsidens `.skille` (linje med prik og ring i papirets farve) på halv spaltebredde, centreret. Der er ingen streg før den første eller efter den sidste sektion; en sektion, der mangler, lukker op.

## 10. Om noten

| Mål | px | rem |
|---|---|---|
| Etiket (med kolon), venstrekant | kolonne 10 | |
| Værdi, venstrekant | kolonne 10's højre kant (72 fra spaltens venstre kant), uden mellemrum | 4,5 |
| Skrift, etiketter og værdier | 13,5 | 0,84375 |
| Række | 24 | 1,5 |
| Emne-knap, højde | 16 | 1 |
| Mellem emne-knapper | 8 | 0,5 |

Emnerne er små, diskrete knapper i bloggens mærkestil, én pr. linje, og linker til emnesiden. Etiketter og værdier står på samme grundlinje.

## 11. Slutningen af en note og bunden

**Slutningen** står i kolonne 1–8: skillestreg, derefter DEL med LinkedIn og E-mail (som på et blogindlæg), derefter linket tilbage til alle noter. Der er ingen Relaterede eller Tags dér; sidespalten har dem.

**Bunden** står i kolonne 1–12: skillestreg over hele rammen med prikken midt i; grupperne FØLG MIG, DEM JEG LÆSER og POLITIK begynder i kolonne 1, 5 og 9; copyright-linjen i kolonne 1.

| Mål | px | rem |
|---|---|---|
| Bundens polstring over / under | 64 / 48 | 4 / 3 |
| Streg til grupper | 48 | 3 |
| Linkrække | 32 | 2 |
| Mellem grupper (lodret) | 32 | 2 |

## 12. Tegnebredder (regler for diagrammer)

Tegn, så tegningen vises i den bredde, den er tegnet i. Så er tekstens størrelse den, der står i tegningen.

| | Almindelig | `{{< wide >}}` |
|---|---|---|
| Tegnebredde (`viewBox`) | 744px (46,5rem) | 1128px (70,5rem) |
| Mindste tekst, som den vises | 14px | 14px |

- **`viewBox` og `width`/`height` skal passe sammen**, fx `viewBox="0 0 744 330"` med `width="744" height="330"`. Temaet læser `viewBox` og skriver målene på `<img>`, så siden ikke hopper, når tegningen hentes.
- **Tekst på 14px eller større**, målt i tegningens egne enheder. 14px i en tegning på 744 er 14px på skærmen.
- **Skrift: `font-family="system-ui, sans-serif"`.** En SVG, der vises som billede, kan ikke bruge sidens skrifter.
- **Billeder (png, jpeg, webp)** skaleres ned til 744px (1128px i `{{< wide >}}`) og leveres i flere størrelser.
- **På smalle skærme** skalerer tegningen med spalten ned til 90 % af tegnebredden (670px for 744, 1015px for 1128). Er spalten smallere, bliver tegningen i de 90 % og kan rulles sidelæns i sit eget afsnit, ligesom en tabel. Teksten i den er derfor aldrig under 12,6px.

## 13. Brudpunkter

Tre layouts. Brudpunkterne står i em, så de følger browserens grundskrift.

| Layout | Fra | Hvad |
|---|---|---|
| **Bred** | 97em (1552px) | Alt som i afsnit 6, med indholdsfortegnelsen i margenen. 97em er rammen (1128px) plus indholdsfortegnelsen og mellemrummet (168 + 24px) i hver side og 16px til skærmkanten. |
| **Mellem** | 73,5em (1176px) | Rammen på 12 kolonner passer, men ikke de to kolonner til indholdsfortegnelsen. Indholdsfortegnelsen er **helt skjult**. Alt andet som bred. 73,5em er rammen plus 24px margen i hver side. |
| **Lille** | under 73,5em | Gitteret er **8 kolonner**. Teksten bruger alle 8; sidespalten (10–12 på bred) står under teksten og bruger de samme 8. |

Mellem og lille er besluttet af Ulrich. Det, der står herunder, er **forslag**: de er lavet efter forslaget og skal vurderes på skærmbillederne.

| Hvad | Forslag |
|---|---|
| Det lille gitters kolonner | Flydende: 8 kolonner, hver `(bredden − 2 × margen − 7 × mellemrum) / 8`. |
| Mellemrum mellem kolonner | 16px (1rem). |
| Sidemargener (hoved, tekst, bund) | 24px (1,5rem) fra 35em til 73,5em; 16px (1rem) under 35em. Ved 390px er en kolonne ca. 31px. |
| Hovedet under 35em | Uændret: logo og ikoner i første række, menuen i anden. |
| Sidespalten på lille skærm | 64px (4rem) under teksten og slutningen; samme rækkefølge, skillestreger (40px) og overskrifter som på bred. Etiketkolonnen i Om noten er mindst 72px (4,5rem), men bredere, hvis etiketten er det. |
| Indholdsfortegnelsens punkter | 15px (0,9375rem), som links i sidespalten; linjehøjde 24px (1,5rem), 24px mellem punkterne uden ekstra luft; underoverskrifter rykket 16px (1rem) ind. Punkternes størrelse er ikke tegnet; de står som forslag. |

## 14. Det, der ikke ændrer sig

Blogindlæg, forsiden, arkivet, emnesiderne og profilen beholder deres brødtekst og deres spalte (680px, 880px for profilen). De får det nye hoved, den nye bund og rammen på 1128px, og deres `{{< wide >}}` brydes ud til den. Det eneste, der ellers følger med, er enhederne: også her står skrift, afstande og linjehøjder i rem, og brudpunkterne i em.

## 15. Måling

Alle lodrette tal i dette dokument måles på skærmbilleder fra tegn til tegn, som beskrevet i afsnit 7. Tabellen med målingerne ved 1900px står i `docs/maalinger.md`.
