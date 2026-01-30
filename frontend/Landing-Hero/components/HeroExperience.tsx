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
    stiffness: 35,
    damping: 20,
    restDelta: 0.001
  });

  // NARRATIVE FLOW RANGES
  // 0.00 - 0.15: Title Intro
  // 0.15 - 0.35: System Hub (The Logic)
  // 0.35 - 0.70: Stakeholder Dashboard (The Value)
  // 0.70 - 1.00: MessBot (The Hardware)

  // Section 1: Title
  const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.15], [1, 1, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);
  
  // Section 2: System Hub (Logic)
  // Fades in after title, fades out before dashboard gets busy
  const hubOpacity = useTransform(smoothProgress, [0.15, 0.20, 0.30, 0.35], [0, 1, 1, 0]);
  const hubScale = useTransform(smoothProgress, [0.15, 0.35], [0.9, 1.1]);

  // Section 3: Stakeholder Dashboard
  // Appears while SystemHub is fading out
  const dashboardOpacity = useTransform(smoothProgress, [0.35, 0.40, 0.65, 0.70], [0, 1, 1, 0]);
  const dashboardY = useTransform(smoothProgress, [0.35, 0.40], [40, 0]);

  // Section 4: MessBot (Hardware)
  const messBotOpacity = useTransform(smoothProgress, [0.70, 0.75, 1], [0, 1, 1]);
  const messBotScale = useTransform(smoothProgress, [0.70, 0.85], [0.85, 1]);

  // Final CTA
  const ctaOpacity = useTransform(smoothProgress, [0.88, 0.95], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.88, 0.95], [20, 0]);

  return (
    <div ref={containerRef} className="h-[800vh] w-full relative pure-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden pure-black">
        
        {/* Technical Particle Layer */}
        <ParticleBackground progress={smoothProgress} />

        {/* MNC-GRADE HERO TITLE */}
        <motion.div 
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center px-4"
        >
          <div className="max-w-7xl w-full text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[clamp(3.5rem,12vw,11rem)] font-black tracking-[-0.04em] text-white leading-[0.9] uppercase glow-text">
                GreenChain
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <p className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">
                Institutional Waste Intelligence Matrix
              </p>
              <div className="w-[1px] h-24 bg-gradient-to-b from-emerald-500/40 to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* CENTRAL SYSTEM HUB DISPLAY (Transition phase only) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div style={{ opacity: hubOpacity, scale: hubScale }}>
            <SystemHub progress={smoothProgress} />
          </motion.div>

          <motion.div style={{ opacity: messBotOpacity, scale: messBotScale }} className="absolute">
            <MessBot progress={smoothProgress} />
          </motion.div>
        </div>

        {/* INSTITUTIONAL DASHBOARD LAYER (Stand-alone phase) */}
        <motion.div 
          style={{ opacity: dashboardOpacity, y: dashboardY }}
          className="absolute inset-0 z-40 flex items-center justify-center px-6 md:px-12 pointer-events-none"
        >
          <StakeholderDashboard progress={smoothProgress} />
        </motion.div>

        {/* LUXURY CTA FINALE */}
        <motion.div 
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="text-center pointer-events-auto max-w-xl px-6">
            <span className="text-emerald-500/50 text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">Deployment // 01</span>
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 uppercase leading-none">MessBot</h3>
            <p className="text-white/40 text-base md:text-lg font-medium leading-relaxed mb-12">
              Autonomous environmental logistics for the next generation of institutional sustainability.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#10b981', color: '#000', borderColor: '#10b981' }}
              whileTap={{ scale: 0.98 }}
              className="px-16 py-5 border border-emerald-500/20 text-white font-bold rounded-full text-[10px] tracking-[0.3em] uppercase transition-all duration-500 backdrop-blur-xl"
              onClick={() => window.location.href = 'https://messbot-hero.netlify.app/'}
            >
              Request Access
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroExperience;