import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const visualCats = [
  { name: 'Electronics & Technology', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80' },
  { name: 'Fashion & Apparel', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80' },
  { name: 'Home & Living', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { name: 'Health & Beauty', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80' },
  { name: 'Toys', img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80' },
  { name: 'Car Accessories', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80' }
];

const VisualCategoryGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-primary tracking-tight">Shop by Department</h2>
        <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visualCats.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="relative group block h-[450px] rounded-[16px] overflow-hidden shadow-xl"
            >
              <img 
                src={cat.img} 
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-400 ease-in-out group-hover:scale-[1.06]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent via-transparent transition-opacity" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }}></div>
              <div className="absolute inset-0 flex flex-col justify-end p-10 space-y-2">
                <h3 className="text-2xl font-bold text-white leading-tight">{cat.name}</h3>
                <span className="text-[11px] font-bold text-white uppercase tracking-widest underline decoration-accent underline-offset-4">
                  Explore More
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VisualCategoryGrid;
