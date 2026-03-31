import React from 'react';
import { Icon } from '../Icons';

const AddProductModal = ({ isOpen, onClose, onSubmit, form, onInputChange }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 w-full max-w-xl rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] animate-slide-up overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">New Inventory Item</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Register a new product in the system</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                        {Icon.close}
                    </button>
                </div>
                
                <form onSubmit={onSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div className="col-span-2 space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Product Identity <span className="text-rose-500">*</span></label>
                            <input 
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-brand-500/50 rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-brand-500/5 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all placeholder:text-slate-300 dark:text-white" 
                                type="text" name="name" value={form.name} onChange={onInputChange} 
                                placeholder="e.g. Premium Cotton Shirt" required 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">SKU Code</label>
                            <input 
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-brand-500/50 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-500/5 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all placeholder:text-slate-300 font-mono dark:text-indigo-400 uppercase" 
                                type="text" name="sku" value={form.sku} onChange={onInputChange} 
                                placeholder="SKU-001" 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Category</label>
                            <input 
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-brand-500/50 rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-brand-500/5 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all placeholder:text-slate-300 dark:text-white" 
                                type="text" name="category" value={form.category} onChange={onInputChange} 
                                placeholder="e.g. Apparel" 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Age Group</label>
                            <div className="relative">
                                <select 
                                    className="w-full appearance-none px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-brand-500/50 rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-brand-500/5 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white" 
                                    name="ageGroup" value={form.ageGroup} onChange={onInputChange}
                                >
                                    <option value="">Select Age</option>
                                    {['0-2', '3-4', '5-6', '7-8', '9-10'].map(a => <option key={a}>{a}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Gender Focus</label>
                            <div className="relative">
                                <select 
                                    className="w-full appearance-none px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-brand-500/50 rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-brand-500/5 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all dark:text-white" 
                                    name="gender" value={form.gender} onChange={onInputChange}
                                >
                                    <option value="">Select</option>
                                    <option>Girl</option><option>Boy</option><option>Unisex</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Quantity <span className="text-rose-500">*</span></label>
                            <input 
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-brand-500/50 rounded-2xl text-sm font-black focus:ring-4 focus:ring-brand-500/5 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all placeholder:text-slate-300 dark:text-white tabular-nums" 
                                type="number" name="quantity" value={form.quantity} onChange={onInputChange} min="0" placeholder="100" required 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">Selling Price (Rs) <span className="text-rose-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium font-serif">Rs</span>
                                <input 
                                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-brand-500/50 rounded-2xl text-sm font-black focus:ring-4 focus:ring-brand-500/5 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all placeholder:text-slate-300 dark:text-white tabular-nums" 
                                    type="number" name="unitPrice" value={form.unitPrice} onChange={onInputChange} min="0" step="0.01" placeholder="499" required 
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-4 pt-6">
                        <button 
                            type="button" onClick={onClose} 
                            className="px-8 py-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-slate-500 dark:text-slate-400 rounded-2xl transition-all"
                        >
                            Dismiss
                        </button>
                        <button 
                            type="submit" 
                            className="px-10 py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/20 active:scale-95 transition-all"
                        >
                            Commit to Stock
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
