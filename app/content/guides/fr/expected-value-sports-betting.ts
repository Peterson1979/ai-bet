import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "expected-value-sports-betting",
  locale: "fr",
  title: "Explication de la valeur attendue dans les paris sportifs",
  category: "value-analysis",
  status: "published",
  description:
    "Comprenez la valeur attendue dans les paris sportifs, comment la probabilité et le prix se combinent pour créer une VE positive ou négative, pourquoi un avantage positif ne garantit pas un gain, et comment évaluer la valeur plus attentivement.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "La valeur attendue, généralement abrégée en VE, est un moyen de décrire le résultat moyen théorique d'une décision lorsque le même type de décision est répété de nombreuses fois. Dans les paris sportifs, la VE relie deux éléments : votre estimation de la fréquence à laquelle un résultat devrait se produire et le prix proposé par le marché. Un pari peut avoir de fortes chances de gagner et avoir tout de même une valeur attendue négative si les cotes sont trop faibles. Un pari peut également perdre aujourd'hui tout en ayant une valeur attendue positive selon une estimation de probabilité raisonnable. Le concept est utile car il déplace l'attention du simple choix des gagnants vers la relation entre probabilité, prix et incertitude.",
  keyTakeaways: [
    "La valeur attendue combine la probabilité et le paiement en une seule mesure mathématique à long terme.",
    "Une VE positive signifie que la probabilité estimée est suffisamment élevée par rapport aux cotes proposées pour créer un rendement moyen théorique positif.",
    "Une VE négative signifie que le prix proposé nécessite un taux de réussite plus élevé que ce que votre estimation de probabilité soutient.",
    "Un pari à VE positive peut perdre, et un pari à VE négative peut gagner ; la VE concerne les décisions répétées, pas la certitude sur un seul événement.",
    "La qualité de tout calcul de VE dépend fortement de la qualité et de la calibration de l'estimation de probabilité.",
    "De meilleures cotes améliorent la valeur attendue pour la même sélection sous-jacente car elles réduisent la probabilité de seuil de rentabilité.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Ce que signifie la valeur attendue",
      paragraphs: [
        "La valeur attendue est la moyenne pondérée par la probabilité de tous les résultats possibles. Dans un exemple simple de pari gagnant ou perdant, il existe deux résultats financiers principaux : le pari gagne et produit un profit, ou le pari perd et la mise est perdue. La VE combine la probabilité de chaque résultat avec son résultat financier.",
        "Supposons qu'une sélection soit proposée à une cote décimale de 2,00 et que vous estimiez qu'elle a 55 % de chances de gagner. Une mise d'une unité rapporte deux unités en cas de succès, ce qui signifie une unité de profit plus la mise initiale. Le résultat perdant coûte une unité. La valeur attendue est donc 0,55 × 1 unité de profit plus 0,45 × moins 1 unité, ce qui équivaut à +0,10 unité. Par rapport à une mise d'une unité, il s'agit d'un rendement attendu théorique de +10 %.",
        "Cela ne signifie pas que le prochain pari rapportera physiquement 1,10 unité. Le résultat réel d'un pari est discret : il est soit gagnant, soit perdant selon les règles de règlement du marché. L'EV est une moyenne calculée sur des décisions comparables répétées selon la probabilité supposée."
      ],
      callout: {
        title: "L'idée fondamentale",
        body:
          "La valeur attendue mesure la qualité d'une cote par rapport à une estimation de probabilité. Elle ne prédit pas le résultat du prochain match.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "La formule de base de la valeur attendue",
      paragraphs: [
        "Pour un pari simple gagnant ou perdant utilisant des cotes décimales, l'EV par unité misée peut s'écrire : EV = (probabilité de gain × cote décimale) − 1.",
        "Si la probabilité est de 50 % et la cote est de 2,20, le calcul est 0,50 × 2,20 − 1 = +0,10, soit +10 %. Si cette même probabilité de 50 % est associée à une cote de 1,80, le résultat est 0,50 × 1,80 − 1 = −0,10, soit −10 %.",
        "Une même prédiction peut donc avoir une valeur attendue très différente selon la cote disponible. C'est l'une des distinctions les plus importantes dans l'analyse des paris : l'opinion sportive et la qualité économique du pari ne sont pas la même chose.",
        "La formule est simple, mais elle peut créer une fausse confiance si la probabilité saisie est traitée comme exacte. L'arithmétique de l'EV peut être correcte alors que l'estimation de probabilité sous-jacente est erronée."
      ],
      bullets: [
        "EV par unité = (probabilité de gain × cote décimale) − 1.",
        "Probabilité de 50 % à une cote de 2,20 : +10 % d'EV.",
        "Probabilité de 50 % à une cote de 2,00 : 0 % d'EV.",
        "Probabilité de 50 % à une cote de 1,80 : −10 % d'EV.",
      ],
      callout: {
        title: "Même sélection, EV différente",
        body:
          "Si votre estimation de probabilité reste la même, changer les cotes modifie immédiatement la valeur attendue.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Probabilité de seuil de rentabilité et valeur attendue",
      paragraphs: [
        "Chaque prix proposé possède une probabilité de seuil de rentabilité. Pour les cotes décimales, la probabilité de seuil de rentabilité est égale à 1 divisé par la cote. À 2,00, le taux de seuil de rentabilité est de 50 %. À 1,80, il est d'environ 55,6 %. À 2,50, il est de 40 %.",
        "Le lien avec l'EV est direct. Si votre estimation de probabilité est supérieure à la probabilité de seuil de rentabilité impliquée par le prix disponible, le pari a une valeur attendue positive selon cette estimation. Si votre estimation est inférieure au seuil de rentabilité, la valeur attendue est négative. Si les deux sont égales, l'EV théorique est nulle avant de prendre en compte les frictions pratiques.",
        "Ce cadre est plus utile que de simplement se demander si un résultat est probable. Une équipe évaluée à 70 % peut tout de même être mal cotée si les cotes disponibles exigent un taux de seuil de rentabilité de 75 %. Un résultat évalué à seulement 35 % peut théoriquement offrir de la valeur si le prix exige un taux de seuil de rentabilité inférieur à 35 %."
      ],
      callout: {
        title: "Probable n'est pas synonyme de rentable",
        body:
          "La probabilité vous indique à quelle fréquence vous pensez qu'un événement peut se produire. La valeur attendue demande si le prix proposé vous compense de manière appropriée pour cette probabilité.",
        tone: "warning",
      },
    },
    {
      id: "positive-negative",
      heading: "EV positive vs EV négative",
      paragraphs: [
        "Une valeur attendue positive signifie que le rendement moyen estimé est supérieur au montant misé. Une valeur attendue négative signifie que le rendement moyen estimé est inférieur au montant misé. Le signe de l'EV dépend de la relation entre la probabilité et le prix, et non du fait que le prochain pari individuel soit gagnant.",
        "Considérez deux personnes évaluant la même sélection. L'une ne peut obtenir qu'une cote de 1,80, tandis que l'autre trouve 2,05. Si les deux utilisent la même estimation de probabilité de 52 %, le premier prix produit une EV de 0,52 × 1,80 − 1 = −6,4 %. Le second produit une EV de 0,52 × 2,05 − 1 = +6,6 %.",
        "La prédiction est identique, mais la qualité économique des deux paris est différente. C'est pourquoi la comparaison des prix est importante. Un parieur ne peut pas contrôler le score final, mais peut souvent contrôler s'il accepte un prix inférieur alors qu'un meilleur prix équivalent est disponible ailleurs."
      ],
      bullets: [
        "EV positif : la probabilité estimée dépasse le seuil de rentabilité du prix.",
        "EV négatif : la probabilité estimée est inférieure au seuil de rentabilité du prix.",
        "EV nul : la probabilité estimée correspond approximativement au seuil de rentabilité.",
        "Modifier les cotes modifie l'EV, même si l'estimation de probabilité sous-jacente ne change pas.",
      ],
    },
    {
      id: "not-guarantee",
      heading: "Pourquoi une espérance de gain positive ne garantit pas le profit",
      paragraphs: [
        "Une estimation à EV positif décrit une espérance mathématique à long terme, et non un résultat garanti à court terme. Le sport comporte de l'aléa, des informations incomplètes, des décisions arbitrales, des blessures, des changements tactiques, des effets météorologiques, des erreurs d'exécution et de nombreuses autres sources de variance. Même une estimation de probabilité solide ne peut éliminer ces facteurs.",
        "Imaginez une série de paris évalués chacun avec une probabilité de gain de 60 %. Il est tout à fait possible d'en perdre quatre ou cinq d'affilée. Inversement, une séquence de paris à EV négatif peut gagner plusieurs fois de suite. Les résultats à court terme ne révèlent donc pas de manière fiable si le processus sous-jacent était bon.",
        "La deuxième source d'incertitude est l'estimation de probabilité elle-même. Un calcul peut sembler fortement positif parce que la probabilité estimée est trop optimiste. Si un modèle indique 60 % alors que la chance réelle est plus proche de 50 %, le calcul de l'EV sera trompeur, même si l'arithmétique est irréprochable.",
        "Pour cette raison, l'espérance de gain doit être traitée comme un cadre analytique plutôt que comme une promesse. Plus l'estimation de probabilité est incertaine, moins il faut accorder de confiance à un faible avantage apparent."
      ],
      callout: {
        title: "L'arithmétique peut être correcte alors que l'estimation est erronée",
        body:
          "Les calculs d'EV ne sont fiables qu'à hauteur des probabilités qui leur sont fournies. Le calibrage du modèle et l'incertitude comptent autant que la formule.",
        tone: "warning",
      },
    },
    {
      id: "probability-quality",
      heading: "Pourquoi la qualité de la probabilité importe plus que la formule",
      paragraphs: [
        "La formule de l'espérance mathématique est simple. Estimer correctement la probabilité est la partie difficile. Un modèle de probabilité utile doit être calibré : les résultats auxquels on attribue environ 60 % de chances devraient, sur un échantillon suffisamment large et approprié, se produire environ 60 % du temps.",
        "Les probabilités sportives peuvent être estimées à partir de données de marché, de modèles statistiques, d'informations sur les équipes et les joueurs, de variables contextuelles ou de combinaisons de ces sources. Chaque approche comporte des hypothèses. Les données historiques peuvent ne pas représenter pleinement les équipes actuelles. Les blessures peuvent être incertaines. Un modèle peut sous-estimer les changements tactiques. Les prix du marché peuvent intégrer des informations que le modèle ne prend pas en compte.",
        "Cela signifie qu'un avantage apparent de 2 % ne doit pas être traité automatiquement de la même manière qu'un avantage de 10 %. L'incertitude entourant l'estimation de la probabilité peut être plus importante que la différence mesurée.",
        "Un processus discipliné ne pose pas seulement la question « Quelle est mon estimation ? », mais aussi « À quel point cette estimation est-elle incertaine et dans quelle mesure l'espérance mathématique est-elle sensible à de faibles variations ? »"
      ],
      bullets: [
        "Vérifiez le calibrage sur de grands échantillons plutôt que de juger un modèle sur quelques résultats.",
        "Traitez les petits avantages avec prudence lorsque l'estimation de la probabilité sous-jacente est incertaine.",
        "Mettez à jour les estimations lorsque des informations pertinentes changent.",
        "Évitez d'ajouter de la confiance simplement parce qu'un modèle produit de nombreuses décimales.",
      ],
    },
    {
      id: "bookmaker-margin",
      heading: "Comment la marge du bookmaker affecte l'analyse de l'espérance mathématique",
      paragraphs: [
        "Les prix des bookmakers incluent généralement une marge ou un overround. Sur un marché simple à deux issues, les deux côtés peuvent être proposés à 1,91. Chaque prix implique environ 52,36 %, de sorte que les deux probabilités brutes totalisent environ 104,72 % au lieu de 100 %.",
        "Ceci est important car une probabilité implicite brute du bookmaker n'est pas automatiquement une estimation de probabilité juste. Les prix indiqués incluent la structure du marché et la marge de l'opérateur. Les analystes peuvent normaliser les probabilités implicites pour créer une référence de marché simple sans marge.",
        "Pour l'analyse de l'espérance mathématique, cependant, le prix réel disponible pour le parieur reste le prix qui détermine le seuil de rentabilité. Même si un modèle sans marge estime un résultat à 52 %, un prix de bookmaker de 1,85 nécessite environ 54,1 % pour atteindre le seuil de rentabilité. Le prix d'exécution est donc central dans le calcul final de l'espérance mathématique."
      ],
      callout: {
        title: "La probabilité équitable et le prix disponible sont des données distinctes.",
        body:
          "Une estimation sans marge peut aider à décrire les attentes du marché, tandis que les cotes réellement proposées déterminent la probabilité de seuil de rentabilité du pari que vous pouvez placer.",
        tone: "info",
      },
    },
    {
      id: "odds-comparison",
      heading: "Pourquoi comparer les cotes améliore la valeur attendue",
      paragraphs: [
        "Pour une même sélection et une même estimation de probabilité, des cotes plus élevées améliorent toujours la valeur attendue. Supposons que votre estimation soit de 48 %. À 1,95, la VE est de 0,48 × 1,95 − 1 = −6,4 %. À 2,10, la VE est de +0,8 %. À 2,20, la VE est de +5,6 %.",
        "Rien n'a changé concernant le résultat sportif entre ces exemples. Seul le prix a changé. C'est pourquoi la comparaison de marchés équivalents entre les différents bookmakers est une partie importante de l'analyse de valeur.",
        "La comparaison doit être réellement équivalente. Des règles de règlement, des handicaps, des totaux, un traitement des prolongations, des conditions d'annulation ou des définitions de marché différents peuvent rendre des prix superficiellement similaires non équivalents. La comparaison des prix n'est utile que lorsque le pari sous-jacent est identique."
      ],
      bullets: [
        "Confirmez que l'événement, la sélection, la ligne et les règles de règlement correspondent.",
        "Comparez les prix actuels plutôt que des captures d'écran obsolètes ou des cotations historiques.",
        "N'oubliez pas que les prix du marché peuvent évoluer avant que le pari ne soit placé.",
        "Des cotes équivalentes plus élevées abaissent la probabilité de seuil de rentabilité.",
      ],
    },
    {
      id: "variance",
      heading: "Valeur attendue, variance et taille de l'échantillon",
      paragraphs: [
        "La variance décrit à quel point les résultats à court terme peuvent s'écarter de leur espérance à long terme. Les paris sportifs présentent une variance substantielle car chaque événement produit un résultat discret et de nombreux marchés impliquent des probabilités éloignées de la certitude.",
        "Un processus avec une espérance de gain positive réelle peut connaître des périodes de pertes prolongées. L'ampleur et la durée de ces fluctuations dépendent du type de paris, des cotes, des probabilités réelles, de la corrélation entre les positions et de la taille des mises. Un échantillon restreint peut donc être dominé par le hasard.",
        "Cela crée un problème d'évaluation majeur. Un parieur peut confondre une série de victoires avec une preuve de compétence ou abandonner un processus solide lors d'une baisse ordinaire. L'analyse de l'EV est plus significative lorsqu'elle est combinée à une tenue de registres disciplinée, à des tailles d'échantillon réalistes et à une attention portée à la calibration plutôt qu'au seul profit à court terme."
      ],
      callout: {
        title: "Les résultats et le processus ne sont pas identiques",
        body:
          "Une victoire ne prouve pas qu'un pari avait une EV positive, et une perte ne prouve pas qu'il avait une EV négative. Évaluez la qualité de la probabilité et de la décision de prix indépendamment du score final.",
        tone: "warning",
      },
    },
    {
      id: "worked-example",
      heading: "Un exemple d'espérance de gain calculée",
      paragraphs: [
        "Supposons qu'un bookmaker propose une cote décimale de 2,30 sur une sélection. La probabilité de seuil de rentabilité est de 1 ÷ 2,30, soit environ 43,48 %. Votre analyse indépendante estime la sélection à 47 %.",
        "L'EV par unité est de 0,47 × 2,30 − 1 = +0,081, soit +8,1 %. Selon l'estimation de 47 %, des paris répétés avec la même relation probabilité-prix rapporteraient théoriquement 1,081 unités pour chaque unité misée en moyenne.",
        "Testez maintenant la sensibilité. Si la probabilité réelle n'était que de 44 %, l'EV serait de 0,44 × 2,30 − 1 = +1,2 %. À 43 %, l'EV devient −1,1 %. La conclusion change avec un ajustement relativement faible de la probabilité.",
        "Cette sensibilité illustre pourquoi une interprétation responsable est importante. Le chiffre global de +8,1 % ne suffit pas. Vous devez également comprendre quel est votre degré de confiance dans l'estimation de 47 % et si le prix indiqué est toujours disponible."
      ],
      bullets: [
        "Cote : 2,30",
        "Probabilité de seuil de rentabilité : environ 43,48 %",
        "Probabilité estimée : 47 %",
        "VE estimée : +8,1 %",
        "À 44 % de probabilité : +1,2 % de VE",
        "À 43 % de probabilité : -1,1 % de VE",
      ],
    },
    {
      id: "matchsignal",
      heading: "Comment la valeur attendue se rapporte à l'avantage de valeur (Value Edge) de MatchSignal",
      paragraphs: [
        "MatchSignal utilise les prix du marché, des échantillons de bookmakers et une analyse basée sur les probabilités pour fournir un contexte autour d'une sélection. Le champ Value Edge de la plateforme est conçu pour mettre en évidence une différence positive entre le prix du marché disponible et l'évaluation basée sur les probabilités utilisée par MatchSignal.",
        "Ceci doit être interprété comme un signal analytique plutôt que comme un rendement attendu garanti. Les prix du marché peuvent fluctuer, les estimations de probabilité comportent une incertitude et le signal affiché reflète les données et les hypothèses du modèle disponibles au moment de l'analyse.",
        "Meilleures cotes affiche le prix partenaire le plus fort identifié pour la sélection affichée, Moyenne du marché résume les prix du marché échantillonnés, Probabilité équitable est une estimation analytique, et Bookmakers échantillonnés indique combien de sources de bookmakers ont contribué à l'échantillon de marché pertinent.",
        "L'interprétation correcte d'un Value Edge n'est donc pas « ce pari va gagner ». Elle est plus proche de « selon les hypothèses actuelles de probabilité et de prix, cette sélection pourrait être évaluée plus favorablement que ce que l'estimation du modèle suggérerait »."
      ],
      callout: {
        title: "Un signal n'est pas une garantie",
        body:
          "Le Value Edge de MatchSignal décrit une relation basée sur un modèle entre la probabilité et le prix. Il ne garantit pas un résultat positif et n'élimine pas la variance sportive.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Une liste de contrôle pratique pour la VE",
      paragraphs: [
        "Avant de qualifier un pari de valeur attendue positive, vérifiez chaque composante du calcul. Cela permet d'éviter qu'une formule mathématiquement correcte ne soit alimentée par des données peu fiables."
      ],
      bullets: [
        "Identifiez le marché et la sélection exacts.",
        "Utilisez les cotes actuellement disponibles, et non un prix obsolète.",
        "Convertissez le prix en sa probabilité implicite de seuil de rentabilité.",
        "Estimez la probabilité du résultat de manière indépendante ou à l'aide d'un modèle clairement défini.",
        "Vérifiez si la marge du bookmaker affecte la comparaison du marché.",
        "Calculez l'EV à partir de la probabilité et du prix.",
        "Testez comment le résultat évolue si l'estimation de probabilité est légèrement inférieure.",
        "Comparez les prix équivalents entre les différents bookmakers lorsque cela est possible.",
        "Tenez compte de l'incertitude et de la variance.",
        "Utilisez une gestion disciplinée des mises et ne considérez jamais l'EV comme une garantie.",
      ],
    },
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "implied-probability",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "matchsignal-value-edge",
    "variance-sports-betting",
  ],
  responsibleGamblingNote:
    "La valeur attendue (EV) est un cadre mathématique, pas une garantie de profit. Les estimations de probabilité peuvent être erronées, les prix du marché changent et les résultats à court terme peuvent varier considérablement par rapport aux attentes théoriques. Ne misez que des montants que vous pouvez vous permettre de perdre, utilisez des limites prédéterminées, évitez de chercher à récupérer vos pertes et traitez l'analyse des paris comme une information plutôt que comme une certitude.",
};

export default guide;
