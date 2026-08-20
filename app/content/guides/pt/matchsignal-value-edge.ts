import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "matchsignal-value-edge",
  locale: "pt",
  title: "Como o MatchSignal Calcula a Vantagem de Valor",
  category: "value-analysis",
  status: "published",
  description:
    "Saiba como o MatchSignal calcula e interpreta a Vantagem de Valor, como a Probabilidade Justa e as probabilidades decimais oferecidas se combinam no valor estimado, por que a Vantagem de Valor difere do valueDiff em pontos de probabilidade e por que um sinal positivo não é garantia de lucro.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A Vantagem de Valor do MatchSignal foi concebida para mostrar quão favorável um preço disponível aparenta ser em relação à avaliação baseada em probabilidade da plataforma. No MatchCard, a Vantagem de Valor é representada pelo campo estimatedValuePct. Quando o MatchSignal dispõe de uma Probabilidade Justa e de um preço de parceiro disponível, a relação matemática é a mesma fórmula de valor esperado utilizada em toda a análise de apostas: a percentagem de valor estimado é igual à Probabilidade Justa expressa como decimal multiplicada pelas probabilidades decimais oferecidas, menos um, e depois multiplicada por 100. O pipeline de produção também pode aceitar um estimatedValuePct explícito gerado por IA quando esse campo é devolvido pela camada de análise; caso contrário, recorre ao cálculo do valor a partir da Probabilidade Justa e das probabilidades de parceiro disponíveis. Isto faz da Vantagem de Valor um sinal de modelo e preço, e não uma promessa sobre o resultado do próximo jogo.",
  keyTakeaways: [
    "A exibição da Vantagem de Valor no MatchCard utiliza o campo estimatedValuePct.",
    "O caminho de cálculo a partir da probabilidade e do preço é: ((Probabilidade Justa / 100) × probabilidades decimais oferecidas − 1) × 100.",
    "Uma Vantagem de Valor positiva significa que o preço é favorável em relação à estimativa de Probabilidade Justa utilizada pelo MatchSignal.",
    "Uma Vantagem de Valor zero significa que as probabilidades oferecidas coincidem aproximadamente com o preço de equilíbrio implícito pela Probabilidade Justa.",
    "Uma Vantagem de Valor negativa significa que o preço oferecido é inferior ao que a estimativa de probabilidade exigiria para o ponto de equilíbrio.",
    "O valueDiff do MatchSignal é uma métrica diferente: trata-se de um fosso em pontos de probabilidade, e não do mesmo que a percentagem de retorno estimado.",
    "O pipeline de análise diária pode preservar um estimatedValuePct de IA explícito; se estiver ausente, o MatchSignal pode calcular o valor a partir da Probabilidade Justa e das probabilidades dos parceiros.",
    "Uma Vantagem de Valor positiva é uma estimativa analítica e não garante uma aposta vencedora nem lucro realizado.",
  ],
  sections: [
    {
      id: "what-value-edge-is",
      heading: "O que o MatchSignal Significa por Vantagem de Valor",
      paragraphs: [
        "Num MatchCard da MatchSignal, o rótulo Value Edge é a apresentação voltada para o usuário de estimatedValuePct. O número destina-se a descrever a relação entre a Probabilidade Justa da MatchSignal para a seleção exibida e o preço disponível para essa seleção.",
        "A questão básica não é simplesmente se a MatchSignal acha que um resultado é provável. É se as odds oferecidas são altas o suficiente em relação a essa estimativa de probabilidade.",
        "Esta distinção importa porque a mesma previsão pode ser atraente a um preço e desatraente a outro. Uma seleção avaliada em 55% não é automaticamente valiosa. A odds de 2.00 tem um valor teórico positivo; a 1.70 não tem.",
        "O Value Edge, portanto, pertence à camada de precificação da análise. Ele combina um julgamento de probabilidade com o preço que pode ser observado no mercado."
      ],
      callout: {
        title: "Value Edge é uma métrica de preço e probabilidade",
        body:
          "Não deve ser interpretado como a MatchSignal dizendo que uma equipe é vencedora certa. A mesma seleção pode ter um Value Edge diferente a odds diferentes.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "A Fórmula Central do Value Edge",
      paragraphs: [
        "Quando a MatchSignal calcula o valor estimado a partir da Probabilidade Justa e das odds oferecidas, a fórmula é: Value Edge % = ((Probabilidade Justa / 100) × Odds Decimais Oferecidas − 1) × 100.",
        "Esta é a relação padrão de retorno esperado para um resultado simples de vitória ou derrota, expressa como uma porcentagem de uma unidade apostada.",
        "O código converte a Probabilidade Justa de uma porcentagem em um decimal, multiplica pelas odds decimais oferecidas, subtrai 1 e converte o resultado de volta em termos percentuais.",
        "O número resultante responde a uma pergunta teórica: se a estimativa da Probabilidade Justa estivesse correta e a mesma relação entre probabilidade e preço pudesse ser repetida muitas vezes, qual retorno médio em relação à aposta essa relação implicaria?"
      ],
      bullets: [
        "Converter a Probabilidade Justa de porcentagem para decimal.",
        "Multiplique pelas probabilidades decimais oferecidas.",
        "Subtraia 1.",
        "Multiplique por 100 para expressar o resultado como uma porcentagem.",
      ],
      callout: {
        title: "Fórmula",
        body:
          "Value Edge % = ((Probabilidade Justa / 100) × Odds Oferecidas − 1) × 100.",
        tone: "example",
      },
    },
    {
      id: "worked-example",
      heading: "Um Exemplo Prático de Value Edge do MatchSignal",
      paragraphs: [
        "Suponha que o MatchSignal atribua uma Probabilidade Justa de 55% a uma seleção e que as odds oferecidas pela parceira sejam 2.00.",
        "Converta 55% para 0,55. Multiplique 0,55 por 2,00 para obter 1,10. Subtraia 1 para obter 0,10. Multiplique por 100 e a Value Edge estimada será de +10%.",
        "Agora mantenha a mesma Probabilidade Justa, mas altere o preço oferecido para 1,80. O cálculo passa a ser 0,55 × 1,80 − 1 = −0,01, ou aproximadamente −1%.",
        "Nada sobre a Probabilidade Justa mudou. Apenas o preço disponível mudou. É por isso que a comparação de preços pode alterar materialmente a relação de valor exibida."
      ],
      bullets: [
        "Probabilidade Justa: 55%.",
        "Odds Oferecidas: 2.00.",
        "Cálculo: 0,55 × 2,00 − 1 = 0,10.",
        "Vantagem de Valor: +10%.",
        "A odds de 1,80 com a mesma probabilidade de 55%: aproximadamente −1%.",
      ],
    },
    {
      id: "break-even",
      heading: "Vantagem de Valor e Probabilidade de Equilíbrio",
      paragraphs: [
        "A mesma relação pode ser compreendida através da probabilidade de equilíbrio. Odds decimais de 2,00 exigem uma taxa de vitória de 50% para atingir o equilíbrio antes de atritos práticos. Odds de 1,80 exigem cerca de 55,56%.",
        "Se a Probabilidade Justa do MatchSignal estiver acima da probabilidade de equilíbrio implícita pelo preço disponível, a Vantagem de Valor calculada será positiva. Se a Probabilidade Justa estiver abaixo desse limite, a Vantagem de Valor será negativa.",
        "É por isso que uma Vantagem de Valor positiva não significa simplesmente que o 'MatchSignal gosta da equipa.' Significa que a estimativa de probabilidade é suficientemente alta em relação ao preço oferecido para implicar um valor teórico positivo.",
        "Uma seleção pode ter uma Probabilidade Justa elevada e ainda assim apresentar uma Vantagem de Valor negativa se o preço de mercado for demasiado curto."
      ],
      callout: {
        title: "A probabilidade por si só não é valor",
        body:
          "O valor surge apenas quando a estimativa de probabilidade é comparada com o preço efetivamente oferecido.",
        tone: "warning",
      },
    },
    {
      id: "fair-probability",
      heading: "Onde a Probabilidade Justa se Encaixa no Cálculo",
      paragraphs: [
        "A Probabilidade Justa é a entrada de probabilidade utilizada na relação de valor. No pipeline de previsão diária, uma Probabilidade Justa fornecida por IA pode ser utilizada diretamente após a validação numérica e a delimitação.",
        "Se uma probabilidade justa explícita de IA não estiver disponível, o pipeline contém lógica de fallback que pode derivar uma estimativa de probabilidade a partir de informações de mercado, como o consenso de mercado e a probabilidade implícita associada ao preço.",
        "Isso significa que a probabilidade justa não é simplesmente outro rótulo para a probabilidade implícita bruta das odds de uma casa de apostas. É um insumo analítico usado para avaliar o preço.",
        "Como a estimativa de probabilidade pode estar incorreta ou incerta, a margem de valor (Value Edge) derivada dela também herda essa incerteza."
      ],
      callout: {
        title: "O insumo de probabilidade importa mais do que a precisão decimal",
        body:
          "Uma margem de valor perfeitamente calculada ainda pode ser enganosa se a estimativa da probabilidade justa for imprecisa.",
        tone: "warning",
      },
    },
    {
      id: "explicit-ai-value",
      heading: "Por que o pipeline pode usar uma estimativa de valor de IA explícita",
      paragraphs: [
        "A camada de análise diária da MatchSignal pode retornar um estimatedValuePct estimado explicitamente junto com a probabilidade justa e outros campos analíticos.",
        "Quando um estimatedValuePct explícito válido está presente, o pipeline diário preserva esse valor em vez de substituí-lo automaticamente por um valor recém-calculado. Quando o campo explícito está ausente, o pipeline pode calcular o valor estimado a partir da probabilidade justa e das odds dos parceiros.",
        "Isso é importante ao interpretar a plataforma tecnicamente: a margem de valor não é sempre produzida por apenas um caminho de código. É um campo analítico normalizado com um caminho fornecido por IA e um caminho de fallback matemático.",
        "A camada de prompt também instrui a análise a ser conservadora com a probabilidade justa e o valor estimado, e a retornar nulo quando a margem não estiver clara. Esse design tem o objetivo de evitar fabricar confiança numérica quando as evidências disponíveis não a sustentam."
      ],
      callout: {
        title: "Dois caminhos, um campo exibido",
        body:
          "O MatchCard exibe o estimatedValuePct como Value Edge, quer o valor válido tenha vindo da camada de análise ou do cálculo de fallback de probabilidade e odds.",
        tone: "info",
      },
    },
    {
      id: "value-diff",
      heading: "Value Edge não é o mesmo que valueDiff",
      paragraphs: [
        "O MatchSignal também contém um campo valueDiff. É fácil confundi-lo com o Value Edge porque ambos descrevem uma lacuna entre uma avaliação de probabilidade e um preço de mercado.",
        "As duas métricas usam unidades diferentes. estimatedValuePct é uma porcentagem no estilo de retorno esperado baseada na probabilidade multiplicada pelas probabilidades decimais. valueDiff é uma diferença em pontos percentuais entre a Probabilidade Justa e a probabilidade implícita associada ao preço relevante.",
        "Por exemplo, se a Probabilidade Justa for 55% e o preço do parceiro implicar 50%, o valueDiff será de +5 pontos percentuais. A odds de 2.00, o estimatedValuePct é de +10%. Esses números descrevem conceitos relacionados, mas não são intercambiáveis.",
        "A exibição do Value Edge no MatchCard usa o estimatedValuePct. Tratar o valueDiff como se fosse o retorno esperado, portanto, deturparia o significado do número."
      ],
      bullets: [
        "estimatedValuePct: porcentagem de valor no estilo de retorno.",
        "valueDiff: diferença em pontos percentuais.",
        "Ambos podem ser positivos ao mesmo tempo.",
        "Os seus valores numéricos não precisam coincidir.",
      ],
      callout: {
        title: "Não misture porcentagens e pontos percentuais",
        body:
          "Uma lacuna de probabilidade de +5 pontos percentuais não é a mesma métrica que um retorno estimado de +5%.",
        tone: "warning",
      },
    },
    {
      id: "best-odds",
      heading: "Por que as Melhores Odds Importam para o Value Edge",
      paragraphs: [
        "O preço utilizado em um cálculo de valor altera diretamente o resultado. Para a mesma Probabilidade Justa, odds decimais equivalentes mais altas produzem uma Vantagem de Valor maior.",
        "Se a Probabilidade Justa for de 52%, odds de 1,90 implicam aproximadamente −1,2% de valor, odds de 2,00 implicam +4% e odds de 2,10 implicam +9,2%.",
        "É por isso que o MatchSignal apresenta as Melhores Odds juntamente com a Vantagem de Valor. O preço disponível genuinamente equivalente mais forte pode melhorar materialmente a relação de valor.",
        "A comparação ainda precisa ser equivalente (like-for-like). Um preço mais alto em um handicap, total, regra de liquidação ou mercado diferente não é um substituto válido para a seleção exibida."
      ],
      bullets: [
        "52% a 1,90 → aproximadamente −1,2%.",
        "52% a 2,00 → aproximadamente +4,0%.",
        "52% a 2,10 → aproximadamente +9,2%.",
      ],
    },
    {
      id: "market-average",
      heading: "Como a Média de Mercado e as Casas Amostradas Adicionam Contexto",
      paragraphs: [
        "A Vantagem de Valor é mais útil quando visualizada com os outros campos do MatchCard em vez de isoladamente.",
        "A Média de Mercado resume os preços das casas de apostas amostradas, ajudando a mostrar se a oferta exibida difere do mercado mais amplo. As Casas Amostradas fornecem contexto sobre quantas fontes de casas de apostas contribuíram para a amostra de mercado relevante.",
        "Um preço de parceiro mais forte em relação ao mercado amostrado pode melhorar a economia disponível para o usuário, mas o número de casas amostradas por si só não prova que a Probabilidade Justa está correta.",
        "Estes campos descrevem o contexto de mercado. Eles não eliminam o erro do modelo, a margem da casa de apostas, preços desatualizados ou a variância esportiva ordinária."
      ],
    },
    {
      id: "fair-odds",
      heading: "As Odds Justas são a Versão em Preço da Probabilidade Justa",
      paragraphs: [
        "O MatchSignal também pode converter a Probabilidade Justa em Odds Justas. Conceitualmente, as odds decimais justas equivalem a 1 dividido pela Probabilidade Justa expressa como um decimal.",
        "Uma Probabilidade Justa de 50% corresponde a odds justas de 2,00. Uma Probabilidade Justa de 40% corresponde a 2,50. Uma Probabilidade Justa de 60% corresponde a cerca de 1,67.",
        "Isso fornece outra maneira de ler a relação de Vantagem de Valor (Value Edge). Se as odds oferecidas forem significativamente superiores às odds justas implícitas na probabilidade analítica, o preço pode representar valor estimado positivo.",
        "Se as odds oferecidas forem inferiores às odds justas, o preço está exigindo mais probabilidade do que a estimativa suporta."
      ],
      bullets: [
        "Probabilidade Justa de 50% → Odds Justas de 2,00.",
        "40% → 2,50.",
        "60% → aproximadamente 1,67.",
      ],
    },
    {
      id: "positive-zero-negative",
      heading: "Como Ler Vantagem de Valor Positiva, Zero e Negativa",
      paragraphs: [
        "Uma Vantagem de Valor positiva significa que a relação entre probabilidade e preço implica um retorno teórico acima de zero sob a estimativa de probabilidade em uso.",
        "Uma Vantagem de Valor próxima de zero significa que o preço oferecido está próximo do preço de equilíbrio implícito na Probabilidade Justa.",
        "Uma Vantagem de Valor negativa significa que o preço atual oferecido é menor do que a estimativa de probabilidade suporta.",
        "O sinal é útil, mas a magnitude não deve ser tratada como certeza. Um sinal de +6% exibido pode desaparecer se a Probabilidade Justa foi superestimada ou se as odds disponíveis encurtarem."
      ],
      callout: {
        title: "A vantagem pode desaparecer",
        body:
          "A Vantagem de Valor é sensível ao tempo porque as odds se movimentam, e sensível ao modelo porque a Probabilidade Justa é uma estimativa.",
        tone: "warning",
      },
    },
    {
      id: "rounding",
      heading: "Arredondamento e Precisão de Exibição",
      paragraphs: [
        "O cálculo de valor é normalizado para a precisão de exibição em vez de ser apresentado com decimais ilimitados. Isso mantém os MatchCards legíveis e evita sugerir mais precisão do que a interface pode usar.",
        "Os usuários não devem interpretar um décimo ou centésimo de ponto percentual como uma garantia significativa de precisão de previsão superior.",
        "Quando a incerteza subjacente em torno da Probabilidade Justa é de vários pontos percentuais, uma pequena diferença na Vantagem de Valor exibida pode ser economicamente menos importante do que a incerteza do próprio modelo."
      ],
    },
    {
      id: "ranking",
      heading: "A Vantagem de Valor Também É Usada como um Sinal de Qualidade",
      paragraphs: [
        "Dentro do MatchSignal, estimatedValuePct não é apenas exibido para o usuário. A lógica de classificação também avalia o número de valor juntamente com outras informações, como Probabilidade Justa, cobertura de casas de apostas, spread, consenso e Nível de Risco.",
        "Isso evita que a plataforma trate um número de valor bruto como o único critério de qualidade. Uma grande vantagem aparente de um mercado fraco ou inconsistente merece mais cautela do que uma vantagem de tamanho semelhante apoiada por um contexto de mercado mais amplo.",
        "A decisão de qualidade exata é, portanto, multifatorial, embora o cálculo da Vantagem de Valor em si tenha uma interpretação clara de probabilidade e preço."
      ],
      callout: {
        title: "A Vantagem de Valor é um sinal, não toda a classificação",
        body:
          "O MatchSignal também considera a profundidade de mercado, o contexto de probabilidade, o spread e o risco, em vez de classificar as seleções apenas pela maior vantagem exibida.",
        tone: "info",
      },
    },
    {
      id: "not-guarantee",
      heading: "Por que uma vantagem de valor positivo não garante lucro",
      paragraphs: [
        "A fórmula descreve a expectativa sob uma probabilidade estimada. Ela não determina o que acontece em um único evento esportivo.",
        "Uma vantagem de valor de +8% pode perder imediatamente. Uma seleção de valor negativo pode vencer. A diferença torna-se significativa apenas como parte de tomadas de decisão repetidas sob estimativas de probabilidade suficientemente precisas.",
        "O erro do modelo é outra fonte de risco. Se o MatchSignal estimar um resultado em 55%, mas a chance real for menor, a vantagem exibida pode ser sobrestimada.",
        "A movimentação do mercado também importa. Se as odds que produziram uma vantagem positiva não estiverem mais disponíveis, o valor deve ser recalculado usando o preço atual."
      ],
      callout: {
        title: "A vantagem de valor não é uma previsão de lucro",
        body:
          "É uma estimativa baseada em modelo da qualidade do preço sob incerteza, não uma promessa sobre a próxima aposta ou o crescimento futuro da banca.",
        tone: "warning",
      },
    },
    {
      id: "example-sensitivity",
      heading: "Sensibilidade: Pequenas alterações de probabilidade podem importar",
      paragraphs: [
        "Suponha que as odds oferecidas sejam 2,10. A uma probabilidade justa de 50%, a vantagem de valor é de +5%. A 48%, é de aproximadamente +0,8%. A 47%, passa a ser de aproximadamente −1,3%.",
        "Apenas uma alteração de três pontos percentuais na estimativa de probabilidade desloca o mesmo preço de um sinal positivo para um negativo.",
        "Isso demonstra por que a incerteza do modelo deve ser considerada juntamente com a vantagem de valor principal. Quanto menor a vantagem, mais fácil é para um erro normal de estimativa inverter a conclusão.",
        "Para uma interpretação prática, um usuário deve perguntar não apenas 'Qual é a Vantagem de Valor?', mas também 'Quão robusta é essa vantagem se a Probabilidade Justa estiver ligeiramente errada?'"
      ],
      bullets: [
        "Odds 2.10, Probabilidade Justa 50% → +5.0%.",
        "Odds 2.10, Probabilidade Justa 48% → aproximadamente +0.8%.",
        "Odds 2.10, Probabilidade Justa 47% → aproximadamente −1.3%.",
      ],
    },
    {
      id: "checklist",
      heading: "Como Ler uma Vantagem de Valor do MatchSignal",
      paragraphs: [
        "Uma Vantagem de Valor deve ser lida em conjunto com o resto do MatchCard e tendo em mente as limitações da análise probabilística."
      ],
      bullets: [
        "Confirme o mercado exato e a seleção.",
        "Leia a Probabilidade Justa como uma estimativa, não como uma certeza.",
        "Verifique as Melhores Odds exibidas no momento.",
        "Use a relação entre probabilidade e preço para entender a Vantagem de Valor.",
        "Não confunda a Vantagem de Valor com o intervalo de pontos de probabilidade valueDiff.",
        "Revise a Média do Mercado e as Casas Amostradas para obter contexto de mercado.",
        "Lembre-se de que as odds podem mudar após a geração do bilhete.",
        "Trate pequenas vantagens com cautela quando a incerteza da probabilidade for alta.",
        "Não use uma Value Edge maior como conselho automático de dimensionamento de aposta.",
        "Não interprete uma Value Edge positiva como um resultado vencedor garantido.",
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
    "MatchSignal Value Edge é uma estimativa analítica baseada em probabilidade e preço, não uma garantia de lucro ou uma recomendação para aumentar as apostas. As estimativas de probabilidade podem estar erradas, as odds podem se mover e qualquer aposta pode perder. Mantenha as apostas dentro de limites predeterminados, aposte apenas valores que você possa perder e nunca corra atrás de prejuízos.",
};

export default guide;
