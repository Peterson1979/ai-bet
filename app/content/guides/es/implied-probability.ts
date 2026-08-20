import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "implied-probability",
  locale: "es",
  title: "¿Qué es la probabilidad implícita?",
  category: "odds-probability",
  status: "published",
  description:
    "Aprenda a convertir las cuotas de apuestas en probabilidad implícita, por qué los márgenes de las casas de apuestas hacen que las probabilidades brutas del mercado superen el 100% y cómo interpretar la probabilidad implícita sin confundir el precio con la certeza.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "La probabilidad implícita es la probabilidad codificada por un precio de apuesta. Traduce las cuotas a un porcentaje, lo que facilita la comparación de diferentes precios y le ayuda a ver la tasa de equilibrio asociada a una apuesta. El cálculo es sencillo, pero interpretarlo correctamente requiere cuidado: los precios de las casas de apuestas pueden incluir margen, movimiento del mercado y gestión de riesgos, por lo que la probabilidad implícita no debe tratarse como un pronóstico objetivo o una garantía.",
  keyTakeaways: [
    "Para las cuotas decimales, la probabilidad implícita es igual a 1 dividido por la cuota, multiplicado por 100.",
    "Una cuota decimal de 2.00 implica un 50%; 1.50 implica alrededor de un 66.7%; 4.00 implica un 25%.",
    "Las probabilidades implícitas brutas en el mercado de una casa de apuestas a menudo suman más del 100% porque los precios pueden incluir el margen de la casa de apuestas.",
    "La probabilidad implícita es una propiedad del precio cotizado, no una prueba de la probabilidad real de un resultado.",
    "Una estimación de probabilidad solo se vuelve útil para el análisis de valor cuando se compara con la probabilidad de equilibrio implícita en las cuotas disponibles.",
    "Pequeñas diferencias en las cuotas pueden cambiar materialmente la probabilidad de equilibrio y la economía a largo plazo de las apuestas repetidas.",
  ],
  sections: [
    {
      id: "definition",
      heading: "¿Qué significa la probabilidad implícita?",
      paragraphs: [
        "Las cuotas de apuestas y la probabilidad son dos formas de expresar la misma relación de precios. Las cuotas muestran el rendimiento potencial asociado a un resultado. La probabilidad implícita convierte ese precio en la tasa de éxito porcentual que correspondería a las cuotas cotizadas antes de considerar el margen de la casa de apuestas, la incertidumbre del modelo u otros efectos del mercado.",
        "Por ejemplo, una cuota decimal de 2.00 implica una probabilidad del 50%. Eso no significa que el resultado ocurrirá la mitad de las veces en cualquier muestra pequeña, y no significa que la casa de apuestas haya descubierto la probabilidad real. Significa que un precio de 2.00 corresponde matemáticamente a una tasa de equilibrio del 50%: ignorando otros factores prácticos, un apostador que gane exactamente la mitad de apuestas idénticas a 2.00 recuperaría la cantidad apostada a largo plazo.",
        "Esta conversión a porcentaje es útil porque a menudo es más fácil razonar sobre probabilidades que sobre cuotas brutas. Comparar 1.62 con 1.75 puede parecer abstracto. Convertirlos a aproximadamente 61.7% y 57.1% muestra de inmediato que ambos precios exigen tasas de éxito significativamente diferentes."
      ],
      callout: {
        title: "Precio, no certeza",
        body:
          "Una probabilidad implícita describe lo que significa matemáticamente un precio cotizado. No es una promesa de que el evento ocurrirá con esa frecuencia.",
        tone: "warning",
      },
    },
    {
      id: "formula",
      heading: "Cómo calcular la probabilidad implícita a partir de cuotas decimales",
      paragraphs: [
        "Para cuotas decimales, la fórmula de conversión es: probabilidad implícita = 1 ÷ cuota decimal. Multiplique el resultado por 100 para expresarlo como porcentaje.",
        "Con una cuota de 2.00, el cálculo es 1 ÷ 2.00 = 0.50, o 50%. Con 1.50, es 1 ÷ 1.50 = 0.6667, o aproximadamente 66.7%. Con 2.50, es 40%. Con 5.00, es 20%.",
        "La relación es inversa. Las cuotas más bajas implican una mayor probabilidad y un menor retorno potencial. Las cuotas más altas implican una menor probabilidad y un mayor retorno potencial. Debido a que la relación no es lineal, un cambio de 0.10 en las cuotas decimales no representa el mismo cambio de probabilidad en todos los niveles de precio."
      ],
      bullets: [
        "1.25 ‒ 80.0% de probabilidad implícita",
        "1.50 → 66.7%",
        "1.80 → 55.6%",
        "2.00 → 50.0%",
        "2.50 → 40.0%",
        "3.00 → 33.3%",
        "4.00 → 25.0%",
        "5.00 → 20.0%",
      ],
      callout: {
        title: "Ejemplo",
        body:
          "Si una casa de apuestas ofrece 2.20, la probabilidad implícita es 1 ÷ 2.20 = 0.4545, o alrededor del 45.5%. Se requeriría una estimación de probabilidad superior al 45.5% antes de que ese precio pudiera representar un valor esperado positivo según la estimación.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Por qué la probabilidad implícita es también una probabilidad de punto de equilibrio",
      paragraphs: [
        "La probabilidad implícita de las cuotas disponibles puede interpretarse como un umbral teórico de punto de equilibrio. Supongamos que usted toma repetidamente cuotas decimales de 2.00. Una tasa de acierto del 50% produce un retorno bruto promedio de una unidad por unidad apostada: la mitad de las apuestas devuelven dos unidades y la mitad devuelven cero. Por lo tanto, antes de considerar cualquier otro costo o limitación, el 50% es la tasa de punto de equilibrio.",
        "A una cuota de 1.80, la probabilidad implícita es de aproximadamente 55.6%. Si un resultado realmente ocurriera solo el 50% de las veces, tomar repetidamente 1.80 tendría un valor esperado negativo. A una cuota de 2.20, la probabilidad de punto de equilibrio es de aproximadamente 45.5%; si una estimación bien calibrada situara el resultado en el 50%, el precio cotizado se situaría teóricamente por encima del requisito de punto de equilibrio.",
        "Esta es la base del análisis del valor esperado. La comparación importante no es simplemente si es probable que ocurra un resultado. Es si la probabilidad estimada es lo suficientemente alta en relación con el precio ofrecido."
      ],
      callout: {
        title: "Probable no significa automáticamente valioso",
        body:
          "Un resultado puede tener un 70% de probabilidades de ocurrir y aun así no ser atractivo si las cuotas disponibles requieren una tasa de punto de equilibrio superior al 70%. Por el contrario, un resultado de menor probabilidad puede ser atractivo si el precio compensa con creces el riesgo bajo una estimación fiable.",
        tone: "info",
      },
    },
    {
      id: "margin",
      heading: "Por qué las probabilidades implícitas de las casas de apuestas pueden sumar más del 100%",
      paragraphs: [
        "Si un mercado representara resultados mutuamente excluyentes con precios perfectamente justos y sin margen, las probabilidades implícitas sumarían el 100%. Los mercados reales de las casas de apuestas a menudo superan el 100%. El exceso se denomina comúnmente overround o margen de la casa de apuestas.",
        "Considere un mercado simplificado de dos resultados con ambas partes cotizadas a 1.91. Cada precio implica aproximadamente un 52.36%. Juntos suman alrededor del 104.72%. Los 4.72 puntos porcentuales por encima del 100% ilustran el margen de beneficio (overround) en este mercado simplificado.",
        "Debido a este margen, la probabilidad implícita bruta de una selección de una casa de apuestas no debe describirse automáticamente como su probabilidad justa. Los analistas pueden eliminar o normalizar el margen para crear una estimación de mercado sin margen (no-vig), pero eso requiere un cálculo adicional."
      ],
      bullets: [
        "Convierta las cuotas de cada resultado en probabilidad implícita bruta.",
        "Sume todas las probabilidades de resultados mutuamente excluyentes.",
        "Un total superior al 100% indica un margen de beneficio (overround) en el mercado cotizado.",
        "Normalice las probabilidades de los resultados si necesita una estimación de mercado simple sin margen.",
      ],
      callout: {
        title: "Distinción importante",
        body:
          "La probabilidad implícita bruta proviene directamente de un precio cotizado. Una estimación de probabilidad justa o sin margen requiere un ajuste adicional y debe etiquetarse en consecuencia.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Un ejemplo sencillo de cómo eliminar el margen de beneficio (overround)",
      paragraphs: [
        "Una forma básica de crear una estimación sin margen es la normalización proporcional. Supongamos que un mercado de dos resultados tiene probabilidades implícitas brutas del 55% y 50%, para un total del 105%. Divida cada probabilidad por el 105%. Las estimaciones normalizadas se convierten en aproximadamente 52.38% y 47.62%, que suman 100%.",
        "Este procedimiento es una forma útil de comprender la estructura de un mercado, pero hace una suposición: que el margen de la casa de apuestas se distribuye proporcionalmente entre los resultados. La fijación de precios real puede ser más complicada. Es posible que el margen no se asigne de manera uniforme, que diferentes resultados atraigan una demanda distinta y que las casas de apuestas utilicen estrategias de negociación y gestión de riesgos diferentes.",
        "Por lo tanto, eliminar el margen de beneficio (overround) no es lo mismo que descubrir la verdadera probabilidad. Es mejor describirlo como la obtención de una estimación basada en el mercado más clara a partir de los precios cotizados."
      ],
      callout: {
        title: "No-vig no significa perfecto",
        body:
          "Un mercado normalizado puede ser un punto de referencia útil, pero la incertidumbre, las brechas de información, el sesgo del mercado y las diferencias de precios aún pueden persistir.",
        tone: "info",
      },
    },
    {
      id: "formats",
      heading: "Probabilidad implícita en diferentes formatos de cuotas",
      paragraphs: [
        "Las cuotas decimales, fraccionarias y americanas expresan la misma relación económica en diferentes formatos. MatchSignal utiliza cuotas decimales porque hacen que tanto los cálculos de retorno como la conversión de probabilidad sean directos.",
        "Las cuotas fraccionarias como 3/2 representan la ganancia en relación con la apuesta. Para convertirlas a decimal, sume uno: 3/2 se convierte en 2.50 decimal, lo que implica un 40%. Las cuotas americanas utilizan números positivos y negativos alrededor de un punto de referencia de 100 unidades, por lo que la fórmula de conversión difiere dependiendo de si el precio es positivo o negativo.",
        "Una vez que cualquier formato se ha convertido a cuotas decimales, se puede utilizar la misma fórmula de 1 ÷ cuota. Esto hace que las cuotas decimales sean un lenguaje común conveniente para comparar precios de múltiples fuentes."
      ],
      bullets: [
        "Fraccionaria 1/1 = decimal 2.00 = 50% de probabilidad implícita.",
        "Fraccionaria 3/2 = decimal 2.50 = 40%.",
        "Americana +100 = decimal 2.00 = 50%.",
        "Americana -200 = decimal 1.50 = aproximadamente 66.7%.",
      ],
    },
    {
      id: "price-comparison",
      heading: "Cómo mejores cuotas cambian la probabilidad implícita",
      paragraphs: [
        "La comparación de precios es importante porque un mejor precio reduce la tasa de éxito requerida para alcanzar el punto de equilibrio. Imagine que la misma selección está disponible a 1.80, 1.90 y 2.00. Esos precios implican aproximadamente 55.6%, 52.6% y 50.0%, respectivamente.",
        "El evento deportivo subyacente es idéntico, pero la economía de la apuesta no lo es. Si su evaluación de probabilidad fuera del 54%, el precio de 1.80 se situaría por encima de su estimación de una manera desfavorable, ya que requiere un 55.6% para alcanzar el punto de equilibrio. Los precios de 1.90 y 2.00 requerirían tasas de equilibrio más bajas y, por lo tanto, podrían producir un valor esperado positivo bajo la estimación del 54%.",
        "Esto ilustra por qué la comparación de cuotas no se trata simplemente de maximizar un pago después de una victoria. El precio cambia el umbral matemático que su estimación de probabilidad debe superar."
      ],
      callout: {
        title: "Misma selección, diferente valor",
        body:
          "Una selección no tiene un valor fijo independiente del precio. Cuando las cuotas cambian, la probabilidad implícita y la relación de valor esperado cambian con ellas.",
        tone: "example",
      },
    },
    {
      id: "market-movement",
      heading: "Qué sucede con la probabilidad implícita cuando las cuotas se mueven",
      paragraphs: [
        "Cuando las cuotas se acortan, la probabilidad implícita aumenta. Cuando las cuotas se alargan, la probabilidad implícita cae. Un movimiento de 2.20 a 2.00 cambia la probabilidad implícita de aproximadamente 45.5% a 50%. Un movimiento de 2.00 a 1.80 la eleva aún más a aproximadamente 55.6%.",
        "Las cuotas pueden moverse por muchas razones: nueva información, lesiones, alineaciones confirmadas, clima, actividad del mercado, cambios en casas de apuestas competidoras o las propias decisiones de gestión de riesgos de un corredor de apuestas. Por lo tanto, un movimiento en las cuotas no prueba que la probabilidad real subyacente haya cambiado exactamente en la misma cantidad.",
        "Aun así, traducir un movimiento de precio a probabilidad implícita puede hacer que la escala del movimiento sea más intuitiva. Decir que un precio se acortó de 2.20 a 1.90 es menos inmediato que reconocer que la probabilidad de equilibrio cotizada pasó de aproximadamente 45.5% a 52.6%."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Errores comunes al leer la probabilidad implícita",
      paragraphs: [
        "La aritmética es lo suficientemente simple como para que la mayoría de los errores provengan de la interpretación en lugar del cálculo. El error más común es tratar la probabilidad implícita como una certeza o como el pronóstico exacto del corredor de apuestas. Otro es comparar probabilidades de diferentes mercados sin verificar si las selecciones y las reglas de liquidación son genuinamente equivalentes.",
        "Un tercer error es ignorar el margen del corredor de apuestas. Si las probabilidades en un mercado suman un 105%, citar cada porcentaje bruto como una probabilidad justa exagera la probabilidad total disponible. Finalmente, los apostadores pueden sobreestimar pequeñas ventajas aparentes. Una diferencia de uno o dos puntos porcentuales puede desaparecer cuando el modelo de probabilidad subyacente es incierto o está mal calibrado."
      ],
      bullets: [
        "No interprete la probabilidad implícita como una certeza.",
        "No llame a la probabilidad bruta de la casa de apuestas 'probabilidad justa' sin abordar el margen.",
        "No compare cuotas de diferentes definiciones de mercado como si fueran idénticas.",
        "No asuma que cada diferencia entre su estimación y el mercado es una ventaja real.",
        "No ignore que las cuotas pueden cambiar antes de realizar una apuesta.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Cómo encaja la probabilidad implícita en MatchSignal",
      paragraphs: [
        "MatchSignal utiliza los precios de las casas de apuestas como una parte de su marco de análisis deportivo. Los precios de mercado pueden traducirse a términos de probabilidad para que diferentes casas de apuestas y observaciones de mercado puedan compararse en una escala común.",
        "En las tarjetas de MatchSignal, el Promedio de Mercado resume los precios de mercado muestreados, mientras que la Probabilidad Justa es una estimación analítica en lugar de un porcentaje bruto de la casa de apuestas. La Ventaja de Valor pretende describir la diferencia entre el precio de mercado disponible y la evaluación basada en probabilidad de MatchSignal. Las Casas Muestreadas indican cuántas fuentes de casas de apuestas contribuyeron a la muestra de mercado relevante.",
        "Estos campos tienen la intención de facilitar la inspección de los precios de mercado y el contexto del modelo. No son garantías de un resultado deportivo o de ganancias. Las suposiciones del modelo, la calidad de los datos de origen, el movimiento del mercado y la varianza deportiva ordinaria pueden afectar el resultado."
      ],
      callout: {
        title: "Utilice la probabilidad como un marco de trabajo",
        body:
          "La probabilidad ayuda a estructurar la incertidumbre. No elimina la incertidumbre, y ningún modelo puede garantizar el resultado de un evento deportivo.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Una lista de verificación práctica de probabilidad implícita",
      paragraphs: [
        "Al evaluar un precio de apuesta, utilice la probabilidad implícita como punto de partida en lugar de una respuesta final. La siguiente secuencia ayuda a mantener separados el precio, la estructura del mercado y la estimación de probabilidad."
      ],
      bullets: [
        "Identifique el mercado y la selección exactos.",
        "Convierte las cuotas decimales disponibles en probabilidad implícita.",
        "Comprueba si el mercado contiene margen de casa de apuestas o overround.",
        "Compare precios equivalentes entre casas de apuestas cuando estén disponibles.",
        "Si utilizas un modelo de probabilidad, compara su estimación con la probabilidad de equilibrio del precio.",
        "Ten en cuenta la incertidumbre del modelo en lugar de tratar las pequeñas diferencias numéricas como ventajas seguras.",
        "Vuelve a comprobar las cuotas actuales antes de actuar, ya que los precios del mercado pueden moverse.",
        "Utiliza un tamaño de apuesta disciplinado y nunca trates el análisis de probabilidad como una garantía."
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
    "Las apuestas conllevan riesgo financiero. La probabilidad implícita es una interpretación matemática de un precio, no una garantía de un resultado o beneficio. Apuesta solo cantidades que puedas permitirte perder, evita perseguir pérdidas y mantén las decisiones de apuestas dentro de límites predeterminados.",
};

export default guide;
