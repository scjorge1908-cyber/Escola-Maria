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
  // ARREDONDAMENTO
  {
    id: "arr-1",
    category: "rounding",
    difficulty: "easy",
    story: "Maria Eduarda foi à feira e viu que uma maçã custa 8 reais. Ela quer saber se 8 está mais perto de 0 ou de 10.",
    question: "Verdadeiro ou Falso: Arredondando o número 8 para a dezena mais próxima, o resultado é 10.",
    options: ["Verdadeiro", "Falsos"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  {
    id: "arr-2",
    category: "rounding",
    difficulty: "medium",
    story: "Na festa da escola, há 23 balões azuis. A professora quer arredondar para a dezena mais próxima para comprar o bolo.",
    question: "O número 23 arredondado para a dezena mais próxima é 30?",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Falso",
    type: "trueFalse"
  },
  // MAIS E MENOS
  {
    id: "ari-1",
    category: "arithmetic",
    difficulty: "easy",
    story: "João tinha 15 figurinhas do Homem-Aranha. No recreio, ele ganhou mais 7 figurinhas da Maria Eduarda.",
    question: "Com quantas figurinhas João ficou agora?",
    options: ["20", "22", "25"],
    correctOption: "22",
    type: "multipleChoice"
  },
  {
    id: "ari-2",
    category: "arithmetic",
    difficulty: "medium",
    story: "A vovó fez 30 brigadeiros deliciosos. A família comeu 12 brigadeiros depois do jantar.",
    question: "Quantos brigadeiros sobraram na bandeja?",
    options: ["18", "20", "22"],
    correctOption: "18",
    type: "multipleChoice"
  },
  // COMPOSIÇÃO
  {
    id: "com-1",
    category: "composition",
    difficulty: "easy",
    story: "O pequeno construtor tem 2 dezenas e 5 unidades de blocos de madeira.",
    question: "Qual número esses blocos formam?",
    options: ["25", "52", "205"],
    correctOption: "25",
    type: "multipleChoice"
  },
  {
    id: "com-2",
    category: "composition",
    difficulty: "medium",
    story: "O pirata Barba Ruiva encontrou 3 centenas, 4 dezenas e 9 unidades de moedas de ouro.",
    question: "Quantas moedas ele tem no total?",
    options: ["349", "3049", "3409"],
    correctOption: "349",
    type: "multipleChoice"
  },
  // SEQUÊNCIA
  {
    id: "seq-1",
    category: "sequence",
    difficulty: "easy",
    story: "O coelhinho pula-pula está seguindo uma trilha de cenouras: 2, 4, 6, 8...",
    question: "Qual é o próximo número da sequência?",
    options: ["9", "10", "12"],
    correctOption: "10",
    type: "multipleChoice"
  },
  {
    id: "seq-2",
    category: "sequence",
    difficulty: "medium",
    story: "As flores no jardim da Maria nascem em um padrão: 5, 10, 15, 20...",
    question: "Qual número vem depois do 20?",
    options: ["21", "25", "30"],
    correctOption: "25",
    type: "multipleChoice"
  },
  // REGULARIDADE
  {
    id: "reg-1",
    category: "regularity",
    difficulty: "easy",
    story: "A Maria está fazendo um colar de contas: Azul, Rosa, Azul, Rosa...",
    question: "Qual é a cor da próxima conta?",
    options: ["Azul", "Rosa", "Verde"],
    correctOption: "Azul",
    type: "multipleChoice"
  },
  {
    id: "reg-2",
    category: "regularity",
    difficulty: "medium",
    story: "Na padaria, os pães saem do forno assim: Pão Doce, Pão de Sal, Pão de Sal, Pão Doce, Pão de Sal, Pão de Sal...",
    question: "O que vem depois do Pão Doce?",
    options: ["Pão Doce", "Pão de Sal", "Bolo"],
    correctOption: "Pão de Sal",
    type: "multipleChoice"
  },
  // MAIS ARREDONDAMENTO (Verdadeiro ou Falso)
  {
    id: "arr-3",
    category: "rounding",
    difficulty: "easy",
    story: "O número 12 está mais perto de 10 do que de 20.",
    question: "Verdadeiro ou Falso: Arredondando 12 para a dezena mais próxima, temos 10.",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  {
    id: "arr-4",
    category: "rounding",
    difficulty: "hard",
    story: "A Maria contou 87 estrelas no céu. Ela quer arredondar para a dezena mais próxima.",
    question: "Verdadeiro ou Falso: O número 87 arredondado para a dezena mais próxima é 90.",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  // MAIS ORDEM
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
    story: "Kiko tem 3 carrinhos de cores diferentes. O azul correu 7 metros, o vermelho 3 metros e o verde 9 metros.",
    question: "Como ficam as distâncias na ordem DECRESCENTE (do maior para o menor)?",
    options: ["9, 7, 3", "3, 7, 9", "7, 9, 3"],
    correctOption: "9, 7, 3",
    type: "multipleChoice"
  },
  {
    id: "ord-5",
    category: "order",
    difficulty: "medium",
    story: "Na escada do castelo, os degraus estão numerados. Maria subiu os degraus 15, 25 e 10.",
    question: "Qual é a ordem CRESCENTE desses degraus?",
    options: ["10, 15, 25", "25, 15, 10", "15, 10, 25"],
    correctOption: "10, 15, 25",
    type: "multipleChoice"
  },
  // ARREDONDAMENTO
  {
    id: "arr-5",
    category: "rounding",
    difficulty: "medium",
    story: "Um pacote de pipoca custa 46 centavos. A Maria quer arredondar para a dezena mais próxima.",
    question: "Verdadeiro ou Falso: 46 arredondado para a dezena mais próxima é 50.",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  {
    id: "arr-6",
    category: "rounding",
    difficulty: "hard",
    story: "O vovô mediu a altura de uma planta e deu 114 centímetros.",
    question: "Se arredondarmos 114 para a dezena mais próxima, o resultado é 110?",
    options: ["Verdadeiro", "Falso"],
    correctOption: "Verdadeiro",
    type: "trueFalse"
  },
  // MAIS E MENOS
  {
    id: "ari-3",
    category: "arithmetic",
    difficulty: "medium",
    story: "Numa árvore havia 24 passarinhos cantando. De repente, 9 passarinhos voaram para longe.",
    question: "Quantos passarinhos ficaram na árvore?",
    options: ["15", "13", "17"],
    correctOption: "15",
    type: "multipleChoice"
  },
  {
    id: "ari-4",
    category: "arithmetic",
    difficulty: "hard",
    story: "A mãe da Maria comprou 50 balas para o aniversário. Ela já colocou 35 balas nos saquinhos.",
    question: "Quantas balas ainda faltam ser colocadas?",
    options: ["15", "25", "10"],
    correctOption: "15",
    type: "multipleChoice"
  },
  {
    id: "ari-5",
    category: "arithmetic",
    difficulty: "easy",
    story: "No jardim tinham 8 flores vermelhas e a Maria plantou mais 6 flores amarelas.",
    question: "Quantas flores tem no jardim agora?",
    options: ["14", "12", "16"],
    correctOption: "14",
    type: "multipleChoice"
  },
  // COMPOSIÇÃO
  {
    id: "com-3",
    category: "composition",
    difficulty: "hard",
    story: "O robô Zeca é feito de centenas, dezenas e unidades. Ele tem 5 centenas, 0 dezenas e 8 unidades.",
    question: "Qual o número que representa o robô Zeca?",
    options: ["508", "58", "580"],
    correctOption: "508",
    type: "multipleChoice"
  },
  {
    id: "com-4",
    category: "composition",
    difficulty: "medium",
    story: "Na colmeia, as abelhas contaram 7 dezenas e 2 unidades de potes de mel.",
    question: "Quantos potes de mel elas têm?",
    options: ["72", "27", "702"],
    correctOption: "72",
    type: "multipleChoice"
  },
  {
    id: "com-5",
    category: "composition",
    difficulty: "easy",
    story: "O trenzinho carrega 1 centena de passageiros.",
    question: "Quantos passageiros são 1 centena?",
    options: ["100", "10", "1000"],
    correctOption: "100",
    type: "multipleChoice"
  },
  // SEQUÊNCIA
  {
    id: "seq-3",
    category: "sequence",
    difficulty: "hard",
    story: "Os patinhos estão nadando em fila: 10, 20, 30, 40...",
    question: "Qual é o próximo número da fila?",
    options: ["50", "60", "45"],
    correctOption: "50",
    type: "multipleChoice"
  },
  {
    id: "seq-4",
    category: "sequence",
    difficulty: "medium",
    story: "A Maria está contando de 3 em 3: 3, 6, 9, 12...",
    question: "Qual o próximo número que a Maria vai dizer?",
    options: ["15", "14", "18"],
    correctOption: "15",
    type: "multipleChoice"
  },
  {
    id: "seq-5",
    category: "sequence",
    difficulty: "easy",
    story: "A trilha na floresta tem números escondidos: 1, 2, 3, 4, __, 6.",
    question: "Qual número está faltando na trilha?",
    options: ["5", "7", "0"],
    correctOption: "5",
    type: "multipleChoice"
  },
  // REGULARIDADE
  {
    id: "reg-3",
    category: "regularity",
    difficulty: "easy",
    story: "O semáforo de brinquedo faz: Verde, Amarelo, Vermelho, Verde, Amarelo...",
    question: "Qual é a próxima cor que vai acender?",
    options: ["Vermelho", "Azul", "Roxo"],
    correctOption: "Vermelho",
    type: "multipleChoice"
  },
  {
    id: "reg-4",
    category: "regularity",
    difficulty: "medium",
    story: "O relógio do cuco faz: Cucu, silêncio, silêncio, Cucu, silêncio...",
    question: "O que vem agora?",
    options: ["silêncio", "Cucu", "Gritar"],
    correctOption: "silêncio",
    type: "multipleChoice"
  },
  {
    id: "reg-5",
    category: "regularity",
    difficulty: "hard",
    story: "Na dança, os passos são: Direita, Direita, Esquerda, Direita, Direita...",
    question: "Qual é o próximo passo?",
    options: ["Esquerda", "Direita", "Pular"],
    correctOption: "Esquerda",
    type: "multipleChoice"
  }
];
