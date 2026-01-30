import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface Stakeholder {
  id: string;
  title: string;
  detail: string;
  sub: string;
  range: number[];
}

const STAKEHOLDER_DATA: Stakeholder[] = [
  { id: '01', title: 'Collectors', detail: 'Zero-Touch Workflow', sub: 'Eliminating manual waste handling for 100% operational safety.', range: [0.40, 0.47] },
  { id: '02', title: 'Institutions', detail: 'Real-Time Compliance', sub: 'Automated logging and auditing for multi-site institutional networks.', range: [0.47, 0.55] },
  { id: '03', title: 'Processors', detail: 'Supply Integrity', sub: 'Predictable raw material quality and volume for waste-to-energy.', range: [0.55, 0.62] },
  { id: '04', title: 'Government', detail: 'Circular Governance', sub: 'Traceable data pipelines for national regulation adherence.', range: [0.62, 0.70] }
];

const StakeholderDashboard: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  return (
    <div className="w-full max-w-[1400px] h-[300px] glass rounded-[4rem] p-16 flex flex-col justify-between relative overflow-hidden pointer-events-auto border-emerald-500/10 shadow-[0_0_100px_rgba(0,0,0,1)]">
      {/* Deep Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-[#020202] -z-10" />
      
      {/* Content Layer */}
      <div className="relative z-10 flex items-center h-full">
        {STAKEHOLDER_DATA.map((item) => (
          <DashboardItem key={item.id} item={item} progress={progress} />
        ))}
      </div>

      {/* Progress Line - Green Accent */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-emerald-900/20 w-full">
        <motion.div 
          style={{ scaleX: useTransform(progress, [0.40, 0.70], [0, 1]) }}
          className="absolute inset-0 bg-emerald-500/40 origin-left"
        />
      </div>
    </div>
  );
};

const DashboardItem: React.FC<{ item: Stakeholder, progress: MotionValue<number> }> = ({ item, progress }) => {
  const opacity = useTransform(progress, 
    [item.range[0] - 0.02, item.range[0], item.range[1], item.range[1] + 0.02], 
    [0, 1, 1, 0]
  );
  
  const y = useTransform(progress, 
    [item.range[0] - 0.02, item.range[0]], 
    [10, 0]
  );

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-between px-20 pointer-events-none"
    >
      <div className="flex flex-col gap-3 max-w-[35%]">
        <span className="text-[10px] font-black text-emerald-500/30 tracking-[0.6em] uppercase">ENTITY.{item.id}</span>
        <h4 className="text-5xl font-bold tracking-tighter text-white uppercase">{item.title}</h4>
      </div>
      
      <div className="w-[1px] h-20 bg-emerald-500/10 mx-12" />
      
      <div className="flex-1 flex flex-col gap-3">
        <h5 className="text-[12px] font-black tracking-[0.4em] text-emerald-500 uppercase">{item.detail}</h5>
        <p className="text-white/40 text-lg font-normal leading-relaxed max-w-xl">
          {item.sub}
        </p>
      </div>

      <div className="flex items-center gap-6">
         <div className="w-12 h-12 rounded-full border border-emerald-500/10 flex items-center justify-center transition-all hover:border-emerald-500/40 pointer-events-auto cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
         </div>
      </div>
    </motion.div>
  );
};

export default StakeholderDashboard;