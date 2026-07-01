import { useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Venues from './components/Venues';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import BookingWizard from './components/BookingWizard';
import CustomCursor from './components/CustomCursor';
import { Terminal } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Scroll Progress Hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const scrollIndicatorHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="min-h-screen overflow-x-hidden bg-cyber-darker text-gray-200 selection:bg-neon-magenta selection:text-white">
      <CustomCursor />
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta origin-left z-50" 
        style={{ scaleX }} 
      />

      {/* Vertical Scroll Indicator */}
      <div className="fixed right-6 bottom-0 top-0 pointer-events-none z-40 hidden lg:flex flex-col items-center justify-center">
        <div className="text-neon-cyan font-display text-[10px] tracking-[0.3em] uppercase rotate-90 mb-16 opacity-50">
          Scroll
        </div>
        <div className="w-[1px] h-32 bg-gray-800 relative">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-neon-magenta shadow-[0_0_10px_rgba(255,0,255,0.8)]"
            style={{ height: scrollIndicatorHeight }}
          />
        </div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-cyber-darker/80 backdrop-blur-md border-b border-glass-border mt-1">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <img src="/logo_top.png" alt="Party Place" className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(0,243,255,0.8)] transition-transform group-hover:scale-105" />
              <span className="text-xl md:text-2xl font-display font-bold tracking-widest uppercase group-hover:opacity-80 transition-opacity">
                <span className="text-white">PARTY</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">PLACE</span>
              </span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-8 font-display text-sm tracking-widest uppercase">
            <a href="#venues" className="hover:text-neon-cyan transition-colors">Venues</a>
            <a href="#services" className="hover:text-neon-magenta transition-colors">Services</a>
            <a href="#packages" className="hover:text-neon-cyan transition-colors">Packages</a>
            <button onClick={() => setIsBookingOpen(true)} className="btn-cyber py-2 px-4 text-xs">
              Initialize
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero onBook={() => setIsBookingOpen(true)} />
        <About />
        <Stats />
        <Venues />
        <Gallery />
        <Services />
        <Packages onBook={() => setIsBookingOpen(true)} />
        <Testimonials />
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-black py-12 border-t border-glass-border"
      >
        <div className="container mx-auto px-6 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <img src="/logo_top.png" alt="Party Place" className="h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]" />
              <span className="text-2xl font-display font-bold tracking-widest uppercase">
                <span className="text-white">PARTY</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">PLACE</span>
              </span>
            </div>
            <p className="text-gray-500 font-sans text-sm">
              Powered by Triki Fun.<br/>
              Let us organize your party at home or at any other venue of your choice!<br/>
              210 9602 697 - www.trikifun.gr
            </p>
          </div>
          <div className="font-sans text-gray-400 text-sm space-y-2">
            <h4 className="font-display text-white tracking-widest mb-4">COMMS</h4>
            <p>Email: info@partyplace.gr</p>
            <p>Freq: +30 210 995 9160</p>
          </div>
          <div className="font-sans text-gray-400 text-sm space-y-2">
            <h4 className="font-display text-white tracking-widest mb-4">SECTORS</h4>
            <p>Ilioupoli: El. Venizelou 160</p>
            <p>Voula: Kalimnou 53</p>
            <p>Keratsini: 49 Salaminos Ave.</p>
          </div>
        </div>
        <div className="mt-12 text-center text-xs text-gray-600 font-display tracking-widest">
          © 2026 PARTY PLACE // ALL SYSTEMS NOMINAL
        </div>
      </motion.footer>

      <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
