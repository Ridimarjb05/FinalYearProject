import React from 'react';
import { Icon } from '../Icons';

const Reminders = ({ 
    reminders, 
    onToggle, 
    onAdd, 
    isAdding, 
    newReminder, 
    setNewReminder 
}) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Reminders</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Focus for today</p>
                </div>
                <button 
                    onClick={onAdd} 
                    className="w-8 h-8 flex items-center justify-center bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-600 dark:hover:text-white rounded-xl transition-all duration-300 shadow-sm"
                >
                    {Icon.plus}
                </button>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {isAdding && (
                    <div className="animate-slide-up">
                        <input
                            className="w-full text-sm px-4 py-3 bg-slate-50 dark:bg-slate-950 border-2 border-brand-200 dark:border-brand-900/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-medium"
                            placeholder="Add a new task..."
                            value={newReminder}
                            autoFocus
                            onChange={e => setNewReminder(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
                        />
                        <div className="text-[9px] text-slate-400 font-bold px-4 pt-1 uppercase tracking-widest">Press Enter to save</div>
                    </div>
                )}
                
                {reminders.length === 0 && !isAdding && (
                    <div className="flex flex-col items-center justify-center py-10 opacity-40">
                        {Icon.check}
                        <span className="text-xs font-bold uppercase tracking-widest">All caught up</span>
                    </div>
                )}

                {reminders.map(r => (
                    <div 
                        key={r.id} 
                        onClick={() => onToggle(r.id)} 
                        className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${r.done ? 'bg-slate-50/50 dark:bg-slate-900/30 border-transparent opacity-50 shadow-inner' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 hover:border-brand-200 dark:hover:border-brand-800/80 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-0.5'}`}
                    >
                        <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${r.done ? 'border-emerald-500 bg-emerald-500 text-white scale-90' : 'border-slate-200 dark:border-slate-700 group-hover:border-brand-400 group-hover:bg-brand-50/50 dark:group-hover:bg-brand-500/5'}`}>
                            {r.done && {Icon.check}}
                        </div>
                        <span className={`text-sm tracking-tight transition-all duration-300 ${r.done ? 'line-through text-slate-400 font-normal italic' : 'text-slate-700 dark:text-slate-200 font-semibold'}`}>
                            {r.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reminders;
