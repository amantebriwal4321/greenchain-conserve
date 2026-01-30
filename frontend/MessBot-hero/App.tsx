
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import UseCases from './components/UseCases';
import ProgressDock from './components/ProgressDock';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 35,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-white selection:bg-emerald-500 selection:text-white">
      {/* SECTION 1: STICKY HERO REVEAL */}
      <div className="relative h-[800vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <Hero progress={smoothProgress} />
        </div>
      </div>

      {/* SECTION 2: SUSTAINABILITY & USE CASES */}
      <UseCases />

      {/* FIXED PROGRESS INDICATOR */}
      <ProgressDock progress={smoothProgress} />

      {/* SECTION 3: REFINED END SCREEN */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 z-10 bg-[#050505] overflow-hidden">
        {/* Cinematic Backdrop Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-emerald-500/5 blur-[180px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative z-10"
        >
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="h-[2px] bg-emerald-500 mx-auto mb-16 rounded-full" 
          />
          
          <h2 className="text-7xl md:text-[11rem] font-black mb-12 tracking-tighter text-white leading-[0.8]">
            JOIN THE <br/>REVOLUTION<span className="text-emerald-500">.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-8 mb-20">
            <p className="text-neutral-400 text-xs md:text-sm font-black uppercase tracking-[0.7em] max-w-2xl mx-auto opacity-60">
              Efficiency • Hygiene • Monitoring
            </p>
            <p className="text-neutral-500 text-xl md:text-3xl font-light italic tracking-tight opacity-80">
              Intelligence is the key to a circular future.
            </p>
          </div>

          <motion.a 
            href="tel:+911234512345" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center px-24 py-8 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.4em] hover:bg-emerald-500 hover:text-white transition-all duration-700 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
          >
            <span className="relative z-10">Contact Sales</span>
            <div className="absolute inset-0 bg-emerald-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default App;
