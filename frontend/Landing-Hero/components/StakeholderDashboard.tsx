import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface Stakeholder {
  id: string;
  title: string;
  detail: string;
  sub: string;
  range: number[];
  href: string;
}

const STAKEHOLDER_DATA: Stakeholder[] = [
  { 
    id: '01', 
    title: 'Partners', 
    detail: 'Enterprise Intelligence', 
    sub: 'Transforming institutional sites into high-efficiency environmental nodes with automated audit trails and real-time operational feedback.', 
    range: [0.30, 0.47],
    href: 'https://messbot-hero.netlify.app/'
  },
  { 
    id: '02', 
    title: 'Processors', 
    detail: 'Supply Integrity', 
    sub: 'Ensuring predictable raw material quality and volume pipelines for scaled waste-to-energy operations and sustainable industrial logistics.', 
    range: [0.47, 0.65],
    href: 'https://processors-dashboard.netlify.app/'
  }
];

const StakeholderDashboard: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  return (
    <div className="w-full max-w-[1400px] h-[340px] glass rounded-[4.5rem] p-20 flex flex-col justify-between relative overflow-hidden pointer-events-auto border-emerald-500/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
      {/* Deep Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#030303] to-[#010101] -z-10" />
      
      {/* Content Layer */}
      <div className="relative z-10 flex items-center h-full">
        {STAKEHOLDER_DATA.map((item) => (
          <DashboardItem key={item.id} item={item} progress={progress} />
        ))}
      </div>

      {/* Progress Line - Green Accent */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-emerald-950/30 w-full">
        <motion.div 
          style={{ scaleX: useTransform(progress, [0.30, 0.65], [0, 1]) }}
          className="absolute inset-0 bg-emerald-500/60 origin-left shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        />
      </div>
    </div>
  );
};

const DashboardItem: React.FC<{ item: Stakeholder, progress: MotionValue<number> }> = ({ item, progress }) => {
  const opacity = useTransform(progress, 
    [item.range[0] - 0.03, item.range[0], item.range[1], item.range[1] + 0.03], 
    [0, 1, 1, 0]
  );
  
  const y = useTransform(progress, 
    [item.range[0] - 0.03, item.range[0]], 
    [20, 0]
  );

  const handleClick = () => {
    window.open(item.href, '_blank');
  };

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-between px-24 pointer-events-none"
    >
      <div className="flex flex-col gap-4 max-w-[35%]">
        <span className="text-[10px] font-black text-emerald-500/40 tracking-[0.7em] uppercase">STAKEHOLDER.{item.id}</span>
        <h4 className="text-6xl font-black tracking-tighter text-white uppercase">{item.title}</h4>
      </div>
      
      <div className="w-[1px] h-24 bg-emerald-500/15 mx-16" />
      
      <div className="flex-1 flex flex-col gap-4">
        <h5 className="text-[13px] font-black tracking-[0.5em] text-emerald-500 uppercase">{item.detail}</h5>
        <p className="text-white/40 text-xl font-normal leading-relaxed max-w-xl">
          {item.sub}
        </p>
      </div>

      <div className="flex items-center gap-8 pl-12">
         <motion.div 
            whileHover={{ scale: 1.15, borderColor: 'rgba(16, 185, 129, 0.8)', backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="w-16 h-16 rounded-full border border-emerald-500/20 flex items-center justify-center transition-all pointer-events-auto cursor-pointer shadow-lg"
         >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
               <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
         </motion.div>
      </div>
    </motion.div>
  );
};

export default StakeholderDashboard;