
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import MetaphorFlow from './components/MetaphorFlow';
import PurposeSection from './components/PurposeSection';
import BenefitCards from './components/BenefitCards';
import LoginGate from './components/LoginGate';
import AmbientBackground from './components/AmbientBackground';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (isLoggedIn) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-black"
        >
          <Dashboard onLogout={() => setIsLoggedIn(false)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-black min-h-[500vh]">
      <AmbientBackground progress={smoothProgress} />
      
      {/* 1. Opening Section */}
      <Hero progress={smoothProgress} />

      {/* 2. Use Cases Section */}
      <MetaphorFlow progress={smoothProgress} />

      {/* 3. Intention Section */}
      <PurposeSection progress={smoothProgress} />

      {/* 4. Benefits Section */}
      <BenefitCards progress={smoothProgress} />

      {/* 5. Login Gate Section */}
      <LoginGate progress={smoothProgress} onLogin={() => setIsLoggedIn(true)} />
      
      {/* Visual Indicator of Scroll Progress (Subtle) */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-white/20 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />
    </div>
  );
};

export default App;
