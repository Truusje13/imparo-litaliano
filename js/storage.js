// ── Centrale, veilige opslaglaag ──
// Alle localStorage-toegang loopt via deze module. Nieuwe sleutels alleen
// hier toevoegen aan STORAGE_KEYS — nooit elders een rauwe string verzinnen.

const STORAGE_VERSION = 1;

const STORAGE_KEYS = {
  stats: 'imparo_stats',
  cards: 'imparo_cards',
  startDate: 'imparo_start_date',
  lastSeen: 'imparo_last_seen_date',
};

const AppStorage = {
  KEYS: STORAGE_KEYS,

  safeGet(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) return fallback;
      const parsed = JSON.parse(raw);
      return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (e) {
      return fallback;
    }
  },

  safeGetString(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null || raw === undefined ? fallback : raw;
    } catch (e) {
      return fallback;
    }
  },

  safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },

  safeSetString(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  },

  // Verzamelt alle voortgang als één exporteerbaar object
  exportAll() {
    return {
      _app: 'imparo-litaliano',
      _v: STORAGE_VERSION,
      exportedAt: new Date().toISOString(),
      data: {
        stats: this.safeGet(STORAGE_KEYS.stats, null),
        cards: this.safeGet(STORAGE_KEYS.cards, null),
        startDate: this.safeGetString(STORAGE_KEYS.startDate, null),
        lastSeen: this.safeGetString(STORAGE_KEYS.lastSeen, null),
      },
    };
  },

  // Zet een eerder geëxporteerd object terug in localStorage
  importAll(payload) {
    if (!payload || typeof payload !== 'object' || !payload.data) {
      throw new Error('Ongeldig back-upbestand');
    }
    const { stats, cards, startDate, lastSeen } = payload.data;
    if (stats !== null && stats !== undefined) this.safeSet(STORAGE_KEYS.stats, stats);
    if (cards !== null && cards !== undefined) this.safeSet(STORAGE_KEYS.cards, cards);
    if (startDate) this.safeSetString(STORAGE_KEYS.startDate, startDate);
    if (lastSeen) this.safeSetString(STORAGE_KEYS.lastSeen, lastSeen);
  },
};
