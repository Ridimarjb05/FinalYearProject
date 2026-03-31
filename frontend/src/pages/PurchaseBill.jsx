import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';
import PartySheet from '../components/common/PartySheet';
import ProductSearchOverlay from '../components/common/ProductSearchOverlay';

function PurchaseBill({ theme = 'light', onToggleTheme }) {
    const navigate = useNavigate();
    const { id: editId } = useParams();
    const [parties, setParties] = useState([]);
    const [products, setProducts] = useState([]);
    const [purchaseNo, setPurchaseNo] = useState('1');
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedParty, setSelectedParty] = useState('');
    const [selectedPartyName, setSelectedPartyName] = useState('');
    const [items, setItems] = useState([{ name: '', quantity: '', rate: '', discountPercent: '', discountAmount: '', amount: 0, productId: '' }]);
    const [notes, setNotes] = useState('');
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [status, setStatus] = useState('PAID');

    const [isPartySheetOpen, setIsPartySheetOpen] = useState(false);
    const [isQuickPartyOpen, setIsQuickPartyOpen] = useState(false);
    const [isQuickProductOpen, setIsQuickProductOpen] = useState(false);
    const [activeProductSearch, setActiveProductSearch] = useState(null); 

    const [newParty, setNewParty] = useState({ name: '', phone: '', address: '', type: 'Supplier' });
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

    async function fetchLastPurchaseNo() {
        try {
            const response = await fetch("http://localhost:8000/purchases", {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success && result.purchases.length > 0) {
                const lastNo = parseInt(result.purchases[0].purchaseNo);
                setPurchaseNo((lastNo + 1).toString());
            }
        } catch { /* ignore */ }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchParties();
        fetchProducts();
        if (editId) {
            fetchPurchaseById(editId);
        } else {
            fetchLastPurchaseNo();
        }
    }, [editId]);

    async function fetchPurchaseById(id) {
        try {
            const response = await fetch(`http://localhost:8000/purchases/${id}`, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success) {
                const p = result.purchase;
                setPurchaseNo(p.purchaseNo);
                setPurchaseDate(p.purchaseDate?.split('T')[0] || new Date().toISOString().split('T')[0]);
                setSelectedParty(p.partyId || '');
                setSelectedPartyName(p.partyName || '');
                setItems(p.items.map(it => ({ ...it, amount: it.amount || (it.quantity * it.rate) })));
                setNotes(p.notes || '');
                setPaymentMode(p.paymentMode || 'Cash');
                setStatus(p.status || 'PAID');
            } else { handleError('Failed to load purchase bill'); }
        } catch { handleError('Failed to load purchase bill'); }
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

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        
        if (field === 'name') {
            const product = products.find(p => p.name === value);
            if (product) {
                newItems[index].productId = product._id;
                newItems[index].rate = product.purchasePrice || product.unitPrice;
                newItems[index].name = product.name;
            } else {
                newItems[index].name = value;
            }
        } else {
            newItems[index][field] = value;
        }

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
                setNewParty({ name: '', phone: '', address: '', type: 'Supplier' });
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
                
                if (activeProductSearch !== null) {
                    handleItemChange(activeProductSearch, 'name', result.product.name);
                    setActiveProductSearch(null);
                }
                
                setIsQuickProductOpen(false);
                setNewProduct({ name: '', sku: '', unitPrice: '', purchasePrice: '', category: 'General' });
            }
        } catch { handleError('Failed to create product'); }
    };

    const subTotal = items.reduce((acc, item) => acc + (item.amount || 0), 0);
    const totalAmount = subTotal;

    const handleSavePurchase = async (saveAndNew = false) => {
        if (!selectedParty) return handleError('Please select a supplier');
        if (items.some(item => !item.name || !item.quantity || !item.rate)) return handleError('Please fill all item details');

        const purchaseData = {
            partyId: selectedParty,
            partyName: selectedPartyName,
            purchaseNo,
            purchaseDate,
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
            status
        };

        try {
            const url = editId ? `http://localhost:8000/purchases/${editId}` : 'http://localhost:8000/purchases';
            const method = editId ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(purchaseData)
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(editId ? 'Purchase updated successfully' : 'Purchase saved successfully');
                if (saveAndNew && !editId) {
                    setSelectedParty('');
                    setSelectedPartyName('');
                    setItems([{ name: '', quantity: '', rate: '', discountPercent: '', discountAmount: '', amount: 0, productId: '' }]);
                    setNotes('');
                    setPurchaseNo((parseInt(purchaseNo) + 1).toString());
                } else {
                    navigate('/purchase');
                }
            } else {
                handleError(result.message);
            }
        } catch { handleError('Failed to save purchase'); }
    };

    return (
        <div className="ss-layout">
            <Sidebar activeSection="purchase" />

            <div className="ss-main">
                <Topbar 
                    title={editId ? 'Edit Purchase Bill' : 'Create Purchase Bill'} 
                    onToggleTheme={onToggleTheme}
                    isDark={theme === 'dark'}
                    backAction={() => navigate(-1)}
                />

                <div className="ss-content">

            <div className="ss-invoice-card">
                <div className="ss-invoice-grid">
                    <div className="ss-invoice-field">
                        <label>Select Supplier</label>
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
                                    {selectedPartyName || 'Search for supplier'}
                                </span>
                                {Icon.chevronDown}
                            </div>
                            <button 
                                type="button"
                                className="ss-quick-add-btn" 
                                onClick={() => setIsQuickPartyOpen(true)}
                                title="New Supplier"
                            >
                                {Icon.plus}
                            </button>
                        </div>
                    </div>

                    <div className="ss-invoice-field">
                        <label>Purchase No</label>
                        <input 
                            className="ss-invoice-input"
                            value={purchaseNo}
                            onChange={(e) => setPurchaseNo(e.target.value)}
                        />
                    </div>

                    <div className="ss-invoice-field">
                        <label>Purchase Date</label>
                        <input 
                            type="date"
                            className="ss-invoice-input"
                            value={purchaseDate}
                            onChange={(e) => setPurchaseDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="ss-billing-table-wrap">
                    <table className="ss-billing-table">
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>S.N.</th>
                                <th>Item Name</th>
                                <th style={{ width: '100px' }}>Quantity</th>
                                <th style={{ width: '130px' }}>Pur. Rate</th>
                                <th style={{ width: '220px' }}>Discount</th>
                                <th style={{ width: '140px' }}>Amount</th>
                                <th style={{ width: '40px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{index + 1}</td>
                                    <td style={{ position: 'relative' }}>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <input 
                                                className="ss-billing-item-input"
                                                style={{ fontWeight: 600, flex: 1 }}
                                                value={item.name}
                                                placeholder="Search product..."
                                                onFocus={() => setActiveProductSearch(index)}
                                                readOnly
                                            />
                                            <button 
                                                type="button" 
                                                className="ss-quick-add-btn-sm" 
                                                style={{ height: '38px', width: '38px', flexShrink: 0 }}
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
                                                        newItems[index] = { 
                                                            ...newItems[index], 
                                                            name: product.name, 
                                                            rate: product.purchasePrice || product.unitPrice, 
                                                            productId: product._id, 
                                                            amount: Number(newItems[index].quantity || 0) * (product.purchasePrice || product.unitPrice) 
                                                        };
                                                        setItems(newItems);
                                                        setActiveProductSearch(null);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <input 
                                            type="number"
                                            className="ss-billing-item-input"
                                            value={item.quantity}
                                            placeholder="0"
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Rs.</span>
                                            <input 
                                                type="number"
                                                className="ss-billing-item-input"
                                                value={item.rate}
                                                placeholder="0"
                                                onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ss-discount-group">
                                            <div className="ss-discount-pct">
                                                <input 
                                                    type="number"
                                                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '13px', textAlign: 'center', outline: 'none', fontWeight: 600 }}
                                                    value={item.discountPercent}
                                                    placeholder="0"
                                                    onChange={(e) => handleItemChange(index, 'discountPercent', e.target.value)}
                                                />
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)' }}>%</span>
                                            </div>
                                            <div className="ss-discount-amt">
                                                <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600 }}>Rs.</span>
                                                <input 
                                                    type="number"
                                                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '13px', outline: 'none', fontWeight: 600 }}
                                                    value={item.discountAmount}
                                                    placeholder="0"
                                                    onChange={(e) => handleItemChange(index, 'discountAmount', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                                        Rs. {item.amount.toFixed(2)}
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemoveItem(index)} style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                            {Icon.trash}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ background: 'var(--table-head)' }}>
                                <td colSpan="3">
                                    <button onClick={handleAddItem} style={{ display: 'flex', alignItems: 'center', gap: '6px', border: 'none', background: 'transparent', color: 'var(--pos)', fontWeight: 700, fontSize: '13px' }}>
                                        {Icon.plus} Add Item
                                    </button>
                                </td>
                                <td style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sub Total</td>
                                <td colSpan="3" style={{ fontWeight: 800, color: 'var(--text-primary)', textAlign: 'right', paddingRight: '40px' }}>
                                    Rs. {subTotal.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Notes or Remarks</label>
                        <textarea 
                            className="ss-invoice-input"
                            style={{ height: '100px', resize: 'none' }}
                            placeholder="Enter purchase details or notes..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Amount</label>
                            <div style={{ background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 20px', width: '220px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Rs.</span>
                                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Payment Mode</label>
                            <select 
                                className="ss-invoice-select"
                                style={{ width: '220px' }}
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                            >
                                <option>Cash</option>
                                <option>Cheque</option>
                                <option>Online</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Invoice Status</label>
                            <select 
                                className="ss-invoice-select"
                                style={{ width: '220px' }}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="PAID">PAID</option>
                                <option value="UNPAID">UNPAID</option>
                                <option value="PARTIAL">PARTIAL</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="ss-invoice-footer">
                    {!editId && (
                        <button className="ss-btn-save-new" onClick={() => handleSavePurchase(true)}>
                            Save &amp; New
                        </button>
                    )}
                    <button className="ss-btn-save" onClick={() => handleSavePurchase(false)}>
                        {editId ? 'Update Purchase Bill' : 'Save Purchase Bill'}
                    </button>
                </div>
            </div>

            <PartySheet 
                isOpen={isPartySheetOpen}
                onClose={() => setIsPartySheetOpen(false)}
                parties={parties.filter(p => !p.type || p.type === 'Supplier' || p.type === 'Customer')} // Show all or filter as needed
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
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>New Supplier</h3>
                            <button className="ss-drawer-close" onClick={() => setIsQuickPartyOpen(false)}>{Icon.close}</button>
                        </div>
                        <div className="ss-drawer-content">
                            <form id="quick-party-form" onSubmit={handleQuickAddParty}>
                                <div className="ss-form-group">
                                    <label>Full Name *</label>
                                    <input required value={newParty.name || ''} onChange={e => setNewParty({...newParty, name: e.target.value})} placeholder="e.g. Acme Corp" />
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
                                        <option value="Supplier">Supplier</option>
                                        <option value="Customer">Customer</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="ss-drawer-footer">
                            <button className="ss-btn-ghost" style={{ flex: 1 }} onClick={() => setIsQuickPartyOpen(false)}>Cancel</button>
                            <button form="quick-party-form" type="submit" className="ss-btn-save" style={{ flex: 1, marginTop: 0 }}>Create Supplier</button>
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
                                        <input 
                                            className="ss-form-input" 
                                            value={newProduct.category || ''} 
                                            onChange={e => setNewProduct({...newProduct, category: e.target.value})} 
                                            placeholder="General" 
                                        />
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

            <ToastContainer />
          </div>
        </div>
      </div>
    );
}

export default PurchaseBill;
