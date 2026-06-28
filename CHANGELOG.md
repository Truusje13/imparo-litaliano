# Imparo l'Italiano — Projectlog

## Versie 1.0 — 28 juni 2026

### Projectopzet
- Projectmap aangemaakt: `imparo-litaliano/`
- Submappen aangemaakt: `css/`, `js/`, `icons/`, `.claude/`
- PWA-manifest aangemaakt (`manifest.json`) met app-naam, themakleur en icoonconfiguratie
- Service worker aangemaakt (`sw.js`) voor offline gebruik en caching van alle app-bestanden

### Design & stijl (`css/style.css`)
- Kleurenpalet gebaseerd op de **Italiaanse meren en bergen** (Lago di Como, Lago di Garda, Dolomieten):
  - `--lago-deep` (#1A3A5C) — diep meerwater donkerblauw
  - `--lago-mid` (#1E6FA6) — meerwater middenblauw
  - `--lago-light` (#5BACCF) — oeverschimmer lichtblauw
  - `--terra-olive` (#5C7A3E) — olijfbomen aan de oever
- **Italiaanse vlagkleuren** verwerkt als accenten:
  - `--flag-green` (#009246), `--flag-white` (#FFFFFF), `--flag-red` (#CE2B37)
- Typografie: **Playfair Display** (serif, titels) + **Inter** (sans-serif, lopende tekst)
- Volledig responsief mobiel-eerst ontwerp met `safe-area-inset` voor notch-telefoons
- Animaties: kaart-flip (3D), fadeInUp per scherm, XP-balk transitie
- Componenten: flashcard (3D flip), bottom-navigatie, modal sheet, toast-notificaties, categorie-chips, XP-balk, achievement-grid

### SVG-landschapsheader (`index.html`)
Handgetekend SVG-landschap als paginaheader (400×220px), bestaande uit:
- **Luchtgradiënt** van lichtblauw naar azuur
- **Besneeuwde bergtoppen** (Dolomieten-stijl) met sneeuwkappen op meerdere pieken
- **Middelplan bergen** in groenig-grijs, dichter bij de kijker
- **Groene heuvels** links met olijfbomen-silhouetten
- **Cipres-bomen** rechts (typisch Italiaans)
- **Lago di Como** — breed spiegelend meer met lichtreflecties
- **Twee bootjes** op het meer (één met groene vlag, één met rode vlag)
- **Italiaans dorpje** aan de oever met terracotta daken en een klokketoren (Varenna/Bellagio-stijl)
- **Kade** langs het water
- Onderschrift: *"LAGO DI COMO · DOLOMITI · ITALIA"*

### Inhoud & data (`js/data.js`)
- **60 woorden** verdeeld over 5 thematische categorieën:
  - 👋 Basis (begroetingen, veelgebruikte woorden)
  - 🍕 Eten (typisch Italiaans eten en drinken)
  - ✈️ Reizen (meer, berg, vervoer, bezienswaardigheden)
  - 🏔️ Natuur (water, lucht, bomen, bergen)
  - 🔢 Getallen (1–100)
- **8 werkwoorden** met vervoegingen in 3 tijden (heden, verleden, toekomst):
  - Onregelmatig: *essere, avere, andare, volere, potere, venire*
  - Regelmatig (-are): *parlare, mangiare*
- **SM-2 spaced repetition algoritme** ingebouwd voor intelligente herhaling van flashcards

### Gamification (`js/gamification.js`)
- **7 niveaus**: Principiante → Studente → Viaggiatore → Esploratore → Parlante → Esperto → Maestro
- **8 prestaties** (achievements) met automatische ontgrendeling:
  - 🃏 Primo Passo (1e flashcard), 🎯 Dieci Carte (10 kaarten), 📝 Primo Verbo, 🔥 Tre Giorni streak, ⭐ Una Settimana streak, 💯 Cento Punti, 🏅 Perfezionista (10x goed op rij), 🏞️ Il Lago (natuur-pakket voltooid)
- **Dagelijkse streak** tracking met localStorage
- **XP-systeem**: fout = 2 XP, twijfel = 4 XP, goed = 8 XP, invuloefening correct = 10 XP
- XP-voortgangsbalk met level-badge op het startscherm

### App-logica (`js/app.js`)
- Schermnavigatie met animaties (5 schermen: Home, Flashcards, Werkwoorden, Invullen, Profiel)
- **Flashcard-module**: omdraaien, SM-2 beoordeling (fout/twijfel/goed), richting NL→IT of IT→NL wisselbaar
- **Werkwoordenmodule**: zoekfunctie, vervoegingstabel per werkwoord en tijd in een slide-up modal
- **Invuloefening**: willekeurige volgorde per werkwoord/tijd, directe feedback (groen/rood), Enter-toets ondersteuning
- **Profielscherm**: level, totale XP, alle achievements met vergrendeld/ontgrendeld status, statistieken
- **Woord van de dag**: wisselt automatisch op basis van weekdag

### Technische infrastructuur
- Perl HTTP-server aangemaakt (`serve.pl`, poort 3464) conform het projectpatroon
- Server geconfigureerd in `.claude/launch.json` als entry `"imparo"`
- App bereikbaar via `http://localhost:3464`
- Installeerbaar als PWA via Chrome op telefoon (menu → "Toevoegen aan startscherm")

### Publicatie — 28 juni 2026
- Geprobeerd via **Codeberg Pages** (repository `pages` + `pages` branch) — mislukt: nieuwe Codeberg-accounts worden niet meer ondersteund op de oude Pages-server
- Gepubliceerd via **GitHub Pages** op account `Truusje13`
- Repository aangemaakt: `https://github.com/Truusje13/imparo-litaliano`
- Bestanden geüpload in twee rondes (basisbestanden + css/js mappen)
- GitHub Pages ingeschakeld via Settings → Pages → branch: main
- App live op: **`https://truusje13.github.io/imparo-litaliano/`**
- Installeerbaar als PWA op telefoon via Chrome → menu → "Toevoegen aan startscherm"

---

*Volgende stappen (gepland):*
- Icoontjes aanmaken voor PWA (`icons/icon-192.png`, `icons/icon-512.png`)
- Meer werkwoorden toevoegen
- Meer woordcategorieën (kleuren, familie, lichaamsdelen)
- Uitspraaknotities toevoegen per woord
