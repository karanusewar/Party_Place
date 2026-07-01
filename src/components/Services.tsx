import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Disc, Users, Star, Music, Cake, Sparkles } from 'lucide-react';
import { useRef, MouseEvent } from 'react';
import FloatingParticles from './FloatingParticles';
import GlitchText from './GlitchText';

const services = [
  { icon: <Star size={32} />, title: 'Childrens Party (3-7 yrs)', desc: 'Specialized DJ, entertainer, mic singing, and our signature checkered light dance floor.' },
  { icon: <Disc size={32} />, title: 'Childrens Party (8-11 yrs)', desc: 'The ultimate children\'s disco experience. The best choice for this age group!' },
  { icon: <Music size={32} />, title: 'Teen Party (12-13 yrs)', desc: 'High-energy teen parties specifically designed for 6th and 7th graders.' },
  { icon: <Users size={32} />, title: 'Farewell Party', desc: 'Kindergarten, primary school, summer, or moving away parties.' },
  { icon: <Cake size={32} />, title: 'Catering & Birthday Cakes', desc: 'Custom menus, premium catering, and themed birthday cakes for every event.' },
  { icon: <Sparkles size={32} />, title: 'Extra Services', desc: 'Breakdance, zumba, hip hop, mascots, glow facepainting, photography, and giveaways.' },
];

function ServiceCard({ service, idx }: { service: any, idx: number, key?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="glass-card glass-card-magenta p-8 hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="text-neon-magenta mb-6 bg-neon-magenta/10 w-16 h-16 rounded-lg flex items-center justify-center border border-neon-magenta/30"
      >
        {service.icon}
      </div>
      <h3 style={{ transform: "translateZ(30px)" }} className="text-2xl font-bold text-white mb-3">{service.title}</h3>
      <p style={{ transform: "translateZ(20px)" }} className="text-gray-400 font-sans leading-relaxed">{service.desc}</p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-cyber-dark relative border-y border-glass-border overflow-hidden" style={{ perspective: 1000 }}>
      <FloatingParticles count={20} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 flex justify-center gap-2 flex-wrap text-center">
            <GlitchText text="Entertainment" delay={0.1} />
            <GlitchText text="Modules" className="text-neon-magenta" delay={0.2} />
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto font-sans text-lg"
          >
            Deploying top-tier assets for maximum engagement.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
