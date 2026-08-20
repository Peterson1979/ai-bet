import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bookmaker-margin-overround",
  locale: "es",
  title: "¿Qué es el margen o overround de una casa de apuestas?",
  category: "odds-probability",
  status: "published",
  description:
    "Aprenda qué significan el margen y el overround de una casa de apuestas, cómo calcularlos a partir de las cuotas, por qué las probabilidades implícitas a menudo suman más del 100% y cómo el margen afecta la comparación de precios y el análisis de valor.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "El margen de la casa de apuestas, a menudo llamado overround o vig, es el colchón de precios integrado en muchos mercados de apuestas. Si cada resultado en un mercado perfectamente justo se convirtiera en probabilidad, las probabilidades sumarían el 100%. En los mercados reales de las casas de apuestas, las probabilidades implícitas derivadas de las cuotas cotizadas a menudo suman más del 100%. Ese exceso es el overround. Entenderlo es importante porque las probabilidades brutas de las casas de apuestas no son automáticamente probabilidades justas, y dos casas de apuestas pueden expresar opiniones similares sobre un evento mientras ofrecen precios materialmente diferentes.",
  keyTakeaways: [
    "El overround es la cantidad en la que las probabilidades implícitas brutas de todos los resultados mutuamente excluyentes superan el 100%.",
    "Un mercado de dos vías con un precio de 1.91 en ambos lados implica alrededor del 104.72% en total, lo que corresponde a un overround de aproximadamente 4.72 puntos porcentuales.",
    "La probabilidad implícita bruta de la casa de apuestas es un número derivado del precio, no automáticamente una estimación de probabilidad justa.",
    "Un overround más bajo generalmente significa precios más competitivos, si todo lo demás es igual.",
    "El margen puede no estar distribuido uniformemente entre todos los resultados, por lo que la normalización proporcional simple es solo una aproximación.",
    "Las cuotas reales disponibles para el usuario determinan la probabilidad de equilibrio y, por lo tanto, siguen siendo fundamentales para el análisis del valor esperado.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Qué significa el margen de la casa de apuestas",
      paragraphs: [
        "Una casa de apuestas normalmente no crea un mercado simplemente publicando probabilidades perfectamente justas. En cambio, los precios suelen establecerse de modo que las probabilidades implícitas combinadas superen el 100%. El exceso por encima del 100% se denomina comúnmente overround, margen de la casa de apuestas o vig.",
        "Por ejemplo, imagine un evento teórico de dos resultados en el que ambos lados se ofrecen a cuotas decimales de 1.91. Cada precio implica una probabilidad de aproximadamente el 52.36%. Sumar ambos da alrededor del 104.72%. La cantidad por encima del 100%, aproximadamente 4.72 puntos porcentuales, es el overround del mercado.",
        "Esto no significa que la casa de apuestas tenga garantizado ganar exactamente un 4,72% en cada mercado. Los resultados reales, la distribución de las apuestas, el movimiento de los precios, la actividad promocional, los límites, las decisiones de trading y el comportamiento del cliente afectan a los resultados obtenidos. El overround se entiende mejor como una propiedad de la estructura de precios cotizados que como una tasa de beneficio garantizada."
      ],
      callout: {
        title: "Estructura de precios, no beneficio garantizado",
        body:
          "El overround describe cómo se fija el precio de un mercado. No debe interpretarse como el beneficio garantizado de la casa de apuestas en un evento individual.",
        tone: "warning",
      },
    },
    {
      id: "calculation",
      heading: "Cómo calcular el overround a partir de cuotas decimales",
      paragraphs: [
        "El cálculo comienza convirtiendo las cuotas decimales de cada resultado en probabilidad implícita. Para las cuotas decimales, la probabilidad implícita es igual a 1 dividido por la cuota. Sume las probabilidades implícitas de todos los resultados mutuamente excluyentes en el mercado.",
        "Si el total es del 100%, el mercado está matemáticamente libre de margen antes de considerar cualquier otro factor práctico. Si el total es del 105%, el overround es de 5 puntos porcentuales. Si el total es del 108%, el overround es de 8 puntos porcentuales.",
        "La fórmula puede escribirse como: overround = suma de todas las probabilidades implícitas brutas − 100%."
      ],
      bullets: [
        "Convierta cada precio decimal usando 1 ÷ cuota.",
        "Sume las probabilidades implícitas de todos los resultados mutuamente excluyentes.",
        "Reste 100 puntos porcentuales del total.",
        "La cantidad restante es el overround del mercado cotizado.",
      ],
      callout: {
        title: "Ejemplo sencillo",
        body:
          "A 1.91 y 1.91, cada lado implica alrededor del 52.36%. El total es de aproximadamente 104.72%, por lo que el margen (overround) es de unos 4.72 puntos porcentuales.",
        tone: "example",
      },
    },
    {
      id: "three-way",
      heading: "Margen en un mercado de fútbol de tres resultados",
      paragraphs: [
        "Los mercados de fútbol de tres resultados ofrecen un ejemplo útil porque la victoria local, el empate y la victoria visitante son resultados mutuamente excluyentes. Supongamos que las cuotas son 2.10 para el equipo local, 3.40 para el empate y 3.60 para el equipo visitante.",
        "Las probabilidades implícitas son aproximadamente 47.62%, 29.41% y 27.78%. Sumadas, totalizan alrededor del 104.81%. El margen resultante es, por tanto, de aproximadamente 4.81 puntos porcentuales.",
        "Las tres cuotas no implican que el evento tenga de alguna manera un 104.81% de probabilidad total en la realidad. El exceso aparece porque las cuotas cotizadas incluyen un margen y otras consideraciones comerciales."
      ],
      bullets: [
        "Local 2.10 → aproximadamente 47.62%",
        "Empate 3.40 → aproximadamente 29.41%",
        "Visitante 3.60 → aproximadamente 27.78%",
        "Total → aproximadamente 104.81%",
        "Margen (overround) → aproximadamente 4.81 puntos porcentuales",
      ],
    },
    {
      id: "raw-vs-fair",
      heading: "Probabilidad implícita bruta frente a probabilidad justa",
      paragraphs: [
        "Una probabilidad implícita bruta proviene directamente de una cuota cotizada. Si una casa de apuestas ofrece cuotas decimales de 2.00, la probabilidad implícita bruta es del 50%. Ese número describe el umbral de equilibrio incorporado en la cuota disponible.",
        "Una estimación de probabilidad justa o sin margen es diferente. Intenta eliminar el efecto del margen de beneficio (overround) del mercado para que las probabilidades de resultados mutuamente excluyentes sumen el 100%.",
        "Esta distinción es importante porque llamar probabilidad justa a toda probabilidad bruta de una casa de apuestas puede exagerar la confianza aparente del mercado. En un mercado que suma el 105%, las probabilidades implícitas brutas de la casa de apuestas describen colectivamente más del 100% de probabilidad, lo cual es imposible para resultados exhaustivos y mutuamente excluyentes."
      ],
      callout: {
        title: "No mezcle ambos conceptos",
        body:
          "La probabilidad implícita bruta proviene del precio que realmente puede obtener. La probabilidad justa es una estimación analítica tras ajustar el margen.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Una forma sencilla de eliminar el margen de beneficio",
      paragraphs: [
        "Una forma común de estimar probabilidades sin margen es la normalización proporcional. Divida cada probabilidad implícita bruta por la suma de todas las probabilidades implícitas brutas. Las probabilidades ajustadas sumarán entonces el 100%.",
        "Supongamos que un mercado de dos vías tiene probabilidades implícitas brutas del 55% y 50%, para un total del 105%. La normalización proporcional da aproximadamente un 52,38% para el primer lado y un 47,62% para el segundo.",
        "Este método es sencillo y útil para la comparación de mercados, pero asume que el margen se distribuye proporcionalmente entre los resultados. En mercados reales, esa suposición puede ser imperfecta. Las casas de apuestas pueden ajustar los precios de manera diferente según la demanda esperada, la información, la responsabilidad, la profundidad del mercado o las características de los resultados individuales.",
        "Por esa razón, una probabilidad normalizada debe describirse como una estimación de mercado sin margen en lugar de la probabilidad objetivamente verdadera del evento."
      ],
      bullets: [
        "Probabilidades brutas: 55% y 50%.",
        "Total del mercado: 105%.",
        "Primer lado normalizado: 55 ÷ 105 ≈ 52,38%.",
        "Segundo lado normalizado: 50 ÷ 105 ≈ 47.62%.",
        "Total normalizado: 100%.",
      ],
      callout: {
        title: "La normalización es una estimación",
        body:
          "Eliminar el margen de beneficio (overround) matemáticamente no revela una probabilidad verdadera perfecta. Crea un punto de referencia basado en el mercado más limpio.",
        tone: "info",
      },
    },
    {
      id: "uneven-margin",
      heading: "Por qué el margen no siempre se distribuye de manera uniforme",
      paragraphs: [
        "Es tentador imaginar que una casa de apuestas simplemente añade el mismo porcentaje de margen a cada selección. La creación de mercado real suele ser más compleja. Algunos resultados pueden atraer más demanda del público, otros pueden ser más difíciles de valorar y algunos mercados pueden tener menor liquidez o mayor incertidumbre.",
        "Por lo tanto, un corredor de apuestas puede ajustar un lado de manera más agresiva que otro. En mercados de resultados poco probables, la relación puede volverse especialmente desigual: los resultados con cuotas altas pueden conllevar un margen efectivo diferente al de los favoritos con cuotas bajas.",
        "Esta es una de las razones por las que los cálculos proporcionales sin margen (no-vig) no deben tratarse como probabilidades justas exactas. Existen métodos más avanzados de eliminación de margen, pero todos dependen de suposiciones sobre cómo se distribuye el margen de beneficio."
      ],
      callout: {
        title: "El margen de beneficio no es necesariamente simétrico",
        body:
          "Dos resultados pueden contribuir de manera diferente al margen total de un corredor de apuestas. Un ajuste proporcional simple es útil, pero sigue siendo un modelo.",
        tone: "warning",
      },
    },
    {
      id: "price-comparison",
      heading: "Por qué un margen más bajo generalmente significa mejores precios",
      paragraphs: [
        "Si dos casas de apuestas tienen evaluaciones similares de un evento pero una opera con un margen de beneficio más bajo, el mercado con menor margen generalmente ofrecerá precios más competitivos al apostador.",
        "Consideremos dos mercados simples de dos opciones. La casa de apuestas A cotiza ambos lados a 1.91, lo que produce un margen (overround) de aproximadamente 4.72%. La casa de apuestas B cotiza ambos lados a 1.96, lo que produce una probabilidad implícita total de aproximadamente 102.04% y un margen de aproximadamente 2.04%.",
        "Para una apuesta ganadora de una unidad, 1.96 devuelve más que 1.91. Más importante aún, el precio más alto reduce la probabilidad de equilibrio (break-even) de aproximadamente 52.36% a aproximadamente 51.02%. Esa diferencia puede afectar materialmente el valor esperado en apuestas repetidas.",
        "Es por esto que comparar las cuotas actuales en mercados equivalentes puede ser útil incluso sin realizar una mejor predicción. El evento subyacente no cambia, pero el precio disponible puede mejorar."
      ],
      bullets: [
        "1.91 / 1.91 → aproximadamente 4.72% de margen.",
        "1.96 / 1.96 → aproximadamente 2.04% de margen.",
        "Unas cuotas equivalentes más altas reducen la probabilidad de equilibrio requerida.",
        "Confirme siempre que las reglas del mercado y las condiciones de liquidación sean comparables.",
      ],
    },
    {
      id: "margin-and-ev",
      heading: "Cómo afecta el margen de la casa de apuestas al valor esperado",
      paragraphs: [
        "El valor esperado depende de la probabilidad de un resultado y del precio real disponible. Debido a que el margen de la casa de apuestas generalmente reduce los precios en relación con un mercado teórico sin margen, el margen aumenta la tasa de éxito requerida para alcanzar el punto de equilibrio.",
        "Supongamos que estima un resultado en 52%. Con cuotas decimales de 2.00, el VE teórico es 0.52 × 2.00 − 1 = +4%. A 1.90, el VE se convierte en 0.52 × 1.90 − 1 = −1.2%. La estimación de probabilidad no cambia, pero el precio más bajo cambia la conclusión.",
        "Esto ilustra por qué una buena predicción no es suficiente por sí sola. El precio determina si la estimación de probabilidad se traduce en un valor esperado positivo, neutral o negativo."
      ],
      callout: {
        title: "El margen cambia el umbral",
        body:
          "Un precio más bajo requiere una tasa de acierto más alta para alcanzar el punto de equilibrio. Por eso la calidad del precio importa independientemente de la calidad de la predicción.",
        tone: "info",
      },
    },
    {
      id: "market-types",
      heading: "El margen puede variar según el deporte y el tipo de mercado",
      paragraphs: [
        "El margen de la casa de apuestas no es fijo en todos los deportes o mercados. Los eventos importantes de alta liquidez pueden tener precios relativamente competitivos, mientras que las ligas de nicho, los mercados derivados, las apuestas de proposición o los eventos de baja liquidez pueden tener márgenes más amplios.",
        "Incluso dentro del mismo partido, el mercado principal de línea de dinero o ganador del partido puede tener un overround diferente al de los totales, hándicaps, apuestas de proposición de jugadores o mercados de marcador exacto. Los mercados con muchos resultados posibles también pueden acumular un overround total sustancial.",
        "Por esa razón, comparar un único número de margen entre tipos de mercado no relacionados puede ser engañoso. La comparación más útil suele ser entre casas de apuestas que cotizan el mismo mercado en el mismo evento aproximadamente al mismo tiempo."
      ],
    },
    {
      id: "changing-margin",
      heading: "Por qué el overround puede cambiar antes de un partido",
      paragraphs: [
        "Los mercados son dinámicos. A medida que se acerca un partido, puede llegar nueva información, la liquidez puede aumentar, las casas de apuestas competidoras pueden mover los precios y las casas de apuestas pueden alterar su exposición al riesgo. Por lo tanto, el overround total del mercado puede cambiar con el tiempo.",
        "En algunos eventos de alto perfil, los precios pueden volverse más competitivos a medida que el mercado madura. En otras situaciones, la incertidumbre o las decisiones operativas pueden llevar a precios más amplios. No existe una regla universal de que el margen deba caer siempre a medida que se acerca el inicio del partido.",
        "Por lo tanto, un cálculo de margen es una instantánea basada en los precios utilizados en ese momento. El overround histórico y el overround actual no deben tratarse como intercambiables."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Errores comunes al interpretar el margen de la casa de apuestas",
      paragraphs: [
        "Un error común es tratar el overround como el porcentaje de beneficio garantizado de la casa de apuestas. No lo es. Otro es asumir que las probabilidades implícitas brutas son probabilidades justas. Son umbrales de equilibrio derivados del precio y comúnmente incluyen margen.",
        "Un tercer error es comparar el overround entre mercados con diferentes estructuras de resultados sin contexto. Un mercado de partido a tres bandas, un mercado de totales a dos bandas y un mercado de marcador exacto no son directamente comparables simplemente porque cada uno produce un único porcentaje de margen.",
        "Finalmente, eliminar el margen no elimina la incertidumbre. Una estimación de mercado sin margen (no-vig) aún puede ser incorrecta, obsoleta o incompleta. Es un punto de referencia analítico útil, no una garantía de la verdadera distribución de probabilidad del evento."
      ],
      bullets: [
        "No interprete el overround como una ganancia garantizada de la casa de apuestas.",
        "No califique automáticamente las probabilidades implícitas brutas como justas.",
        "No asuma que el margen se distribuye uniformemente entre los resultados.",
        "No compare tipos de mercado no relacionados sin contexto.",
        "No trate las probabilidades sin margen como ciertas u objetivamente verdaderas.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Cómo encaja el margen en el análisis de MatchSignal",
      paragraphs: [
        "MatchSignal compara los precios de las casas de apuestas y los datos del mercado para proporcionar contexto sobre las selecciones actuales. El promedio del mercado resume los precios de mercado muestreados, mientras que la Probabilidad Justa es una estimación de probabilidad analítica en lugar de un porcentaje implícito bruto de la casa de apuestas.",
        "La Ventaja de Valor (Value Edge) tiene como objetivo describir la relación entre el precio de mercado disponible y la evaluación basada en probabilidades de MatchSignal. Debido a que los precios de las casas de apuestas pueden incluir margen, un análisis útil debe distinguir entre el precio bruto disponible para el usuario y cualquier estimación de probabilidad sin margen o basada en modelos.",
        "Las Casas de Apuestas Muestreadas indican cuántas fuentes de casas de apuestas contribuyeron a la muestra de mercado relevante. Una muestra más amplia puede proporcionar más contexto sobre los precios del mercado, pero no elimina la incertidumbre ni garantiza que la estimación resultante sea correcta.",
        "Las Mejores Cuotas reflejan el precio de socio disponible más sólido identificado para la selección mostrada. Dado que el precio de ejecución real determina la probabilidad de equilibrio, incluso una diferencia modesta entre las casas de apuestas puede afectar el cálculo del valor."
      ],
      callout: {
        title: "El precio de mercado y la probabilidad analítica son diferentes",
        body:
          "MatchSignal separa los precios disponibles del análisis basado en probabilidades para que los usuarios puedan examinar la relación en lugar de tratar las cuotas de las casas de apuestas como una certeza.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Una lista de verificación práctica sobre el overround",
      paragraphs: [
        "Al revisar el margen de la casa de apuestas, utilice la siguiente secuencia para evitar los errores de interpretación más comunes."
      ],
      bullets: [
        "Identifique todos los resultados mutuamente excluyentes en el mercado exacto.",
        "Convierta cada cuota decimal cotizada a probabilidad implícita.",
        "Sume las probabilidades implícitas brutas.",
        "Reste el 100% para calcular el overround del mercado.",
        "Si es necesario, normalice las probabilidades para crear un punto de referencia simple sin margen.",
        "Recuerde que la normalización proporcional es una suposición, no una verdad absoluta.",
        "Compare mercados equivalentes entre casas de apuestas en momentos similares.",
        "Utilice las cuotas reales disponibles al calcular la probabilidad de equilibrio y el valor esperado (EV).",
        "Considere un overround más bajo como una ventaja en el precio, no como una garantía de mejores predicciones.",
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
    "Comprender el margen de las casas de apuestas puede ayudarle a evaluar los precios con mayor claridad, pero un margen más bajo o mejores cuotas no eliminan el riesgo financiero de las apuestas. Los resultados siguen siendo inciertos, las estimaciones de probabilidad pueden ser erróneas y pueden producirse pérdidas incluso cuando un precio parece favorable. Apueste solo cantidades que pueda permitirse perder, utilice límites predeterminados y nunca intente recuperar las pérdidas.",
};

export default guide;
