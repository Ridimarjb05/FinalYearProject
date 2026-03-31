import React from 'react';
import { Icon } from '../Icons';

const Topbar = ({ title, activeSection, theme, onToggleTheme, userInitial }) => {
    const isDark = theme === 'dark';

    return (
        <header className="h-20 flex items-center justify-between px-10 glass backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800/60 shrink-0 z-10 sticky top-0">
            <div className="flex flex-col">
                <img src="/logo.png" alt="SmartStock" className="h-8 w-auto object-contain mb-1" />
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {title}
                </h1>
            </div>
            
            <div className="flex-1 max-w-lg mx-12">
                {activeSection !== 'inventory' ? (
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors duration-200">
                            {Icon.search}
                        </span>
                        <input 
                            className="w-full bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400 font-medium"
                            placeholder="Search products, parties, or ledger..." 
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-400">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 p-1 bg-slate-100/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <button 
                        onClick={onToggleTheme} 
                        className={`p-2 rounded-xl transition-all duration-300 ${!isDark ? 'bg-white text-amber-500 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        {Icon.sun}
                    </button>
                    <button 
                        onClick={onToggleTheme} 
                        className={`p-2 rounded-xl transition-all duration-300 ${isDark ? 'bg-slate-800 text-indigo-400 shadow-inner' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {Icon.moon}
                    </button>
                </div>

                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

                <button className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-lg hover:shadow-brand-500/5 transition-all relative group">
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 group-hover:animate-pulse"></span>
                    {Icon.bell}
                </button>

                <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white font-bold flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-200">
                        {userInitial}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">Admin</span>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wide mt-1">Online</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
