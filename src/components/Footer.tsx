import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-20">
          {/* Brand Column */}
          <div className="space-y-6 md:space-y-8">
            <Link to="/" className="text-2xl font-black tracking-tighter text-primary block">
              Nashville<span className="text-accent">BestBuy</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed font-medium max-w-xs">
              Experience the best of Nashville retail. We bring you premium electronics, trendy fashion, and home essentials with exceptional service and value.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-3 bg-light-gray rounded-2xl text-primary hover:text-white hover:bg-accent hover:-translate-y-1 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <Icon size={18} fill="currentColor" strokeWidth={0} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-black text-xs uppercase tracking-widest mb-10">Shop Categories</h4>
            <ul className="space-y-4">
              {['Electronics & Tech', 'Fashion & Apparel', 'Home & Living', 'Health & Beauty', 'Toys & Games', 'Car Accessories', 'Pet Supplies'].map((item) => (
                <li key={item}>
                  <Link to={`/shop?category=${encodeURIComponent(item)}`} className="text-gray-500 hover:text-accent text-[13px] font-bold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-primary font-black text-xs uppercase tracking-widest mb-10">Help & Info</h4>
            <ul className="space-y-4">
              {['Track Your Order', 'Returns & Refunds', 'Shipping Information', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-accent text-[13px] font-bold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-primary font-black text-xs uppercase tracking-widest mb-10">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-light-gray rounded-xl text-accent"><MapPin size={18} /></div>
                <span className="text-gray-500 text-[13px] font-bold leading-relaxed">123 Music City Plaza,<br />Nashville, TN 37201</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-light-gray rounded-xl text-accent"><Phone size={18} /></div>
                <span className="text-gray-500 text-[13px] font-bold">+1 (615) 555-0199</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-light-gray rounded-xl text-accent"><Mail size={18} /></div>
                <span className="text-gray-500 text-[13px] font-bold">support@nashvillebestbuy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <p>© 2026 Nashville Best Buy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://img.icons8.com/color/48/apple-pay.png" alt="Apple Pay" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
}
