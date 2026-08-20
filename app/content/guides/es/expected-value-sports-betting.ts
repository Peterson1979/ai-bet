import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "expected-value-sports-betting",
  locale: "es",
  title: "Explicación del valor esperado en las apuestas deportivas",
  category: "value-analysis",
  status: "published",
  description:
    "Comprenda el valor esperado en las apuestas deportivas, cómo la probabilidad y el precio se combinan para crear un EV positivo o negativo, por qué una ventaja positiva no garantiza una victoria y cómo evaluar el valor con mayor cuidado.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "El valor esperado, generalmente abreviado como EV, es una forma de describir el resultado promedio teórico de una decisión cuando el mismo tipo de decisión se repite muchas veces. En las apuestas deportivas, el EV conecta dos cosas: su estimación de la frecuencia con la que debería ocurrir un resultado y el precio ofrecido por el mercado. Una apuesta puede tener probabilidades de ganar y aun así tener un valor esperado negativo si las cuotas son demasiado bajas. Una apuesta también puede perder hoy y aun así tener un valor esperado positivo bajo una estimación de probabilidad razonable. El concepto es útil porque desplaza la atención de simplemente elegir ganadores hacia la relación entre probabilidad, precio e incertidumbre.",
  keyTakeaways: [
    "El valor esperado combina la probabilidad y el pago en una medida matemática a largo plazo.",
    "Un EV positivo significa que la probabilidad estimada es lo suficientemente alta en relación con las cuotas ofrecidas para crear un retorno promedio teórico positivo.",
    "Un EV negativo significa que el precio ofrecido requiere una tasa de éxito mayor de la que respalda su estimación de probabilidad.",
    "Una apuesta con EV positivo puede perder, y una apuesta con EV negativo puede ganar; el EV trata sobre decisiones repetidas, no sobre la certeza en un solo evento.",
    "La calidad de cualquier cálculo de EV depende en gran medida de la calidad y calibración de la estimación de probabilidad.",
    "Unas mejores cuotas mejoran el valor esperado para la misma selección subyacente porque reducen la probabilidad de equilibrio.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Qué significa el valor esperado",
      paragraphs: [
        "El valor esperado es el promedio ponderado por probabilidad de todos los resultados posibles. En un ejemplo sencillo de apuesta de ganar o perder, hay dos resultados financieros principales: la apuesta gana y produce una ganancia, o la apuesta pierde y se pierde la apuesta. El EV combina la probabilidad de cada resultado con su resultado financiero.",
        "Suponga que una selección se ofrece a cuotas decimales de 2.00 y usted estima que tiene un 55% de posibilidades de ganar. Una apuesta de una unidad devuelve dos unidades si tiene éxito, lo que significa una unidad de beneficio más la apuesta original. El resultado perdedor cuesta una unidad. Por lo tanto, el valor esperado es 0.55 × 1 unidad de beneficio más 0.45 × menos 1 unidad, lo que equivale a +0.10 unidades. En relación con una apuesta de una unidad, eso es un retorno esperado teórico del +10%.",
        "Esto no significa que la próxima apuesta devolverá físicamente 1.10 unidades. El resultado real de una apuesta es discreto: gana o pierde según las reglas de liquidación del mercado. El EV es un promedio a través de decisiones comparables repetidas bajo la probabilidad asumida."
      ],
      callout: {
        title: "La idea central",
        body:
          "El valor esperado mide la calidad de un precio en relación con una estimación de probabilidad. No predice el resultado del próximo partido.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "La fórmula básica del valor esperado",
      paragraphs: [
        "Para una apuesta simple de ganar o perder utilizando cuotas decimales, el EV por unidad apostada puede escribirse como: EV = (probabilidad de ganar × cuota decimal) − 1.",
        "Si la probabilidad es del 50% y la cuota es 2.20, el cálculo es 0.50 × 2.20 − 1 = +0.10, o +10%. Si la misma probabilidad del 50% se combina con una cuota de 1.80, el resultado es 0.50 × 1.80 − 1 = −0.10, o −10%.",
        "Por lo tanto, la misma predicción puede tener un valor esperado muy diferente dependiendo del precio disponible. Esta es una de las distinciones más importantes en el análisis de apuestas: la opinión deportiva y la calidad económica de la apuesta no son lo mismo.",
        "La fórmula es simple, pero puede crear una falsa confianza si la entrada de probabilidad se trata como exacta. La aritmética del EV puede ser correcta mientras que la estimación de probabilidad subyacente sea errónea."
      ],
      bullets: [
        "EV por unidad = (probabilidad de ganar × cuota decimal) − 1.",
        "50% de probabilidad a cuota 2.20: +10% EV.",
        "50% de probabilidad a cuota 2.00: 0% EV.",
        "50% de probabilidad a cuota 1.80: −10% EV.",
      ],
      callout: {
        title: "Misma selección, diferente EV",
        body:
          "Si su estimación de probabilidad se mantiene igual, cambiar las cuotas cambia el valor esperado inmediatamente.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Probabilidad de equilibrio y valor esperado",
      paragraphs: [
        "Cada precio cotizado tiene una probabilidad de equilibrio. Para cuotas decimales, la probabilidad de equilibrio es igual a 1 dividido por la cuota. En 2.00, la tasa de equilibrio es del 50%. En 1.80, es de aproximadamente 55.6%. En 2.50, es del 40%.",
        "La conexión con el EV es directa. Si su estimación de probabilidad está por encima de la probabilidad de equilibrio implícita en el precio disponible, la apuesta tiene un valor esperado positivo bajo esa estimación. Si su estimación está por debajo del umbral de equilibrio, el valor esperado es negativo. Si ambos son iguales, el EV teórico es cero antes de considerar las fricciones prácticas.",
        "Este marco es más útil que simplemente preguntar si un resultado es probable. Un equipo evaluado al 70% aún puede estar mal valorado si las cuotas disponibles requieren una tasa de equilibrio del 75%. Un resultado evaluado en solo un 35% puede ofrecer valor teóricamente si el precio requiere una tasa de equilibrio inferior al 35%."
      ],
      callout: {
        title: "Probable no es lo mismo que valioso",
        body:
          "La probabilidad le indica con qué frecuencia cree que puede suceder algo. El valor esperado pregunta si el precio ofrecido le compensa adecuadamente por esa probabilidad.",
        tone: "warning",
      },
    },
    {
      id: "positive-negative",
      heading: "EV positivo vs EV negativo",
      paragraphs: [
        "Un valor esperado positivo significa que el retorno promedio estimado está por encima del monto apostado. Un valor esperado negativo significa que el retorno promedio estimado está por debajo del monto apostado. El signo del EV depende de la relación entre la probabilidad y el precio, no de si la siguiente apuesta individual gana.",
        "Considere a dos personas evaluando la misma selección. Una solo puede obtener cuotas de 1.80, mientras que la otra encuentra 2.05. Si ambas utilizan la misma estimación de probabilidad del 52%, el primer precio produce un EV de 0.52 × 1.80 − 1 = −6.4%. El segundo produce un EV de 0.52 × 2.05 − 1 = +6.6%.",
        "La predicción es idéntica, pero la calidad económica de las dos apuestas es diferente. Por esto es importante la comparación de precios. Un apostador no puede controlar el marcador final, pero a menudo puede controlar si acepta un precio inferior cuando hay un precio equivalente mejor disponible en otro lugar."
      ],
      bullets: [
        "EV positivo: la probabilidad estimada supera el requisito de equilibrio de la cuota.",
        "EV negativo: la probabilidad estimada cae por debajo del requisito de equilibrio de la cuota.",
        "EV cero: la probabilidad estimada coincide aproximadamente con el requisito de equilibrio.",
        "Cambiar las cuotas cambia el EV incluso si la estimación de probabilidad subyacente no cambia.",
      ],
    },
    {
      id: "not-guarantee",
      heading: "Por qué el valor esperado positivo no garantiza ganancias",
      paragraphs: [
        "Una estimación de EV positivo describe una expectativa matemática a largo plazo, no un resultado garantizado a corto plazo. Los deportes contienen aleatoriedad, información incompleta, decisiones arbitrales, lesiones, cambios tácticos, efectos climáticos, errores de ejecución y muchas otras fuentes de varianza. Incluso una estimación de probabilidad sólida no puede eliminar estos factores.",
        "Imagine una serie de apuestas, cada una evaluada con un 60% de probabilidad de ganar. Perder cuatro o cinco seguidas es totalmente posible. Por el contrario, una secuencia de apuestas de EV negativo puede ganar varias veces consecutivas. Por lo tanto, los resultados a corto plazo no revelan de manera fiable si el proceso subyacente fue bueno.",
        "La segunda fuente de incertidumbre es la estimación de probabilidad en sí misma. Un cálculo puede parecer fuertemente positivo porque la probabilidad estimada es demasiado optimista. Si un modelo indica un 60% cuando la probabilidad real está más cerca del 50%, el cálculo del EV será engañoso incluso si la aritmética es impecable.",
        "Por esa razón, el valor esperado debe tratarse como un marco analítico en lugar de una promesa. Cuanto más incierta sea la estimación de probabilidad, menos confianza se debe depositar en una pequeña ventaja aparente."
      ],
      callout: {
        title: "La aritmética puede ser correcta mientras que la estimación es errónea",
        body:
          "Los cálculos de EV son tan fiables como las probabilidades que se les suministran. La calibración del modelo y la incertidumbre importan tanto como la fórmula.",
        tone: "warning",
      },
    },
    {
      id: "probability-quality",
      heading: "Por qué la calidad de la probabilidad importa más que la fórmula",
      paragraphs: [
        "La fórmula del valor esperado es sencilla. Estimar bien la probabilidad es la parte difícil. Un modelo de probabilidad útil debe estar calibrado: los resultados a los que se asigna un 60% deberían, en una muestra suficientemente grande y adecuada, ocurrir alrededor del 60% de las veces.",
        "Las probabilidades deportivas pueden estimarse a partir de datos de mercado, modelos estadísticos, información sobre equipos y jugadores, variables contextuales o combinaciones de estas fuentes. Cada enfoque contiene suposiciones. Los datos históricos pueden no representar completamente a los equipos actuales. Las lesiones pueden ser inciertas. Un modelo puede subestimar los cambios tácticos. Los precios de mercado pueden incorporar información que el modelo no tiene.",
        "Esto significa que una ventaja aparente del 2% no debe tratarse automáticamente de la misma manera que una ventaja del 10%. La incertidumbre en torno a la estimación de probabilidad puede ser mayor que la diferencia que se está midiendo.",
        "Un proceso disciplinado no solo pregunta '¿Cuál es mi estimación?', sino también '¿Qué tan incierta es esta estimación y qué tan sensible es el VE a pequeños cambios?'"
      ],
      bullets: [
        "Compruebe la calibración en muestras grandes en lugar de juzgar un modelo por unos pocos resultados.",
        "Trate las pequeñas ventajas con cautela cuando la estimación de probabilidad subyacente sea incierta.",
        "Actualice las estimaciones cuando cambie la información relevante.",
        "Evite añadir confianza simplemente porque un modelo produzca muchos decimales.",
      ],
    },
    {
      id: "bookmaker-margin",
      heading: "Cómo afecta el margen de la casa de apuestas al análisis del VE",
      paragraphs: [
        "Los precios de las casas de apuestas suelen incluir un margen o sobreprecio. En un mercado simple de dos vías, ambos lados podrían ofrecerse a 1.91. Cada precio implica alrededor del 52.36%, por lo que las dos probabilidades brutas suman alrededor del 104.72% en lugar del 100%.",
        "Esto es importante porque una probabilidad implícita bruta de la casa de apuestas no es automáticamente una estimación de probabilidad justa. Los precios cotizados incluyen la estructura del mercado y el margen del operador. Los analistas pueden normalizar las probabilidades implícitas para crear un punto de referencia de mercado simple sin margen.",
        "Sin embargo, para el análisis del VE, el precio real disponible para el apostador sigue siendo el precio que determina el umbral de equilibrio. Incluso si un modelo sin margen estima un resultado en el 52%, un precio de casa de apuestas de 1.85 requiere alrededor del 54.1% para alcanzar el punto de equilibrio. Por lo tanto, el precio de ejecución es fundamental para el cálculo final del VE."
      ],
      callout: {
        title: "La probabilidad justa y el precio disponible son datos distintos",
        body:
          "Una estimación sin margen puede ayudar a describir las expectativas del mercado, mientras que las cuotas ofrecidas realmente determinan la probabilidad de equilibrio de la apuesta que puede realizar.",
        tone: "info",
      },
    },
    {
      id: "odds-comparison",
      heading: "Por qué comparar cuotas mejora el valor esperado",
      paragraphs: [
        "Para la misma selección y estimación de probabilidad, unas cuotas más altas siempre mejoran el valor esperado. Suponga que su estimación es del 48%. A 1.95, el VE es 0.48 × 1.95 − 1 = −6.4%. A 2.10, el VE es +0.8%. A 2.20, el VE es +5.6%.",
        "Nada cambió respecto al resultado deportivo entre estos ejemplos. Solo cambió el precio. Por eso, comparar mercados equivalentes entre casas de apuestas es una parte importante del análisis de valor.",
        "La comparación debe ser genuinamente equivalente. Diferentes reglas de liquidación, hándicaps, totales, tratamiento de la prórroga, condiciones de anulación o definiciones de mercado pueden hacer que precios superficialmente similares no sean equivalentes. La comparación de precios solo es útil cuando la apuesta subyacente es la misma."
      ],
      bullets: [
        "Confirme que el evento, la selección, la línea y las reglas de liquidación coinciden.",
        "Compare los precios actuales en lugar de capturas de pantalla obsoletas o cotizaciones históricas.",
        "Recuerde que los precios del mercado pueden moverse antes de realizar la apuesta.",
        "Unas cuotas equivalentes más altas reducen la probabilidad de equilibrio.",
      ],
    },
    {
      id: "variance",
      heading: "Valor esperado, varianza y tamaño de la muestra",
      paragraphs: [
        "La varianza describe cuánto pueden oscilar los resultados a corto plazo en torno a su expectativa a largo plazo. Las apuestas deportivas tienen una varianza sustancial porque cada evento produce un resultado discreto y muchos mercados implican probabilidades alejadas de la certeza.",
        "Un proceso con un valor esperado positivo genuino puede experimentar periodos de pérdidas prolongados. El tamaño y la duración de esas oscilaciones dependen del tipo de apuestas, las cuotas, las probabilidades reales, la correlación entre posiciones y el tamaño de la apuesta. Por lo tanto, una muestra pequeña puede estar dominada por la aleatoriedad.",
        "Esto crea un problema de evaluación importante. Un apostador puede confundir una racha ganadora con evidencia de habilidad o abandonar un proceso sólido durante una racha negativa ordinaria. El análisis del EV es más significativo cuando se combina con un registro disciplinado, tamaños de muestra realistas y atención a la calibración, en lugar de solo al beneficio a corto plazo."
      ],
      callout: {
        title: "Los resultados y el proceso no son idénticos",
        body:
          "Una victoria no demuestra que una apuesta tuviera un EV positivo, y una derrota no demuestra que tuviera un EV negativo. Evalúe la calidad de la probabilidad y la decisión sobre el precio por separado del resultado final.",
        tone: "warning",
      },
    },
    {
      id: "worked-example",
      heading: "Un ejemplo práctico de valor esperado",
      paragraphs: [
        "Supongamos que una casa de apuestas ofrece cuotas decimales de 2.30 en una selección. La probabilidad de equilibrio es 1 ÷ 2.30, o aproximadamente 43.48%. Su análisis independiente estima la selección en un 47%.",
        "El EV por unidad es 0.47 × 2.30 − 1 = +0.081, o +8.1%. Bajo la estimación del 47%, las apuestas repetidas con la misma relación probabilidad-precio devolverían teóricamente 1.081 unidades por cada unidad apostada en promedio.",
        "Ahora pruebe la sensibilidad. Si la probabilidad real fuera solo del 44%, el EV sería 0.44 × 2.30 − 1 = +1.2%. Al 43%, el EV se convierte en −1.1%. La conclusión cambia con un ajuste relativamente pequeño en la probabilidad.",
        "Esta sensibilidad ilustra por qué la interpretación responsable es importante. La cifra principal del +8.1% no es suficiente. También necesita entender qué tan seguro está de la estimación del 47% y si el precio cotizado sigue disponible."
      ],
      bullets: [
        "Cuotas: 2.30",
        "Probabilidad de equilibrio: aproximadamente 43.48%",
        "Probabilidad estimada: 47%",
        "EV estimado: +8.1%",
        "Con un 44% de probabilidad: +1.2% EV",
        "Con un 43% de probabilidad: −1.1% EV",
      ],
    },
    {
      id: "matchsignal",
      heading: "Cómo se relaciona el Valor Esperado con la Ventaja de Valor de MatchSignal",
      paragraphs: [
        "MatchSignal utiliza precios de mercado, muestras de casas de apuestas y análisis basados en probabilidades para proporcionar contexto sobre una selección. El campo Ventaja de Valor (Value Edge) de la plataforma está diseñado para resaltar una diferencia positiva entre el precio de mercado disponible y la evaluación basada en probabilidades utilizada por MatchSignal.",
        "Esto debe interpretarse como una señal analítica y no como un retorno esperado garantizado. Los precios de mercado pueden moverse, las estimaciones de probabilidad contienen incertidumbre y la señal mostrada refleja los datos y las suposiciones del modelo disponibles en el momento del análisis.",
        "Mejores Cuotas muestra el precio de socio disponible más sólido identificado para la selección mostrada, el Promedio de Mercado resume los precios de mercado muestreados, la Probabilidad Justa es una estimación analítica y las Casas de Apuestas Muestreadas indica cuántas fuentes de casas de apuestas contribuyeron a la muestra de mercado relevante.",
        "Por lo tanto, la interpretación correcta de una Ventaja de Valor no es 'esta apuesta ganará'. Es más bien 'bajo las suposiciones actuales de probabilidad y precio, esta selección puede tener un precio más favorable de lo que sugeriría la estimación del modelo'."
      ],
      callout: {
        title: "Una señal no es una garantía",
        body:
          "La Ventaja de Valor de MatchSignal describe una relación basada en modelos entre la probabilidad y el precio. No garantiza un resultado positivo ni elimina la varianza deportiva.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Una lista de verificación práctica de EV",
      paragraphs: [
        "Antes de describir una apuesta como de valor esperado positivo, verifique cada componente del cálculo. Esto ayuda a evitar que una fórmula matemáticamente correcta sea alimentada con datos poco fiables."
      ],
      bullets: [
        "Identifique el mercado y la selección exactos.",
        "Utilice las cuotas disponibles actuales, no un precio desactualizado.",
        "Convierta el precio a su probabilidad implícita de punto de equilibrio.",
        "Estime la probabilidad del resultado de forma independiente o con un modelo claramente definido.",
        "Compruebe si el margen de la casa de apuestas afecta a la comparación del mercado.",
        "Calcule el EV a partir de la probabilidad y el precio.",
        "Pruebe cómo cambia el resultado si la estimación de probabilidad es ligeramente inferior.",
        "Compare precios equivalentes entre casas de apuestas cuando estén disponibles.",
        "Tenga en cuenta la incertidumbre y la varianza.",
        "Utilice un tamaño de apuesta disciplinado y nunca trate el EV como una garantía.",
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
    "El valor esperado es un marco matemático, no una garantía de beneficio. Las estimaciones de probabilidad pueden ser erróneas, los precios de mercado cambian y los resultados a corto plazo pueden variar sustancialmente de las expectativas teóricas. Apueste solo cantidades que pueda permitirse perder, utilice límites predeterminados, evite perseguir pérdidas y trate el análisis de apuestas como información en lugar de certeza.",
};

export default guide;
