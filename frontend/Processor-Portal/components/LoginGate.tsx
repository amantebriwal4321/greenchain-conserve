
import React, { useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface LoginGateProps {
  progress: MotionValue<number>;
  onAccess: (firmName: string) => void;
}

const LoginGate: React.FC<LoginGateProps> = ({ progress, onAccess }) => {
  const [name, setName] = useState('');

  // Starts revealing as the Hero fades out
  const opacity = useTransform(progress, [0.65, 0.8], [0, 1]);
  const scale = useTransform(progress, [0.65, 0.95], [0.9, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAccess(name);
    }
  };

  return (
    <section className="h-screen sticky top-0 flex items-center justify-center z-20 px-6">
      <motion.div 
        className="w-full max-w-md p-12 rounded-[3.5rem] border border-white/5 bg-neutral-900/40 backdrop-blur-3xl shadow-2xl flex flex-col items-center text-center space-y-10"
        style={{ opacity, scale }}
      >
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tighter leading-none">
            Access Portal
          </h2>
          <div className="h-1 w-12 bg-emerald-500/20 mx-auto rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Firm Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-8 py-5 rounded-[2rem] bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:bg-white/10 focus:border-emerald-500/30 transition-all font-black tracking-tight text-center text-lg"
              autoFocus
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!name.trim()}
            className="w-full py-6 rounded-[2.2rem] bg-white text-black font-black text-lg tracking-tighter transition-all hover:bg-neutral-200 shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enter Dashboard
            <ArrowRight size={22} strokeWidth={3} />
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default LoginGate;
