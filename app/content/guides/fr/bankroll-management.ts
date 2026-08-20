import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bankroll-management",
  locale: "fr",
  title: "Explication de la gestion de bankroll",
  category: "bankroll-risk",
  status: "published",
  description:
    "Apprenez comment fonctionne la gestion de bankroll dans les paris sportifs, pourquoi la taille des mises et les limites de risque sont importantes, comment les baisses (drawdowns) et la variance affectent une bankroll, et comment une mise disciplinée peut réduire le risque de ruine.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "La gestion de bankroll est le processus consistant à décider quelle somme d'argent est mise de côté pour les paris et quelle part de cette bankroll est risquée sur chaque pari. Elle n'améliore pas la probabilité de gain d'une sélection, mais elle peut réduire les dommages causés par les séries de pertes, la variance et les estimations incorrectes. Une bonne gestion de bankroll concerne principalement la survie, la cohérence et la limitation des préjudices financiers. Elle aide à éviter qu'une mauvaise séquence ne fasse disparaître l'intégralité de la bankroll et réduit la tentation de prendre des décisions impulsives après des gains ou des pertes.",
  keyTakeaways: [
    "Une bankroll de paris doit être séparée de l'argent nécessaire aux dépenses courantes, aux factures, à l'épargne ou aux urgences.",
    "La taille de la mise contrôle l'impact de chaque résultat sur la bankroll.",
    "Des mises en pourcentage plus faibles réduisent généralement la volatilité et le risque de ruine.",
    "Aucun système de mise ne peut transformer une stratégie à espérance négative en une stratégie positive.",
    "Les règles de bankroll doivent être décidées avant que la pression émotionnelle liée aux gains ou aux pertes n'apparaisse.",
    "Les baisses (drawdowns) sont normales dans les processus incertains et doivent être anticipées.",
    "Tenter de se refaire en augmentant les mises peut rapidement accroître le risque financier.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Qu'est-ce qu'une bankroll de paris",
      paragraphs: [
        "Une bankroll de paris est une somme d'argent dédiée, mise de côté spécifiquement pour l'activité de pari. Elle doit être financièrement séparée du loyer, des paiements de prêt immobilier, de la nourriture, du remboursement de dettes, de l'épargne d'urgence et d'autres fonds essentiels.",
        "Cette séparation crée une limite claire. Si la bankroll diminue, la perte reste dans les limites d'un montant déjà désigné comme étant acceptable à perdre.",
        "Une bankroll doit donc être considérée comme un capital à risque plutôt que comme un revenu. Les rendements des paris sont incertains, et même un processus avec une espérance de gain positive peut connaître de longues périodes de pertes."
      ],
      callout: {
        title: "La bankroll est une limite, pas un objectif",
        body:
          "Une bankroll dédiée aide à définir quel niveau de risque financier est acceptable. Elle ne doit jamais être alimentée avec de l'argent nécessaire aux dépenses essentielles.",
        tone: "warning",
      },
    },
    {
      id: "why-management-matters",
      heading: "Pourquoi la gestion de bankroll est importante",
      paragraphs: [
        "Les résultats des paris sportifs sont incertains. Même de bonnes estimations de probabilité peuvent être erronées sur des événements individuels, et la variance ordinaire peut entraîner des séries de pertes.",
        "Sans une approche structurée de la mise, un parieur peut risquer trop sur une seule sélection, augmenter ses mises après des pertes, ou laisser une courte série de gains créer un excès de confiance.",
        "La gestion de bankroll réduit ces risques comportementaux et mathématiques en définissant la taille des mises et les limites de perte avant que le résultat ne soit connu.",
        "Elle ne peut pas éliminer la possibilité de perte, mais elle peut rendre l'impact financier de la variance normale plus gérable."
      ],
    },
    {
      id: "unit-size",
      heading: "Qu'est-ce qu'une unité de pari ?",
      paragraphs: [
        "Une unité est un moyen standardisé d'exprimer la taille d'une mise. Au lieu de discuter de chaque pari en termes monétaires, un parieur peut définir une unité comme un pourcentage fixe ou un montant fixe de la bankroll.",
        "Par exemple, si une bankroll est de 1 000 unités monétaires et qu'une unité de pari est définie comme 1 % de la bankroll, une unité équivaut à 10 unités monétaires.",
        "L'utilisation d'unités facilite la comparaison des performances dans le temps, car elle dissocie l'analyse de la taille de la bankroll personnelle du parieur."
      ],
      bullets: [
        "Bankroll : 1 000.",
        "Unité de 1 % : 10.",
        "Unité de 0,5 % : 5.",
        "Unité de 2 % : 20.",
      ],
      callout: {
        title: "Les unités standardisent le risque",
        body:
          "Une unité n'est pas une mise recommandée en soi. Il s'agit simplement d'une mesure cohérente de l'exposition.",
        tone: "info",
      },
    },
    {
      id: "fixed-vs-percentage",
      heading: "Mises fixes vs Mises en pourcentage",
      paragraphs: [
        "Une approche par mise fixe risque le même montant monétaire sur chaque pari. Une approche par mise en pourcentage risque un pourcentage fixe de la bankroll actuelle.",
        "Avec des mises fixes uniformes, un pari de 10 unités reste de 10 unités même si la bankroll augmente ou diminue. Avec une mise en pourcentage, la mise devient automatiquement plus petite après des pertes et plus grande après des gains.",
        "La mise en pourcentage peut donc réduire le risque pendant les périodes de baisse, car l'exposition diminue avec la bankroll. La mise fixe est plus simple et peut faciliter le suivi des performances.",
        "Aucune de ces méthodes ne crée d'avantage. La probabilité sous-jacente et la cote déterminent toujours si la décision de pari a une espérance de gain positive ou négative."
      ],
      bullets: [
        "Mise fixe : même montant monétaire à chaque fois.",
        "Mise en pourcentage : même pourcentage de la bankroll actuelle.",
        "La mise fixe est simple et stable.",
        "La mise en pourcentage ajuste automatiquement l'exposition à mesure que la bankroll évolue.",
      ],
    },
    {
      id: "stake-size",
      heading: "Pourquoi la taille de la mise est la décision de risque fondamentale",
      paragraphs: [
        "La taille de la mise détermine l'ampleur des dégâts d'une perte et la rapidité avec laquelle une série de pertes peut se cumuler.",
        "Si un parieur risque 1 % de sa bankroll sur chaque pari, dix pertes totales consécutives ne réduisent pas la bankroll de 100 %. Si ce même parieur risque 10 % par pari, une série de pertes normale peut entraîner un drawdown sévère.",
        "Des mises importantes augmentent à la fois le potentiel de gain et de perte. Elles n'augmentent pas la probabilité d'avoir raison.",
        "Comme les estimations de probabilité sont incertaines, des tailles de mise conservatrices peuvent offrir une marge de sécurité contre la variance et les erreurs de modèle."
      ],
      callout: {
        title: "La confiance n'est pas une certitude",
        body:
          "Une estimation à haute confiance peut tout de même être erronée. La gestion de la taille des mises doit refléter l'incertitude plutôt que de supposer qu'un pari est sûr.",
        tone: "warning",
      },
    },
    {
      id: "risk-of-ruin",
      heading: "Qu'est-ce que le risque de ruine ?",
      paragraphs: [
        "Le risque de ruine est la possibilité qu'une bankroll diminue au point qu'il ne soit plus possible de continuer à parier selon la stratégie prévue.",
        "Le risque augmente lorsque les mises sont importantes par rapport à la bankroll, lorsque la stratégie sous-jacente présente peu ou pas d'avantage, lorsque les résultats sont très volatils, ou lorsque plusieurs paris sont fortement corrélés.",
        "Même une stratégie à espérance positive peut présenter un risque de ruine significatif si la taille des mises est trop agressive. C'est l'une des raisons pour lesquelles la gestion de bankroll ne peut être dissociée de l'espérance de gain et de la variance.",
        "Réduire la taille des mises diminue généralement le risque de ruine, bien que cela réduise également la vitesse à laquelle les gains s'accumulent durant les périodes favorables."
      ],
    },
    {
      id: "drawdowns",
      heading: "Planifier les drawdowns",
      paragraphs: [
        "Un drawdown est le déclin entre un sommet précédent de la bankroll et un point bas ultérieur. Les drawdowns sont inévitables dans les processus incertains.",
        "Supposons qu'une bankroll passe de 100 unités à 130 unités, puis chute à 110. Le drawdown depuis le sommet est de 20 unités, soit environ 15,4 % du sommet de 130 unités.",
        "Planifier les drawdowns signifie accepter à l'avance que des périodes de pertes surviendront et s'assurer que la méthode de mise peut y survivre sans forcer des décisions émotionnelles ou financières.",
        "Un parieur qui suppose que sa bankroll doit croître de manière linéaire est plus susceptible de paniquer, d'augmenter le risque ou d'abandonner ses règles lorsque la variance normale se manifeste."
      ],
      callout: {
        title: "Planifier avant la baisse",
        body:
          "Les règles de risque sont plus utiles lorsqu'elles sont créées avant que les pertes ne génèrent une pression émotionnelle.",
        tone: "info",
      },
    },
    {
      id: "chasing",
      heading: "Pourquoi vouloir se refaire après des pertes est dangereux",
      paragraphs: [
        "Tenter de se refaire signifie augmenter ses mises principalement pour récupérer l'argent perdu lors de paris précédents. Cela détourne l'objectif de la décision suivante, qui passe de l'évaluation de son propre prix et de sa probabilité à la réparation d'un résultat antérieur.",
        "Cette approche est dangereuse car les pertes peuvent se poursuivre. Si les mises augmentent après chaque perte, l'exposition peut grimper rapidement alors que la probabilité sous-jacente du pari suivant reste inchangée.",
        "Les systèmes de type Martingale illustrent ce problème. Doubler la mise après des pertes peut sembler garantir une récupération si une victoire finit par survenir, mais les bankrolls réelles, les limites des bookmakers, les séries de pertes et le capital fini rendent le système vulnérable à une perte catastrophique.",
        "Un processus de gestion de bankroll discipliné maintient la mise suivante basée sur des règles prédéfinies plutôt que sur le montant perdu précédemment."
      ],
      callout: {
        title: "Le pari suivant ne vous doit pas la perte précédente.",
        body:
          "Les résultats passés ne rendent pas le prochain pari plus susceptible de gagner. Augmenter les mises pour récupérer des pertes accroît l'exposition, pas la probabilité.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "Qu'en est-il du critère de Kelly ?",
      paragraphs: [
        "Le critère de Kelly est un cadre mathématique permettant de dimensionner les paris en fonction de l'avantage estimé et des cotes. En théorie, il vise à maximiser la croissance logarithmique de la bankroll à long terme lorsque les probabilités sont connues avec précision.",
        "Le problème pratique est que les probabilités de pari ne sont pas connues avec certitude. Une petite erreur dans l'avantage estimé peut conduire à une mise trop importante.",
        "Pour cette raison, certains parieurs utilisent le Kelly fractionnaire, comme le demi-Kelly ou le quart-Kelly, afin de réduire la volatilité et les conséquences d'une erreur d'estimation.",
        "Kelly n'est pas une garantie et ne doit pas être considéré comme une raison pour effectuer de gros paris. Son résultat n'est fiable qu'autant que l'estimation de probabilité utilisée."
      ],
      bullets: [
        "Le Kelly complet peut être très volatil.",
        "Le critère de Kelly fractionnaire réduit l'exposition.",
        "Des estimations de probabilité incorrectes peuvent mener à des mises Kelly excessives.",
        "Kelly ne peut pas créer une espérance de gain positive là où elle n'existe pas.",
      ],
    },
    {
      id: "flat-staking",
      heading: "Pourquoi la mise fixe est souvent utile pour l'évaluation",
      paragraphs: [
        "La mise fixe consiste à utiliser la même taille d'unité pour tous les paris. C'est simple et cela facilite l'évaluation de la performance des sélections elles-mêmes.",
        "Si la taille de la mise change radicalement d'un pari à l'autre, quelques mises importantes peuvent dominer le bilan des profits et pertes et masquer la qualité du processus de sélection sous-jacent.",
        "La mise fixe n'optimise pas la croissance théorique de la bankroll, mais sa simplicité peut améliorer la discipline et rendre l'évaluation du modèle plus transparente.",
        "Pour les utilisateurs qui apprennent comment une stratégie se comporte, la cohérence peut être plus précieuse qu'une optimisation complexe des mises."
      ],
    },
    {
      id: "percentage-staking",
      heading: "Comment la mise en pourcentage réagit aux changements de la bankroll",
      paragraphs: [
        "La mise en pourcentage utilise une fraction fixe de la bankroll actuelle. Si la bankroll diminue, la mise diminue automatiquement. Si la bankroll augmente, la mise augmente progressivement.",
        "Par exemple, avec un taux de mise de 1 %, une bankroll de 1 000 unités produit une mise de 10 unités. Si la bankroll tombe à 800, la mise suivante de 1 % devient 8 unités.",
        "Cela crée un mécanisme défensif naturel pendant les périodes de pertes. Cependant, cela signifie également que la taille des mises change continuellement, ce qui peut rendre l'analyse des performances moins intuitive.",
        "Le choix entre une mise fixe et une mise en pourcentage dépend de l'objectif du système de gestion de capital, mais les deux nécessitent des hypothèses prudentes et des limites disciplinées."
      ],
    },
    {
      id: "correlation",
      heading: "Les paris corrélés peuvent augmenter le risque lié au capital",
      paragraphs: [
        "Un capital peut être exposé à un risque plus élevé que ce que suggèrent les montants des mises individuelles si plusieurs paris dépendent du même événement sous-jacent.",
        "Par exemple, parier sur la victoire d'une équipe de football, sur le fait que son attaquant marque et sur un match avec plus de 2,5 buts peut créer une exposition cumulée au même scénario de match.",
        "Si les trois paris sont traités comme des positions indépendantes de 1 %, la concentration réelle du risque peut être bien supérieure à 1 %.",
        "La gestion du capital doit donc prendre en compte l'exposition totale aux résultats liés, et non seulement la mise indiquée sur chaque ticket individuel."
      ],
      callout: {
        title: "Comptez l'exposition, pas seulement les tickets",
        body:
          "Plusieurs paris corrélés peuvent se comporter comme une seule position beaucoup plus importante.",
        tone: "warning",
      },
    },
    {
      id: "limits",
      heading: "Fixez des limites de dépenses, de pertes et de temps",
      paragraphs: [
        "La gestion du capital n'est pas seulement un exercice mathématique. Les paris responsables nécessitent également des limites sur les dépenses, les pertes et le temps.",
        "Une limite de perte définit quelle part du capital peut être perdue sur une période donnée avant l'arrêt des paris. Une limite de dépôt ou de dépenses restreint le montant d'argent pouvant être versé sur le compte de paris. Une limite de temps empêche les paris de devenir une activité incontrôlée.",
        "Ces limites sont plus efficaces lorsqu'elles sont fixées avant le début des paris et lorsqu'il est difficile de les modifier de manière impulsive pendant une série de pertes ou de gains.",
        "Si les paris provoquent un stress financier, la dissimulation de pertes, des emprunts d'argent ou interfèrent avec la vie quotidienne, la réponse appropriée est d'arrêter plutôt que d'optimiser la formule de mise."
      ],
      callout: {
        title: "La gestion des risques inclut de savoir quand ne pas parier.",
        body:
          "Aucune stratégie de gestion de capital ne remplace l'arrêt des paris lorsque ceux-ci causent un préjudice financier ou émotionnel.",
        tone: "warning",
      },
    },
    {
      id: "records",
      heading: "Pourquoi la tenue de registres est importante",
      paragraphs: [
        "Un processus de gestion de capital est difficile à évaluer sans registres. Les registres utiles incluent la date, le sport, le marché, la sélection, la cote, la mise, le résultat, le profit ou la perte, et le capital après règlement.",
        "Enregistrer l'estimation de probabilité et le prix du marché peut également aider à évaluer si l'analyse était bien calibrée et si le parieur a systématiquement obtenu des cotes compétitives.",
        "Les registres réduisent la dépendance à la mémoire, qui est souvent biaisée par les gros gains, les pertes douloureuses et les événements récents.",
        "Un registre clair permet de distinguer plus facilement un problème réel dans la stratégie de la variance ordinaire."
      ],
      bullets: [
        "Date et événement.",
        "Marché et sélection.",
        "Cote obtenue.",
        "Montant de la mise.",
        "Résultat et profit/perte.",
        "Bankroll après règlement.",
        "Estimation de probabilité optionnelle et référence du marché.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Comment la gestion de bankroll se rapporte à MatchSignal",
      paragraphs: [
        "MatchSignal fournit un contexte analytique tel que les Meilleures Cotes, la Moyenne du Marché, la Probabilité Juste, l'Avantage de Valeur, les Bookmakers Échantillonnés et le Niveau de Risque. Ces champs sont conçus pour aider les utilisateurs à comprendre la relation entre les prix du marché et l'analyse basée sur les probabilités.",
        "Ils ne déterminent pas le montant qu'un utilisateur doit miser. Un signal de Risque Faible n'est pas une garantie de succès, et un Avantage de Valeur plus important ne doit pas être automatiquement interprété comme une autorisation d'augmenter les mises de manière agressive.",
        "La taille de la mise doit rester partie intégrante d'un cadre de risque personnel distinct basé sur l'abordabilité, l'incertitude, la taille de la bankroll et les limites de jeu responsable.",
        "L'analyse de MatchSignal est informative et ne doit pas remplacer le jugement financier personnel ou les contrôles disciplinés de la bankroll."
      ],
      callout: {
        title: "La force du signal n'est pas un conseil de mise",
        body:
          "MatchSignal ne garantit pas les résultats, et ses champs analytiques ne doivent pas être utilisés comme des instructions automatiques pour le dimensionnement des mises.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Une liste de contrôle pratique pour la gestion de bankroll",
      paragraphs: [
        "Un cadre de bankroll simple peut être plus efficace qu'un système compliqué difficile à suivre de manière cohérente."
      ],
      bullets: [
        "Séparez votre capital de pari de l'argent destiné aux besoins essentiels.",
        "Choisissez une mise de base conservatrice avant de commencer à parier.",
        "Utilisez systématiquement des mises fixes ou en pourcentage.",
        "Évitez d'augmenter vos mises en raison de pertes récentes.",
        "Prenez en compte l'exposition corrélée sur plusieurs paris.",
        "Prévoyez les baisses de capital normales et les séries de pertes.",
        "Suivez chaque pari et mettez à jour votre capital avec précision.",
        "Fixez des limites de dépenses, de pertes et de temps.",
        "Réduisez ou arrêtez de parier si la pression financière ou émotionnelle augmente.",
        "Ne supposez jamais qu'un système de mise puisse garantir un profit.",
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
    "La gestion du capital peut réduire l'exposition financière, mais elle ne peut pas rendre les paris sûrs ni garantir un profit. Gardez l'argent destiné aux paris séparé des fonds essentiels, fixez des limites strictes de dépenses et de pertes, évitez d'emprunter ou de chercher à récupérer vos pertes, et arrêtez si les paris causent un préjudice financier ou émotionnel.",
};

export default guide;
