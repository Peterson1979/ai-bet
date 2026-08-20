import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "how-betting-odds-work",
  locale: "fr",
  title: "Comment fonctionnent réellement les cotes de paris",
  category: "odds-probability",
  status: "published",
  description:
    "Apprenez ce que représentent les cotes de paris, leur lien avec la probabilité, pourquoi les prix des bookmakers incluent une marge, et comment comparer les cotes sans confondre prix et prédiction.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Les cotes de paris sont des prix. Elles vous indiquent combien un pari gagnant peut rapporter, mais elles encodent également la vision du marché sur la probabilité d'un résultat. Comprendre les deux facettes de cette relation est essentiel : les cotes ne sont pas une garantie, et le prix le plus bas n'est pas automatiquement le meilleur pari. Ce guide explique les cotes décimales, la probabilité implicite, la marge du bookmaker, le mouvement du marché et pourquoi la comparaison des prix est importante.",
  keyTakeaways: [
    "Les cotes décimales indiquent le rendement total par unité misée, incluant la mise initiale.",
    "La probabilité implicite est calculée à partir des cotes décimales en divisant 1 par la cote.",
    "Les prix des bookmakers incluent généralement une marge, de sorte que les probabilités implicites de tous les résultats peuvent totaliser plus de 100 %.",
    "Un prix plus bas signifie une probabilité implicite plus élevée, et non un résultat certain.",
    "La même sélection peut avoir des cotes différentes selon les bookmakers, donc la comparaison des prix affecte directement le rendement potentiel.",
    "Les cotes peuvent évoluer à mesure que de nouvelles informations, l'activité du marché et la gestion des risques du bookmaker modifient le prix.",
  ],
  sections: [
    {
      id: "odds-are-prices",
      heading: "Les cotes de paris sont des prix, pas des prédictions",
      paragraphs: [
        "La manière la plus simple de comprendre les cotes de paris est de les traiter comme le prix d'un résultat possible. Dans un match de football, un bookmaker peut proposer un prix pour l'équipe à domicile, un autre pour le match nul, et un autre pour l'équipe à l'extérieur. Ces prix déterminent le rendement si le résultat sélectionné est gagnant.",
        "Les cotes contiennent également des informations sur la probabilité. Un prix décimal plus bas correspond à une probabilité implicite plus élevée, tandis qu'un prix plus élevé correspond à une probabilité implicite plus faible. Cela ne signifie pas que le bookmaker sait ce qui va se passer. Cela signifie que le marché attribue des prix différents à des résultats incertains.",
        "Cette distinction est importante car une prédiction et une cote répondent à des questions différentes. Une prédiction demande quel résultat est le plus probable. Une cote demande quel rendement est offert pour prendre ce risque. Une équipe peut être le vainqueur le plus probable et rester peu attrayante à une cote suffisamment basse."
      ],
      callout: {
        title: "Idée centrale",
        body:
          "Un grand favori peut toujours perdre. Les cotes expriment un prix de marché pour l'incertitude ; elles ne suppriment pas l'incertitude.",
        tone: "info",
      },
    },
    {
      id: "decimal-odds",
      heading: "Comment fonctionnent les cotes décimales",
      paragraphs: [
        "MatchSignal utilise des cotes décimales car elles rendent les rendements et la conversion en probabilités simples. Les cotes décimales indiquent le montant total retourné pour chaque unité misée lorsque le pari est gagnant. Le rendement total inclut la mise initiale.",
        "Par exemple, avec une cote décimale de 2,00, une mise de 10 unités rapporte 20 unités en cas de succès : 10 unités de profit plus la mise initiale de 10 unités. Avec une cote de 1,50, la même mise de 10 unités rapporte 15 unités au total. Avec une cote de 3,00, elle rapporte 30 unités.",
        "La relation de base est simple : le rendement total est égal à la mise multipliée par la cote décimale. Le profit est égal au rendement total moins la mise initiale."
      ],
      bullets: [
        "10 unités à 1,50 → 15 unités de rendement total, 5 unités de profit.",
        "10 unités à 2,00 → 20 unités de rendement total, 10 unités de profit.",
        "10 unités à 3,00 → 30 unités de rendement total, 20 unités de profit.",
      ],
      callout: {
        title: "Exemple",
        body:
          "Des cotes plus élevées augmentent le rendement potentiel, mais elles correspondent normalement à des résultats que le marché considère comme moins probables.",
        tone: "example",
      },
    },
    {
      id: "implied-probability",
      heading: "Convertir les cotes en probabilité implicite",
      paragraphs: [
        "Les cotes décimales peuvent être converties en probabilité implicite grâce à une formule simple : probabilité implicite = 1 ÷ cote décimale. Multipliez le résultat par 100 pour l'exprimer en pourcentage.",
        "Une cote de 2,00 implique 50 %. Une cote de 1,50 implique environ 66,7 %. Une cote de 4,00 implique 25 %. Cela vous donne une échelle de probabilité commune pour comparer des prix qui peuvent sembler très différents au premier abord.",
        "Cependant, la probabilité implicite du bookmaker n'est pas la même chose qu'une probabilité objective précise. Le prix peut inclure une marge du bookmaker, réagir à la demande du marché ou changer à mesure que de nouvelles informations deviennent disponibles. Il est préférable de la comprendre comme la probabilité intégrée dans le prix proposé."
      ],
      bullets: [
        "1,50 → 1 ÷ 1,50 = 66,7 %",
        "2,00 → 1 ÷ 2,00 = 50,0 %",
        "2,50 → 1 ÷ 2,50 = 40,0 %",
        "4,00 → 1 ÷ 4,00 = 25,0 %",
      ],
      callout: {
        title: "Ne lisez pas 66,7 % comme une certitude",
        body:
          "Une probabilité implicite est une traduction d'un prix. Les résultats sportifs réels restent incertains, même lorsque le marché leur attribue une probabilité élevée.",
        tone: "warning",
      },
    },
    {
      id: "bookmaker-margin",
      heading: "Pourquoi les probabilités peuvent totaliser plus de 100 %",
      paragraphs: [
        "Si vous convertissez chaque résultat d'un marché de bookmaker en probabilité implicite et que vous les additionnez, le total dépassera souvent 100 %. Le montant au-dessus de 100 % est communément appelé la marge du bookmaker ou overround.",
        "Considérons un marché simplifié à deux issues où les deux côtés sont cotés à 1,91. Chaque cote implique environ 52,36 %. Additionné, le marché totalise environ 104,72 %. La différence entre 104,72 % et 100 % représente la marge (overround) sur ce marché simplifié.",
        "La marge signifie que les probabilités implicites brutes ne sont pas automatiquement des probabilités équitables. Les analystes peuvent estimer une probabilité sans marge en normalisant les probabilités sur l'ensemble du marché, mais cela reste une estimation basée sur les prix disponibles plutôt qu'une garantie de la probabilité réelle de chaque issue."
      ],
      callout: {
        title: "Pourquoi cela est important",
        body:
          "Deux marchés peuvent exprimer des attentes similaires tout en offrant des marges différentes. Un marché à marge plus faible offre généralement aux parieurs des prix plus compétitifs, toutes choses égales par ailleurs.",
        tone: "info",
      },
    },
    {
      id: "favorite-underdog",
      heading: "Favoris, outsiders et ce que le prix indique réellement",
      paragraphs: [
        "Un favori est simplement l'issue avec la cote la plus basse sur le marché concerné. Un outsider a une cote plus élevée. Ces étiquettes décrivent les attentes relatives du marché, et non une qualité garantie ou des résultats définitifs.",
        "Supposons que l'Équipe A soit proposée à 1,40 et l'Équipe B à 7,00 sur un marché qui inclut également un match nul. L'Équipe A est le favori car sa cote implique une probabilité beaucoup plus élevée que celle de l'Équipe B. Mais le fait que l'une ou l'autre cote soit intéressante dépend de la comparaison entre les cotes proposées et une estimation de probabilité raisonnable.",
        "C'est là que l'analyse de la valeur diffère de la sélection du vainqueur. Choisir l'équipe la plus susceptible de gagner n'est pas nécessairement la même chose que trouver le prix le plus favorable. Une probabilité de 75 % offerte à une cote qui nécessite un taux de rentabilité de 80 % ne représenterait pas une valeur attendue positive selon cette estimation de probabilité."
      ],
    },
    {
      id: "compare-odds",
      heading: "Pourquoi comparer les cotes est important",
      paragraphs: [
        "Les opérateurs de paris sportifs ne proposent pas toujours des prix identiques. Un opérateur peut proposer 1,85 tandis qu'un autre propose 1,95 pour la même sélection et le même marché. L'événement sous-jacent n'a pas changé, mais votre rendement potentiel, oui.",
        "Pour une mise de 100 unités, 1,85 rapporte 185 unités en cas de succès, tandis que 1,95 en rapporte 195. Sur un grand nombre de paris, accepter systématiquement de moins bonnes cotes peut réduire considérablement les rendements, même lorsque les sélections elles-mêmes sont identiques.",
        "La comparaison des prix est donc l'un des rares aspects des paris qui ne nécessite pas de prédire le match avec plus de précision. Si le marché, la sélection, les règles de règlement et le timing sont réellement comparables, le prix disponible le plus élevé offre un meilleur rendement potentiel pour la même mise."
      ],
      callout: {
        title: "Comparez ce qui est comparable",
        body:
          "Vérifiez que la définition du marché, la ligne, les règles de règlement et l'événement sont identiques avant de considérer deux cotes proposées comme directement comparables.",
        tone: "warning",
      },
    },
    {
      id: "why-odds-move",
      heading: "Pourquoi les cotes évoluent avant un match",
      paragraphs: [
        "Les cotes ne sont pas des évaluations fixes. Elles peuvent changer depuis l'ouverture d'un marché jusqu'à la clôture des paris. De nouvelles informations sur les équipes, les blessures, les compositions confirmées, la météo, les changements de calendrier, l'activité du marché et la découverte globale des prix peuvent toutes contribuer à ces mouvements.",
        "Les bookmakers peuvent également ajuster les prix dans le cadre de leur gestion des risques ou en réponse à des mouvements ailleurs sur le marché. Par conséquent, une évolution de cote ne révèle pas toujours une cause unique et simple. Une baisse de cote peut refléter de nouvelles informations significatives, une pression du marché ou une combinaison de facteurs.",
        "C'est pourquoi les captures d'écran historiques d'un prix ne doivent pas être confondues avec la disponibilité actuelle. Une analyse utile doit identifier le prix réel évalué et, si possible, le comparer avec les alternatives actuelles du marché."
      ],
    },
    {
      id: "value-and-break-even",
      heading: "Cotes, probabilité de seuil de rentabilité et valeur",
      paragraphs: [
        "Chaque prix implique une probabilité de seuil de rentabilité avant de prendre en compte les détails de la transaction ou l'incertitude du modèle. À une cote décimale de 2,00, le taux de seuil de rentabilité implicite est de 50 %. À 1,80, il est d'environ 55,6 %. À 2,50, il est de 40 %.",
        "Si votre estimation de probabilité est significativement plus élevée que la probabilité impliquée par le prix proposé, le pari peut avoir une espérance de gain positive selon cette estimation. Si votre estimation est plus basse, le prix peut être défavorable. La qualité de la conclusion dépend entièrement de la qualité et de la calibration de l'estimation de probabilité.",
        "Par exemple, si une cote de 2,20 implique environ 45,5 % et qu'une analyse estime l'issue à 50 %, il existe une différence théorique positive entre la probabilité estimée et la probabilité impliquée par le marché. Cette différence n'est pas une promesse de profit. Même une opportunité à espérance positive correctement identifiée peut être perdante, et les estimations des modèles peuvent être erronées."
      ],
      callout: {
        title: "La valeur est probabiliste",
        body:
          "Une espérance de gain positive décrit une relation estimée à long terme entre la probabilité et le prix. Cela ne signifie pas qu'un pari individuel est censé gagner avec certitude.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal-context",
      heading: "Comment MatchSignal utilise les cotes",
      paragraphs: [
        "MatchSignal compare les prix disponibles chez les bookmakers et les données de marché, puis combine ces informations avec un contexte de match généré par IA. Sur une fiche MatchSignal, Meilleure Cote fait référence au prix partenaire le plus avantageux identifié pour la sélection affichée, tandis que Moyenne du Marché résume les prix du marché échantillonnés utilisés dans la comparaison.",
        "La Probabilité Équitable est une estimation analytique plutôt qu'une cote de bookmaker. L'Avantage de Valeur est utilisé pour décrire la différence entre le prix du marché proposé et l'évaluation basée sur la probabilité de MatchSignal. Bookmakers Échantillonnés indique combien de sources de bookmakers ont contribué à l'échantillon de marché pertinent.",
        "Ces champs sont conçus pour faciliter l'examen du contexte de tarification. Ils ne doivent pas être considérés comme des garanties, des conseils financiers ou une certitude concernant un résultat sportif. Les hypothèses du modèle, les changements du marché, la qualité des données et la variance sportive ordinaire peuvent tous affecter le résultat."
      ],
    },
    {
      id: "practical-checklist",
      heading: "Une liste de contrôle pratique pour lire tout marché de paris",
      paragraphs: [
        "Lorsque vous ouvrez un marché de paris, séparez l'analyse en prix, probabilité et incertitude. Cela permet d'éviter plusieurs erreurs courantes, telles que supposer que le favori doit gagner ou traiter un gain potentiel élevé comme la preuve qu'un pari est attractif."
      ],
      bullets: [
        "Identifiez le marché et la sélection exacts.",
        "Lisez les cotes décimales comme un prix et calculez la probabilité implicite.",
        "Vérifiez si le marché contient une marge de bookmaker.",
        "Comparez la même sélection sur plusieurs sites de paris sportifs lorsque cela est possible.",
        "Séparez votre estimation de probabilité de la probabilité indiquée par le bookmaker.",
        "Ne traitez pas un mouvement de cote comme la preuve qu'un camp va gagner.",
        "Prenez en compte l'incertitude, la variance et la taille de la mise avant de prendre toute décision."
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
    "Les paris impliquent un risque financier et les résultats sont incertains. Les cotes et les estimations de probabilité ne peuvent garantir un résultat. Utilisez des mises que vous pouvez vous permettre de perdre, évitez de chercher à récupérer vos pertes et considérez l'analyse des paris comme une information plutôt que comme une promesse de profit.",
};

export default guide;
