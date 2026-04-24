import { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ChevronRight, LayoutGrid, List, ChevronDown, Check, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState(5000);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategory = searchParams.get('category');
  const selectedSubcategory = searchParams.get('subcategory');
  const searchQuery = searchParams.get('search') || searchParams.get('q');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const subcategoryMatch = !selectedSubcategory || product.subcategory === selectedSubcategory;
      const priceMatch = product.price <= priceRange;
      const searchMatch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && subcategoryMatch && priceMatch && searchMatch;
    });
  }, [selectedCategory, selectedSubcategory, priceRange, searchQuery]);

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile Toolbar (Visible only on small screens) */}
      <div className="lg:hidden sticky top-[64px] z-30 bg-white border-b border-gray-100 flex items-center justify-between px-4 py-4">
        <button 
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary border-2 border-gray-100 px-5 py-2.5 rounded-xl transition-all active:scale-95 min-h-[44px]"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          {filteredProducts.length} Results
        </span>
      </div>

      <div className="main-container py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Drawer (Mobile) / Sidebar Column (Desktop) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="lg:hidden fixed inset-0 bg-black/60 z-[9999] backdrop-blur-sm"
              />
            )}
          </AnimatePresence>

          <aside className={`
            fixed lg:static top-0 left-0 h-full lg:h-auto w-[300px] lg:w-72 bg-white z-[10000] lg:z-auto p-8 lg:p-0 
            transition-transform duration-300 transform lg:transform-none lg:block
            ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto lg:overflow-visible shadow-2xl lg:shadow-none
          `}>
            <div className="flex items-center justify-between lg:hidden mb-8">
              <h2 className="text-xl font-black text-primary uppercase">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 bg-light-gray rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-12">
              {/* Category Tree */}
              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary pb-4 border-b-2 border-accent inline-block">Departments</h3>
                <div className="space-y-2 pt-4">
                  <button 
                    onClick={() => { setSearchParams({}); if(window.innerWidth < 1024) setShowFilters(false); }}
                    className={`w-full flex items-center justify-between text-sm font-bold py-2.5 px-4 rounded-xl transition-all ${!selectedCategory ? 'bg-primary text-white shadow-xl' : 'text-gray-500 hover:bg-light-gray'}`}
                  >
                    All Products <ChevronRight size={14} className={!selectedCategory ? 'translate-x-1' : ''} />
                  </button>
                  {CATEGORIES.map(cat => (
                    <div key={cat.id} className="space-y-1">
                      <button 
                        onClick={() => setSearchParams({ category: cat.name })}
                        className={`w-full group flex items-center justify-between text-sm font-bold py-3 px-5 rounded-2xl transition-all duration-300 ${selectedCategory === cat.name ? 'bg-primary text-white shadow-[0_10px_25px_rgba(27,42,74,0.2)]' : 'text-gray-500 hover:bg-light-gray hover:text-primary'}`}
                      >
                        <span className={`transition-transform duration-300 ${selectedCategory === cat.name ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>{cat.name}</span>
                        <ChevronDown size={14} className={`${selectedCategory === cat.name ? 'rotate-180' : 'opacity-40'} transition-transform duration-300`} />
                      </button>
                      {selectedCategory === cat.name && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="pl-6 space-y-1 py-2 relative"
                        >
                          {/* Decorative indicator line */}
                          <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-accent/20 rounded-full" />
                          
                          {cat.subcategories.map(sub => (
                            <button 
                              key={sub}
                              onClick={() => { setSearchParams({ category: cat.name, subcategory: sub }); if(window.innerWidth < 1024) setShowFilters(false); }}
                              className={`w-full text-left text-[12px] font-bold py-2.5 px-4 rounded-xl transition-all duration-300 relative ${selectedSubcategory === sub ? 'text-accent bg-accent/5' : 'text-gray-400 hover:text-primary hover:pl-6'}`}
                            >
                              {selectedSubcategory === sub && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-accent rounded-full" />}
                              {sub}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-6 pt-6 border-t border-gray-50">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Price Range</h3>
                <div className="px-2 space-y-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="5000" 
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-accent h-1.5 bg-light-gray rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-black text-primary">
                    <span>$0</span>
                    <span className="text-accent bg-orange-light px-3 py-1.5 rounded-lg border border-accent/10">Max: ${priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Color Swatches Mock */}
              <div className="space-y-6 pt-6 border-t border-gray-50">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Color Palette</h3>
                <div className="flex flex-wrap gap-3">
                  {['#1B2A4A', '#F47B20', '#FFFFFF', '#000000', '#F3F4F6', '#EF4444', '#3B82F6', '#10B981'].map((color, i) => (
                    <button 
                      key={i} 
                      className={`w-9 h-9 rounded-xl border-2 hover:scale-110 transition-all ${color === '#FFFFFF' ? 'border-gray-100' : 'border-transparent shadow-sm'}`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setShowFilters(false)}
                className="w-full py-4 bg-primary text-white text-xs font-bold uppercase tracking-[2px] rounded-2xl shadow-xl hover:bg-accent transition-all hover:scale-[1.02] active:scale-95 lg:hidden"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow space-y-8">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-50">
              <div className="text-center sm:text-left space-y-1">
                <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
                  {selectedCategory || 'Our Collections'}
                </h1>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Showing {filteredProducts.length} of {PRODUCTS.length} Nashville Essentials
                </p>
              </div>

              <div className="flex items-center gap-4 md:gap-6">
                <div className="hidden sm:flex items-center gap-1 bg-light-gray p-1 rounded-xl">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-accent' : 'text-gray-400 hover:text-primary'}`}
                    aria-label="Grid View"
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-accent' : 'text-gray-400 hover:text-primary'}`}
                    aria-label="List View"
                  >
                    <List size={18} />
                  </button>
                </div>
                
                <div className="relative group">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-light-gray border-none px-5 py-3 pr-10 rounded-xl text-xs font-bold text-primary hover:bg-gray-200 transition-colors cursor-pointer outline-none min-h-[44px]"
                  >
                    <option value="newest">Latest Arrivals</option>
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low - High</option>
                    <option value="price-high">Price: High - Low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${selectedCategory}-${selectedSubcategory}-${priceRange}-${viewMode}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                  <div className="col-span-full py-20 text-center space-y-6">
                    <div className="w-24 h-24 bg-light-gray rounded-full flex items-center justify-center mx-auto text-4xl">🔎</div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">No products match your filters</h3>
                      <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search keywords.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSearchParams({});
                        setPriceRange(5000);
                      }}
                      className="text-xs font-black text-accent uppercase tracking-widest hover:underline"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="py-12 border-t border-gray-50 flex justify-center items-center gap-4">
              {[1, 2, 3].map(page => (
                <button 
                  key={page}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl border-2 font-black text-sm transition-all ${page === 1 ? 'bg-primary border-primary text-white shadow-xl' : 'border-gray-100 text-primary hover:border-gray-300'}`}
                >
                  {page}
                </button>
              ))}
              <button className="px-6 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-100 font-black text-sm text-primary hover:border-gray-300 transition-all">
                Next →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
