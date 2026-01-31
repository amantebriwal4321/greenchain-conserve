
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  ArrowLeft, 
  MoreVertical, 
  RefreshCw, 
  Activity, 
  Layers, 
  ArrowUpRight, 
  Plus, 
  Minus,
  CheckCircle2,
  Trash2,
  Info
} from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  sub: string;
  icon: React.ReactNode;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, sub, icon, delay = 0 }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between space-y-8 group hover:bg-white/[0.05] transition-all duration-500 shadow-2xl"
    >
      <div className="flex justify-between items-start">
        <div className="p-4 rounded-2xl bg-white/5 text-emerald-400 shadow-inner">
          {icon}
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`p-2 rounded-xl transition-all ${showMenu ? 'bg-white/10 text-white' : 'text-neutral-600 hover:text-white hover:bg-white/5'}`}
          >
            <MoreVertical size={20} />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)} />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#121212] border border-white/10 p-2 z-40 shadow-2xl backdrop-blur-xl"
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-black text-neutral-300 transition-all">
                    <Info size={16} /> View Details
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-black text-neutral-300 transition-all">
                    <RefreshCw size={16} /> Sync Metrics
                  </button>
                  <div className="h-px bg-white/5 my-1" />
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-sm font-black text-red-400 transition-all">
                    <Trash2 size={16} /> Clear Log
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.25em] font-black text-neutral-500">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-white font-black text-5xl tracking-tighter leading-none">{value}</span>
          <span className="text-neutral-600 text-[11px] font-black uppercase tracking-widest">{unit}</span>
        </div>
        <p className="text-neutral-400 font-black text-xs tracking-tight opacity-80">{sub}</p>
      </div>
    </motion.div>
  );
};

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [requestValue, setRequestValue] = useState(5.4);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const adjustValue = (amount: number) => {
    setRequestValue(prev => {
      const next = prev + amount;
      // Clamp between 0 and 15kg for requestable pool chunks
      return Math.min(Math.max(0, next), 15);
    });
  };

  const handleRequest = () => {
    alert(`Request for ${requestValue.toFixed(1)}kg of waste submitted to the grid hub.`);
  };

  return (
    <div className="min-h-screen text-white bg-black p-6 md:p-12 selection:bg-emerald-500/30">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-24">
        <div className="flex items-center gap-8">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={onLogout}
            className="p-5 rounded-full bg-white/5 border border-white/10 transition-all text-neutral-300 shadow-lg"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </motion.button>
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter text-emerald-400">Byogas Portal</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-500">Node Verified • Aggregate Supply</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-base text-neutral-100 font-black tracking-tight">Byogas Processor</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-black flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              Real-time Active
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">Pool Overview</h2>
            <div className="flex flex-wrap items-center gap-5 text-neutral-400 font-black text-sm tracking-tight opacity-70">
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"><Activity size={16} className="text-emerald-400" /> Global Supply Pulse</span>
              <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
              <span>Entity ID: HUB-ALPHA-01</span>
              <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
              <span>Encryption: AES-256</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSync}
            className="flex items-center gap-4 px-10 py-6 bg-white/[0.04] border border-white/10 rounded-[2.5rem] text-base font-black tracking-tight hover:bg-white/[0.1] transition-all shadow-xl"
          >
            <RefreshCw size={20} className={`text-white ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Updating Matrix...' : 'Sync All Nodes'}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MetricCard 
            label="Platform Total" 
            value="412.5" 
            unit="kg" 
            sub="Global pool weight availability (Goal: >400kg)" 
            icon={<Layers size={24} strokeWidth={2.5} />}
            delay={0.1}
          />
          <MetricCard 
            label="In Inventory" 
            value="28.2" 
            unit="kg" 
            sub="Stored at Central Processor (Max: 30kg)" 
            icon={<Box size={24} strokeWidth={2.5} />}
            delay={0.2}
          />
          <MetricCard 
            label="Allocated Today" 
            value="5.4" 
            unit="kg" 
            sub="Dispatched to process lines (Goal: ~5kg)" 
            icon={<CheckCircle2 size={24} strokeWidth={2.5} />}
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/[0.08] space-y-12 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10 group-hover:bg-emerald-500/10 transition-colors duration-1000" />
            
            <div className="space-y-3">
              <h3 className="text-4xl font-black tracking-tighter">Demand Request</h3>
              <p className="text-neutral-500 font-black text-base max-w-sm">Target aggregate volume required for next processing cycle.</p>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-end px-2">
                  <span className="text-[11px] font-black text-neutral-600 uppercase tracking-[0.3em]">Volume Request</span>
                  <div className="flex flex-col items-end">
                    <span className="text-5xl font-black tracking-tighter text-white">
                      {requestValue.toFixed(1)} <span className="text-xs text-neutral-600 font-black uppercase tracking-widest ml-1 text-emerald-400">kg</span>
                    </span>
                  </div>
                </div>

                <div className="relative h-20 flex flex-col justify-center gap-8">
                  <input 
                    type="range" 
                    min="0" 
                    max="15" 
                    step="0.1" 
                    value={requestValue}
                    onChange={(e) => setRequestValue(parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all"
                  />
                  
                  <div className="flex items-center justify-between">
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => adjustValue(-0.1)}
                      className="p-5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Minus size={24} strokeWidth={3} />
                    </motion.button>
                    
                    <div className="flex justify-between w-full max-w-[60%] text-[10px] text-neutral-700 font-black uppercase tracking-[0.5em] px-4">
                      <span>Min 0.0</span>
                      <span>Max 15.0</span>
                    </div>

                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => adjustValue(0.1)}
                      className="p-5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Plus size={24} strokeWidth={3} />
                    </motion.button>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRequest}
                className="w-full py-8 rounded-[2.5rem] bg-emerald-400 text-black font-black text-xl tracking-tighter transition-all hover:bg-emerald-300 shadow-[0_20px_40px_rgba(52,211,153,0.1)] flex items-center justify-center gap-4 group"
              >
                Submit Request
                <ArrowUpRight size={24} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-12 rounded-[3.5rem] border border-white/5 flex flex-col justify-center space-y-10 bg-white/[0.01]"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-black tracking-tighter text-white">Consolidation Engine</h3>
              <p className="text-neutral-400 font-black text-lg leading-relaxed max-w-md">
                Individual bin data is automatically indexed and flattened. As a processor, you manage the <span className="text-emerald-400">Total Available Stock</span> rather than discrete units.
              </p>
            </div>
            
            <div className="space-y-6">
                {[
                  { text: "Auto-Consolidation Enabled", icon: Plus },
                  { text: "Priority Grid Access: Active", icon: Plus },
                  { text: "Node Synced (HUB-01)", icon: CheckCircle2 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 text-neutral-300">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <item.icon size={18} strokeWidth={3} />
                    </div>
                    <span className="text-base font-black tracking-tight">{item.text}</span>
                  </div>
                ))}
            </div>

            <div className="pt-8 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-600">Compliance & Audit</p>
              <p className="text-[11px] font-black text-neutral-500 mt-2">All pool movements are immutable and signed by the processor private key. Platform total resets at 00:00 UTC.</p>
            </div>
          </motion.div>
        </div>
      </main>

      <div className="fixed top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-emerald-500/[0.02] blur-[250px] -z-10 rounded-full pointer-events-none" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[800px] h-[800px] bg-neutral-900/[0.1] blur-[200px] -z-10 rounded-full pointer-events-none" />
    </div>
  );
};

export default Dashboard;
