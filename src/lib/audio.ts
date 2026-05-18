// URLs garantidas de alta disponibilidade
const SOUND_SOURCES: Record<string, string[]> = {
  SUCCESS: [
    "https://assets.mixkit.co/sfx/preview/mixkit-happy-bells-notification-937.mp3",
    "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
  ],
  HINT: [
    "https://assets.mixkit.co/sfx/preview/mixkit-magical-bright-reveal-2430.mp3",
    "https://www.soundjay.com/buttons/sounds/button-37.mp3"
  ],
  ERROR: [
    "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3",
    "https://www.soundjay.com/buttons/sounds/button-10.mp3"
  ],
  CLICK: [
    "https://assets.mixkit.co/sfx/preview/mixkit-simple-click-630.mp3",
    "https://www.soundjay.com/buttons/sounds/button-3.mp3"
  ],
  TROPHY: [
    "https://assets.mixkit.co/sfx/preview/mixkit-stadium-crowd-cheer-488.mp3",
    "https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3"
  ]
};

/**
 * Sistema de áudio resiliente
 */
export const playSound = async (key: keyof typeof SOUND_SOURCES) => {
  const sources = SOUND_SOURCES[key];
  if (!sources) return;

  for (const url of sources) {
    try {
      const audio = new Audio();
      
      // Promessa para lidar com o carregamento e timeout
      const playAttempt = new Promise((resolve, reject) => {
        audio.src = url;
        audio.volume = 0.4;
        
        const timeoutId = setTimeout(() => {
          audio.pause();
          audio.src = '';
          reject(new Error('Timeout'));
        }, 3000);

        audio.oncanplaythrough = () => {
          clearTimeout(timeoutId);
          audio.play()
            .then(resolve)
            .catch(reject);
        };

        audio.onerror = () => {
          clearTimeout(timeoutId);
          reject(new Error('Load Error'));
        };
      });

      await playAttempt;
      return; // Sucesso, sai do loop
    } catch (err) {
      console.warn(`[Audio] Falha ao tocar ${url}, tentando alternativa...`);
    }
  }
};

export const SOUNDS = {
  SUCCESS: 'SUCCESS' as const,
  HINT: 'HINT' as const,
  ERROR: 'ERROR' as const,
  CLICK: 'CLICK' as const,
  TROPHY: 'TROPHY' as const
};
