import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import StakeholderDashboard from './StakeholderDashboard';
import MessBot from './MessBot';

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
  // 0.00 - 0.25: Hero Title Phase
  // 0.25 - 0.65: Stakeholder Insights (Partners & Processors)
  // 0.65 - 1.00: MessBot Hardware Reveal & CTA

  // Section 1: Title
  const titleOpacity = useTransform(smoothProgress, [0, 0.18, 0.25], [1, 1, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.25], [1, 0.85]);
  const titleY = useTransform(smoothProgress, [0, 0.25], [0, -30]);
  
  // Section 2: Stakeholder Dashboard
  const dashboardOpacity = useTransform(smoothProgress, [0.25, 0.35, 0.60, 0.65], [0, 1, 1, 0]);
  const dashboardY = useTransform(smoothProgress, [0.25, 0.35], [40, 0]);
  const dashboardScale = useTransform(smoothProgress, [0.25, 0.35], [0.95, 1]);

  // Section 3: MessBot (Hardware)
  const messBotOpacity = useTransform(smoothProgress, [0.65, 0.72, 1], [0, 1, 1]);
  const messBotScale = useTransform(smoothProgress, [0.65, 0.85], [0.85, 1]);

  // Final CTA
  const ctaOpacity = useTransform(smoothProgress, [0.88, 0.95], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.88, 0.95], [30, 0]);

  // Background Parallax - Architectural & High-End Visuals
  const bgOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.12, 0.20, 0.12]);
  const bgScale = useTransform(smoothProgress, [0, 1], [1.15, 1]);

  return (
    <div ref={containerRef} className="h-[800vh] w-full relative pure-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden pure-black">
        
        {/* High-End Architectural Background */}
        <motion.div 
          style={{ opacity: bgOpacity, scale: bgScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
            alt="Institutional Infrastructure" 
            className="w-full h-full object-cover grayscale brightness-[0.2] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black" />
        </motion.div>

        {/* Technical Particle Layer */}
        <ParticleBackground progress={smoothProgress} />

        {/* MAIN HERO TITLE */}
        <motion.div 
          style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center px-4"
        >
          <div className="max-w-7xl w-full text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[clamp(3.5rem,14vw,12rem)] font-black tracking-[-0.05em] text-white leading-[0.85] uppercase glow-text">
                GreenChain
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="w-[1px] h-32 bg-gradient-to-b from-emerald-500/80 via-emerald-500/20 to-transparent" />
              <span className="text-[10px] font-bold tracking-[0.8em] text-emerald-500/40 uppercase">Initialize Experience</span>
            </motion.div>
          </div>
        </motion.div>

        {/* CENTRAL HARDWARE DISPLAY */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.div style={{ opacity: messBotOpacity, scale: messBotScale }} className="relative">
            <MessBot progress={smoothProgress} />
          </motion.div>
        </div>

        {/* STAKEHOLDER DASHBOARD LAYER */}
        <motion.div 
          style={{ opacity: dashboardOpacity, y: dashboardY, scale: dashboardScale }}
          className="absolute inset-0 z-40 flex items-center justify-center px-6 md:px-12 pointer-events-none"
        >
          <StakeholderDashboard progress={smoothProgress} />
        </motion.div>

        {/* LUXURY CTA FINALE */}
        <motion.div 
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="text-center pointer-events-auto max-w-2xl px-6">
            <span className="text-emerald-500/60 text-[10px] font-black tracking-[0.6em] uppercase mb-8 block">Hardware // MessBot v4.0</span>
            <h3 className="text-8xl md:text-[11rem] font-black tracking-tighter text-white mb-14 uppercase leading-none">MessBot</h3>
            
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#10b981', color: '#000', borderColor: '#10b981', boxShadow: '0 0 50px rgba(16, 185, 129, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="px-20 py-6 border border-emerald-500/30 text-white font-black rounded-full text-[11px] tracking-[0.4em] uppercase transition-all duration-500 backdrop-blur-2xl"
              onClick={() => window.location.href = 'https://messbot-hero.netlify.app/'}
            >
              More Info
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroExperience;