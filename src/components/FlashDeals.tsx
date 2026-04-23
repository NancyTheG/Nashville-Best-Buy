import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';

const FlashDeals: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay.getTime() - now.getTime();
      
      if (diff <= 0) {
        // Reset or whatever
      } else {
        setTimeLeft({
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const flashProductIds = ['1', '5', '7', '8'];
  const flashProducts = PRODUCTS.filter(p => flashProductIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent rounded-2xl text-white">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <h2 className="text-3xl font-black text-primary">Flash Deals</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Ending Soon - Don't Miss Out!</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Resets in:</span>
          <div className="flex gap-2">
            {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center text-xl font-black shadow-lg">
                  {String(val).padStart(2, '0')}
                </div>
                {i < 2 && <span className="text-2xl font-black text-primary">:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {flashProducts.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <ProductCard product={p}>
              <div className="space-y-2 py-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-400">Availability</span>
                  <span className="text-accent">{20 - (i * 2)} left in stock</span>
                </div>
                <div className="h-1.5 w-full bg-[#F0F0F0] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(20 - i*2) / 20 * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-accent rounded-full"
                  ></motion.div>
                </div>
              </div>
            </ProductCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FlashDeals;
