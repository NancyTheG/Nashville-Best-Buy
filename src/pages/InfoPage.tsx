
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Shield, FileText, Info } from 'lucide-react';

const InfoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const getPageConfig = () => {
    switch (slug) {
      case 'about':
        return {
          title: 'About Nashville Best Buy',
          icon: <Info size={48} />,
          content: 'Nashville Best Buy is your premier destination for top-quality electronics, fashion, and home essentials. Founded in the heart of Nashville, we pride ourselves on bringing the best selection of products to our community with a focus on value and exceptional service.'
        };
      case 'contact':
        return {
          title: 'Contact Us',
          icon: <Mail size={48} />,
          content: 'We are here to help you. Reach out to our customer support team for any inquiries, order updates, or technical assistance.'
        };
      case 'privacy-policy':
        return {
          title: 'Privacy Policy',
          icon: <Shield size={48} />,
          content: 'Your privacy is important to us. This policy outlines how we collect, use, and protect your information when you shop with us.'
        };
      case 'terms-conditions':
        return {
          title: 'Terms & Conditions',
          icon: <FileText size={48} />,
          content: 'Welcome to Nashville Best Buy. By using our website, you agree to comply with and be bound by the following terms and conditions of use.'
        };
      default:
        return {
          title: 'Information Page',
          icon: <Info size={48} />,
          content: 'The information you are looking for will be available shortly.'
        };
    }
  };

  const config = getPageConfig();

  return (
    <div className="bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-gray-400 hover:text-primary transition-colors mb-12 uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-light-gray rounded-[2.5rem] flex items-center justify-center text-accent">
              {config.icon}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight">{config.title}</h1>
          <div className="bg-light-gray/50 p-8 md:p-12 rounded-[2rem] text-left">
            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-8">
              {config.content}
            </p>
            
            {slug === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent">
                    <Phone size={18} strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Call Us</span>
                  </div>
                  <p className="text-primary font-black text-lg">+1 (615) 555-0199</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent">
                    <Mail size={18} strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Email Us</span>
                  </div>
                  <p className="text-primary font-black text-lg">support@nbb.com</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent">
                    <MapPin size={18} strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Visit Us</span>
                  </div>
                  <p className="text-primary font-black text-lg">Nashville, TN 37201</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
