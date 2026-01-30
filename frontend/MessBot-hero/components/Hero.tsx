
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import ComponentLabel from './ComponentLabel';

interface HeroProps {
  progress: MotionValue<number>;
}

const Hero: React.FC<HeroProps> = ({ progress }) => {
  // Text Animations - Headline fades out very early
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

  // Operational State Glow
  const operatingGlow = useTransform(progress, [0.8, 0.98], [0, 1]);

  // LABELS - Precise timings for visibility
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
      {/* Cinematic Studio Lighting */}
      <motion.div 
        style={{ opacity: operatingGlow }}
        className="absolute w-[1000px] h-[1000px] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none"
      />

      {/* Hero Content */}
      <motion.div 
        style={{ opacity: titleOpacity, y: titleY }}
        className="absolute z-50 text-center pointer-events-none"
      >
        <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter text-white leading-none">
          MessBot
        </h1>
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-xl text-neutral-400 font-light tracking-wide">
            Autonomous food-waste intelligence
          </p>
          <div className="h-px w-24 bg-emerald-500 my-4" />
          <span className="text-[10px] uppercase tracking-[0.8em] text-emerald-500 font-bold opacity-80">
            Measure • Move • Convert
          </span>
        </div>
      </motion.div>

      {/* THE MESSBOT MODEL */}
      <motion.div 
        {...breathingEffect}
        style={{ scale: modelScale, y: modelY }}
        className="relative z-10 w-[300px] h-[520px] flex flex-col items-center"
      >
        <motion.div style={{ y: lidY }} className="absolute top-0 w-full h-[60px] z-40">
          <div className="w-full h-full bg-[#F5F5F7] rounded-t-[45px] rounded-b-[8px] shadow-2xl flex items-center justify-center border-b border-black/5">
             <div className="w-16 h-1.5 bg-black/80 rounded-full" />
          </div>
        </motion.div>

        <motion.div style={{ opacity: shellOpacity }} className="absolute top-[65px] w-full h-[390px] z-30">
          <div className="w-full h-full bg-gradient-to-br from-[#F5F5F7] via-[#F5F5F7] to-[#E5E5EA] rounded-[24px] shadow-inner border border-white/40" />
        </motion.div>

        <motion.div style={{ opacity: internalReveal, scale: internalScale }} className="absolute top-[82px] w-[260px] h-[360px] z-20 flex flex-col items-center">
          <div className="absolute inset-0 bg-[#080808] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
             <div className="absolute inset-0 opacity-5 bg-[size:20px_20px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
          </div>
          <div className="mt-12 relative w-16 h-14 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center">
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            />
          </div>
          <div className="mt-16 w-full px-10 space-y-4">
             <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                <motion.div style={{ scaleX: internalReveal }} className="h-full w-full bg-emerald-500 origin-left" />
             </div>
             <div className="grid grid-cols-4 gap-2">
                {[1,2,3,4].map(i => <div key={i} className="h-4 rounded bg-neutral-900 border border-white/5" />)}
             </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 w-[330px] h-[90px] z-30">
          <div className="w-full h-full bg-[#111] rounded-[30px] border border-white/5 shadow-2xl flex items-center justify-around px-12">
             <div className="w-18 h-6 bg-black rounded-full border border-white/5" />
             <div className="w-18 h-6 bg-black rounded-full border border-white/5" />
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
          description="Precision weight logic"
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
