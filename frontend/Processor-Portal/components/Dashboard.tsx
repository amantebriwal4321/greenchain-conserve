
import React, { useState, useCallback } from 'react';
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
  Info,
  X,
  Bell
} from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'alert';
  icon?: React.ReactNode;
}

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  sub: string;
  icon: React.ReactNode;
  delay?: number;
  addToast: (message: string, type: Toast['type'], icon?: React.ReactNode) => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, sub, icon, delay = 0, addToast }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSync = () => {
    setIsRefreshing(true);
    setShowMenu(false);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast(`${label} synchronized with global pool.`, 'success', <RefreshCw size={14} />);
    }, 1500);
  };

  const handleFlush = () => {
    setShowMenu(false);
    addToast(`${label} cache flushed. Recalibrating...`, 'alert', <Trash2 size={14} />);
  };

  const handleViewDetails = () => {
    setShowMenu(false);
    addToast(`Node Status: Verified. Integrity: 99.9%`, 'info', <Info size={14} />);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between space-y-8 group hover:bg-white/[0.05] transition-all duration-500 shadow-2xl overflow-visible"
    >
      <div className="flex justify-between items-start">
        <div className={`p-4 rounded-2xl bg-white/5 text-emerald-400 shadow-inner transition-all duration-500 ${isRefreshing ? 'animate-pulse scale-110 rotate-12' : ''}`}>
          {isRefreshing ? <RefreshCw className="animate-spin" size={24} /> : icon}
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`p-2 rounded-xl transition-all z-20 relative ${showMenu ? 'bg-white/10 text-white' : 'text-neutral-600 hover:text-white hover:bg-white/5'}`}
          >
            <MoreVertical size={20} />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#121212] border border-white/10 p-2 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                >
                  <button 
                    onClick={handleViewDetails}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-black text-neutral-300 transition-all text-left"
                  >
                    <Info size={16} /> View Details
                  </button>
                  <button 
                    onClick={handleSync}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-black text-neutral-300 transition-all text-left"
                  >
                    <RefreshCw size={16} /> Sync
                  </button>
                  <div className="h-px bg-white/5 my-1" />
                  <button 
                    onClick={handleFlush}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-sm font-black text-red-400 transition-all text-left"
                  >
                    <Trash2 size={16} /> Flush
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
          <span className={`text-white font-black text-5xl tracking-tighter leading-none transition-all duration-300 ${isRefreshing ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
            {value}
          </span>
          <span className="text-neutral-600 text-[11px] font-black uppercase tracking-widest">{unit}</span>
        </div>
        <p className="text-neutral-400 font-black text-xs tracking-tight opacity-80">{sub}</p>
      </div>
    </motion.div>
  );
};

interface DashboardProps {
  firmName: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ firmName, onLogout }) => {
  const [requestValue, setRequestValue] = useState(5.4);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'], icon?: React.ReactNode) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      addToast("System data synchronized across all nodes.", "success", <RefreshCw size={14} />);
    }, 2000);
  };

  const adjustValue = (amount: number) => {
    setRequestValue(prev => {
      const next = prev + amount;
      return Math.min(Math.max(0, next), 15);
    });
  };

  const handleRequest = () => {
    addToast(`Demand for ${requestValue.toFixed(1)}kg successfully submitted to pool.`, "success", <CheckCircle2 size={14} />);
  };

  return (
    <div className="min-h-screen text-white bg-black p-6 md:p-12 selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Toast Notification Area */}
      <div className="fixed top-8 right-8 z-[100] flex flex-col gap-4 items-end pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className={`pointer-events-auto flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-2xl border shadow-2xl min-w-[300px] max-w-sm ${
                toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20' : 
                toast.type === 'alert' ? 'bg-red-500/10 border-red-500/20' : 
                'bg-white/5 border-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl ${
                toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
                toast.type === 'alert' ? 'bg-red-500/20 text-red-400' : 
                'bg-white/10 text-neutral-300'
              }`}>
                {toast.icon || <Bell size={16} />}
              </div>
              <p className="flex-1 text-sm font-black tracking-tight text-neutral-100">{toast.message}</p>
              <button 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-neutral-600 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
            <h1 className="text-4xl font-black tracking-tighter text-emerald-400">{firmName}</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-500">Processor Control Portal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-base text-neutral-100 font-black tracking-tight">Active Node</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-black flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">Metrics</h2>
            <div className="flex flex-wrap items-center gap-5 text-neutral-400 font-black text-sm tracking-tight opacity-70">
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"><Activity size={16} className="text-emerald-400" /> Supply</span>
              <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
              <span>Pool ID: HUB-ALPHA</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSync}
            className="flex items-center gap-4 px-10 py-6 bg-white/[0.04] border border-white/10 rounded-[2.5rem] text-base font-black tracking-tight hover:bg-white/[0.1] transition-all shadow-xl"
          >
            <RefreshCw size={20} className={`text-white ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Data'}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MetricCard 
            label="Platform Total" 
            value="412.5" 
            unit="kg" 
            sub="Global weight pool" 
            icon={<Layers size={24} strokeWidth={2.5} />}
            delay={0.1}
            addToast={addToast}
          />
          <MetricCard 
            label="In Inventory" 
            value="28.2" 
            unit="kg" 
            sub="Stored onsite" 
            icon={<Box size={24} strokeWidth={2.5} />}
            delay={0.2}
            addToast={addToast}
          />
          <MetricCard 
            label="Allocated Today" 
            value="5.4" 
            unit="kg" 
            sub="Processed" 
            icon={<CheckCircle2 size={24} strokeWidth={2.5} />}
            delay={0.3}
            addToast={addToast}
          />
        </div>

        <div className="flex justify-center pt-10 pb-24 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-2xl p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/[0.08] space-y-12 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
            
            <div className="space-y-3">
              <h3 className="text-4xl font-black tracking-tighter">Demand Request</h3>
              <p className="text-neutral-500 font-black text-base">Target aggregate volume required for next processing cycle.</p>
            </div>
            
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-end px-2">
                  <span className="text-[11px] font-black text-neutral-600 uppercase tracking-[0.3em]">Volume Request</span>
                  <div className="flex flex-col items-end">
                    <span className="text-5xl font-black tracking-tighter text-white">
                      {requestValue.toFixed(1)} <span className="text-xs text-emerald-400 ml-1">kg</span>
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
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400"
                  />
                  
                  <div className="flex items-center justify-between">
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => adjustValue(-0.1)}
                      className="p-5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
                    >
                      <Minus size={24} strokeWidth={3} />
                    </motion.button>
                    
                    <div className="flex justify-between w-full max-w-[60%] text-[10px] text-neutral-700 font-black uppercase tracking-[0.5em] px-4">
                      <span>0.0</span>
                      <span>15.0</span>
                    </div>

                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => adjustValue(0.1)}
                      className="p-5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
                    >
                      <Plus size={24} strokeWidth={3} />
                    </motion.button>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRequest}
                className="w-full py-8 rounded-[2.5rem] bg-emerald-400 text-black font-black text-xl tracking-tighter shadow-xl flex items-center justify-center gap-4 transition-all hover:bg-emerald-300 active:scale-95"
              >
                Submit Request
                <ArrowUpRight size={24} strokeWidth={3} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>

      <div className="fixed top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-emerald-500/[0.02] blur-[250px] -z-10 rounded-full pointer-events-none" />
    </div>
  );
};

export default Dashboard;
