
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface PurposeSectionProps {
  progress: MotionValue<number>;
}

const PurposeSection: React.FC<PurposeSectionProps> = ({ progress }) => {
  const opacity = useTransform(progress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const textOpacity1 = useTransform(progress, [0.65, 0.68, 0.7], [0, 1, 0]);
  const textOpacity2 = useTransform(progress, [0.7, 0.73, 0.75], [0, 1, 0]);

  return (
    <section className="h-screen sticky top-0 flex items-center justify-center z-10 pointer-events-none">
      <motion.div 
        className="relative w-full max-w-2xl text-center h-40 flex items-center justify-center"
        style={{ opacity }}
      >
        <motion.h2 
          className="absolute text-5xl font-black text-emerald-400 tracking-tighter"
          style={{ opacity: textOpacity1 }}
        >
          Verified
        </motion.h2>
        <motion.h2 
          className="absolute text-5xl font-black text-neutral-200 tracking-tighter"
          style={{ opacity: textOpacity2 }}
        >
          Consolidated
        </motion.h2>
      </motion.div>
    </section>
  );
};

export default PurposeSection;
