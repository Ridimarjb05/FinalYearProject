import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DistributionChart = ({ data, isDark }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] col-span-1 lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inventory Distribution</h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">Stock spread by category</p>
                </div>
                <button className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline uppercase tracking-widest">
                    View Details
                </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-12">
                <div className="w-full sm:w-1/2 h-64 relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                            {data.reduce((sum, item) => sum + item.value, 0)}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-2">Total Units</span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.length ? data : [{ name: 'Empty', value: 1, color: '#e2e8f0' }]}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={70}
                                outerRadius={95}
                                paddingAngle={8}
                                stroke="none"
                                animationBegin={0}
                                animationDuration={1500}
                                animationEasing="ease-out"
                            >
                                {(data.length ? data : [{ color: '#e2e8f0' }]).map((entry, i) => (
                                    <Cell 
                                        key={i} 
                                        fill={entry.color} 
                                        className="outline-none hover:opacity-80 transition-opacity cursor-pointer shadow-lg"
                                    />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ 
                                    borderRadius: '16px', 
                                    border: 'none', 
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', 
                                    backgroundColor: isDark ? '#0f172a' : '#fff', 
                                    color: isDark ? '#fff' : '#0f172a',
                                    padding: '12px'
                                }}
                                itemStyle={{ fontWeight: 'bold' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="w-full sm:w-1/2 grid grid-cols-1 gap-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">Top Categories</div>
                    {(data.length ? data : [{ name: 'Empty', value: 0, color: '#e2e8f0' }]).map(item => (
                        <div className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" key={item.name}>
                            <div className="flex items-center gap-4">
                                <span className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:scale-125 transition-transform" style={{ backgroundColor: item.color }} />
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400">{Math.round((item.value / data.reduce((a,b)=>a+b.value, 0)) * 100)}%</span>
                                <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">{item.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DistributionChart;
