import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import GlitchText from './GlitchText';

const packages = [
  {
    name: 'Standard Protocol',
    price: 'Base Tier',
    color: 'cyan',
    features: ['Private Venue Access', 'Prestigious DJ & Sound System', 'Checkered Light Dance Floor', '1 Entertainer / Animator', 'Basic Beverages & Snacks']
  },
  {
    name: 'Overdrive Tier',
    price: 'Popular',
    color: 'magenta',
    popular: true,
    features: ['Extended Venue Access', 'DJ & Karaoke System', 'Videowall Projections', '2 Entertainers / Animators', 'Glow Facepainting & Giveaways', 'Full Catering Menu']
  },
  {
    name: 'Cybernetic Elite',
    price: 'Ultimate',
    color: 'purple',
    features: ['VIP Venue Access', 'VIP DJ & MC', 'Breakdance / Hip Hop Crew', 'Mascots & Comic Walkabouts', 'Technology & Photography Package', 'Premium Catering & Custom Cake']
  }
];

export default function Packages({ onBook }: { onBook: () => void }) {
  return (
    <section id="packages" className="py-24 relative overflow-hidden">
      <FloatingParticles count={15} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 flex justify-center gap-2 flex-wrap text-center">
            <GlitchText text="Access" delay={0.1} />
            <GlitchText text="Tiers" className="text-neon-cyan" delay={0.2} />
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto font-sans text-lg"
          >
            Select your event parameters. Each party is unique and flexible to meet your desires. Plan your child's party at any price range you like.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`glass-card p-8 flex flex-col ${pkg.popular ? 'border-neon-magenta shadow-[0_0_30px_rgba(255,0,255,0.15)] transform md:-translate-y-4' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-neon-magenta text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
                  Recommended
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 flex-wrap ${pkg.color === 'cyan' ? 'text-neon-cyan' : pkg.color === 'magenta' ? 'text-neon-magenta' : 'text-neon-purple'}`}>
                {pkg.name}
              </h3>
              <div className="text-3xl md:text-4xl font-black text-white mb-6">{pkg.price}</div>
              
              <ul className="space-y-4 mb-8 flex-grow font-sans">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-gray-300">
                    <Check size={20} className={`shrink-0 mt-0.5 ${pkg.color === 'cyan' ? 'text-neon-cyan' : pkg.color === 'magenta' ? 'text-neon-magenta' : 'text-neon-purple'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={onBook}
                className={`btn-cyber w-full ${pkg.color === 'magenta' ? 'btn-cyber-magenta' : ''}`}
              >
                Select Tier
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
