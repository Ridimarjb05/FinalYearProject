import React from 'react';
import { Icon } from '../Icons';

const KPIGrid = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((kpi, idx) => (
                <div 
                    key={idx} 
                    className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                >
                    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl -mr-12 -mt-12 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${kpi.bgColor.replace('bg-', 'bg-')}`}></div>
                    
                    <div className="flex justify-between items-start relative z-10">
                        <div className="space-y-3">
                            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">{kpi.title}</p>
                            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                                {kpi.value}
                            </h3>
                            <div className="flex items-center gap-1.5 pt-1">
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${kpi.color.replace('text-', 'bg-').replace('600', '100').replace('400', '900/40')} ${kpi.color}`}>
                                    +12.5%
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">{kpi.sub}</span>
                            </div>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${kpi.bgColor} ${kpi.color}`}>
                            {kpi.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KPIGrid;
