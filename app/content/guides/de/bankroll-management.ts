import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bankroll-management",
  locale: "de",
  title: "Bankroll-Management erklärt",
  category: "bankroll-risk",
  status: "published",
  description:
    "Erfahren Sie, wie Bankroll-Management bei Sportwetten funktioniert, warum Einsatzhöhe und Risikolimits wichtig sind, wie sich Drawdowns und Varianz auf eine Bankroll auswirken und wie diszipliniertes Setzen das Ruinrisiko verringern kann.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Bankroll-Management ist der Prozess der Entscheidung, wie viel Geld für Wetten beiseitegelegt wird und welcher Teil dieser Bankroll bei jeder Wette riskiert wird. Es verbessert nicht die Gewinnwahrscheinlichkeit einer Auswahl, kann aber den Schaden durch Pechsträhnen, Varianz und falsche Einschätzungen verringern. Gutes Bankroll-Management dient in erster Linie dem Überleben, der Beständigkeit und der Begrenzung finanzieller Schäden. Es hilft zu verhindern, dass eine schlechte Serie die gesamte Bankroll auslöscht, und reduziert die Versuchung, nach Gewinnen oder Verlusten impulsive Entscheidungen zu treffen.",
  keyTakeaways: [
    "Eine Wett-Bankroll sollte von Geld getrennt sein, das für Lebenshaltungskosten, Rechnungen, Ersparnisse oder Notfälle benötigt wird.",
    "Die Einsatzhöhe steuert, wie stark sich jedes Ergebnis auf die Bankroll auswirkt.",
    "Kleinere prozentuale Einsätze verringern im Allgemeinen die Volatilität und das Ruinrisiko.",
    "Kein Einsatzsystem kann eine Strategie mit negativem Erwartungswert in eine positive verwandeln.",
    "Bankroll-Regeln sollten festgelegt werden, bevor der emotionale Druck durch Gewinne oder Verluste entsteht.",
    "Drawdowns sind bei unsicheren Prozessen normal und sollten eingeplant werden.",
    "Das Jagen von Verlusten durch Erhöhung der Einsätze kann das finanzielle Risiko schnell steigern.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Was eine Wett-Bankroll ist",
      paragraphs: [
        "Eine Wett-Bankroll ist ein zweckgebundener Geldbetrag, der speziell für Wettaktivitäten beiseitegelegt wird. Er sollte finanziell von Miete, Hypothekenzahlungen, Lebensmitteln, Schuldentilgungen, Notfallersparnissen und anderen wesentlichen Mitteln getrennt sein.",
        "Diese Trennung schafft eine klare Grenze. Wenn die Bankroll sinkt, bleibt der Verlust innerhalb eines Betrags, der bereits als erschwinglich für einen Verlust festgelegt wurde.",
        "Eine Bankroll sollte daher eher als Risikokapital denn als Einkommen betrachtet werden. Wettgewinne sind unsicher, und selbst ein Prozess mit positivem Erwartungswert kann lange Verlustphasen durchlaufen."
      ],
      callout: {
        title: "Die Bankroll ist ein Limit, kein Ziel",
        body:
          "Eine dedizierte Bankroll hilft dabei, das akzeptable finanzielle Risiko zu definieren. Sie sollte niemals mit Geld finanziert werden, das für lebensnotwendige Ausgaben benötigt wird.",
        tone: "warning",
      },
    },
    {
      id: "why-management-matters",
      heading: "Warum Bankroll-Management wichtig ist",
      paragraphs: [
        "Die Ergebnisse von Sportwetten sind unsicher. Selbst gute Wahrscheinlichkeitsschätzungen können bei einzelnen Ereignissen falsch sein, und gewöhnliche Varianz kann zu Verlustserien führen.",
        "Ohne einen strukturierten Einsatzansatz kann ein Wetter bei einer Auswahl zu viel riskieren, die Einsätze nach Verlusten erhöhen oder sich durch eine kurze Gewinnsträhne zu Übermut verleiten lassen.",
        "Bankroll-Management reduziert diese verhaltensbezogenen und mathematischen Risiken, indem Einsatzgrößen und Verlustlimits festgelegt werden, bevor das Ergebnis bekannt ist.",
        "Es kann die Möglichkeit eines Verlusts nicht ausschließen, aber es kann die finanziellen Auswirkungen normaler Varianz besser handhabbar machen."
      ],
    },
    {
      id: "unit-size",
      heading: "Was ist eine Wetteinheit?",
      paragraphs: [
        "Eine Einheit ist eine standardisierte Methode, um die Einsatzgröße auszudrücken. Anstatt jeden Wetteinsatz in Währungsbeträgen zu diskutieren, kann ein Wetter eine Einheit als festen Prozentsatz oder festen Betrag der Bankroll definieren.",
        "Wenn eine Bankroll beispielsweise 1.000 Währungseinheiten beträgt und eine Wetteinheit als 1% der Bankroll definiert ist, entspricht eine Einheit 10 Währungseinheiten.",
        "Die Verwendung von Einheiten macht die Leistung im Zeitverlauf leichter vergleichbar, da sie die Analyse von der persönlichen Bankroll des Wetters trennt."
      ],
      bullets: [
        "Bankroll: 1.000.",
        "1%-Einheit: 10.",
        "0,5%-Einheit: 5.",
        "2%-Einheit: 20.",
      ],
      callout: {
        title: "Einheiten standardisieren das Risiko",
        body:
          "Eine Einheit ist für sich genommen keine empfohlene Einsatzhöhe. Sie ist lediglich ein konsistentes Maß für das Risiko.",
        tone: "info",
      },
    },
    {
      id: "fixed-vs-percentage",
      heading: "Feste Einsätze vs. prozentuale Einsätze",
      paragraphs: [
        "Ein Ansatz mit festen Einsätzen riskiert bei jeder Wette den gleichen Geldbetrag. Ein Ansatz mit prozentualen Einsätzen riskiert einen festen Prozentsatz der aktuellen Bankroll.",
        "Bei flachen, festen Einsätzen bleibt eine 10-Einheiten-Wette bei 10 Einheiten, selbst wenn die Bankroll steigt oder fällt. Bei prozentualen Einsätzen wird der Einsatz nach Verlusten automatisch kleiner und nach Gewinnen größer.",
        "Prozentuale Einsätze können daher das Risiko während Verlustphasen verringern, da das Risiko mit der Bankroll schrumpft. Feste Einsätze sind einfacher und können die Leistungsverfolgung erleichtern.",
        "Keine der beiden Methoden schafft einen Vorteil. Die zugrunde liegende Wahrscheinlichkeit und die Quote bestimmen weiterhin, ob die Wettentscheidung einen positiven oder negativen Erwartungswert hat."
      ],
      bullets: [
        "Fester Einsatz: jedes Mal der gleiche Währungsbetrag.",
        "Prozentualer Einsatz: der gleiche Prozentsatz der aktuellen Bankroll.",
        "Feste Einsätze sind einfach und stabil.",
        "Prozentuale Einsätze passen das Risiko automatisch an, wenn sich die Bankroll ändert.",
      ],
    },
    {
      id: "stake-size",
      heading: "Warum die Einsatzhöhe die zentrale Risikoentscheidung ist",
      paragraphs: [
        "Die Einsatzhöhe bestimmt, wie viel Schaden ein einzelner Verlust anrichten kann und wie schnell sich eine Serie von Verlusten summieren kann.",
        "Wenn ein Wetter 1 % seiner Bankroll pro Wette riskiert, reduzieren zehn aufeinanderfolgende Totalverluste die Bankroll nicht um 100 %. Wenn derselbe Wetter 10 % pro Wette riskiert, kann eine normale Verlustserie zu einem erheblichen Drawdown führen.",
        "Hohe Einsätze erhöhen sowohl das Gewinnpotenzial als auch das Verlustrisiko. Sie erhöhen nicht die Wahrscheinlichkeit, richtig zu liegen.",
        "Da Wahrscheinlichkeitsschätzungen unsicher sind, können konservative Einsatzhöhen einen Sicherheitsabstand sowohl gegen Varianz als auch gegen Modellfehler bieten."
      ],
      callout: {
        title: "Zuversicht ist keine Gewissheit",
        body:
          "Eine Schätzung mit hoher Zuversicht kann dennoch falsch sein. Die Einsatzhöhe sollte die Unsicherheit widerspiegeln, anstatt davon auszugehen, dass eine Wette sicher ist.",
        tone: "warning",
      },
    },
    {
      id: "risk-of-ruin",
      heading: "Was ist das Ruinrisiko?",
      paragraphs: [
        "Das Ruinrisiko ist die Möglichkeit, dass ein Bankroll so weit fällt, dass das Wetten unter der beabsichtigten Strategie nicht mehr fortgesetzt werden kann.",
        "Das Risiko steigt, wenn die Einsätze im Verhältnis zum Bankroll groß sind, wenn die zugrunde liegende Strategie wenig oder keinen Vorteil bietet, wenn die Ergebnisse hochvolatil sind oder wenn mehrere Wetten stark korreliert sind.",
        "Selbst eine Strategie mit positivem Erwartungswert kann ein signifikantes Ruinrisiko aufweisen, wenn die Einsatzgrößen zu aggressiv gewählt sind. Dies ist ein Grund, warum Bankroll-Management nicht von Erwartungswert und Varianz getrennt werden kann.",
        "Die Reduzierung der Einsatzgröße senkt im Allgemeinen das Ruinrisiko, verringert jedoch auch die Geschwindigkeit, mit der sich Gewinne in günstigen Phasen ansammeln."
      ],
    },
    {
      id: "drawdowns",
      heading: "Planung für Drawdowns",
      paragraphs: [
        "Ein Drawdown ist der Rückgang von einem vorherigen Bankroll-Höchststand zu einem späteren Tiefpunkt. Drawdowns sind bei unsicheren Prozessen unvermeidlich.",
        "Angenommen, ein Bankroll steigt von 100 Einheiten auf 130 Einheiten und fällt später auf 110. Der Drawdown vom Höchststand beträgt 20 Einheiten oder etwa 15,4 % des 130-Einheiten-Höchststands.",
        "Die Planung für Drawdowns bedeutet, im Voraus zu akzeptieren, dass Verlustphasen auftreten werden, und sicherzustellen, dass die Einsatzmethode diese überstehen kann, ohne zu emotionalen oder finanziellen Entscheidungen zu zwingen.",
        "Ein Wetter, der davon ausgeht, dass der Bankroll stetig steigen sollte, neigt eher dazu, in Panik zu geraten, das Risiko zu erhöhen oder Regeln aufzugeben, wenn normale Varianz auftritt."
      ],
      callout: {
        title: "Planen Sie vor dem Abschwung",
        body:
          "Risikoregeln sind am nützlichsten, wenn sie erstellt werden, bevor Verluste emotionalen Druck erzeugen.",
        tone: "info",
      },
    },
    {
      id: "chasing",
      heading: "Warum das Hinterherjagen von Verlusten gefährlich ist",
      paragraphs: [
        "Verlusten hinterherzujagen bedeutet, die Einsätze primär zu erhöhen, um bei vorherigen Wetten verlorenes Geld zurückzugewinnen. Dies ändert den Zweck der nächsten Entscheidung von der Bewertung ihres eigenen Preises und ihrer Wahrscheinlichkeit hin zur Korrektur eines früheren Ergebnisses.",
        "Dieser Ansatz ist gefährlich, da Verluste anhalten können. Wenn die Einsätze nach jedem Verlust erhöht werden, kann das Risiko schnell eskalieren, während die zugrunde liegende Wahrscheinlichkeit der nächsten Wette unverändert bleibt.",
        "Systeme nach Art des Martingale-Systems veranschaulichen dieses Problem. Das Verdoppeln nach Verlusten mag wie eine garantierte Rückgewinnung erscheinen, falls schließlich ein Gewinn eintritt, aber reale Bankrolls, Limits der Sportwettenanbieter, Verlustserien und begrenztes Kapital machen das System anfällig für katastrophale Verluste.",
        "Ein disziplinierter Bankroll-Prozess hält den nächsten Einsatz auf Basis vordefinierter Regeln, anstatt sich an dem zuvor verlorenen Betrag zu orientieren."
      ],
      callout: {
        title: "Die nächste Wette schuldet Ihnen nicht den vorherigen Verlust.",
        body:
          "Vergangene Ergebnisse machen die nächste Wette nicht wahrscheinlicher zu gewinnen. Die Erhöhung der Einsätze zur Rückgewinnung von Verlusten erhöht das Risiko, nicht die Wahrscheinlichkeit.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "Was ist mit dem Kelly-Kriterium?",
      paragraphs: [
        "Das Kelly-Kriterium ist ein mathematisches Rahmenwerk zur Bestimmung der Wettgröße basierend auf dem geschätzten Vorteil und den Quoten. Theoretisch zielt es darauf ab, das langfristige logarithmische Bankroll-Wachstum zu maximieren, wenn die Wahrscheinlichkeiten genau bekannt sind.",
        "Das praktische Problem besteht darin, dass Wettwahrscheinlichkeiten nicht mit Sicherheit bekannt sind. Ein kleiner Fehler bei der Schätzung des Vorteils kann zu einem zu hohen Einsatz führen.",
        "Aus diesem Grund verwenden einige Wettende das fraktionale Kelly-System, wie etwa Half-Kelly oder Quarter-Kelly, um die Volatilität und die Folgen von Schätzfehlern zu reduzieren.",
        "Kelly ist keine Garantie und sollte nicht als Grund für hohe Einsätze angesehen werden. Das Ergebnis ist nur so zuverlässig wie die verwendete Wahrscheinlichkeitsschätzung."
      ],
      bullets: [
        "Full Kelly kann hochgradig volatil sein.",
        "Das fraktionale Kelly-Kriterium reduziert das Risiko.",
        "Falsche Wahrscheinlichkeitsschätzungen können zu übermäßigen Kelly-Einsätzen führen.",
        "Kelly kann keinen positiven Erwartungswert erzeugen, wo keiner existiert.",
      ],
    },
    {
      id: "flat-staking",
      heading: "Warum Flat Staking für die Auswertung oft nützlich ist",
      paragraphs: [
        "Flat Staking bedeutet, bei allen Wetten die gleiche Einheitsgröße zu verwenden. Es ist einfach und erleichtert die Beurteilung, ob die Tipps selbst eine gute Leistung erbracht haben.",
        "Wenn sich die Einsatzhöhe von einer Wette zur nächsten drastisch ändert, können einige wenige große Einsätze die Gewinn- und Verlustbilanz dominieren und die Qualität des zugrunde liegenden Auswahlprozesses verschleiern.",
        "Flat Staking optimiert zwar nicht das theoretische Bankroll-Wachstum, aber seine Einfachheit kann die Disziplin verbessern und die Modellauswertung transparenter machen.",
        "Für Anwender, die lernen möchten, wie sich eine Strategie verhält, kann Konsistenz wertvoller sein als eine komplexe Einsatzoptimierung."
      ],
    },
    {
      id: "percentage-staking",
      heading: "Wie prozentuales Staking auf Veränderungen der Bankroll reagiert",
      paragraphs: [
        "Beim prozentualen Staking wird ein fester Bruchteil der aktuellen Bankroll verwendet. Wenn die Bankroll sinkt, verringert sich der Einsatz automatisch. Wenn die Bankroll steigt, erhöht sich der Einsatz schrittweise.",
        "Bei einer Einsatzrate von 1 % ergibt eine Bankroll von 1.000 Einheiten beispielsweise einen Einsatz von 10 Einheiten. Wenn die Bankroll auf 800 sinkt, beträgt der nächste 1%-Einsatz 8 Einheiten.",
        "Dies schafft einen natürlichen Schutzmechanismus während Verlustphasen. Es bedeutet jedoch auch, dass sich die Einsatzgrößen ständig ändern, was die Leistungsanalyse weniger intuitiv machen kann.",
        "Die Wahl zwischen flachen und prozentualen Einsätzen hängt vom Zweck des Bankroll-Systems ab, aber beide erfordern konservative Annahmen und disziplinierte Limits."
      ],
    },
    {
      id: "correlation",
      heading: "Korrelierte Wetten können das Bankroll-Risiko erhöhen",
      paragraphs: [
        "Ein Bankroll kann einem höheren Risiko ausgesetzt sein, als die einzelnen Einsatzgrößen vermuten lassen, wenn mehrere Wetten von demselben zugrunde liegenden Ereignis abhängen.",
        "Wenn man beispielsweise darauf wettet, dass eine Fußballmannschaft gewinnt, ihr Stürmer ein Tor erzielt und das Spiel mit über 2,5 Toren endet, kann dies zu einer überschneidenden Exposition gegenüber demselben Spielverlauf führen.",
        "Wenn alle drei Wetten als unabhängige 1%-Positionen behandelt werden, kann die tatsächliche Risikokonzentration weit über 1% liegen.",
        "Das Bankroll-Management sollte daher die Gesamtexposition gegenüber zusammenhängenden Ergebnissen berücksichtigen, nicht nur den auf dem jeweiligen Wettschein ausgewiesenen Einsatz."
      ],
      callout: {
        title: "Zählen Sie die Exposition, nicht nur die Wettscheine",
        body:
          "Mehrere korrelierte Wetten können sich wie eine einzige, deutlich größere Position verhalten.",
        tone: "warning",
      },
    },
    {
      id: "limits",
      heading: "Setzen Sie Ausgaben-, Verlust- und Zeitlimits",
      paragraphs: [
        "Bankroll-Management ist nicht nur eine mathematische Übung. Verantwortungsbewusstes Wetten erfordert auch Limits für Ausgaben, Verluste und Zeit.",
        "Ein Verlustlimit definiert, wie viel vom Bankroll über einen gewählten Zeitraum verloren werden darf, bevor das Wetten gestoppt wird. Ein Einzahlungs- oder Ausgabenlimit beschränkt, wie viel Geld auf das Wettkonto eingezahlt werden kann. Ein Zeitlimit verhindert, dass sich das Wetten zu einer unkontrollierten Aktivität ausweitet.",
        "Diese Limits sind am effektivsten, wenn sie vor Beginn des Wettens festgelegt werden und wenn sie während einer Verlust- oder Gewinnsträhne nur schwer impulsiv geändert werden können.",
        "Wenn Wetten zu finanziellem Stress führen, Verluste verheimlicht werden, Geld geliehen wird oder der Alltag beeinträchtigt wird, ist die richtige Reaktion, aufzuhören, anstatt die Einsatzformel zu optimieren."
      ],
      callout: {
        title: "Zum Risikomanagement gehört es zu wissen, wann man nicht wetten sollte.",
        body:
          "Keine Bankroll-Strategie ist ein Ersatz dafür, mit dem Wetten aufzuhören, wenn es zu finanziellen oder emotionalen Schäden führt.",
        tone: "warning",
      },
    },
    {
      id: "records",
      heading: "Warum Buchführung wichtig ist",
      paragraphs: [
        "Ein Bankroll-Prozess ist ohne Aufzeichnungen schwer zu bewerten. Nützliche Aufzeichnungen umfassen Datum, Sportart, Markt, Auswahl, Quoten, Einsatz, Ergebnis, Gewinn oder Verlust sowie den Bankroll nach der Abrechnung.",
        "Die Aufzeichnung der Wahrscheinlichkeitsschätzung und des Marktpreises kann ebenfalls dabei helfen zu bewerten, ob die Analyse gut kalibriert war und ob der Wetter konsistent wettbewerbsfähige Quoten erhalten hat.",
        "Aufzeichnungen verringern die Abhängigkeit vom Gedächtnis, das oft zu großen Gewinnen, schmerzhaften Verlusten und aktuellen Ereignissen neigt.",
        "Eine saubere Aufzeichnung macht es einfacher, ein echtes Problem in der Strategie von gewöhnlicher Varianz zu unterscheiden."
      ],
      bullets: [
        "Datum und Ereignis.",
        "Markt und Auswahl.",
        "Angenommene Quoten.",
        "Einsatzhöhe.",
        "Ergebnis und Gewinn/Verlust.",
        "Bankroll nach Abrechnung.",
        "Optionale Wahrscheinlichkeitsschätzung und Markt-Benchmark.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Wie Bankroll-Management mit MatchSignal zusammenhängt",
      paragraphs: [
        "MatchSignal liefert analytischen Kontext wie Beste Quote, Marktdurchschnitt, Faire Wahrscheinlichkeit, Value Edge, Stichproben der Buchmacher und Risikostufe. Diese Felder sollen Nutzern helfen, das Verhältnis zwischen Marktpreisen und wahrscheinlichkeitsbasierter Analyse zu verstehen.",
        "Sie bestimmen nicht, wie viel Geld ein Nutzer einsetzen sollte. Ein Signal mit niedrigem Risiko ist keine Erfolgsgarantie, und ein größerer Value Edge sollte nicht automatisch als Erlaubnis interpretiert werden, die Einsätze aggressiv zu erhöhen.",
        "Die Einsatzhöhe sollte Teil eines separaten persönlichen Risikorahmens bleiben, der auf Erschwinglichkeit, Unsicherheit, Bankroll-Größe und Limits für verantwortungsbewusstes Spielen basiert.",
        "Die Analyse von MatchSignal dient der Information und sollte kein persönliches finanzielles Urteilsvermögen oder disziplinierte Bankroll-Kontrollen ersetzen."
      ],
      callout: {
        title: "Signalstärke ist keine Empfehlung für die Einsatzhöhe",
        body:
          "MatchSignal garantiert keine Ergebnisse, und seine analytischen Felder sollten nicht als automatische Anweisungen für die Einsatzhöhe verwendet werden.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Eine praktische Checkliste für das Bankroll-Management",
      paragraphs: [
        "Ein einfaches Bankroll-System kann effektiver sein als ein kompliziertes System, das schwer konsequent einzuhalten ist."
      ],
      bullets: [
        "Trennen Sie das Wettkapital von lebensnotwendigen Geldern.",
        "Wählen Sie einen konservativen Grundeinsatz, bevor Sie mit dem Wetten beginnen.",
        "Verwenden Sie konsequent flache oder prozentuale Einsätze.",
        "Vermeiden Sie es, die Einsätze aufgrund kürzlicher Verluste zu erhöhen.",
        "Berücksichtigen Sie korrelierte Risiken über mehrere Wetten hinweg.",
        "Planen Sie normale Drawdowns und Verlustserien ein.",
        "Erfassen Sie jede Wette und aktualisieren Sie das Wettkapital präzise.",
        "Setzen Sie Limits für Ausgaben, Verluste und Zeit.",
        "Reduzieren Sie das Wetten oder hören Sie auf, wenn der finanzielle oder emotionale Druck zunimmt.",
        "Gehen Sie niemals davon aus, dass ein Einsatzsystem Gewinne garantieren kann.",
      ],
    },
  ],
  relatedGuides: [
    "variance-sports-betting",
    "flat-stakes-vs-percentage-staking",
    "why-chasing-losses-is-dangerous",
    "expected-value-sports-betting",
    "winning-streaks-misleading",
  ],
  responsibleGamblingNote:
    "Bankroll-Management kann das finanzielle Risiko verringern, aber es kann Wetten nicht sicher machen oder Gewinne garantieren. Halten Sie Wettgelder von lebensnotwendigen Mitteln getrennt, setzen Sie strikte Ausgaben- und Verlustlimits, vermeiden Sie es, Geld zu leihen oder Verlusten hinterherzujagen, und hören Sie auf, wenn das Wetten zu finanziellen oder emotionalen Schäden führt.",
};

export default guide;
