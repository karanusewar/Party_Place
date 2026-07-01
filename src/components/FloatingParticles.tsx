import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'cross' | 'dot' | 'square';
  color: 'cyan' | 'magenta' | 'purple';
  speed: number;
}

function ParticleItem({ p, scrollYProgress }: { p: Particle, scrollYProgress: MotionValue<number>, key?: any }) {
  // Different movement directions based on speed
  const yMove = useTransform(scrollYProgress, [0, 1], [0, p.speed * 200 * (p.id % 2 === 0 ? 1 : -1)]);
  const xMove = useTransform(scrollYProgress, [0, 1], [0, p.speed * 50 * (p.id % 3 === 0 ? 1 : -1)]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, p.speed * 180]);

  let colorClass = 'text-neon-cyan';
  if (p.color === 'magenta') colorClass = 'text-neon-magenta';
  if (p.color === 'purple') colorClass = 'text-neon-purple';

  return (
    <motion.div
      className={`absolute ${colorClass} opacity-20`}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        y: yMove,
        x: xMove,
        rotate: rotate,
        width: p.size,
        height: p.size,
      }}
    >
      {p.type === 'cross' && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      )}
      {p.type === 'square' && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        </svg>
      )}
      {p.type === 'dot' && (
        <div className={`w-full h-full rounded-full bg-current`}></div>
      )}
    </motion.div>
  );
}

export default function FloatingParticles({ count = 15 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    const types: ('cross' | 'dot' | 'square')[] = ['cross', 'dot', 'square'];
    const colors: ('cyan' | 'magenta' | 'purple')[] = ['cyan', 'magenta', 'purple'];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 0.5,
      });
    }
    setParticles(newParticles);
  }, [count]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <ParticleItem key={p.id} p={p} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}
