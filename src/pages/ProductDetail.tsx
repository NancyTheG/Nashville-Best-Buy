
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Share2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '../components/ProductCard';
import { useApp } from '../AppContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-accent hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Mock thumbnails
  const thumbnails = [product.image, ...Array(3).fill(product.image)];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-20 space-y-12 md:space-y-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-20">
        {/* Gallery */}
        <div className="w-full lg:flex-1 space-y-4 md:space-y-6">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-black text-gray-400 hover:text-primary transition-colors mb-2 md:mb-4 uppercase tracking-widest min-h-[44px]">
            <ArrowLeft size={16} /> Back to Results
          </Link>
          <div className="space-y-4 md:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="aspect-[4/5] rounded-[24px] md:rounded-[3rem] overflow-hidden bg-light-gray border border-gray-100 shadow-xl md:shadow-2xl"
              >
                <img 
                  src={thumbnails[activeImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="grid grid-cols-4 gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2">
              {thumbnails.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-300 min-h-[60px] ${activeImage === i ? 'border-accent shadow-lg ring-4 ring-orange-50' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <span className="px-4 py-1.5 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-accent/10">
                {product.subcategory}
              </span>
              <button className="p-3 bg-light-gray rounded-full text-gray-400 hover:text-accent transition-colors">
                <Share2 size={20} />
              </button>
            </div>
            <h1 className="text-4xl font-black lg:text-6xl tracking-tight text-primary leading-tight">{product.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < 4 ? "currentColor" : "none"} 
                      strokeWidth={2.5}
                      className={i < 4 ? "" : "text-gray-200"}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-primary ml-1">4.0</span>
              </div>
              <span className="text-sm text-gray-400 font-bold uppercase tracking-widest border-l border-gray-200 pl-6">{product.reviewsCount} Shopper Reviews</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-end gap-6">
              <span className="text-5xl font-black text-accent tracking-tighter">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-300 line-through font-bold mb-1">${product.originalPrice.toLocaleString()}</span>
              )}
               {product.onSale && (
                <span className="px-4 py-1 bg-green-500 text-white text-[10px] font-black rounded-full mb-2 uppercase tracking-widest shadow-lg shadow-green-100">
                  FLASH SALE
                </span>
              )}
            </div>
          </div>

          <div className="space-y-10 pt-10 border-t border-gray-100">
            {/* Size Selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Select Size</h3>
                <span className="text-xs font-bold text-accent cursor-pointer hover:underline">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all font-black text-sm uppercase ${selectedSize === size ? 'border-accent bg-accent text-white shadow-xl shadow-orange-100' : 'border-gray-100 text-primary hover:border-gray-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 flex items-center bg-light-gray rounded-[2rem] p-1.5 shadow-inner">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-full transition-all"
                >
                  <Minus size={20} strokeWidth={3} />
                </button>
                <span className="w-14 text-center font-black text-xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-full transition-all"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
              <div className="flex-grow w-full flex gap-4">
                <button 
                  onClick={() => addToCart(product, quantity, selectedSize)}
                  className="flex-grow py-5 bg-primary text-white font-black rounded-[2rem] shadow-2xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <ShoppingBag size={20} strokeWidth={3} /> Add to Cart
                </button>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-5 rounded-[2rem] border-2 transition-all group ${wishlisted ? 'bg-accent border-accent text-white' : 'border-gray-100 text-gray-300 hover:border-accent hover:text-accent'}`}
                >
                  <Heart size={24} fill={wishlisted ? "currentColor" : "none"} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-5 bg-light-gray rounded-3xl border border-gray-100">
              <div className="p-3 bg-white rounded-2xl text-accent shadow-sm"><Truck size={20} /></div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary">Fast Delivery</p>
                <p className="text-[11px] font-bold text-gray-400">Same-day pickup Nashville</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-light-gray rounded-3xl border border-gray-100">
              <div className="p-3 bg-white rounded-2xl text-accent shadow-sm"><ShieldCheck size={20} /></div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary">Secure Policy</p>
                <p className="text-[11px] font-bold text-gray-400">100% Purchase protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Description */}
      <section className="space-y-12">
        <div className="flex items-center gap-12 overflow-x-auto no-scrollbar border-b border-gray-100">
          <button className="pb-6 text-xs font-black uppercase tracking-[0.2em] text-accent border-b-2 border-accent">Detailed Info</button>
          <button className="pb-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors">Specifications</button>
          <button className="pb-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors">Reviews ({product.reviewsCount})</button>
          <button className="pb-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors">Shipping</button>
        </div>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3 space-y-8 text-gray-500 font-medium leading-loose text-lg">
            <p>
              The {product.name} represents the pinnacle of modern design and functionality. Meticulously crafted with premium materials, it delivers unparalleled performance whether you're at home, in the office, or exploring the streets of Nashville.
            </p>
            <p>
              Featured in our latest collection, this product combines iconic aesthetic with practical utility. Every detail has been considered to ensure a superior user experience, making it a must-have for those who value both style and substance.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-primary">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Premium Quality Materials
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Modern Minimalist Aesthetic
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Nashville Exclusive Brand
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Sustainable Sourcing
              </li>
            </ul>
          </div>
          <div className="lg:w-1/3 bg-light-gray p-10 rounded-[3rem] space-y-8 shadow-sm">
            <h3 className="text-xl font-black text-primary">Item Details</h3>
            <div className="space-y-6">
              {[
                { label: "Brand", val: "Nashville Elite" },
                { label: "SKU", val: `NBB-${product.id}-77X` },
                { label: "Availability", val: "In Stock" },
                { label: "Condition", val: "New" }
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">{row.label}</span>
                  <span className="font-bold text-primary">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-primary tracking-tight">You Might Also Like</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
