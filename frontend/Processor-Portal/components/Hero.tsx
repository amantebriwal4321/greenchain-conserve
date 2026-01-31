
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface HeroProps {
  progress: MotionValue<number>;
}

const Hero: React.FC<HeroProps> = ({ progress }) => {
  // Reveal and hide the main title faster as there are fewer sections now
  const opacity0 = useTransform(progress, [0, 0.2], [1, 0]); 
  const opacity1 = useTransform(progress, [0.2, 0.4, 0.6], [0, 1, 0]); 
  
  const yTranslate = useTransform(progress, [0, 0.6], [0, -50]);
  const chaosScale = useTransform(progress, [0, 0.6], [1, 1.4]);

  return (
    <section className="h-screen sticky top-0 flex items-center justify-center overflow-hidden z-10">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale: chaosScale }}
      >
        <div className="relative w-96 h-96">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-emerald-500/10 bg-emerald-500/5 backdrop-blur-3xl"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 10 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                borderRadius: `${40 + i * 10}% ${60 - i * 10}% ${50 + i * 10}% ${50 - i * 10}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="relative text-center px-6 flex items-center justify-center min-h-[16rem]">
        <motion.h1 
          className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-emerald-400 absolute whitespace-nowrap"
          style={{ opacity: opacity0, y: yTranslate }}
        >
          Processor Portal
        </motion.h1>

        <motion.h2 
          className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-500 absolute whitespace-nowrap"
          style={{ opacity: opacity1, y: yTranslate }}
        >
          Aggregate View
        </motion.h2>
      </div>
    </section>
  );
};

export default Hero;
