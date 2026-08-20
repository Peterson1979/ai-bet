import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bookmaker-margin-overround",
  locale: "pt",
  title: "O que é Margem da Casa de Apostas / Overround?",
  category: "odds-probability",
  status: "published",
  description:
    "Aprenda o que significam a margem da casa de apostas e o overround, como calculá-los a partir das odds de apostas, por que as probabilidades implícitas frequentemente somam mais de 100% e como a margem afeta a comparação de preços e a análise de valor.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A margem da casa de apostas, frequentemente chamada de overround ou vig, é a margem de precificação embutida em muitos mercados de apostas. Se cada resultado em um mercado perfeitamente justo fosse convertido em probabilidade, as probabilidades somariam 100%. Nos mercados reais de casas de apostas, as probabilidades implícitas derivadas das odds cotadas frequentemente somam mais de 100%. Esse excesso é o overround. Compreendê-lo é importante porque as probabilidades brutas da casa de apostas não são automaticamente probabilidades justas, e duas casas de apostas podem expressar visões semelhantes sobre um evento enquanto oferecem preços materialmente diferentes.",
  keyTakeaways: [
    "O overround é o montante pelo qual as probabilidades implícitas brutas de todos os resultados mutuamente exclusivos excedem 100%.",
    "Um mercado de duas vias precificado a 1.91 em ambos os lados implica cerca de 104,72% no total, correspondendo a um overround de cerca de 4,72 pontos percentuais.",
    "A probabilidade implícita bruta da casa de apostas é um número derivado do preço, e não automaticamente uma estimativa de probabilidade justa.",
    "Um overround mais baixo geralmente significa preços mais competitivos, mantendo-se todo o resto constante.",
    "A margem pode não ser distribuída uniformemente por todos os resultados, de modo que a simples normalização proporcional é apenas uma aproximação.",
    "As odds reais disponíveis para o usuário determinam a probabilidade de equilíbrio e, portanto, continuam sendo centrais para a análise de valor esperado.",
  ],
  sections: [
    {
      id: "definition",
      heading: "O Que Significa a Margem da Casa de Apostas",
      paragraphs: [
        "Uma casa de apostas normalmente não cria um mercado simplesmente publicando probabilidades perfeitamente justas. Em vez disso, os preços são tipicamente definidos de forma que as probabilidades implícitas combinadas excedam 100%. O excesso acima de 100% é comumente chamado de overround, margem da casa de apostas ou vig.",
        "Por exemplo, imagine um evento teórico de dois resultados em que ambos os lados são oferecidos a odds decimais de 1.91. Cada preço implica uma probabilidade de aproximadamente 52,36%. A soma de ambos resulta em cerca de 104,72%. O valor acima de 100%, aproximadamente 4,72 pontos percentuais, é o overround do mercado.",
        "Isto não significa que a casa de apostas tenha garantia de lucrar exatamente 4,72% em cada mercado. Resultados reais, distribuição de apostas, movimentação de preços, atividade promocional, limites, decisões de negociação e comportamento do cliente afetam os resultados realizados. A margem (overround) é mais bem compreendida como uma propriedade da estrutura de preços cotados do que como uma taxa de lucro garantida."
      ],
      callout: {
        title: "Estrutura de preços, não lucro garantido",
        body:
          "A margem (overround) descreve como um mercado é precificado. Ela não deve ser interpretada como o lucro garantido da casa de apostas em um evento individual.",
        tone: "warning",
      },
    },
    {
      id: "calculation",
      heading: "Como calcular a margem (overround) a partir de probabilidades decimais",
      paragraphs: [
        "O cálculo começa convertendo as probabilidades decimais de cada resultado em probabilidade implícita. Para probabilidades decimais, a probabilidade implícita é igual a 1 dividido pelas probabilidades. Some as probabilidades implícitas para todos os resultados mutuamente exclusivos no mercado.",
        "Se o total for 100%, o mercado é matematicamente isento de margem antes de considerar quaisquer outros fatores práticos. Se o total for 105%, a margem (overround) é de 5 pontos percentuais. Se o total for 108%, a margem (overround) é de 8 pontos percentuais.",
        "A fórmula pode ser escrita como: margem (overround) = soma de todas as probabilidades implícitas brutas − 100%."
      ],
      bullets: [
        "Converta cada preço decimal usando 1 ÷ odds.",
        "Some as probabilidades implícitas para todos os resultados mutuamente exclusivos.",
        "Subtraia 100 pontos percentuais do total.",
        "O valor restante é a margem (overround) do mercado cotado.",
      ],
      callout: {
        title: "Exemplo simples",
        body:
          "A 1,91 e 1,91, cada lado implica cerca de 52,36%. O total é de cerca de 104,72%, portanto a margem da casa (overround) é de cerca de 4,72 pontos percentuais.",
        tone: "example",
      },
    },
    {
      id: "three-way",
      heading: "Margem da casa em um mercado de futebol de três vias",
      paragraphs: [
        "Os mercados de futebol de três vias fornecem um exemplo útil porque a vitória da casa, o empate e a vitória fora são resultados mutuamente exclusivos. Suponha que as cotações sejam 2,10 para o time da casa, 3,40 para o empate e 3,60 para o time visitante.",
        "As probabilidades implícitas são de aproximadamente 47,62%, 29,41% e 27,78%. Somadas, totalizam cerca de 104,81%. A margem da casa resultante é, portanto, de aproximadamente 4,81 pontos percentuais.",
        "As três cotações não implicam que o evento tenha de alguma forma 104,81% de probabilidade total na realidade. O excesso aparece porque as cotações cotadas incluem margem e outras considerações de negociação."
      ],
      bullets: [
        "Casa 2,10 → aproximadamente 47,62%",
        "Empate 3,40 → aproximadamente 29,41%",
        "Fora 3,60 → aproximadamente 27,78%",
        "Total → aproximadamente 104,81%",
        "Margem da casa (overround) → aproximadamente 4,81 pontos percentuais",
      ],
    },
    {
      id: "raw-vs-fair",
      heading: "Probabilidade implícita bruta vs probabilidade justa",
      paragraphs: [
        "Uma probabilidade implícita bruta vem diretamente de uma cotação oferecida. Se uma casa de apostas oferece probabilidades decimais de 2,00, a probabilidade implícita bruta é de 50%. Esse número descreve o limite de ponto de equilíbrio embutido no preço disponível.",
        "Uma estimativa de probabilidade justa ou sem margem é diferente. Ela tenta remover o efeito da margem de lucro do mercado (overround) para que as probabilidades de resultados mutuamente exclusivos somem 100%.",
        "Essa distinção é importante porque tratar cada probabilidade bruta de casa de apostas como uma probabilidade justa pode exagerar a confiança aparente do mercado. Em um mercado totalizando 105%, as probabilidades implícitas brutas da casa de apostas descrevem coletivamente mais de 100% de probabilidade, o que é impossível para resultados exclusivos e exaustivos."
      ],
      callout: {
        title: "Não misture os dois conceitos",
        body:
          "A probabilidade implícita bruta vem do preço que você realmente consegue pegar. A probabilidade justa é uma estimativa analítica após o ajuste para a margem.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Uma Maneira Simples de Remover o Overround",
      paragraphs: [
        "Uma maneira comum de estimar probabilidades sem margem é a normalização proporcional. Divida cada probabilidade implícita bruta pela soma de todas as probabilidades implícitas brutas. As probabilidades ajustadas somarão então 100%.",
        "Suponha que um mercado de duas vias tenha probabilidades implícitas brutas de 55% e 50%, para um total de 105%. A normalização proporcional resulta em aproximadamente 52,38% para o primeiro lado e 47,62% para o segundo.",
        "Este método é simples e útil para comparação de mercados, mas assume que a margem é distribuída proporcionalmente entre os resultados. Em mercados reais, essa suposição pode ser imperfeita. As casas de apostas podem ajustar os preços de maneira diferente dependendo da demanda esperada, informações, responsabilidade, profundidade do mercado ou das características de resultados individuais.",
        "Por esse motivo, uma probabilidade normalizada deve ser descrita como uma estimativa de mercado sem margem, em vez da probabilidade objetivamente verdadeira do evento."
      ],
      bullets: [
        "Probabilidades brutas: 55% e 50%.",
        "Total do mercado: 105%.",
        "Primeiro lado normalizado: 55 ÷ 105 ≈ 52,38%.",
        "Segundo lado normalizado: 50 ÷ 105 ≈ 47,62%.",
        "Total normalizado: 100%.",
      ],
      callout: {
        title: "A normalização é uma estimativa",
        body:
          "A remoção matemática da margem (overround) não revela uma probabilidade verdadeira perfeita. Ela cria uma referência de mercado mais limpa.",
        tone: "info",
      },
    },
    {
      id: "uneven-margin",
      heading: "Por que a margem nem sempre é distribuída de forma uniforme",
      paragraphs: [
        "É tentador imaginar que uma casa de apostas simplesmente adiciona a mesma porcentagem de margem a cada seleção. A criação real de mercado costuma ser mais complexa. Alguns resultados podem atrair mais demanda pública, outros podem ser mais difíceis de precificar e alguns mercados podem ter menor liquidez ou maior incerteza.",
        "Portanto, uma casa de apostas pode ajustar um lado de forma mais agressiva do que o outro. Em mercados de azarão (longshot), a relação pode se tornar especialmente desigual: resultados de odds altas podem carregar uma margem efetiva diferente daquela de favoritos com preços baixos.",
        "Esta é uma das razões pelas quais os cálculos proporcionais sem vigor não devem ser tratados como probabilidades justas exatas. Existem métodos mais avançados de remoção de margem, mas todos dependem de suposições sobre como o overround é distribuído."
      ],
      callout: {
        title: "O overround não é necessariamente simétrico",
        body:
          "Dois resultados podem contribuir de maneira diferente para a margem total de uma casa de apostas. Um ajuste proporcional simples é útil, mas ainda assim é um modelo.",
        tone: "warning",
      },
    },
    {
      id: "price-comparison",
      heading: "Por que uma margem menor geralmente significa melhores preços",
      paragraphs: [
        "Se duas casas de apostas têm avaliações semelhantes de um evento, mas uma opera com um overround menor, o mercado de margem menor geralmente oferecerá preços mais competitivos ao apostador.",
        "Considere dois mercados simples de duas vias. A casa de apostas A precifica ambos os lados a 1,91, produzindo uma margem de cerca de 4,72%. A casa de apostas B precifica ambos os lados a 1,96, produzindo uma probabilidade implícita total de cerca de 102,04% e uma margem de cerca de 2,04%.",
        "Para uma aposta vencedora de uma unidade, 1,96 retorna mais do que 1,91. Mais importante, o preço mais alto reduz a probabilidade de equilíbrio de cerca de 52,36% para cerca de 51,02%. Essa diferença pode afetar materialmente o valor esperado ao longo de apostas repetidas.",
        "É por isso que comparar as odds atuais em mercados equivalentes pode ser útil mesmo sem fazer uma previsão melhor. O evento subjacente permanece inalterado, mas o preço disponível pode melhorar."
      ],
      bullets: [
        "1,91 / 1,91 → aproximadamente 4,72% de margem.",
        "1,96 / 1,96 → aproximadamente 2,04% de margem.",
        "Odds equivalentes mais altas reduzem a probabilidade de equilíbrio necessária.",
        "Sempre confirme se as regras de mercado e as condições de liquidação são comparáveis.",
      ],
    },
    {
      id: "margin-and-ev",
      heading: "Como a margem da casa de apostas afeta o valor esperado",
      paragraphs: [
        "O valor esperado depende da probabilidade de um resultado e do preço real disponível. Como a margem da casa de apostas geralmente reduz os preços em relação a um mercado teórico sem margem, a margem aumenta a taxa de sucesso necessária para atingir o equilíbrio.",
        "Suponha que você estime um resultado em 52%. A odds decimais de 2,00, o VE teórico é 0,52 × 2,00 − 1 = +4%. A 1,90, o VE passa a ser 0,52 × 1,90 − 1 = −1,2%. A estimativa de probabilidade permanece inalterada, mas o preço mais baixo altera a conclusão.",
        "Isso ilustra por que uma boa previsão não é suficiente por si só. O preço determina se a estimativa de probabilidade se traduz em valor esperado positivo, neutro ou negativo."
      ],
      callout: {
        title: "A margem altera o limite",
        body:
          "Um preço mais baixo exige uma taxa de vitória mais alta para atingir o ponto de equilíbrio. É por isso que a qualidade do preço importa independentemente da qualidade da previsão.",
        tone: "info",
      },
    },
    {
      id: "market-types",
      heading: "A Margem Pode Diferir Entre Esportes e Tipos de Mercado",
      paragraphs: [
        "A margem da casa de apostas não é fixa em todos os esportes ou mercados. Eventos principais de alta liquidez podem ter preços relativamente competitivos, enquanto ligas de nicho, mercados derivativos, apostas em jogadores (props) ou eventos de baixa liquidez podem apresentar margens mais amplas.",
        "Mesmo dentro da mesma partida, o mercado principal de vencedor da partida (moneyline) pode ter uma sobremargem (overround) diferente de totais, handicaps, mercados de proposição de jogadores ou mercados de placar correto. Mercados com muitos resultados possíveis também podem acumular uma sobremargem total substancial.",
        "Por esse motivo, comparar um único número de margem entre tipos de mercado não relacionados pode ser enganoso. A comparação mais útil geralmente é feita entre casas de apostas que cotam o mesmo mercado para o mesmo evento aproximadamente ao mesmo tempo."
      ],
    },
    {
      id: "changing-margin",
      heading: "Por Que a Sobremargem Pode Mudar Antes de uma Partida",
      paragraphs: [
        "Os mercados são dinâmicos. À medida que uma partida se aproxima, novas informações podem surgir, a liquidez pode aumentar, casas de apostas concorrentes podem alterar os preços e as operadoras podem modificar sua exposição ao risco. Portanto, a sobremargem total do mercado pode mudar ao longo do tempo.",
        "Em alguns eventos de grande visibilidade, os preços podem se tornar mais competitivos à medida que o mercado amadurece. Em outras situações, a incerteza ou decisões operacionais podem levar a preços mais amplos. Não há regra universal de que a margem deva sempre cair à medida que o início da partida se aproxima.",
        "Um cálculo de margem é, portanto, um instantâneo baseado nos preços utilizados naquele momento. A sobremargem histórica e a sobremargem atual não devem ser tratadas como intercambiáveis."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Erros Comuns ao Interpretar a Margem da Casa de Apostas",
      paragraphs: [
        "Um erro comum é tratar a sobremargem como o lucro percentual garantido da casa de apostas. Não é. Outro erro é assumir que as probabilidades implícitas brutas são probabilidades justas. Elas são limiares de ponto de equilíbrio derivados de preços e comumente incluem margem.",
        "Um terceiro erro é comparar a sobremargem entre mercados com diferentes estruturas de resultados sem contexto. Um mercado de partida de três vias, um mercado de totais de duas vias e um mercado de placar correto não são diretamente comparáveis simplesmente porque cada um produz uma única porcentagem de margem.",
        "Finalmente, remover a margem não remove a incerteza. Uma estimativa de mercado sem comissão ainda pode estar errada, desatualizada ou incompleta. É uma referência analítica útil, não uma garantia da verdadeira distribuição de probabilidade do evento."
      ],
      bullets: [
        "Não interprete o overround como lucro garantido da casa de apostas.",
        "Não considere as probabilidades implícitas brutas como automaticamente justas.",
        "Não assuma que a margem seja distribuída uniformemente entre os resultados.",
        "Não compare tipos de mercado não relacionados sem contexto.",
        "Não trate probabilidades sem margem como certas ou objetivamente verdadeiras.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Como a margem se encaixa na análise do MatchSignal",
      paragraphs: [
        "O MatchSignal compara preços de casas de apostas e dados de mercado para fornecer contexto em torno das seleções atuais. A Média de Mercado resume os preços de mercado amostrados, enquanto a Probabilidade Justa é uma estimativa de probabilidade analítica em vez de uma porcentagem implícita bruta da casa de apostas.",
        "A Margem de Valor destina-se a descrever a relação entre o preço de mercado disponível e a avaliação baseada em probabilidade do MatchSignal. Como os preços das casas de apostas podem incluir margem, uma análise útil deve distinguir entre o preço bruto disponível para o usuário e qualquer estimativa de probabilidade sem margem ou baseada em modelo.",
        "Casas Amostradas indica quantas fontes de casas de apostas contribuíram para a amostra de mercado relevante. Uma amostra mais ampla pode fornecer mais contexto em torno dos preços de mercado, mas não remove a incerteza nem garante que a estimativa resultante esteja correta.",
        "As Melhores Odds refletem o preço de parceiro disponível mais forte identificado para a seleção exibida. Como o preço de execução real determina a probabilidade de equilíbrio, até mesmo uma diferença modesta entre casas de apostas pode afetar o cálculo de valor."
      ],
      callout: {
        title: "O preço de mercado e a probabilidade analítica são diferentes",
        body:
          "MatchSignal separa os preços disponíveis da análise baseada em probabilidade para que os usuários possam inspecionar a relação em vez de tratar as probabilidades das casas de apostas como certeza.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Uma Lista de Verificação Prática de Overround",
      paragraphs: [
        "Ao revisar a margem da casa de apostas, use a seguinte sequência para evitar os erros de interpretação mais comuns."
      ],
      bullets: [
        "Identifique todos os resultados mutuamente exclusivos no mercado exato.",
        "Converta cada preço decimal cotado em probabilidade implícita.",
        "Some as probabilidades implícitas brutas.",
        "Subtraia 100% para calcular o overround do mercado.",
        "Se necessário, normalize as probabilidades para criar uma referência simples sem margem.",
        "Lembre-se de que a normalização proporcional é uma suposição, não uma verdade absoluta.",
        "Compare mercados equivalentes entre casas de apostas em horários semelhantes.",
        "Use as probabilidades reais disponíveis ao calcular a probabilidade de equilíbrio e o EV.",
        "Trate um overround mais baixo como uma vantagem de preço, e não como uma garantia de melhores previsões.",
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
    "Compreender a margem da casa de apostas pode ajudá-lo a avaliar os preços com mais clareza, mas uma margem menor ou odds melhores não eliminam o risco financeiro das apostas. Os resultados permanecem incertos, as estimativas de probabilidade podem estar erradas e podem ocorrer perdas mesmo quando um preço parece favorável. Aposte apenas quantias que possa perder, utilize limites predeterminados e nunca persiga as perdas.",
};

export default guide;
