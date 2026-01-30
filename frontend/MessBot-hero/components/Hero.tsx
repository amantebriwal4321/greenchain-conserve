
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import ComponentLabel from './ComponentLabel';

interface HeroProps {
  progress: MotionValue<number>;
}

const Hero: React.FC<HeroProps> = ({ progress }) => {
  // Text Animations - Pure White font (Opposite of the dark robot)
  const titleOpacity = useTransform(progress, [0, 0.05], [1, 0]);
  const titleY = useTransform(progress, [0, 0.05], [0, -20]);
  
  // Model Transformation
  const modelScale = useTransform(progress, [0, 0.2, 0.9], [0.85, 1, 1.15]);
  const modelY = useTransform(progress, [0, 0.2], ["10vh", "0vh"]);

  // Reveal Stages
  const lidY = useTransform(progress, [0.08, 0.3], [0, -280]);
  const shellOpacity = useTransform(progress, [0.25, 0.5], [1, 0.08]);
  const internalReveal = useTransform(progress, [0.25, 0.45], [0, 1]);
  const internalScale = useTransform(progress, [0.25, 0.45], [0.95, 1]);

  // LABELS - Timing
  const labelGroup1 = useTransform(progress, [0.12, 0.25], [0, 1]); 
  const labelGroup2 = useTransform(progress, [0.3, 0.45], [0, 1]);
  const hx711Opacity = useTransform(progress, [0.45, 0.75], [0, 1]);
  const l298nOpacity = useTransform(progress, [0.78, 0.95], [0, 1]);

  const breathingEffect = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Neutral Ambient Background Light - Subtle Emerald shadow floor only */}
      <div className="absolute inset-0 bg-[#050505]" />
      <motion.div 
        style={{ opacity: useTransform(progress, [0.7, 1], [0, 0.05]) }}
        className="absolute w-[1400px] h-[600px] bg-emerald-500 blur-[180px] rounded-full pointer-events-none -bottom-48 left-1/2 -translate-x-1/2"
      />

      {/* Hero Content - Snow White Typography (Opposite Theme) */}
      <motion.div 
        style={{ opacity: titleOpacity, y: titleY }}
        className="absolute z-50 text-center pointer-events-none"
      >
        <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter text-white leading-none">
          MessBot
        </h1>
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-xl text-neutral-400 font-light tracking-wide uppercase">
            Autonomous Intelligence
          </p>
          <div className="h-px w-24 bg-emerald-500 my-4" />
          <span className="text-[10px] uppercase tracking-[0.8em] text-emerald-500 font-bold opacity-80">
            Precision • Performance • Purity
          </span>
        </div>
      </motion.div>

      {/* THE MESSBOT MODEL - Obsidian/Carbon Finish (Detailed Illustration) */}
      <motion.div 
        {...breathingEffect}
        style={{ scale: modelScale, y: modelY }}
        className="relative z-10 w-[300px] h-[520px] flex flex-col items-center"
      >
        {/* TOP LID - Obsidian Black Matte */}
        <motion.div style={{ y: lidY }} className="absolute top-0 w-full h-[60px] z-40">
          <div className="w-full h-full bg-[#121214] rounded-t-[45px] rounded-b-[8px] shadow-2xl flex items-center justify-center border border-white/5 border-b-white/10 overflow-hidden">
             {/* Rim Detail */}
             <div className="absolute top-0 inset-x-0 h-1 bg-white/5" />
             <div className="w-16 h-1.5 bg-black/40 rounded-full shadow-inner border border-white/5" />
          </div>
        </motion.div>

        {/* OUTER SHELL - Deep Carbon Metallic Reveal */}
        <motion.div style={{ opacity: shellOpacity }} className="absolute top-[65px] w-full h-[390px] z-30">
          <div className="w-full h-full bg-gradient-to-br from-[#1A1A1C] via-[#0F0F11] to-[#070708] rounded-[24px] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] border border-white/5 relative overflow-hidden">
             {/* Vertical Reflection Detail */}
             <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
             <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          </div>
        </motion.div>

        {/* INTERNAL CHASSIS - Industrial Tech Core */}
        <motion.div style={{ opacity: internalReveal, scale: internalScale }} className="absolute top-[82px] w-[260px] h-[360px] z-20 flex flex-col items-center">
          <div className="absolute inset-0 bg-[#080809] rounded-3xl border border-white/5 shadow-inner overflow-hidden">
             {/* Microgrid Texture */}
             <div className="absolute inset-0 opacity-10 bg-[size:10px_10px] bg-[linear-gradient(to_right,#555_1px,transparent_1px),linear-gradient(to_bottom,#555_1px,transparent_1px)]" />
          </div>
          
          {/* Internal Component Node */}
          <div className="mt-12 relative w-20 h-16 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-10 h-10 bg-black border border-white/10 rounded-md flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-full absolute inset-0 bg-emerald-500/5" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
          </div>

          <div className="mt-14 w-full px-10 space-y-5">
             {/* Capacity Gauge */}
             <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-white/5">
                <motion.div style={{ scaleX: internalReveal }} className="h-full w-full bg-gradient-to-r from-emerald-600 to-emerald-400 origin-left" />
             </div>
             
             {/* Status Tiles */}
             <div className="grid grid-cols-2 gap-3">
                <div className="h-8 rounded-lg bg-neutral-800/50 border border-white/5 flex items-center justify-center">
                   <div className="w-1/2 h-0.5 bg-emerald-500/30 rounded-full" />
                </div>
                <div className="h-8 rounded-lg bg-neutral-800/50 border border-white/5 flex items-center justify-center">
                   <div className="w-1/2 h-0.5 bg-emerald-500/30 rounded-full" />
                </div>
             </div>
          </div>
        </motion.div>

        {/* BASE LOCOMOTION DRIVE */}
        <div className="absolute bottom-0 w-[340px] h-[100px] z-30">
          <div className="w-full h-full bg-[#0A0A0C] rounded-[32px] border border-white/5 shadow-2xl flex items-center justify-around px-12 relative">
             {/* Tread details */}
             <div className="w-20 h-7 bg-black rounded-full border border-white/10 shadow-inner flex items-center justify-center">
                <div className="w-14 h-px bg-white/5" />
             </div>
             <div className="w-20 h-7 bg-black rounded-full border border-white/10 shadow-inner flex items-center justify-center">
                <div className="w-14 h-px bg-white/5" />
             </div>
             {/* Floor Shadow */}
             <div className="absolute -bottom-4 inset-x-12 h-4 bg-black/80 blur-xl rounded-full" />
          </div>
        </div>

        {/* Component Labels */}
        <ComponentLabel 
          opacity={labelGroup1}
          side="left"
          yOffset="-230px"
          xOffset="-210px"
          title="ESP32 CORE"
          description="Main logic hub"
          color="emerald"
        />
        <ComponentLabel 
          opacity={labelGroup1}
          side="left"
          yOffset="-150px"
          xOffset="-240px"
          title="ULTRASONIC"
          description="Distance sensing"
          color="blue"
        />
        <ComponentLabel 
          opacity={labelGroup2}
          side="left"
          yOffset="-50px"
          xOffset="-270px"
          title="RFID AUTH"
          description="User identification"
          color="purple"
        />
        <ComponentLabel 
          opacity={labelGroup2}
          side="left"
          yOffset="50px"
          xOffset="-270px"
          title="LOAD CELLS"
          description="Weight measurement"
          color="amber"
        />
        <ComponentLabel 
          opacity={hx711Opacity}
          side="left"
          yOffset="150px"
          xOffset="-230px"
          title="HX711 BRIDGE"
          description="Precision logic"
          color="amber"
        />
        <ComponentLabel 
          opacity={l298nOpacity}
          side="left"
          yOffset="240px"
          xOffset="-200px"
          title="L298N DRIVE"
          description="Kinetic movement"
          color="emerald"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
