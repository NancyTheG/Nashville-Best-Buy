import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2, Wallet, Bitcoin, Smartphone, ArrowRight, ShoppingBasket, Mail, User, MapPin, Hash, Phone, ShoppingCart, Heart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data';

export default function Checkout() {
  const { cart, clearCart, wishlist } = useApp();
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [lastItem, setLastItem] = useState<{name: string, image: string} | null>(null);
  const [orderItemsCount, setOrderItemsCount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
  const discountAmount = appliedCode === 'NASH20' ? subtotal * 0.2 : 0;
  const shipping = subtotal > 50 ? 0 : 15;
  const tax = (subtotal - discountAmount) * 0.0925;
  const total = subtotal - discountAmount + shipping + tax;

  const handleApplyPromo = () => {
    if (promoCodeInput.toUpperCase() === 'NASH20') {
      setAppliedCode('NASH20');
      setPromoError(null);
      setPromoSuccess(true);
      setTimeout(() => setPromoSuccess(false), 3000);
    } else {
      setPromoError('Invalid promo code');
      setAppliedCode(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedCode(null);
    setPromoCodeInput('');
  };

  const handleFinish = () => {
    if (cart.length > 0) {
      setLastItem({ name: cart[0].name, image: cart[0].image });
      setOrderItemsCount(cart.length);
    }
    setIsFinished(true);
    clearCart();
  };

  if (isFinished) {
    const wishlistItems = PRODUCTS.filter(p => wishlist.includes(p.id)).slice(0, 2);

    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12 text-center lg:text-left">
            <motion.div 
              initial={{ x: -100, opacity: 0, rotate: -30 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
              className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center mx-auto lg:mx-0 shadow-2xl shadow-accent/20 relative group"
            >
              <ShoppingCart size={40} strokeWidth={2.5} />
              <div className="absolute inset-0 bg-accent rounded-[2rem] blur-2xl opacity-20 -z-10 animate-pulse" />
            </motion.div>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tight leading-tight">
                {orderItemsCount > 1 ? (
                  <>Your <span className="text-accent underline decoration-8 decoration-accent/20">items</span> are on the way!</>
                ) : (
                  <>Your <span className="text-secondary opacity-50">{lastItem?.name || 'item'}</span> is <br /> <span className="text-accent underline decoration-8 decoration-accent/20">on the way!</span></>
                )}
              </h1>
              <p className="text-gray-500 font-bold text-xl leading-relaxed max-w-xl">
                Thank you for choosing Nashville Best Buy. Your gear is being prepared for express delivery from our Music City hub.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/shop" 
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-white font-black rounded-full hover:shadow-2xl hover:scale-105 transition-all"
              >
                Continue Shopping <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-[#F3F4F6] relative z-10"
            >
              <h3 className="text-2xl font-black text-primary mb-8 tracking-tight">Order Details</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[2px] text-gray-400">Order ID</p>
                    <p className="text-lg font-black text-primary">#NBB-99281-NAS</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-[2px] text-gray-400">Total Charged</p>
                    <p className="text-lg font-black text-accent">${total.toFixed(2)}</p>
                  </div>
                </div>
                
                {lastItem && (
                   <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-3xl border border-[#F3F4F6]">
                      <img src={lastItem.image} className="w-20 h-20 object-cover rounded-2xl shadow-md" alt="" />
                      <div>
                        <p className="text-[10px] font-black uppercase text-accent">Purchased Item</p>
                        <h4 className="text-sm font-black text-primary line-clamp-1">{lastItem.name}</h4>
                      </div>
                   </div>
                )}
                
                {/* Dynamic Wishlist Section */}
                {wishlistItems.length > 0 && (
                  <div className="pt-4 space-y-6">
                    <div className="flex items-center gap-3">
                      <Heart size={20} className="text-accent" />
                      <p className="text-sm font-black text-primary uppercase tracking-widest">Wait! Still in your wishlist...</p>
                    </div>
                    <div className="space-y-3">
                      {wishlistItems.map(item => (
                        <Link to={`/product/${item.id}`} key={item.id} className="flex items-center gap-4 bg-light-gray/50 p-4 rounded-3xl group cursor-pointer hover:bg-orange-50 hover:shadow-md transition-all border border-transparent hover:border-accent/20">
                          <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-xs font-bold text-primary truncate max-w-[180px]">{item.name}</h4>
                            <p className="text-[10px] font-black text-accent uppercase tracking-widest mt-1">${item.price}</p>
                          </div>
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:bg-accent group-hover:text-white transition-all transform group-hover:translate-x-1">
                            <ArrowRight size={18} />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            {/* Background blobs for flair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="main-container py-8 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20">
          {/* Checkout Form */}
          <div className="flex-grow space-y-10 md:space-y-12">
            {/* Advanced Stepper with Connector Lines */}
            <div className="relative px-4 pb-12 md:pb-16">
              {/* Connector Lines Background */}
              <div className="absolute top-[22px] left-[10%] right-[10%] h-[2px] bg-gray-200 -z-10">
                {/* Progress line 1-2 */}
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: step >= 2 ? "50%" : "0%" }}
                  className="absolute left-0 h-full bg-accent transition-all duration-500"
                />
                {/* Progress line 2-3 */}
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: step >= 3 ? "50%" : "0%" }}
                  className="absolute left-1/2 h-full bg-accent transition-all duration-500"
                />
              </div>

              <div className="flex justify-between items-start">
                {[
                  { id: 1, label: 'Shipping', sub: 'Collection point' },
                  { id: 2, label: 'Payment', sub: 'Secure portal' },
                  { id: 3, label: 'Review', sub: 'Order summary' }
                ].map((s) => (
                  <div key={s.id} className="flex flex-col items-center gap-4 group cursor-pointer" onClick={() => step > s.id && setStep(s.id)}>
                    <motion.div 
                      animate={{ 
                        scale: step === s.id ? 1.25 : 1,
                        backgroundColor: step === s.id ? '#F47B20' : step > s.id ? '#1B2A4A' : '#fff',
                        borderColor: step >= s.id ? 'transparent' : '#eee',
                        boxShadow: step === s.id ? '0 0 25px rgba(244,123,32,0.5)' : '0 4px 10px rgba(0,0,0,0.05)'
                      }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center relative transition-all duration-300 z-10`}
                    >
                      {step > s.id ? (
                        <CheckCircle2 size={24} className="text-white" />
                      ) : (
                        <span className={`font-black text-sm transition-colors duration-300 ${step === s.id ? 'text-white' : 'text-gray-400'}`}>0{s.id}</span>
                      )}
                      
                      {/* Active Step Glow */}
                      {step === s.id && (
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }} 
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} 
                          className="absolute inset-0 bg-accent rounded-full -z-10" 
                        />
                      )}
                    </motion.div>
                    <div className="text-center">
                      <p className={`text-[11px] font-black uppercase tracking-[2px] transition-colors duration-300 ${step === s.id ? 'text-accent' : step > s.id ? 'text-primary' : 'text-gray-400'}`}>{s.label}</p>
                      <p className="text-[9px] font-bold text-gray-400 opacity-60 hidden sm:block mt-0.5">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-[#E5E7EB] p-10 md:p-16 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-accent/10 rounded-[1.25rem] flex items-center justify-center text-accent shadow-inner">
                        <Truck size={28} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-4xl font-black text-primary tracking-tight">Shipping Details</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Speed & location selection</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                       {/* Email Field - Full Width */}
                       <div className="col-span-2 space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 ml-1">Email Address</label>
                          <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors" size={18} />
                            <input type="email" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F9FA] border border-[#F3F4F6] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all" placeholder="your@email.com" />
                          </div>
                       </div>

                       <div className="col-span-2 sm:col-span-1 space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 ml-1">First Name</label>
                          <div className="relative group">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors" size={18} />
                            <input type="text" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F9FA] border border-[#F3F4F6] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all" placeholder="First name" />
                          </div>
                       </div>
                       <div className="col-span-2 sm:col-span-1 space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 ml-1">Last Name</label>
                          <div className="relative group">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors" size={18} />
                            <input type="text" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F9FA] border border-[#F3F4F6] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all" placeholder="Last name" />
                          </div>
                       </div>
                       <div className="col-span-2 space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 ml-1">Delivery Address</label>
                          <div className="relative group">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors" size={18} />
                            <input type="text" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F9FA] border border-[#F3F4F6] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all" placeholder="123 Music City Way, Nashville, TN" />
                          </div>
                       </div>
                       <div className="col-span-2 sm:col-span-1 space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 ml-1">Phone Number</label>
                          <div className="relative group">
                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors" size={18} />
                            <input type="tel" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F9FA] border border-[#F3F4F6] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all" placeholder="+1 (615) 000-0000" />
                          </div>
                       </div>
                       <div className="col-span-2 sm:col-span-1 space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 ml-1">Zip Code</label>
                          <div className="relative group">
                            <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-accent transition-colors" size={18} />
                            <input type="text" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F8F9FA] border border-[#F3F4F6] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all" placeholder="37201" />
                          </div>
                       </div>

                       {/* Newsletter Opt-in */}
                       <div className="col-span-2 pt-2">
                         <label className="flex items-center gap-4 cursor-pointer group">
                           <div className="relative">
                             <input type="checkbox" defaultChecked className="peer sr-only" />
                             <div className="w-6 h-6 border-2 border-gray-200 rounded-lg group-hover:border-accent peer-checked:bg-accent peer-checked:border-accent transition-all duration-200" />
                             <CheckCircle2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={14} strokeWidth={4} />
                           </div>
                           <span className="text-xs font-bold text-gray-500 group-hover:text-primary transition-colors">Keep me updated on exclusive Nashville Best Buy deals and offers.</span>
                         </label>
                       </div>
                    </div>

                    <button 
                      onClick={() => setStep(2)}
                      className="w-full py-6 bg-primary text-white font-black rounded-3xl flex items-center justify-center gap-4 transition-all hover:bg-accent hover:shadow-[0_20px_40px_rgba(27,42,74,0.3)] hover:scale-[1.01] group active:scale-[0.98] mt-4"
                    >
                      Continue to Payment <ChevronRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </motion.div>
                )}

                 {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                        <CreditCard size={24} strokeWidth={2.5} />
                      </div>
                      <h2 className="text-3xl font-black text-primary tracking-tight">Payment Method</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'card', name: 'Credit / Debit', icon: <CreditCard size={20} />, sub: 'Visa, Mastercard' },
                        { id: 'wallet', name: 'Digital Wallets', icon: <Smartphone size={20} />, sub: 'PayPal, Apple Pay' },
                        { id: 'crypto', name: 'Cyrpto Pay', icon: <Bitcoin size={20} />, sub: 'BTC, ETH, USDT' },
                      ].map((m) => (
                        <button 
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          className={`p-6 border border-[#E5E7EB] rounded-[2rem] flex flex-col items-start gap-4 transition-all text-left ${paymentMethod === m.id ? 'border-accent bg-accent/5 ring-4 ring-accent/5' : 'bg-white hover:border-accent/30'}`}
                        >
                          <div className={`p-3 rounded-xl transition-all ${paymentMethod === m.id ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-[#F9F9F9] text-gray-400 border border-[#F3F4F6]'}`}>{m.icon}</div>
                          <div>
                            <p className="font-black text-primary uppercase tracking-widest text-[11px]">{m.name}</p>
                            <p className="text-[10px] font-bold text-gray-400 mt-1">{m.sub}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {paymentMethod === 'card' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          className="bg-[#F8F9FA] p-8 md:p-10 rounded-[2.5rem] border border-[#E5E7EB] space-y-6"
                        >
                          <div className="space-y-2.5">
                             <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 ml-1">Card Number</label>
                             <div className="relative">
                              <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border border-[#F3F4F6] focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all shadow-sm" placeholder="0000 0000 0000 0000" />
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                                <div className="w-8 h-5 bg-gray-100 rounded" />
                                <div className="w-8 h-5 bg-gray-100 rounded" />
                              </div>
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-2.5">
                                <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 ml-1">Expiry Date</label>
                                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border border-[#F3F4F6] focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all shadow-sm" placeholder="MM/YY" />
                             </div>
                             <div className="space-y-2.5">
                                <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 ml-1">CVV</label>
                                <input type="password" underline="none" className="w-full px-6 py-4 rounded-2xl bg-white border border-[#F3F4F6] focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all shadow-sm" placeholder="***" />
                             </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {paymentMethod === 'crypto' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          className="bg-[#F8F9FA] p-8 md:p-10 rounded-[2.5rem] border border-gray-100 text-center space-y-6"
                        >
                          <Bitcoin size={48} className="text-[#F7931A] mx-auto" />
                          <p className="text-sm font-bold text-gray-500">Secure crypto checkout via Nashville Tech Gateway</p>
                          <div className="flex justify-center gap-4">
                            <div className="px-6 py-3 bg-white rounded-xl border font-black text-[10px]">BTC</div>
                            <div className="px-6 py-3 bg-white rounded-xl border font-black text-[10px]">ETH</div>
                            <div className="px-6 py-3 bg-white rounded-xl border font-black text-[10px]">USDT</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-4">
                      <button 
                        onClick={() => setStep(3)}
                        className="w-full py-5 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-accent hover:shadow-xl hover:shadow-accent/40 active:scale-[0.98]"
                      >
                        Confirm Payment Method <ChevronRight size={20} />
                      </button>
                      <button onClick={() => setStep(1)} className="w-full py-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">Go Back to Shipping</button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-10"
                  >
                     <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                        <CheckCircle2 size={24} strokeWidth={2.5} />
                      </div>
                      <h2 className="text-3xl font-black text-primary tracking-tight">Order Review</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <p className="text-gray-500 font-bold leading-relaxed">
                        You're almost there! Review your order details below. Click "Place Order" to finalize your purchase of premium gear from Music City.
                      </p>
                      <div className="p-8 bg-[#F9F9F9] rounded-[2.5rem] space-y-6 border border-[#E5E7EB] shadow-inner">
                         <div className="flex items-center gap-4">
                           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#F3F4F6]">
                             <Truck size={14} className="text-accent" />
                           </div>
                           <span className="text-xs font-black text-primary tracking-widest uppercase">Nashville Express Delivery included</span>
                         </div>
                         <div className="flex items-center gap-4">
                           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#F3F4F6]">
                             <ShieldCheck size={14} className="text-green-500" />
                           </div>
                           <span className="text-xs font-black text-primary tracking-widest uppercase">Full 2-Year Store Warranty Applied</span>
                         </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <button 
                        onClick={handleFinish}
                        className="w-full py-6 bg-accent text-white font-black rounded-[2rem] shadow-2xl shadow-accent/40 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:-translate-y-1 active:scale-95"
                      >
                        Place Order for ${total.toFixed(2)} <ChevronRight size={24} strokeWidth={3} />
                      </button>
                      <button onClick={() => setStep(2)} className="w-full py-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">Adjust Payment</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar Summary - High Definition */}
          <aside className="w-full lg:w-[420px]">
            <div className="sticky top-32 bg-white p-10 rounded-[3rem] border border-[#E5E7EB] shadow-[0_15px_35px_rgba(0,0,0,0.04)] space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-primary tracking-tight">In Your Bag</h3>
                <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full">{cart.reduce((a, b) => a + b.cartQuantity, 0)} Items</span>
              </div>

              <div className="max-h-[350px] overflow-y-auto no-scrollbar space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-6 group">
                    <div className="w-20 h-24 bg-[#F9F9F9] rounded-2xl overflow-hidden flex-shrink-0 border border-[#F3F4F6] shadow-sm relative group-hover:scale-105 transition-transform">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-primary leading-tight group-hover:text-accent transition-colors">{item.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-accent">${item.price}</p>
                        <p className="text-[10px] font-bold text-gray-400">Qty: {item.cartQuantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-8 border-t border-[#F3F4F6]">
                <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 ml-1 mb-3 block">Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-grow group">
                    <input 
                      type="text" 
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Gift card or discount code"
                      className="w-full px-5 py-4 rounded-2xl bg-[#F8F9FA] border border-[#F3F4F6] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none font-bold text-sm transition-all"
                    />
                  </div>
                  <button 
                    onClick={handleApplyPromo}
                    disabled={!promoCodeInput || !!appliedCode}
                    className="px-6 py-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[10px] font-bold text-red-500 mt-2 ml-2 uppercase tracking-widest">{promoError}</p>}
                {promoSuccess && <p className="text-[10px] font-bold text-green-500 mt-2 ml-2 uppercase tracking-widest">Promo code applied successfully!</p>}
                {appliedCode && (
                  <div className="flex items-center justify-between bg-orange-50 p-3 rounded-2xl mt-4 border border-accent/20">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="text-[10px] font-black text-accent uppercase tracking-widest">{appliedCode} Applied</span>
                    </div>
                    <button onClick={handleRemovePromo} className="text-gray-400 hover:text-accent transition-colors p-1">
                      <ShoppingBasket size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-8 border-t border-[#F3F4F6] space-y-5">
                <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-[2px]">
                  <span>Subtotal</span>
                  <span className="text-primary">${subtotal.toLocaleString()}</span>
                </div>
                {appliedCode && (
                  <div className="flex justify-between text-[11px] font-black text-accent uppercase tracking-[2px]">
                    <span>Discount ({appliedCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-[2px]">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-[2px]">
                  <span>Estimated Tax</span>
                  <span className="text-primary">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-6 mt-2 border-t border-[#F3F4F6] flex justify-between items-center">
                  <span className="text-sm font-black text-primary uppercase tracking-[3px]">Total to Pay</span>
                  <span className="text-4xl font-black text-accent tracking-tighter shadow-orange-overlay">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-[#f0f9ff]/60 p-7 rounded-[2rem] space-y-5 border border-[#bae6fd]">
                <p className="text-[9px] font-black text-[#0369a1] uppercase tracking-[3px] text-center mb-2 px-2 py-0.5 bg-[#e0f2fe] rounded-full inline-block">Secure Checkout</p>
                 <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[2px] text-[#0369a1]">
                    <div className="w-10 h-10 bg-white border border-[#bae6fd] rounded-xl flex items-center justify-center shadow-sm">
                      <ShieldCheck size={20} className="text-[#0ea5e9]" />
                    </div>
                    <span>Data Encryption Active</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[2px] text-[#0369a1]">
                    <div className="w-10 h-10 bg-white border border-[#bae6fd] rounded-xl flex items-center justify-center shadow-sm">
                      <Truck size={20} className="text-[#0ea5e9]" />
                    </div>
                    <span>Verified Express Shipping</span>
                  </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
