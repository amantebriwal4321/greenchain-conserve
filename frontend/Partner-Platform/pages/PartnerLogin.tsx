
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, ShieldCheck, FileCheck, MapPin, Zap } from 'lucide-react';
import { COLORS, FONTS } from '../constants/theme';

const PartnerLogin: React.FC = () => {
    const navigate = useNavigate();

    const benefits = [
        {
            icon: <MapPin className="w-6 h-6" style={{ color: COLORS.primary }} />,
            title: "Centralized tracking",
            desc: "Waste tracking across multiple locations"
        },
        {
            icon: <ShieldCheck className="w-6 h-6" style={{ color: COLORS.primary }} />,
            title: "Verified credits",
            desc: "Carbon credit records with full transparency"
        },
        {
            icon: <FileCheck className="w-6 h-6" style={{ color: COLORS.primary }} />,
            title: "Compliance-ready",
            desc: "Reports for audits & regulations"
        },
        {
            icon: <Zap className="w-6 h-6" style={{ color: COLORS.primary }} />,
            title: "Real-time insights",
            desc: "Dashboards for daily operations"
        },
        {
            icon: <BarChart3 className="w-6 h-6" style={{ color: COLORS.primary }} />,
            title: "Trust-backed data",
            desc: "Traceable digital records"
        }
    ];

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: COLORS.background, color: COLORS.textDark }}>
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: COLORS.primary }}>
                        <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tight" style={{ color: COLORS.primary, fontFamily: FONTS.headings }}>
                        GreenChain
                    </span>
                </div>

                <h1 className="hidden md:block text-2xl font-bold" style={{ fontFamily: FONTS.headings }}>
                    Partner Login
                </h1>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center space-x-2 px-5 py-2 rounded-full text-white font-medium transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: COLORS.primary }}
                >
                    <span>Access Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </nav>

            {/* Hero Section */}
            <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ fontFamily: FONTS.headings }}>
                    Partner Login
                </h2>
                <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto" style={{ fontFamily: FONTS.body }}>
                    For schools, restaurants, campuses, messes & organizations
                </p>

                <div className="inline-block p-1 rounded-2xl bg-white shadow-xl shadow-teal-900/5 group hover:scale-[1.02] transition-transform">
                    <div className="px-12 py-8 rounded-xl border border-teal-50 flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: COLORS.primary, fontFamily: FONTS.headings }}>
                            Track Waste. Earn Credits. Build Trust.
                        </div>
                        <div className="w-20 h-1.5 rounded-full mt-2" style={{ backgroundColor: COLORS.accent }}></div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="px-6 py-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-bold text-center mb-16" style={{ fontFamily: FONTS.headings }}>
                        Why partners choose GreenChain
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="p-8 rounded-2xl border border-gray-50 hover:border-teal-100 hover:bg-teal-50/10 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {benefit.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-3" style={{ fontFamily: FONTS.headings }}>{benefit.title}</h4>
                                <p className="text-gray-500 leading-relaxed" style={{ fontFamily: FONTS.body }}>{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-24 text-center">
                <div className="max-w-4xl mx-auto p-12 rounded-[2.5rem] text-white relative overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 rounded-full bg-white/10"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-accent/20"></div>

                    <div className="relative z-10">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
                            style={{ backgroundColor: COLORS.accent, color: COLORS.textDark }}
                        >
                            <span>Access Dashboard</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <p className="mt-8 text-white/80 font-medium italic">
                            View live and test data from connected smart bins
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-gray-100 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-sm text-gray-500">
                    <div className="font-semibold text-gray-700">GreenChain © 2026</div>
                    <div className="flex space-x-8">
                        <a href="#" className="hover:text-teal-700 transition-colors">About</a>
                        <a href="#" className="hover:text-teal-700 transition-colors">Contact</a>
                        <a href="#" className="hover:text-teal-700 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-teal-700 transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PartnerLogin;
