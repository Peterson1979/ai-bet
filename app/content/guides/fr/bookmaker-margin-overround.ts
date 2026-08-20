import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bookmaker-margin-overround",
  locale: "fr",
  title: "Qu'est-ce que la marge du bookmaker / l'overround ?",
  category: "odds-probability",
  status: "published",
  description:
    "Apprenez ce que signifient la marge du bookmaker et l'overround, comment les calculer à partir des cotes de paris, pourquoi les probabilités implicites dépassent souvent 100 %, et comment la marge affecte la comparaison des prix et l'analyse de la valeur.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "La marge du bookmaker, souvent appelée overround ou vig, est la marge de tarification intégrée dans de nombreux marchés de paris. Si chaque résultat sur un marché parfaitement équitable était converti en probabilité, les probabilités totaliseraient 100 %. Sur les marchés réels des bookmakers, les probabilités implicites dérivées des cotes proposées dépassent souvent 100 %. Cet excédent constitue l'overround. Il est important de le comprendre car les probabilités brutes des bookmakers ne sont pas automatiquement des probabilités équitables, et deux bookmakers peuvent exprimer des points de vue similaires sur un événement tout en offrant des prix sensiblement différents.",
  keyTakeaways: [
    "L'overround est le montant par lequel les probabilités implicites brutes de tous les résultats mutuellement exclusifs dépassent 100 %.",
    "Un marché à deux issues coté à 1,91 des deux côtés implique un total d'environ 104,72 %, correspondant à un overround d'environ 4,72 points de pourcentage.",
    "La probabilité implicite brute du bookmaker est un chiffre dérivé du prix, et non automatiquement une estimation de probabilité équitable.",
    "Un overround plus faible signifie généralement une tarification plus compétitive, toutes choses égales par ailleurs.",
    "La marge peut ne pas être répartie uniformément sur tous les résultats, de sorte qu'une simple normalisation proportionnelle n'est qu'une approximation.",
    "Les cotes réelles disponibles pour l'utilisateur déterminent la probabilité de seuil de rentabilité et restent donc essentielles à l'analyse de la valeur attendue.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Ce que signifie la marge du bookmaker",
      paragraphs: [
        "Un bookmaker ne crée normalement pas un marché en publiant simplement des probabilités parfaitement équitables. Au lieu de cela, les prix sont généralement fixés de manière à ce que les probabilités implicites combinées dépassent 100 %. L'excédent au-dessus de 100 % est communément appelé overround, marge du bookmaker ou vig.",
        "Par exemple, imaginez un événement théorique à deux issues dans lequel les deux côtés sont proposés à des cotes décimales de 1,91. Chaque prix implique une probabilité d'environ 52,36 %. L'addition des deux donne environ 104,72 %. Le montant au-dessus de 100 %, soit environ 4,72 points de pourcentage, est l'overround du marché.",
        "Cela ne signifie pas que le bookmaker est assuré de gagner exactement 4,72 % sur chaque marché. Les résultats réels, la répartition des paris, l'évolution des cotes, les activités promotionnelles, les limites, les décisions de trading et le comportement des clients affectent tous les résultats réalisés. L'overround doit être compris comme une propriété de la structure des cotes proposées plutôt que comme un taux de profit garanti."
      ],
      callout: {
        title: "Structure des cotes, pas un profit garanti",
        body:
          "L'overround décrit la manière dont un marché est coté. Il ne doit pas être interprété comme le profit garanti du bookmaker sur un événement individuel.",
        tone: "warning",
      },
    },
    {
      id: "calculation",
      heading: "Comment calculer l'overround à partir des cotes décimales",
      paragraphs: [
        "Le calcul commence par la conversion de la cote décimale de chaque résultat en probabilité implicite. Pour les cotes décimales, la probabilité implicite est égale à 1 divisé par la cote. Additionnez les probabilités implicites de tous les résultats mutuellement exclusifs du marché.",
        "Si le total est de 100 %, le marché est mathématiquement sans marge avant de prendre en compte tout autre facteur pratique. Si le total est de 105 %, l'overround est de 5 points de pourcentage. Si le total est de 108 %, l'overround est de 8 points de pourcentage.",
        "La formule peut s'écrire : overround = somme de toutes les probabilités implicites brutes − 100 %."
      ],
      bullets: [
        "Convertissez chaque cote décimale en utilisant 1 ÷ cote.",
        "Additionnez les probabilités implicites de tous les résultats mutuellement exclusifs.",
        "Soustrayez 100 points de pourcentage du total.",
        "Le montant restant est l'overround du marché proposé.",
      ],
      callout: {
        title: "Exemple simple",
        body:
          "À 1,91 et 1,91, chaque côté implique environ 52,36 %. Le total est d'environ 104,72 %, donc la marge (overround) est d'environ 4,72 points de pourcentage.",
        tone: "example",
      },
    },
    {
      id: "three-way",
      heading: "La marge dans un marché de football à trois issues",
      paragraphs: [
        "Les marchés de football à trois issues fournissent un exemple utile car la victoire à domicile, le match nul et la victoire à l'extérieur sont des résultats mutuellement exclusifs. Supposons que les cotes soient de 2,10 pour l'équipe à domicile, 3,40 pour le match nul et 3,60 pour l'équipe à l'extérieur.",
        "Les probabilités implicites sont d'environ 47,62 %, 29,41 % et 27,78 %. Additionnées, elles totalisent environ 104,81 %. La marge résultante est donc d'environ 4,81 points de pourcentage.",
        "Les trois cotes n'impliquent pas que l'événement a en réalité une probabilité totale de 104,81 %. L'excédent apparaît parce que les cotes proposées incluent une marge et d'autres considérations commerciales."
      ],
      bullets: [
        "Domicile 2,10 → environ 47,62 %",
        "Nul 3,40 → environ 29,41 %",
        "Extérieur 3,60 → environ 27,78 %",
        "Total → environ 104,81 %",
        "Marge (overround) → environ 4,81 points de pourcentage",
      ],
    },
    {
      id: "raw-vs-fair",
      heading: "Probabilité implicite brute vs probabilité réelle",
      paragraphs: [
        "Une probabilité implicite brute provient directement d'une cote proposée. Si un bookmaker offre une cote décimale de 2,00, la probabilité implicite brute est de 50 %. Ce chiffre décrit le seuil de rentabilité intégré dans la cote disponible.",
        "Une estimation de probabilité équitable ou sans marge est différente. Elle tente de supprimer l'effet de la marge bénéficiaire du marché afin que les probabilités des résultats mutuellement exclusifs totalisent 100 %.",
        "Cette distinction est importante car qualifier chaque probabilité brute de bookmaker de probabilité équitable peut exagérer la confiance apparente du marché. Dans un marché totalisant 105 %, les probabilités implicites brutes du bookmaker décrivent collectivement plus de 100 % de probabilité, ce qui est impossible pour des résultats exhaustifs mutuellement exclusifs."
      ],
      callout: {
        title: "Ne mélangez pas les deux concepts",
        body:
          "La probabilité implicite brute provient de la cote que vous pouvez réellement obtenir. La probabilité équitable est une estimation analytique après ajustement de la marge.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Un moyen simple de supprimer la marge",
      paragraphs: [
        "Une méthode courante pour estimer les probabilités sans marge est la normalisation proportionnelle. Divisez chaque probabilité implicite brute par la somme de toutes les probabilités implicites brutes. Les probabilités ajustées totaliseront alors 100 %.",
        "Supposons qu'un marché à deux issues présente des probabilités implicites brutes de 55 % et 50 %, pour un total de 105 %. La normalisation proportionnelle donne environ 52,38 % pour le premier côté et 47,62 % pour le second.",
        "Cette méthode est simple et utile pour comparer les marchés, mais elle suppose que la marge est répartie proportionnellement entre les résultats. Sur les marchés réels, cette hypothèse peut être imparfaite. Les bookmakers peuvent ajuster les cotes différemment en fonction de la demande attendue, des informations, de la responsabilité, de la profondeur du marché ou des caractéristiques des résultats individuels.",
        "Pour cette raison, une probabilité normalisée doit être décrite comme une estimation de marché sans marge plutôt que comme la probabilité objectivement vraie de l'événement."
      ],
      bullets: [
        "Probabilités brutes : 55 % et 50 %.",
        "Total du marché : 105 %.",
        "Premier côté normalisé : 55 ÷ 105 ≈ 52,38 %.",
        "Deuxième côté normalisé : 50 ÷ 105 ≈ 47,62 %.",
        "Total normalisé : 100 %.",
      ],
      callout: {
        title: "La normalisation est une estimation",
        body:
          "Supprimer la marge mathématiquement ne révèle pas une probabilité réelle parfaite. Cela crée une référence basée sur le marché plus claire.",
        tone: "info",
      },
    },
    {
      id: "uneven-margin",
      heading: "Pourquoi la marge n'est pas toujours répartie uniformément",
      paragraphs: [
        "Il est tentant d'imaginer qu'un bookmaker ajoute simplement le même pourcentage de marge à chaque sélection. La tenue de marché réelle est souvent plus complexe. Certains résultats peuvent attirer davantage la demande du public, certains peuvent être plus difficiles à évaluer, et certains marchés peuvent avoir une liquidité plus faible ou une incertitude plus élevée.",
        "Un bookmaker peut donc ajuster un côté plus agressivement qu'un autre. Sur les marchés des outsiders, la relation peut devenir particulièrement inégale : les résultats à cotes élevées peuvent comporter une marge effective différente de celle des favoris à faibles cotes.",
        "C'est l'une des raisons pour lesquelles les calculs proportionnels sans marge ne doivent pas être traités comme des probabilités justes exactes. Il existe des méthodes de suppression de marge plus avancées, mais toutes reposent sur des hypothèses concernant la manière dont la marge est répartie."
      ],
      callout: {
        title: "La marge n'est pas nécessairement symétrique",
        body:
          "Deux résultats peuvent contribuer différemment à la marge totale d'un bookmaker. Un ajustement proportionnel simple est utile, mais cela reste un modèle.",
        tone: "warning",
      },
    },
    {
      id: "price-comparison",
      heading: "Pourquoi une marge plus faible signifie généralement de meilleurs prix",
      paragraphs: [
        "Si deux bookmakers ont des évaluations similaires d'un événement mais que l'un opère avec une marge plus faible, le marché à marge plus faible offrira généralement des prix plus compétitifs au parieur.",
        "Considérez deux marchés bidirectionnels simples. Le bookmaker A cote les deux issues à 1,91, ce qui produit une marge d'environ 4,72 %. Le bookmaker B cote les deux issues à 1,96, ce qui produit une probabilité implicite totale d'environ 102,04 % et une marge d'environ 2,04 %.",
        "Pour un pari gagnant d'une unité, 1,96 rapporte plus que 1,91. Plus important encore, une cote plus élevée réduit la probabilité de seuil de rentabilité d'environ 52,36 % à environ 51,02 %. Cette différence peut affecter de manière significative la valeur attendue sur des paris répétés.",
        "C'est pourquoi comparer les cotes actuelles sur des marchés équivalents peut être utile, même sans effectuer une meilleure prédiction. L'événement sous-jacent reste inchangé, mais le prix disponible peut s'améliorer."
      ],
      bullets: [
        "1,91 / 1,91 → environ 4,72 % de marge.",
        "1,96 / 1,96 → environ 2,04 % de marge.",
        "Des cotes équivalentes plus élevées réduisent la probabilité de seuil de rentabilité requise.",
        "Confirmez toujours que les règles du marché et les conditions de règlement sont comparables.",
      ],
    },
    {
      id: "margin-and-ev",
      heading: "Comment la marge du bookmaker affecte la valeur attendue",
      paragraphs: [
        "La valeur attendue dépend de la probabilité d'un résultat et du prix réel disponible. Étant donné que la marge du bookmaker réduit généralement les cotes par rapport à un marché théorique sans marge, la marge augmente le taux de réussite requis pour atteindre le seuil de rentabilité.",
        "Supposons que vous estimiez un résultat à 52 %. À une cote décimale de 2,00, la valeur attendue (EV) théorique est de 0,52 × 2,00 − 1 = +4 %. À 1,90, l'EV devient 0,52 × 1,90 − 1 = −1,2 %. L'estimation de probabilité est inchangée, mais la cote plus courte modifie la conclusion.",
        "Cela illustre pourquoi une bonne prédiction ne suffit pas en soi. Le prix détermine si l'estimation de probabilité se traduit par une valeur attendue positive, neutre ou négative."
      ],
      callout: {
        title: "La marge modifie le seuil",
        body:
          "Une cote plus basse nécessite un taux de victoire plus élevé pour atteindre le seuil de rentabilité. C'est pourquoi la qualité de la cote compte indépendamment de la qualité de la prédiction.",
        tone: "info",
      },
    },
    {
      id: "market-types",
      heading: "La marge peut varier selon les sports et les types de marchés",
      paragraphs: [
        "La marge des bookmakers n'est pas fixe pour chaque sport ou marché. Les événements majeurs à forte liquidité peuvent présenter des cotes relativement compétitives, tandis que les ligues de niche, les marchés dérivés, les paris spéciaux ou les événements à faible liquidité peuvent avoir des marges plus larges.",
        "Même au sein d'un même match, le marché principal du moneyline ou du vainqueur du match peut avoir un overround différent de celui des totaux, des handicaps, des paris sur les joueurs ou des marchés de score exact. Les marchés comportant de nombreux résultats possibles peuvent également accumuler un overround total substantiel.",
        "Pour cette raison, comparer un chiffre de marge unique entre des types de marchés sans rapport peut être trompeur. La comparaison la plus utile se fait généralement entre des bookmakers proposant le même marché sur le même événement à peu près au même moment."
      ],
    },
    {
      id: "changing-margin",
      heading: "Pourquoi l'overround peut changer avant un match",
      paragraphs: [
        "Les marchés sont dynamiques. À l'approche d'un match, de nouvelles informations peuvent arriver, la liquidité peut augmenter, les bookmakers concurrents peuvent modifier leurs cotes et les bookmakers peuvent ajuster leur exposition au risque. L'overround total du marché peut donc changer au fil du temps.",
        "Pour certains événements très médiatisés, la tarification peut devenir plus compétitive à mesure que le marché arrive à maturité. Dans d'autres situations, l'incertitude ou des décisions opérationnelles peuvent conduire à des cotes plus larges. Il n'existe aucune règle universelle selon laquelle la marge doit toujours diminuer à l'approche du coup d'envoi.",
        "Un calcul de marge est donc un instantané basé sur les cotes utilisées à ce moment précis. L'overround historique et l'overround actuel ne doivent pas être considérés comme interchangeables."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Erreurs courantes lors de l'interprétation de la marge des bookmakers",
      paragraphs: [
        "Une erreur courante consiste à traiter l'overround comme le pourcentage de profit garanti du bookmaker. Ce n'est pas le cas. Une autre consiste à supposer que les probabilités implicites brutes sont des probabilités équitables. Il s'agit de seuils de rentabilité dérivés des prix qui incluent généralement une marge.",
        "Une troisième erreur consiste à comparer l'overround entre des marchés ayant des structures de résultats différentes sans contexte. Un marché de match à trois issues, un marché de totaux à deux issues et un marché de score exact ne sont pas directement comparables simplement parce que chacun produit un pourcentage de marge unique.",
        "Enfin, supprimer la marge ne supprime pas l'incertitude. Une estimation de marché sans marge (no-vig) peut toujours être erronée, obsolète ou incomplète. Il s'agit d'un indicateur analytique utile, et non d'une garantie de la véritable distribution de probabilité de l'événement."
      ],
      bullets: [
        "N'interprétez pas l'overround comme un profit garanti pour le bookmaker.",
        "Ne qualifiez pas automatiquement les probabilités implicites brutes de justes.",
        "Ne supposez pas que la marge est répartie uniformément entre les résultats.",
        "Ne comparez pas des types de marchés sans rapport sans contexte.",
        "Ne traitez pas les probabilités sans marge comme certaines ou objectivement vraies.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Comment la marge s'intègre dans l'analyse MatchSignal",
      paragraphs: [
        "MatchSignal compare les prix des bookmakers et les données de marché pour fournir un contexte autour des sélections actuelles. La moyenne du marché résume la tarification du marché échantillonné, tandis que la probabilité juste est une estimation de probabilité analytique plutôt qu'un pourcentage implicite brut du bookmaker.",
        "L'avantage de valeur (Value Edge) est destiné à décrire la relation entre le prix du marché disponible et l'évaluation basée sur la probabilité de MatchSignal. Étant donné que les prix des bookmakers peuvent inclure une marge, une analyse utile doit distinguer le prix brut disponible pour l'utilisateur de toute estimation de probabilité sans marge ou basée sur un modèle.",
        "Les livres échantillonnés indiquent combien de sources de bookmakers ont contribué à l'échantillon de marché pertinent. Un échantillon plus large peut fournir plus de contexte sur la tarification du marché, mais il ne supprime pas l'incertitude et ne garantit pas que l'estimation résultante est correcte.",
        "Les meilleures cotes reflètent le prix partenaire disponible le plus fort identifié pour la sélection affichée. Étant donné que le prix d'exécution réel détermine la probabilité de seuil de rentabilité, même une différence modeste entre les bookmakers peut affecter le calcul de la valeur."
      ],
      callout: {
        title: "Le prix du marché et la probabilité analytique sont différents",
        body:
          "MatchSignal sépare les prix disponibles de l'analyse basée sur les probabilités afin que les utilisateurs puissent examiner la relation plutôt que de traiter les cotes des bookmakers comme une certitude.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Une liste de contrôle pratique pour l'overround",
      paragraphs: [
        "Lors de l'examen de la marge des bookmakers, utilisez la séquence suivante pour éviter les erreurs d'interprétation les plus courantes."
      ],
      bullets: [
        "Identifiez tous les résultats mutuellement exclusifs sur le marché exact.",
        "Convertissez chaque cote décimale indiquée en probabilité implicite.",
        "Additionnez les probabilités implicites brutes.",
        "Soustrayez 100 % pour calculer l'overround du marché.",
        "Si nécessaire, normalisez les probabilités pour créer une référence simple sans marge.",
        "N'oubliez pas que la normalisation proportionnelle est une hypothèse, et non une vérité absolue.",
        "Comparez des marchés équivalents entre différents bookmakers à des moments similaires.",
        "Utilisez les cotes réellement disponibles lors du calcul de la probabilité de seuil de rentabilité et de l'EV.",
        "Considérez un overround plus faible comme un avantage tarifaire, et non comme une garantie de meilleures prédictions.",
      ],
    },
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "implied-probability",
    "expected-value-sports-betting",
    "how-to-compare-betting-odds",
    "why-betting-odds-move",
  ],
  responsibleGamblingNote:
    "Comprendre la marge des bookmakers peut vous aider à évaluer les cotes plus clairement, mais une marge plus faible ou de meilleures cotes ne suppriment pas le risque financier lié aux paris. Les résultats restent incertains, les estimations de probabilité peuvent être erronées et des pertes peuvent survenir même lorsqu'une cote semble favorable. Ne misez que des montants que vous pouvez vous permettre de perdre, utilisez des limites prédéterminées et ne cherchez jamais à récupérer vos pertes.",
};

export default guide;
