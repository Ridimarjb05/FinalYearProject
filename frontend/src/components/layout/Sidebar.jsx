import React from 'react';
import { Icon } from '../Icons';

const Sidebar = ({ activeSection, onNavigate, onLogout }) => {
    const navGeneral = [
        { label: 'Dashboard', icon: {Icon.home}, section: 'home', path: '/home' },
        { label: 'Inventory', icon: {Icon.box}, section: 'inventory', path: '/inventory' },
        { label: 'Parties', icon: {Icon.users}, section: 'parties', path: '/parties' },
        { label: 'Images', icon: {Icon.image}, section: 'images', path: '/images' },
    ];

    const navLedger = [
        { label: 'Sales', icon: {Icon.dollar}, section: 'sales', path: '/sales' },
        { label: 'Purchase', icon: {Icon.cart}, section: 'purchase', path: '/purchase' },
        { label: 'Expense', icon: {Icon.receipt}, section: 'expense', path: '/expense' },
        { label: 'Bank', icon: {Icon.bank}, section: 'bank', path: '/bank' },
    ];


    return (
        <aside className="w-64 flex flex-col glass backdrop-blur-2xl border-r border-slate-200 dark:border-slate-800/60 p-5 shrink-0 z-20 h-screen sticky top-0">
            <div className="flex items-center gap-3 mb-10 px-2 mt-2">
                <img src="/logo.png" alt="SmartStock" className="h-16 w-auto object-contain" />
            </div>

            <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mb-4 px-3 flex items-center gap-2">
                        <span className="w-1 h-3 bg-brand-500/50 rounded-full"></span>
                        General
                    </div>
                    <div className="space-y-1.5">
                        {navGeneral.map(item => {
                            const active = activeSection === item.section;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => onNavigate(item)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${active ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'}`}
                                >
                                    <span className={`transition-transform duration-200 group-hover:scale-110 ${active ? 'text-white' : 'opacity-70 group-hover:opacity-100 text-brand-500'}`}>{item.icon}</span>
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mb-4 px-3 flex items-center gap-2">
                        <span className="w-1 h-3 bg-slate-400/50 rounded-full"></span>
                        Ledger
                    </div>
                    <div className="space-y-1.5">
                        {navLedger.map(item => {
                            const active = activeSection === item.section;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => onNavigate(item)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${active ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'}`}
                                >
                                    <span className={`transition-transform duration-200 group-hover:scale-110 ${active ? 'text-white' : 'opacity-70 group-hover:opacity-100 text-brand-500'}`}>{item.icon}</span>
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>

                </div>
            </div>

            <div className="pt-6 mt-auto border-t border-slate-200 dark:border-slate-800/60">
                <button 
                    onClick={onLogout} 
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-all group"
                >
                    <span className="opacity-70 group-hover:opacity-100 transition-transform group-hover:translate-x-1">{Icon.logout}</span>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
