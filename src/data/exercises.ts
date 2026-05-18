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
    type: "multipleChoice"
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
    type: "multipleChoice"
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
    type: "multipleChoice"
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
    type: "multipleChoice"
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
    type: "multipleChoice"
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
    type: "multipleChoice"
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
    type: "multipleChoice"
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
    type: "multipleChoice"
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
  }
];
