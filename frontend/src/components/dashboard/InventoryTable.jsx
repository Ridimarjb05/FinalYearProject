import React from 'react';
import { Icon } from '../Icons';

const InventoryTable = ({ products, onAddProduct }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">Recent Inventory</h3>
                    <p className="text-xs text-slate-400 font-medium mt-1.5">Latest additions and stock updates</p>
                </div>
                <button 
                    onClick={onAddProduct} 
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-brand-600/30 active:scale-95 transition-all duration-200"
                >
                    {Icon.plus} 
                    <span>Add Product</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-separate border-spacing-0">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                        <tr>
                            <th className="px-8 py-4 font-black">Product Details</th>
                            <th className="px-6 py-4 font-black">SKU</th>
                            <th className="px-6 py-4 font-black">Category</th>
                            <th className="px-6 py-4 font-black">Status</th>
                            <th className="px-6 py-4 font-black text-right">Unit Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center opacity-30">
                                        {Icon.box}
                                        <p className="text-sm font-bold uppercase tracking-widest">No Inventory Found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {products.slice(0, 5).map(item => {
                            const lowStock = Number(item.quantity) <= 5;
                            const outOfStock = Number(item.quantity) === 0;
                            
                            return (
                                <tr key={item._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all duration-200 group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                                                {Icon.box}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors uppercase tracking-tight">{item.name}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{item.gender || 'Universal'} • {item.ageGroup || 'All Ages'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700 font-mono tracking-wider">
                                            {item.sku || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{item.category || 'Standard'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <span className={`text-sm font-black ${lowStock ? 'text-rose-600' : 'text-slate-900 dark:text-slate-100'}`}>
                                                    {item.quantity} Units
                                                </span>
                                                <span className={`text-[9px] font-bold uppercase tracking-widest ${outOfStock ? 'text-rose-500' : lowStock ? 'text-amber-500' : 'text-emerald-500'}`}>
                                                    {outOfStock ? 'Out of Stock' : lowStock ? 'Low Stock' : 'Healthy'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <span className="text-base font-black text-slate-900 dark:text-white tabular-nums">
                                            <span className="text-xs text-slate-400 font-medium mr-0.5 italic">Rs</span>
                                            {Number(item.unitPrice).toLocaleString()}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-slate-50/30 dark:bg-slate-800/10 border-t border-slate-100 dark:border-slate-800 text-center">
                <button className="text-[11px] font-black text-slate-400 hover:text-brand-600 uppercase tracking-[0.2em] transition-colors">
                    View Complete Inventory Sheet
                </button>
            </div>
        </div>
    );
};

export default InventoryTable;
