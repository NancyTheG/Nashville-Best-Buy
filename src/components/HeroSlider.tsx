import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    headline: "Shop Everything You Need in Nashville",
    subtext: "Electronics, Fashion, Home & More — All in One Place.",
    button: "Shop Now",
    link: "/shop",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000",
    bg: "linear-gradient(135deg, #EEF2F8 0%, #D6E4F7 100%)"
  },
  {
    id: 2,
    headline: "Up to 40% OFF on Electronics",
    subtext: "Grab the best deals on phones, laptops, audio & more.",
    button: "Shop Electronics",
    link: "/shop?category=Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000",
    bg: "linear-gradient(135deg, #E8F0FE 0%, #C8DAFC 100%)"
  },
  {
    id: 3,
    headline: "Fresh Fashion Arrivals This Season",
    subtext: "Men, Women, Kids — Find your style at unbeatable prices.",
    button: "Explore Fashion",
    link: "/shop?category=Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000",
    bg: "linear-gradient(135deg, #FDF3E7 0%, #FAE0C0 100%)"
  },
  {
    id: 4,
    headline: "Transform Your Home & Living Space",
    subtext: "Furniture, Decor, Kitchen & more — delivered to your door.",
    button: "Shop Home",
    link: "/shop?category=Home",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000",
    bg: "linear-gradient(135deg, #E8F5EE 0%, #C8EDD8 100%)"
  }
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section 
      className="relative w-full h-[650px] sm:h-[700px] lg:h-[600px] overflow-hidden transition-all duration-500 ease-in-out"
      style={{ background: slides[current].bg }}
    >
      {/* Decorative Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-12 lg:px-24 py-12 lg:py-0 text-center lg:text-left"
        >
          <div className="flex-1 space-y-6 lg:space-y-8 z-10 w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-primary leading-tight lg:leading-[1.1]"
            >
              {slides[current].headline}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0"
            >
              {slides[current].subtext}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full flex justify-center lg:justify-start"
            >
              <Link 
                to={slides[current].link} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent text-white font-black py-4 px-10 rounded-full shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 transition-all group min-h-[48px]"
              >
                {slides[current].button} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="flex-1 w-full flex items-center justify-center relative p-4 mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl relative z-10"
            >
              <img 
                src={slides[current].image} 
                alt={slides[current].headline}
                loading={current === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute w-[80%] h-[80%] bg-accent/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Always visible but optimized for mobile tap targets */}
      <button onClick={prev} className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 p-3 lg:p-4 bg-white/50 backdrop-blur-md rounded-full text-primary hover:bg-white transition-all z-20 min-w-[44px] min-h-[44px] flex items-center justify-center">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 p-3 lg:p-4 bg-white/50 backdrop-blur-md rounded-full text-primary hover:bg-white transition-all z-20 min-w-[44px] min-h-[44px] flex items-center justify-center">
        <ChevronRight size={24} />
      </button>

      {/* Dots - Improved clickable area */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`cursor-pointer transition-all min-w-[12px] min-h-[12px] rounded-full flex items-center justify-center`}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className={`h-2.5 rounded-full transition-all ${i === current ? 'bg-accent w-8' : 'bg-gray-300 w-2.5'}`} />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
