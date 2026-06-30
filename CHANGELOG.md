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

### Logo & PWA-iconen — 30 juni 2026
- Tool `maak-iconen.html` gebouwd: genereert app-icoon (192px en 512px) via Canvas, in stijl van het Lago di Como-landschap met besneeuwde bergen, cipres-bomen en Italiaanse vlagstreep
- Letters ("IL") uit het logo verwijderd op verzoek — puur landschap-icoon
- Iconen geüpload naar GitHub-repository (hoofdmap, bestandsnamen `icon-192 (1).png` / `icon-512 (1).png`)
- `manifest.json` bijgewerkt met juiste icoonpaden en `start_url` aangepast naar `/imparo-litaliano/index.html` (nodig voor GitHub Pages subpad)

### Git-koppeling lokaal project ↔ GitHub — 30 juni 2026
- Lokale map gekoppeld aan GitHub-repository via Personal Access Token, zodat wijzigingen direct gepusht kunnen worden zonder handmatige upload
- Token wordt opgeslagen buiten de chat (in `token.txt` in de zandbak) om herhaaldelijk delen in gesprekken te vermijden
- Eerste push uitgevoerd, samenvoegingsconflict in `manifest.json` opgelost (lokale en GitHub-versie liepen uiteen)

### Bugfix — flashcard toonde antwoord van volgende kaart — 30 juni 2026
- Probleem: bij het omdraaien van een kaart was het antwoord van de **volgende** kaart al zichtbaar
- Oplossing: `renderFlashcard()` verbergt de kaart kort (fade-out) voordat de nieuwe inhoud geladen wordt, zodat er nooit doorheen geschemerd kan worden
- Vervolgbug: de fix gebruikte een inline `transform: scale(1)` die de flip-animatie blokkeerde (inline stijl overschreef de CSS-klasse `.flipped`) — woord bleef altijd Nederlands tonen
- Definitieve fix: alleen `opacity` gebruikt voor de overgang, inline stijlen na afloop weer verwijderd zodat de CSS-flip-klasse weer de controle heeft

### Afsluitscherm na volledige set — 30 juni 2026
- Probleem: flashcards bleven oneindig doorlopen (`fcIndex % fcDeck.length`) zonder enige aanduiding dat alle woorden al gehad waren
- `fcSessionSeen` teller toegevoegd die bijhoudt hoeveel kaarten in de huidige sessie beoordeeld zijn
- Nieuw scherm `#fc-deck-complete` toegevoegd: toont 🏆 "[Categorie] voltooid!" met aantal geleerde woorden en een knop "Opnieuw oefenen"
- Scherm verschijnt zodra alle kaarten in de gekozen categorie één keer beoordeeld zijn

### Groeiende woordenschat — dagelijkse woorden + geleidelijke categorieën — 30 juni 2026
- Woordenbank flink uitgebreid: de 5 bestaande categorieën (`eten`, `reizen`, `natuur`, `basis`, `getallen`) gaan van ~12 naar **30 woorden** elk
- 5 nieuwe categorieën toegevoegd, elk met **25 woorden**: 🎨 Kleuren, 👨‍👩‍👧 Familie, 🧍 Lichaam, 👕 Kleding, ☁️ Weer
- Nieuw bestand `js/unlocks.js` (`Unlocks`-module) bijgehouden, vergelijkbaar opgezet als `Gamification`:
  - Startdatum wordt bij eerste gebruik opgeslagen in `localStorage` (`imparo_start_date`)
  - Per categorie zijn dag 0 standaard 10 woorden zichtbaar, +2 per dag erbij, tot het maximum van de pool (dag 10 = alle 30/25 woorden)
  - De 5 bestaande categorieën zijn direct beschikbaar; de 5 nieuwe categorieën ontgrendelen één voor één, elke 6 dagen
- `loadDeck()` en `renderCategoryChips()` in `js/app.js` gebruiken nu `Unlocks.getUnlockedWords()` en `Unlocks.getUnlockedCategories()` in plaats van de volledige woordenbank
- Vergrendelde categorie-chip toegevoegd (grijs, niet-klikbaar) die toont welke categorie als volgende ontgrendelt en over hoeveel dagen — nieuwe CSS-klasse `.cat-chip.locked` in `css/style.css`
- Toast-melding bij het openen van de app als er sinds het laatste bezoek nieuwe woorden of een nieuwe categorie zijn vrijgekomen (bv. "🎉 Nieuwe categorie: Kleuren!")
- `sw.js` cache-versie opgehoogd naar `imparo-v2` en bestandenlijst opgeschoond (verwijzingen naar niet-bestaande `flashcards.js`/`verbs.js` verwijderd, `unlocks.js` toegevoegd)
- Getest door `imparo_start_date` te manipuleren via `localStorage` (dag 0, 10, 35) — woordaantallen en categorie-ontgrendeling kloppen op elk getest moment

---

*Volgende stappen (gepland):*
- Meer werkwoorden toevoegen
- Uitspraaknotities toevoegen per woord
