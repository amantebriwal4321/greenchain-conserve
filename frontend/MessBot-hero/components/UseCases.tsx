
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cases = [
  {
    title: "Partners",
    tag: "Sustainability",
    desc: "Collaborating with global leaders to integrate autonomous waste intelligence into ESG-focused corporate infrastructures.",
    icon: "🤝",
    buttonLabel: "Enroll as Partner"
  },
  {
    title: "Collectors",
    tag: "Hygiene",
    desc: "Precision sanitation hardware designed for touchless, high-efficiency waste gathering in high-traffic zones.",
    icon: "🧹"
  },
  {
    title: "Processors",
    tag: "Usage of Waste",
    desc: "Closing the loop by converting collected organic matter into energy-rich bio-resources through automated logistics.",
    icon: "⚡",
    buttonLabel: "Enroll as Processor"
  }
];

const UseCases: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Typography animation based on scroll
  const titleScale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-56 px-6 md:px-24 bg-[#050505] overflow-hidden">
      {/* ATMOSPHERIC CLOUDS / ORBS */}
      <motion.div 
        animate={{ 
          x: [0, 60, 0], 
          y: [0, -40, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -50, 0], 
          y: [0, 40, 0],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-40 left-[12%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[35%] w-[700px] h-[350px] bg-white/5 blur-[180px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        {/* CENTERED HEADING */}
        <motion.div 
          style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
          className="mb-48 text-center flex flex-col items-center"
        >
          <span className="text-[10px] font-black tracking-[0.8em] text-emerald-500 uppercase mb-10 block opacity-80">
            Institutional Impact
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[1] max-w-6xl">
            Engineered for Sustainability,<br className="hidden md:block" />
            <span className="text-neutral-500">Better Environment</span><span className="text-emerald-500">.</span>
          </h2>
          <div className="h-[2px] w-40 bg-emerald-500 mt-20 rounded-full shadow-[0_0_20px_#10b981]" />
        </motion.div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-14 bg-[#0A0A0B] border border-white/[0.04] rounded-[56px] hover:border-emerald-500/40 transition-all duration-1000 overflow-hidden shadow-2xl flex flex-col items-start"
            >
              {/* Subtle backlight on hover */}
              <div className="absolute -inset-10 bg-emerald-500/0 group-hover:bg-emerald-500/[0.04] blur-[120px] rounded-full transition-all duration-1000 pointer-events-none" />
              
              <div className="relative z-10 flex-grow">
                <div className="text-6xl mb-14 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 origin-left">
                  {item.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.5em] text-emerald-500 font-black mb-5 block">
                  {item.tag}
                </span>
                <h3 className="text-3xl font-bold text-white mb-7 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-base leading-relaxed font-medium group-hover:text-neutral-300 transition-colors duration-700 max-w-[320px]">
                  {item.desc}
                </p>
              </div>

              {item.buttonLabel && (
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 mt-12 px-8 py-4 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 hover:border-emerald-500 transition-all duration-300"
                >
                  {item.buttonLabel}
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
