import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "flat-stakes-vs-percentage-staking",
  locale: "pt",
  title: "Stakes Fixas vs Dimensionamento por Percentagem",
  category: "bankroll-risk",
  status: "published",
  description:
    "Compare as apostas com stakes fixas e dimensionamento por percentagem nas apostas desportivas, compreenda como cada método afeta a volatilidade da banca, as perdas máximas (drawdowns), o registo de histórico e o risco, e aprenda quando cada abordagem pode ser mais fácil de gerir.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "As stakes fixas e o dimensionamento por percentagem são duas formas comuns de decidir quanto arriscar de uma banca de apostas em cada aposta. As stakes fixas utilizam o mesmo montante de aposta repetidamente, enquanto o dimensionamento por percentagem utiliza uma percentagem fixa da banca atual, fazendo com que o tamanho da aposta aumente ou diminua à medida que a banca se altera. Nenhuma das abordagens cria uma vantagem por si só. O seu propósito é o controlo de risco e a consistência. A melhor escolha depende da simplicidade, estabilidade e ajuste automático da banca que o apostador deseja.",
  keyTakeaways: [
    "As stakes fixas utilizam o mesmo montante de aposta em todas as apostas, enquanto o dimensionamento por percentagem utiliza uma percentagem fixa da banca atual.",
    "As stakes fixas são simples e tornam o desempenho da estratégia fácil de avaliar.",
    "O dimensionamento por percentagem reduz automaticamente a exposição durante períodos de perdas e aumenta a exposição após o crescimento da banca.",
    "Nenhum método de staking consegue tornar lucrativa uma estratégia com valor esperado negativo.",
    "Percentagens de aposta elevadas podem criar uma volatilidade severa, mesmo quando a própria regra de staking é consistente.",
    "A qualidade da probabilidade subjacente e da decisão sobre o preço importa mais do que a fórmula de staking.",
    "Um plano de staking deve ser escolhido antes de começar a apostar e não deve ser alterado de forma impulsiva após vitórias ou derrotas.",
  ],
  sections: [
    {
      id: "flat-staking",
      heading: "O que são Stakes Fixas?",
      paragraphs: [
        "Stakes fixas significam arriscar o mesmo montante fixo em cada aposta, independentemente dos resultados recentes ou de alterações no tamanho da banca.",
        "Por exemplo, um apostador pode decidir que uma unidade equivale a 10 unidades de moeda e apostar uma unidade em cada seleção. Quer a banca suba de 1.000 para 1.100 ou caia para 900, a aposta seguinte permanece em 10.",
        "A principal vantagem é a simplicidade. O desempenho é fácil de acompanhar porque grandes alterações nas apostas não distorcem o registro. Se uma estratégia ganha ou perde, o resultado é impulsionado principalmente pelas seleções e preços, em vez de alterações agressivas no tamanho da posição."
      ],
      callout: {
        title: "Fixo não significa livre de risco",
        body:
          "Uma aposta fixa ainda pode se tornar muito grande em relação à banca após uma queda acentuada (drawdown).",
        tone: "warning",
      },
    },
    {
      id: "percentage-staking",
      heading: "O que é Dimensionamento Percentual de Apostas?",
      paragraphs: [
        "O dimensionamento percentual de apostas arrisca uma porcentagem fixa da banca atual em cada aposta. Se a banca muda, a aposta muda com ela.",
        "Suponha que a banca seja 1.000 e a regra de apostas seja 1%. A primeira aposta é 10. Se a banca cair posteriormente para 800, a próxima aposta de 1% passa a ser 8. Se a banca crescer para 1.200, a próxima aposta passa a ser 12.",
        "Isso cria um mecanismo de ajuste automático. A exposição diminui durante períodos de perdas e aumenta gradualmente durante períodos de ganhos."
      ],
      bullets: [
        "Banca de 1.000 a 1% → Aposta de 10 unidades.",
        "Banca de 800 a 1% → Aposta de 8 unidades.",
        "Banca de 1.200 a 1% → Aposta de 12 unidades.",
      ],
    },
    {
      id: "main-difference",
      heading: "A Diferença Central Entre os Dois Métodos",
      paragraphs: [
        "A diferença central é se o valor apostado permanece fixo em termos de moeda ou fixo em relação ao tamanho da banca.",
        "O staking fixo mantém o tamanho da aposta constante. O staking percentual mantém a proporção da banca em risco aproximadamente constante.",
        "Essa distinção altera o comportamento de cada método durante quedas. Com o staking fixo, a mesma aposta se torna uma porcentagem maior da banca restante à medida que as perdas se acumulam. Com o staking percentual, a aposta diminui automaticamente.",
        "Durante o crescimento da banca, o oposto acontece. As apostas fixas tornam-se uma porcentagem menor da banca ao longo do tempo, enquanto as apostas percentuais aumentam."
      ],
      callout: {
        title: "Valor constante vs proporção constante",
        body:
          "O staking fixo estabiliza o valor da aposta. O staking percentual estabiliza a proporção da banca em risco.",
        tone: "info",
      },
    },
    {
      id: "drawdowns",
      heading: "Como cada método se comporta durante as quedas",
      paragraphs: [
        "As quedas são períodos em que a banca cai em relação a um pico anterior. Elas são normais nas apostas esportivas porque a variância pode produzir sequências de derrotas, mesmo quando o processo subjacente é razoável.",
        "O staking fixo não reage automaticamente a uma queda. Se o apostador continuar arriscando 10 unidades enquanto a banca cai de 1.000 para 700, a aposta sobe de 1% para cerca de 1,43% da banca.",
        "O staking percentual reage automaticamente. Uma aposta de 1% em uma banca de 700 é de 7 unidades, reduzindo o tamanho de perdas adicionais em termos de moeda.",
        "Esse recurso defensivo é um dos argumentos mais fortes a favor do staking percentual, especialmente quando a preservação da banca é o principal objetivo."
      ],
    },
    {
      id: "growth",
      heading: "Como cada método se comporta durante o crescimento da banca",
      paragraphs: [
        "Quando uma banca cresce, o sistema de apostas fixas (flat staking) torna-se progressivamente mais conservador, porque a aposta fixa representa uma porcentagem menor do capital total.",
        "Se uma aposta de 10 unidades era originalmente 1% de uma banca de 1.000, ela passa a ser apenas 0,67% de uma banca de 1.500.",
        "O staking percentual aumenta a aposta junto com a banca. A 1%, uma banca de 1.500 produz uma aposta de 15 unidades. Isso permite que o tamanho da posição cresça com o aumento do capital.",
        "A capitalização (compounding) pode acelerar os ganhos durante períodos favoráveis, mas também aumenta o tamanho absoluto das perdas quando apostas maiores eventualmente perdem."
      ],
      callout: {
        title: "A capitalização funciona em ambas as direções",
        body:
          "O staking percentual aumenta o tamanho da aposta conforme a banca cresce, mas as perdas futuras também são maiores em termos absolutos.",
        tone: "warning",
      },
    },
    {
      id: "record-keeping",
      heading: "Qual método é mais fácil de avaliar?",
      paragraphs: [
        "O staking fixo costuma ser mais fácil para avaliar a qualidade de uma estratégia de apostas, porque cada seleção carrega o mesmo peso nominal.",
        "Se 100 apostas forem de uma unidade cada, o registro de lucros e perdas reflete o desempenho do processo de seleção sem uma grande variação de apostas dominando o resultado.",
        "O staking percentual cria tamanhos de apostas variáveis. Uma aposta posterior pode ter um efeito financeiro maior do que uma anterior simplesmente porque a banca cresceu.",
        "Para pesquisas, testes de modelos ou comparação de estratégias, as unidades fixas podem, portanto, fornecer um registro de desempenho mais limpo. O staking percentual pode ser mais adequado quando a principal preocupação é controlar a exposição em relação à banca atual."
      ],
    },
    {
      id: "variance",
      heading: "A variância sob staking fixo e percentual",
      paragraphs: [
        "Nenhum método de gestão de banca remove a variância dos resultados esportivos. Ambos passarão por sequências de vitórias e derrotas.",
        "A diferença é como esses resultados se traduzem na movimentação da banca. Com a gestão percentual, o valor monetário das oscilações ajusta-se automaticamente com o tamanho da banca. Com a gestão fixa, a mesma oscilação monetária continua independentemente dos ganhos ou perdas recentes.",
        "Com tamanhos de aposta conservadores, ambas as abordagens podem produzir volatilidade administrável. Com tamanhos de aposta agressivos, ambas podem se tornar perigosas.",
        "O percentual em si importa mais do que saber se o método é chamado de gestão fixa ou percentual. Uma aposta consistente de 10% pode ser muito mais perigosa do que uma unidade fixa conservadora de 1%."
      ],
      callout: {
        title: "A consistência não é suficiente",
        body:
          "Uma regra de gestão de banca pode ser perfeitamente consistente e ainda assim ser excessivamente agressiva. O tamanho da aposta em relação à banca continua a ser crítico.",
        tone: "warning",
      },
    },
    {
      id: "expected-value",
      heading: "A Gestão de Banca Não Cria Valor Esperado",
      paragraphs: [
        "Um sistema de gestão de banca não pode transformar um preço ruim em um bom preço. O valor esperado vem da relação entre probabilidade e odds.",
        "Se uma aposta tem valor esperado negativo, apostar 1%, 2% ou uma unidade fixa de 10 não altera a economia subjacente. Isso apenas altera o tamanho da perda esperada e a volatilidade em torno dela.",
        "Da mesma forma, uma estratégia de valor esperado positivo pode ser prejudicada pelo dimensionamento excessivo das apostas. Uma vantagem real não protege uma banca contra a ruína se a exposição for excessivamente agressiva.",
        "A ordem correta é, portanto: avaliar primeiro o mercado e o preço, e só depois aplicar uma regra de gestão de banca com risco controlado."
      ],
      bullets: [
        "A probabilidade e o preço determinam o EV.",
        "O valor da aposta determina a exposição.",
        "O dimensionamento das apostas altera o tamanho dos resultados, não a qualidade da aposta subjacente.",
        "Nenhum sistema de apostas garante lucro.",
      ],
    },
    {
      id: "percentage-example",
      heading: "Um Exemplo de Aposta Percentual",
      paragraphs: [
        "Considere uma banca de 1.000 unidades usando uma aposta percentual de 2%. A primeira aposta é 20.",
        "Se a aposta for perdedora, a banca passa a ser 980 e a próxima aposta de 2% passa a ser 19,60. Outra perda deixa 960,40, e a aposta seguinte passa a ser 19,21.",
        "A aposta diminui à medida que a banca cai. Isso desacelera a taxa absoluta de perda em comparação com continuar a apostar um valor fixo de 20 unidades.",
        "Se a banca crescer posteriormente, o processo se inverte e as apostas aumentam gradualmente."
      ],
      callout: {
        title: "Dimensionamento automático",
        body:
          "A aposta percentual reduz a exposição absoluta durante as perdas, sem exigir que o apostador tome uma nova decisão discricionária.",
        tone: "example",
      },
    },
    {
      id: "flat-example",
      heading: "Um Exemplo de Aposta Fixa",
      paragraphs: [
        "Agora considere a mesma banca de 1.000 unidades usando uma aposta fixa de 20 unidades.",
        "Após uma perda, a banca é 980, mas a aposta seguinte continua sendo 20. Após duas perdas, a banca é 960 e a terceira aposta ainda é 20.",
        "O valor fixo torna o acompanhamento simples, mas a aposta agora representa cerca de 2,08% da banca menor, em vez dos 2% originais.",
        "Se a banca cair substancialmente, uma aposta fixa deve ser revista, em vez de permitir que se torne uma porcentagem cada vez maior do capital restante."
      ],
    },
    {
      id: "rebalancing",
      heading: "Uma Abordagem Híbrida: Rebalanceamento Periódico",
      paragraphs: [
        "Alguns apostadores usam uma abordagem híbrida: apostas fixas por um período, seguidas de recálculo ocasional do tamanho da unidade.",
        "Por exemplo, uma unidade pode ser definida como 1% da banca no início de cada mês ou após a banca mudar por um valor predefinido.",
        "Isso preserva gran parte da simplicidade das apostas fixas, evitando que uma unidade fixa se torne muito grande ou muito pequena em relação à banca.",
        "A chave é que as regras de rebalanceamento devem ser predeterminadas. Mudar constantemente o tamanho da aposta após vitórias ou derrotas emocionais derrota o propósito de ter uma estrutura de apostas."
      ],
    },
    {
      id: "confidence-staking",
      heading: "As Apostas Devem Mudar Com a Confiança?",
      paragraphs: [
        "Alguns apostadores variam o tamanho da aposta com base na vantagem percebida ou na confiança. Em teoria, um valor esperado positivo maior pode justificar uma exposição maior.",
        "O problema prático é o erro de estimativa. Se um apostador estiver excessivamente confiante sobre quais seleções têm a maior vantagem, as apostas variáveis podem magnificar os erros.",
        "Por esse motivo, as apostas fixas ou em porcentagem simples costumam ser mais fáceis de auditar e controlar. Apostas variáveis mais avançadas só devem ser consideradas quando as estimativas de probabilidade estão bem calibradas e limites rígidos de exposição máxima estão em vigor.",
        "Um rótulo como 'alta confiança' nunca deve ser tratado como certeza."
      ],
      callout: {
        title: "A confiança pode estar mal calibrada",
        body:
          "Stakes variáveis amplificam as avaliações de confiança tanto corretas quanto incorretas.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "Como o Critério de Kelly difere",
      paragraphs: [
        "O Critério de Kelly não é nem apostas planas nem apostas simples de porcentagem fixa. Ele calcula uma fração recomendada da banca com base na vantagem estimada e nas odds.",
        "Em teoria, Kelly adapta o tamanho da aposta à força da oportunidade estimada. Na prática, ele é altamente sensível a erros de probabilidade.",
        "Se a estimativa de probabilidade for muito otimista, o Kelly integral pode recomendar uma aposta excessivamente grande. É por isso que abordagens de Kelly fracionário são frequentemente usadas para reduzir a volatilidade.",
        "Para a maioria dos usuários, a lição importante não é que uma fórmula seja superior. É que apostas mais complexas exigem estimativas de probabilidade mais confiáveis e controles de risco mais fortes."
      ],
    },
    {
      id: "psychology",
      heading: "Qual método é mais fácil de seguir emocionalmente?",
      paragraphs: [
        "Apostas planas podem parecer mais fáceis porque o valor não muda após vitórias ou derrotas. Isso reduz a tentação de interpretar mudanças nas apostas como reações emocionais.",
        "Apostas por porcentagem também podem apoiar a disciplina porque o ajuste é automático e baseado em regras. Uma aposta menor após derrotas não é um castigo; é simplesmente o resultado de uma banca menor.",
        "Problemas surgem quando os apostadores abandonam qualquer um dos métodos após uma sequência. Aumentar as apostas após derrotas para recuperar dinheiro ou aumentá-las após vitórias devido ao excesso de confiança introduz risco discricionário.",
        "O melhor método de gestão de banca é frequentemente aquele que pode ser seguido de forma consistente sem encorajar mudanças impulsivas."
      ],
    },
    {
      id: "matchsignal",
      heading: "Como a Gestão de Banca se Relaciona com o MatchSignal",
      paragraphs: [
        "O MatchSignal fornece contexto analítico, incluindo Melhores Odds, Média de Mercado, Probabilidade Justa, Vantagem de Valor, Casas Amostradas e Nível de Risco.",
        "Estes campos não são instruções de apostas. Uma classificação de Risco Baixo ou uma Vantagem de Valor maior não deve resultar automaticamente em uma aposta maior.",
        "O tamanho da aposta deve ser determinado por uma estrutura de banca pessoal separada que leve em conta a acessibilidade, a incerteza, a variância e os limites de jogo responsável.",
        "A análise do MatchSignal é informativa e não garante resultados nem recomenda uma exposição financeira específica."
      ],
      callout: {
        title: "A análise e o dimensionamento da aposta são decisões separadas.",
        body:
          "Um sinal analítico forte não elimina a incerteza e não deve anular as regras conservadoras de gestão de banca.",
        tone: "warning",
      },
    },
    {
      id: "comparison",
      heading: "Apostas Fixas vs. Apostas Percentuais: Comparação Lado a Lado",
      paragraphs: [
        "Ambos os métodos podem ser sensatos quando as apostas são conservadoras e as regras são seguidas de forma consistente. Os seus pontos fortes são diferentes."
      ],
      bullets: [
        "Apostas fixas: mais simples de compreender e monitorizar.",
        "Apostas fixas: úteis para avaliar o desempenho da estratégia.",
        "Staking fixa: pode tornar-se excessivamente grande em relação à banca após uma queda prolongada.",
        "Staking percentual: reduz automaticamente a exposição durante quedas.",
        "Staking percentual: acumula automaticamente juros compostos durante o crescimento da banca.",
        "Staking percentual: produz tamanhos de aposta variáveis que podem tornar a avaliação menos intuitiva.",
        "Ambos os métodos: exigem níveis de aposta conservadores e não conseguem criar uma vantagem.",
      ],
    },
    {
      id: "checklist",
      heading: "Uma Lista de Verificação Prática de Staking",
      paragraphs: [
        "Qualquer que seja o método escolhido, a regra de staking deve ser simples o suficiente para ser seguida tanto em condições de vitória quanto de derrota."
      ],
      bullets: [
        "Separe a banca de apostas do dinheiro essencial.",
        "Escolha staking fixo ou percentual antes de começar a apostar.",
        "Mantenha o valor da aposta conservador em relação à banca.",
        "Não aumente as apostas para recuperar perdas.",
        "Avalie se uma aposta fixa se tornou demasiado grande após uma queda.",
        "Se utilizar staking percentual, calcule de forma consistente a partir da banca atual.",
        "Evite mudanças discricionárias frequentes com base em resultados recentes.",
        "Acompanhe as apostas e as alterações na banca com precisão.",
        "Trate o dimensionamento de apostas variável avançado com cautela quando as estimativas de probabilidade forem incertas.",
        "Interrompa ou reduza as apostas se a pressão financeira ou emocional aumentar.",
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
    "Apostas fixas e apostas percentuais são métodos de gerenciamento de risco, não garantias de lucro. Qualquer estratégia de apostas pode perder dinheiro. Mantenha as apostas dentro de valores que você possa perder, separe os fundos de apostas do dinheiro essencial, evite aumentar as apostas para recuperar perdas e pare se as apostas causarem danos financeiros ou emocionais.",
};

export default guide;
