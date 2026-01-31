
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface MetaphorFlowProps {
  progress: MotionValue<number>;
}

const MetaphorFlow: React.FC<MetaphorFlowProps> = ({ progress }) => {
  const opacity = useTransform(progress, [0.3, 0.4, 0.6], [0, 1, 0]);
  
  const path1Opacity = useTransform(progress, [0.35, 0.4], [0, 1]);
  const path2Opacity = useTransform(progress, [0.4, 0.45], [0, 1]);
  const path3Opacity = useTransform(progress, [0.45, 0.5], [0, 1]);

  return (
    <section className="h-screen sticky top-0 flex flex-col items-center justify-center z-10 pointer-events-none">
      <motion.div 
        className="w-full max-w-4xl px-8 flex flex-col gap-24"
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-12">
          <div className="relative h-48 w-full flex justify-center">
            <motion.div 
              className="absolute top-0 w-[1px] bg-emerald-500/20" 
              style={{ height: '100%' }}
            />
            
            <div className="absolute bottom-0 w-full flex justify-between px-24">
              {[path1Opacity, path2Opacity, path3Opacity].map((op, i) => (
                <div key={i} className="flex flex-col items-center gap-6">
                  <motion.div 
                    className="w-px h-16 bg-emerald-500/40"
                    style={{ opacity: op }}
                  />
                  <motion.span 
                    className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 font-black"
                    style={{ opacity: op }}
                  >
                    {["Input", "Metrics", "Pool"][i]}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MetaphorFlow;
