import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Terminal } from 'lucide-react';
import GlitchText from './GlitchText';

export default function BookingWizard({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    venue: '',
    package: '',
    date: '',
    guests: '',
    name: '',
    email: ''
  });

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setStep(1);
      setFormData({ venue: '', package: '', date: '', guests: '', name: '', email: '' });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-card w-full max-w-2xl bg-cyber-darker/90 border-neon-cyan/50 shadow-[0_0_50px_rgba(0,243,255,0.2)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-glass-border">
            <div className="flex items-center gap-3">
              <Terminal className="text-neon-cyan" />
              <h2 className="text-xl font-bold text-white tracking-widest">
                <GlitchText text="BOOKING_TERMINAL" delay={0.1} />
              </h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-neon-magenta transition-colors">
              <X size={24} />
            </button>
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="p-12 flex flex-col items-center justify-center text-center flex-grow"
            >
              <div className="w-20 h-20 rounded-full bg-neon-cyan/20 flex items-center justify-center mb-6 border border-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.5)]">
                <Terminal className="text-neon-cyan" size={40} />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">
                <GlitchText text="TRANSMISSION_SUCCESSFUL" delay={0.1} />
              </h3>
              <p className="text-gray-400 font-sans">
                Your booking request has been logged into the mainframe. Our operatives will contact you shortly to confirm the parameters.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Progress Bar */}
          <div className="h-1 bg-cyber-dark w-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="p-8 flex-grow overflow-y-auto font-sans">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-display font-bold text-white mb-6">Select Sector (Venue)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'ilioupoli', name: 'Party Place Ilioupoli', cap: '100' },
                    { id: 'voula', name: 'Party Place Voula', cap: '120' },
                    { id: 'voula-garden', name: 'Garden in Voula', cap: '60' },
                    { id: 'keratsini', name: 'Party Time Disco', cap: '60' }
                  ].map(v => (
                    <button 
                      key={v.id}
                      onClick={() => updateForm('venue', v.id)}
                      className={`p-4 border text-left transition-all ${formData.venue === v.id ? 'border-neon-cyan bg-neon-cyan/10 text-white' : 'border-glass-border text-gray-400 hover:border-neon-cyan/50'}`}
                    >
                      <div className="font-display font-bold text-lg">{v.name}</div>
                      <div className="text-sm opacity-70">Max Capacity: {v.cap} Units</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Select Protocol (Package)</h3>
                <p className="text-gray-400 font-sans mb-6">Plan your child's party at any price range you like.</p>
                <div className="space-y-4">
                  {['Standard Protocol', 'Overdrive Tier', 'Cybernetic Elite'].map(p => (
                    <button 
                      key={p}
                      onClick={() => updateForm('package', p)}
                      className={`w-full p-4 border text-left transition-all flex justify-between items-center ${formData.package === p ? 'border-neon-magenta bg-neon-magenta/10 text-white' : 'border-glass-border text-gray-400 hover:border-neon-magenta/50'}`}
                    >
                      <span className="font-display font-bold text-lg">{p}</span>
                      {formData.package === p && <div className="w-3 h-3 rounded-full bg-neon-magenta shadow-[0_0_10px_#ff00ff]" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-display font-bold text-white mb-6">Temporal Parameters</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-neon-cyan font-display mb-2 text-sm">Target Date</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => updateForm('date', e.target.value)}
                      className="w-full bg-cyber-dark border border-glass-border p-3 text-white focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-neon-cyan font-display mb-2 text-sm">Estimated Units (Guests)</label>
                    <input 
                      type="number" 
                      value={formData.guests}
                      onChange={(e) => updateForm('guests', e.target.value)}
                      placeholder="e.g. 30"
                      className="w-full bg-cyber-dark border border-glass-border p-3 text-white focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-display font-bold text-white mb-6">Commander Details</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-neon-magenta font-display mb-2 text-sm">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Enter designation"
                      className="w-full bg-cyber-dark border border-glass-border p-3 text-white focus:border-neon-magenta focus:outline-none focus:ring-1 focus:ring-neon-magenta transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-neon-magenta font-display mb-2 text-sm">Comms Link (Email)</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="Enter email"
                      className="w-full bg-cyber-dark border border-glass-border p-3 text-white focus:border-neon-magenta focus:outline-none focus:ring-1 focus:ring-neon-magenta transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-glass-border flex justify-between bg-black/20">
            {step > 1 ? (
              <button onClick={prevStep} className="text-gray-400 hover:text-white flex items-center gap-2 font-display uppercase text-sm tracking-wider">
                <ChevronLeft size={16} /> Back
              </button>
            ) : <div></div>}
            
            {step < 4 ? (
              <button 
                onClick={nextStep} 
                className="btn-cyber py-2 px-6 text-sm"
                disabled={
                  (step === 1 && !formData.venue) || 
                  (step === 2 && !formData.package) ||
                  (step === 3 && (!formData.date || !formData.guests))
                }
              >
                Proceed <ChevronRight size={16} className="inline" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className="btn-cyber btn-cyber-magenta py-2 px-6 text-sm"
                disabled={!formData.name || !formData.email}
              >
                Transmit Request
              </button>
            )}
          </div>
          </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
