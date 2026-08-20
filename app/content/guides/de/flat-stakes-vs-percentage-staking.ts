import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "flat-stakes-vs-percentage-staking",
  locale: "de",
  title: "Flat-Einsätze vs. prozentuale Einsätze",
  category: "bankroll-risk",
  status: "published",
  description:
    "Vergleichen Sie Flat-Einsätze und prozentuale Einsätze bei Sportwetten, verstehen Sie, wie sich die jeweilige Methode auf die Volatilität der Bankroll, Drawdowns, Buchführung und das Risiko auswirkt, und erfahren Sie, wann der jeweilige Ansatz einfacher zu verwalten ist.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Flat-Einsätze und prozentuale Einsätze sind zwei gängige Methoden, um zu entscheiden, welcher Teil der Wett-Bankroll bei jeder Wette riskiert werden soll. Bei Flat-Einsätzen wird wiederholt der gleiche Einsatzbetrag verwendet, während bei prozentualen Einsätzen ein fester Prozentsatz der aktuellen Bankroll genutzt wird, wodurch die Einsatzhöhe steigt oder fällt, wenn sich die Bankroll ändert. Keiner der Ansätze schafft für sich genommen einen Vorteil. Ihr Zweck ist die Risikokontrolle und Konsistenz. Die bessere Wahl hängt davon ab, wie viel Einfachheit, Stabilität und automatische Bankroll-Anpassung der Wetter wünscht.",
  keyTakeaways: [
    "Flat-Einsätze verwenden bei allen Wetten den gleichen Einsatzbetrag, während prozentuale Einsätze einen festen Prozentsatz der aktuellen Bankroll nutzen.",
    "Flat-Einsätze sind einfach und machen die Bewertung der Strategie-Performance leicht.",
    "Prozentuale Einsätze reduzieren das Risiko bei Drawdowns automatisch und erhöhen es nach einem Wachstum der Bankroll.",
    "Keine der beiden Einsatzmethoden kann eine Strategie mit negativem Erwartungswert profitabel machen.",
    "Hohe Einsatzprozentsätze können eine starke Volatilität erzeugen, selbst wenn die Einsatzregel an sich konsistent ist.",
    "Die Qualität der zugrunde liegenden Wahrscheinlichkeits- und Preisentscheidung ist wichtiger als die Einsatzformel.",
    "Ein Einsatzplan sollte vor Beginn der Wetten gewählt werden und nicht impulsiv nach Gewinnen oder Verlusten geändert werden.",
  ],
  sections: [
    {
      id: "flat-staking",
      heading: "Was sind Flat-Einsätze?",
      paragraphs: [
        "Flat-Einsätze bedeuten, bei jeder Wette den gleichen festen Betrag zu riskieren, unabhängig von den jüngsten Ergebnissen oder Änderungen der Bankroll-Größe.",
        "Ein Wettender könnte beispielsweise entscheiden, dass eine Einheit 10 Währungseinheiten entspricht und auf jede Auswahl eine Einheit setzen. Unabhängig davon, ob die Bankroll von 1.000 auf 1.100 steigt oder auf 900 fällt, bleibt der nächste Einsatz bei 10.",
        "Der Hauptvorteil ist die Einfachheit. Die Performance lässt sich leicht nachverfolgen, da große Änderungen der Einsätze die Bilanz nicht verzerren. Wenn eine Strategie gewinnt oder verliert, ist das Ergebnis primär auf die Auswahlen und Quoten zurückzuführen und nicht auf aggressive Änderungen der Positionsgröße."
      ],
      callout: {
        title: "Flat bedeutet nicht risikofrei",
        body:
          "Ein fester Einsatz kann nach einem größeren Drawdown im Verhältnis zur Bankroll dennoch zu hoch werden.",
        tone: "warning",
      },
    },
    {
      id: "percentage-staking",
      heading: "Was ist prozentuales Setzen?",
      paragraphs: [
        "Beim prozentualen Setzen wird bei jeder Wette ein fester Prozentsatz der aktuellen Bankroll riskiert. Ändert sich die Bankroll, ändert sich auch der Einsatz.",
        "Angenommen, die Bankroll beträgt 1.000 und die Setzregel lautet 1 %. Der erste Einsatz beträgt 10. Wenn die Bankroll später auf 800 fällt, wird der nächste 1-%-Einsatz zu 8. Wenn die Bankroll auf 1.200 wächst, wird der nächste Einsatz zu 12.",
        "Dies schafft einen automatischen Anpassungsmechanismus. Das Risiko sinkt in Verlustphasen und steigt allmählich in Gewinnphasen."
      ],
      bullets: [
        "1.000 Bankroll bei 1 % → 10-Einheiten-Einsatz.",
        "800 Bankroll bei 1 % → 8-Einheiten-Einsatz.",
        "1.200 Bankroll bei 1 % → 12-Einheiten-Einsatz.",
      ],
    },
    {
      id: "main-difference",
      heading: "Der grundlegende Unterschied zwischen den beiden Methoden",
      paragraphs: [
        "Der zentrale Unterschied besteht darin, ob der Einsatz in Währungseinheiten fest bleibt oder relativ zur Größe der Bankroll festgelegt wird.",
        "Beim Flat Staking bleibt die Einsatzhöhe konstant. Beim prozentualen Staking bleibt der Anteil der Bankroll, der riskiert wird, annähernd konstant.",
        "Diese Unterscheidung verändert das Verhalten der jeweiligen Methode während Verlustphasen (Drawdowns). Beim Flat Staking wird derselbe Einsatz zu einem größeren Prozentsatz der verbleibenden Bankroll, wenn sich Verluste anhäufen. Beim prozentualen Staking wird der Einsatz automatisch kleiner.",
        "Während des Bankroll-Wachstums geschieht das Gegenteil. Flat-Einsätze werden im Laufe der Zeit zu einem kleineren Prozentsatz der Bankroll, während prozentuale Einsätze steigen."
      ],
      callout: {
        title: "Konstanter Betrag vs. konstanter Anteil",
        body:
          "Flat Staking stabilisiert die Einsatzhöhe. Prozentuales Staking stabilisiert den Anteil der Bankroll, der riskiert wird.",
        tone: "info",
      },
    },
    {
      id: "drawdowns",
      heading: "Wie sich die jeweilige Methode während Verlustphasen verhält",
      paragraphs: [
        "Verlustphasen (Drawdowns) sind Zeiträume, in denen die Bankroll von einem vorherigen Höchststand fällt. Sie sind bei Sportwetten normal, da Varianz selbst dann zu Verlustserien führen kann, wenn der zugrunde liegende Prozess sinnvoll ist.",
        "Flat Staking reagiert nicht automatisch auf einen Drawdown. Wenn der Wetter weiterhin 10 Einheiten riskiert, während die Bankroll von 1.000 auf 700 fällt, steigt der Einsatz von 1 % auf etwa 1,43 % der Bankroll.",
        "Prozentuales Staking reagiert automatisch. Ein 1%-Einsatz bei einer 700er-Bankroll beträgt 7 Einheiten, was die Höhe weiterer Verluste in Währungseinheiten reduziert.",
        "Diese defensive Eigenschaft ist eines der stärksten Argumente für prozentuales Staking, insbesondere wenn der Erhalt der Bankroll das Hauptziel ist."
      ],
    },
    {
      id: "growth",
      heading: "Wie sich die jeweilige Methode während des Bankroll-Wachstums verhält",
      paragraphs: [
        "Wenn eine Bankroll wächst, wird das Flat-Staking zunehmend konservativer, da der feste Einsatz einen kleineren Prozentsatz des Gesamtkapitals darstellt.",
        "Wenn ein Einsatz von 10 Einheiten ursprünglich 1 % einer 1.000er Bankroll entsprach, sind es bei einer 1.500er Bankroll nur noch 0,67 %.",
        "Prozentuales Staking erhöht den Einsatz mit der Bankroll. Bei 1 % ergibt eine 1.500er Bankroll einen Einsatz von 15 Einheiten. Dies ermöglicht es, die Positionsgröße mit wachsendem Kapital zu steigern.",
        "Zinseszinseffekte können Gewinne in günstigen Phasen beschleunigen, erhöhen jedoch auch die absolute Höhe der Verluste, wenn größere Einsätze letztlich verlieren."
      ],
      callout: {
        title: "Zinseszinseffekte wirken in beide Richtungen.",
        body:
          "Prozentuales Staking erhöht die Einsatzgröße mit wachsender Bankroll, aber zukünftige Verluste fallen absolut gesehen ebenfalls höher aus.",
        tone: "warning",
      },
    },
    {
      id: "record-keeping",
      heading: "Welche Methode ist einfacher zu bewerten?",
      paragraphs: [
        "Flat-Staking ist in der Regel einfacher, um die Qualität einer Wettstrategie zu bewerten, da jede Auswahl das gleiche nominale Gewicht hat.",
        "Wenn 100 Wetten jeweils eine Einheit betragen, spiegelt die Gewinn- und Verlustrechnung die Leistung des Auswahlprozesses wider, ohne dass große Einsatzschwankungen das Ergebnis dominieren.",
        "Prozentuales Staking führt zu variierenden Einsatzgrößen. Eine spätere Wette kann einen größeren finanziellen Effekt haben als eine frühere, einfach weil die Bankroll gewachsen ist.",
        "Für Forschung, Modelltests oder Strategievergleiche können flache Einheiten daher eine sauberere Leistungsbilanz liefern. Prozentuales Staking ist möglicherweise besser geeignet, wenn das Hauptanliegen darin besteht, das Risiko im Verhältnis zur aktuellen Bankroll zu kontrollieren."
      ],
    },
    {
      id: "variance",
      heading: "Varianz bei Flat- und prozentualem Staking",
      paragraphs: [
        "Keine der beiden Einsatzmethoden eliminiert die Varianz bei Sportergebnissen. Beide werden Gewinn- und Verlustserien aufweisen.",
        "Der Unterschied liegt darin, wie sich diese Ergebnisse auf die Entwicklung des Bankrolls auswirken. Bei prozentualen Einsätzen passt sich die monetäre Höhe der Schwankungen automatisch an die Größe des Bankrolls an. Bei festen Einsätzen (Flat Staking) bleibt die monetäre Schwankung unabhängig von jüngsten Gewinnen oder Verlusten gleich.",
        "Bei konservativen Einsatzgrößen können beide Ansätze eine handhabbare Volatilität erzeugen. Bei aggressiven Einsatzgrößen können beide gefährlich werden.",
        "Der Prozentsatz selbst ist wichtiger als die Bezeichnung der Methode als Flat Staking oder prozentuales Staking. Ein konstanter Einsatz von 10 % kann weitaus gefährlicher sein als eine konservative Flat-Einheit von 1 %."
      ],
      callout: {
        title: "Konsistenz ist nicht genug",
        body:
          "Eine Einsatzregel kann vollkommen konsistent und dennoch zu aggressiv sein. Die Höhe des Einsatzes im Verhältnis zum Bankroll bleibt entscheidend.",
        tone: "warning",
      },
    },
    {
      id: "expected-value",
      heading: "Staking erzeugt keinen Erwartungswert",
      paragraphs: [
        "Ein Staking-System kann einen schlechten Preis nicht in einen guten verwandeln. Der Erwartungswert ergibt sich aus dem Verhältnis zwischen Wahrscheinlichkeit und Quote.",
        "Wenn eine Wette einen negativen Erwartungswert hat, ändert ein Einsatz von 1 %, 2 % oder pauschal 10 Einheiten nichts an der zugrunde liegenden Wirtschaftlichkeit. Es ändert lediglich die Höhe des erwarteten Verlusts und die damit verbundene Volatilität.",
        "Ebenso kann eine Strategie mit positivem Erwartungswert durch übermäßige Einsatzgrößen geschädigt werden. Ein echter Vorteil schützt einen Bankroll nicht vor dem Ruin, wenn das Risiko zu aggressiv gewählt ist.",
        "Die richtige Reihenfolge lautet daher: Zuerst den Markt und den Preis bewerten, dann eine risikokontrollierte Einsatzregel anwenden."
      ],
      bullets: [
        "Wahrscheinlichkeit und Preis bestimmen den Erwartungswert (EV).",
        "Die Einsatzhöhe bestimmt das Risiko.",
        "Die Einsatzstrategie verändert die Höhe der Ergebnisse, nicht die Qualität der zugrunde liegenden Wette.",
        "Kein Einsatzsystem garantiert einen Gewinn.",
      ],
    },
    {
      id: "percentage-example",
      heading: "Ein Beispiel für prozentuale Einsätze",
      paragraphs: [
        "Betrachten Sie eine Bankroll von 1.000 Einheiten bei einem prozentualen Einsatz von 2 %. Der erste Einsatz beträgt 20.",
        "Wenn die Wette verliert, sinkt die Bankroll auf 980 und der nächste 2%-Einsatz beträgt 19,60. Ein weiterer Verlust führt zu 960,40, und der darauffolgende Einsatz beträgt 19,21.",
        "Der Einsatz verringert sich, wenn die Bankroll sinkt. Dies verlangsamt die absolute Verlustrate im Vergleich zum fortgesetzten Einsatz von festen 20 Einheiten.",
        "Wenn die Bankroll später wächst, kehrt sich der Prozess um und die Einsätze steigen schrittweise an."
      ],
      callout: {
        title: "Automatische Skalierung",
        body:
          "Prozentuale Einsätze reduzieren das absolute Risiko bei Verlusten, ohne dass der Wettende eine neue diskretionäre Entscheidung treffen muss.",
        tone: "example",
      },
    },
    {
      id: "flat-example",
      heading: "Ein Beispiel für flache Einsätze",
      paragraphs: [
        "Betrachten Sie nun dieselbe Bankroll von 1.000 Einheiten bei einem festen Einsatz von 20 Einheiten.",
        "Nach einem Verlust beträgt die Bankroll 980, aber der nächste Einsatz bleibt bei 20. Nach zwei Verlusten beträgt die Bankroll 960 und der dritte Einsatz ist weiterhin 20.",
        "Der feste Betrag macht die Nachverfolgung einfach, aber der Einsatz entspricht nun etwa 2,08 % der kleineren Bankroll anstelle der ursprünglichen 2 %.",
        "Wenn die Bankroll erheblich sinkt, sollte ein fester Einsatz überprüft werden, anstatt zuzulassen, dass er einen immer größeren Prozentsatz des verbleibenden Kapitals ausmacht."
      ],
    },
    {
      id: "rebalancing",
      heading: "Ein hybrider Ansatz: Periodische Neugewichtung",
      paragraphs: [
        "Einige Wettende nutzen einen hybriden Ansatz: feste Einsätze für einen bestimmten Zeitraum, gefolgt von einer gelegentlichen Neuberechnung der Einheitengröße.",
        "Zum Beispiel könnte eine Einheit zu Beginn jedes Monats oder nachdem sich die Bankroll um einen vordefinierten Betrag geändert hat, auf 1 % der Bankroll festgelegt werden.",
        "Dies bewahrt einen Großteil der Einfachheit fester Einsätze und verhindert gleichzeitig, dass eine feste Einheit im Verhältnis zur Bankroll zu groß oder zu klein wird.",
        "Der Schlüssel liegt darin, dass die Regeln für die Neugewichtung im Voraus festgelegt werden sollten. Die ständige Änderung der Einsatzgröße nach emotionalen Gewinnen oder Verlusten macht den Zweck eines Einsatzsystems zunichte."
      ],
    },
    {
      id: "confidence-staking",
      heading: "Sollten sich Einsätze mit dem Vertrauen ändern?",
      paragraphs: [
        "Einige Wettende variieren die Einsatzgröße basierend auf dem wahrgenommenen Vorteil oder Vertrauen. Theoretisch kann ein stärkerer positiver Erwartungswert ein höheres Risiko rechtfertigen.",
        "Das praktische Problem ist der Schätzfehler. Wenn ein Wettender zu selbstsicher ist, welche Auswahlen den größten Vorteil bieten, kann variables Setzen Fehler vergrößern.",
        "Aus diesem Grund sind feste oder einfache prozentuale Einsätze oft leichter zu prüfen und zu kontrollieren. Fortgeschrittenere variable Einsatzstrategien sollten nur in Betracht gezogen werden, wenn Wahrscheinlichkeitsschätzungen gut kalibriert sind und strenge maximale Expositionslimits bestehen.",
        "Ein Label wie 'hohe Zuversicht' sollte niemals als Gewissheit betrachtet werden."
      ],
      callout: {
        title: "Zuversicht kann falsch kalibriert sein.",
        body:
          "Variable Einsätze verstärken sowohl korrekte als auch inkorrekte Einschätzungen der Zuversicht.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "Wie sich das Kelly-Kriterium unterscheidet",
      paragraphs: [
        "Das Kelly-Kriterium ist weder ein pauschaler Einsatz noch ein einfacher Einsatz mit festem Prozentsatz. Es berechnet einen empfohlenen Bruchteil des Kapitals basierend auf dem geschätzten Vorteil und den Quoten.",
        "Theoretisch passt Kelly die Einsatzhöhe an die Stärke der geschätzten Chance an. In der Praxis reagiert es jedoch sehr empfindlich auf Wahrscheinlichkeitsfehler.",
        "Wenn die Wahrscheinlichkeitsschätzung zu optimistisch ist, kann Full Kelly einen übermäßig hohen Einsatz empfehlen. Deshalb werden oft fraktionale Kelly-Ansätze verwendet, um die Volatilität zu reduzieren.",
        "Für die meisten Nutzer ist die wichtige Lektion nicht, dass eine Formel überlegen ist. Sie lautet, dass komplexere Einsatzstrategien zuverlässigere Wahrscheinlichkeitsschätzungen und stärkere Risikokontrollen erfordern."
      ],
    },
    {
      id: "psychology",
      heading: "Welche Methode ist emotional einfacher zu befolgen?",
      paragraphs: [
        "Pauschale Einsätze können sich einfacher anfühlen, da sich der Betrag nach Gewinnen oder Verlusten nicht ändert. Dies verringert die Versuchung, Einsatzänderungen als emotionale Reaktionen zu interpretieren.",
        "Prozentuale Einsätze können ebenfalls die Disziplin fördern, da die Anpassung automatisch und regelbasiert erfolgt. Ein kleinerer Einsatz nach Verlusten ist keine Bestrafung; er ist lediglich das Ergebnis eines kleineren Kapitals.",
        "Probleme entstehen, wenn Wettende nach einer Serie von einer der beiden Methoden abweichen. Das Erhöhen der Einsätze nach Verlusten, um Geld zurückzugewinnen, oder das Erhöhen nach Gewinnen aufgrund von Selbstüberschätzung führt zu diskretionärem Risiko.",
        "Die beste Einsatzmethode ist oft diejenige, die konsequent befolgt werden kann, ohne zu impulsiven Änderungen zu verleiten."
      ],
    },
    {
      id: "matchsignal",
      heading: "Wie Einsätze mit MatchSignal zusammenhängen",
      paragraphs: [
        "MatchSignal bietet analytischen Kontext, einschließlich Best Odds, Market Avg, Fair Probability, Value Edge, Books Sampled und Risk Tier.",
        "Diese Felder sind keine Anweisungen für Einsätze. Eine Einstufung als Low Risk oder ein größerer Value Edge sollten nicht automatisch zu einem höheren Einsatz führen.",
        "Die Einsatzhöhe sollte durch ein separates persönliches Bankroll-System bestimmt werden, das Erschwinglichkeit, Unsicherheit, Varianz und Limits für verantwortungsbewusstes Spielen berücksichtigt.",
        "Die Analyse von MatchSignal dient der Information und garantiert keine Ergebnisse oder empfiehlt ein spezifisches finanzielles Risiko."
      ],
      callout: {
        title: "Analyse und Einsatzhöhe sind getrennte Entscheidungen",
        body:
          "Ein starkes analytisches Signal beseitigt keine Unsicherheit und sollte konservative Bankroll-Regeln nicht außer Kraft setzen.",
        tone: "warning",
      },
    },
    {
      id: "comparison",
      heading: "Flat Stakes vs. prozentuale Einsätze: Ein Vergleich",
      paragraphs: [
        "Beide Methoden können sinnvoll sein, wenn die Einsätze konservativ gewählt werden und die Regeln konsequent befolgt werden. Ihre Stärken liegen in unterschiedlichen Bereichen."
      ],
      bullets: [
        "Flat Staking: am einfachsten zu verstehen und nachzuverfolgen.",
        "Flat Staking: nützlich für die Bewertung der Strategie-Performance.",
        "Flat-Staking: Kann nach einem starken Drawdown im Verhältnis zur Bankroll zu groß werden.",
        "Prozentuales Staking: Reduziert das Risiko bei Drawdowns automatisch.",
        "Prozentuales Staking: Führt bei Wachstum der Bankroll automatisch zu einem Zinseszinseffekt.",
        "Prozentuales Staking: Erzeugt wechselnde Einsatzgrößen, was die Auswertung weniger intuitiv machen kann.",
        "Beide Methoden: Erfordern konservative Einsatzhöhen und können keinen Vorteil (Edge) schaffen.",
      ],
    },
    {
      id: "checklist",
      heading: "Eine praktische Checkliste für das Staking",
      paragraphs: [
        "Unabhängig von der gewählten Methode sollte die Staking-Regel einfach genug sein, um sie sowohl in Gewinn- als auch in Verlustphasen einzuhalten."
      ],
      bullets: [
        "Trennen Sie das Wettkapital von lebensnotwendigen Geldern.",
        "Entscheiden Sie sich vor Beginn der Wetten für Flat-Staking oder prozentuales Staking.",
        "Halten Sie den Einsatz im Verhältnis zur Bankroll konservativ.",
        "Erhöhen Sie die Einsätze nicht, um Verluste auszugleichen.",
        "Überprüfen Sie nach einem Drawdown, ob ein Flat-Stake zu groß geworden ist.",
        "Wenn Sie prozentuales Staking verwenden, berechnen Sie die Einsätze konsequent auf Basis der aktuellen Bankroll.",
        "Vermeiden Sie häufige willkürliche Änderungen aufgrund aktueller Ergebnisse.",
        "Verfolgen Sie Einsätze und Veränderungen Ihres Bankrolls präzise.",
        "Gehen Sie vorsichtig mit fortgeschrittenen variablen Einsatzstrategien um, wenn Wahrscheinlichkeitsschätzungen unsicher sind.",
        "Stoppen oder reduzieren Sie das Wetten, wenn der finanzielle oder emotionale Druck zunimmt.",
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
    "Flat-Staking und prozentuales Setzen sind Methoden des Risikomanagements, keine Gewinnarantien. Jede Wettstrategie kann zu Verlusten führen. Halten Sie Ihre Einsätze in einem Rahmen, den Sie sich leisten können zu verlieren, trennen Sie Wettgelder von lebensnotwendigen Mitteln, vermeiden Sie es, Einsätze zu erhöhen, um Verluste auszugleichen, und hören Sie auf, wenn das Wetten zu finanziellem oder emotionalem Schaden führt.",
};

export default guide;
