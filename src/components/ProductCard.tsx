import React, { useState } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../data';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  children?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, children }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useApp();
  const wishlisted = isInWishlist(product.id);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const buttonIconRef = React.useRef<HTMLSpanElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding) return;
    setIsAdding(true);
    setJustAdded(true);
    
    setTimeout(() => setIsAdding(false), 500);
    setTimeout(() => setJustAdded(false), 1500);
    
    let startCoords = undefined;
    let endCoords = undefined;

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      startCoords = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 3 // start from image area
      };
    }

    if (buttonIconRef.current) {
      const rect = buttonIconRef.current.getBoundingClientRect();
      endCoords = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
    
    addToCart(product, 1, undefined, undefined, startCoords, endCoords);
  };

  return (
    <div 
      ref={cardRef}
      className="product-card group relative bg-white rounded-[24px] border border-[#F0F0F0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-visible transition-all duration-500 ease-out hover:border-accent hover:shadow-[0_12px_45px_rgba(244,123,32,0.12)] hover:-translate-y-1.5 cursor-pointer flex flex-col h-full"
    >
      {/* CARD IMAGE AREA */}
      <div className="relative h-[200px] sm:h-[240px] rounded-t-[23px] overflow-hidden bg-[#F8F8F8] shrink-0 border-b border-gray-50">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
        </Link>
        
        {/* SALE badge */}
        {product.onSale && (
          <div className="absolute top-3 left-3 z-10 bg-accent text-white text-[11px] font-bold px-2.5 py-1 rounded-[6px] uppercase tracking-widest shadow-md">
            SALE
          </div>
        )}

        {/* Wishlist heart */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Heart 
            size={14} 
            fill={wishlisted ? "#F47B20" : "none"} 
            className={`transition-colors duration-200 ${wishlisted ? 'text-accent' : 'text-[#ccc]'}`} 
            strokeWidth={wishlisted ? 0 : 2}
          />
        </button>
      </div>

      {/* CARD BODY */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-[15px] font-semibold text-primary leading-snug line-clamp-2 min-h-[42px] transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>

        {/* Star Rating row */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={13} 
                className={`${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'fill-[#E8E8E8] text-[#E8E8E8]'}`} 
              />
            ))}
          </div>
          <span className="text-[12px] font-medium text-[#999]">({product.reviewsCount})</span>
        </div>

        {/* PRICE ROW */}
        <div className="flex items-center gap-2.5 mt-1 flex-wrap">
          <div className="flex items-end gap-2.5">
            <span className="text-[20px] font-extrabold text-primary leading-none">
              ${product.price.toFixed(2)}
            </span>
            
            {product.originalPrice && (
              <span className="text-[14px] font-normal text-[#B0B0B0] line-through leading-none mb-0.5">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.originalPrice && (
            <span className="bg-[#FFF0E6] text-accent text-[11px] font-bold px-2 py-0.5 rounded-full">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Children for extra components like Flash Deal Progress Bar */}
        {children}

        {/* Add to Cart button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`mt-auto w-full border-2 rounded-[10px] p-2.5 text-[13px] font-bold flex items-center justify-center gap-2 transition-all duration-250 ${
            justAdded 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'bg-white border-accent text-accent hover:bg-accent hover:text-white hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(244,123,32,0.3)]'
          } active:scale-95`}
        >
          <motion.span
            ref={buttonIconRef}
            animate={justAdded ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.3, delay: 0.8 }} // pop when flyer lands
            className="flex items-center justify-center"
          >
            {justAdded ? <Star size={16} fill="white" /> : <ShoppingCart size={16} />}
          </motion.span>
          {justAdded ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
