import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "how-betting-odds-work",
  locale: "de",
  title: "Wie Wettquoten tatsächlich funktionieren",
  category: "odds-probability",
  status: "published",
  description:
    "Erfahren Sie, was Wettquoten darstellen, wie sie mit Wahrscheinlichkeiten zusammenhängen, warum Buchmacherpreise eine Marge enthalten und wie man Quoten vergleicht, ohne den Preis mit einer Vorhersage zu verwechseln.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Wettquoten sind Preise. Sie geben an, wie viel eine erfolgreiche Wette einbringen kann, aber sie kodieren auch die Einschätzung des Marktes darüber, wie wahrscheinlich ein Ergebnis ist. Es ist wichtig, beide Seiten dieser Beziehung zu verstehen: Quoten sind keine Garantie, und der niedrigste Preis ist nicht automatisch die beste Wette. Dieser Leitfaden erklärt Dezimalquoten, implizite Wahrscheinlichkeit, Buchmachermarge, Marktbewegungen und warum der Preisvergleich wichtig ist.",
  keyTakeaways: [
    "Dezimalquoten zeigen die Gesamtauszahlung pro eingesetzter Einheit, einschließlich des ursprünglichen Einsatzes.",
    "Die implizite Wahrscheinlichkeit wird aus Dezimalquoten berechnet als 1 geteilt durch die Quote.",
    "Buchmacherpreise enthalten in der Regel eine Marge, sodass die impliziten Wahrscheinlichkeiten über alle Ergebnisse hinweg mehr als 100 % ergeben können.",
    "Ein niedrigerer Preis bedeutet eine höhere implizite Wahrscheinlichkeit, kein sicheres Ergebnis.",
    "Dieselbe Auswahl kann bei verschiedenen Buchmachern unterschiedliche Quoten haben, daher wirkt sich der Preisvergleich direkt auf die potenzielle Rendite aus.",
    "Quoten können sich ändern, wenn neue Informationen, Marktaktivitäten und das Risikomanagement der Buchmacher den Preis beeinflussen.",
  ],
  sections: [
    {
      id: "odds-are-prices",
      heading: "Wettquoten sind Preise, keine Vorhersagen",
      paragraphs: [
        "Der einfachste Weg, Wettquoten zu verstehen, besteht darin, sie als Preis für ein mögliches Ergebnis zu betrachten. Bei einem Fußballspiel kann ein Buchmacher einen Preis für die Heimmannschaft, einen anderen für das Unentschieden und einen weiteren für die Auswärtsmannschaft festlegen. Diese Preise bestimmen die Auszahlung, wenn das gewählte Ergebnis eintritt.",
        "Quoten enthalten auch Informationen zur Wahrscheinlichkeit. Ein niedrigerer Dezimalpreis entspricht einer höheren impliziten Wahrscheinlichkeit, während ein höherer Preis einer niedrigeren impliziten Wahrscheinlichkeit entspricht. Das bedeutet nicht, dass der Buchmacher weiß, was passieren wird. Es bedeutet, dass der Markt unsicheren Ergebnissen unterschiedliche Preise zuweist.",
        "Diese Unterscheidung ist wichtig, da eine Vorhersage und ein Preis unterschiedliche Fragen beantworten. Eine Vorhersage fragt, welches Ergebnis wahrscheinlicher ist. Ein Preis fragt, welche Rendite für das Eingehen dieses Risikos angeboten wird. Ein Team kann der wahrscheinlichste Sieger sein und bei einem ausreichend niedrigen Preis dennoch unattraktiv sein."
      ],
      callout: {
        title: "Kernidee",
        body:
          "Ein starker Favorit kann dennoch verlieren. Quoten drücken einen Marktpreis für Unsicherheit aus; sie beseitigen die Unsicherheit nicht.",
        tone: "info",
      },
    },
    {
      id: "decimal-odds",
      heading: "Wie Dezimalquoten funktionieren",
      paragraphs: [
        "MatchSignal verwendet Dezimalquoten, da sie die Berechnung von Renditen und die Umrechnung in Wahrscheinlichkeiten vereinfachen. Dezimalquoten zeigen den Gesamtbetrag an, der für jede eingesetzte Einheit bei einem Wettgewinn zurückgezahlt wird. Die Gesamtrendite beinhaltet den ursprünglichen Einsatz.",
        "Zum Beispiel: Bei einer Dezimalquote von 2,00 bringt ein Einsatz von 10 Einheiten im Erfolgsfall 20 Einheiten zurück: 10 Einheiten Gewinn plus den ursprünglichen Einsatz von 10 Einheiten. Bei einer Quote von 1,50 bringt derselbe Einsatz von 10 Einheiten insgesamt 15 Einheiten zurück. Bei einer Quote von 3,00 bringt er 30 Einheiten zurück.",
        "Das grundlegende Verhältnis ist einfach: Die Gesamtrendite entspricht dem Einsatz multipliziert mit der Dezimalquote. Der Gewinn entspricht der Gesamtrendite abzüglich des ursprünglichen Einsatzes."
      ],
      bullets: [
        "10 Einheiten bei 1,50 → 15 Einheiten Gesamtrendite, 5 Einheiten Gewinn.",
        "10 Einheiten bei 2,00 → 20 Einheiten Gesamtrendite, 10 Einheiten Gewinn.",
        "10 Einheiten bei 3,00 → 30 Einheiten Gesamtrendite, 20 Einheiten Gewinn.",
      ],
      callout: {
        title: "Beispiel",
        body:
          "Höhere Quoten erhöhen die potenzielle Rendite, entsprechen aber normalerweise Ergebnissen, die der Markt als weniger wahrscheinlich einstuft.",
        tone: "example",
      },
    },
    {
      id: "implied-probability",
      heading: "Quoten in implizite Wahrscheinlichkeiten umrechnen",
      paragraphs: [
        "Dezimalquoten lassen sich mit einer einfachen Formel in implizite Wahrscheinlichkeiten umrechnen: implizite Wahrscheinlichkeit = 1 ÷ Dezimalquote. Multiplizieren Sie das Ergebnis mit 100, um es als Prozentsatz auszudrücken.",
        "Eine Quote von 2,00 impliziert 50 %. Eine Quote von 1,50 impliziert etwa 66,7 %. Eine Quote von 4,00 impliziert 25 %. Dies bietet Ihnen eine einheitliche Wahrscheinlichkeitsskala, um Preise zu vergleichen, die auf den ersten Blick sehr unterschiedlich erscheinen mögen.",
        "Die implizite Wahrscheinlichkeit des Buchmachers ist jedoch nicht dasselbe wie eine präzise objektive Wahrscheinlichkeit. Der Preis kann eine Buchmachermarge enthalten, auf die Marktnachfrage reagieren oder sich ändern, sobald neue Informationen verfügbar werden. Sie ist eher als die im notierten Preis eingebettete Wahrscheinlichkeit zu verstehen."
      ],
      bullets: [
        "1,50 → 1 ÷ 1,50 = 66,7 %",
        "2,00 → 1 ÷ 2,00 = 50,0 %",
        "2,50 → 1 ÷ 2,50 = 40,0 %",
        "4,00 → 1 ÷ 4,00 = 25,0 %",
      ],
      callout: {
        title: "Interpretieren Sie 66,7 % nicht als Gewissheit",
        body:
          "Eine implizite Wahrscheinlichkeit ist die Übersetzung eines Preises. Sportergebnisse in der realen Welt bleiben ungewiss, selbst wenn der Markt eine hohe Wahrscheinlichkeit zuweist.",
        tone: "warning",
      },
    },
    {
      id: "bookmaker-margin",
      heading: "Warum die Wahrscheinlichkeiten mehr als 100 % ergeben können",
      paragraphs: [
        "Wenn Sie jedes Ergebnis in einem Buchmachermarkt in eine implizite Wahrscheinlichkeit umrechnen und diese addieren, übersteigt die Summe oft 100 %. Der Betrag über 100 % wird üblicherweise als Buchmachermarge oder Overround bezeichnet.",
        "Betrachten wir einen vereinfachten Markt mit zwei Ergebnissen, bei dem beide Seiten mit 1,91 quotiert sind. Jeder Preis impliziert etwa 52,36 %. Zusammenaddiert ergibt der Markt etwa 104,72 %. Die Differenz zwischen 104,72 % und 100 % stellt die Gewinnspanne (Overround) in diesem vereinfachten Markt dar.",
        "Die Marge bedeutet, dass die rohen implizierten Wahrscheinlichkeiten nicht automatisch faire Wahrscheinlichkeiten sind. Analysten können eine Wahrscheinlichkeit ohne Marge schätzen, indem sie die Wahrscheinlichkeiten über den Markt hinweg normalisieren, aber dies bleibt eine Schätzung auf Basis der verfügbaren Preise und keine Garantie für die tatsächliche Eintrittswahrscheinlichkeit jedes Ergebnisses."
      ],
      callout: {
        title: "Warum das wichtig ist",
        body:
          "Zwei Märkte können ähnliche Erwartungen ausdrücken, während sie unterschiedliche Margen bieten. Ein Markt mit niedrigerer Marge bietet Wettern bei sonst gleichen Bedingungen im Allgemeinen wettbewerbsfähigere Preise.",
        tone: "info",
      },
    },
    {
      id: "favorite-underdog",
      heading: "Favoriten, Außenseiter und was der Preis wirklich aussagt",
      paragraphs: [
        "Ein Favorit ist einfach das Ergebnis mit dem niedrigeren Preis im relevanten Markt. Ein Außenseiter hat einen höheren Preis. Diese Bezeichnungen beschreiben relative Markterwartungen, nicht garantierte Qualität oder tatsächliche Ergebnisse.",
        "Angenommen, Team A wird mit 1,40 und Team B mit 7,00 in einem Markt angeboten, der auch ein Unentschieden beinhaltet. Team A ist der Favorit, da sein Preis eine viel höhere Wahrscheinlichkeit impliziert als der Preis von Team B. Ob einer der Preise attraktiv ist, hängt jedoch davon ab, wie die angebotenen Quoten im Vergleich zu einer vernünftigen Wahrscheinlichkeitsschätzung stehen.",
        "Hier unterscheidet sich die Wertanalyse von der Auswahl des Gewinners. Das Team zu wählen, das am wahrscheinlichsten gewinnt, ist nicht unbedingt dasselbe wie den günstigsten Preis zu finden. Eine Gewinnchance von 75 %, die zu Quoten angeboten wird, die eine Gewinnschwelle von 80 % erfordern, würde unter dieser Wahrscheinlichkeitsschätzung keinen positiven Erwartungswert darstellen."
      ],
    },
    {
      id: "compare-odds",
      heading: "Warum der Quotenvergleich wichtig ist",
      paragraphs: [
        "Wettanbieter bieten nicht immer identische Preise an. Ein Anbieter notiert möglicherweise 1,85, während ein anderer 1,95 für dieselbe Auswahl und denselben Markt anbietet. Das zugrunde liegende Ereignis hat sich nicht geändert, aber Ihre potenzielle Rendite schon.",
        "Bei einem Einsatz von 100 Einheiten bringt eine Quote von 1,85 im Erfolgsfall 185 Einheiten zurück, während 1,95 195 Einheiten einbringt. Über eine große Anzahl von Wetten hinweg kann die wiederholte Annahme schlechterer Preise die Rendite erheblich schmälern, selbst wenn die Auswahlen selbst identisch sind.",
        "Der Preisvergleich ist daher einer der wenigen Aspekte des Wettens, der keine genauere Vorhersage des Spiels erfordert. Wenn Markt, Auswahl, Abrechnungsregeln und Zeitpunkt wirklich vergleichbar sind, bietet der höhere verfügbare Preis eine bessere potenzielle Rendite für denselben Einsatz."
      ],
      callout: {
        title: "Vergleichen Sie Gleiches mit Gleichem",
        body:
          "Überprüfen Sie, ob die Marktdefinition, die Linie, die Abrechnungsregeln und das Ereignis identisch sind, bevor Sie zwei notierte Quoten als direkt vergleichbar betrachten.",
        tone: "warning",
      },
    },
    {
      id: "why-odds-move",
      heading: "Warum sich Quoten vor einem Spiel bewegen",
      paragraphs: [
        "Quoten sind keine festen Einschätzungen. Sie können sich von dem Moment an, in dem ein Markt öffnet, bis zum Ende der Wettannahme ändern. Neue Informationen zum Team, Verletzungen, bestätigte Aufstellungen, Wetter, Terminänderungen, Marktaktivität und eine breitere Preisfindung können alle zu Bewegungen beitragen.",
        "Buchmacher können Preise auch als Teil des Risikomanagements oder als Reaktion auf Bewegungen an anderer Stelle im Markt anpassen. Infolgedessen offenbart eine Quotenbewegung nicht immer eine einfache Ursache. Ein sinkender Preis kann aussagekräftige neue Informationen, Marktdruck oder eine Kombination von Faktoren widerspiegeln.",
        "Deshalb sollten historische Screenshots eines Preises nicht mit der aktuellen Verfügbarkeit verwechselt werden. Eine nützliche Analyse sollte den tatsächlich bewerteten Preis identifizieren und ihn, wo möglich, mit aktuellen Marktalternativen vergleichen."
      ],
    },
    {
      id: "value-and-break-even",
      heading: "Quoten, Break-Even-Wahrscheinlichkeit und Value",
      paragraphs: [
        "Jeder Preis impliziert eine Break-Even-Wahrscheinlichkeit, bevor Transaktionsdetails oder Modellunsicherheiten berücksichtigt werden. Bei einer Dezimalquote von 2,00 liegt die implizite Break-Even-Rate bei 50 %. Bei 1,80 liegt sie bei etwa 55,6 %. Bei 2,50 liegt sie bei 40 %.",
        "Wenn Ihre Wahrscheinlichkeitsschätzung deutlich höher ist als die durch den angebotenen Preis implizierte Wahrscheinlichkeit, kann die Wette unter dieser Schätzung einen positiven Erwartungswert haben. Wenn Ihre Schätzung niedriger ist, kann der Preis ungünstig sein. Die Qualität der Schlussfolgerung hängt vollständig von der Qualität und Kalibrierung der Wahrscheinlichkeitsschätzung ab.",
        "Wenn beispielsweise eine Quote von 2,20 etwa 45,5 % impliziert und eine Analyse das Ergebnis auf 50 % schätzt, besteht eine theoretische positive Differenz zwischen der geschätzten Wahrscheinlichkeit und der marktimplizierten Wahrscheinlichkeit. Diese Differenz ist kein Gewinnversprechen. Selbst eine korrekt identifizierte Chance mit positivem Erwartungswert kann verlieren, und Modellschätzungen können falsch sein."
      ],
      callout: {
        title: "Value ist probabilistisch",
        body:
          "Ein positiver Erwartungswert beschreibt eine geschätzte langfristige Beziehung zwischen Wahrscheinlichkeit und Preis. Er bedeutet nicht, dass eine einzelne Wette mit Sicherheit gewinnen wird.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal-context",
      heading: "Wie MatchSignal Quoten verwendet",
      paragraphs: [
        "MatchSignal vergleicht verfügbare Buchmacherkurse und Marktdaten und kombiniert diese Informationen mit KI-generiertem Spielkontext. Auf einer MatchSignal-Karte bezieht sich „Beste Quote“ auf den stärksten verfügbaren Partnerpreis für die angezeigte Auswahl, während „Marktdurchschnitt“ die für den Vergleich verwendeten Stichproben-Marktpreise zusammenfasst.",
        "Die „Faire Wahrscheinlichkeit“ ist eine analytische Schätzung und kein Buchmacherangebot. „Value Edge“ beschreibt die Differenz zwischen dem angebotenen Marktpreis und der auf Wahrscheinlichkeiten basierenden Einschätzung von MatchSignal. „Stichproben-Anbieter“ gibt an, wie viele Buchmacherquellen zu der relevanten Marktstichprobe beigetragen haben.",
        "Diese Felder sollen den Preiskontext leichter überprüfbar machen. Sie sollten nicht als Garantien, Finanzberatung oder Gewissheit über ein sportliches Ergebnis betrachtet werden. Modellannahmen, Marktveränderungen, Datenqualität und die übliche sportliche Varianz können das Ergebnis beeinflussen."
      ],
    },
    {
      id: "practical-checklist",
      heading: "Eine praktische Checkliste für die Analyse jedes Wettmarktes",
      paragraphs: [
        "Wenn Sie einen Wettmarkt öffnen, unterteilen Sie die Analyse in Preis, Wahrscheinlichkeit und Unsicherheit. Dies verhindert einige häufige Fehler, wie etwa die Annahme, dass der Favorit gewinnen muss, oder die Betrachtung einer hohen potenziellen Auszahlung als Beweis dafür, dass eine Wette attraktiv ist."
      ],
      bullets: [
        "Identifizieren Sie den genauen Markt und die Auswahl.",
        "Lesen Sie die Dezimalquoten als Preis und berechnen Sie die implizite Wahrscheinlichkeit.",
        "Prüfen Sie, ob der Markt eine Buchmachermarge enthält.",
        "Vergleichen Sie dieselbe Auswahl bei mehreren Sportwettenanbietern, sofern verfügbar.",
        "Trennen Sie Ihre eigene Wahrscheinlichkeitsschätzung von der vom Buchmacher angegebenen Wahrscheinlichkeit.",
        "Betrachten Sie eine Quotenbewegung nicht als Beweis dafür, dass eine Seite gewinnen wird.",
        "Berücksichtigen Sie Unsicherheit, Varianz und Einsatzhöhe, bevor Sie eine Entscheidung treffen."
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
    "Wetten sind mit finanziellem Risiko verbunden und die Ergebnisse sind ungewiss. Quoten und Wahrscheinlichkeitsschätzungen können kein Ergebnis garantieren. Setzen Sie nur Beträge ein, deren Verlust Sie sich leisten können, vermeiden Sie es, Verlusten hinterherzujagen, und betrachten Sie Wettanalysen als Information und nicht als Gewinnversprechen.",
};

export default guide;
