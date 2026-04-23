import React from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryIcons from '../components/CategoryIcons';
import FlashDeals from '../components/FlashDeals';
import VisualCategoryGrid from '../components/VisualCategoryGrid';
import Newsletter from '../components/Newsletter';
import TrustBadges from '../components/TrustBadges';
import Testimonials from '../components/Testimonials';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { DividerA, DividerB, DividerC } from '../components/Dividers';

export default function Home() {
  const trendingProducts = PRODUCTS.filter(p => !['1', '5', '7', '8'].includes(p.id)).slice(0, 8);

  return (
    <div className="bg-white overflow-hidden">
      {/* HERO SECTION */}
      <HeroSlider />

      {/* Divider 1: Hero -> Category Slider */}
      <DividerB />

      {/* CATEGORY ICONS (Even - #F8F8F8) */}
      <section className="bg-light-gray py-10 md:py-[60px]">
        <CategoryIcons />
      </section>

      {/* Divider 2: Category Slider -> Trending Products */}
      <DividerA />

      {/* TRENDING PRODUCTS (Odd - #FFFFFF) */}
      <section className="bg-white py-10 md:py-[60px] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8 md:mb-16 px-2">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Trending Right Now</h2>
            <div className="w-16 h-1.5 bg-accent rounded-full"></div>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-sm font-black text-accent uppercase tracking-widest hover:gap-4 transition-all duration-300 min-h-[44px]">
            View All Deals <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Divider 3: Trending -> Trust Badges */}
      <DividerC />

      {/* TRUST BADGES SECTION */}
      <TrustBadges />

      {/* Divider 4: Trust Badges -> Visual Category Cards */}
      <DividerB flipped fill="#FFFFFF" />

      {/* VISUAL CATEGORY GRID (Odd - #FFFFFF) */}
      <section className="bg-white py-[60px]">
        <VisualCategoryGrid />
      </section>

      {/* Divider 5: Visual Cards -> Flash Deals */}
      <DividerA />

      {/* FLASH DEALS (Even - #F8F8F8) */}
      <section className="bg-light-gray py-10 md:py-[60px]">
        <FlashDeals />
      </section>

      {/* Divider: Flash Deals -> Testimonials */}
      <DividerA />

      {/* TESTIMONIALS (Even - #F8F8F8 by request, but logically odd to keep flow) */}
      <Testimonials />

      {/* Divider 6: Testimonials -> Newsletter */}
      <DividerC />

      {/* NEWSLETTER SECTION */}
      <Newsletter />

      {/* Divider 7: After Newsletter */}
      <DividerA />
    </div>
  );
}
