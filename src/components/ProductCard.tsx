import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../data';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';

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

  return (
    <div 
      className="product-card group relative bg-white rounded-[16px] border-[1.5px] border-[#F0F0F0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-visible transition-all duration-300 ease-in-out hover:border-accent hover:shadow-[0_8px_30px_rgba(244,123,32,0.15)] hover:-translate-y-1 cursor-pointer flex flex-col h-full p-0"
    >
      {/* CARD IMAGE AREA */}
      <div className="relative h-[220px] rounded-t-[14px] overflow-hidden bg-[#F8F8F8] shrink-0">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-400 ease-in-out group-hover:scale-[1.06]"
            referrerPolicy="no-referrer"
          />
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="mt-auto w-full bg-white border-2 border-accent text-accent rounded-[10px] p-2.5 text-[13px] font-bold flex items-center justify-center gap-2 transition-all duration-250 hover:bg-accent hover:text-white hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(244,123,32,0.3)] active:scale-95"
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
