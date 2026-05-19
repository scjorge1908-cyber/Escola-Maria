export type Category = 'order' | 'rounding' | 'regularity' | 'arithmetic' | 'composition' | 'sequence';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface NarrativePath {
  choice: string;
  storySegment: string;
  questionOverride?: string;
  optionsOverride?: string[];
  correctOptionOverride?: string;
}

export interface Exercise {
  id: string;
  category: Category;
  difficulty: Difficulty;
  story: string;
  question: string;
  options: string[];
  correctOption: string;
  type: 'multipleChoice' | 'trueFalse' | 'ordering';
  narrativePaths?: NarrativePath[];
  didacticExplanation?: string;
  curiosity?: string;
  didacticStory?: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  exerciseIds: string[];
}

export interface ExamResult {
  examId: string;
  score: number;
  completedAt: string;
}

export interface UserProfile {
  name: string;
  points: number;
  levels: Record<Category, number>;
  unlockedRewards: string[];
  wrongExerciseIds?: string[];
  examResults?: ExamResult[];
}

export const CATEGORIES: { id: Category; name: string; icon: string; intro?: string }[] = [
  { 
    id: 'order', 
    name: 'Crescente e Decrescente', 
    icon: 'ArrowUpDown',
    intro: "Na pequena fazenda da Vovó Helena, Lucas adorava brincar com os números espalhados pelo jardim. Todos os dias, a vovó criava desafios de sequência crescente e decrescente para ajudá-lo a encontrar caminhos secretos, abrir baús e alimentar os animais da fazenda.\n\nCerta manhã, Lucas encontrou um mapa mágico escondido perto do celeiro. Para seguir cada pista, ele precisava descobrir quais números aumentavam e quais diminuíam. A cada resposta correta, ele chegava mais perto do grande prêmio da vovó: a Medalha do Pequeno Mestre da Matemática.\n\nAgora é sua vez de ajudar Lucas nessa aventura! Resolva os exercícios observando com atenção as sequências em ordem crescente e decrescente. Boa sorte!"
  },
  { 
    id: 'rounding', 
    name: 'Arredondamento', 
    icon: 'Circle',
    intro: "Na escola da Vila do Sol, a professora Helena ensinou uma maneira divertida de facilitar as contas: o arredondamento. Lucas e seus amigos descobriram que alguns números podiam ser aproximados para dezenas mais próximas, deixando os cálculos muito mais rápidos no dia a dia.\n\nDurante uma gincana matemática, cada aluno precisava resolver desafios de arredondamento para avançar nas etapas do jogo. Quem acertasse os números aproximados ajudaria a equipe a chegar até o tesouro escondido da escola.\n\nAgora chegou sua vez! Leia cada exercício com atenção e escolha a alternativa correta sobre arredondamento."
  },
  { 
    id: 'regularity', 
    name: 'Regularidade', 
    icon: 'Repeat',
    intro: "Na Escola da Vila do Sol, Lucas descobriu uma brincadeira muito divertida chamada regularidade. A professora Helena explicou que regularidade é observar padrões que se repetem em números, formas ou sequências. Quem conseguisse descobrir o padrão correto ajudaria a turma a completar o grande mural matemático da escola.\n\nDurante a atividade, Lucas percebeu que alguns números aumentavam sempre do mesmo jeito, enquanto outros repetiam desenhos e cores em sequência. Cada exercício era uma pista para completar os desafios da professora.\n\nAgora é sua vez! Observe com atenção os padrões e escolha a alternativa correta em cada exercício."
  },
  { 
    id: 'arithmetic', 
    name: 'Mais e Menos', 
    icon: 'PlusMinus',
    intro: "Maria Eduarda estava muito animada porque sua família planejava uma viagem para a Disney. Para conseguir comprar lembrancinhas, brinquedos e doces durante a viagem, ela decidiu começar a economizar dinheiro e aprender matemática para cuidar melhor das suas moedas e notas.\n\nTodos os dias, Maria Eduarda anotava quanto dinheiro ganhava, quanto guardava no cofrinho e quanto gastava. Com a ajuda da professora Helena, ela descobriu que as contas de mais e menos ajudavam muito na organização do dinheiro e no planejamento da viagem.\n\nAgora é sua vez de ajudar Maria Eduarda! Resolva os exercícios de adição e subtração para ajudá-la a economizar e chegar preparada para a grande aventura na Disney! ✨🏰"
  },
  { 
    id: 'composition', 
    name: 'Composição de Números', 
    icon: 'Box',
    intro: "Pedro adorava brincar de montar números com bloquinhos coloridos na escola. Um dia, a professora Helena explicou que os números podem ser formados por dezenas e unidades, e que entender a composição dos números ajuda muito na matemática do dia a dia.\n\nDurante uma atividade especial, Pedro recebeu desafios para descobrir como os números eram compostos. A cada resposta correta, ele avançava no jogo matemático da turma e ganhava estrelas no mural da escola.\n\nAgora é sua vez de ajudar Pedro! Resolva os exercícios de composição de números observando as dezenas e unidades com atenção."
  },
  { 
    id: 'sequence', 
    name: 'Sequência Numérica', 
    icon: 'Hash',
    intro: "Na Escola Arco-Íris, Sofia adorava participar das brincadeiras de matemática da professora Helena. Em uma manhã especial, a professora criou um jogo chamado “A Trilha dos Números”, onde os alunos precisavam descobrir as sequências corretas para avançar pelas fases do desafio.\n\nCada sequência escondia uma pista secreta. Algumas aumentavam, outras diminuíam, e algumas pulavam números seguindo um padrão. Sofia percebeu que, observando com atenção, conseguia descobrir qual número vinha depois.\n\nAgora é sua vez de entrar nessa aventura! Observe as sequências numéricas e escolha a alternativa correta para completar cada desafio."
  },
];

export const REWARDS = [
  { level: 10, name: '1 Hora de YouTube', category: 'Fase Fácil' },
  { level: 20, name: 'Um livro de 10 reais', category: 'Fase Média' },
  { level: 30, name: 'Dormir na Vovó', category: 'Fase Avançada' },
  { level: 180, name: '3 Horas de descanso com os pais', category: 'Mestre da Matemática' }
];
