import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';
import { handleError, handleSuccess } from '../utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Reports({ theme = 'light', onToggleTheme }) {
    const location = useLocation();
    const queryTab = new URLSearchParams(location.search).get('tab') || 'sales';
    const [activeTab, setActiveTab] = useState(queryTab);
    const [loading, setLoading] = useState(true);
    
    // Data states
    const [products, setProducts] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [downloading, setDownloading] = useState(false);
    const [dateRange, setDateRange] = useState('all'); // 'all', 'month', 'week'
    const reportRef = React.useRef(null);

    useEffect(() => {
        setActiveTab(queryTab);
    }, [queryTab]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': token };
            
            const [pRes, iRes, eRes, puRes] = await Promise.all([
                fetch("http://localhost:8000/products", { headers }),
                fetch("http://localhost:8000/invoices", { headers }),
                fetch("http://localhost:8000/expenses", { headers }),
                fetch("http://localhost:8000/purchases", { headers })
            ]);

            const pData = await pRes.json();
            const iData = await iRes.json();
            const eData = await eRes.json();
            const puData = await puRes.json();

            setProducts(pData || []);
            setInvoices(iData.success ? iData.invoices : []);
            setExpenses(eData.success ? eData.expenses : []);
            setPurchases(puData.success ? puData.purchases : []);
        } catch {
            handleError('Failed to fetch report data');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;
        setDownloading(true);
        try {
            const canvas = await html2canvas(reportRef.current, { 
                scale: 2,
                useCORS: true,
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff'
            });
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`SmartStock_Report_${activeTab}_${new Date().toISOString().split('T')[0]}.pdf`);
            handleSuccess('Report PDF Generated');
        } catch (err) {
            console.error(err);
            handleError('Failed to generate PDF');
        } finally {
            setDownloading(false);
        }
    };

    // Filtering logic
    const filterByDate = (items, dateField = 'createdAt') => {
        if (dateRange === 'all') return items;
        const now = new Date();
        const start = new Date();
        if (dateRange === 'month') start.setMonth(now.getMonth() - 1);
        if (dateRange === 'week') start.setDate(now.getDate() - 7);
        
        return items.filter(item => {
            const d = new Date(item[dateField] || item.createdAt);
            return d >= start && d <= now;
        });
    };

    const filteredInvoices = filterByDate(invoices, 'invoiceDate');
    const filteredPurchases = filterByDate(purchases, 'purchaseDate');
    const filteredExpenses = filterByDate(expenses, 'date');

    // Calculations based on filtered data
    const totalSales = filteredInvoices.reduce((sum, inv) => sum + (Number(inv.totalAmount) || 0), 0);
    const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
    const totalPurchases = filteredPurchases.reduce((sum, p) => sum + (Number(p.totalAmount) || 0), 0);
    const stockValue = products.reduce((sum, p) => sum + (Number(p.quantity) * Number(p.unitPrice)), 0);
    const lowStockItems = products.filter(p => Number(p.quantity) <= (p.minStock || 5));

    return (
        <div className="ss-layout">
            <Sidebar activeSection="reports" />
            <div className="ss-main">
                <Topbar 
                    title="Reports Center" 
                    onToggleTheme={onToggleTheme} 
                    isDark={theme === 'dark'}
                />

                <div className="ss-content">
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Generating report...</div>
                    ) : (
                        <div className="ss-report-view">
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                <button 
                                    className="ss-btn-primary" 
                                    onClick={handleDownloadPDF} 
                                    disabled={downloading}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    {downloading ? 'Processing...' : <>{Icon.download} Generate PDF</>}
                                </button>
                            </div>
                            <div ref={reportRef} style={{ padding: '10px' }}>
                            {activeTab === 'sales' && (
                                <>
                                    <div className="ss-stats-grid" style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                                        <div className="ss-stat-card ss-card">
                                            <div className="ss-stat-label" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gross Revenue</div>
                                            <div className="ss-stat-val" style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0', color: 'var(--pos)' }}>Rs {totalSales.toLocaleString()}</div>
                                            <div className="ss-stat-sub" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>From {invoices.length} transactions</div>
                                        </div>
                                        <div className="ss-stat-card ss-card">
                                            <div className="ss-stat-label" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Average Bill Value</div>
                                            <div className="ss-stat-val" style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0' }}>Rs {invoices.length ? (totalSales / invoices.length).toFixed(0).toLocaleString() : 0}</div>
                                            <div className="ss-stat-sub" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Per transaction</div>
                                        </div>
                                    </div>
                                    
                                    <div className="ss-card" style={{ padding: '0px', overflow: 'hidden' }}>
                                        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Sales Summary Report</h3>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <select 
                                                    className="ss-input" 
                                                    value={dateRange} 
                                                    onChange={(e) => setDateRange(e.target.value)}
                                                    style={{ width: '150px', padding: '5px 10px', fontSize: '12px' }}
                                                >
                                                    <option value="all">All Time</option>
                                                    <option value="month">This Month</option>
                                                    <option value="week">This Week</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="ss-table-wrap" style={{ marginTop: 0 }}>
                                            <div className="ss-table-head" style={{ gridTemplateColumns: '1fr 2fr 1.2fr 1fr 1fr 1fr' }}>
                                                <div>Invoice</div><div>Party</div><div>Date</div><div>Items</div><div>Status</div><div>Amount</div>
                                            </div>
                                            {filteredInvoices.length === 0 ? (
                                                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No sales history available for this range.</div>
                                            ) : (
                                                filteredInvoices.map(inv => (
                                                    <div key={inv._id} className="ss-table-row" style={{ gridTemplateColumns: '1fr 2fr 1.2fr 1fr 1fr 1fr' }}>
                                                        <div className="ss-badge">#{inv.invoiceNo}</div>
                                                        <div className="ss-row-name">{inv.partyName}</div>
                                                        <div>{new Date(inv.invoiceDate || inv.createdAt).toLocaleDateString()}</div>
                                                        <div>{inv.items.length} skus</div>
                                                        <div><span style={{ 
                                                            padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700,
                                                            background: inv.status === 'Paid' ? 'var(--pos-bg)' : 'var(--neg-bg)',
                                                            color: inv.status === 'Paid' ? 'var(--pos)' : 'var(--neg)'
                                                        }}>{(inv.status || 'Unpaid').toUpperCase()}</span></div>
                                                        <div style={{ fontWeight: 700 }}>Rs {Number(inv.totalAmount).toLocaleString()}</div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'stock' && (
                                <>
                                    <div className="ss-stats-grid" style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                                        <div className="ss-stat-card ss-card">
                                            <div className="ss-stat-label" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inventory Asset Value</div>
                                            <div className="ss-stat-val" style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0' }}>Rs {stockValue.toLocaleString()}</div>
                                            <div className="ss-stat-sub" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Capital tied in stock</div>
                                        </div>
                                        <div className="ss-stat-card ss-card">
                                            <div className="ss-stat-label" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Available Varieties</div>
                                            <div className="ss-stat-val" style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0' }}>{products.length} SKUs</div>
                                            <div className="ss-stat-sub" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Across all categories</div>
                                        </div>
                                    </div>
                                    <div className="ss-card" style={{ padding: '0px', overflow: 'hidden' }}>
                                        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Full Stock Status</h3>
                                            <button className="ss-btn-ghost" onClick={() => {
                                                const token = localStorage.getItem('token');
                                                if (!token) return;
                                                window.location.href = `http://localhost:8000/products/export-inventory?token=${token}`;
                                            }} style={{ fontSize: '11px' }}>{Icon.download} Export Stock</button>
                                        </div>
                                        <div className="ss-table-wrap" style={{ marginTop: 0 }}>
                                            <div className="ss-table-head" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr' }}>
                                                <div>Product</div><div>Category</div><div>Qty</div><div>Unit Price</div><div>Total Value</div>
                                            </div>
                                            {products.map(p => (
                                                <div key={p._id} className="ss-table-row" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr' }}>
                                                    <div className="ss-row-name">{p.name}</div>
                                                    <div>{p.category || '-'}</div>
                                                    <div className={p.quantity <= 5 ? 'ss-low-stock' : ''}>{p.quantity} units</div>
                                                    <div>Rs {p.unitPrice}</div>
                                                    <div style={{ fontWeight: 700 }}>Rs {(p.quantity * p.unitPrice).toLocaleString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'low-stock' && (
                                <div className="ss-card" style={{ padding: '0px', overflow: 'hidden' }}>
                                    <div style={{ padding: '24px', background: 'var(--neg-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--neg)' }}>
                                            <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '10px', display: 'grid', placeItems: 'center' }}>{Icon.alert}</div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Repurchase Alerts</h3>
                                                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Items listed below are running critically low.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ss-table-wrap" style={{ marginTop: 0 }}>
                                        <div className="ss-table-head" style={{ gridTemplateColumns: '2fr 1fr 1.5fr 1fr' }}>
                                            <div>Critical Item</div><div>Code</div><div>Category</div><div>Remaining</div>
                                        </div>
                                        {lowStockItems.length === 0 ? (
                                            <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                                <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--pos)' }}>All Clear!</p>
                                                <p style={{ fontSize: '13px' }}>Every product in your inventory is well-stocked.</p>
                                            </div>
                                        ) : (
                                            lowStockItems.map(p => (
                                                <div key={p._id} className="ss-table-row" style={{ gridTemplateColumns: '2fr 1fr 1.5fr 1fr' }}>
                                                    <div className="ss-row-name">{p.name}</div>
                                                    <div className="ss-badge">{p.sku || '-'}</div>
                                                    <div>{p.category}</div>
                                                    <div style={{ fontWeight: 800, color: 'var(--neg)', fontSize: '15px' }}>{p.quantity} left</div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'profit-loss' && (
                                <div style={{ maxWidth: '600px' }}>
                                    <div className="ss-card" style={{ padding: '0px', overflow: 'hidden' }}>
                                        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h3 style={{ fontSize: '15px', fontWeight: 700 }}>Income Statement (Estimated)</h3>
                                            <select 
                                                className="ss-input" 
                                                value={dateRange} 
                                                onChange={(e) => setDateRange(e.target.value)}
                                                style={{ width: '150px', padding: '5px 10px', fontSize: '12px' }}
                                            >
                                                <option value="all">All Time</option>
                                                <option value="month">This Month</option>
                                                <option value="week">This Week</option>
                                            </select>
                                        </div>
                                        <div style={{ padding: '24px' }}>
                                            <div style={{ display: 'grid', gap: '12px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                                                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Total Sales Revenue</span>
                                                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--pos)' }}>+ Rs {totalSales.toLocaleString()}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                                                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Inventory Sourcing (Purchases)</span>
                                                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--neg)' }}>- Rs {totalPurchases.toLocaleString()}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                                                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Direct Operating Expenses</span>
                                                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--neg)' }}>- Rs {totalExpenses.toLocaleString()}</span>
                                                </div>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    justifyContent: 'space-between', 
                                                    padding: '16px 0',
                                                    marginTop: '12px'
                                                }}>
                                                    <span style={{ fontSize: '16px', fontWeight: 700 }}>Net Adjusted Profit</span>
                                                    <span style={{ 
                                                        fontSize: '20px', 
                                                        fontWeight: 800, 
                                                        color: (totalSales - totalPurchases - totalExpenses) >= 0 ? 'var(--pos)' : 'var(--neg)'
                                                    }}>
                                                        Rs {(totalSales - totalPurchases - totalExpenses).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '20px', padding: '12px', background: 'var(--input-bg)', borderRadius: '8px', fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                                Note: This statement is an estimation based on recorded transactions. Accuracy depends on complete logging of all sales, purchases, and expenses.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Reports;
