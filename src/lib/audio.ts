export const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.volume = 0.4;
  audio.play().catch(err => console.log("Audio playback blocked or failed:", err));
};

export const SOUNDS = {
  SUCCESS: "https://cdn.pixabay.com/audio/2022/03/15/audio_73da300958.mp3", // Level Up/Success
  HINT: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0c6ff1bab.mp3",    // Magic/Sparkle
  ERROR: "https://cdn.pixabay.com/audio/2022/03/24/audio_33068779b5.mp3",   // Oops/Wrong
  CLICK: "https://cdn.pixabay.com/audio/2021/08/04/audio_0625c13396.mp3",   // Pop/Click
  TROPHY: "https://cdn.pixabay.com/audio/2021/08/04/audio_83d21104e1.mp3"  // Fanfare/Success
};
