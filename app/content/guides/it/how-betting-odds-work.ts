import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "how-betting-odds-work",
  locale: "it",
  title: "Come funzionano realmente le quote delle scommesse",
  category: "odds-probability",
  status: "published",
  description:
    "Scopri cosa rappresentano le quote, come si relazionano alla probabilità, perché i prezzi dei bookmaker includono un margine e come confrontare le quote senza confondere il prezzo con la previsione.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Le quote delle scommesse sono prezzi. Indicano quanto può rendere una scommessa vincente, ma codificano anche la visione del mercato sulla probabilità di un determinato esito. Comprendere entrambi i lati di questa relazione è essenziale: le quote non sono una garanzia e il prezzo più basso non è automaticamente la scommessa migliore. Questa guida spiega le quote decimali, la probabilità implicita, il margine del bookmaker, il movimento del mercato e perché è importante confrontare i prezzi.",
  keyTakeaways: [
    "Le quote decimali mostrano il ritorno totale per unità puntata, inclusa la puntata iniziale.",
    "La probabilità implicita viene calcolata dalle quote decimali come 1 diviso per la quota.",
    "I prezzi dei bookmaker includono solitamente un margine, pertanto le probabilità implicite di tutti gli esiti possono sommare a più del 100%.",
    "Un prezzo più basso indica una probabilità implicita più alta, non un esito certo.",
    "La stessa selezione può avere quote diverse su diversi bookmaker, quindi il confronto dei prezzi influisce direttamente sul potenziale ritorno.",
    "Le quote possono variare man mano che nuove informazioni, l'attività del mercato e la gestione del rischio del bookmaker modificano il prezzo.",
  ],
  sections: [
    {
      id: "odds-are-prices",
      heading: "Le quote delle scommesse sono prezzi, non previsioni",
      paragraphs: [
        "Il modo più semplice per capire le quote delle scommesse è considerarle il prezzo di un esito possibile. In una partita di calcio, un bookmaker può offrire un prezzo per la squadra di casa, un altro per il pareggio e un altro ancora per la squadra in trasferta. Tali prezzi determinano il ritorno se l'esito selezionato risulta vincente.",
        "Le quote contengono anche informazioni sulla probabilità. Un prezzo decimale più basso corrisponde a una probabilità implicita più alta, mentre un prezzo più alto corrisponde a una probabilità implicita più bassa. Ciò non significa che il bookmaker sappia cosa accadrà. Significa che il mercato sta assegnando prezzi diversi a esiti incerti.",
        "Questa distinzione è importante perché una previsione e una quota rispondono a domande diverse. Una previsione chiede quale esito sia più probabile. Una quota chiede quale rendimento viene offerto per correre quel rischio. Una squadra può essere la vincitrice più probabile ed essere comunque poco attraente a una quota sufficientemente bassa."
      ],
      callout: {
        title: "Idea centrale",
        body:
          "Un netto favorito può comunque perdere. Le quote esprimono un prezzo di mercato per l'incertezza; non eliminano l'incertezza.",
        tone: "info",
      },
    },
    {
      id: "decimal-odds",
      heading: "Come funzionano le quote decimali",
      paragraphs: [
        "MatchSignal utilizza le quote decimali perché rendono semplici i rendimenti e la conversione delle probabilità. Le quote decimali mostrano l'importo totale restituito per ogni unità puntata in caso di vincita della scommessa. Il rendimento totale include la puntata originale.",
        "Ad esempio, con quote decimali di 2.00, una puntata di 10 unità restituisce 20 unità in caso di successo: 10 unità di profitto più la puntata originale di 10 unità. A quota 1.50, la stessa puntata di 10 unità restituisce 15 unità in totale. A quota 3.00, restituisce 30 unità.",
        "La relazione di base è semplice: il rendimento totale è uguale alla puntata moltiplicata per la quota decimale. Il profitto è uguale al rendimento totale meno la puntata originale."
      ],
      bullets: [
        "10 unità a 1.50 → 15 unità di rendimento totale, 5 unità di profitto.",
        "10 unità a 2.00 → 20 unità di rendimento totale, 10 unità di profitto.",
        "10 unità a 3.00 → 30 unità di rendimento totale, 20 unità di profitto.",
      ],
      callout: {
        title: "Esempio",
        body:
          "Quote più alte aumentano il potenziale rendimento, ma normalmente corrispondono a esiti che il mercato considera meno probabili.",
        tone: "example",
      },
    },
    {
      id: "implied-probability",
      heading: "Trasformare le quote in probabilità implicita",
      paragraphs: [
        "Le quote decimali possono essere convertite in probabilità implicita con una semplice formula: probabilità implicita = 1 ÷ quota decimale. Moltiplica il risultato per 100 per esprimerlo come percentuale.",
        "Quota di 2.00 implica il 50%. Quota di 1.50 implica circa il 66,7%. Quota di 4.00 implica il 25%. Questo offre una scala di probabilità comune per confrontare prezzi che inizialmente potrebbero sembrare molto diversi.",
        "Tuttavia, la probabilità implicita del bookmaker non è la stessa cosa di una probabilità oggettiva precisa. Il prezzo può includere un margine del bookmaker, reagire alla domanda di mercato o cambiare man mano che diventano disponibili nuove informazioni. È meglio intenderla come la probabilità incorporata nel prezzo quotato."
      ],
      bullets: [
        "1.50 → 1 ÷ 1.50 = 66,7%",
        "2.00 → 1 ÷ 2.00 = 50,0%",
        "2.50 → 1 ÷ 2.50 = 40,0%",
        "4.00 → 1 ÷ 4.00 = 25,0%",
      ],
      callout: {
        title: "Non interpretare il 66,7% come certezza",
        body:
          "Una probabilità implicita è la traduzione di un prezzo. I risultati sportivi del mondo reale rimangono incerti, anche quando il mercato assegna un'alta probabilità.",
        tone: "warning",
      },
    },
    {
      id: "bookmaker-margin",
      heading: "Perché le probabilità possono sommare a più del 100%",
      paragraphs: [
        "Se converti ogni esito in un mercato di un bookmaker in probabilità implicita e li sommi, il totale spesso supererà il 100%. L'importo superiore al 100% è comunemente chiamato margine del bookmaker o overround.",
        "Considera un mercato semplificato a due esiti in cui entrambi i lati sono quotati a 1,91. Ciascun prezzo implica circa il 52,36%. Sommati insieme, il mercato totale è di circa il 104,72%. La differenza tra il 104,72% e il 100% rappresenta l'aggio in quel mercato semplificato.",
        "Il margine significa che le probabilità implicite grezze non sono automaticamente probabilità eque. Gli analisti possono stimare una probabilità senza margine normalizzando le probabilità nell'intero mercato, ma questa rimane una stima basata sui prezzi disponibili piuttosto che una garanzia della vera probabilità di ciascun esito."
      ],
      callout: {
        title: "Perché questo è importante",
        body:
          "Due mercati possono esprimere aspettative simili offrendo margini differenti. Un mercato con margine inferiore offre generalmente agli scommettitori prezzi più competitivi, a parità di condizioni.",
        tone: "info",
      },
    },
    {
      id: "favorite-underdog",
      heading: "Favoriti, Underdog e cosa dice realmente il prezzo",
      paragraphs: [
        "Un favorito è semplicemente l'esito con la quota più bassa nel mercato di riferimento. Un underdog ha una quota più alta. Queste etichette descrivono aspettative di mercato relative, non qualità garantite o risultati definitivi.",
        "Supponiamo che la Squadra A sia offerta a 1,40 e la Squadra B a 7,00 in un mercato che include anche il pareggio. La Squadra A è la favorita perché la sua quota implica una probabilità molto più alta rispetto a quella della Squadra B. Ma stabilire se una quota sia conveniente dipende da come il prezzo offerto si confronta con una stima di probabilità ragionevole.",
        "È qui che l'analisi del valore differisce dalla selezione del vincitore. Scegliere la squadra con maggiori probabilità di vincere non coincide necessariamente con trovare il prezzo più favorevole. Una probabilità del 75% offerta a quote che richiedono un tasso di pareggio dell'80% non rappresenterebbe un valore atteso positivo secondo quella stima di probabilità."
      ],
    },
    {
      id: "compare-odds",
      heading: "Perché confrontare le quote è importante",
      paragraphs: [
        "I bookmaker non offrono sempre prezzi identici. Un operatore può quotare 1,85 mentre un altro quota 1,95 per la stessa selezione e lo stesso mercato. L'evento sottostante non è cambiato, ma il tuo potenziale rendimento sì.",
        "Per una puntata di 100 unità, 1,85 restituisce 185 unità in caso di successo, mentre 1,95 ne restituisce 195. Su un numero elevato di scommesse, accettare ripetutamente prezzi peggiori può ridurre sensibilmente i rendimenti, anche quando le selezioni in sé sono identiche.",
        "Il confronto dei prezzi è quindi uno dei pochi aspetti delle scommesse che non richiede di prevedere la partita con maggiore precisione. Se il mercato, la selezione, le regole di refertazione e la tempistica sono genuinamente comparabili, il prezzo più alto disponibile offre un potenziale rendimento migliore a parità di puntata."
      ],
      callout: {
        title: "Confronta elementi omogenei",
        body:
          "Verifica che la definizione del mercato, la linea, le regole di refertazione e l'evento siano gli stessi prima di considerare due quote quotate come direttamente comparabili.",
        tone: "warning",
      },
    },
    {
      id: "why-odds-move",
      heading: "Perché le quote si muovono prima di una partita",
      paragraphs: [
        "Le quote non sono valutazioni fisse. Possono cambiare dal momento in cui un mercato apre fino alla chiusura delle scommesse. Nuove informazioni sulla squadra, infortuni, formazioni confermate, condizioni meteorologiche, modifiche al calendario, attività di mercato e una più ampia scoperta dei prezzi possono contribuire al movimento.",
        "I bookmaker possono anche aggiustare i prezzi come parte della gestione del rischio o in risposta a movimenti altrove nel mercato. Di conseguenza, il movimento di una quota non rivela sempre una causa semplice. Un prezzo in calo può riflettere nuove informazioni significative, pressione di mercato o una combinazione di fattori.",
        "Questo è il motivo per cui gli screenshot storici di un prezzo non devono essere confusi con la disponibilità attuale. Un'analisi utile dovrebbe identificare il prezzo effettivo in fase di valutazione e, ove possibile, confrontarlo con le alternative di mercato attuali."
      ],
    },
    {
      id: "value-and-break-even",
      heading: "Quote, probabilità di pareggio (break-even) e valore",
      paragraphs: [
        "Ogni prezzo implica una probabilità di pareggio prima di considerare i dettagli della transazione o l'incertezza del modello. Con quote decimali di 2,00, il tasso di pareggio implicito è del 50%. A 1,80, è circa il 55,6%. A 2,50, è il 40%.",
        "Se la tua stima di probabilità è significativamente superiore alla probabilità implicita nel prezzo offerto, la scommessa potrebbe avere un valore atteso positivo secondo tale stima. Se la tua stima è inferiore, il prezzo potrebbe essere sfavorevole. La qualità della conclusione dipende interamente dalla qualità e dalla calibrazione della stima di probabilità.",
        "Ad esempio, se le quote di 2,20 implicano circa il 45,5% e un'analisi stima l'esito al 50%, vi è una differenza teorica positiva tra la probabilità stimata e la probabilità implicita nel mercato. Tale differenza non è una promessa di profitto. Anche un'opportunità a valore atteso positivo correttamente identificata può perdere, e le stime dei modelli possono essere errate."
      ],
      callout: {
        title: "Il valore è probabilistico",
        body:
          "Il valore atteso positivo descrive una relazione stimata a lungo termine tra probabilità e prezzo. Non significa che ci si aspetti che una singola scommessa vinca con certezza.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal-context",
      heading: "Come MatchSignal utilizza le quote",
      paragraphs: [
        "MatchSignal confronta i prezzi disponibili dei bookmaker e i dati di mercato, quindi combina tali informazioni con il contesto della partita generato dall'intelligenza artificiale. Su una scheda di MatchSignal, Migliori quote si riferisce al prezzo partner più forte disponibile identificato per la selezione visualizzata, mentre Media di mercato riassume i prezzi di mercato campionati utilizzati nel confronto.",
        "La probabilità equa è una stima analitica piuttosto che una quota di un bookmaker. Il margine di valore viene utilizzato per descrivere la differenza tra il prezzo di mercato offerto e la valutazione basata sulla probabilità di MatchSignal. I libri campionati indicano quante fonti di bookmaker hanno contribuito al campione di mercato pertinente.",
        "Questi campi sono progettati per rendere più facile l'ispezione del contesto di prezzo. Non devono essere considerati garanzie, consulenza finanziaria o certezze su un risultato sportivo. Le ipotesi del modello, i cambiamenti di mercato, la qualità dei dati e la normale varianza dello sport possono tutti influenzare il risultato."
      ],
    },
    {
      id: "practical-checklist",
      heading: "Una checklist pratica per leggere qualsiasi mercato di scommesse",
      paragraphs: [
        "Quando apri un mercato di scommesse, separa l'analisi in prezzo, probabilità e incertezza. In questo modo si prevengono diversi errori comuni, come dare per scontato che la squadra favorita debba vincere o considerare una vincita potenziale elevata come prova che una scommessa sia attraente."
      ],
      bullets: [
        "Identificare il mercato esatto e la selezione.",
        "Leggi le quote decimali come un prezzo e calcola la probabilità implicita.",
        "Verifica se il mercato contiene il margine del bookmaker.",
        "Confronta la stessa selezione su più scommesse sportive, ove disponibili.",
        "Separa la tua stima di probabilità dalla probabilità quotata dal bookmaker.",
        "Non considerare un movimento di quota come la prova che una parte vincerà.",
        "Considera l'incertezza, la varianza e l'importo della puntata prima di prendere qualsiasi decisione."
      ],
    },
  ],
  relatedGuides: [
    "implied-probability",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "expected-value-sports-betting"
  ],
  responsibleGamblingNote:
    "Le scommesse comportano rischi finanziari e i risultati sono incerti. Le quote e le stime di probabilità non possono garantire un risultato. Utilizza puntate che puoi permetterti di perdere, evita di inseguire le perdite e tratta l'analisi delle scommesse come informazione piuttosto che come una promessa di profitto.",
};

export default guide;
