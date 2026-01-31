
import React, { useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface LoginGateProps {
  progress: MotionValue<number>;
  onLogin: () => void;
}

const LoginGate: React.FC<LoginGateProps> = ({ progress, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const opacity = useTransform(progress, [0.95, 0.98], [0, 1]);
  const scale = useTransform(progress, [0.95, 1], [0.95, 1]);
  const blurValue = useTransform(progress, [0.95, 1], ["blur(20px)", "blur(0px)"]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const u = "Byogas";
    const p = "admin12345";
    if (username === u && password === p) {
      onLogin();
    } else {
      setError('Invalid identity or passphrase.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <section className="h-screen sticky top-0 flex items-center justify-center z-20 px-6">
      <motion.div 
        className="w-full max-w-md p-10 rounded-[3rem] border border-white/10 bg-neutral-900/60 backdrop-blur-3xl shadow-2xl flex flex-col items-center text-center space-y-8"
        style={{ opacity, scale, filter: blurValue }}
      >
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-emerald-400 tracking-tighter">
            Processor’s Portal
          </h2>
          <p className="text-neutral-400 font-black text-sm px-4 uppercase tracking-widest opacity-60">
            Authorized Personnel Only
          </p>
        </div>

        <form onSubmit={handleVerify} className="w-full space-y-4">
          <div className="space-y-2 text-left">
            <input
              type="text"
              placeholder="Admin ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:bg-white/10 focus:border-white/20 transition-all font-black tracking-tight"
            />
            <input
              type="password"
              placeholder="Passphrase"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:bg-white/10 focus:border-white/20 transition-all font-black tracking-tight"
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-red-400 text-xs font-black uppercase tracking-widest"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full py-5 rounded-3xl bg-white text-black font-black text-base tracking-tighter transition-all hover:bg-neutral-200 shadow-lg shadow-white/5"
          >
            Get Started
          </motion.button>
        </form>

        <div className="pt-2">
          <button 
            type="button"
            className="text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-[0.2em] font-black"
          >
            Forgot Access Keys?
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default LoginGate;
