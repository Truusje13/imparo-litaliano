// ── Ontgrendeling van woorden en categorieën op basis van datum ──

const Unlocks = {
  CORE_CATEGORIES: ['basis', 'eten', 'reizen', 'natuur', 'getallen'],
  LOCKED_CATEGORIES: ['kleuren', 'familie', 'lichaamsdelen', 'kleding', 'weer'],

  DAYS_BETWEEN_CATEGORIES: 6,
  START_WORDS: 10,
  WORDS_PER_DAY: 2,

  CATEGORY_LABELS: {
    eten: '🍕 Eten', reizen: '✈️ Reizen', natuur: '🏔️ Natuur', basis: '👋 Basis', getallen: '🔢 Getallen',
    kleuren: '🎨 Kleuren', familie: '👨‍👩‍👧 Familie', lichaamsdelen: '🧍 Lichaam',
    kleding: '👕 Kleding', weer: '☁️ Weer',
  },

  getStartDate() {
    let raw = AppStorage.safeGetString(AppStorage.KEYS.startDate, null);
    if (!raw) {
      raw = new Date().toISOString().slice(0, 10);
      AppStorage.safeSetString(AppStorage.KEYS.startDate, raw);
    }
    return new Date(raw + 'T00:00:00');
  },

  getDaysSinceStart() {
    const start = this.getStartDate();
    const today = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00');
    return Math.max(0, Math.round((today - start) / 86400000));
  },

  getUnlockedWordCount(poolSize) {
    const days = this.getDaysSinceStart();
    return Math.min(poolSize, this.START_WORDS + days * this.WORDS_PER_DAY);
  },

  getUnlockedWords(categoryKey, fullPool) {
    const count = this.getUnlockedWordCount(fullPool.length);
    return fullPool.slice(0, count);
  },

  getUnlockedCategories() {
    const days = this.getDaysSinceStart();
    const unlockedExtra = this.LOCKED_CATEGORIES.filter(
      (_, i) => days >= (i + 1) * this.DAYS_BETWEEN_CATEGORIES
    );
    return [...this.CORE_CATEGORIES, ...unlockedExtra];
  },

  getNextLockedCategory() {
    const days = this.getDaysSinceStart();
    for (let i = 0; i < this.LOCKED_CATEGORIES.length; i++) {
      const unlockDay = (i + 1) * this.DAYS_BETWEEN_CATEGORIES;
      if (days < unlockDay) {
        return { key: this.LOCKED_CATEGORIES[i], daysLeft: unlockDay - days };
      }
    }
    return null;
  },

  // Geeft true terug als er sinds het laatste bezoek nieuwe content is vrijgekomen
  checkForNewUnlocks() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const lastSeen = AppStorage.safeGetString(AppStorage.KEYS.lastSeen, null);

    if (lastSeen === todayStr) return null;

    const wasFirstVisit = !lastSeen;
    AppStorage.safeSetString(AppStorage.KEYS.lastSeen, todayStr);
    if (wasFirstVisit) return null;

    const days = this.getDaysSinceStart();
    const newCategory = this.LOCKED_CATEGORIES.find(
      (cat, i) => days === (i + 1) * this.DAYS_BETWEEN_CATEGORIES
    );

    if (newCategory) {
      return { type: 'category', label: this.CATEGORY_LABELS[newCategory] };
    }
    if (days > 0 && this.START_WORDS + days * this.WORDS_PER_DAY <= 50) {
      return { type: 'words', amount: this.WORDS_PER_DAY };
    }
    return null;
  },
};
