import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "how-betting-odds-work",
  locale: "es",
  title: "Cómo funcionan realmente las cuotas de apuestas",
  category: "odds-probability",
  status: "published",
  description:
    "Aprenda qué representan las cuotas de apuestas, cómo se relacionan con la probabilidad, por qué los precios de las casas de apuestas incluyen un margen y cómo comparar cuotas sin confundir el precio con la predicción.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Las cuotas de apuestas son precios. Le indican cuánto puede devolver una apuesta ganadora, pero también codifican la visión del mercado sobre la probabilidad de un resultado. Comprender ambas caras de esta relación es esencial: las cuotas no son una garantía y el precio más bajo no es automáticamente la mejor apuesta. Esta guía explica las cuotas decimales, la probabilidad implícita, el margen de la casa de apuestas, el movimiento del mercado y por qué es importante comparar precios.",
  keyTakeaways: [
    "Las cuotas decimales muestran el retorno total por unidad apostada, incluyendo la apuesta original.",
    "La probabilidad implícita se calcula a partir de las cuotas decimales como 1 dividido por la cuota.",
    "Los precios de las casas de apuestas suelen incluir un margen, por lo que las probabilidades implícitas de todos los resultados pueden sumar más del 100%.",
    "Un precio más bajo significa una mayor probabilidad implícita, no un resultado seguro.",
    "La misma selección puede tener cuotas diferentes en distintas casas de apuestas, por lo que la comparación de precios afecta directamente al retorno potencial.",
    "Las cuotas pueden moverse a medida que la nueva información, la actividad del mercado y la gestión de riesgos de la casa de apuestas cambian el precio.",
  ],
  sections: [
    {
      id: "odds-are-prices",
      heading: "Las cuotas de apuestas son precios, no predicciones",
      paragraphs: [
        "La forma más sencilla de entender las cuotas de apuestas es tratarlas como el precio de un resultado posible. En un partido de fútbol, una casa de apuestas puede cotizar un precio para el equipo local, otro para el empate y otro para el equipo visitante. Esos precios determinan el retorno si el resultado seleccionado gana.",
        "Las cuotas también contienen información sobre probabilidades. Un precio decimal más bajo corresponde a una mayor probabilidad implícita, mientras que un precio más alto corresponde a una menor probabilidad implícita. Eso no significa que la casa de apuestas sepa lo que va a suceder. Significa que el mercado está asignando diferentes precios a resultados inciertos.",
        "Esta distinción es importante porque una predicción y un precio responden a preguntas diferentes. Una predicción pregunta qué resultado es más probable. Un precio pregunta qué retorno se ofrece por asumir ese riesgo. Un equipo puede ser el ganador más probable y aun así no ser atractivo a un precio suficientemente bajo."
      ],
      callout: {
        title: "Idea central",
        body:
          "Un gran favorito aún puede perder. Las cuotas expresan un precio de mercado para la incertidumbre; no eliminan la incertidumbre.",
        tone: "info",
      },
    },
    {
      id: "decimal-odds",
      heading: "Cómo funcionan las cuotas decimales",
      paragraphs: [
        "MatchSignal utiliza cuotas decimales porque hacen que los retornos y la conversión de probabilidad sean sencillos. Las cuotas decimales muestran la cantidad total devuelta por cada unidad apostada cuando la apuesta gana. El retorno total incluye la apuesta original.",
        "Por ejemplo, con una cuota decimal de 2.00, una apuesta de 10 unidades devuelve 20 unidades si tiene éxito: 10 unidades de beneficio más la apuesta original de 10 unidades. Con una cuota de 1.50, la misma apuesta de 10 unidades devuelve 15 unidades en total. Con una cuota de 3.00, devuelve 30 unidades.",
        "La relación básica es simple: el retorno total es igual a la apuesta multiplicada por la cuota decimal. El beneficio es igual al retorno total menos la apuesta original."
      ],
      bullets: [
        "10 unidades a 1.50 → 15 unidades de retorno total, 5 unidades de beneficio.",
        "10 unidades a 2.00 → 20 unidades de retorno total, 10 unidades de beneficio.",
        "10 unidades a 3.00 → 30 unidades de retorno total, 20 unidades de beneficio.",
      ],
      callout: {
        title: "Ejemplo",
        body:
          "Unas cuotas más altas aumentan el retorno potencial, pero normalmente corresponden a resultados que el mercado considera menos probables.",
        tone: "example",
      },
    },
    {
      id: "implied-probability",
      heading: "Convertir cuotas en probabilidad implícita",
      paragraphs: [
        "Las cuotas decimales pueden convertirse en probabilidad implícita con una fórmula sencilla: probabilidad implícita = 1 ÷ cuota decimal. Multiplique el resultado por 100 para expresarlo como un porcentaje.",
        "Una cuota de 2.00 implica un 50%. Una cuota de 1.50 implica aproximadamente un 66.7%. Una cuota de 4.00 implica un 25%. Esto le proporciona una escala de probabilidad común para comparar precios que inicialmente pueden parecer muy diferentes.",
        "Sin embargo, la probabilidad implícita de una casa de apuestas no es lo mismo que una probabilidad objetiva precisa. El precio puede incluir un margen de la casa de apuestas, reaccionar a la demanda del mercado o cambiar a medida que hay nueva información disponible. Se entiende mejor como la probabilidad integrada en el precio cotizado."
      ],
      bullets: [
        "1.50 → 1 ÷ 1.50 = 66.7%",
        "2.00 → 1 ÷ 2.00 = 50.0%",
        "2.50 → 1 ÷ 2.50 = 40.0%",
        "4.00 → 1 ÷ 4.00 = 25.0%",
      ],
      callout: {
        title: "No interprete el 66.7% como una certeza",
        body:
          "Una probabilidad implícita es una traducción de un precio. Los resultados deportivos en el mundo real siguen siendo inciertos, incluso cuando el mercado les asigna una probabilidad alta.",
        tone: "warning",
      },
    },
    {
      id: "bookmaker-margin",
      heading: "Por qué las probabilidades pueden sumar más del 100%",
      paragraphs: [
        "Si convierte cada resultado en un mercado de apuestas a probabilidad implícita y los suma, el total a menudo superará el 100%. La cantidad por encima del 100% se denomina comúnmente margen de la casa de apuestas o overround.",
        "Considere un mercado simplificado de dos resultados donde ambos lados tienen un precio de 1.91. Cada precio implica alrededor del 52.36%. Sumados, el mercado totaliza aproximadamente el 104.72%. La diferencia entre el 104.72% y el 100% representa el margen (overround) en ese mercado simplificado.",
        "El margen significa que las probabilidades implícitas brutas no son automáticamente probabilidades justas. Los analistas pueden estimar una probabilidad sin margen normalizando las probabilidades en todo el mercado, pero esto sigue siendo una estimación basada en los precios disponibles en lugar de una garantía de la probabilidad real de cada resultado."
      ],
      callout: {
        title: "Por qué esto es importante",
        body:
          "Dos mercados pueden expresar expectativas similares mientras ofrecen márgenes diferentes. Un mercado con un margen más bajo generalmente ofrece a los apostadores precios más competitivos, si todo lo demás permanece igual.",
        tone: "info",
      },
    },
    {
      id: "favorite-underdog",
      heading: "Favoritos, no favoritos (underdogs) y lo que el precio realmente dice",
      paragraphs: [
        "Un favorito es simplemente el resultado con el precio más bajo en el mercado relevante. Un no favorito tiene un precio más alto. Estas etiquetas describen expectativas relativas del mercado, no una calidad garantizada ni resultados finales.",
        "Suponga que el Equipo A se ofrece a 1.40 y el Equipo B a 7.00 en un mercado que también incluye el empate. El Equipo A es el favorito porque su precio implica una probabilidad mucho mayor que el precio del Equipo B. Pero si alguno de los precios es atractivo depende de cómo se comparen las cuotas cotizadas con una estimación de probabilidad razonable.",
        "Aquí es donde el análisis de valor difiere de la selección de ganadores. Elegir al equipo con más probabilidades de ganar no es necesariamente lo mismo que encontrar el precio más favorable. Una probabilidad del 75% ofrecida a cuotas que requieren una tasa de equilibrio del 80% no representaría un valor esperado positivo bajo esa estimación de probabilidad."
      ],
    },
    {
      id: "compare-odds",
      heading: "Por qué es importante comparar cuotas",
      paragraphs: [
        "Las casas de apuestas no siempre ofrecen precios idénticos. Un operador puede cotizar 1.85 mientras que otro cotiza 1.95 para la misma selección y mercado. El evento subyacente no ha cambiado, pero su retorno potencial sí.",
        "Para una apuesta de 100 unidades, 1.85 devuelve 185 unidades si tiene éxito, mientras que 1.95 devuelve 195 unidades. A lo largo de un gran número de apuestas, aceptar repetidamente peores precios puede reducir materialmente los retornos incluso cuando las selecciones en sí mismas son idénticas.",
        "Por lo tanto, la comparación de precios es uno de los pocos aspectos de las apuestas que no requiere predecir el partido con mayor precisión. Si el mercado, la selección, las reglas de liquidación y el momento son genuinamente comparables, el precio disponible más alto ofrece un mejor retorno potencial por la misma apuesta."
      ],
      callout: {
        title: "Compare lo que es comparable",
        body:
          "Compruebe que la definición del mercado, la línea, las reglas de liquidación y el evento sean los mismos antes de tratar dos cuotas cotizadas como directamente comparables.",
        tone: "warning",
      },
    },
    {
      id: "why-odds-move",
      heading: "Por qué se mueven las cuotas antes de un partido",
      paragraphs: [
        "Las cuotas no son evaluaciones fijas. Pueden cambiar desde el momento en que se abre un mercado hasta que se cierran las apuestas. La nueva información sobre los equipos, las lesiones, las alineaciones confirmadas, el clima, los cambios en la programación, la actividad del mercado y el descubrimiento de precios más amplio pueden contribuir al movimiento.",
        "Las casas de apuestas también pueden ajustar los precios como parte de la gestión de riesgos o en respuesta al movimiento en otras partes del mercado. Como resultado, un movimiento en las cuotas no siempre revela una causa simple. Un precio a la baja puede reflejar información nueva significativa, presión del mercado o una combinación de factores.",
        "Es por esto que las capturas de pantalla históricas de un precio no deben confundirse con la disponibilidad actual. Un análisis útil debe identificar el precio real que se está evaluando y, siempre que sea posible, compararlo con las alternativas actuales del mercado."
      ],
    },
    {
      id: "value-and-break-even",
      heading: "Cuotas, probabilidad de equilibrio y valor",
      paragraphs: [
        "Cada precio implica una probabilidad de equilibrio antes de considerar los detalles de la transacción o la incertidumbre del modelo. Con cuotas decimales de 2.00, la tasa de equilibrio implícita es del 50%. A 1.80, es de aproximadamente 55.6%. A 2.50, es del 40%.",
        "Si su estimación de probabilidad es significativamente mayor que la probabilidad implícita en el precio ofrecido, la apuesta puede tener un valor esperado positivo bajo esa estimación. Si su estimación es menor, el precio puede ser desfavorable. La calidad de la conclusión depende totalmente de la calidad y calibración de la estimación de probabilidad.",
        "Por ejemplo, si unas cuotas de 2.20 implican alrededor de un 45.5% y un análisis estima el resultado en un 50%, existe una diferencia teórica positiva entre la probabilidad estimada y la probabilidad implícita del mercado. Esa diferencia no es una promesa de beneficio. Incluso una oportunidad de expectativa positiva correctamente identificada puede perder, y las estimaciones del modelo pueden ser erróneas."
      ],
      callout: {
        title: "El valor es probabilístico",
        body:
          "El valor esperado positivo describe una relación estimada a largo plazo entre la probabilidad y el precio. No significa que se espere que una apuesta individual gane con certeza.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal-context",
      heading: "Cómo utiliza MatchSignal las cuotas",
      paragraphs: [
        "MatchSignal compara los precios disponibles de las casas de apuestas y los datos del mercado, y luego combina esa información con el contexto del partido generado por IA. En una tarjeta de MatchSignal, Mejores Cuotas se refiere al precio de socio disponible más sólido identificado para la selección mostrada, mientras que Promedio de Mercado resume los precios de mercado muestreados utilizados en la comparación.",
        "La Probabilidad Justa es una estimación analítica y no una cotización de una casa de apuestas. Ventaja de Valor se utiliza para describir la diferencia entre el precio de mercado ofrecido y la evaluación basada en probabilidades de MatchSignal. Casas Muestreadas indica cuántas fuentes de casas de apuestas contribuyeron a la muestra de mercado relevante.",
        "Estos campos están diseñados para facilitar la inspección del contexto de los precios. No deben tratarse como garantías, asesoramiento financiero o certeza sobre un resultado deportivo. Las suposiciones del modelo, los cambios en el mercado, la calidad de los datos y la varianza deportiva ordinaria pueden afectar el resultado."
      ],
    },
    {
      id: "practical-checklist",
      heading: "Una lista de verificación práctica para leer cualquier mercado de apuestas",
      paragraphs: [
        "Cuando abra un mercado de apuestas, separe el análisis en precio, probabilidad e incertidumbre. Hacerlo evita varios errores comunes, como asumir que el favorito debe ganar o tratar un pago potencial alto como evidencia de que una apuesta es atractiva."
      ],
      bullets: [
        "Identifique el mercado y la selección exactos.",
        "Lea las cuotas decimales como un precio y calcule la probabilidad implícita.",
        "Compruebe si el mercado contiene margen de la casa de apuestas.",
        "Compare la misma selección en varias casas de apuestas cuando esté disponible.",
        "Separe su estimación de probabilidad de la probabilidad cotizada por la casa de apuestas.",
        "No trate un movimiento en las cuotas como prueba de que un lado ganará.",
        "Considere la incertidumbre, la varianza y el tamaño de la apuesta antes de tomar cualquier decisión."
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
    "Las apuestas conllevan un riesgo financiero y los resultados son inciertos. Las cuotas y las estimaciones de probabilidad no pueden garantizar un resultado. Utilice cantidades que pueda permitirse perder, evite intentar recuperar pérdidas y trate el análisis de apuestas como información en lugar de una promesa de beneficio.",
};

export default guide;
