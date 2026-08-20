import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "flat-stakes-vs-percentage-staking",
  locale: "fr",
  title: "Mises fixes vs Mises en pourcentage",
  category: "bankroll-risk",
  status: "published",
  description:
    "Comparez les mises fixes et les mises en pourcentage dans les paris sportifs, comprenez comment chaque méthode affecte la volatilité de la bankroll, les baisses de capital (drawdowns), la tenue des registres et le risque, et apprenez quand chaque approche peut être plus facile à gérer.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Les mises fixes et les mises en pourcentage sont deux méthodes courantes pour décider quelle part d'une bankroll de paris risquer sur chaque pari. La mise fixe utilise le même montant de mise de manière répétée, tandis que la mise en pourcentage utilise un pourcentage fixe de la bankroll actuelle, ce qui fait varier la taille de la mise à mesure que la bankroll change. Aucune de ces approches ne crée d'avantage par elle-même. Leur objectif est le contrôle du risque et la cohérence. Le meilleur choix dépend du niveau de simplicité, de stabilité et d'ajustement automatique de la bankroll souhaité par le parieur.",
  keyTakeaways: [
    "La mise fixe utilise le même montant de mise pour tous les paris, tandis que la mise en pourcentage utilise un pourcentage fixe de la bankroll actuelle.",
    "La mise fixe est simple et facilite l'évaluation de la performance d'une stratégie.",
    "La mise en pourcentage réduit automatiquement l'exposition lors des baisses de capital et l'augmente après une croissance de la bankroll.",
    "Aucune méthode de mise ne peut rendre rentable une stratégie à espérance de gain négative.",
    "Des pourcentages de mise élevés peuvent créer une forte volatilité, même lorsque la règle de mise elle-même est cohérente.",
    "La qualité de la probabilité sous-jacente et de la décision sur la cote importe plus que la formule de mise.",
    "Un plan de mise doit être choisi avant de commencer à parier et ne doit pas être modifié de manière impulsive après des gains ou des pertes.",
  ],
  sections: [
    {
      id: "flat-staking",
      heading: "Qu'est-ce que la mise fixe ?",
      paragraphs: [
        "La mise fixe consiste à risquer le même montant fixe sur chaque pari, indépendamment des résultats récents ou des changements dans la taille de la bankroll.",
        "Par exemple, un parieur peut décider qu'une unité équivaut à 10 unités monétaires et miser une unité sur chaque sélection. Que la bankroll passe de 1 000 à 1 100 ou tombe à 900, la mise suivante reste de 10.",
        "L'avantage principal est la simplicité. La performance est facile à suivre car les changements importants de mise ne faussent pas le bilan. Si une stratégie gagne ou perd, le résultat est principalement dû aux sélections et aux cotes plutôt qu'à des changements agressifs de la taille des positions."
      ],
      callout: {
        title: "Mise fixe ne signifie pas sans risque",
        body:
          "Une mise fixe peut toujours devenir trop importante par rapport à la bankroll après une baisse significative.",
        tone: "warning",
      },
    },
    {
      id: "percentage-staking",
      heading: "Qu'est-ce que la mise en pourcentage ?",
      paragraphs: [
        "La mise en pourcentage consiste à risquer un pourcentage fixe de la bankroll actuelle sur chaque pari. Si la bankroll change, la mise change en conséquence.",
        "Supposons que la bankroll soit de 1 000 et que la règle de mise soit de 1 %. La première mise est de 10. Si la bankroll tombe ensuite à 800, la mise suivante de 1 % devient 8. Si la bankroll passe à 1 200, la mise suivante devient 12.",
        "Cela crée un mécanisme d'ajustement automatique. L'exposition diminue pendant les périodes de pertes et augmente progressivement pendant les périodes de gains."
      ],
      bullets: [
        "Bankroll de 1 000 à 1 % → mise de 10 unités.",
        "Bankroll de 800 à 1 % → mise de 8 unités.",
        "Bankroll de 1 200 à 1 % → mise de 12 unités.",
      ],
    },
    {
      id: "main-difference",
      heading: "La différence fondamentale entre les deux méthodes",
      paragraphs: [
        "La différence centrale réside dans le fait que la mise reste fixe en termes monétaires ou fixe par rapport à la taille de la bankroll.",
        "La mise fixe maintient le montant du pari constant. La mise en pourcentage maintient la proportion de la bankroll à risque approximativement constante.",
        "Cette distinction modifie le comportement de chaque méthode lors des périodes de baisse. Avec une mise fixe, la même mise devient un pourcentage plus important de la bankroll restante à mesure que les pertes s'accumulent. Avec une mise en pourcentage, la mise diminue automatiquement.",
        "Lors de la croissance de la bankroll, l'inverse se produit. Les mises fixes deviennent un pourcentage plus faible de la bankroll au fil du temps, tandis que les mises en pourcentage augmentent."
      ],
      callout: {
        title: "Montant constant vs proportion constante",
        body:
          "La mise fixe stabilise le montant de la mise. La mise en pourcentage stabilise la proportion de la bankroll à risque.",
        tone: "info",
      },
    },
    {
      id: "drawdowns",
      heading: "Comment chaque méthode se comporte lors des périodes de baisse",
      paragraphs: [
        "Les baisses sont des périodes où la bankroll chute par rapport à un sommet précédent. Elles sont normales dans les paris sportifs car la variance peut entraîner des séries de pertes même lorsque le processus sous-jacent est raisonnable.",
        "La mise fixe ne réagit pas automatiquement à une baisse. Si le parieur continue de risquer 10 unités alors que la bankroll tombe de 1 000 à 700, la mise passe de 1 % à environ 1,43 % de la bankroll.",
        "La mise en pourcentage réagit automatiquement. Une mise de 1 % sur une bankroll de 700 représente 7 unités, ce qui réduit le montant des pertes futures en termes monétaires.",
        "Cette caractéristique défensive est l'un des arguments les plus solides en faveur de la mise en pourcentage, surtout lorsque la préservation de la bankroll est l'objectif principal."
      ],
    },
    {
      id: "growth",
      heading: "Comment chaque méthode se comporte lors de la croissance de la bankroll",
      paragraphs: [
        "Lorsqu'une bankroll augmente, la mise fixe devient progressivement plus conservatrice car la mise fixe représente un pourcentage plus faible du capital total.",
        "Si une mise de 10 unités représentait initialement 1 % d'une bankroll de 1 000, elle ne représente plus que 0,67 % d'une bankroll de 1 500.",
        "La mise en pourcentage augmente la mise avec la bankroll. À 1 %, une bankroll de 1 500 produit une mise de 15 unités. Cela permet à la taille de la position de se cumuler à mesure que le capital augmente.",
        "Les intérêts composés peuvent accélérer les gains pendant les périodes favorables, mais ils augmentent également la taille absolue des pertes lorsque des mises plus importantes finissent par perdre."
      ],
      callout: {
        title: "Les intérêts composés fonctionnent dans les deux sens.",
        body:
          "La mise en pourcentage augmente la taille de la mise à mesure que la bankroll augmente, mais les pertes futures sont également plus importantes en termes absolus.",
        tone: "warning",
      },
    },
    {
      id: "record-keeping",
      heading: "Quelle méthode est la plus facile à évaluer ?",
      paragraphs: [
        "La mise fixe est généralement plus facile pour évaluer la qualité d'une stratégie de pari car chaque sélection porte le même poids nominal.",
        "Si 100 paris valent tous une unité, le bilan des profits et pertes reflète la performance du processus de sélection sans qu'une grande variation de mise ne domine le résultat.",
        "La mise en pourcentage crée des tailles de mise changeantes. Un pari ultérieur peut avoir un effet financier plus important qu'un pari antérieur simplement parce que la bankroll a augmenté.",
        "Pour la recherche, les tests de modèles ou la comparaison de stratégies, les unités fixes peuvent donc fournir un historique de performance plus clair. La mise en pourcentage peut être plus appropriée lorsque la préoccupation principale est de contrôler l'exposition par rapport à la bankroll actuelle."
      ],
    },
    {
      id: "variance",
      heading: "La variance avec la mise fixe et la mise en pourcentage",
      paragraphs: [
        "Aucune méthode de mise n'élimine la variance des résultats sportifs. Les deux connaîtront des séries de gains et de pertes.",
        "La différence réside dans la manière dont ces résultats se traduisent en mouvements de capital. Avec une mise en pourcentage, le montant monétaire des fluctuations s'ajuste automatiquement à la taille du capital. Avec une mise fixe, la même fluctuation monétaire se poursuit indépendamment des gains ou pertes récents.",
        "Avec des tailles de mise conservatrices, les deux approches peuvent produire une volatilité gérable. Avec des tailles de mise agressives, les deux peuvent devenir dangereuses.",
        "Le pourcentage lui-même importe plus que le fait que la méthode soit appelée mise fixe ou en pourcentage. Une mise constante de 10 % peut être bien plus dangereuse qu'une unité fixe conservatrice de 1 %."
      ],
      callout: {
        title: "La cohérence ne suffit pas",
        body:
          "Une règle de mise peut être parfaitement cohérente et rester trop agressive. La taille de la mise par rapport au capital reste critique.",
        tone: "warning",
      },
    },
    {
      id: "expected-value",
      heading: "La mise ne crée pas de valeur attendue",
      paragraphs: [
        "Un système de mise ne peut pas transformer un mauvais prix en un bon. La valeur attendue provient de la relation entre la probabilité et les cotes.",
        "Si un pari a une valeur attendue négative, miser 1 %, 2 % ou 10 unités fixes ne change pas l'économie sous-jacente. Cela modifie seulement la taille de la perte attendue et la volatilité qui l'entoure.",
        "De même, une stratégie à valeur attendue positive peut être compromise par une taille de mise excessive. Un avantage réel ne protège pas un capital de la ruine si l'exposition est trop agressive.",
        "L'ordre correct est donc : évaluer d'abord le marché et le prix, puis appliquer une règle de mise contrôlée par le risque."
      ],
      bullets: [
        "La probabilité et le prix déterminent la valeur attendue (EV).",
        "La taille de la mise détermine l'exposition.",
        "La gestion des mises modifie l'ampleur des résultats, et non la qualité du pari sous-jacent.",
        "Aucun système de mise ne garantit de profit.",
      ],
    },
    {
      id: "percentage-example",
      heading: "Exemple de mise en pourcentage",
      paragraphs: [
        "Considérons une bankroll de 1 000 unités utilisant une mise de 2 %. La première mise est de 20.",
        "Si le pari est perdant, la bankroll devient 980 et la mise suivante de 2 % devient 19,60. Une autre perte laisse 960,40, et la mise suivante devient 19,21.",
        "La mise se contracte à mesure que la bankroll diminue. Cela ralentit le taux absolu de perte par rapport au maintien d'une mise fixe de 20 unités.",
        "Si la bankroll augmente par la suite, le processus s'inverse et les mises augmentent progressivement."
      ],
      callout: {
        title: "Ajustement automatique",
        body:
          "La mise en pourcentage réduit l'exposition absolue lors des pertes sans exiger du parieur qu'il prenne une nouvelle décision discrétionnaire.",
        tone: "example",
      },
    },
    {
      id: "flat-example",
      heading: "Exemple de mise à plat",
      paragraphs: [
        "Considérons maintenant la même bankroll de 1 000 unités utilisant une mise fixe de 20 unités.",
        "Après une perte, la bankroll est de 980 mais la mise suivante reste de 20. Après deux pertes, la bankroll est de 960 et la troisième mise est toujours de 20.",
        "Le montant fixe rend le suivi simple, mais la mise représente désormais environ 2,08 % de la bankroll réduite au lieu des 2 % initiaux.",
        "Si la bankroll diminue de manière substantielle, une mise fixe doit être réévaluée plutôt que de la laisser devenir un pourcentage de plus en plus important du capital restant."
      ],
    },
    {
      id: "rebalancing",
      heading: "Une approche hybride : rééquilibrage périodique",
      paragraphs: [
        "Certains parieurs utilisent une approche hybride : une mise fixe pendant une période, suivie d'un recalcul occasionnel de la taille de l'unité.",
        "Par exemple, une unité peut être fixée à 1 % de la bankroll au début de chaque mois ou après que la bankroll a changé d'un montant prédéfini.",
        "Cela préserve une grande partie de la simplicité de la mise fixe tout en évitant qu'une unité fixe ne devienne trop grande ou trop petite par rapport à la bankroll.",
        "L'essentiel est que les règles de rééquilibrage soient prédéterminées. Changer constamment la taille de la mise après des gains ou des pertes émotionnels va à l'encontre de l'objectif d'avoir un cadre de gestion des mises."
      ],
    },
    {
      id: "confidence-staking",
      heading: "Les mises doivent-elles changer en fonction de la confiance ?",
      paragraphs: [
        "Certains parieurs font varier la taille de la mise en fonction de l'avantage perçu ou de la confiance. En théorie, une espérance de gain positive plus forte peut justifier une exposition plus importante.",
        "Le problème pratique est l'erreur d'estimation. Si un parieur est trop confiant quant aux sélections ayant le plus grand avantage, une mise variable peut amplifier les erreurs.",
        "Pour cette raison, une mise fixe ou un pourcentage simple est souvent plus facile à auditer et à contrôler. Des mises variables plus avancées ne devraient être envisagées que lorsque les estimations de probabilité sont bien calibrées et que des limites strictes d'exposition maximale sont en place.",
        "Une étiquette telle que « confiance élevée » ne doit jamais être considérée comme une certitude."
      ],
      callout: {
        title: "La confiance peut être mal calibrée.",
        body:
          "Les mises variables amplifient les évaluations de confiance, qu'elles soient correctes ou incorrectes.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "En quoi le critère de Kelly diffère",
      paragraphs: [
        "Le critère de Kelly n'est ni une mise à plat, ni une simple mise à pourcentage fixe. Il calcule une fraction recommandée de la bankroll basée sur l'avantage estimé et les cotes.",
        "En théorie, Kelly adapte la taille de la mise à la force de l'opportunité estimée. En pratique, il est très sensible aux erreurs de probabilité.",
        "Si l'estimation de probabilité est trop optimiste, le Kelly complet peut recommander une mise excessivement importante. C'est pourquoi les approches de Kelly fractionnaire sont souvent utilisées pour réduire la volatilité.",
        "Pour la plupart des utilisateurs, la leçon importante n'est pas qu'une formule est supérieure à une autre. C'est qu'une gestion des mises plus complexe nécessite des estimations de probabilité plus fiables et des contrôles des risques plus rigoureux."
      ],
    },
    {
      id: "psychology",
      heading: "Quelle méthode est la plus facile à suivre émotionnellement ?",
      paragraphs: [
        "La mise à plat peut sembler plus facile car le montant ne change pas après des gains ou des pertes. Cela réduit la tentation d'interpréter les changements de mise comme des réactions émotionnelles.",
        "La mise en pourcentage peut également favoriser la discipline car l'ajustement est automatique et basé sur des règles. Une mise plus petite après des pertes n'est pas une punition ; c'est simplement le résultat d'une bankroll plus petite.",
        "Des problèmes surviennent lorsque les parieurs abandonnent l'une ou l'autre méthode après une série. Augmenter les mises après des pertes pour récupérer de l'argent ou les augmenter après des gains par excès de confiance introduit un risque discrétionnaire.",
        "La meilleure méthode de mise est souvent celle qui peut être suivie de manière cohérente sans encourager de changements impulsifs."
      ],
    },
    {
      id: "matchsignal",
      heading: "Comment la gestion des mises se rapporte à MatchSignal",
      paragraphs: [
        "MatchSignal fournit un contexte analytique incluant les Meilleures Cotes, la Moyenne du Marché, la Probabilité Juste, l'Avantage de Valeur, les Bookmakers Échantillonnés et le Niveau de Risque.",
        "Ces champs ne constituent pas des instructions de mise. Une classification de Risque Faible ou un Avantage de Valeur plus important ne devraient pas entraîner automatiquement une mise plus élevée.",
        "La taille de la mise doit être déterminée par un cadre personnel de gestion de capital qui prend en compte l'abordabilité, l'incertitude, la variance et les limites du jeu responsable.",
        "L'analyse de MatchSignal est informative et ne garantit pas les résultats ni ne recommande une exposition financière spécifique."
      ],
      callout: {
        title: "L'analyse et la détermination de la taille des mises sont des décisions distinctes",
        body:
          "Un signal analytique fort n'élimine pas l'incertitude et ne devrait pas outrepasser les règles conservatrices de gestion de capital.",
        tone: "warning",
      },
    },
    {
      id: "comparison",
      heading: "Mises fixes vs Mise en pourcentage : Comparaison côte à côte",
      paragraphs: [
        "Les deux méthodes peuvent être sensées lorsque les mises sont conservatrices et que les règles sont suivies de manière cohérente. Leurs forces sont différentes."
      ],
      bullets: [
        "Mise fixe : la plus simple à comprendre et à suivre.",
        "Mise fixe : utile pour évaluer la performance d'une stratégie.",
        "Mise fixe : peut devenir trop importante par rapport à la bankroll après une baisse significative.",
        "Mise en pourcentage : réduit automatiquement l'exposition pendant les périodes de baisse.",
        "Mise en pourcentage : génère automatiquement des intérêts composés lors de la croissance de la bankroll.",
        "Mise en pourcentage : produit des tailles de mise variables qui peuvent rendre l'évaluation moins intuitive.",
        "Les deux méthodes : nécessitent des niveaux de mise conservateurs et ne peuvent pas créer d'avantage.",
      ],
    },
    {
      id: "checklist",
      heading: "Une liste de contrôle pratique pour la gestion des mises",
      paragraphs: [
        "Quelle que soit la méthode choisie, la règle de mise doit être suffisamment simple pour être suivie aussi bien en période de gain que de perte."
      ],
      bullets: [
        "Séparez votre capital de pari de l'argent destiné aux besoins essentiels.",
        "Choisissez une mise fixe ou en pourcentage avant de commencer à parier.",
        "Maintenez la mise à un niveau conservateur par rapport à la bankroll.",
        "N'augmentez pas les mises pour récupérer des pertes.",
        "Vérifiez si une mise fixe est devenue trop importante après une baisse.",
        "Si vous utilisez la mise en pourcentage, calculez-la systématiquement à partir de la bankroll actuelle.",
        "Évitez les changements discrétionnaires fréquents basés sur des résultats récents.",
        "Suivez précisément les mises et les variations de votre capital.",
        "Abordez les stratégies de mise variable avancées avec prudence lorsque les estimations de probabilité sont incertaines.",
        "Arrêtez ou réduisez vos paris si la pression financière ou émotionnelle augmente.",
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
    "Les mises fixes et les mises en pourcentage sont des méthodes de gestion des risques, et non des garanties de profit. Toute stratégie de pari peut entraîner des pertes financières. Maintenez vos mises dans des limites que vous pouvez vous permettre de perdre, séparez vos fonds de paris de votre argent essentiel, évitez d'augmenter vos mises pour compenser vos pertes, et arrêtez si les paris causent un préjudice financier ou émotionnel.",
};

export default guide;
