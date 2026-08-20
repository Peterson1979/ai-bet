import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "matchsignal-value-edge",
  locale: "fr",
  title: "Comment MatchSignal calcule le Value Edge",
  category: "value-analysis",
  status: "published",
  description:
    "Découvrez comment MatchSignal calcule et interprète le Value Edge, comment la probabilité équitable (Fair Probability) et les cotes décimales proposées se combinent pour estimer la valeur, pourquoi le Value Edge diffère de la différence de points de probabilité (valueDiff), et pourquoi un signal positif n'est pas une garantie de profit.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Le Value Edge de MatchSignal est conçu pour montrer à quel point un prix disponible semble favorable par rapport à l'évaluation basée sur la probabilité de la plateforme. Sur la MatchCard, le Value Edge est représenté par le champ estimatedValuePct. Lorsque MatchSignal dispose d'une probabilité équitable et d'un prix partenaire disponible, la relation mathématique est la même formule de valeur attendue utilisée dans toute analyse de paris : le pourcentage de valeur estimée est égal à la probabilité équitable exprimée en nombre décimal multipliée par la cote décimale proposée, moins un, puis multipliée par 100. Le pipeline de production peut également accepter un estimatedValuePct explicite généré par l'IA lorsque ce champ est renvoyé par la couche d'analyse ; sinon, il revient au calcul de la valeur à partir de la probabilité équitable et des cotes partenaires disponibles. Cela fait du Value Edge un signal basé sur le modèle et le prix, et non une promesse concernant le résultat du prochain match.",
  keyTakeaways: [
    "L'affichage du Value Edge sur la MatchCard utilise le champ estimatedValuePct.",
    "Le chemin de calcul à partir de la probabilité et du prix est : ((Probabilité équitable / 100) × cote décimale proposée − 1) × 100.",
    "Un Value Edge positif signifie que le prix est favorable par rapport à l'estimation de probabilité équitable utilisée par MatchSignal.",
    "Un Value Edge nul signifie que les cotes proposées correspondent approximativement au prix d'équilibre impliqué par la probabilité équitable.",
    "Un Value Edge négatif signifie que le prix proposé est plus bas que ce que l'estimation de probabilité exigerait pour atteindre le seuil de rentabilité.",
    "Le valueDiff de MatchSignal est une mesure différente : il s'agit d'un écart en points de probabilité, ce qui n'est pas la même chose que le pourcentage de rendement estimé.",
    "Le pipeline d'analyse quotidien peut conserver un estimatedValuePct explicite généré par l'IA ; s'il est absent, MatchSignal peut calculer la valeur à partir de la probabilité équitable et des cotes des partenaires.",
    "Un Value Edge positif est une estimation analytique et ne garantit pas un pari gagnant ou un profit réalisé.",
  ],
  sections: [
    {
      id: "what-value-edge-is",
      heading: "Ce que MatchSignal entend par Value Edge",
      paragraphs: [
        "Sur une MatchCard de MatchSignal, l'étiquette Value Edge est la présentation destinée à l'utilisateur de estimatedValuePct. Ce chiffre vise à décrire la relation entre la Probabilité Juste (Fair Probability) de MatchSignal pour la sélection affichée et la cote disponible pour cette sélection.",
        "La question fondamentale n'est pas simplement de savoir si MatchSignal considère qu'un résultat est probable. Il s'agit de déterminer si les cotes proposées sont suffisamment élevées par rapport à cette estimation de probabilité.",
        "Cette distinction est importante car une même prédiction peut être intéressante à un prix donné et peu attrayante à un autre. Une sélection évaluée à 55 % n'est pas automatiquement avantageuse. À une cote de 2,00, elle présente une valeur théorique positive ; à 1,70, ce n'est pas le cas.",
        "Value Edge appartient donc à la couche de tarification de l'analyse. Il combine un jugement de probabilité avec le prix observable sur le marché."
      ],
      callout: {
        title: "Value Edge est une mesure de prix et de probabilité.",
        body:
          "Il ne doit pas être interprété comme une affirmation de MatchSignal selon laquelle une équipe est un vainqueur certain. La même sélection peut avoir un Value Edge différent selon les cotes.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "La formule fondamentale du Value Edge",
      paragraphs: [
        "Lorsque MatchSignal calcule la valeur estimée à partir de la Probabilité Juste et des cotes proposées, la formule est : Value Edge % = ((Probabilité Juste / 100) × Cote Décimale Proposée − 1) × 100.",
        "Il s'agit de la relation standard de rendement attendu pour un résultat simple de type gain ou perte, exprimée en pourcentage d'une unité misée.",
        "Le code convertit la Probabilité Juste d'un pourcentage en un nombre décimal, le multiplie par la cote décimale proposée, soustrait 1 et reconvertit le résultat en pourcentage.",
        "Le chiffre obtenu répond à une question théorique : si l'estimation de la Probabilité Juste était correcte et que la même relation probabilité-prix pouvait être répétée de nombreuses fois, quel rendement moyen par rapport à la mise cette relation impliquerait-elle ?"
      ],
      bullets: [
        "Convertir la Probabilité Juste de pourcentage en décimal.",
        "Multiplier par les cotes décimales proposées.",
        "Soustraire 1.",
        "Multiplier par 100 pour exprimer le résultat en pourcentage.",
      ],
      callout: {
        title: "Formule",
        body:
          "Value Edge % = ((Probabilité Juste / 100) × Cotes Proposées − 1) × 100.",
        tone: "example",
      },
    },
    {
      id: "worked-example",
      heading: "Un exemple concret de Value Edge avec MatchSignal",
      paragraphs: [
        "Supposons que MatchSignal attribue une Probabilité Juste de 55 % à une sélection et que les cotes partenaires proposées sont de 2,00.",
        "Convertissez 55 % en 0,55. Multipliez 0,55 par 2,00 pour obtenir 1,10. Soustrayez 1 pour obtenir 0,10. Multipliez par 100 et le Value Edge estimé est de +10 %.",
        "Maintenant, gardez la même Probabilité Juste mais changez le prix proposé à 1,80. Le calcul devient 0,55 × 1,80 − 1 = −0,01, soit environ −1 %.",
        "Rien n'a changé concernant la Probabilité Juste. Seul le prix disponible a changé. C'est pourquoi la comparaison des prix peut modifier sensiblement la relation de valeur affichée."
      ],
      bullets: [
        "Probabilité Juste : 55 %.",
        "Cotes Proposées : 2,00.",
        "Calcul : 0,55 × 2,00 − 1 = 0,10.",
        "Avantage de valeur : +10 %.",
        "À une cote de 1,80 avec la même probabilité de 55 % : environ −1 %.",
      ],
    },
    {
      id: "break-even",
      heading: "Avantage de valeur et probabilité de seuil de rentabilité",
      paragraphs: [
        "La même relation peut être comprise via la probabilité de seuil de rentabilité. Une cote décimale de 2,00 nécessite un taux de victoire de 50 % pour atteindre le seuil de rentabilité avant les frictions pratiques. Une cote de 1,80 nécessite environ 55,56 %.",
        "Si la probabilité juste de MatchSignal est supérieure à la probabilité de seuil de rentabilité impliquée par le prix disponible, l'avantage de valeur calculé est positif. Si la probabilité juste est inférieure à ce seuil, l'avantage de valeur est négatif.",
        "C'est pourquoi un avantage de valeur positif ne signifie pas simplement que « MatchSignal aime l'équipe ». Cela signifie que l'estimation de probabilité est suffisamment élevée par rapport au prix proposé pour impliquer une valeur théorique positive.",
        "Une sélection peut avoir une probabilité juste élevée et avoir tout de même un avantage de valeur négatif si le prix du marché est trop bas."
      ],
      callout: {
        title: "La probabilité seule ne constitue pas une valeur",
        body:
          "La valeur n'apparaît que lorsque l'estimation de probabilité est comparée au prix réellement proposé.",
        tone: "warning",
      },
    },
    {
      id: "fair-probability",
      heading: "Où la probabilité juste s'intègre dans le calcul",
      paragraphs: [
        "La probabilité juste est l'entrée de probabilité utilisée dans la relation de valeur. Dans le pipeline de prédiction quotidien, une probabilité juste fournie par l'IA peut être utilisée directement après validation numérique et délimitation.",
        "Si une probabilité équitable (Fair Probability) explicite par IA n'est pas disponible, le pipeline contient une logique de repli capable de dériver une estimation de probabilité à partir d'informations de marché telles que le consensus du marché et la probabilité implicite associée à la cote.",
        "Cela signifie que la probabilité équitable n'est pas simplement une autre étiquette pour la probabilité implicite brute des cotes d'un bookmaker. Il s'agit d'une donnée analytique utilisée pour évaluer la cote.",
        "Étant donné que l'estimation de probabilité peut être erronée ou incertaine, l'avantage de valeur (Value Edge) qui en découle hérite également de cette incertitude."
      ],
      callout: {
        title: "L'entrée de probabilité importe plus que la précision décimale.",
        body:
          "Un avantage de valeur parfaitement calculé peut tout de même être trompeur si l'estimation de la probabilité équitable est inexacte.",
        tone: "warning",
      },
    },
    {
      id: "explicit-ai-value",
      heading: "Pourquoi le pipeline peut utiliser une estimation de valeur explicite par IA",
      paragraphs: [
        "La couche d'analyse quotidienne de MatchSignal peut renvoyer un estimatedValuePct explicite ainsi qu'une probabilité équitable et d'autres champs analytiques.",
        "Lorsqu'un estimatedValuePct explicite valide est présent, le pipeline quotidien conserve cette valeur plutôt que de la remplacer automatiquement par une valeur nouvellement calculée. Lorsque le champ explicite est absent, le pipeline peut calculer la valeur estimée à partir de la probabilité équitable et des cotes des partenaires.",
        "Ceci est important lors de l'interprétation technique de la plateforme : l'avantage de valeur n'est pas toujours produit par un seul chemin de code. Il s'agit d'un champ analytique normalisé avec un chemin fourni par l'IA et un chemin de repli mathématique.",
        "La couche de prompt instruit également l'analyse d'être conservatrice concernant la probabilité équitable et la valeur estimée, et de renvoyer null lorsque l'avantage n'est pas clair. Cette conception vise à éviter de fabriquer une confiance numérique lorsque les preuves disponibles ne la soutiennent pas."
      ],
      callout: {
        title: "Deux chemins, un champ affiché",
        body:
          "La MatchCard affiche estimatedValuePct en tant qu'avantage de valeur, que la valeur valide provienne de la couche d'analyse ou du calcul de repli basé sur la probabilité et les cotes.",
        tone: "info",
      },
    },
    {
      id: "value-diff",
      heading: "Value Edge n'est pas la même chose que valueDiff",
      paragraphs: [
        "MatchSignal contient également un champ valueDiff. Il est facile de le confondre avec Value Edge car les deux décrivent un écart entre une évaluation de probabilité et un prix du marché.",
        "Les deux indicateurs utilisent des unités différentes. estimatedValuePct est un pourcentage de type rendement attendu basé sur la probabilité multipliée par les cotes décimales. valueDiff est une différence en points de pourcentage entre la probabilité juste (Fair Probability) et la probabilité implicite associée au prix concerné.",
        "Par exemple, si la probabilité juste est de 55 % et que le prix du partenaire implique 50 %, valueDiff est de +5 points de pourcentage. À une cote de 2,00, estimatedValuePct est de +10 %. Ces chiffres décrivent des concepts liés mais ne sont pas interchangeables.",
        "L'affichage Value Edge de la MatchCard utilise estimatedValuePct. Traiter valueDiff comme s'il s'agissait d'un rendement attendu fausserait donc la signification du chiffre."
      ],
      bullets: [
        "estimatedValuePct : pourcentage de valeur de type rendement.",
        "valueDiff : différence en points de probabilité.",
        "Les deux peuvent être positifs en même temps.",
        "Leurs valeurs numériques n'ont pas besoin de correspondre.",
      ],
      callout: {
        title: "Ne mélangez pas les pourcentages et les points de pourcentage",
        body:
          "Un écart de probabilité de +5 points de pourcentage n'est pas la même mesure qu'un rendement estimé de +5 %.",
        tone: "warning",
      },
    },
    {
      id: "best-odds",
      heading: "Pourquoi les meilleures cotes sont importantes pour Value Edge",
      paragraphs: [
        "Le prix utilisé dans un calcul de valeur modifie directement le résultat. Pour une même probabilité équitable, des cotes décimales équivalentes plus élevées produisent un avantage de valeur plus important.",
        "Si la probabilité équitable est de 52 %, une cote de 1,90 implique environ −1,2 % de valeur, une cote de 2,00 implique +4 % et une cote de 2,10 implique +9,2 %.",
        "C'est pourquoi MatchSignal présente les meilleures cotes aux côtés de l'avantage de valeur. Le prix disponible le plus avantageux et réellement équivalent peut améliorer sensiblement le rapport de valeur.",
        "La comparaison doit toujours se faire à caractéristiques égales. Un prix plus élevé sur un handicap, un total, une règle de règlement ou un marché différent ne constitue pas un remplacement valide pour la sélection affichée."
      ],
      bullets: [
        "52 % à 1,90 → environ −1,2 %.",
        "52 % à 2,00 → environ +4,0 %.",
        "52 % à 2,10 → environ +9,2 %.",
      ],
    },
    {
      id: "market-average",
      heading: "Comment la moyenne du marché et les bookmakers échantillonnés ajoutent du contexte",
      paragraphs: [
        "L'avantage de valeur est plus utile lorsqu'il est examiné avec les autres champs de la MatchCard plutôt que de manière isolée.",
        "La moyenne du marché résume la tarification des bookmakers échantillonnés, aidant à montrer si l'offre affichée diffère du marché plus large. Les bookmakers échantillonnés fournissent un contexte sur le nombre de sources de bookmakers ayant contribué à l'échantillon de marché pertinent.",
        "Un prix partenaire plus fort par rapport au marché échantillonné peut améliorer l'économie disponible pour l'utilisateur, mais le nombre de bookmakers échantillonnés ne prouve pas en soi que la probabilité équitable est correcte.",
        "Ces champs décrivent le contexte du marché. Ils n'éliminent pas l'erreur de modèle, la marge des bookmakers, les prix obsolètes ou la variance sportive ordinaire."
      ],
    },
    {
      id: "fair-odds",
      heading: "Les cotes justes sont la version prix de la probabilité juste.",
      paragraphs: [
        "MatchSignal peut également convertir la probabilité juste en cotes justes. Conceptuellement, les cotes décimales justes sont égales à 1 divisé par la probabilité juste exprimée sous forme décimale.",
        "Une probabilité juste de 50 % correspond à des cotes justes de 2,00. Une probabilité juste de 40 % correspond à 2,50. Une probabilité juste de 60 % correspond à environ 1,67.",
        "Cela offre une autre façon d'interpréter la relation de l'avantage de valeur (Value Edge). Si les cotes proposées sont significativement plus élevées que les cotes justes impliquées par la probabilité analytique, le prix peut représenter une valeur estimée positive.",
        "Si les cotes proposées sont inférieures aux cotes justes, le prix exige une probabilité supérieure à ce que l'estimation soutient."
      ],
      bullets: [
        "Probabilité juste de 50 % → Cotes justes de 2,00.",
        "40 % → 2,50.",
        "60 % → environ 1,67.",
      ],
    },
    {
      id: "positive-zero-negative",
      heading: "Comment interpréter un avantage de valeur positif, nul et négatif",
      paragraphs: [
        "Un avantage de valeur positif signifie que la relation probabilité-prix implique un rendement théorique supérieur à zéro selon l'estimation de probabilité utilisée.",
        "Un avantage de valeur proche de zéro signifie que le prix proposé est proche du prix d'équilibre impliqué par la probabilité juste.",
        "Un avantage de valeur négatif signifie que le prix actuellement proposé est plus bas que ce que l'estimation de probabilité soutient.",
        "Le signe est utile, mais l'ampleur ne doit pas être traitée comme une certitude. Un signal affiché de +6 % peut disparaître si la probabilité juste a été surestimée ou si les cotes disponibles diminuent."
      ],
      callout: {
        title: "L'avantage peut disparaître",
        body:
          "L'avantage de valeur (Value Edge) est sensible au facteur temps car les cotes évoluent, et sensible au modèle car la probabilité juste est une estimation.",
        tone: "warning",
      },
    },
    {
      id: "rounding",
      heading: "Arrondi et précision de l'affichage",
      paragraphs: [
        "Le calcul de la valeur est normalisé pour la précision de l'affichage plutôt que présenté avec un nombre illimité de décimales. Cela permet de garder les MatchCards lisibles et évite de suggérer une précision supérieure à celle que l'interface peut utiliser.",
        "Les utilisateurs ne doivent pas interpréter un dixième ou un centième de point de pourcentage comme une garantie significative d'une précision de prévision supérieure.",
        "Lorsque l'incertitude sous-jacente concernant la probabilité juste est de plusieurs points de pourcentage, une infime différence dans l'avantage de valeur affiché peut être économiquement moins importante que l'incertitude du modèle lui-même."
      ],
    },
    {
      id: "ranking",
      heading: "L'avantage de valeur est également utilisé comme signal de qualité",
      paragraphs: [
        "Au sein de MatchSignal, estimatedValuePct n'est pas seulement affiché à l'utilisateur. La logique de classement évalue également le chiffre de valeur parallèlement à d'autres informations telles que la probabilité juste, la couverture des bookmakers, l'écart, le consensus et le niveau de risque.",
        "Cela empêche la plateforme de traiter un chiffre de valeur brut comme le seul critère de qualité. Un avantage apparent important provenant d'un marché restreint ou incohérent mérite plus de prudence qu'un avantage de taille similaire soutenu par un contexte de marché plus large.",
        "La décision de qualité exacte est donc multifactorielle, même si le calcul de l'avantage de valeur lui-même possède une interprétation claire en termes de probabilité et de prix."
      ],
      callout: {
        title: "L'avantage de valeur est un signal, pas l'intégralité du classement",
        body:
          "MatchSignal prend également en compte la profondeur du marché, le contexte de probabilité, l'écart et le risque, plutôt que de classer les sélections uniquement selon l'avantage affiché le plus élevé.",
        tone: "info",
      },
    },
    {
      id: "not-guarantee",
      heading: "Pourquoi un avantage de valeur positif ne garantit pas de profit",
      paragraphs: [
        "La formule décrit l'espérance sous une probabilité estimée. Elle ne détermine pas ce qui se passera lors d'un événement sportif unique.",
        "Un avantage de valeur de +8 % peut perdre immédiatement. Une sélection à valeur négative peut gagner. La différence ne devient significative que dans le cadre d'une prise de décision répétée basée sur des estimations de probabilité suffisamment précises.",
        "L'erreur du modèle est une autre source de risque. Si MatchSignal estime un résultat à 55 % mais que la probabilité réelle est inférieure, l'avantage affiché peut être surestimé.",
        "Le mouvement du marché compte également. Si les cotes ayant généré un avantage positif ne sont plus disponibles, la valeur doit être recalculée en utilisant le prix actuel."
      ],
      callout: {
        title: "L'avantage de valeur n'est pas une prévision de profit",
        body:
          "Il s'agit d'une estimation basée sur un modèle de la qualité du prix dans un contexte d'incertitude, et non d'une promesse concernant le prochain pari ou la croissance future de la bankroll.",
        tone: "warning",
      },
    },
    {
      id: "example-sensitivity",
      heading: "Sensibilité : de faibles changements de probabilité peuvent avoir de l'importance",
      paragraphs: [
        "Supposons que les cotes proposées soient de 2,10. Avec une probabilité équitable de 50 %, l'avantage de valeur est de +5 %. À 48 %, il est d'environ +0,8 %. À 47 %, il devient environ -1,3 %.",
        "Seul un changement de trois points de pourcentage dans l'estimation de la probabilité fait passer le même prix d'un signal positif à un signal négatif.",
        "Cela démontre pourquoi l'incertitude du modèle doit être prise en compte parallèlement à l'avantage de valeur affiché. Plus l'avantage est faible, plus il est facile pour une erreur d'estimation normale d'inverser la conclusion.",
        "Pour une interprétation pratique, un utilisateur ne devrait pas seulement se demander 'Quel est l'avantage de valeur (Value Edge) ?' mais aussi 'Quelle est la robustesse de cet avantage si la probabilité équitable (Fair Probability) est légèrement erronée ?'"
      ],
      bullets: [
        "Cotes 2,10, probabilité équitable 50 % → +5,0 %.",
        "Cotes 2,10, probabilité équitable 48 % → environ +0,8 %.",
        "Cotes 2,10, probabilité équitable 47 % → environ −1,3 %.",
      ],
    },
    {
      id: "checklist",
      heading: "Comment lire un avantage de valeur (Value Edge) MatchSignal",
      paragraphs: [
        "Un avantage de valeur (Value Edge) doit être interprété conjointement avec le reste de la MatchCard et en gardant à l'esprit les limites de l'analyse probabiliste."
      ],
      bullets: [
        "Confirmez le marché et la sélection exacts.",
        "Considérez la probabilité équitable (Fair Probability) comme une estimation, et non comme une certitude.",
        "Vérifiez les meilleures cotes actuellement affichées.",
        "Utilisez la relation entre la probabilité et le prix pour comprendre l'avantage de valeur (Value Edge).",
        "Ne confondez pas l'avantage de valeur (Value Edge) avec l'écart de points de probabilité valueDiff.",
        "Examinez la moyenne du marché (Market Avg) et les bookmakers échantillonnés (Books Sampled) pour le contexte du marché.",
        "N'oubliez pas que les cotes peuvent changer après la génération de la carte.",
        "Traitez les faibles avantages avec prudence lorsque l'incertitude liée à la probabilité est élevée.",
        "N'utilisez pas un Value Edge plus important comme conseil automatique pour la définition de la mise.",
        "N'interprétez pas un Value Edge positif comme une garantie de gain.",
      ],
    },
  ],
  relatedGuides: [
    "expected-value-sports-betting",
    "implied-probability",
    "how-to-compare-betting-odds",
    "bookmaker-margin-overround",
    "why-betting-odds-move",
    "ai-sports-betting-predictions",
  ],
  responsibleGamblingNote:
    "Le Value Edge de MatchSignal est une estimation analytique basée sur la probabilité et le prix, et non une garantie de profit ou une recommandation d'augmenter les mises. Les estimations de probabilité peuvent être erronées, les cotes peuvent évoluer et tout pari peut être perdant. Maintenez vos mises dans des limites prédéterminées, ne pariez que des montants que vous pouvez vous permettre de perdre et ne cherchez jamais à récupérer vos pertes.",
};

export default guide;
