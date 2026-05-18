export type Category = 'order' | 'rounding' | 'regularity' | 'arithmetic' | 'composition' | 'sequence';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Exercise {
  id: string;
  category: Category;
  difficulty: Difficulty;
  story: string;
  question: string;
  options: string[];
  correctOption: string;
  type: 'multipleChoice' | 'trueFalse' | 'ordering';
}

export interface UserProfile {
  name: string;
  points: number;
  levels: Record<Category, number>;
  unlockedRewards: string[];
  wrongExerciseIds?: string[];
}

export const CATEGORIES: { id: Category; name: string; icon: string }[] = [
  { id: 'order', name: 'Crescente e Decrescente', icon: 'ArrowUpDown' },
  { id: 'rounding', name: 'Arredondamento', icon: 'Circle' },
  { id: 'regularity', name: 'Regularidade', icon: 'Repeat' },
  { id: 'arithmetic', name: 'Mais e Menos', icon: 'PlusMinus' },
  { id: 'composition', name: 'Composição de Números', icon: 'Box' },
  { id: 'sequence', name: 'Sequência Numérica', icon: 'Hash' },
];

export const REWARDS = [
  { level: 10, name: '1 Hora de YouTube', category: 'Fase Fácil' },
  { level: 20, name: 'Um livro de 10 reais', category: 'Fase Média' },
  { level: 30, name: 'Dormir na Vovó', category: 'Fase Avançada' },
  { level: 180, name: '3 Horas de descanso com os pais', category: 'Mestre da Matemática' }
];
