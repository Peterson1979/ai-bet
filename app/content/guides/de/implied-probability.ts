import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "implied-probability",
  locale: "de",
  title: "Was ist die implizite Wahrscheinlichkeit?",
  category: "odds-probability",
  status: "published",
  description:
    "Erfahren Sie, wie Sie Wettquoten in implizite Wahrscheinlichkeiten umrechnen, warum Buchmachermargen dazu führen, dass die rohen Marktwahrscheinlichkeiten 100 % übersteigen, und wie Sie die implizite Wahrscheinlichkeit interpretieren, ohne den Preis mit Gewissheit zu verwechseln.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Die implizite Wahrscheinlichkeit ist die Wahrscheinlichkeit, die in einem Wettpreis kodiert ist. Sie übersetzt Quoten in einen Prozentsatz, wodurch verschiedene Preise leichter vergleichbar werden und Sie die mit einer Wette verbundene Gewinnschwelle erkennen können. Die Berechnung ist einfach, aber die korrekte Interpretation erfordert Sorgfalt: Buchmacherpreise können Margen, Marktbewegungen und Risikomanagement enthalten, daher sollte die implizite Wahrscheinlichkeit nicht als objektive Prognose oder Garantie betrachtet werden.",
  keyTakeaways: [
    "Bei Dezimalquoten entspricht die implizite Wahrscheinlichkeit 1 geteilt durch die Quote, multipliziert mit 100.",
    "Eine Dezimalquote von 2,00 impliziert 50 %; 1,50 impliziert etwa 66,7 %; 4,00 impliziert 25 %.",
    "Die rohen impliziten Wahrscheinlichkeiten über einen Buchmachermarkt hinweg summieren sich oft auf mehr als 100 %, da die Preise die Buchmachermarge enthalten können.",
    "Die implizite Wahrscheinlichkeit ist eine Eigenschaft des notierten Preises, kein Beweis für die tatsächliche Wahrscheinlichkeit eines Ergebnisses.",
    "Eine Wahrscheinlichkeitsschätzung wird für die Wertanalyse erst dann nützlich, wenn sie mit der durch die verfügbaren Quoten implizierten Gewinnschwelle verglichen wird.",
    "Geringe Unterschiede bei den Quoten können die Gewinnschwelle und die langfristige Wirtschaftlichkeit wiederholter Wetten wesentlich verändern.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Was implizite Wahrscheinlichkeit bedeutet",
      paragraphs: [
        "Wettquoten und Wahrscheinlichkeit sind zwei Arten, dieselbe Preisbeziehung auszudrücken. Quoten zeigen die potenzielle Rendite eines Ergebnisses. Die implizite Wahrscheinlichkeit wandelt diesen Preis in die prozentuale Erfolgsrate um, die der notierten Quote entsprechen würde, bevor Buchmachermargen, Modellunsicherheit oder andere Markteffekte berücksichtigt werden.",
        "Zum Beispiel impliziert eine Dezimalquote von 2,00 eine Wahrscheinlichkeit von 50 %. Das bedeutet nicht, dass das Ergebnis in einer kleinen Stichprobe in der Hälfte der Fälle eintritt, und es bedeutet nicht, dass der Buchmacher die wahre Wahrscheinlichkeit entdeckt hat. Es bedeutet, dass ein Preis von 2,00 mathematisch einer Gewinnschwelle von 50 % entspricht: Unter Vernachlässigung anderer praktischer Faktoren würde ein Wettender, der genau die Hälfte identischer Wetten zu 2,00 gewinnt, langfristig den eingesetzten Betrag zurückerhalten.",
        "Diese prozentuale Umrechnung ist nützlich, da Wahrscheinlichkeiten oft leichter zu erfassen sind als reine Quoten. Der Vergleich von 1,62 mit 1,75 mag abstrakt erscheinen. Die Umrechnung in etwa 61,7 % und 57,1 % zeigt sofort, dass die beiden Preise deutlich unterschiedliche Erfolgsquoten erfordern."
      ],
      callout: {
        title: "Preis, nicht Gewissheit",
        body:
          "Eine implizite Wahrscheinlichkeit beschreibt, was ein angegebener Preis mathematisch bedeutet. Es ist kein Versprechen, dass das Ereignis mit dieser Häufigkeit eintritt.",
        tone: "warning",
      },
    },
    {
      id: "formula",
      heading: "Wie man die implizite Wahrscheinlichkeit aus Dezimalquoten berechnet",
      paragraphs: [
        "Für Dezimalquoten lautet die Umrechnungsformel: implizite Wahrscheinlichkeit = 1 ÷ Dezimalquote. Multiplizieren Sie das Ergebnis mit 100, um es als Prozentsatz auszudrücken.",
        "Bei einer Quote von 2,00 lautet die Berechnung 1 ÷ 2,00 = 0,50 oder 50 %. Bei 1,50 sind es 1 ÷ 1,50 = 0,6667 oder etwa 66,7 %. Bei 2,50 sind es 40 %. Bei 5,00 sind es 20 %.",
        "Das Verhältnis ist umgekehrt proportional. Niedrigere Quoten implizieren eine höhere Wahrscheinlichkeit und eine geringere potenzielle Rendite. Höhere Quoten implizieren eine niedrigere Wahrscheinlichkeit und eine höhere potenzielle Rendite. Da das Verhältnis nicht linear ist, stellt eine Änderung von 0,10 bei Dezimalquoten nicht auf jedem Preisniveau die gleiche Wahrscheinlichkeitsänderung dar."
      ],
      bullets: [
        "1,25 ‒ 80,0 % implizite Wahrscheinlichkeit",
        "1,50 → 66,7 %",
        "1,80 → 55,6 %",
        "2,00 → 50,0 %",
        "2,50 → 40,0 %",
        "3,00 → 33,3 %",
        "4,00 → 25,0 %",
        "5,00 → 20,0 %",
      ],
      callout: {
        title: "Beispiel",
        body:
          "Wenn ein Buchmacher eine Quote von 2,20 anbietet, beträgt die implizite Wahrscheinlichkeit 1 ÷ 2,20 = 0,4545 oder etwa 45,5 %. Eine Wahrscheinlichkeitsschätzung von über 45,5 % wäre erforderlich, damit dieser Preis unter Berücksichtigung der Schätzung einen positiven Erwartungswert darstellt.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Warum die implizite Wahrscheinlichkeit auch eine Gewinnschwelle (Break-Even-Wahrscheinlichkeit) ist",
      paragraphs: [
        "Die implizite Wahrscheinlichkeit der verfügbaren Quoten kann als theoretische Gewinnschwelle interpretiert werden. Angenommen, Sie nehmen wiederholt Dezimalquoten von 2,00 an. Eine Gewinnrate von 50 % führt zu einer durchschnittlichen Bruttorendite von einer Einheit pro eingesetzter Einheit: Die Hälfte der Wetten bringt zwei Einheiten zurück und die Hälfte null. Vor Berücksichtigung anderer Kosten oder Einschränkungen ist 50 % daher die Gewinnschwelle.",
        "Bei einer Quote von 1,80 beträgt die implizite Wahrscheinlichkeit etwa 55,6 %. Wenn ein Ereignis tatsächlich nur in 50 % der Fälle eintritt, hätte das wiederholte Annehmen von 1,80 einen negativen Erwartungswert. Bei einer Quote von 2,20 liegt die Gewinnschwelle bei etwa 45,5 %; wenn eine gut kalibrierte Schätzung das Ereignis bei 50 % einstuft, läge der angebotene Preis theoretisch über der Gewinnschwelle.",
        "Dies ist die Grundlage der Erwartungswertanalyse. Der wichtige Vergleich besteht nicht einfach darin, ob ein Ereignis wahrscheinlich eintritt. Es geht darum, ob die geschätzte Wahrscheinlichkeit im Verhältnis zum angebotenen Preis hoch genug ist."
      ],
      callout: {
        title: "Wahrscheinlich bedeutet nicht automatisch wertvoll",
        body:
          "Ein Ereignis kann eine Eintrittswahrscheinlichkeit von 70 % haben und dennoch unattraktiv sein, wenn die verfügbaren Quoten eine Gewinnschwelle von über 70 % erfordern. Umgekehrt kann ein Ereignis mit geringerer Wahrscheinlichkeit attraktiv sein, wenn der Preis das Risiko gemäß einer zuverlässigen Schätzung mehr als kompensiert.",
        tone: "info",
      },
    },
    {
      id: "margin",
      heading: "Warum die impliziten Wahrscheinlichkeiten der Buchmacher mehr als 100 % ergeben können",
      paragraphs: [
        "Wenn ein Markt sich gegenseitig ausschließende Ereignisse mit absolut fairen Preisen und ohne Marge abbilden würde, würden sich die impliziten Wahrscheinlichkeiten auf 100 % summieren. Reale Buchmachermärkte übersteigen oft 100 %. Der Überschuss wird üblicherweise als Overround oder Buchmachermarge bezeichnet.",
        "Betrachten Sie einen vereinfachten Markt mit zwei Ergebnissen, bei dem beide Seiten mit 1,91 quotiert sind. Jeder Preis impliziert etwa 52,36 %. Zusammen ergeben sie etwa 104,72 %. Die 4,72 Prozentpunkte über 100 % veranschaulichen die Gewinnspanne (Overround) in diesem vereinfachten Markt.",
        "Aufgrund dieser Marge sollte die rohe implizite Wahrscheinlichkeit einer Auswahl des Buchmachers nicht automatisch als deren faire Wahrscheinlichkeit bezeichnet werden. Analysten können die Marge entfernen oder normalisieren, um eine Schätzung ohne Buchmachermarge (No-Vig) zu erstellen, was jedoch eine zusätzliche Berechnung erfordert."
      ],
      bullets: [
        "Rechnen Sie die Quoten jedes Ergebnisses in eine rohe implizite Wahrscheinlichkeit um.",
        "Addieren Sie alle sich gegenseitig ausschließenden Ergebniswahrscheinlichkeiten.",
        "Eine Summe von über 100 % deutet auf eine Gewinnspanne (Overround) im notierten Markt hin.",
        "Normalisieren Sie die Ergebniswahrscheinlichkeiten, wenn Sie eine einfache Marktschätzung ohne Marge benötigen.",
      ],
      callout: {
        title: "Wichtige Unterscheidung",
        body:
          "Die rohe implizite Wahrscheinlichkeit ergibt sich direkt aus einem notierten Preis. Eine Schätzung ohne Marge oder eine faire Wahrscheinlichkeit erfordert eine zusätzliche Anpassung und sollte entsprechend gekennzeichnet werden.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Ein einfaches Beispiel für die Entfernung der Gewinnspanne (Overround)",
      paragraphs: [
        "Eine grundlegende Methode zur Erstellung einer Schätzung ohne Marge ist die proportionale Normalisierung. Angenommen, ein Markt mit zwei Ergebnissen hat rohe implizite Wahrscheinlichkeiten von 55 % und 50 %, was insgesamt 105 % ergibt. Teilen Sie jede Wahrscheinlichkeit durch 105 %. Die normalisierten Schätzungen betragen dann etwa 52,38 % und 47,62 %, was in der Summe 100 % ergibt.",
        "Dieses Verfahren ist ein nützlicher Weg, um die Struktur eines Marktes zu verstehen, trifft jedoch eine Annahme: dass die Buchmachermarge proportional auf die Ergebnisse verteilt ist. Die tatsächliche Preisgestaltung kann komplizierter sein. Die Marge wird möglicherweise nicht gleichmäßig verteilt, verschiedene Ergebnisse können unterschiedliche Nachfrage erzeugen, und Buchmacher können unterschiedliche Handels- und Risikomanagementstrategien anwenden.",
        "Das Entfernen der Gewinnspanne ist daher nicht dasselbe wie das Ermitteln der wahren Wahrscheinlichkeit. Es lässt sich besser als Ableitung einer bereinigten, marktbasierten Schätzung aus den notierten Preisen beschreiben."
      ],
      callout: {
        title: "No-vig bedeutet nicht perfekt.",
        body:
          "Ein normalisierter Markt kann ein nützlicher Maßstab sein, aber Unsicherheit, Informationslücken, Marktverzerrungen und Preisunterschiede können dennoch bestehen bleiben.",
        tone: "info",
      },
    },
    {
      id: "formats",
      heading: "Implizite Wahrscheinlichkeit über verschiedene Quotenformate hinweg",
      paragraphs: [
        "Dezimal-, Bruch- und amerikanische Quoten drücken dasselbe wirtschaftliche Verhältnis in unterschiedlichen Formaten aus. MatchSignal verwendet Dezimalquoten, da sie sowohl die Renditeberechnungen als auch die Wahrscheinlichkeitsumrechnung direkt machen.",
        "Bruchquoten wie 3/2 stellen den Gewinn im Verhältnis zum Einsatz dar. Um sie in Dezimalzahlen umzurechnen, addieren Sie eins: 3/2 wird zu 2,50 dezimal, was 40 % impliziert. Amerikanische Quoten verwenden positive und negative Zahlen um einen Referenzpunkt von 100 Einheiten, daher unterscheidet sich die Umrechnungsformel je nachdem, ob der Preis positiv oder negativ ist.",
        "Sobald ein Format in Dezimalquoten umgerechnet wurde, kann dieselbe Formel 1 ÷ Quote verwendet werden. Dies macht Dezimalquoten zu einer bequemen gemeinsamen Sprache für den Vergleich von Preisen aus mehreren Quellen."
      ],
      bullets: [
        "Bruch 1/1 = dezimal 2,00 = 50 % implizite Wahrscheinlichkeit.",
        "Bruch 3/2 = dezimal 2,50 = 40 %.",
        "Amerikanisch +100 = dezimal 2,00 = 50 %.",
        "Amerikanisch -200 = dezimal 1,50 = etwa 66,7 %.",
      ],
    },
    {
      id: "price-comparison",
      heading: "Wie bessere Quoten die implizite Wahrscheinlichkeit verändern",
      paragraphs: [
        "Der Preisvergleich ist wichtig, da ein besserer Preis die Erfolgsquote reduziert, die erforderlich ist, um die Gewinnschwelle zu erreichen. Stellen Sie sich vor, dieselbe Auswahl ist zu 1,80, 1,90 und 2,00 verfügbar. Diese Preise implizieren jeweils etwa 55,6 %, 52,6 % und 50,0 %.",
        "Das zugrunde liegende Sportereignis ist identisch, aber die Wirtschaftlichkeit der Wette nicht. Wenn Ihre Wahrscheinlichkeitseinschätzung bei 54 % läge, würde der Kurs von 1,80 in ungünstiger Weise über Ihrer Schätzung liegen, da er 55,6 % erfordert, um die Gewinnschwelle zu erreichen. Die Kurse von 1,90 und 2,00 würden niedrigere Gewinnschwellen erfordern und könnten daher unter der 54-%-Schätzung einen positiven Erwartungswert erzielen.",
        "Dies verdeutlicht, warum es beim Quotenvergleich nicht nur darum geht, die Auszahlung nach einem Gewinn zu maximieren. Der Preis verändert die mathematische Schwelle, die Ihre Wahrscheinlichkeitsschätzung überschreiten muss."
      ],
      callout: {
        title: "Gleicher Tipp, anderer Wert",
        body:
          "Eine Auswahl hat keinen festen Wert, der unabhängig vom Preis ist. Wenn sich die Quoten ändern, ändern sich auch die implizite Wahrscheinlichkeit und das Verhältnis zum Erwartungswert.",
        tone: "example",
      },
    },
    {
      id: "market-movement",
      heading: "Was passiert mit der impliziten Wahrscheinlichkeit, wenn sich Quoten bewegen",
      paragraphs: [
        "Wenn Quoten sinken, steigt die implizite Wahrscheinlichkeit. Wenn Quoten steigen, sinkt die implizite Wahrscheinlichkeit. Eine Bewegung von 2,20 auf 2,00 ändert die implizite Wahrscheinlichkeit von etwa 45,5 % auf 50 %. Eine Bewegung von 2,00 auf 1,80 erhöht sie weiter auf etwa 55,6 %.",
        "Quoten können sich aus vielen Gründen ändern: neue Informationen, Verletzungen, bestätigte Aufstellungen, Wetter, Marktaktivität, Änderungen bei konkurrierenden Buchmachern oder die eigenen Risikomanagement-Entscheidungen eines Buchmachers. Eine Quotenänderung beweist daher nicht, dass sich die zugrunde liegende tatsächliche Wahrscheinlichkeit um genau denselben Betrag geändert hat.",
        "Dennoch kann die Umrechnung einer Preisbewegung in eine implizite Wahrscheinlichkeit das Ausmaß der Bewegung intuitiver machen. Zu sagen, dass sich ein Preis von 2,20 auf 1,90 verkürzt hat, ist weniger unmittelbar, als zu erkennen, dass sich die angegebene Gewinnschwellen-Wahrscheinlichkeit von etwa 45,5 % auf 52,6 % bewegt hat."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Häufige Fehler beim Lesen der impliziten Wahrscheinlichkeit",
      paragraphs: [
        "Die Arithmetik ist einfach genug, sodass die meisten Fehler eher aus der Interpretation als aus der Berechnung resultieren. Der häufigste Fehler besteht darin, die implizite Wahrscheinlichkeit als Gewissheit oder als exakte Prognose des Buchmachers zu behandeln. Ein weiterer Fehler ist der Vergleich von Wahrscheinlichkeiten aus verschiedenen Märkten, ohne zu prüfen, ob die Auswahlen und Abrechnungsregeln wirklich gleichwertig sind.",
        "Ein dritter Fehler ist das Ignorieren der Buchmachermarge. Wenn sich die Wahrscheinlichkeiten in einem Markt auf 105 % summieren, übertreibt die Angabe jedes Rohprozentsatzes als faire Wahrscheinlichkeit die verfügbare Gesamtwahrscheinlichkeit. Schließlich können Wettende kleine scheinbare Vorteile überschätzen. Ein Unterschied von ein oder zwei Prozentpunkten kann verschwinden, wenn das zugrunde liegende Wahrscheinlichkeitsmodell unsicher oder schlecht kalibriert ist."
      ],
      bullets: [
        "Interpretieren Sie die implizite Wahrscheinlichkeit nicht als Gewissheit.",
        "Bezeichnen Sie die rohe Buchmacher-Wahrscheinlichkeit nicht als 'faire Wahrscheinlichkeit', ohne die Marge zu berücksichtigen.",
        "Vergleichen Sie keine Quoten aus unterschiedlichen Marktdefinitionen, als wären sie identisch.",
        "Gehen Sie nicht davon aus, dass jeder Unterschied zwischen Ihrer Schätzung und dem Markt ein echter Vorteil ist.",
        "Ignorieren Sie nicht, dass sich Quoten ändern können, bevor eine Wette platziert wird.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Wie implizite Wahrscheinlichkeit in MatchSignal passt",
      paragraphs: [
        "MatchSignal verwendet die Preisgestaltung der Buchmacher als einen Teil seines Sportanalyse-Frameworks. Marktpreise können in Wahrscheinlichkeitsbegriffe übersetzt werden, sodass verschiedene Buchmacher und Marktbeobachtungen auf einer gemeinsamen Skala verglichen werden können.",
        "Auf MatchSignal-Karten fasst der Marktdurchschnitt die stichprobenartigen Marktpreise zusammen, während die faire Wahrscheinlichkeit eine analytische Schätzung und kein roher Buchmacher-Prozentsatz ist. Der Value Edge soll den Unterschied zwischen dem verfügbaren Marktpreis und der auf Wahrscheinlichkeiten basierenden Einschätzung von MatchSignal beschreiben. Die Anzahl der erfassten Buchmacher gibt an, wie viele Buchmacherquellen zu der relevanten Marktstichprobe beigetragen haben.",
        "Diese Felder sollen die Marktpreisgestaltung und den Modellkontext leichter überprüfbar machen. Sie sind keine Garantien für ein sportliches Ergebnis oder einen Gewinn. Modellannahmen, die Qualität der Quelldaten, Marktbewegungen und gewöhnliche sportliche Varianz können das Ergebnis beeinflussen."
      ],
      callout: {
        title: "Nutzen Sie Wahrscheinlichkeit als Rahmenwerk",
        body:
          "Wahrscheinlichkeit hilft dabei, Unsicherheit zu strukturieren. Sie beseitigt keine Unsicherheit, und kein Modell kann das Ergebnis eines Sportereignisses garantieren.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Eine praktische Checkliste für implizite Wahrscheinlichkeit",
      paragraphs: [
        "Verwenden Sie bei der Bewertung eines Wettpreises die implizite Wahrscheinlichkeit als Ausgangspunkt und nicht als endgültige Antwort. Die folgende Abfolge hilft dabei, Preis, Marktstruktur und Wahrscheinlichkeitsschätzung getrennt zu halten."
      ],
      bullets: [
        "Identifizieren Sie den genauen Markt und die Auswahl.",
        "Wandeln Sie die verfügbaren Dezimalquoten in implizite Wahrscheinlichkeiten um.",
        "Prüfen Sie, ob der Markt eine Buchmacher-Marge oder einen Overround enthält.",
        "Vergleichen Sie äquivalente Preise über verschiedene Sportwettenanbieter hinweg, sofern verfügbar.",
        "Wenn Sie ein Wahrscheinlichkeitsmodell verwenden, vergleichen Sie dessen Schätzung mit der Break-Even-Wahrscheinlichkeit des Preises.",
        "Berücksichtigen Sie Modellunsicherheiten, anstatt kleine numerische Unterschiede als sichere Vorteile zu betrachten.",
        "Überprüfen Sie die aktuellen Quoten erneut, bevor Sie handeln, da sich Marktpreise bewegen können.",
        "Verwenden Sie eine disziplinierte Einsatzhöhe und betrachten Sie Wahrscheinlichkeitsanalysen niemals als Garantie."
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
    "Wetten sind mit finanziellem Risiko verbunden. Die implizite Wahrscheinlichkeit ist eine mathematische Interpretation eines Preises, keine Garantie für ein Ergebnis oder einen Gewinn. Setzen Sie nur Beträge ein, deren Verlust Sie sich leisten können, vermeiden Sie es, Verlusten hinterherzujagen, und halten Sie Wettentscheidungen innerhalb festgelegter Grenzen.",
};

export default guide;
