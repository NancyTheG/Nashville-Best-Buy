import React, { useRef, useEffect, useState } from 'react';

const Marquee: React.FC = () => {
  const text = "🚚 Free Shipping on Orders Over $50  •  🎉 Up to 40% OFF Today  •  🔒 Secure Checkout  •  ↩️ Easy 30-Day Returns  •  🏷️ New Arrivals Every Week  •  💳 Pay in 4 with PayPal  •  ";
  
  useEffect(() => {
    function createSmoothMarquee() {
      const track = document.querySelector('.marquee-track') as HTMLElement;
      if (!track) return;

      // Clone all items for seamless loop
      const items = Array.from(track.children);
      items.forEach(item => {
        const clone = item.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });

      let position = 0;
      let isHovered = false;
      const speed = 0.8;
      let animationId: number;

      function getResetWidth() {
        return track.scrollWidth / 2;
      }

      function animate() {
        if (!isHovered) {
          position -= speed;
          if (Math.abs(position) >= getResetWidth()) {
            position = 0;
          }
          track.style.transform = `translateX(${position}px)`;
        }
        animationId = requestAnimationFrame(animate);
      }

      const wrapper = track.closest('.marquee-wrapper');
      if (wrapper) {
        wrapper.addEventListener('mouseenter', () => { isHovered = true; });
        wrapper.addEventListener('mouseleave', () => { isHovered = false; });
      }

      animationId = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationId);
      };
    }

    const cleanup = createSmoothMarquee();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="bg-primary py-2 text-white overflow-hidden relative z-[60] marquee-wrapper">
      <div className="flex marquee-track">
        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] px-4 whitespace-nowrap">
          {text}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
