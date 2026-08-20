import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "expected-value-sports-betting",
  locale: "de",
  title: "Erwartungswert bei Sportwetten erklärt",
  category: "value-analysis",
  status: "published",
  description:
    "Verstehen Sie den Erwartungswert bei Sportwetten, wie Wahrscheinlichkeit und Quote zusammenwirken, um einen positiven oder negativen EV zu erzeugen, warum ein positiver Vorteil keinen Gewinn garantiert und wie man den Wert sorgfältiger bewertet.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Der Erwartungswert, meist als EV abgekürzt, ist eine Methode, um das theoretische Durchschnittsergebnis einer Entscheidung zu beschreiben, wenn dieselbe Art von Entscheidung viele Male wiederholt wird. Bei Sportwetten verbindet der EV zwei Dinge: Ihre Einschätzung, wie oft ein Ergebnis eintreten sollte, und den vom Markt angebotenen Preis. Eine Wette kann wahrscheinlich gewinnen und dennoch einen negativen Erwartungswert haben, wenn die Quoten zu niedrig sind. Eine Wette kann heute verlieren und dennoch bei einer vernünftigen Wahrscheinlichkeitsschätzung einen positiven Erwartungswert aufweisen. Das Konzept ist nützlich, da es den Fokus weg vom bloßen Auswählen von Gewinnern hin zur Beziehung zwischen Wahrscheinlichkeit, Preis und Unsicherheit verschiebt.",
  keyTakeaways: [
    "Der Erwartungswert kombiniert Wahrscheinlichkeit und Auszahlung zu einem mathematischen Maß für die lange Sicht.",
    "Ein positiver EV bedeutet, dass die geschätzte Wahrscheinlichkeit im Verhältnis zu den angebotenen Quoten hoch genug ist, um eine positive theoretische Durchschnittsrendite zu erzielen.",
    "Ein negativer EV bedeutet, dass der angebotene Preis eine höhere Erfolgsquote erfordert, als Ihre Wahrscheinlichkeitsschätzung unterstützt.",
    "Eine Wette mit positivem EV kann verlieren, und eine Wette mit negativem EV kann gewinnen; beim EV geht es um wiederholte Entscheidungen, nicht um Gewissheit bei einem einzelnen Ereignis.",
    "Die Qualität jeder EV-Berechnung hängt stark von der Qualität und Kalibrierung der Wahrscheinlichkeitsschätzung ab.",
    "Bessere Quoten verbessern den Erwartungswert für dieselbe zugrunde liegende Auswahl, da sie die Break-Even-Wahrscheinlichkeit verringern.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Was Erwartungswert bedeutet",
      paragraphs: [
        "Der Erwartungswert ist der wahrscheinlichkeitsgewichtete Durchschnitt aller möglichen Ergebnisse. In einem einfachen Gewinn-oder-Verlust-Wettbeispiel gibt es zwei finanzielle Hauptergebnisse: Die Wette gewinnt und erzielt einen Gewinn, oder die Wette verliert und der Einsatz ist verloren. Der EV kombiniert die Wahrscheinlichkeit jedes Ergebnisses mit seinem finanziellen Resultat.",
        "Angenommen, eine Auswahl wird zu einer Dezimalquote von 2,00 angeboten und Sie schätzen die Gewinnwahrscheinlichkeit auf 55 %. Ein Einsatz von einer Einheit bringt bei Erfolg zwei Einheiten zurück, was einen Gewinn von einer Einheit plus den ursprünglichen Einsatz bedeutet. Das verlorene Ergebnis kostet eine Einheit. Der Erwartungswert beträgt daher 0,55 × 1 Einheit Gewinn plus 0,45 × negative 1 Einheit, was +0,10 Einheiten entspricht. Bezogen auf einen Einsatz von einer Einheit ist das eine theoretische erwartete Rendite von +10 %.",
        "Dies bedeutet nicht, dass die nächste Wette physisch 1,10 Einheiten einbringt. Das tatsächliche Ergebnis einer einzelnen Wette ist diskret: Sie gewinnt oder verliert gemäß den Abrechnungsregeln des Marktes. Der Erwartungswert (EV) ist ein Durchschnittswert über wiederholte, vergleichbare Entscheidungen unter der angenommenen Wahrscheinlichkeit."
      ],
      callout: {
        title: "Die Grundidee",
        body:
          "Der Erwartungswert misst die Qualität einer Quote im Verhältnis zu einer Wahrscheinlichkeitsschätzung. Er sagt nicht das Ergebnis des nächsten Spiels voraus.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "Die grundlegende Formel für den Erwartungswert",
      paragraphs: [
        "Für eine einfache Sieg-oder-Niederlage-Wette mit Dezimalquoten kann der EV pro eingesetzter Einheit wie folgt geschrieben werden: EV = (Gewinnwahrscheinlichkeit × Dezimalquote) − 1.",
        "Wenn die Wahrscheinlichkeit 50 % beträgt und die Quote 2,20 ist, lautet die Berechnung 0,50 × 2,20 − 1 = +0,10 oder +10 %. Wenn dieselbe Wahrscheinlichkeit von 50 % mit einer Quote von 1,80 kombiniert wird, ist das Ergebnis 0,50 × 1,80 − 1 = −0,10 oder −10 %.",
        "Dieselbe Vorhersage kann daher je nach verfügbarer Quote einen sehr unterschiedlichen Erwartungswert haben. Dies ist eine der wichtigsten Unterscheidungen in der Wettanalyse: Die sportliche Einschätzung und die wirtschaftliche Qualität der Wette sind nicht dasselbe.",
        "Die Formel ist einfach, kann aber ein falsches Vertrauen erwecken, wenn die Wahrscheinlichkeitseingabe als exakt behandelt wird. Die EV-Arithmetik kann korrekt sein, während die zugrunde liegende Wahrscheinlichkeitsschätzung falsch ist."
      ],
      bullets: [
        "EV pro Einheit = (Gewinnwahrscheinlichkeit × Dezimalquote) − 1.",
        "50 % Wahrscheinlichkeit bei 2,20 Quote: +10 % EV.",
        "50 % Wahrscheinlichkeit bei 2,00 Quote: 0 % EV.",
        "50 % Wahrscheinlichkeit bei 1,80 Quote: −10 % EV.",
      ],
      callout: {
        title: "Gleiche Auswahl, unterschiedlicher Erwartungswert",
        body:
          "Wenn Ihre Wahrscheinlichkeitseinschätzung gleich bleibt, ändert eine Änderung der Quoten sofort den Erwartungswert.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Break-Even-Wahrscheinlichkeit und Erwartungswert",
      paragraphs: [
        "Jeder angegebene Preis hat eine Break-Even-Wahrscheinlichkeit. Bei Dezimalquoten entspricht die Break-Even-Wahrscheinlichkeit 1 geteilt durch die Quote. Bei 2,00 liegt die Break-Even-Rate bei 50 %. Bei 1,80 liegt sie bei etwa 55,6 %. Bei 2,50 liegt sie bei 40 %.",
        "Der Zusammenhang zum Erwartungswert ist direkt. Wenn Ihre Wahrscheinlichkeitseinschätzung über der durch den verfügbaren Preis implizierten Break-Even-Wahrscheinlichkeit liegt, hat die Wette unter dieser Einschätzung einen positiven Erwartungswert. Wenn Ihre Einschätzung unter der Break-Even-Schwelle liegt, ist der Erwartungswert negativ. Wenn beide gleich sind, ist der theoretische Erwartungswert null, bevor praktische Reibungsverluste berücksichtigt werden.",
        "Dieser Rahmen ist nützlicher, als einfach nur zu fragen, ob ein Ergebnis wahrscheinlich ist. Ein Team, das mit 70 % bewertet wird, kann dennoch schlecht bepreist sein, wenn die verfügbaren Quoten eine Break-Even-Rate von 75 % erfordern. Ein Ergebnis, das nur mit 35 % bewertet wird, kann theoretisch einen Wert bieten, wenn der Preis eine Break-Even-Rate unter 35 % erfordert."
      ],
      callout: {
        title: "Wahrscheinlich ist nicht dasselbe wie wertvoll",
        body:
          "Die Wahrscheinlichkeit gibt an, wie oft Sie glauben, dass etwas eintreten könnte. Der Erwartungswert fragt, ob der angebotene Preis Sie für diese Wahrscheinlichkeit angemessen entschädigt.",
        tone: "warning",
      },
    },
    {
      id: "positive-negative",
      heading: "Positiver Erwartungswert vs. negativer Erwartungswert",
      paragraphs: [
        "Ein positiver Erwartungswert bedeutet, dass die geschätzte durchschnittliche Rendite über dem eingesetzten Betrag liegt. Ein negativer Erwartungswert bedeutet, dass die geschätzte durchschnittliche Rendite unter dem eingesetzten Betrag liegt. Das Vorzeichen des Erwartungswerts hängt vom Verhältnis zwischen Wahrscheinlichkeit und Preis ab, nicht davon, ob die nächste einzelne Wette gewinnt.",
        "Betrachten Sie zwei Personen, die dieselbe Auswahl bewerten. Eine kann nur Quoten von 1,80 erhalten, während die andere 2,05 findet. Wenn beide dieselbe Wahrscheinlichkeitseinschätzung von 52 % verwenden, ergibt der erste Preis einen Erwartungswert von 0,52 × 1,80 − 1 = −6,4 %. Der zweite ergibt einen Erwartungswert von 0,52 × 2,05 − 1 = +6,6 %.",
        "Die Vorhersage ist identisch, aber die wirtschaftliche Qualität der beiden Wetten ist unterschiedlich. Deshalb ist ein Preisvergleich wichtig. Ein Wettender kann das Endergebnis nicht kontrollieren, aber er kann oft kontrollieren, ob er einen schlechteren Preis akzeptiert, wenn anderswo ein besserer, gleichwertiger Preis verfügbar ist."
      ],
      bullets: [
        "Positiver Erwartungswert (EV): Die geschätzte Wahrscheinlichkeit übersteigt die Break-Even-Anforderung des Preises.",
        "Negativer Erwartungswert (EV): Die geschätzte Wahrscheinlichkeit liegt unter der Break-Even-Anforderung des Preises.",
        "Null-Erwartungswert (EV): Die geschätzte Wahrscheinlichkeit entspricht in etwa der Break-Even-Anforderung.",
        "Eine Änderung der Quoten verändert den EV, selbst wenn sich die zugrunde liegende Wahrscheinlichkeitsschätzung nicht ändert.",
      ],
    },
    {
      id: "not-guarantee",
      heading: "Warum ein positiver Erwartungswert keinen Gewinn garantiert",
      paragraphs: [
        "Eine Schätzung mit positivem Erwartungswert beschreibt eine mathematische Erwartung auf lange Sicht, kein garantiertes kurzfristiges Ergebnis. Sport beinhaltet Zufall, unvollständige Informationen, Schiedsrichterentscheidungen, Verletzungen, taktische Änderungen, Wettereinflüsse, Ausführungsfehler und viele andere Varianzquellen. Selbst eine starke Wahrscheinlichkeitsschätzung kann diese Faktoren nicht eliminieren.",
        "Stellen Sie sich eine Reihe von Wetten vor, die jeweils mit einer Gewinnwahrscheinlichkeit von 60 % bewertet werden. Es ist durchaus möglich, vier oder fünfmal hintereinander zu verlieren. Umgekehrt kann eine Sequenz von Wetten mit negativem Erwartungswert mehrmals hintereinander gewinnen. Kurzfristige Ergebnisse zeigen daher nicht zuverlässig, ob der zugrunde liegende Prozess gut war.",
        "Die zweite Quelle der Unsicherheit ist die Wahrscheinlichkeitsschätzung selbst. Eine Berechnung kann stark positiv erscheinen, weil die geschätzte Wahrscheinlichkeit zu optimistisch ist. Wenn ein Modell 60 % angibt, die tatsächliche Chance aber eher bei 50 % liegt, ist die EV-Berechnung irreführend, selbst wenn die Arithmetik einwandfrei ist.",
        "Aus diesem Grund sollte der Erwartungswert eher als analytischer Rahmen denn als Versprechen betrachtet werden. Je unsicherer die Wahrscheinlichkeitsschätzung ist, desto weniger Vertrauen sollte in einen kleinen scheinbaren Vorteil gesetzt werden."
      ],
      callout: {
        title: "Die Arithmetik kann korrekt sein, während die Schätzung falsch ist",
        body:
          "EV-Berechnungen sind nur so zuverlässig wie die Wahrscheinlichkeiten, die ihnen zugrunde liegen. Modellkalibrierung und Unsicherheit sind genauso wichtig wie die Formel.",
        tone: "warning",
      },
    },
    {
      id: "probability-quality",
      heading: "Warum die Qualität der Wahrscheinlichkeit wichtiger ist als die Formel",
      paragraphs: [
        "Die Formel für den Erwartungswert ist einfach. Die präzise Einschätzung der Wahrscheinlichkeit ist der schwierige Teil. Ein nützliches Wahrscheinlichkeitsmodell sollte kalibriert sein: Ergebnisse, denen etwa 60% zugewiesen werden, sollten über eine ausreichend große und geeignete Stichprobe hinweg in etwa 60% der Fälle eintreten.",
        "Sportwahrscheinlichkeiten können aus Marktdaten, statistischen Modellen, Team- und Spielerinformationen, kontextuellen Variablen oder Kombinationen dieser Quellen geschätzt werden. Jeder Ansatz enthält Annahmen. Historische Daten repräsentieren aktuelle Teams möglicherweise nicht vollständig. Verletzungen können unsicher sein. Ein Modell gewichtet taktische Änderungen unter Umständen zu gering. Marktpreise können Informationen enthalten, die das Modell nicht berücksichtigt.",
        "Dies bedeutet, dass ein scheinbarer Vorteil von 2% nicht automatisch genauso behandelt werden sollte wie ein Vorteil von 10%. Die Unsicherheit bezüglich der Wahrscheinlichkeitsschätzung kann größer sein als die gemessene Differenz.",
        "Ein disziplinierter Prozess fragt nicht nur: 'Wie lautet meine Schätzung?', sondern auch: 'Wie unsicher ist diese Schätzung und wie empfindlich reagiert der Erwartungswert auf kleine Änderungen?'"
      ],
      bullets: [
        "Überprüfen Sie die Kalibrierung anhand großer Stichproben, anstatt ein Modell anhand weniger Ergebnisse zu beurteilen.",
        "Behandeln Sie kleine Vorteile vorsichtig, wenn die zugrunde liegende Wahrscheinlichkeitsschätzung unsicher ist.",
        "Aktualisieren Sie Schätzungen, wenn sich relevante Informationen ändern.",
        "Vermeiden Sie es, zusätzliches Vertrauen zu gewinnen, nur weil ein Modell viele Dezimalstellen ausgibt.",
      ],
    },
    {
      id: "bookmaker-margin",
      heading: "Wie sich die Buchmachermarge auf die Erwartungswertanalyse auswirkt",
      paragraphs: [
        "Wettquoten enthalten üblicherweise eine Buchmachermarge oder einen Overround. In einem einfachen Zwei-Wege-Markt könnten beide Seiten mit 1,91 angeboten werden. Jeder Preis impliziert etwa 52,36%, sodass die beiden rohen Wahrscheinlichkeiten insgesamt etwa 104,72% statt 100% ergeben.",
        "Dies ist wichtig, da eine rohe, vom Buchmacher implizierte Wahrscheinlichkeit nicht automatisch eine faire Wahrscheinlichkeitsschätzung darstellt. Die notierten Preise beinhalten die Marktstruktur und die Marge des Anbieters. Analysten können implizierte Wahrscheinlichkeiten normalisieren, um einen einfachen Benchmark für einen Markt ohne Marge zu erstellen.",
        "Für die Erwartungswertanalyse bleibt jedoch der tatsächliche Preis, der dem Wettenden zur Verfügung steht, der Preis, der die Gewinnschwelle bestimmt. Selbst wenn ein Modell ohne Marge ein Ergebnis auf 52% schätzt, erfordert ein Buchmacherpreis von 1,85 etwa 54,1%, um die Gewinnschwelle zu erreichen. Der Ausführungspreis ist daher zentral für die endgültige Erwartungswertberechnung."
      ],
      callout: {
        title: "Faire Wahrscheinlichkeit und verfügbarer Preis sind unterschiedliche Eingangsgrößen.",
        body:
          "Eine Schätzung ohne Marge kann helfen, die Markterwartungen zu beschreiben, während die tatsächlich angebotenen Quoten die Break-Even-Wahrscheinlichkeit der Wette bestimmen, die Sie platzieren können.",
        tone: "info",
      },
    },
    {
      id: "odds-comparison",
      heading: "Warum der Vergleich von Quoten den Erwartungswert verbessert",
      paragraphs: [
        "Für dieselbe Auswahl und Wahrscheinlichkeitsschätzung verbessern höhere Quoten immer den Erwartungswert. Angenommen, Ihre Schätzung liegt bei 48 %. Bei 1,95 beträgt der EV 0,48 × 1,95 − 1 = −6,4 %. Bei 2,10 beträgt der EV +0,8 %. Bei 2,20 beträgt der EV +5,6 %.",
        "Am sportlichen Ergebnis hat sich zwischen diesen Beispielen nichts geändert. Nur der Preis hat sich geändert. Deshalb ist der Vergleich äquivalenter Märkte zwischen verschiedenen Buchmachern ein wichtiger Teil der Wertanalyse.",
        "Der Vergleich muss wirklich gleichwertig sein. Unterschiedliche Abrechnungsregeln, Handicaps, Totals, die Behandlung von Verlängerungen, Stornierungsbedingungen oder Marktdefinitionen können oberflächlich ähnliche Preise nicht äquivalent machen. Ein Preisvergleich ist nur dann nützlich, wenn die zugrunde liegende Wette identisch ist."
      ],
      bullets: [
        "Stellen Sie sicher, dass Ereignis, Auswahl, Linie und Abrechnungsregeln übereinstimmen.",
        "Vergleichen Sie aktuelle Preise anstatt veralteter Screenshots oder historischer Kurse.",
        "Denken Sie daran, dass sich Marktpreise bewegen können, bevor die Wette platziert wird.",
        "Höhere äquivalente Quoten senken die Break-Even-Wahrscheinlichkeit.",
      ],
    },
    {
      id: "variance",
      heading: "Erwartungswert, Varianz und Stichprobengröße",
      paragraphs: [
        "Die Varianz beschreibt, wie stark kurzfristige Ergebnisse um ihren langfristigen Erwartungswert schwanken können. Sportwetten weisen eine erhebliche Varianz auf, da jedes Ereignis ein diskretes Ergebnis hervorbringt und viele Märkte Wahrscheinlichkeiten beinhalten, die weit von der Gewissheit entfernt sind.",
        "Ein Prozess mit einem tatsächlich positiven Erwartungswert kann längere Verlustphasen durchlaufen. Ausmaß und Dauer dieser Schwankungen hängen von der Art der Wetten, den Quoten, den tatsächlichen Wahrscheinlichkeiten, der Korrelation zwischen den Positionen und der Einsatzhöhe ab. Eine kleine Stichprobe kann daher von Zufälligkeiten dominiert werden.",
        "Dies schafft ein großes Bewertungsproblem. Ein Wettender könnte eine Gewinnsträhne fälschlicherweise als Beweis für sein Können ansehen oder einen soliden Prozess während einer gewöhnlichen Verlustphase aufgeben. Die EV-Analyse ist am aussagekräftigsten, wenn sie mit disziplinierter Buchführung, realistischen Stichprobengrößen und der Konzentration auf die Kalibrierung statt nur auf kurzfristige Gewinne kombiniert wird."
      ],
      callout: {
        title: "Ergebnisse und Prozess sind nicht identisch",
        body:
          "Ein Gewinn beweist nicht, dass eine Wette einen positiven EV hatte, und ein Verlust beweist nicht, dass sie einen negativen EV hatte. Bewerten Sie die Qualität der Wahrscheinlichkeits- und Preisentscheidung unabhängig vom Endergebnis.",
        tone: "warning",
      },
    },
    {
      id: "worked-example",
      heading: "Ein ausgearbeitetes Beispiel für den Erwartungswert",
      paragraphs: [
        "Angenommen, ein Sportwettenanbieter bietet eine Dezimalquote von 2,30 auf eine Auswahl an. Die Break-Even-Wahrscheinlichkeit beträgt 1 ÷ 2,30, also etwa 43,48 %. Ihre unabhängige Analyse schätzt die Auswahl auf 47 %.",
        "Der EV pro Einheit beträgt 0,47 × 2,30 − 1 = +0,081, oder +8,1 %. Unter der Annahme der 47 %-Schätzung würden wiederholte Wetten bei demselben Wahrscheinlichkeits-Preis-Verhältnis theoretisch durchschnittlich 1,081 Einheiten für jede eingesetzte Einheit zurückbringen.",
        "Testen Sie nun die Sensitivität. Wenn die tatsächliche Wahrscheinlichkeit nur 44 % betrüge, läge der EV bei 0,44 × 2,30 − 1 = +1,2 %. Bei 43 % wird der EV zu −1,1 %. Die Schlussfolgerung ändert sich bereits bei einer relativ geringen Anpassung der Wahrscheinlichkeit.",
        "Diese Sensitivität verdeutlicht, warum eine verantwortungsbewusste Interpretation wichtig ist. Die Schlagzeile von +8,1 % reicht nicht aus. Sie müssen auch verstehen, wie sicher Sie sich bei der 47 %-Schätzung sind und ob der angegebene Preis noch verfügbar ist."
      ],
      bullets: [
        "Quote: 2,30",
        "Break-Even-Wahrscheinlichkeit: ca. 43,48 %",
        "Geschätzte Wahrscheinlichkeit: 47 %",
        "Geschätzter Erwartungswert (EV): +8,1%",
        "Bei 44% Wahrscheinlichkeit: +1,2% EV",
        "Bei 43% Wahrscheinlichkeit: −1,1% EV",
      ],
    },
    {
      id: "matchsignal",
      heading: "Wie der Erwartungswert mit dem Value Edge von MatchSignal zusammenhängt",
      paragraphs: [
        "MatchSignal nutzt Marktpreise, Stichproben von Buchmachern und wahrscheinlichkeitsbasierte Analysen, um Kontext zu einer Auswahl bereitzustellen. Das Feld Value Edge der Plattform wurde entwickelt, um eine positive Differenz zwischen dem verfügbaren Marktpreis und der von MatchSignal verwendeten wahrscheinlichkeitsbasierten Einschätzung hervorzuheben.",
        "Dies sollte eher als analytisches Signal und nicht als garantierte erwartete Rendite interpretiert werden. Marktpreise können sich ändern, Wahrscheinlichkeitsschätzungen enthalten Unsicherheiten und das angezeigte Signal spiegelt die zum Zeitpunkt der Analyse verfügbaren Daten und Modellannahmen wider.",
        "Beste Quoten zeigt den stärksten verfügbaren Partnerpreis für die angezeigte Auswahl, Marktdurchschnitt fasst die stichprobenartigen Marktpreise zusammen, Faire Wahrscheinlichkeit ist eine analytische Schätzung und Untersuchte Buchmacher gibt an, wie viele Buchmacherquellen zu der relevanten Marktstichprobe beigetragen haben.",
        "Die korrekte Interpretation eines Value Edge lautet daher nicht 'diese Wette wird gewinnen'. Sie lautet eher 'unter den aktuellen Wahrscheinlichkeits- und Preisannahmen könnte diese Auswahl günstiger bewertet sein, als die Schätzung des Modells vermuten lässt'."
      ],
      callout: {
        title: "Ein Signal ist keine Garantie",
        body:
          "Der Value Edge von MatchSignal beschreibt eine modellbasierte Beziehung zwischen Wahrscheinlichkeit und Preis. Er garantiert kein positives Ergebnis und schließt sportliche Varianz nicht aus.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Eine praktische EV-Checkliste",
      paragraphs: [
        "Bevor Sie eine Wette als positiven Erwartungswert bezeichnen, überprüfen Sie jede Komponente der Berechnung. Dies hilft zu verhindern, dass eine mathematisch korrekte Formel mit unzuverlässigen Eingabewerten gefüttert wird."
      ],
      bullets: [
        "Identifizieren Sie den genauen Markt und die Auswahl.",
        "Verwenden Sie die aktuell verfügbaren Quoten, keine veralteten Preise.",
        "Rechnen Sie den Preis in die entsprechende Break-Even-Implied-Probability um.",
        "Schätzen Sie die Eintrittswahrscheinlichkeit unabhängig oder mit einem klar definierten Modell.",
        "Prüfen Sie, ob die Buchmachermarge den Marktvergleich beeinflusst.",
        "Berechnen Sie den Erwartungswert (EV) aus Wahrscheinlichkeit und Preis.",
        "Testen Sie, wie sich das Ergebnis ändert, wenn die Wahrscheinlichkeitsschätzung etwas niedriger ausfällt.",
        "Vergleichen Sie äquivalente Preise über verschiedene Sportwettenanbieter hinweg, sofern verfügbar.",
        "Berücksichtigen Sie Unsicherheit und Varianz.",
        "Verwenden Sie eine disziplinierte Einsatzhöhe und betrachten Sie den Erwartungswert niemals als Garantie.",
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
    "Der Erwartungswert ist ein mathematisches Modell, keine Gewinngarantie. Wahrscheinlichkeitsschätzungen können falsch sein, Marktpreise ändern sich und kurzfristige Ergebnisse können erheblich von den theoretischen Erwartungen abweichen. Setzen Sie nur Beträge ein, deren Verlust Sie sich leisten können, nutzen Sie festgelegte Limits, vermeiden Sie das Jagen von Verlusten und betrachten Sie Wettanalysen als Information, nicht als Gewissheit.",
};

export default guide;
