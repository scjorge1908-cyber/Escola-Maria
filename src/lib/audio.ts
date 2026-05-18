// URLs garantidas de alta disponibilidade
const SOUND_SOURCES: Record<string, string[]> = {
  SUCCESS: [
    "https://cdn.pixabay.com/audio/2021/08/04/audio_3d4a6df912.mp3",
    "https://www.soundjay.com/human/sounds/applause-01.mp3"
  ],
  HINT: [
    "https://cdn.pixabay.com/audio/2022/01/18/audio_d0c6ff1bab.mp3",
    "https://www.soundjay.com/buttons/sounds/button-37.mp3"
  ],
  ERROR: [
    "https://cdn.pixabay.com/audio/2022/03/24/audio_33068779b5.mp3",
    "https://www.soundjay.com/misc/sounds/fail-trombone-01.mp3"
  ],
  CLICK: [
    "https://cdn.pixabay.com/audio/2022/03/15/audio_823be800a7.mp3",
    "https://www.soundjay.com/buttons/sounds/button-16.mp3"
  ],
  TROPHY: [
    "https://cdn.pixabay.com/audio/2021/08/04/audio_83d21104e1.mp3",
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
