import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "expected-value-sports-betting",
  locale: "it",
  title: "Il valore atteso nelle scommesse sportive spiegato",
  category: "value-analysis",
  status: "published",
  description:
    "Comprendi il valore atteso nelle scommesse sportive, come probabilità e prezzo si combinano per creare un EV positivo o negativo, perché un margine positivo non garantisce una vincita e come valutare il valore con maggiore attenzione.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Il valore atteso, solitamente abbreviato in EV, è un modo per descrivere il risultato medio teorico di una decisione quando lo stesso tipo di decisione viene ripetuto molte volte. Nelle scommesse sportive, l'EV collega due cose: la tua stima di quanto spesso dovrebbe verificarsi un risultato e il prezzo offerto dal mercato. Una scommessa può avere buone probabilità di vincere e avere comunque un valore atteso negativo se le quote sono troppo basse. Una scommessa può anche perdere oggi pur mantenendo un valore atteso positivo secondo una stima di probabilità ragionevole. Il concetto è utile perché sposta l'attenzione dalla semplice scelta dei vincitori al rapporto tra probabilità, prezzo e incertezza.",
  keyTakeaways: [
    "Il valore atteso combina probabilità e vincita in un'unica misura matematica a lungo termine.",
    "Un EV positivo significa che la probabilità stimata è sufficientemente alta rispetto alle quote offerte da creare un rendimento medio teorico positivo.",
    "Un EV negativo significa che il prezzo offerto richiede una percentuale di successo superiore a quella supportata dalla tua stima di probabilità.",
    "Una scommessa a EV positivo può perdere e una a EV negativo può vincere; l'EV riguarda le decisioni ripetute, non la certezza su un singolo evento.",
    "La qualità di qualsiasi calcolo dell'EV dipende pesantemente dalla qualità e dalla calibrazione della stima di probabilità.",
    "Quote migliori migliorano il valore atteso per la stessa selezione sottostante poiché riducono la probabilità di pareggio.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Cosa significa valore atteso",
      paragraphs: [
        "Il valore atteso è la media ponderata per probabilità di tutti i possibili risultati. In un semplice esempio di scommessa con vittoria o sconfitta, ci sono due principali risultati finanziari: la scommessa vince e produce un profitto, oppure la scommessa perde e la puntata viene persa. L'EV combina la probabilità di ciascun risultato con il suo esito finanziario.",
        "Supponi che una selezione sia offerta a quote decimali di 2,00 e che tu stimi che abbia una probabilità del 55% di vincere. Una puntata di un'unità restituisce due unità in caso di successo, il che significa un'unità di profitto più la puntata originale. Il risultato perdente costa un'unità. Il valore atteso è quindi 0,55 × 1 unità di profitto più 0,45 × meno 1 unità, che equivale a +0,10 unità. Rispetto a una puntata di un'unità, questo è un rendimento atteso teorico del +10%.",
        "Questo non significa che la scommessa successiva restituirà fisicamente 1.10 unità. Il risultato effettivo di una singola scommessa è discreto: o vince o perde secondo le regole di refertazione del mercato. Il valore atteso (EV) è una media calcolata su decisioni comparabili ripetute con la probabilità ipotizzata."
      ],
      callout: {
        title: "Il concetto fondamentale",
        body:
          "Il valore atteso misura la qualità di una quota rispetto a una stima di probabilità. Non prevede il risultato della partita successiva.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "La formula di base del valore atteso",
      paragraphs: [
        "Per una semplice scommessa con esito vincente o perdente che utilizza quote decimali, l'EV per unità puntata può essere scritto come: EV = (probabilità di vincita × quota decimale) − 1.",
        "Se la probabilità è del 50% e la quota è 2.20, il calcolo è 0.50 × 2.20 − 1 = +0.10, ovvero +10%. Se la stessa probabilità del 50% è abbinata a una quota di 1.80, il risultato è 0.50 × 1.80 − 1 = −0.10, ovvero −10%.",
        "La stessa previsione può quindi avere un valore atteso molto diverso a seconda della quota disponibile. Questa è una delle distinzioni più importanti nell'analisi delle scommesse: l'opinione sportiva e la qualità economica della scommessa non sono la stessa cosa.",
        "La formula è semplice, ma può creare una falsa fiducia se l'input della probabilità viene trattato come esatto. L'aritmetica dell'EV può essere corretta mentre la stima della probabilità sottostante è errata."
      ],
      bullets: [
        "EV per unità = (probabilità di vincita × quota decimale) − 1.",
        "Probabilità del 50% a quota 2.20: +10% di EV.",
        "Probabilità del 50% a quota 2.00: 0% di EV.",
        "Probabilità del 50% a quota 1.80: −10% di EV.",
      ],
      callout: {
        title: "Stessa selezione, EV diverso",
        body:
          "Se la tua stima di probabilità rimane la stessa, cambiare le quote modifica immediatamente il valore atteso.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Probabilità di pareggio e valore atteso",
      paragraphs: [
        "Ogni quota offerta ha una probabilità di pareggio. Per le quote decimali, la probabilità di pareggio è uguale a 1 diviso per le quote. A 2,00, il tasso di pareggio è del 50%. A 1,80, è circa il 55,6%. A 2,50, è del 40%.",
        "Il collegamento con l'EV è diretto. Se la tua stima di probabilità è superiore alla probabilità di pareggio implicita nel prezzo disponibile, la scommessa ha un valore atteso positivo secondo tale stima. Se la tua stima è inferiore alla soglia di pareggio, il valore atteso è negativo. Se i due valori sono uguali, l'EV teorico è zero prima di considerare gli attriti pratici.",
        "Questo quadro è più utile rispetto al semplice chiedersi se un risultato sia probabile. Una squadra valutata al 70% può comunque essere prezzata male se le quote disponibili richiedono un tasso di pareggio del 75%. Un risultato valutato solo al 35% può teoricamente offrire valore se il prezzo richiede un tasso di pareggio inferiore al 35%."
      ],
      callout: {
        title: "Probabile non è la stessa cosa che vantaggioso",
        body:
          "La probabilità indica la frequenza con cui ritieni che qualcosa possa accadere. Il valore atteso chiede se il prezzo offerto ti compensa adeguatamente per quella probabilità.",
        tone: "warning",
      },
    },
    {
      id: "positive-negative",
      heading: "EV positivo contro EV negativo",
      paragraphs: [
        "Un valore atteso positivo significa che il rendimento medio stimato è superiore all'importo puntato. Un valore atteso negativo significa che il rendimento medio stimato è inferiore all'importo puntato. Il segno dell'EV dipende dalla relazione tra probabilità e prezzo, non dal fatto che la singola scommessa successiva vinca.",
        "Considera due persone che valutano la stessa selezione. Una può ottenere solo quote di 1,80, mentre l'altra trova 2,05. Se entrambe usano la stessa stima di probabilità del 52%, il primo prezzo produce 0,52 × 1,80 − 1 = −6,4% di EV. Il secondo produce 0,52 × 2,05 − 1 = +6,6% di EV.",
        "La previsione è identica, ma la qualità economica delle due scommesse è diversa. Ecco perché il confronto dei prezzi è importante. Un scommettitore non può controllare il punteggio finale, ma spesso può controllare se accettare un prezzo inferiore quando altrove è disponibile un prezzo equivalente migliore."
      ],
      bullets: [
        "EV positivo: la probabilità stimata supera il requisito di pareggio della quota.",
        "EV negativo: la probabilità stimata scende al di sotto del requisito di pareggio della quota.",
        "EV zero: la probabilità stimata corrisponde approssimativamente al requisito di pareggio.",
        "Cambiare le quote modifica l'EV anche se la stima della probabilità sottostante non cambia.",
      ],
    },
    {
      id: "not-guarantee",
      heading: "Perché il valore atteso positivo non garantisce un profitto",
      paragraphs: [
        "Una stima a EV positivo descrive un'aspettativa matematica a lungo termine, non un risultato garantito a breve termine. Gli sport contengono casualità, informazioni incomplete, decisioni arbitrali, infortuni, cambiamenti tattici, effetti meteorologici, errori di esecuzione e molte altre fonti di varianza. Anche una forte stima della probabilità non può eliminare questi fattori.",
        "Immagina una serie di scommesse valutate ciascuna con una probabilità di vincita del 60%. Perdere quattro o cinque scommesse di fila è del tutto possibile. Al contrario, una sequenza di scommesse a EV negativo può vincere diverse volte di seguito. I risultati a breve termine quindi non rivelano in modo affidabile se il processo sottostante fosse buono.",
        "La seconda fonte di incertezza è la stima della probabilità stessa. Un calcolo può apparire fortemente positivo perché la probabilità stimata è troppo ottimistica. Se un modello indica il 60% quando la vera probabilità è più vicina al 50%, il calcolo dell'EV sarà fuorviante anche se l'aritmetica è perfetta.",
        "Per questo motivo, il valore atteso dovrebbe essere trattato come un quadro analitico piuttosto che come una promessa. Più la stima della probabilità è incerta, minore dovrebbe essere la fiducia riposta in un piccolo margine apparente."
      ],
      callout: {
        title: "L'aritmetica può essere corretta mentre la stima è sbagliata",
        body:
          "I calcoli dell'EV sono affidabili solo quanto le probabilità fornite ad essi. La calibrazione del modello e l'incertezza contano quanto la formula.",
        tone: "warning",
      },
    },
    {
      id: "probability-quality",
      heading: "Perché la qualità della probabilità conta più della formula",
      paragraphs: [
        "La formula del valore atteso è semplice. Stimare bene la probabilità è la parte difficile. Un modello di probabilità utile dovrebbe essere calibrato: i risultati a cui viene assegnato circa il 60% dovrebbero, su un campione sufficientemente ampio e appropriato, verificarsi circa il 60% delle volte.",
        "Le probabilità sportive possono essere stimate da dati di mercato, modelli statistici, informazioni su squadre e giocatori, variabili contestuali o combinazioni di queste fonti. Ogni approccio contiene ipotesi. I dati storici potrebbero non rappresentare pienamente le squadre attuali. Gli infortuni potrebbero essere incerti. Un modello potrebbe sottovalutare i cambiamenti tattici. I prezzi di mercato potrebbero incorporare informazioni che il modello non possiede.",
        "Ciò significa che un vantaggio apparente del 2% non dovrebbe essere trattato automaticamente allo stesso modo di un vantaggio del 10%. L'incertezza attorno alla stima della probabilità potrebbe essere maggiore della differenza misurata.",
        "Un processo disciplinato non si chiede solo 'Qual è la mia stima?' ma anche 'Quanto è incerta questa stima e quanto è sensibile il valore atteso (EV) a piccoli cambiamenti?'"
      ],
      bullets: [
        "Verifica la calibrazione su campioni ampi anziché giudicare un modello da pochi risultati.",
        "Tratta i piccoli vantaggi con cautela quando la stima della probabilità sottostante è incerta.",
        "Aggiorna le stime quando cambiano le informazioni rilevanti.",
        "Evita di aggiungere sicurezza semplicemente perché un modello produce molti decimali.",
      ],
    },
    {
      id: "bookmaker-margin",
      heading: "In che modo il margine del bookmaker influisce sull'analisi del valore atteso (EV)",
      paragraphs: [
        "I prezzi dei bookmaker includono comunemente un margine del bookmaker o overround. In un semplice mercato a due esiti, entrambe le parti potrebbero essere offerte a 1,91. Ogni prezzo implica circa il 52,36%, quindi le due probabilità grezze totalizzano circa il 104,72% anziché il 100%.",
        "Questo è importante perché una probabilità implicita grezza del bookmaker non è automaticamente una stima di probabilità equa. I prezzi quotati includono la struttura del mercato e il margine dell'operatore. Gli analisti possono normalizzare le probabilità implicite per creare un semplice benchmark di mercato senza margine.",
        "Per l'analisi del valore atteso (EV), tuttavia, il prezzo effettivo disponibile per lo scommettitore rimane il prezzo che determina la soglia di pareggio. Anche se un modello senza margine stima un risultato al 52%, il prezzo di un bookmaker pari a 1,85 richiede circa il 54,1% per andare in pareggio. Il prezzo di esecuzione è quindi fondamentale per il calcolo finale del valore atteso (EV)."
      ],
      callout: {
        title: "La probabilità equa e il prezzo disponibile sono input differenti",
        body:
          "Una stima senza margine può aiutare a descrivere le aspettative del mercato, mentre le quote effettivamente offerte determinano la probabilità di pareggio della scommessa che potete effettuare.",
        tone: "info",
      },
    },
    {
      id: "odds-comparison",
      heading: "Perché il confronto delle quote migliora il valore atteso",
      paragraphs: [
        "Per la stessa selezione e stima di probabilità, quote più elevate migliorano sempre il valore atteso. Supponete che la vostra stima sia del 48%. A 1,95, il VE è 0,48 × 1,95 − 1 = −6,4%. A 2,10, il VE è +0,8%. A 2,20, il VE è +5,6%.",
        "Nulla riguardo all'esito sportivo è cambiato tra questi esempi. È cambiato solo il prezzo. Ecco perché il confronto di mercati equivalenti tra vari bookmaker è una parte importante dell'analisi del valore.",
        "Il confronto deve essere autenticamente alla pari. Regole di refertazione differenti, handicap, totali, trattamento dei tempi supplementari, condizioni di annullamento o definizioni di mercato possono rendere prezzi superficialmente simili non equivalenti. Il confronto dei prezzi è utile solo quando la scommessa sottostante è la stessa."
      ],
      bullets: [
        "Confermate che l'evento, la selezione, la linea e le regole di refertazione corrispondano.",
        "Confrontate i prezzi attuali piuttosto che schermate obsolete o quotazioni storiche.",
        "Ricordate che i prezzi di mercato possono variare prima che la scommessa venga piazzata.",
        "Quote equivalenti più alte riducono la probabilità di pareggio.",
      ],
    },
    {
      id: "variance",
      heading: "Valore atteso, varianza e dimensione del campione",
      paragraphs: [
        "La varianza descrive quanto ampiamente i risultati a breve termine possano discostarsi dalla loro aspettativa a lungo termine. Le scommesse sportive presentano una varianza sostanziale poiché ciascun evento produce un esito discreto e molti mercati comportano probabilità ben lontane dalla certezza.",
        "Un processo con un valore atteso positivo autentico può attraversare periodi di perdite prolungati. L'entità e la durata di tali oscillazioni dipendono dal tipo di scommesse, dalle quote, dalle probabilità reali, dalla correlazione tra le posizioni e dal dimensionamento della puntata. Un campione ridotto può quindi essere dominato dalla casualità.",
        "Ciò crea un grave problema di valutazione. Un scommettitore potrebbe scambiare una serie di vittorie per la prova di abilità o abbandonare un processo valido durante una normale flessione. L'analisi del valore atteso (EV) è più significativa se combinata con una tenuta disciplinata dei registri, dimensioni del campione realistiche e attenzione alla calibrazione piuttosto che al solo profitto a breve termine."
      ],
      callout: {
        title: "I risultati e il processo non sono identici",
        body:
          "Una vittoria non dimostra che una scommessa avesse un EV positivo, e una sconfitta non dimostra che avesse un EV negativo. Valuta la qualità della decisione relativa a probabilità e prezzo separatamente dal punteggio finale.",
        tone: "warning",
      },
    },
    {
      id: "worked-example",
      heading: "Un esempio pratico di valore atteso",
      paragraphs: [
        "Supponi che un bookmaker offra quote decimali di 2.30 su una selezione. La probabilità di pareggio (break-even) è 1 ÷ 2.30, ovvero circa il 43.48%. La tua analisi indipendente stima la selezione al 47%.",
        "L'EV per unità è 0.47 × 2.30 − 1 = +0.081, ovvero +8.1%. Sotto la stima del 47%, scommesse ripetute allo stesso rapporto probabilità-prezzo restituirebbero teoricamente in media 1.081 unità per ciascuna unità puntata.",
        "Ora verifica la sensibilità. Se la probabilità reale fosse solo del 44%, l'EV sarebbe 0.44 × 2.30 − 1 = +1.2%. Al 43%, l'EV diventa −1.1%. La conclusione cambia con un aggiustamento relativamente piccolo della probabilità.",
        "Questa sensibilità illustra perché l'interpretazione responsabile è importante. Il numero principale del +8.1% non è sufficiente. È inoltre necessario comprendere il livello di fiducia nella stima del 47% e se il prezzo quotato sia ancora disponibile."
      ],
      bullets: [
        "Quote: 2.30",
        "Probabilità di pareggio (break-even): circa 43.48%",
        "Probabilità stimata: 47%",
        "EV stimato: +8,1%",
        "Al 44% di probabilità: +1,2% EV",
        "Al 43% di probabilità: −1,1% EV",
      ],
    },
    {
      id: "matchsignal",
      heading: "In che modo il Valore Atteso si relaziona al Value Edge di MatchSignal",
      paragraphs: [
        "MatchSignal utilizza i prezzi di mercato, campioni di bookmaker e analisi basate sulle probabilità per fornire un contesto attorno a una selezione. Il campo Value Edge della piattaforma è progettato per evidenziare una differenza positiva tra il prezzo di mercato disponibile e la valutazione basata sulla probabilità utilizzata da MatchSignal.",
        "Questo va interpretato come un segnale analitico piuttosto che come un rendimento atteso garantito. I prezzi di mercato possono muoversi, le stime di probabilità contengono incertezza e il segnale visualizzato riflette i dati e le ipotesi del modello disponibili al momento dell'analisi.",
        "Migliori Quote mostra il prezzo partner più forte disponibile identificato per la selezione visualizzata, Media di Mercato riassume la prezzatura di mercato campionata, Probabilità Equa è una stima analitica, e Bookmaker Campionati indica quante fonti di bookmaker hanno contribuito al campione di mercato rilevante.",
        "La corretta interpretazione di un Value Edge non è quindi \"questa scommessa vincerà\". È più vicina a \"nelle attuali condizioni di probabilità e prezzo, questa selezione potrebbe essere prezzata in modo più favorevole di quanto suggerirebbe la stima del modello\"."
      ],
      callout: {
        title: "Un segnale non è una garanzia",
        body:
          "Il Value Edge di MatchSignal descrive una relazione basata sul modello tra probabilità e prezzo. Non garantisce un risultato positivo né elimina la varianza dello sport.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Una checklist pratica per l'EV",
      paragraphs: [
        "Prima di definire una scommessa come a valore atteso positivo, verifica ogni componente del calcolo. Questo aiuta a evitare che una formula matematicamente corretta riceva in input dati inaffidabili."
      ],
      bullets: [
        "Identificare il mercato esatto e la selezione.",
        "Utilizzare le quote attualmente disponibili, non un prezzo obsoleto.",
        "Convertire il prezzo nella sua probabilità implicita di pareggio (break-even).",
        "Stimare la probabilità del risultato in modo indipendente o con un modello chiaramente definito.",
        "Verificare se il margine del bookmaker influisce sul confronto di mercato.",
        "Calcolare il valore atteso (EV) da probabilità e prezzo.",
        "Testare come cambia il risultato se la stima della probabilità è leggermente inferiore.",
        "Confrontare prezzi equivalenti tra diversi bookmaker ove disponibile.",
        "Tenere conto dell'incertezza e della varianza.",
        "Utilizzare un dimensionamento della puntata disciplinato e non trattare mai l'EV come una garanzia.",
      ],
    },
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "implied-probability",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "matchsignal-value-edge",
    "variance-sports-betting",
  ],
  responsibleGamblingNote:
    "Il valore atteso è un quadro matematico, non una garanzia di profitto. Le stime di probabilità possono essere errate, i prezzi di mercato cambiano e i risultati a breve termine possono variare notevolmente dalle aspettative teoriche. Scommetti solo importi che puoi permetterti di perdere, usa limiti predeterminati, evita di inseguire le perdite e tratta l'analisi delle scommesse come informazione piuttosto che come certezza.",
};

export default guide;
