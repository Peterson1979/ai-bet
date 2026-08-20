import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "matchsignal-value-edge",
  locale: "it",
  title: "In che modo MatchSignal calcola il margine di valore (Value Edge)",
  category: "value-analysis",
  status: "published",
  description:
    "Scopri in che modo MatchSignal calcola e interpreta il margine di valore (Value Edge), come la probabilità equa e le quote decimali offerte si combinano nel valore stimato, perché il margine di valore differisce dal valore differenziale in punti di probabilità (valueDiff) e perché un segnale positivo non costituisce garanzia di profitto.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Il margine di valore (Value Edge) di MatchSignal è progettato per mostrare quanto appaia favorevole un prezzo disponibile rispetto alla valutazione basata sulla probabilità della piattaforma. Sulla MatchCard, il margine di valore è rappresentato dal campo estimatedValuePct. Quando MatchSignal dispone di una probabilità equa e del prezzo di un partner disponibile, la relazione matematica è la stessa formula del valore atteso utilizzata in tutta l'analisi delle scommesse: la percentuale di valore stimato è pari alla probabilità equa espressa come decimale moltiplicata per le quote decimali offerte, meno uno, e quindi moltiplicata per 100. La pipeline di produzione può anche accettare un campo estimatedValuePct esplicito generato dall'intelligenza artificiale quando tale campo viene restituito dal livello di analisi; altrimenti, si affida al calcolo del valore a partire dalla probabilità equa e dalle quote del partner disponibili. Ciò rende il margine di valore un segnale basato su modello e prezzo, e non una promessa riguardo al risultato della partita successiva.",
  keyTakeaways: [
    "La visualizzazione del margine di valore (Value Edge) sulla MatchCard utilizza il campo estimatedValuePct.",
    "Il percorso di calcolo a partire da probabilità e prezzo è: ((Probabilità Equa / 100) × quote decimali offerte − 1) × 100.",
    "Un margine di valore (Value Edge) positivo significa che il prezzo è favorevole rispetto alla stima della probabilità equa utilizzata da MatchSignal.",
    "Un margine di valore (Value Edge) pari a zero significa che le quote offerte corrispondono approssimativamente al prezzo di pareggio implicito nella probabilità equa.",
    "Un margine di valore (Value Edge) negativo significa che il prezzo offerto è inferiore a quanto richiesto dalla stima di probabilità per il pareggio.",
    "Il valore differenziale (valueDiff) di MatchSignal è una metrica diversa: si tratta di uno scarto in punti di probabilità, non della stessa cosa della percentuale di rendimento stimato.",
    "La pipeline di analisi giornaliera può preservare un valore estimatedValuePct esplicito generato dall'IA; in sua assenza, MatchSignal può calcolare il valore a partire dalla probabilità equa e dalle quote dei partner.",
    "Un margine di valore (Value Edge) positivo è una stima analitica e non garantisce una scommessa vincente né un profitto realizzato.",
  ],
  sections: [
    {
      id: "what-value-edge-is",
      heading: "Cosa intende MatchSignal per margine di valore (Value Edge)",
      paragraphs: [
        "Su una MatchCard di MatchSignal, l'etichetta Value Edge è la presentazione visibile all'utente di estimatedValuePct. Il numero ha lo scopo di descrivere la relazione tra la Probabilità Equa di MatchSignal per la selezione visualizzata e la quota disponibile per tale selezione.",
        "La questione fondamentale non è semplicemente se MatchSignal ritenga probabile un determinato esito. Riguarda invece il fatto che le quote offerte siano sufficientemente alte rispetto a quella stima di probabilità.",
        "Questa distinzione è importante perché la stessa previsione può risultare attraente a un determinato prezzo e poco interessante a un altro. Una selezione valutata al 55% non possiede automaticamente valore. A quota 2,00 ha un valore teorico positivo; a 1,70 no.",
        "Value Edge appartiene pertanto allo strato di prezzatura dell'analisi. Esso combina un giudizio di probabilità con la quota osservabile sul mercato."
      ],
      callout: {
        title: "Value Edge è una metrica di quota e probabilità",
        body:
          "Non deve essere interpretato come un'affermazione da parte di MatchSignal secondo cui una squadra sia una vincitrice certa. La stessa selezione può avere un Value Edge differente a quote diverse.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "La formula centrale di Value Edge",
      paragraphs: [
        "Quando MatchSignal calcola il valore stimato a partire dalla Probabilità Equa e dalle quote offerte, la formula è: Value Edge % = ((Probabilità Equa / 100) × Quota Decimale Offerta − 1) × 100.",
        "Questa è la relazione standard di rendimento atteso per un semplice esito di vittoria o sconfitta, espressa come percentuale di un'unità puntata.",
        "Il codice converte la Probabilità Equa da percentuale a decimale, la moltiplica per la quota decimale offerta, sottrae 1 e riconverte il risultato in termini percentuali.",
        "Il numero risultante risponde a una domanda teorica: se la stima della Probabilità Equa fosse corretta e la stessa relazione tra probabilità e prezzo potesse essere ripetuta molte volte, quale rendimento medio rispetto alla posta implicherebbe tale relazione?"
      ],
      bullets: [
        "Convertire la Probabilità Equa da percentuale a decimale.",
        "Moltiplica per le quote decimali offerte.",
        "Sottrai 1.",
        "Moltiplica per 100 per esprimere il risultato come percentuale.",
      ],
      callout: {
        title: "Formula",
        body:
          "Value Edge % = ((Probabilità Equa / 100) × Quota Offerta − 1) × 100.",
        tone: "example",
      },
    },
    {
      id: "worked-example",
      heading: "Un esempio pratico di Value Edge di MatchSignal",
      paragraphs: [
        "Supponiamo che MatchSignal assegni una Probabilità Equa del 55% a una selezione e che le quote offerte dal partner siano 2,00.",
        "Converti il 55% in 0,55. Moltiplica 0,55 per 2,00 per ottenere 1,10. Sottrai 1 per ottenere 0,10. Moltiplica per 100 e il Value Edge stimato è +10%.",
        "Ora mantieni la stessa Probabilità Equa ma cambia il prezzo offerto a 1,80. Il calcolo diventa 0,55 × 1,80 − 1 = −0,01, ovvero circa −1%.",
        "Nulla è cambiato riguardo alla Probabilità Equa. È cambiato solo il prezzo disponibile. Ecco perché il confronto dei prezzi può modificare in modo sostanziale la relazione di valore visualizzata."
      ],
      bullets: [
        "Probabilità Equa: 55%.",
        "Quote Offerte: 2,00.",
        "Calcolo: 0.55 × 2.00 − 1 = 0.10.",
        "Margine di Valore: +10%.",
        "A quota 1.80 con la stessa probabilità del 55%: circa −1%.",
      ],
    },
    {
      id: "break-even",
      heading: "Margine di Valore e Probabilità di Pareggio",
      paragraphs: [
        "La stessa relazione può essere compresa attraverso la probabilità di pareggio. Quote decimali di 2.00 richiedono una percentuale di vittorie del 50% per pareggiare i conti prima delle frizioni pratiche. Quote di 1.80 richiedono circa il 55.56%.",
        "Se la Probabilità Equa di MatchSignal è superiore alla probabilità di pareggio implicita nel prezzo disponibile, il Margine di Valore calcolato è positivo. Se la Probabilità Equa è inferiore a tale soglia, il Margine di Valore è negativo.",
        "Questo è il motivo per cui un Margine di Valore positivo non significa semplicemente che \"a MatchSignal piace la squadra\". Significa che la stima di probabilità è sufficientemente alta rispetto al prezzo offerto da implicare un valore teorico positivo.",
        "Una selezione può avere una Probabilità Equa elevata e avere comunque un Margine di Valore negativo se il prezzo di mercato è troppo basso."
      ],
      callout: {
        title: "La sola probabilità non è valore",
        body:
          "Il valore compare solo quando la stima di probabilità viene confrontata con il prezzo effettivamente offerto.",
        tone: "warning",
      },
    },
    {
      id: "fair-probability",
      heading: "Dove si colloca la Probabilità Equa nel calcolo",
      paragraphs: [
        "La Probabilità Equa è l'input di probabilità utilizzato nella relazione di valore. Nella pipeline di previsione giornaliera, una Probabilità Equa fornita dall'IA può essere utilizzata direttamente dopo la convalida numerica e la delimitazione.",
        "Se non è disponibile una probabilità equa esplicita dell'IA, la pipeline contiene una logica di riserva in grado di derivare una stima di probabilità da informazioni di mercato come il consenso del mercato e la probabilità implicita associata alla quota.",
        "Ciò significa che la probabilità equa non è semplicemente un'altra etichetta per la probabilità implicita grezza delle quote di un singolo bookmaker. È un input analitico utilizzato per valutare la quota.",
        "Poiché la stima della probabilità può essere errata o incerta, anche il margine di valore (Value Edge) da essa derivato eredita tale incertezza."
      ],
      callout: {
        title: "L'input di probabilità conta più della precisione decimale",
        body:
          "Un margine di valore calcolato alla perfezione può comunque essere fuorviante se la stima della probabilità equa non è accurata.",
        tone: "warning",
      },
    },
    {
      id: "explicit-ai-value",
      heading: "Perché la pipeline può utilizzare una stima di valore esplicita dell'IA",
      paragraphs: [
        "Il livello di analisi giornaliera di MatchSignal può restituire un valore stimato esplicito (estimatedValuePct) insieme alla probabilità equa e ad altri campi analitici.",
        "Quando è presente un valore stimato esplicito valido, la pipeline giornaliera conserva tale valore anziché sostituirlo automaticamente con un valore calcolato di recente. Quando il campo esplicito è assente, la pipeline può calcolare il valore stimato dalla probabilità equa e dalle quote dei partner.",
        "Ciò è importante quando si interpreta tecnicamente la piattaforma: il margine di valore non viene sempre generato da un unico percorso di codice. Si tratta di un campo analitico normalizzato con un percorso fornito dall'IA e un percorso di riserva matematico.",
        "Il livello di prompt indica inoltre all'analisi di essere conservativa riguardo alla probabilità equa e al valore stimato e di restituire null quando il margine non è chiaro. Tale struttura è concepita per evitare di inventare una confidenza numerica quando le prove disponibili non la supportano."
      ],
      callout: {
        title: "Due percorsi, un campo visualizzato",
        body:
          "La MatchCard mostra il valore stimato (estimatedValuePct) come margine di valore (Value Edge) indipendentemente dal fatto che il valore valido provenga dal livello di analisi o dal calcolo di riserva basato su probabilità e quote.",
        tone: "info",
      },
    },
    {
      id: "value-diff",
      heading: "Value Edge non è la stessa cosa di valueDiff",
      paragraphs: [
        "MatchSignal contiene anche un campo valueDiff. È facile confonderlo con Value Edge perché entrambi descrivono un divario tra una valutazione di probabilità e un prezzo di mercato.",
        "Le due metriche utilizzano unità diverse. estimatedValuePct è una percentuale in stile rendimento atteso basata sulla probabilità moltiplicata per le quote decimali. valueDiff è una differenza in punti percentuali tra la Probabilità Equa e la probabilità implicita associata al prezzo rilevante.",
        "Ad esempio, se la Probabilità Equa è il 55% e il prezzo del partner implica il 50%, valueDiff è di +5 punti percentuali. A una quota di 2.00, estimatedValuePct è del +10%. Questi numeri descrivono concetti correlati ma non sono intercambiabili.",
        "La visualizzazione di Value Edge sulla MatchCard utilizza estimatedValuePct. Trattare valueDiff come se fosse un rendimento atteso traviserebbe quindi il significato del numero."
      ],
      bullets: [
        "estimatedValuePct: percentuale di valore in stile rendimento.",
        "valueDiff: differenza in punti di probabilità.",
        "Entrambi possono essere positivi allo stesso tempo.",
        "I loro valori numerici non devono necessariamente coincidere.",
      ],
      callout: {
        title: "Non mescolare percentuali e punti percentuali",
        body:
          "Un divario di probabilità di +5 punti percentuali non è la stessa metrica di un rendimento stimato del +5%.",
        tone: "warning",
      },
    },
    {
      id: "best-odds",
      heading: "Perché le quote migliori sono importanti per Value Edge",
      paragraphs: [
        "Il prezzo utilizzato in un calcolo del valore modifica direttamente il risultato. Per la stessa Probabilità Equa, quote decimali equivalenti più alte producono un margine di valore superiore.",
        "Se la Probabilità Equa è del 52%, le quote di 1,90 implicano circa il −1,2% di valore, le quote di 2,00 implicano il +4% e le quote di 2,10 implicano il +9,2%.",
        "Ecco perché MatchSignal presenta le Migliori Quote insieme al Margine di Valore. Il prezzo disponibile più forte ed effettivamente equivalente può migliorare in modo significativo la relazione di valore.",
        "Il confronto deve comunque essere omogeneo. Un prezzo più alto su un handicap, un totale, una regola di refertazione o un mercato differenti non costituisce una sostituzione valida per la selezione mostrata."
      ],
      bullets: [
        "52% a 1,90 → circa −1,2%.",
        "52% a 2,00 → circa +4,0%.",
        "52% a 2,10 → circa +9,2%.",
      ],
    },
    {
      id: "market-average",
      heading: "In che modo la Media di Mercato e i Bookmakers Campionati aggiungono contesto",
      paragraphs: [
        "Il Margine di Valore è più utile quando viene osservato insieme agli altri campi della MatchCard anziché in modo isolato.",
        "La Media di Mercato riassume i prezzi campionati dei bookmaker, aiutando a mostrare se l'offerta visualizzata differisce dal mercato più ampio. I Bookmakers Campionati forniscono un contesto su quante fonti di bookmaker hanno contribuito al campione di mercato rilevante.",
        "Un prezzo partner più forte rispetto al mercato campionato può migliorare l'economia disponibile per l'utente, ma il numero di bookmaker campionati non dimostra di per sé che la Probabilità Equa sia corretta.",
        "Questi campi descrivono il contesto di mercato. Non eliminano l'errore del modello, il margine del bookmaker, i prezzi obsoleti o la normale varianza dello sport."
      ],
    },
    {
      id: "fair-odds",
      heading: "Le quote eque sono la versione in prezzo della probabilità equa",
      paragraphs: [
        "MatchSignal può anche convertire la probabilità equa in quote eque. Concettualmente, le quote decimali eque sono pari a 1 diviso per la probabilità equa espressa come decimale.",
        "Una probabilità equa del 50% corrisponde a quote eque di 2.00. Una probabilità equa del 40% corrisponde a 2.50. Una probabilità equa del 60% corrisponde a circa 1.67.",
        "Ciò fornisce un altro modo per leggere la relazione del margine di valore (Value Edge). Se le quote offerte sono significativamente superiori alle quote eque implicite nella probabilità analitica, il prezzo potrebbe rappresentare un valore stimato positivo.",
        "Se le quote offerte sono inferiori alle quote eque, il prezzo richiede una probabilità superiore a quella supportata dalla stima."
      ],
      bullets: [
        "50% di probabilità equa → 2.00 di quote eque.",
        "40% → 2.50.",
        "60% → approssimativamente 1.67.",
      ],
    },
    {
      id: "positive-zero-negative",
      heading: "Come leggere il margine di valore positivo, zero e negativo",
      paragraphs: [
        "Un margine di valore positivo significa che la relazione tra probabilità e prezzo implica un rendimento teorico superiore a zero secondo la stima di probabilità utilizzata.",
        "Un margine di valore vicino a zero significa che il prezzo offerto è vicino al prezzo di pareggio implicito nella probabilità equa.",
        "Un margine di valore negativo significa che il prezzo offerto attualmente è inferiore a quanto supportato dalla stima di probabilità.",
        "Il segno è utile, ma la magnitudine non deve essere trattata come una certezza. Un segnale del +6% mostrato può svanire se la Probabilità Equa è stata sovrastimata o se le quote disponibili si accorciano."
      ],
      callout: {
        title: "Il vantaggio può svanire",
        body:
          "Il Value Edge è sensibile al fattore temporale poiché le quote si muovono, ed è sensibile al modello poiché la Probabilità Equa è una stima.",
        tone: "warning",
      },
    },
    {
      id: "rounding",
      heading: "Arrotondamento e Precisione di Visualizzazione",
      paragraphs: [
        "Il calcolo del valore è normalizzato per la precisione di visualizzazione anziché essere presentato con decimali illimitati. Questo mantiene leggibili i MatchCards ed evita di suggerire una precisione maggiore di quella che l'interfaccia può utilizzare.",
        "Gli utenti non dovrebbero interpretare un decimo o un centesimo di punto percentuale come una garanzia significativa di maggiore accuratezza di previsione.",
        "Quando l'incertezza di fondo attorno alla Probabilità Equa è di diversi punti percentuali, una minuscola differenza nel Value Edge visualizzato può essere economicamente meno importante dell'incertezza del modello stesso."
      ],
    },
    {
      id: "ranking",
      heading: "Il Value Edge Viene Utilizzato Anche come Segnale di Qualità",
      paragraphs: [
        "All'interno di MatchSignal, estimatedValuePct non viene solo mostrato all'utente. La logica di ranking valuta anche il numero del valore insieme ad altre informazioni come la Probabilità Equa, la copertura dei bookmaker, lo spread, il consenso e la Fascia di Rischio.",
        "Ciò impedisce alla piattaforma di trattare un numero di valore grezzo come l'unico criterio di qualità. Un grande vantaggio apparente da un mercato sottile o incoerente merita più cautela rispetto a un vantaggio di dimensioni simili supportato da un contesto di mercato più ampio.",
        "La decisione esatta sulla qualità è quindi multifattoriale, anche se il calcolo del Value Edge in sé ha una chiara interpretazione basata su probabilità e prezzo."
      ],
      callout: {
        title: "Il Value Edge è un segnale, non l'intero ranking",
        body:
          "MatchSignal prende in considerazione anche la profondità di mercato, il contesto di probabilità, lo spread e il rischio, anziché classificare le selezioni unicamente in base al margine visualizzato più ampio.",
        tone: "info",
      },
    },
    {
      id: "not-guarantee",
      heading: "Perché un margine di valore positivo non garantisce un profitto",
      paragraphs: [
        "La formula descrive il valore atteso sotto una probabilità stimata. Non determina ciò che accade in un singolo evento sportivo.",
        "Un margine di valore del +8% può perdere immediatamente. Una selezione a valore negativo può vincere. La differenza diventa significativa solo come parte di un processo decisionale ripetuto e basato su stime di probabilità sufficientemente accurate.",
        "L'errore del modello è un'altra fonte di rischio. Se MatchSignal stima un esito al 55% ma la probabilità reale è inferiore, il margine visualizzato potrebbe essere sovrastimato.",
        "Anche il movimento del mercato è importante. Se le quote che hanno generato un margine positivo non sono più disponibili, il valore deve essere ricalcolato utilizzando il prezzo corrente."
      ],
      callout: {
        title: "Il margine di valore non è una previsione di profitto",
        body:
          "Si tratta di una stima basata su un modello della qualità del prezzo in condizioni di incertezza, non di una promessa sulla scommessa successiva o sulla crescita futura del bankroll.",
        tone: "warning",
      },
    },
    {
      id: "example-sensitivity",
      heading: "Sensibilità: piccoli cambiamenti di probabilità possono essere importanti",
      paragraphs: [
        "Supponiamo che le quote offerte siano 2,10. Con una probabilità equa del 50%, il margine di valore è del +5%. Al 48%, è di circa +0,8%. Al 47%, diventa di circa −1,3%.",
        "Bastano tre punti percentuali di variazione nella stima della probabilità per trasformare lo stesso prezzo da un segnale positivo a uno negativo.",
        "Ciò dimostra perché l'incertezza del modello dovrebbe essere considerata insieme al margine di valore principale. Più il margine è piccolo, più è facile che un normale errore di stima capovolga la conclusione.",
        "Per un'interpretazione pratica, un utente dovrebbe chiedersi non solo 'Qual è il Margine di Valore?', ma anche 'Quanto è robusto questo margine se la Probabilità Equa è leggermente errata?'"
      ],
      bullets: [
        "Quote 2,10, Probabilità Equa 50% → +5,0%.",
        "Quote 2,10, Probabilità Equa 48% → circa +0,8%.",
        "Quote 2,10, Probabilità Equa 47% → circa −1,3%.",
      ],
    },
    {
      id: "checklist",
      heading: "Come leggere un Margine di Valore di MatchSignal",
      paragraphs: [
        "Un Margine di Valore dovrebbe essere letto insieme al resto della MatchCard e tenendo a mente i limiti dell'analisi probabilistica."
      ],
      bullets: [
        "Conferma il mercato e la selezione esatti.",
        "Leggi la Probabilità Equa come una stima, non come una certezza.",
        "Controlla le Migliori Quote attualmente visualizzate.",
        "Usa la relazione tra probabilità e prezzo per comprendere il Margine di Valore.",
        "Non confondere il Margine di Valore con il divario in punti di probabilità valueDiff.",
        "Esamina la Media di Mercato e i Bookmaker Campionati per il contesto di mercato.",
        "Ricorda che le quote possono cambiare dopo che la schedina è stata generata.",
        "Tratta con cautela i margini di vantaggio ridotti quando l'incertezza della probabilità è elevata.",
        "Non utilizzare un Value Edge maggiore come consiglio automatico per il dimensionamento della puntata.",
        "Non interpretare un Value Edge positivo come un risultato vincente garantito.",
      ],
    },
  ],
  relatedGuides: [
    "expected-value-sports-betting",
    "implied-probability",
    "how-to-compare-betting-odds",
    "bookmaker-margin-overround",
    "why-betting-odds-move",
    "ai-sports-betting-predictions",
  ],
  responsibleGamblingNote:
    "MatchSignal Value Edge è una stima analitica basata su probabilità e prezzo, non una garanzia di profitto o una raccomandazione ad aumentare le puntate. Le stime di probabilità possono essere errate, le quote possono muoversi e qualsiasi scommessa può perdere. Mantieni le puntate entro limiti predeterminati, scommetti solo somme che puoi permetterti di perdere e non inseguire mai le perdite.",
};

export default guide;
