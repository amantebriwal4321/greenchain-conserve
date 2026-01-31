import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cases = [
  {
    title: "Partners",
    tag: "Sustainability",
    desc: "Collaborating with global leaders to integrate autonomous waste intelligence into ESG-focused corporate infrastructures.",
    icon: "🤝",
    buttonLabel: "Enroll as Partner",
    url: "https://partners-dashboard.netlify.app"
  },
  {
    title: "Collectors",
    tag: "Hygiene",
    desc: "Precision sanitation hardware designed for touchless, high-efficiency waste gathering in high-traffic zones.",
    icon: "🧹",
    url: "#"
  },
  {
    title: "Processors",
    tag: "Usage of Waste",
    desc: "Closing the loop by converting collected organic matter into energy-rich bio-resources through automated logistics.",
    icon: "⚡",
    buttonLabel: "Enroll as Processor",
    url: "https://processors-dashboard.netlify.app"
  }
];

const UseCases: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Typography animation based on scroll - Enhanced scales
  const titleScale = useTransform(scrollYProgress, [0, 0.45], [0.9, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.45], [100, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-64 px-6 md:px-24 bg-[#050505] overflow-hidden">
      {/* ATMOSPHERIC CLOUDS / ORBS - Larger and more dynamic */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -60, 0],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-[5%] w-[800px] h-[800px] bg-white/5 blur-[200px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 50, 0],
          opacity: [0.05, 0.2, 0.05]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-40 left-[5%] w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        {/* CENTERED HEADING */}
        <motion.div 
          style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
          className="mb-56 text-center flex flex-col items-center"
        >
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.9] max-w-7xl">
            Engineered for Sustainability,<br className="hidden md:block" />
            <span className="text-neutral-500">Better Environment</span><span className="text-emerald-500">.</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 200 }}
            transition={{ duration: 2, ease: "circOut" }}
            className="h-[2px] bg-emerald-500 mt-24 rounded-full shadow-[0_0_30px_#10b981]" 
          />
        </motion.div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ delay: idx * 0.25, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-16 bg-[#0A0A0B] border border-white/[0.04] rounded-[64px] hover:border-emerald-500/40 transition-all duration-1000 overflow-hidden shadow-2xl flex flex-col items-start min-h-[500px]"
            >
              {/* Subtle backlight on hover */}
              <div className="absolute -inset-10 bg-emerald-500/0 group-hover:bg-emerald-500/[0.06] blur-[150px] rounded-full transition-all duration-1000 pointer-events-none" />
              
              <div className="relative z-10 flex-grow">
                <div className="text-7xl mb-16 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 origin-left filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {item.icon}
                </div>
                <span className="text-[11px] uppercase tracking-[0.6em] text-emerald-500 font-black mb-6 block">
                  {item.tag}
                </span>
                <h3 className="text-4xl font-bold text-white mb-8 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-lg leading-relaxed font-medium group-hover:text-neutral-300 transition-colors duration-1000 max-w-[340px]">
                  {item.desc}
                </p>
              </div>

              {item.buttonLabel && (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.08, backgroundColor: 'rgba(16, 185, 129, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10 mt-16 px-10 py-5 border border-emerald-500/30 rounded-full text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500 hover:border-emerald-500 transition-all duration-500 shadow-xl"
                  >
                    {item.buttonLabel}
                  </motion.button>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;