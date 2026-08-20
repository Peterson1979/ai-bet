import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "ai-sports-betting-predictions",
  locale: "it",
  title: "L'IA nelle scommesse sportive: cosa può e non può prevedere",
  category: "ai-data",
  status: "published",
  description:
    "Scopri cosa può fare realisticamente l'IA nell'analisi delle scommesse sportive, dove i modelli di previsione aiutano, perché la qualità dei dati e la calibrazione sono importanti, cosa l'IA non può sapere con certezza e come utilizzare gli approfondimenti generati dall'IA senza considerarli come risultati garantiti.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "L'intelligenza artificiale può elaborare grandi set di dati, confrontare i prezzi di mercato, identificare schemi, riassumere informazioni contestuali e produrre stime basate sulla probabilità. Queste capacità possono rendere l'analisi sportiva più rapida e strutturata. Non rendono gli eventi sportivi deterministici. Un modello di intelligenza artificiale non può conoscere il futuro, eliminare la casualità, garantire profitti o compensare dati scarsi semplicemente producendo una risposta sicura. Il modo più utile di considerare l'IA nelle scommesse sportive è come uno strato analitico: può organizzare le prove, stimare le probabilità, confrontare i prezzi ed evidenziare l'incertezza, ma i suoi output rimangono dipendenti dalla qualità dei dati, dalle ipotesi del modello, dalle condizioni di mercato e da eventi che potrebbero non essere ancora noti.",
  keyTakeaways: [
    "L'IA può elaborare grandi quantità di dati sportivi, di mercato e contestuali in modo più coerente rispetto alla sola ricerca manuale.",
    "L'IA può stimare le probabilità e confrontarle con i prezzi di mercato, ma tali probabilità sono stime piuttosto che fatti.",
    "La calibrazione del modello conta più di quanto una spiegazione dell'IA possa sembrare sicura o dettagliata.",
    "Dati di input scarsi, obsoleti, incompleti o distorti possono produrre previsioni scarse anche quando il modello è sofisticato.",
    "L'IA non può prevedere in modo affidabile eventi di match casuali, infortuni futuri sconosciuti, decisioni arbitrali o altre informazioni che non esistono nei suoi input.",
    "Una spiegazione rifinita dell'IA può comunque essere errata o allucinatoria e non dovrebbe essere trattata come prova indipendente.",
    "I prezzi di mercato contengono informazioni, quindi l'analisi dell'IA dovrebbe confrontarsi con il mercato anziché ignorarlo.",
    "L'IA è più utile come strumento di supporto alle decisioni, non come fonte di risultati di scommessa garantiti.",
  ],
  sections: [
    {
      id: "what-ai-means",
      heading: "Cosa significa realmente 'Analisi delle scommesse sportive tramite IA'",
      paragraphs: [
        "L'analisi delle scommesse sportive basata sull'intelligenza artificiale è un termine ampio. Può riferirsi a modelli di previsione statistica, sistemi di apprendimento automatico, modelli linguistici, sistemi automatizzati di confronto delle quote o a combinazioni di queste tecnologie.",
        "Diversi sistemi di IA risolvono problemi differenti. Un modello statistico può stimare la probabilità di vittoria a partire dai dati di rendimento storico. Un modello di mercato può confrontare i prezzi dei bookmaker. Un modello linguistico può riassumere infortuni, calendari, contesto tattico o output dei modelli in spiegazioni comprensibili.",
        "Queste funzioni non vanno confuse. Un modello che scrive una spiegazione solida non è necessariamente il modello che ha generato la probabilità sottostante, e un modello di probabilità non comprende automaticamente ogni elemento del contesto attuale.",
        "Valutare un sistema di IA richiede quindi di comprendere quali dati utilizza, quale compito svolge e come vengono convalidati i suoi output."
      ],
      callout: {
        title: "L'IA non è un unico metodo",
        body:
          "Modelli di previsione, modelli linguistici, flussi di dati e sistemi di confronto delle quote possono essere tutti definiti IA, ma presentano punti di forza e modalità di errore differenti.",
        tone: "info",
      },
    },
    {
      id: "what-ai-can-do",
      heading: "Cosa può fare bene l'IA",
      paragraphs: [
        "L'IA è particolarmente utile quando un compito richiede l'elaborazione ripetuta e coerente di molte variabili.",
        "Un modello può analizzare prestazioni storiche, forza della squadra, statistiche dei giocatori, calendario, prezzi di mercato e altre caratteristiche strutturate molto più velocemente di quanto una persona possa fare esaminando manualmente migliaia di eventi.",
        "I sistemi automatizzati possono inoltre applicare gli stessi calcoli su molti mercati senza stancarsi, distrarsi o affezionarsi emotivamente a una squadra del cuore.",
        "Se combinate con dati validi e una convalida rigorosa, queste capacità possono rendere la stima delle probabilità e il confronto di mercato più sistematici."
      ],
      bullets: [
        "Elaborare grandi set di dati strutturati.",
        "Confronta le quote attuali tra più bookmaker.",
        "Converti le quote in probabilità implicita.",
        "Stima le probabilità dei risultati da caratteristiche storiche e contestuali.",
        "Rileva relazioni statistiche che potrebbero essere difficili da notare manualmente.",
        "Riassumi grandi quantità di informazioni contestuali.",
        "Applica le stesse regole analitiche in modo coerente su molti eventi.",
      ],
    },
    {
      id: "probabilities-not-certainties",
      heading: "L'IA prevede probabilità, non certezze",
      paragraphs: [
        "Un modello sportivo ben progettato dovrebbe solitamente essere concepito come uno strumento che stima le probabilità piuttosto che dichiarare esiti certi.",
        "Se un modello assegna a una squadra una probabilità del 60% di vincere, ciò implica comunque una probabilità del 40% che la squadra non vinca secondo le ipotesi del modello.",
        "Una previsione corretta al 60% dovrebbe quindi perdere regolarmente. I risultati perdenti non dimostrano automaticamente che il modello ha fallito; la domanda importante è se gli eventi a cui sono state assegnate probabilità simili si verifichino alla frequenza approssimativamente attesa su un campione sufficientemente grande.",
        "Questo è il motivo per cui le probabilità calibrate sono più informative di etichette come 'sicura', 'sicurezza' o 'garantita'."
      ],
      callout: {
        title: "Il 60% significa ancora incertezza",
        body:
          "Una stima di probabilità dovrebbe comunicare quanto incerto rimanga il risultato, senza nascondere tale incertezza dietro a un'etichetta sicura.",
        tone: "warning",
      },
    },
    {
      id: "calibration",
      heading: "Perché la calibrazione è importante",
      paragraphs: [
        "La calibrazione misura se le probabilità predette corrispondono alle frequenze osservate.",
        "Se un modello etichetta molti eventi comparabili come al 70%, circa il 70% di tali eventi dovrebbe verificarsi su un campione sufficientemente ampio e appropriato se il modello è ben calibrato.",
        "Un modello può avere un tasso di successo elevato ed essere comunque scarsamente calibrato se le sue probabilità sono sistematicamente troppo estreme o troppo prudenti.",
        "La calibrazione è particolarmente importante per l'analisi del valore poiché il valore atteso dipende direttamente dalla stima di probabilità. Un modello eccessivamente sicuro di sé può fabbricare margini apparenti che non esistono."
      ],
      bullets: [
        "Traccia i risultati per intervallo di probabilità predetta.",
        "Confronta le frequenze predette con le frequenze osservate.",
        "Verifica la calibrazione su diversi sport e tipi di mercato.",
        "Evita di dare per scontato che un risultato di calibrazione si applicse ugualmente a ogni mercato.",
      ],
    },
    {
      id: "data-quality",
      heading: "L'IA vale tanto quanto i suoi dati",
      paragraphs: [
        "La qualità del modello dipende fortemente dalla qualità degli input. Dati mancanti, obsoleti, errati o distorti possono falsificare la previsione anche quando l'algoritmo in sé è sofisticato.",
        "I dati sportivi cambiano rapidamente. Infortuni, formazioni iniziali, trasferimenti, cambi di allenatore, viaggi, condizioni meteorologiche, squalifiche e la congestione del calendario possono rendere le informazioni meno recenti meno rilevanti.",
        "I dati storici possono anche contenere cambiamenti strutturali. Le prestazioni di una squadra sotto la guida di un precedente allenatore o con una rosa diversa potrebbero non rappresentare il suo livello attuale.",
        "Un sistema di intelligenza artificiale responsabile dovrebbe quindi considerare la freschezza e la copertura dei dati come parte dell'incertezza, anziché dare per scontato che ogni input sia ugualmente affidabile."
      ],
      callout: {
        title: "Spazzatura in entrata, spazzatura in uscita",
        body:
          "Un modello complesso non può recuperare informazioni mancanti, errate o fondamentalmente non rappresentative.",
        tone: "warning",
      },
    },
    {
      id: "unknown-future-events",
      heading: "Cosa l'intelligenza artificiale non può sapere prima che accada",
      paragraphs: [
        "Molti eventi sportivi decisivi sono intrinsecamente impossibili da conoscere prima della partita.",
        "Un sistema di intelligenza artificiale non può sapere che un difensore verrà espulso al 12° minuto, che un portiere commetterà un errore insolito, che un giocatore chiave si infortunerà durante il riscaldamento o che la decisione di un arbitro cambierà la partita.",
        "A volte può stimare la probabilità di categorie di eventi, come il rischio di infortuni o la frequenza di cartellini rossi, ma non può identificare con certezza l'esatto evento futuro.",
        "Questa incertezza irriducibile è uno dei motivi per cui nessun modello di previsione può garantire i risultati."
      ],
      bullets: [
        "Infortuni imprevisti.",
        "Cartellini rossi ed episodi arbitrali insoliti.",
        "Deviazioni ed errori individuali.",
        "Improvvisi cambiamenti tattici.",
        "Modifiche dell'ultima ora alla formazione non ancora pubblicate.",
        "Variazioni meteorologiche non presenti nei dati.",
        "Eventi rari che sono difficili da modellare a partire da campioni storici.",
      ],
    },
    {
      id: "randomness",
      heading: "Gli sport contengono una vera casualità",
      paragraphs: [
        "Non ogni differenza tra previsione e risultato è un fallimento del modello. Gli sport includono una genuina casualità.",
        "Una squadra di calcio può dominare i gol attesi e perdere 1-0. Una squadra di pallacanestro può generare buoni tiri e sbagarli. Una partita di baseball può cambiare per un rimbalzo insolito. Un incontro di tennis può decidersi su pochi punti ad alta pressione.",
        "I modelli possono stimare le distribuzioni attorno a questi eventi, ma non possono eliminare la casualità dai risultati.",
        "Ecco perché valutare l'IA in base alla vittoria di una singola scelta è statisticamente debole."
      ],
    },
    {
      id: "market-information",
      heading: "Perché l'IA non dovrebbe ignorare il mercato delle scommesse",
      paragraphs: [
        "I prezzi dei bookmaker e dei mercati di scambio aggregano informazioni provenienti da modelli, trader, scommettitori e fonti di notizie. Non sono perfetti, ma sono informativi.",
        "Un sistema di intelligenza artificiale che ignora completamente i prezzi di mercato potrebbe perdere informazioni che altri partecipanti hanno già incorporato.",
        "Un approccio più utile consiste nel confrontare la stima di probabilità del modello con la probabilità implicita del mercato. Tale confronto crea la base per l'analisi del valore.",
        "Se il modello è in forte disaccordo con il mercato, il disaccordo potrebbe rappresentare un'opportunità, ma potrebbe anche indicare che al modello mancano informazioni. Grandi differenze meritano un'indagine approfondita, non una fiducia automatica."
      ],
      callout: {
        title: "Il disaccordo può significare vantaggio o errore",
        body:
          "Un divario tra modello e mercato merita di essere esaminato, ma il modello non dovrebbe presumere automaticamente che il mercato abbia torto.",
        tone: "info",
      },
    },
    {
      id: "overfitting",
      heading: "Overfitting (Sovradattamento): Quando un modello impara troppo bene il passato",
      paragraphs: [
        "L'overfitting si verifica quando un modello apprende pattern che si adattano estremamente bene ai dati storici ma non si generalizzano agli eventi futuri.",
        "Un modello può sembrare impressionante nel backtesting catturando rumore, relazioni casuali o caratteristiche che erano rilevanti solo durante un periodo particolare.",
        "Se implementati su nuove partite, tali pattern potrebbero scomparire e le prestazioni potrebbero deteriorarsi.",
        "I test out-of-sample, la validazione basata sul tempo, la regolarizzazione e la selezione prudente del modello aiutano a ridurre l'overfitting, ma nessun test elimina completamente il rischio."
      ],
      bullets: [
        "Separare i dati di addestramento e di valutazione.",
        "Preferire la validazione basata sul tempo per i dati sportivi di serie temporali.",
        "Evita di scegliere i modelli solo perché massimizzano il profitto storico.",
        "Verifica se le prestazioni persistono attraverso diverse stagioni e condizioni di mercato.",
      ],
    },
    {
      id: "data-leakage",
      heading: "La fuga di dati può creare backtest irrealistici",
      paragraphs: [
        "La fuga di dati si verifica quando informazioni che non sarebbero state note al momento della previsione entrano accidentalmente nell'addestramento o nella valutazione del modello.",
        "Ad esempio, l'uso dei prezzi di chiusura per valutare una previsione che presumibilmente è avvenuta ore prima può introdurre informazioni di mercato future. L'uso di statistiche post-partita nelle caratteristiche è una forma ancora più evidente di fuga di dati.",
        "La fuga di dati può far apparire un modello molto più accurato di quanto sarebbe nell'uso nel mondo reale.",
        "Una valutazione affidabile deve ricreare quali informazioni fossero effettivamente disponibili nel momento in cui la previsione sarebbe stata fatta."
      ],
      callout: {
        title: "I backtest devono rispettare il fattore tempo",
        body:
          "Se il modello vede informazioni dal futuro, la prestazione storica non è una stima realistica della prestazione in tempo reale.",
        tone: "warning",
      },
    },
    {
      id: "concept-drift",
      heading: "I modelli sportivi possono diventare obsoleti",
      paragraphs: [
        "Le relazioniapprese da un modello possono cambiare nel tempo. Questo fenomeno viene talvolta chiamato drift dei concetti.",
        "Modifiche alle regole, tendenze tattiche, composizione dei roster, formati dei calendari, attrezzature, standard di arbitraggio e comportamento del mercato possono tutti modificare l'ambiente statistico.",
        "Un modello addestrato su diverse stagioni passate può quindi diventare meno rappresentativo dello sport attuale.",
        "Il monitoraggio continuo e il nuovo addestramento possono essere d'aiuto, ma gli aggiornamenti devono essere validati con attenzione poiché reagire troppo rapidamente ai risultati recenti può creare un'altra forma di overfitting."
      ],
    },
    {
      id: "language-models",
      heading: "Cosa aggiungono i modelli linguistici — e dove possono fallire",
      paragraphs: [
        "I modelli linguistici di grandi dimensioni sono utili per trasformare dati strutturati e informazioni contestuali in un'analisi leggibile. Possono riassumere il contesto di un incontro, spiegare le probabilità, identificare fattori rilevanti e rendere più semplice l'ispezione di informazioni complesse.",
        "Tuttavia, i modelli linguistici possono avere allucinazioni: possono produrre informazioni che sembrano plausibili ma che sono errate, non supportate o inventate.",
        "Possono anche sovrastimare la confidenza o creare una narrazione coerente attorno a dati rumorosi. Un linguaggio fluente non deve quindi essere confuso con l'accuratezza predittiva.",
        "Quando i modelli linguistici vengono utilizzati in un flusso di analisi delle scommesse, i campi numerici importanti dovrebbero essere validati, delimitati, verificati incrociatamente o calcolati indipendentemente ove possibile."
      ],
      callout: {
        title: "Fluente non è sinonimo di fattuale",
        body:
          "Una spiegazione convincente dell'IA può contenere errori. Gli output numerici e fattuali dovrebbero essere validati rispetto a dati affidabili.",
        tone: "warning",
      },
    },
    {
      id: "explainability",
      heading: "Perché la spiegabilità è utile",
      paragraphs: [
        "La sola probabilità può essere difficile da cui dipendere o da contestare. Le spiegazioni aiutano gli utenti a capire quali informazioni hanno contribuito alla visione di un modello.",
        "Spiegazioni utili possono evidenziare infortuni, stato di forma, movimento di mercato, dati sui testa a testa o incertezza. Rendono più facile identificare quando un modello potrebbe basarsi su presupposti deboli o obsoleti.",
        "La spiegabilità non dimostra che il modello sia corretto. Una spiegazione può essere persuasiva anche quando la stima sottostante è errata.",
        "Il suo valore reale è l'auditabilità: utenti e sviluppatori possono esaminare il ragionamento e identificare ipotesi che meritano ulteriori verifiche."
      ],
    },
    {
      id: "ai-vs-human",
      heading: "Analisi IA vs Umano",
      paragraphs: [
        "L'IA e gli analisti umani hanno punti di forza diversi.",
        "L'IA può elaborare più dati, applicare calcoli in modo coerente ed evitare alcuni bias emotivi. Gli umani possono comprendere il contesto che può essere difficile da codificare, notare problemi di qualità dei dati, mettere in discussione output insoliti e riconoscere quando un modello sta operando al di fuori di condizioni familiari.",
        "Tuttavia, anche il giudizio umano è soggetto a bias. I tifosi possono sopravvalutare le squadre preferite, inseguire la forma recente o interpretare selettivamente le prove.",
        "Un flusso di lavoro efficace utilizza l'IA per strutturare le informazioni e gli esseri umani per contestare le ipotesi, anziché trattare una delle due parti come infallibile."
      ],
      bullets: [
        "Punto di forza dell'IA: scala e coerenza.",
        "Punto di debolezza dell'IA: dipendenza dai dati e dalle ipotesi del modello.",
        "Punto di forza umano: giudizio contestuale e rilevamento di anomalie.",
        "Punto di debolezza umano: emozione, memoria selettiva e bias cognitivo.",
      ],
    },
    {
      id: "value-analysis",
      heading: "Come l'IA può supportare l'analisi del valore",
      paragraphs: [
        "Un pratico utilizzo dell'IA è il confronto tra una probabilità stimata e la probabilità di pareggio implicita nelle quote disponibili.",
        "Supponiamo che un modello stimi una selezione al 54% e che un bookmaker offra quote di 2.00, che implicano una probabilità di pareggio del 50%. Secondo la stima del modello, il prezzo ha un valore atteso teorico positivo.",
        "Ma la conclusione dipende interamente dalla stima del 54%. Se la vera probabilità è del 49%, lo stesso prezzo non è attraente.",
        "L'IA può quindi identificare potenziali relazioni di valore, ma l'output deve essere interpretato tenendo conto dell'incertezza del modello, del contesto di mercato e della qualità dei dati."
      ],
      callout: {
        title: "L'IA può stimare il margine di vantaggio, non garantirlo",
        body:
          "Un calcolo del valore può essere matematicamente corretto mentre la stima della probabilità sottostante è errata.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal",
      heading: "Come MatchSignal utilizza l'IA",
      paragraphs: [
        "MatchSignal combina le attuali quote dei bookmaker con il contesto della partita generato dall'IA e l'analisi basata sulla probabilità. La piattaforma utilizza campi strutturati come Probabilità Equa, Margine di Valore, Livello di Rischio, Media di Mercato, Migliori Quote e Book Campionati per rendere più facile l'ispezione della relazione tra i prezzi di mercato e le stime analitiche.",
        "La Probabilità Equa è una stima piuttosto che una dichiarazione di certezza. Il Margine di Valore descrive la relazione tra tale valutazione di probabilità e i prezzi disponibili. Il Livello di Rischio fornisce un contesto di rischio comparativo piuttosto che una garanzia di successo.",
        "Il sistema è progettato per utilizzare le informazioni di mercato insieme all'analisi dell'IA anziché chiedere all'IA di prevedere i risultati in isolamento.",
        "MatchSignal va quindi inteso come una piattaforma di supporto alle decisioni. Il suo ruolo è organizzare le informazioni di mercato e analitiche, non promettere scommesse vincenti."
      ],
      callout: {
        title: "Alimentato dall'IA non significa risultato garantito",
        body:
          "MatchSignal utilizza l'intelligenza artificiale per supportare un'analisi strutturata. L'incertezza dello sport, l'errore del modello e il movimento del mercato rimangono presenti.",
        tone: "info",
      },
    },
    {
      id: "what-ai-cannot-do",
      heading: "Cosa l'IA non può fare in modo affidabile",
      paragraphs: [
        "Alcune affermazioni sulle previsioni sportive basate sull'IA vanno oltre ciò che i modelli probabilistici possono realisticamente sostenere.",
        "L'IA non può garantire profitti, conoscere ogni infortunio futuro, eliminare la varianza, rendere impossibile una serie di sconfitte o produrre una vera probabilità perfetta per ogni incontro.",
        "Inoltre, non può rendere appetibili quote sfavorevoli semplicemente prevedendo la stessa squadra con maggiore sicurezza. Il prezzo rimane parte della decisione.",
        "Qualsiasi piattaforma che suggerisca che l'IA rimuova l'incertezza dalle scommesse dovrebbe essere trattata con scetticismo."
      ],
      bullets: [
        "Garantire scommesse vincenti.",
        "Garantire profitto a lungo termine.",
        "Prevedere ogni infortunio o cartellino rosso.",
        "Eliminare la varianza.",
        "Conoscere informazioni che non si sono ancora verificate o osservate.",
        "Trasformare un prezzo svantaggioso in un prezzo favorevole solo tramite la fiducia.",
        "Eliminare la necessità di controlli sul bankroll e sul gioco responsabile.",
      ],
    },
    {
      id: "evaluation",
      heading: "Come valutare un modello di scommesse basato sull'IA",
      paragraphs: [
        "Una valutazione utile va oltre la percentuale di vincita principale.",
        "Verifica la calibrazione, le prestazioni fuori campione, le quote medie, il tipo di mercato, la dimensione del campione, la qualità dei prezzi, la stabilità del modello e se il test ha utilizzato informazioni che sarebbero state effettivamente disponibili in tempo reale.",
        "Ispeziona anche le modalità di fallimento. Il modello si comporta male nei mercati a bassa liquidità? L'accuratezza diminuisce quando la presenza di giocatori chiave è incerta? Diventa eccessivamente sicuro sui favoriti?",
        "Una valutazione trasparente del modello dovrebbe rendere visibili i punti deboli anziché evidenziare solo il periodo con le performance migliori."
      ],
      bullets: [
        "Calibrazione della probabilità.",
        "Test fuori campione.",
        "Validazione basata sul tempo.",
        "Dimensione del campione.",
        "Quote medie e tassi di pareggio.",
        "Performance per sport e mercato.",
        "Freschezza dei dati.",
        "Sensibilità alle informazioni mancanti.",
        "Confronto con i benchmark di mercato.",
      ],
    },
    {
      id: "checklist",
      heading: "Una checklist pratica per l'utilizzo dell'analisi di scommesse basata sull'intelligenza artificiale",
      paragraphs: [
        "L'intelligenza artificiale è più utile quando diventa parte di un processo strutturato anziché l'autorità finale."
      ],
      bullets: [
        "Verifica su quali dati si basa l'analisi dell'intelligenza artificiale.",
        "Tratta la probabilità come una stima, non come una certezza.",
        "Confronta la stima con le quote di mercato attuali.",
        "Verifica se le informazioni importanti sulla squadra o sul giocatore sono aggiornate.",
        "Mantieni un atteggiamento scettico di fronte a disaccordi insolitamente ampi tra il modello e il mercato.",
        "Non fidarti di un'affermazione solo perché la spiegazione sembra sicura.",
        "Considera la calibrazione e le prestazioni storiche fuori campione.",
        "Ricalcola il valore se il prezzo di mercato si muove.",
        "Mantieni il dimensionamento della puntata separato dalle etichette di confidenza dell'IA.",
        "Non interpretare mai l'output dell'IA come una garanzia di profitto.",
      ],
    },
  ],
  relatedGuides: [
    "matchsignal-value-edge",
    "expected-value-sports-betting",
    "implied-probability",
    "why-betting-odds-move",
    "cognitive-biases-sports-betting",
    "confirmation-bias-betting",
  ],
  responsibleGamblingNote:
    "L'IA può supportare l'analisi sportiva, ma non può garantire risultati o profitti. Le stime del modello possono essere errate, i dati possono essere incompleti e i risultati sportivi rimangono incerti. Non aumentare le puntate perché l'output di un'IA appare sicuro. Mantieni le scommesse entro limiti prestabiliti di spesa, perdita e tempo, scommetti solo somme che puoi permetterti di perdere e non inseguire mai le perdite.",
};

export default guide;
