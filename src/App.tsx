import { useState, useEffect } from 'react';
import { 
  ArrowUpDown, Circle, Repeat, Plus, Minus, Box, Hash, 
  Trophy, Star, Gift, Book, Home, Youtube, MessageCircle,
  ChevronRight, CheckCircle2, XCircle, LogOut, Loader2,
  Volume2, VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  onAuthStateChanged, 
  User as FirebaseUser,
  signOut
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db, loginWithGoogle } from './lib/firebase';
import { cn } from './lib/utils';
import { VictoryCelebration } from './components/VictoryCelebration';
import { EXERCISES } from './data/exercises';
import { CATEGORIES, REWARDS, Category, Exercise, UserProfile } from './types';
import { playSound, SOUNDS } from './lib/audio';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const GUEST_UID = 'guest_maria_eduarda';
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [showDidacticIntro, setShowDidacticIntro] = useState(false);
  const [exerciseForIntro, setExerciseForIntro] = useState<Exercise | null>(null);
  const [selectedCategoryForList, setSelectedCategoryForList] = useState<Category | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showReviewList, setShowReviewList] = useState(false);
  const [selectedPathIndex, setSelectedPathIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => setIsMuted(prev => !prev);

  const playEffect = (key: keyof typeof SOUNDS) => {
    if (!isMuted) playSound(key as any);
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        await fetchProfile(u.uid);
      } else {
        // Fallback to guest profile if not logged in
        await fetchProfile(GUEST_UID);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchProfile = async (uid: string) => {
    let currentProfile: UserProfile | null = null;
    
    try {
      // First, try to load from localStorage as a quick fallback
      const localData = localStorage.getItem(`profile_${uid}`);
      if (localData) {
        currentProfile = JSON.parse(localData);
        setProfile(currentProfile);
      }

      const docRef = doc(db, 'users', uid);
      
      // Use getDoc - it will try cache first if configured
      let docSnap;
      try {
        docSnap = await getDoc(docRef);
      } catch (e) {
        console.warn("Firestore getDoc failed (possibly offline):", e);
        // If it failed, we rely on localData which might already be in currentProfile
      }
      
      if (docSnap && docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        currentProfile = data;
        setProfile(data);
        localStorage.setItem(`profile_${uid}`, JSON.stringify(data));
      } else if (!currentProfile) {
        // Only create new if we don't even have local data
        const newProfile: UserProfile = {
          name: 'Maria Eduarda',
          points: 0,
          levels: { order: 0, rounding: 0, regularity: 0, arithmetic: 0, composition: 0, sequence: 0 },
          unlockedRewards: [],
          wrongExerciseIds: []
        };
        // Try to save to Firestore, but don't block
        setDoc(docRef, newProfile).catch(e => console.warn("Could not save new profile to Firestore:", e));
        currentProfile = newProfile;
        setProfile(newProfile);
        localStorage.setItem(`profile_${uid}`, JSON.stringify(newProfile));
      }
    } catch (error) {
      console.error("Error in fetchProfile:", error);
    } finally {
      // Ensure we have AT LEAST a default profile to avoid white/loading screen
      if (!currentProfile && !profile) {
        const defaultProfile: UserProfile = {
          name: 'Maria Eduarda',
          points: 0,
          levels: { order: 0, rounding: 0, regularity: 0, arithmetic: 0, composition: 0, sequence: 0 },
          unlockedRewards: [],
          wrongExerciseIds: []
        };
        setProfile(defaultProfile);
      }
      setLoading(false);
    }
  };

  const handleAnswer = async (option: string) => {
    if (!currentExercise || feedback || !profile) return;
    const uid = user?.uid || GUEST_UID;

    const correctOption = (selectedPathIndex !== null && currentExercise.narrativePaths?.[selectedPathIndex].correctOptionOverride) 
      || currentExercise.correctOption;

    const isCorrect = option === correctOption;
    setSessionResults(prev => [...prev, { id: currentExercise.id, correct: isCorrect }]);
    
    if (isCorrect) {
      playEffect(SOUNDS.SUCCESS);
      setShowVictory(true);
      setTimeout(() => setShowVictory(false), 4000);
      const msg = "Parabéns, Maria Eduarda! Você acertou! 🌟";
      setFeedback({ isCorrect: true, message: msg });
      
      // Update progress
      const newPoints = profile.points + 10;
      const newLevels = { ...profile.levels, [currentExercise.category]: profile.levels[currentExercise.category] + 1 };
      
      // Remove from wrong ids if it was there
      const newWrongIds = (profile.wrongExerciseIds || []).filter(id => id !== currentExercise.id);
      
      // Check for rewards
      const totalSolved = (Object.values(newLevels) as number[]).reduce((a, b) => a + b, 0);
      const newRewards = [...profile.unlockedRewards];
      
      REWARDS.forEach(r => {
        if (totalSolved >= r.level && !newRewards.includes(r.name)) {
          newRewards.push(r.name);
        }
      });

      const updatedProfile = { ...profile, points: newPoints, levels: newLevels, unlockedRewards: newRewards, wrongExerciseIds: newWrongIds };
      setProfile(updatedProfile);
      localStorage.setItem(`profile_${uid}`, JSON.stringify(updatedProfile));
      
      try {
        await updateDoc(doc(db, 'users', uid), updatedProfile);
        await setDoc(doc(collection(db, 'progress')), {
          userId: uid,
          exerciseId: currentExercise.id,
          completed: true,
          timestamp: serverTimestamp()
        });
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    } else {
      playEffect(SOUNDS.ERROR);
      const msg = "Ops! Quase lá... Vamos tentar de novo? ❤️";
      setFeedback({ isCorrect: false, message: msg });
      
      // Add to wrong ids
      const newWrongIds = Array.from(new Set([...(profile.wrongExerciseIds || []), currentExercise.id]));
      const updatedProfile = { ...profile, wrongExerciseIds: newWrongIds };
      setProfile(updatedProfile);
      localStorage.setItem(`profile_${uid}`, JSON.stringify(updatedProfile));
      
      try {
        await updateDoc(doc(db, 'users', uid), { wrongExerciseIds: newWrongIds });
      } catch (e) {
        console.error("Error updating wrong exercises:", e);
      }

      const storyText = selectedPathIndex !== null && currentExercise.narrativePaths 
        ? currentExercise.narrativePaths[selectedPathIndex].storySegment 
        : currentExercise.story;
      
      const questionText = selectedPathIndex !== null && currentExercise.narrativePaths?.[selectedPathIndex].questionOverride 
        ? currentExercise.narrativePaths[selectedPathIndex].questionOverride 
        : currentExercise.question;

      askAiAssistant(`A Maria Eduarda tem 8 anos e errou uma questão de matemática. 
      Exercício: "${questionText}"
      A história era: "${storyText}"
      Ela marcou: "${option}"
      O correto era: "${correctOption}"
      
      POR FAVOR: Explique de um jeito MUITO lúdico, carinhoso e divertido por que a resposta certa é ${correctOption}. 
      Use metáforas simples (como doces, brinquedos ou animais) e incentive ela dizendo que errar faz parte do aprendizado mágico! 
      Mantenha curto, no máximo 3 frases pequenas.`);
    }
  };

  const askAiAssistant = async (message: string) => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context: `Maria Eduarda está no nível de ${currentExercise?.category}` })
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      setAiResponse(data?.response || "Desculpe, Maria, tive um probleminha para pensar agora. Mas você consegue!");
      playEffect(SOUNDS.HINT);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGoHome = () => {
    playEffect(SOUNDS.CLICK);
    if (sessionResults.length > 0) {
      setShowSummary(true);
      playEffect(SOUNDS.TROPHY);
    } else {
      setCurrentExercise(null);
      if (!selectedCategoryForList) {
        setCurrentCategory(null);
      }
      setShowReviewList(false);
      setFeedback(null);
      setAiResponse(null);
      setIsReviewing(false);
    }
  };

  const closeSummary = () => {
    playEffect(SOUNDS.CLICK);
    setShowSummary(false);
    setSessionResults([]);
    setCurrentExercise(null);
    setCurrentCategory(null);
    setSelectedPathIndex(null);
    setShowReviewList(false);
  };

  const startExercise = (exercise: Exercise) => {
    if (exercise.didacticExplanation || exercise.curiosity || exercise.didacticStory) {
      setExerciseForIntro(exercise);
      setShowDidacticIntro(true);
      setCurrentExercise(null);
    } else {
      setCurrentExercise(exercise);
      setCurrentCategory(exercise.category);
    }
    setFeedback(null);
    setAiResponse(null);
    setSelectedPathIndex(null);
    setShowReviewList(false);
  };

  const selectExercise = (category: Category | 'review') => {
    playEffect(SOUNDS.CLICK);
    if (category === 'review') {
      const wrongIds = profile?.wrongExerciseIds || [];
      if (wrongIds.length === 0) {
        console.warn("Nenhum exercício para reforço no momento!");
        return;
      }
      setShowReviewList(true);
      setCurrentExercise(null);
    } else {
      setSelectedCategoryForList(category);
    }
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pink-50">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-gray-800 pb-20">
      <AnimatePresence>
        {showVictory && <VictoryCelebration />}
        {showDidacticIntro && exerciseForIntro && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-pink-50 overflow-y-auto"
          >
            <div className="max-w-2xl mx-auto p-6 pt-12 pb-24">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-[2.5rem] shadow-2xl p-8 border-4 border-white relative overflow-hidden"
              >
                {/* Decorative background circle */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-100 rounded-full opacity-50" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
                      <Book className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-800">Momento Mágico!</h2>
                      <p className="text-pink-500 font-bold uppercase tracking-wider text-xs">Aprenda antes de começar</p>
                    </div>
                  </div>

                  {exerciseForIntro.curiosity && (
                    <div className="mb-8 bg-yellow-50 p-6 rounded-3xl border-2 border-yellow-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <h3 className="font-black text-yellow-700">Você sabia?</h3>
                      </div>
                      <p className="text-gray-700 font-medium leading-relaxed">
                        {exerciseForIntro.curiosity}
                      </p>
                    </div>
                  )}

                  {exerciseForIntro.didacticExplanation && (
                    <div className="mb-8 p-1">
                      <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
                        <MessageCircle className="text-pink-500" />
                        Como funciona?
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed font-medium bg-pink-50 p-6 rounded-3xl border-2 border-pink-100 italic">
                        "{exerciseForIntro.didacticExplanation}"
                      </p>
                    </div>
                  )}

                  {exerciseForIntro.didacticStory && (
                    <div className="mb-10">
                      <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
                        <Gift className="text-purple-500" />
                        Uma historinha curta:
                      </h3>
                      <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-100">
                        <p className="text-gray-700 leading-relaxed font-medium">
                          {exerciseForIntro.didacticStory}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        playEffect(SOUNDS.SUCCESS);
                        setCurrentExercise(exerciseForIntro);
                        setCurrentCategory(exerciseForIntro.category);
                        setShowDidacticIntro(false);
                      }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black py-5 rounded-2xl shadow-xl text-xl flex items-center justify-center gap-3"
                    >
                      Estou Pronta! Começar Desafio 🚀
                    </motion.button>
                    
                    <button 
                      onClick={() => {
                        playEffect(SOUNDS.CLICK);
                        setShowDidacticIntro(false);
                        setExerciseForIntro(null);
                      }}
                      className="text-gray-400 font-bold hover:text-gray-600 transition-colors py-2"
                    >
                      Voltar para a lista
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-white border-b border-pink-100 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              ME
            </div>
            <div>
              <h2 className="font-bold leading-tight">Maria Eduarda</h2>
              <div className="flex items-center gap-1 text-xs text-pink-600 font-medium">
                <Star className="w-3 h-3 fill-current" />
                <span>{profile?.points || 0} Pontos Mágicos</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playEffect(SOUNDS.CLICK);
                toggleMute();
              }}
              className="p-2 hover:bg-pink-50 rounded-full text-pink-500 transition-colors"
              title={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
            {!user ? (
               <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  playEffect(SOUNDS.CLICK);
                  loginWithGoogle();
                }}
                className="px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold hover:bg-pink-200"
              >
                Sincronizar
              </motion.button>
            ) : (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  playEffect(SOUNDS.CLICK);
                  signOut(auth);
                }}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pt-6">
        {showSummary ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto text-center"
          >
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Relatório da Maria Eduarda!</h2>
            <p className="text-gray-600 mb-8">Veja como você se saiu nesta aventura:</p>
            
            <div className="space-y-4 mb-8 text-left max-h-60 overflow-y-auto p-2">
              {sessionResults.map((res, i) => {
                const ex = EXERCISES.find(e => e.id === res.id);
                return (
                  <div key={i} className={cn(
                    "p-4 rounded-2xl flex items-center justify-between border-l-4",
                    res.correct ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
                  )}>
                    <div className="flex-1">
                      <p className="font-bold text-sm tracking-tight">{ex?.question}</p>
                      <p className="text-xs text-gray-500">{ex?.category}</p>
                    </div>
                    {res.correct ? (
                      <CheckCircle2 className="text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-red-500 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playEffect(SOUNDS.CLICK);
                closeSummary();
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg"
            >
              Continuar Aprendendo
            </motion.button>
          </motion.div>
        ) : showReviewList ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Repeat className="text-purple-500" /> Seus Reforços
              </h2>
              <button 
  onClick={() => {
    playEffect(SOUNDS.CLICK);
    setShowReviewList(false);
  }}
  className="text-gray-400 hover:text-gray-600"
>
                Voltar
              </button>
            </div>
            
            <p className="text-gray-600 mb-6 font-medium">Maria Eduarda, aqui estão os desafios que vamos vencer juntas! ❤️</p>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto p-1">
              {(profile?.wrongExerciseIds || []).map((id) => {
                const ex = EXERCISES.find(e => e.id === id);
                if (!ex) return null;
                return (
                  <button 
  key={id}
  onClick={() => {
    playEffect(SOUNDS.CLICK);
    setIsReviewing(true);
    startExercise(ex);
  }}
  className="w-full p-4 rounded-2xl border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all text-left flex items-center justify-between group"
>
                    <div>
                      <p className="font-bold text-gray-800 text-sm tracking-tight">{ex.question}</p>
                      <p className="text-[10px] uppercase font-bold text-purple-400 mt-1">{ex.category}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-200 group-hover:text-purple-500 transition-colors" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : selectedCategoryForList ? (
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                  <Book className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-800">
                    {CATEGORIES.find(c => c.id === selectedCategoryForList)?.name}
                  </h2>
                  <p className="text-xs font-bold text-pink-400 uppercase tracking-widest">Escolha seu desafio mágico</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCategoryForList(null)}
                className="text-gray-400 hover:text-gray-600 font-bold flex items-center gap-1"
              >
                <ChevronLeft className="w-5 h-5" /> Voltar
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {EXERCISES.filter(e => e.category === selectedCategoryForList).map((ex, i) => (
                <motion.button
                  key={ex.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    playEffect(SOUNDS.CLICK);
                    setSelectedCategoryForList(null);
                    startExercise(ex);
                  }}
                  className="group w-full p-5 rounded-[2rem] border-2 border-pink-50 hover:border-pink-300 hover:bg-pink-50 transition-all text-left flex items-center justify-between shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-pink-500 shadow-inner group-hover:bg-pink-500 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm leading-tight line-clamp-1">{ex.question}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn(
                          "text-[9px] font-black uppercase px-2 py-0.5 rounded-full border",
                          ex.difficulty === 'easy' ? "text-green-500 border-green-100 bg-green-50" :
                          ex.difficulty === 'medium' ? "text-yellow-600 border-yellow-100 bg-yellow-50" :
                          "text-red-500 border-red-100 bg-red-50"
                        )}>
                          {ex.difficulty === 'easy' ? 'Fácil' : ex.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : !currentExercise ? (
          <div className="space-y-8">
            {/* Progress Overview */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy className="text-yellow-500" /> Suas Conquistas
                </h3>
                {profile && profile.wrongExerciseIds && profile.wrongExerciseIds.length > 0 && (
                  <button 
  onClick={() => {
    playEffect(SOUNDS.CLICK);
    selectExercise('review');
  }}
  className="bg-purple-100 text-purple-700 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-purple-200 transition-colors shadow-sm border border-purple-200"
>
                    <Repeat className="w-4 h-4" /> Exercício a ser melhorado
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {REWARDS.map((reward, i) => {
                  const totalSolved = profile ? (Object.values(profile.levels) as number[]).reduce((a, b) => a + b, 0) : 0;
                  const isLocked = totalSolved < reward.level;
                  const progress = Math.min(100, (totalSolved / reward.level) * 100);
                  const missing = Math.max(0, reward.level - totalSolved);
                  
                  return (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => playEffect(SOUNDS.CLICK)}
                      className={cn(
                        "p-3 sm:p-4 rounded-2xl text-center border-2 transition-all relative overflow-hidden cursor-pointer h-full flex flex-col items-center justify-between",
                        isLocked ? "bg-gray-100 border-gray-200 opacity-80" : "bg-white border-pink-200 shadow-md ring-2 ring-pink-100"
                      )}
                    >
                      <div className="flex justify-center mb-2">
                        {reward.name.includes("YouTube") && <Youtube className={isLocked ? "text-gray-400" : "text-red-500"} />}
                        {reward.name.includes("livro") && <Book className={isLocked ? "text-gray-400" : "text-blue-500"} />}
                        {reward.name.includes("Vovó") && <Home className={isLocked ? "text-gray-400" : "text-green-500"} />}
                        {reward.name.includes("descanso") && <Gift className={isLocked ? "text-gray-400" : "text-purple-500"} />}
                      </div>
                      <p className="text-[10px] font-bold uppercase text-gray-400 mb-1">{reward.category}</p>
                      <p className="text-xs font-bold leading-tight mb-2">{reward.name}</p>
                      
                      {isLocked && (
                        <div className="mt-auto">
                          <div className="w-full bg-gray-200 h-1.5 rounded-full mb-1">
                            <div className="bg-pink-500 h-full rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                          <p className="text-[10px] text-gray-500">Faltam {missing} exercícios</p>
                        </div>
                      )}
                      {!isLocked && <div className="absolute top-1 right-1"><CheckCircle2 className="w-4 h-4 text-green-500 fill-white" /></div>}
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Categories */}
            <section>
              <h3 className="text-xl font-bold mb-4">Escolha seu Desafio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => {
                  const Icon = {
                    ArrowUpDown, Circle, Repeat, PlusMinus: Minus, Box, Hash
                  }[cat.id === 'arithmetic' ? 'PlusMinus' : cat.id as any] || Plus;
                  
                  return (
                    <motion.button
                      key={cat.id}
                      whileHover={{ y: -5, shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => selectExercise(cat.id)}
                      className="bg-white p-6 rounded-3xl border-2 border-transparent hover:border-pink-300 shadow-sm transition-all text-left flex items-start gap-4 min-h-[100px]"
                    >
                      <div className="bg-pink-100 p-3 rounded-2xl text-pink-600 flex-shrink-0">
                        <Icon strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg leading-tight">{cat.name}</h4>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                          Nível {profile?.levels[cat.id] || 0}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExercise.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto relative overflow-hidden"
            >
              {/* Progress bar info */}
              <div className="flex justify-between items-center mb-8">
                <button 
                  onClick={handleGoHome}
                  className="text-pink-500 font-bold flex items-center gap-1 hover:underline"
                >
                  <Home className="w-4 h-4" /> Voltar
                </button>
                <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                  Nível {profile?.levels[currentExercise.category] || 0}
                </span>
              </div>

              {/* Story */}
              <div className="bg-pink-50 p-6 rounded-2xl mb-6 relative group overflow-hidden border-2 border-pink-100">
                {currentExercise.narrativePaths && selectedPathIndex === null ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <p className="text-lg font-extrabold text-pink-600">O que a Maria deve fazer agora?</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {currentExercise.narrativePaths.map((path, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedPathIndex(idx);
                            playEffect(SOUNDS.CLICK);
                          }}
                          className="bg-white p-5 rounded-xl border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-100 transition-all text-left font-medium flex items-center justify-between group min-h-[64px]"
                        >
                          <span className="flex-1">{path.choice}</span>
                          <ChevronRight className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform ml-2" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative group overflow-hidden">
                    <p className="text-lg leading-relaxed italic text-gray-700">
                      "{selectedPathIndex !== null && currentExercise.narrativePaths 
                        ? currentExercise.narrativePaths[selectedPathIndex].storySegment 
                        : currentExercise.story}"
                    </p>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-50 rotate-45" />
                  </div>
                )}
              </div>

              {/* Only show question if no choices needed or choice made */}
              {( !currentExercise.narrativePaths || selectedPathIndex !== null ) && (
                <>
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      {selectedPathIndex !== null && currentExercise.narrativePaths?.[selectedPathIndex].questionOverride 
                        ? currentExercise.narrativePaths[selectedPathIndex].questionOverride 
                        : currentExercise.question}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {(selectedPathIndex !== null && currentExercise.narrativePaths?.[selectedPathIndex].optionsOverride 
                      ? currentExercise.narrativePaths[selectedPathIndex].optionsOverride 
                      : currentExercise.options).map((option, i) => {
                        const correctOpt = selectedPathIndex !== null && currentExercise.narrativePaths?.[selectedPathIndex].correctOptionOverride 
                          ? currentExercise.narrativePaths[selectedPathIndex].correctOptionOverride 
                          : currentExercise.correctOption;

                        return (
                          <motion.button
                            key={i}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!!feedback}
                            onClick={() => {
                              playEffect(SOUNDS.CLICK);
                              handleAnswer(option);
                            }}
                            className={cn(
                              "w-full p-5 text-left rounded-2xl border-2 font-bold text-lg transition-all flex items-center min-h-[72px]",
                              feedback?.isCorrect && option === correctOpt
                                ? "bg-green-100 border-green-500 text-green-700"
                                : feedback && !feedback.isCorrect && option === correctOpt
                                ? "border-green-300"
                                : feedback && !feedback.isCorrect && option !== correctOpt
                                ? "bg-red-50 border-gray-200 opacity-50"
                                : "border-gray-100 hover:border-pink-300 hover:bg-pink-50 shadow-sm"
                            )}
                          >
                            <span className="inline-block w-10 h-10 rounded-full bg-gray-100 text-center leading-10 mr-4 text-sm flex-shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="flex-1">{option}</span>
                          </motion.button>
                        );
                      })}
                  </div>
                </>
              )}

              {/* Feedback Overlay */}
              {feedback && (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={cn(
                    "mt-8 p-4 rounded-2xl flex items-center gap-4",
                    feedback.isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  )}
                >
                  {feedback.isCorrect ? <CheckCircle2 /> : <XCircle />}
                  <div className="flex-1">
                    <p className="font-bold">{feedback.message}</p>
                    {feedback.isCorrect ? (
                      <button 
                        onClick={() => selectExercise(currentExercise.category)}
                        className="mt-2 text-sm font-bold flex items-center gap-1 hover:underline"
                      >
                        Próximo Desafio <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => setShowExplanation(true)}
                        className="mt-2 text-sm font-bold flex items-center gap-1 hover:underline"
                      >
                        <Repeat className="w-4 h-4" /> Exercício a ser melhorado
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Learning Moment Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-pink-500/20 backdrop-blur-sm"
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-lg w-full relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-8 h-8 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-purple-600">Explicação Mágica! ✨</h3>
                          <p className="text-gray-500 font-medium">Vamos aprender juntas?</p>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-6 rounded-2xl mb-8">
                        {isAiLoading ? (
                          <div className="flex items-center justify-center py-4">
                            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                          </div>
                        ) : (
                          <p className="text-lg text-purple-900 leading-relaxed italic">
                            "{aiResponse || "Espere um pouquinho, estou preparando uma dica especial..."}"
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-3">
                        <button 
                          onClick={() => selectExercise(currentExercise.category, currentExercise.id)}
                          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          Tentar um novo desafio! 🚀
                        </button>
                        <button 
                          onClick={() => setShowExplanation(false)}
                          className="w-full text-gray-400 font-bold py-2 hover:text-gray-600 transition-colors"
                        >
                          Voltar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Assistant Tooltip (Legacy - removing to favor the modal when explanation is clicked) */}
              {/* Replacing with cleaner tooltip only for quick hints if needed, but the user requested the explanation on button click */}

              {isAiLoading && (
                <div className="mt-4 flex justify-center">
                  <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Quick Stats Bar (bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-around text-xs font-bold uppercase tracking-wider text-gray-500">
            <div className="flex gap-4 sm:gap-6 justify-center">
              <div className="text-center">
                <p className="text-pink-500 text-xl sm:text-2xl font-black">{profile?.points || 0}</p>
                <p className="text-[10px] sm:text-xs">Pontos</p>
              </div>
              <div className="text-center">
                <p className="text-blue-500 text-xl sm:text-2xl font-black">
                  {profile ? (Object.values(profile.levels) as number[]).reduce((a, b) => a + b, 0) : 0}
                </p>
                <p className="text-[10px] sm:text-xs">Desafios</p>
              </div>
              <div className="text-center">
                <p className="text-yellow-500 text-xl sm:text-2xl font-black">
                  {profile?.unlockedRewards.length || 0}
                </p>
                <p className="text-[10px] sm:text-xs">Prêmios</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

