import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bookmaker-margin-overround",
  locale: "de",
  title: "Was ist die Buchmacher-Marge / der Overround?",
  category: "odds-probability",
  status: "published",
  description:
    "Erfahren Sie, was Buchmacher-Marge und Overround bedeuten, wie man sie aus Wettquoten berechnet, warum implizite Wahrscheinlichkeiten oft mehr als 100 % ergeben und wie sich die Marge auf den Preisvergleich und die Wertanalyse auswirkt.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Die Buchmacher-Marge, oft als Overround oder Vig bezeichnet, ist das Preispuffer-Polster, das in viele Wettmärkte eingebaut ist. Würde jedes Ergebnis in einem vollkommen fairen Markt in eine Wahrscheinlichkeit umgerechnet, würden die Wahrscheinlichkeiten 100 % ergeben. In realen Sportwettenmärkten summieren sich die aus den angegebenen Quoten abgeleiteten impliziten Wahrscheinlichkeiten oft auf mehr als 100 %. Dieser Überschuss ist der Overround. Das Verständnis dafür ist wichtig, da die rohen Buchmacher-Wahrscheinlichkeiten nicht automatisch faire Wahrscheinlichkeiten sind und zwei Sportwettenanbieter ähnliche Ansichten zu einem Ereignis äußern können, während sie materiell unterschiedliche Preise anbieten.",
  keyTakeaways: [
    "Der Overround ist der Betrag, um den die rohen impliziten Wahrscheinlichkeiten aller sich gegenseitig ausschließenden Ergebnisse 100 % übersteigen.",
    "Ein Zwei-Wege-Markt, der auf beiden Seiten mit 1,91 bewertet ist, impliziert insgesamt etwa 104,72 %, was einem Overround von etwa 4,72 Prozentpunkten entspricht.",
    "Die rohe implizite Wahrscheinlichkeit des Buchmachers ist eine preisbasierte Zahl, keine automatisch faire Wahrscheinlichkeitsschätzung.",
    "Ein niedrigerer Overround bedeutet im Allgemeinen eine wettbewerbsfähigere Preisgestaltung, sofern alle anderen Faktoren gleich bleiben.",
    "Die Marge ist möglicherweise nicht gleichmäßig auf alle Ergebnisse verteilt, daher ist eine einfache proportionale Normalisierung nur eine Annäherung.",
    "Die tatsächlichen Quoten, die dem Nutzer zur Verfügung stehen, bestimmen die Break-Even-Wahrscheinlichkeit und bleiben daher zentral für die Erwartungswertanalyse.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Was die Buchmacher-Marge bedeutet",
      paragraphs: [
        "Ein Buchmacher schafft einen Markt normalerweise nicht durch die einfache Veröffentlichung vollkommen fairer Wahrscheinlichkeiten. Stattdessen werden die Preise typischerweise so festgelegt, dass die kombinierten impliziten Wahrscheinlichkeiten 100 % übersteigen. Der Überschuss über 100 % wird üblicherweise als Overround, Buchmacher-Marge oder Vig bezeichnet.",
        "Stellen Sie sich zum Beispiel ein theoretisches Ereignis mit zwei Ausgängen vor, bei dem beide Seiten zu Dezimalquoten von 1,91 angeboten werden. Jeder Preis impliziert eine Wahrscheinlichkeit von etwa 52,36 %. Die Addition beider ergibt etwa 104,72 %. Der Betrag über 100 %, etwa 4,72 Prozentpunkte, ist der Overround des Marktes.",
        "Dies bedeutet nicht, dass der Buchmacher garantiert genau 4,72 % auf jedem Markt verdient. Tatsächliche Ergebnisse, Wettverteilung, Preisbewegungen, Werbeaktionen, Limits, Handelsentscheidungen und das Kundenverhalten beeinflussen die realisierten Ergebnisse. Der Overround ist eher als eine Eigenschaft der notierten Preisstruktur zu verstehen und nicht als garantierte Gewinnrate."
      ],
      callout: {
        title: "Preisstruktur, kein garantierter Gewinn",
        body:
          "Der Overround beschreibt, wie ein Markt bepreist ist. Er sollte nicht als garantierter Gewinn des Buchmachers bei einem einzelnen Ereignis interpretiert werden.",
        tone: "warning",
      },
    },
    {
      id: "calculation",
      heading: "So berechnen Sie den Overround aus Dezimalquoten",
      paragraphs: [
        "Die Berechnung beginnt mit der Umrechnung der Dezimalquoten jedes Ergebnisses in eine implizite Wahrscheinlichkeit. Bei Dezimalquoten entspricht die implizite Wahrscheinlichkeit 1 geteilt durch die Quote. Addieren Sie die impliziten Wahrscheinlichkeiten für alle sich gegenseitig ausschließenden Ergebnisse auf dem Markt.",
        "Wenn die Summe 100 % beträgt, ist der Markt mathematisch gesehen margenfrei, bevor andere praktische Faktoren berücksichtigt werden. Wenn die Summe 105 % beträgt, liegt der Overround bei 5 Prozentpunkten. Wenn die Summe 108 % beträgt, liegt der Overround bei 8 Prozentpunkten.",
        "Die Formel kann wie folgt geschrieben werden: Overround = Summe aller rohen impliziten Wahrscheinlichkeiten − 100 %."
      ],
      bullets: [
        "Rechnen Sie jeden Dezimalpreis mit 1 ÷ Quote um.",
        "Addieren Sie die impliziten Wahrscheinlichkeiten für alle sich gegenseitig ausschließenden Ergebnisse.",
        "Subtrahieren Sie 100 Prozentpunkte von der Summe.",
        "Der verbleibende Betrag ist der notierte Markt-Overround.",
      ],
      callout: {
        title: "Einfaches Beispiel",
        body:
          "Bei 1,91 und 1,91 impliziert jede Seite etwa 52,36 %. Die Summe beträgt etwa 104,72 %, sodass der Overround etwa 4,72 Prozentpunkte beträgt.",
        tone: "example",
      },
    },
    {
      id: "three-way",
      heading: "Overround in einem Drei-Wege-Fußballmarkt",
      paragraphs: [
        "Drei-Wege-Fußballmärkte bieten ein nützliches Beispiel, da Heimsieg, Unentschieden und Auswärtssieg sich gegenseitig ausschließende Ergebnisse sind. Angenommen, die Quoten liegen bei 2,10 für das Heimteam, 3,40 für das Unentschieden und 3,60 für das Auswärtsteam.",
        "Die impliziten Wahrscheinlichkeiten betragen etwa 47,62 %, 29,41 % und 27,78 %. Zusammen addiert ergeben sie etwa 104,81 %. Der resultierende Overround beträgt daher etwa 4,81 Prozentpunkte.",
        "Die drei Quoten implizieren nicht, dass das Ereignis in der Realität eine Gesamtwahrscheinlichkeit von 104,81 % aufweist. Der Überschuss entsteht, weil die angegebenen Quoten eine Marge und andere Handelsüberlegungen enthalten."
      ],
      bullets: [
        "Heim 2,10 → etwa 47,62 %",
        "Unentschieden 3,40 → etwa 29,41 %",
        "Auswärts 3,60 → etwa 27,78 %",
        "Gesamt → etwa 104,81 %",
        "Overround → etwa 4,81 Prozentpunkte",
      ],
    },
    {
      id: "raw-vs-fair",
      heading: "Rohe implizite Wahrscheinlichkeit vs. faire Wahrscheinlichkeit",
      paragraphs: [
        "Eine rohe implizite Wahrscheinlichkeit ergibt sich direkt aus einer angegebenen Quote. Wenn ein Sportwettenanbieter eine Dezimalquote von 2,00 anbietet, beträgt die rohe implizite Wahrscheinlichkeit 50 %. Diese Zahl beschreibt die Gewinnschwelle, die in der verfügbaren Quote enthalten ist.",
        "Eine faire oder margenfreie Wahrscheinlichkeitsschätzung ist etwas anderes. Sie versucht, den Effekt des Overrounds des Marktes zu eliminieren, sodass sich die Wahrscheinlichkeiten über sich gegenseitig ausschließende Ergebnisse auf 100 % summieren.",
        "Diese Unterscheidung ist wichtig, da die Bezeichnung jeder rohen Sportwetten-Wahrscheinlichkeit als faire Wahrscheinlichkeit das scheinbare Vertrauen des Marktes übertreiben kann. In einem Markt mit insgesamt 105 % beschreiben die rohen impliziten Wahrscheinlichkeiten des Buchmachers zusammen mehr als 100 % Wahrscheinlichkeit, was für sich gegenseitig ausschließende, erschöpfende Ergebnisse unmöglich ist."
      ],
      callout: {
        title: "Vermischen Sie die beiden Konzepte nicht.",
        body:
          "Die rohe implizite Wahrscheinlichkeit ergibt sich aus der Quote, die Sie tatsächlich annehmen können. Die faire Wahrscheinlichkeit ist eine analytische Schätzung nach Bereinigung um die Marge.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Ein einfacher Weg, den Overround zu entfernen",
      paragraphs: [
        "Eine gängige Methode zur Schätzung margenfreier Wahrscheinlichkeiten ist die proportionale Normalisierung. Teilen Sie jede rohe implizite Wahrscheinlichkeit durch die Summe aller rohen impliziten Wahrscheinlichkeiten. Die angepassten Wahrscheinlichkeiten summieren sich dann auf 100 %.",
        "Angenommen, ein Zwei-Wege-Markt hat rohe implizite Wahrscheinlichkeiten von 55 % und 50 %, was insgesamt 105 % ergibt. Die proportionale Normalisierung ergibt etwa 52,38 % für die erste Seite und 47,62 % für die zweite.",
        "Diese Methode ist einfach und nützlich für den Marktvergleich, geht jedoch davon aus, dass die Marge proportional auf die Ergebnisse verteilt ist. In realen Märkten kann diese Annahme unvollkommen sein. Buchmacher können Quoten je nach erwarteter Nachfrage, Informationen, Haftung, Markttiefe oder den Merkmalen einzelner Ergebnisse unterschiedlich anpassen.",
        "Aus diesem Grund sollte eine normalisierte Wahrscheinlichkeit eher als margenfreie Marktschätzung und nicht als objektiv wahre Wahrscheinlichkeit des Ereignisses beschrieben werden."
      ],
      bullets: [
        "Rohe Wahrscheinlichkeiten: 55 % und 50 %.",
        "Marktsumme: 105 %.",
        "Normalisierte erste Seite: 55 ÷ 105 ≈ 52,38 %.",
        "Normalisierte zweite Seite: 50 ÷ 105 ≈ 47,62 %.",
        "Normalisierte Gesamtsumme: 100 %.",
      ],
      callout: {
        title: "Die Normalisierung ist eine Schätzung.",
        body:
          "Die mathematische Entfernung der Buchmacher-Marge (Overround) offenbart keine perfekte, wahre Wahrscheinlichkeit. Sie schafft einen saubereren, marktbasierten Referenzwert.",
        tone: "info",
      },
    },
    {
      id: "uneven-margin",
      heading: "Warum die Marge nicht immer gleichmäßig verteilt ist",
      paragraphs: [
        "Es ist verlockend anzunehmen, dass ein Sportwettenanbieter einfach denselben prozentualen Margenaufschlag auf jede Auswahl anwendet. Die tatsächliche Marktgestaltung ist oft komplexer. Manche Ergebnisse können eine höhere öffentliche Nachfrage auf sich ziehen, andere sind schwieriger zu bepreisen, und manche Märkte weisen eine geringere Liquidität oder höhere Unsicherheit auf.",
        "Ein Buchmacher kann daher eine Seite aggressiver anpassen als die andere. Bei Märkten mit Außenseitern kann das Verhältnis besonders ungleichmäßig werden: Ergebnisse mit hohen Quoten können eine andere effektive Marge aufweisen als Favoriten mit niedrigen Quoten.",
        "Dies ist ein Grund, warum proportionale Berechnungen ohne Buchmacher-Marge nicht als exakte faire Wahrscheinlichkeiten betrachtet werden sollten. Es gibt fortgeschrittenere Methoden zur Margenentfernung, aber alle beruhen auf Annahmen darüber, wie die Overround verteilt ist."
      ],
      callout: {
        title: "Die Overround ist nicht notwendigerweise symmetrisch.",
        body:
          "Zwei Ergebnisse können unterschiedlich zur Gesamtmarge eines Buchmachers beitragen. Eine einfache proportionale Anpassung ist nützlich, bleibt aber dennoch ein Modell.",
        tone: "warning",
      },
    },
    {
      id: "price-comparison",
      heading: "Warum eine niedrigere Marge normalerweise bessere Quoten bedeutet",
      paragraphs: [
        "Wenn zwei Sportwettenanbieter ähnliche Einschätzungen zu einem Ereignis haben, aber einer mit einer niedrigeren Overround arbeitet, bietet der Markt mit der niedrigeren Marge dem Wetter im Allgemeinen wettbewerbsfähigere Quoten.",
        "Betrachten wir zwei einfache Zwei-Weg-Märkte. Buchmacher A bietet für beide Seiten eine Quote von 1,91 an, was zu einer Gewinnspanne (Overround) von etwa 4,72 % führt. Buchmacher B bietet für beide Seiten eine Quote von 1,96 an, was eine implizite Gesamtwahrscheinlichkeit von etwa 102,04 % und eine Gewinnspanne von etwa 2,04 % ergibt.",
        "Bei einer erfolgreichen Wette von einer Einheit bringt eine Quote von 1,96 mehr ein als 1,91. Noch wichtiger ist, dass die höhere Quote die Break-Even-Wahrscheinlichkeit von etwa 52,36 % auf etwa 51,02 % senkt. Dieser Unterschied kann den Erwartungswert bei wiederholten Wetten maßgeblich beeinflussen.",
        "Deshalb kann der Vergleich aktueller Quoten über gleichwertige Märkte hinweg nützlich sein, auch ohne eine bessere Vorhersage zu treffen. Das zugrunde liegende Ereignis bleibt unverändert, aber der verfügbare Preis kann sich verbessern."
      ],
      bullets: [
        "1,91 / 1,91 → etwa 4,72 % Gewinnspanne.",
        "1,96 / 1,96 → etwa 2,04 % Gewinnspanne.",
        "Höhere gleichwertige Quoten senken die erforderliche Break-Even-Wahrscheinlichkeit.",
        "Stellen Sie immer sicher, dass die Marktregeln und Abrechnungsbedingungen vergleichbar sind.",
      ],
    },
    {
      id: "margin-and-ev",
      heading: "Wie sich die Buchmachermarge auf den Erwartungswert auswirkt",
      paragraphs: [
        "Der Erwartungswert hängt von der Wahrscheinlichkeit eines Ergebnisses und dem tatsächlich verfügbaren Preis ab. Da die Buchmachermarge die Quoten im Vergleich zu einem theoretischen Markt ohne Marge im Allgemeinen verkürzt, erhöht die Marge die Erfolgsquote, die erforderlich ist, um die Gewinnschwelle zu erreichen.",
        "Angenommen, Sie schätzen die Wahrscheinlichkeit eines Ergebnisses auf 52 %. Bei einer Dezimalquote von 2,00 beträgt der theoretische Erwartungswert 0,52 × 2,00 − 1 = +4 %. Bei 1,90 wird der Erwartungswert zu 0,52 × 1,90 − 1 = −1,2 %. Die Wahrscheinlichkeitsschätzung bleibt unverändert, aber die niedrigere Quote ändert das Ergebnis.",
        "Dies verdeutlicht, warum eine gute Vorhersage allein nicht ausreicht. Der Preis bestimmt, ob sich die Wahrscheinlichkeitsschätzung in einen positiven, neutralen oder negativen Erwartungswert übersetzt."
      ],
      callout: {
        title: "Die Marge verändert den Schwellenwert",
        body:
          "Ein niedrigerer Kurs erfordert eine höhere Gewinnrate, um die Gewinnschwelle zu erreichen. Deshalb ist die Kursqualität unabhängig von der Vorhersagequalität von Bedeutung.",
        tone: "info",
      },
    },
    {
      id: "market-types",
      heading: "Die Marge kann je nach Sportart und Marktart variieren",
      paragraphs: [
        "Die Buchmachermarge ist nicht für jede Sportart oder jeden Markt fest definiert. Wichtige Ereignisse mit hoher Liquidität können relativ wettbewerbsfähige Kurse aufweisen, während Nischenligen, derivative Märkte, Spezialwetten oder Ereignisse mit geringer Liquidität breitere Margen haben können.",
        "Selbst innerhalb desselben Spiels kann der Hauptmarkt für die Siegwette einen anderen Overround aufweisen als Märkte für Gesamtzahlen, Handicaps, Spieler-Spezialwetten oder das genaue Ergebnis. Märkte mit vielen möglichen Ausgängen können zudem einen erheblichen Gesamtoverround ansammeln.",
        "Aus diesem Grund kann der Vergleich einer einzelnen Margenzahl über nicht zusammenhängende Marktarten hinweg irreführend sein. Der nützlichste Vergleich findet in der Regel zwischen Buchmachern statt, die denselben Markt für dasselbe Ereignis zum ungefähr gleichen Zeitpunkt anbieten."
      ],
    },
    {
      id: "changing-margin",
      heading: "Warum sich der Overround vor einem Spiel ändern kann",
      paragraphs: [
        "Märkte sind dynamisch. Wenn ein Spiel näher rückt, können neue Informationen eintreffen, die Liquidität kann steigen, konkurrierende Buchmacher können ihre Kurse anpassen und Buchmacher können ihr Risikoengagement ändern. Der gesamte Marktoverround kann sich daher im Laufe der Zeit verändern.",
        "Bei einigen hochkarätigen Ereignissen kann die Preisgestaltung wettbewerbsfähiger werden, je mehr der Markt reift. In anderen Situationen können Unsicherheit oder betriebliche Entscheidungen zu breiteren Kursen führen. Es gibt keine allgemeingültige Regel, dass die Marge immer sinken muss, wenn der Anpfiff näher rückt.",
        "Eine Margenberechnung ist daher eine Momentaufnahme, die auf den zu diesem Zeitpunkt verwendeten Kursen basiert. Historischer Overround und aktueller Overround sollten nicht als austauschbar betrachtet werden."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Häufige Fehler bei der Interpretation der Buchmachermarge",
      paragraphs: [
        "Ein häufiger Fehler besteht darin, den Overround als garantierten prozentualen Gewinn des Buchmachers zu betrachten. Das ist er nicht. Ein weiterer Fehler ist die Annahme, dass die rohen impliziten Wahrscheinlichkeiten faire Wahrscheinlichkeiten darstellen. Es handelt sich um kursbasierte Gewinnschwellen, die üblicherweise eine Marge enthalten.",
        "Ein dritter Fehler besteht darin, den Overround zwischen Märkten mit unterschiedlichen Ergebnisstrukturen ohne Kontext zu vergleichen. Ein Drei-Wege-Siegmarkt, ein Zwei-Wege-Markt für Gesamtzahlen und ein Markt für das genaue Ergebnis sind nicht direkt vergleichbar, nur weil jeder einen einzelnen Margenprozentsatz erzeugt.",
        "Schließlich beseitigt die Entfernung der Marge nicht die Unsicherheit. Eine Schätzung ohne Buchmacher-Marge (No-Vig) kann immer noch falsch, veraltet oder unvollständig sein. Sie ist ein nützlicher analytischer Maßstab, keine Garantie für die tatsächliche Wahrscheinlichkeitsverteilung des Ereignisses."
      ],
      bullets: [
        "Interpretieren Sie den Overround nicht als garantierten Gewinn des Buchmachers.",
        "Bezeichnen Sie implizite Rohwahrscheinlichkeiten nicht automatisch als fair.",
        "Gehen Sie nicht davon aus, dass die Marge gleichmäßig auf die Ergebnisse verteilt ist.",
        "Vergleichen Sie keine unabhängigen Marktarten ohne Kontext.",
        "Behandeln Sie Wahrscheinlichkeiten ohne Marge nicht als sicher oder objektiv wahr.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Wie die Marge in die MatchSignal-Analyse passt",
      paragraphs: [
        "MatchSignal vergleicht Buchmacherquoten und Marktdaten, um Kontext zu aktuellen Auswahlen zu bieten. Der Marktdurchschnitt fasst die beprobten Marktpreise zusammen, während die faire Wahrscheinlichkeit eine analytische Wahrscheinlichkeitsschätzung und kein impliziter Prozentsatz eines Sportwettenanbieters ist.",
        "Der Value Edge soll das Verhältnis zwischen dem verfügbaren Marktpreis und der wahrscheinlichkeitsbasierten Einschätzung von MatchSignal beschreiben. Da Buchmacherpreise eine Marge enthalten können, sollte eine nützliche Analyse zwischen dem für den Nutzer verfügbaren Rohpreis und jeder margenfreien oder modellbasierten Wahrscheinlichkeitsschätzung unterscheiden.",
        "Die Anzahl der beprobten Buchmacher gibt an, wie viele Quellen zur relevanten Marktstichprobe beigetragen haben. Eine breitere Stichprobe kann mehr Kontext zur Marktpreisgestaltung bieten, beseitigt jedoch nicht die Unsicherheit und garantiert nicht, dass die resultierende Schätzung korrekt ist.",
        "Die besten Quoten spiegeln den stärksten verfügbaren Partnerpreis für die angezeigte Auswahl wider. Da der tatsächliche Ausführungspreis die Break-Even-Wahrscheinlichkeit bestimmt, kann selbst ein geringer Unterschied zwischen den Sportwettenanbietern die Wertberechnung beeinflussen."
      ],
      callout: {
        title: "Marktpreis und analytische Wahrscheinlichkeit sind unterschiedlich",
        body:
          "MatchSignal trennt verfügbare Preisgestaltung von wahrscheinlichkeitsbasierter Analyse, damit Nutzer die Beziehung untersuchen können, anstatt Wettquoten als Gewissheit zu betrachten.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Eine praktische Checkliste für den Overround",
      paragraphs: [
        "Verwenden Sie bei der Überprüfung der Buchmachermarge die folgende Reihenfolge, um die häufigsten Interpretationsfehler zu vermeiden."
      ],
      bullets: [
        "Identifizieren Sie alle sich gegenseitig ausschließenden Ergebnisse im jeweiligen Markt.",
        "Rechnen Sie jeden angegebenen Dezimalpreis in eine implizite Wahrscheinlichkeit um.",
        "Addieren Sie die rohen impliziten Wahrscheinlichkeiten.",
        "Subtrahieren Sie 100 %, um den Markt-Overround zu berechnen.",
        "Normalisieren Sie bei Bedarf die Wahrscheinlichkeiten, um einen einfachen Benchmark ohne Marge zu erstellen.",
        "Denken Sie daran, dass proportionale Normalisierung eine Annahme ist, keine absolute Wahrheit.",
        "Vergleichen Sie äquivalente Märkte bei verschiedenen Buchmachern zu ähnlichen Zeitpunkten.",
        "Verwenden Sie die tatsächlich verfügbaren Quoten bei der Berechnung der Break-Even-Wahrscheinlichkeit und des Erwartungswerts (EV).",
        "Betrachten Sie einen niedrigeren Overround als Preisvorteil, nicht als Garantie für bessere Vorhersagen.",
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
    "Das Verständnis der Buchmachermarge kann Ihnen helfen, Quoten klarer zu bewerten, doch eine geringere Marge oder bessere Quoten beseitigen nicht das finanzielle Risiko von Wetten. Ergebnisse bleiben ungewiss, Wahrscheinlichkeitsschätzungen können falsch sein und Verluste können selbst dann auftreten, wenn eine Quote vorteilhaft erscheint. Setzen Sie nur Beträge ein, deren Verlust Sie sich leisten können, nutzen Sie festgelegte Limits und versuchen Sie niemals, Verluste auszugleichen.",
};

export default guide;
