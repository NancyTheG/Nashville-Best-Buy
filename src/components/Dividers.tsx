import React from 'react';

export const DividerA: React.FC = () => (
  <div className="w-full h-1 my-0" style={{ background: 'linear-gradient(90deg, #1B2A4A, #F47B20, #1B2A4A)' }} />
);

export const DividerB: React.FC<{ flipped?: boolean, fill?: string }> = ({ flipped = false, fill = "#F8F8F8" }) => (
  <div className={`line-height-0 overflow-hidden ${flipped ? 'rotate-180' : ''}`}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px] block">
      <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={fill}/>
    </svg>
  </div>
);

export const DividerC: React.FC = () => (
  <div className="w-[90%] mx-auto h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #E0E0E0, transparent)' }} />
);
