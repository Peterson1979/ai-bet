import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "matchsignal-value-edge",
  locale: "es",
  title: "Cómo calcula MatchSignal el Value Edge",
  category: "value-analysis",
  status: "published",
  description:
    "Aprenda cómo MatchSignal calcula e interpreta el Value Edge, cómo la Probabilidad Justa y las cuotas decimales ofrecidas se combinan en el valor estimado, por qué el Value Edge difiere del valueDiff de puntos de probabilidad, y por qué una señal positiva no es garantía de beneficio.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "El Value Edge de MatchSignal está diseñado para mostrar cuán favorable parece un precio disponible en relación con la evaluación basada en probabilidades de la plataforma. En la MatchCard, el Value Edge está representado por el campo estimatedValuePct. Cuando MatchSignal tiene una Probabilidad Justa y un precio de socio disponible, la relación matemática es la misma fórmula de valor esperado utilizada en todo el análisis de apuestas: el porcentaje de valor estimado es igual a la Probabilidad Justa como decimal multiplicada por las cuotas decimales ofrecidas, menos uno, y luego multiplicado por 100. La canalización de producción también puede aceptar un estimatedValuePct generado por IA explícito cuando ese campo es devuelto por la capa de análisis; de lo contrario, recurre al cálculo del valor a partir de la Probabilidad Justa y las cuotas del socio disponibles. Esto hace que el Value Edge sea una señal de modelo y precio, no una promesa sobre el resultado del próximo partido.",
  keyTakeaways: [
    "La visualización del Value Edge en la MatchCard utiliza el campo estimatedValuePct.",
    "La ruta de cálculo a partir de la probabilidad y el precio es: ((Probabilidad Justa / 100) × cuotas decimales ofrecidas − 1) × 100.",
    "Un Value Edge positivo significa que el precio es favorable en relación con la estimación de Probabilidad Justa utilizada por MatchSignal.",
    "Un Value Edge de cero significa que las cuotas ofrecidas coinciden aproximadamente con el precio de equilibrio implícito en la Probabilidad Justa.",
    "Un Value Edge negativo significa que el precio ofrecido es más corto de lo que requeriría la estimación de probabilidad para el equilibrio.",
    "El valueDiff de MatchSignal es una métrica diferente: es una brecha de puntos de probabilidad, no es lo mismo que el porcentaje de retorno estimado.",
    "La canalización de análisis diario puede preservar un estimatedValuePct de IA explícito; si está ausente, MatchSignal puede calcular el valor a partir de la Probabilidad Justa y las cuotas del socio.",
    "Un Value Edge positivo es una estimación analítica y no garantiza una apuesta ganadora ni un beneficio realizado.",
  ],
  sections: [
    {
      id: "what-value-edge-is",
      heading: "Qué significa MatchSignal con Value Edge",
      paragraphs: [
        "En una MatchCard de MatchSignal, la etiqueta Value Edge es la presentación orientada al usuario de estimatedValuePct. El número tiene como objetivo describir la relación entre la Probabilidad Justa de MatchSignal para la selección mostrada y el precio disponible para dicha selección.",
        "La pregunta fundamental no es simplemente si MatchSignal considera que un resultado es probable. Es si las cuotas ofrecidas son lo suficientemente altas en relación con esa estimación de probabilidad.",
        "Esta distinción es importante porque la misma predicción puede ser atractiva a un precio y poco atractiva a otro. Una selección evaluada al 55% no es automáticamente valiosa. Con una cuota de 2.00 tiene un valor teórico positivo; a 1.70 no lo tiene.",
        "Por lo tanto, Value Edge pertenece a la capa de precios del análisis. Combina un juicio de probabilidad con el precio que se puede observar en el mercado."
      ],
      callout: {
        title: "Value Edge es una métrica de precio y probabilidad.",
        body:
          "No debe interpretarse como que MatchSignal afirma que un equipo es un ganador seguro. La misma selección puede tener un Value Edge diferente con distintas cuotas.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "La fórmula central de Value Edge",
      paragraphs: [
        "Cuando MatchSignal calcula el valor estimado a partir de la Probabilidad Justa y las cuotas ofrecidas, la fórmula es: Value Edge % = ((Probabilidad Justa / 100) × Cuota Decimal Ofrecida − 1) × 100.",
        "Esta es la relación estándar de retorno esperado para un resultado simple de ganar o perder, expresada como un porcentaje de una unidad apostada.",
        "El código convierte la Probabilidad Justa de porcentaje a decimal, la multiplica por la cuota decimal ofrecida, resta 1 y convierte el resultado de nuevo a términos porcentuales.",
        "El número resultante responde a una pregunta teórica: si la estimación de Probabilidad Justa fuera correcta y la misma relación probabilidad-precio pudiera repetirse muchas veces, ¿qué retorno promedio relativo a la apuesta implicaría esa relación?"
      ],
      bullets: [
        "Convertir la Probabilidad Justa de porcentaje a decimal.",
        "Multiplique por las cuotas decimales ofrecidas.",
        "Reste 1.",
        "Multiplique por 100 para expresar el resultado como un porcentaje.",
      ],
      callout: {
        title: "Fórmula",
        body:
          "% de Valor de Ventaja = ((Probabilidad Justa / 100) × Cuotas Ofrecidas − 1) × 100.",
        tone: "example",
      },
    },
    {
      id: "worked-example",
      heading: "Un ejemplo práctico de Valor de Ventaja de MatchSignal",
      paragraphs: [
        "Supongamos que MatchSignal asigna una Probabilidad Justa del 55% a una selección y las cuotas ofrecidas por el socio son 2.00.",
        "Convierta el 55% a 0.55. Multiplique 0.55 por 2.00 para obtener 1.10. Reste 1 para obtener 0.10. Multiplique por 100 y el Valor de Ventaja estimado es +10%.",
        "Ahora mantenga la misma Probabilidad Justa pero cambie el precio ofrecido a 1.80. El cálculo se convierte en 0.55 × 1.80 − 1 = −0.01, o aproximadamente −1%.",
        "Nada cambió respecto a la Probabilidad Justa. Solo cambió el precio disponible. Es por eso que la comparación de precios puede cambiar materialmente la relación de valor mostrada."
      ],
      bullets: [
        "Probabilidad Justa: 55%.",
        "Cuotas Ofrecidas: 2.00.",
        "Cálculo: 0.55 × 2.00 − 1 = 0.10.",
        "Ventaja de valor: +10%.",
        "Con cuotas de 1.80 y la misma probabilidad del 55%: aproximadamente −1%.",
      ],
    },
    {
      id: "break-even",
      heading: "Ventaja de valor y probabilidad de equilibrio",
      paragraphs: [
        "La misma relación puede entenderse a través de la probabilidad de equilibrio. Unas cuotas decimales de 2.00 requieren una tasa de acierto del 50% para alcanzar el equilibrio antes de las fricciones prácticas. Unas cuotas de 1.80 requieren aproximadamente un 55.56%.",
        "Si la Probabilidad Justa de MatchSignal está por encima de la probabilidad de equilibrio implícita en el precio disponible, la Ventaja de valor calculada es positiva. Si la Probabilidad Justa está por debajo de ese umbral, la Ventaja de valor es negativa.",
        "Es por esto que una Ventaja de valor positiva no significa simplemente que 'a MatchSignal le gusta el equipo'. Significa que la estimación de probabilidad es lo suficientemente alta en relación con el precio ofrecido como para implicar un valor teórico positivo.",
        "Una selección puede tener una Probabilidad Justa alta y aun así tener una Ventaja de valor negativa si el precio de mercado es demasiado bajo."
      ],
      callout: {
        title: "La probabilidad por sí sola no es valor",
        body:
          "El valor aparece solo cuando la estimación de probabilidad se compara con el precio realmente ofrecido.",
        tone: "warning",
      },
    },
    {
      id: "fair-probability",
      heading: "Dónde encaja la Probabilidad Justa en el cálculo",
      paragraphs: [
        "La Probabilidad Justa es el dato de probabilidad utilizado en la relación de valor. En el proceso de predicción diaria, una Probabilidad Justa proporcionada por IA puede utilizarse directamente tras la validación numérica y la delimitación.",
        "Si no se dispone de una Probabilidad Justa de IA explícita, la canalización contiene una lógica de respaldo que puede derivar una estimación de probabilidad a partir de información del mercado, como el consenso del mercado y la probabilidad implícita asociada al precio.",
        "Esto significa que la Probabilidad Justa no es simplemente otra etiqueta para la probabilidad implícita bruta de las cuotas de una casa de apuestas. Es un insumo analítico utilizado para evaluar el precio.",
        "Debido a que la estimación de probabilidad puede ser errónea o incierta, la Ventaja de Valor derivada de ella también hereda esa incertidumbre."
      ],
      callout: {
        title: "El insumo de probabilidad es más importante que la precisión decimal.",
        body:
          "Una Ventaja de Valor calculada perfectamente aún puede ser engañosa si la estimación de la Probabilidad Justa es inexacta.",
        tone: "warning",
      },
    },
    {
      id: "explicit-ai-value",
      heading: "Por qué la canalización puede utilizar una estimación de valor de IA explícita",
      paragraphs: [
        "La capa de análisis diario de MatchSignal puede devolver un estimatedValuePct estimado explícito junto con la Probabilidad Justa y otros campos analíticos.",
        "Cuando hay un estimatedValuePct explícito válido, la canalización diaria conserva ese valor en lugar de reemplazarlo automáticamente por un valor recién calculado. Cuando el campo explícito está ausente, la canalización puede calcular el valor estimado a partir de la Probabilidad Justa y las cuotas de los socios.",
        "Esto es importante al interpretar la plataforma técnicamente: la Ventaja de Valor no siempre se produce mediante una única ruta de código. Es un campo analítico normalizado con una ruta suministrada por IA y una ruta de respaldo matemática.",
        "La capa de instrucciones también indica al análisis que sea conservador con la Probabilidad Justa y el valor estimado, y que devuelva nulo cuando la ventaja no esté clara. Ese diseño tiene la intención de evitar la fabricación de confianza numérica cuando la evidencia disponible no la respalda."
      ],
      callout: {
        title: "Dos rutas, un campo mostrado",
        body:
          "La MatchCard muestra estimatedValuePct como Ventaja de Valor, independientemente de si el valor válido provino de la capa de análisis o del cálculo de respaldo de probabilidad y cuotas.",
        tone: "info",
      },
    },
    {
      id: "value-diff",
      heading: "Value Edge no es lo mismo que valueDiff",
      paragraphs: [
        "MatchSignal también contiene un campo valueDiff. Es fácil confundirlo con Value Edge porque ambos describen una brecha entre una evaluación de probabilidad y un precio de mercado.",
        "Las dos métricas utilizan unidades diferentes. estimatedValuePct es un porcentaje al estilo de retorno esperado basado en la probabilidad multiplicada por las cuotas decimales. valueDiff es una diferencia en puntos porcentuales entre la Probabilidad Justa y la probabilidad implícita asociada con el precio relevante.",
        "Por ejemplo, si la Probabilidad Justa es del 55% y el precio del socio implica un 50%, valueDiff es de +5 puntos porcentuales. Con una cuota de 2.00, estimatedValuePct es de +10%. Esos números describen conceptos relacionados, pero no son intercambiables.",
        "La visualización de Value Edge en la MatchCard utiliza estimatedValuePct. Por lo tanto, tratar valueDiff como si fuera un retorno esperado falsearía el significado del número."
      ],
      bullets: [
        "estimatedValuePct: porcentaje de valor al estilo de retorno.",
        "valueDiff: diferencia en puntos de probabilidad.",
        "Ambos pueden ser positivos al mismo tiempo.",
        "Sus valores numéricos no tienen por qué coincidir.",
      ],
      callout: {
        title: "No mezcle porcentajes con puntos porcentuales",
        body:
          "Una brecha de probabilidad de +5 puntos porcentuales no es la misma métrica que un retorno estimado del +5%.",
        tone: "warning",
      },
    },
    {
      id: "best-odds",
      heading: "Por qué las mejores cuotas son importantes para Value Edge",
      paragraphs: [
        "El precio utilizado en un cálculo de valor cambia directamente el resultado. Para la misma Probabilidad Justa, cuotas decimales equivalentes más altas producen un Margen de Valor mayor.",
        "Si la Probabilidad Justa es del 52%, unas cuotas de 1.90 implican aproximadamente un −1.2% de valor, unas cuotas de 2.00 implican un +4%, y unas cuotas de 2.10 implican un +9.2%.",
        "Es por esto que MatchSignal presenta las Mejores Cuotas junto con el Margen de Valor. El precio disponible más sólido y genuinamente equivalente puede mejorar materialmente la relación de valor.",
        "La comparación debe seguir siendo equivalente. Un precio más alto en un hándicap, total, regla de liquidación o mercado diferente no es un reemplazo válido para la selección mostrada."
      ],
      bullets: [
        "52% a 1.90 → aproximadamente −1.2%.",
        "52% a 2.00 → aproximadamente +4.0%.",
        "52% a 2.10 → aproximadamente +9.2%.",
      ],
    },
    {
      id: "market-average",
      heading: "Cómo el Promedio del Mercado y los Libros Muestreados añaden contexto",
      paragraphs: [
        "El Margen de Valor es más útil cuando se visualiza junto con los otros campos de la MatchCard en lugar de forma aislada.",
        "El Promedio del Mercado resume los precios muestreados de las casas de apuestas, ayudando a mostrar si la oferta mostrada difiere del mercado general. Los Libros Muestreados proporcionan contexto sobre cuántas fuentes de casas de apuestas contribuyeron a la muestra del mercado relevante.",
        "Un precio de socio más sólido en relación con el mercado muestreado puede mejorar la economía disponible para el usuario, pero el número de libros muestreados no prueba por sí mismo que la Probabilidad Justa sea correcta.",
        "Estos campos describen el contexto del mercado. No eliminan el error del modelo, el margen de la casa de apuestas, los precios obsoletos o la varianza deportiva ordinaria."
      ],
    },
    {
      id: "fair-odds",
      heading: "Las cuotas justas son la versión en precio de la probabilidad justa.",
      paragraphs: [
        "MatchSignal también puede convertir la probabilidad justa en cuotas justas. Conceptualmente, las cuotas decimales justas equivalen a 1 dividido por la probabilidad justa expresada como decimal.",
        "Una probabilidad justa del 50% corresponde a unas cuotas justas de 2.00. Una probabilidad justa del 40% corresponde a 2.50. Una probabilidad justa del 60% corresponde a aproximadamente 1.67.",
        "Esto proporciona otra forma de interpretar la relación de ventaja de valor (Value Edge). Si las cuotas ofrecidas son significativamente más altas que las cuotas justas implícitas en la probabilidad analítica, el precio puede representar un valor estimado positivo.",
        "Si las cuotas ofrecidas son más bajas que las cuotas justas, el precio está exigiendo una probabilidad mayor de la que respalda la estimación."
      ],
      bullets: [
        "Probabilidad justa del 50% → Cuotas justas de 2.00.",
        "40% → 2.50.",
        "60% → aproximadamente 1.67.",
      ],
    },
    {
      id: "positive-zero-negative",
      heading: "Cómo interpretar la ventaja de valor positiva, nula y negativa",
      paragraphs: [
        "Una ventaja de valor positiva significa que la relación entre probabilidad y precio implica un retorno teórico superior a cero bajo la estimación de probabilidad utilizada.",
        "Una ventaja de valor cercana a cero significa que el precio ofrecido está cerca del precio de equilibrio implícito en la probabilidad justa.",
        "Una ventaja de valor negativa significa que el precio ofrecido actualmente es más bajo de lo que respalda la estimación de probabilidad.",
        "La señal es útil, pero la magnitud no debe tratarse como una certeza. Una señal mostrada de +6% puede desaparecer si la Probabilidad Justa fue sobreestimada o si las cuotas disponibles disminuyen."
      ],
      callout: {
        title: "La ventaja puede desaparecer",
        body:
          "La Ventaja de Valor es sensible al tiempo porque las cuotas se mueven, y sensible al modelo porque la Probabilidad Justa es una estimación.",
        tone: "warning",
      },
    },
    {
      id: "rounding",
      heading: "Redondeo y Precisión de Visualización",
      paragraphs: [
        "El cálculo de valor está normalizado para la precisión de visualización en lugar de presentarse con decimales ilimitados. Esto mantiene las MatchCards legibles y evita sugerir más precisión de la que la interfaz puede utilizar.",
        "Los usuarios no deben interpretar una décima o centésima de punto porcentual como una garantía significativa de una precisión de pronóstico superior.",
        "Cuando la incertidumbre subyacente en torno a la Probabilidad Justa es de varios puntos porcentuales, una pequeña diferencia en la Ventaja de Valor mostrada puede ser económicamente menos importante que la incertidumbre del propio modelo."
      ],
    },
    {
      id: "ranking",
      heading: "La Ventaja de Valor también se utiliza como una señal de calidad",
      paragraphs: [
        "Dentro de MatchSignal, estimatedValuePct no solo se muestra al usuario. La lógica de clasificación también evalúa el número de valor junto con otra información como la Probabilidad Justa, la cobertura de las casas de apuestas, el margen, el consenso y el Nivel de Riesgo.",
        "Esto evita que la plataforma trate un número de valor bruto como el único criterio de calidad. Una gran ventaja aparente de un mercado limitado o inconsistente merece más precaución que una ventaja de tamaño similar respaldada por un contexto de mercado más amplio.",
        "Por lo tanto, la decisión de calidad exacta es multifactorial, aunque el cálculo de la Ventaja de Valor en sí mismo tiene una interpretación clara de probabilidad y precio."
      ],
      callout: {
        title: "La Ventaja de Valor es una señal, no toda la clasificación",
        body:
          "MatchSignal también considera la profundidad del mercado, el contexto de probabilidad, el spread y el riesgo en lugar de clasificar las selecciones únicamente por la mayor ventaja mostrada.",
        tone: "info",
      },
    },
    {
      id: "not-guarantee",
      heading: "Por qué una ventaja de valor positivo no garantiza ganancias",
      paragraphs: [
        "La fórmula describe la expectativa bajo una probabilidad estimada. No determina lo que sucederá en un evento deportivo específico.",
        "Una ventaja de valor del +8% puede perder inmediatamente. Una selección de valor negativo puede ganar. La diferencia se vuelve significativa solo como parte de una toma de decisiones repetida bajo estimaciones de probabilidad suficientemente precisas.",
        "El error del modelo es otra fuente de riesgo. Si MatchSignal estima un resultado en un 55% pero la probabilidad real es menor, la ventaja mostrada puede estar sobreestimada.",
        "El movimiento del mercado también importa. Si las cuotas que produjeron una ventaja positiva ya no están disponibles, el valor debe recalcularse utilizando el precio actual."
      ],
      callout: {
        title: "La ventaja de valor no es un pronóstico de ganancias",
        body:
          "Es una estimación basada en modelos sobre la calidad del precio bajo incertidumbre, no una promesa sobre la próxima apuesta o el crecimiento futuro del bankroll.",
        tone: "warning",
      },
    },
    {
      id: "example-sensitivity",
      heading: "Sensibilidad: pequeños cambios en la probabilidad pueden importar",
      paragraphs: [
        "Supongamos que las cuotas ofrecidas son 2.10. Con una probabilidad justa del 50%, la ventaja de valor es del +5%. Al 48%, es aproximadamente del +0.8%. Al 47%, se convierte en aproximadamente -1.3%.",
        "Solo un cambio de tres puntos porcentuales en la estimación de probabilidad mueve el mismo precio de una señal positiva a una negativa.",
        "Esto demuestra por qué la incertidumbre del modelo debe considerarse junto con la ventaja de valor principal. Cuanto menor sea la ventaja, más fácil es que un error de estimación normal revierta la conclusión.",
        "Para una interpretación práctica, un usuario no solo debería preguntarse '¿Cuál es la ventaja de valor (Value Edge)?', sino también '¿Qué tan robusta es esta ventaja si la probabilidad justa (Fair Probability) es ligeramente incorrecta?'"
      ],
      bullets: [
        "Cuotas 2.10, probabilidad justa 50% → +5.0%.",
        "Cuotas 2.10, probabilidad justa 48% → aproximadamente +0.8%.",
        "Cuotas 2.10, probabilidad justa 47% → aproximadamente −1.3%.",
      ],
    },
    {
      id: "checklist",
      heading: "Cómo leer una ventaja de valor (Value Edge) de MatchSignal",
      paragraphs: [
        "Una ventaja de valor debe leerse junto con el resto de la MatchCard y teniendo en cuenta las limitaciones del análisis probabilístico."
      ],
      bullets: [
        "Confirme el mercado y la selección exactos.",
        "Lea la probabilidad justa (Fair Probability) como una estimación, no como una certeza.",
        "Compruebe las mejores cuotas (Best Odds) mostradas actualmente.",
        "Utilice la relación entre probabilidad y precio para comprender la ventaja de valor (Value Edge).",
        "No confunda la ventaja de valor (Value Edge) con la diferencia de puntos porcentuales valueDiff.",
        "Revise el promedio del mercado (Market Avg) y las casas de apuestas muestreadas (Books Sampled) para obtener contexto del mercado.",
        "Recuerde que las cuotas pueden cambiar después de que se genere la tarjeta.",
        "Trate las pequeñas ventajas con cautela cuando la incertidumbre de la probabilidad sea alta.",
        "No utilice una Value Edge mayor como consejo automático para determinar el tamaño de la apuesta.",
        "No interprete una Value Edge positiva como un resultado ganador garantizado.",
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
    "MatchSignal Value Edge es una estimación analítica basada en la probabilidad y el precio, no una garantía de beneficio ni una recomendación para aumentar las apuestas. Las estimaciones de probabilidad pueden ser erróneas, las cuotas pueden moverse y cualquier apuesta puede perder. Mantenga las apuestas dentro de límites predeterminados, apueste solo cantidades que pueda permitirse perder y nunca intente recuperar las pérdidas.",
};

export default guide;
