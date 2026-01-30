
import React from 'react';
import { motion } from 'framer-motion';

const cases = [
  {
    title: "Corporate Hubs",
    tag: "Sustainability",
    desc: "Real-time waste analytics for ESG reporting in Fortune 500 offices.",
    icon: "🏢"
  },
  {
    title: "Healthcare",
    tag: "Hygiene",
    desc: "Touchless autonomous waste removal for sterile environments.",
    icon: "🏥"
  },
  {
    title: "Smart Campus",
    tag: "Logistics",
    desc: "Automated routing through high-traffic university dining halls.",
    icon: "🎓"
  }
];

const UseCases: React.FC = () => {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <span className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
            Institutional Intelligence
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Engineered for <br/>Scale<span className="text-emerald-500">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group relative p-10 bg-neutral-900/30 border border-white/5 rounded-[40px] hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <div className="absolute -inset-10 bg-emerald-500/0 group-hover:bg-emerald-500/5 blur-3xl rounded-full transition-all duration-700" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-8 opacity-80 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {item.icon}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-500/60 font-bold mb-2 block">
                  {item.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              
              <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-8 h-8 rounded-full border border-emerald-500/50 flex items-center justify-center">
                    <span className="text-emerald-500 text-xs">→</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
