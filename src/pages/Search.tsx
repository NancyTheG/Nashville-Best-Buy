
import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const SearchResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    
    return PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Suggestions if no results found
  const suggestions = useMemo(() => {
    return PRODUCTS.filter(p => p.trending).slice(0, 4);
  }, []);

  return (
    <div className="bg-white min-h-screen py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
           <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-black text-gray-400 hover:text-primary transition-colors mb-4 uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Shop
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
              <SearchIcon size={24} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-primary tracking-tight">
                Search Results
              </h1>
              <p className="text-gray-400 font-bold text-sm">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found for "{query}"
              </p>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-light-gray rounded-[2.5rem] flex items-center justify-center text-gray-300">
                <SearchIcon size={48} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-primary mb-4">No results found</h2>
            <p className="text-gray-500 max-w-md mx-auto font-medium leading-relaxed mb-10">
              We couldn't find any products matching your search. Try different keywords or browse our popular categories.
            </p>
            
            <div className="space-y-10">
              <h3 className="text-xl font-black text-primary uppercase tracking-widest">Suggested For You</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {suggestions.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Link 
                to="/shop" 
                className="inline-block bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-primary/90 transition-all hover:scale-105 shadow-xl"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
