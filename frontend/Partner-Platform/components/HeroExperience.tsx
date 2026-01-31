
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import StakeholderDashboard from './StakeholderDashboard';
import MessBot from './MessBot';
import SystemHub from './SystemHub';

const HeroExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    restDelta: 0.001
  });

  // Section 1: Title & Hero Info
  const titleOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.12], [0, -40]);
  
  // The Central Hub / Product Morph
  const hubOpacity = useTransform(smoothProgress, [0, 0.55, 0.65], [1, 1, 0]);
  const hubScale = useTransform(smoothProgress, [0, 0.6], [1, 1.15]);
  const hubY = useTransform(smoothProgress, [0.1, 0.2], [40, 0]);

  // Stakeholder Base visibility (Unified dashboard at the bottom)
  const dashboardOpacity = useTransform(smoothProgress, [0.15, 0.25, 0.65, 0.72], [0, 1, 1, 0]);
  const dashboardY = useTransform(smoothProgress, [0.15, 0.25], [100, 0]);

  // MessBot Product visibility
  const messBotOpacity = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1]);
  const messBotScale = useTransform(smoothProgress, [0.65, 0.8], [0.85, 1]);

  // Final CTA
  const ctaOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.85, 0.95], [40, 0]);

  return (
    <div ref={containerRef} className="h-[700vh] w-full relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        
        {/* Subtle Luxury Grain / Particles */}
        <ParticleBackground progress={smoothProgress} />

        {/* LUXURY TITLE - ON LOAD */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.h1 
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.1em' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-light tracking-[0.1em] text-white text-center uppercase"
          >
            GreenChain
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-white/40 font-medium tracking-[0.6em] uppercase text-[10px] mt-6"
          >
            Institutional Waste Intelligence
          </motion.p>
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-12 flex flex-col items-center gap-4"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>

        {/* CENTRAL CORE - HIGH END OBJECT */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div style={{ opacity: hubOpacity, scale: hubScale, y: hubY }}>
            <SystemHub progress={smoothProgress} />
          </motion.div>

          <motion.div style={{ opacity: messBotOpacity, scale: messBotScale }} className="absolute">
            <MessBot progress={smoothProgress} />
          </motion.div>
        </div>

        {/* STAKEHOLDER UNIFIED BASE DASHBOARD */}
        <motion.div 
          style={{ opacity: dashboardOpacity, y: dashboardY }}
          className="absolute bottom-0 left-0 w-full z-40 px-12 pb-12 pointer-events-none"
        >
          <StakeholderDashboard progress={smoothProgress} />
        </motion.div>

        {/* FINAL CTA SECTION */}
        <motion.div 
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-end pb-32 pointer-events-none"
        >
          <div className="text-center pointer-events-auto">
            <h3 className="text-5xl md:text-7xl font-extralight tracking-tight text-white mb-6 uppercase">MessBot</h3>
            <p className="text-white/30 text-sm tracking-[0.3em] uppercase mb-12">The Apex of Circular Systems</p>
            <motion.button 
              whileHover={{ scale: 1.02, letterSpacing: '0.3em' }}
              whileTap={{ scale: 0.98 }}
              className="px-20 py-6 border border-white/20 text-white font-medium rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-500 backdrop-blur-md hover:bg-white hover:text-black"
              onClick={() => window.location.href = 'https://messbot-hero.netlify.app/'}
            >
              Request Access
            </motion.button>
          </div>
        </motion.div>

        {/* Minimal Border Accents */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
      </div>
    </div>
  );
};

export default HeroExperience;
