import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "matchsignal-value-edge",
  locale: "de",
  title: "Wie MatchSignal den Value Edge berechnet",
  category: "value-analysis",
  status: "published",
  description:
    "Erfahren Sie, wie MatchSignal den Value Edge berechnet und interpretiert, wie sich die faire Wahrscheinlichkeit und die angebotenen Dezimalquoten zu einem geschätzten Wert kombinieren, warum sich der Value Edge vom probability-point valueDiff unterscheidet und warum ein positives Signal keine Garantie für einen Gewinn ist.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Der Value Edge von MatchSignal wurde entwickelt, um aufzuzeigen, wie vorteilhaft ein verfügbarer Preis im Verhältnis zur wahrscheinlichkeitsbasierten Einschätzung der Plattform erscheint. Auf der MatchCard wird der Value Edge durch das Feld estimatedValuePct dargestellt. Wenn MatchSignal über eine faire Wahrscheinlichkeit und einen verfügbaren Partnerpreis verfügt, entspricht die mathematische Beziehung der gleichen Erwartungswertformel, die in der gesamten Wettanalyse verwendet wird: Der geschätzte Wert in Prozent entspricht der fairen Wahrscheinlichkeit als Dezimalzahl multipliziert mit den angebotenen Dezimalquoten, minus eins, dann multipliziert mit 100. Die Produktions-Pipeline kann auch einen expliziten, KI-generierten estimatedValuePct akzeptieren, wenn dieses Feld von der Analyseebene zurückgegeben wird; andernfalls greift sie auf die Berechnung des Wertes aus der fairen Wahrscheinlichkeit und den verfügbaren Partnerquoten zurück. Dies macht den Value Edge zu einem Modell- und Preissignal, nicht zu einem Versprechen über das Ergebnis des nächsten Spiels.",
  keyTakeaways: [
    "Die Value Edge-Anzeige der MatchCard verwendet das Feld estimatedValuePct.",
    "Der Berechnungspfad aus Wahrscheinlichkeit und Preis lautet: ((faire Wahrscheinlichkeit / 100) × angebotene Dezimalquote − 1) × 100.",
    "Ein positiver Value Edge bedeutet, dass der Preis im Verhältnis zur von MatchSignal verwendeten Schätzung der fairen Wahrscheinlichkeit vorteilhaft ist.",
    "Ein Value Edge von null bedeutet, dass die angebotenen Quoten ungefähr dem Break-Even-Preis entsprechen, der durch die faire Wahrscheinlichkeit impliziert wird.",
    "Ein negativer Value Edge bedeutet, dass der angebotene Preis niedriger ist, als es die Wahrscheinlichkeitsschätzung für den Break-Even erfordern würde.",
    "Der valueDiff von MatchSignal ist eine andere Kennzahl: Es handelt sich um eine Differenz in Prozentpunkten der Wahrscheinlichkeit, nicht um denselben Wert wie die geschätzte Rendite in Prozent.",
    "Die tägliche Analyse-Pipeline kann einen expliziten KI-estimatedValuePct beibehalten; falls dieser fehlt, kann MatchSignal den Wert aus der fairen Wahrscheinlichkeit und den Partnerquoten berechnen.",
    "Ein positiver Value Edge ist eine analytische Schätzung und garantiert keine gewinnbringende Wette oder einen realisierten Gewinn.",
  ],
  sections: [
    {
      id: "what-value-edge-is",
      heading: "Was MatchSignal unter Value Edge versteht",
      paragraphs: [
        "Auf einer MatchSignal MatchCard ist das Label Value Edge die für den Nutzer sichtbare Darstellung von estimatedValuePct. Die Zahl soll das Verhältnis zwischen der von MatchSignal ermittelten fairen Wahrscheinlichkeit für die angezeigte Auswahl und dem für diese Auswahl verfügbaren Preis beschreiben.",
        "Die grundlegende Frage ist nicht einfach, ob MatchSignal ein Ergebnis für wahrscheinlich hält. Es geht darum, ob die angebotenen Quoten im Verhältnis zu dieser Wahrscheinlichkeitsschätzung hoch genug sind.",
        "Diese Unterscheidung ist wichtig, da dieselbe Vorhersage bei einem Preis attraktiv und bei einem anderen unattraktiv sein kann. Eine Auswahl, die mit 55 % bewertet wird, ist nicht automatisch wertvoll. Bei einer Quote von 2,00 hat sie einen positiven theoretischen Wert; bei 1,70 ist dies nicht der Fall.",
        "Value Edge gehört daher zur Preisebene der Analyse. Es kombiniert eine Wahrscheinlichkeitseinschätzung mit dem am Markt beobachtbaren Preis."
      ],
      callout: {
        title: "Value Edge ist eine Kennzahl für Preis und Wahrscheinlichkeit.",
        body:
          "Es sollte nicht so interpretiert werden, dass MatchSignal ein Team als sicheren Sieger ansieht. Dieselbe Auswahl kann bei unterschiedlichen Quoten einen unterschiedlichen Value Edge aufweisen.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "Die Core Value Edge Formel",
      paragraphs: [
        "Wenn MatchSignal den geschätzten Wert aus der fairen Wahrscheinlichkeit und den angebotenen Quoten berechnet, lautet die Formel: Value Edge % = ((Faire Wahrscheinlichkeit / 100) × Angebotene Dezimalquote − 1) × 100.",
        "Dies ist das standardmäßige Verhältnis der erwarteten Rendite für ein einfaches Sieg-oder-Niederlage-Ergebnis, ausgedrückt als Prozentsatz eines eingesetzten Units.",
        "Der Code wandelt die faire Wahrscheinlichkeit von einem Prozentsatz in eine Dezimalzahl um, multipliziert sie mit der angebotenen Dezimalquote, subtrahiert 1 und wandelt das Ergebnis wieder in Prozent um.",
        "Die resultierende Zahl beantwortet eine theoretische Frage: Wenn die Schätzung der fairen Wahrscheinlichkeit korrekt wäre und dasselbe Wahrscheinlichkeits-Preis-Verhältnis viele Male wiederholt werden könnte, welche durchschnittliche Rendite im Verhältnis zum Einsatz würde dieses Verhältnis implizieren?"
      ],
      bullets: [
        "Wandeln Sie die faire Wahrscheinlichkeit von Prozent in eine Dezimalzahl um.",
        "Multiplizieren Sie mit der angebotenen Dezimalquote.",
        "Subtrahieren Sie 1.",
        "Multiplizieren Sie mit 100, um das Ergebnis als Prozentsatz auszudrücken.",
      ],
      callout: {
        title: "Formel",
        body:
          "Value Edge % = ((Faire Wahrscheinlichkeit / 100) × Angebotene Quote − 1) × 100.",
        tone: "example",
      },
    },
    {
      id: "worked-example",
      heading: "Ein ausgearbeitetes MatchSignal Value Edge Beispiel",
      paragraphs: [
        "Angenommen, MatchSignal weist einer Auswahl eine faire Wahrscheinlichkeit von 55 % zu und die angebotene Partnerquote beträgt 2,00.",
        "Wandeln Sie 55 % in 0,55 um. Multiplizieren Sie 0,55 mit 2,00, um 1,10 zu erhalten. Subtrahieren Sie 1, um 0,10 zu erhalten. Multiplizieren Sie mit 100 und der geschätzte Value Edge beträgt +10 %.",
        "Behalten Sie nun die gleiche faire Wahrscheinlichkeit bei, aber ändern Sie den angebotenen Preis auf 1,80. Die Berechnung ergibt 0,55 × 1,80 − 1 = −0,01, oder ungefähr −1 %.",
        "An der fairen Wahrscheinlichkeit hat sich nichts geändert. Nur der verfügbare Preis hat sich geändert. Deshalb kann ein Preisvergleich das angezeigte Wertverhältnis wesentlich verändern."
      ],
      bullets: [
        "Faire Wahrscheinlichkeit: 55 %.",
        "Angebotene Quote: 2,00.",
        "Berechnung: 0,55 × 2,00 − 1 = 0,10.",
        "Value Edge: +10%.",
        "Bei einer Quote von 1,80 und derselben Wahrscheinlichkeit von 55%: etwa −1%.",
      ],
    },
    {
      id: "break-even",
      heading: "Value Edge und Break-Even-Wahrscheinlichkeit",
      paragraphs: [
        "Der gleiche Zusammenhang lässt sich über die Break-Even-Wahrscheinlichkeit verstehen. Dezimalquoten von 2,00 erfordern eine Gewinnrate von 50%, um vor praktischen Reibungsverlusten die Gewinnschwelle zu erreichen. Quoten von 1,80 erfordern etwa 55,56%.",
        "Wenn die faire Wahrscheinlichkeit von MatchSignal über der durch den verfügbaren Preis implizierten Break-Even-Wahrscheinlichkeit liegt, ist der berechnete Value Edge positiv. Wenn die faire Wahrscheinlichkeit unter diesem Schwellenwert liegt, ist der Value Edge negativ.",
        "Deshalb bedeutet ein positiver Value Edge nicht einfach, dass 'MatchSignal das Team favorisiert'. Es bedeutet, dass die Wahrscheinlichkeitsschätzung im Verhältnis zum angebotenen Preis hoch genug ist, um einen positiven theoretischen Wert zu implizieren.",
        "Eine Auswahl kann eine hohe faire Wahrscheinlichkeit aufweisen und dennoch einen negativen Value Edge haben, wenn der Marktpreis zu niedrig ist."
      ],
      callout: {
        title: "Wahrscheinlichkeit allein ist kein Wert",
        body:
          "Ein Wert entsteht erst, wenn die Wahrscheinlichkeitsschätzung mit dem tatsächlich angebotenen Preis verglichen wird.",
        tone: "warning",
      },
    },
    {
      id: "fair-probability",
      heading: "Wo die faire Wahrscheinlichkeit in die Berechnung einfließt",
      paragraphs: [
        "Die faire Wahrscheinlichkeit ist der Wahrscheinlichkeits-Input, der in der Wertbeziehung verwendet wird. In der täglichen Vorhersage-Pipeline kann eine von einer KI bereitgestellte faire Wahrscheinlichkeit direkt nach der numerischen Validierung und Begrenzung verwendet werden.",
        "Wenn keine explizite KI-Fair-Probability verfügbar ist, enthält die Pipeline eine Fallback-Logik, die eine Wahrscheinlichkeitsschätzung aus Marktinformationen wie dem Marktkonsens und der mit dem Preis verbundenen impliziten Wahrscheinlichkeit ableiten kann.",
        "Dies bedeutet, dass die Fair Probability nicht einfach eine andere Bezeichnung für die rohe implizite Wahrscheinlichkeit der Quoten eines Buchmachers ist. Sie ist ein analytischer Input, der zur Bewertung des Preises verwendet wird.",
        "Da die Wahrscheinlichkeitsschätzung falsch oder unsicher sein kann, erbt der daraus abgeleitete Value Edge diese Unsicherheit ebenfalls."
      ],
      callout: {
        title: "Der Wahrscheinlichkeits-Input ist wichtiger als die Dezimalgenauigkeit.",
        body:
          "Ein perfekt berechneter Value Edge kann dennoch irreführend sein, wenn die Schätzung der Fair Probability ungenau ist.",
        tone: "warning",
      },
    },
    {
      id: "explicit-ai-value",
      heading: "Warum die Pipeline eine explizite KI-Value-Schätzung verwenden kann",
      paragraphs: [
        "Die tägliche Analyseebene von MatchSignal kann einen expliziten estimatedValuePct zusammen mit der Fair Probability und anderen analytischen Feldern zurückgeben.",
        "Wenn ein gültiger expliziter estimatedValuePct vorhanden ist, behält die tägliche Pipeline diesen Wert bei, anstatt ihn automatisch durch einen neu berechneten Wert zu ersetzen. Wenn das explizite Feld fehlt, kann die Pipeline den geschätzten Wert aus der Fair Probability und den Partnerquoten berechnen.",
        "Dies ist bei der technischen Interpretation der Plattform wichtig: Der Value Edge wird nicht immer nur über einen Codepfad erzeugt. Es handelt sich um ein normalisiertes analytisches Feld mit einem KI-gestützten Pfad und einem mathematischen Fallback-Pfad.",
        "Die Prompt-Ebene weist die Analyse außerdem an, bei der Fair Probability und dem geschätzten Wert konservativ zu sein und null zurückzugeben, wenn der Edge unklar ist. Dieses Design soll verhindern, dass numerisches Vertrauen vorgetäuscht wird, wenn die verfügbaren Beweise dies nicht stützen."
      ],
      callout: {
        title: "Zwei Pfade, ein angezeigtes Feld",
        body:
          "Die MatchCard zeigt estimatedValuePct als Value Edge an, unabhängig davon, ob der gültige Wert aus der Analyseebene oder aus der Fallback-Berechnung basierend auf Wahrscheinlichkeit und Quoten stammt.",
        tone: "info",
      },
    },
    {
      id: "value-diff",
      heading: "Value Edge ist nicht dasselbe wie valueDiff",
      paragraphs: [
        "MatchSignal enthält auch ein valueDiff-Feld. Dies ist leicht mit Value Edge zu verwechseln, da beide eine Lücke zwischen einer Wahrscheinlichkeitseinschätzung und einem Marktpreis beschreiben.",
        "Die beiden Metriken verwenden unterschiedliche Einheiten. estimatedValuePct ist ein Prozentsatz im Stil einer erwarteten Rendite, der auf der Wahrscheinlichkeit multipliziert mit den Dezimalquoten basiert. valueDiff ist eine Differenz in Prozentpunkten zwischen der fairen Wahrscheinlichkeit und der impliziten Wahrscheinlichkeit, die mit dem entsprechenden Preis verbunden ist.",
        "Wenn zum Beispiel die faire Wahrscheinlichkeit 55 % beträgt und der Partnerpreis 50 % impliziert, beträgt valueDiff +5 Prozentpunkte. Bei einer Quote von 2,00 beträgt estimatedValuePct +10 %. Diese Zahlen beschreiben verwandte Konzepte, sind aber nicht austauschbar.",
        "Die Value Edge-Anzeige der MatchCard verwendet estimatedValuePct. valueDiff so zu behandeln, als wäre es eine erwartete Rendite, würde daher die Bedeutung der Zahl falsch darstellen."
      ],
      bullets: [
        "estimatedValuePct: Wertprozentsatz im Stil einer Rendite.",
        "valueDiff: Differenz in Wahrscheinlichkeitspunkten.",
        "Beide können gleichzeitig positiv sein.",
        "Ihre numerischen Werte müssen nicht übereinstimmen.",
      ],
      callout: {
        title: "Vermischen Sie keine Prozentwerte und Prozentpunkte",
        body:
          "Eine Wahrscheinlichkeitslücke von +5 Prozentpunkten ist nicht dieselbe Metrik wie +5 % erwartete Rendite.",
        tone: "warning",
      },
    },
    {
      id: "best-odds",
      heading: "Warum die besten Quoten für Value Edge wichtig sind",
      paragraphs: [
        "Der in einer Wertberechnung verwendete Preis verändert das Ergebnis direkt. Bei gleicher fairer Wahrscheinlichkeit führen höhere äquivalente Dezimalquoten zu einem größeren Value Edge.",
        "Wenn die faire Wahrscheinlichkeit 52 % beträgt, implizieren Quoten von 1,90 einen Wert von etwa −1,2 %, Quoten von 2,00 implizieren +4 % und Quoten von 2,10 implizieren +9,2 %.",
        "Deshalb präsentiert MatchSignal die besten Quoten zusammen mit dem Value Edge. Der stärkste, tatsächlich äquivalente verfügbare Preis kann das Wertverhältnis wesentlich verbessern.",
        "Der Vergleich muss weiterhin gleichwertig sein. Ein höherer Preis für ein anderes Handicap, eine andere Gesamtzahl, eine andere Abrechnungsregel oder einen anderen Markt ist kein gültiger Ersatz für die angezeigte Auswahl."
      ],
      bullets: [
        "52 % bei 1,90 → etwa −1,2 %.",
        "52 % bei 2,00 → etwa +4,0 %.",
        "52 % bei 2,10 → etwa +9,2 %.",
      ],
    },
    {
      id: "market-average",
      heading: "Wie Marktdurchschnitt und abgerufene Buchmacher Kontext bieten",
      paragraphs: [
        "Der Value Edge ist am nützlichsten, wenn er zusammen mit den anderen MatchCard-Feldern betrachtet wird und nicht isoliert.",
        "Der Marktdurchschnitt fasst die beprobten Buchmacherpreise zusammen und hilft zu zeigen, ob sich das angezeigte Angebot vom breiteren Markt unterscheidet. Die Anzahl der abgerufenen Buchmacher bietet Kontext darüber, wie viele Buchmacherquellen zu der relevanten Marktstichprobe beigetragen haben.",
        "Ein stärkerer Partnerpreis im Verhältnis zum beprobten Markt kann die verfügbare Wirtschaftlichkeit des Nutzers verbessern, aber die Anzahl der abgerufenen Buchmacher beweist für sich genommen nicht, dass die faire Wahrscheinlichkeit korrekt ist.",
        "Diese Felder beschreiben den Marktkontext. Sie eliminieren weder Modellfehler, Buchmachermargen, veraltete Preise noch die übliche sportliche Varianz."
      ],
    },
    {
      id: "fair-odds",
      heading: "Faire Quoten sind die Preisversion der fairen Wahrscheinlichkeit",
      paragraphs: [
        "MatchSignal kann faire Wahrscheinlichkeiten auch in faire Quoten umrechnen. Konzeptionell entsprechen faire Dezimalquoten 1 geteilt durch die als Dezimalzahl ausgedrückte faire Wahrscheinlichkeit.",
        "Eine faire Wahrscheinlichkeit von 50 % entspricht einer fairen Quote von 2,00. Eine faire Wahrscheinlichkeit von 40 % entspricht 2,50. Eine faire Wahrscheinlichkeit von 60 % entspricht etwa 1,67.",
        "Dies bietet eine weitere Möglichkeit, das Value-Edge-Verhältnis zu interpretieren. Wenn die angebotenen Quoten deutlich höher sind als die durch die analytische Wahrscheinlichkeit implizierten fairen Quoten, kann der Preis einen positiven geschätzten Erwartungswert darstellen.",
        "Wenn die angebotenen Quoten niedriger sind als die fairen Quoten, verlangt der Preis eine höhere Wahrscheinlichkeit, als die Schätzung stützt."
      ],
      bullets: [
        "50 % faire Wahrscheinlichkeit → 2,00 faire Quote.",
        "40 % → 2,50.",
        "60 % → etwa 1,67.",
      ],
    },
    {
      id: "positive-zero-negative",
      heading: "Wie man positiven, neutralen und negativen Value Edge liest",
      paragraphs: [
        "Ein positiver Value Edge bedeutet, dass das Verhältnis von Wahrscheinlichkeit und Preis unter der verwendeten Wahrscheinlichkeitsschätzung eine theoretische Rendite über null impliziert.",
        "Ein Value Edge nahe null bedeutet, dass der angebotene Preis nahe am Break-Even-Preis liegt, der durch die faire Wahrscheinlichkeit impliziert wird.",
        "Ein negativer Value Edge bedeutet, dass der aktuell angebotene Preis niedriger ist, als die Wahrscheinlichkeitsschätzung stützt.",
        "Das Vorzeichen ist nützlich, aber die Größenordnung sollte nicht als Gewissheit betrachtet werden. Ein angezeigtes +6%-Signal kann verschwinden, wenn die faire Wahrscheinlichkeit überschätzt wurde oder wenn die verfügbaren Quoten sinken."
      ],
      callout: {
        title: "Der Vorteil kann verschwinden",
        body:
          "Der Value-Vorteil ist zeitkritisch, da sich Quoten bewegen, und modellabhängig, da die faire Wahrscheinlichkeit eine Schätzung ist.",
        tone: "warning",
      },
    },
    {
      id: "rounding",
      heading: "Rundung und Anzeigepräzision",
      paragraphs: [
        "Die Wertberechnung wird für die Anzeigepräzision normalisiert, anstatt sie mit unbegrenzten Dezimalstellen darzustellen. Dies hält MatchCards lesbar und vermeidet den Anschein einer höheren Präzision, als die Schnittstelle nutzen kann.",
        "Nutzer sollten ein Zehntel oder Hundertstel eines Prozentpunkts nicht als aussagekräftige Garantie für eine überlegene Prognosegenauigkeit interpretieren.",
        "Wenn die zugrunde liegende Unsicherheit bezüglich der fairen Wahrscheinlichkeit mehrere Prozentpunkte beträgt, kann ein winziger Unterschied beim angezeigten Value-Vorteil wirtschaftlich weniger wichtig sein als die Modellunsicherheit selbst."
      ],
    },
    {
      id: "ranking",
      heading: "Der Value-Vorteil wird auch als Qualitätssignal verwendet",
      paragraphs: [
        "Innerhalb von MatchSignal wird estimatedValuePct nicht nur dem Nutzer angezeigt. Die Ranking-Logik bewertet die Wertzahl zudem zusammen mit anderen Informationen wie der fairen Wahrscheinlichkeit, der Buchmacherabdeckung, dem Spread, dem Konsens und der Risikostufe.",
        "Dies verhindert, dass die Plattform eine rohe Wertzahl als einziges Qualitätskriterium behandelt. Ein großer scheinbarer Vorteil aus einem dünnen oder inkonsistenten Markt erfordert mehr Vorsicht als ein ähnlich großer Vorteil, der durch einen breiteren Marktkontext gestützt wird.",
        "Die exakte Qualitätsentscheidung ist daher multifaktoriell, auch wenn die Berechnung des Value-Vorteils selbst eine klare Interpretation von Wahrscheinlichkeit und Preis hat."
      ],
      callout: {
        title: "Der Value-Vorteil ist ein Signal, nicht das gesamte Ranking",
        body:
          "MatchSignal berücksichtigt zudem Markttiefe, Wahrscheinlichkeitskontext, Spread und Risiko, anstatt Auswahlen ausschließlich nach dem größten angezeigten Edge zu bewerten.",
        tone: "info",
      },
    },
    {
      id: "not-guarantee",
      heading: "Warum ein positiver Value Edge keinen Gewinn garantiert",
      paragraphs: [
        "Die Formel beschreibt den Erwartungswert unter einer geschätzten Wahrscheinlichkeit. Sie bestimmt nicht, was bei einem einzelnen Sportereignis geschieht.",
        "Ein Value Edge von +8 % kann sofort verlieren. Eine Auswahl mit negativem Wert kann gewinnen. Der Unterschied wird erst bei wiederholten Entscheidungen unter ausreichend genauen Wahrscheinlichkeitsschätzungen aussagekräftig.",
        "Modellfehler sind eine weitere Risikoquelle. Wenn MatchSignal ein Ergebnis auf 55 % schätzt, die tatsächliche Chance jedoch niedriger ist, kann der angezeigte Edge überbewertet sein.",
        "Marktbewegungen spielen ebenfalls eine Rolle. Wenn die Quoten, die einen positiven Edge erzeugt haben, nicht mehr verfügbar sind, sollte der Wert unter Verwendung des aktuellen Preises neu berechnet werden."
      ],
      callout: {
        title: "Value Edge ist keine Gewinnprognose",
        body:
          "Es handelt sich um eine modellbasierte Schätzung der Preisqualität unter Unsicherheit, nicht um ein Versprechen bezüglich der nächsten Wette oder des zukünftigen Bankroll-Wachstums.",
        tone: "warning",
      },
    },
    {
      id: "example-sensitivity",
      heading: "Sensitivität: Kleine Wahrscheinlichkeitsänderungen können von Bedeutung sein",
      paragraphs: [
        "Angenommen, die angebotenen Quoten liegen bei 2,10. Bei einer fairen Wahrscheinlichkeit von 50 % beträgt der Value Edge +5 %. Bei 48 % liegt er bei etwa +0,8 %. Bei 47 % wird er zu etwa -1,3 %.",
        "Nur eine Änderung der Wahrscheinlichkeitsschätzung um drei Prozentpunkte lässt denselben Preis von einem positiven Signal zu einem negativen werden.",
        "Dies verdeutlicht, warum die Modellunsicherheit neben dem Value Edge als Hauptindikator berücksichtigt werden sollte. Je kleiner der Edge, desto leichter kann ein normaler Schätzfehler die Schlussfolgerung umkehren.",
        "Für eine praktische Interpretation sollte ein Nutzer nicht nur fragen: 'Was ist der Value Edge?', sondern auch: 'Wie robust ist dieser Vorteil, wenn die faire Wahrscheinlichkeit leicht fehlerhaft ist?'"
      ],
      bullets: [
        "Quote 2,10, faire Wahrscheinlichkeit 50 % → +5,0 %.",
        "Quote 2,10, faire Wahrscheinlichkeit 48 % → ca. +0,8 %.",
        "Quote 2,10, faire Wahrscheinlichkeit 47 % → ca. −1,3 %.",
      ],
    },
    {
      id: "checklist",
      heading: "So lesen Sie einen MatchSignal Value Edge",
      paragraphs: [
        "Ein Value Edge sollte zusammen mit dem Rest der MatchCard und unter Berücksichtigung der Grenzen probabilistischer Analysen betrachtet werden."
      ],
      bullets: [
        "Überprüfen Sie den genauen Markt und die Auswahl.",
        "Betrachten Sie die faire Wahrscheinlichkeit als Schätzung, nicht als Gewissheit.",
        "Überprüfen Sie die aktuell angezeigten besten Quoten.",
        "Nutzen Sie das Verhältnis von Wahrscheinlichkeit und Preis, um den Value Edge zu verstehen.",
        "Verwechseln Sie den Value Edge nicht mit der valueDiff-Differenz in Prozentpunkten.",
        "Überprüfen Sie den Marktdurchschnitt und die Stichprobe der Buchmacher für den Marktkontext.",
        "Denken Sie daran, dass sich die Quoten nach der Erstellung der Karte ändern können.",
        "Behandeln Sie kleine Vorteile vorsichtig, wenn die Wahrscheinlichkeitsunsicherheit hoch ist.",
        "Verwenden Sie einen größeren Value Edge nicht als automatische Empfehlung für die Einsatzhöhe.",
        "Interpretieren Sie einen positiven Value Edge nicht als garantiertes Gewinnresultat.",
      ],
    },
  ],
  relatedGuides: [
    "expected-value-sports-betting",
    "implied-probability",
    "how-to-compare-betting-odds",
    "bookmaker-margin-overround",
    "why-betting-odds-move",
    "ai-sports-betting-predictions",
  ],
  responsibleGamblingNote:
    "Der MatchSignal Value Edge ist eine analytische Schätzung basierend auf Wahrscheinlichkeit und Preis, keine Gewinngarantie oder Empfehlung zur Erhöhung der Einsätze. Wahrscheinlichkeitsschätzungen können falsch sein, Quoten können sich ändern und jede Wette kann verlieren. Halten Sie Einsätze innerhalb festgelegter Grenzen, setzen Sie nur Beträge, deren Verlust Sie sich leisten können, und jagen Sie niemals Verlusten hinterher.",
};

export default guide;
