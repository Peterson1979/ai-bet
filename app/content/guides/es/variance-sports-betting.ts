import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "variance-sports-betting",
  locale: "es",
  title: "Comprender la varianza en las apuestas deportivas",
  category: "bankroll-risk",
  status: "published",
  description:
    "Aprenda qué significa la varianza en las apuestas deportivas, por qué los resultados a corto plazo pueden diferir drásticamente de las expectativas a largo plazo, cómo el tamaño de la muestra y las cuotas afectan a las oscilaciones, y por qué las rachas ganadoras o perdedoras pueden inducir a error en la toma de decisiones.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "La varianza describe cuánto pueden variar los resultados reales a corto plazo respecto a su expectativa a largo plazo. En las apuestas deportivas, esto es importante porque incluso una decisión acertada puede perder y una decisión deficiente puede ganar. Un apostador puede tomar varias decisiones con valor esperado positivo seguidas y aun así experimentar una racha perdedora, mientras que otro apostador puede tomar cuotas consistentemente pobres y seguir siendo rentable durante un corto periodo gracias a la suerte. Comprender la varianza ayuda a separar el proceso del resultado, evita reaccionar de forma exagerada ante muestras pequeñas y hace que las decisiones sobre el bankroll y las apuestas sean más disciplinadas.",
  keyTakeaways: [
    "La varianza es la fluctuación natural de los resultados a corto plazo en torno a la expectativa a largo plazo.",
    "Un valor esperado positivo no evita las rachas perdedoras, y un valor esperado negativo no evita las rachas ganadoras a corto plazo.",
    "Las muestras pequeñas son ruidosas y a menudo revelan menos sobre la calidad de la decisión de lo que la gente supone.",
    "Las apuestas con cuotas más altas generalmente generan mayores oscilaciones porque las victorias ocurren con menos frecuencia y los pagos son más desiguales.",
    "El tamaño de la apuesta afecta directamente a la magnitud de las oscilaciones del bankroll, incluso cuando la ventaja subyacente de la apuesta no cambia.",
    "Las reducciones (drawdowns) son normales en procesos inciertos y deben planificarse en lugar de tratarse como prueba de que un modelo ha dejado de funcionar repentinamente.",
    "La evaluación a largo plazo debe centrarse en la calibración, la calidad del precio y el proceso, además de en las ganancias y pérdidas.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Qué significa la varianza",
      paragraphs: [
        "La varianza es un concepto estadístico que mide qué tan ampliamente pueden dispersarse los resultados alrededor de un promedio o valor esperado. En las apuestas, la idea práctica es más sencilla: los resultados reales pueden parecer muy diferentes de la expectativa subyacente durante periodos cortos.",
        "Supongamos que un conjunto de apuestas tiene una probabilidad real de ganar del 55% con cuotas de tipo par. A lo largo de un número muy grande de apuestas, la tasa de victorias observada puede acercarse al 55%. Sin embargo, en 20 apuestas, el resultado real podría ser fácilmente 8 victorias y 12 derrotas, 14 victorias y 6 derrotas, o algo intermedio.",
        "Ese movimiento a corto plazo no es necesariamente una prueba de que la estimación del 55% fuera correcta o incorrecta. Es parte de la aleatoriedad inherente a los eventos inciertos repetidos."
      ],
      callout: {
        title: "La varianza no es lo mismo que el error",
        body:
          "Una racha de pérdidas puede ocurrir incluso cuando la estimación de probabilidad y el precio eran razonables. La aleatoriedad y los errores analíticos son problemas diferentes.",
        tone: "info",
      },
    },
    {
      id: "ev-vs-variance",
      heading: "El valor esperado y la varianza son diferentes",
      paragraphs: [
        "El valor esperado describe el resultado promedio teórico de decisiones repetidas. La varianza describe qué tanto pueden fluctuar los resultados individuales o a corto plazo alrededor de ese promedio.",
        "Una apuesta puede tener un valor esperado positivo y una varianza alta. Por ejemplo, una apuesta arriesgada ofrecida a 6.00 puede ser atractiva si su probabilidad real está significativamente por encima del umbral de equilibrio, pero la mayoría de las apuestas individuales de ese tipo seguirán perdiendo.",
        "Por el contrario, un favorito con cuota baja puede tener una varianza aparente menor por apuesta porque gana más a menudo, pero aun así puede tener un valor esperado negativo si la cuota es demasiado baja.",
        "Por lo tanto, un buen análisis de apuestas necesita ambos conceptos. El valor esperado (EV) pregunta si el precio es atractivo bajo una estimación de probabilidad. La varianza pregunta qué tan inestables pueden ser los resultados obtenidos mientras esa ventaja se desarrolla."
      ],
      callout: {
        title: "Un valor esperado positivo no significa resultados estables",
        body:
          "Puede existir una ventaja y aun así producir periodos de pérdidas incómodos o prolongados.",
        tone: "warning",
      },
    },
    {
      id: "small-samples",
      heading: "Por qué las muestras pequeñas son engañosas",
      paragraphs: [
        "Los humanos tienden a sacar conclusiones contundentes a partir de resultados recientes. En las apuestas, esto es peligroso porque las muestras cortas contienen una gran cantidad de ruido.",
        "Un apostador que gana 7 de cada 10 apuestas puede sentir que una estrategia es altamente precisa, pero diez apuestas suelen ser muy pocas para distinguir la habilidad del azar. Otro apostador que pierde 7 de cada 10 puede abandonar un proceso que en realidad es sólido.",
        "Cuanto más pequeña es la muestra, más amplio es el rango de resultados plausibles en torno a la probabilidad real. A medida que aumenta el tamaño de la muestra, la tasa de victorias observada generalmente se vuelve más estable, aunque ninguna muestra finita elimina la incertidumbre por completo.",
        "Es por esto que evaluar un modelo requiere algo más que observar la semana o el mes más reciente. La calibración a largo plazo, la calidad del precio de cierre, el contexto del mercado y la consistencia del proceso son factores importantes."
      ],
      bullets: [
        "10 apuestas pueden estar dominadas por el azar.",
        "100 apuestas proporcionan más información, pero aún pueden contener grandes oscilaciones.",
        "1.000 apuestas suelen ofrecer una imagen más clara, pero los resultados aún dependen del tipo de apuesta, las cuotas y la calidad del modelo.",
        "El tamaño de la muestra debe interpretarse junto con las probabilidades subyacentes y la estructura del mercado.",
      ],
    },
    {
      id: "streaks",
      heading: "Por qué ocurren las rachas de victorias y derrotas",
      paragraphs: [
        "Las rachas son una consecuencia normal de eventos aleatorios repetidos. Incluso cuando cada apuesta tiene una probabilidad estable, ocurrirán grupos de victorias y derrotas.",
        "Si un apostador tiene una probabilidad real del 55% de ganar cada apuesta independiente, eso no significa que la secuencia alternará ordenadamente entre victorias y derrotas. Pueden ocurrir cinco derrotas seguidas. También pueden ocurrir seis victorias seguidas.",
        "La existencia de una racha no prueba que la probabilidad subyacente haya cambiado. Antes de cambiar un modelo o un enfoque de apuestas, distinga entre una señal de información nueva genuina y la varianza ordinaria."
      ],
      callout: {
        title: "Las secuencias aleatorias parecen menos aleatorias de lo que la gente espera",
        body:
          "Los grupos y las rachas son normales. Una secuencia no necesita alternarse para ser consistente con una probabilidad estable.",
        tone: "info",
      },
    },
    {
      id: "odds-and-variance",
      heading: "Cómo afectan las cuotas a la varianza",
      paragraphs: [
        "Las cuotas influyen en la forma de los resultados de las apuestas. Las selecciones con cuotas bajas ganan con mayor frecuencia, pero suelen generar menores beneficios cuando tienen éxito. Las selecciones con cuotas altas ganan con menor frecuencia, pero generan pagos mayores.",
        "Esto significa que dos estrategias con el mismo valor esperado teórico pueden experimentar trayectorias de bankroll muy diferentes. Una estrategia centrada en cuotas de 1.50 puede producir muchas pequeñas ganancias y contratiempos mayores ocasionales. Una estrategia centrada en cuotas de 5.00 puede experimentar largas rachas de pérdidas interrumpidas por ganancias mayores.",
        "Cuanto más altas sean las cuotas típicas, más importante resulta esperar largos intervalos entre ganadores y evitar interpretar esos intervalos como evidencia inmediata de que la estrategia no funciona."
      ],
      bullets: [
        "Cuotas cortas: mayor tasa de acierto, menor pago por victoria.",
        "Cuotas largas: menor tasa de acierto, mayor pago por victoria.",
        "Las cuotas promedio más altas generalmente crean resultados a corto plazo más volátiles.",
        "Por lo tanto, comparar estrategias solo por la tasa de victorias puede ser engañoso.",
      ],
    },
    {
      id: "drawdowns",
      heading: "¿Qué es un drawdown?",
      paragraphs: [
        "Un drawdown es la caída desde un pico anterior del bankroll hasta un punto bajo posterior. Los drawdowns son una forma práctica de describir cuán dolorosa puede llegar a ser la varianza.",
        "Por ejemplo, si un bankroll aumenta de 100 unidades a 120 unidades y posteriormente cae a 102 unidades, la reducción desde el pico es de 18 unidades, o el 15% del pico de 120 unidades.",
        "Una estrategia puede tener una expectativa positiva a largo plazo y aun así experimentar reducciones sustanciales. El tamaño de dichas reducciones depende de la ventaja, la varianza de las apuestas, las cuotas promedio, la correlación y el tamaño de la apuesta.",
        "Planificar las reducciones es importante porque la presión emocional a menudo aumenta cuando las pérdidas se acumulan. Sin límites de riesgo predefinidos, los apostadores pueden reaccionar aumentando las apuestas, intentando recuperar pérdidas o abandonando un proceso consistente."
      ],
      callout: {
        title: "Las reducciones deben esperarse, no improvisarse.",
        body:
          "La planificación del riesgo es más fácil antes de que comience una racha de pérdidas que durante la misma.",
        tone: "warning",
      },
    },
    {
      id: "stake-size",
      heading: "El tamaño de la apuesta cambia el impacto de la varianza",
      paragraphs: [
        "La varianza en los resultados deportivos no puede eliminarse, pero el tamaño de la apuesta controla con qué intensidad afectan esos resultados al bankroll.",
        "Si dos apostadores realizan selecciones idénticas a cuotas idénticas, pero uno arriesga el 1% del bankroll por apuesta y el otro arriesga el 10%, el segundo apostador experimentará oscilaciones porcentuales mucho mayores.",
        "Las apuestas grandes pueden convertir secuencias de pérdidas ordinarias en reducciones severas. Es por esto que la gestión del bankroll no está separada de la varianza; es la herramienta principal para controlar las consecuencias financieras de la varianza.",
        "Un tamaño de apuesta menor no mejora la probabilidad de ganar. Simplemente reduce el daño causado por equivocarse y aumenta la cantidad de pérdidas que un bankroll puede soportar."
      ],
      bullets: [
        "Las apuestas más pequeñas reducen la volatilidad del bankroll.",
        "Las apuestas más grandes magnifican tanto las ganancias como las pérdidas.",
        "El tamaño de la apuesta debe reflejar tanto la incertidumbre como la ventaja percibida.",
        "Ningún método de apuesta puede eliminar la posibilidad de pérdida.",
      ],
    },
    {
      id: "correlation",
      heading: "La correlación puede aumentar la varianza",
      paragraphs: [
        "No todas las apuestas son independientes. Varias posiciones pueden depender del mismo evento subyacente, equipo, jugador, condición climática o suposición de mercado.",
        "Por ejemplo, apostar a que un equipo gane, a que su delantero anote y a que el partido supere un total de goles puede crear una exposición correlacionada. Si el partido se desarrolla en contra de la tesis compartida, múltiples apuestas pueden perder simultáneamente.",
        "La correlación puede hacer que una cartera de apuestas parezca más diversificada de lo que realmente es. Diez apuestas no equivalen a diez riesgos independientes si muchas dependen de los mismos factores de resultado.",
        "Al pensar en la varianza, considere no solo el número de apuestas, sino también qué tan fuertemente están relacionadas."
      ],
      callout: {
        title: "Diez apuestas pueden comportarse como una sola apuesta grande",
        body:
          "Si múltiples posiciones dependen de la misma suposición subyacente, su riesgo combinado puede ser mucho mayor de lo que sugiere el número de apuestas.",
        tone: "warning",
      },
    },
    {
      id: "model-evaluation",
      heading: "Cómo la varianza complica la evaluación del modelo",
      paragraphs: [
        "Un modelo de predicción puede ser juzgado injustamente si la evaluación se centra solo en el beneficio a corto plazo. El beneficio es importante, pero se ve afectado tanto por la calidad de la decisión como por la aleatoriedad.",
        "Una evaluación más sólida analiza varias dimensiones: si las probabilidades predichas están calibradas, si el modelo encuentra consistentemente precios competitivos, si el rendimiento persiste en muestras más grandes y si los resultados siguen siendo sensatos en diferentes deportes o tipos de mercado.",
        "Un modelo que es rentable tras 50 apuestas pero que está mal calibrado puede simplemente haber tenido suerte. Un modelo que pierde tras 100 apuestas pero que supera sistemáticamente el precio posterior del mercado puede merecer más investigación en lugar de un rechazo inmediato.",
        "Ninguna métrica por sí sola es suficiente. La varianza significa que la evidencia debe acumularse antes de extraer conclusiones sólidas."
      ],
      bullets: [
        "Realice un seguimiento de la calibración de la probabilidad.",
        "Realice un seguimiento de la calidad del precio y de la comparación con el mercado de cierre cuando sea relevante.",
        "Revise el rendimiento por tipo de mercado y rango de cuotas.",
        "Utilice muestras suficientemente grandes antes de realizar cambios estructurales.",
        "Investigue si las pérdidas provienen de estimaciones erróneas, precios inadecuados o de la varianza ordinaria.",
      ],
    },
    {
      id: "psychology",
      heading: "Varianza y psicología de las apuestas",
      paragraphs: [
        "La varianza genera presión psicológica porque las personas asocian naturalmente los resultados recientes con la calidad de sus decisiones.",
        "Tras una racha ganadora, un apostador puede volverse demasiado confiado, aumentar las apuestas o asumir que el mercado se ha vuelto fácil de batir. Tras una racha perdedora, el mismo apostador puede intentar recuperar las pérdidas, abandonar las reglas o buscar apuestas cada vez más agresivas.",
        "Ambas reacciones confunden el resultado con el proceso. Un marco disciplinado evalúa si la estimación de probabilidad, el precio y la apuesta originales eran razonables en el momento en que se tomó la decisión.",
        "Por lo tanto, la estabilidad emocional es parte de la gestión de riesgos. Los límites predefinidos y las reglas de apuesta consistentes reducen la tentación de cambiar el comportamiento en respuesta a oscilaciones aleatorias a corto plazo."
      ],
      callout: {
        title: "No permita que el último resultado determine la siguiente apuesta.",
        body:
          "Una victoria o derrota reciente no debería cambiar automáticamente el tamaño de la apuesta. Las decisiones deben seguir un proceso de riesgo predefinido.",
        tone: "warning",
      },
    },
    {
      id: "simulation-thinking",
      heading: "Por qué ayuda el pensamiento basado en simulación",
      paragraphs: [
        "Una forma útil de entender la varianza es imaginar que la misma estrategia de apuestas se repite muchas veces. Si una estrategia tiene un valor esperado positivo, algunas rutas simuladas comenzarán mal, mientras que otras comenzarán con rachas ganadoras inusualmente fuertes.",
        "La existencia de esas diferentes rutas demuestra por qué una secuencia realizada no es suficiente para revelar la expectativa subyacente. El apostador solo experimenta una ruta, pero muchas rutas alternativas eran posibles.",
        "Esta forma de pensar fomenta preguntas más realistas: ¿Qué tan mala podría ser una racha negativa normal? ¿Qué tan grande debería ser el bankroll? ¿Cuánta confianza se debe depositar en una muestra pequeña? ¿Qué tan sensibles son los resultados a supuestos de probabilidad ligeramente diferentes?",
        "La simulación no es una garantía de resultados futuros, pero ayuda a visualizar el rango de resultados plausibles en torno a un valor esperado."
      ],
    },
    {
      id: "matchsignal",
      heading: "Cómo encaja la varianza en MatchSignal",
      paragraphs: [
        "MatchSignal presenta análisis de mercado basados en probabilidades, Value Edge, Risk Tier, Best Odds, Market Avg y Books Sampled para proporcionar un contexto estructurado en torno a una selección.",
        "Estos campos no eliminan la varianza. Una etiqueta de Low Risk no significa que una apuesta no pueda perder, y un Value Edge positivo no significa que se espere que el próximo evento produzca una ganancia con certeza.",
        "Risk Tier se interpreta mejor como una señal de riesgo comparativo dentro del marco de la plataforma, mientras que Value Edge describe la relación entre el precio y la evaluación basada en probabilidades. Los resultados deportivos reales aún pueden desviarse de esas estimaciones.",
        "Por lo tanto, la varianza es una razón por la cual el análisis de MatchSignal debe utilizarse como información y no como garantía. Incluso las ventajas bien identificadas pueden producir resultados perdedores y rachas de pérdidas."
      ],
      callout: {
        title: "El nivel de riesgo no es una garantía",
        body:
          "Un riesgo evaluado más bajo aún incluye la posibilidad de pérdida. Los resultados deportivos siguen siendo inciertos.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Una lista de verificación práctica sobre la varianza",
      paragraphs: [
        "Utilice esta lista de verificación cuando los resultados recientes le tienten a realizar cambios importantes en su proceso de apuestas."
      ],
      bullets: [
        "Compruebe el tamaño de la muestra antes de juzgar el rendimiento.",
        "Separe la calidad de la decisión del resultado final.",
        "Revise las cuotas y la estimación de probabilidad que estaban disponibles en ese momento.",
        "Considere si la racha de pérdidas o ganancias es plausible bajo una varianza normal.",
        "Compruebe si existe correlación entre múltiples posiciones.",
        "Revise el tamaño de la apuesta y el riesgo de reducción (drawdown).",
        "Evite aumentar las apuestas para recuperar pérdidas.",
        "Evite asumir que una racha ganadora demuestra una ventaja permanente.",
        "Evalúe la calibración y la calidad de los precios en muestras más grandes.",
        "Mantenga predeterminados los límites de fondos y de pérdidas.",
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
    "La varianza puede producir periodos de pérdidas prolongados incluso cuando un proceso de apuestas parece razonable. No aumente las apuestas para recuperar pérdidas ni asuma que una racha ganadora continuará. Utilice límites de gasto y de pérdidas predeterminados, apueste solo cantidades que pueda permitirse perder y deténgase si las apuestas le están causando daño financiero o emocional.",
};

export default guide;
