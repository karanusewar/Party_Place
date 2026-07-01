import { motion } from 'motion/react';
import { Terminal, Users, Calendar, Zap } from 'lucide-react';
import GlitchText from './GlitchText';

const stats = [
  { icon: <Calendar size={40} />, value: "20+", label: "Years Experience" },
  { icon: <Zap size={40} />, value: "100%", label: "Success Guarantee" },
  { icon: <Terminal size={40} />, value: "4", label: "Strategic Sectors" },
  { icon: <Users size={40} />, value: "100+", label: "Max Capacity" }
];

export default function Stats() {
  return (
    <section id="stats" className="py-20 relative bg-cyber-darker border-t border-glass-border overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5, type: "spring" }}
              className="flex flex-col items-center text-center p-6 glass-card group hover:border-neon-cyan transition-colors"
            >
              <div className="text-neon-magenta mb-4 group-hover:text-neon-cyan transition-colors group-hover:scale-110 transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                <GlitchText text={stat.value} delay={idx * 0.1 + 0.3} />
              </div>
              <div className="text-gray-400 font-display text-sm md:text-base uppercase tracking-widest group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
