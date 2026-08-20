import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "ai-sports-betting-predictions",
  locale: "fr",
  title: "L'IA dans les paris sportifs : ce qu'elle peut et ne peut pas prédire",
  category: "ai-data",
  status: "published",
  description:
    "Découvrez ce que l'IA peut réellement accomplir dans l'analyse des paris sportifs, où les modèles de prédiction sont utiles, pourquoi la qualité et le calibrage des données sont importants, ce que l'IA ne peut pas savoir avec certitude, et comment utiliser les informations générées par l'IA sans les considérer comme des résultats garantis.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "L'intelligence artificielle peut traiter de vastes ensembles de données, comparer les prix du marché, identifier des modèles, résumer des informations contextuelles et produire des estimations basées sur des probabilités. Ces capacités peuvent rendre l'analyse sportive plus rapide et plus structurée. Elles ne rendent pas les événements sportifs déterministes. Un modèle d'IA ne peut pas connaître l'avenir, supprimer le hasard, garantir un profit ou compenser des données médiocres simplement en produisant une réponse confiante. La manière la plus utile de concevoir l'IA dans les paris sportifs est de la considérer comme une couche analytique : elle peut organiser les preuves, estimer des probabilités, comparer les prix et mettre en évidence l'incertitude, mais ses résultats restent dépendants de la qualité des données, des hypothèses du modèle, des conditions du marché et d'événements qui pourraient ne pas encore être connus.",
  keyTakeaways: [
    "L'IA peut traiter de grandes quantités de données sportives, de marché et contextuelles de manière plus cohérente qu'une recherche manuelle seule.",
    "L'IA peut estimer des probabilités et les comparer aux prix du marché, mais ces probabilités sont des estimations plutôt que des faits.",
    "Le calibrage du modèle compte davantage que le degré de confiance ou le niveau de détail d'une explication fournie par l'IA.",
    "Des données d'entrée médiocres, obsolètes, incomplètes ou biaisées peuvent produire de mauvaises prédictions, même lorsque le modèle est sophistiqué.",
    "L'IA ne peut pas prédire de manière fiable les événements aléatoires d'un match, les blessures futures inconnues, les décisions d'arbitrage ou toute autre information qui n'existe pas dans ses données d'entrée.",
    "Une explication sophistiquée générée par l'IA peut toujours être erronée ou hallucinée et ne doit pas être traitée comme une preuve indépendante.",
    "Les prix du marché contiennent des informations ; par conséquent, l'analyse par IA doit se comparer au marché plutôt que de l'ignorer.",
    "L'IA est plus utile en tant qu'outil d'aide à la décision qu'en tant que source de résultats de paris garantis.",
  ],
  sections: [
    {
      id: "what-ai-means",
      heading: "Ce que signifie réellement l'« analyse des paris sportifs par IA »",
      paragraphs: [
        "L'analyse des paris sportifs par IA est un terme large. Il peut faire référence à des modèles de prédiction statistique, des systèmes d'apprentissage automatique, des modèles de langage, des systèmes automatisés de comparaison de cotes, ou à des combinaisons de ces technologies.",
        "Différents systèmes d'IA résolvent différents problèmes. Un modèle statistique peut estimer la probabilité de victoire à partir de données de performance historiques. Un modèle de marché peut comparer les prix des bookmakers. Un modèle de langage peut résumer les blessures, les calendriers, le contexte tactique ou les résultats des modèles en explications lisibles.",
        "Ces fonctions ne doivent pas être confondues. Un modèle qui rédige une explication solide n'est pas nécessairement le modèle qui a généré la probabilité sous-jacente, et un modèle de probabilité ne comprend pas automatiquement chaque élément du contexte actuel.",
        "Évaluer un système d'IA nécessite donc de comprendre quelles données il utilise, quelle tâche il effectue et comment ses résultats sont validés."
      ],
      callout: {
        title: "L'IA n'est pas une méthode unique",
        body:
          "Les modèles de prédiction, les modèles de langage, les pipelines de données et les systèmes de comparaison de cotes peuvent tous être qualifiés d'IA, mais ils ont des forces et des modes de défaillance différents.",
        tone: "info",
      },
    },
    {
      id: "what-ai-can-do",
      heading: "Ce que l'IA peut bien faire",
      paragraphs: [
        "L'IA est particulièrement utile lorsqu'une tâche implique de traiter de nombreuses variables de manière répétée et cohérente.",
        "Un modèle peut analyser les performances historiques, la force des équipes, les statistiques des joueurs, le calendrier, les prix du marché et d'autres caractéristiques structurées beaucoup plus rapidement qu'une personne ne peut examiner manuellement des milliers d'événements.",
        "Les systèmes automatisés peuvent également appliquer les mêmes calculs sur de nombreux marchés sans se fatiguer, se laisser distraire ou s'attacher émotionnellement à une équipe favorite.",
        "Lorsqu'elles sont combinées à de bonnes données et à une validation disciplinée, ces capacités peuvent rendre l'estimation des probabilités et la comparaison des marchés plus systématiques."
      ],
      bullets: [
        "Traiter de grands ensembles de données structurées.",
        "Comparez les cotes actuelles chez plusieurs bookmakers.",
        "Convertissez les cotes en probabilités implicites.",
        "Estimez les probabilités de résultats à partir de données historiques et contextuelles.",
        "Détectez des relations statistiques qui peuvent être difficiles à remarquer manuellement.",
        "Synthétisez de grandes quantités d'informations contextuelles.",
        "Appliquez les mêmes règles analytiques de manière cohérente sur de nombreux événements.",
      ],
    },
    {
      id: "probabilities-not-certainties",
      heading: "L'IA prédit des probabilités, pas des certitudes",
      paragraphs: [
        "Un modèle sportif bien conçu doit généralement être considéré comme un outil d'estimation de probabilités plutôt que comme un moyen de déclarer des résultats certains.",
        "Si un modèle attribue à une équipe 60 % de chances de gagner, cela implique toujours une probabilité de 40 % que l'équipe ne gagne pas selon les hypothèses du modèle.",
        "Une prévision correcte à 60 % doit donc perdre régulièrement. Les résultats perdants ne prouvent pas automatiquement que le modèle a échoué ; la question importante est de savoir si les événements auxquels des probabilités similaires ont été attribuées se produisent à la fréquence attendue sur un échantillon suffisamment large.",
        "C'est pourquoi des probabilités calibrées sont plus informatives que des étiquettes telles que « sûr », « coup sûr » ou « garanti »."
      ],
      callout: {
        title: "60 % signifie toujours incertitude",
        body:
          "Une estimation de probabilité doit communiquer le degré d'incertitude qui subsiste, et non masquer cette incertitude derrière une étiquette confiante.",
        tone: "warning",
      },
    },
    {
      id: "calibration",
      heading: "Pourquoi le calibrage est important",
      paragraphs: [
        "Le calibrage mesure si les probabilités prédites correspondent aux fréquences observées.",
        "Si un modèle étiquette de nombreux événements comparables à 70 %, environ 70 % de ces événements devraient se produire sur un échantillon suffisamment large et approprié si le modèle est bien calibré.",
        "Un modèle peut avoir un taux de réussite élevé tout en étant mal calibré si ses probabilités sont systématiquement trop extrêmes ou trop prudentes.",
        "Le calibrage est particulièrement important pour l'analyse de la valeur, car la valeur attendue dépend directement de l'estimation de la probabilité. Un modèle trop confiant peut créer des avantages apparents qui n'existent pas."
      ],
      bullets: [
        "Suivez les résultats par plage de probabilité prédite.",
        "Comparez les fréquences prédites avec les fréquences observées.",
        "Vérifiez le calibrage sur différents sports et types de marchés.",
        "Évitez de supposer qu'un résultat de calibrage s'applique de manière égale à chaque marché.",
      ],
    },
    {
      id: "data-quality",
      heading: "L'IA n'est aussi bonne que ses données",
      paragraphs: [
        "La qualité du modèle dépend fortement de la qualité des données d'entrée. Des données manquantes, obsolètes, incorrectes ou biaisées peuvent fausser la prédiction, même lorsque l'algorithme lui-même est sophistiqué.",
        "Les données sportives évoluent rapidement. Les blessures, les compositions d'équipe, les transferts, les changements d'entraîneur, les déplacements, la météo, les suspensions et le calendrier chargé peuvent rendre les informations anciennes moins pertinentes.",
        "Les données historiques peuvent également contenir des changements structurels. La performance d'une équipe sous un précédent entraîneur ou avec un effectif différent peut ne pas représenter son niveau actuel.",
        "Un système d'IA responsable doit donc traiter la fraîcheur et la couverture des données comme faisant partie de l'incertitude, plutôt que de supposer que chaque donnée d'entrée est également fiable."
      ],
      callout: {
        title: "Déchets en entrée, déchets en sortie.",
        body:
          "Un modèle complexe ne peut pas récupérer des informations manquantes, incorrectes ou fondamentalement non représentatives.",
        tone: "warning",
      },
    },
    {
      id: "unknown-future-events",
      heading: "Ce que l'IA ne peut pas savoir avant que cela n'arrive",
      paragraphs: [
        "De nombreux événements sportifs décisifs sont intrinsèquement inconnaissables avant le match.",
        "Un système d'IA ne peut pas savoir qu'un défenseur sera expulsé à la 12e minute, qu'un gardien commettra une erreur inhabituelle, qu'un joueur vedette se blessera pendant l'échauffement, ou qu'une décision arbitrale changera le cours du match.",
        "Il peut parfois estimer la probabilité de catégories d'événements, comme le risque de blessure ou la fréquence des cartons rouges, mais il ne peut pas identifier l'occurrence future exacte avec certitude.",
        "Cette incertitude irréductible est l'une des raisons pour lesquelles aucun modèle de prédiction ne peut garantir les résultats."
      ],
      bullets: [
        "Blessures inattendues.",
        "Cartons rouges et événements d'arbitrage inhabituels.",
        "Déviations et erreurs individuelles.",
        "Changements tactiques soudains.",
        "Modifications de dernière minute dans les compositions d'équipe non encore publiées.",
        "Changements météorologiques non présents dans les données.",
        "Événements rares difficiles à modéliser à partir d'échantillons historiques.",
      ],
    },
    {
      id: "randomness",
      heading: "Le sport contient une part d'aléa réel",
      paragraphs: [
        "Toute différence entre une prédiction et un résultat ne constitue pas un échec de modélisation. Le sport comporte une part d'aléa authentique.",
        "Une équipe de football peut dominer les expected goals et perdre 1-0. Une équipe de basket peut générer de bons tirs et les manquer. Un match de baseball peut basculer sur un rebond inhabituel. Un match de tennis peut se jouer sur quelques points à fort enjeu.",
        "Les modèles peuvent estimer des distributions autour de ces événements, mais ils ne peuvent pas supprimer l'aléa des résultats.",
        "C'est pourquoi évaluer l'IA sur la base de la réussite d'un pronostic individuel est statistiquement faible."
      ],
    },
    {
      id: "market-information",
      heading: "Pourquoi l'IA ne devrait pas ignorer le marché des paris",
      paragraphs: [
        "Les cotes des bookmakers et des plateformes d'échange agrègent des informations provenant de modèles, de traders, de parieurs et de sources d'actualité. Elles ne sont pas parfaites, mais elles sont informatives.",
        "Un système d'IA qui ignore totalement les prix du marché peut manquer des informations que d'autres participants ont déjà intégrées.",
        "Une approche plus utile consiste à comparer l'estimation de probabilité du modèle avec la probabilité implicite du marché. Cette comparaison constitue la base de l'analyse de valeur.",
        "Si le modèle est en fort désaccord avec le marché, ce désaccord peut représenter une opportunité, mais il peut aussi indiquer que le modèle manque d'informations. Les écarts importants méritent une enquête approfondie, et non une confiance automatique."
      ],
      callout: {
        title: "Le désaccord peut signifier un avantage ou une erreur",
        body:
          "Un écart entre le modèle et le marché mérite d'être examiné, mais le modèle ne doit pas automatiquement supposer que le marché a tort.",
        tone: "info",
      },
    },
    {
      id: "overfitting",
      heading: "Surapprentissage (Overfitting) : quand un modèle apprend trop bien le passé",
      paragraphs: [
        "Le surapprentissage se produit lorsqu'un modèle apprend des modèles qui correspondent extrêmement bien aux données historiques mais qui ne se généralisent pas aux événements futurs.",
        "Un modèle peut sembler impressionnant lors des tests rétrospectifs (backtesting) en capturant du bruit, des relations accidentelles ou des caractéristiques qui n'étaient pertinentes que pendant une période donnée.",
        "Lorsqu'ils sont déployés sur de nouveaux matchs, ces modèles peuvent disparaître et les performances peuvent se détériorer.",
        "Les tests hors échantillon, la validation temporelle, la régularisation et la sélection prudente de modèles aident à réduire le surapprentissage, mais aucun test ne supprime complètement le risque."
      ],
      bullets: [
        "Séparez les données d'entraînement et d'évaluation.",
        "Privilégiez la validation temporelle pour les données sportives de séries chronologiques.",
        "Évitez de choisir des modèles uniquement parce qu'ils maximisent les profits historiques.",
        "Vérifiez si la performance persiste à travers différentes saisons et conditions de marché.",
      ],
    },
    {
      id: "data-leakage",
      heading: "La fuite de données peut créer des backtests irréalistes",
      paragraphs: [
        "La fuite de données se produit lorsque des informations qui n'auraient pas été connues au moment de la prédiction sont accidentellement intégrées à l'entraînement ou à l'évaluation du modèle.",
        "Par exemple, utiliser les prix de clôture pour évaluer une prédiction qui est censée avoir eu lieu des heures plus tôt peut introduire des informations futures sur le marché. L'utilisation de statistiques d'après-match dans les caractéristiques est une forme de fuite encore plus évidente.",
        "La fuite peut rendre un modèle beaucoup plus précis qu'il ne le serait dans une utilisation réelle.",
        "Une évaluation fiable doit recréer les informations qui étaient réellement disponibles au moment où la prédiction aurait été faite."
      ],
      callout: {
        title: "Les backtests doivent respecter le temps",
        body:
          "Si le modèle voit des informations provenant du futur, la performance historique n'est pas une estimation réaliste de la performance en direct.",
        tone: "warning",
      },
    },
    {
      id: "concept-drift",
      heading: "Les modèles sportifs peuvent devenir obsolètes",
      paragraphs: [
        "Les relations apprises par un modèle peuvent changer au fil du temps. C'est ce qu'on appelle parfois la dérive conceptuelle.",
        "Les changements de règles, les tendances tactiques, la composition des effectifs, les formats de calendrier, l'équipement, les normes d'arbitrage et le comportement du marché peuvent tous modifier l'environnement statistique.",
        "Un modèle entraîné sur plusieurs anciennes saisons peut donc devenir moins représentatif du sport actuel.",
        "Un suivi et un réentraînement continus peuvent aider, mais les mises à jour doivent être validées avec soin, car réagir trop rapidement aux résultats récents peut créer une autre forme de surapprentissage."
      ],
    },
    {
      id: "language-models",
      heading: "Ce que les modèles de langage apportent — et où ils peuvent échouer",
      paragraphs: [
        "Les grands modèles de langage sont utiles pour transformer des données structurées et des informations contextuelles en analyses lisibles. Ils peuvent résumer le contexte d'un match, expliquer des probabilités, identifier des facteurs pertinents et rendre des informations complexes plus faciles à examiner.",
        "Cependant, les modèles de langage peuvent halluciner : ils peuvent produire des informations qui semblent plausibles mais qui sont incorrectes, non étayées ou inventées.",
        "Ils peuvent également surestimer leur confiance ou créer un récit cohérent autour de données bruitées. Un langage fluide ne doit donc pas être confondu avec une précision prédictive.",
        "Lorsque des modèles de langage sont utilisés dans un pipeline d'analyse de paris, les champs numériques importants doivent être validés, bornés, recoupés ou calculés indépendamment lorsque cela est possible."
      ],
      callout: {
        title: "Fluidité n'est pas synonyme de véracité",
        body:
          "Une explication convaincante générée par une IA peut contenir des erreurs. Les résultats numériques et factuels doivent être validés par rapport à des données fiables.",
        tone: "warning",
      },
    },
    {
      id: "explainability",
      heading: "Pourquoi l'explicabilité est utile",
      paragraphs: [
        "La probabilité seule peut être difficile à croire ou à contester. Les explications aident les utilisateurs à comprendre quelles informations ont contribué à la vision d'un modèle.",
        "Des explications utiles peuvent mettre en évidence les blessures, la forme, les mouvements du marché, les données de confrontation ou l'incertitude. Elles permettent d'identifier plus facilement quand un modèle peut s'appuyer sur des hypothèses faibles ou obsolètes.",
        "L'explicabilité ne prouve pas que le modèle est correct. Une explication peut être convaincante même lorsque l'estimation sous-jacente est erronée.",
        "Sa véritable valeur réside dans l'auditabilité : les utilisateurs et les développeurs peuvent inspecter le raisonnement et identifier les hypothèses qui méritent une vérification plus approfondie."
      ],
    },
    {
      id: "ai-vs-human",
      heading: "IA contre analyse humaine",
      paragraphs: [
        "L'IA et les analystes humains ont des forces différentes.",
        "L'IA peut traiter davantage de données, appliquer des calculs de manière cohérente et éviter certains biais émotionnels. Les humains peuvent comprendre un contexte qui peut être difficile à encoder, remarquer des problèmes de qualité des données, remettre en question des résultats inhabituels et reconnaître lorsqu'un modèle fonctionne en dehors de conditions familières.",
        "Le jugement humain est cependant aussi biaisé. Les fans peuvent surestimer leurs équipes favorites, se focaliser sur la forme récente ou interpréter les preuves de manière sélective.",
        "Un flux de travail solide utilise l'IA pour structurer l'information et les humains pour remettre en question les hypothèses, plutôt que de considérer l'une ou l'autre partie comme infaillible."
      ],
      bullets: [
        "Force de l'IA : échelle et cohérence.",
        "Faiblesse de l'IA : dépendance aux données et aux hypothèses du modèle.",
        "Force humaine : jugement contextuel et détection d'anomalies.",
        "Faiblesse humaine : émotion, mémoire sélective et biais cognitif.",
      ],
    },
    {
      id: "value-analysis",
      heading: "Comment l'IA peut soutenir l'analyse de valeur",
      paragraphs: [
        "Une utilisation pratique de l'IA consiste à comparer une probabilité estimée avec la probabilité de seuil de rentabilité implicite des cotes disponibles.",
        "Supposons qu'un modèle estime une sélection à 54 % et qu'un bookmaker propose une cote de 2,00, ce qui implique une probabilité de seuil de rentabilité de 50 %. Selon l'estimation du modèle, le prix présente une valeur attendue théorique positive.",
        "Mais la conclusion dépend entièrement de l'estimation de 54 %. Si la probabilité réelle est de 49 %, le même prix n'est pas attractif.",
        "L'IA peut donc identifier des relations de valeur potentielles, mais le résultat doit être interprété en tenant compte de l'incertitude du modèle, du contexte du marché et de la qualité des données."
      ],
      callout: {
        title: "L'IA peut estimer un avantage, pas le garantir.",
        body:
          "Un calcul de valeur peut être mathématiquement correct alors que l'estimation de probabilité sous-jacente est erronée.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal",
      heading: "Comment MatchSignal utilise l'IA",
      paragraphs: [
        "MatchSignal combine la tarification actuelle des bookmakers avec le contexte de match généré par l'IA et une analyse basée sur les probabilités. La plateforme utilise des champs structurés tels que Probabilité Juste, Avantage de Valeur, Niveau de Risque, Moyenne du Marché, Meilleures Cotes et Livres Échantillonnés pour faciliter l'examen de la relation entre les prix du marché et les estimations analytiques.",
        "La Probabilité Juste est une estimation plutôt qu'une déclaration de certitude. L'Avantage de Valeur décrit la relation entre cette évaluation de probabilité et la tarification disponible. Le Niveau de Risque fournit un contexte de risque comparatif plutôt qu'une garantie de succès.",
        "Le système est conçu pour utiliser les informations du marché parallèlement à l'analyse par IA plutôt que de demander à l'IA de prédire les résultats de manière isolée.",
        "MatchSignal doit donc être compris comme une plateforme d'aide à la décision. Son rôle est d'organiser les informations du marché et les analyses, et non de promettre des paris gagnants."
      ],
      callout: {
        title: "Propulsé par l'IA ne signifie pas résultat garanti.",
        body:
          "MatchSignal utilise l'IA pour soutenir une analyse structurée. L'incertitude sportive, l'erreur de modèle et les mouvements du marché restent présents.",
        tone: "info",
      },
    },
    {
      id: "what-ai-cannot-do",
      heading: "Ce que l'IA ne peut pas faire de manière fiable",
      paragraphs: [
        "Certaines affirmations concernant la prédiction sportive par IA vont au-delà de ce que les modèles probabilistes peuvent soutenir de manière réaliste.",
        "L'IA ne peut pas garantir de profit, connaître chaque blessure future, éliminer la variance, rendre une série de pertes impossible ou produire une probabilité réelle parfaite pour chaque match.",
        "Elle ne peut pas non plus rendre des cotes médiocres attrayantes simplement en prédisant la même équipe avec plus de confiance. Le prix reste une partie intégrante de la décision.",
        "Toute plateforme suggérant que l'IA élimine l'incertitude des paris doit être traitée avec scepticisme."
      ],
      bullets: [
        "Garantir des paris gagnants.",
        "Garantir un profit à long terme.",
        "Prédire chaque blessure ou carton rouge.",
        "Éliminer la variance.",
        "Connaître des informations qui ne se sont pas encore produites ou qui n'ont pas encore été observées.",
        "Transformer un mauvais prix en un bon prix par la seule confiance.",
        "Supprimer le besoin de contrôles de bankroll et de jeu responsable.",
      ],
    },
    {
      id: "evaluation",
      heading: "Comment évaluer un modèle de pari par IA",
      paragraphs: [
        "Une évaluation utile va au-delà du simple taux de réussite global.",
        "Vérifiez le calibrage, les performances hors échantillon, les cotes moyennes, le type de marché, la taille de l'échantillon, la qualité des prix, la stabilité du modèle et si le test a utilisé des informations qui auraient réellement été disponibles en temps réel.",
        "Examinez également les modes de défaillance. Le modèle est-il peu performant sur les marchés à faible liquidité ? La précision diminue-t-elle lorsque la présence de joueurs clés est incertaine ? Devient-il trop confiant sur les favoris ?",
        "Une évaluation transparente d'un modèle doit rendre les faiblesses visibles plutôt que de mettre en avant uniquement la période la plus performante."
      ],
      bullets: [
        "Calibrage des probabilités.",
        "Tests hors échantillon.",
        "Validation temporelle.",
        "Taille de l'échantillon.",
        "Cotes moyennes et taux de rentabilité.",
        "Performance par sport et par marché.",
        "Fraîcheur des données.",
        "Sensibilité aux informations manquantes.",
        "Comparaison avec les références du marché.",
      ],
    },
    {
      id: "checklist",
      heading: "Une liste de contrôle pratique pour utiliser l'analyse de paris par IA",
      paragraphs: [
        "L'IA est plus utile lorsqu'elle devient une partie d'un processus structuré plutôt que l'autorité finale."
      ],
      bullets: [
        "Vérifiez sur quelles données l'analyse par IA est basée.",
        "Traitez la probabilité comme une estimation, pas comme une certitude.",
        "Comparez l'estimation avec les cotes actuelles du marché.",
        "Vérifiez si les informations importantes sur l'équipe ou le joueur sont à jour.",
        "Soyez sceptique face aux désaccords inhabituellement importants entre le modèle et le marché.",
        "Ne faites pas confiance à une affirmation simplement parce que l'explication semble assurée.",
        "Prenez en compte le calibrage et les performances historiques hors échantillon.",
        "Recalculez la valeur si le prix du marché évolue.",
        "Gardez la gestion des mises séparée des étiquettes de confiance de l'IA.",
        "N'interprétez jamais les résultats de l'IA comme une garantie de profit.",
      ],
    },
  ],
  relatedGuides: [
    "matchsignal-value-edge",
    "expected-value-sports-betting",
    "implied-probability",
    "why-betting-odds-move",
    "cognitive-biases-sports-betting",
    "confirmation-bias-betting",
  ],
  responsibleGamblingNote:
    "L'IA peut appuyer l'analyse sportive, mais elle ne peut garantir ni les résultats ni les profits. Les estimations des modèles peuvent être erronées, les données peuvent être incomplètes et les résultats sportifs demeurent incertains. N'augmentez pas vos mises parce qu'un résultat d'IA semble confiant. Maintenez vos paris dans les limites prédéterminées de dépenses, de pertes et de temps, ne pariez que des montants que vous pouvez vous permettre de perdre et ne cherchez jamais à récupérer vos pertes.",
};

export default guide;
