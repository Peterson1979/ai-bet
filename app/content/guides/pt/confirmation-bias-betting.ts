import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "confirmation-bias-betting",
  locale: "pt",
  title: "Vies de Confirmacao e Decisoes de Apostas",
  category: "betting-psychology",
  status: "published",
  description:
    "Aprenda como o vies de confirmacao afeta as decisoes de apostas esportivas, por que os apostadores podem procurar evidencias que apoiem uma opiniao existente, como modelos e narrativas podem reforcar o vies, e como a analise estruturada pode reduzir sua influencia.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "O vies de confirmacao e a tendencia de procurar, notar, interpretar e lembrar informacoes de maneiras que apoiam uma crenca existente. Nas apostas esportivas, ele pode aparecer antes mesmo de um preco ser considerado: um apostador forma uma opiniao sobre um time ou jogador, e entao comeca a coletar razoes pelas quais essa opiniao deve estar correta. Evidencias contraditorias recebem menos atencao, enquanto estatisticas de apoio, noticias e resultados de modelos parecem mais persuasivos. Como as decisoes de apostas combinam incerteza, emocao, informacao incompleta e risco financeiro, o vies de confirmacao pode transformar silenciosamente a analise em justificativa. Um processo melhor tenta desprovar a tese original com tanto afinco quanto tenta apoia-la.",
  keyTakeaways: [
    "O vies de confirmacao faz com que informacoes de apoio parecam mais importantes do que evidencias contraditorias.",
    "O vies pode afetar a pesquisa, a interpretacao de modelos, a leitura de mercado e a avaliacao pos-resultado.",
    "Procurar apenas por razoes pelas quais uma aposta deve vencer pode criar falsa confianca.",
    "Um modelo que concorda com uma opiniao existente pode receber peso excessivo, enquanto um modelo discordante pode ser descartado muito rapidamente.",
    "Os precos de mercado ja podem refletir a informacao positiva que atraiu o apostador.",
    "Procurar ativamente por evidencias desconfirmatorias pode melhorar a qualidade da decisao.",
    "Regras pre-aposta escritas e intervalos de probabilidade podem tornar o vies de confirmacao mais facil de detectar.",
  ],
  sections: [
    {
      id: "definition",
      heading: "O Que o Vies de Confirmacao Significa",
      paragraphs: [
        "O vies de confirmacao ocorre quando as pessoas dao atencao preferencial a informacoes que apoiam o que elas ja acreditam.",
        "O efeito pode ocorrer em vários estágios. Um apostador pode escolher quais estatísticas pesquisar, quais analistas seguir, em qual saída de modelo confiar e de quais notícias se lembrar com base no fato de apoiarem ou não a tese original.",
        "Isso não exige desonestidade deliberada. A pessoa pode genuinamente sentir que está conduzindo uma pesquisa equilibrada enquanto filtra evidências inconscientemente.",
        "Em um ambiente probabilístico, isso é especialmente perigoso porque quase todo evento esportivo contém sinais positivos e negativos. Se apenas um lado for coletado, a confiança pode aumentar sem que a probabilidade subjacente melhore."
      ],
      callout: {
        title: "A análise pode se tornar justificativa",
        body:
          "Se o objetivo da pesquisa mudar de testar uma ideia para provar que ela está certa, o viés de confirmação já está influenciando o processo.",
        tone: "warning",
      },
    },
    {
      id: "how-it-starts",
      heading: "Como o viés de confirmação começa antes da aposta",
      paragraphs: [
        "O viés geralmente começa com uma opinião inicial: um time parece forte, um jogador favorito está em boa fase ou uma cotação de abertura parece atrativa.",
        "Assim que essa primeira impressão se forma, informações posteriores são interpretadas em relação a ela. Estatísticas de ataque fortes apoiam a tese. A ausência de um defensor é descrita como administrável. Um confronto desfavorável é tratado como uma exceção.",
        "O apostador pode então procurar especificamente por pré-jogos, estatísticas ou postagens em redes sociais que reforcem a visão original. A pesquisa torna-se assimétrica.",
        "Uma abordagem mais robusta atrasa o compromisso. Em vez de perguntar 'Por que este time vai vencer?', o apostador pergunta 'Quais evidências apoiam cada resultado plausível?'"
      ],
    },
    {
      id: "selective-research",
      heading: "Pesquisa seletiva",
      paragraphs: [
        "O próprio comportamento de busca pode criar viés. Se um apostador inserir uma consulta como 'Por que o Time A vai vencer o Time B', os resultados já estarão enquadrados em torno da confirmação.",
        "Uma pesquisa mais neutra examinaria ambos os lados: desempenho recente, lesões, estrutura de confrontos, calendário, movimento de mercado e preço.",
        "A pesquisa seletiva é particularmente perigosa quando o apostador já sabe quais estatísticas provavelmente apoiarão o resultado preferido. Um pequeno conjunto de métricas favoráveis pode criar uma história persuasiva, mesmo quando um conjunto de dados mais amplo é misto.",
        "A solução não é coletar mais informações indefinidamente. É definir antecipadamente quais evidências importam e avaliá-las consistentemente para ambos os lados."
      ],
      bullets: [
        "Use perguntas de pesquisa neutras.",
        "Verifique as mesmas categorias de evidência para ambas as equipes ou resultados.",
        "Evite parar a pesquisa imediatamente após encontrar uma estatística favorável.",
        "Registre evidências contraditórias importantes em vez de descartá-las mentalmente.",
      ],
    },
    {
      id: "model-confirmation",
      heading: "Como os modelos podem reforçar o viés de confirmação",
      paragraphs: [
        "Modelos analíticos podem reduzir algumas formas de viés humano, mas também podem se tornar ferramentas para o viés de confirmação.",
        "Um apostador pode confiar fortemente em um modelo quando ele apoia uma opinião existente e criticar o modelo quando ele discorda. Se vários modelos estiverem disponíveis, o apostador pode escolher aquele que produz a resposta preferida.",
        "Isso cria a busca por modelos: o resultado não está sendo usado como evidência independente, mas como uma forma de validar uma crença pré-existente.",
        "A abordagem correta é definir como cada modelo será usado antes de ver o resultado. Seus pontos fortes, fracos, calibração e mercado relevante devem importar mais do que o fato de a previsão concordar com o apostador."
      ],
      callout: {
        title: "Concordância não é validação",
        body:
          "Um modelo não se torna mais confiável simplesmente porque chega à mesma conclusão que você já desejava.",
        tone: "warning",
      },
    },
    {
      id: "ai",
      heading: "A Análise de IA Também Pode Ser Usada de Forma Seletiva",
      paragraphs: [
        "A análise gerada por IA pode parecer persuasiva porque produz explicações fluidas e raciocínio organizado.",
        "Essa qualidade de apresentação pode intensificar o viés de confirmação se o usuário fizer perguntas tendenciosas, como 'Explique por que esta é uma aposta forte', em vez de solicitar evidências equilibradas.",
        "Um sistema de IA também pode refletir limitações em seus dados, comandos, premissas ou no modelo subjacente. Portanto, uma explicação confiante não deve ser tratada como prova.",
        "Um uso melhor da IA é o adversarial: peça o argumento mais forte contra a seleção, as premissas mais incertas e os fatores que invalidariam a tese."
      ],
      bullets: [
        "Peça evidências contra o resultado preferido.",
        "Peça para identificar quais premissas são mais incertas.",
        "Peça quais informações alterariam materialmente a estimativa de probabilidade.",
        "Não trate linguagem refinada como evidência de precisão.",
      ],
    },
    {
      id: "narratives",
      heading: "Por que as Narrativas de Apostas São Poderosas",
      paragraphs: [
        "O esporte naturalmente gera narrativas: jogos de revanche, momento, situações de vitória obrigatória, mudanças de técnico, intensidade de rivalidades e histórias de reviravolta.",
        "Alguns fatores narrativos podem ser relevantes, mas são fáceis de usar em excesso porque são memoráveis e emocionalmente gratificantes.",
        "O viés de confirmação pode fazer com que um apostador escolha a narrativa que se encaixa no resultado preferido, enquanto ignora histórias igualmente plausíveis que apontam para o lado oposto.",
        "Por exemplo, um apostador pode descrever uma equipe como motivada após três derrotas, enquanto outro descreve a mesma equipe como com baixa confiança. Ambas as histórias podem parecer razoáveis. A questão importante é se a narrativa tem valor preditivo mensurável e se o mercado já a reflete."
      ],
      callout: {
        title: "Uma boa história não é automaticamente um bom preço",
        body:
          "As narrativas podem explicar uma opinião sem provar que as probabilidades são favoráveis.",
        tone: "info",
      },
    },
    {
      id: "price",
      heading: "O viés de confirmação pode ocultar a importância do preço",
      paragraphs: [
        "Um apostador que acredita firmemente que um resultado ocorrerá pode parar de se importar com o preço.",
        "Este é um erro grave porque o valor da aposta depende tanto da probabilidade quanto das odds. Uma equipe pode ter muita probabilidade de vencer e ainda assim ser desinteressante se o preço estiver muito baixo.",
        "O viés de confirmação piora essa situação porque cada fato de apoio aumenta a confiança, enquanto o preço de mercado recebe menos escrutínio.",
        "A sequência correta é estimar a probabilidade, inspecionar a incerteza e, em seguida, comparar essa estimativa com a probabilidade de equilíbrio implícita nas odds disponíveis."
      ],
      callout: {
        title: "Acertar quem será o vencedor não é suficiente",
        body:
          "Uma forte opinião esportiva ainda pode ser uma má decisão de aposta se o preço disponível for pior do que a probabilidade justifica.",
        tone: "warning",
      },
    },
    {
      id: "market-movement",
      heading: "Interpretando o Movimento das Odds Através de uma Lente Enviesada",
      paragraphs: [
        "O viés de confirmação pode afetar a forma como o movimento do mercado é explicado.",
        "Se as odds caírem em uma seleção preferida, o apostador pode interpretar o movimento como prova de que o dinheiro inteligente concorda. Se as odds subirem, o mesmo apostador pode descartar a mudança como manipulação sem sentido da casa de apostas.",
        "A interpretação muda porque a conclusão desejada permanece fixa.",
        "Um processo neutro trataria ambos os movimentos como informações que exigem investigação. A mudança de preço pode refletir notícias, liquidez, atividade de mercado ou gestão de risco, mas a direção por si só não prova a visão original do apostador."
      ],
    },
    {
      id: "social-media",
      heading: "As Redes Sociais Podem Amplificar o Viés de Confirmação",
      paragraphs: [
        "As plataformas sociais tornam fácil encontrar comunidades que compartilham as mesmas opiniões de apostas.",
        "Assim que um apostador interage com determinados times, tipsters ou narrativas de apostas, os sistemas de recomendação podem mostrar mais conteúdo semelhante. Isso pode criar a impressão de que 'todos' veem a mesma oportunidade.",
        "A popularidade não melhora o valor esperado. De fato, informações amplamente discutidas já podem estar refletidas no preço de mercado.",
        "Um apostador disciplinado deve incluir deliberadamente fontes que discordam da visão preferida e deve evitar tratar o consenso social como evidência independente."
      ],
    },
    {
      id: "favorite-team",
      heading: "Viés de Time do Coração e Confirmação",
      paragraphs: [
        "O apego emocional torna o viés de confirmação mais forte. Os torcedores conhecem mais histórias e estatísticas sobre seus times favoritos, mas podem interpretar essas informações de maneira mais positiva.",
        "Boas atuações são lembradas com vivacidade. Atuações ruins são atribuídas a árbitros, lesões, azar ou circunstâncias incomuns.",
        "O mesmo padrão pode ocorrer inversamente com times de que não se gosta. Evidências negativas tornam-se mais memoráveis, enquanto atuações fortes são descartadas.",
        "Se o apego pessoal for forte, uma regra útil é evitar apostar no time ou exigir uma tese contrária explícita antes de agir."
      ],
    },
    {
      id: "post-result",
      heading: "Viés de Confirmação Após o Resultado",
      paragraphs: [
        "O viés não termina quando a partida começa. Após o resultado, os apostadores frequentemente reinterpreter o que aconteceu para proteger a crença original.",
        "Se a aposta vencer, o resultado é lembrado como prova de que a análise estava correta. Se perder, a perda pode ser atribuída inteiramente ao azar, à arbitragem ou a um evento incomum.",
        "Às vezes, essas explicações são válidas. Mas se cada vitória comprova habilidade e cada derrota é descartada como variância, o processo nunca poderá ser avaliado honestamente.",
        "Uma revisão melhor questiona se a probabilidade original, o preço e as premissas eram razoáveis antes do resultado, e se um raciocínio semelhante tem bom desempenho em uma amostra maior."
      ],
      callout: {
        title: "Deve ser permitido que sua tese falhe",
        body:
          "Se nenhum resultado ou evidência puder militar contra a estratégia, o processo de avaliação não é falsificável.",
        tone: "warning",
      },
    },
    {
      id: "disconfirming-evidence",
      heading: "Busque Ativamente por Evidências Desconfirmatórias",
      paragraphs: [
        "Uma das defesas mais fortes contra o viés de confirmação é procurar deliberadamente por razões pelas quais a aposta pode estar errada.",
        "Antes de fazer uma aposta, anote o argumento mais forte para o lado oposto, as premissas principais que podem falhar e a informação que tornaria o preço atual desinteressante.",
        "Isso não significa apostar automaticamente contra a visão original. O objetivo é testar se a tese sobrevive a uma oposição séria.",
        "Se a aposta ainda parecer atraente após considerar os argumentos contrários mais fortes, a conclusão é mais robusta."
      ],
      bullets: [
        "Qual é o argumento mais forte contra esta aposta?",
        "Qual premissa é mais incerta?",
        "Que informação faria com que eu cancelasse a aposta?",
        "Qual estatística ou narrativa estou ignorando no momento?",
        "Eu interpretaria a mesma evidência de forma diferente se preferisse a equipe oposta?",
      ],
    },
    {
      id: "pre-mortem",
      heading: "Use uma análise pré-morte (Pre-Mortem)",
      paragraphs: [
        "Uma análise pré-morte é uma técnica simples: imagine que a aposta já perdeu e pergunte qual seria a explicação mais plausível.",
        "Talvez o favorito tenha tido dificuldades contra um bloco baixo, o arremessador titular tenha tido uma carga de trabalho limitada, o relatório de lesões estivesse incompleto ou o preço de mercado já tivesse absorvido a vantagem percebida.",
        "O exercício força a atenção para os modos de falha antes que o dinheiro seja arriscado, em vez de depois que o resultado os torne óbvios.",
        "Uma pré-morte é especialmente útil quando o apostador se sente incomum e excessivamente confiante."
      ],
      callout: {
        title: "Imagine estar errado antes de apostar",
        body:
          "Se você conseguir identificar cenários de falha realistas com antecedência, a estimativa de probabilidade poderá se tornar mais equilibrada.",
        tone: "example",
      },
    },
    {
      id: "probability-ranges",
      heading: "Use intervalos de probabilidade em vez de falsa precisão",
      paragraphs: [
        "O viés de confirmação frequentemente empurra as estimativas de probabilidade para a extremidade mais favorável de um intervalo plausível.",
        "Um apostador pode descrever uma seleção como 60% quando as evidências realisticamente sustentam algo entre 52% e 60%. Escolher o limite superior faz com que o cálculo de valor pareça mais forte.",
        "Usar um intervalo pode revelar quão sensível é a decisão. Se a aposta tem valor esperado positivo apenas na estimativa mais otimista, a vantagem pode ser frágil.",
        "Essa abordagem também torna a incerteza visível em vez de escondê-la atrás de um único número preciso."
      ],
    },
    {
      id: "checklist-process",
      heading: "Crie uma lista de verificação de decisão fixa",
      paragraphs: [
        "Uma lista de verificação padronizada reduz a liberdade de alterar o processo de análise dependendo de qual resultado o apostador deseja.",
        "As mesmas categorias devem ser revisadas para cada aposta: definição de mercado, preço atual, probabilidade implícita, lesões, calendário, dados de desempenho relevantes, estimativa do modelo, incerteza, movimento de mercado e tamanho da aposta.",
        "Uma lista de verificação fixa não elimina o viés, mas torna a análise seletiva mais difícil porque o apostador deve enfrentar as mesmas perguntas todas as vezes.",
        "Registros escritos também tornam mais fácil descobrir pontos cegos recorrentes mais tarde."
      ],
      bullets: [
        "Defina o mercado com precisão.",
        "Registre as odds atuais e a probabilidade de equilíbrio (break-even).",
        "Escreva a estimativa de probabilidade antes de se comprometer emocionalmente.",
        "Liste as evidências que apoiam a seleção.",
        "Liste evidências contra a seleção.",
        "Verifique se novas informações já estão precificadas (priced in).",
        "Teste o EV sob uma estimativa de probabilidade mais conservadora.",
        "Mantenha a aposta dentro da regra normal de gestão de banca.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Como o Viés de Confirmação Se Aplica ao MatchSignal",
      paragraphs: [
        "O MatchSignal apresenta campos estruturados, incluindo Melhores Odds (Best Odds), Média de Mercado (Market Avg), Probabilidade Justa (Fair Probability), Margem de Valor (Value Edge), Casas Amostradas (Books Sampled) e Nível de Risco (Risk Tier).",
        "Esses campos podem tornar a análise mais sistemática, mas ainda podem ser interpretados seletivamente. Um usuário pode se concentrar em uma Margem de Valor positiva quando ela apoia um time favorito e ignorar sinais semelhantes em times de que não gosta.",
        "Um rótulo de Baixo Risco também pode se tornar um dispositivo de confirmação se o usuário o tratar como prova em vez de um sinal analítico comparativo.",
        "A melhor abordagem é avaliar os cartões do MatchSignal usando as mesmas regras, independentemente de a previsão concordar ou não com a opinião anterior do usuário. A saída do modelo deve ser testada, e não usada como validação automática."
      ],
      callout: {
        title: "Use o mesmo padrão quando o modelo discordar",
        body:
          "Uma ferramenta estruturada é mais útil quando sua saída é avaliada consistentemente, em vez de ser aceita apenas quando confirma uma crença existente.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Uma Lista de Verificação de Viés de Confirmação",
      paragraphs: [
        "Use esta lista de verificação antes de finalizar uma decisão de aposta."
      ],
      bullets: [
        "Eu formei uma opinião forte antes de revisar todas as evidências?",
        "Eu procurei especificamente por motivos pelos quais posso estar errado?",
        "Estou tratando uma estatística favorável como mais importante do que evidências mais amplas?",
        "Eu confiaria igualmente neste modelo se ele discordasse de mim?",
        "Estou ignorando um movimento de preço porque ele conflita com a minha opinião?",
        "O mercado já precificou a informação de que eu gosto?",
        "Eu faria a mesma interpretação se os nomes das equipes estivessem ocultos?",
        "A aposta ainda é atraente sob uma estimativa de probabilidade mais conservadora?",
        "Eu escrevi o contra-argumento mais forte?",
        "O valor apostado está dentro do limite normal predefinido?",
      ],
    },
  ],
  relatedGuides: [
    "cognitive-biases-sports-betting",
    "winning-streaks-misleading",
    "why-chasing-losses-is-dangerous",
    "variance-sports-betting",
    "expected-value-sports-betting",
    "ai-sports-betting-predictions",
  ],
  responsibleGamblingNote:
    "O viés de confirmação pode aumentar a confiança e incentivar apostas maiores ou mais frequentes, mesmo quando a evidência é fraca. Use limites predefinidos de gastos, valores de aposta, perdas e tempo, mantenha os fundos de apostas separados do dinheiro essencial e pare se as apostas estiverem causando danos financeiros ou emocionais. Nenhum modelo, narrativa ou sinal analítico pode garantir um resultado.",
};

export default guide;
