import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CATEGORIES } from '../data';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryIcons: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cardWidth = 200;
  const gap = 24; // matching gap-6 (24px) for consistency with the layout
  const totalCards = CATEGORIES.length;

  // Responsive logic for visible cards
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      let visible = 2;
      if (vw >= 1440) visible = 6;
      else if (vw >= 1280) visible = 5;
      else if (vw >= 1024) visible = 4;
      else if (vw >= 768) visible = 3;
      else visible = 2;
      
      setVisibleCount(visible);
      
      // Clamp index on resize if it exceeds new max
      const newMax = totalCards - visible;
      setCurrentIndex(prev => Math.min(prev, Math.max(0, newMax)));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [totalCards]);

  const maxIndex = Math.max(0, totalCards - visibleCount);

  const goTo = useCallback((index: number) => {
    // Clamp between 0 and maxIndex
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    if (currentIndex >= maxIndex) {
      goTo(0); // Loop back
    } else {
      goTo(currentIndex + 1);
    }
  }, [currentIndex, maxIndex, goTo]);

  const prevSlide = () => {
    goTo(currentIndex - 1);
  };

  // Auto-play logic
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 3500);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-black text-primary mb-10 tracking-tight">Shop by Category</h2>
        
        <div 
          className="relative slider-wrapper group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl border border-gray-100 hover:bg-accent hover:text-white transition-all duration-300 hidden sm:flex ${currentIndex === 0 ? 'opacity-30 pointer-events-none' : 'opacity-0 group-hover/slider:opacity-100'}`}
            aria-label="Previous category"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl border border-gray-100 hover:bg-accent hover:text-white transition-all duration-300 hidden sm:flex ${currentIndex === maxIndex ? 'opacity-30 pointer-events-none' : 'opacity-0 group-hover/slider:opacity-100'}`}
            aria-label="Next category"
          >
            <ChevronRight size={24} strokeWidth={3} />
          </button>

          {/* Slider Viewport */}
          <div className="overflow-hidden px-1 py-4">
            <motion.div 
              className="flex gap-6 slider-track"
              animate={{ 
                x: `-${currentIndex * (cardWidth + gap)}px` 
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="category-card relative block w-[200px] h-[160px] rounded-[16px] overflow-hidden shrink-0 group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.08]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/85 transition-all duration-300" />
                  <span className="absolute bottom-[14px] left-[14px] text-white font-bold text-[13px] tracking-[1px] uppercase pointer-events-none">
                    {cat.name.split(' & ')[0]}
                  </span>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-2.5 mt-8 slider-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`dot h-2 rounded-full transition-all duration-500 ${currentIndex === i ? 'active w-10 bg-accent shadow-sm shadow-orange-200' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
    </div>
  );
};

export default CategoryIcons;
