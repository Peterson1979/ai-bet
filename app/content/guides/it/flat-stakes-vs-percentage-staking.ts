import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "flat-stakes-vs-percentage-staking",
  locale: "it",
  title: "Puntate fisse vs Puntate in percentuale",
  category: "bankroll-risk",
  status: "published",
  description:
    "Confronta le puntate fisse e le puntate in percentuale nelle scommesse sportive, comprendi come ciascun metodo influenzi la volatilità del bankroll, i prelievi, la tenuta dei registri e il rischio, e scopri quando ciascun approccio può essere più facile da gestire.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Le puntate fisse e le puntate in percentuale sono due modi comuni per decidere quanto del bankroll delle scommesse rischiare su ogni giocata. La puntata fissa utilizza ripetutamente lo stesso importo di puntata, mentre la puntata in percentuale utilizza una percentuale fissa del bankroll corrente, facendo sì che la dimensione della puntata aumenti o diminuisca al variare del bankroll. Nessun approccio crea un vantaggio di per sé. Il loro scopo è il controllo del rischio e la coerenza. La scelta migliore dipende da quanta semplicità, stabilità e regolazione automatica del bankroll lo scommettitore desidera.",
  keyTakeaways: [
    "La puntata fissa utilizza lo stesso importo di puntata per tutte le scommesse, mentre la puntata in percentuale utilizza una percentuale fissa del bankroll corrente.",
    "La puntata fissa è semplice e rende facile valutare le performance della strategia.",
    "La puntata in percentuale riduce automaticamente l'esposizione durante i periodi di calo e aumenta l'esposizione dopo la crescita del bankroll.",
    "Nessun metodo di puntata può rendere redditizia una strategia con valore atteso negativo.",
    "Grandi percentuali di puntata possono creare una forte volatilità anche quando la regola di puntata in sé è coerente.",
    "La qualità della decisione sottostante su probabilità e quota conta più della formula di puntata.",
    "Un piano di puntata dovrebbe essere scelto prima di iniziare a scommettere e non dovrebbe essere cambiato in modo impulsivo dopo vincite o perdite.",
  ],
  sections: [
    {
      id: "flat-staking",
      heading: "Cosa Sono le Puntate Fisse?",
      paragraphs: [
        "La puntata fissa significa rischiare lo stesso importo fisso su ogni scommessa indipendentemente dai risultati recenti o dai cambiamenti nella dimensione del bankroll.",
        "Ad esempio, uno scommettitore potrebbe decidere che un'unità equivale a 10 unità di valuta e puntare un'unità su ogni selezione. Che il bankroll salga da 1.000 a 1.100 o scenda a 900, la puntata successiva rimane 10.",
        "Il vantaggio principale è la semplicità. L'andamento è facile da monitorare perché ampie variazioni delle puntate non distorcono lo storico. Se una strategia vince o perde, il risultato è guidato principalmente dalle selezioni e dalle quote piuttosto che da modifiche aggressive della dimensione della posizione."
      ],
      callout: {
        title: "Piatta non significa priva di rischi",
        body:
          "Una puntata fissa può comunque diventare troppo grande rispetto al bankroll dopo un calo significativo.",
        tone: "warning",
      },
    },
    {
      id: "percentage-staking",
      heading: "Che cos'è la puntata percentuale?",
      paragraphs: [
        "La puntata percentuale rischia una percentuale fissa del bankroll corrente su ogni scommessa. Se il bankroll cambia, la puntata cambia di conseguenza.",
        "Supponiamo che il bankroll sia 1.000 e la regola di puntata sia l'1%. La prima puntata è 10. Se in seguito il bankroll scende a 800, la successiva puntata dell'1% diventa 8. Se il bankroll sale a 1.200, la puntata successiva diventa 12.",
        "Ciò crea un meccanismo di regolazione automatica. L'esposizione diminuisce durante i periodi di perdita e aumenta gradualmente durante i periodi di vincita."
      ],
      bullets: [
        "Bankroll di 1.000 all'1% → puntata di 10 unità.",
        "Bankroll di 800 all'1% → puntata di 8 unità.",
        "Bankroll di 1.200 all'1% → puntata di 12 unità.",
      ],
    },
    {
      id: "main-difference",
      heading: "La differenza fondamentale tra i due metodi",
      paragraphs: [
        "La differenza centrale consiste nello stabilire se la posta rimanga fissa in termini di valuta o fissa rispetto alle dimensioni del bankroll.",
        "Lo staking piatto (flat staking) mantiene costante la dimensione della scommessa. Lo staking percentuale mantiene approssimativamente costante la proporzione di bankroll a rischio.",
        "Questa distinzione cambia il comportamento di ciascun metodo durante i periodi di calo (drawdown). Con lo staking piatto, la stessa posta diventa una percentuale maggiore del bankroll rimanente man mano che le perdite si accumulano. Con lo staking percentuale, la posta diventa automaticamente più piccola.",
        "Durante la crescita del bankroll, accade il contrario. Le poste fisse diventano una percentuale minore del bankroll nel tempo, mentre le poste percentuali aumentano."
      ],
      callout: {
        title: "Importo costante vs proporzione costante",
        body:
          "Lo staking piatto stabilizza l'importo della posta. Lo staking percentuale stabilizza la proporzione di bankroll a rischio.",
        tone: "info",
      },
    },
    {
      id: "drawdowns",
      heading: "Come si comporta ciascun metodo durante i cali (drawdown)",
      paragraphs: [
        "I drawdown sono periodi in cui il bankroll scende rispetto a un picco precedente. Sono normali nelle scommesse sportive perché la varianza può produrre serie di sconfitte anche quando il processo sottostante è ragionevole.",
        "Lo staking piatto non reagisce automaticamente a un drawdown. Se lo scommettitore continua a rischiare 10 unità mentre il bankroll scende da 1.000 a 700, la posta sale dall'1% a circa l'1,43% del bankroll.",
        "Lo staking percentuale reagisce automaticamente. Una posta dell'1% su un bankroll di 700 è pari a 7 unità, riducendo l'entità di ulteriori perdite in termini di valuta.",
        "Questa funzione difensiva è uno degli argomenti più forti a favore dello staking percentuale, soprattutto quando la preservazione del bankroll è l'obiettivo principale."
      ],
    },
    {
      id: "growth",
      heading: "Come si comporta ciascun metodo durante la crescita del bankroll",
      paragraphs: [
        "Quando un bankroll cresce, la puntata fissa diventa progressivamente più conservativa poiché la quota fissa rappresenta una percentuale minore del capitale totale.",
        "Se una puntata di 10 unità era originariamente l'1% di un bankroll di 1.000, diventa solo lo 0,67% di un bankroll di 1.500.",
        "La puntata percentuale aumenta la puntata insieme al bankroll. All'1%, un bankroll di 1.500 produce una puntata di 15 unità. Questo consente alla dimensione della posizione di capitalizzarsi man mano che il capitale cresce.",
        "La capitalizzazione può accelerare i guadagni durante i periodi favorevoli, ma aumenta anche la dimensione assoluta delle perdite quando puntate più grandi finiscono inevitabilmente per perdere."
      ],
      callout: {
        title: "La capitalizzazione funziona in entrambe le direzioni",
        body:
          "La puntata percentuale aumenta la dimensione della puntata man mano che il bankroll cresce, ma anche le perdite future sono maggiori in termini assoluti.",
        tone: "warning",
      },
    },
    {
      id: "record-keeping",
      heading: "Quale metodo è più facile da valutare?",
      paragraphs: [
        "La puntata fissa è solitamente più semplice per valutare la qualità di una strategia di scommessa poiché ogni selezione ha lo stesso peso nominale.",
        "Se 100 scommesse sono tutte di un'unità, il bilancio di profitti e perdite riflette le prestazioni del processo di selezione senza che una grande variazione delle puntate domini il risultato.",
        "La puntata percentuale crea dimensioni di puntata mutevoli. Una scommessa successiva può avere un effetto finanziario maggiore rispetto a una precedente semplicemente perché il bankroll è cresciuto.",
        "Per la ricerca, il testing dei modelli o il confronto tra strategie, le unità fisse possono quindi fornire un registro delle prestazioni più pulito. La puntata percentuale può essere più adatta quando la preoccupazione principale è controllare l'esposizione rispetto al bankroll attuale."
      ],
    },
    {
      id: "variance",
      heading: "La varianza con puntata fissa e percentuale",
      paragraphs: [
        "Nessun metodo di puntata elimina la varianza dai risultati sportivi. Entrambi sperimenteranno serie di vittorie e di sconfitte.",
        "La differenza sta in come tali risultati si traducono nel movimento del bankroll. Con la puntata percentuale, la dimensione monetaria delle oscillazioni si adatta automaticamente alla dimensione del bankroll. Con la puntata fissa, la stessa oscillazione monetaria continua indipendentemente dai guadagni o dalle perdite recenti.",
        "Con dimensioni di puntata conservative, entrambi gli approcci possono produrre una volatilità gestibile. Con dimensioni di puntata aggressive, entrambi possono diventare pericolosi.",
        "La percentuale in sé conta più del fatto che il metodo sia chiamato puntata fissa o percentuale. Una puntata costante del 10% può essere molto più pericolosa di una conservativa unità fissa dell'1%."
      ],
      callout: {
        title: "La coerenza non basta",
        body:
          "Una regola di puntata può essere perfettamente coerente ed essere comunque troppo aggressiva. La dimensione della puntata rispetto al bankroll rimane fondamentale.",
        tone: "warning",
      },
    },
    {
      id: "expected-value",
      heading: "La puntata non crea valore atteso",
      paragraphs: [
        "Un sistema di puntata non può trasformare un cattivo prezzo in uno buono. Il valore atteso deriva dalla relazione tra probabilità e quote.",
        "Se una scommessa ha un valore atteso negativo, puntare l'1%, il 2% o un importo fisso di 10 unità non cambia l'economia sottostante. Cambia solo la dimensione della perdita attesa e la volatilità ad essa associata.",
        "Allo stesso modo, una strategia a valore atteso positivo può essere danneggiata da dimensioni di puntata eccessive. Un vantaggio reale non protegge un bankroll dalla rovina se l'esposizione è troppo aggressiva.",
        "L'ordine corretto è quindi: valutare prima il mercato e il prezzo, quindi applicare una regola di puntata controllata dal rischio."
      ],
      bullets: [
        "La probabilità e il prezzo determinano il valore atteso (EV).",
        "L'importo della puntata determina l'esposizione.",
        "Il sistema di puntata modifica le dimensioni dei risultati, non la qualità della scommessa sottostante.",
        "Nessun sistema di puntata garantisce un profitto.",
      ],
    },
    {
      id: "percentage-example",
      heading: "Un esempio di puntata percentuale",
      paragraphs: [
        "Consideriamo un bankroll di 1.000 unità utilizzando una puntata percentuale del 2%. La prima puntata è 20.",
        "Se la scommessa perde, il bankroll diventa 980 e la successiva puntata del 2% diventa 19,60. Un'altra perdita lascia 960,40 e la puntata seguente diventa 19,21.",
        "La puntata si riduce man mano che il bankroll diminuisce. Questo rallenta il tasso assoluto di perdita rispetto al continuare a puntare un importo fisso di 20 unità.",
        "Se in seguito il bankroll cresce, il processo si inverte e le puntate aumentano gradualmente."
      ],
      callout: {
        title: "Ridimensionamento automatico",
        body:
          "La puntata percentuale riduce l'esposizione assoluta durante le perdite senza richiedere allo scommettitore di prendere una nuova decisione discrezionale.",
        tone: "example",
      },
    },
    {
      id: "flat-example",
      heading: "Un esempio di puntata fissa",
      paragraphs: [
        "Consideriamo ora lo stesso bankroll di 1.000 unità utilizzando una puntata fissa di 20 unità.",
        "Dopo una sconfitta, il bankroll è 980 ma la puntata successiva rimane 20. Dopo due sconfitte, il bankroll è 960 e la terza puntata è ancora 20.",
        "L'importo fisso semplifica il tracciamento, ma la puntata ora rappresenta circa il 2,08% del bankroll ridotto anziché il 2% originale.",
        "Se il bankroll diminuisce notevolmente, una puntata fissa dovrebbe essere riesaminata piuttosto che lasciare che diventi una percentuale sempre maggiore del capitale rimanente."
      ],
    },
    {
      id: "rebalancing",
      heading: "Un approccio ibrido: Ribilanciamento periodico",
      paragraphs: [
        "Alcuni scommettitori utilizzano un approccio ibrido: puntate fisse per un certo periodo, seguite da un occasionale ricalcolo della dimensione dell'unità.",
        "Ad esempio, un'unità potrebbe essere impostata all'1% del bankroll all'inizio di ogni mese o dopo che il bankroll è cambiato di un importo predefinito.",
        "Ciò preserva gran parte della semplicità delle puntate fisse, impedendo al contempo che un'unità fissa diventi troppo grande o troppo piccola rispetto al bankroll.",
        "La chiave è che le regole di ribilanciamento devono essere predeterminate. Cambiare costantemente la dimensione della puntata dopo vincite o perdite emotive vanifica lo scopo di avere un framework di puntata."
      ],
    },
    {
      id: "confidence-staking",
      heading: "Le puntate dovrebbero cambiare con la confidenza?",
      paragraphs: [
        "Alcuni scommettitori variano la dimensione della puntata in base al vantaggio percepito o alla confidenza. In teoria, un valore atteso positivo più forte può giustificare una maggiore esposizione.",
        "Il problema pratico è l'errore di stima. Se uno scommettitore è eccessivamente sicuro di quali selezioni abbiano il vantaggio maggiore, le puntate variabili possono ingrandire gli errori.",
        "Per questo motivo, le puntate fisse o in percentuale semplice sono spesso più facili da controllare e monitorare. Puntate variabili più avanzate dovrebbero essere prese in considerazione solo quando le stime di probabilità sono ben calibrate e sono in vigore rigorosi limiti di esposizione massima.",
        "Un'etichetta come 'alta confidenza' non dovrebbe mai essere trattata come certezza."
      ],
      callout: {
        title: "La confidenza può essere mal calibrata",
        body:
          "Puntate variabili amplificano sia le valutazioni di confidenza corrette che quelle errate.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "In cosa differisce il Criterio di Kelly",
      paragraphs: [
        "Il Criterio di Kelly non corrisponde né a puntate fisse né a semplici puntate in percentuale fissa. Calcola una frazione raccomandata del bankroll basata sul vantaggio stimato e sulle quote.",
        "In teoria, Kelly adatta la dimensione della puntata alla forza dell'opportunità stimata. In pratica, è altamente sensibile all'errore di probabilità.",
        "Se la stima di probabilità è troppo ottimistica, il Kelly pieno può raccomandare una puntata eccessivamente grande. Per questo motivo vengono spesso utilizzati approcci Kelly frazionali per ridurre la volatilità.",
        "Per la maggior parte degli utenti, la lezione importante non è che una formula sia superiore. È che puntate più complesse richiedono stime di probabilità più affidabili e controlli del rischio più rigorosi."
      ],
    },
    {
      id: "psychology",
      heading: "Quale metodo è più facile da seguire emotivamente?",
      paragraphs: [
        "Le puntate fisse possono sembrare più facili perché l'importo non cambia dopo vincite o perdite. Questo riduce la tentazione di interpretare i cambiamenti delle puntate come reazioni emotive.",
        "Le puntate in percentuale possono anch'esse supportare la disciplina perché l'aggiustamento è automatico e basato su regole. Una puntata più piccola dopo le perdite non è una punizione; è semplicemente il risultato di un bankroll minore.",
        "I problemi sorgono quando gli scommettitori abbandonano uno dei due metodi dopo una serie. Aumentare le puntate dopo le perdite per recuperare denaro o aumentarle dopo le vincite a causa dell'eccesso di sicurezza introduce un rischio discrezionale.",
        "Il miglior metodo di puntata è spesso quello che può essere seguito in modo coerente senza incoraggiare modifiche impulsive."
      ],
    },
    {
      id: "matchsignal",
      heading: "Come le puntate si relazionano a MatchSignal",
      paragraphs: [
        "MatchSignal fornisce un contesto analitico che include Migliori Quote, Media di Mercato, Probabilità Equa, Margine di Valore, Bookmaker Campionati e Livello di Rischio.",
        "Questi campi non sono istruzioni di puntata. Una classificazione a Basso Rischio o un Margine di Valore più ampio non dovrebbero causare automaticamente una puntata maggiore.",
        "La dimensione della puntata dovrebbe essere determinata da un quadro di bankroll personale separato che tenga conto di accessibilità economica, incertezza, varianza e limiti del gioco responsabile.",
        "L'analisi di MatchSignal è informativa e non garantisce risultati né raccomanda una specifica esposizione finanziaria."
      ],
      callout: {
        title: "L'analisi e la definizione della dimensione della puntata sono decisioni separate",
        body:
          "Un forte segnale analitico non elimina l'incertezza e non dovrebbe prevalere su regole di bankroll conservative.",
        tone: "warning",
      },
    },
    {
      id: "comparison",
      heading: "Puntate fisse vs Puntate percentuali: Un confronto diretto",
      paragraphs: [
        "Entrambi i metodi possono essere ragionevoli quando le puntate sono conservative e le regole vengono seguite in modo coerente. I loro punti di forza sono diversi."
      ],
      bullets: [
        "Puntata fissa: la più semplice da comprendere e tracciare.",
        "Puntata fissa: utile per valutare le performance della strategia.",
        "Puntata fissa: può diventare troppo grande rispetto al bankroll dopo un calo significativo.",
        "Puntata percentuale: riduce automaticamente l'esposizione durante i cali.",
        "Puntata percentuale: si rivaluta automaticamente durante la crescita del bankroll.",
        "Puntata percentuale: genera importi di puntata variabili che possono rendere la valutazione meno intuitiva.",
        "Entrambi i metodi: richiedono livelli di puntata conservativi e non possono creare un vantaggio.",
      ],
    },
    {
      id: "checklist",
      heading: "Una checklist pratica per la gestione delle puntate",
      paragraphs: [
        "Qualunque metodo si scelga, la regola di puntata dovrebbe essere abbastanza semplice da seguire sia in condizioni di vincita che di perdita."
      ],
      bullets: [
        "Separa il bankroll per le scommesse dal denaro essenziale.",
        "Scegliere la puntata fissa o percentuale prima di iniziare a scommettere.",
        "Mantenere la puntata conservativa rispetto al bankroll.",
        "Non aumentare le puntate per recuperare le perdite.",
        "Verificare se una puntata fissa è diventata troppo grande dopo un calo.",
        "Se si utilizza la puntata percentuale, calcolarla sempre in modo coerente sul bankroll attuale.",
        "Evita modifiche discrezionali frequenti basate sui risultati recenti.",
        "Tieni traccia accuratamente delle puntate e delle variazioni del bankroll.",
        "Tratta la puntata variabile avanzata con cautela quando le stime di probabilità sono incerte.",
        "Interrompi o riduci le scommesse se la pressione finanziaria o emotiva aumenta.",
      ],
    },
  ],
  relatedGuides: [
    "bankroll-management",
    "variance-sports-betting",
    "expected-value-sports-betting",
    "why-chasing-losses-is-dangerous",
    "winning-streaks-misleading",
  ],
  responsibleGamblingNote:
    "La puntata fissa e la puntata percentuale sono metodi di gestione del rischio, non garanzie di profitto. Qualsiasi strategia di scommessa può perdere denaro. Mantieni le puntate entro importi che puoi permetterti di perdere, separa i fondi per le scommesse dal denaro essenziale, evita di aumentare le puntate per recuperare le perdite e fermati se le scommesse causano danni finanziari o emotivi.",
};

export default guide;
