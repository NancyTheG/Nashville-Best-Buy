import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data';

const VisualCategoryGrid: React.FC = () => {
  // Use specific categories for this grid to ensure they match the user's "Grid 2" context
  // We'll choose the top 6 that correspond to the departments mentioned
  const featuredCats = CATEGORIES.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-primary tracking-tight">Shop by Department</h2>
        <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {featuredCats.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="relative group block h-[450px] sm:h-[500px] rounded-[32px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-2 border border-gray-100/50"
            >
              {/* Standardized Image Container */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:via-black/50"></div>

              {/* Visual Hierarchy & Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-9 md:p-11 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-accent text-[10px] font-black uppercase tracking-[3px] opacity-90">Department</p>
                    <h3 className="text-3xl font-black text-white leading-tight transition-transform duration-500 group-hover:-translate-y-1">{cat.name}</h3>
                  </div>

                  {/* Sub-category Points with Uniform Alignment */}
                  <ul className="space-y-2.5 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {cat.subcategories.slice(0, 3).map((sub, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
                        {/* Bullet point indicator */}
                        <div className="w-2 h-[2px] bg-accent rounded-full flex-shrink-0" />
                        <span className="text-[13px] font-bold tracking-wide">{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3 text-white/40 group-hover:text-accent transition-all duration-300">
                  <span className="text-[10px] font-black uppercase tracking-[3px]">Explore Collection</span>
                  <div className="w-8 h-px bg-current group-hover:w-12 transition-all duration-500"></div>
                </div>
              </div>

              {/* Subtle Outer Glow Decoration on Hover */}
              <div className="absolute inset-0 ring-1 ring-white/10 group-hover:ring-accent/30 rounded-[32px] transition-all duration-500"></div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VisualCategoryGrid;
