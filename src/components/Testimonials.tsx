import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  stars: number;
  title: string;
  review: string;
  name: string;
  location: string;
  date: string;
  avatar?: string;
  initials?: string;
  initialsColor?: string;
}

const row1: Testimonial[] = [
  {
    id: 1,
    stars: 5,
    title: "Best electronics store in Nashville!",
    review: "Got my new laptop here and the price was unbeatable. Shipping was super fast and packaging was really secure. Highly recommend to everyone!",
    name: "Sarah M.",
    location: "Nashville, TN",
    date: "August 2024",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    initials: "SM",
    initialsColor: "#1B2A4A"
  },
  {
    id: 2,
    stars: 5,
    title: "Glowic hoodie is 🔥 love it",
    review: "Ordered the oversized hoodie in gray. Fits perfectly, super soft material. Already ordered two more colors. The checkout was smooth and delivery took 2 days.",
    name: "James K.",
    location: "Memphis, TN",
    date: "November 2024",
    initials: "JK",
    initialsColor: "#1B2A4A"
  },
  {
    id: 3,
    stars: 4,
    title: "Great products, will shop again",
    review: "Bought the Bluetooth air buds as a gift. They look premium and sound amazing. Only wish the case was a bit bigger but overall really happy!",
    name: "Priya S.",
    location: "Franklin, TN",
    date: "February 2025",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    initials: "PS",
    initialsColor: "#1B2A4A"
  },
  {
    id: 4,
    stars: 5,
    title: "Exactly what I needed, perfect!",
    review: "The car tools set is heavy duty and well made. Used it the same day it arrived. Nashville BestBuy is my go-to store now for everything!",
    name: "Marcus T.",
    location: "Brentwood, TN",
    date: "May 2025",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    initials: "MT",
    initialsColor: "#1B2A4A"
  }
];

const row2: Testimonial[] = [
  {
    id: 5,
    stars: 5,
    title: "Furniture looks even better in person",
    review: "The sofa I ordered looks so much better than the photos. Quality wood, firm cushions. Delivery guys were also very careful and professional. 10/10!",
    name: "Linda P.",
    location: "Murfreesboro, TN",
    date: "July 2025",
    initials: "LP",
    initialsColor: "#F47B20"
  },
  {
    id: 6,
    stars: 4,
    title: "Kids loved the gaming toys!",
    review: "Bought the pro gaming console toys for my son's birthday. He hasn't put it down since! Good value for money and arrived well packaged. Happy customer here.",
    name: "David R.",
    location: "Clarksville, TN",
    date: "October 2025",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    initials: "DR",
    initialsColor: "#1B2A4A"
  },
  {
    id: 7,
    stars: 5,
    title: "Skincare products are genuine!",
    review: "Was a bit nervous ordering beauty products online but everything was 100% authentic and sealed. Arrived in 2 days. The electric shaver also works perfectly!",
    name: "Aisha N.",
    location: "Nashville, TN",
    date: "January 2026",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    initials: "AN",
    initialsColor: "#1B2A4A"
  },
  {
    id: 8,
    stars: 5,
    title: "Unbeatable prices, fast shipping",
    review: "Ordered 3 items at once — books, pet supplies and phone accessories. All arrived together, properly packed. Prices are the best I found online. Will be back!",
    name: "Tom B.",
    location: "Hendersonville, TN",
    date: "March 2026",
    initials: "TB",
    initialsColor: "#2C3E6B"
  }
];

const RatingBar = ({ label, percentage }: { label: string; percentage: number }) => (
  <div className="flex items-center gap-3 w-full max-w-xs mx-auto">
    <span className="text-xs font-bold text-gray-500 w-12 text-right">{label}</span>
    <div className="flex-grow h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-[#F47B20]"
      />
    </div>
    <span className="text-xs text-gray-400 w-8">{percentage}%</span>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="w-[300px] shrink-0 bg-white p-6 rounded-[16px] shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-[#F0F0F0] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-[3px] transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${i < testimonial.stars ? 'fill-[#F47B20] text-[#F47B20]' : 'fill-[#E0E0E0] text-[#E0E0E0]'}`}
          />
        ))}
      </div>
      <div className="bg-[#00B67A] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
        ✓ Verified Purchase
      </div>
    </div>

    <h4 className="text-[15px] font-black text-primary mb-2 leading-tight">
      {testimonial.title}
    </h4>
    <p className="text-[14px] text-gray-500 leading-relaxed line-clamp-3 mb-6">
      {testimonial.review}
    </p>

    <div className="flex items-center justify-between border-t border-[#F0F0F0] pt-4">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          {testimonial.avatar && (
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name} 
              // @ts-ignore - Using standard HTML onerror for smooth scroller clone support
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              className="w-10 h-10 rounded-full border-2 border-[#F47B20] object-cover absolute inset-0 z-10"
            />
          )}
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-black border-2 border-[#F47B20] absolute inset-0"
            style={{ backgroundColor: testimonial.initialsColor || '#1B2A4A', display: testimonial.avatar ? 'none' : 'flex' }}
          >
            {testimonial.initials || testimonial.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-black text-primary leading-none">{testimonial.name}</span>
          <span className="text-[10px] text-gray-400 font-bold">{testimonial.location}</span>
        </div>
      </div>
      <span className="text-[10px] text-gray-400 font-bold">{testimonial.date}</span>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  useEffect(() => {
    function createSmoothScroller(trackSelector: string, speed: number, direction: 'left' | 'right') {
      const track = document.querySelector(trackSelector) as HTMLElement;
      if (!track) return;
      
      // Clone all children and append to end for seamless loop
      const items = Array.from(track.children);
      items.forEach(item => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });

      let position = 0;
      let isHovered = false;
      let animationId: number;

      // Get the width of ORIGINAL items only (half of total)
      function getResetWidth() {
        const totalWidth = track.scrollWidth;
        return totalWidth / 2;
      }

      function animate() {
        if (!isHovered) {
          if (direction === 'left') {
            position -= speed;
            // Reset smoothly when first set of items scrolled past
            if (Math.abs(position) >= getResetWidth()) {
              position = 0;
            }
          } else {
            position += speed;
            if (position >= getResetWidth()) {
              position = 0;
            }
          }
          track.style.transform = `translateX(${
            direction === 'left' ? position : -getResetWidth() + position
          }px)`;
        }
        animationId = requestAnimationFrame(animate);
      }

      // Hover pause on parent row container
      const row = track.closest('.testimonials-row');
      if (row) {
        row.addEventListener('mouseenter', () => { isHovered = true; });
        row.addEventListener('mouseleave', () => { isHovered = false; });
      }

      // Start animation
      animationId = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationId);
      };
    }

    const cleanup1 = createSmoothScroller('.row-1-track', 0.6, 'left');
    const cleanup2 = createSmoothScroller('.row-2-track', 0.5, 'right');

    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, []);

  return (
    <section className="bg-[#F8F8F8] py-20 px-4 sm:px-10 overflow-hidden font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16 space-y-6">
        <div className="space-y-2">
          <span className="block text-[12px] font-bold tracking-[3px] text-[#F47B20] uppercase">
            ★ CUSTOMER REVIEWS
          </span>
          <h2 className="text-[38px] font-black text-primary leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 text-lg">
            Real reviews from real Nashville shoppers
          </p>
        </div>

        {/* Overall Rating Display */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 bg-white/50 p-6 rounded-2xl border border-white">
          <div className="flex items-center gap-4">
            <span className="text-[48px] font-black text-primary">4.8</span>
            <div className="flex flex-col items-start leading-none">
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#F47B20] text-[#F47B20]" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-400">Based on 2,847 reviews</span>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
          <div className="px-4 py-2 bg-[#00B67A] text-white rounded-lg flex items-center gap-2 font-black text-sm tracking-tight">
             Excellent
          </div>
        </div>

        {/* Rating Bars */}
        <div className="space-y-2 pt-4">
          <RatingBar label="5 stars" percentage={78} />
          <RatingBar label="4 stars" percentage={14} />
          <RatingBar label="3 stars" percentage={5} />
          <RatingBar label="2 stars" percentage={2} />
          <RatingBar label="1 star" percentage={1} />
        </div>
      </div>

      {/* Auto-scrolling Carousel */}
      <div className="space-y-8">
        {/* Row 1: Scrolling Left */}
        <div className="testimonials-row">
          <div className="row-1-track flex gap-8">
            {row1.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right (Hidden on small screens) */}
        <div className="testimonials-row hidden sm:block">
          <div className="row-2-track flex gap-8">
            {row2.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
