import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const COLORS = ['#FF69B4', '#8A2BE2', '#FFD700', '#00CED1', '#FF4500', '#ADFF2F'];
const SYMBOLS = ['★', '♥', '✨', '🌸', '🎈'];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
  symbol?: string;
}

export const VictoryCelebration = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20,
      color: COLORS[i % COLORS.length],
      size: Math.random() * 12 + 6,
      rotation: Math.random() * 360,
      delay: Math.random() * 1,
      symbol: i % 3 === 0 ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : undefined
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            top: `${p.y}%`, 
            left: `${p.x}%`, 
            opacity: 1, 
            rotate: p.rotation,
            scale: 0
          }}
          animate={{ 
            top: '120%', 
            left: `${p.x + (Math.random() * 40 - 20)}%`,
            opacity: [1, 1, 0.5, 0],
            rotate: p.rotation + 720,
            scale: [0, 1, 1, 0.8]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            delay: p.delay,
            ease: "easeOut"
          }}
          className="flex items-center justify-center font-bold"
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.symbol ? 'transparent' : p.color,
            color: p.color,
            borderRadius: p.symbol ? '0' : (Math.random() > 0.5 ? '50%' : '2px'),
            fontSize: p.size,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
      
      {/* Central Flash Effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 3, 0], opacity: [0, 0.4, 0] }}
        transition={{ duration: 1.5, times: [0, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"
      />
    </div>
  );
};
