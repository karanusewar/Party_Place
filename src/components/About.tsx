import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import GlitchText from './GlitchText';
import ParallaxImage from './ParallaxImage';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="py-32 relative bg-cyber-dark overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      
      {/* Decorative large text in background */}
      <motion.div 
        className="absolute top-1/4 left-[-10%] text-[15vw] font-black text-white/5 font-display whitespace-nowrap pointer-events-none"
        style={{ x: y1 }}
      >
        TIME TRAVEL
      </motion.div>
      <motion.div 
        className="absolute bottom-1/4 right-[-10%] text-[15vw] font-black text-white/5 font-display whitespace-nowrap pointer-events-none"
        style={{ x: y2 }}
      >
        80S VIBES
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          style={{ opacity }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 flex gap-3 flex-wrap">
              <GlitchText text="Enter" delay={0.1} />
              <GlitchText text="The" className="text-neon-cyan" delay={0.2} />
              <GlitchText text="Simulation" className="text-neon-magenta" delay={0.3} />
            </h2>
            
            <div className="glass-card p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-purple"></div>
              <p className="text-xl md:text-2xl text-gray-300 font-sans leading-relaxed mb-6">
                You instantly find yourself time traveling through the best party music era, the classical 80's, with the checkered light dance floors, prestigious DJs, videoclips projected on the back wall, the sweet sense of daydreaming into musical journeys!
              </p>
              <p className="text-lg text-gray-400 font-sans leading-relaxed mb-6">
                After 20 years of experience, continuous creativity, the lowest prices than ever before, and great respect to all our guests, we promise you to deliver the best party ever. Our venue's equipment is top notch allowing you to get the best experience at your parties.
              </p>
              <p className="text-lg text-neon-cyan font-sans italic">
                "This is the kind of atmosphere today's children are looking for, with their own music they relate to, their friends for life from the unforgettable school years, and the need for creativity through dancing, singing, and playing."
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-neon-cyan to-neon-magenta opacity-30 blur-2xl rounded-full"></div>
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2680&auto=format&fit=crop" 
              alt="Party Place Dance Floor" 
              className="w-full h-[500px] rounded-2xl border border-glass-border shadow-[0_0_30px_rgba(0,243,255,0.2)]"
            />
            <div className="absolute -bottom-6 -left-6 glass-card p-4 border-neon-magenta">
              <div className="font-display font-bold text-white text-xl">20+ YEARS</div>
              <div className="text-neon-cyan text-sm tracking-widest uppercase">Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
