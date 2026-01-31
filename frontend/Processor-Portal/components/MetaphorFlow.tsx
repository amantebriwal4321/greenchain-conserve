
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface MetaphorFlowProps {
  progress: MotionValue<number>;
}

const MetaphorFlow: React.FC<MetaphorFlowProps> = ({ progress }) => {
  const opacity = useTransform(progress, [0.22, 0.25, 0.45, 0.5], [0, 1, 1, 0]);
  const flowWidth = useTransform(progress, [0.25, 0.45], ["2px", "100%"]);
  
  const path1Opacity = useTransform(progress, [0.28, 0.32], [0, 1]);
  const path2Opacity = useTransform(progress, [0.32, 0.36], [0, 1]);
  const path3Opacity = useTransform(progress, [0.36, 0.40], [0, 1]);

  return (
    <section className="h-[120vh] sticky top-0 flex flex-col items-center justify-center z-10 pointer-events-none">
      <motion.div 
        className="w-full max-w-4xl px-8 flex flex-col gap-24"
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-12">
          {/* Central Flow Line that segments */}
          <div className="relative h-64 w-full flex justify-center">
            <motion.div 
              className="absolute top-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-500 to-neutral-700" 
              style={{ height: '100%' }}
            />
            
            {/* Segmentation Paths */}
            <div className="absolute bottom-0 w-full flex justify-between px-12 md:px-24">
              {[path1Opacity, path2Opacity, path3Opacity].map((op, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <motion.div 
                    className="w-px h-24 bg-neutral-600"
                    style={{ opacity: op }}
                  />
                  <motion.span 
                    className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium"
                    style={{ opacity: op }}
                  >
                    {["Receive", "Measure", "Allocate"][i]}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
          
          <motion.p 
            className="text-neutral-500 text-lg font-light tracking-wide max-w-md text-center"
            style={{ opacity: path2Opacity }}
          >
            Structure emerges from chaos.<br />
            Every stream accounted for.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default MetaphorFlow;
