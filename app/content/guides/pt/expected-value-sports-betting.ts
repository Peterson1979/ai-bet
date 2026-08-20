import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "expected-value-sports-betting",
  locale: "pt",
  title: "O Valor Esperado nas Apostas Esportivas Explicado",
  category: "value-analysis",
  status: "published",
  description:
    "Compreenda o valor esperado nas apostas esportivas, como a probabilidade e a cotação se combinam para criar um EV positivo ou negativo, por que uma vantagem positiva não garante uma vitória e como avaliar o valor com mais cuidado.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "O valor esperado, geralmente abreviado como EV, é uma forma de descrever o resultado médio teórico de uma decisão quando o mesmo tipo de decisão é repetido muitas vezes. Nas apostas esportivas, o EV conecta duas coisas: a sua estimativa de com que frequência um resultado deve ocorrer e a cotação oferecida pelo mercado. Uma aposta pode ter probabilidade de vencer e ainda assim ter valor esperado negativo se as odds forem baixas demais. Uma aposta também pode perder hoje e, ainda assim, ter valor esperado positivo sob uma estimativa de probabilidade razoável. O conceito é útil porque desvia o foco de simplesmente acertar vencedores para a relação entre probabilidade, cotação e incerteza.",
  keyTakeaways: [
    "O valor esperado combina probabilidade e pagamento em uma única medida matemática de longo prazo.",
    "EV positivo significa que a probabilidade estimada é alta o suficiente em relação às odds oferecidas para criar um retorno médio teórico positivo.",
    "EV negativo significa que a cotação oferecida exige uma taxa de sucesso maior do que a sua estimativa de probabilidade suporta.",
    "Uma aposta com EV positivo pode perder, e uma aposta com EV negativo pode vencer; o EV trata de decisões repetidas, não de certeza em um único evento.",
    "A qualidade de qualquer cálculo de EV depende fortemente da qualidade e da calibração da estimativa de probabilidade.",
    "Melhores odds melhoram o valor esperado para a mesma seleção subjacente, porque reduzem a probabilidade de equilíbrio (break-even).",
  ],
  sections: [
    {
      id: "definition",
      heading: "O Que o Valor Esperado Significa",
      paragraphs: [
        "O valor esperado é a média ponderada pela probabilidade de todos os resultados possíveis. Em um exemplo simples de aposta de vitória ou derrota, existem dois resultados financeiros principais: a aposta vence e gera lucro, ou a aposta perde e a stake é perdida. O EV combina a probabilidade de cada resultado com o seu resultado financeiro.",
        "Suponha que uma seleção seja oferecida a odds decimais de 2,00 e você estime que ela tem 55% de chance de vencer. Uma aposta de uma unidade retorna duas unidades em caso de sucesso, o que significa uma unidade de lucro mais a stake original. O resultado de derrota custa uma unidade. O valor esperado é, portanto, 0,55 × 1 unidade de lucro mais 0,45 × menos 1 unidade, o que equivale a +0,10 unidades. Em relação a uma stake de uma unidade, isso representa um retorno esperado teórico de +10%.",
        "Isto não significa que a próxima aposta vá retornar fisicamente 1.10 unidades. O resultado real de uma aposta é discreto: ela ganha ou perde de acordo com as regras de liquidação do mercado. O EV é uma média de decisões comparáveis repetidas sob a probabilidade assumida."
      ],
      callout: {
        title: "A ideia central",
        body:
          "O valor esperado mede a qualidade de um preço em relação a uma estimativa de probabilidade. Ele não prediz o resultado da próxima partida.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "A fórmula básica do valor esperado",
      paragraphs: [
        "Para uma aposta simples de vitória ou derrota usando probabilidades decimais, o EV por unidade arriscada pode ser escrito como: EV = (probabilidade de vitória × probabilidade decimal) − 1.",
        "Se a probabilidade for de 50% e as odds forem de 2.20, o cálculo é 0.50 × 2.20 − 1 = +0.10, ou +10%. Se a mesma probabilidade de 50% for combinada com odds de 1.80, o resultado é 0.50 × 1.80 − 1 = −0.10, ou −10%.",
        "Portanto, a mesma previsão pode ter um valor esperado muito diferente dependendo do preço disponível. Esta é uma das distinções mais importantes na análise de apostas: a opinião esportiva e a qualidade econômica da aposta não são a mesma coisa.",
        "A fórmula é simples, mas pode criar falsa confiança se a entrada de probabilidade for tratada como exata. A aritmética do EV pode estar correta enquanto a estimativa de probabilidade subjacente está errada."
      ],
      bullets: [
        "EV por unidade = (probabilidade de vitória × odds decimais) − 1.",
        "Probabilidade de 50% a odds de 2.20: +10% de EV.",
        "Probabilidade de 50% a odds de 2.00: 0% de EV.",
        "Probabilidade de 50% a odds de 1.80: −10% de EV.",
      ],
      callout: {
        title: "Mesma seleção, EV diferente",
        body:
          "Se a sua estimativa de probabilidade permanecer a mesma, alterar as odds altera imediatamente o valor esperado.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Probabilidade de Equilíbrio e Valor Esperado",
      paragraphs: [
        "Cada preço cotado tem uma probabilidade de equilíbrio. Para odds decimais, a probabilidade de equilíbrio é igual a 1 dividido pelas odds. A 2.00, a taxa de equilíbrio é de 50%. A 1.80, é de cerca de 55,6%. A 2.50, é de 40%.",
        "A conexão com o EV é direta. Se a sua estimativa de probabilidade estiver acima da probabilidade de equilíbrio implícita no preço disponível, a aposta tem valor esperado positivo sob essa estimativa. Se a sua estimativa estiver abaixo do limite de equilíbrio, o valor esperado será negativo. Se os dois forem iguais, o EV teórico será zero antes de considerar os atritos práticos.",
        "Esta estrutura é mais útil do que simplesmente perguntar se um resultado é provável. Uma equipa avaliada em 70% ainda pode ter um preço desfavorável se as odds disponíveis exigirem uma taxa de equilíbrio de 75%. Um resultado avaliado em apenas 35% pode teoricamente oferecer valor se o preço exigir uma taxa de equilíbrio abaixo de 35%."
      ],
      callout: {
        title: "Provável não é o mesmo que valioso",
        body:
          "A probabilidade indica com que frequência acha que algo pode acontecer. O valor esperado questiona se o preço oferecido o compensa adequadamente por essa probabilidade.",
        tone: "warning",
      },
    },
    {
      id: "positive-negative",
      heading: "EV positivo vs EV negativo",
      paragraphs: [
        "Valor esperado positivo significa que o retorno médio estimado está acima do montante apostado. Valor esperado negativo significa que o retorno médio estimado está abaixo do montante apostado. O sinal do EV depende da relação entre probabilidade e preço, e não de a próxima aposta individual ganhar.",
        "Considere duas pessoas a avaliar a mesma seleção. Uma só consegue obter odds de 1.80, enquanto a outra encontra 2.05. Se ambas usarem a mesma estimativa de probabilidade de 52%, o primeiro preço produz um EV de 0,52 × 1,80 − 1 = −6,4%. O segundo produz um EV de 0,52 × 2,05 − 1 = +6,6%.",
        "A previsão é idêntica, mas a qualidade económica das duas apostas é diferente. É por isso que a comparação de preços importa. Um apostador não pode controlar o resultado final, mas muitas vezes pode controlar se aceita um preço inferior quando um preço equivalente melhor está disponível noutro lugar."
      ],
      bullets: [
        "EV positivo: a probabilidade estimada excede o requisito de ponto de equilíbrio do preço.",
        "EV negativo: a probabilidade estimada fica abaixo do requisito de ponto de equilíbrio do preço.",
        "EV zero: a probabilidade estimada corresponde aproximadamente ao requisito de ponto de equilíbrio.",
        "Mudar as odds altera o EV, mesmo que a estimativa de probabilidade subjacente não mude.",
      ],
    },
    {
      id: "not-guarantee",
      heading: "Por que o valor esperado positivo não garante lucro",
      paragraphs: [
        "Uma estimativa de EV positivo descreve uma expectativa matemática de longo prazo, e não um resultado garantido de curto prazo. Os esportes contêm aleatoriedade, informações incompletas, decisões de arbitragem, lesões, mudanças táticas, efeitos climáticos, erros de execução e muitas outras fontes de variância. Mesmo uma estimativa de probabilidade forte não consegue eliminar esses fatores.",
        "Imagine uma série de apostas, cada uma avaliada com 60% de probabilidade de vitória. Perder quatro ou cinco seguidas é inteiramente possível. Por outro lado, uma sequência de apostas de EV negativo pode vencer várias vezes consecutivas. Portanto, os resultados de curto prazo não revelam de forma confiável se o processo subjacente era bom.",
        "A segunda fonte de incerteza é a própria estimativa de probabilidade. Um cálculo pode parecer fortemente positivo porque a probabilidade estimada é otimista demais. Se um modelo diz 60% quando a chance real está mais próxima de 50%, o cálculo do EV será enganoso, mesmo que a aritmética esteja impecável.",
        "Por esse motivo, o valor esperado deve ser tratado como uma estrutura analítica em vez de uma promessa. Quanto mais incerta for a estimativa de probabilidade, menos confiança deve ser depositada em uma pequena vantagem aparente."
      ],
      callout: {
        title: "A aritmética pode estar correta enquanto a estimativa está errada",
        body:
          "Os cálculos de EV são tão confiáveis quanto as probabilidades fornecidas a eles. A calibração do modelo e a incerteza importam tanto quanto a fórmula.",
        tone: "warning",
      },
    },
    {
      id: "probability-quality",
      heading: "Por que a qualidade da probabilidade importa mais do que a fórmula",
      paragraphs: [
        "A fórmula de valor esperado é simples. Estimar bem a probabilidade é a parte difícil. Um modelo de probabilidade útil deve ser calibrado: resultados atribuídos a cerca de 60% devem, ao longo de uma amostra suficientemente grande e adequada, ocorrer cerca de 60% das vezes.",
        "As probabilidades esportivas podem ser estimadas a partir de dados de mercado, modelos estatísticos, informações de equipes e jogadores, variáveis contextuais ou combinações dessas fontes. Cada abordagem contém premissas. Dados históricos podem não representar totalmente as equipes atuais. Lesões podem ser incertas. Um modelo pode subestimar mudanças táticas. Os preços de mercado podem incorporar informações que o modelo não possui.",
        "Isso significa que uma vantagem aparente de 2% não deve ser tratada automaticamente da mesma forma que uma vantagem de 10%. A incerteza em torno da estimativa de probabilidade pode ser maior do que a diferença que está sendo medida.",
        "Um processo disciplinado não pergunta apenas 'Qual é a minha estimativa?', mas também 'Quão incerta é esta estimativa e quão sensível é o EV a pequenas alterações?'"
      ],
      bullets: [
        "Verifique a calibração em grandes amostras em vez de julgar um modelo com base em alguns resultados.",
        "Trate pequenas vantagens com cautela quando a estimativa de probabilidade subjacente for incerta.",
        "Atualize as estimativas quando informações relevantes mudarem.",
        "Evite adicionar confiança simplesmente porque um modelo produz muitas casas decimais.",
      ],
    },
    {
      id: "bookmaker-margin",
      heading: "Como a margem da casa de apostas afeta a análise de EV",
      paragraphs: [
        "Os preços das casas de apostas normalmente incluem uma margem ou 'overround'. Em um mercado simples de duas vias, ambos os lados podem ser oferecidos a 1,91. Cada preço implica cerca de 52,36%, de modo que as duas probabilidades brutas totalizam cerca de 104,72% em vez de 100%.",
        "Isso importa porque uma probabilidade implícita bruta da casa de apostas não é automaticamente uma estimativa de probabilidade justa. Os preços cotados incluem a estrutura do mercado e a margem do operador. Os analistas podem normalizar as probabilidades implícitas para criar uma referência de mercado simples sem margem.",
        "Para a análise de EV, no entanto, o preço real disponível para o apostador continua sendo o preço que determina o limite de equilíbrio. Mesmo que um modelo sem margem estime um resultado em 52%, um preço de casa de apostas de 1,85 exige cerca de 54,1% para atingir o ponto de equilíbrio. O preço de execução é, portanto, central para o cálculo final do EV."
      ],
      callout: {
        title: "A probabilidade justa e o preço disponível são entradas diferentes",
        body:
          "Uma estimativa sem margem pode ajudar a descrever as expectativas do mercado, enquanto as cotações reais oferecidas determinam a probabilidade de equilíbrio (break-even) da aposta que você pode fazer.",
        tone: "info",
      },
    },
    {
      id: "odds-comparison",
      heading: "Por que a comparação de cotações melhora o valor esperado",
      paragraphs: [
        "Para a mesma seleção e estimativa de probabilidade, cotações mais altas sempre melhoram o valor esperado. Suponha que sua estimativa seja de 48%. A 1,95, o EV é 0,48 × 1,95 − 1 = −6,4%. A 2,10, o EV é +0,8%. A 2,20, o EV é +5,6%.",
        "Nada sobre o resultado esportivo mudou entre esses exemplos. Apenas o preço mudou. É por isso que comparar mercados equivalentes entre casas de apostas é uma parte importante da análise de valor.",
        "A comparação deve ser genuinamente equivalente. Diferentes regras de liquidação, handicaps, totais, tratamento de prorrogação, condições de anulação ou definições de mercado podem tornar preços superficialmente semelhantes não equivalentes. A comparação de preços é útil apenas quando a aposta subjacente é a mesma."
      ],
      bullets: [
        "Confirme se o evento, a seleção, a linha e as regras de liquidação correspondem.",
        "Compare os preços atuais em vez de capturas de tela desatualizadas ou cotações históricas.",
        "Lembre-se de que os preços de mercado podem mudar antes que a aposta seja feita.",
        "Cotações equivalentes mais altas reduzem a probabilidade de equilíbrio.",
      ],
    },
    {
      id: "variance",
      heading: "Valor Esperado, Variância e Tamanho da Amostra",
      paragraphs: [
        "A variância descreve o quanto os resultados de curto prazo podem oscilar em torno de sua expectativa de longo prazo. As apostas esportivas têm uma variância substancial porque cada evento produz um resultado discreto e muitos mercados envolvem probabilidades distantes da certeza.",
        "Um processo com valor esperado genuinamente positivo pode passar por períodos prolongados de perdas. A magnitude e a duração dessas oscilações dependem do tipo de aposta, das odds, das probabilidades reais, da correlação entre as posições e do dimensionamento das apostas. Portanto, uma amostra pequena pode ser dominada pela aleatoriedade.",
        "Isso cria um grande problema de avaliação. Um apostador pode confundir uma sequência de vitórias com evidência de habilidade ou abandonar um processo sólido durante uma fase de baixa comum. A análise de EV é mais útil quando combinada com registros disciplinados, tamanhos de amostra realistas e atenção à calibração, em vez de focar apenas no lucro de curto prazo."
      ],
      callout: {
        title: "Resultados e processo não são idênticos",
        body:
          "Uma vitória não prova que uma aposta tinha EV positivo, e uma derrota não prova que tinha EV negativo. Avalie a qualidade da probabilidade e da decisão de preço separadamente do placar final.",
        tone: "warning",
      },
    },
    {
      id: "worked-example",
      heading: "Um exemplo prático de valor esperado",
      paragraphs: [
        "Considere que uma casa de apostas ofereça odds decimais de 2,30 para uma seleção. A probabilidade de equilíbrio é 1 ÷ 2,30, ou cerca de 43,48%. Sua análise independente estima a seleção em 47%.",
        "O EV por unidade é 0,47 × 2,30 − 1 = +0,081, ou +8,1%. Sob a estimativa de 47%, apostas repetidas na mesma relação entre probabilidade e preço renderiam teoricamente 1,081 unidades para cada unidade apostada, em média.",
        "Agora, teste a sensibilidade. Se a probabilidade real fosse de apenas 44%, o EV seria 0,44 × 2,30 − 1 = +1,2%. A 43%, o EV passa a ser −1,1%. A conclusão muda com um ajuste relativamente pequeno na probabilidade.",
        "Essa sensibilidade ilustra por que a interpretação responsável é importante. O número principal de +8,1% não é suficiente. Você também precisa entender quão confiante está na estimativa de 47% e se o preço cotado ainda está disponível."
      ],
      bullets: [
        "Odds: 2,30",
        "Probabilidade de equilíbrio: aproximadamente 43,48%",
        "Probabilidade estimada: 47%",
        "EV Estimado: +8.1%",
        "A 44% de probabilidade: +1.2% EV",
        "A 43% de probabilidade: −1.1% EV",
      ],
    },
    {
      id: "matchsignal",
      heading: "Como o Valor Esperado se Relaciona com a Vantagem de Valor do MatchSignal",
      paragraphs: [
        "O MatchSignal utiliza preços de mercado, amostras de casas de apostas e análises baseadas em probabilidade para fornecer contexto sobre uma seleção. O campo Vantagem de Valor da plataforma foi concebido para destacar uma diferença positiva entre o preço de mercado disponível e a avaliação baseada em probabilidade utilizada pelo MatchSignal.",
        "Isto deve ser interpretado como um sinal analítico e não como um retorno esperado garantido. Os preços de mercado podem oscilar, as estimativas de probabilidade contêm incerteza e o sinal apresentado reflete os dados e as hipóteses do modelo disponíveis no momento da análise.",
        "Melhores Odds mostra o preço parceiro mais forte disponível identificado para a seleção apresentada, Média de Mercado resume os preços de mercado amostrados, Probabilidade Justa é uma estimativa analítica e Casas Amostradas indica quantas fontes de casas de apostas contribuíram para a amostra de mercado relevante.",
        "A interpretação correta de uma Vantagem de Valor não é, portanto, 'esta aposta vai ganhar'. Está mais próxima de 'sob as hipóteses atuais de probabilidade e preço, esta seleção pode estar precificada de forma mais favorável do que a estimativa do modelo sugeriria'."
      ],
      callout: {
        title: "Um sinal não é uma garantia",
        body:
          "A Vantagem de Valor do MatchSignal descreve uma relação baseada num modelo entre probabilidade e preço. Não garante um resultado positivo nem elimina a variância desportiva.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Uma Lista de Verificação Prática de EV",
      paragraphs: [
        "Antes de descrever uma aposta como tendo valor esperado positivo, verifique cada componente do cálculo. Isto ajuda a evitar que uma fórmula matematicamente correta seja alimentada com entradas pouco fiáveis."
      ],
      bullets: [
        "Identifique o mercado e a seleção exatos.",
        "Use as probabilidades disponíveis no momento, e não um preço desatualizado.",
        "Converta o preço para a sua probabilidade implícita de equilíbrio.",
        "Estime a probabilidade do resultado de forma independente ou com um modelo claramente definido.",
        "Verifique se a margem da casa de apostas afeta a comparação de mercado.",
        "Calcule o EV a partir da probabilidade e do preço.",
        "Teste como o resultado muda se a estimativa de probabilidade for ligeiramente menor.",
        "Compare preços equivalentes entre casas de apostas, quando disponíveis.",
        "Leve em conta a incerteza e a variância.",
        "Use um dimensionamento de aposta disciplinado e nunca trate o EV como uma garantia.",
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
    "O valor esperado é uma estrutura matemática, e não uma garantia de lucro. As estimativas de probabilidade podem estar erradas, os preços de mercado mudam e os resultados de curto prazo podem variar substancialmente das expectativas teóricas. Aposte apenas quantias que possa perder, use limites predeterminados, evite correr atrás de prejuízos e trate a análise de apostas como informação em vez de certeza.",
};

export default guide;
