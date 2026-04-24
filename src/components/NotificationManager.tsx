import React, { useEffect, useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

const NotificationManager: React.FC = () => {
  const { notifications, removeNotification, flyTrigger, clearFlyTrigger } = useApp();
  const [flyers, setFlyers] = useState<any[]>([]);

  // Function to play sound
  const playSuccessSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.warn("Audio context not supported", e);
    }
  };

  // Find cart icon position
  const getCartPos = () => {
    const desktopCart = document.getElementById('cart-icon-desktop');
    const mobileCart = document.getElementById('cart-icon-mobile');
    const cartEl = (window.innerWidth >= 768 ? desktopCart : mobileCart) || desktopCart || mobileCart;
    
    if (cartEl) {
      const rect = cartEl.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
    return { x: window.innerWidth - 50, y: 50 };
  };

  useEffect(() => {
    if (flyTrigger) {
      const cartPos = getCartPos();
      const newFlyer = {
        ...flyTrigger,
        endX: flyTrigger.endX || cartPos.x,
        endY: flyTrigger.endY || cartPos.y
      };
      setFlyers(prev => [...prev, newFlyer]);
      clearFlyTrigger();

      // play sound when it lands (or shortly before)
      setTimeout(playSuccessSound, 800);

      // Remove flyer after animation
      setTimeout(() => {
        setFlyers(prev => prev.filter(f => f.id !== newFlyer.id));
      }, 1000);
    }
  }, [flyTrigger, clearFlyTrigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 max-w-sm w-full p-4 pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="bg-primary rounded-2xl shadow-2xl p-4 flex items-center gap-3 border border-white/10"
            >
              <div className="bg-accent rounded-full p-1.5 text-white">
                <CheckCircle2 size={18} strokeWidth={3} />
              </div>
              <p className="text-white text-sm font-black flex-grow pr-4">
                {n.message}
              </p>
              <button 
                onClick={() => removeNotification(n.id)}
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-accent/30 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Fly-to-Cart Animation */}
      <AnimatePresence>
        {flyers.map((flyer) => (
          <motion.div
            key={flyer.id}
            initial={{ 
              left: flyer.startX - 40, 
              top: flyer.startY - 40,
              scale: 1,
              opacity: 1,
              rotate: 0,
              zIndex: 10000
            }}
            animate={{ 
              left: [flyer.startX - 40, flyer.endX - 20],
              top: [flyer.startY - 40, flyer.startY - 150, flyer.endY - 20], // Add an arc by going up then down
              scale: [1, 1.1, 0.1],
              opacity: [1, 1, 0],
              rotate: 360
            }}
            transition={{ 
              duration: 0.9, 
              ease: [0.45, 0, 0.55, 1], // Requested ease-in-out
              times: [0, 0.4, 1] // Custom timing for the arc steps
            }}
            className="fixed w-20 h-20 bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-accent pointer-events-none"
          >
            <img 
              src={flyer.image} 
              alt="Flying product" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationManager;
