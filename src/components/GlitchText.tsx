import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function GlitchText({ text, className = '', delay = 0 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`relative inline-block ${className}`}
    >
      <span className={isGlitching ? 'opacity-0' : 'opacity-100'}>{text}</span>
      
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-[2px] text-neon-cyan opacity-70" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translateX(-2px)' }}
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-[-2px] text-neon-magenta opacity-70" 
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)', transform: 'translateX(2px)' }}
          >
            {text}
          </span>
        </>
      )}
    </motion.span>
  );
}
