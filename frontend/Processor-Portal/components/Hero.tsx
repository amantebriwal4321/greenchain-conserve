
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface HeroProps {
  progress: MotionValue<number>;
}

const Hero: React.FC<HeroProps> = ({ progress }) => {
  const opacity0 = useTransform(progress, [0, 0.05], [1, 0]); 
  const opacity1 = useTransform(progress, [0.07, 0.1, 0.14], [0, 1, 0]); 
  const opacity2 = useTransform(progress, [0.14, 0.17, 0.21], [0, 1, 0]); 
  
  const yTranslate = useTransform(progress, [0, 0.22], [0, -20]);

  const chaosScale = useTransform(progress, [0, 0.22], [1, 1.2]);
  const chaosRotation = useTransform(progress, [0, 0.22], [0, 20]);

  return (
    <section className="h-screen sticky top-0 flex items-center justify-center overflow-hidden z-10">
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale: chaosScale, rotate: chaosRotation }}
      >
        <div className="relative w-96 h-96">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-neutral-800/20 bg-neutral-900/5 backdrop-blur-3xl"
              animate={{
                x: [0, Math.random() * 30 - 15, 0],
                y: [0, Math.random() * 30 - 15, 0],
                scale: [1, 1.02, 0.98, 1],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                borderRadius: `${40 + i * 10}% ${60 - i * 5}% ${50 + i * 5}% ${50 - i * 10}%`,
                transform: `rotate(${i * 60}deg)`
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="relative text-center px-6 max-w-4xl mx-auto flex items-center justify-center min-h-[16rem]">
        <motion.h1 
          className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-emerald-400 absolute"
          style={{ opacity: opacity0, y: yTranslate }}
        >
          Processor’s Access
        </motion.h1>

        <motion.h2 
          className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-neutral-300 absolute"
          style={{ opacity: opacity1, y: yTranslate }}
        >
          Waste moves daily.
        </motion.h2>
        
        <motion.h2 
          className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-neutral-300 absolute"
          style={{ opacity: opacity2, y: yTranslate }}
        >
          Processors receive it<br />without clarity.
        </motion.h2>
      </div>
    </section>
  );
};

export default Hero;
