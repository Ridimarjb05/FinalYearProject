import React from 'react';

const BalanceSummary = ({ receivableTotal, payableTotal }) => {
    const netBalance = receivableTotal - payableTotal;
    
    return (
        <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-brand-500/20 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -ml-10 -mb-10 group-hover:bg-emerald-500/10 transition-all duration-700"></div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Net Capital Status</p>
                    <div className={`h-2 w-2 rounded-full animate-pulse ${netBalance >= 0 ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'}`}></div>
                </div>
                
                <h3 className="text-4xl font-black tracking-tighter mb-8 drop-shadow-sm">
                    <span className="text-slate-500 text-2xl mr-1 font-medium italic">Rs</span>
                    {netBalance.toLocaleString()}
                </h3>
                
                <div className="grid grid-cols-1 gap-5">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors group/item">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracing-widest">Receivable</span>
                            <span className="text-xs text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/10 rounded-full">Liquid</span>
                        </div>
                        <div className="text-xl font-bold text-slate-100 group-hover/item:translate-x-1 transition-transform">
                            Rs {receivableTotal.toLocaleString()}
                        </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors group/item">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracing-widest">Payable</span>
                            <span className="text-xs text-rose-400 font-bold px-2 py-0.5 bg-rose-500/10 rounded-full">Liability</span>
                        </div>
                        <div className="text-xl font-bold text-slate-100 group-hover/item:translate-x-1 transition-transform">
                            Rs {payableTotal.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceSummary;
