import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

const WhatsAppButton: React.FC = () => {
  // Replace with actual support number
  const phoneNumber = "923000000000"; 
  const message = encodeURIComponent("Hi! I'm interested in gear from Nashville Best Buy.");
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div
      className="fixed bottom-20 right-5 z-[999] md:bottom-8 md:right-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1 
      }}
    >
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, translateY: -5 }}
        whileTap={{ scale: 0.95 }}
        className="relative block w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_45px_rgba(37,211,102,0.5)] transition-shadow duration-500"
        id="whatsapp-floating-button"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} fill="currentColor" className="text-white md:w-9 md:h-9 relative z-10" />
        
        {/* Calm Pulse effect */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-[#25D366] -z-10"
          animate={{ 
            scale: [1, 1.4],
            opacity: [0.3, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton;
