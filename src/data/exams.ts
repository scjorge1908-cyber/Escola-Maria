import { Exam } from "../types";

export const EXAMS: Exam[] = [
  {
    id: "exam-1",
    title: "Prova Final - Desafio do Mestre",
    description: "A primeira grande prova! 10 questões mistas de nível avançado.",
    exerciseIds: [
      "ari-m-21", // Aritmética
      "com-p-21", // Composição
      "seq-s-21", // Sequência
      "reg-h-21", // Regularidade
      "helena-16", // Ordem
      "round-h-21", // Arredondamento
      "ari-m-22", // Aritmética
      "com-p-22", // Composição
      "seq-s-22", // Sequência
      "reg-h-22"  // Regularidade
    ]
  },
  {
    id: "exam-2",
    title: "Prova Final - Maratona de Fração e Lógica",
    description: "A segunda prova para quem quer ser o melhor da classe!",
    exerciseIds: [
      "helena-17", // Ordem
      "round-h-22", // Arredondamento
      "ari-m-23", // Aritmética
      "com-p-23", // Composição
      "seq-s-23", // Sequência
      "reg-h-23", // Regularidade
      "helena-18", // Ordem
      "round-h-23", // Arredondamento
      "ari-m-24", // Aritmética
      "com-p-24"  // Composição
    ]
  },
  {
    id: "exam-3",
    title: "Prova Final - O Grande Enigma Vila do Sol",
    description: "O desafio definitivo para os gênios da matemática de 8 anos!",
    exerciseIds: [
      "seq-s-24", // Sequência
      "reg-h-24", // Regularidade
      "helena-19", // Ordem
      "round-h-24", // Arredondamento
      "ari-m-25", // Aritmética
      "com-p-25", // Composição
      "seq-s-25", // Sequência
      "reg-h-25", // Regularidade
      "helena-20", // Ordem
      "round-h-25"  // Arredondamento
    ]
  }
];
