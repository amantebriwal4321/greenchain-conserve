
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface PurposeSectionProps {
  progress: MotionValue<number>;
}

const PurposeSection: React.FC<PurposeSectionProps> = ({ progress }) => {
  const opacity = useTransform(progress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  
  // Abstract Scale Metaphor: Two horizontal bars shifting
  const barL = useTransform(progress, [0.55, 0.65], [10, 0]);
  const barR = useTransform(progress, [0.55, 0.65], [-10, 0]);

  const textOpacity1 = useTransform(progress, [0.56, 0.58, 0.6], [0, 1, 0]);
  const textOpacity2 = useTransform(progress, [0.6, 0.62, 0.64], [0, 1, 0]);
  const textOpacity3 = useTransform(progress, [0.64, 0.66, 0.68], [0, 1, 0]);

  return (
    <section className="h-screen sticky top-0 flex items-center justify-center z-10 pointer-events-none">
      <motion.div 
        className="relative w-full max-w-2xl px-6 text-center h-40 flex items-center justify-center"
        style={{ opacity }}
      >
        {/* Abstract "Scale" balancing */}
        <div className="absolute inset-0 flex items-center justify-center gap-12 opacity-20">
          <motion.div className="w-24 h-[1px] bg-white" style={{ y: barL }} />
          <motion.div className="w-24 h-[1px] bg-white" style={{ y: barR }} />
        </div>

        <motion.h2 
          className="absolute text-3xl font-black text-neutral-200 tracking-tighter"
          style={{ opacity: textOpacity1 }}
        >
          Only verified intake.
        </motion.h2>
        <motion.h2 
          className="absolute text-3xl font-black text-neutral-200 tracking-tighter"
          style={{ opacity: textOpacity2 }}
        >
          No manual tracking.
        </motion.h2>
        <motion.h2 
          className="absolute text-3xl font-black text-neutral-200 tracking-tighter"
          style={{ opacity: textOpacity3 }}
        >
          No source-level noise.
        </motion.h2>
      </motion.div>
    </section>
  );
};

export default PurposeSection;
