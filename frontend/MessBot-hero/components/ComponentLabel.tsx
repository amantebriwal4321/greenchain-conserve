
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ComponentLabelProps {
  opacity: MotionValue<number>;
  side: 'left' | 'right';
  xOffset: string;
  yOffset: string;
  title: string;
  description: string;
  color: 'emerald' | 'blue' | 'purple' | 'amber';
}

const colorMap = {
  emerald: '#10b981',
  blue: '#3b82f6',
  purple: '#a855f7',
  amber: '#f59e0b',
};

const ComponentLabel: React.FC<ComponentLabelProps> = ({ 
  opacity, side, xOffset, yOffset, title, description, color 
}) => {
  // Synchronize the line reveal with the overall label opacity for a perfectly timed "emerge from bin" effect
  const lineProgress = useTransform(opacity, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ 
        opacity, 
        top: '50%', 
        left: '50%', 
        x: xOffset, 
        y: yOffset,
      }}
      className={`absolute z-40 flex items-center pointer-events-none ${side === 'left' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
    >
      {/* Precision Connector Line - Originates from the dustbin side (circle) */}
      <div className="relative h-px w-24 md:w-28 overflow-visible">
        <svg 
          viewBox="0 0 100 10" 
          className="absolute top-0 left-0 w-full h-4 overflow-visible" 
          style={{ transform: side === 'left' ? 'scaleX(-1) translateY(-5px)' : 'translateY(-5px)' }}
        >
          {/* Static background path for high-end structure */}
          <path
            d="M 0 5 L 100 5"
            fill="transparent"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.05"
          />
          {/* Animated active path - Perfectly emerging from the bin (0 -> 100) based on scroll reveal */}
          <motion.path
            d="M 0 5 L 100 5"
            fill="transparent"
            stroke={colorMap[color]}
            strokeWidth="1.2"
            style={{ 
              pathLength: lineProgress,
              filter: `drop-shadow(0 0 4px ${colorMap[color]})` 
            }}
          />
          {/* Component Anchor Point - Anchored at the bin boundary */}
          <circle cx="0" cy="5" r="2.5" fill={colorMap[color]} />
        </svg>
      </div>

      {/* Luxury Label Typography */}
      <div className={`px-4 py-1 flex flex-col ${side === 'left' ? 'mr-1' : 'ml-1'}`}>
        <h4 className="text-white font-black text-[10px] tracking-[0.25em] mb-0.5 uppercase opacity-90 leading-none whitespace-nowrap">
          {title}
        </h4>
        <p className="text-neutral-500 text-[9px] leading-tight max-w-[140px] font-bold uppercase tracking-wider opacity-60">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ComponentLabel;
