export const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.volume = 0.4;
  audio.play().catch(err => console.log("Audio playback blocked or failed:", err));
};

export const SOUNDS = {
  SUCCESS: "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3", // Success chime
  HINT: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",    // Soft bubble/ping
  ERROR: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",   // Gentle error/thud
  CLICK: "https://assets.mixkit.co/active_storage/sfx/2567/2567-preview.mp3",   // Soft click
  TROPHY: "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3"  // Fanfare for summary
};
