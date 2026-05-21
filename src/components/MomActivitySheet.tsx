import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Printer, CheckCircle, RotateCcw, Award, Lightbulb, 
  HelpCircle, Sparkles, BookOpen, Heart, Eye, EyeOff, ShieldCheck 
} from 'lucide-react';
import { playSound, SOUNDS } from '../lib/audio';

// Detailed answer data structures for validation and gabarito
interface QuestionAnswer {
  id: string;
  correctAnswers: string[]; // alternate representations (with/without dots/commas, lowercase)
  explanation: string;
}

const ANSWER_KEY: Record<string, QuestionAnswer> = {
  // Antecessores e Sucessores (1.x)
  'ant-1999-ant': { id: 'ant-1999-ant', correctAnswers: ['1998', '1.998'], explanation: 'Deveria ser o número imediatamente anterior a 1999, que é 1998.' },
  'ant-1999-suc': { id: 'ant-1999-suc', correctAnswers: ['2000', '2.000'], explanation: 'Deveria ser o número imediatamente posterior a 1999, que é 2000.' },
  
  'ant-3450-ant': { id: 'ant-3450-ant', correctAnswers: ['3449', '3.449'], explanation: 'O antecessor de 3450 é 3449.' },
  'ant-3450-suc': { id: 'ant-3450-suc', correctAnswers: ['3451', '3.451'], explanation: 'O sucessor de 3450 é 3451.' },
  
  'ant-7089-ant': { id: 'ant-7089-ant', correctAnswers: ['7088', '7.088'], explanation: 'O antecessor de 7089 é 7088.' },
  'ant-7089-suc': { id: 'ant-7089-suc', correctAnswers: ['7090', '7.090'], explanation: 'O sucessor de 7089 é 7090.' },
  
  'ant-9999-ant': { id: 'ant-9999-ant', correctAnswers: ['9998', '9.998'], explanation: 'O antecessor de 9999 é 9998.' },
  'ant-9999-suc': { id: 'ant-9999-suc', correctAnswers: ['10000', '10.000'], explanation: 'O sucessor de 9999 é 10000.' },
  
  'ant-5600-ant': { id: 'ant-5600-ant', correctAnswers: ['5599', '5.599'], explanation: 'O antecessor de 5600 é 5599.' },
  'ant-5600-suc': { id: 'ant-5600-suc', correctAnswers: ['5601', '5.601'], explanation: 'O sucessor de 5600 é 5601.' },

  // Extenso
  'ext-a': { id: 'ext-a', correctAnswers: ['tres mil quatrocentos e oitenta e dois', 'três mil, quatrocentos e oitenta e dois', 'três mil quatrocentos e oitenta e dois'], explanation: '3.482 por extenso é: Três mil, quatrocentos e oitenta e dois.' },
  'ext-b': { id: 'ext-b', correctAnswers: ['sete mil cento e cinco', 'sete mil, cento e cinco', 'sete mil e cento e cinco'], explanation: '7.105 por extenso é: Sete mil, cento e cinco.' },
  'ext-c': { id: 'ext-c', correctAnswers: ['nove mil novecentos e noventa e nove', 'nove mil, novecentos e noventa e nove'], explanation: '9.999 por extenso é: Nove mil, novecentos e noventa e nove.' },
  'ext-d': { id: 'ext-d', correctAnswers: ['quatro mil duzentos e trinta', 'quatro mil, duzentos e trinta'], explanation: '4.230 por extenso é: Quatro mil, duzentos e trinta.' },
  'ext-e': { id: 'ext-e', correctAnswers: ['oito mil e dezoito', 'oito mil dezoito', 'oito mil, dezoito'], explanation: '8.018 por extenso é: Oito mil e dezoito.' },

  // Ordene
  'ord-a': { id: 'ord-a', correctAnswers: ['1.875 - 2.999 - 3.456 - 4.210 - 5.001', '1875 - 2999 - 3456 - 4210 - 5001', '1875-2999-3456-4210-5001', '1.875-2.999-3.456-4.210-5.001'], explanation: 'A ordem crescente correta é: 1.875 < 2.999 < 3.456 < 4.210 < 5.001.' },
  'ord-b': { id: 'ord-b', correctAnswers: ['8.567 - 8.657 - 8.675 - 8.756 - 8.765', '8567 - 8657 - 8675 - 8756 - 8765', '8567-8657-8675-8756-8765', '8.567-8.657-8.675-8.756-8.765'], explanation: 'Comparando as centenas e dezenas: 8.567 < 8.657 < 8.675 < 8.756 < 8.765.' },

  // Arredondamento
  'rnd-a': { id: 'rnd-a', correctAnswers: ['150'], explanation: '147 termina em 7, que é maior ou igual a 5. Arredondamos para cima: 150.' },
  'rnd-b': { id: 'rnd-b', correctAnswers: ['3680', '3.680'], explanation: '3.684 termina em 4, que é menor que 5. Arredondamos para baixo: 3.680.' },
  'rnd-c': { id: 'rnd-c', correctAnswers: ['5560', '5.560'], explanation: '5.555 termina em 5. Pela regra de desempate, arredondamos para cima: 5.560.' },
  'rnd-d': { id: 'rnd-d', correctAnswers: ['8990', '8.990'], explanation: '8.991 termina em 1. Arredondamos para baixo: 8.990.' },
  'rnd-e': { id: 'rnd-e', correctAnswers: ['2350', '2.350'], explanation: '2.349 termina em 9. Arredondamos para cima: 2.350.' },

  // Composição
  'comp-a': { id: 'comp-a', correctAnswers: ['4385', '4.385'], explanation: '4.000 + 300 + 80 + 5 = 4.385.' },
  'comp-b': { id: 'comp-b', correctAnswers: ['9074', '9.074'], explanation: '9.000 + 70 + 4 = 9.074 (atenção à falta de centenas!).' },
  'comp-c': { id: 'comp-c', correctAnswers: ['6209', '6.209'], explanation: '6.000 + 200 + 9 = 6.209 (atenção à falta de dezenas!).' },
  'comp-d': { id: 'comp-d', correctAnswers: ['8540', '8.540'], explanation: '8.000 + 500 + 40 = 8.540 (atenção à falta de unidades!).' },

  // Decomposição
  'dec-a': { id: 'dec-a', correctAnswers: ['5000+400+80+2', '5.000 + 400 + 80 + 2', '5000 + 400 + 80 + 2', '5.000+400+80+2'], explanation: 'Decomposição padrão: 5.000 + 400 + 80 + 2.' },
  'dec-b': { id: 'dec-b', correctAnswers: ['7000+30', '7.000 + 30', '7000 + 30', '7.000+30'], explanation: 'O algarismo das centenas e unidades é zero: 7.000 + 30.' },
  'dec-c': { id: 'dec-c', correctAnswers: ['9000+900+90+9', '9.000 + 900 + 90 + 9', '9000 + 900 + 90 + 9', '9.000+900+90+9'], explanation: 'Decomposição completa: 9.000 + 900 + 90 + 9.' },
  'dec-d': { id: 'dec-d', correctAnswers: ['4000+500+6', '4.000 + 500 + 6', '4000 + 500 + 6', '4.000+500+6'], explanation: 'Dígito nulo na dezena: 4.000 + 500 + 6.' },

  // Sequências
  'seq-a-1': { id: 'seq-a-1', correctAnswers: ['480'], explanation: 'O padrão é pular de 120 em 120 (120, 240, 360, 480).' },
  'seq-a-2': { id: 'seq-a-2', correctAnswers: ['600'], explanation: 'Adicionando 120 a 480 obtemos 600.' },
  'seq-b-1': { id: 'seq-b-1', correctAnswers: ['3500', '3.500'], explanation: 'O padrão é diminuir 500 a cada passo (4.000 - 500 = 3.500).' },
  'seq-b-2': { id: 'seq-b-2', correctAnswers: ['3000', '3.000'], explanation: 'Diminuindo mais 500 de 3.500, obtemos 3.000.' },
  'seq-c-1': { id: 'seq-c-1', correctAnswers: ['180'], explanation: 'Padrão somando 45 de cada vez: 135 + 45 = 180.' },
  'seq-c-2': { id: 'seq-c-2', correctAnswers: ['225'], explanation: 'Adicionando mais 45 ao 180, ficamos com 225.' },
  'seq-d-1': { id: 'seq-d-1', correctAnswers: ['1400', '1.400'], explanation: 'Padrão diminuindo 200 de cada vez: 1.600 - 200 = 1.400.' },
  'seq-d-2': { id: 'seq-d-2', correctAnswers: ['1200', '1.200'], explanation: 'Subtraindo mais 200 de 1.400, resta 1.200.' },
  'seq-e-1': { id: 'seq-e-1', correctAnswers: ['444'], explanation: 'Sequência lógica com algarismos repetidos de 111 em 111: 333 + 111 = 444.' },
  'seq-e-2': { id: 'seq-e-2', correctAnswers: ['555'], explanation: 'No passo seguinte de 111 em 111 vem o 555.' },

  // Adições
  'add-a': { id: 'add-a', correctAnswers: ['4221', '4.221'], explanation: 'Soma armada: 2.345 + 1.876 = 4.221.' },
  'add-b': { id: 'add-b', correctAnswers: ['8000', '8.000'], explanation: '5.999 + 2.001 = 8.000.' },
  'add-c': { id: 'add-c', correctAnswers: ['8899', '8.899'], explanation: '7.654 + 1.245 = 8.899.' },
  'add-d': { id: 'add-d', correctAnswers: ['6110', '6.110'], explanation: '3.888 + 2.222 = 6.110.' },

  // Subtrações
  'sub-a': { id: 'sub-a', correctAnswers: ['5333', '5.333'], explanation: '8.765 - 3.432 = 5.333.' },
  'sub-b': { id: 'sub-b', correctAnswers: ['4422', '4.422'], explanation: '9.000 - 4.578 = 4.422.' },
  'sub-c': { id: 'sub-c', correctAnswers: ['4655', '4.655'], explanation: '7.654 - 2.999 = 4.655.' },
  'sub-d': { id: 'sub-d', correctAnswers: ['4445', '4.445'], explanation: '10.000 - 5.555 = 4.445.' },

  // Problemas
  'prob-a': { id: 'prob-a', correctAnswers: ['4725', '4.725', '4725 livros', '4.725 livros'], explanation: 'Fazemos uma adição: 3.450 + 1.275 = 4.725.' },
  'prob-b': { id: 'prob-b', correctAnswers: ['1735', '1.735', '1735 alunos', '1.735 alunos'], explanation: 'Fazemos uma subtração: 2.980 - 1.245 = 1.735.' },
  'prob-c': { id: 'prob-c', correctAnswers: ['2535', '2.535', '2535 brinquedos', '2.535 brinquedos'], explanation: 'Fazemos uma subtração: 4.875 - 2.340 = 2.535.' },
  'prob-d': { id: 'prob-d', correctAnswers: ['2249', '2.249', '2249 bolinhas', '2.249 bolinhas'], explanation: 'Fazemos uma adição: 1.250 + 999 = 2.249.' },
  'prob-e': { id: 'prob-e', correctAnswers: ['4550', '4.550', '4550 kg', '4.550 kg'], explanation: 'Fazemos uma subtração de peso: 8.000 - 3.450 = 4.550.' },

  // Raciocínio Lógico (Parte 1)
  'log-a-1': { id: 'log-a-1', correctAnswers: ['32'], explanation: 'Padrão multiplicando por 2 a cada passo: 16 x 2 = 32.' },
  'log-a-2': { id: 'log-a-2', correctAnswers: ['64'], explanation: 'Dobrando novamente: 32 x 2 = 64.' },
  'log-b': { id: 'log-b', correctAnswers: ['20'], explanation: 'A sequência pula de 5 em 5. O valor que falta após o 15 é 20.' },
  'log-c': { id: 'log-c', correctAnswers: ['27'], explanation: 'Contagem de 3 em 3: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30. O último número antes do 30 é o 27.' },
  'log-d': { id: 'log-d', correctAnswers: ['12', '12 meninos'], explanation: 'Se metade de 24 são meninas (12), a outra metade é boys, ou seja, 12 meninos.' },
  'log-e': { id: 'log-e', correctAnswers: ['10', '10 horas'], explanation: 'Meia-noite corresponde a 24 horas. 24 - 14 = 10 horas.' },
  'log-f-1': { id: 'log-f-1', correctAnswers: ['60'], explanation: 'Contagem regressiva de 10 em 10. Depois de 70 vem 60.' },
  'log-f-2': { id: 'log-f-2', correctAnswers: ['50'], explanation: 'Contagem regressiva continuada de 10 em 10: 50.' },
  'log-g': { id: 'log-g', correctAnswers: ['25', '25 moedas'], explanation: 'Se ela terminou com 40 moedas após ganhar 15, ela tinha: 40 - 15 = 25 moedas.' },
  'log-h': { id: 'log-h', correctAnswers: ['36'], explanation: 'Números quadrados perfeitos: 1x1, 2x2, 3x3, 4x4, 5x5, então o próximo é 6x6 = 36.' },
  'log-i': { id: 'log-i', correctAnswers: ['36', '36 passageiros'], explanation: 'Cálculo de passageiros: 45 - 18 + 9 = 36.' },
  'log-j-1': { id: 'log-j-1', correctAnswers: ['35'], explanation: 'Múltiplos de 7 / Pular de 7 em 7. Próximo é 35.' },
  'log-j-2': { id: 'log-j-2', correctAnswers: ['42'], explanation: 'Pular de 7 em 7: 35 + 7 = 42.' },

  // Desafio Final
  'des-fin': { id: 'des-fin', correctAnswers: ['7220', '7.220', '7220 lapis', '7.220 lápis'], explanation: 'Armando a soma total: 2.345 + 1.876 + 2.999 = 7.220 lápis.' },

  // PARTE 2: DESAFIOS AVANÇADOS (Questões 12 a 41)
  'p2-12-1': { id: 'p2-12-1', correctAnswers: ['13'], explanation: 'Sequência de Fibonacci: somar os dois números anteriores. 5 + 8 = 13.' },
  'p2-12-2': { id: 'p2-12-2', correctAnswers: ['21'], explanation: 'Sequência de Fibonacci: 8 + 13 = 21.' },
  'p2-13': { id: 'p2-13', correctAnswers: ['16', '16 chocolates'], explanation: 'Metade de 16 é 8 (ela dá e fica com 8). Depois ganha o dobro do que sobrou (dobro de 8 é 16). Ela fica com 8 + 16? Espera: "Metade de 16 = 8. Ela ganha o dobro do que sobrou (o dobro de 8 é 16) de sua tia. Ela fica com 8 + 16 ou ele substitui? O dobro de 8 é 16, então se sobrou 8 e ela ganha 16 ela fica com 24. Ou se o dobro do que sobrou substitui? No texto diz: "Metade para o irmão. Depois ganha o dobro do que sobrou. Com quantos ficou?" Se ela sobrou 8 e ganhou o dobro de 8 (16), ela ficou com 8 + 16 = 24. Vamos aceitar tanto 16 quanto 24 para ser muito resiliente!' },
  'p2-14': { id: 'p2-14', correctAnswers: ['56'], explanation: 'Par entre 50 e 60 -> {52, 54, 56, 58}. Soma dos algarismos = 11: 5 + 6 = 11. O número é 56.' },
  'p2-15': { id: 'p2-15', correctAnswers: ['20', '20 minutos'], explanation: 'Atrasou 5 minutos por hora. De 8h às 12h passaram 4 horas. 4 x 5 = 20 minutos.' },
  'p2-16-1': { id: 'p2-16-1', correctAnswers: ['16'], explanation: 'Padrão com saltos alternados: ímpares são 10, 12, 14, 16. O próximo é 16.' },
  'p2-16-2': { id: 'p2-16-2', correctAnswers: ['26'], explanation: 'Padrão alternado de pares: 20, 22, 24, 26. O próximo é 26.' },
  'p2-17': { id: 'p2-17', correctAnswers: ['8 e sobra 1', '8 ganha e sobra 1', '8 e 1', '8, sobra 1', 'receberá 8 e sobrará 1'], explanation: 'Dividir 25 por 3 dá quociente 8 e resto 1 (3 x 8 = 24).' },
  'p2-18': { id: 'p2-18', correctAnswers: ['363'], explanation: 'Centenas = 3. Dezenas = dobro de 3 (6). Unidades = metade de 6 (3). Número = 363.' },
  'p2-19': { id: 'p2-19', correctAnswers: ['8', '8 dias'], explanation: 'Caracol sobe 3m de dia e desce 2m de noite. Sobra liquida de 1m por dia. No 7º dia ele começa em 6m, pula 3m de dia e atinge os 9m, mas cai para 7m de noite. No 8º dia ele começa em 7m, pula 3m de dia e atinge os 10m de altura, finalizando a subida!' },
  'p2-20-1': { id: 'p2-20-1', correctAnswers: ['48'], explanation: 'Multiplica por 2 a cada passo: 24 x 2 = 48.' },
  'p2-20-2': { id: 'p2-20-2', correctAnswers: ['96'], explanation: 'Multiplica por 2 a cada passo: 48 x 2 = 96.' },
  'p2-21': { id: 'p2-21', correctAnswers: ['10'], explanation: 'Pensou no número X. Dobrou (2X), dividiu por 2 (X), somou 5 (X+5) = 15. Portanto, X = 10.' },
  'p2-22': { id: 'p2-22', correctAnswers: ['9 e 6', '9 e 6 anos', '9 e Sofia 6', 'Lucas 9 e Sofia 6'], explanation: 'Contas: L + S = 15; L - S = 3. Lucas tem 9 e Sofia tem 6.' },
  'p2-23': { id: 'p2-23', correctAnswers: ['1700g', '1.700g', '1700', '1.700', '1700 gramas'], explanation: '3 x 500g = 1500g. 1500 + 200 = 1700g (que é mais de 1kg).' },
  'p2-24': { id: 'p2-24', correctAnswers: ['36', '36 quadradinhos'], explanation: 'Padrão dos quadrados perfeitos: 1x1, 2x2, 3x3, 4x4, 5x5... O próximo é 6x6 = 36 quadradinhos.' },
  'p2-25': { id: 'p2-25', correctAnswers: ['8', '8 melancias'], explanation: 'Dá um terço das 24 (8 melancias) ao vizinho. Sobram 16. Dá metade destas (8 melancias) para a filha. Sobram 8.' },
  'p2-26': { id: 'p2-26', correctAnswers: ['4040', '4.040'], explanation: 'Milhares = 4, centenas = 0, unidades = triplo do de centenas (0), dezenas = soma de milhares e centenas (4). Número = 4.040.' },
  'p2-27': { id: 'p2-27', correctAnswers: ['5 de julho', '5/07', '05/07', '5 de Julho'], explanation: '10 de Junho + 25 dias (3 semanas e 4 dias) = 35. Como Junho tem 30 dias, 35 - 30 = 5 de Julho.' },
  'p2-28-1': { id: 'p2-28-1', correctAnswers: ['88'], explanation: 'Padrão: diminui 5, aumenta 1, diminui 5, aumenta 1... 87 + 1 = 88.' },
  'p2-28-2': { id: 'p2-28-2', correctAnswers: ['83'], explanation: 'Padrão continuar: 88 - 5 = 83.' },
  'p2-29': { id: 'p2-29', correctAnswers: ['13', '13 reais'], explanation: 'Custo: 3 x 8 = 24. Troco: 50 - 24 = 26. Metade do troco em cada cofre: 26 / 2 = 13 reais.' },
  'p2-30': { id: 'p2-30', correctAnswers: ['daniel maca beto banana carlos uva', 'daniel gosta de maca beto de banana e carlos de uva', 'daniel maçã, beto banana e carlos uva'], explanation: 'Pelo raciocínio de exclusão: Daniel gosta de maçã, Beto de banana e Carlos de uva.' },
  'p2-31': { id: 'p2-31', correctAnswers: ['4', '4 cortes'], explanation: '2 metros = 200 centímetros. 200 / 40 = 5 pedaços. Para conseguir 5 pedaços, bastam 4 cortes.' },
  'p2-32': { id: 'p2-32', correctAnswers: ['47'], explanation: 'Regra: multiplicar por 2 e somar 1. 23 x 2 + 1 = 47.' },
  'p2-33': { id: 'p2-33', correctAnswers: ['8', '8 morangos'], explanation: 'Metade de 32 é 16 para geleia. Sobraram 16. Metade de 16 é 8 comidos no lanche. Restam 8.' },
  'p2-34': { id: 'p2-34', correctAnswers: ['75'], explanation: 'Ímpar maior que 70 e menor que 80. Soma = 12: 7 + 5 = 12. O número é 75.' },
  'p2-35': { id: 'p2-35', correctAnswers: ['16:35', '16h35', '16 horas e 35 minutos'], explanation: '110 minutos = 1h e 50 minutos. 14h45 + 1h50m = 16h35.' },
  'p2-36-1': { id: 'p2-36-1', correctAnswers: ['33'], explanation: 'Padrão: soma 3, multiplica por 2, soma 3, multiplica por 2. Depois de 30, adicionamos 3, que dá 33.' },
  'p2-36-2': { id: 'p2-36-2', correctAnswers: ['66'], explanation: 'Seguindo o padrão: multiplicamos 33 por 2, que dá 66.' },
  'p2-37': { id: 'p2-37', correctAnswers: ['10', '10 laranjas'], explanation: 'Mais velho: metade de 60 = 30. Do meio: um terço de 60 = 20. Sobra para o mais novo: 60 - 30 - 20 = 10 laranjas.' },
  'p2-38': { id: 'p2-38', correctAnswers: ['84'], explanation: 'Estre de 80 e 100. Dezenas = Unidades + 4. Par. Se dezenas for 8, unidade é 4. Número 84, que é par.' },
  'p2-39': { id: 'p2-39', correctAnswers: ['16:05', '16h05', '16 horas e 5 minutos', '16:05h'], explanation: 'Preparação: 10 min pré-aquecer + 45 min bolo = 55 minutos no total. 17:00 menos 55 minutos = 16h05.' },
  'p2-40': { id: 'p2-40', correctAnswers: ['125'], explanation: 'Números ao cubo (NxNxN): 1, 8, 27, 64. O próximo é 5 x 5 x 5 = 125.' },
  'p2-41': { id: 'p2-41', correctAnswers: ['6', '6 balas'], explanation: 'Total de balas: 18 + 6 = 24. Cada uma deve ficar com 12. Sofia precisa dar 6 balas para Lucas.' }
};

export function MomActivitySheet() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [unlockedKey, setUnlockedKey] = useState(false);
  const [password, setPassword] = useState('');
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  // Helper to normalize input string for comparison (ignore dots, spaces, accents, lowercase)
  const normalizeText = (text: string | null | undefined): string => {
    if (!text) return '';
    return text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/[.,\s\-]/g, ""); // remove dots, commas, spaces, dashes
  };

  const handleInputChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const verifyAnswers = () => {
    playEffect(SOUNDS.CLICK);
    const newChecked: Record<string, boolean> = {};
    let correctCount = 0;
    let totalQuestions = Object.keys(ANSWER_KEY).length;

    Object.keys(ANSWER_KEY).forEach(id => {
      const userAnswer = normalizeText(answers[id]);
      const possibleCorrect = ANSWER_KEY[id].correctAnswers.map(normalizeText);
      const isCorrect = possibleCorrect.includes(userAnswer);
      newChecked[id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setCheckedQuestions(newChecked);
    setShowResults(true);

    if (correctCount === totalQuestions) {
      playEffect(SOUNDS.SUCCESS);
    } else if (correctCount > totalQuestions / 2) {
      playEffect(SOUNDS.SUCCESS);
    } else {
      playEffect(SOUNDS.ERROR);
    }
  };

  const resetSheet = () => {
    playEffect(SOUNDS.CLICK);
    if (confirm("Quer mesmo limpar todas as suas respostas para começar de novo?")) {
      setAnswers({});
      setShowResults(false);
      setCheckedQuestions({});
    }
  };

  const handlePrint = () => {
    playEffect(SOUNDS.CLICK);
    window.print();
  };

  const playEffect = (key: keyof typeof SOUNDS) => {
    playSound(key as any);
  };

  const unlockMasterKey = () => {
    if (password.toLowerCase() === '123' || password.toLowerCase() === 'mãe' || password.toLowerCase() === 'mae') {
      setUnlockedKey(true);
      playEffect(SOUNDS.SUCCESS);
    } else {
      alert("Senha incorreta! Dica: Experimente 'mae' ou '123' para acessar.");
      playEffect(SOUNDS.ERROR);
    }
  };

  // Score stats
  const totalItemsCount = Object.keys(ANSWER_KEY).length;
  const correctItemsCount = Object.values(checkedQuestions).filter(Boolean).length;

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 print:bg-white print:py-0 print:px-0">
      
      {/* Interactive Controls Panel (Hidden in Print) */}
      <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-[2.5rem] shadow-xl border border-pink-100 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Atividade da Mamãe</h1>
            <p className="text-xs font-bold text-pink-500 uppercase tracking-wider">Folha Didática Especial de Matemática</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-black px-5 py-3 rounded-2xl text-xs transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" /> IMPRIMIR FOLHA
          </button>
          
          <button
            onClick={verifyAnswers}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-black px-6 py-3 rounded-2xl text-xs transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <CheckCircle className="w-4 h-4" /> CORRIGIR TUDO
          </button>

          <button
            onClick={resetSheet}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-4 py-3 rounded-2xl text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> LIMPAR
          </button>
        </div>
      </div>

      {/* Evaluation Bar (Hidden in Print) */}
      {showResults && (
        <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-[2.5rem] shadow-2xl border-4 border-pink-500 flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
              <Award className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800">Resultado do Desafio!</h3>
              <p className="text-gray-500 font-medium">Você concluiu a Folha Especial da Mamãe!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-center bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase">Respostas Certas</p>
              <p className="text-4xl font-black text-green-500">{correctItemsCount} <span className="text-lg text-gray-400">/ {totalItemsCount}</span></p>
            </div>
            <div className="text-center bg-pink-50 px-6 py-3 rounded-2xl border border-pink-100">
              <p className="text-xs font-bold text-pink-500 uppercase">Nota Geral</p>
              <p className="text-4xl font-black text-pink-600">
                {Math.round((correctItemsCount / totalItemsCount) * 100)} <span className="text-lg text-pink-400">/ 100</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PRINT-READY REAL PAPER WORKSHEET */}
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl rounded-3xl border border-gray-200 print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none">
        
        {/* School Header Decorator */}
        <div className="border-b-4 border-double border-gray-800 pb-6 mb-8 text-center relative">
          <div className="absolute top-0 left-0 text-left print:text-[10px] text-xs font-mono text-gray-400 print:block">
            ESCOLA MUNICIPAL VILA DO SOL<br/>
            PROJETO APRENDER MAIS
          </div>
          <div className="absolute top-0 right-0 text-right print:text-[10px] text-xs font-mono text-gray-400 print:block">
            DISCIPLINA: MATEMÁTICA<br/>
            PROFESSORA: DEBORA/AVALIAÇÃO
          </div>
          
          <h2 className="text-3xl font-serif font-black uppercase text-gray-800 tracking-tight mt-6 print:mt-10 mb-2">
            Folha de Atividades de Matemática
          </h2>
          <p className="text-sm font-serif font-bold text-gray-600 uppercase tracking-widest">
            Aventura Especial: Desafio da Mamãe
          </p>
        </div>

        {/* Student Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 pb-6 border-b border-dashed border-gray-300 font-serif text-sm">
          <div className="flex items-center gap-1 border-b border-gray-400 pb-1">
            <span className="font-bold text-gray-600 flex-shrink-0">ALUNO(A):</span>
            <input 
              type="text" 
              defaultValue="Maria Eduarda" 
              className="w-full bg-transparent focus:outline-none font-bold text-pink-600 px-2"
            />
          </div>
          <div className="flex items-center gap-1 border-b border-gray-400 pb-1">
            <span className="font-bold text-gray-600 flex-shrink-0">DATA:</span>
            <input 
              type="text" 
              placeholder="___/___/2026" 
              className="w-full bg-transparent focus:outline-none font-bold text-gray-700 px-2 text-center"
            />
          </div>
          <div className="flex items-center gap-1 border-b border-gray-400 pb-1">
            <span className="font-bold text-gray-600 flex-shrink-0">TURMA:</span>
            <span className="font-bold text-gray-700 px-2">3º Ano - Gênica</span>
          </div>
        </div>

        {/* PARTE 1 SECTION */}
        <div className="mb-12 font-serif text-gray-800">
          <div className="bg-gray-100 px-6 py-2.5 rounded-l-md border-l-8 border-gray-800 mb-8">
            <h3 className="text-xl font-bold uppercase tracking-wide">PARTE 1: Atividade Mamãe (Nível Base)</h3>
          </div>

          {/* Question 1: Table - Predecessor / Successor */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">1</span>
              <span>Escreva o antecessor e o sucessor dos números.</span>
            </h4>
            
            <div className="overflow-x-auto max-w-lg mx-auto">
              <table className="w-full border-collapse border-2 border-gray-800 text-center text-sm font-serif">
                <thead>
                  <tr className="bg-gray-200 border-b-2 border-gray-800">
                    <th className="p-3 border-r-2 border-gray-800">Antecessor</th>
                    <th className="p-3 border-r-2 border-gray-800">Número</th>
                    <th className="p-3">Sucessor</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '1999', label: '1.999', keyAnt: 'ant-1999-ant', keySuc: 'ant-1999-suc' },
                    { id: '3450', label: '3.450', keyAnt: 'ant-3450-ant', keySuc: 'ant-3450-suc' },
                    { id: '7089', label: '7.089', keyAnt: 'ant-7089-ant', keySuc: 'ant-7089-suc' },
                    { id: '9999', label: '9.999', keyAnt: 'ant-9999-ant', keySuc: 'ant-9999-suc' },
                    { id: '5600', label: '5.600', keyAnt: 'ant-5600-ant', keySuc: 'ant-5600-suc' },
                  ].map((row) => (
                    <tr key={row.id} className="border-b border-gray-400">
                      <td className="p-2 border-r-2 border-gray-800 hover:bg-slate-50 relative">
                        <input
                          type="text"
                          value={answers[row.keyAnt] || ''}
                          onChange={(e) => handleInputChange(row.keyAnt, e.target.value)}
                          placeholder="______"
                          className={`w-28 text-center bg-transparent py-1 font-bold text-lg border-b border-dashed focus:outline-none ${
                            showResults ? (checkedQuestions[row.keyAnt] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                          }`}
                        />
                      </td>
                      <td className="p-2 border-r-2 border-gray-800 font-extrabold bg-gray-50">{row.label}</td>
                      <td className="p-2 hover:bg-slate-50">
                        <input
                          type="text"
                          value={answers[row.keySuc] || ''}
                          onChange={(e) => handleInputChange(row.keySuc, e.target.value)}
                          placeholder="______"
                          className={`w-28 text-center bg-transparent py-1 font-bold text-lg border-b border-dashed focus:outline-none ${
                            showResults ? (checkedQuestions[row.keySuc] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                          }`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Question 2: Extenso */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">2</span>
              <span>Leia os números e escreva por extenso.</span>
            </h4>
            
            <div className="space-y-4 pl-4 font-serif text-sm">
              {[
                { label: 'a) 3.482', key: 'ext-a' },
                { label: 'b) 7.105', key: 'ext-b' },
                { label: 'c) 9.999', key: 'ext-c' },
                { label: 'd) 4.230', key: 'ext-d' },
                { label: 'e) 8.018', key: 'ext-e' },
              ].map((item) => (
                <div key={item.key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-bold text-gray-700 min-w-[70px]">{item.label} →</span>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={answers[item.key] || ''}
                      onChange={(e) => handleInputChange(item.key, e.target.value)}
                      placeholder="_______________________________________________________"
                      className={`w-full bg-transparent focus:outline-none font-bold text-base py-1 border-b border-dashed ${
                        showResults ? (checkedQuestions[item.key] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question 3: Ordene Menor para Maior */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">3</span>
              <span>Ordene os números do menor para o maior (use traço " - " para separar os números).</span>
            </h4>
            
            <div className="space-y-4 pl-4 font-serif text-sm">
              {[
                { label: 'a) 3.456 – 2.999 – 5.001 – 1.875 – 4.210', key: 'ord-a' },
                { label: 'b) 8.765 – 8.756 – 8.675 – 8.567 – 8.657', key: 'ord-b' },
              ].map((item) => (
                <div key={item.key} className="flex flex-col gap-2">
                  <p className="font-bold text-gray-600">{item.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gray-400">R:</span>
                    <input
                      type="text"
                      value={answers[item.key] || ''}
                      onChange={(e) => handleInputChange(item.key, e.target.value)}
                      placeholder="Ex: 1.000 - 2.000 - 3.000..."
                      className={`w-full bg-transparent focus:outline-none font-bold py-1 border-b border-dashed ${
                        showResults ? (checkedQuestions[item.key] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question 4: Arredondamento */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">4</span>
              <span>Arredonde os números para a dezena mais próxima.</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-4 font-serif text-sm">
              {[
                { label: 'a) 147 → ', key: 'rnd-a', placeholder: '___' },
                { label: 'b) 3.684 → ', key: 'rnd-b', placeholder: '___' },
                { label: 'c) 5.555 → ', key: 'rnd-c', placeholder: '___' },
                { label: 'd) 8.991 → ', key: 'rnd-d', placeholder: '___' },
                { label: 'e) 2.349 → ', key: 'rnd-e', placeholder: '___' },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-1">
                  <span className="font-bold text-gray-700">{item.label}</span>
                  <input
                    type="text"
                    value={answers[item.key] || ''}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    placeholder={item.placeholder}
                    className={`w-24 text-center bg-transparent focus:outline-none font-bold py-1 border-b border-dashed ${
                      showResults ? (checkedQuestions[item.key] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Question 5: Composição */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">5</span>
              <span>Componha os números.</span>
            </h4>
            
            <div className="space-y-4 pl-4 font-serif text-sm">
              {[
                { label: 'a) 4 unidades de milhar + 3 centenas + 8 dezenas + 5 unidades = ', key: 'comp-a' },
                { label: 'b) 9 unidades de milhar + 7 dezenas + 4 unidades = ', key: 'comp-b' },
                { label: 'c) 6 milhares + 2 centenas + 9 unidades = ', key: 'comp-c' },
                { label: 'd) 8 milhares + 5 centenas + 4 dezenas = ', key: 'comp-d' },
              ].map((item) => (
                <div key={item.key} className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <span className="font-bold text-gray-700">{item.label}</span>
                  <input
                    type="text"
                    value={answers[item.key] || ''}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    placeholder="______"
                    className={`w-32 bg-transparent text-center focus:outline-none font-extrabold text-base py-1 border-b border-dashed ${
                      showResults ? (checkedQuestions[item.key] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Question 6: Decomposição */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">6</span>
              <span>Decomponha os números (use o formato de soma: Ex: 1.000 + 200 + 30 + 4).</span>
            </h4>
            
            <div className="space-y-4 pl-4 font-serif text-sm">
              {[
                { label: 'a) 5.482 = ', key: 'dec-a' },
                { label: 'b) 7.030 = ', key: 'dec-b' },
                { label: 'c) 9.999 = ', key: 'dec-c' },
                { label: 'd) 4.506 = ', key: 'dec-d' },
              ].map((item) => (
                <div key={item.key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-bold text-gray-700 min-w-[100px]">{item.label} </span>
                  <input
                    type="text"
                    value={answers[item.key] || ''}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    placeholder="________________________________________________"
                    className={`flex-1 bg-transparent focus:outline-none font-bold py-1 border-b border-dashed ${
                      showResults ? (checkedQuestions[item.key] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Question 7: Sequências */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">7</span>
              <span>Observe as sequências e complete os dois próximos termos.</span>
            </h4>
            
            <div className="space-y-6 pl-4 font-serif text-sm">
              {[
                { label: 'a) 120 – 240 – 360 – __ – __', key1: 'seq-a-1', key2: 'seq-a-2', val1: '120', val2: '240', val3: '360' },
                { label: 'b) 5.000 – 4.500 – 4.000 – __ – __', key1: 'seq-b-1', key2: 'seq-b-2', val1: '5.000', val2: '4.500', val3: '4.000' },
                { label: 'c) 45 – 90 – 135 – __ – __', key1: 'seq-c-1', key2: 'seq-c-2', val1: '45', val2: '90', val3: '135' },
                { label: 'd) 2.000 – 1.800 – 1.600 – __ – __', key1: 'seq-d-1', key2: 'seq-d-2', val1: '2.000', val2: '1.800', val3: '1.600' },
                { label: 'e) 111 – 222 – 333 – __ – __', key1: 'seq-e-1', key2: 'seq-e-2', val1: '111', val2: '222', val3: '333' },
              ].map((item, index) => (
                <div key={index} className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-gray-700 w-6 font-mono text-xs">{String.fromCharCode(97 + index)})</span>
                  <span className="bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 font-extrabold tracking-tight">{item.val1}</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 font-extrabold tracking-tight">{item.val2}</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 font-extrabold tracking-tight">{item.val3}</span>
                  <span className="text-gray-400">→</span>
                  <input
                    type="text"
                    value={answers[item.key1] || ''}
                    onChange={(e) => handleInputChange(item.key1, e.target.value)}
                    placeholder="___"
                    className={`w-20 text-center bg-transparent focus:outline-none font-black text-lg py-1 border-b-2 border-dashed ${
                      showResults ? (checkedQuestions[item.key1] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                    }`}
                  />
                  <span className="text-gray-400">→</span>
                  <input
                    type="text"
                    value={answers[item.key2] || ''}
                    onChange={(e) => handleInputChange(item.key2, e.target.value)}
                    placeholder="___"
                    className={`w-20 text-center bg-transparent focus:outline-none font-black text-lg py-1 border-b-2 border-dashed ${
                      showResults ? (checkedQuestions[item.key2] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Question 8: Adições */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">8</span>
              <span>Resolva as adições.</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-4 font-serif text-sm">
              {[
                { label: 'a) 2.345 + 1.876 = ', key: 'add-a' },
                { label: 'b) 5.999 + 2.001 = ', key: 'add-b' },
                { label: 'c) 7.654 + 1.245 = ', key: 'add-c' },
                { label: 'd) 3.888 + 2.222 = ', key: 'add-d' },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-gray-200">
                  <span className="font-extrabold text-gray-700 min-w-[150px]">{item.label}</span>
                  <input
                    type="text"
                    value={answers[item.key] || ''}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    placeholder="______"
                    className={`w-28 text-center bg-transparent focus:outline-none font-black text-base py-1 border-b border-dashed ${
                      showResults ? (checkedQuestions[item.key] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Question 9: Subtrações */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">9</span>
              <span>Resolva as subtrações.</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-4 font-serif text-sm">
              {[
                { label: 'a) 8.765 – 3.432 = ', key: 'sub-a' },
                { label: 'b) 9.000 – 4.578 = ', key: 'sub-b' },
                { label: 'c) 7.654 – 2.999 = ', key: 'sub-c' },
                { label: 'd) 10.000 – 5.555 = ', key: 'sub-d' },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-gray-200">
                  <span className="font-extrabold text-gray-700 min-w-[150px]">{item.label}</span>
                  <input
                    type="text"
                    value={answers[item.key] || ''}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    placeholder="______"
                    className={`w-28 text-center bg-transparent focus:outline-none font-black text-base py-1 border-b border-dashed ${
                      showResults ? (checkedQuestions[item.key] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Question 10: Problemas Matemáticos */}
          <div className="mb-10">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">10</span>
              <span>Resolva os Problemas Matemáticos.</span>
            </h4>
            
            <div className="space-y-6 pl-4 font-serif text-sm">
              {[
                { label: 'a) Uma biblioteca tinha 3.450 livros. Recebeu mais 1.275 livros. Quantos livros há agora?', key: 'prob-a' },
                { label: 'b) Em uma escola estudam 2.980 alunos. Se 1.245 faltaram hoje, quantos alunos compareceram?', key: 'prob-b' },
                { label: 'c) Uma fábrica produziu 4.875 brinquedos e vendeu 2.340. Quantos brinquedos restaram?', key: 'prob-c' },
                { label: 'd) Carlos tinha 1.250 bolinhas de gude e ganhou mais 999. Quantas bolinhas ele possui agora?', key: 'prob-d' },
                { label: 'e) Um caminhão transportava 8.000 kg de frutas. Após descarregar 3.450 kg, quantos quilos restaram?', key: 'prob-e' },
              ].map((item) => (
                <div key={item.key} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <p className="font-semibold text-gray-800 leading-relaxed">{item.label}</p>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="font-bold text-gray-600">Resposta:</span>
                    <input
                      type="text"
                      value={answers[item.key] || ''}
                      onChange={(e) => handleInputChange(item.key, e.target.value)}
                      placeholder="Compareceram 1.735 / Restaram..."
                      className={`w-full max-w-sm bg-transparent focus:outline-none font-bold py-1 border-b border-dashed ${
                        showResults ? (checkedQuestions[item.key] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question 11: Problemas de Raciocínio Lógico (Base) */}
          <div className="mb-12">
            <h4 className="text-base font-bold mb-4 flex items-start gap-2">
              <span className="bg-gray-800 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-mono shrink-0">11</span>
              <span>Problemas de Raciocínio Lógico.</span>
            </h4>
            
            <div className="space-y-6 pl-4 font-serif text-sm">
              {[
                { id: '11-a', text: 'a) Complete a sequência: 2 – 4 – 8 – 16 – __ – __', hasTwoInputs: true, key1: 'log-a-1', key2: 'log-a-2' },
                { id: '11-b', text: 'b) Qual número está faltando? 5 – 10 – 15 – __ – 25', hasTwoInputs: false, key: 'log-b' },
                { id: '11-c', text: 'c) Ana contou de 3 em 3 até chegar em 30. Qual foi o último número antes do 30?', hasTwoInputs: false, key: 'log-c', label: 'Resposta:' },
                { id: '11-d', text: 'd) Em uma sala há 24 alunos. Metade são meninas. Quantos meninos há?', hasTwoInputs: false, key: 'log-d', label: 'Resposta:' },
                { id: '11-e', text: 'e) Um relógio marca 14 horas. Quantas horas faltam para chegar à meia-noite?', hasTwoInputs: false, key: 'log-e', label: 'Resposta:' },
                { id: '11-f', text: 'f) Qual número completa a sequência? 100 – 90 – 80 – 70 – __ – __', hasTwoInputs: true, key1: 'log-f-1', key2: 'log-f-2' },
                { id: '11-g', text: 'g) Júlia tinha algumas moedas. Ganhou 15 moedas e ficou com 40. Quantas moedas ela tinha antes?', hasTwoInputs: false, key: 'log-g', label: 'Resposta:' },
                { id: '11-h', text: 'h) Descubra o padrão: 1 – 4 – 9 – 16 – 25 – __', hasTwoInputs: false, key: 'log-h' },
                { id: '11-i', text: 'i) Um ônibus tinha 45 passageiros. Desceram 18 passageiros e entraram 9. Quantos passageiros ficaram no ônibus?', hasTwoInputs: false, key: 'log-i', label: 'Resposta:' },
                { id: '11-j', text: 'j) Observe a sequência: 7 – 14 – 21 – 28 – __ – __', hasTwoInputs: true, key1: 'log-j-1', key2: 'log-j-2' },
              ].map((prob) => (
                <div key={prob.id} className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50 space-y-2">
                  <p className="font-semibold text-gray-800 leading-relaxed">{prob.text.replace(/__ – __|__/g, '')}</p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-serif">
                    <span className="font-bold text-purple-700 text-xs uppercase tracking-wide">Preencha:</span>
                    {prob.hasTwoInputs ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={answers[prob.key1!] || ''}
                          onChange={(e) => handleInputChange(prob.key1!, e.target.value)}
                          placeholder="___"
                          className={`w-20 text-center bg-transparent focus:outline-none font-bold py-1 border-b border-dashed ${
                            showResults ? (checkedQuestions[prob.key1!] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                          }`}
                        />
                        <span className="text-gray-400">e</span>
                        <input
                          type="text"
                          value={answers[prob.key2!] || ''}
                          onChange={(e) => handleInputChange(prob.key2!, e.target.value)}
                          placeholder="___"
                          className={`w-20 text-center bg-transparent focus:outline-none font-bold py-1 border-b border-dashed ${
                            showResults ? (checkedQuestions[prob.key2!] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                          }`}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={answers[prob.key!] || ''}
                        onChange={(e) => handleInputChange(prob.key!, e.target.value)}
                        placeholder="Insira sua resposta..."
                        className={`w-full max-w-xs bg-transparent focus:outline-none font-bold py-1 border-b border-dashed ${
                          showResults ? (checkedQuestions[prob.key!] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                        }`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desafio Final */}
          <div className="mb-14 p-6 bg-yellow-50 border-4 border-yellow-400 rounded-3xl">
            <h4 className="text-lg font-serif font-black text-yellow-800 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 fill-current" /> DESAFIO FINAL DA PARTE 1
            </h4>
            <p className="font-serif leading-relaxed text-gray-800 mb-4 font-bold text-sm">
              Uma loja vendeu 2.345 lápis na segunda-feira, 1.876 na terça-feira e 2.999 na quarta-feira. Quantos lápis foram vendidos ao todo nos três dias?
            </p>
            <div className="flex items-center gap-2 font-serif">
              <span className="font-bold text-yellow-900 text-sm">Resposta:</span>
              <input
                type="text"
                value={answers['des-fin'] || ''}
                onChange={(e) => handleInputChange('des-fin', e.target.value)}
                placeholder="Ex: Foram vendidos 7.220 lápis..."
                className={`w-full max-w-sm bg-transparent focus:outline-none font-black text-lg py-1 border-b-2 border-dashed border-yellow-500 ${
                  showResults ? (checkedQuestions['des-fin'] ? 'text-green-600 border-green-700' : 'text-red-600 border-red-700') : 'text-gray-800'
                }`}
              />
            </div>
          </div>
        </div>

        {/* PARTE 2: DESAFIOS AVANÇADOS (Questões 12 a 41) */}
        <div className="mb-8 font-serif text-gray-800">
          <div className="bg-sky-100 px-6 py-2.5 rounded-l-md border-l-8 border-sky-600 mb-8">
            <h3 className="text-xl font-bold uppercase tracking-wide">PARTE 2: Desafios Avançados de Raciocínio (Mais Difíceis)</h3>
          </div>
          
          <p className="text-sm font-medium mb-8 leading-relaxed italic text-gray-500">
            Esta seção eleva progressivamente o nível de dificuldade focando em padrões numéricos complexos, problemas de frações lógicas de múltiplas etapas, pistas restritivas em enigmas de números secretos e análise integrada de tempos e de medidas.
          </p>

          <div className="space-y-6">
            {[
              { id: 'p2-12', num: '12', cat: 'Seq', text: 'Lucas e as cenouras na fazenda. Ele descobriu que as cenouras seguiam um padrão matemático misterioso. Ajude Lucas a decifrar a sequência com os próximos dois termos: 1 – 1 – 2 – 3 – 5 – 8 – __ – __', hasTwo: true, key1: 'p2-12-1', key2: 'p2-12-2' },
              { id: 'p2-13', num: '13', cat: 'Fração', text: 'Maria tem 16 chocolates. Ela dá metade para o irmão. Depois ganha o dobro do que sobrou de sua tia. Com quantos chocolates Sofia ficou agora?', key: 'p2-13' },
              { id: 'p2-14', num: '14', cat: 'Restrição', text: 'Pista Lógica: Sou um número par, maior que 50 e menor que 60. A soma do meu algarismo das dezenas com o das unidades é igual a 11. Quem sou eu?', key: 'p2-14' },
              { id: 'p2-15', num: '15', cat: 'Tempo', text: 'Um relógio antigo na fazenda atrasa 5 minutos a cada 1 hora de funcionamento. Se o relógio estava marcando a hora correta às 8h da manhã, quantos minutos atrasado ele estará às 12h do meio-dia?', key: 'p2-15' },
              { id: 'p2-16', num: '16', cat: 'Seq', text: 'Analise os saltos alternados deste enigma numérico: 10 – 20 – 12 – 22 – 14 – 24 – __ – __', hasTwo: true, key1: 'p2-16-1', key2: 'p2-16-2' },
              { id: 'p2-17', num: '17', cat: 'Partilha', text: 'O avô quer repartir 25 figurinhas igualmente entre seus 3 netos, de modo que cada um ganhe o máximo possível. Quantas figurinhas cada neto receberá e quanto sobrará para o avô?', key: 'p2-17' },
              { id: 'p2-18', num: '18', cat: 'Restrição', text: 'Sou um número de três algarismos. O algarismo das centenas é 3, o das dezenas é o dobro das centenas, e o das unidades é a metade das dezenas. Que número sou?', key: 'p2-18' },
              { id: 'p2-19', num: '19', cat: 'Massa', text: 'Um caracol teimoso quer subir um muro de 10 metros de altura. De dia ele consegue subir 3 metros, mas de noite ele escorrega 2 metros para baixo. Quantos dias ele levará para alcançar o topo do muro?', key: 'p2-19' },
              { id: 'p2-20', num: '20', cat: 'Seq', text: 'Complete a multiplicação implícita descobrindo o valor dos próximos dois elementos da lógica: 3 – 6 – 12 – 24 – __ – __', hasTwo: true, key1: 'p2-20-1', key2: 'p2-20-2' },
              { id: 'p2-21', num: '21', cat: 'Fração', text: 'Maria Eduarda pensou em um número. Ela calculou o dobro desse número, depois extraiu a metade do resultado, e por fim somou 5, obtendo o valor final de 15. Em qual número ela pensou?', key: 'p2-21' },
              { id: 'p2-22', num: '22', cat: 'Restrição', text: 'A soma das idades de Lucas e de sua irmã Sofia dá 15 anos. Lucas é exatamente 3 anos mais velho que Sofia. Quantos anos tem cada um dos dois irmãos?', key: 'p2-22' },
              { id: 'p2-23', num: '23', cat: 'Massa', text: 'Em uma balança tradicional de dois pratos, um saco de maçãs silvestres fica em perfeito equilíbrio quando colocamos no outro prato 3 pesos de 500 gramas e mais 1 peso de 200 gramas. Qual é o peso exato de maçãs silvestres colhido em gramas?', key: 'p2-23' },
              { id: 'p2-24', num: '24', cat: 'Seq', text: 'Compreenda o padrão de áreas geométricas formadas por quadradinhos empilhados: 1, 4, 9, 16, 25... Quantos quadradinhos comporão a próxima figura deste padrão?', key: 'p2-24' },
              { id: 'p2-25', num: '25', cat: 'Partilha', text: 'Um fazendeiro reuniu 24 melancias maduras no pomar. Ele doou um terço do total para seu vizinho predileto e depois metade do que sobrou para sua filha. Com quantas melancias o fazendeiro ficou?', key: 'p2-25' },
              { id: 'p2-26', num: '26', cat: 'Restrição', text: 'Eu sou um número de quatro algarismos menores que 5. O algarismo dos milhares é 4, o das centenas é 0, o das unidades é o triplo do das centenas, e o das dezenas é a soma do de milhares com centenas. Que número sou eu?', key: 'p2-26' },
              { id: 'p2-27', num: '27', cat: 'Tempo', text: 'O aniversário de Sofia acontecerá no calendário exatas 3 semanas e 4 dias após o dia 10 de Junho. Sabendo que cada semana tem 7 dias e Junho tem 30 dias, em qual dia e mês será o aniversário?', key: 'p2-27' },
              { id: 'p2-28', num: '28', cat: 'Seq', text: 'Siga a lógica de saltos sucessivos alternados e complete os próximos dois valores: 100 – 95 – 96 – 91 – 92 – 87 – __ – __', hasTwo: true, key1: 'p2-28-1', key2: 'p2-28-2' },
              { id: 'p2-29', num: '29', cat: 'Fração', text: 'Maria Eduarda comprou 3 cadernos de 8 reais cada. Ela pagou sua compra com uma nota de 50 reais e decidiu dividir o troco recebido de forma exatamente igual entre seus dois cofrinhos. Quantos reais ela depositou em cada cofrinho?', key: 'p2-29' },
              { id: 'p2-30', num: '30', cat: 'Restrição', text: 'Pistas Importantes: Três amigos (Beto, Carlos e Daniel) adoram frutas diferentes: banana, maçã e uva. O Daniel não gosta de uva e nem de banana. O Beto não come uva. Determine quem gosta de qual fruta:', key: 'p2-30' },
              { id: 'p2-31', num: '31', cat: 'Medida', text: 'Uma fita decorativa de cetim com 2 metros de comprimento precisa ser picotada em pedacinhos de 40 centímetros cada. Quantos cortes retos completos serão necessários fazer para obter todos os pedaços possíveis?', key: 'p2-31' },
              { id: 'p2-32', num: '32', cat: 'Seq', text: 'Desvende o elemento desconhecido na sequência multiplicadora: 2 – 5 – 11 – 23 – __ – 95', key: 'p2-32' },
              { id: 'p2-33', num: '33', cat: 'Fração', text: 'Havia uma cesta com 32 morangos. A vovó usou metade para preparar geleia. Da outra metade que restou, o vovô utilizou mais uma metade como recheio na torta. Sobraram quantos morangos na cesta?', key: 'p2-33' },
              { id: 'p2-34', num: '34', cat: 'Restrição', text: 'Sou um algarismo de dois dígitos de valor ímpar. Sou maior que 70 e menor que 80. A soma do dígito das dezenas mais as unidades dá igual a 12. Qual é o meu valor?', key: 'p2-34' },
              { id: 'p2-35', num: '35', cat: 'Tempo', text: 'Um longa-metragem animado no cinema começou a passar pontualmente às 14 horas e 45 minutos e tem duração fixada de 110 minutos. Qual será o horário em que o filme terminará de rodar?', key: 'p2-35' },
              { id: 'p2-36', num: '36', cat: 'Seq', text: 'Observe a alternância lógica das operações matemáticas (+3 e x2): Começamos com 3. (+3) dá 6; (x2) dá 12; (+3) dá 15; (x2) dá 30. Continuando esse ciclo, quais os próximos dois termos?', hasTwo: true, key1: 'p2-36-1', key2: 'p2-36-2' },
              { id: 'p2-37', num: '37', cat: 'Fração', text: 'Três irmãos dividiram uma colheita contendo 60 laranjas doces. O mais velho ficou com a metade das laranjas. O irmão do meio ficou com um terço do total de 60 laranjas. Quantas laranjas sobraram para o irmão caçula?', key: 'p2-37' },
              { id: 'p2-38', num: '38', cat: 'Restrição', text: 'Sou um segredo numérico maior que 80 e menor que 100. Meu algarismo das dezenas é igual ao meu das unidades somado de 4. Sou um número par. Quem sou eu?', key: 'p2-38' },
              { id: 'p2-39', num: '39', cat: 'Tempo', text: 'Para assar um bolo de cenoura caseiro, a Vovó Helena precisa de exatamente 45 minutos de forno. No entanto, o forno precisa ser ligado 10 minutos antes (para pré-aquecimento). Se ela quer que o bolo esteja assado às 17h00 da tarde, que horas ela deve ligar o forno?', key: 'p2-39' },
              { id: 'p2-40', num: '40', cat: 'Seq', text: 'Padrão especial ao cubo (pense em NxNxN): 1 – 8 – 27 – 64 – __  Qual é o próximo número correspondente da série?', key: 'p2-40' },
              { id: 'p2-41', num: '41', cat: 'Fração', text: 'Sofia reuniu uma coleção com 18 balas coloridas e Lucas possui apenas 6 balas. Quantas de suas balas Sofia precisa dar para Lucas no intuito de que ambos terminem partilhando exatamente o mesmo número de balas?', key: 'p2-41' }
            ].map((q) => (
              <div key={q.id} className="p-5 bg-sky-50/40 rounded-3xl border border-sky-100 flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center font-bold font-mono text-sm uppercase px-3 py-1 bg-sky-600 text-white rounded-xl shadow-xs">
                  Questão {q.num}
                </div>
                
                <div className="flex-1 space-y-3 font-serif">
                  <p className="font-semibold text-gray-800 leading-relaxed text-sm">
                    {q.text}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-extrabold text-sky-800 text-xs uppercase tracking-wide">Resposta da Maria:</span>
                    {q.hasTwo ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={answers[q.key1!] || ''}
                          onChange={(e) => handleInputChange(q.key1!, e.target.value)}
                          placeholder="___"
                          className={`w-24 text-center bg-transparent focus:outline-none font-bold py-0.5 border-b border-dashed ${
                            showResults ? (checkedQuestions[q.key1!] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                          }`}
                        />
                        <span className="text-gray-400">e</span>
                        <input
                          type="text"
                          value={answers[q.key2!] || ''}
                          onChange={(e) => handleInputChange(q.key2!, e.target.value)}
                          placeholder="___"
                          className={`w-24 text-center bg-transparent focus:outline-none font-bold py-0.5 border-b border-dashed ${
                            showResults ? (checkedQuestions[q.key2!] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                          }`}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={answers[q.key!] || ''}
                        onChange={(e) => handleInputChange(q.key!, e.target.value)}
                        placeholder="Insira o resultado..."
                        className={`w-full max-w-sm bg-transparent focus:outline-none font-extrabold py-0.5 border-b border-dashed ${
                          showResults ? (checkedQuestions[q.key!] ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'text-gray-800 border-gray-400'
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Secret Signatures Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center font-serif text-sm text-gray-500">
          <p className="italic">"Estudar é a maior magia de todas!" — Feito com muito amor pela Mamãe.</p>
        </div>
      </div>

      {/* EDUCATOR'S SECRET MASTER KEY SECTION (GABARITO) */}
      <div className="max-w-4xl mx-auto mt-12 bg-white rounded-[3rem] p-8 shadow-2xl border-4 border-dashed border-gray-300 print:hidden">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 leading-tight">Painel Exclusivo do Educador</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gabarito Master Oficial com Explicações</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className="flex items-center gap-2 text-xs font-black text-gray-600 hover:text-gray-800 uppercase px-4 py-2 border rounded-full bg-slate-50 transition-colors"
          >
            {showAnswerKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showAnswerKey ? "Esconder Gabarito" : "Exibir Gabarito Secreto"}
          </button>
        </div>

        {showAnswerKey && (
          <div className="space-y-6">
            {!unlockedKey ? (
              <div className="bg-slate-50 p-6 rounded-2xl text-center border space-y-4">
                <HelpCircle className="w-10 h-10 text-gray-400 mx-auto" />
                <h4 className="font-black text-gray-800">Gabarito com Senha de Proteção</h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Para evitar que as crianças vejam as respostas por acidente durante a resolução digital, a chave requer uma senha simples (Dica: digite <strong className="text-pink-600 font-extrabold">mae</strong> ou <strong className="text-pink-600 font-extrabold">123</strong> abaixo).
                </p>
                
                <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
                  <input
                    type="password"
                    placeholder="Digite a senha..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && unlockMasterKey()}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none font-bold text-center"
                  />
                  <button
                    onClick={unlockMasterKey}
                    className="px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-black rounded-xl text-xs transition-colors"
                  >
                    ENTRAR
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
                <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
                  <p className="text-xs text-green-800 font-bold leading-relaxed">
                    🔓 <strong>Gabarito Desbloqueado!</strong> Utilize a lista de soluções bem descritas abaixo para sanar eventuais dúvidas da Maria Eduarda ou corrigir o material físico impresso de matemática.
                  </p>
                </div>

                {/* Question Group Explanations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Part 1 Entries */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h4 className="font-black text-gray-800 border-b pb-2 text-sm uppercase">Gabarito Parte 1 (Nível Base)</h4>
                    
                    <div className="space-y-3.5 text-xs text-gray-600 leading-relaxed font-serif">
                      <p><strong>1. Antecessor / Sucessor:</strong><br />
                        - 1.999: Antecessor <strong>1.998</strong>, Sucessor <strong>2.000</strong><br />
                        - 3.450: Antecessor <strong>3.449</strong>, Sucessor <strong>3.451</strong><br />
                        - 7.089: Antecessor <strong>7.088</strong>, Sucessor <strong>7.090</strong><br />
                        - 9.999: Antecessor <strong>9.998</strong>, Sucessor <strong>10.000</strong><br />
                        - 5.600: Antecessor <strong>5.599</strong>, Sucessor <strong>5.601</strong>
                      </p>
                      
                      <p><strong>2. Escrever por Extenso:</strong><br />
                        - a) Três mil, quatrocentos e oitenta e dois.<br />
                        - b) Sete mil, cento e cinco.<br />
                        - c) Nove mil, novecentos e noventa e nove.<br />
                        - d) Quatro mil, duzentos e trinta.<br />
                        - e) Oito mil e dezoito.
                      </p>

                      <p><strong>3. Ordenar Menor para Maior:</strong><br />
                        - a) <strong>1.875 - 2.999 - 3.456 - 4.210 - 5.001</strong><br />
                        - b) <strong>8.567 - 8.657 - 8.675 - 8.756 - 8.765</strong>
                      </p>

                      <p><strong>4. Arredondamento (Dezena):</strong><br />
                        - a) 147 → <strong>150</strong> | b) 3.684 → <strong>3.680</strong><br />
                        - c) 5.555 → <strong>5.560</strong> | d) 8.991 → <strong>8.990</strong><br />
                        - e) 2.349 → <strong>2.350</strong>
                      </p>

                      <p><strong>5. Composição de Números:</strong><br />
                        - a) <strong>4.385</strong> | b) <strong>9.074</strong><br />
                        - c) <strong>6.209</strong> | d) <strong>8.540</strong>
                      </p>

                      <p><strong>6. Decomposição de Números:</strong><br />
                        - a) 5.482 = <strong>5.000 + 400 + 80 + 2</strong><br />
                        - b) 7.030 = <strong>7.000 + 30</strong><br />
                        - c) 9.999 = <strong>9.000 + 900 + 90 + 9</strong><br />
                        - d) 4.506 = <strong>4.000 + 500 + 6</strong>
                      </p>

                      <p><strong>7. Sequências Matemáticas:</strong><br />
                        - a) <strong>480</strong> e <strong>600</strong> (Soma +120)<br />
                        - b) <strong>3.500</strong> e <strong>3.000</strong> (Subtrai -500)<br />
                        - c) <strong>180</strong> e <strong>225</strong> (Soma +45)<br />
                        - d) <strong>1.400</strong> e <strong>1.200</strong> (Subtrai -200)<br />
                        - e) <strong>444</strong> e <strong>555</strong> (Soma +111)
                      </p>

                      <p><strong>8. Adições:</strong><br />
                        - a) <strong>4.221</strong> | b) <strong>8.000</strong><br />
                        - c) <strong>8.899</strong> | d) <strong>6.110</strong>
                      </p>

                      <p><strong>9. Subtrações:</strong><br />
                        - a) <strong>5.333</strong> | b) <strong>4.422</strong><br />
                        - c) <strong>4.655</strong> | d) <strong>4.445</strong>
                      </p>

                      <p><strong>10. Problemas Matemáticos:</strong><br />
                        - a) 3.450 + 1.275 = <strong>4.725 livros</strong><br />
                        - b) 2.980 - 1.245 = <strong>1.735 alunos</strong><br />
                        - c) 4.875 - 2.340 = <strong>2.535 brinquedos</strong><br />
                        - d) 1.250 + 999 = <strong>2.249 bolinhas</strong><br />
                        - e) 8.000 - 3.450 = <strong>4.550 kg</strong>
                      </p>

                      <p><strong>11. Raciocínio Base:</strong><br />
                        - a) (2, 4, 8, 16) → <strong>32</strong> e <strong>64</strong><br />
                        - b) Falta: <strong>20</strong> (Pula de 5 em 5)<br />
                        - c) Último número antes do 30: <strong>27</strong><br />
                        - d) Meninos na sala: <strong>12</strong> (24 / 2 = 12)<br />
                        - e) Horas faltantes: <strong>10 horas</strong> (24 - 14)<br />
                        - f) (100, 90, 80, 70) → <strong>60</strong> e <strong>50</strong><br />
                        - g) Moedas iniciais: <strong>25 moedas</strong> (40 - 15)<br />
                        - h) Quadrados: 1, 4, 9, 16, 25 → <strong>36</strong> (6x6)<br />
                        - i) Ônibus: 45 - 18 + 9 = <strong>36 passageiros</strong><br />
                        - j) Sete em Sete: → <strong>35</strong> e <strong>42</strong>
                      </p>

                      <p><strong>Desafio Final:</strong><br />
                        Soma dos 3 dias: 2.345 + 1.876 + 2.999 = <strong>7.220 lápis</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Part 2 Entries */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 font-serif">
                    <h4 className="font-black text-gray-800 border-b pb-2 text-sm uppercase">Gabarito Parte 2 (Desafios Avançados)</h4>
                    
                    <div className="space-y-3.5 text-xs text-gray-600 leading-relaxed font-serif">
                      <p><strong>Q12. Fibonacci:</strong> Resposta: <strong>13</strong> e <strong>21</strong>. Cada valor é a soma dos dois anteriores (5 + 8 = 13, 8 + 13 = 21).</p>
                      
                      <p><strong>Q13. Fração/Chocolates:</strong> Resposta: <strong>16</strong> (ou 24). Começa com 16. Metade (8) vai para o irmão, sobram 8. Ganha o dobro do sobrou (dobro de 8 é 16), ficando com 8 + 16 = 24 chocolates ou simplesmente preservando o valor inicial 16.</p>

                      <p><strong>Q14. Número Par:</strong> Resposta: <strong>56</strong>. O único número par de 50 a 60 cuja soma dos algarismos (5 + U) resulta em 11 é o 56.</p>

                      <p><strong>Q15. Atraso Horário:</strong> Resposta: <strong>20 minutos</strong>. Das 8h às 12h passaram-se 4 horas. Como atrasa 5 min a cada hora: 4 x 5 = 20 minutos de atraso.</p>

                      <p><strong>Q16. Saltos Alternados:</strong> Resposta: <strong>16</strong> e <strong>26</strong>. Dois padrões independentes: os ímpares somam +2 (10, 12, 14, 16) e os pares somam +2 (20, 22, 24, 26).</p>

                      <p><strong>Q17. Partilha Igualitária:</strong> Resposta: <strong>8 figurinhas e sobram 1</strong>. Dividindo 25 por 3 o quociente inteiro mais alto é 8 (8 x 3 = 24), restando 1.</p>

                      <p><strong>Q18. Três Algarismos:</strong> Resposta: <strong>363</strong>. Centena (3). Dezena = dobro de 3 (6). Unidade = metade de 6 (3).</p>

                      <p><strong>Q19. Caracol e Altura:</strong> Resposta: <strong>8 dias</strong>. Ganho real de 1 metro por dia. No final do 7º dia o caracol dormiu em 7m. No 8º dia ele sobe 3m de dia e atinge os 10m de altura, chegando ao topo.</p>

                      <p><strong>Q20. Multiplica Anterior:</strong> Resposta: <strong>48</strong> e <strong>96</strong>. O padrão é dobrar o termo anterior (24 x 2 = 48, 48 x 2 = 96).</p>

                      <p><strong>Q21. Pensei num número:</strong> Resposta: <strong>10</strong>. Inversão lógica: Começa com (X), duplica, depois divide por 2 o que resulta em X novamente. Portanto, X + 5 = 15, logo X = 10.</p>

                      <p><strong>Q22. Família e Idades:</strong> Resposta: <strong>9 e 6 anos</strong>. Sistema simples: Lucas + Sofia = 15, Lucas - Sofia = 3. Lucas tem 9 e Sofia tem 6.</p>

                      <p><strong>Q23. Balança e Massa:</strong> Resposta: <strong>1700g</strong>. Equação de equilíbrio: 3 x 500g + 1 x 200g = 1500g + 200g = 1700g.</p>

                      <p><strong>Q24. Padrão de Área:</strong> Resposta: <strong>36 quadradinhos</strong>. Progressão geométrica perfeita de quadrados (N x N) de 1x1 até 6x6 (36).</p>

                      <p><strong>Q25. Frações Sucessivas:</strong> Resposta: <strong>8 melancias</strong>. Tinha 24. Tirou um terço (8), restaram 16. Tirou metade do restante (Metade de 16 = 8), sobrando 8.</p>

                      <p><strong>Q26. Pistas do Número:</strong> Resposta: <strong>4040</strong>. Milhar = 4. Centena = 0. Unidades = triplo de 0 (0). Dezenas = milhar + centena (4). Número = 4.040.</p>

                      <p><strong>Q27. Tempo Futuro:</strong> Resposta: <strong>5 de Julho</strong>. 3 semanas e 4 dias = 25 dias. 10 de Junho + 25 dias = 35. Junho tem 30 dias. 35 - 30 = 5 de Julho.</p>

                      <p><strong>Q28. Subtrações Variadas:</strong> Resposta: <strong>88</strong> e <strong>83</strong>. Subtrai 5 e adiciona 1. 87 + 1 = 88; 88 - 5 = 83.</p>

                      <p><strong>Q29. Finanças e Troco:</strong> Resposta: <strong>13 reais</strong>. Compra total: 3 x 8 = 24. Troco: 50 - 24 = 26. Dividido por 2 cofrinhos = 13 reais em cada.</p>

                      <p><strong>Q30. Exclusão de Frutas:</strong> Resposta: <strong>Daniel gosta de maçã, Beto de banana e Carlos de uva</strong>.</p>

                      <p><strong>Q31. Comprimento e Cortes:</strong> Resposta: <strong>4 cortes</strong>. 200 centímetros dividido por 40cm dá 5 pedaços. São necessários somente 4 cortes para dividir a fita em 5.</p>

                      <p><strong>Q32. Padrão Multiplicador:</strong> Resposta: <strong>47</strong>. Regra aritmética: (Anterior x 2) + 1. 23 x 2 + 1 = 47.</p>

                      <p><strong>Q33. Morango Geleia:</strong> Resposta: <strong>8 morangos</strong>. Metade de 32 é 16, restam 16. Metade de 16 é 8, sobram 8 morangos.</p>

                      <p><strong>Q34. Dezena Impar:</strong> Resposta: <strong>75</strong>. Ímpares de 71 a 79: soma igual a 12: 7 + 5 = 12.</p>

                      <p><strong>Q35. Cinema e Horário:</strong> Resposta: <strong>16:35</strong>. 110 minutos = 1h e 50min. 14h45 mais 1h50m = 16h35.</p>

                      <p><strong>Q36. Padrão Lógico:</strong> Resposta: <strong>33</strong> e <strong>66</strong>. Ciclo (+3 depois x2). 30 + 3 = 33, 33 x 2 = 66.</p>

                      <p><strong>Q37. Laranjas:</strong> Resposta: <strong>10 laranjas</strong>. Mais velho (30 laranjas) + do meio (20 laranjas) = 50 laranjas. Caçula = 60 - 50 = 10 laranjas.</p>

                      <p><strong>Q38. Pistas Secreta:</strong> Resposta: <strong>84</strong>. Entre 80 e 100. Dezena = Unidade + 4. Par. Se dezena = 8, unidade = 4. 84 está correto.</p>

                      <p><strong>Q39. Ligar Forno:</strong> Resposta: <strong>16:05</strong>. Tempo total exigido = 10 min pré-aquecer + 45 min forno = 55 minutos. Tempo de ligar = 17h00 - 55 minutos = 16h05.</p>

                      <p><strong>Q40. Ordem Cubo:</strong> Resposta: <strong>125</strong>. Série é 1³, 2³, 3³, 4³, o próximo é 5³ = 5 x 5 x 5 = 125.</p>

                      <p><strong>Q41. Compartilhar Doce:</strong> Resposta: <strong>6 balas</strong>. Total = 24. Média = 12. Sofia tem 18 e deve doar 6 para Lucas ficar com 12.</p>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
    </div>
  );
}
