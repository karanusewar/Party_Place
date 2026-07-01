import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function ParallaxImage({ src, alt, className = '' }: { src: string, alt: string, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        style={{ y, scale: 1.4 }}
        className="absolute top-0 left-0 w-full h-full object-cover glitch-img"
      />
    </div>
  );
}
