import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "implied-probability",
  locale: "it",
  title: "Cos'è la Probabilità Implicita?",
  category: "odds-probability",
  status: "published",
  description:
    "Scopri come convertire le quote delle scommesse in probabilità implicita, perché i margini dei bookmaker fanno sì che le probabilità di mercato grezze superino il 100% e come interpretare la probabilità implicita senza confondere il prezzo con la certezza.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "La probabilità implicita è la probabilità codificata da un prezzo di scommessa. Converte le quote in una percentuale, rendendo più facile confrontare prezzi diversi e aiutandoti a vedere il tasso di pareggio associato a una scommessa. Il calcolo è semplice, ma interpretarlo correttamente richiede attenzione: i prezzi dei bookmaker possono includere margine, movimento di mercato e gestione del rischio, quindi la probabilità implicita non dovrebbe essere trattata come una previsione oggettiva o una garanzia.",
  keyTakeaways: [
    "Per le quote decimali, la probabilità implicita è uguale a 1 diviso per la quota, moltiplicato per 100.",
    "Quote decimali di 2,00 implicano il 50%; 1,50 implica circa il 66,7%; 4,00 implica il 25%.",
    "Le probabilità implicite grezze in un mercato di un bookmaker spesso superano il 100% perché i prezzi possono includere il margine del bookmaker.",
    "La probabilità implicita è una proprietà del prezzo quotato, non la prova della vera probabilità di un risultato.",
    "Una stima della probabilità diventa utile per l'analisi del valore solo quando viene confrontata con la probabilità di pareggio implicita nelle quote disponibili.",
    "Piccole differenze nelle quote possono cambiare in modo significativo la probabilità di pareggio e l'economia a lungo termine di scommesse ripetute.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Cosa significa probabilità implicita",
      paragraphs: [
        "Le quote delle scommesse e la probabilità sono due modi di esprimere la stessa relazione di prezzo. Le quote mostrano il potenziale rendimento associato a un risultato. La probabilità implicita converte quel prezzo nel tasso percentuale di successo che corrisponderebbe alle quote quotate prima di considerare il margine del bookmaker, l'incertezza del modello o altri effetti di mercato.",
        "Ad esempio, quote decimali di 2,00 implicano una probabilità del 50%. Ciò non significa che il risultato si verificherà la metà delle volte in un piccolo campione, e non significa che il bookmaker abbia scoperto la vera probabilità. Significa che un prezzo di 2,00 corrisponde matematicamente a un tasso di pareggio del 50%: ignorando altri fattori pratici, uno scommettitore che vincesse esattamente la metà di scommesse identiche a 2,00 recupererebbe l'importo puntato sul lungo periodo.",
        "Questa traduzione in percentuale è utile perché le probabilità sono spesso più facili da valutare rispetto alle quote grezze. Confrontare 1,62 con 1,75 può sembrare astratto. Convertirle approssimativamente nel 61,7% e nel 57,1% mostra immediatamente che i due prezzi richiedono tassi di successo significativamente diversi."
      ],
      callout: {
        title: "Prezzo, non certezza",
        body:
          "Una probabilità implicita descrive cosa significa matematicamente un prezzo quotato. Non è una promessa che l'evento si verificherà con quella frequenza.",
        tone: "warning",
      },
    },
    {
      id: "formula",
      heading: "Come calcolare la probabilità implicita dalle quote decimali",
      paragraphs: [
        "Per le quote decimali, la formula di conversione è: probabilità implicita = 1 ÷ quota decimale. Moltiplica il risultato per 100 per esprimerlo come percentuale.",
        "A quota 2,00, il calcolo è 1 ÷ 2,00 = 0,50, ovvero il 50%. A 1,50, è 1 ÷ 1,50 = 0,6667, ovvero circa il 66,7%. A 2,50, è il 40%. A 5,00, è il 20%.",
        "La relazione è inversa. Quote più basse implicano una probabilità più alta e un potenziale ritorno più basso. Quote più alte implicano una probabilità più bassa e un potenziale ritorno più alto. Poiché la relazione non è lineare, una variazione di 0,10 nelle quote decimali non rappresenta la stessa variazione di probabilità a ogni livello di prezzo."
      ],
      bullets: [
        "1,25 ‒ 80,0% probabilità implicita",
        "1,50 → 66,7%",
        "1,80 → 55,6%",
        "2,00 → 50,0%",
        "2,50 → 40,0%",
        "3.00 → 33.3%",
        "4.00 → 25.0%",
        "5.00 → 20.0%",
      ],
      callout: {
        title: "Esempio",
        body:
          "Se un bookmaker offre 2.20, la probabilità implicita è 1 ÷ 2.20 = 0.4545, ovvero circa il 45.5%. Una stima della probabilità superiore al 45.5% sarebbe necessaria affinché tale quota possa rappresentare un valore atteso positivo secondo la stima.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Perché la probabilità implicita è anche una probabilità di pareggio (break-even)",
      paragraphs: [
        "La probabilità implicita derivante dalle quote disponibili può essere interpretata come una soglia teorica di pareggio. Supponiamo di accettare ripetutamente quote decimali di 2.00. Una percentuale di vincita del 50% produce un rendimento lordo medio di un'unità per unità puntata: metà delle scommesse restituisce due unità e metà restituisce zero. Prima di considerare qualsiasi altro costo o limitazione, il 50% rappresenta quindi il tasso di pareggio.",
        "A quota 1.80, la probabilità implicita è circa il 55.6%. Se un evento si verificasse realmente solo il 50% delle volte, accettare ripetutamente 1.80 comporterebbe un valore atteso negativo. A quota 2.20, la probabilità di pareggio è circa il 45.5%; se una stima ben calibrata collocasse l'evento al 50%, la quota offerta si posizionerebbe teoricamente al di sopra del requisito di pareggio.",
        "Questa è la base dell'analisi del valore atteso. Il confronto importante non è semplicemente se un evento abbia probabilità di accadere, bensì se la probabilità stimata sia sufficientemente alta rispetto alla quota offerta."
      ],
      callout: {
        title: "Probabile non significa automaticamente conveniente",
        body:
          "Un evento può avere una probabilità del 70% di verificarsi ed essere comunque poco attraente se le quote disponibili richiedono un tasso di pareggio superiore al 70%. Al contrario, un evento con probabilità inferiore può essere attraente se la quota compensa ampiamente il rischio secondo una stima affidabile.",
        tone: "info",
      },
    },
    {
      id: "margin",
      heading: "Perché le probabilità implicite dei bookmaker possono superare il 100%",
      paragraphs: [
        "Se un mercato rappresentasse eventi mutualmente esclusivi con quote perfettamente eque e nessun margine, le probabilità implicite sommerebbero al 100%. I mercati reali dei bookmaker spesso superano il 100%. L'eccedenza è comunemente chiamata aggio (overround) o margine del bookmaker.",
        "Considera un mercato semplificato a due esiti con entrambe le quote a 1,91. Ciascuna quota implica circa il 52,36%. Insieme totalizzano circa il 104,72%. I 4,72 punti percentuali sopra il 100% illustrano l'overround in questo mercato semplificato.",
        "A causa di questo margine, la probabilità implicita grezza della selezione di un bookmaker non dovrebbe essere automaticamente definita come la sua probabilità equa. Gli analisti possono rimuovere o normalizzare il margine per creare una stima di mercato senza aggio, ma ciò richiede un calcolo aggiuntivo."
      ],
      bullets: [
        "Converti le quote di ciascun esito nella probabilità implicita grezza.",
        "Somma tutte le probabilità degli esiti reciprocamente esclusivi.",
        "Un totale superiore al 100% indica un overround nel mercato quotato.",
        "Normalizza le probabilità degli esiti se ti serve una semplice stima di mercato senza margine.",
      ],
      callout: {
        title: "Distinzione importante",
        body:
          "La probabilità implicita grezza deriva direttamente da un prezzo quotato. Una stima senza margine o di probabilità equa richiede un aggiustamento supplementare e dovrebbe essere etichettata di conseguenza.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Un semplice esempio di rimozione dell'overround",
      paragraphs: [
        "Un modo fondamentale per creare una stima senza margine è la normalizzazione proporzionale. Supponi che un mercato a due esiti abbia probabilità implicite grezze del 55% e del 50%, per un totale del 105%. Dividi ciascuna probabilità per il 105%. Le stime normalizzate diventano circa il 52,38% e il 47,62%, che sommati fanno 100%.",
        "Questa procedura è un modo utile per comprendere la struttura di un mercato, ma si basa su un presupposto: che il margine del bookmaker sia distribuito in modo proporzionale tra gli esiti. La determinazione dei prezzi reali può essere più complessa. Il margine potrebbe non essere distribuito equamente, esiti differenti possono attrarre una domanda diversa e i bookmaker possono utilizzare strategie di trading e di gestione del rischio distinte.",
        "La rimozione dell'overround non equivale quindi alla scoperta della probabilità reale. È descritta meglio come la derivazione di una stima basata sul mercato più pulita dai prezzi quotati."
      ],
      callout: {
        title: "Il senza-vig non significa perfetto",
        body:
          "Un mercato normalizzato può essere un utile punto di riferimento, ma possono comunque persistere incertezza, lacune informative, distorsioni di mercato e differenze di prezzo.",
        tone: "info",
      },
    },
    {
      id: "formats",
      heading: "Probabilità implicita tra diversi formati di quota",
      paragraphs: [
        "Le quote decimali, frazionarie e americane esprimono la stessa relazione economica in formati diversi. MatchSignal utilizza le quote decimali perché rendono diretti sia i calcoli dei rendimenti sia la conversione della probabilità.",
        "Le quote frazionarie come 3/2 rappresentano il profitto rispetto alla posta. Per convertirle in decimali, si aggiunge uno: 3/2 diventa 2.50 in decimale, il che implica il 40%. Le quote americane utilizzano numeri positivi e negativi attorno a un punto di riferimento di 100 unità, quindi la formula di conversione differisce a seconda che il prezzo sia positivo o negativo.",
        "Una volta che qualsiasi formato è stato convertito in quote decimali, si può utilizzare la stessa formula 1 ÷ quota. Questo rende le quote decimali un linguaggio comune conveniente per confrontare i prezzi da più fonti."
      ],
      bullets: [
        "Frazionarie 1/1 = decimali 2.00 = 50% di probabilità implicita.",
        "Frazionarie 3/2 = decimali 2.50 = 40%.",
        "Americane +100 = decimali 2.00 = 50%.",
        "Americane -200 = decimali 1.50 = circa 66,7%.",
      ],
    },
    {
      id: "price-comparison",
      heading: "Come quote migliori modificano la probabilità implicita",
      paragraphs: [
        "Il confronto dei prezzi è importante perché un prezzo migliore riduce la percentuale di successo necessaria per pareggiare. Immagina che la stessa selezione sia disponibile a 1.80, 1.90 e 2.00. Tali prezzi implicano rispettivamente circa il 55,6%, il 52,6% e il 50,0%.",
        "L'evento sportivo sottostante è identico, ma l'economia della scommessa non lo è. Se la tua valutazione della probabilità fosse del 54%, la quota di 1,80 si posizionerebbe al di sopra della tua stima in modo sfavorevole, poiché richiede il 55,6% per andare in pareggio. Le quote di 1,90 e 2,00 richiederebbero tassi di pareggio inferiori e potrebbero quindi produrre un valore atteso positivo sotto la stima del 54%.",
        "Ciò illustra perché il confronto delle quote non riguarda meramente la massimizzazione di una vincita dopo un successo. La quota modifica la soglia matematica che la tua stima di probabilità deve superare."
      ],
      callout: {
        title: "Stessa scelta, valore differente",
        body:
          "Una selezione non ha un valore fisso indipendente dalla quota. Quando le quote cambiano, la probabilità implicita e la relazione del valore atteso cambiano di conseguenza.",
        tone: "example",
      },
    },
    {
      id: "market-movement",
      heading: "Cosa succede alla probabilità implicita quando le quote si muovono",
      paragraphs: [
        "Quando le quote si abbassano, la probabilità implicita aumenta. Quando le quote si allungano, la probabilità implicita diminuisce. Un movimento da 2,20 a 2,00 cambia la probabilità implicita da circa il 45,5% al 50%. Un movimento da 2,00 a 1,80 la fa aumentare ulteriormente fino a circa il 55,6%.",
        "Le quote possono muoversi per molte ragioni: nuove informazioni, infortuni, formazioni ufficiali, meteo, attività di mercato, cambiamenti presso bookmaker concorrenti o le decisioni di gestione del rischio del bookmaker stesso. Un movimento delle quote, quindi, non dimostra che la vera probabilità sottostante sia cambiata esattamente della stessa quantità.",
        "Tuttavia, tradurre un movimento di quota in probabilità implicita può rendere la portata del movimento più intuitiva. Dire che una quota si è abbassata da 2,20 a 1,90 è meno immediato che riconoscere che la probabilità di pareggio quotata è passata da circa il 45,5% al 52,6%."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Errori comuni nella lettura della probabilità implicita",
      paragraphs: [
        "L'aritmetica è abbastanza semplice che la maggior parte degli errori deriva dall'interpretazione piuttosto che dal calcolo. L'errore più comune è trattare la probabilità implicita come una certezza o come la previsione esatta del bookmaker. Un altro è confrontare probabilità provenienti da mercati diversi senza verificare se le selezioni e le regole di refertazione siano realmente equivalenti.",
        "Un terzo errore è ignorare il margine del bookmaker. Se le probabilità in un mercato sommano al 105%, considerare ogni percentuale grezza come una probabilità equa esagera la probabilità totale disponibile. Infine, gli scommettitori possono sovrastimare piccoli margini apparenti. Una differenza di uno o due punti percentuali può svanire quando il modello di probabilità sottostante è incerto o scarsamente calibrato."
      ],
      bullets: [
        "Non interpretare la probabilità implicita come una certezza.",
        "Non definire la probabilità grezza del bookmaker 'probabilità equa' senza considerare il margine.",
        "Non confrontare quote provenienti da definizioni di mercato differenti come se fossero identiche.",
        "Non dare per scontato che ogni differenza tra la tua stima e il mercato rappresenti un vero vantaggio.",
        "Non ignorare che le quote possono cambiare prima che una scommessa venga piazzata.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Come si inserisce la probabilità implicita in MatchSignal",
      paragraphs: [
        "MatchSignal utilizza i prezzi dei bookmaker come parte del proprio quadro di analisi sportiva. I prezzi di mercato possono essere convertiti in termini di probabilità in modo tale che diversi bookmaker e osservazioni di mercato possano essere confrontati su una scala comune.",
        "Nelle schede di MatchSignal, la Media di mercato riassume i prezzi di mercato campionati, mentre la Probabilità equa è una stima analitica piuttosto che una percentuale grezza del bookmaker. Il Margine di valore è inteso a descrivere la differenza tra il prezzo di mercato disponibile e la valutazione basata sulla probabilità di MatchSignal. I Book campionati indicano quante fonti di bookmaker hanno contribuito al campione di mercato rilevante.",
        "Questi campi hanno lo scopo di rendere i prezzi di mercato e il contesto del modello più facili da esaminare. Non costituiscono garanzie di un risultato sportivo o di profitto. Le ipotesi del modello, la qualità dei dati di origine, il movimento del mercato e la normale varianza dello sport possono influenzare l'esito."
      ],
      callout: {
        title: "Usa la probabilità come quadro di riferimento",
        body:
          "La probabilità aiuta a strutturare l'incertezza. Non elimina l'incertezza e nessun modello può garantire il risultato di un evento sportivo.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Una checklist pratica sulla probabilità implicita",
      paragraphs: [
        "Nel valutare il prezzo di una scommessa, usa la probabilità implicita come punto di partenza anziché come risposta definitiva. La sequenza seguente aiuta a mantenere separati prezzo, struttura del mercato e stima della probabilità."
      ],
      bullets: [
        "Identificare il mercato esatto e la selezione.",
        "Converti le quote decimali disponibili in probabilità implicita.",
        "Verifica se il mercato include il margine del bookmaker o l'overround.",
        "Confrontare prezzi equivalenti tra diversi bookmaker ove disponibile.",
        "Se utilizzi un modello di probabilità, confronta la sua stima con la probabilità di pareggio del prezzo.",
        "Tieni conto dell'incertezza del modello anziché considerare piccole differenze numeriche come vantaggi certi.",
        "Ricontrolla le quote attuali prima di agire, poiché i prezzi di mercato possono variare.",
        "Utilizza una gestione disciplinata delle puntate e non considerare mai l'analisi delle probabilità come una garanzia."
      ],
    }
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "expected-value-sports-betting"
  ],
  responsibleGamblingNote:
    "Le scommesse comportano un rischio finanziario. La probabilità implicita è un'interpretazione matematica di un prezzo, non una garanzia di un risultato o di un profitto. Punta solo importi che puoi permetterti di perdere, evita di inseguire le perdite e mantieni le decisioni di scommessa entro limiti prestabiliti.",
};

export default guide;
