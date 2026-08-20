import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "flat-stakes-vs-percentage-staking",
  locale: "es",
  title: "Apuestas fijas frente a apuestas porcentuales",
  category: "bankroll-risk",
  status: "published",
  description:
    "Compare las apuestas fijas y las apuestas porcentuales en las apuestas deportivas, comprenda cómo cada método afecta la volatilidad del bankroll, las rachas de pérdidas, el mantenimiento de registros y el riesgo, y aprenda cuándo puede ser más fácil gestionar cada enfoque.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Las apuestas fijas y las apuestas porcentuales son dos formas comunes de decidir cuánto del bankroll de apuestas arriesgar en cada apuesta. Las apuestas fijas utilizan la misma cantidad de apuesta repetidamente, mientras que las apuestas porcentuales utilizan un porcentaje fijo del bankroll actual, lo que hace que el tamaño de la apuesta aumente o disminuya a medida que cambia el bankroll. Ninguno de los enfoques crea una ventaja por sí solo. Su propósito es el control del riesgo y la consistencia. La mejor opción depende de cuánta simplicidad, estabilidad y ajuste automático del bankroll desee el apostador.",
  keyTakeaways: [
    "Las apuestas fijas utilizan la misma cantidad de apuesta en todas las apuestas, mientras que las apuestas porcentuales utilizan un porcentaje fijo del bankroll actual.",
    "Las apuestas fijas son simples y facilitan la evaluación del rendimiento de la estrategia.",
    "Las apuestas porcentuales reducen automáticamente la exposición durante las rachas de pérdidas y aumentan la exposición después del crecimiento del bankroll.",
    "Ningún método de apuesta puede hacer que una estrategia de valor esperado negativo sea rentable.",
    "Los porcentajes de apuesta grandes pueden crear una volatilidad severa incluso cuando la regla de apuesta en sí es consistente.",
    "La calidad de la probabilidad subyacente y la decisión sobre el precio importan más que la fórmula de apuesta.",
    "Un plan de apuestas debe elegirse antes de comenzar a apostar y no debe cambiarse impulsivamente después de ganar o perder.",
  ],
  sections: [
    {
      id: "flat-staking",
      heading: "¿Qué son las apuestas fijas?",
      paragraphs: [
        "Las apuestas fijas significan arriesgar la misma cantidad fija en cada apuesta, independientemente de los resultados recientes o los cambios en el tamaño del bankroll.",
        "Por ejemplo, un apostador podría decidir que una unidad equivale a 10 unidades de moneda y apostar una unidad en cada selección. Ya sea que el bankroll aumente de 1.000 a 1.100 o caiga a 900, la siguiente apuesta sigue siendo 10.",
        "La principal ventaja es la simplicidad. El rendimiento es fácil de seguir porque los grandes cambios en las apuestas no distorsionan el registro. Si una estrategia gana o pierde, el resultado se debe principalmente a las selecciones y a las cuotas, en lugar de a cambios agresivos en el tamaño de la posición."
      ],
      callout: {
        title: "Apuesta plana no significa libre de riesgo",
        body:
          "Una apuesta fija aún puede volverse demasiado grande en relación con el bankroll después de una reducción importante (drawdown).",
        tone: "warning",
      },
    },
    {
      id: "percentage-staking",
      heading: "¿Qué es la apuesta por porcentaje?",
      paragraphs: [
        "La apuesta por porcentaje arriesga un porcentaje fijo del bankroll actual en cada apuesta. Si el bankroll cambia, la apuesta cambia con él.",
        "Supongamos que el bankroll es de 1.000 y la regla de apuesta es del 1%. La primera apuesta es 10. Si el bankroll cae posteriormente a 800, la siguiente apuesta del 1% se convierte en 8. Si el bankroll crece a 1.200, la siguiente apuesta se convierte en 12.",
        "Esto crea un mecanismo de ajuste automático. La exposición cae durante los periodos de pérdida y aumenta gradualmente durante los periodos de ganancia."
      ],
      bullets: [
        "Bankroll de 1.000 al 1% → apuesta de 10 unidades.",
        "Bankroll de 800 al 1% → apuesta de 8 unidades.",
        "Bankroll de 1.200 al 1% → apuesta de 12 unidades.",
      ],
    },
    {
      id: "main-difference",
      heading: "La diferencia fundamental entre ambos métodos",
      paragraphs: [
        "La diferencia central radica en si la apuesta permanece fija en términos monetarios o fija en relación con el tamaño del bankroll.",
        "La apuesta plana mantiene constante el tamaño de la apuesta. La apuesta porcentual mantiene aproximadamente constante la proporción del bankroll en riesgo.",
        "Esa distinción cambia cómo se comporta cada método durante las rachas de pérdidas (drawdowns). Con la apuesta plana, la misma apuesta se convierte en un porcentaje mayor del bankroll restante a medida que se acumulan las pérdidas. Con la apuesta porcentual, la apuesta se vuelve automáticamente más pequeña.",
        "Durante el crecimiento del bankroll, ocurre lo contrario. Las apuestas planas se convierten en un porcentaje menor del bankroll con el tiempo, mientras que las apuestas porcentuales aumentan."
      ],
      callout: {
        title: "Cantidad constante frente a proporción constante",
        body:
          "La apuesta plana estabiliza el monto de la apuesta. La apuesta porcentual estabiliza la proporción del bankroll en riesgo.",
        tone: "info",
      },
    },
    {
      id: "drawdowns",
      heading: "Cómo se comporta cada método durante las rachas de pérdidas",
      paragraphs: [
        "Las rachas de pérdidas son períodos en los que el bankroll cae desde un pico anterior. Son normales en las apuestas deportivas porque la varianza puede producir rachas perdedoras incluso cuando el proceso subyacente es razonable.",
        "La apuesta plana no reacciona automáticamente ante una racha de pérdidas. Si el apostador continúa arriesgando 10 unidades mientras el bankroll cae de 1,000 a 700, la apuesta aumenta del 1% a aproximadamente el 1.43% del bankroll.",
        "La apuesta porcentual reacciona automáticamente. Una apuesta del 1% sobre un bankroll de 700 es de 7 unidades, lo que reduce el tamaño de las pérdidas posteriores en términos monetarios.",
        "Esta característica defensiva es uno de los argumentos más sólidos a favor de la apuesta porcentual, especialmente cuando el objetivo principal es la preservación del bankroll."
      ],
    },
    {
      id: "growth",
      heading: "Cómo se comporta cada método durante el crecimiento del bankroll",
      paragraphs: [
        "Cuando un bankroll crece, las apuestas planas se vuelven progresivamente más conservadoras porque la apuesta fija representa un porcentaje menor del capital total.",
        "Si una apuesta de 10 unidades era originalmente el 1% de un bankroll de 1,000, se convierte en solo el 0.67% de un bankroll de 1,500.",
        "Las apuestas porcentuales aumentan la apuesta junto con el bankroll. Al 1%, un bankroll de 1,500 produce una apuesta de 15 unidades. Esto permite que el tamaño de la posición se capitalice a medida que crece el capital.",
        "La capitalización puede acelerar las ganancias durante periodos favorables, pero también aumenta el tamaño absoluto de las pérdidas cuando las apuestas más grandes eventualmente pierden."
      ],
      callout: {
        title: "La capitalización funciona en ambas direcciones.",
        body:
          "Las apuestas porcentuales aumentan el tamaño de la apuesta a medida que crece el bankroll, pero las pérdidas futuras también son mayores en términos absolutos.",
        tone: "warning",
      },
    },
    {
      id: "record-keeping",
      heading: "¿Qué método es más fácil de evaluar?",
      paragraphs: [
        "Las apuestas planas suelen ser más fáciles para evaluar la calidad de una estrategia de apuestas porque cada selección conlleva el mismo peso nominal.",
        "Si 100 apuestas son todas de una unidad, el registro de pérdidas y ganancias refleja el desempeño del proceso de selección sin que una gran variación en el tamaño de la apuesta domine el resultado.",
        "Las apuestas porcentuales crean tamaños de apuesta cambiantes. Una apuesta posterior puede tener un efecto financiero mayor que una anterior simplemente porque el bankroll creció.",
        "Para investigación, pruebas de modelos o comparación de estrategias, las unidades planas pueden proporcionar un registro de desempeño más claro. Las apuestas porcentuales pueden ser más adecuadas cuando la preocupación principal es controlar la exposición en relación con el bankroll actual."
      ],
    },
    {
      id: "variance",
      heading: "Varianza bajo apuestas planas y porcentuales",
      paragraphs: [
        "Ningún método de apuesta elimina la varianza de los resultados deportivos. Ambos experimentarán rachas ganadoras y perdedoras.",
        "La diferencia radica en cómo esos resultados se traducen en el movimiento del bankroll. Con las apuestas porcentuales, el tamaño monetario de las oscilaciones se ajusta automáticamente al tamaño del bankroll. Con las apuestas fijas, la misma oscilación monetaria continúa independientemente de las ganancias o pérdidas recientes.",
        "Con tamaños de apuesta conservadores, ambos enfoques pueden producir una volatilidad manejable. Con tamaños de apuesta agresivos, ambos pueden volverse peligrosos.",
        "El porcentaje en sí importa más que si el método se denomina apuesta fija o porcentual. Una apuesta constante del 10% puede ser mucho más peligrosa que una unidad fija conservadora del 1%."
      ],
      callout: {
        title: "La consistencia no es suficiente",
        body:
          "Una regla de apuesta puede ser perfectamente consistente y aun así ser demasiado agresiva. El tamaño de la apuesta en relación con el bankroll sigue siendo crítico.",
        tone: "warning",
      },
    },
    {
      id: "expected-value",
      heading: "Las apuestas no crean valor esperado",
      paragraphs: [
        "Un sistema de apuestas no puede transformar un mal precio en uno bueno. El valor esperado proviene de la relación entre la probabilidad y las cuotas.",
        "Si una apuesta tiene un valor esperado negativo, apostar el 1%, el 2% o una cantidad fija de 10 unidades no cambia la economía subyacente. Solo cambia el tamaño de la pérdida esperada y la volatilidad en torno a ella.",
        "Del mismo modo, una estrategia con valor esperado positivo puede verse perjudicada por un tamaño de apuesta excesivo. Una ventaja real no protege al bankroll de la ruina si la exposición es demasiado agresiva.",
        "Por lo tanto, el orden correcto es: evaluar primero el mercado y el precio, y luego aplicar una regla de apuesta con control de riesgo."
      ],
      bullets: [
        "La probabilidad y el precio determinan el valor esperado (EV).",
        "El tamaño de la apuesta determina la exposición.",
        "El stake cambia el tamaño de los resultados, no la calidad de la apuesta subyacente.",
        "Ningún sistema de apuestas garantiza beneficios.",
      ],
    },
    {
      id: "percentage-example",
      heading: "Un ejemplo de apuesta porcentual",
      paragraphs: [
        "Considere un bankroll de 1.000 unidades utilizando un stake porcentual del 2%. La primera apuesta es de 20.",
        "Si la apuesta pierde, el bankroll pasa a ser 980 y el siguiente stake del 2% pasa a ser 19,60. Otra pérdida deja 960,40, y la siguiente apuesta pasa a ser 19,21.",
        "El stake se contrae a medida que el bankroll disminuye. Esto ralentiza la tasa absoluta de pérdida en comparación con seguir apostando una cantidad fija de 20 unidades.",
        "Si el bankroll crece posteriormente, el proceso se invierte y los stakes aumentan gradualmente."
      ],
      callout: {
        title: "Escalado automático",
        body:
          "El stake porcentual reduce la exposición absoluta durante las pérdidas sin requerir que el apostador tome una nueva decisión discrecional.",
        tone: "example",
      },
    },
    {
      id: "flat-example",
      heading: "Un ejemplo de apuesta plana",
      paragraphs: [
        "Ahora considere el mismo bankroll de 1.000 unidades utilizando un stake fijo de 20 unidades.",
        "Tras una pérdida, el bankroll es de 980, pero la siguiente apuesta sigue siendo de 20. Tras dos pérdidas, el bankroll es de 960 y la tercera apuesta sigue siendo de 20.",
        "La cantidad fija facilita el seguimiento, pero la apuesta ahora representa alrededor del 2,08% del bankroll reducido en lugar del 2% original.",
        "Si el bankroll cae sustancialmente, se debe revisar la apuesta plana en lugar de permitir que se convierta en un porcentaje cada vez mayor del capital restante."
      ],
    },
    {
      id: "rebalancing",
      heading: "Un enfoque híbrido: reequilibrio periódico",
      paragraphs: [
        "Algunos apostadores utilizan un enfoque híbrido: apuestas planas durante un período, seguidas de un recálculo ocasional del tamaño de la unidad.",
        "Por ejemplo, una unidad podría establecerse en el 1% del bankroll al comienzo de cada mes o después de que el bankroll cambie en una cantidad predefinida.",
        "Esto preserva gran parte de la simplicidad de las apuestas planas, al tiempo que evita que una unidad fija se vuelva demasiado grande o demasiado pequeña en relación con el bankroll.",
        "La clave es que las reglas de reequilibrio deben estar predeterminadas. Cambiar constantemente el tamaño de la apuesta tras ganancias o pérdidas emocionales anula el propósito de tener un marco de apuestas."
      ],
    },
    {
      id: "confidence-staking",
      heading: "¿Deberían cambiar las apuestas según la confianza?",
      paragraphs: [
        "Algunos apostadores varían el tamaño de la apuesta según la ventaja percibida o la confianza. En teoría, un valor esperado positivo más fuerte puede justificar una mayor exposición.",
        "El problema práctico es el error de estimación. Si un apostador tiene un exceso de confianza sobre qué selecciones tienen la mayor ventaja, las apuestas variables pueden magnificar los errores.",
        "Por esa razón, las apuestas planas o de porcentaje simple suelen ser más fáciles de auditar y controlar. Las apuestas variables más avanzadas solo deben considerarse cuando las estimaciones de probabilidad están bien calibradas y existen límites estrictos de exposición máxima.",
        "Una etiqueta como 'alta confianza' nunca debe tratarse como una certeza."
      ],
      callout: {
        title: "La confianza puede estar mal calibrada.",
        body:
          "Las apuestas variables magnifican tanto las evaluaciones de confianza correctas como las incorrectas.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "En qué se diferencia el Criterio de Kelly",
      paragraphs: [
        "El Criterio de Kelly no es ni una apuesta plana ni una apuesta de porcentaje fijo simple. Calcula una fracción recomendada del bankroll basada en la ventaja estimada y las cuotas.",
        "En teoría, Kelly adapta el tamaño de la apuesta a la fuerza de la oportunidad estimada. En la práctica, es altamente sensible al error de probabilidad.",
        "Si la estimación de probabilidad es demasiado optimista, el Kelly completo puede recomendar una apuesta excesivamente grande. Por esta razón, a menudo se utilizan enfoques de Kelly fraccional para reducir la volatilidad.",
        "Para la mayoría de los usuarios, la lección importante no es que una fórmula sea superior. Es que una gestión de apuestas más compleja requiere estimaciones de probabilidad más fiables y controles de riesgo más sólidos."
      ],
    },
    {
      id: "psychology",
      heading: "¿Qué método es más fácil de seguir emocionalmente?",
      paragraphs: [
        "Las apuestas planas pueden parecer más fáciles porque el importe no cambia tras las ganancias o pérdidas. Esto reduce la tentación de interpretar los cambios en las apuestas como reacciones emocionales.",
        "Las apuestas por porcentaje también pueden fomentar la disciplina porque el ajuste es automático y basado en reglas. Una apuesta menor tras las pérdidas no es un castigo; es simplemente el resultado de un bankroll menor.",
        "Los problemas surgen cuando los apostadores abandonan cualquiera de los dos métodos tras una racha. Aumentar las apuestas tras las pérdidas para recuperar dinero o aumentarlas tras las ganancias debido a un exceso de confianza introduce un riesgo discrecional.",
        "El mejor método de gestión de apuestas suele ser aquel que puede seguirse de forma constante sin fomentar cambios impulsivos."
      ],
    },
    {
      id: "matchsignal",
      heading: "Cómo se relaciona la gestión de apuestas con MatchSignal",
      paragraphs: [
        "MatchSignal proporciona contexto analítico que incluye Mejores Cuotas, Promedio del Mercado, Probabilidad Justa, Ventaja de Valor, Casas de Apuestas Muestreadas y Nivel de Riesgo.",
        "Estos campos no son instrucciones de apuesta. Una clasificación de Riesgo Bajo o una Ventaja de Valor mayor no deberían provocar automáticamente una apuesta mayor.",
        "El tamaño de la apuesta debe determinarse mediante un marco personal de gestión de fondos que tenga en cuenta la asequibilidad, la incertidumbre, la varianza y los límites del juego responsable.",
        "El análisis de MatchSignal es informativo y no garantiza resultados ni recomienda una exposición financiera específica."
      ],
      callout: {
        title: "El análisis y el tamaño de la apuesta son decisiones independientes",
        body:
          "Una señal analítica fuerte no elimina la incertidumbre y no debe prevalecer sobre las reglas conservadoras de gestión de fondos.",
        tone: "warning",
      },
    },
    {
      id: "comparison",
      heading: "Apuestas planas frente a apuestas porcentuales: Comparativa",
      paragraphs: [
        "Ambos métodos pueden ser sensatos cuando las apuestas son conservadoras y las reglas se siguen de forma constante. Sus puntos fuertes son diferentes."
      ],
      bullets: [
        "Apuestas planas: las más sencillas de entender y realizar un seguimiento.",
        "Apuestas planas: útiles para evaluar el rendimiento de la estrategia.",
        "Apuestas planas: pueden volverse demasiado grandes en relación con el bankroll después de una racha de pérdidas profunda.",
        "Apuestas porcentuales: reducen automáticamente la exposición durante las rachas de pérdidas.",
        "Apuestas porcentuales: generan interés compuesto automáticamente durante el crecimiento del bankroll.",
        "Apuestas porcentuales: producen tamaños de apuesta variables que pueden hacer que la evaluación sea menos intuitiva.",
        "Ambos métodos: requieren niveles de apuesta conservadores y no pueden crear una ventaja.",
      ],
    },
    {
      id: "checklist",
      heading: "Una lista de verificación práctica para las apuestas",
      paragraphs: [
        "Independientemente del método elegido, la regla de apuesta debe ser lo suficientemente simple como para seguirla tanto en condiciones de victoria como de derrota."
      ],
      bullets: [
        "Separe el capital destinado a las apuestas del dinero esencial.",
        "Elija apuestas planas o porcentuales antes de comenzar a apostar.",
        "Mantenga la apuesta conservadora en relación con el bankroll.",
        "No aumente las apuestas para recuperar pérdidas.",
        "Revise si una apuesta plana se ha vuelto demasiado grande después de una racha de pérdidas.",
        "Si utiliza apuestas porcentuales, calcule de manera consistente a partir del bankroll actual.",
        "Evite cambios discrecionales frecuentes basados en resultados recientes.",
        "Realice un seguimiento preciso de las apuestas y de los cambios en su bankroll.",
        "Trate las apuestas variables avanzadas con cautela cuando las estimaciones de probabilidad sean inciertas.",
        "Detenga o reduzca las apuestas si aumenta la presión financiera o emocional.",
      ],
    },
  ],
  relatedGuides: [
    "bankroll-management",
    "variance-sports-betting",
    "expected-value-sports-betting",
    "why-chasing-losses-is-dangerous",
    "winning-streaks-misleading",
  ],
  responsibleGamblingNote:
    "Las apuestas planas y las apuestas porcentuales son métodos de gestión de riesgos, no garantías de beneficios. Cualquier estrategia de apuestas puede perder dinero. Mantenga las apuestas dentro de las cantidades que pueda permitirse perder, separe los fondos de apuestas del dinero esencial, evite aumentar las apuestas para recuperar pérdidas y deténgase si las apuestas le causan daño financiero o emocional.",
};

export default guide;
