
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import LoginGate from './components/LoginGate';
import AmbientBackground from './components/AmbientBackground';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [firmName, setFirmName] = useState('');
  const [isAccessGranted, setIsAccessGranted] = useState(false);
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

  if (isAccessGranted) {
    return (
      <AnimatePresence mode="wait">
        <motion.div 
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-black"
        >
          <Dashboard firmName={firmName} onLogout={() => {
            setIsAccessGranted(false);
            setFirmName('');
          }} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-black min-h-[250vh]">
      <AmbientBackground progress={smoothProgress} />
      
      <Hero progress={smoothProgress} />
      
      <LoginGate 
        progress={smoothProgress} 
        onAccess={(name) => {
          setFirmName(name);
          setIsAccessGranted(true);
        }} 
      />
      
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-emerald-500/40 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />
    </div>
  );
};

export default App;
