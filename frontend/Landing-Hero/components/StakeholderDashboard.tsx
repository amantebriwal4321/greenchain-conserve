
import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
}

// Define the stakeholder data structure for type safety
interface Stakeholder {
  id: string;
  title: string;
  detail: string;
  sub: string;
  range: number[];
}

const STAKEHOLDER_DATA: Stakeholder[] = [
  { id: '01', title: 'Collectors', detail: 'Zero-Touch Workflow', sub: 'Eliminating manual waste handling for 100% operational safety.', range: [0.2, 0.3] },
  { id: '02', title: 'Institutions', detail: 'Real-Time Compliance', sub: 'Automated logging and auditing for multi-site institutional networks.', range: [0.3, 0.42] },
  { id: '03', title: 'Processors', detail: 'Supply Integrity', sub: 'Predictable raw material quality and volume for waste-to-energy.', range: [0.42, 0.55] },
  { id: '04', title: 'Government', detail: 'Circular Governance', sub: 'Traceable data pipelines for national regulation adherence.', range: [0.55, 0.68] }
];

const StakeholderDashboard: React.FC<Props> = ({ progress }) => {
  return (
    <div className="w-full max-w-[1400px] mx-auto h-[240px] glass rounded-[3rem] p-12 flex flex-col justify-between relative overflow-hidden group pointer-events-auto border-white/5">
      {/* Background Micro Detail */}
      <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-white/[0.02] to-transparent" />
      
      {/* Dynamic Content Layer */}
      <div className="relative z-10 grid grid-cols-12 gap-8 items-center h-full">
        {STAKEHOLDER_DATA.map((item) => (
          <DashboardItem key={item.id} item={item} progress={progress} />
        ))}
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-white/10 w-full">
        <motion.div 
          style={{ scaleX: useTransform(progress, [0.2, 0.68], [0, 1]) }}
          className="absolute inset-0 bg-white/40 origin-left"
        />
      </div>
    </div>
  );
};

interface DashboardItemProps {
  item: Stakeholder;
  progress: MotionValue<number>;
}

// Explicitly typed as React.FC to properly handle the 'key' prop from JSX.LibraryManagedAttributes
const DashboardItem: React.FC<DashboardItemProps> = ({ item, progress }) => {
  const opacity = useTransform(progress, 
    [item.range[0] - 0.05, item.range[0], item.range[1], item.range[1] + 0.05], 
    [0, 1, 1, 0]
  );
  
  const y = useTransform(progress, 
    [item.range[0] - 0.05, item.range[0]], 
    [20, 0]
  );

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-between px-16"
    >
      <div className="flex flex-col gap-2 max-w-[40%]">
        <span className="text-[10px] font-bold text-white/30 tracking-[0.4em] uppercase">{item.id} / Stakeholder</span>
        <h4 className="text-4xl font-extralight tracking-tight text-white uppercase">{item.title}</h4>
      </div>
      
      <div className="w-[1px] h-16 bg-white/10 mx-8" />
      
      <div className="flex-1 flex flex-col gap-3">
        <h5 className="text-sm font-bold tracking-[0.2em] text-white uppercase">{item.detail}</h5>
        <p className="text-white/40 text-base font-light leading-relaxed max-w-lg">
          {item.sub}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
         <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-all cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
         </div>
      </div>
    </motion.div>
  );
};

export default StakeholderDashboard;
