import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bookmaker-margin-overround",
  locale: "it",
  title: "Che cos'è il margine del bookmaker / overround?",
  category: "odds-probability",
  status: "published",
  description:
    "Scopri cosa significano margine del bookmaker e overround, come calcolarli dalle quote di scommessa, perché le probabilità implicite spesso superano il 100% e in che modo il margine influisce sul confronto dei prezzi e sull'analisi del valore.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Il margine del bookmaker, spesso chiamato overround o vig, è il cuscinetto di prezzo integrato in molti mercati di scommesse. Se ogni esito in un mercato perfettamente equo venisse convertito in probabilità, le probabilità sommerebbero al 100%. Nei mercati reali dei bookmaker, le probabilità implicite derivate dalle quote quotate spesso superano il 100%. Quell'eccesso è l'overround. Comprenderlo è importante perché le probabilità grezze del bookmaker non sono automaticamente probabilità eque e due bookmaker possono esprimere opinioni simili su un evento offrendo prezzi materialmente diversi.",
  keyTakeaways: [
    "L'overround è la misura in cui le probabilità implicite grezze di tutti i risultati mutualmente esclusivi superano il 100%.",
    "Un mercato a due vie quotato a 1.91 su entrambi i lati implica circa il 104.72% in totale, corrispondente a un overround di circa 4.72 punti percentuali.",
    "La probabilità implicita grezza del bookmaker è un numero derivato dal prezzo, non automaticamente una stima di probabilità equa.",
    "Un overround inferiore significa generalmente prezzi più competitivi, a parità di condizioni.",
    "Il margine potrebbe non essere distribuito uniformemente su tutti i risultati, quindi la semplice normalizzazione proporzionale è solo un'approssimazione.",
    "Le quote effettive disponibili per l'utente determinano la probabilità di pareggio e rimangono quindi centrali per l'analisi del valore atteso.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Cosa significa il margine del bookmaker",
      paragraphs: [
        "Un bookmaker normalmente non crea un mercato semplicemente pubblicando probabilità perfettamente eque. Invece, i prezzi vengono solitamente impostati in modo che le probabilità implicite combinate superino il 100%. L'eccesso al di sopra del 100% è comunemente chiamato overround, margine del bookmaker o vig.",
        "Ad esempio, immagina un evento teorico a due esiti in cui entrambi i lati sono offerti a quota decimale 1.91. Ogni prezzo implica una probabilità di circa il 52.36%. La somma dei due dà circa il 104.72%. L'importo superiore al 100%, circa 4.72 punti percentuali, è l'overround del mercato.",
        "Questo non significa che il bookmaker abbia la garanzia di guadagnare esattamente il 4,72% su ogni mercato. I risultati reali, la distribuzione delle scommesse, i movimenti delle quote, l'attività promozionale, i limiti, le decisioni di trading e il comportamento dei clienti influenzano tutti i risultati effettivi. L'overround va inteso al meglio come una proprietà della struttura delle quote quotate piuttosto che come un tasso di profitto garantito."
      ],
      callout: {
        title: "Struttura delle quote, non profitto garantito",
        body:
          "L'overround descrive come viene prezzato un mercato. Non deve essere interpretato come il profitto garantito del bookmaker su un singolo evento.",
        tone: "warning",
      },
    },
    {
      id: "calculation",
      heading: "Come calcolare l'overround dalle quote decimali",
      paragraphs: [
        "Il calcolo inizia convertendo le quote decimali di ciascun esito in probabilità implicita. Per le quote decimali, la probabilità implicita è pari a 1 diviso per la quota. Somma le probabilità implicite per tutti gli esiti reciprocamente esclusivi nel mercato.",
        "Se il totale è il 100%, il mercato è matematicamente privo di margine prima di considerare qualsiasi altro fattore pratico. Se il totale è il 105%, l'overround è di 5 punti percentuali. Se il totale è il 108%, l'overround è di 8 punti percentuali.",
        "La formula può essere scritta come: overround = somma di tutte le probabilità implicite grezze − 100%."
      ],
      bullets: [
        "Converti ogni quota decimale usando 1 ÷ quota.",
        "Somma le probabilità implicite per tutti gli esiti reciprocamente esclusivi.",
        "Sottrai 100 punti percentuali dal totale.",
        "L'importo rimanente è l'overround di mercato quotato.",
      ],
      callout: {
        title: "Semplice esempio",
        body:
          "A 1,91 e 1,91, ciascuna parte implica circa il 52,36%. Il totale è circa il 104,72%, quindi l'overround è di circa 4,72 punti percentuali.",
        tone: "example",
      },
    },
    {
      id: "three-way",
      heading: "L'overround in un mercato calcistico a tre esiti",
      paragraphs: [
        "I mercati calcistici a tre esiti forniscono un utile esempio perché la vittoria in casa, il pareggio e la vittoria in trasferta sono risultati mutualmente esclusivi. Supponiamo che le quote siano 2,10 per la squadra di casa, 3,40 per il pareggio e 3,60 per la squadra in trasferta.",
        "Le probabilità implicite sono approssimativamente 47,62%, 29,41% e 27,78%. Sommate insieme, totalizzano circa il 104,81%. L'overround risultante è quindi di circa 4,81 punti percentuali.",
        "Le tre quote non implicano che l'evento abbia in qualche modo una probabilità totale del 104,81% nella realtà. L'eccesso compare perché le quote offerte includono il margine e altre considerazioni di trading."
      ],
      bullets: [
        "Casa 2,10 → approssimativamente 47,62%",
        "Pareggio 3,40 → approssimativamente 29,41%",
        "Trasferta 3,60 → approssimativamente 27,78%",
        "Totale → approssimativamente 104,81%",
        "Overround → approssimativamente 4,81 punti percentuali",
      ],
    },
    {
      id: "raw-vs-fair",
      heading: "Probabilità implicita grezza rispetto a probabilità equa",
      paragraphs: [
        "Una probabilità implicita grezza deriva direttamente da una quota offerta. Se un bookmaker offre quote decimali di 2,00, la probabilità implicita grezza è del 50%. Quel numero descrive la soglia di pareggio incorporata nella quota disponibile.",
        "Una stima di probabilità equa o senza margine è diversa. Essa tenta di rimuovere l'effetto dell'aggio del mercato in modo che le probabilità tra esiti reciprocamente esclusivi sommino al 100%.",
        "Questa distinzione è importante perché definire ogni probabilità grezza del bookmaker come probabilità equa può esagerare l'apparente confidenza del mercato. In un mercato che totalizza il 105%, le probabilità implicite grezze del bookmaker descrivono collettivamente più del 100% di probabilità, il che è impossibile per esiti mutualmente esclusivi ed esaustivi."
      ],
      callout: {
        title: "Non mescolare i due concetti",
        body:
          "La probabilità implicita grezza deriva dalla quota che puoi effettivamente accettare. La probabilità equa è una stima analitica dopo aver effettuato l'aggiustamento per il margine.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Un modo semplice per rimuovere l'aggio",
      paragraphs: [
        "Un modo comune per stimare le probabilità senza margine è la normalizzazione proporzionale. Dividi ciascuna probabilità implicita grezza per la somma di tutte le probabilità implicite grezze. Le probabilità aggiustate sommeranno quindi al 100%.",
        "Supponiamo che un mercato a due vie abbia probabilità implicite grezze del 55% e del 50%, per un totale del 105%. La normalizzazione proporzionale dà circa il 52.38% per la prima parte e il 47.62% per la seconda.",
        "Questo metodo è semplice e utile per il confronto di mercato, ma presuppone che il margine sia distribuito in modo proporzionale tra gli esiti. Nei mercati reali, tale presupposto potrebbe non essere perfetto. I bookmakers possono variare le quote in modo diverso a seconda della domanda prevista, delle informazioni, dell'esposizione, della profondità del mercato o delle caratteristiche dei singoli esiti.",
        "Per questo motivo, una probabilità normalizzata dovrebbe essere descritta come una stima di mercato senza margine anziché come la probabilità oggettivamente vera dell'evento."
      ],
      bullets: [
        "Probabilità grezze: 55% e 50%.",
        "Totale di mercato: 105%.",
        "Prima parte normalizzata: 55 ÷ 105 ≈ 52.38%.",
        "Secondo lato normalizzato: 50 ÷ 105 ≈ 47,62%.",
        "Totale normalizzato: 100%.",
      ],
      callout: {
        title: "La normalizzazione è una stima",
        body:
          "Rimuovere l'aggio matematicamente non rivela una vera probabilità perfetta. Crea un parametro di riferimento basato sul mercato più pulito.",
        tone: "info",
      },
    },
    {
      id: "uneven-margin",
      heading: "Perché il margine non viene sempre distribuito in modo uniforme",
      paragraphs: [
        "È allettante immaginare che un bookmaker aggiunga semplicemente la stessa percentuale di margine a ogni selezione. La creazione di mercati reali è spesso più complessa. Alcuni esiti possono attrarre una maggiore domanda pubblica, alcuni possono essere più difficili da prezzare e alcuni mercati possono avere una minore liquidità o una maggiore incertezza.",
        "Un bookmaker può quindi penalizzare un lato in modo più aggressivo rispetto a un altro. Nei mercati con quote alte, la relazione può diventare particolarmente disomogenea: gli esiti con quote elevate possono comportare un margine effettivo diverso rispetto ai favoriti con quota bassa.",
        "Questo è uno dei motivi per cui i calcoli proporzionali senza aggio non devono essere trattati come probabilità eque esatte. Esistono metodi di rimozione del margine più avanzati, ma tutti si basano su ipotesi relative a come viene distribuito l'aggio."
      ],
      callout: {
        title: "L'aggio non è necessariamente simmetrico",
        body:
          "Due esiti possono contribuire in modo diverso al margine totale di un bookmaker. Un semplice adeguamento proporzionale è utile, ma rimane pur sempre un modello.",
        tone: "warning",
      },
    },
    {
      id: "price-comparison",
      heading: "Perché un margine inferiore di solito significa prezzi migliori",
      paragraphs: [
        "Se due bookmaker hanno valutazioni simili di un evento ma uno opera con un aggio inferiore, il mercato a margine inferiore offrirà generalmente prezzi più competitivi allo scommettitore.",
        "Considera due semplici mercati bidirezionali. Il bookmaker A quota entrambi i lati a 1,91, producendo un aggio (overround) di circa il 4,72%. Il bookmaker B quota entrambi i lati a 1,96, producendo una probabilità implicita totale di circa il 102,04% e un aggio di circa il 2,04%.",
        "Per una scommessa vincente di un'unità, 1,96 rende più di 1,91. Ancora più importante, la quota più alta riduce la probabilità di pareggio (break-even) da circa il 52,36% a circa il 51,02%. Questa differenza può incidere materialmente sul valore atteso (expected value) nel corso di scommesse ripetute.",
        "Questo è il motivo per cui confrontare le quote correnti tra mercati equivalenti può essere utile anche senza formulare una previsione migliore. L'evento sottostante rimane invariato, ma la quota disponibile può migliorare."
      ],
      bullets: [
        "1,91 / 1,91 → aggio di circa il 4,72%.",
        "1,96 / 1,96 → aggio di circa il 2,04%.",
        "Quote equivalenti più alte riducono la probabilità di pareggio richiesta.",
        "Conferma sempre che le regole del mercato e le condizioni di refertazione siano comparabili.",
      ],
    },
    {
      id: "margin-and-ev",
      heading: "In che modo il margine del bookmaker influisce sul valore atteso",
      paragraphs: [
        "Il valore atteso dipende dalla probabilità di un esito e dalla quota effettiva disponibile. Poiché il margine del bookmaker generalmente accorcia le quote rispetto a un mercato teorico senza margine, il margine innalza la percentuale di successo richiesta per andare in pareggio.",
        "Supponi di stimare un esito al 52%. Con quote decimali di 2,00, l'EV teorico è 0,52 × 2,00 − 1 = +4%. A 1,90, l'EV diventa 0,52 × 1,90 − 1 = −1,2%. La stima della probabilità rimane invariata, ma la quota più bassa modifica la conclusione.",
        "Ciò dimostra perché una buona previsione non sia sufficiente di per sé. La quota determina se la stima della probabilità si traduce in un valore atteso positivo, neutro o negativo."
      ],
      callout: {
        title: "Il margine modifica la soglia",
        body:
          "Una quota più bassa richiede una percentuale di vincita più elevata per raggiungere il pareggio. Per questo motivo, la qualità della quota è importante indipendentemente dalla qualità della previsione.",
        tone: "info",
      },
    },
    {
      id: "market-types",
      heading: "Il margine può variare a seconda dello sport e del tipo di mercato",
      paragraphs: [
        "Il margine del bookmaker non è fisso per ogni sport o mercato. Gli eventi principali ad alta liquidità possono avere prezzi relativamente competitivi, mentre i campionati di nicchia, i mercati derivati, le scommesse sui giocatori o gli eventi a bassa liquidità possono presentare margini più ampi.",
        "Anche all'interno della stessa partita, il mercato principale dell'esito finale o del vincente incontro può avere un overround diverso rispetto ai totali, agli handicap, alle scommesse sui giocatori o ai mercati del risultato esatto. I mercati con molti esiti possibili possono anche accumulare un overround totale considerevole.",
        "Per questo motivo, confrontare un singolo valore di margine tra tipi di mercato non correlati può essere fuorviante. Il confronto più utile avviene solitamente tra i bookmaker che quotano lo stesso mercato sullo stesso evento approssimativamente nello stesso momento."
      ],
    },
    {
      id: "changing-margin",
      heading: "Perché l'overround può cambiare prima di una partita",
      paragraphs: [
        "I mercati sono dinamici. Man mano che una partita si avvicina, potrebbero arrivare nuove informazioni, la liquidità potrebbe aumentare, i bookmaker concorrenti potrebbero modificare i prezzi e i bookmaker potrebbero alterare la loro esposizione al rischio. L'overround totale del mercato può quindi variare nel tempo.",
        "In alcuni eventi di alto profilo, i prezzi potrebbero diventare più competitivi man mano che il mercato matura. In altre situazioni, l'incertezza o decisioni operative possono portare a prezzi più ampi. Non esiste una regola universale secondo cui il margine debba necessariamente diminuire all'avvicinarsi del fischio d'inizio.",
        "Il calcolo di un margine è quindi un'istantanea basata sui prezzi utilizzati in quel momento. L'overround storico e l'overround attuale non devono essere considerati intercambiabili."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Errori comuni nell'interpretazione del margine del bookmaker",
      paragraphs: [
        "Un errore comune è considerare l'overround come il profitto percentuale garantito del bookmaker. Non lo è. Un altro è presumere che le probabilità implicite grezze siano probabilità eque. Si tratta di soglie di pareggio derivate dai prezzi e comunemente includono il margine.",
        "Un terzo errore consiste nel confrontare l'overround tra mercati con strutture di esito differenti senza un contesto. Un mercato di una partita a tre vie, un mercato di totali a due vie e un mercato di risultato esatto non sono direttamente comparabili semplicemente perché ciascuno produce una singola percentuale di margine.",
        "Infine, la rimozione del margine non elimina l'incertezza. Una stima di mercato senza aggio può comunque essere errata, obsoleta o incompleta. Si tratta di un utile parametro analitico, non di una garanzia della vera distribuzione di probabilità dell'evento."
      ],
      bullets: [
        "Non interpretare l'overround come un profitto garantito del bookmaker.",
        "Non definire automaticamente eque le probabilità implicite grezze.",
        "Non dare per scontato che il margine sia distribuito in modo uniforme tra i risultati.",
        "Non confrontare tipi di mercato non correlati senza un contesto.",
        "Non trattare le probabilità senza margine come certe o oggettivamente vere.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Come si inserisce il margine nell'analisi di MatchSignal",
      paragraphs: [
        "MatchSignal confronta le quote dei bookmaker e i dati di mercato per fornire un contesto attorno alle selezioni attuali. La media di mercato riassume i prezzi di mercato campionati, mentre la probabilità equa è una stima di probabilità analitica piuttosto che una percentuale implicita grezza del bookmaker.",
        "Il vantaggio di valore (Value Edge) intende descrivere la relazione tra il prezzo di mercato disponibile e la valutazione basata sulla probabilità di MatchSignal. Poiché i prezzi dei bookmaker possono includere un margine, un'analisi utile dovrebbe distinguere tra il prezzo grezzo disponibile per l'utente e qualsiasi stima di probabilità basata su modelli o senza margine.",
        "I bookmaker campionati indicano quante fonti di bookmaker hanno contribuito al campione di mercato pertinente. Un campione più ampio può fornire maggiore contesto sui prezzi di mercato, ma non elimina l'incertezza né garantisce che la stima risultante sia corretta.",
        "Le quote migliori riflettono il prezzo partner disponibile più forte identificato per la selezione visualizzata. Poiché il prezzo di esecuzione effettivo determina la probabilità di pareggio (break-even), anche una modesta differenza tra i bookmaker può influenzare il calcolo del valore."
      ],
      callout: {
        title: "Il prezzo di mercato e la probabilità analitica sono diversi",
        body:
          "MatchSignal separa i prezzi disponibili dall'analisi basata sulla probabilità in modo che gli utenti possano esaminare la relazione anziché trattare le quote dei bookmaker come una certezza.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Una checklist pratica sull'overround",
      paragraphs: [
        "Quando si esamina il margine del bookmaker, utilizzare la sequenza seguente per evitare gli errori di interpretazione più comuni."
      ],
      bullets: [
        "Identificare tutti i risultati mutualmente esclusivi in quel preciso mercato.",
        "Convertire ogni quota decimale quotata in probabilità implicita.",
        "Sommare le probabilità implicite grezze.",
        "Sottrarre il 100% per calcolare l'overround del mercato.",
        "Se necessario, normalizzare le probabilità per creare un semplice punto di riferimento senza margine.",
        "Ricordare che la normalizzazione proporzionale è un'ipotesi, non una verità assoluta.",
        "Confrontare mercati equivalenti tra diversi bookmaker in momenti simili.",
        "Utilizzare le quote effettivamente disponibili quando si calcolano la probabilità di pareggio e il valore atteso (EV).",
        "Trattare un overround inferiore come un vantaggio di prezzo, non come una garanzia di previsioni migliori.",
      ],
    },
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "implied-probability",
    "expected-value-sports-betting",
    "how-to-compare-betting-odds",
    "why-betting-odds-move",
  ],
  responsibleGamblingNote:
    "Comprendere il margine del bookmaker può aiutarvi a valutare i prezzi in modo più chiaro, ma un margine inferiore o quote migliori non eliminano il rischio finanziario delle scommesse. I risultati rimangono incerti, le stime di probabilità possono essere errate e le perdite possono verificarsi anche quando una quota appare favorevole. Scommettete solo importi che potete permettervi di perdere, utilizzate limiti predeterminati e non inseguite mai le perdite.",
};

export default guide;
