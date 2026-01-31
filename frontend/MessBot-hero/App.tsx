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
    stiffness: 45, // Softer spring for more luxury feel
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-white selection:bg-emerald-500 selection:text-white">
      {/* SECTION 1: STICKY HERO REVEAL */}
      <div className="relative h-[1000vh]"> {/* Increased depth for smoother reveal */}
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
          initial={{ opacity: 0, scale: 0.96, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative z-10"
        >
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[2px] bg-emerald-500 mx-auto mb-16 rounded-full" 
          />
          
          <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter text-white leading-[0.9]">
            JOIN THE <br/>REVOLUTION<span className="text-emerald-500">.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-8 mb-16">
            <p className="text-neutral-400 text-[10px] md:text-xs font-black uppercase tracking-[0.8em] max-w-2xl mx-auto opacity-50">
              Efficiency • Hygiene • Monitoring
            </p>
            <p className="text-neutral-500 text-lg md:text-2xl font-light italic tracking-tight opacity-70">
              Intelligence is the key to a circular future.
            </p>
          </div>

          <motion.a 
            href="tel:+911234512345" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center px-16 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-emerald-500 hover:text-white transition-all duration-1000 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            <span className="relative z-10">Contact Sales</span>
            <div className="absolute inset-0 bg-emerald-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default App;