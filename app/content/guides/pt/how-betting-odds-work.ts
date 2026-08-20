import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "how-betting-odds-work",
  locale: "pt",
  title: "Como as Odds de Apostas Realmente Funcionam",
  category: "odds-probability",
  status: "published",
  description:
    "Aprenda o que as odds de apostas representam, como elas se relacionam com a probabilidade, por que os preços das casas de apostas incluem uma margem e como comparar odds sem confundir preço com previsão.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "As odds de apostas são preços. Elas indicam quanto uma aposta bem-sucedida pode retornar, mas também codificam a visão do mercado sobre a probabilidade de um resultado. Compreender ambos os lados dessa relação é essencial: as odds não são uma garantia, e o menor preço não é automaticamente a melhor aposta. Este guia explica as odds decimais, a probabilidade implícita, a margem da casa de apostas, a movimentação do mercado e por que a comparação de preços é importante.",
  keyTakeaways: [
    "As odds decimais mostram o retorno total por unidade apostada, incluindo a aposta original.",
    "A probabilidade implícita é calculada a partir das odds decimais como 1 dividido pelas odds.",
    "Os preços das casas de apostas geralmente incluem uma margem, de modo que as probabilidades implícitas em todos os resultados podem somar mais de 100%.",
    "Um preço menor significa uma probabilidade implícita maior, e não um resultado certo.",
    "A mesma seleção pode ter odds diferentes em diferentes casas de apostas, portanto a comparação de preços afeta diretamente o retorno potencial.",
    "As odds podem mudar à medida que novas informações, a atividade do mercado e a gestão de risco da casa de apostas alteram o preço.",
  ],
  sections: [
    {
      id: "odds-are-prices",
      heading: "As Odds de Apostas São Preços, Não Previsões",
      paragraphs: [
        "A maneira mais simples de entender as odds de apostas é tratá-las como o preço de um resultado possível. Em uma partida de futebol, uma casa de apostas pode cotar um preço para a equipe da casa, outro para o empate e outro para a equipe visitante. Esses preços determinam o retorno caso o resultado selecionado vença.",
        "As odds também contêm informações de probabilidade. Um preço decimal menor corresponde a uma probabilidade implícita maior, enquanto um preço maior corresponde a uma probabilidade implícita menor. Isso não significa que a casa de apostas sabe o que vai acontecer. Significa que o mercado está atribuindo preços diferentes a resultados incertos.",
        "Esta distinção é importante porque uma previsão e um preço respondem a perguntas diferentes. Uma previsão pergunta qual resultado é mais provável. Um preço pergunta qual retorno está sendo oferecido por assumir esse risco. Uma equipe pode ser a vencedora mais provável e ainda assim ser pouco atraente a um preço suficientemente baixo."
      ],
      callout: {
        title: "Ideia central",
        body:
          "Um favorito forte ainda pode perder. As odds expressam um preço de mercado para a incerteza; elas não removem a incerteza.",
        tone: "info",
      },
    },
    {
      id: "decimal-odds",
      heading: "Como funcionam as odds decimais",
      paragraphs: [
        "O MatchSignal utiliza odds decimais porque elas tornam os retornos e a conversão de probabilidade diretos. As odds decimais mostram o valor total retornado para cada unidade apostada quando a aposta é vencedora. O retorno total inclui a aposta original.",
        "Por exemplo, a odds decimais de 2.00, uma aposta de 10 unidades retorna 20 unidades em caso de sucesso: 10 unidades de lucro mais a aposta original de 10 unidades. A odds de 1.50, a mesma aposta de 10 unidades retorna 15 unidades no total. A odds de 3.00, retorna 30 unidades.",
        "A relação básica é simples: o retorno total é igual à aposta multiplicada pelas odds decimais. O lucro é igual ao retorno total menos a aposta original."
      ],
      bullets: [
        "10 unidades a 1.50 → 15 unidades de retorno total, 5 unidades de lucro.",
        "10 unidades a 2.00 → 20 unidades de retorno total, 10 unidades de lucro.",
        "10 unidades a 3.00 → 30 unidades de retorno total, 20 unidades de lucro.",
      ],
      callout: {
        title: "Exemplo",
        body:
          "Odds mais altas aumentam o retorno potencial, mas normalmente correspondem a resultados que o mercado considera menos prováveis.",
        tone: "example",
      },
    },
    {
      id: "implied-probability",
      heading: "Convertendo Odds em Probabilidade Implícita",
      paragraphs: [
        "As odds decimais podem ser convertidas em probabilidade implícita com uma fórmula simples: probabilidade implícita = 1 ÷ odds decimais. Multiplique o resultado por 100 para expressá-lo como uma porcentagem.",
        "Odds de 2.00 implicam 50%. Odds de 1.50 implicam cerca de 66,7%. Odds de 4.00 implicam 25%. Isso fornece uma escala de probabilidade comum para comparar preços que inicialmente podem parecer muito diferentes.",
        "No entanto, a probabilidade implícita da casa de apostas não é a mesma coisa que uma probabilidade objetiva precisa. O preço pode incluir uma margem da casa de apostas, reagir à demanda do mercado ou mudar à medida que novas informações ficam disponíveis. É melhor compreendida como a probabilidade embutida no preço cotado."
      ],
      bullets: [
        "1.50 → 1 ÷ 1.50 = 66,7%",
        "2.00 → 1 ÷ 2.00 = 50,0%",
        "2.50 → 1 ÷ 2.50 = 40,0%",
        "4.00 → 1 ÷ 4.00 = 25,0%",
      ],
      callout: {
        title: "Não interprete 66,7% como certeza",
        body:
          "Uma probabilidade implícita é a tradução de um preço. Os resultados esportivos no mundo real continuam incertos, mesmo quando o mercado atribui uma alta probabilidade.",
        tone: "warning",
      },
    },
    {
      id: "bookmaker-margin",
      heading: "Por que as Probabilidades Podem Somar Mais de 100%",
      paragraphs: [
        "Se você converter cada resultado em um mercado de casa de apostas em probabilidade implícita e somá-los, o total frequentemente excederá 100%. A quantidade acima de 100% é comumente chamada de margem da casa de apostas ou overround.",
        "Considere um mercado simplificado de dois resultados em que ambos os lados são precificados a 1,91. Cada preço implica cerca de 52,36%. Somados, o total do mercado é de cerca de 104,72%. A diferença entre 104,72% e 100% representa a margem da casa (overround) nesse mercado simplificado.",
        "A margem significa que as probabilidades implícitas brutas não são automaticamente probabilidades justas. Os analistas podem estimar uma probabilidade sem margem normalizando as probabilidades em todo o mercado, mas isso continua sendo uma estimativa baseada nos preços disponíveis e não uma garantia da chance real de cada resultado."
      ],
      callout: {
        title: "Por que isso importa",
        body:
          "Dois mercados podem expressar expectativas semelhantes oferecendo margens diferentes. Um mercado de menor margem geralmente oferece aos apostadores preços mais competitivos, mantidas as demais condições iguais.",
        tone: "info",
      },
    },
    {
      id: "favorite-underdog",
      heading: "Favoritos, Azarões e o que o Preço realmente diz",
      paragraphs: [
        "Um favorito é simplesmente o resultado com o menor preço no mercado relevante. Um azarão tem um preço maior. Esses rótulos descrevem expectativas de mercado relativas, não qualidade garantida ou resultados eventuais.",
        "Suponha que a Equipe A seja oferecida a 1,40 e a Equipe B a 7,00 em um mercado que também inclui o empate. A Equipe A é a favorita porque seu preço implica uma probabilidade muito maior do que o preço da Equipe B. No entanto, saber se qualquer um dos preços é atraente depende de como as odds cotadas se comparam a uma estimativa de probabilidade razoável.",
        "É aqui que a análise de valor difere da seleção de vencedores. Escolher a equipe com maior probabilidade de vencer não é necessariamente o mesmo que encontrar o preço mais favorável. Uma chance de 75% oferecida a odds que exigem uma taxa de ponto de equilíbrio (break-even) de 80% não representaria valor esperado positivo sob essa estimativa de probabilidade."
      ],
    },
    {
      id: "compare-odds",
      heading: "Por que comparar Odds é Importante",
      paragraphs: [
        "As casas de apostas nem sempre oferecem preços idênticos. Uma operadora pode cotar 1,85 enquanto outra cota 1,95 para a mesma seleção e mercado. O evento subjacente não mudou, mas seu retorno potencial sim.",
        "Para uma aposta de 100 unidades, 1,85 retorna 185 unidades em caso de sucesso, enquanto 1,95 retorna 195 unidades. Ao longo de um grande número de apostas, aceitar repetidamente preços piores pode reduzir materialmente os retornos, mesmo quando as próprias seleções são idênticas.",
        "A comparação de preços é, portanto, um dos poucos aspectos das apostas que não exige prever a partida com mais precisão. Se o mercado, a seleção, as regras de liquidação e o timing forem genuinamente comparáveis, o maior preço disponível oferece um retorno potencial melhor para a mesma aposta."
      ],
      callout: {
        title: "Compare o comparável",
        body:
          "Verifique se a definição de mercado, a linha, as regras de liquidação e o evento são os mesmos antes de tratar duas cotações oferecidas como diretamente comparáveis.",
        tone: "warning",
      },
    },
    {
      id: "why-odds-move",
      heading: "Por que as cotações se movimentam antes de uma partida",
      paragraphs: [
        "As cotações não são avaliações fixas. Elas podem mudar desde o momento em que um mercado é aberto até o encerramento das apostas. Novas informações sobre as equipes, lesões, escalações confirmadas, clima, alterações de calendário, atividade de mercado e a descoberta de preços mais ampla podem contribuir para a movimentação.",
        "As casas de apostas também podem ajustar os preços como parte da gestão de risco ou em resposta à movimentação em outros lugares do mercado. Como resultado, uma movimentação nas cotações nem sempre revela uma causa única e simples. Um preço em queda pode refletir informações novas relevantes, pressão de mercado ou uma combinação de fatores.",
        "É por isso que capturas de tela históricas de um preço não devem ser confundidas com a disponibilidade atual. Uma análise útil deve identificar o preço real que está sendo avaliado e, sempre que possível, compará-lo com as alternativas atuais de mercado."
      ],
    },
    {
      id: "value-and-break-even",
      heading: "Cotações, probabilidade de equilíbrio e valor",
      paragraphs: [
        "Cada preço implica uma probabilidade de equilíbrio antes de considerar os detalhes da transação ou a incerteza do modelo. A cotação decimal de 2,00 tem uma taxa de equilíbrio implícita de 50%. A 1,80, é de aproximadamente 55,6%. A 2,50, é de 40%.",
        "Se a sua estimativa de probabilidade for significativamente maior do que a probabilidade implícita no preço oferecido, a aposta pode ter valor esperado positivo de acordo com essa estimativa. Se a sua estimativa for menor, o preço pode ser desfavorável. A qualidade da conclusão depende inteiramente da qualidade e da calibração da estimativa de probabilidade.",
        "Por exemplo, se as cotações de 2,20 impliquem cerca de 45,5% e uma análise estime o resultado em 50%, há uma diferença teórica positiva entre a probabilidade estimada e a probabilidade implícita no mercado. Essa diferença não é uma promessa de lucro. Mesmo uma oportunidade com expectativa positiva identificada corretamente pode perder, e as estimativas dos modelos podem estar erradas."
      ],
      callout: {
        title: "O valor é probabilístico",
        body:
          "O valor esperado positivo descreve uma relação estimada de longo prazo entre probabilidade e preço. Isso não significa que uma aposta individual vá vencer com certeza.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal-context",
      heading: "Como o MatchSignal utiliza as odds",
      paragraphs: [
        "O MatchSignal compara os preços disponíveis das casas de apostas e dados de mercado, combinando essas informações com o contexto da partida gerado por inteligência artificial. Em um cartão do MatchSignal, Melhores Odds refere-se ao preço de parceiro mais forte identificado para a seleção exibida, enquanto Média de Mercado resume os preços de mercado amostrados utilizados na comparação.",
        "A Probabilidade Justa é uma estimativa analítica e não uma cotação de casa de apostas. Margem de Valor é usada para descrever a diferença entre o preço de mercado oferecido e a avaliação baseada em probabilidade do MatchSignal. Casas Amostradas indica quantas fontes de casas de apostas contribuíram para a amostra de mercado relevante.",
        "Estes campos foram desenhados para tornar o contexto de preços mais fácil de inspecionar. Eles não devem ser tratados como garantias, conselhos financeiros ou certeza sobre um resultado esportivo. Pressupostos do modelo, alterações de mercado, qualidade dos dados e a variância esportiva comum podem afetar o resultado."
      ],
    },
    {
      id: "practical-checklist",
      heading: "Uma Lista de Verificação Prática para Ler Qualquer Mercado de Apostas",
      paragraphs: [
        "Quando você abre um mercado de apostas, separe a análise em preço, probabilidade e incerteza. Fazer isso evita vários erros comuns, como assumir que o favorito deve vencer ou tratar um pagamento potencial alto como evidência de que uma aposta é atraente."
      ],
      bullets: [
        "Identifique o mercado e a seleção exatos.",
        "Leia as odds decimais como um preço e calcule a probabilidade implícita.",
        "Verifique se o mercado contém margem da casa de apostas.",
        "Compare a mesma seleção em várias casas de apostas esportivas, quando disponível.",
        "Separe sua estimativa de probabilidade da probabilidade cotada pela casa de apostas.",
        "Não trate uma movimentação de odds como prova de que um lado vencerá.",
        "Considere a incerteza, a variância e o tamanho da stake antes de tomar qualquer decisão."
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
    "As apostas envolvem risco financeiro e os resultados são incertos. As probabilidades e as estimativas de probabilidade não podem garantir um resultado. Use valores que possa perder, evite tentar recuperar perdas e trate a análise de apostas como informação, e não como uma promessa de lucro.",
};

export default guide;
