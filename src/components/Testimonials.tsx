import { motion, useScroll, useTransform } from 'motion/react';
import { MessageSquare, Star } from 'lucide-react';
import { useRef } from 'react';
import GlitchText from './GlitchText';

const baseTestimonials = [
  {
    name: "Happy Parent",
    role: "Birthday Party",
    text: "You have grasped exactly what parents would like for their children. But as parents, we ourselves had great fun too! Thank you!",
    rating: 5
  },
  {
    name: "Satisfied Customer",
    role: "School Event",
    text: "People told us it would be great. We just didn't expect it to be THAT great! We all had such fun, both children and parents!",
    rating: 5
  },
  {
    name: "Returning Client",
    role: "Teen Party",
    text: "I had no doubt it would be a success because I knew you were good. But now I was proven right! We shall definitely return next year!",
    rating: 5
  },
  {
    name: "Proud Mother",
    role: "Farewell Party",
    text: "I'm going to recommend you everywhere! You made my children happy and that's enough for me. You are exceptionally professional!",
    rating: 5
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -400]);

  // Duplicate for infinite scroll
  const testimonials = [...baseTestimonials, ...baseTestimonials, ...baseTestimonials, ...baseTestimonials];

  return (
    <section ref={containerRef} className="py-24 relative bg-cyber-darker overflow-hidden border-t border-glass-border">
      <div className="absolute inset-0 bg-checkered opacity-10"></div>
      <div className="container mx-auto px-6 relative z-10 mb-16">
        <div className="flex items-center gap-4 justify-center">
          <MessageSquare className="text-neon-cyan" size={32} />
          <h2 className="text-4xl font-bold text-white text-center flex gap-2">
            <GlitchText text="User" delay={0.1} />
            <GlitchText text="Feedback" className="text-neon-cyan" delay={0.2} />
          </h2>
        </div>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <motion.div style={{ x }}>
          <div className="marquee-track flex gap-8 px-4">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="glass-card p-8 flex flex-col relative w-80 md:w-96 flex-shrink-0 hover:border-neon-cyan transition-colors"
              >
                <div className="absolute -top-4 -right-4 text-neon-magenta opacity-20">
                  <MessageSquare size={80} />
                </div>
                <div className="flex gap-1 mb-6 text-neon-cyan">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 font-sans italic mb-8 flex-grow relative z-10">
                  "{t.text}"
                </p>
                <div className="border-t border-glass-border pt-4">
                  <div className="font-display font-bold text-white tracking-wider">{t.name}</div>
                  <div className="text-neon-magenta text-sm font-sans">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-cyber-darker to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyber-darker to-transparent z-20 pointer-events-none"></div>
      </div>
    </section>
  );
}
