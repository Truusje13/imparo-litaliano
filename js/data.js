// Woordenschat per categorie
const VOCABULARY = {
  eten: [
    { nl: 'het brood', it: 'il pane', example: 'Voglio del pane.' },
    { nl: 'de pasta', it: 'la pasta', example: 'La pasta è buona.' },
    { nl: 'de pizza', it: 'la pizza', example: 'Una pizza, per favore.' },
    { nl: 'de wijn', it: 'il vino', example: 'Un bicchiere di vino.' },
    { nl: 'het water', it: 'l\'acqua', example: 'Acqua minerale.' },
    { nl: 'de koffie', it: 'il caffè', example: 'Un caffè, per favore.' },
    { nl: 'het ijs', it: 'il gelato', example: 'Il gelato al cioccolato.' },
    { nl: 'de kaas', it: 'il formaggio', example: 'Formaggio parmigiano.' },
    { nl: 'het vlees', it: 'la carne', example: 'La carne è fresca.' },
    { nl: 'de vis', it: 'il pesce', example: 'Il pesce del lago.' },
    { nl: 'het fruit', it: 'la frutta', example: 'La frutta è dolce.' },
    { nl: 'de tomaat', it: 'il pomodoro', example: 'Pomodori freschi.' },
  ],
  reizen: [
    { nl: 'het meer', it: 'il lago', example: 'Il lago di Como è bellissimo.' },
    { nl: 'de berg', it: 'la montagna', example: 'Le montagne delle Dolomiti.' },
    { nl: 'de stad', it: 'la città', example: 'Una bella città.' },
    { nl: 'het hotel', it: 'l\'albergo', example: 'L\'albergo è vicino al lago.' },
    { nl: 'het station', it: 'la stazione', example: 'La stazione di Milano.' },
    { nl: 'de trein', it: 'il treno', example: 'Il treno parte alle otto.' },
    { nl: 'het strand', it: 'la spiaggia', example: 'La spiaggia del lago.' },
    { nl: 'het dorp', it: 'il paese', example: 'Un piccolo paese.' },
    { nl: 'de kerk', it: 'la chiesa', example: 'Una chiesa antica.' },
    { nl: 'het kasteel', it: 'il castello', example: 'Il castello sul lago.' },
    { nl: 'de ferry', it: 'il traghetto', example: 'Il traghetto per Bellagio.' },
    { nl: 'de haven', it: 'il porto', example: 'Il porto di Varenna.' },
  ],
  natuur: [
    { nl: 'het water', it: 'l\'acqua', example: 'L\'acqua è cristallina.' },
    { nl: 'de zon', it: 'il sole', example: 'Il sole splende.' },
    { nl: 'de lucht', it: 'il cielo', example: 'Il cielo è azzurro.' },
    { nl: 'de boom', it: 'l\'albero', example: 'Un albero d\'ulivo.' },
    { nl: 'de bloem', it: 'il fiore', example: 'I fiori sul lago.' },
    { nl: 'de rots', it: 'la roccia', example: 'Le rocce delle montagne.' },
    { nl: 'de rivier', it: 'il fiume', example: 'Il fiume scorre veloce.' },
    { nl: 'de wind', it: 'il vento', example: 'Il vento dal nord.' },
    { nl: 'de sneeuw', it: 'la neve', example: 'La neve sulle montagne.' },
    { nl: 'het bos', it: 'il bosco', example: 'Un bosco verde.' },
  ],
  basis: [
    { nl: 'goedemorgen', it: 'buongiorno', example: 'Buongiorno, come stai?' },
    { nl: 'goedenavond', it: 'buonasera', example: 'Buonasera a tutti.' },
    { nl: 'tot ziens', it: 'arrivederci', example: 'Arrivederci, a presto!' },
    { nl: 'alsjeblieft', it: 'per favore', example: 'Un caffè, per favore.' },
    { nl: 'dank je wel', it: 'grazie', example: 'Grazie mille!' },
    { nl: 'ja', it: 'sì', example: 'Sì, certo!' },
    { nl: 'nee', it: 'no', example: 'No, grazie.' },
    { nl: 'mooi', it: 'bello/bella', example: 'Che bella vista!' },
    { nl: 'groot', it: 'grande', example: 'Un grande lago.' },
    { nl: 'klein', it: 'piccolo/a', example: 'Un piccolo paese.' },
    { nl: 'ik heet', it: 'mi chiamo', example: 'Mi chiamo Marco.' },
    { nl: 'hoe gaat het', it: 'come stai', example: 'Come stai oggi?' },
  ],
  getallen: [
    { nl: 'één', it: 'uno', example: 'Uno, due, tre...' },
    { nl: 'twee', it: 'due', example: 'Due caffè, per favore.' },
    { nl: 'drie', it: 'tre', example: 'Tre giorni.' },
    { nl: 'vier', it: 'quattro', example: 'Quattro stagioni.' },
    { nl: 'vijf', it: 'cinque', example: 'Cinque euro.' },
    { nl: 'zes', it: 'sei', example: 'Sei ore.' },
    { nl: 'zeven', it: 'sette', example: 'Sette giorni.' },
    { nl: 'acht', it: 'otto', example: 'Otto persone.' },
    { nl: 'negen', it: 'nove', example: 'Nove mesi.' },
    { nl: 'tien', it: 'dieci', example: 'Dieci euro.' },
    { nl: 'twintig', it: 'venti', example: 'Venti minuti.' },
    { nl: 'honderd', it: 'cento', example: 'Cento chilometri.' },
  ],
};

// Werkwoorden met vervoegingen
const VERBS = [
  {
    infinitivo: 'essere',
    nl: 'zijn',
    type: 'onregelmatig',
    tenses: {
      presente: [
        { soggetto: 'io',    forma: 'sono',   nl: 'ik ben' },
        { soggetto: 'tu',    forma: 'sei',    nl: 'jij bent' },
        { soggetto: 'lui/lei', forma: 'è',    nl: 'hij/zij is' },
        { soggetto: 'noi',   forma: 'siamo',  nl: 'wij zijn' },
        { soggetto: 'voi',   forma: 'siete',  nl: 'jullie zijn' },
        { soggetto: 'loro',  forma: 'sono',   nl: 'zij zijn' },
      ],
      passato: [
        { soggetto: 'io',    forma: 'sono stato/a',   nl: 'ik ben geweest' },
        { soggetto: 'tu',    forma: 'sei stato/a',    nl: 'jij bent geweest' },
        { soggetto: 'lui/lei', forma: 'è stato/a',    nl: 'hij/zij is geweest' },
        { soggetto: 'noi',   forma: 'siamo stati/e',  nl: 'wij zijn geweest' },
        { soggetto: 'voi',   forma: 'siete stati/e',  nl: 'jullie zijn geweest' },
        { soggetto: 'loro',  forma: 'sono stati/e',   nl: 'zij zijn geweest' },
      ],
      futuro: [
        { soggetto: 'io',    forma: 'sarò',    nl: 'ik zal zijn' },
        { soggetto: 'tu',    forma: 'sarai',   nl: 'jij zult zijn' },
        { soggetto: 'lui/lei', forma: 'sarà',  nl: 'hij/zij zal zijn' },
        { soggetto: 'noi',   forma: 'saremo',  nl: 'wij zullen zijn' },
        { soggetto: 'voi',   forma: 'sarete',  nl: 'jullie zullen zijn' },
        { soggetto: 'loro',  forma: 'saranno', nl: 'zij zullen zijn' },
      ],
    },
  },
  {
    infinitivo: 'avere',
    nl: 'hebben',
    type: 'onregelmatig',
    tenses: {
      presente: [
        { soggetto: 'io',    forma: 'ho',      nl: 'ik heb' },
        { soggetto: 'tu',    forma: 'hai',     nl: 'jij hebt' },
        { soggetto: 'lui/lei', forma: 'ha',    nl: 'hij/zij heeft' },
        { soggetto: 'noi',   forma: 'abbiamo', nl: 'wij hebben' },
        { soggetto: 'voi',   forma: 'avete',   nl: 'jullie hebben' },
        { soggetto: 'loro',  forma: 'hanno',   nl: 'zij hebben' },
      ],
      passato: [
        { soggetto: 'io',    forma: 'ho avuto',     nl: 'ik heb gehad' },
        { soggetto: 'tu',    forma: 'hai avuto',    nl: 'jij hebt gehad' },
        { soggetto: 'lui/lei', forma: 'ha avuto',   nl: 'hij/zij heeft gehad' },
        { soggetto: 'noi',   forma: 'abbiamo avuto',nl: 'wij hebben gehad' },
        { soggetto: 'voi',   forma: 'avete avuto',  nl: 'jullie hebben gehad' },
        { soggetto: 'loro',  forma: 'hanno avuto',  nl: 'zij hebben gehad' },
      ],
      futuro: [
        { soggetto: 'io',    forma: 'avrò',    nl: 'ik zal hebben' },
        { soggetto: 'tu',    forma: 'avrai',   nl: 'jij zult hebben' },
        { soggetto: 'lui/lei', forma: 'avrà',  nl: 'hij/zij zal hebben' },
        { soggetto: 'noi',   forma: 'avremo',  nl: 'wij zullen hebben' },
        { soggetto: 'voi',   forma: 'avrete',  nl: 'jullie zullen hebben' },
        { soggetto: 'loro',  forma: 'avranno', nl: 'zij zullen hebben' },
      ],
    },
  },
  {
    infinitivo: 'andare',
    nl: 'gaan',
    type: 'onregelmatig',
    tenses: {
      presente: [
        { soggetto: 'io',    forma: 'vado',   nl: 'ik ga' },
        { soggetto: 'tu',    forma: 'vai',    nl: 'jij gaat' },
        { soggetto: 'lui/lei', forma: 'va',   nl: 'hij/zij gaat' },
        { soggetto: 'noi',   forma: 'andiamo',nl: 'wij gaan' },
        { soggetto: 'voi',   forma: 'andate', nl: 'jullie gaan' },
        { soggetto: 'loro',  forma: 'vanno',  nl: 'zij gaan' },
      ],
      passato: [
        { soggetto: 'io',    forma: 'sono andato/a',   nl: 'ik ben gegaan' },
        { soggetto: 'tu',    forma: 'sei andato/a',    nl: 'jij bent gegaan' },
        { soggetto: 'lui/lei', forma: 'è andato/a',    nl: 'hij/zij is gegaan' },
        { soggetto: 'noi',   forma: 'siamo andati/e',  nl: 'wij zijn gegaan' },
        { soggetto: 'voi',   forma: 'siete andati/e',  nl: 'jullie zijn gegaan' },
        { soggetto: 'loro',  forma: 'sono andati/e',   nl: 'zij zijn gegaan' },
      ],
      futuro: [
        { soggetto: 'io',    forma: 'andrò',   nl: 'ik zal gaan' },
        { soggetto: 'tu',    forma: 'andrai',  nl: 'jij zult gaan' },
        { soggetto: 'lui/lei', forma: 'andrà', nl: 'hij/zij zal gaan' },
        { soggetto: 'noi',   forma: 'andremo', nl: 'wij zullen gaan' },
        { soggetto: 'voi',   forma: 'andrete', nl: 'jullie zullen gaan' },
        { soggetto: 'loro',  forma: 'andranno',nl: 'zij zullen gaan' },
      ],
    },
  },
  {
    infinitivo: 'parlare',
    nl: 'spreken',
    type: '-are',
    tenses: {
      presente: [
        { soggetto: 'io',    forma: 'parlo',   nl: 'ik spreek' },
        { soggetto: 'tu',    forma: 'parli',   nl: 'jij spreekt' },
        { soggetto: 'lui/lei', forma: 'parla', nl: 'hij/zij spreekt' },
        { soggetto: 'noi',   forma: 'parliamo',nl: 'wij spreken' },
        { soggetto: 'voi',   forma: 'parlate', nl: 'jullie spreken' },
        { soggetto: 'loro',  forma: 'parlano', nl: 'zij spreken' },
      ],
      passato: [
        { soggetto: 'io',    forma: 'ho parlato',     nl: 'ik heb gesproken' },
        { soggetto: 'tu',    forma: 'hai parlato',    nl: 'jij hebt gesproken' },
        { soggetto: 'lui/lei', forma: 'ha parlato',   nl: 'hij/zij heeft gesproken' },
        { soggetto: 'noi',   forma: 'abbiamo parlato',nl: 'wij hebben gesproken' },
        { soggetto: 'voi',   forma: 'avete parlato',  nl: 'jullie hebben gesproken' },
        { soggetto: 'loro',  forma: 'hanno parlato',  nl: 'zij hebben gesproken' },
      ],
      futuro: [
        { soggetto: 'io',    forma: 'parlerò',   nl: 'ik zal spreken' },
        { soggetto: 'tu',    forma: 'parlerai',  nl: 'jij zult spreken' },
        { soggetto: 'lui/lei', forma: 'parlerà', nl: 'hij/zij zal spreken' },
        { soggetto: 'noi',   forma: 'parleremo', nl: 'wij zullen spreken' },
        { soggetto: 'voi',   forma: 'parlerete', nl: 'jullie zullen spreken' },
        { soggetto: 'loro',  forma: 'parleranno',nl: 'zij zullen spreken' },
      ],
    },
  },
  {
    infinitivo: 'mangiare',
    nl: 'eten',
    type: '-are',
    tenses: {
      presente: [
        { soggetto: 'io',    forma: 'mangio',   nl: 'ik eet' },
        { soggetto: 'tu',    forma: 'mangi',    nl: 'jij eet' },
        { soggetto: 'lui/lei', forma: 'mangia', nl: 'hij/zij eet' },
        { soggetto: 'noi',   forma: 'mangiamo', nl: 'wij eten' },
        { soggetto: 'voi',   forma: 'mangiate', nl: 'jullie eten' },
        { soggetto: 'loro',  forma: 'mangiano', nl: 'zij eten' },
      ],
      passato: [
        { soggetto: 'io',    forma: 'ho mangiato',     nl: 'ik heb gegeten' },
        { soggetto: 'tu',    forma: 'hai mangiato',    nl: 'jij hebt gegeten' },
        { soggetto: 'lui/lei', forma: 'ha mangiato',   nl: 'hij/zij heeft gegeten' },
        { soggetto: 'noi',   forma: 'abbiamo mangiato',nl: 'wij hebben gegeten' },
        { soggetto: 'voi',   forma: 'avete mangiato',  nl: 'jullie hebben gegeten' },
        { soggetto: 'loro',  forma: 'hanno mangiato',  nl: 'zij hebben gegeten' },
      ],
      futuro: [
        { soggetto: 'io',    forma: 'mangerò',   nl: 'ik zal eten' },
        { soggetto: 'tu',    forma: 'mangerai',  nl: 'jij zult eten' },
        { soggetto: 'lui/lei', forma: 'mangerà', nl: 'hij/zij zal eten' },
        { soggetto: 'noi',   forma: 'mangeremo', nl: 'wij zullen eten' },
        { soggetto: 'voi',   forma: 'mangerete', nl: 'jullie zullen eten' },
        { soggetto: 'loro',  forma: 'mangeranno',nl: 'zij zullen eten' },
      ],
    },
  },
  {
    infinitivo: 'volere',
    nl: 'willen',
    type: 'onregelmatig',
    tenses: {
      presente: [
        { soggetto: 'io',    forma: 'voglio',  nl: 'ik wil' },
        { soggetto: 'tu',    forma: 'vuoi',    nl: 'jij wilt' },
        { soggetto: 'lui/lei', forma: 'vuole', nl: 'hij/zij wil' },
        { soggetto: 'noi',   forma: 'vogliamo',nl: 'wij willen' },
        { soggetto: 'voi',   forma: 'volete',  nl: 'jullie willen' },
        { soggetto: 'loro',  forma: 'vogliono',nl: 'zij willen' },
      ],
      passato: [
        { soggetto: 'io',    forma: 'ho voluto',     nl: 'ik heb gewild' },
        { soggetto: 'tu',    forma: 'hai voluto',    nl: 'jij hebt gewild' },
        { soggetto: 'lui/lei', forma: 'ha voluto',   nl: 'hij/zij heeft gewild' },
        { soggetto: 'noi',   forma: 'abbiamo voluto',nl: 'wij hebben gewild' },
        { soggetto: 'voi',   forma: 'avete voluto',  nl: 'jullie hebben gewild' },
        { soggetto: 'loro',  forma: 'hanno voluto',  nl: 'zij hebben gewild' },
      ],
      futuro: [
        { soggetto: 'io',    forma: 'vorrò',   nl: 'ik zal willen' },
        { soggetto: 'tu',    forma: 'vorrai',  nl: 'jij zult willen' },
        { soggetto: 'lui/lei', forma: 'vorrà', nl: 'hij/zij zal willen' },
        { soggetto: 'noi',   forma: 'vorremo', nl: 'wij zullen willen' },
        { soggetto: 'voi',   forma: 'vorrete', nl: 'jullie zullen willen' },
        { soggetto: 'loro',  forma: 'vorranno',nl: 'zij zullen willen' },
      ],
    },
  },
  {
    infinitivo: 'potere',
    nl: 'kunnen',
    type: 'onregelmatig',
    tenses: {
      presente: [
        { soggetto: 'io',    forma: 'posso',   nl: 'ik kan' },
        { soggetto: 'tu',    forma: 'puoi',    nl: 'jij kunt' },
        { soggetto: 'lui/lei', forma: 'può',   nl: 'hij/zij kan' },
        { soggetto: 'noi',   forma: 'possiamo',nl: 'wij kunnen' },
        { soggetto: 'voi',   forma: 'potete',  nl: 'jullie kunnen' },
        { soggetto: 'loro',  forma: 'possono', nl: 'zij kunnen' },
      ],
      passato: [
        { soggetto: 'io',    forma: 'ho potuto',     nl: 'ik heb gekund' },
        { soggetto: 'tu',    forma: 'hai potuto',    nl: 'jij hebt gekund' },
        { soggetto: 'lui/lei', forma: 'ha potuto',   nl: 'hij/zij heeft gekund' },
        { soggetto: 'noi',   forma: 'abbiamo potuto',nl: 'wij hebben gekund' },
        { soggetto: 'voi',   forma: 'avete potuto',  nl: 'jullie hebben gekund' },
        { soggetto: 'loro',  forma: 'hanno potuto',  nl: 'zij hebben gekund' },
      ],
      futuro: [
        { soggetto: 'io',    forma: 'potrò',   nl: 'ik zal kunnen' },
        { soggetto: 'tu',    forma: 'potrai',  nl: 'jij zult kunnen' },
        { soggetto: 'lui/lei', forma: 'potrà', nl: 'hij/zij zal kunnen' },
        { soggetto: 'noi',   forma: 'potremo', nl: 'wij zullen kunnen' },
        { soggetto: 'voi',   forma: 'potrete', nl: 'jullie zullen kunnen' },
        { soggetto: 'loro',  forma: 'potranno',nl: 'zij zullen kunnen' },
      ],
    },
  },
  {
    infinitivo: 'venire',
    nl: 'komen',
    type: 'onregelmatig',
    tenses: {
      presente: [
        { soggetto: 'io',    forma: 'vengo',   nl: 'ik kom' },
        { soggetto: 'tu',    forma: 'vieni',   nl: 'jij komt' },
        { soggetto: 'lui/lei', forma: 'viene', nl: 'hij/zij komt' },
        { soggetto: 'noi',   forma: 'veniamo', nl: 'wij komen' },
        { soggetto: 'voi',   forma: 'venite',  nl: 'jullie komen' },
        { soggetto: 'loro',  forma: 'vengono', nl: 'zij komen' },
      ],
      passato: [
        { soggetto: 'io',    forma: 'sono venuto/a',   nl: 'ik ben gekomen' },
        { soggetto: 'tu',    forma: 'sei venuto/a',    nl: 'jij bent gekomen' },
        { soggetto: 'lui/lei', forma: 'è venuto/a',    nl: 'hij/zij is gekomen' },
        { soggetto: 'noi',   forma: 'siamo venuti/e',  nl: 'wij zijn gekomen' },
        { soggetto: 'voi',   forma: 'siete venuti/e',  nl: 'jullie zijn gekomen' },
        { soggetto: 'loro',  forma: 'sono venuti/e',   nl: 'zij zijn gekomen' },
      ],
      futuro: [
        { soggetto: 'io',    forma: 'verrò',   nl: 'ik zal komen' },
        { soggetto: 'tu',    forma: 'verrai',  nl: 'jij zult komen' },
        { soggetto: 'lui/lei', forma: 'verrà', nl: 'hij/zij zal komen' },
        { soggetto: 'noi',   forma: 'verremo', nl: 'wij zullen komen' },
        { soggetto: 'voi',   forma: 'verrete', nl: 'jullie zullen komen' },
        { soggetto: 'loro',  forma: 'verranno',nl: 'zij zullen komen' },
      ],
    },
  },
];

// SM-2 spaced repetition implementatie
const SM2 = {
  initialCard(word) {
    return { ...word, interval: 1, repetitions: 0, easeFactor: 2.5, nextReview: Date.now() };
  },
  review(card, quality) {
    // quality: 0=fout, 1=twijfel, 2=goed
    let { interval, repetitions, easeFactor } = card;
    const q = quality * 2.5; // schaal naar 0-5

    if (q < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
      repetitions++;
    }

    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

    return { ...card, interval, repetitions, easeFactor, nextReview };
  },
};
