import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "variance-sports-betting",
  locale: "fr",
  title: "Comprendre la variance dans les paris sportifs",
  category: "bankroll-risk",
  status: "published",
  description:
    "Apprenez ce que signifie la variance dans les paris sportifs, pourquoi les résultats à court terme peuvent différer considérablement des attentes à long terme, comment la taille de l'échantillon et les cotes affectent les fluctuations, et pourquoi les séries de victoires ou de défaites peuvent induire en erreur la prise de décision.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "La variance décrit à quel point les résultats réels à court terme peuvent s'écarter de leur espérance à long terme. Dans les paris sportifs, cela est important car même une décision judicieuse peut être perdante et une mauvaise décision peut être gagnante. Un parieur peut prendre plusieurs décisions à espérance de gain positive d'affilée et subir tout de même une série de pertes, tandis qu'un autre parieur peut systématiquement accepter de mauvaises cotes et rester rentable pendant une courte période grâce à la chance. Comprendre la variance aide à distinguer le processus du résultat, empêche de réagir de manière excessive à de petits échantillons et rend les décisions concernant la gestion de bankroll et la mise plus disciplinées.",
  keyTakeaways: [
    "La variance est la fluctuation naturelle des résultats à court terme autour de l'espérance à long terme.",
    "Une espérance de gain positive n'empêche pas les séries de pertes, et une espérance de gain négative n'empêche pas les séries de victoires à court terme.",
    "Les petits échantillons sont bruités et révèlent souvent moins de choses sur la qualité de la décision que ce que les gens supposent.",
    "Les paris à cotes plus élevées créent généralement des fluctuations plus importantes car les gains surviennent moins fréquemment et les paiements sont plus irréguliers.",
    "La taille de la mise affecte directement l'ampleur des fluctuations de la bankroll, même lorsque l'avantage sous-jacent du pari reste inchangé.",
    "Les baisses de capital (drawdowns) sont normales dans les processus incertains et doivent être anticipées plutôt que traitées comme la preuve qu'un modèle a soudainement cessé de fonctionner.",
    "L'évaluation à long terme doit se concentrer sur la calibration, la qualité des prix et le processus, en plus des profits et des pertes.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Ce que signifie la variance",
      paragraphs: [
        "La variance est un concept statistique qui mesure à quel point les résultats peuvent se disperser autour d'une moyenne ou d'une valeur attendue. Dans les paris, l'idée pratique est plus simple : les résultats réels peuvent sembler très différents de l'espérance sous-jacente sur de courtes périodes.",
        "Supposons qu'un ensemble de paris ait une probabilité de gain réelle de 55 % avec des cotes de type « even-money ». Sur un très grand nombre de paris, le taux de gain observé peut tendre vers 55 %. Sur 20 paris, cependant, le résultat réel pourrait facilement être de 8 victoires et 12 défaites, 14 victoires et 6 défaites, ou quelque chose entre les deux.",
        "Ce mouvement à court terme n'est pas nécessairement la preuve que l'estimation de 55 % était correcte ou incorrecte. Cela fait partie du caractère aléatoire inhérent aux événements incertains répétés."
      ],
      callout: {
        title: "La variance n'est pas la même chose qu'une erreur",
        body:
          "Une série de pertes peut survenir même lorsque l'estimation de probabilité et la cote étaient raisonnables. Le caractère aléatoire et les erreurs analytiques sont des problèmes différents.",
        tone: "info",
      },
    },
    {
      id: "ev-vs-variance",
      heading: "La valeur attendue et la variance sont différentes",
      paragraphs: [
        "La valeur attendue décrit le résultat moyen théorique de décisions répétées. La variance décrit à quel point les résultats individuels ou à court terme peuvent fluctuer autour de cette moyenne.",
        "Un pari peut avoir une valeur attendue positive et une variance élevée. Par exemple, un outsider proposé à 6,00 peut être attractif si sa probabilité réelle est significativement supérieure au seuil de rentabilité, mais la plupart des paris individuels de ce type seront tout de même perdants.",
        "À l'inverse, un favori à faible cote peut avoir une variance apparente plus faible par pari car il gagne plus souvent, mais il peut tout de même avoir une valeur attendue négative si la cote est trop basse.",
        "Une bonne analyse des paris nécessite donc les deux concepts. La valeur attendue (EV) demande si la cote est attractive selon une estimation de probabilité. La variance demande à quel point les résultats réalisés peuvent être instables pendant que cet avantage se concrétise."
      ],
      callout: {
        title: "Une EV positive ne signifie pas des résultats lisses",
        body:
          "Un avantage peut exister et tout de même produire des périodes de pertes inconfortables ou prolongées.",
        tone: "warning",
      },
    },
    {
      id: "small-samples",
      heading: "Pourquoi les petits échantillons sont trompeurs",
      paragraphs: [
        "Les humains ont tendance à tirer des conclusions hâtives à partir de résultats récents. Dans les paris, cela est dangereux car les petits échantillons contiennent une grande part de bruit.",
        "Un parieur qui gagne 7 paris sur 10 peut penser qu'une stratégie est très précise, mais dix paris sont généralement bien trop peu nombreux pour distinguer la compétence du hasard. Un autre parieur qui en perd 7 sur 10 pourrait abandonner un processus qui est pourtant solide.",
        "Plus l'échantillon est petit, plus la plage de résultats plausibles autour de la probabilité réelle est large. À mesure que la taille de l'échantillon augmente, le taux de victoire observé devient généralement plus stable, bien qu'aucun échantillon fini ne puisse éliminer totalement l'incertitude.",
        "C'est pourquoi l'évaluation d'un modèle nécessite plus que l'examen de la semaine ou du mois le plus récent. Le calibrage à long terme, la qualité du prix de clôture, le contexte du marché et la cohérence du processus sont tous importants."
      ],
      bullets: [
        "10 paris peuvent être dominés par le hasard.",
        "100 paris fournissent plus d'informations mais peuvent encore contenir d'importantes fluctuations.",
        "1 000 paris donnent généralement une image plus claire, mais les résultats dépendent toujours du type de pari, des cotes et de la qualité du modèle.",
        "La taille de l'échantillon doit être interprétée conjointement avec les probabilités sous-jacentes et la structure du marché.",
      ],
    },
    {
      id: "streaks",
      heading: "Pourquoi les séries de victoires et de défaites se produisent",
      paragraphs: [
        "Les séries sont une conséquence normale d'événements aléatoires répétés. Même lorsque chaque pari a une probabilité stable, des regroupements de victoires et de défaites se produiront.",
        "Si un parieur a une probabilité réelle de 55 % de gagner chaque pari indépendant, cela ne signifie pas que la séquence alternera parfaitement entre victoires et défaites. Cinq défaites consécutives peuvent arriver. Six victoires consécutives aussi.",
        "L'existence d'une série ne prouve pas que la probabilité sous-jacente a changé. Avant de modifier un modèle ou une approche de mise, faites la distinction entre un véritable signal d'information et la variance ordinaire."
      ],
      callout: {
        title: "Les séquences aléatoires semblent moins aléatoires que ce que les gens attendent.",
        body:
          "Les regroupements et les séries sont normaux. Une séquence n'a pas besoin d'alterner pour être cohérente avec une probabilité stable.",
        tone: "info",
      },
    },
    {
      id: "odds-and-variance",
      heading: "Comment les cotes affectent la variance",
      paragraphs: [
        "Les cotes influencent la forme des résultats de paris. Les sélections à faible cote gagnent plus fréquemment mais génèrent généralement des profits plus modestes lorsqu'elles réussissent. Les sélections à cote élevée gagnent moins fréquemment mais génèrent des gains plus importants.",
        "Cela signifie que deux stratégies ayant la même valeur théorique attendue peuvent connaître des trajectoires de capital très différentes. Une stratégie axée sur des cotes de 1,50 peut produire de nombreuses petites victoires et des revers occasionnels plus importants. Une stratégie axée sur des cotes de 5,00 peut connaître de longues périodes de pertes interrompues par des gains plus importants.",
        "Plus les cotes typiques sont élevées, plus il devient important de s'attendre à de longs écarts entre les gagnants et d'éviter d'interpréter ces écarts comme la preuve immédiate que la stratégie est défaillante."
      ],
      bullets: [
        "Cotes courtes : taux de réussite plus élevé, gain plus faible par victoire.",
        "Cotes longues : taux de réussite plus faible, gain plus important par victoire.",
        "Des cotes moyennes plus élevées créent généralement des résultats à court terme plus volatils.",
        "Comparer des stratégies uniquement sur la base du taux de victoire peut donc être trompeur.",
      ],
    },
    {
      id: "drawdowns",
      heading: "Qu'est-ce qu'un drawdown ?",
      paragraphs: [
        "Un drawdown est le déclin entre un pic de capital précédent et un point bas ultérieur. Les drawdowns sont un moyen pratique de décrire à quel point la variance peut devenir pénible.",
        "Par exemple, si une bankroll passe de 100 unités à 120 unités puis chute à 102 unités, le drawdown depuis le sommet est de 18 unités, soit 15 % du sommet de 120 unités.",
        "Une stratégie peut avoir une espérance positive à long terme tout en subissant des drawdowns substantiels. L'ampleur de ces drawdowns dépend de l'avantage, de la variance des paris, des cotes moyennes, de la corrélation et de la gestion des mises.",
        "Anticiper les drawdowns est important car la pression émotionnelle augmente souvent lorsque les pertes s'accumulent. Sans limites de risque prédéfinies, les parieurs peuvent réagir en augmentant leurs mises, en cherchant à se refaire ou en abandonnant un processus cohérent."
      ],
      callout: {
        title: "Les drawdowns doivent être anticipés, et non gérés de manière improvisée.",
        body:
          "La planification des risques est plus facile avant le début d'une série de pertes qu'au cours de celle-ci.",
        tone: "warning",
      },
    },
    {
      id: "stake-size",
      heading: "La taille de la mise modifie l'impact de la variance.",
      paragraphs: [
        "La variance des résultats sportifs ne peut être éliminée, mais la taille de la mise contrôle l'intensité avec laquelle ces résultats affectent la bankroll.",
        "Si deux parieurs font des sélections identiques à des cotes identiques, mais que l'un risque 1 % de sa bankroll par pari et l'autre 10 %, le second parieur subira des fluctuations en pourcentage bien plus importantes.",
        "Des mises importantes peuvent transformer des séquences de pertes ordinaires en drawdowns sévères. C'est pourquoi la gestion de bankroll n'est pas distincte de la variance ; c'est l'outil principal pour contrôler les conséquences financières de la variance.",
        "Une mise plus faible n'améliore pas la probabilité de gagner. Elle réduit simplement les dommages causés par une erreur et augmente le nombre de pertes qu'une bankroll peut supporter."
      ],
      bullets: [
        "Des mises plus faibles réduisent la volatilité de la bankroll.",
        "Des mises plus importantes amplifient à la fois les gains et les pertes.",
        "La taille de la mise doit refléter l'incertitude ainsi que l'avantage perçu.",
        "Aucune méthode de mise ne peut éliminer la possibilité de perte.",
      ],
    },
    {
      id: "correlation",
      heading: "La corrélation peut augmenter la variance",
      paragraphs: [
        "Tous les paris ne sont pas indépendants. Plusieurs positions peuvent dépendre du même événement sous-jacent, de la même équipe, du même joueur, des conditions météorologiques ou d'une hypothèse de marché.",
        "Par exemple, parier sur la victoire d'une équipe, sur le fait que son attaquant marque et sur un nombre total de buts supérieur peut créer une exposition corrélée. Si le match se déroule à l'encontre de la thèse commune, plusieurs paris peuvent être perdants simultanément.",
        "La corrélation peut donner l'impression qu'un portefeuille de paris est plus diversifié qu'il ne l'est réellement. Dix paris ne sont pas équivalents à dix risques indépendants si beaucoup reposent sur les mêmes facteurs de résultat.",
        "Lorsque vous réfléchissez à la variance, tenez compte non seulement du nombre de paris, mais aussi de la force de leur corrélation."
      ],
      callout: {
        title: "Dix paris peuvent se comporter comme un seul gros pari",
        body:
          "Si plusieurs positions dépendent de la même hypothèse sous-jacente, leur risque combiné peut être beaucoup plus élevé que ce que le nombre de paris suggère.",
        tone: "warning",
      },
    },
    {
      id: "model-evaluation",
      heading: "Comment la variance complique l'évaluation des modèles",
      paragraphs: [
        "Un modèle de prédiction peut être jugé injustement si l'évaluation se concentre uniquement sur le profit à court terme. Le profit est important, mais il est affecté à la fois par la qualité de la décision et par le hasard.",
        "Une évaluation plus robuste examine plusieurs dimensions : si les probabilités prédites sont calibrées, si le modèle trouve systématiquement des prix compétitifs, si la performance persiste sur des échantillons plus larges et si les résultats restent cohérents selon les différents sports ou types de marché.",
        "Un modèle rentable sur 50 paris mais mal calibré peut simplement être chanceux. Un modèle qui perd sur 100 paris mais bat systématiquement le prix du marché ultérieur peut mériter une enquête plus approfondie plutôt qu'un rejet immédiat.",
        "Aucune mesure unique n'est suffisante. La variance signifie que les preuves doivent s'accumuler avant de tirer des conclusions fermes."
      ],
      bullets: [
        "Suivez le calibrage des probabilités.",
        "Suivez la qualité des prix et la comparaison avec le marché de clôture lorsque cela est pertinent.",
        "Examinez les performances par type de marché et par plage de cotes.",
        "Utilisez des échantillons suffisamment grands avant d'apporter des changements structurels.",
        "Recherchez si les pertes proviennent de mauvaises estimations, de mauvais prix ou d'une variance ordinaire.",
      ],
    },
    {
      id: "psychology",
      heading: "Variance et psychologie des paris",
      paragraphs: [
        "La variance crée une pression psychologique car les gens associent naturellement les résultats récents à la qualité de leurs décisions.",
        "Après une série de victoires, un parieur peut devenir trop confiant, augmenter ses mises ou supposer que le marché est devenu facile à battre. Après une série de pertes, le même parieur peut chercher à se refaire, abandonner ses règles ou rechercher des paris de plus en plus agressifs.",
        "Les deux réactions confondent le résultat avec le processus. Un cadre discipliné évalue si l'estimation de probabilité, le prix et la mise initiaux étaient raisonnables au moment où la décision a été prise.",
        "La stabilité émotionnelle fait donc partie de la gestion des risques. Des limites prédéfinies et des règles de mise cohérentes réduisent la tentation de modifier son comportement en réponse à des fluctuations aléatoires à court terme."
      ],
      callout: {
        title: "Ne laissez pas le dernier résultat déterminer la mise suivante.",
        body:
          "Une victoire ou une défaite récente ne devrait pas modifier automatiquement le montant de la mise. Les décisions doivent suivre un processus de risque prédéfini.",
        tone: "warning",
      },
    },
    {
      id: "simulation-thinking",
      heading: "Pourquoi la pensée par simulation est utile",
      paragraphs: [
        "Une façon utile de comprendre la variance consiste à imaginer la même stratégie de pari rejouée de nombreuses fois. Si une stratégie a une valeur attendue positive, certains parcours simulés commenceront tout de même mal, tandis que d'autres débuteront par des séries de victoires inhabituellement fortes.",
        "L'existence de ces différents parcours montre pourquoi une séquence réalisée ne suffit pas à révéler l'espérance sous-jacente. Le parieur ne fait l'expérience que d'un seul parcours, mais de nombreux parcours alternatifs étaient possibles.",
        "Cette façon de penser encourage des questions plus réalistes : à quel point une baisse normale pourrait-elle être grave ? Quelle devrait être la taille de la bankroll ? Quelle confiance accorder à un petit échantillon ? Dans quelle mesure les résultats sont-ils sensibles à des hypothèses de probabilité légèrement différentes ?",
        "La simulation n'est pas une garantie de résultats futurs, mais elle aide à visualiser l'éventail des résultats plausibles autour d'une valeur attendue."
      ],
    },
    {
      id: "matchsignal",
      heading: "Comment la variance s'intègre dans MatchSignal",
      paragraphs: [
        "MatchSignal présente une analyse de marché basée sur les probabilités, le Value Edge, le Risk Tier, les Best Odds, la Market Avg et les Books Sampled pour fournir un contexte structuré autour d'une sélection.",
        "Ces champs n'éliminent pas la variance. Une étiquette Low Risk ne signifie pas qu'un pari ne peut pas être perdant, et un Value Edge positif ne signifie pas que l'événement suivant produira nécessairement un profit avec certitude.",
        "Le Risk Tier s'interprète mieux comme un signal de risque comparatif au sein du cadre de la plateforme, tandis que le Value Edge décrit la relation entre le prix et l'évaluation basée sur les probabilités. Les résultats sportifs réels peuvent toujours s'écarter de ces estimations.",
        "La variance est donc l'une des raisons pour lesquelles l'analyse de MatchSignal doit être utilisée comme une information plutôt que comme une garantie. Même des avantages bien identifiés peuvent produire des résultats perdants et des séries de pertes."
      ],
      callout: {
        title: "Le niveau de risque n'est pas une garantie",
        body:
          "Un risque évalué comme plus faible inclut toujours la possibilité de perte. Les résultats sportifs demeurent incertains.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Une liste de contrôle pratique sur la variance",
      paragraphs: [
        "Utilisez cette liste de contrôle lorsque des résultats récents vous incitent à apporter des changements importants à votre processus de pari."
      ],
      bullets: [
        "Vérifiez la taille de l'échantillon avant de juger la performance.",
        "Séparez la qualité de la décision du résultat final.",
        "Examinez les cotes et l'estimation de probabilité qui étaient disponibles à ce moment-là.",
        "Déterminez si la série de pertes ou de gains est plausible dans le cadre d'une variance normale.",
        "Vérifiez la corrélation entre plusieurs positions.",
        "Examinez la taille des mises et le risque de baisse (drawdown).",
        "Évitez d'augmenter les mises pour récupérer des pertes.",
        "Évitez de supposer qu'une série de gains prouve un avantage permanent.",
        "Évaluez la calibration et la qualité des prix sur de plus grands échantillons.",
        "Maintenez des limites prédéterminées pour votre capital et vos pertes.",
      ],
    },
  ],
  relatedGuides: [
    "expected-value-sports-betting",
    "bankroll-management",
    "flat-stakes-vs-percentage-staking",
    "winning-streaks-misleading",
    "why-chasing-losses-is-dangerous",
    "cognitive-biases-sports-betting",
  ],
  responsibleGamblingNote:
    "La variance peut entraîner des périodes de pertes prolongées, même lorsqu'un processus de pari semble raisonnable. N'augmentez pas vos mises pour récupérer vos pertes et ne présumez pas qu'une série de victoires se poursuivra. Utilisez des limites de dépenses et de pertes prédéterminées, ne misez que des montants que vous pouvez vous permettre de perdre, et arrêtez-vous si les paris causent des préjudices financiers ou émotionnels.",
};

export default guide;
