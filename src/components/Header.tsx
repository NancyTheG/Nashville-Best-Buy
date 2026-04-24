import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X, Smartphone, Speaker, Gamepad2, Laptop, Monitor, ChefHat, Armchair, Shirt, Sparkles, Dog, ShoppingBasket, Watch, Scissors, Baby, Dumbbell, Tent, Wrench, Printer, Book, Music, Palette } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES, PRODUCTS, Product } from '../data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import Marquee from './Marquee';
import { motion, AnimatePresence } from 'motion/react';
import Fuse from 'fuse.js';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, wishlist, cartBump } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fuse.js instance for fuzzy search
  const fuse = new Fuse(PRODUCTS, {
    keys: ['name', 'category', 'subcategory'],
    threshold: 0.3,
    distance: 100,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Close suggestions on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowSuggestions(false);
  }, [location]);

  // Debounced search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const results = fuse.search(searchQuery).map(r => r.item).slice(0, 6);
      setSearchResults(results);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-accent font-black">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const getSubIcon = (sub: string) => {
    const s = sub.toLowerCase();
    if (s.includes('phone')) return <Smartphone size={14} />;
    if (s.includes('audio')) return <Speaker size={14} />;
    if (s.includes('gaming') || s.includes('game')) return <Gamepad2 size={14} />;
    if (s.includes('laptop')) return <Laptop size={14} />;
    if (s.includes('computer')) return <Monitor size={14} />;
    if (s.includes('kitchen') || s.includes('dining')) return <ChefHat size={14} />;
    if (s.includes('furniture') || s.includes('decor')) return <Armchair size={14} />;
    if (s.includes('men') || s.includes('women') || s.includes('kid') || s.includes('shirt')) return <Shirt size={14} />;
    if (s.includes('jewel') || s.includes('watch')) return <Watch size={14} />;
    if (s.includes('groom') || s.includes('hair')) return <Scissors size={14} />;
    if (s.includes('beauty') || s.includes('skin') || s.includes('makeup')) return <Sparkles size={14} />;
    if (s.includes('baby') || s.includes('toy')) return <Baby size={14} />;
    if (s.includes('fitness') || s.includes('sport')) return <Dumbbell size={14} />;
    if (s.includes('camp') || s.includes('outdoor')) return <Tent size={14} />;
    if (s.includes('tool') || s.includes('auto')) return <Wrench size={14} />;
    if (s.includes('print') || s.includes('stationery') || s.includes('office')) return <Printer size={14} />;
    if (s.includes('pet')) return <Dog size={14} />;
    if (s.includes('book')) return <Book size={14} />;
    if (s.includes('music')) return <Music size={14} />;
    if (s.includes('art') || s.includes('craft') || s.includes('diy')) return <Palette size={14} />;
    return <ShoppingBasket size={14} />;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] w-full">
      <Marquee />
      <header className={`w-full bg-white transition-all duration-300 ${isScrolled ? 'py-1 shadow-xl' : 'py-0 border-b border-gray-100'}`}>
        {/* Top Header */}
        <div className="main-container">
          <div className={`flex flex-col md:flex-row items-center justify-between transition-all duration-300 ${isScrolled ? 'py-2 md:h-16' : 'py-3 md:h-20'} gap-3 md:gap-8`}>
            
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center h-12">
                <span className="text-xl sm:text-2xl font-black tracking-tighter text-primary">
                  Nashville<span className="text-accent">BestBuy</span>
                </span>
              </Link>

              {/* Mobile Actions (Menu + Cart) */}
              <div className="flex md:hidden items-center gap-1">
                {/* Mobile Cart Icon */}
                <Link to="/cart" id="cart-icon-mobile" className="p-2 text-primary relative min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <motion.div
                    animate={cartBump ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <ShoppingBag size={22} strokeWidth={2.5} />
                  </motion.div>
                  {cart.length > 0 && (
                    <span className="absolute top-2.5 right-2.5 bg-accent text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white shadow-sm">
                      {cart.reduce((acc, item) => acc + item.cartQuantity, 0)}
                    </span>
                  )}
                </Link>

                {/* Hamburger (Mobile/Tablet) */}
                <button 
                  className="p-2 text-primary hover:bg-light-gray rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle Menu"
                >
                  {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
              </div>
            </div>

            {/* Search Bar - Responsive */}
            <form 
              ref={searchRef}
              onSubmit={handleSearch} 
              className="w-full md:flex-grow md:max-w-xl lg:max-w-2xl relative order-3 md:order-2 pb-2 md:pb-0 px-2 sm:px-0"
            >
              <div className="relative w-full group max-w-lg mx-auto md:max-w-none">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search technology, fashion, home..."
                  className="w-full h-12 pl-6 pr-14 rounded-full border border-gray-100 bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus:border-accent outline-none text-sm transition-all focus:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus:ring-4 focus:ring-accent/5"
                />
                <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center hover:bg-orange-hover transition-all hover:scale-110 min-w-[36px] min-h-[36px] shadow-lg shadow-accent/30">
                  <Search size={18} strokeWidth={3} />
                </button>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && searchQuery.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-[1000]"
                    >
                      {searchResults.length > 0 ? (
                        <div className="py-2">
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              to={`/product/${product.id}`}
                              className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors group"
                            >
                              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100 group-hover:scale-110 transition-transform">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-grow min-w-0">
                                <h4 className="text-sm font-bold text-primary truncate group-hover:text-accent transition-colors">
                                  {highlightMatch(product.name, searchQuery)}
                                </h4>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{product.category}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-black text-accent">${product.price.toLocaleString()}</p>
                              </div>
                            </Link>
                          ))}
                          <button
                            onClick={handleSearch}
                            className="w-full py-4 bg-gray-50 text-[10px] font-black text-primary uppercase tracking-[2px] hover:bg-accent hover:text-white transition-all border-t border-gray-100"
                          >
                            See All Results for "{searchQuery}"
                          </button>
                        </div>
                      ) : (
                        <div className="p-8 text-center bg-gray-50/50">
                          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-gray-300">
                             <Search size={24} />
                          </div>
                          <p className="text-sm font-bold text-primary mb-1">No products found</p>
                          <p className="text-xs font-semibold text-gray-400">Try searching for <button onClick={() => setSearchQuery('Headphones')} className="text-accent hover:underline">"Headphones"</button> or <button onClick={() => setSearchQuery('Watch')} className="text-accent hover:underline">"Watch"</button></p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>

            {/* Icons Row */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8 order-2 md:order-3">
              <Link to="/info/wishlist" className="flex flex-col items-center p-1 text-primary hover:text-accent transition-all relative group min-w-[50px] hover:-translate-y-0.5">
                <div className="relative p-2 rounded-2xl group-hover:bg-accent/5 transition-colors">
                  <Heart size={22} strokeWidth={2} className="group-hover:fill-accent/20" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 bg-accent text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-black mt-1 uppercase tracking-tighter opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all">Wishlist</span>
              </Link>
              
              <Link to="/cart" id="cart-icon-desktop" className="flex-col items-center p-1 text-primary hover:text-accent transition-all relative group min-w-[50px] flex hover:-translate-y-0.5">
                <div className="relative p-2 rounded-2xl group-hover:bg-accent/5 transition-colors">
                  <motion.div
                    animate={cartBump ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <ShoppingBag size={22} strokeWidth={2} className="group-hover:fill-accent/20" />
                  </motion.div>
                  {cart.length > 0 && (
                    <motion.span 
                      key={cart.length}
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 bg-accent text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {cart.reduce((acc, item) => acc + item.cartQuantity, 0)}
                    </motion.span>
                  )}
                </div>
                <span className="text-[9px] font-black mt-1 uppercase tracking-tighter opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all">Cart</span>
              </Link>

              <Link to="/my-account" className="flex flex-col items-center p-1 text-primary hover:text-accent transition-all group min-w-[50px] hover:-translate-y-0.5">
                <div className="p-2 rounded-2xl group-hover:bg-accent/5 transition-colors">
                  <User size={22} strokeWidth={2} className="group-hover:fill-accent/20" />
                </div>
                <span className="text-[9px] font-black mt-1 uppercase tracking-tighter opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all">Account</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mega Menu Navigation - Responsive */}
        <nav className="hidden md:block bg-gradient-to-br from-[#1B2A4A] to-[#243660] h-12 overflow-visible border-b-[3px] border-accent relative z-dropdown">
          <div className="main-container h-full">
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
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute top-[48px] left-0 w-[600px] bg-white/95 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.18)] rounded-b-2xl p-8 z-[1000] border-t-[4px] border-accent"
                        >
                          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                             <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                {getSubIcon(cat.name)}
                             </div>
                             <h3 className="text-sm font-black tracking-[2px] text-primary uppercase">
                                {cat.name}
                             </h3>
                          </div>
                          <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub}
                                to={`/shop?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub)}`}
                                className="group/sub text-[13px] font-medium text-gray-500 hover:text-accent flex items-center gap-3 py-2 px-3 rounded-xl transition-all duration-300 hover:bg-accent/5 hover:translate-x-1.5"
                              >
                                <span className="text-gray-300 group-hover/sub:text-accent transition-colors flex-shrink-0">
                                   {getSubIcon(sub)}
                                </span>
                                <span className="truncate">{sub}</span>
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

          <div className="mt-10 pt-10 border-t border-white/5 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Support & Info</h4>
            <div className="space-y-4 ml-4">
              {[
                { name: 'About Store', slug: 'about' },
                { name: 'Contact Us', slug: 'contact' },
                { name: 'Privacy Policy', slug: 'privacy-policy' },
                { name: 'Order Status', slug: 'tracking' }
              ].map(link => (
                <Link 
                  key={link.slug}
                  to={`/info/${link.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm font-bold text-white/60 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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
