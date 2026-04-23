
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';

const MyAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
    { id: 'orders', icon: <Package size={20} />, label: 'Orders' },
    { id: 'address', icon: <MapPin size={20} />, label: 'Addresses' },
    { id: 'payment', icon: <CreditCard size={20} />, label: 'Payments' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const orders = [
    { id: 'NBB-4421', date: 'April 20, 2026', total: 1240.00, status: 'Delivered', items: 3 },
    { id: 'NBB-3982', date: 'March 15, 2026', total: 85.50, status: 'Shipped', items: 1 },
    { id: 'NBB-2015', date: 'January 28, 2026', total: 450.00, status: 'Delivered', items: 2 },
  ];

  return (
    <div className="bg-light-gray min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Nav */}
          <aside className="w-full lg:w-80 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent text-3xl font-black mb-4 relative">
                JD
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
              </div>
              <h2 className="text-xl font-black text-primary">John Doe</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">NBB Elite Member</p>
            </div>

            <nav className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-light-gray'}`}
                >
                  <span className={activeTab === tab.id ? 'text-accent' : 'text-gray-400'}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
              <div className="h-px bg-gray-50 mx-4 my-2" />
              <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm text-red-400 hover:bg-red-50 transition-all">
                <LogOut size={20} /> Logout
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100 min-h-[600px]">
              <AnimatePresence mode="wait">
                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h2 className="text-3xl font-black text-primary tracking-tight">Recent Orders</h2>
                      <button className="text-xs font-black text-accent uppercase tracking-widest hover:underline min-h-[44px]">Download All History</button>
                    </div>

                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-accent/30 transition-all group hover:shadow-xl hover:shadow-orange-50">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                              <div className="w-16 h-16 bg-light-gray rounded-2xl flex items-center justify-center text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                <ShoppingBag size={24} />
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-black text-primary">Order {order.id}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Placed on {order.date}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-6 md:gap-12">
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Items</p>
                                <p className="font-black text-primary">{order.items} Items</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Price</p>
                                <p className="font-black text-primary">${order.total.toFixed(2)}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                  {order.status}
                                </span>
                              </div>
                              <button className="flex items-center justify-center w-12 h-12 bg-light-gray rounded-2xl text-primary hover:bg-primary hover:text-white transition-all">
                                <ChevronRight size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <h2 className="text-3xl font-black text-primary tracking-tight">Account Details</h2>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                        <input type="text" defaultValue="John Doe" className="w-full px-6 py-4 rounded-2xl bg-light-gray border-none focus:ring-2 focus:ring-accent font-bold" />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                        <input type="email" defaultValue="john.doe@gmail.com" className="w-full px-6 py-4 rounded-2xl bg-light-gray border-none focus:ring-2 focus:ring-accent font-bold" />
                      </div>
                      <div className="col-span-2 md:col-span-1 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Phone Number</label>
                        <input type="text" defaultValue="+1 (615) 555-0199" className="w-full px-6 py-4 rounded-2xl bg-light-gray border-none focus:ring-2 focus:ring-accent font-bold" />
                      </div>
                    </div>
                    <button className="px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl hover:bg-accent transition-all active:scale-95">
                      Save Changes
                    </button>
                  </motion.div>
                )}

                {activeTab === 'address' && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                  >
                    <div className="w-20 h-20 bg-light-gray rounded-full flex items-center justify-center text-gray-400"><MapPin size={32} /></div>
                    <h3 className="text-xl font-bold">No saved addresses</h3>
                    <p className="text-gray-400 text-sm max-w-xs">Add a shipping address to speed up your future checkout process.</p>
                    <button className="text-accent font-black text-xs uppercase tracking-widest hover:underline pt-4">+ Add New Address</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
