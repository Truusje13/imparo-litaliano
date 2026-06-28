const Gamification = {
  LEVELS: [
    { name: 'Principiante', minXP: 0,    icon: '🌱' },
    { name: 'Studente',     minXP: 50,   icon: '📖' },
    { name: 'Viaggiatore',  minXP: 150,  icon: '⛵' },
    { name: 'Esploratore',  minXP: 350,  icon: '🏔️' },
    { name: 'Parlante',     minXP: 700,  icon: '🗣️' },
    { name: 'Esperto',      minXP: 1200, icon: '🌟' },
    { name: 'Maestro',      minXP: 2000, icon: '🏆' },
  ],

  ACHIEVEMENTS: [
    { id: 'first_card',    icon: '🃏', name: 'Primo Passo',   sub: '1e flashcard',     condition: s => s.cardsStudied >= 1 },
    { id: 'ten_cards',     icon: '🎯', name: 'Dieci Carte',   sub: '10 kaarten',        condition: s => s.cardsStudied >= 10 },
    { id: 'first_verb',    icon: '📝', name: 'Primo Verbo',   sub: '1e werkwoord',      condition: s => s.verbsPracticed >= 1 },
    { id: 'streak_3',      icon: '🔥', name: 'Tre Giorni',    sub: '3 dagen streak',    condition: s => s.streak >= 3 },
    { id: 'streak_7',      icon: '⭐', name: 'Una Settimana', sub: '7 dagen streak',    condition: s => s.streak >= 7 },
    { id: 'xp_100',        icon: '💯', name: 'Cento Punti',   sub: '100 XP verdiend',  condition: s => s.totalXP >= 100 },
    { id: 'perfectionist', icon: '🏅', name: 'Perfezionista', sub: '10x goed op rij',  condition: s => s.bestStreak >= 10 },
    { id: 'lago',          icon: '🏞️', name: 'Il Lago',       sub: 'Natuur-pakket klaar', condition: s => s.completedCategories.includes('natuur') },
  ],

  load() {
    const raw = localStorage.getItem('imparo_stats');
    return raw ? JSON.parse(raw) : {
      totalXP: 0,
      cardsStudied: 0,
      verbsPracticed: 0,
      streak: 0,
      lastStudyDate: null,
      bestStreak: 0,
      correctStreak: 0,
      unlockedAchievements: [],
      completedCategories: [],
    };
  },

  save(stats) {
    localStorage.setItem('imparo_stats', JSON.stringify(stats));
  },

  addXP(stats, amount) {
    stats.totalXP += amount;
    return stats;
  },

  getLevel(xp) {
    let level = this.LEVELS[0];
    for (const l of this.LEVELS) {
      if (xp >= l.minXP) level = l;
    }
    return level;
  },

  getNextLevel(xp) {
    for (let i = 0; i < this.LEVELS.length - 1; i++) {
      if (xp < this.LEVELS[i + 1].minXP) {
        return { next: this.LEVELS[i + 1], current: this.LEVELS[i] };
      }
    }
    return { next: null, current: this.LEVELS[this.LEVELS.length - 1] };
  },

  checkStreak(stats) {
    const today = new Date().toDateString();
    const last = stats.lastStudyDate;
    if (last === today) return stats;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (last === yesterday) {
      stats.streak++;
    } else if (last !== today) {
      stats.streak = 1;
    }

    if (stats.streak > stats.bestStreak) stats.bestStreak = stats.streak;
    stats.lastStudyDate = today;
    return stats;
  },

  checkAchievements(stats) {
    const newOnes = [];
    for (const ach of this.ACHIEVEMENTS) {
      if (!stats.unlockedAchievements.includes(ach.id) && ach.condition(stats)) {
        stats.unlockedAchievements.push(ach.id);
        newOnes.push(ach);
      }
    }
    return { stats, newOnes };
  },
};
