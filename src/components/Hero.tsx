import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
import GlitchText from './GlitchText';

export default function Hero({ onBook }: { onBook: () => void }) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleText = useTransform(scrollY, [0, 500], [1, 0.9]);
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const xCyberElements = useTransform(scrollY, [0, 500], [0, -100]);
  const scaleYCyberElements = useTransform(scrollY, [0, 500], [1, 3]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-darker pt-16">
      {/* Background with advanced Parallax and overlays */}
      <motion.div className="absolute inset-0 z-0" style={{ y: yBg }}>
        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-darker/60 via-transparent to-cyber-darker z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.1)_0%,transparent_60%)] z-10 mix-blend-screen"></div>
        <img 
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2600&auto=format&fit=crop" 
          alt="Premium Party Concert Vibe" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-70 mix-blend-lighten"
        />
        {/* Animated Laser Beams */}
        <div className="laser-beam left-[15%] top-[-20%] opacity-40 blur-[2px]"></div>
        <div className="laser-beam laser-beam-magenta right-[20%] top-[-10%] opacity-50 blur-[2px]"></div>
        <div className="laser-beam left-1/2 top-[-30%] opacity-30" style={{ animationDelay: '-3s' }}></div>
      </motion.div>

      {/* Main Content Container with Glassmorphism Backdrop */}
      <motion.div 
        className="container mx-auto px-6 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8"
        style={{ opacity: opacityText, y: yText, scale: scaleText }}
      >
        {/* Left Column: Text & CTA */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", staggerChildren: 0.2 }}
          className="flex-1 w-full max-w-2xl text-left pt-12 md:pt-0 pb-16 md:pb-0"
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(0,243,255,0.2)]"
          >
            <Sparkles size={16} className="text-neon-cyan" />
            <span className="text-neon-cyan text-xs md:text-sm font-display tracking-widest uppercase font-bold">
              System Online // Best Disco in Athens
            </span>
          </motion.div>



          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tighter"
          >
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple drop-shadow-[0_0_10px_rgba(176,38,255,0.8)]">ULTIMATE</span><br/>
            CHILDREN'S<br/>
            EXPERIENCE.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-300 text-lg md:text-xl mb-10 font-sans font-medium leading-relaxed max-w-xl border-l-2 border-neon-magenta pl-6 opacity-90 backdrop-blur-sm"
          >
            Time travel through the best party music era with our signature checkered light dance floors, prestigious DJs, and videowall projections. It's a children's disco. It's a private party venue. IT IS PARTY PLACE.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button onClick={onBook} className="btn-cyber flex items-center justify-center gap-3 text-lg py-4 px-8 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-105 transition-transform">
              INITIALIZE BOOKING <ChevronRight size={20} />
            </button>
            <button onClick={() => document.getElementById('venues')?.scrollIntoView({ behavior: 'smooth' })} className="btn-cyber btn-cyber-magenta flex items-center justify-center gap-3 text-lg py-4 px-8 opacity-80 hover:opacity-100 hover:scale-105 transition-all">
              SCAN VENUES
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Cyberpunk Decorative UI Frame */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
           animate={{ opacity: 1, scale: 1, rotateY: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="hiddenPicker lg:flex flex-1 justify-end relative perspective-1000 hidden lg:block"
        >
          <div className="relative w-full max-w-md aspect-square rounded-2xl border border-glass-border bg-glass p-8 backdrop-blur-lg shadow-2xl transform-style-3d overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-magenta/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Inner Sci-Fi HUD Elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-cyan/50"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-magenta/50"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-cyan/50"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-purple/50"></div>
            
            <div className="h-full w-full border border-gray-800 rounded-xl relative overflow-hidden flex items-center justify-center">
               {/* Scanner Line */}
               <motion.div 
                 animate={{ y: ['-100%', '200%'] }}
                 transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                 className="absolute top-0 left-0 w-full h-1 bg-neon-cyan shadow-[0_0_15px_rgba(0,243,255,1)] z-10"
               />
               
               <div className="w-full h-full flex flex-col justify-between z-20">
                 <div className="flex justify-between items-center border-b border-neon-cyan/30 pb-3">
                   <span className="font-display text-neon-cyan tracking-widest text-xs uppercase font-bold">Vibe Check</span>
                   <span className="font-display text-neon-magenta tracking-widest text-xs uppercase animate-pulse font-bold">Live</span>
                 </div>
                 
                 <div className="flex-grow flex flex-col justify-center gap-6 py-6">
                   <div>
                     <div className="flex justify-between text-xs text-gray-400 font-display mb-2 tracking-widest">
                       <span>ENERGY LEVEL</span>
                       <span className="text-neon-cyan font-bold">MAX</span>
                     </div>
                     <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                       <div className="h-full bg-neon-cyan w-full shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
                     </div>
                   </div>
                   
                   <div>
                     <div className="flex justify-between text-xs text-gray-400 font-display mb-2 tracking-widest">
                       <span>LASER ARRAY</span>
                       <span className="text-neon-magenta font-bold">ACTIVE</span>
                     </div>
                     <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                       <div className="h-full bg-neon-magenta w-[85%] shadow-[0_0_10px_rgba(255,0,255,0.8)]"></div>
                     </div>
                   </div>
                   
                   <div className="flex items-end justify-between h-16 gap-1.5 mt-2">
                     {[...Array(12)].map((_, i) => (
                       <motion.div 
                         key={i}
                         className="w-full bg-gradient-to-t from-neon-cyan to-neon-purple rounded-t-sm"
                         animate={{ height: ['20%', '100%', '30%', '80%', '40%'] }}
                         transition={{ repeat: Infinity, duration: 0.8 + Math.random() * 0.5, ease: 'easeInOut' }}
                       />
                     ))}
                   </div>
                 </div>
                 
                 <div className="text-center pt-3 border-t border-neon-purple/30">
                   <GlitchText text="PARTY PROTOCOL ENGAGED" className="text-xs md:text-sm font-display font-bold text-white tracking-widest" delay={0.2} />
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-3 text-neon-cyan opacity-80 cursor-pointer hover:opacity-100 hover:-translate-y-1 transition-all"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-neon-cyan"></div>
        <span className="font-display text-[10px] tracking-[0.3em] uppercase font-bold hidden md:block">Descend</span>
        <ChevronDown size={28} className="drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
      </motion.div>

      {/* Decorative Cyber Elements */}
      <motion.div 
        className="absolute top-1/2 right-10 w-[2px] h-40 bg-gradient-to-b from-transparent via-neon-magenta to-transparent hidden lg:block z-20 opacity-50"
        style={{ scaleY: scaleYCyberElements }}
      ></motion.div>

      {/* Enhanced Bottom Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-black/40 border-t border-glass-border py-3 z-30 backdrop-blur-md">
        <div className="marquee-track flex whitespace-nowrap">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="flex items-center text-gray-400 font-display text-xs tracking-[0.2em] mx-6">
              <span className={i % 2 === 0 ? "text-neon-cyan" : "text-neon-magenta"}>//</span>
              <span className="mx-2">PARTY PLACE ATHENS</span>
              <span className={i % 2 !== 0 ? "text-neon-cyan" : "text-neon-magenta"}>//</span>
              <span className="mx-2">NEXT-GEN ENTERTAINMENT</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
