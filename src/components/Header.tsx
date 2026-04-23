import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../AppContext';
import Marquee from './Marquee';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, wishlist } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <Marquee />
      <header className={`sticky top-0 z-header w-full bg-white transition-all duration-300 ${isScrolled ? 'py-1 shadow-xl' : 'py-0 border-b border-gray-100'}`}>
        {/* Top Header */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col md:flex-row items-center justify-between transition-all duration-300 ${isScrolled ? 'py-2 md:h-16' : 'py-4 md:h-20'} gap-4 md:gap-8`}>
            
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              {/* Hamburger (Mobile/Tablet) */}
              <button 
                className="md:hidden p-2 text-primary hover:bg-light-gray rounded-full transition-colors min-w-[44px] min-h-[44px]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl sm:text-2xl font-black tracking-tighter text-primary">
                  Nashville<span className="text-accent">BestBuy</span>
                </span>
              </Link>

              {/* Mobile Icons (Visible only on very small screens if needed, otherwise in row) */}
              <div className="flex md:hidden items-center gap-2">
                <Link to="/cart" className="p-2 text-primary relative min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <ShoppingBag size={22} strokeWidth={2.5} />
                  {cart.length > 0 && <span className="absolute top-2 right-2 bg-accent text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">{cart.length}</span>}
                </Link>
              </div>
            </div>

            {/* Search Bar - Responsive */}
            <div className="w-full md:flex-grow md:max-w-xl relative order-3 md:order-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search technology, fashion, home..."
                  className="w-full h-11 pl-5 pr-12 rounded-full border-2 border-gray-100 focus:border-accent outline-none text-sm transition-all focus:shadow-lg focus:ring-2 focus:ring-accent/20"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center hover:bg-orange-hover transition-all hover:scale-105 min-w-[36px] min-h-[36px]">
                  <Search size={16} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Icons Row - Desktop labels, Mobile icons only */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 order-2 md:order-3">
              <Link to="/wishlist" className="flex flex-col items-center p-1 text-primary hover:text-accent transition-colors relative group min-w-[44px]">
                <div className="relative">
                  <Heart size={22} strokeWidth={2.5} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-black mt-1 uppercase tracking-tighter hidden xl:block">Wishlist</span>
              </Link>
              
              <Link to="/cart" className="flex flex-col items-center p-1 text-primary hover:text-accent transition-colors relative group min-w-[44px]">
                <div className="relative">
                  <ShoppingBag size={22} strokeWidth={2.5} />
                  {cart.length > 0 && (
                    <motion.span 
                      key={cart.length}
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white"
                    >
                      {cart.reduce((acc, item) => acc + item.cartQuantity, 0)}
                    </motion.span>
                  )}
                </div>
                <span className="text-[9px] font-black mt-1 uppercase tracking-tighter hidden xl:block">Cart</span>
              </Link>

              <Link to="/my-account" className="flex flex-col items-center p-1 text-primary hover:text-accent transition-colors group min-w-[44px]">
                <User size={22} strokeWidth={2.5} />
                <span className="text-[9px] font-black mt-1 uppercase tracking-tighter hidden xl:block">Account</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mega Menu Navigation - Responsive */}
        <nav className="hidden md:block bg-gradient-to-br from-[#1B2A4A] to-[#243660] h-12 overflow-visible border-b-[3px] border-accent relative z-dropdown">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-full">
            <ul className="flex items-center justify-center h-full">
              {CATEGORIES.map((cat, index) => {
                const isActive = location.search.includes(`category=${encodeURIComponent(cat.name)}`);
                // Breakpoint logic for Tablet (hide last few items)
                const isHiddenOnTablet = index >= 7; // Show 7 items, hide the rest
                
                return (
                  <li 
                    key={cat.id} 
                    className={`group relative h-full flex items-center ${isHiddenOnTablet ? 'hidden lg:flex' : ''}`}
                    onMouseEnter={() => setActiveCategory(cat.id)}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <Link 
                      to={`/shop?category=${encodeURIComponent(cat.name)}`}
                      className={`px-4 lg:px-[18px] text-[12px] font-semibold uppercase tracking-[0.8px] transition-all duration-250 h-full flex items-center relative whitespace-nowrap cursor-pointer
                        ${isActive ? 'text-accent bg-white/12' : 'text-white/85 hover:text-accent hover:bg-white/8'}
                        ${index !== CATEGORIES.length - 1 ? 'border-r border-white/10' : ''}`}
                    >
                      {cat.name}
                      {/* Animated Underline */}
                      <span className={`absolute bottom-0 h-[3px] bg-accent rounded-t-[3px] transition-all duration-250
                        ${isActive ? 'left-[10%] right-[10%]' : 'left-1/2 right-1/2 group-hover:left-[10%] group-hover:right-[10%]'}`} 
                      />
                    </Link>

                    {/* MEGA MENU DROPDOWN */}
                    <AnimatePresence>
                      {activeCategory === cat.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-[48px] left-0 min-w-[500px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-b-2xl p-7 z-[1000] border-t-[3px] border-accent"
                        >
                          <div className="text-[11px] font-bold tracking-[2px] text-accent uppercase mb-3 pb-2.5 border-b border-[#F0F0F0]">
                            {cat.name}
                          </div>
                          <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub}
                                to={`/shop?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub)}`}
                                className="text-[13px] text-[#444] hover:text-accent hover:bg-[#FFF5EE] hover:pl-[14px] px-2.5 py-[7px] rounded-lg transition-all duration-200 flex items-center gap-2 relative before:content-['•'] before:text-accent before:text-[16px]"
                              >
                                {sub}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}

              {/* "More" Dropdown for Tablet */}
              <li 
                className="lg:hidden group relative h-full flex items-center"
                onMouseEnter={() => setActiveCategory('more')}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="px-4 text-[12px] font-semibold uppercase tracking-[0.8px] text-white/85 hover:text-accent transition-all duration-250 h-full flex items-center gap-1 cursor-pointer">
                  More <ChevronDown size={14} className={`transition-transform ${activeCategory === 'more' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeCategory === 'more' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-[48px] right-0 w-64 bg-white shadow-lg rounded-b-xl py-4 z-[1000] border-t-[3px] border-accent"
                    >
                      {CATEGORIES.slice(7).map((cat) => (
                        <Link 
                          key={cat.id}
                          to={`/shop?category=${encodeURIComponent(cat.name)}`}
                          className="block px-6 py-3 text-sm font-bold text-primary hover:bg-orange-light hover:text-accent transition-all"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile drawer from left */}
      <div 
        className={`mobile-menu-overlay md:hidden ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div className={`mobile-menu-drawer md:hidden ${isMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="text-xl font-black text-white">Nashville<span className="text-accent">BestBuy</span></span>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="drawer-content">
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <MobileMenuItem key={cat.id} category={cat} onClose={() => setIsMenuOpen(false)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const MobileMenuItem: React.FC<{ category: any; onClose: () => void }> = ({ category, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <div className="flex items-center justify-between py-4">
        <Link 
          to={`/shop?category=${encodeURIComponent(category.name)}`}
          onClick={onClose}
          className="text-sm font-bold text-white/90 hover:text-accent transition-colors"
        >
          {category.name}
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1 text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`}
        >
          <ChevronDown size={18} />
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-black/20 rounded-xl mb-4"
          >
            <div className="py-2 px-4 space-y-1">
              {category.subcategories.map((sub: string) => (
                <Link
                  key={sub}
                  to={`/shop?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub)}`}
                  onClick={onClose}
                  className="block py-2.5 text-xs font-semibold text-white/60 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent hover:pl-2"
                >
                  {sub}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
