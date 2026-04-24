import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useApp();
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
  const shipping = subtotal > 50 ? 0 : 15;
  const tax = subtotal * 0.0925; // Nashville sales tax 9.25%
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="bg-white border-4 border-dashed border-gray-100 rounded-[2rem] p-12 md:p-20 text-center space-y-8 shadow-sm">
          <div className="w-32 h-32 bg-light-gray rounded-full flex items-center justify-center mx-auto text-5xl">🛒</div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-primary">Your cart is lonely</h2>
            <p className="text-gray-500 font-bold text-lg max-w-md mx-auto">Looks like you haven't added any tech yet. Explore our Music City collection!</p>
          </div>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-3 px-12 py-5 bg-accent text-white font-black rounded-full hover:shadow-2xl hover:shadow-orange-200 transition-all hover:scale-105 active:scale-95"
          >
            Start Shopping <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container py-8 md:py-16">
      <h1 className="text-3xl md:text-5xl font-black text-primary mb-8 md:mb-12 tracking-tight">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
        {/* Cart Items List Container */}
        <div className="flex-grow">
          <div className="bg-white border border-[#E0E0E0] rounded-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
            {/* Header Row */}
            <div className="hidden lg:grid grid-cols-12 px-8 py-6 border-b-2 border-gray-100 bg-[#FAFAFA] text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-100 px-6 md:px-8">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-8 md:py-10"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 md:gap-8">
                      <div className="col-span-1 lg:col-span-6 flex items-center gap-4 md:gap-8">
                        <Link to={`/product/${item.id}`} className="w-24 h-32 sm:w-36 sm:h-44 flex-shrink-0 bg-[#F9F9F9] rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:scale-105 active:scale-95 group">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:opacity-90" />
                        </Link>
                        <div className="space-y-1 md:space-y-3 flex-grow">
                          <Link to={`/product/${item.id}`} className="text-base md:text-xl font-black text-primary hover:text-accent transition-colors line-clamp-2 leading-tight">{item.name}</Link>
                          <div className="flex flex-wrap gap-2">
                             <span className="px-3 py-1 bg-light-gray rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">Size: {item.selectedSize || 'Standard'}</span>
                             {item.selectedColor && (
                               <span className="px-3 py-1 bg-light-gray rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
                                 Color: {item.selectedColor}
                               </span>
                             )}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="flex items-center gap-1.5 text-[10px] font-black text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest pt-1 group"
                          >
                            <Trash2 size={12} className="group-hover:rotate-12 transition-transform" /> Remove Item
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 lg:col-span-2 flex lg:justify-center items-center gap-4 lg:block">
                        <span className="lg:hidden text-[10px] font-black text-gray-400 uppercase tracking-widest w-16">Price:</span>
                        <span className="text-lg font-black text-primary">${item.price.toLocaleString()}</span>
                      </div>

                      <div className="col-span-1 lg:col-span-2 flex lg:justify-center">
                        <div className="flex items-center bg-[#F5F5F5] border border-gray-100 rounded-2xl p-1 shadow-inner h-[48px]">
                          <button 
                            onClick={() => updateCartQuantity(item.id, -1, item.selectedSize)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="w-12 text-center font-black text-sm">{item.cartQuantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, 1, item.selectedSize)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 lg:col-span-2 flex lg:justify-end items-center gap-4 lg:block text-right">
                        <span className="lg:hidden text-[10px] font-black text-gray-400 uppercase tracking-widest w-16 text-left">Total:</span>
                        <span className="text-2xl font-black text-accent tracking-tighter">${(item.price * item.cartQuantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="w-full lg:w-[400px]">
          <div className="lg:sticky lg:top-40 bg-primary p-8 md:p-10 rounded-[28px] md:rounded-[3rem] text-white shadow-2xl space-y-8 md:space-y-10">
            <h3 className="text-xl font-black tracking-tight border-b border-white/10 pb-6 uppercase tracking-widest text-xs">Order Summary</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm font-bold opacity-70">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold opacity-70">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold opacity-70">
                <span>Estimated Tax (9.25%)</span>
                <span>${tax.toLocaleString()}</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-2xl font-black">Total</span>
                <span className="text-3xl font-black text-accent">${total.toLocaleString()}</span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="w-full py-5 bg-accent text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-accent/20 hover:-translate-y-1 transition-all active:scale-95"
            >
              Checkout Now <ArrowRight size={20} className="stroke-[3]" />
            </Link>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-60">
                <ShieldCheck size={16} /> Secure Payment Processing
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-60">
                <Truck size={16} /> Fast Delivery Nashville
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
