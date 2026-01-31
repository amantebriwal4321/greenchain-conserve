import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import ComponentLabel from './ComponentLabel';

interface HeroProps {
  progress: MotionValue<number>;
}

const Hero: React.FC<HeroProps> = ({ progress }) => {
  // NEW: Conserve's Top Label
  const conserveOpacity = useTransform(progress, [0, 0.03], [1, 0]);
  const conserveY = useTransform(progress, [0, 0.03], [0, -20]);

  // Main Title Animations
  const titleOpacity = useTransform(progress, [0, 0.08, 0.12], [1, 1, 0]);
  const titleScale = useTransform(progress, [0, 0.1], [1, 0.9]);
  
  // Model Transformation - Hidden at start (Scale 0, Y down)
  const modelScale = useTransform(progress, [0.05, 0.25, 0.9], [0, 1, 1.2]);
  const modelY = useTransform(progress, [0.05, 0.25], ["40vh", "0vh"]);
  const modelOpacity = useTransform(progress, [0.05, 0.15], [0, 1]);

  // Reveal Stages
  const lidY = useTransform(progress, [0.15, 0.35], [0, -300]);
  const shellOpacity = useTransform(progress, [0.3, 0.6], [1, 0.05]);
  const internalReveal = useTransform(progress, [0.3, 0.55], [0, 1]);
  const internalScale = useTransform(progress, [0.3, 0.55], [0.9, 1]);

  // LABELS - Timing (Delayed and smoother)
  const labelGroup1 = useTransform(progress, [0.2, 0.35], [0, 1]); 
  const labelGroup2 = useTransform(progress, [0.4, 0.55], [0, 1]);
  const hx711Opacity = useTransform(progress, [0.55, 0.8], [0, 1]);
  const l298nOpacity = useTransform(progress, [0.8, 0.98], [0, 1]);

  const breathingEffect = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Dynamic Ambient Background */}
      <motion.div 
        style={{ opacity: useTransform(progress, [0.6, 1], [0, 0.1]) }}
        className="absolute w-[1600px] h-[800px] bg-emerald-500 blur-[220px] rounded-full pointer-events-none -bottom-64 left-1/2 -translate-x-1/2"
      />

      {/* TOP MIDDLE BRANDING */}
      <motion.div 
        style={{ opacity: conserveOpacity, y: conserveY }}
        className="absolute top-12 left-1/2 -translate-x-1/2 z-[60] text-center"
      >
        <span className="text-[10px] font-black tracking-[1.2em] text-emerald-500 uppercase opacity-60">
          Conserve's
        </span>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity: titleOpacity, scale: titleScale }}
        className="absolute z-50 text-center pointer-events-none"
      >
        <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter text-white leading-none mix-blend-difference">
          MessBot
        </h1>
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-xl text-neutral-400 font-light tracking-[0.4em] uppercase">
            Autonomous Intelligence
          </p>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 2, ease: "circOut" }}
            className="h-px bg-emerald-500/50 my-6" 
          />
          <span className="text-[11px] uppercase tracking-[1em] text-emerald-500 font-bold opacity-70">
            Precision • Performance • Purity
          </span>
        </div>
      </motion.div>

      {/* THE MESSBOT MODEL - Hidden until scroll */}
      <motion.div 
        {...breathingEffect}
        style={{ scale: modelScale, y: modelY, opacity: modelOpacity }}
        className="relative z-10 w-[320px] h-[550px] flex flex-col items-center"
      >
        {/* TOP LID */}
        <motion.div style={{ y: lidY }} className="absolute top-0 w-full h-[65px] z-40">
          <div className="w-full h-full bg-[#121214] rounded-t-[50px] rounded-b-[10px] shadow-2xl flex items-center justify-center border border-white/5 overflow-hidden">
             <div className="w-20 h-1.5 bg-black/60 rounded-full shadow-inner border border-white/5" />
          </div>
        </motion.div>

        {/* OUTER SHELL */}
        <motion.div style={{ opacity: shellOpacity }} className="absolute top-[70px] w-full h-[400px] z-30">
          <div className="w-full h-full bg-gradient-to-br from-[#1C1C1E] via-[#0D0D0F] to-[#040405] rounded-[32px] shadow-[0_50px_120px_-30px_rgba(0,0,0,1)] border border-white/5 relative" />
        </motion.div>

        {/* INTERNAL CHASSIS */}
        <motion.div style={{ opacity: internalReveal, scale: internalScale }} className="absolute top-[85px] w-[270px] h-[375px] z-20 flex flex-col items-center">
          <div className="absolute inset-0 bg-[#060607] rounded-[34px] border border-white/5 shadow-inner overflow-hidden">
             <div className="absolute inset-0 opacity-[0.08] bg-[size:12px_12px] bg-[linear-gradient(to_right,#666_1px,transparent_1px),linear-gradient(to_bottom,#666_1px,transparent_1px)]" />
          </div>
          
          <div className="mt-14 relative w-24 h-20 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-xl">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]" 
                />
            </div>
          </div>

          <div className="mt-16 w-full px-12 space-y-6">
             <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/5">
                <motion.div style={{ scaleX: internalReveal }} className="h-full w-full bg-gradient-to-r from-emerald-700 to-emerald-400 origin-left" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="h-10 rounded-xl bg-neutral-800/40 border border-white/5" />
                <div className="h-10 rounded-xl bg-neutral-800/40 border border-white/5" />
             </div>
          </div>
        </motion.div>

        {/* BASE DRIVE */}
        <div className="absolute bottom-0 w-[360px] h-[110px] z-30">
          <div className="w-full h-full bg-[#08080A] rounded-[40px] border border-white/5 shadow-2xl flex items-center justify-around px-14 relative">
             <div className="w-24 h-8 bg-black rounded-full border border-white/10 shadow-inner" />
             <div className="w-24 h-8 bg-black rounded-full border border-white/10 shadow-inner" />
          </div>
        </div>

        {/* Component Labels - Only show when scrolled */}
        <ComponentLabel 
          opacity={labelGroup1}
          side="left"
          yOffset="-240px"
          xOffset="-230px"
          title="ESP32 CORE"
          description="Distributed logic grid"
          color="emerald"
        />
        <ComponentLabel 
          opacity={labelGroup1}
          side="left"
          yOffset="-160px"
          xOffset="-260px"
          title="ULTRASONIC"
          description="360° LiDAR mapping"
          color="blue"
        />
        <ComponentLabel 
          opacity={labelGroup2}
          side="left"
          yOffset="-60px"
          xOffset="-290px"
          title="RFID AUTH"
          description="Institutional access"
          color="purple"
        />
        <ComponentLabel 
          opacity={labelGroup2}
          side="left"
          yOffset="60px"
          xOffset="-290px"
          title="LOAD CELLS"
          description="Mass-flow telemetry"
          color="amber"
        />
        <ComponentLabel 
          opacity={hx711Opacity}
          side="left"
          yOffset="160px"
          xOffset="-250px"
          title="SIGNAL BRIDGE"
          description="Precision AD conversion"
          color="amber"
        />
        <ComponentLabel 
          opacity={l298nOpacity}
          side="left"
          yOffset="250px"
          xOffset="-220px"
          title="KINETIC DRIVE"
          description="Dual-axis locomotion"
          color="emerald"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
