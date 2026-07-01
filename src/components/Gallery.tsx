import { motion, useScroll, useTransform } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';
import { useRef } from 'react';
import GlitchText from './GlitchText';

const imagesRow1 = [
  "https://www.partyplace.gr/images/upload/Places2-Party-Place-Voulas-8586017574549802438-s2.jpg",
  "https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=800&auto=format&fit=crop",
  "https://www.partyplace.gr/images/upload/Places5-Party_Place_%CE%9C%CE%B9%CE%BA%CF%81%CE%BF%CE%BB%CE%AF%CE%BC%CE%B1%CE%BD%CE%BF_01-8584424869010137482-s2.jpg",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
];

const imagesRow2 = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
  "https://www.partyplace.gr/images/upload/Places3-kipos-party-place-voulas-8586017476008083411-s2.jpg",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
  "https://www.partyplace.gr/images/upload/Places4-Party_Time_Disco_Party_for_Kids_Athens_Greece-8585632119247031332-s2.jpg",
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Duplicate arrays to create seamless infinite loop (4x for wide screens)
  const row1 = [...imagesRow1, ...imagesRow1, ...imagesRow1, ...imagesRow1];
  const row2 = [...imagesRow2, ...imagesRow2, ...imagesRow2, ...imagesRow2];

  return (
    <section ref={containerRef} className="py-24 relative bg-cyber-dark overflow-hidden border-y border-glass-border">
      <div className="container mx-auto px-6 relative z-10 mb-12">
        <div className="flex items-center gap-4 justify-center">
          <ImageIcon className="text-neon-magenta" size={32} />
          <h2 className="text-4xl font-bold text-white text-center flex gap-2">
            <GlitchText text="Multimedia" delay={0.1} />
            <GlitchText text="Matrix" className="text-neon-magenta" delay={0.2} />
          </h2>
        </div>
        <p className="text-center text-gray-400 mt-4 font-sans text-lg max-w-2xl mx-auto">
          Visual data logs from recent successful operations.
        </p>
      </div>

      <div className="relative w-full flex flex-col gap-6 transform -rotate-2 scale-105">
        {/* Top Row - Scrolling Left */}
        <div className="w-full overflow-hidden">
          <motion.div style={{ x: x1 }}>
            <div className="marquee-track">
              {row1.map((src, idx) => (
                <div key={`r1-${idx}`} className="w-64 h-48 md:w-80 md:h-60 flex-shrink-0 mx-3 rounded-lg overflow-hidden border border-glass-border hover:border-neon-cyan transition-colors relative group">
                  <div className="absolute inset-0 bg-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                  <img src={src} alt="Party Event" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 glitch-img" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row - Scrolling Right */}
        <div className="w-full overflow-hidden">
          <motion.div style={{ x: x2 }}>
            <div className="marquee-track-reverse">
              {row2.map((src, idx) => (
                <div key={`r2-${idx}`} className="w-64 h-48 md:w-80 md:h-60 flex-shrink-0 mx-3 rounded-lg overflow-hidden border border-glass-border hover:border-neon-magenta transition-colors relative group">
                  <div className="absolute inset-0 bg-neon-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                  <img src={src} alt="Party Event" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 glitch-img" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient Overlays for smooth fade out on edges */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-cyber-dark to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyber-dark to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}
