import { Exercise } from "../types";

export const EXERCISES: Exercise[] = [
  // ORDEM
  {
    id: "ord-1",
    category: "order",
    difficulty: "easy",
    story: "A formiguinha Mimi quer organizar as sementes que encontrou no jardim. Ela achou sementes com os números 12, 5 e 8.",
    question: "Como os números ficam na ordem CRESCENTE (do menor para o maior)?",
    options: ["5, 8, 12", "12, 8, 5", "8, 5, 12"],
    correctOption: "5, 8, 12",
    type: "multipleChoice",
    didacticExplanation: "Ordem crescente é como subir uma escadinha: a gente começa do menor e vai subindo até o maior!",
    curiosity: "Você sabia que as formigas são super organizadas e seguem filas direitinho?",
    didacticStory: "Mimi achou uma frutinha pequena, depois uma média e uma grandona. Ela colocou uma atrás da outra e viu que estava subindo como uma escada!",
    narrativePaths: [
      {
        choice: "Ajudar a Mimi agora",
        storySegment: "Mimi fica muito feliz com sua ajuda rápida! Ela encontrou sementes de maçã.",
      },
      {
        choice: "Falar com o grilo primeiro",
        storySegment: "O grilo disse que Mimi é muito organizada. Vamos ajudá-la com as sementes que ela já tem!",
      }
    ]
  },
  {
    id: "ord-2",
    category: "order",
    difficulty: "medium",
    story: "O astronauta Beto está pousando seu foguete. Ele precisa seguir a contagem DECRESCENTE (do maior para o menor) para não bater.",
    question: "Qual sequência está correta?",
    options: ["50, 40, 30, 20", "20, 30, 40, 50", "30, 50, 20, 40"],
    correctOption: "50, 40, 30, 20",
    type: "multipleChoice"
  },
  {
    id: "ord-3",
    category: "order",
    difficulty: "hard",
    story: "A biblioteca da escola recebeu livros com os códigos: 145, 120, 160, 110.",
    question: "Qual é a ordem CRESCENTE correta?",
    options: ["110, 120, 145, 160", "160, 145, 120, 110", "110, 145, 120, 160"],
    correctOption: "110, 120, 145, 160",
    type: "multipleChoice"
  },
  {
    id: "ord-4",
    category: "order",
    difficulty: "easy",
    story: "Kiko tem 3 carrinhos. O azul correu 7 metros, o vermelho 3 metros e o verde 9 metros.",
    question: "Qual a ordem DECRESCENTE das distâncias?",
    options: ["9, 7, 3", "3, 7, 9", "7, 9, 3"],
    correctOption: "9, 7, 3",
    type: "multipleChoice"
  },
  {
    id: "ord-5",
    category: "order",
    difficulty: "medium",
    story: "Maria subiu os degraus 15, 25 e 10 do castelo.",
    question: "Qual a ordem CRESCENTE dos degraus?",
    options: ["10, 15, 25", "25, 15, 10", "15, 10, 25"],
    correctOption: "10, 15, 25",
    type: "multipleChoice"
  },
  {
    id: "ord-6",
    category: "order",
    difficulty: "medium",
    story: "Dona Benta organiza geleias por peso: 250g, 100g, 500g e 300g.",
    question: "Qual o peso do menor para o maior?",
    options: ["100, 250, 300, 500", "500, 300, 250, 100", "100, 300, 250, 500"],
    correctOption: "100, 250, 300, 500",
    type: "multipleChoice"
  },
  {
    id: "ord-7",
    category: "order",
    difficulty: "easy",
    story: "Os patinhos da lagoa estão em fila: Patinho 1, Patinho 3 e Patinho 2.",
    question: "Como ficam na ordem DECRESCENTE?",
    options: ["3, 2, 1", "1, 2, 3", "2, 1, 3"],
    correctOption: "3, 2, 1",
    type: "multipleChoice"
  },
  {
    id: "ord-8",
    category: "order",
    difficulty: "hard",
    story: "Os tempos na corrida foram: 88s, 92s, 75s e 81s.",
    question: "Qual a ordem do mais rápido (menor tempo) para o mais lento?",
    options: ["75, 81, 88, 92", "92, 88, 81, 75", "110, 120, 130, 140"],
    correctOption: "75, 81, 88, 92",
    type: "multipleChoice"
  },
  {
    id: "ord-9",
    category: "order",
    difficulty: "medium",
    story: "As bonecas medem: 15cm, 22cm, 10cm e 18cm.",
    question: "Qual a ordem DECRESCENTE?",
    options: ["22, 18, 15, 10", "10, 15, 18, 22", "22, 15, 18, 10"],
    correctOption: "22, 18, 15, 10",
    type: "multipleChoice"
  },
  {
    id: "ord-10",
    category: "order",
    difficulty: "hard",
    story: "Os prédios têm 12, 15, 8 e 20 andares.",
    question: "Organize do menor para o maior.",
    options: ["8, 12, 15, 20", "20, 15, 12, 8", "12, 15, 8, 20"],
    correctOption: "8, 12, 15, 20",
    type: "multipleChoice"
  },
  // ARREDONDAMENTO
  {
    id: "arr-1",
    category: "rounding",
    difficulty: "easy",
    story: "Uma maçã custa 8 reais.",
    question: "8 está mais perto de 0 ou de 10?",
    options: ["10", "0", "5"],
    correctOption: "10",
    type: "multipleChoice",
    didacticExplanation: "Arredondar é como levar um amiguinho para a casa mais perto dele. Se o número está quase chegando no 10, a gente diz que ele já é quase 10!",
    curiosity: "No mercado, as pessoas arredondam os preços o tempo todo para não carregar muitas moedinhas!",
    didacticStory: "Beto tinha 8 figurinhas. Ele pensou: 'Puxa, falta só um pouquinho para eu ter 10!'. É como se ele estivesse quase no final da linha.",
  },
  {
    id: "arr-2",
    category: "rounding",
    difficulty: "medium",
    story: "Há 23 balões azuis na festa.",
    question: "Arredondando 23 para a dezena mais próxima, dá 30?",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Falso",
    type: "trueFalse"
  },
  {
    id: "arr-3",
    category: "rounding",
    difficulty: "easy",
    story: "O número 12 está no termômetro.",
    question: "Arredondando 12 para a dezena próxima, dá 10?",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  {
    id: "arr-4",
    category: "rounding",
    difficulty: "hard",
    story: "Maria contou 87 estrelas.",
    question: "O número 87 arredondado para a dezena mais próxima é 90?",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  {
    id: "arr-5",
    category: "rounding",
    difficulty: "medium",
    story: "Um pacote de pipoca custa 46 centavos.",
    question: "46 arredondado para a dezena mais próxima é 50?",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  {
    id: "arr-6",
    category: "rounding",
    difficulty: "hard",
    story: "A planta mede 114 centímetros.",
    question: "114 arredondado para a dezena mais próxima é 110?",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  {
    id: "arr-7",
    category: "rounding",
    difficulty: "medium",
    story: "Um brinquedo custa 34 reais.",
    question: "Qual a dezena mais próxima de 34?",
    options: ["30", "40", "35"],
    correctOption: "30",
    type: "multipleChoice"
  },
  {
    id: "arr-8",
    category: "rounding",
    difficulty: "easy",
    story: "Faltam 58 minutos para o lanche.",
    question: "58 está mais perto de 60 do que de 50?",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  {
    id: "arr-9",
    category: "rounding",
    difficulty: "hard",
    story: "Tem 155 vacas na fazenda.",
    question: "155 arredondado para a dezena próxima é 160?",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  {
    id: "arr-10",
    category: "rounding",
    difficulty: "medium",
    story: "A distância é 76 km.",
    question: "Qual a dezena mais próxima de 76?",
    options: ["80", "70", "75"],
    correctOption: "80",
    type: "multipleChoice"
  },
  // ARITMÉTICA
  {
    id: "ari-1",
    category: "arithmetic",
    difficulty: "easy",
    story: "João tinha 15 figurinhas e ganhou 7.",
    question: "Com quantas ele ficou?",
    options: ["20", "22", "25"],
    correctOption: "22",
    type: "multipleChoice",
    didacticExplanation: "Somar é como juntar todos os seus brinquedos em uma cesta só para ver o tantão que você tem!",
    curiosity: "Você sabia que até os pássaros sabem contar quando têm muitos ovinhos no ninho?",
    didacticStory: "João tinha um saquinho com 15 doces. Ganhou mais 7 da vovó. Ele despejou tudo na mesa e viu que agora a pilha de doces ficou bem maior!",
    narrativePaths: [
      {
        choice: "Guardar no álbum",
        storySegment: "João decide guardar as figurinhas no álbum. Maria Eduarda ajuda a contar.",
      },
      {
        choice: "Trocar com amigos",
        storySegment: "Antes de trocar, João precisa saber o total que ele tem agora!",
      }
    ]
  },
  {
    id: "ari-2",
    category: "arithmetic",
    difficulty: "medium",
    story: "A vovó fez 30 brigadeiros e comeram 12.",
    question: "Quantos sobraram?",
    options: ["18", "20", "22"],
    correctOption: "18",
    type: "multipleChoice"
  },
  {
    id: "ari-3",
    category: "arithmetic",
    difficulty: "medium",
    story: "Havia 24 passarinhos e 9 voaram.",
    question: "Quantos ficaram?",
    options: ["15", "13", "17"],
    correctOption: "15",
    type: "multipleChoice"
  },
  {
    id: "ari-4",
    category: "arithmetic",
    difficulty: "hard",
    story: "Comprou 50 balas e guardou 35.",
    question: "Quantas faltam guardar?",
    options: ["15", "25", "10"],
    correctOption: "15",
    type: "multipleChoice"
  },
  {
    id: "ari-5",
    category: "arithmetic",
    difficulty: "easy",
    story: "Tinha 8 flores e plantou 6.",
    question: "Quantas tem agora?",
    options: ["14", "12", "16"],
    correctOption: "14",
    type: "multipleChoice"
  },
  {
    id: "ari-6",
    category: "arithmetic",
    difficulty: "medium",
    story: "Tinha 45 reais e gastou 18.",
    question: "Quanto sobrou?",
    options: ["27", "33", "25"],
    correctOption: "27",
    type: "multipleChoice"
  },
  {
    id: "ari-7",
    category: "arithmetic",
    difficulty: "easy",
    story: "Colheu 12 laranjas e 9 limões.",
    question: "Total de frutas?",
    options: ["21", "20", "22"],
    correctOption: "21",
    type: "multipleChoice"
  },
  {
    id: "ari-8",
    category: "arithmetic",
    difficulty: "hard",
    story: "Uma caixa tem 12 ovos. Comprou 3 caixas e usou 10.",
    question: "Quantos sobraram?",
    options: ["26", "36", "12"],
    correctOption: "26",
    type: "multipleChoice"
  },
  {
    id: "ari-9",
    category: "arithmetic",
    difficulty: "medium",
    story: "O álbum tem 100 espaços. Colou 65.",
    question: "Quantas faltam?",
    options: ["35", "45", "30"],
    correctOption: "35",
    type: "multipleChoice"
  },
  {
    id: "ari-10",
    category: "arithmetic",
    difficulty: "hard",
    story: "No ônibus havia 30 pessoas. Desceram 12 e subiram 5.",
    question: "Quantas pessoas ficaram?",
    options: ["23", "18", "25"],
    correctOption: "23",
    type: "multipleChoice"
  },
  // COMPOSIÇÃO
  {
    id: "com-1",
    category: "composition",
    difficulty: "easy",
    story: "Tem 2 dezenas e 5 unidades de blocos.",
    question: "Qual o número?",
    options: ["25", "52", "205"],
    correctOption: "25",
    type: "multipleChoice",
    didacticExplanation: "Números são feitos de pedacinhos! Dezenas são grupos de 10, como se fossem mãos cheias de dedos.",
    curiosity: "Antigamente as pessoas usavam pedrinhas para montar os números!",
    didacticStory: "Maria montou duas torres de 10 pecinhas de Lego e sobraram 5 soltas. Ela viu que juntando tudo, formou o número 25!",
  },
  {
    id: "com-2",
    category: "composition",
    difficulty: "medium",
    story: "O pirata achou 3 centenas, 4 dezenas e 9 unidades.",
    question: "Quantas moedas?",
    options: ["349", "3049", "3409"],
    correctOption: "349",
    type: "multipleChoice"
  },
  {
    id: "com-3",
    category: "composition",
    difficulty: "hard",
    story: "O robô tem 5 centenas, 0 dezenas e 8 unidades.",
    question: "Qual o número?",
    options: ["508", "58", "580"],
    correctOption: "508",
    type: "multipleChoice",
    narrativePaths: [
      {
        choice: "Lugar o robô",
        storySegment: "O robô começa a brilhar! O painel mostra um número importante.",
      },
      {
        choice: "Pintar o robô de azul",
        storySegment: "O robô azul ficou lindo! Agora vamos ver qual o código dele.",
      }
    ]
  },
  {
    id: "com-4",
    category: "composition",
    difficulty: "medium",
    story: "As abelhas têm 7 dezenas e 2 unidades de mel.",
    question: "Quantos potes?",
    options: ["72", "27", "702"],
    correctOption: "72",
    type: "multipleChoice"
  },
  {
    id: "com-5",
    category: "composition",
    difficulty: "easy",
    story: "O trenzinho carrega 1 centena.",
    question: "Quantos são 1 centena?",
    options: ["100", "10", "1000"],
    correctOption: "100",
    type: "multipleChoice"
  },
  {
    id: "com-6",
    category: "composition",
    difficulty: "easy",
    story: "O código é 4 dezenas e 9 unidades.",
    question: "Qual o código?",
    options: ["49", "94", "409"],
    correctOption: "49",
    type: "multipleChoice"
  },
  {
    id: "com-7",
    category: "composition",
    difficulty: "medium",
    story: "A biblioteca tem 8 centenas e 2 dezenas.",
    question: "Quantos livros?",
    options: ["820", "802", "82"],
    correctOption: "820",
    type: "multipleChoice"
  },
  {
    id: "com-8",
    category: "composition",
    difficulty: "hard",
    story: "O número tem 2 centenas, 15 dezenas e 3 unidades.",
    question: "Qual o número total?",
    options: ["353", "253", "2153"],
    correctOption: "353",
    type: "multipleChoice"
  },
  {
    id: "com-9",
    category: "composition",
    difficulty: "medium",
    story: "Maria quer formar o número 607.",
    question: "Como ele é composto?",
    options: ["6 centenas e 7 unidades", "6 dezenas e 7 unidades", "6 centenas e 7 dezenas"],
    correctOption: "6 centenas e 7 unidades",
    type: "multipleChoice"
  },
  {
    id: "com-10",
    category: "composition",
    difficulty: "easy",
    story: "Quanto valem 3 centenas?",
    question: "Qual o valor total?",
    options: ["300", "30", "3000"],
    correctOption: "300",
    type: "multipleChoice"
  },
  // SEQUÊNCIA
  {
    id: "seq-1",
    category: "sequence",
    difficulty: "easy",
    story: "Contando cenouras: 2, 4, 6, 8...",
    question: "Qual o próximo?",
    options: ["10", "9", "12"],
    correctOption: "10",
    type: "multipleChoice",
    didacticExplanation: "Uma sequência é como um trenzinho que segue um ritmo, tipo 'pula um, conta um'!",
    curiosity: "A natureza tem muitas sequências! As pétalas das flores muitas vezes seguem uma ordem mágica.",
    didacticStory: "O coelhinho saltitava de 2 em 2 pedras. Ele passou pela pedra 2, depois pela 4... ele estava seguindo o ritmo da música da floresta!",
  },
  {
    id: "seq-2",
    category: "sequence",
    difficulty: "medium",
    story: "Flores no jardim: 5, 10, 15, 20...",
    question: "Qual vem depois do 20?",
    options: ["25", "21", "30"],
    correctOption: "25",
    type: "multipleChoice"
  },
  {
    id: "seq-3",
    category: "sequence",
    difficulty: "hard",
    story: "Patinhos na fila: 10, 20, 30, 40...",
    question: "Qual o próximo?",
    options: ["50", "60", "45"],
    correctOption: "50",
    type: "multipleChoice",
    narrativePaths: [
      {
        choice: "Dar pão para os patinhos",
        storySegment: "Os patinhos ficam felizes e continuam a nadar na mesma ordem!",
      },
      {
        choice: "Contar os patinhos de longe",
        storySegment: "De longe, a fila parece infinita! Vamos ver o próximo número.",
      }
    ]
  },
  {
    id: "seq-4",
    category: "sequence",
    difficulty: "medium",
    story: "Contando de 3 em 3: 3, 6, 9, 12...",
    question: "Qual o próximo?",
    options: ["15", "14", "18"],
    correctOption: "15",
    type: "multipleChoice"
  },
  {
    id: "seq-5",
    category: "sequence",
    difficulty: "easy",
    story: "Trilha na floresta: 1, 2, 3, 4, __, 6.",
    question: "Qual sumiu?",
    options: ["5", "7", "0"],
    correctOption: "5",
    type: "multipleChoice"
  },
  {
    id: "seq-6",
    category: "sequence",
    difficulty: "medium",
    story: "Os números estão sumindo: 100, 90, 80, __, 60.",
    question: "Qual sumiu?",
    options: ["70", "75", "65"],
    correctOption: "70",
    type: "multipleChoice"
  },
  {
    id: "seq-7",
    category: "sequence",
    difficulty: "easy",
    story: "Passos de 2 em 2: 22, 24, 26...",
    question: "Qual o próximo?",
    options: ["28", "30", "27"],
    correctOption: "28",
    type: "multipleChoice"
  },
  {
    id: "seq-8",
    category: "sequence",
    difficulty: "hard",
    story: "Sequência mágica: 1, 3, 5, 7...",
    question: "Qual o próximo ímpar?",
    options: ["9", "8", "10"],
    correctOption: "9",
    type: "multipleChoice"
  },
  {
    id: "seq-9",
    category: "sequence",
    difficulty: "medium",
    story: "O relógio marca: 15, 30, 45...",
    question: "Qual o próximo de 15 em 15?",
    options: ["60", "50", "70"],
    correctOption: "60",
    type: "multipleChoice"
  },
  {
    id: "seq-10",
    category: "sequence",
    difficulty: "hard",
    story: "Voltando: 40, 30...",
    question: "Qual vem depois do 30 voltando?",
    options: ["20", "10", "50"],
    correctOption: "20",
    type: "multipleChoice"
  },
  // REGULARIDADE
  {
    id: "reg-1",
    category: "regularity",
    difficulty: "easy",
    story: "Colar de contas: Azul, Rosa, Azul, Rosa...",
    question: "Qual a próxima?",
    options: ["Azul", "Rosa", "Verde"],
    correctOption: "Azul",
    type: "multipleChoice",
    didacticExplanation: "Regularidade é um segredo que se repete! É como o dia que sempre vem depois da noite.",
    curiosity: "As zebras têm listras que seguem uma regularidade perfeita para se esconderem!",
    didacticStory: "Lila estava pintando sua parede: uma listra amarela, uma listra verde, uma amarela... Ela percebeu que era como uma dança que não mudava o passo!",
    narrativePaths: [
      {
        choice: "Dar o colar para a mamãe",
        storySegment: "A mamãe vai amar o colar! Vamos terminar de montar o padrão.",
      },
      {
        choice: "Colocar no pescoço",
        storySegment: "O colar ficou lindo em você! Falta só uma peça para o padrão ficar perfeito.",
      }
    ]
  },
  {
    id: "reg-2",
    category: "regularity",
    difficulty: "medium",
    story: "Pães: Doce, Sal, Sal, Doce, Sal, Sal...",
    question: "O que vem agora?",
    options: ["Pão de Sal", "Pão Doce", "Bolo"],
    correctOption: "Pão de Sal",
    type: "multipleChoice"
  },
  {
    id: "reg-3",
    category: "regularity",
    difficulty: "easy",
    story: "Semáforo: Verde, Amarelo, Vermelho, Verde, Amarelo...",
    question: "Qual a próxima cor?",
    options: ["Vermelho", "Azul", "Roxo"],
    correctOption: "Vermelho",
    type: "multipleChoice"
  },
  {
    id: "reg-4",
    category: "regularity",
    difficulty: "medium",
    story: "Cucu, silêncio, silêncio, Cucu, silêncio...",
    question: "O que vem agora?",
    options: ["silêncio", "Cucu", "Sol"],
    correctOption: "silêncio",
    type: "multipleChoice"
  },
  {
    id: "reg-5",
    category: "regularity",
    difficulty: "hard",
    story: "Passos: Direita, Direita, Esquerda, Direita, Direita...",
    question: "Qual o próximo?",
    options: ["Esquerda", "Direita", "Pular"],
    correctOption: "Esquerda",
    type: "multipleChoice"
  },
  {
    id: "reg-6",
    category: "regularity",
    difficulty: "easy",
    story: "No céu: Estrela, Lua, Estrela, Lua...",
    question: "O que vem agora?",
    options: ["Estrela", "Sol", "Nuvem"],
    correctOption: "Estrela",
    type: "multipleChoice"
  },
  {
    id: "reg-7",
    category: "regularity",
    difficulty: "medium",
    story: "Padrão: 2 pulos, 1 palma, 2 pulos...",
    question: "O que vem agora?",
    options: ["1 palma", "2 pulos", "1 pulo"],
    correctOption: "1 palma",
    type: "multipleChoice"
  },
  {
    id: "reg-8",
    category: "regularity",
    difficulty: "medium",
    story: "Cores: Vermelho, Azul, Verde, Vermelho, Azul...",
    question: "Qual a próxima?",
    options: ["Verde", "Amarelo", "Vermelho"],
    correctOption: "Verde",
    type: "multipleChoice"
  },
  {
    id: "reg-9",
    category: "regularity",
    difficulty: "hard",
    story: "Sons: Piu, Crack, Crack, Piu, Crack...",
    question: "Qual o próximo?",
    options: ["Crack", "Piu", "Miau"],
    correctOption: "Crack",
    type: "multipleChoice"
  },
  {
    id: "reg-10",
    category: "regularity",
    difficulty: "hard",
    story: "Formas: Quadrado, Círculo, Triângulo, Quadrado, Círculo...",
    question: "Qual a próxima?",
    options: ["Triângulo", "Quadrado", "Círculo"],
    correctOption: "Triângulo",
    type: "multipleChoice"
  },
  // NOVOS DESAFIOS ESPACIAIS E MATEMÁTICOS
  {
    id: "space-1",
    category: "composition",
    difficulty: "medium",
    story: "No sistema solar, Júpiter tem 79 luas. Como se escreve esse número por extenso?",
    question: "Escreva por extenso:",
    options: ["Setenta e nove", "Sessenta e nove", "Setenta e oito"],
    correctOption: "Setenta e nove",
    type: "multipleChoice",
    didacticExplanation: "Escrever por extenso é dar nome aos bois (ou melhor, aos números)! É como a gente fala.",
    curiosity: "Júpiter é tão grande que caberiam mais de 1000 Terras dentro dele!",
    didacticStory: "Mimi olhou pelo telescópio e contou 79 luas. Ela ficou tão feliz que escreveu no seu diário: 'Hoje vi setenta e nove luas em Júpiter!'"
  },
  {
    id: "space-2",
    category: "composition",
    difficulty: "hard",
    story: "No ano de 1994, um cometa visitou Júpiter. No número 1994, qual o valor do algarismo 4?",
    question: "Valor posicional do 4:",
    options: ["4 unidades", "4 dezenas", "4 centenas"],
    correctOption: "4 unidades",
    type: "multipleChoice",
    didacticExplanation: "O último número de uma fila mora sempre na casinha das unidades simples!",
    curiosity: "Cada número tem um valor diferente dependendo da 'casa' onde ele mora.",
    didacticStory: "O astronauta Beto viu o número 1994 no painel. O 4 estava no final da fila, por isso ele valia apenas 4 unidades."
  },
  {
    id: "space-3",
    category: "order",
    difficulty: "medium",
    story: "Organize as distâncias do texto do sistema solar de forma DECRESCENTE (do maior para o menor): 4500, 150, 79",
    question: "Qual a ordem correta?",
    options: ["4500, 150, 79", "79, 150, 4500", "150, 79, 4500"],
    correctOption: "4500, 150, 79",
    type: "multipleChoice",
    didacticExplanation: "Ordem decrescente é quando começamos do bem grandão e vamos diminuindo até o menorzinho.",
    curiosity: "Netuno está a 4500 milhões de quilômetros do Sol. É muito longe!",
    didacticStory: "O foguete viajou da lua (79), passou pela Terra (150) e foi até Netuno (4500). Para voltar, ele seguiu a ordem decrescente!"
  },
  {
    id: "space-4",
    category: "order",
    difficulty: "easy",
    story: "Se organizarmos 10, 50 e 30 em ordem crescente, qual número fica no meio?",
    question: "Número do meio:",
    options: ["30", "10", "50"],
    correctOption: "30",
    type: "multipleChoice",
    didacticExplanation: "O número do meio é o 'filho do meio': ele é maior que o pequeno, mas menor que o grande!",
    curiosity: "O zero foi inventado para mostrar que uma casinha está vazia!",
    didacticStory: "Três estrelinhas se deram as mãos: a pequena 10, a média 30 e a grande 50. A 30 ficou bem no meio do abraço."
  },
  {
    id: "ant-11",
    category: "order",
    difficulty: "easy",
    story: "A nave está no degrau 200.",
    question: "Qual o ANTECESSOR de 200?",
    options: ["199", "201", "190"],
    correctOption: "199",
    type: "multipleChoice",
    didacticExplanation: "Antecessor é o amiguinho que vem antes na fila!",
    curiosity: "Para achar o antecessor, é só tirar 1 do número!",
    didacticStory: "O robô ia pular no degrau 200, mas antes ele teve que passar pelo 199."
  },
  {
    id: "suc-11",
    category: "order",
    difficulty: "easy",
    story: "A contagem chegou em 89.",
    question: "Qual o SUCESSOR de 89?",
    options: ["90", "88", "100"],
    correctOption: "90",
    type: "multipleChoice",
    didacticExplanation: "Sucessor é o próximo da fila, quem vem depois!",
    curiosity: "O sucessor de 89 é o começo de uma nova dezena: a dezena do 90!",
    didacticStory: "Lila contou 89 estrelas. A próxima estrela que ela contou foi a número 90."
  },
  {
    id: "ant-12",
    category: "order",
    difficulty: "hard",
    story: "O código secreto é 1000.",
    question: "Qual o ANTECESSOR de 1000?",
    options: ["999", "1001", "900"],
    correctOption: "999",
    type: "multipleChoice",
    didacticExplanation: "Antes de chegar no mil, temos que completar todos os noves!",
    curiosity: "Depois do 999, todos os números mudam para virar 1000!",
    didacticStory: "O computador contou: 998, 999... e então BUM! Chegou no 1000!"
  },
  {
    id: "suc-12",
    category: "order",
    difficulty: "medium",
    story: "O ano é 1994.",
    question: "Qual o SUCESSOR de 1994?",
    options: ["1995", "1993", "2000"],
    correctOption: "1995",
    type: "multipleChoice"
  },
  {
    id: "seq-ext-1",
    category: "sequence",
    difficulty: "medium",
    story: "Complete a sequência a partir de 120, pulando de 5 em 5: 120, 125, 130...",
    question: "Qual o próximo número?",
    options: ["135", "140", "131"],
    correctOption: "135",
    type: "multipleChoice",
    didacticExplanation: "Pular de 5 em 5 é como contar os dedos de uma mão de cada vez!",
    curiosity: "Relógios usam a sequência de 5 em 5 para contar os minutos!",
    didacticStory: "O grilo saltitante pulava de 5 em 5 pedras. Ele estava na 130 e o seu próximo pulo foi na 135!"
  },
  {
    id: "seq-ext-2",
    category: "sequence",
    difficulty: "hard",
    story: "Descubra o mistério: __, __, 42, 44, __, __. Qual a regularidade?",
    question: "Qual o ritmo da sequência?",
    options: ["De 2 em 2", "De 1 em 1", "De 5 em 5"],
    correctOption: "De 2 em 2",
    type: "multipleChoice",
    didacticExplanation: "Olhe para os números vizinhos e veja quantos dedos você precisa para ir de um ao outro!",
    curiosity: "Números pares sempre seguem uma sequência de 2 em 2!",
    didacticStory: "Lila viu as pegadas na neve: 42, depois 44... Ela percebeu que o bicho pulava sempre 2 casas!"
  },
  {
    id: "astro-1",
    category: "arithmetic",
    difficulty: "medium",
    story: "Major Tom ficou 32 dias no espaço. Capitã Estrela ficou 25 dias. Eles trouxeram 14 pedras e 9 fotos.",
    question: "Qual a diferença de dias entre Tom e Estrela?",
    options: ["7 dias", "10 dias", "5 dias"],
    correctOption: "7 dias",
    type: "multipleChoice",
    didacticExplanation: "Para saber a diferença, a gente faz uma continha de menos entre o maior e o menor!",
    curiosity: "No espaço, o tempo parece passar de um jeito diferente porque não temos o sol para marcar o dia!",
    didacticStory: "Tom olhou seu calendário: 32 riscos. Estrela olhou o dela: 25 riscos. 'Eu tenho 7 riscos a mais!', disse Tom."
  },
  {
    id: "astro-2",
    category: "arithmetic",
    difficulty: "easy",
    story: "Na história do Major Tom, temos os números 32, 25, 14 e 9.",
    question: "Quais desses números são PARES?",
    options: ["32 e 14", "25 e 9", "32 e 25"],
    correctOption: "32 e 14",
    type: "multipleChoice",
    didacticExplanation: "Números pares são aqueles que terminam em 0, 2, 4, 6 ou 8. Eles nunca ficam sozinhos!",
    curiosity: "Tudo o que vem em par significa que tem um companheiro!",
    didacticStory: "Maria separou as meias: o par 32 e o par 14. Nenhuma meia ficou sem seu par!"
  },
  {
    id: "shop-space-1",
    category: "arithmetic",
    difficulty: "hard",
    story: "Maria foi ao shopping espacial. Comprou um capacete por 150 e luvas por 40. Ela pagou com 200.",
    question: "Quanto ela gastou no TOTAL?",
    options: ["190", "150", "200"],
    correctOption: "190",
    type: "multipleChoice",
    didacticExplanation: "Total é quando a gente junta tudo o que comprou em uma cesta só!",
    curiosity: "No futuro, talvez a gente use moedas espaciais para comprar coisas em outros planetas!",
    didacticStory: "Maria colocou o capacete (150) e as luvas (40) no balcão. O vendedor somou tudo e disse: 'São 190 moedas, por favor!'"
  },
  {
    id: "shop-space-2",
    category: "arithmetic",
    difficulty: "hard",
    story: "Maria comprou botas espaciais por 80 e um cinto por 30. Ela tinha 150.",
    question: "Quanto sobrou de TROCO?",
    options: ["40 moedas", "110 moedas", "150 moedas"],
    correctOption: "40 moedas",
    type: "multipleChoice"
  },
  {
    id: "ant-13",
    category: "order",
    difficulty: "medium",
    story: "O foguete está no km 1230.",
    question: "Qual o ANTECESSOR de 1230?",
    options: ["1229", "1231", "1200"],
    correctOption: "1229",
    type: "multipleChoice"
  },
  {
    id: "ant-14",
    category: "order",
    difficulty: "easy",
    story: "Maria viu o número 45.",
    question: "Qual o ANTECESSOR de 45?",
    options: ["44", "46", "40"],
    correctOption: "44",
    type: "multipleChoice"
  },
  {
    id: "suc-13",
    category: "order",
    difficulty: "medium",
    story: "Contagem: 4567.",
    question: "Qual o SUCESSOR de 4567?",
    options: ["4568", "4566", "4570"],
    correctOption: "4568",
    type: "multipleChoice"
  },
  {
    id: "suc-14",
    category: "order",
    difficulty: "easy",
    story: "Estamos no degrau 234.",
    question: "Qual o SUCESSOR de 234?",
    options: ["235", "233", "240"],
    correctOption: "235",
    type: "multipleChoice"
  },
  {
    id: "astro-3",
    category: "arithmetic",
    difficulty: "medium",
    story: "Dois astronautas voltaram. Um colheu 18 rochas (par) e outro 13 (ímpar). No total eles afirmam que '18 + 13 = 31'.",
    question: "Essa afirmação está correta?",
    options: ["Sim, está correta!", "Não, dá 30", "Não, dá 32"],
    correctOption: "Sim, está correta!",
    type: "multipleChoice",
    didacticExplanation: "Somar números grandes é mais fácil se a gente somar primeiro as dezenas e depois as unidades!",
    curiosity: "Cientistas conferem as contas centenas de vezes antes de mandar um foguete para o espaço!",
    didacticStory: "Os astronautas colocaram todas as rochas em uma caixa. 18 de um lado, 13 do outro. Juntos, eles contaram 31 tesouros espaciais!"
  },
  {
    id: "seq-ext-3",
    category: "sequence",
    difficulty: "hard",
    story: "Observe: 200, 220, 240, __. Qual o próximo?",
    question: "Qual a regularidade?",
    options: ["De 20 em 20", "De 10 em 10", "De 5 em 5"],
    correctOption: "De 20 em 20",
    type: "multipleChoice"
  },
  {
    id: "space-5",
    category: "composition",
    difficulty: "medium",
    story: "A Terra fica a 150 milhões de quilômetros do Sol. Escreva o número 150 por extenso.",
    question: "Como se escreve?",
    options: ["Cento e cinquenta", "Cento e cinco", "Cinquenta e cento"],
    correctOption: "Cento e cinquenta",
    type: "multipleChoice",
    didacticExplanation: "O número 150 tem uma centena e cinco dezenas!",
    curiosity: "A luz do sol leva cerca de 8 minutos para chegar na Terra!",
    didacticStory: "O Sol mandou um raio de luz para a Terra. O raio viajou rápido, cento e cinquenta milhões de quilômetros, e chegou bem na hora do café!"
  },
  {
    id: "space-6",
    category: "composition",
    difficulty: "hard",
    story: "Um foguete viaja a 40.000 quilômetros por hora. Qual o algarismo das dezenas de milhar?",
    question: "Algarismo das dezenas de milhar:",
    options: ["4", "0", "40"],
    correctOption: "4",
    type: "multipleChoice"
  },
  {
    id: "order-11",
    category: "order",
    difficulty: "medium",
    story: "Organize em ordem CRESCENTE as idades dos planetas (em bilhões de anos): 4, 5, 2.",
    question: "Ordem correta:",
    options: ["2, 4, 5", "5, 4, 2", "4, 2, 5"],
    correctOption: "2, 4, 5",
    type: "multipleChoice"
  },
  {
    id: "arith-5",
    category: "arithmetic",
    difficulty: "hard",
    story: "O astronauta tinha 100 galões de oxigênio. Ele usou 45 na primeira semana e 30 na segunda.",
    question: "Quanto oxigênio sobrou?",
    options: ["25 galões", "75 galões", "55 galões"],
    correctOption: "25 galões",
    type: "multipleChoice",
    didacticExplanation: "Primeiro a gente junta tudo o que usou, e depois tira do total que tinha no começo!",
    curiosity: "No espaço, os astronautas precisam economizar tudo, até o ar que respiram!",
    didacticStory: "O medidor estava marcando 100. Depois de duas semanas, o ponteiro desceu, desceu... e parou no 25!"
  },
  {
    id: "seq-4",
    category: "sequence",
    difficulty: "medium",
    story: "A sequência de lançamentos é: 10, 20, 30, __, 50.",
    question: "Qual o número que falta?",
    options: ["40", "35", "45"],
    correctOption: "40",
    type: "multipleChoice"
  },
  {
    id: "ant-15",
    category: "order",
    difficulty: "easy",
    story: "O planeta Marte é o 4º planeta do Sol.",
    question: "Qual o número que vem antes do 4?",
    options: ["3", "5", "2"],
    correctOption: "3",
    type: "multipleChoice"
  },
  {
    id: "suc-15",
    category: "order",
    difficulty: "easy",
    story: "O planeta Saturno é o 6º planeta do Sol.",
    question: "Qual o número que vem depois do 6?",
    options: ["7", "5", "8"],
    correctOption: "7",
    type: "multipleChoice"
  },
  {
    id: "arith-6",
    category: "arithmetic",
    difficulty: "medium",
    story: "Em uma caixa tem 12 maçãs espaciais. Maria comprou mais uma dúzia.",
    question: "Com quantas maçãs ela ficou?",
    options: ["24", "12", "13"],
    correctOption: "24",
    type: "multipleChoice",
    didacticExplanation: "Uma dúzia é o mesmo que 12! Então a Maria tinha 12 e ganhou mais 12.",
    curiosity: "A palavra 'dúzia' vem do número 12, que é um número muito especial para contar coisas!",
    didacticStory: "Maria colocou 12 maçãs na mesa. Depois trouxe outra caixa com mais 12. Ela contou uma por uma e viu que tinha 24!"
  },
  {
    id: "space-7",
    category: "composition",
    difficulty: "easy",
    story: "O Sol é uma estrela. O número 10 tem quantas dezenas?",
    question: "Dezenas no 10:",
    options: ["1", "0", "10"],
    correctOption: "1",
    type: "multipleChoice"
  },
  {
    id: "space-8",
    category: "composition",
    difficulty: "medium",
    story: "A Lua dá voltas na Terra. O número 28 tem:",
    question: "Composição de 28:",
    options: ["2 dezenas e 8 unidades", "8 dezenas e 2 unidades", "28 dezenas"],
    correctOption: "2 dezenas e 8 unidades",
    type: "multipleChoice"
  },
  {
    id: "arith-7",
    category: "arithmetic",
    difficulty: "medium",
    story: "No ônibus espacial entraram 15 pessoas, depois mais 5.",
    question: "Quantas pessoas no total?",
    options: ["20", "15", "10"],
    correctOption: "20",
    type: "multipleChoice"
  },
  {
    id: "arith-8",
    category: "arithmetic",
    difficulty: "easy",
    story: "Tinha 8 estrelas, 3 caíram.",
    question: "Quantas sobraram?",
    options: ["5", "3", "8"],
    correctOption: "5",
    type: "multipleChoice"
  },
  {
    id: "arith-9",
    category: "arithmetic",
    difficulty: "hard",
    story: "Vovó fez 40 bolinhos, Maria comeu 12.",
    question: "Quantos bolinhos sobraram?",
    options: ["28", "38", "32"],
    correctOption: "28",
    type: "multipleChoice"
  },
  {
    id: "arith-10",
    category: "arithmetic",
    difficulty: "medium",
    story: "Tinha 10 bombons, ganhei mais 10.",
    question: "Quantos bombons agora?",
    options: ["20", "10", "30"],
    correctOption: "20",
    type: "multipleChoice"
  },
  {
    id: "order-12",
    category: "order",
    difficulty: "easy",
    story: "Ordem crescente: 3, 1, 2.",
    question: "Qual o 1º da fila?",
    options: ["1", "2", "3"],
    correctOption: "1",
    type: "multipleChoice"
  },
  {
    id: "order-13",
    category: "order",
    difficulty: "easy",
    story: "Ordem decrescente: 5, 8, 2.",
    question: "Qual o 1º da fila?",
    options: ["8", "5", "2"],
    correctOption: "8",
    type: "multipleChoice"
  },
  {
    id: "order-14",
    category: "order",
    difficulty: "medium",
    story: "Qual número fica no meio entre 10 e 12?",
    question: "Número do meio:",
    options: ["11", "9", "13"],
    correctOption: "11",
    type: "multipleChoice"
  },
  {
    id: "ant-16",
    category: "order",
    difficulty: "easy",
    story: "O número é 50.",
    question: "Antecessor de 50:",
    options: ["49", "51", "40"],
    correctOption: "49",
    type: "multipleChoice"
  },
  {
    id: "suc-16",
    category: "order",
    difficulty: "easy",
    story: "O número é 99.",
    question: "Sucessor de 99:",
    options: ["100", "98", "90"],
    correctOption: "100",
    type: "multipleChoice"
  },
  {
    id: "seq-5",
    category: "sequence",
    difficulty: "medium",
    story: "5, 10, 15, __.",
    question: "Qual o próximo?",
    options: ["20", "25", "16"],
    correctOption: "20",
    type: "multipleChoice"
  },
  {
    id: "seq-6",
    category: "sequence",
    difficulty: "hard",
    story: "2, 4, 6, 8, __.",
    question: "Qual o próximo?",
    options: ["10", "9", "12"],
    correctOption: "10",
    type: "multipleChoice"
  },
  {
    id: "reg-11",
    category: "regularity",
    difficulty: "medium",
    story: "Coração, Estrela, Coração, __.",
    question: "O que vem agora?",
    options: ["Estrela", "Coração", "Lua"],
    correctOption: "Estrela",
    type: "multipleChoice"
  },
  {
    id: "reg-12",
    category: "regularity",
    difficulty: "easy",
    story: "Azul, Vermelho, Azul, Vermelho, __.",
    question: "Qual a próxima cor?",
    options: ["Azul", "Vermelho", "Verde"],
    correctOption: "Azul",
    type: "multipleChoice"
  },
  {
    id: "reg-13",
    category: "regularity",
    difficulty: "hard",
    story: "Quadrado, Círculo, Triângulo, Quadrado, Círculo...",
    question: "Qual o próximo?",
    options: ["Triângulo", "Quadrado", "Círculo"],
    correctOption: "Triângulo",
    type: "multipleChoice"
  },
  {
    id: "reg-14",
    category: "regularity",
    difficulty: "medium",
    story: "1, 0, 1, 0, 1...",
    question: "Qual o próximo?",
    options: ["0", "1", "2"],
    correctOption: "0",
    type: "multipleChoice"
  },
  {
    id: "seq-7",
    category: "sequence",
    difficulty: "easy",
    story: "1, 2, 3, 4, __.",
    question: "Qual o próximo?",
    options: ["5", "6", "0"],
    correctOption: "5",
    type: "multipleChoice"
  },
  {
    id: "seq-8",
    category: "sequence",
    difficulty: "medium",
    story: "100, 90, 80, __.",
    question: "Qual o próximo?",
    options: ["70", "75", "85"],
    correctOption: "70",
    type: "multipleChoice"
  },
  {
    id: "seq-9",
    category: "sequence",
    difficulty: "hard",
    story: "1, 3, 5, 7, __.",
    question: "Qual o próximo?",
    options: ["9", "8", "10"],
    correctOption: "9",
    type: "multipleChoice"
  },
  {
    id: "seq-10-new",
    category: "sequence",
    difficulty: "hard",
    story: "10, 20, 40, 80, __.",
    question: "Qual o próximo? (Dica: o número dobra!)",
    options: ["160", "100", "120"],
    correctOption: "160",
    type: "multipleChoice"
  },
  {
    id: "com-11",
    category: "composition",
    difficulty: "easy",
    story: "O número é 15.",
    question: "Como se fala?",
    options: ["Quinze", "Cinco", "Cinquenta"],
    correctOption: "Quinze",
    type: "multipleChoice"
  },
  {
    id: "com-12",
    category: "composition",
    difficulty: "medium",
    story: "Tenho 3 dezenas.",
    question: "Quanto eu tenho?",
    options: ["30", "3", "300"],
    correctOption: "30",
    type: "multipleChoice"
  }
];
