// ── Imparo l'Italiano — hoofd-app ──

// PWA registratie
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// ── State ──
let stats = Gamification.load();
let currentScreen = 'home';

// Flashcard state
let fcDeck = [];
let fcIndex = 0;
let fcCategory = 'basis';
let fcFlipped = false;
let fcDirection = 'nl-it'; // 'nl-it' of 'it-nl'

// Werkwoord state
let currentVerb = null;
let currentTense = 'presente';
let fillExercises = [];
let fillIndex = 0;

// ── Navigatie ──
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  document.querySelector(`[data-screen="${name}"]`).classList.add('active');
  currentScreen = name;

  if (name === 'home') renderHome();
  if (name === 'flashcards') initFlashcards();
  if (name === 'verbs') renderVerbList();
  if (name === 'profile') renderProfile();
}

// ── Home ──
function renderHome() {
  const level = Gamification.getLevel(stats.totalXP);
  const { next, current } = Gamification.getNextLevel(stats.totalXP);

  document.getElementById('stat-xp').textContent = stats.totalXP;
  document.getElementById('stat-streak').textContent = stats.streak + '🔥';
  document.getElementById('stat-cards').textContent = stats.cardsStudied;

  document.getElementById('level-badge').textContent = level.icon + ' ' + level.name;

  const xpInLevel = stats.totalXP - current.minXP;
  const xpNeeded = next ? next.minXP - current.minXP : 1;
  const pct = next ? Math.min(100, Math.round((xpInLevel / xpNeeded) * 100)) : 100;
  document.getElementById('xp-fill').style.width = pct + '%';
  document.getElementById('xp-label').textContent =
    next ? `${stats.totalXP} / ${next.minXP} XP → ${next.name}` : 'Maximaal level bereikt! 🏆';
}

// ── Flashcards ──
function initFlashcards() {
  loadDeck(fcCategory);
  renderCategoryChips();
  renderFlashcard();
}

function loadDeck(cat) {
  fcCategory = cat;
  const words = VOCABULARY[cat] || [];
  const saved = loadCardProgress();

  fcDeck = words.map(w => {
    const key = cat + ':' + w.it;
    return saved[key] ? { ...SM2.initialCard(w), ...saved[key] } : SM2.initialCard(w);
  });

  // Sorteer: eerst kaarten die aan de beurt zijn
  fcDeck.sort((a, b) => a.nextReview - b.nextReview);
  fcIndex = 0;
  fcFlipped = false;
}

function loadCardProgress() {
  const raw = localStorage.getItem('imparo_cards');
  return raw ? JSON.parse(raw) : {};
}

function saveCardProgress(card) {
  const all = loadCardProgress();
  all[fcCategory + ':' + card.it] = card;
  localStorage.setItem('imparo_cards', JSON.stringify(all));
}

function renderCategoryChips() {
  const wrap = document.getElementById('cat-chips');
  wrap.innerHTML = '';
  Object.keys(VOCABULARY).forEach(cat => {
    const chip = document.createElement('button');
    chip.className = 'cat-chip' + (cat === fcCategory ? ' active' : '');
    chip.textContent = { eten:'🍕 Eten', reizen:'✈️ Reizen', natuur:'🏔️ Natuur', basis:'👋 Basis', getallen:'🔢 Getallen' }[cat] || cat;
    chip.onclick = () => { loadDeck(cat); renderCategoryChips(); renderFlashcard(); };
    wrap.appendChild(chip);
  });
}

function renderFlashcard(animate = false) {
  const card = fcDeck[fcIndex];
  if (!card) return;

  const el = document.getElementById('flashcard');

  const updateContent = () => {
    const front = document.getElementById('fc-front-word');
    const back  = document.getElementById('fc-back-word');
    const frontLang = document.getElementById('fc-front-lang');
    const backLang  = document.getElementById('fc-back-lang');
    const example   = document.getElementById('fc-example');
    const progress  = document.getElementById('fc-progress');

    if (fcDirection === 'nl-it') {
      frontLang.textContent = '🇳🇱 Nederlands';
      backLang.textContent  = '🇮🇹 Italiano';
      front.textContent = card.nl;
      back.textContent  = card.it;
    } else {
      frontLang.textContent = '🇮🇹 Italiano';
      backLang.textContent  = '🇳🇱 Nederlands';
      front.textContent = card.it;
      back.textContent  = card.nl;
    }

    example.textContent = card.example || '';
    progress.textContent = `${fcIndex + 1} / ${fcDeck.length}`;

    fcFlipped = false;
    el.classList.remove('flipped');
    document.getElementById('judgment-btns').style.display = 'none';
    document.getElementById('tap-hint').style.display = 'block';

    if (animate) {
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    }
  };

  if (animate) {
    el.style.transition = 'opacity 0.18s, transform 0.18s';
    el.style.opacity = '0';
    el.style.transform = 'scale(0.94)';
    setTimeout(() => {
      el.classList.remove('flipped');
      updateContent();
    }, 200);
  } else {
    updateContent();
  }
}

function flipCard() {
  fcFlipped = !fcFlipped;
  document.getElementById('flashcard').classList.toggle('flipped', fcFlipped);
  document.getElementById('judgment-btns').style.display = fcFlipped ? 'grid' : 'none';
  document.getElementById('tap-hint').style.display = fcFlipped ? 'none' : 'block';
}

function judgeCard(quality) {
  const card = fcDeck[fcIndex];
  const updated = SM2.review(card, quality);
  fcDeck[fcIndex] = updated;
  saveCardProgress(updated);

  // XP
  const xp = [2, 4, 8][quality];
  stats = Gamification.addXP(stats, xp);
  stats = Gamification.checkStreak(stats);
  stats.cardsStudied++;
  if (quality === 2) {
    stats.correctStreak = (stats.correctStreak || 0) + 1;
    if (stats.correctStreak > (stats.bestStreak || 0)) stats.bestStreak = stats.correctStreak;
  } else {
    stats.correctStreak = 0;
  }

  const { stats: newStats, newOnes } = Gamification.checkAchievements(stats);
  stats = newStats;
  Gamification.save(stats);

  newOnes.forEach(a => showToast(a.icon + ' ' + a.name + ' ontgrendeld!'));
  if (quality === 2) showToast('+' + xp + ' XP ✨', 1200);

  fcIndex = (fcIndex + 1) % fcDeck.length;
  renderFlashcard(true);
}

// ── Werkwoorden ──
function renderVerbList(filter = '') {
  const list = document.getElementById('verb-list');
  list.innerHTML = '';
  const lower = filter.toLowerCase();
  VERBS.filter(v => !filter || v.infinitivo.includes(lower) || v.nl.includes(lower)).forEach(verb => {
    const item = document.createElement('div');
    item.className = 'verb-item';
    item.innerHTML = `
      <div>
        <div class="verb-it">${verb.infinitivo}</div>
        <div class="verb-nl">${verb.nl} · <em>${verb.type}</em></div>
      </div>
      <span class="verb-arrow">›</span>
    `;
    item.onclick = () => openVerbModal(verb);
    list.appendChild(item);
  });
}

function openVerbModal(verb) {
  currentVerb = verb;
  currentTense = 'presente';

  document.getElementById('modal-verb-title').textContent = verb.infinitivo;
  document.getElementById('modal-verb-nl').textContent = verb.nl;

  renderTenseTabs();
  renderConjTable();

  document.getElementById('conj-modal').classList.add('open');
}

function closeVerbModal() {
  document.getElementById('conj-modal').classList.remove('open');
}

function renderTenseTabs() {
  const wrap = document.getElementById('tense-tabs');
  wrap.innerHTML = '';
  const tenses = { presente: 'Heden', passato: 'Verleden', futuro: 'Toekomst' };
  Object.entries(tenses).forEach(([key, label]) => {
    const tab = document.createElement('button');
    tab.className = 'tense-tab' + (key === currentTense ? ' active' : '');
    tab.textContent = label;
    tab.onclick = () => { currentTense = key; renderTenseTabs(); renderConjTable(); };
    wrap.appendChild(tab);
  });
}

function renderConjTable() {
  const tbody = document.getElementById('conj-tbody');
  tbody.innerHTML = '';
  const rows = currentVerb.tenses[currentTense] || [];
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.soggetto}</td><td>${r.forma}</td><td>${r.nl}</td>`;
    tbody.appendChild(tr);
  });
}

function startFillPractice() {
  closeVerbModal();
  showScreen('fill');
  initFillPractice(currentVerb, currentTense);
}

function initFillPractice(verb, tense) {
  fillExercises = [...(verb.tenses[tense] || [])].sort(() => Math.random() - 0.5);
  fillIndex = 0;
  renderFillExercise();
  document.getElementById('fill-verb-title').textContent = verb.infinitivo + ' — ' + { presente: 'Heden', passato: 'Verleden', futuro: 'Toekomst' }[tense];
}

function renderFillExercise() {
  const ex = fillExercises[fillIndex];
  if (!ex) {
    document.getElementById('fill-prompt').textContent = 'Klaar! Alle vormen geoefend. 🎉';
    document.getElementById('fill-subject').textContent = '';
    document.getElementById('fill-input').value = '';
    document.getElementById('fill-input').disabled = true;
    return;
  }

  document.getElementById('fill-prompt').textContent = currentVerb.nl + ' — hoe zeg je:';
  document.getElementById('fill-subject').textContent = ex.soggetto + ' …  (' + ex.nl + ')';
  document.getElementById('fill-input').value = '';
  document.getElementById('fill-input').className = 'fill-input';
  document.getElementById('fill-input').disabled = false;
  document.getElementById('fill-input').focus();
  document.getElementById('fill-progress').textContent = (fillIndex + 1) + ' / ' + fillExercises.length;
}

function checkFillAnswer() {
  const ex = fillExercises[fillIndex];
  if (!ex) return;
  const input = document.getElementById('fill-input');
  const val = input.value.trim().toLowerCase();
  const correct = ex.forma.toLowerCase();

  if (val === correct) {
    input.className = 'fill-input correct';
    stats = Gamification.addXP(stats, 10);
    stats = Gamification.checkStreak(stats);
    stats.verbsPracticed++;
    const { stats: s2, newOnes } = Gamification.checkAchievements(stats);
    stats = s2;
    Gamification.save(stats);
    newOnes.forEach(a => showToast(a.icon + ' ' + a.name + ' ontgrendeld!'));
    showToast('+10 XP ✨', 1000);
    setTimeout(() => { fillIndex++; renderFillExercise(); }, 800);
  } else {
    input.className = 'fill-input wrong';
    showToast('Het juiste antwoord: ' + ex.forma, 2000);
    setTimeout(() => { fillIndex++; renderFillExercise(); }, 1800);
  }
}

// ── Profiel ──
function renderProfile() {
  const level = Gamification.getLevel(stats.totalXP);
  document.getElementById('profile-level-name').textContent = level.icon + '  ' + level.name;
  document.getElementById('profile-xp-total').textContent = stats.totalXP + ' XP totaal';

  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = '';
  Gamification.ACHIEVEMENTS.forEach(ach => {
    const unlocked = stats.unlockedAchievements.includes(ach.id);
    const div = document.createElement('div');
    div.className = 'achievement' + (unlocked ? '' : ' locked');
    div.innerHTML = `<div class="ach-icon">${ach.icon}</div><div class="ach-name">${ach.name}</div><div class="ach-sub">${ach.sub}</div>`;
    grid.appendChild(div);
  });
}

// ── Toast ──
function showToast(msg, duration = 1800) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  stats = Gamification.checkStreak(stats);
  Gamification.save(stats);
  showScreen('home');
});
