import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "implied-probability",
  locale: "pt",
  title: "O Que É Probabilidade Implícita?",
  category: "odds-probability",
  status: "published",
  description:
    "Aprenda como converter cotações de apostas em probabilidade implícita, por que as margens das casas de apostas fazem com que as probabilidades brutas do mercado ultrapassem 100%, e como interpretar a probabilidade implícita sem confundir preço com certeza.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A probabilidade implícita é a probabilidade codificada por um preço de aposta. Ela traduz as cotações em uma porcentagem, facilitando a comparação de diferentes preços e ajudando você a ver a taxa de equilíbrio associada a uma aposta. O cálculo é simples, mas interpretá-lo corretamente exige cuidado: os preços das casas de apostas podem incluir margem, movimentação de mercado e gerenciamento de risco, portanto, a probabilidade implícita não deve ser tratada como uma previsão objetiva ou uma garantia.",
  keyTakeaways: [
    "Para cotações decimais, a probabilidade implícita é igual a 1 dividido pelas cotações, multiplicado por 100.",
    "Cotações decimais de 2.00 implicam 50%; 1.50 implicam cerca de 66.7%; 4.00 implicam 25%.",
    "As probabilidades implícitas brutas em um mercado de casa de apostas frequentemente somam mais de 100% porque os preços podem incluir a margem da casa de apostas.",
    "A probabilidade implícita é uma propriedade do preço cotado, e não uma prova da probabilidade real de um resultado.",
    "Uma estimativa de probabilidade torna-se útil para a análise de valor apenas quando é comparada com a probabilidade de equilíbrio implícita nas cotações disponíveis.",
    "Pequenas diferenças nas cotações podem alterar materialmente a probabilidade de equilíbrio e a economia de longo prazo de apostas repetidas.",
  ],
  sections: [
    {
      id: "definition",
      heading: "O Que Significa Probabilidade Implícita",
      paragraphs: [
        "As cotações de apostas e a probabilidade são duas maneiras de expressar a mesma relação de preço. As cotações mostram o retorno potencial associado a um resultado. A probabilidade implícita converte esse preço na taxa de sucesso percentual que corresponderia às cotações cotadas antes de considerar a margem da casa de apostas, a incerteza do modelo ou outros efeitos de mercado.",
        "Por exemplo, cotações decimais de 2.00 implicam uma probabilidade de 50%. Isso não significa que o resultado acontecerá metade das vezes em qualquer amostra pequena, e não significa que a casa de apostas descobriu a probabilidade real. Significa que um preço de 2.00 corresponde matematicamente a uma taxa de equilíbrio de 50%: ignorando outros fatores práticos, um apostador que vença exatamente metade de apostas idênticas a 2.00 recuperaria o valor apostado a longo prazo.",
        "Esta tradução em percentagem é útil porque as probabilidades são frequentemente mais fáceis de compreender do que as odds brutas. Comparar 1.62 com 1.75 pode parecer abstrato. Convertê-las para aproximadamente 61.7% e 57.1% mostra imediatamente que os dois preços exigem taxas de sucesso significativamente diferentes."
      ],
      callout: {
        title: "Preço, não certeza",
        body:
          "Uma probabilidadeimplícita descreve o que um preço cotado significa matematicamente. Não é uma promessa de que o evento ocorrerá com essa frequência.",
        tone: "warning",
      },
    },
    {
      id: "formula",
      heading: "Como Calcular a Probabilidade Implícita a partir de Odds Decimais",
      paragraphs: [
        "Para odds decimais, a fórmula de conversão é: probabilidade implícita = 1 ÷ odds decimais. Multiplique o resultado por 100 para exprimi-lo como uma percentagem.",
        "A odds de 2.00, o cálculo é 1 ÷ 2.00 = 0.50, ou 50%. A 1.50, é 1 ÷ 1.50 = 0.6667, ou cerca de 66.7%. A 2.50, é 40%. A 5.00, é 20%.",
        "A relação é inversa. Odds mais baixas implicam uma probabilidade mais alta e um retorno potencial mais baixo. Odds mais altas implicam uma probabilidade mais baixa e um retorno potencial mais alto. Como a relação não é linear, uma alteração de 0.10 nas odds decimais não representa a mesma alteração de probabilidade em cada nível de preço."
      ],
      bullets: [
        "1.25 ‒ 80.0% de probabilidade implícita",
        "1.50 → 66.7%",
        "1.80 → 55.6%",
        "2.00 → 50.0%",
        "2.50 → 40.0%",
        "3.00 → 33,3%",
        "4.00 → 25,0%",
        "5.00 → 20,0%",
      ],
      callout: {
        title: "Exemplo",
        body:
          "Se uma casa de apostas oferece 2,20, a probabilidade implícita é 1 ÷ 2,20 = 0,4545, ou cerca de 45,5%. Seria necessária uma estimativa de probabilidade superior a 45,5% antes que esse preço pudesse representar valor esperado positivo sob a estimativa.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Por que a Probabilidade Implícita É Também uma Probabilidade de Empate (Break-Even)",
      paragraphs: [
        "A probabilidade implícita a partir das odds disponíveis pode ser interpretada como um limite teórico de equilíbrio (break-even). Suponha que você aceite repetidamente odds decimais de 2,00. Uma taxa de acerto de 50% produz um retorno bruto médio de uma unidade por unidade apostada: metade das apostas retorna duas unidades e metade retorna zero. Antes de considerar quaisquer outros custos ou limitações, 50% é, portanto, a taxa de equilíbrio.",
        "A odds de 1,80, a probabilidade implícita é de cerca de 55,6%. Se um resultado realmente ocorresse apenas 50% das vezes, aceitar repetidamente 1,80 teria valor esperado negativo. A odds de 2,20, a probabilidade de equilíbrio é de cerca de 45,5%; se uma estimativa bem calibrada colocasse o resultado em 50%, o preço cotado estaria teoricamente acima do requisito de equilíbrio.",
        "Esta é a base da análise de valor esperado. A comparação importante não é simplesmente se um resultado tem probabilidade de acontecer. É se a probabilidade estimada é alta o suficiente em relação ao preço oferecido."
      ],
      callout: {
        title: "Provável não significa automaticamente valioso",
        body:
          "Um resultado pode ter 70% de chance de ocorrer e ainda assim ser pouco atraente se as odds disponíveis exigirem uma taxa de equilíbrio superior a 70%. Por outro lado, um resultado de menor probabilidade pode ser atraente se o preço compensar amplamente o risco sob uma estimativa confiável.",
        tone: "info",
      },
    },
    {
      id: "margin",
      heading: "Por que as Probabilidades Implícitas das Casas de Apostas Podem Somar Mais de 100%",
      paragraphs: [
        "Se um mercado representasse resultados mutuamente exclusivos com preços perfeitamente justos e sem margem, as probabilidades implícitas somariam 100%. Os mercados reais de casas de apostas frequentemente excedem 100%. O excesso é comumente chamado de overround ou margem da casa de apostas.",
        "Considere um mercado simplificado de dois resultados com ambos os lados precificados a 1.91. Cada preço implica aproximadamente 52,36%. Juntos, eles totalizam cerca de 104,72%. Os 4,72 pontos percentuais acima de 100% ilustram a margem (overround) neste mercado simplificado.",
        "Devido a essa margem, a probabilidade implícita bruta de uma seleção de casa de apostas não deve ser automaticamente descrita como sua probabilidade justa. Os analistas podem remover ou normalizar a margem para criar uma estimativa de mercado sem comissão (no-vig), mas isso requer um cálculo adicional."
      ],
      bullets: [
        "Converta as odds de cada resultado em probabilidade implícita bruta.",
        "Some todas as probabilidades de resultados mutuamente exclusivos.",
        "Um total acima de 100% indica uma margem (overround) no mercado cotado.",
        "Normalize as probabilidades dos resultados se você precisar de uma estimativa simples de mercado sem margem.",
      ],
      callout: {
        title: "Distinção importante",
        body:
          "A probabilidade implícita bruta vem diretamente de um preço cotado. Uma estimativa sem margem ou de probabilidade justa requer um ajuste adicional e deve ser rotulada de acordo.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Um exemplo simples de remoção da margem (overround)",
      paragraphs: [
        "Uma forma básica de criar uma estimativa sem margem é a normalização proporcional. Suponha que um mercado de dois resultados tenha probabilidades implícitas brutas de 55% e 50%, para um total de 105%. Divida cada probabilidade por 105%. As estimativas normalizadas tornam-se aproximadamente 52,38% e 47,62%, que somam 100%.",
        "Este procedimento é uma forma útil de entender a estrutura de um mercado, mas faz uma premissa: que a margem da casa de apostas é distribuída proporcionalmente entre os resultados. A precificação real pode ser mais complexa. A margem pode não ser alocada uniformemente, diferentes resultados podem atrair diferentes demandas e as casas de apostas podem usar estratégias distintas de negociação e gerenciamento de risco.",
        "Remover a margem (overround), portanto, não é o mesmo que descobrir a verdadeira probabilidade. É melhor descrito como derivar uma estimativa baseada no mercado mais limpa a partir dos preços cotados."
      ],
      callout: {
        title: "Sem margem não significa perfeito",
        body:
          "Um mercado normalizado pode ser uma referência útil, mas a incerteza, as lacunas de informação, o viés de mercado e as diferenças de preços ainda podem persistir.",
        tone: "info",
      },
    },
    {
      id: "formats",
      heading: "Probabilidade Implícita em Diferentes Formatos de Odds",
      paragraphs: [
        "As odds decimais, fracionárias e americanas expressam a mesma relação económica em formatos diferentes. O MatchSignal utiliza odds decimais porque tornam diretos tanto o cálculo de retorno quanto a conversão de probabilidade.",
        "Odds fracionárias, como 3/2, representam o lucro em relação à aposta. Para convertê-las em decimais, adicione um: 3/2 torna-se 2,50 em decimal, o que implica 40%. As odds americanas utilizam números positivos e negativos em torno de um ponto de referência de 100 unidades, pelo que a fórmula de conversão difere dependendo se o preço é positivo ou negativo.",
        "Assim que qualquer formato é convertido em odds decimais, pode ser utilizada a mesma fórmula 1 ÷ odds. Isto torna as odds decimais uma linguagem comum conveniente para comparar preços de várias fontes."
      ],
      bullets: [
        "Fracionária 1/1 = decimal 2,00 = 50% de probabilidade implícita.",
        "Fracionária 3/2 = decimal 2,50 = 40%.",
        "Americana +100 = decimal 2,00 = 50%.",
        "Americana -200 = decimal 1,50 = cerca de 66,7%.",
      ],
    },
    {
      id: "price-comparison",
      heading: "Como Melhores Odds Alteram a Probabilidade Implícita",
      paragraphs: [
        "A comparação de preços é importante porque um preço melhor reduz a taxa de sucesso necessária para atingir o ponto de equilíbrio. Imagine que a mesma seleção está disponível a 1,80, 1,90 e 2,00. Esses preços implicam aproximadamente 55,6%, 52,6% e 50,0%, respectivamente.",
        "O evento esportivo subjacente é idêntico, mas a economia da aposta não é. Se a sua avaliação de probabilidade fosse de 54%, o preço de 1,80 estaria acima da sua estimativa de maneira desfavorável, pois exige 55,6% para atingir o ponto de equilíbrio. Os preços de 1,90 e 2,00 exigiriam taxas de equilíbrio mais baixas e, portanto, poderiam produzir valor esperado positivo sob a estimativa de 54%.",
        "Isso ilustra por que a comparação de odds não se resume apenas a maximizar um pagamento após uma vitória. O preço altera o limite matemático que a sua estimativa de probabilidade deve superar."
      ],
      callout: {
        title: "Mesma escolha, valor diferente",
        body:
          "Uma seleção não tem um valor fixo independente do preço. Quando as odds mudam, a probabilidade implícita e a relação de valor esperado mudam com elas.",
        tone: "example",
      },
    },
    {
      id: "market-movement",
      heading: "O que acontece com a probabilidade implícita quando as odds se movimentam",
      paragraphs: [
        "Quando as odds diminuem, a probabilidade implícita aumenta. Quando as odds aumentam, a probabilidade implícita cai. Uma mudança de 2,20 para 2,00 altera a probabilidade implícita de cerca de 45,5% para 50%. Uma mudança de 2,00 para 1,80 a eleva ainda mais para cerca de 55,6%.",
        "As odds podem mudar por vários motivos: novas informações, lesões, escalações confirmadas, clima, atividade de mercado, alterações em casas de apostas concorrentes ou decisões de gerenciamento de risco da própria casa de apostas. Portanto, uma mudança nas odds não prova que a verdadeira probabilidade subjacente mudou exatamente na mesma proporção.",
        "Ainda assim, traduzir a movimentação de um preço em probabilidade implícita pode tornar a escala da mudança mais intuitiva. Dizer que um preço diminuiu de 2,20 para 1,90 é menos imediato do que reconhecer que a probabilidade de equilíbrio cotada passou de aproximadamente 45,5% para 52,6%."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Erros comuns ao ler a probabilidade implícita",
      paragraphs: [
        "A aritmética é simples o suficiente para que a maioria dos erros venha da interpretação e não do cálculo. O erro mais comum é tratar a probabilidade implícita como certeza ou como a previsão exata da casa de apostas. Outro é comparar probabilidades de mercados diferentes sem verificar se as seleções e as regras de liquidação são genuinamente equivalentes.",
        "Um terceiro erro é ignorar a margem da casa de apostas. Se as probabilidades em um mercado somam 105%, cotar cada porcentagem bruta como uma probabilidade justa exagera a probabilidade total disponível. Por fim, os apostadores podem superestimar pequenas vantagens aparentes. Uma diferença de um ou dois pontos percentuais pode desaparecer quando o modelo de probabilidade subjacente for incerto ou mal calibrado."
      ],
      bullets: [
        "Não interprete a probabilidade implícita como certeza.",
        "Não chame a probabilidade bruta da casa de apostas de 'probabilidade justa' sem abordar a margem.",
        "Não compare probabilidades de diferentes definições de mercado como se fossem idênticas.",
        "Não assuma que toda diferença entre sua estimativa e o mercado é uma vantagem real.",
        "Não ignore que as probabilidades podem mudar antes de uma aposta ser feita.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Como a Probabilidade Implícita se Encaixa no MatchSignal",
      paragraphs: [
        "O MatchSignal usa a precificação das casas de apostas como parte de sua estrutura de análise esportiva. Os preços de mercado podem ser traduzidos em termos de probabilidade para que diferentes casas de apostas e observações de mercado possam ser comparadas em uma escala comum.",
        "Nos cartões do MatchSignal, Média de Mercado resume a precificação de mercado amostrada, enquanto Probabilidade Justa é uma estimativa analítica em vez de uma porcentagem bruta da casa de apostas. Vantagem de Valor destina-se a descrever a diferença entre o preço de mercado disponível e a avaliação baseada em probabilidade do MatchSignal. Casas Amostradas indica quantas fontes de casas de apostas contribuíram para a amostra de mercado relevante.",
        "Esses campos têm o objetivo de tornar a precificação de mercado e o contexto do modelo mais fáceis de inspecionar. Eles não são garantias de um resultado esportivo ou lucro. Premissas do modelo, qualidade dos dados de origem, movimento de mercado e variância esportiva comum podem afetar o resultado."
      ],
      callout: {
        title: "Use a probabilidade como uma estrutura",
        body:
          "A probabilidade ajuda a estruturar a incerteza. Ela não elimina a incerteza, e nenhum modelo pode garantir o resultado de um evento esportivo.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Uma Lista de Verificação Prática de Probabilidade Implícita",
      paragraphs: [
        "Ao avaliar o preço de uma aposta, use a probabilidade implícita como um ponto de partida em vez de uma resposta final. A sequência a seguir ajuda a manter o preço, a estrutura de mercado e a estimativa de probabilidade separados."
      ],
      bullets: [
        "Identifique o mercado e a seleção exatos.",
        "Converta as probabilidades decimais disponíveis em probabilidade implícita.",
        "Verifique se o mercado contém margem da casa de apostas ou overround.",
        "Compare preços equivalentes entre casas de apostas, quando disponíveis.",
        "Se estiver usando um modelo de probabilidade, compare sua estimativa com a probabilidade de equilíbrio do preço.",
        "Considere a incerteza do modelo em vez de tratar pequenas diferenças numéricas como vantagens certas.",
        "Reverifique as odds atuais antes de agir, pois os preços de mercado podem mudar.",
        "Use o dimensionamento disciplinado de apostas e nunca trate a análise de probabilidade como uma garantia."
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
    "As apostas envolvem risco financeiro. A probabilidade implícita é uma interpretação matemática de um preço, não uma garantia de resultado ou lucro. Aposte apenas quantias que possa perder, evite correr atrás de prejuízos e mantenha as decisões de apostas dentro de limites predeterminados.",
};

export default guide;
