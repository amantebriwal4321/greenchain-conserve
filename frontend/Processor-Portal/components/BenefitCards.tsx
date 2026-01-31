
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { ShieldCheck, BarChart3, Users, Clock } from 'lucide-react';

interface BenefitCardsProps {
  progress: MotionValue<number>;
}

const benefits = [
  {
    title: "Operational clarity",
    desc: "Understand intake without chasing reports.",
    icon: BarChart3
  },
  {
    title: "Capacity awareness",
    desc: "Know how much you can handle before it arrives.",
    icon: Clock
  },
  {
    title: "Processor-focused view",
    desc: "See only what is relevant to you.",
    icon: Users
  },
  {
    title: "Audit-safe flow",
    desc: "What’s logged stays logged.",
    icon: ShieldCheck
  }
];

const BenefitCards: React.FC<BenefitCardsProps> = ({ progress }) => {
  const containerOpacity = useTransform(progress, [0.72, 0.75, 0.9, 0.95], [0, 1, 1, 0]);
  const yMove = useTransform(progress, [0.72, 0.95], [100, -100]);

  return (
    <section className="h-[150vh] sticky top-0 flex items-center justify-center z-10 px-6">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full"
        style={{ opacity: containerOpacity, y: yMove }}
      >
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 blur-[60px] rounded-full group-hover:bg-white/10 transition-colors" />
            
            <div className="relative z-10 space-y-4">
              <div className="p-3 w-fit rounded-2xl bg-white/5 border border-white/10 text-neutral-400 group-hover:text-white transition-colors">
                <benefit.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black text-neutral-100 tracking-tighter">{benefit.title}</h3>
              <p className="text-neutral-400 leading-relaxed font-bold text-sm">{benefit.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BenefitCards;
