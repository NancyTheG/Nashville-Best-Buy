import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useApp();
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
  const shipping = subtotal > 50 ? 0 : 15;
  const tax = subtotal * 0.0925;
  const total = subtotal + shipping + tax;

  const handleFinish = () => {
    setIsFinished(true);
    clearCart();
  };

  if (isFinished) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-100"
        >
          <CheckCircle2 size={64} strokeWidth={3} />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-primary tracking-tight">Order Confirmed!</h1>
          <p className="text-gray-500 font-bold text-lg">Thank you for shopping with Nashville Best Buy. Your order #NBB-99281 is being processed.</p>
        </div>
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-black rounded-full hover:shadow-2xl transition-all"
        >
          Return to Home <ChevronRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Checkout Form */}
        <div className="flex-grow space-y-8 md:space-y-12">
          {/* Steps */}
          <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] overflow-x-auto no-scrollbar pb-2">
            <span className={step >= 1 ? 'text-accent' : 'text-gray-300'}>01 Shipping</span>
            <span className="w-4 sm:w-8 h-px bg-gray-100 flex-shrink-0"></span>
            <span className={step >= 2 ? 'text-accent' : 'text-gray-300'}>02 Payment</span>
            <span className="w-4 sm:w-8 h-px bg-gray-100 flex-shrink-0"></span>
            <span className={step >= 3 ? 'text-accent' : 'text-gray-300'}>03 Review</span>
          </div>

          <div className="bg-white rounded-[24px] md:rounded-[3rem] border border-gray-100 p-6 md:p-12 shadow-sm space-y-8 md:space-y-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 md:space-y-8"
                >
                  <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">Where should we send it?</h2>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div className="col-span-2 sm:col-span-1 space-y-1.5">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">First Name</label>
                       <input type="text" className="w-full px-5 py-3.5 rounded-xl md:rounded-2xl bg-light-gray border-none focus:ring-2 focus:ring-accent font-bold text-sm" placeholder="First Name" />
                    </div>
                    <div className="col-span-2 sm:col-span-1 space-y-1.5">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Last Name</label>
                       <input type="text" className="w-full px-5 py-3.5 rounded-xl md:rounded-2xl bg-light-gray border-none focus:ring-2 focus:ring-accent font-bold text-sm" placeholder="Last Name" />
                    </div>
                    <div className="col-span-2 space-y-1.5">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Street Address</label>
                       <input type="text" className="w-full px-5 py-3.5 rounded-xl md:rounded-2xl bg-light-gray border-none focus:ring-2 focus:ring-accent font-bold text-sm" placeholder="123 Music City Way" />
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-4 md:py-5 bg-primary text-white font-black rounded-xl md:rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-accent active:scale-95"
                  >
                    Continue to Payment <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <h2 className="text-3xl font-black text-primary tracking-tight">Payment Method</h2>
                   <div className="space-y-4">
                     <div className="p-6 border-2 border-accent rounded-3xl bg-accent/5 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="p-3 bg-white rounded-xl text-accent"><CreditCard size={24} /></div>
                         <span className="font-black text-primary uppercase tracking-widest text-xs">Credit or Debit Card</span>
                       </div>
                       <div className="w-5 h-5 rounded-full border-4 border-accent"></div>
                     </div>
                     <div className="p-6 border-2 border-gray-100 rounded-3xl hover:border-gray-300 transition-all flex items-center justify-between opacity-50">
                       <div className="flex items-center gap-4">
                         <div className="p-3 bg-white rounded-xl text-gray-400"><CreditCard size={24} /></div>
                         <span className="font-black text-gray-400 uppercase tracking-widest text-xs">PayPal</span>
                       </div>
                       <div className="w-5 h-5 rounded-full border-2 border-gray-100"></div>
                     </div>
                   </div>
                   <button 
                    onClick={() => setStep(3)}
                    className="w-full py-5 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-accent"
                  >
                    Continue to Review <ChevronRight size={20} />
                  </button>
                  <button onClick={() => setStep(1)} className="w-full text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">Go Back</button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <h2 className="text-3xl font-black text-primary tracking-tight">One Final Glance</h2>
                   <div className="space-y-6">
                     <p className="text-gray-500 font-bold">Please review your order before finishing the transaction. By clicking "Place Order", you agree to our terms of service.</p>
                     <div className="p-6 bg-light-gray rounded-[2rem] space-y-4 border border-gray-100">
                        <div className="flex items-center gap-4">
                          <CheckCircle2 size={16} className="text-accent" />
                          <span className="text-xs font-bold text-gray-600 tracking-tight">Local Delivery Nashville Express</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <CheckCircle2 size={16} className="text-accent" />
                          <span className="text-xs font-bold text-gray-600 tracking-tight">Estimated Arrival: 1-2 Business Days</span>
                        </div>
                     </div>
                   </div>
                   <button 
                    onClick={handleFinish}
                    className="w-full py-6 bg-accent text-white font-black rounded-3xl shadow-2xl shadow-orange-100 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-95"
                  >
                    Place My Order <ChevronRight size={24} strokeWidth={3} />
                  </button>
                  <button onClick={() => setStep(2)} className="w-full text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">Go Back</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="w-full lg:w-96">
          <div className="bg-light-gray p-10 rounded-[3rem] border border-gray-100 space-y-8">
            <h3 className="text-xl font-black text-primary tracking-tight">In Your Bag</h3>
            <div className="max-h-[300px] overflow-y-auto no-scrollbar space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent mt-1">${item.price} x {item.cartQuantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-primary">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-primary">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-primary">
                <span>Total Due</span>
                <span className="text-accent">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 opacity-60">
                  <ShieldCheck size={16} /> Data Encryption Guaranteed
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 opacity-60">
                  <Truck size={16} /> Premium Nashville Logistics
                </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
