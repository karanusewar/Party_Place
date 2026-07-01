import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Zap, Users } from 'lucide-react';
import { useRef } from 'react';
import GlitchText from './GlitchText';

const venues = [
  { id: 'ilioupoli', name: 'Party Place Ilioupoli', address: 'El. Venizelou 160, Ilioupoli', capacity: '100 Guests', phone: '+30 210 995 9160', img: 'https://www.partyplace.gr/images/upload/Places2-Party-Place-Voulas-8586017574549802438-s2.jpg' },
  { id: 'voula', name: 'Party Place Voula', address: 'Kalimnou 53, Voula', capacity: '120 Guests', phone: '+30 210 899 5508', img: 'https://www.partyplace.gr/images/upload/Places5-Party_Place_%CE%9C%CE%B9%CE%BA%CF%81%CE%BF%CE%BB%CE%AF%CE%BC%CE%B1%CE%BD%CE%BF_01-8584424869010137482-s2.jpg' },
  { id: 'voula-garden', name: 'Garden in Voula', address: 'Kalimnou 53, Voula (Outdoor)', capacity: '60 Guests', phone: '+30 210 899 5508', img: 'https://www.partyplace.gr/images/upload/Places3-kipos-party-place-voulas-8586017476008083411-s2.jpg' },
  { id: 'keratsini', name: 'Party Time Disco', address: '49 Salaminos Ave., Keratsini', capacity: '60 Guests', phone: '+30 211 183 3877', img: 'https://www.partyplace.gr/images/upload/Places4-Party_Time_Disco_Party_for_Kids_Athens_Greece-8585632119247031332-s2.jpg' },
];

function VenueCard({ venue, idx }: { venue: any, idx: number, key?: any }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="glass-card group cursor-pointer"
    >
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-cyber-dark/40 group-hover:bg-transparent transition-colors z-10"></div>
        <motion.img 
          style={{ y, scale: 1.2 }}
          src={venue.img} 
          alt={venue.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform group-hover:scale-[1.3] transition-transform duration-700 glitch-img" 
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyber-dark to-transparent z-10"></div>
      </div>
      <div className="p-6 relative z-20">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">{venue.name}</h3>
        <div className="flex flex-col gap-2 mt-3">
          <p className="text-gray-400 flex items-center gap-2 text-sm font-sans">
            <MapPin size={16} className="text-neon-magenta" /> {venue.address}
          </p>
          <p className="text-gray-400 flex items-center gap-2 text-sm font-sans">
            <Users size={16} className="text-neon-cyan" /> Max Capacity: {venue.capacity}
          </p>
          <p className="text-gray-400 flex items-center gap-2 text-sm font-sans">
            <Zap size={16} className="text-neon-purple" /> {venue.phone}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Venues() {
  return (
    <section id="venues" className="py-24 relative bg-cyber-darker">
      <div className="absolute inset-0 bg-checkered opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <Zap className="text-neon-cyan" size={32} />
          <h2 className="text-4xl font-bold text-white flex gap-2">
            <GlitchText text="Active" delay={0.1} />
            <GlitchText text="Venues" className="text-neon-cyan" delay={0.2} />
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((venue, idx) => (
            <VenueCard key={venue.id} venue={venue} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
