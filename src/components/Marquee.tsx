import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check } from 'lucide-react';

const MESSAGES = [
  "Use Code: NASH20 for 20% Off Your First Order",
  "Secure Checkout Guaranteed",
  "Easy 30-Day Returns",
  "New Arrivals Every Week"
];

const PROMO_CODE = "NASH20";

const Marquee: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-accent h-10 sm:h-11 text-primary overflow-hidden relative z-[60] flex items-center border-b border-black/5">
      <div className="main-container flex justify-between items-center h-full w-full relative">
        {/* Left/Center: Messages */}
        <div className="hidden sm:flex flex-grow justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] whitespace-nowrap text-center block"
            >
              {MESSAGES[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Center only on mobile when hidden */}
        <div className="flex sm:hidden flex-grow justify-start">
           <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
            >
              {MESSAGES[index].length > 25 ? MESSAGES[index].substring(0, 25) + "..." : MESSAGES[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right: Promo Code */}
        <div className="flex-shrink-0 flex items-center gap-2 pl-4">
          <div className="hidden xs:flex items-center bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">20% OFF</div>
          <div className="flex items-center gap-1.5 bg-white/20 border border-white/50 rounded-md px-2 py-0.5 sm:py-1">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-wider opacity-80">CODE:</span>
            <span className="text-[10px] sm:text-[11px] font-black font-mono text-primary">{PROMO_CODE}</span>
          </div>
          
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] text-primary hover:text-white transition-colors min-h-[28px]"
            aria-label="Copy Promo Code"
          >
            {copied ? (
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1 text-white"
              >
                <Check size={12} strokeWidth={4} /> COPIED!
              </motion.span>
            ) : (
              <span className="flex items-center gap-1">
                COPY <Copy size={12} strokeWidth={2.5} />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
