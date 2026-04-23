import React from 'react';
import { motion } from 'motion/react';
import { Truck, RotateCcw, ShieldCheck, Star } from 'lucide-react';

const badges = [
  {
    icon: <Truck size={28} />,
    title: "Free Shipping on $50+",
    subtitle: "Fast & Reliable Local Delivery"
  },
  {
    icon: <RotateCcw size={28} />,
    title: "Easy 30-Day Returns",
    subtitle: "No Questions Asked Policy"
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Checkout",
    subtitle: "Premium Encrypted Payments"
  },
  {
    icon: <Star size={28} />,
    title: "50,000+ Happy Customers",
    subtitle: "Trusted Nashville Retailer"
  }
];

const TrustBadges: React.FC = () => {
  return (
    <section className="relative py-[60px] px-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.15,
                ease: "easeOut"
              }}
              className="group relative"
            >
              <div className="h-full bg-white/7 backdrop-blur-[10px] border border-white/15 rounded-[20px] p-[36px_28px] transition-all duration-300 ease-in-out hover:bg-white/14 hover:-translate-y-[6px] hover:border-accent hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex flex-col items-center sm:items-start text-center sm:text-left">
                {/* Icon Container */}
                <div className="w-[64px] h-[64px] rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-accent mb-5">
                  {badge.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-lg font-bold text-white mb-2 font-['Poppins']">
                  {badge.title}
                </h3>
                <p className="text-[13px] text-white/65 uppercase tracking-[0.5px] font-['Poppins'] leading-tight">
                  {badge.subtitle}
                </p>

                {/* Bottom Accent Line */}
                <div className="mt-4 w-10 h-[3px] bg-accent rounded-[2px] transition-all duration-300 ease-in-out group-hover:w-[70px]"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
