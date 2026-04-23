import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="relative py-20 px-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)' }}>
      {/* Decorative Blurred Circles */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-accent/15 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-[60px] -right-[60px] w-[250px] h-[250px] rounded-full bg-white/8 blur-[60px] pointer-events-none" />
      <div className="absolute top-1/2 left-[60%] w-[200px] h-[200px] rounded-full bg-accent/8 blur-[50px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[700px] mx-auto bg-white rounded-[28px] p-8 sm:p-12 lg:p-[60px_80px] text-center transform transition-all duration-400 ease-out hover:-translate-y-2 group shadow-[0_4px_6px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.1),0_30px_60px_rgba(0,0,0,0.2),inset_0_2px_0px_rgba(255,255,255,0.8)] hover:shadow-[0_8px_12px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.15),0_50px_80px_rgba(0,0,0,0.25),inset_0_2px_0px_rgba(255,255,255,0.8)]"
      >
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gradient-to-r from-accent via-[#FF9A4D] to-accent rounded-b-lg" />

        <div className="space-y-3 mb-8">
          <span className="block text-[12px] font-semibold tracking-[3px] text-accent uppercase">
            ✉️ NEWSLETTER
          </span>
          <h2 className="text-4xl sm:text-[42px] font-extrabold text-primary leading-tight">
            Stay in the Loop
          </h2>
          <p className="text-[#666] text-base leading-relaxed max-w-md mx-auto">
            Join our community to receive exclusive Nashville offers, new arrivals, and retail news twice a week.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row items-center gap-3 w-full"
            >
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="flex-grow w-full sm:w-[340px] px-6 py-4 rounded-full border-2 border-[#E8E8E8] focus:border-accent outline-none focus:ring-4 focus:ring-accent/10 transition-all text-primary text-[15px]"
              />
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-accent text-white font-bold rounded-full transition-all hover:bg-[#e06010] active:scale-95 whitespace-nowrap"
              >
                Subscribe Now →
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-2 py-4"
            >
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center animate-bounce shadow-inner">
                <CheckCircle2 size={24} strokeWidth={3} />
              </div>
              <p className="text-[#22C55E] font-bold text-lg">
                You're subscribed! Welcome to Nashville BestBuy.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
          BY SUBSCRIBING, YOU AGREE TO OUR TERMS OF USE AND PRIVACY POLICY.
        </p>
      </motion.div>
    </section>
  );
};

export default Newsletter;
