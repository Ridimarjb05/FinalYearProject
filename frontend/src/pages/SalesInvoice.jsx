import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';
import PartySheet from '../components/common/PartySheet';
import ProductSearchOverlay from '../components/common/ProductSearchOverlay';

function SalesInvoice({ theme = 'light', onToggleTheme }) {
    const navigate = useNavigate();
    const { id: editId } = useParams();
    const [parties, setParties] = useState([]);
    const [products, setProducts] = useState([]);
    const [invoiceNo, setInvoiceNo] = useState('1');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedParty, setSelectedParty] = useState('');
    const [selectedPartyName, setSelectedPartyName] = useState('');
    const [items, setItems] = useState([{ name: '', quantity: '', rate: '', discountPercent: '', discountAmount: '', amount: 0, productId: '' }]);
    const [notes, setNotes] = useState('');
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [paidAmount, setPaidAmount] = useState('');
    
    // Global Modifiers
    const [globalDiscount, setGlobalDiscount] = useState({ value: 0, type: 'Amount' });

    const [isPartySheetOpen, setIsPartySheetOpen] = useState(false);
    const [isQuickPartyOpen, setIsQuickPartyOpen] = useState(false);
    const [isQuickProductOpen, setIsQuickProductOpen] = useState(false);
    const [activeProductSearch, setActiveProductSearch] = useState(null); 
    
    // Edit Item Modal State
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
    const [editingItemIndex, setEditingItemIndex] = useState(null);
    const [editingItemData, setEditingItemData] = useState({ rate: '', discountValue: 0, discountType: 'Amount' });

    const [newParty, setNewParty] = useState({ name: '', phone: '', address: '', type: 'Customer' });
    const [newProduct, setNewProduct] = useState({ name: '', sku: '', unitPrice: '', purchasePrice: '', category: 'General' });




    async function fetchParties() {
        try {
            const response = await fetch("http://localhost:8000/parties", {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success) setParties(result.parties);
        } catch { handleError('Failed to load parties'); }
    };

    async function fetchProducts() {
        try {
            const response = await fetch("http://localhost:8000/products", {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result) setProducts(result);
        } catch { handleError('Failed to load products'); }
    };

    async function fetchLastInvoiceNo() {
        try {
            const response = await fetch("http://localhost:8000/invoices", {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success && result.invoices.length > 0) {
                const lastNo = parseInt(result.invoices[0].invoiceNo);
                setInvoiceNo((lastNo + 1).toString());
            }
        } catch { /* ignore */ }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchParties();
        fetchProducts();
        if (editId) {
            fetchInvoiceById(editId);
        } else {
            fetchLastInvoiceNo();
        }
    }, [editId]);

    async function fetchInvoiceById(id) {
        try {
            const response = await fetch(`http://localhost:8000/invoices/${id}`, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success) {
                const inv = result.invoice;
                setInvoiceNo(inv.invoiceNo);
                setInvoiceDate(inv.invoiceDate?.split('T')[0] || new Date().toISOString().split('T')[0]);
                setSelectedParty(inv.partyId || '');
                setSelectedPartyName(inv.partyName || '');
                setItems(inv.items.map(it => ({ ...it, amount: it.amount || (it.quantity * it.rate) })));
                setNotes(inv.notes || '');
                setPaymentMode(inv.paymentMode || 'Cash');
                setPaidAmount(inv.paidAmount?.toString() || '');
            } else { handleError('Failed to load invoice'); }
        } catch { handleError('Failed to load invoice'); }
    }

    const handleAddItem = () => {
        setItems([...items, { name: '', quantity: '', rate: '', discountPercent: '', discountAmount: '', amount: 0, productId: '' }]);
    };

    const handleRemoveItem = (index) => {
        if (items.length > 1) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    const handleOpenEditItem = (index) => {
        const item = items[index];
        setEditingItemIndex(index);
        setEditingItemData({
            rate: item.rate,
            discountValue: item.discountAmount || 0,
            discountType: item.discountPercent ? 'Percent' : 'Amount'
        });
        setIsEditItemModalOpen(true);
    };

    const handleUpdateItemData = () => {
        const newItems = [...items];
        const item = newItems[editingItemIndex];
        const rate = parseFloat(editingItemData.rate) || 0;
        const qty = parseFloat(item.quantity) || 0;
        
        let discountAmt = 0;
        if (editingItemData.discountType === 'Percent') {
            discountAmt = (rate * qty * (parseFloat(editingItemData.discountValue) || 0)) / 100;
        } else {
            discountAmt = parseFloat(editingItemData.discountValue) || 0;
        }

        newItems[editingItemIndex] = {
            ...item,
            rate: editingItemData.rate,
            discountAmount: editingItemData.discountType === 'Amount' ? editingItemData.discountValue : 0,
            discountPercent: editingItemData.discountType === 'Percent' ? editingItemData.discountValue : 0,
            amount: (rate * qty) - discountAmt
        };
        setItems(newItems);
        setIsEditItemModalOpen(false);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        
        if (field === 'name') {
            const product = products.find(p => p.name === value);
            if (product) {
                newItems[index].productId = product._id;
                newItems[index].rate = product.unitPrice;
                newItems[index].name = product.name;
            } else {
                newItems[index].name = value;
            }
        } else {
            newItems[index][field] = value;
        }

        // Calculate amount
        const qty = parseFloat(newItems[index].quantity) || 0;
        const rate = parseFloat(newItems[index].rate) || 0;
        const discPercent = parseFloat(newItems[index].discountPercent) || 0;
        let discAmount = parseFloat(newItems[index].discountAmount) || 0;

        if (field === 'discountPercent') {
            discAmount = (qty * rate * discPercent) / 100;
            newItems[index].discountAmount = discAmount.toFixed(2);
        } else if (field === 'discountAmount') {
            newItems[index].discountPercent = ((discAmount / (qty * rate)) * 100).toFixed(2);
        }

        newItems[index].amount = (qty * rate) - discAmount;
        setItems(newItems);
    };

    const handleQuickAddParty = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/parties", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(newParty)
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess('Party created');
                fetchParties();
                setSelectedParty(result.party._id);
                setSelectedPartyName(result.party.name);
                setIsQuickPartyOpen(false);
                setNewParty({ name: '', phone: '', address: '', type: 'Customer' });
            }
        } catch { handleError('Failed to create party'); }
    };

    const handleQuickAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/products", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify({ ...newProduct, quantity: 0 })
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess('Product created');
                fetchProducts();
                
                // Auto-select in the active row if applicable
                if (activeProductSearch !== null) {
                    handleItemChange(activeProductSearch, 'name', result.product.name);
                    setActiveProductSearch(null); // Close search overlay
                }
                
                setIsQuickProductOpen(false);
                setNewProduct({ name: '', sku: '', unitPrice: '', purchasePrice: '', category: 'General' });
            }
        } catch { handleError('Failed to create product'); }
    };

    const subTotal = items.reduce((acc, item) => acc + (item.amount || 0), 0);
    
    // Global Calculations
    let globalDiscountAmt = 0;
    if (globalDiscount.type === 'Percent') {
        globalDiscountAmt = (subTotal * (parseFloat(globalDiscount.value) || 0)) / 100;
    } else {
        globalDiscountAmt = parseFloat(globalDiscount.value) || 0;
    }

    const finalTotal = Math.max(0, subTotal - globalDiscountAmt);
    const totalAmount = finalTotal;
    const dueAmount = totalAmount - (parseFloat(paidAmount) || 0);

    const handleSaveInvoice = async (saveAndNew = false) => {
        if (!selectedParty) return handleError('Please select a party');
        if (items.some(item => !item.name || !item.quantity || !item.rate)) return handleError('Please fill all item details');

        // Check stock levels in frontend for immediate feedback
        for (const item of items) {
            const product = products.find(p => p._id === item.productId);
            if (product && Number(item.quantity) > product.quantity) {
                return handleError(`Insufficient stock for ${product.name}. Available: ${product.quantity}`);
            }
        }

        const invoiceData = {
            partyId: selectedParty,
            partyName: selectedPartyName,
            invoiceNo,
            invoiceDate,
            items: items.map(item => ({
                ...item,
                quantity: Number(item.quantity),
                rate: Number(item.rate),
                discountPercent: Number(item.discountPercent) || 0,
                discountAmount: Number(item.discountAmount) || 0
            })),
            subTotal,
            totalAmount,
            notes,
            paymentMode,
            globalDiscount,
            paidAmount: Number(paidAmount) || 0,
            businessName: localStorage.getItem('businessName') || 'SmartStock Inc.'
        };

        try {
            const url = editId ? `http://localhost:8000/invoices/${editId}` : 'http://localhost:8000/invoices';
            const method = editId ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(invoiceData)
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(editId ? 'Invoice updated successfully' : 'Invoice saved successfully');
                if (saveAndNew && !editId) {
                    setSelectedParty('');
                    setSelectedPartyName('');
                    setItems([{ name: '', quantity: '', rate: '', discountPercent: '', discountAmount: '', amount: 0, productId: '' }]);
                    setInvoiceNo((parseInt(invoiceNo) + 1).toString());
                } else {
                    navigate(`/sales/preview/${result.invoice._id}`);
                }
            } else {
                handleError(result.message);
            }
        } catch { handleError('Failed to save invoice'); }
    };

    return (
        <div className="ss-layout">
            <Sidebar activeSection="sales" />

            <div className="ss-main">
                <Topbar 
                    title={editId ? 'Edit Sales Invoice' : 'Create Sales Invoice'} 
                    onToggleTheme={onToggleTheme}
                    isDark={theme === 'dark'}
                    backAction={() => navigate(-1)}
                />

                <div className="ss-content">

            <div className="ss-invoice-card">
                <div className="ss-invoice-grid">
                    <div className="ss-invoice-field">
                        <label>Select Customer *</label>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <div 
                                className="ss-invoice-input-trigger" 
                                onClick={() => setIsPartySheetOpen(true)}
                                style={{ 
                                    flex: 1,
                                    cursor: 'pointer', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    background: 'var(--input-bg)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '10px',
                                    padding: '10px 14px'
                                }}
                            >
                                <span style={{ color: selectedPartyName ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: selectedPartyName ? 600 : 400 }}>
                                    {selectedPartyName || 'Click to select customer'}
                                </span>
                                {Icon.chevronDown}
                            </div>
                            <button 
                                type="button"
                                className="ss-quick-add-btn" 
                                onClick={() => setIsQuickPartyOpen(true)}
                                title="New Customer"
                            >
                                {Icon.plus}
                            </button>
                        </div>
                    </div>

                    <div className="ss-invoice-field">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label>Invoice No</label>
                        </div>
                        <input 
                            className="ss-invoice-input"
                            value={invoiceNo}
                            onChange={(e) => setInvoiceNo(e.target.value)}
                        />
                    </div>

                    <div className="ss-invoice-field">
                        <label>Invoice Date</label>
                        <input 
                            type="date"
                            className="ss-invoice-input"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="ss-billing-table-wrap">
                    <table className="ss-billing-table">
                        <thead>
                            <tr>
                                <th style={{ width: '60px', textAlign: 'center' }}>S.N.</th>
                                <th>Particulars</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Quantity</th>
                                <th style={{ width: '120px', textAlign: 'right' }}>Rate</th>
                                <th style={{ width: '140px', textAlign: 'right' }}>Subtotal</th>
                                <th style={{ width: '110px', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: 600 }}>{index + 1}</td>
                                    <td style={{ position: 'relative', padding: '12px 14px' }}>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <input 
                                                className="ss-billing-item-input"
                                                style={{ 
                                                    fontWeight: 600, flex: 1, height: '40px', padding: '0 16px', 
                                                    borderRadius: '8px', border: '1px solid var(--border)', 
                                                    background: 'var(--input-bg)', outline: 'none' 
                                                }}
                                                value={item.name}
                                                placeholder="Search product..."
                                                onFocus={() => setActiveProductSearch(index)}
                                                readOnly
                                            />
                                            <button 
                                                type="button" 
                                                className="ss-quick-add-btn-sm" 
                                                style={{ height: '40px', width: '40px', SflexShrink: 0 }}
                                                onClick={() => setIsQuickProductOpen(true)}
                                            >
                                                {Icon.plus}
                                            </button>
                                        </div>
                                        {activeProductSearch === index && (
                                            <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, width: '450px', zIndex: 1000 }}>
                                                <ProductSearchOverlay 
                                                    isOpen={true}
                                                    onClose={() => setActiveProductSearch(null)}
                                                    products={products}
                                                    onSelect={(product) => {
                                                        const newItems = [...items];
                                                        newItems[index] = { ...newItems[index], name: product.name, rate: product.unitPrice, productId: product._id, amount: Number(newItems[index].quantity || 0) * product.unitPrice };
                                                        setItems(newItems);
                                                        setActiveProductSearch(null);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <input 
                                            type="number"
                                            className="ss-billing-item-input"
                                            style={{ textAlign: 'center', width: '60px' }}
                                            value={item.quantity}
                                            placeholder="0"
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 500, color: 'var(--text-muted)' }}>
                                        Rs. {parseFloat(item.rate || 0).toFixed(1)}
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--text-primary)' }}>
                                        Rs. {parseFloat(item.amount || 0).toFixed(1)}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                            <button className="ss-action-btn-blue" onClick={() => handleOpenEditItem(index)} title="Price/Discount">{Icon.edit}</button>
                                            <button className="ss-action-btn-red" onClick={() => handleRemoveItem(index)} title="Delete Row">{Icon.trash}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ background: 'var(--table-head)' }}>
                                <td colSpan="3">
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <button onClick={handleAddItem} style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: 'transparent', color: 'var(--pos)', fontWeight: 700, fontSize: '13px' }}>
                                            {Icon.plus} Add Billing Item
                                        </button>
                                    </div>
                                </td>
                                <td style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sub Total</td>
                                <td colSpan="3" style={{ fontWeight: 800, color: 'var(--text-primary)', textAlign: 'right', paddingRight: '40px' }}>
                                    Rs. {subTotal.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="ss-bill-bottom-container">
                    {/* Left Column: Notes */}
                    <div className="ss-bill-left-col">
                        <div className="ss-form-group">
                            <label className="ss-badge-label">Notes</label>
                            <textarea 
                                className="ss-bill-textarea"
                                placeholder="Enter notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Right Column: Summaries */}
                    <div className="ss-bill-right-col">
                        <div className="ss-sum-modifier-group" style={{ borderBottom: 'none' }}>
                            <div className="ss-form-group">
                                <label className="ss-badge-label">Global Discount</label>
                                <div className="ss-input-group-with-select">
                                    <div className="ss-input-prefix">Rs</div>
                                    <input 
                                        type="number" 
                                        className="ss-bill-input-minimal"
                                        value={globalDiscount.value} 
                                        onChange={e => setGlobalDiscount({...globalDiscount, value: e.target.value})} 
                                        placeholder="0" 
                                    />
                                    <select 
                                        className="ss-input-suffix-select"
                                        value={globalDiscount.type}
                                        onChange={e => setGlobalDiscount({...globalDiscount, type: e.target.value})}
                                    >
                                        <option value="Amount">Amount</option>
                                        <option value="Percent">Percentage</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="ss-form-group">
                                <label className="ss-badge-label">Paid Amount</label>
                                <div className="ss-paid-input-group" style={{ display: 'flex', gap: '8px' }}>
                                    <div className="ss-input-group-with-select" style={{ flex: 1 }}>
                                        <div className="ss-input-prefix">Rs</div>
                                        <input 
                                            type="number"
                                            className="ss-bill-input-minimal"
                                            value={paidAmount}
                                            onChange={e => setPaidAmount(e.target.value)}
                                            placeholder="0"
                                        />
                                        <select 
                                            className="ss-input-suffix-select"
                                            value={paymentMode}
                                            onChange={e => setPaymentMode(e.target.value)}
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="Online">Online</option>
                                            <option value="Cheque">Cheque</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ss-final-summary-card">
                            <div className="ss-sum-line"><span className="ss-sum-label">Gross Amount</span><span className="ss-sum-val">Rs. {subTotal.toFixed(1)}</span></div>
                            <div className="ss-sum-line"><span className="ss-sum-label">Global Discount</span><span className="ss-sum-val">Rs. {globalDiscountAmt.toFixed(1)}</span></div>
                            <div className="ss-sum-line ss-net-amount"><span className="ss-sum-label">Net Amount</span><span className="ss-sum-val">Rs. {totalAmount.toFixed(1)}</span></div>
                            <div className="ss-sum-line ss-due-amount"><span className="ss-sum-label">Due Amount</span><span className="ss-sum-val">Rs. {dueAmount.toFixed(1)}</span></div>
                        </div>

                        <button className="ss-btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px', justifyContent: 'center', marginTop: '24px' }} onClick={() => handleSaveInvoice()}>
                            {Icon.save} Save Invoice
                        </button>
                    </div>
                </div>

                {/* Edit Item Modal */}
                {isEditItemModalOpen && (
                    <div className="ss-modal-overlay" onClick={() => setIsEditItemModalOpen(false)}>
                        <div className="ss-edit-item-modal" onClick={e => e.stopPropagation()}>
                            <div className="ss-modal-header">
                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{items[editingItemIndex]?.name}</h3>
                                <button className="ss-drawer-close" onClick={() => setIsEditItemModalOpen(false)}>{Icon.close}</button>
                            </div>
                            <div className="ss-modal-body" style={{ padding: '24px' }}>
                                <div className="ss-form-group">
                                    <label>Unit Price</label>
                                    <div className="ss-input-group-with-select">
                                        <div className="ss-input-prefix">Rs</div>
                                        <input 
                                            type="number"
                                            className="ss-bill-input-minimal"
                                            value={editingItemData.rate}
                                            onChange={e => setEditingItemData({...editingItemData, rate: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="ss-form-group" style={{ marginTop: '20px' }}>
                                    <label>Discount Amount</label>
                                    <div className="ss-input-group-with-select">
                                        <input 
                                            type="number"
                                            className="ss-bill-input-minimal"
                                            value={editingItemData.discountValue}
                                            onChange={e => setEditingItemData({...editingItemData, discountValue: e.target.value})}
                                        />
                                        <select 
                                            className="ss-input-suffix-select"
                                            value={editingItemData.discountType}
                                            onChange={e => setEditingItemData({...editingItemData, discountType: e.target.value})}
                                        >
                                            <option value="Amount">Rs</option>
                                            <option value="Percent">%</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="ss-modal-footer" style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button className="ss-btn-ghost" onClick={() => setIsEditItemModalOpen(false)}>Cancel</button>
                                <button className="ss-btn-save" style={{ marginTop: 0 }} onClick={handleUpdateItemData}>
                                    {Icon.save} Update
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <PartySheet 
                    isOpen={isPartySheetOpen}
                    onClose={() => setIsPartySheetOpen(false)}
                    parties={parties}
                    onSelect={(party) => {
                        setSelectedParty(party._id);
                        setSelectedPartyName(party.name);
                    }}
                />

                {/* Quick Add Party Side Drawer */}
                {isQuickPartyOpen && (
                    <div className="ss-modal-overlay" onClick={() => setIsQuickPartyOpen(false)}>
                        <div className="ss-drawer-animate" onClick={e => e.stopPropagation()}>
                            <div className="ss-drawer-header">
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>New Customer</h3>
                                <button className="ss-drawer-close" onClick={() => setIsQuickPartyOpen(false)}>{Icon.close}</button>
                            </div>
                            <div className="ss-drawer-content">
                                <form id="quick-party-form" onSubmit={handleQuickAddParty}>
                                    <div className="ss-form-group">
                                        <label>Full Name *</label>
                                        <input required value={newParty.name || ''} onChange={e => setNewParty({...newParty, name: e.target.value})} placeholder="e.g. Rahul Sharma" />
                                    </div>
                                    <div className="ss-form-group">
                                        <label>Phone Number *</label>
                                        <input required value={newParty.phone || ''} onChange={e => setNewParty({...newParty, phone: e.target.value})} placeholder="98XXXXXXXX" />
                                    </div>
                                    <div className="ss-form-group">
                                        <label>Address</label>
                                        <input value={newParty.address || ''} onChange={e => setNewParty({...newParty, address: e.target.value})} placeholder="Kathmandu, Nepal" />
                                    </div>
                                    <div className="ss-form-group">
                                        <label>Type</label>
                                        <select 
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                            value={newParty.type} 
                                            onChange={e => setNewParty({...newParty, type: e.target.value})}
                                        >
                                            <option value="Customer">Customer</option>
                                            <option value="Supplier">Supplier</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="ss-drawer-footer">
                                <button className="ss-btn-ghost" style={{ flex: 1 }} onClick={() => setIsQuickPartyOpen(false)}>Cancel</button>
                                <button form="quick-party-form" type="submit" className="ss-btn-save" style={{ flex: 1, marginTop: 0 }}>Create Customer</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Add Product Side Drawer */}
                {isQuickProductOpen && (
                    <div className="ss-modal-overlay" onClick={() => setIsQuickProductOpen(false)}>
                        <div className="ss-drawer-animate" onClick={e => e.stopPropagation()}>
                            <div className="ss-drawer-header">
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>New Item</h3>
                                <button className="ss-drawer-close" onClick={() => setIsQuickProductOpen(false)}>{Icon.close}</button>
                            </div>
                            <div className="ss-drawer-content">
                                <form id="quick-product-form" onSubmit={handleQuickAddProduct}>
                                    <div className="ss-form-group">
                                        <label>Item Name *</label>
                                        <input required value={newProduct.name || ''} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. Cotton Shirt" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div className="ss-form-group">
                                            <label>SKU/Code</label>
                                            <input value={newProduct.sku || ''} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} placeholder="CS-001" />
                                        </div>
                                    <div className="ss-form-group">
                                        <label>Category</label>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <input 
                                                className="ss-form-input" 
                                                style={{ flex: 1 }}
                                                value={newProduct.category || ''} 
                                                onChange={e => setNewProduct({...newProduct, category: e.target.value})} 
                                                placeholder="e.g. Jeans" 
                                            />
                                        </div>
                                    </div>
                                    </div>
                                    <div className="ss-form-group">
                                        <label>Purchase Price (Cost) *</label>
                                        <input type="number" required value={newProduct.purchasePrice || ''} onChange={e => setNewProduct({...newProduct, purchasePrice: e.target.value})} placeholder="0.00" />
                                    </div>
                                    <div className="ss-form-group">
                                        <label>Sales Price (Selling) *</label>
                                        <input type="number" required value={newProduct.unitPrice || ''} onChange={e => setNewProduct({...newProduct, unitPrice: e.target.value})} placeholder="0.00" />
                                    </div>
                                </form>
                            </div>
                            <div className="ss-drawer-footer">
                                <button className="ss-btn-ghost" style={{ flex: 1 }} onClick={() => setIsQuickProductOpen(false)}>Cancel</button>
                                <button form="quick-product-form" type="submit" className="ss-btn-save" style={{ flex: 1, marginTop: 0 }}>Create Item</button>
                            </div>
                        </div>
                    </div>
                )}

                <style>{`
                    .ss-bill-bottom-container {
                        display: grid;
                        grid-template-columns: 1fr 400px;
                        gap: 60px;
                        margin-top: 40px;
                    }
                    .ss-bill-textarea {
                        width: 100%;
                        height: 120px;
                        background: var(--input-bg);
                        border: 1px solid var(--border);
                        border-radius: 8px;
                        padding: 12px;
                        font-size: 13px;
                        resize: none;
                        color: var(--text-primary);
                    }
                    .ss-sum-modifier-group {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        margin-bottom: 24px;
                        padding-bottom: 24px;
                        border-bottom: 1px solid var(--border);
                    }
                    .ss-input-group-with-select {
                        display: flex;
                        align-items: center;
                        border: 1px solid var(--border);
                        border-radius: 8px;
                        background: var(--input-bg);
                        overflow: hidden;
                    }
                    .ss-input-prefix {
                        padding: 0 12px;
                        color: var(--text-muted);
                        font-size: 13px;
                        background: var(--hover);
                        height: 38px;
                        display: flex;
                        align-items: center;
                    }
                    .ss-bill-input-minimal {
                        flex: 1;
                        border: none;
                        background: transparent;
                        padding: 8px 12px;
                        font-size: 14px;
                        color: var(--text-primary);
                    }
                    .ss-input-suffix-select {
                        border: none;
                        border-left: 1px solid var(--border);
                        padding: 0 8px;
                        background: var(--hover);
                        font-size: 12px;
                        font-weight: 600;
                        height: 38px;
                        color: var(--text-primary);
                        outline: none;
                    }
                    .ss-bill-select {
                        width: 100%;
                        padding: 8px 12px;
                        border: 1px solid var(--border);
                        border-radius: 8px;
                        font-size: 13px;
                        background: var(--input-bg);
                        color: var(--text-primary);
                    }
                    .ss-pay-full-btn {
                        background: #3b82f6;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        padding: 0 16px;
                        font-size: 12px;
                        font-weight: 600;
                        cursor: pointer;
                    }
                    .ss-final-summary-card {
                        background: var(--table-head);
                        border-radius: 12px;
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .ss-sum-line {
                        display: flex;
                        justify-content: space-between;
                        font-size: 13px;
                        color: var(--text-muted);
                    }
                    .ss-sum-val { font-weight: 700; color: var(--text-primary); }
                    .ss-net-amount {
                        padding-top: 10px;
                        border-top: 1px solid var(--border);
                        font-size: 15px;
                        font-weight: 800;
                        color: var(--text-primary);
                    }
                    .ss-due-amount { color: #ef4444; font-weight: 800; border-top: 1px dotted var(--border); padding-top: 8px; }
                    .ss-btn-save-full {
                        width: 100%;
                        margin-top: 24px;
                        background: #3b82f6;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        padding: 14px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        cursor: pointer;
                        transition: opacity 0.2s;
                    }
                    .ss-btn-save-full:hover { opacity: 0.9; }
                    .ss-action-btn-blue {
                        width: 28px;
                        height: 28px;
                        background: #3b82f6;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        display: grid;
                        place-items: center;
                        cursor: pointer;
                    }
                    .ss-action-btn-red {
                        width: 28px;
                        height: 28px;
                        background: #ef4444;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        display: grid;
                        place-items: center;
                        cursor: pointer;
                    }
                    .ss-drawer-animate {
                        position: fixed; top: 0; right: 0; width: 450px; height: 100%;
                        background: var(--card-bg); z-index: 2005; box-shadow: -10px 0 30px rgba(0,0,0,0.1);
                        display: flex; flex-direction: column; animation: slideRight 0.3s ease-out;
                    }
                    @keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
                    .ss-drawer-header { padding: 24px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
                    .ss-drawer-content { padding: 24px; flex: 1; overflow-y: auto; }
                    .ss-drawer-footer { padding: 20px 24px; border-top: 1px solid var(--border); display: flex; gap: 12px; }
                    .ss-quick-add-btn {
                        width: 42px; height: 42px; border: 1px solid #3b82f6; background: #eff6ff;
                        color: #3b82f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer;
                    }
                    .ss-quick-add-btn-sm {
                        width: 28px; height: 28px; border: 1px solid #3b82f6; background: #eff6ff; color: #3b82f6; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer;
                    }
                    .ss-billing-item-input { border: none !important; background: transparent !important; padding: 10px 0 !important; width: 100%; outline: none; color: var(--text-primary); }
                    .ss-billing-item-input:focus { border-bottom: 2px solid var(--accent) !important; }
                    .ss-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(2px); z-index: 2000; }
                    .ss-badge-label { display: block; font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; }
                    .ss-edit-item-modal {
                        width: 500px;
                        background: #fff;
                        border-radius: 12px;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                    }
                    .ss-modal-header {
                        padding: 16px 24px;
                        border-bottom: 1px solid #f1f5f9;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .ss-btn-ghost {
                        padding: 8px 16px;
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        font-weight: 600;
                        color: #64748b;
                    }
                    .ss-modal-overlay {
                        display: grid;
                        place-items: center;
                    }
                `}</style>
                <ToastContainer />
            </div>
        </div>
    </div>
</div>
  );
}

export default SalesInvoice;
