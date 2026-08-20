import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "cognitive-biases-sports-betting",
  locale: "de",
  title: "Kognitive Verzerrungen bei Sportwetten",
  category: "betting-psychology",
  status: "published",
  description:
    "Erfahren Sie, wie kognitive Verzerrungen Sportwettenentscheidungen verfälschen können, darunter Bestätigungsfehler, Aktualitätsfehler, Ankereffekt, Selbstüberschätzung, Spielerfehlschluss und Ergebnisfehler, und wie strukturierte Entscheidungsregeln deren Einfluss reduzieren können.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Sportwettenentscheidungen werden unter Unsicherheit getroffen, was sie besonders anfällig für kognitive Verzerrungen macht. Eine kognitive Verzerrung ist ein systematisches Denkmuster, das die Interpretation, Erinnerung oder Gewichtung von Informationen verzerren kann. Verzerrung bedeutet nicht, dass ein Wettender bei jeder Entscheidung irrational handelt. Es bedeutet, dass der Verstand Abkürzungen nutzt, die unzuverlässig werden können, wenn Wahrscheinlichkeiten, Quoten, Emotionen und unvollständige Informationen interagieren. Das Erkennen dieser Muster kann die Entscheidungsqualität verbessern, indem die Analyse strukturierter gestaltet wird und weniger von aktuellen Ergebnissen, persönlichen Vorlieben oder überzeugenden Narrativen abhängt.",
  keyTakeaways: [
    "Kognitive Verzerrungen können beeinflussen, wie Wettende Wahrscheinlichkeiten, Quoten, Nachrichten und aktuelle Ergebnisse interpretieren.",
    "Der Bestätigungsfehler (Confirmation Bias) ermutigt Menschen dazu, nach Beweisen zu suchen, die eine bestehende Meinung stützen, während widersprüchliche Informationen ignoriert werden.",
    "Der Aktualitätsfehler (Recency Bias) kann dazu führen, dass aktuellen Spielen oder Serien mehr Gewicht beigemessen wird, als sie verdienen.",
    "Der Spielerfehlschluss (Gambler's Fallacy) behandelt frühere zufällige Ergebnisse fälschlicherweise als Beweis dafür, dass das nächste Ergebnis einen Ausgleich erzwingen muss.",
    "Selbstüberschätzung kann dazu führen, dass Wahrscheinlichkeitsschätzungen präziser erscheinen, als es die zugrunde liegenden Informationen rechtfertigen.",
    "Der Ergebnisfehler (Outcome Bias) bewertet eine Entscheidung danach, ob sie gewonnen oder verloren hat, anstatt danach, ob der Prozess zum damaligen Zeitpunkt vernünftig war.",
    "Schriftliche Regeln, Wahrscheinlichkeitsbereiche, Buchführung und vordefinierte Einsatzlimits können den Einfluss von Verzerrungen reduzieren.",
  ],
  sections: [
    {
      id: "what-are-biases",
      heading: "Was kognitive Verzerrungen sind",
      paragraphs: [
        "Kognitive Verzerrungen sind wiederkehrende Muster im menschlichen Urteilsvermögen. Sie entstehen oft, weil das Gehirn versucht, komplexe Informationen durch die Nutzung von Abkürzungen schnell zu verarbeiten.",
        "Diese Abkürzungen sind im Alltag nützlich, können jedoch in probabilistischen Umgebungen Probleme verursachen. Sportwetten erfordern, dass Menschen unsichere Ergebnisse, unvollständige Informationen, sich ändernde Marktpreise und emotional bedeutsame Resultate miteinander vergleichen.",
        "Ein Wettender mag glauben, eine rein analytische Entscheidung zu treffen, während er dennoch einem Lieblingsteam, einer kürzlichen Siegesserie, einer dramatischen Nachricht oder dem ersten Preis, den er gesehen hat, zu viel Gewicht beimisst.",
        "Das Ziel ist nicht, jegliche Voreingenommenheit zu eliminieren, was unrealistisch ist. Das praktische Ziel besteht darin, einen Prozess zu gestalten, der voreingenommene Entscheidungen weniger wahrscheinlich macht."
      ],
      callout: {
        title: "Voreingenommenheit ist für die Person, die sie erlebt, oft unsichtbar.",
        body:
          "Eine Entscheidung kann sich objektiv anfühlen, während sie dennoch von selektiver Aufmerksamkeit, Gedächtnis, Emotionen oder Framing beeinflusst wird.",
        tone: "info",
      },
    },
    {
      id: "confirmation-bias",
      heading: "Bestätigungsfehler (Confirmation Bias)",
      paragraphs: [
        "Der Bestätigungsfehler ist die Tendenz, nach Informationen zu suchen, diese wahrzunehmen und sich an sie zu erinnern, die eine bestehende Überzeugung stützen, während Beweisen, die ihr widersprechen, weniger Gewicht beigemessen wird.",
        "Ein Wettender, der bereits glaubt, dass ein Fußballteam gewinnen wird, konzentriert sich möglicherweise auf dessen starken Angriff in letzter Zeit, die günstige Bilanz im direkten Vergleich und die Heimstärke, während er Verletzungen, Spielplanbelastung, defensive Schwächen oder einen ungünstigen Marktpreis ignoriert.",
        "Dieselbe Voreingenommenheit kann auch Modellnutzer betreffen. Wenn ein Modell mit der Meinung des Wettenden übereinstimmt, wird das Ergebnis möglicherweise als Bestätigung gewertet. Wenn es widerspricht, stellt der Wettende plötzlich die Zuverlässigkeit des Modells in Frage.",
        "Eine der besten Verteidigungsstrategien besteht darin, aktiv nach widerlegenden Beweisen zu suchen, bevor eine Wette platziert wird."
      ],
      bullets: [
        "Schreiben Sie die ursprüngliche These auf, bevor Sie nach unterstützenden Beweisen suchen.",
        "Listen Sie mindestens einen triftigen Grund auf, warum das gegenteilige Ergebnis eintreten könnte.",
        "Prüfen Sie, ob der aktuelle Preis die Informationen, die Sie favorisieren, bereits widerspiegelt.",
        "Vermeiden Sie es, die Übereinstimmung eines Modells oder einer Quelle als unabhängige Bestätigung zu betrachten.",
      ],
      callout: {
        title: "Fragen Sie sich, was Ihre Meinung ändern würde.",
        body:
          "Wenn keine realistischen Beweise die Schlussfolgerung ändern könnten, verteidigt die Analyse möglicherweise eher einen Glaubenssatz, anstatt ihn zu überprüfen.",
        tone: "warning",
      },
    },
    {
      id: "recency-bias",
      heading: "Recency Bias (Verzerrung durch Aktualität)",
      paragraphs: [
        "Der Recency Bias tritt auf, wenn aktuellen Ereignissen mehr Gewicht beigemessen wird als älteren, aber dennoch relevanten Informationen.",
        "Ein Team, das fünf Spiele in Folge gewonnen hat, kann sich stärker anfühlen, als es objektiv ist, während ein Team, das gerade mehrere Niederlagen erlitten hat, als dauerhaft schwach eingestuft werden könnte.",
        "Aktuelle Informationen können durchaus von Bedeutung sein, insbesondere wenn sie Verletzungen, taktische Änderungen, Verbesserungen im Kader oder nachlassende Leistungen widerspiegeln. Das Problem entsteht, wenn aktuelle Ergebnisse überbewertet werden, nur weil sie besser im Gedächtnis bleiben.",
        "Ein solider Prozess trennt aktuelle Ergebnisse von den Gründen, die dahinterstehen. Fünf Siege gegen schwache Gegner können weniger aussagekräftig sein, als die Siegesserie selbst vermuten lässt."
      ],
      callout: {
        title: "Aktuell bedeutet nicht automatisch relevant.",
        body:
          "Die aktuelle Form sollte im Kontext interpretiert werden: Gegnerqualität, zugrunde liegende Leistung, Verletzungen, Spielplan und Marktanpassungen sind allesamt von Bedeutung.",
        tone: "info",
      },
    },
    {
      id: "gambler-fallacy",
      heading: "Der Spielerfehlschluss (Gambler's Fallacy)",
      paragraphs: [
        "Der Spielerfehlschluss ist der Glaube, dass ein zufälliges oder unabhängiges Ergebnis wahrscheinlicher wird, weil das gegenteilige Ergebnis wiederholt eingetreten ist.",
        "Ein Wetter könnte denken, dass ein Team nach mehreren Niederlagen einen Sieg 'verdient' hat oder dass ein Under-Markt wahrscheinlicher ist, weil kürzlich mehrere Overs eingetreten sind.",
        "Frühere Ergebnisse können von Bedeutung sein, wenn sie tatsächlich neue Informationen über die Teams oder den Markt offenbaren. Die Abfolge an sich erzwingt jedoch keine Umkehrung.",
        "Die eigene Pechsträhne des Wetters ist für die Wahrscheinlichkeit des nächsten unabhängigen Ereignisses völlig irrelevant. Finanziell im Minus zu sein, macht den nächsten Tipp nicht wahrscheinlicher für einen Gewinn."
      ],
      callout: {
        title: "Eine Serie ist keine Schuld, die der Markt begleichen muss.",
        body:
          "Die zukünftige Wahrscheinlichkeit sollte auf aktuellen Beweisen basieren, nicht auf dem Gefühl, dass ein Ergebnis überfällig ist.",
        tone: "warning",
      },
    },
    {
      id: "hot-hand",
      heading: "Der Hot-Hand-Effekt",
      paragraphs: [
        "Der Glaube an die 'heiße Hand' ist fast das Spiegelbild des Spielerfehlschlusses. Anstatt zu erwarten, dass sich eine Serie umkehrt, geht der Wetter davon aus, dass sie sich fortsetzt, weil der jüngste Erfolg bedeutsam erscheint.",
        "Ein Stürmer, der in vier aufeinanderfolgenden Spielen getroffen hat, wird möglicherweise so bewertet, als würde die Serie anhalten. Ein Wetter, der persönlich mehrere Wetten gewonnen hat, könnte ebenfalls selbstbewusster werden und die Einsatzhöhe erhöhen.",
        "Einige Serien spiegeln tatsächliche Veränderungen in Bezug auf Fähigkeiten, Rolle, Taktik oder Möglichkeiten wider. Die entscheidende Frage ist, ob es Beweise für eine dauerhafte grundlegende Veränderung gibt oder ob es sich lediglich um eine Reihe günstiger Ergebnisse handelt.",
        "Wenn der Markt bereits auf die Serie reagiert hat, bietet der neue Preis möglicherweise wenig oder gar keinen Wert, selbst wenn die zugrunde liegende Verbesserung real ist."
      ],
    },
    {
      id: "anchoring",
      heading: "Ankerheuristik",
      paragraphs: [
        "Der Ankereffekt tritt auf, wenn die erste Zahl oder Meinung, auf die man stößt, das spätere Urteil zu stark beeinflusst.",
        "Beim Wetten kann ein Eröffnungskurs zu einem Anker werden. Wenn eine Mannschaft mit einer Quote von 2,50 eröffnet wurde und sich später auf 2,10 bewegt, könnte der Wetter denken, dass 2,10 automatisch schlecht ist, nur weil sie niedriger ist als der Eröffnungskurs.",
        "Das Gegenteil kann ebenfalls passieren. Ein Wetter, der eine Mannschaft ursprünglich auf 60 % geschätzt hat, passt seine Einschätzung möglicherweise weiterhin um diesen Wert herum an, selbst nachdem neue Informationen zu einer deutlich stärkeren Korrektur führen sollten.",
        "Eine nützliche Verteidigung besteht darin, die Schätzung auf Basis aktueller Informationen neu aufzubauen, anstatt nur zu fragen, wie weit sich der Markt von der ersten Zahl entfernt hat."
      ],
      callout: {
        title: "Die erste Zahl hat keinen Vorrang.",
        body:
          "Eröffnungsquoten und erste Schätzungen können nützliche Referenzen sein, sollten aber eine vollständige Aktualisierung bei neuen Informationen nicht verhindern.",
        tone: "info",
      },
    },
    {
      id: "availability-bias",
      heading: "Verfügbarkeitsheuristik",
      paragraphs: [
        "Die Verfügbarkeitsheuristik lässt lebhafte oder einprägsame Informationen wichtiger erscheinen, weil sie leichter abrufbar sind.",
        "Eine dramatische Rote Karte, ein Tor in letzter Minute, eine umstrittene Schiedsrichterentscheidung oder eine landesweit übertragene Überraschung können im Gedächtnis bleiben und die nächste Wettentscheidung unverhältnismäßig stark beeinflussen.",
        "Medienberichterstattung kann diesen Effekt verstärken. Sehr präsente Mannschaften und Starspieler erzeugen mehr Geschichten, was dazu führen kann, dass Wetter glauben, sie würden diese Mannschaften besser verstehen als weniger beachtete Gegner.",
        "Strukturierte Daten und schriftliche Checklisten können den Einfluss lebhafter Anekdoten verringern, indem sie den Wetter zwingen, eine breitere Datenbasis zu berücksichtigen."
      ],
    },
    {
      id: "overconfidence",
      heading: "Selbstüberschätzung",
      paragraphs: [
        "Übermäßiges Selbstvertrauen ist die Tendenz, sich bei einem Urteil sicherer zu sein, als es die Beweislage rechtfertigt.",
        "Beim Wetten äußert sich übermäßiges Selbstvertrauen oft in zu extremen Wahrscheinlichkeitsschätzungen, übermäßigem Vertrauen in eine kleine Stichprobe oder hohen Einsätzen, die auf der Überzeugung basieren, dass eine Auswahl ungewöhnlich sicher sei.",
        "Ein Modell kann ebenfalls zu übermäßigem Selbstvertrauen führen, indem es präzise Zahlen liefert. Eine Prognose von 63,7 % mag wissenschaftlich wirken, aber die Dezimalgenauigkeit bedeutet nicht, dass die zugrunde liegende Unsicherheit nur wenige Zehntelprozentpunkte beträgt.",
        "Wahrscheinlichkeitsbereiche und Kalibrierungstests können Unsicherheit expliziter machen."
      ],
      bullets: [
        "Vermeiden Sie es, die Präzision eines Modells als Gewissheit zu betrachten.",
        "Vergleichen Sie vorhergesagte Wahrscheinlichkeiten mit langfristig beobachteten Häufigkeiten.",
        "Verwenden Sie konservative Einsatzlimits, selbst bei Auswahlen mit hoher Zuversicht.",
        "Fragen Sie sich, wie empfindlich die Schlussfolgerung auf eine kleine Wahrscheinlichkeitsänderung reagiert.",
      ],
      callout: {
        title: "Präzision ist nicht dasselbe wie Genauigkeit.",
        body:
          "Ein Modell kann 63,7 % ausgeben und dennoch wesentlich falsch liegen. Numerische Details sollten die Unsicherheit nicht verschleiern.",
        tone: "warning",
      },
    },
    {
      id: "outcome-bias",
      heading: "Ergebnisverzerrung (Outcome Bias)",
      paragraphs: [
        "Die Ergebnisverzerrung bewertet eine Entscheidung hauptsächlich danach, was im Nachhinein passiert ist.",
        "Wenn eine Wette gewinnt, könnte der Wettende schlussfolgern, dass die Analyse gut war. Wenn sie verliert, könnte der Wettende schlussfolgern, dass die Analyse schlecht war. Dies verwechselt die Entscheidungsqualität mit dem Ergebnis.",
        "Ein Ereignis mit einer Wahrscheinlichkeit von 40 % wird die meiste Zeit verlieren, kann aber dennoch eine attraktive Wette sein, wenn der Preis diese Wahrscheinlichkeit kompensiert. Ebenso kann ein sehr wahrscheinlicher Favorit gewinnen, obwohl er schlecht bepreist war.",
        "Die bessere Frage ist, ob die Wahrscheinlichkeitsschätzung, der Marktvergleich und der Einsatz unter Verwendung der vor dem Ergebnis verfügbaren Informationen angemessen waren."
      ],
      callout: {
        title: "Ein Gewinn kann aus einer schlechten Entscheidung resultieren.",
        body:
          "Beurteilen Sie den Prozess getrennt vom Endergebnis. Kurzfristige Ergebnisse enthalten Varianz.",
        tone: "warning",
      },
    },
    {
      id: "hindsight-bias",
      heading: "Rückschaufehler",
      paragraphs: [
        "Der Rückschaufehler ist die Tendenz, ein Ergebnis als vorhersehbarer zu betrachten, nachdem es bereits eingetreten ist.",
        "Nach einer Überraschung identifizieren Menschen oft Warnsignale, die nun offensichtlich erscheinen. Vor dem Ereignis mögen dieselben Signale jedoch mehrdeutig gewesen sein oder durch gegenteilige Beweise ausgeglichen worden sein.",
        "Der Rückschaufehler kann die Modellbewertung unfair machen, da jeder Verlust im Nachhinein vermeidbar erscheint.",
        "Das Führen einer schriftlichen Aufzeichnung vor der Wette über Wahrscheinlichkeit, Preis, Begründung und Unsicherheit erleichtert den Vergleich der ursprünglichen Entscheidung mit dem, was zum damaligen Zeitpunkt tatsächlich bekannt war."
      ],
    },
    {
      id: "favorite-team",
      heading: "Emotionale Bindung und Team-Bias",
      paragraphs: [
        "Fans verfügen oft über mehr Informationen über ihr Lieblingsteam, aber emotionale Bindung kann die Interpretation ebenfalls verzerren.",
        "Positive Nachrichten können sich wichtiger anfühlen, Schwächen können rationalisiert werden und ein Wettender akzeptiert möglicherweise schlechtere Quoten, weil er möchte, dass das Team gewinnt.",
        "Der gegenteilige Bias kann ebenfalls auftreten. Ein Fan, der wiederholt enttäuscht wurde, kann übermäßig negativ werden und das Team unterschätzen.",
        "Wenn eine persönliche Bindung stark ist, besteht eine praktische Lösung darin, Wetten auf dieses Team zu vermeiden oder eine zusätzliche objektive Checkliste zu verlangen, bevor man handelt."
      ],
    },
    {
      id: "authority-social-proof",
      heading: "Autoritäts-Bias und Social Proof",
      paragraphs: [
        "Wettende können selbstbewussten Meinungen von Kommentatoren, Influencern, Tippgebern oder großen Online-Communities zu viel Gewicht beimessen.",
        "Popularität verbessert nicht automatisch eine Wahrscheinlichkeitsschätzung. Ein weit verbreiteter Tipp kann immer noch schlecht bepreist sein, und eine selbstbewusste Präsentation kann eine schwache Analyse verbergen.",
        "Dieselbe Vorsicht gilt für KI-generierte Analysen. Eine ausgefeilte Erklärung sollte nicht allein deshalb als Beweis behandelt werden, weil sie autoritär klingt.",
        "Bewerten Sie die Beweise, den Preis, die Methodik und die Unsicherheit anstatt das Vertrauen oder die Popularität der Quelle."
      ],
      callout: {
        title: "Vertrauen ist kein Beweis",
        body:
          "Eine überzeugende Erklärung kann dennoch falsch sein. Überprüfen Sie den zugrunde liegenden Preis und die Argumentation unabhängig.",
        tone: "warning",
      },
    },
    {
      id: "sunk-cost",
      heading: "Sunk-Cost-Bias",
      paragraphs: [
        "Der Sunk-Cost-Bias tritt auf, wenn vergangene Verluste oder Anstrengungen eine neue Entscheidung beeinflussen, obwohl diese Kosten nicht durch eine Änderung der zukünftigen Wahrscheinlichkeit zurückgewonnen werden können.",
        "Ein Wettender, der bereits Geld mit einem Team verloren hat, fühlt sich möglicherweise gezwungen, erneut darauf zu wetten, um es zurückzugewinnen. Ein anderer setzt möglicherweise eine schlechte Strategie fort, weil viele Stunden in deren Entwicklung investiert wurden.",
        "Die korrekte Bewertung sollte sich auf den aktuellen Erwartungswert der nächsten Entscheidung konzentrieren. Frühere Verluste und vergangener Aufwand sind emotional von Bedeutung, machen die nächste Wette jedoch nicht besser.",
        "Diese Voreingenommenheit ist ein Grund dafür, warum das Hinterherjagen von Verlusten hartnäckig werden kann."
      ],
    },
    {
      id: "biases-interact",
      heading: "Voreingenommenheiten wirken oft zusammen",
      paragraphs: [
        "Reale Entscheidungen beinhalten selten nur eine Voreingenommenheit. Mehrere können sich gegenseitig verstärken.",
        "Ein Wettender kann an einer frühen Meinung festhalten, nach bestätigenden Beweisen suchen, eine kürzliche Siegesserie übergewichten, übermütig werden und die Entscheidung dann ausschließlich danach beurteilen, ob sie gewonnen hat.",
        "Diese Interaktion macht es schwierig, Voreingenommenheit allein durch Intuition zu erkennen. Ein strukturierter Prozess ist zuverlässiger, da er Kontrollpunkte schafft, bevor Geld riskiert wird.",
        "Das Ziel ist nicht, jeden Gedanken zu diagnostizieren. Es geht darum, den Prozess resistent gegen häufige Fehlermodi zu machen."
      ],
    },
    {
      id: "controls",
      heading: "Praktische Wege zur Reduzierung kognitiver Verzerrungen",
      paragraphs: [
        "Voreingenommenheit kann nicht vollständig beseitigt werden, aber die Entscheidungsstruktur kann ihren Einfluss verringern.",
        "Eine schriftliche Checkliste erzwingt bei jeder Wette die Aufmerksamkeit auf dieselben Variablen. Wahrscheinlichkeitsbereiche reduzieren falsche Präzision. Vordefinierte Einsatzlimits verhindern, dass Übermut sofort zu einem größeren finanziellen Risiko wird. Buchführung macht es einfacher, Rückschaufehler und selektives Gedächtnis zu identifizieren.",
        "Eine weitere nützliche Technik ist ein Pre-Mortem: Gehen Sie davon aus, dass die Wette verliert, und schreiben Sie die plausibelsten Gründe dafür auf. Dies ermutigt den Wettenden, vor dem Ergebnis nach Schwächen zu suchen, anstatt sie hinterher zu erfinden.",
        "Trennen Sie nach Möglichkeit die Vorhersage vom Preis. Schätzen Sie zuerst die Wahrscheinlichkeit und vergleichen Sie diese dann mit den verfügbaren Quoten. Dies reduziert die Fixierung auf das Angebot des Buchmachers."
      ],
      bullets: [
        "Schreiben Sie die These auf, bevor Sie unterstützende Kommentare prüfen.",
        "Schätzen Sie die Wahrscheinlichkeit ein, bevor Sie sich stark auf den Marktpreis konzentrieren.",
        "Listen Sie Beweise gegen die Auswahl auf.",
        "Verwenden Sie Bereiche, wenn Unsicherheit von Bedeutung ist.",
        "Halten Sie die Entscheidung vor dem Ereignis fest.",
        "Halten Sie Einsatzregeln unabhängig von kürzlichen Gewinnen und Verlusten.",
        "Überprüfen Sie die Ergebnisse über größere Stichproben hinweg.",
        "Verwenden Sie eine Pre-Mortem-Analyse, um mögliche Fehlerquellen zu identifizieren.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Wie kognitive Verzerrungen auf MatchSignal zutreffen",
      paragraphs: [
        "MatchSignal bietet strukturierte Felder wie Beste Quote, Marktdurchschnitt, Faire Wahrscheinlichkeit, Value Edge, Stichproben der Buchmacher und Risikostufe, um die Beziehung zwischen Preis und Wahrscheinlichkeit leichter überprüfbar zu machen.",
        "Diese Felder können einen systematischeren Prozess unterstützen, eliminieren jedoch keine kognitiven Verzerrungen. Ein Nutzer kann sich immer noch nur auf Karten konzentrieren, die eine bestehende Meinung bestätigen, oder ein Label für geringes Risiko als stärkere Beweise behandeln, als es tatsächlich ist.",
        "Value Edge sollte nicht als Gewissheit interpretiert werden, und das Risk Tier sollte nicht dazu verwendet werden, emotionale Erhöhungen des Einsatzes zu rechtfertigen. Das Modell selbst kann ebenfalls falsch liegen oder unsicher sein.",
        "Der nützlichste Ansatz besteht darin, MatchSignal als einen strukturierten analytischen Input zu behandeln und weiterhin Bankroll-Limits, Marktvergleiche und ein unabhängiges Urteilsvermögen anzuwenden."
      ],
      callout: {
        title: "Strukturierte Daten helfen, beseitigen aber keine Voreingenommenheit.",
        body:
          "Nutzer können Modellausgaben weiterhin selektiv interpretieren. Analytische Werkzeuge sollten einen Prozess unterstützen, nicht die kritische Bewertung ersetzen.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Eine Checkliste für kognitive Verzerrungen vor dem Wetten",
      paragraphs: [
        "Vor der Platzierung einer Wette kann ein kurzer Bias-Check aufzeigen, ob aktuelle Ergebnisse oder persönliche Vorlieben die Entscheidung beeinflussen."
      ],
      bullets: [
        "Würde ich dieselbe Wette platzieren, wenn ich die gegnerische Mannschaft unterstützen würde?",
        "Verlasse ich mich zu sehr auf die letzten paar Spiele?",
        "Gehe ich davon aus, dass ein Ergebnis aufgrund einer Serie fällig ist?",
        "Habe ich aktiv nach Beweisen gesucht, die gegen meine Meinung sprechen?",
        "Haben die ersten Quoten oder die erste Vorhersage meine Einschätzung verankert?",
        "Bin ich zuversichtlicher, als es die Daten rechtfertigen?",
        "Würde mir die Wette immer noch gefallen, wenn meine vorherigen Wetten alle gewonnen hätten?",
        "Würde sie mir immer noch gefallen, wenn meine vorherigen Wetten alle verloren hätten?",
        "Ist die aktuelle Quote im Verhältnis zur Wahrscheinlichkeitsschätzung tatsächlich attraktiv?",
        "Liegt der Einsatz innerhalb des normalen, vordefinierten Limits?",
      ],
    },
  ],
  relatedGuides: [
    "confirmation-bias-betting",
    "winning-streaks-misleading",
    "why-chasing-losses-is-dangerous",
    "variance-sports-betting",
    "bankroll-management",
    "expected-value-sports-betting",
  ],
  responsibleGamblingNote:
    "Kognitive Verzerrungen können zu impulsiven Entscheidungen, höheren Einsätzen und Versuchen führen, Verluste auszugleichen. Nutzen Sie vordefinierte Ausgaben-, Einsatz-, Verlust- und Zeitlimits, halten Sie Wettgelder von lebensnotwendigen Mitteln getrennt und hören Sie auf, wenn das Wetten finanziellen oder emotionalen Schaden verursacht. Analytische Werkzeuge und Wahrscheinlichkeitsmodelle können keine Ergebnisse garantieren.",
};

export default guide;
