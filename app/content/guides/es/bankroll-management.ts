import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bankroll-management",
  locale: "es",
  title: "Explicación de la gestión de fondos (bankroll)",
  category: "bankroll-risk",
  status: "published",
  description:
    "Aprenda cómo funciona la gestión de fondos en las apuestas deportivas, por qué son importantes el tamaño de la apuesta y los límites de riesgo, cómo las rachas negativas (drawdowns) y la varianza afectan a un fondo, y cómo una estrategia de apuestas disciplinada puede reducir el riesgo de ruina.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "La gestión de fondos es el proceso de decidir cuánto dinero se reserva para apostar y cuánto de ese fondo se arriesga en cada apuesta. No mejora la probabilidad de que una selección gane, pero puede reducir el daño causado por las rachas de pérdidas, la varianza y las estimaciones incorrectas. Una buena gestión de fondos se centra principalmente en la supervivencia, la consistencia y la limitación del daño financiero. Ayuda a evitar que una mala racha elimine todo el fondo y reduce la tentación de tomar decisiones impulsivas después de ganar o perder.",
  keyTakeaways: [
    "El fondo para apuestas debe estar separado del dinero necesario para gastos de manutención, facturas, ahorros o emergencias.",
    "El tamaño de la apuesta controla con qué intensidad afecta cada resultado al fondo.",
    "Las apuestas con un porcentaje menor generalmente reducen la volatilidad y el riesgo de ruina.",
    "Ningún sistema de apuestas puede convertir una estrategia de expectativa negativa en una positiva.",
    "Las reglas de gestión de fondos deben decidirse antes de que aparezca la presión emocional de las ganancias o las pérdidas.",
    "Las rachas negativas (drawdowns) son normales en procesos inciertos y deben ser previstas.",
    "Intentar recuperar las pérdidas aumentando las apuestas puede incrementar rápidamente el riesgo financiero.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Qué es un fondo para apuestas",
      paragraphs: [
        "Un fondo para apuestas es una cantidad de dinero dedicada y reservada específicamente para la actividad de apuestas. Debe estar financieramente separado del alquiler, los pagos de hipotecas, la comida, el pago de deudas, los ahorros de emergencia y otros fondos esenciales.",
        "Esta separación crea un límite claro. Si el bankroll disminuye, la pérdida permanece dentro de una cantidad que ya se había designado como asequible para perder.",
        "Por lo tanto, un bankroll debe verse como capital de riesgo en lugar de como ingresos. Los rendimientos de las apuestas son inciertos, e incluso un proceso con valor esperado positivo puede experimentar largos periodos de pérdidas."
      ],
      callout: {
        title: "El bankroll es un límite, no un objetivo",
        body:
          "Un bankroll dedicado ayuda a definir cuánto riesgo financiero es aceptable. Nunca debe financiarse con dinero necesario para gastos esenciales.",
        tone: "warning",
      },
    },
    {
      id: "why-management-matters",
      heading: "Por qué es importante la gestión del bankroll",
      paragraphs: [
        "Los resultados de las apuestas deportivas son inciertos. Incluso las buenas estimaciones de probabilidad pueden ser erróneas en eventos individuales, y la varianza ordinaria puede crear rachas de pérdidas.",
        "Sin un enfoque estructurado de apuestas, un apostador puede arriesgar demasiado en una sola selección, aumentar las apuestas después de las pérdidas o dejar que una breve racha ganadora cree un exceso de confianza.",
        "La gestión del bankroll reduce estos riesgos conductuales y matemáticos al definir los tamaños de las apuestas y los límites de pérdida antes de que se conozca el resultado.",
        "No puede eliminar la posibilidad de pérdida, pero puede hacer que el impacto financiero de la varianza normal sea más manejable."
      ],
    },
    {
      id: "unit-size",
      heading: "¿Qué es una unidad de apuesta?",
      paragraphs: [
        "Una unidad es una forma estandarizada de expresar el tamaño de la apuesta. En lugar de discutir cada apuesta en términos de moneda, un apostador puede definir una unidad como un porcentaje fijo o una cantidad fija del bankroll.",
        "Por ejemplo, si un bankroll es de 1,000 unidades de moneda y una unidad de apuesta se define como el 1% del bankroll, una unidad equivale a 10 unidades de moneda.",
        "El uso de unidades facilita la comparación del rendimiento a lo largo del tiempo, ya que separa el análisis del tamaño del bankroll personal del apostador."
      ],
      bullets: [
        "Bankroll: 1.000.",
        "Unidad del 1%: 10.",
        "Unidad del 0,5%: 5.",
        "Unidad del 2%: 20.",
      ],
      callout: {
        title: "Las unidades estandarizan el riesgo",
        body:
          "Una unidad no es una apuesta recomendada por sí misma. Es simplemente una medida consistente de la exposición.",
        tone: "info",
      },
    },
    {
      id: "fixed-vs-percentage",
      heading: "Apuestas fijas frente a apuestas porcentuales",
      paragraphs: [
        "Un enfoque de apuesta fija arriesga la misma cantidad monetaria en cada apuesta. Un enfoque de apuesta porcentual arriesga un porcentaje fijo del bankroll actual.",
        "Con apuestas fijas planas, una apuesta de 10 unidades sigue siendo de 10 unidades incluso si el bankroll aumenta o disminuye. Con las apuestas porcentuales, la apuesta se vuelve automáticamente más pequeña tras las pérdidas y más grande tras las ganancias.",
        "Por lo tanto, las apuestas porcentuales pueden reducir el riesgo durante las rachas negativas, ya que la exposición disminuye junto con el bankroll. Las apuestas fijas son más sencillas y pueden facilitar el seguimiento del rendimiento.",
        "Ninguno de los dos métodos crea una ventaja. La probabilidad subyacente y el precio siguen determinando si la decisión de apuesta tiene un valor esperado positivo o negativo."
      ],
      bullets: [
        "Apuesta fija: la misma cantidad de moneda cada vez.",
        "Apuesta porcentual: el mismo porcentaje del bankroll actual.",
        "La apuesta fija es simple y estable.",
        "La apuesta porcentual ajusta automáticamente la exposición a medida que cambia el bankroll.",
      ],
    },
    {
      id: "stake-size",
      heading: "Por qué el tamaño de la apuesta es la decisión de riesgo fundamental",
      paragraphs: [
        "El tamaño de la apuesta determina cuánto daño puede causar una pérdida y qué tan rápido puede agravarse una secuencia de pérdidas.",
        "Si un apostador arriesga el 1% de su bankroll en cada apuesta, diez pérdidas completas consecutivas no reducen el bankroll en un 100%. Si el mismo apostador arriesga el 10% por apuesta, una secuencia de pérdidas normal puede crear una reducción severa.",
        "Las apuestas grandes aumentan tanto el potencial de ganancias como el de pérdidas. No aumentan la probabilidad de acertar.",
        "Debido a que las estimaciones de probabilidad son inciertas, los tamaños de apuesta conservadores pueden proporcionar un margen de seguridad tanto contra la varianza como contra el error del modelo."
      ],
      callout: {
        title: "La confianza no es certeza",
        body:
          "Una estimación de alta confianza aún puede ser incorrecta. El tamaño de la apuesta debe reflejar la incertidumbre en lugar de asumir que cualquier apuesta es segura.",
        tone: "warning",
      },
    },
    {
      id: "risk-of-ruin",
      heading: "¿Qué es el riesgo de ruina?",
      paragraphs: [
        "El riesgo de ruina es la posibilidad de que un bankroll caiga tanto que ya no sea posible continuar apostando bajo la estrategia prevista.",
        "El riesgo aumenta cuando las apuestas son grandes en relación con el bankroll, cuando la estrategia subyacente tiene poca o ninguna ventaja, cuando los resultados son altamente volátiles o cuando múltiples apuestas están fuertemente correlacionadas.",
        "Incluso una estrategia con expectativa positiva puede tener un riesgo de ruina significativo si el tamaño de las apuestas es demasiado agresivo. Esta es una razón por la cual la gestión del bankroll no puede separarse del valor esperado y la varianza.",
        "Reducir el tamaño de la apuesta generalmente disminuye el riesgo de ruina, aunque también reduce la velocidad a la que se acumulan las ganancias durante los períodos favorables."
      ],
    },
    {
      id: "drawdowns",
      heading: "Planificación para las rachas negativas (drawdowns)",
      paragraphs: [
        "Una racha negativa (drawdown) es la caída desde un pico previo del bankroll hasta un punto bajo posterior. Las rachas negativas son inevitables en procesos inciertos.",
        "Supongamos que un bankroll aumenta de 100 unidades a 130 unidades y luego cae a 110. La racha negativa desde el pico es de 20 unidades, o aproximadamente el 15.4% del pico de 130 unidades.",
        "Planificar para las rachas negativas significa aceptar de antemano que ocurrirán períodos de pérdidas y asegurar que el método de apuestas pueda sobrevivir a ellos sin forzar decisiones emocionales o financieras.",
        "Un apostador que asume que el bankroll debería aumentar de manera constante es más propenso a entrar en pánico, aumentar el riesgo o abandonar las reglas cuando aparece la varianza normal."
      ],
      callout: {
        title: "Planifique antes de la racha negativa",
        body:
          "Las reglas de riesgo son más útiles cuando se crean antes de que las pérdidas generen presión emocional.",
        tone: "info",
      },
    },
    {
      id: "chasing",
      heading: "Por qué perseguir las pérdidas es peligroso",
      paragraphs: [
        "Intentar recuperar pérdidas significa aumentar las apuestas principalmente para recuperar el dinero perdido en apuestas anteriores. Esto cambia el propósito de la siguiente decisión: en lugar de evaluar su propio precio y probabilidad, se centra en reparar un resultado anterior.",
        "Este enfoque es peligroso porque las pérdidas pueden continuar. Si las apuestas aumentan después de cada pérdida, la exposición puede escalar rápidamente mientras que la probabilidad subyacente de la siguiente apuesta permanece inalterada.",
        "Los sistemas al estilo Martingala ilustran este problema. Doblar la apuesta tras las pérdidas puede parecer que garantiza la recuperación si finalmente se produce una victoria, pero los fondos reales, los límites de las casas de apuestas, las rachas de pérdidas y el capital finito hacen que el sistema sea vulnerable a pérdidas catastróficas.",
        "Un proceso disciplinado de gestión de fondos mantiene la siguiente apuesta basada en reglas predefinidas en lugar de en la cantidad perdida anteriormente."
      ],
      callout: {
        title: "La siguiente apuesta no le debe la pérdida anterior.",
        body:
          "Los resultados pasados no hacen que la siguiente apuesta sea más probable de ganar. Aumentar las apuestas para recuperar pérdidas aumenta la exposición, no la probabilidad.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "¿Qué hay del Criterio de Kelly?",
      paragraphs: [
        "El Criterio de Kelly es un marco matemático para dimensionar las apuestas basado en la ventaja estimada y las cuotas. En teoría, tiene como objetivo maximizar el crecimiento logarítmico del fondo a largo plazo cuando las probabilidades se conocen con precisión.",
        "El problema práctico es que las probabilidades de las apuestas no se conocen con certeza. Un pequeño error en la ventaja estimada puede llevar a una apuesta demasiado grande.",
        "Por esta razón, algunos apostadores utilizan Kelly fraccional, como medio Kelly o cuarto de Kelly, para reducir la volatilidad y las consecuencias del error de estimación.",
        "Kelly no es una garantía y no debe tratarse como una razón para realizar grandes apuestas. Su resultado es tan fiable como la estimación de probabilidad utilizada."
      ],
      bullets: [
        "El Kelly completo puede ser altamente volátil.",
        "El criterio de Kelly fraccional reduce la exposición.",
        "Las estimaciones de probabilidad incorrectas pueden llevar a apuestas excesivas según Kelly.",
        "Kelly no puede crear un valor esperado positivo donde no existe.",
      ],
    },
    {
      id: "flat-staking",
      heading: "Por qué las apuestas planas suelen ser útiles para la evaluación",
      paragraphs: [
        "Las apuestas planas consisten en utilizar el mismo tamaño de unidad en todas las apuestas. Es sencillo y facilita la evaluación de si las selecciones en sí tuvieron un buen desempeño.",
        "Si el tamaño de la apuesta cambia drásticamente de una apuesta a otra, unas pocas apuestas grandes pueden dominar el registro de pérdidas y ganancias y ocultar la calidad del proceso de selección subyacente.",
        "Las apuestas planas no optimizan el crecimiento teórico del bankroll, pero su simplicidad puede mejorar la disciplina y hacer que la evaluación del modelo sea más transparente.",
        "Para los usuarios que están aprendiendo cómo se comporta una estrategia, la consistencia puede ser más valiosa que la optimización compleja de las apuestas."
      ],
    },
    {
      id: "percentage-staking",
      heading: "Cómo responden las apuestas por porcentaje a los cambios en el bankroll",
      paragraphs: [
        "Las apuestas por porcentaje utilizan una fracción fija del bankroll actual. Si el bankroll disminuye, la apuesta disminuye automáticamente. Si el bankroll aumenta, la apuesta aumenta gradualmente.",
        "Por ejemplo, con una tasa de apuesta del 1%, un bankroll de 1.000 unidades produce una apuesta de 10 unidades. Si el bankroll cae a 800, la siguiente apuesta del 1% se convierte en 8 unidades.",
        "Esto crea un mecanismo defensivo natural durante los periodos de pérdidas. Sin embargo, también significa que los tamaños de las apuestas cambian continuamente, lo que puede hacer que el análisis del rendimiento sea menos intuitivo.",
        "La elección entre una estrategia de apuestas planas o porcentuales depende del propósito del sistema de bankroll, pero ambas requieren suposiciones conservadoras y límites disciplinados."
      ],
    },
    {
      id: "correlation",
      heading: "Las apuestas correlacionadas pueden aumentar el riesgo del bankroll",
      paragraphs: [
        "Un bankroll puede estar expuesto a un riesgo mayor de lo que sugieren los tamaños de las apuestas individuales si varias apuestas dependen del mismo evento subyacente.",
        "Por ejemplo, apostar a que un equipo de fútbol gane, a que su delantero marque y a que el partido supere los 2.5 goles puede crear una exposición superpuesta al mismo guion de partido.",
        "Si las tres apuestas se tratan como posiciones independientes del 1%, la concentración real de riesgo puede ser mucho mayor al 1%.",
        "Por lo tanto, la gestión del bankroll debe considerar la exposición total a resultados relacionados, no solo la apuesta que figura en cada boleto individual."
      ],
      callout: {
        title: "Cuente la exposición, no solo los boletos",
        body:
          "Varias apuestas correlacionadas pueden comportarse como una posición mucho mayor.",
        tone: "warning",
      },
    },
    {
      id: "limits",
      heading: "Establezca límites de gasto, pérdidas y tiempo",
      paragraphs: [
        "La gestión del bankroll no es solo un ejercicio matemático. Las apuestas responsables también requieren límites de gasto, pérdidas y tiempo.",
        "Un límite de pérdidas define cuánto del bankroll se puede perder durante un período elegido antes de detener las apuestas. Un límite de depósito o de gasto restringe cuánto dinero puede ingresar a la cuenta de apuestas. Un límite de tiempo evita que las apuestas se conviertan en una actividad descontrolada.",
        "Estos límites son más efectivos cuando se establecen antes de comenzar a apostar y cuando son difíciles de cambiar impulsivamente durante una racha de pérdidas o ganancias.",
        "Si las apuestas están causando estrés financiero, ocultación de pérdidas, préstamos de dinero o interfiriendo con la vida cotidiana, la respuesta correcta es detenerse en lugar de optimizar la fórmula de apuestas."
      ],
      callout: {
        title: "La gestión de riesgos incluye saber cuándo no apostar.",
        body:
          "Ninguna estrategia de bankroll sustituye la necesidad de detenerse cuando las apuestas causan daño financiero o emocional.",
        tone: "warning",
      },
    },
    {
      id: "records",
      heading: "Por qué es importante llevar un registro",
      paragraphs: [
        "Un proceso de bankroll es difícil de evaluar sin registros. Los registros útiles incluyen fecha, deporte, mercado, selección, cuotas, importe apostado, resultado, beneficio o pérdida, y el bankroll después de la liquidación.",
        "Registrar la estimación de probabilidad y el precio de mercado también puede ayudar a evaluar si el análisis estaba bien calibrado y si el apostador obtuvo cuotas competitivas de manera consistente.",
        "Los registros reducen la dependencia de la memoria, que a menudo está sesgada hacia grandes ganancias, pérdidas dolorosas y eventos recientes.",
        "Un registro limpio facilita distinguir un problema genuino en la estrategia de la varianza ordinaria."
      ],
      bullets: [
        "Fecha y evento.",
        "Mercado y selección.",
        "Cuotas obtenidas.",
        "Tamaño de la apuesta.",
        "Resultado y ganancias/pérdidas.",
        "Capital tras la liquidación.",
        "Estimación de probabilidad opcional y referencia de mercado.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Cómo se relaciona la gestión de capital con MatchSignal",
      paragraphs: [
        "MatchSignal proporciona contexto analítico como Mejores Cuotas, Promedio de Mercado, Probabilidad Justa, Ventaja de Valor, Casas Muestreadas y Nivel de Riesgo. Estos campos están diseñados para ayudar a los usuarios a comprender la relación entre los precios de mercado y el análisis basado en probabilidades.",
        "Estos no determinan cuánto dinero debe apostar un usuario. Una señal de Bajo Riesgo no es garantía de éxito, y una mayor Ventaja de Valor no debe interpretarse automáticamente como un permiso para aumentar las apuestas de forma agresiva.",
        "El tamaño de la apuesta debe seguir siendo parte de un marco de riesgo personal independiente basado en la asequibilidad, la incertidumbre, el tamaño del capital y los límites de juego responsable.",
        "El análisis de MatchSignal es informativo y no debe reemplazar el juicio financiero personal ni los controles disciplinados del capital."
      ],
      callout: {
        title: "La fuerza de la señal no es un consejo de apuesta",
        body:
          "MatchSignal no garantiza resultados, y sus campos analíticos no deben utilizarse como instrucciones automáticas para determinar el tamaño de las apuestas.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Una lista de verificación práctica para la gestión de capital",
      paragraphs: [
        "Un marco de capital simple puede ser más efectivo que un sistema complicado que resulta difícil de seguir de manera consistente."
      ],
      bullets: [
        "Separe el capital destinado a las apuestas del dinero esencial.",
        "Elija una apuesta base conservadora antes de comenzar a apostar.",
        "Utilice apuestas planas o porcentuales de manera consistente.",
        "Evite aumentar las apuestas debido a pérdidas recientes.",
        "Considere la exposición correlacionada en múltiples apuestas.",
        "Planifique para reducciones normales y rachas de pérdidas.",
        "Registre cada apuesta y actualice el capital con precisión.",
        "Establezca límites de gasto, de pérdidas y de tiempo.",
        "Reduzca o detenga las apuestas si aumenta la presión financiera o emocional.",
        "Nunca asuma que ningún sistema de apuestas puede garantizar ganancias.",
      ],
    },
  ],
  relatedGuides: [
    "variance-sports-betting",
    "flat-stakes-vs-percentage-staking",
    "why-chasing-losses-is-dangerous",
    "expected-value-sports-betting",
    "winning-streaks-misleading",
  ],
  responsibleGamblingNote:
    "La gestión del capital puede reducir la exposición financiera, pero no puede hacer que las apuestas sean seguras ni garantizar ganancias. Mantenga el dinero de las apuestas separado de los fondos esenciales, establezca límites estrictos de gasto y pérdidas, evite pedir prestado o intentar recuperar pérdidas, y deténgase si las apuestas causan daño financiero o emocional.",
};

export default guide;
