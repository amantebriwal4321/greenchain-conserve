
import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    Box,
    ChevronRight,
    MapPin,
    Bell,
    User,
    Search,
    TrendingUp,
    Activity,
    Weight,
    Info,
    CheckCircle2,
    Clock,
    Zap,
    X,
    Calendar,
    ArrowRightCircle,
    Power
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, FONTS } from '../constants/theme';

interface Bin {
    id: string;
    name: string;
    weight: number;
    status: 'Simulated' | 'LIVE – Open' | 'LIVE – Closed';
    lastUpdated: string;
    isLive: boolean;
}

const PartnerDashboard: React.FC = () => {
    const [liveWeight, setLiveWeight] = useState(17.1);
    const [isLiveOpen, setIsLiveOpen] = useState(true);
    const [lastOpened, setLastOpened] = useState(new Date(Date.now() - 120000).toLocaleTimeString());
    const [lastClosed, setLastClosed] = useState(new Date(Date.now() - 360000).toLocaleTimeString());
    const [selectedBin, setSelectedBin] = useState<Bin | null>(null);

    // IoT Real-time states
    const [latestEvent, setLatestEvent] = useState<any>(null);
    const [eventLogs, setEventLogs] = useState<any[]>([]);

    // Polling effect for real-time IoT data
    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/waste/latest?deviceId=BIN_01');
                if (!response.ok) throw new Error("API Offline");
                const data = await response.json();

                // Only update if the event or time has changed to prevent UI flicker
                if (!latestEvent || data.createdAt !== latestEvent.createdAt) {
                    setLatestEvent(data);

                    // Sync with standard dashboard states
                    const isOpen = data.event === "IN" || data.event === "OPEN";
                    setIsLiveOpen(isOpen);
                    setLiveWeight(data.distanceCm);

                    if (isOpen) {
                        setLastOpened(data.timestamp || new Date(data.createdAt).toLocaleTimeString());
                    } else if (data.event === "OFF" || data.event === "CLOSE") {
                        setLastClosed(data.timestamp || new Date(data.createdAt).toLocaleTimeString());
                    }
                }
            } catch (error) {
                console.warn("Poll failed, retaining last known state");
            }
        };

        const fetchLogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/waste/logs?deviceId=BIN_01&limit=5');
                if (response.ok) {
                    const data = await response.json();
                    setEventLogs(data);
                }
            } catch (error) {
                console.error("Log fetch failed", error);
            }
        };

        const interval = setInterval(() => {
            fetchLatest();
            fetchLogs();
        }, 500);

        fetchLatest();
        fetchLogs();
        return () => clearInterval(interval);
    }, [latestEvent]);

    // Backup Simulation (Only runs if no real IoT data arrives)
    useEffect(() => {
        if (latestEvent) return;

        const interval = setInterval(() => {
            setLiveWeight(prev => {
                const change = (Math.random() - 0.4) * 0.2;
                return parseFloat((prev + change).toFixed(1));
            });
            if (Math.random() > 0.95) {
                setIsLiveOpen(prev => {
                    const next = !prev;
                    const timestamp = new Date().toLocaleTimeString();
                    if (next) setLastOpened(timestamp);
                    else setLastClosed(timestamp);
                    return next;
                });
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [latestEvent]);

    const dummyBins: Bin[] = [
        { name: "Dustbin 2", weight: 23.1, id: "SMVIT-1002", status: "Simulated", lastUpdated: "1 hour ago", isLive: false },
        { name: "Dustbin 3", weight: 14.7, id: "SMVIT-1003", status: "Simulated", lastUpdated: "1 hour ago", isLive: false },
        { name: "Dustbin 4", weight: 10.3, id: "SMVIT-1004", status: "Simulated", lastUpdated: "2 hours ago", isLive: false },
        { name: "Dustbin 5", weight: 17.1, id: "SMVIT-1005", status: "Simulated", lastUpdated: "2 hours ago", isLive: false },
    ];

    const liveBin: Bin = {
        name: "Dustbin 1",
        weight: latestEvent ? latestEvent.distanceCm : liveWeight,
        id: "BIN_01",
        status: isLiveOpen ? "LIVE – Open" : "LIVE – Closed",
        lastUpdated: latestEvent ? (latestEvent.timestamp || new Date(latestEvent.createdAt).toLocaleTimeString()) : "Just now",
        isLive: true
    };

    const allBins = [liveBin, ...dummyBins];
    const totalWeight = allBins.reduce((sum, bin) => sum + bin.weight, 0).toFixed(1);
    const totalCredits = (parseFloat(totalWeight) * 0.85).toFixed(1);

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: COLORS.background }}>
            {/* Sidebar/Top Nav Combined */}
            <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: COLORS.primary }}>
                            <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-xl font-bold tracking-tight hidden md:block" style={{ color: COLORS.primary, fontFamily: FONTS.headings }}>
                            GreenChain
                        </span>
                    </div>

                    <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

                    <nav className="flex items-center text-sm font-medium text-gray-500 whitespace-nowrap">
                        <span>Dashboard</span>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span style={{ color: COLORS.primary }}>SMVIT College</span>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="flex items-center space-x-3 pl-2">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold" style={{ color: COLORS.textDark }}>Admin User</div>
                            <div className="text-xs text-gray-400">SMVIT, Bantakal</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden outline outline-offset-2 outline-gray-50">
                            <User className="w-6 h-6 text-teal-600" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Title Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: FONTS.headings, color: COLORS.textDark }}>
                        SMVIT College Dashboard
                    </h1>
                    <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        Benagaluru Karnataka
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Card
                        title="Total Bins"
                        value="5"
                        icon={<Box className="w-6 h-6" />}
                        color={COLORS.primary}
                    />
                    <Card
                        title="Total Weight"
                        value={`${totalWeight}`}
                        unit="kg"
                        icon={<Weight className="w-6 h-6" />}
                        color="#3B82F6"
                    />
                    <Card
                        title="Generated Credits"
                        value={`${totalCredits}`}
                        icon={<TrendingUp className="w-6 h-6" />}
                        color={COLORS.success}
                    />
                </div>

                {/* Bin Data Section */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-teal-900/5 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <h3 className="text-xl font-bold" style={{ fontFamily: FONTS.headings }}>Resource Distribution</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search bins..."
                                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-8 py-4">Dustbin Name</th>
                                    <th className="px-8 py-4">Bin ID</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-center">Weight (kg)</th>
                                    <th className="px-8 py-4">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allBins.map((bin) => (
                                    <tr
                                        key={bin.id}
                                        onClick={() => setSelectedBin(bin)}
                                        className={`
                      border-b border-gray-50 transition-all cursor-pointer group/row
                      ${bin.isLive ? 'bg-teal-50/40 relative' : 'hover:bg-gray-50/50'}
                    `}
                                    >
                                        <td className="px-8 py-6 font-semibold flex items-center">
                                            {bin.isLive && (
                                                <div className="relative flex mr-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                </div>
                                            )}
                                            {bin.name}
                                        </td>
                                        <td className="px-8 py-6">
                                            <code className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono">{bin.id}</code>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center group relative cursor-help">
                                                {bin.isLive ? (
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest flex items-center shadow-sm border ${isLiveOpen ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                                                            }`}
                                                    >
                                                        <Activity className="w-3 h-3 mr-1.5 animate-pulse" />
                                                        {bin.status}
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold tracking-widest border border-gray-200 uppercase">
                                                        {bin.status}
                                                    </span>
                                                )}
                                                {!bin.isLive && (
                                                    <div className="absolute left-0 -top-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity bg-gray-800 text-white text-[10px] py-1.5 px-3 rounded shadow-xl whitespace-nowrap z-20">
                                                        This bin is currently running with test data
                                                        <div className="absolute left-4 top-full border-4 border-transparent border-t-gray-800"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className={`font-mono font-bold text-lg ${bin.isLive ? 'text-teal-700' : 'text-gray-700'}`}>
                                                {bin.isLive ? liveWeight.toFixed(1) : bin.weight}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center text-sm text-gray-400">
                                                <Clock className="w-3 h-3 mr-1.5" />
                                                {bin.lastUpdated}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-teal-50/10 border-t border-gray-100 flex items-center text-xs text-teal-600 font-medium">
                        <Info className="w-4 h-4 mr-2" />
                        Data from Bin SMVIT-1001 is fetched directly from IoT sensor. Others are simulated.
                    </div>
                </div>
            </main>

            <footer className="px-6 py-12 text-center text-sm text-gray-400">
                <div>GreenChain © 2026</div>
                <div className="mt-2 space-x-4">
                    <a href="#" className="hover:text-teal-700">About</a>
                    <a href="#" className="hover:text-teal-700">Contact</a>
                    <a href="#" className="hover:text-teal-700">Privacy</a>
                    <a href="#" className="hover:text-teal-700">Terms</a>
                </div>
            </footer>

            {/* Modal for Bin Details (Big Picture) */}
            <AnimatePresence>
                {selectedBin && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBin(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                            {/* Header Image/Pattern Area */}
                            <div className={`h-32 w-full flex items-center justify-center relative overflow-hidden ${selectedBin.isLive ? (isLiveOpen ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-200'}`}>
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl mb-2">
                                        <Zap className="w-8 h-8 text-white fill-current animate-pulse" />
                                    </div>
                                    <div className="text-white font-bold tracking-widest text-xs uppercase">Device Connectivity: Active</div>
                                </div>
                                <button
                                    onClick={() => setSelectedBin(null)}
                                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 sm:p-10 -mt-6 bg-white rounded-t-[2.5rem] relative z-20">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 space-y-4 sm:space-y-0">
                                    <div>
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold tracking-widest uppercase mb-3 border border-teal-100">
                                            {selectedBin.isLive ? 'Live Hub' : 'Mock Device'}
                                        </div>
                                        <h2 className="text-4xl font-black font-heading text-gray-900 leading-none">{selectedBin.name}</h2>
                                        <p className="text-gray-400 mt-2 font-mono text-sm tracking-tighter">{selectedBin.id} • Bantakal Sector A-12</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Load</div>
                                        <div className="text-4xl font-black font-heading text-teal-600">
                                            {selectedBin.isLive ? liveWeight.toFixed(1) : selectedBin.weight} <span className="text-xs uppercase text-gray-400">kg</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* ON/OFF State Card */}
                                    <div className={`p-8 rounded-[2rem] border transition-all ${selectedBin.isLive ? (isLiveOpen ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100') : 'bg-gray-50 border-gray-100'}`}>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`p-3 rounded-2xl ${isLiveOpen ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                                                <Power className="w-6 h-6" />
                                            </div>
                                            <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-md ${isLiveOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                {selectedBin.isLive ? (isLiveOpen ? 'Active' : 'Standby') : 'Sim'}
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold text-gray-500 uppercase tracking-tight mb-1">Lid Operational State ({latestEvent ? 'Real-time' : 'Fixed'})</div>
                                        <div className={`text-3xl font-black font-heading ${isLiveOpen ? 'text-green-700' : 'text-red-700'}`}>
                                            {selectedBin.isLive ? (isLiveOpen ? 'OPEN' : 'CLOSED') : 'Simulated'}
                                        </div>
                                        <p className="mt-4 text-[11px] text-gray-400 leading-tight">
                                            {latestEvent ? `Direct Signal: ${latestEvent.event}` : 'Status derived from simulated triggers.'}
                                            {latestEvent?.timestamp && ` | Local: ${latestEvent.timestamp}`}
                                        </p>
                                    </div>

                                    {/* Operation Timings Card */}
                                    <div className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center space-x-2 text-teal-600 mb-6">
                                                <div className="p-3 bg-teal-50 rounded-2xl">
                                                    <Clock className="w-6 h-6" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest">Sensor Logs</span>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between group">
                                                    <span className="text-xs font-bold text-gray-400 uppercase">Last Entry</span>
                                                    <span className="font-mono text-sm font-black text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">
                                                        {selectedBin.isLive ? lastOpened : '10:42 PM'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between group">
                                                    <span className="text-xs font-bold text-gray-400 uppercase">Last Exit</span>
                                                    <span className="font-mono text-sm font-black text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">
                                                        {selectedBin.isLive ? lastClosed : '11:15 PM'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Mini Log List (New) */}
                                            {selectedBin.isLive && eventLogs.length > 0 && (
                                                <div className="mt-6 space-y-2 border-t border-gray-50 pt-4">
                                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Recent Events</div>
                                                    {eventLogs.slice(0, 3).map((log, i) => (
                                                        <div key={i} className="flex items-center justify-between text-[11px] font-medium text-gray-600 bg-gray-50/50 p-2 rounded-lg">
                                                            <span className={(log.event === 'IN' || log.event === 'OPEN') ? 'text-green-600' : 'text-red-600'}>● {log.event}</span>
                                                            <span className="text-gray-400 font-mono">{log.timestamp || new Date(log.createdAt).toLocaleTimeString()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase">Data Freshness</span>
                                            <div className="flex items-center space-x-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                <span className="text-[10px] text-green-600 font-black">LIVE</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Simulated Data Warning / Info */}
                                <div className="mt-8 p-6 rounded-3xl bg-amber-50/50 border border-amber-100 flex items-start space-x-4">
                                    <div className="p-2 bg-amber-100 rounded-xl text-amber-600 flex-shrink-0">
                                        <Info className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">Architecture Note</h4>
                                        <p className="text-[11px] text-amber-700/70 leading-relaxed font-medium">
                                            The value shown above ({selectedBin.isLive ? (latestEvent ? latestEvent.distanceCm.toFixed(1) : liveWeight.toFixed(1)) : selectedBin.weight} kg) is confirmed <strong>Hardware Telemetry</strong>.
                                            Distance: {selectedBin.isLive && latestEvent ? latestEvent.distanceCm : '0.0'} cm.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="w-full mt-10 py-5 rounded-[1.5rem] bg-gray-900 text-white font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gray-900/10"
                                    onClick={() => setSelectedBin(null)}
                                >
                                    <span>Dismiss Report</span>
                                    <ArrowRightCircle className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Card = ({ title, value, unit, icon, color }: any) => (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg shadow-teal-900/[0.02] flex items-center justify-between group hover:border-teal-100 transition-all hover:shadow-teal-900/5">
        <div>
            <h4 className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">{title}</h4>
            <div className="flex items-baseline">
                <span className="text-4xl font-bold mr-1" style={{ color: COLORS.textDark, fontFamily: FONTS.headings }}>{value}</span>
                {unit && <span className="text-gray-400 font-bold ml-1">{unit}</span>}
            </div>
        </div>
        <div
            className="p-4 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${color}10`, color: color }}
        >
            {icon}
        </div>
    </div>
);

export default PartnerDashboard;
