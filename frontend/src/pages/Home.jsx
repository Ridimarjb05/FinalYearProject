import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ConfirmationModal from '../components/common/ConfirmationModal';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    AreaChart,
    Area
} from 'recharts';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

function Home({ section = 'home', theme = 'light', onToggleTheme }) {
    const [products, setProducts] = useState([]);
    const [parties, setParties] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [activeSection, setActiveSection] = useState(section);
    const [inventorySearch, setInventorySearch] = useState('');
    const [inventoryAgeFilter, setInventoryAgeFilter] = useState('All');
    const [inventoryGenderFilter, setInventoryGenderFilter] = useState('All');
    const [reminders, setReminders] = useState([
        { id: 1, text: 'Collect remaining balance from customer', done: false },
        { id: 2, text: 'Restock girl sets', done: true },
        { id: 3, text: 'Check pending cheques', done: false },
    ]);
    const [newReminder, setNewReminder] = useState('');
    const [isAddingReminder, setIsAddingReminder] = useState(false);
    const [rawSales, setRawSales] = useState([]);
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [form, setForm] = useState({ name: '', sku: '', quantity: '', unitPrice: '', purchasePrice: '', category: '', ageGroup: '', gender: '', minStock: '5' });
    const [totalSalesM, setTotalSalesM] = useState(0);
    const [totalPurchaseM, setTotalPurchaseM] = useState(0);
    const [totalExpenseM, setTotalExpenseM] = useState(0);
    const navigate = useNavigate();

    useEffect(() => { setActiveSection(section); }, [section]);
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8000/products", {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            setProducts(result);
        } catch { handleError('Failed to fetch products'); }
    }

    const fetchParties = async () => {
        try {
            const response = await fetch("http://localhost:8000/parties", {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success) setParties(result.parties);
        } catch { handleError('Failed to fetch parties'); }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const [salesRes, purchRes, expRes] = await Promise.all([
                fetch("http://localhost:8000/invoices", { headers: { 'Authorization': token } }),
                fetch("http://localhost:8000/purchases", { headers: { 'Authorization': token } }),
                fetch("http://localhost:8000/expenses", { headers: { 'Authorization': token } })
            ]);
            const [sales, purch, exps] = await Promise.all([salesRes.json(), purchRes.json(), expRes.json()]);

            if (sales.success) {
                setRawSales(sales.invoices);
                setTotalSalesM(sales.invoices.reduce((sum, inv) => sum + (Number(inv.totalAmount) || 0), 0));
            }
            if (purch.success) {
                setTotalPurchaseM(purch.purchases.reduce((sum, p) => sum + (Number(p.totalAmount) || 0), 0));
            }
            if (exps.success) {
                setTotalExpenseM(exps.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0));
            }
        } catch { /* ignore */ }
    };

    useEffect(() => {
        fetchProducts();
        fetchParties();
        fetchStats();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/products", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify({ ...form, quantity: Number(form.quantity || 0), unitPrice: Number(form.unitPrice || 0), purchasePrice: Number(form.purchasePrice || 0) })
            });
            const result = await response.json();
            if (response.ok && result.success) {
                handleSuccess('Product added');
                setForm({ name: '', sku: '', quantity: '', unitPrice: '', purchasePrice: '', category: '', ageGroup: '', gender: '', minStock: '5' });
                setIsAddingNewCategory(false);
                setNewCategoryName('');
                fetchProducts();
                setShowAddForm(false);
            } else { handleError(result.message || 'Failed to add product'); }
        } catch { handleError('Something went wrong'); }
    };

    const handleDeleteProduct = (id) => {
        setProductToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteProduct = async () => {
        if (!productToDelete) return;
        try {
            const response = await fetch(`http://localhost:8000/products/${productToDelete}`, {
                method: 'DELETE',
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (response.ok && result.success) {
                handleSuccess('Product deleted');
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
                fetchProducts();
            } else { handleError(result.message || 'Delete failed'); }
        } catch { handleError('Something went wrong'); }
    };

    const totalProducts = products.length;
    const lowStockItems = products.filter(p => Number(p.quantity) <= (p.minStock || 5)).length;
    const lowStockList = products.filter(p => Number(p.quantity) <= (p.minStock || 5));
    const payableTotal = parties.filter(p => p.status === 'Payable').reduce((sum, p) => sum + (Number(p.balance) || 0), 0);
    const receivableTotal = parties.filter(p => p.status === 'Receivable').reduce((sum, p) => sum + (Number(p.balance) || 0), 0);

    const existingCategories = [...new Set(products.map(p => p.category).filter(Boolean))];

    const pieColors = ['#F0A64F', '#3b82f6', '#22c55e', '#ec4899', '#8b5cf6'];
    const categoryCounts = products.reduce((acc, p) => {
        const key = (p.category || 'Uncategorized').trim() || 'Uncategorized';
        acc[key] = (acc[key] || 0) + (Number(p.quantity) || 0);
        return acc;
    }, {});
    const distributionData = Object.entries(categoryCounts)
        .map(([name, value], i) => ({ name, value, color: pieColors[i % pieColors.length] }))
        .filter(item => item.value > 0);

    const filteredProducts = products.filter(p => {
        const q = inventorySearch.trim().toLowerCase();
        if (q && !([p.name, p.sku, p.category, p.ageGroup, p.gender].join(' ').toLowerCase().includes(q))) return false;
        if (inventoryAgeFilter !== 'All' && p.ageGroup !== inventoryAgeFilter) return false;
        if (inventoryGenderFilter !== 'All' && p.gender !== inventoryGenderFilter) return false;
        return true;
    });

    const ledgerData = [
        { name: 'Sales', amount: totalSalesM, fill: '#22c55e' },
        { name: 'Purchase', amount: totalPurchaseM, fill: '#3b82f6' },
        { name: 'Expense', amount: totalExpenseM, fill: '#f43f5e' },
    ];

    // Sales Trend Data (Monthly)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const salesByMonth = rawSales.reduce((acc, inv) => {
        const date = new Date(inv.invoiceDate);
        const month = monthNames[date.getMonth()];
        acc[month] = (acc[month] || 0) + (Number(inv.totalAmount) || 0);
        return acc;
    }, {});

    const trendData = monthNames.map(m => ({
        name: m,
        sales: salesByMonth[m] || 0
    })).filter((item, index) => {
        // Only show months that have sales or are part of the current year-to-date
        return index <= new Date().getMonth() || item.sales > 0;
    });

    const handleExportInventory = () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        window.location.href = `http://localhost:8000/products/export-inventory?token=${token}`;
        handleSuccess('Inventory export started');
    };

    const handleAddReminder = () => {
        if (!isAddingReminder) { setIsAddingReminder(true); return; }
        const text = newReminder.trim();
        if (!text) return;
        setReminders(prev => [{ id: Date.now(), text, done: false }, ...prev]);
        setNewReminder('');
        setIsAddingReminder(false);
    };

    const handleToggleReminder = (id) => {
        setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r));
    };



    return (
        <div className="ss-layout">
            <Sidebar activeSection={activeSection} />

            {/* Main */}
            <div className="ss-main">
                <Topbar 
                    title={activeSection === 'inventory' ? 'Inventory' : 'Dashboard'} 
                    onToggleTheme={onToggleTheme}
                    isDark={theme === 'dark'}
                    search={inventorySearch}
                    setSearch={setInventorySearch}
                />

                                {activeSection === 'home' && (
                    <div className="ss-content ss-home-content">
                        {/* Greeting & Quick Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Welcome Back!</h1>
                        </div>

                        {/* KPI Row */}
                        <div className="ss-kpi-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                            {[
                                { label: 'To Receive', value: receivableTotal, bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: Icon.arrowDown },
                                { label: 'To Give', value: payableTotal, bg: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', icon: Icon.arrowUp },
                                { label: 'Sales', value: totalSalesM, bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: Icon.tag },
                                { label: 'Purchase', value: totalPurchaseM, bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: Icon.cart },
                                { label: 'Expense', value: totalExpenseM, bg: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', icon: Icon.receipt },
                            ].map(kpi => (
                                <div key={kpi.label} className="ss-kpi-card" style={{ background: kpi.bg, border: 'none', borderRadius: 14 }}>
                                    <div style={{ color: kpi.color, marginBottom: 12 }}>{kpi.icon}</div>
                                    <div className="ss-kpi-label" style={{ marginBottom: 6, color: 'var(--text-muted)', fontSize: 11 }}>{kpi.label}</div>
                                    <div className="ss-kpi-val" style={{ fontSize: 20, fontWeight: 700 }}>Rs. {kpi.value.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>

                        {/* Main Grid */}
                        <div className="ss-dash-grid">
                            <div className="ss-dash-left">
                                <div className="ss-analytics-row">
                                    <div className="ss-card">
                                        <div className="ss-card-head"><div className="ss-card-title">Inventory Distribution</div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{totalProducts} total items</span></div>
                                        <div className="ss-distribution">
                                            <div style={{ width: '100%', height: 165 }}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie data={distributionData.length ? distributionData : [{ name: 'Empty', value: 1, color: '#f1f5f9' }]} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={4}>
                                                            {distributionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                                        </Pie>
                                                        <Tooltip />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <div className="ss-legend">
                                                {distributionData.map(item => (
                                                    <div className="ss-legend-row" key={item.name}>
                                                        <span className="ss-legend-dot" style={{ background: item.color }} />
                                                        <span className="ss-legend-name">{item.name}</span>
                                                        <span className="ss-legend-val">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ss-card">
                                        <div className="ss-card-head"><div className="ss-card-title">Ledger Overview</div><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>This month</span></div>
                                        <div style={{ height: 165, paddingTop: 10 }}>
                                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                                <BarChart data={ledgerData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val} />
                                                    <Tooltip cursor={{ fill: 'var(--input-bg)' }} formatter={(value) => `Rs ${value.toLocaleString()}`} />
                                                    <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={32} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>

                                <div className="ss-card">
                                    <div className="ss-card-head">
                                        <div className="ss-card-title">Sales Trend</div>
                                        <span style={{ fontSize: 12, color: 'var(--pos)', fontWeight: 700 }}>LIVE</span>
                                    </div>
                                    <div style={{ height: 180, paddingTop: 20 }}>
                                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#C06414" stopOpacity={0.1}/>
                                                        <stop offset="95%" stopColor="#C06414" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val} />
                                                <Tooltip cursor={{ fill: 'var(--input-bg)' }} formatter={(value) => `Rs ${value.toLocaleString()}`} />
                                                <Area type="monotone" dataKey="sales" stroke="#C06414" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="ss-card">
                                    <div className="ss-card-head">
                                        <div className="ss-card-title">Recent Inventory</div>
                                        <button className="ss-btn-primary" onClick={() => setShowAddForm(true)}>{Icon.plus} Add Product</button>
                                    </div>
                                    <div className="ss-table-wrap" style={{ marginTop: 0, paddingBottom: 0 }}>
                                        <div className="ss-table-head" style={{ gridTemplateColumns: '40px 2fr 1fr 0.8fr 0.8fr 1fr 0.8fr 1fr'}}>
                                            <div>#</div><div>PRODUCT</div><div>CODE</div><div>AGE</div><div>GENDER</div><div>CATEGORY</div><div>STOCK</div><div>PRICE</div>
                                        </div>
                                        {products.slice(0, 5).map((p, i) => (
                                            <div key={p._id} className="ss-table-row" style={{ gridTemplateColumns: '40px 2fr 1fr 0.8fr 0.8fr 1fr 0.8fr 1fr'}}>
                                                <div className="ss-row-num">{String(i + 1).padStart(2, '0')}</div>
                                                <div className="ss-row-name">{p.name}</div>
                                                <div className="ss-badge">{p.sku || 'N/A'}</div>
                                                <div>{p.ageGroup || '-'}</div>
                                                <div>{p.gender || '-'}</div>
                                                <div>{p.category || '-'}</div>
                                                <div className={Number(p.quantity) <= (p.minStock || 5) ? 'ss-low-stock' : ''}>{p.quantity}</div>
                                                <div>Rs {Number(p.unitPrice).toLocaleString()}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="ss-dash-right">
                                <div className="ss-card" style={{ padding: '24px' }}>
                                    <div className="ss-balance-head">Total Balance</div>
                                    <div className="ss-balance-amount">Rs {(receivableTotal - payableTotal).toLocaleString()}</div>
                                    <div className="ss-balance-row" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                                        <span style={{ flex: 1, color: 'var(--text-muted)' }}>Receivable</span>
                                        <span style={{ color: '#22c55e', fontWeight: 700 }}>Rs {receivableTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="ss-balance-row" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                                        <span style={{ flex: 1, color: 'var(--text-muted)' }}>Payable</span>
                                        <span style={{ color: '#ef4444', fontWeight: 700 }}>Rs {payableTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="ss-card">
                                    <div className="ss-card-head">
                                        <div className="ss-card-title">Reminders</div>
                                        <button className="ss-btn-primary" onClick={handleAddReminder}>{Icon.plus} Add</button>
                                    </div>
                                     <div className="ss-reminders">
                                        {isAddingReminder && (
                                            <input className="ss-form-input" autoFocus placeholder="New reminder..." value={newReminder} onChange={e=>setNewReminder(e.target.value)} onKeyDown={e=>e.key==='Enter' && handleAddReminder()} />
                                        )}
                                        {reminders.map(r => (
                                            <button key={r.id} className={`ss-reminder-item ${r.done ? 'done' : ''}`} onClick={()=>handleToggleReminder(r.id)}>
                                                <span className={`ss-reminder-check ${r.done ? 'checked' : ''}`}>{r.done && Icon.check}</span>
                                                <span>{r.text}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="ss-card" style={{ marginTop: 20 }}>
                                    <div className="ss-card-head">
                                        <div className="ss-card-title" style={{ color: '#ef4444' }}>Low Stock Alerts</div>
                                        <span className="ss-badge-count">{lowStockItems}</span>
                                    </div>
                                    <div className="ss-low-stock-list" style={{ marginTop: 10 }}>
                                        {lowStockList.length > 0 ? lowStockList.map(p => (
                                            <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Limit: {p.minStock || 5}</div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 13 }}>{p.quantity} Left</div>
                                                    <button onClick={() => navigate(`/inventory/${p._id}`)} style={{ fontSize: 10, color: 'var(--accent)', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>Restock</button>
                                                </div>
                                            </div>
                                        )) : (
                                            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: 12 }}>
                                                All stock levels are healthy.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'inventory' && (
                    <div className="ss-content">
                        <div className="ss-inventory-layout">
                            <div className="ss-card" style={{ border: 'none', boxShadow: 'none', background: 'var(--bg)' }}>
                                <div className="ss-card-head">
                                    <div className="ss-card-title">Inventory</div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="ss-btn-ghost" onClick={handleExportInventory}>{Icon.download} Export</button>
                                        <button className="ss-btn-primary" onClick={() => setShowAddForm(true)}>{Icon.plus} Add Product</button>
                                    </div>
                                </div>

                                <div className="ss-filters">
                                    <select className="ss-select" value={inventoryAgeFilter} onChange={e => setInventoryAgeFilter(e.target.value)}>
                                        <option value="All">All Ages</option>
                                        {['0-2', '3-4', '5-6', '7-8', '9-10'].map(a => <option key={a}>{a}</option>)}
                                    </select>
                                    <select className="ss-select" value={inventoryGenderFilter} onChange={e => setInventoryGenderFilter(e.target.value)}>
                                        <option value="All">All Gender</option>
                                        <option>Girl</option><option>Boy</option><option>Unisex</option>
                                    </select>
                                </div>

                                <div className="ss-table-wrap">
                                    <div className="ss-table-head" style={{ gridTemplateColumns: '40px 2fr 1fr 0.8fr 0.8fr 1fr 0.8fr 1fr 80px'}}>
                                        <div>#</div><div>PRODUCT</div><div>CODE</div><div>AGE</div><div>GENDER</div><div>CATEGORY</div><div>STOCK</div><div>PRICE</div><div/>
                                    </div>
                                    {filteredProducts.map((p, i) => (
                                        <div key={p._id} className="ss-table-row" style={{ gridTemplateColumns: '40px 2fr 1fr 0.8fr 0.8fr 1fr 0.8fr 1fr 80px'}}>
                                            <div className="ss-row-num">{i + 1}</div>
                                            <div className="ss-row-name">{p.name}</div>
                                            <div className="ss-badge">{p.sku || '-'}</div>
                                            <div>{p.ageGroup || '-'}</div>
                                            <div>{p.gender || '-'}</div>
                                            <div>{p.category || '-'}</div>
                                            <div className={Number(p.quantity) <= (p.minStock || 5) ? 'ss-low-stock' : ''}>{p.quantity}</div>
                                            <div>Rs {Number(p.unitPrice).toLocaleString()}</div>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                <button className="ss-icon-btn" style={{ border: 'none', background: 'transparent' }} onClick={() => navigate(`/inventory/${p._id}`)}>{Icon.eye}</button>
                                                <button className="ss-icon-btn" style={{ border: 'none', background: 'transparent', color: '#ef4444' }} onClick={() => handleDeleteProduct(p._id)}>{Icon.trash}</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div className="ss-stat-card" style={{ border: '1px solid var(--border)' }}>
                                    <div className="ss-stat-title">Total Products</div>
                                    <div className="ss-stat-value">{totalProducts}</div>
                                </div>
                                <div className="ss-stat-card ss-stat-success" style={{ border: '1px solid rgba(34, 197, 94, 0.4)' }}>
                                    <div className="ss-stat-title">In Stock</div>
                                    <div className="ss-stat-value">{products.reduce((a, b) => a + (Number(b.quantity) || 0), 0)}</div>
                                </div>
                                <div className="ss-stat-card ss-stat-danger" style={{ border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                                    <div className="ss-stat-title">Low Stock</div>
                                    <div className="ss-stat-value">{lowStockItems}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showAddForm && (
                     <div className="ss-modal-overlay">
                        <div className="ss-modal">
                            <div className="ss-modal-head">
                                <h3 style={{ margin: 0, fontSize: 16 }}>Add Product</h3>
                                <button className="ss-icon-btn" onClick={()=>setShowAddForm(false)}>{Icon.close}</button>
                            </div>
                            <form onSubmit={handleAddProduct} style={{ display: 'grid', gap: 14, marginTop: 16 }}>
                                <div className="ss-form-row">
                                    <div className="ss-form-group"><label className="ss-form-label">Product Name</label><input className="ss-form-input" type="text" name="name" value={form.name} onChange={handleInput} required /></div>
                                    <div className="ss-form-group"><label className="ss-form-label">Code (SKU)</label><input className="ss-form-input" type="text" name="sku" value={form.sku} onChange={handleInput} /></div>
                                </div>
                                <div className="ss-form-row">
                                    <div className="ss-form-group">
                                        <label className="ss-form-label">Age Group</label>
                                        <select className="ss-select" name="ageGroup" value={form.ageGroup} onChange={handleInput}>
                                            <option value="">Select Age Group</option>
                                            {['All Ages', '0-2', '3-4', '5-6', '7-8', '9-10'].map(a => <option key={a} value={a}>{a}</option>)}
                                        </select>
                                    </div>
                                    <div className="ss-form-group">
                                        <label className="ss-form-label">Gender</label>
                                        <select className="ss-select" name="gender" value={form.gender} onChange={handleInput}>
                                            <option value="">Select Gender</option>
                                            {['Girl', 'Boy', 'Unisex'].map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="ss-form-row">
                                    <div className="ss-form-group">
                                        <label className="ss-form-label">Category</label>
                                        {!isAddingNewCategory ? (
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                <select className="ss-select" name="category" value={form.category} onChange={handleInput} style={{ flex: 1 }}>
                                                    <option value="">Select Category</option>
                                                    {existingCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                                <button type="button" className="ss-btn-ghost" onClick={() => setIsAddingNewCategory(true)} title="Add New Category">{Icon.plus}</button>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                <input className="ss-form-input" placeholder="Enter category name" value={newCategoryName} onChange={e => {
                                                    setNewCategoryName(e.target.value);
                                                    setForm(prev => ({ ...prev, category: e.target.value }));
                                                }} autoFocus style={{ flex: 1 }} />
                                                <button type="button" className="ss-btn-ghost" onClick={() => {
                                                    setIsAddingNewCategory(false);
                                                    setForm(prev => ({ ...prev, category: '' }));
                                                }}>{Icon.close}</button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="ss-form-group"><label className="ss-form-label">Quantity</label><input className="ss-form-input" type="number" name="quantity" value={form.quantity} onChange={handleInput} required /></div>
                                </div>
                                <div className="ss-form-row">
                                    <div className="ss-form-group"><label className="ss-form-label">Purchase Price</label><input className="ss-form-input" type="number" name="purchasePrice" value={form.purchasePrice} onChange={handleInput} required /></div>
                                    <div className="ss-form-group"><label className="ss-form-label">Selling Price</label><input className="ss-form-input" type="number" name="unitPrice" value={form.unitPrice} onChange={handleInput} required /></div>
                                </div>
                                <div className="ss-form-row">
                                    <div className="ss-form-group"><label className="ss-form-label">Low Stock Limit</label><input className="ss-form-input" type="number" name="minStock" value={form.minStock} onChange={handleInput} placeholder="Alert when stock hits..." /></div>
                                    <div className="ss-form-group"></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><button type="button" className="ss-btn-ghost" onClick={()=>setShowAddForm(false)}>Cancel</button><button type="submit" className="ss-btn-primary">Save</button></div>
                            </form>
                        </div>
                    </div>
                )}

                <ConfirmationModal isOpen={isDeleteModalOpen} onClose={()=>setIsDeleteModalOpen(false)} onConfirm={confirmDeleteProduct} title="Delete Product" message="Confirm deletion?" />
                <ToastContainer />
            </div>
        </div>
    );
}

export default Home;
