import { useState, useEffect } from 'react';
import { 
  ArrowUpDown, Circle, Repeat, Plus, Minus, Box, Hash, 
  Trophy, Star, Gift, Book, Home, Youtube, MessageCircle,
  ChevronRight, ChevronLeft, CheckCircle2, XCircle, LogOut, Loader2,
  Volume2, VolumeX, Heart
} from 'lucide-react';
// Force rebuild check: v1.1.0
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
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db, loginWithGoogle } from './lib/firebase';
import { cn } from './lib/utils';
import { VictoryCelebration } from './components/VictoryCelebration';
import { MomActivitySheet } from './components/MomActivitySheet';
import { EXERCISES } from './data/exercises';
import { CATEGORIES, REWARDS, Category, Exercise, UserProfile, Exam, ExamResult } from './types';
import { playSound, SOUNDS } from './lib/audio';
import { EXAMS } from './data/exams';

function handleFirestoreError(error: any, operationType: string, path: string) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

const ICON_MAP = {
  ArrowUpDown,
  Circle,
  Repeat,
  PlusMinus: Minus,
  Box,
  Hash
};

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const GUEST_UID = 'guest_maria_eduarda';
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [showPrizeMilestone, setShowPrizeMilestone] = useState<string | null>(null);
  const [showDidacticIntro, setShowDidacticIntro] = useState(false);
  const [exerciseForIntro, setExerciseForIntro] = useState<Exercise | null>(null);
  const [selectedCategoryForList, setSelectedCategoryForList] = useState<Category | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showReviewList, setShowReviewList] = useState(false);
  const [showCategoryIntro, setShowCategoryIntro] = useState<{ id: Category; name: string; intro: string } | null>(null);
  const [selectedPathIndex, setSelectedPathIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'study' | 'exams' | 'profile' | 'momActivity'>('study');
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [currentExamQuestionIndex, setCurrentExamQuestionIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<{ id: string; correct: boolean }[]>([]);
  const [showExamResult, setShowExamResult] = useState(false);

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

  const startExam = (exam: Exam) => {
    playEffect(SOUNDS.CLICK);
    setCurrentExam(exam);
    setCurrentExamQuestionIndex(0);
    setExamAnswers([]);
    setShowExamResult(false);
    
    // Start with first exercise of exam
    const firstExId = exam.exerciseIds[0];
    const firstEx = EXERCISES.find(e => e.id === firstExId);
    if (firstEx) {
      setCurrentExercise(firstEx);
      setFeedback(null);
      setAiResponse(null);
    }
  };

  const handleExamAnswer = async (option: string) => {
    if (!currentExercise || !currentExam || feedback) return;
    
    const isCorrect = option === currentExercise.correctOption;
    const newAnswers = [...examAnswers, { id: currentExercise.id, correct: isCorrect }];
    setExamAnswers(newAnswers);
    
    if (isCorrect) {
      playEffect(SOUNDS.SUCCESS);
      setFeedback({ isCorrect: true, message: "Boa! Continue assim na prova! ✨" });
    } else {
      playEffect(SOUNDS.ERROR);
      setFeedback({ isCorrect: false, message: "Essa era difícil! Vamos para a próxima." });
    }

    setTimeout(async () => {
      setFeedback(null);
      const nextIndex = currentExamQuestionIndex + 1;
      if (nextIndex < currentExam.exerciseIds.length) {
        setCurrentExamQuestionIndex(nextIndex);
        const nextExId = currentExam.exerciseIds[nextIndex];
        const nextEx = EXERCISES.find(e => e.id === nextExId);
        if (nextEx) {
          setCurrentExercise(nextEx);
        }
      } else {
        // Exam finished
        setShowExamResult(true);
        playEffect(SOUNDS.TROPHY);
        
        // Save result
        const score = newAnswers.filter(a => a.correct).length;
        const newResult: ExamResult = {
          examId: currentExam.id,
          score,
          completedAt: new Date().toISOString()
        };
        
        const uid = user?.uid || GUEST_UID;
        const updatedProfile = { 
          ...profile!, 
          examResults: [...(profile!.examResults || []), newResult],
          points: profile!.points + (score * 5) // Bonus for exams
        };
        setProfile(updatedProfile);
        localStorage.setItem(`profile_${uid}`, JSON.stringify(updatedProfile));
        
        if (user) {
          try {
            await updateDoc(doc(db, 'users', user.uid), updatedProfile);
          } catch (e) {
            handleFirestoreError(e, 'update', `users/${user.uid}`);
          }
        }
      }
    }, 2000);
  };

  const handleAnswer = async (option: string) => {
    if (currentExam) {
      handleExamAnswer(option);
      return;
    }
    if (!currentExercise || feedback || !profile) return;
    const uid = user?.uid || GUEST_UID;
    const isGuest = !user;

    const correctOption = (selectedPathIndex !== null && currentExercise.narrativePaths?.[selectedPathIndex].correctOptionOverride) 
      || currentExercise.correctOption;

    const isCorrect = option === correctOption;
    setSessionResults(prev => [...prev, { id: currentExercise.id, correct: isCorrect }]);
    
    if (isCorrect) {
      playEffect(SOUNDS.SUCCESS);
      setShowVictory(true);
      
      const milestonePoints = [50, 100, 250, 500, 1000];
      const oldPoints = profile.points;
      const newPoints = oldPoints + 10;
      
      const reachedMilestone = milestonePoints.find(m => oldPoints < m && newPoints >= m);
      
      // Update progress
      const currentLevel = profile.levels[currentExercise.category] || 0;
      const newLevels = { ...profile.levels, [currentExercise.category]: currentLevel + 1 };
      
      // Remove from wrong ids if it was there
      const newWrongIds = (profile.wrongExerciseIds || []).filter(id => id !== currentExercise.id);
      
      // Check for rewards
      const totalSolved = (Object.values(newLevels) as number[]).reduce((a, b) => a + b, 0);
      const newRewards = [...profile.unlockedRewards];
      
      let newPrizeName = "";
      REWARDS.forEach(r => {
        if (totalSolved >= r.level && !newRewards.includes(r.name)) {
          newRewards.push(r.name);
          newPrizeName = r.name;
        }
      });

      const updatedProfile = { ...profile, points: newPoints, levels: newLevels, unlockedRewards: newRewards, wrongExerciseIds: newWrongIds };
      setProfile(updatedProfile);
      localStorage.setItem(`profile_${uid}`, JSON.stringify(updatedProfile));
      
      if (reachedMilestone || newPrizeName) {
        setShowPrizeMilestone(newPrizeName || `MARCO DE ${newPoints} PONTOS!`);
        playEffect(SOUNDS.TROPHY);
      }

      setFeedback({ isCorrect: true, message: "Parabéns, Maria Eduarda! Você acertou! 🌟" });
      
      // AUTO-ADVANCE logic
      setTimeout(() => {
        setShowVictory(false);
        if (!reachedMilestone && !newPrizeName) {
          handleNextExerciseProgress();
        }
      }, reachedMilestone || newPrizeName ? 5000 : 3000);

      if (!isGuest && user) {
        try {
          await updateDoc(doc(db, 'users', user.uid), updatedProfile);
          await addDoc(collection(db, 'progress'), {
            userId: user.uid,
            exerciseId: currentExercise.id,
            completed: true,
            timestamp: serverTimestamp()
          });
        } catch (error) {
          handleFirestoreError(error, 'write', 'progress/users');
        }
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
      
      if (!isGuest && user) {
        try {
          await updateDoc(doc(db, 'users', user.uid), { wrongExerciseIds: newWrongIds });
        } catch (e) {
          handleFirestoreError(e, 'update', `users/${user.uid}`);
        }
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
    if (currentExam) {
      if (confirm("Você quer mesmo sair da prova? Seu progresso será perdido.")) {
        setCurrentExam(null);
        setCurrentExercise(null);
        setFeedback(null);
      }
      return;
    }
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

  const handleNextExerciseProgress = () => {
    if (!currentExercise || !profile) return;
    const categoryExercises = EXERCISES.filter(e => {
        if (currentExercise.category === 'order') return e.id.startsWith('helena-');
        if (currentExercise.category === 'rounding') return e.id.startsWith('round-h-');
        return e.category === currentExercise.category;
    });
    const nextIndex = profile.levels[currentExercise.category] % categoryExercises.length;
    const nextEx = categoryExercises[nextIndex];
    if (nextEx) {
      startExercise(nextEx);
    } else {
      handleGoHome();
    }
  };

  const closePrizeMilestone = () => {
    playEffect(SOUNDS.CLICK);
    setShowPrizeMilestone(null);
    handleNextExerciseProgress();
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
      if (wrongIds.length === 0) return;
      setShowReviewList(true);
      setCurrentExercise(null);
    } else {
      const categoryId = category as Category;
      const categoryData = CATEGORIES.find(c => c.id === categoryId);
      
      if (categoryData?.intro) {
          setShowCategoryIntro({ 
            id: categoryId, 
            name: categoryData.name, 
            intro: categoryData.intro 
          });
          return;
      }

      const categoryExercises = EXERCISES.filter(e => {
        if (categoryId === 'order') return e.id.startsWith('helena-');
        if (categoryId === 'rounding') return e.id.startsWith('round-h-');
        return e.category === categoryId;
      });
      const userLevel = profile?.levels[categoryId] || 0;
      const nextEx = categoryExercises[userLevel % categoryExercises.length];
      if (nextEx) {
        startExercise(nextEx);
      }
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
        
        {showCategoryIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-pink-600/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[4rem] p-10 max-w-2xl w-full shadow-2xl border-[12px] border-yellow-400 relative overflow-hidden flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-pink-100 rounded-3xl flex items-center justify-center text-pink-500 mb-8">
                {(() => {
                  const cat = CATEGORIES.find(c => c.id === showCategoryIntro.id);
                  const Icon = ICON_MAP[cat?.icon as keyof typeof ICON_MAP] || Box;
                  return <Icon className="w-12 h-12" />;
                })()}
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 mb-6 text-center uppercase tracking-tight">
                {showCategoryIntro.name}
              </h2>
              
              <div className="bg-pink-50 rounded-[2.5rem] p-8 mb-8 border-2 border-pink-100 shadow-inner overflow-y-auto max-h-[40vh]">
                <p className="text-lg font-medium text-gray-700 leading-relaxed whitespace-pre-wrap text-center italic">
                  "{showCategoryIntro.intro}"
                </p>
              </div>
              
              <button
                onClick={() => {
                  const categoryId = showCategoryIntro.id;
                  setShowCategoryIntro(null);
                  playEffect(SOUNDS.CLICK);
                  
                  const categoryExercises = EXERCISES.filter(e => {
                    if (categoryId === 'order') return e.id.startsWith('helena-');
                    if (categoryId === 'rounding') return e.id.startsWith('round-h-');
                    return e.category === categoryId;
                  });
                  const userLevel = profile?.levels[categoryId] || 0;
                  const nextEx = categoryExercises[userLevel % categoryExercises.length];
                  if (nextEx) {
                    startExercise(nextEx);
                  }
                }}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-6 rounded-[2.5rem] shadow-2xl text-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-pink-700 flex items-center justify-center gap-3"
              >
                COMEÇAR AVENTURA! <ChevronRight className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
        
        {showPrizeMilestone && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-pink-600/60 backdrop-blur-xl"
          >
            <div className="bg-white rounded-[4rem] p-12 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] max-w-xl w-full text-center border-[12px] border-yellow-400 relative overflow-hidden">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -right-32 w-80 h-80 bg-yellow-100 rounded-full opacity-30"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-32 -left-32 w-80 h-80 bg-pink-100 rounded-full opacity-30"
              />
              
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-32 h-32 text-yellow-500 mx-auto mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]" />
              </motion.div>
              
              <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight uppercase">
                VOCÊ É INCRÍVEL! 🌟
              </h2>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-[3rem] border-4 border-yellow-200 mb-10 shadow-inner">
                <p className="text-3xl font-black text-pink-600 uppercase break-words">
                  {showPrizeMilestone}
                </p>
              </div>
              
              <button
                onClick={closePrizeMilestone}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-6 rounded-[2.5rem] shadow-2xl text-2xl transition-all hover:scale-105 active:scale-95 border-b-8 border-pink-700"
              >
                VAMOS CONTINUAR! 🚀
              </button>
            </div>
          </motion.div>
        )}

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

      {/* Bottom Navigation */}
      {!currentExercise && !showDidacticIntro && !showSummary && !showReviewList && !showCategoryIntro && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 px-6 py-3 z-50 flex justify-around items-center print:hidden">
          <button 
            onClick={() => setActiveTab('study')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeTab === 'study' ? "text-pink-600" : "text-gray-400"
            )}
          >
            <Book className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Estudar</span>
          </button>
          <button 
            onClick={() => setActiveTab('exams')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors relative",
              activeTab === 'exams' ? "text-pink-600" : "text-gray-400"
            )}
          >
            <Star className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-white">
              3
            </div>
            <span className="text-[10px] font-bold uppercase">Provas</span>
          </button>
          <button 
            onClick={() => setActiveTab('momActivity')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors relative",
              activeTab === 'momActivity' ? "text-pink-600" : "text-gray-400"
            )}
          >
            <Heart className="w-6 h-6 fill-current" />
            <span className="text-[10px] font-bold uppercase">Folha da Mamãe</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeTab === 'profile' ? "text-pink-600" : "text-gray-400"
            )}
          >
            <Trophy className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Prêmios</span>
          </button>
        </nav>
      )}

      <header className="bg-white border-b border-pink-100 p-4 sticky top-0 z-10 print:hidden">
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
        ) : showExamResult ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[3rem] p-10 shadow-2xl max-w-2xl mx-auto text-center border-4 border-yellow-400"
          >
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-yellow-600" />
            </div>
            <h2 className="text-4xl font-black mb-4">Prova Final Concluída!</h2>
            <div className="bg-pink-50 rounded-2xl p-6 mb-8 inline-block px-12 border-2 border-pink-100">
              <p className="text-xl font-bold text-gray-500 uppercase tracking-widest mb-2">Sua Nota</p>
              <p className="text-6xl font-black text-pink-600">
                {examAnswers.filter(a => a.correct).length * 10}
              </p>
              <p className="text-gray-400 font-bold mt-2">de 100 pontos</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-100">
                <p className="text-2xl font-black text-green-600">{examAnswers.filter(a => a.correct).length}</p>
                <p className="text-xs font-bold text-green-800 uppercase">Acertos</p>
              </div>
              <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-100">
                <p className="text-2xl font-black text-red-600">{examAnswers.filter(a => !a.correct).length}</p>
                <p className="text-xs font-bold text-red-800 uppercase">Erros</p>
              </div>
            </div>

            <button 
              onClick={() => {
                playEffect(SOUNDS.CLICK);
                setCurrentExam(null);
                setCurrentExercise(null);
                setShowExamResult(false);
                setExamAnswers([]);
              }}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-5 rounded-3xl shadow-xl text-xl transition-all hover:scale-[1.02]"
            >
              Voltar para o Início
            </button>
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
            {activeTab === 'study' && (
              <>
                {/* Progress Overview - STUDY TAB */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Book className="text-pink-500" /> Pratique e Aprenda
                    </h3>
                  </div>
                  {/* Category Grid - Moved here */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORIES.map((cat) => {
                      const Icon = ICON_MAP[cat.icon as keyof typeof ICON_MAP] || Box;
                      const level = profile.levels[cat.id] || 0;
                      const categoryExercises = EXERCISES.filter(e => {
                        if (cat.id === 'order') return e.id.startsWith('helena-');
                        if (cat.id === 'rounding') return e.id.startsWith('round-h-');
                        return e.category === cat.id;
                      });
                      const isCompleted = level >= categoryExercises.length;
                      
                      return (
                        <motion.button
                          key={cat.id}
                          whileHover={{ y: -8, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectExercise(cat.id)}
                          className={cn(
                            "relative overflow-hidden group p-8 rounded-[2.5rem] text-left transition-all border-b-8 active:border-b-0 active:translate-y-2",
                            isCompleted 
                              ? "bg-green-50 border-green-200" 
                              : "bg-white border-pink-100 hover:border-pink-200 shadow-xl shadow-pink-500/5 shadow-inner"
                          )}
                        >
                          <div className="flex flex-col h-full gap-4 relative z-10">
                            <div className={cn(
                              "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg",
                              isCompleted ? "bg-green-500 text-white" : "bg-pink-500 text-white"
                            )}>
                              <Icon className="w-8 h-8" />
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-gray-800 leading-tight mb-1">
                                {cat.name}
                              </h4>
                              <p className="text-sm font-bold text-gray-400 capitalize">
                                {isCompleted ? "Completado! ✨" : `Nível ${level + 1}`}
                              </p>
                              <div className="mt-4 w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                                 <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(100, (level / categoryExercises.length) * 100)}%` }}
                                  className={cn(
                                    "h-full",
                                    isCompleted ? "bg-green-500" : "bg-gradient-to-r from-pink-500 to-rose-400"
                                  )}
                                 />
                              </div>
                              <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-gray-300">
                                {level} de {categoryExercises.length} desafios
                              </p>
                            </div>
                          </div>
                          {isCompleted && (
                            <div className="absolute top-4 right-4">
                              <CheckCircle2 className="w-8 h-8 text-green-500 opacity-20" />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </section>
                
                {profile && profile.wrongExerciseIds && profile.wrongExerciseIds.length > 0 && (
                  <section className="bg-purple-50 p-6 rounded-[2rem] border-2 border-purple-100 shadow-lg">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                            <Repeat className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-black text-purple-800">Seus Reforços</h4>
                            <p className="text-xs font-bold text-purple-400 uppercase">Aprenda com seus erros</p>
                          </div>
                       </div>
                       <button 
                         onClick={() => selectExercise('review')}
                         className="px-6 py-2 bg-purple-600 text-white rounded-full font-black text-xs hover:bg-purple-700 transition-colors shadow-lg"
                       >
                         PRATICAR AGORA
                       </button>
                    </div>
                  </section>
                )}
              </>
            )}

            {activeTab === 'exams' && (
              <section className="space-y-6">
                <div className="bg-yellow-400 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"
                  />
                  <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Prova Final</h2>
                    <p className="text-lg font-bold text-yellow-900 leading-relaxed mb-6">
                      Atenção, Maria Eduarda! As provas finais chegaram. <br/>
                      São 10 desafios de nível **COMPLEXO** para provar que você é uma mestre!
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="bg-white/30 px-6 py-2 rounded-full border border-white/40 flex items-center gap-2">
                         <Star className="w-5 h-5 fill-white" />
                         <span className="font-black">100% NÍVEL HARD</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {EXAMS.map((exam, i) => {
                    const result = profile.examResults?.find(r => r.examId === exam.id);
                    return (
                      <motion.div
                        key={exam.id}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-[2.5rem] border-2 border-pink-50 shadow-xl flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-4 font-black text-xl">
                            {i+1}
                          </div>
                          <h4 className="font-black text-xl text-gray-800 mb-2 leading-tight">{exam.title}</h4>
                          <p className="text-sm text-gray-500 font-medium mb-6 line-clamp-3">{exam.description}</p>
                        </div>
                        
                        <div className="space-y-4">
                          {result && (
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-2xl border border-green-100">
                               <span className="text-[10px] font-black uppercase text-green-700">Melhor Nota</span>
                               <span className="font-black text-green-600">{result.score * 10}</span>
                            </div>
                          )}
                          
                          <button
                            onClick={() => startExam(exam)}
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-4 rounded-3xl transition-all shadow-lg active:scale-95"
                          >
                            {result ? "REFAZER PROVA" : "INICIAR PROVA"}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            )}

            {activeTab === 'profile' && (
              <section className="space-y-6">
                <div className="bg-white rounded-[3rem] p-10 border-2 border-pink-50 shadow-2xl flex flex-col items-center">
                   <div className="w-32 h-32 bg-pink-500 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black mb-6 shadow-xl rotate-3">
                     ME
                   </div>
                   <h2 className="text-3xl font-black text-gray-900 mb-2">Maria Eduarda</h2>
                   <div className="bg-yellow-100 px-6 py-2 rounded-full border-2 border-yellow-200 flex items-center gap-2 mb-8">
                     <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                     <span className="font-black text-yellow-700">{profile.points} PONTOS MÁGICOS</span>
                   </div>

                   <div className="w-full grid grid-cols-1 gap-4">
                      <h4 className="text-xl font-black text-gray-800 text-center mb-2">Seus Prêmios Desbloqueados</h4>
                      {profile.unlockedRewards.length > 0 ? (
                        profile.unlockedRewards.map((rewardName, idx) => (
                           <div key={idx} className="bg-pink-50 p-4 rounded-2xl border-2 border-pink-100 flex items-center gap-4">
                              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                <Gift className="text-pink-500" />
                              </div>
                              <div>
                                <p className="font-black text-gray-800">{rewardName}</p>
                                <p className="text-[10px] font-bold text-green-500 uppercase">PRONTO PARA USAR!</p>
                              </div>
                           </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center italic">Você ainda não desbloqueou prêmios. Continue estudando!</p>
                      )}
                   </div>
                </div>
              </section>
            )}

            {activeTab === 'momActivity' && (
              <section className="space-y-6">
                <MomActivitySheet />
              </section>
            )}
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
                {currentExam ? (
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase text-yellow-500 mb-1">Prova em Andamento</span>
                    <div className="flex items-center gap-1">
                       {currentExam.exerciseIds.map((_, i) => (
                         <div 
                           key={i} 
                           className={cn(
                             "w-2 h-2 rounded-full",
                             i < currentExamQuestionIndex ? "bg-green-400" :
                             i === currentExamQuestionIndex ? "bg-pink-500 animate-pulse" : "bg-gray-200"
                           )}
                         />
                       ))}
                    </div>
                  </div>
                ) : (
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                    Nível {profile?.levels[currentExercise.category] || 0}
                  </span>
                )}
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

              {/* Options */}
              {( !currentExercise.narrativePaths || selectedPathIndex !== null ) && (
                <>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      {selectedPathIndex !== null && currentExercise.narrativePaths?.[selectedPathIndex].questionOverride 
                        ? currentExercise.narrativePaths[selectedPathIndex].questionOverride 
                        : currentExercise.question}
                    </h2>
                  </div>

                  <div className="space-y-3 mb-8">
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
                              "w-full p-4 text-left rounded-2xl border-2 font-bold text-lg transition-all flex items-center min-h-[60px]",
                              feedback?.isCorrect && option === correctOpt
                                ? "bg-green-100 border-green-500 text-green-700"
                                : feedback && !feedback.isCorrect && option === correctOpt
                                ? "border-green-300"
                                : feedback && !feedback.isCorrect && option !== correctOpt
                                ? "bg-red-50 border-gray-200 opacity-50"
                                : "border-gray-100 hover:border-pink-300 hover:bg-pink-50 shadow-sm"
                            )}
                          >
                            <span className="inline-block w-8 h-8 rounded-full bg-gray-100 text-center leading-8 mr-4 text-sm flex-shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="flex-1">{option}</span>
                          </motion.button>
                        );
                      })}
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                <button 
                  onClick={handleGoHome}
                  className="text-gray-400 hover:text-pink-600 font-bold flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-all text-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar ao Início
                </button>
                <button 
                  onClick={() => {
                    setFeedback(null);
                    setAiResponse(null);
                    setSelectedPathIndex(null);
                    playEffect(SOUNDS.CLICK);
                  }}
                  className="text-gray-400 hover:text-pink-600 font-bold flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-all text-xs"
                >
                  Tentar Novamente <Repeat className="w-4 h-4" />
                </button>
              </div>

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
                        onClick={() => {
                          playEffect(SOUNDS.CLICK);
                          handleNextExerciseProgress();
                        }}
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
                          onClick={() => selectExercise(currentExercise.category)}
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

