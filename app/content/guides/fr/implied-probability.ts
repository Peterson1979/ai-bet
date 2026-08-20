import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "implied-probability",
  locale: "fr",
  title: "Qu'est-ce que la probabilité implicite ?",
  category: "odds-probability",
  status: "published",
  description:
    "Apprenez à convertir les cotes de paris en probabilité implicite, pourquoi les marges des bookmakers font dépasser 100 % aux probabilités brutes du marché, et comment interpréter la probabilité implicite sans confondre le prix avec la certitude.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "La probabilité implicite est la probabilité encodée par un prix de pari. Elle traduit les cotes en pourcentage, facilitant la comparaison entre différents prix et vous aidant à identifier le taux de rentabilité associé à un pari. Le calcul est simple, mais son interprétation correcte exige de la prudence : les prix des bookmakers peuvent inclure une marge, des mouvements de marché et une gestion des risques ; la probabilité implicite ne doit donc pas être traitée comme une prévision objective ou une garantie.",
  keyTakeaways: [
    "Pour les cotes décimales, la probabilité implicite est égale à 1 divisé par la cote, multiplié par 100.",
    "Une cote décimale de 2,00 implique 50 % ; 1,50 implique environ 66,7 % ; 4,00 implique 25 %.",
    "Les probabilités implicites brutes sur l'ensemble d'un marché de bookmaker totalisent souvent plus de 100 % car les prix peuvent inclure la marge du bookmaker.",
    "La probabilité implicite est une propriété du prix affiché, et non une preuve de la probabilité réelle d'un résultat.",
    "Une estimation de probabilité ne devient utile pour l'analyse de valeur que lorsqu'elle est comparée à la probabilité de rentabilité implicite des cotes disponibles.",
    "De faibles différences dans les cotes peuvent modifier sensiblement la probabilité de rentabilité et l'économie à long terme de paris répétés.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Ce que signifie la probabilité implicite",
      paragraphs: [
        "Les cotes de paris et la probabilité sont deux manières d'exprimer la même relation de prix. Les cotes indiquent le rendement potentiel associé à un résultat. La probabilité implicite convertit ce prix en un taux de réussite en pourcentage qui correspondrait aux cotes affichées avant de prendre en compte la marge du bookmaker, l'incertitude du modèle ou d'autres effets de marché.",
        "Par exemple, une cote décimale de 2,00 implique une probabilité de 50 %. Cela ne signifie pas que le résultat se produira la moitié du temps sur un petit échantillon, et cela ne signifie pas que le bookmaker a découvert la probabilité réelle. Cela signifie qu'un prix de 2,00 correspond mathématiquement à un taux de rentabilité de 50 % : en faisant abstraction d'autres facteurs pratiques, un parieur qui gagnerait exactement la moitié de paris identiques à 2,00 récupérerait sa mise sur le long terme.",
        "Cette conversion en pourcentage est utile car il est souvent plus facile de raisonner en termes de probabilités qu'en cotes brutes. Comparer 1,62 et 1,75 peut sembler abstrait. Les convertir en environ 61,7 % et 57,1 % montre immédiatement que ces deux prix exigent des taux de réussite sensiblement différents."
      ],
      callout: {
        title: "Prix, et non certitude",
        body:
          "Une probabilité implicite décrit ce qu'un prix proposé signifie mathématiquement. Ce n'est pas une promesse que l'événement se produira à cette fréquence.",
        tone: "warning",
      },
    },
    {
      id: "formula",
      heading: "Comment calculer la probabilité implicite à partir de cotes décimales",
      paragraphs: [
        "Pour les cotes décimales, la formule de conversion est : probabilité implicite = 1 ÷ cote décimale. Multipliez le résultat par 100 pour l'exprimer en pourcentage.",
        "À une cote de 2,00, le calcul est 1 ÷ 2,00 = 0,50, soit 50 %. À 1,50, il est de 1 ÷ 1,50 = 0,6667, soit environ 66,7 %. À 2,50, il est de 40 %. À 5,00, il est de 20 %.",
        "La relation est inverse. Des cotes plus faibles impliquent une probabilité plus élevée et un rendement potentiel plus faible. Des cotes plus élevées impliquent une probabilité plus faible et un rendement potentiel plus élevé. Comme la relation n'est pas linéaire, une variation de 0,10 des cotes décimales ne représente pas la même variation de probabilité à chaque niveau de prix."
      ],
      bullets: [
        "1,25 ‒ 80,0 % de probabilité implicite",
        "1,50 → 66,7 %",
        "1,80 → 55,6 %",
        "2,00 → 50,0 %",
        "2,50 → 40,0 %",
        "3,00 → 33,3 %",
        "4,00 → 25,0 %",
        "5,00 → 20,0 %",
      ],
      callout: {
        title: "Exemple",
        body:
          "Si un bookmaker propose une cote de 2,20, la probabilité implicite est de 1 ÷ 2,20 = 0,4545, soit environ 45,5 %. Une estimation de probabilité supérieure à 45,5 % serait nécessaire avant que ce prix puisse représenter une espérance de gain positive selon l'estimation.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Pourquoi la probabilité implicite est également un seuil de rentabilité",
      paragraphs: [
        "La probabilité implicite issue des cotes disponibles peut être interprétée comme un seuil de rentabilité théorique. Supposons que vous preniez systématiquement des cotes décimales de 2,00. Un taux de réussite de 50 % produit un rendement brut moyen d'une unité par unité misée : la moitié des paris rapportent deux unités et l'autre moitié zéro. Avant de prendre en compte tout autre coût ou limitation, 50 % constitue donc le taux de rentabilité.",
        "À une cote de 1,80, la probabilité implicite est d'environ 55,6 %. Si un résultat ne se produisait réellement que 50 % du temps, prendre systématiquement une cote de 1,80 aurait une espérance de gain négative. À une cote de 2,20, la probabilité de rentabilité est d'environ 45,5 % ; si une estimation bien calibrée situait le résultat à 50 %, le prix proposé se situerait théoriquement au-dessus du seuil de rentabilité requis.",
        "C'est le fondement de l'analyse de l'espérance de gain. La comparaison importante ne consiste pas simplement à déterminer si un résultat est susceptible de se produire. Il s'agit de savoir si la probabilité estimée est suffisamment élevée par rapport au prix proposé."
      ],
      callout: {
        title: "Probable ne signifie pas automatiquement rentable",
        body:
          "Un résultat peut avoir 70 % de chances de se produire et rester peu attrayant si les cotes disponibles exigent un taux de rentabilité supérieur à 70 %. Inversement, un résultat à plus faible probabilité peut être attrayant si le prix compense largement le risque selon une estimation fiable.",
        tone: "info",
      },
    },
    {
      id: "margin",
      heading: "Pourquoi les probabilités implicites des bookmakers peuvent totaliser plus de 100 %",
      paragraphs: [
        "Si un marché représentait des résultats mutuellement exclusifs avec des prix parfaitement équitables et sans marge, les probabilités implicites totaliseraient 100 %. Les marchés réels des bookmakers dépassent souvent 100 %. Cet excédent est communément appelé « overround » ou marge du bookmaker.",
        "Considérez un marché simplifié à deux issues avec les deux côtés cotés à 1,91. Chaque cote implique environ 52,36 %. Ensemble, elles totalisent environ 104,72 %. Les 4,72 points de pourcentage au-dessus de 100 % illustrent la marge bénéficiaire (overround) dans ce marché simplifié.",
        "En raison de cette marge, la probabilité implicite brute d'une sélection de bookmaker ne devrait pas être automatiquement décrite comme sa probabilité équitable. Les analystes peuvent supprimer ou normaliser la marge pour créer une estimation de marché sans marge (no-vig), mais cela nécessite un calcul supplémentaire."
      ],
      bullets: [
        "Convertissez les cotes de chaque issue en probabilité implicite brute.",
        "Additionnez toutes les probabilités d'issues mutuellement exclusives.",
        "Un total supérieur à 100 % indique une marge bénéficiaire (overround) sur le marché coté.",
        "Normalisez les probabilités des issues si vous avez besoin d'une estimation simple du marché sans marge.",
      ],
      callout: {
        title: "Distinction importante",
        body:
          "La probabilité implicite brute provient directement d'une cote affichée. Une estimation sans marge ou de probabilité équitable nécessite un ajustement supplémentaire et doit être étiquetée en conséquence.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Un exemple simple de suppression de la marge bénéficiaire (overround)",
      paragraphs: [
        "Une méthode de base pour créer une estimation sans marge est la normalisation proportionnelle. Supposons qu'un marché à deux issues ait des probabilités implicites brutes de 55 % et 50 %, pour un total de 105 %. Divisez chaque probabilité par 105 %. Les estimations normalisées deviennent environ 52,38 % et 47,62 %, dont la somme est égale à 100 %.",
        "Cette procédure est un moyen utile de comprendre la structure d'un marché, mais elle repose sur une hypothèse : que la marge du bookmaker est répartie proportionnellement entre les issues. La tarification réelle peut être plus complexe. La marge peut ne pas être allouée uniformément, différentes issues peuvent attirer une demande différente, et les bookmakers peuvent utiliser des stratégies de trading et de gestion des risques distinctes.",
        "Supprimer la marge bénéficiaire (overround) n'est donc pas la même chose que découvrir la probabilité réelle. Il est préférable de décrire cela comme l'obtention d'une estimation basée sur le marché plus claire à partir des cotes affichées."
      ],
      callout: {
        title: "« No-vig » ne signifie pas parfait.",
        body:
          "Un marché normalisé peut constituer un point de référence utile, mais l'incertitude, les lacunes en matière d'information, les biais du marché et les différences de tarification peuvent subsister.",
        tone: "info",
      },
    },
    {
      id: "formats",
      heading: "Probabilité implicite selon différents formats de cotes",
      paragraphs: [
        "Les cotes décimales, fractionnaires et américaines expriment la même relation économique sous des formats différents. MatchSignal utilise les cotes décimales car elles rendent directs à la fois les calculs de rendement et la conversion des probabilités.",
        "Les cotes fractionnaires telles que 3/2 représentent le profit par rapport à la mise. Pour les convertir en décimales, ajoutez un : 3/2 devient 2,50 en décimal, ce qui implique 40 %. Les cotes américaines utilisent des nombres positifs et négatifs autour d'un point de référence de 100 unités, de sorte que la formule de conversion diffère selon que le prix est positif ou négatif.",
        "Une fois qu'un format a été converti en cotes décimales, la même formule 1 ÷ cotes peut être utilisée. Cela fait des cotes décimales un langage commun pratique pour comparer les prix provenant de sources multiples."
      ],
      bullets: [
        "Fractionnaire 1/1 = décimal 2,00 = 50 % de probabilité implicite.",
        "Fractionnaire 3/2 = décimal 2,50 = 40 %.",
        "Américaine +100 = décimal 2,00 = 50 %.",
        "Américaine -200 = décimal 1,50 = environ 66,7 %.",
      ],
    },
    {
      id: "price-comparison",
      heading: "Comment de meilleures cotes modifient la probabilité implicite",
      paragraphs: [
        "La comparaison des prix est importante car un meilleur prix réduit le taux de réussite requis pour atteindre le seuil de rentabilité. Imaginez que la même sélection soit disponible à 1,80, 1,90 et 2,00. Ces prix impliquent respectivement environ 55,6 %, 52,6 % et 50,0 %.",
        "L'événement sportif sous-jacent est identique, mais l'économie du pari ne l'est pas. Si votre évaluation de probabilité était de 54 %, la cote de 1,80 se situerait au-dessus de votre estimation de manière défavorable, car elle nécessite 55,6 % pour atteindre le seuil de rentabilité. Les cotes de 1,90 et 2,00 nécessiteraient des taux de rentabilité plus bas et pourraient donc générer une valeur attendue positive selon l'estimation de 54 %.",
        "Cela illustre pourquoi la comparaison des cotes ne consiste pas simplement à maximiser un gain après une victoire. Le prix modifie le seuil mathématique que votre estimation de probabilité doit dépasser."
      ],
      callout: {
        title: "Même choix, valeur différente",
        body:
          "Une sélection n'a pas une valeur fixe indépendante du prix. Lorsque les cotes changent, la probabilité implicite et la relation de valeur attendue changent avec elles.",
        tone: "example",
      },
    },
    {
      id: "market-movement",
      heading: "Que devient la probabilité implicite lorsque les cotes évoluent",
      paragraphs: [
        "Lorsque les cotes diminuent, la probabilité implicite augmente. Lorsque les cotes augmentent, la probabilité implicite diminue. Un passage de 2,20 à 2,00 fait passer la probabilité implicite d'environ 45,5 % à 50 %. Un passage de 2,00 à 1,80 l'augmente davantage, à environ 55,6 %.",
        "Les cotes peuvent évoluer pour de nombreuses raisons : nouvelles informations, blessures, compositions d'équipe confirmées, météo, activité du marché, changements chez les bookmakers concurrents ou décisions de gestion des risques propres à un bookmaker. Une évolution des cotes ne prouve donc pas que la probabilité réelle sous-jacente a changé exactement dans la même proportion.",
        "Néanmoins, traduire une évolution de prix en probabilité implicite peut rendre l'ampleur du mouvement plus intuitive. Dire qu'un prix est passé de 2,20 à 1,90 est moins immédiat que de reconnaître que la probabilité de rentabilité indiquée est passée d'environ 45,5 % à 52,6 %."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Erreurs courantes lors de la lecture de la probabilité implicite",
      paragraphs: [
        "L'arithmétique est suffisamment simple pour que la plupart des erreurs proviennent de l'interprétation plutôt que du calcul. L'erreur la plus courante consiste à traiter la probabilité implicite comme une certitude ou comme la prévision exacte du bookmaker. Une autre consiste à comparer les probabilités de différents marchés sans vérifier si les sélections et les règles de règlement sont réellement équivalentes.",
        "Une troisième erreur consiste à ignorer la marge du bookmaker. Si les probabilités sur un marché totalisent 105 %, citer chaque pourcentage brut comme une probabilité équitable exagère la probabilité totale disponible. Enfin, les parieurs peuvent surestimer de faibles avantages apparents. Une différence d'un ou deux points de pourcentage peut disparaître lorsque le modèle de probabilité sous-jacent est incertain ou mal calibré."
      ],
      bullets: [
        "N'interprétez pas la probabilité implicite comme une certitude.",
        "Ne qualifiez pas la probabilité brute des bookmakers de « probabilité juste » sans tenir compte de la marge.",
        "Ne comparez pas des cotes issues de définitions de marché différentes comme si elles étaient identiques.",
        "Ne supposez pas que chaque différence entre votre estimation et le marché constitue un avantage réel.",
        "N'ignorez pas que les cotes peuvent changer avant qu'un pari ne soit placé.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Comment la probabilité implicite s'intègre dans MatchSignal",
      paragraphs: [
        "MatchSignal utilise la tarification des bookmakers comme un élément de son cadre d'analyse sportive. Les prix du marché peuvent être traduits en termes de probabilité afin que différents bookmakers et observations de marché puissent être comparés sur une échelle commune.",
        "Sur les fiches MatchSignal, la moyenne du marché (Market Avg) résume la tarification du marché échantillonné, tandis que la probabilité juste (Fair Probability) est une estimation analytique plutôt qu'un pourcentage brut de bookmaker. L'avantage de valeur (Value Edge) est destiné à décrire la différence entre le prix du marché disponible et l'évaluation basée sur la probabilité de MatchSignal. Les livres échantillonnés (Books Sampled) indiquent combien de sources de bookmakers ont contribué à l'échantillon de marché pertinent.",
        "Ces champs sont destinés à faciliter l'examen de la tarification du marché et du contexte du modèle. Ils ne constituent pas des garanties de résultat sportif ou de profit. Les hypothèses du modèle, la qualité des données sources, les mouvements du marché et la variance sportive ordinaire peuvent tous affecter le résultat."
      ],
      callout: {
        title: "Utilisez la probabilité comme cadre de travail",
        body:
          "La probabilité aide à structurer l'incertitude. Elle ne l'élimine pas, et aucun modèle ne peut garantir le résultat d'un événement sportif.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Une liste de contrôle pratique de la probabilité implicite",
      paragraphs: [
        "Lors de l'évaluation d'un prix de pari, utilisez la probabilité implicite comme point de départ plutôt que comme réponse finale. La séquence suivante aide à garder distincts le prix, la structure du marché et l'estimation de la probabilité."
      ],
      bullets: [
        "Identifiez le marché et la sélection exacts.",
        "Convertissez les cotes décimales disponibles en probabilité implicite.",
        "Vérifiez si le marché contient une marge de bookmaker ou un overround.",
        "Comparez les prix équivalents entre les différents bookmakers lorsque cela est possible.",
        "Si vous utilisez un modèle de probabilité, comparez son estimation avec la probabilité de seuil de rentabilité du prix.",
        "Tenez compte de l'incertitude du modèle au lieu de traiter les petites différences numériques comme des avantages certains.",
        "Revérifiez les cotes actuelles avant d'agir, car les prix du marché peuvent fluctuer.",
        "Utilisez une gestion disciplinée des mises et ne traitez jamais l'analyse de probabilité comme une garantie."
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
    "Les paris impliquent un risque financier. La probabilité implicite est une interprétation mathématique d'un prix, et non une garantie de résultat ou de profit. Ne misez que des montants que vous pouvez vous permettre de perdre, évitez de chercher à récupérer vos pertes et maintenez vos décisions de pari dans des limites prédéterminées.",
};

export default guide;
