import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

function ProductDetails({ theme = 'light', onToggleTheme }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustType, setAdjustType] = useState('Add'); 
  const [activities, setActivities] = useState([]);
  const [existingCategories, setExistingCategories] = useState([]);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    sku: '',
    quantity: '',
    unitPrice: '',
    category: '',
    ageGroup: '',
    gender: '',
    purchasePrice: '',
    minStock: ''
  });


  useEffect(() => {
    fetchProductDetails();
    fetchProductActivities();
    fetchCategories();
  }, [id]);

  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:8000/products", {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      const cats = [...new Set(result.map(p => p.category).filter(Boolean))];
      setExistingCategories(cats);
    } catch { /* ignore */ }
  }

  async function fetchProductDetails() {
    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setProduct(result.product);
        setEditForm(result.product);
      } else {
        handleError(result.message || 'Failed to load product');
      }
    } catch {
      handleError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  async function fetchProductActivities() {
    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const prodResult = await response.json();
      if (!prodResult.success) return;

      const logsResponse = await fetch(`http://localhost:8000/history?resource=Product&resourceName=${prodResult.product.name}&action=STOCK_ADJUST`, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const logsResult = await logsResponse.json();
      if (logsResult.success) {
        setActivities(logsResult.logs);
      }
    } catch { /* ignore */ }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(editForm)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        handleSuccess('Product updated');
        setIsEditModalOpen(false);
        fetchProductDetails();
      } else {
        handleError(result.message || 'Update failed');
      }
    } catch {
      handleError('Update failed');
    }
  };

  const handleAdjustStock = async (e) => {
    e.preventDefault();
    const amount = Number(adjustAmount);
    if (isNaN(amount) || amount <= 0) return handleError('Invalid amount');

    const newQuantity = adjustType === 'Add' 
      ? Number(product.quantity) + amount 
      : Number(product.quantity) - amount;

    if (newQuantity < 0) return handleError('Stock cannot be negative');

    try {
      const response = await fetch(`http://localhost:8000/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        handleSuccess('Stock adjusted');
        setIsAdjustModalOpen(false);
        setAdjustAmount('');
        fetchProductDetails();
        fetchProductActivities();
      }
    } catch {
      handleError('Adjustment failed');
    }
  };


  return (
    <div className="ss-layout">
      <Sidebar activeSection="inventory" />

      <div className="ss-main">
        <Topbar 
          title={product ? product.name : 'Loading product...'}
          onToggleTheme={onToggleTheme}
          isDark={theme === 'dark'}
          searchPlaceholder="Search product history..."
        />

        <div className="ss-content ss-product-content">
          {loading ? <p>Loading product details...</p> : product && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>{product.name}</h1>
                  <p style={{ color: 'var(--text-muted)' }}>Category: <span style={{ fontWeight: 600 }}>{product.category || 'N/A'}</span></p>
                </div>
                <button className="ss-btn-primary" onClick={() => setIsEditModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {Icon.edit} Edit
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                {/* Details Card */}
                <div className="ss-card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Details</h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>SKU Code</label><div style={{ fontWeight: 600 }}>{product.sku || '-'}</div></div>
                    <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Age Group</label><div style={{ fontWeight: 600 }}>{product.ageGroup || '-'}</div></div>
                    <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Gender</label><div style={{ fontWeight: 600 }}>{product.gender || '-'}</div></div>
                    <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Purchase Price</label><div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Rs {product.purchasePrice || 0}</div></div>
                    <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Selling Price</label><div style={{ fontWeight: 600, color: 'var(--accent)' }}>Rs {product.unitPrice}</div></div>
                    <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Low Stock Limit</label><div style={{ fontWeight: 600 }}>{product.minStock || 5} units</div></div>
                    <div><label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Current Stock</label><div style={{ fontWeight: 700, fontSize: '20px', color: Number(product.quantity) <= (product.minStock || 5) ? 'var(--neg)' : 'inherit' }}>{product.quantity} units</div></div>
                  </div>
                </div>

                {/* Activity Card */}
                <div className="ss-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Activity</h3>
                    <button className="ss-btn-primary" onClick={() => setIsAdjustModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {Icon.edit} Adjust stock
                    </button>
                  </div>
                  <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {activities.length === 0 ? (
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        No activity found for this product.
                      </div>
                    ) : (
                      activities.map(log => (
                        <div key={log._id} style={{ 
                          padding: '12px 16px', 
                          background: 'var(--input-bg)', 
                          borderRadius: '12px', 
                          border: '1px solid var(--border)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '14px' }}>{log.details}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{log.action}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '12px', fontWeight: 500 }}>{new Date(log.createdAt).toLocaleDateString()}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="ss-modal-overlay">
            <div className="ss-modal" style={{ width: '500px' }}>
              <div className="ss-modal-head">
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Edit Product</h3>
                <button className="ss-btn-ghost" onClick={() => setIsEditModalOpen(false)}>{Icon.close}</button>
              </div>
              <form onSubmit={handleEditSubmit} style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ss-form-group"><label className="ss-form-label">Product Name</label><input className="ss-form-input" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder="e.g. Cotton Shirt" required /></div>
                  <div className="ss-form-group"><label className="ss-form-label">SKU Code</label><input className="ss-form-input" value={editForm.sku} onChange={e => setEditForm({...editForm, sku: e.target.value})} placeholder="e.g. CS-001" /></div>
                </div>

                <div className="ss-form-group">
                  <label className="ss-form-label">Category</label>
                  {!isAddingNewCategory ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select className="ss-select" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} style={{ flex: 1 }}>
                        <option value="">Select Category</option>
                        {existingCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <button type="button" className="ss-btn-ghost" onClick={() => setIsAddingNewCategory(true)}>{Icon.plus}</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input className="ss-form-input" autoFocus placeholder="Enter new category" value={newCategoryName} onChange={e => {
                        setNewCategoryName(e.target.value);
                        setEditForm({...editForm, category: e.target.value});
                      }} style={{ flex: 1 }} />
                      <button type="button" className="ss-btn-ghost" onClick={() => setIsAddingNewCategory(false)}>{Icon.close}</button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ss-form-group"><label className="ss-form-label">Age Group</label><input className="ss-form-input" value={editForm.ageGroup} onChange={e => setEditForm({...editForm, ageGroup: e.target.value})} placeholder="e.g. 7-8" /></div>
                  <div className="ss-form-group"><label className="ss-form-label">Gender</label><input className="ss-form-input" value={editForm.gender} onChange={e => setEditForm({...editForm, gender: e.target.value})} placeholder="e.g. Girl" /></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="ss-form-group">
                    <label className="ss-form-label">Purchase Price (Rs)</label>
                    <input className="ss-form-input" type="number" value={editForm.purchasePrice} onChange={e => setEditForm({...editForm, purchasePrice: e.target.value})} placeholder="0.00" required />
                  </div>
                  <div className="ss-form-group">
                    <label className="ss-form-label">Selling Price (Rs)</label>
                    <input className="ss-form-input" type="number" value={editForm.unitPrice} onChange={e => setEditForm({...editForm, unitPrice: e.target.value})} placeholder="0.00" required />
                  </div>
                </div>

                <div className="ss-form-group">
                  <label className="ss-form-label">Low Stock Limit</label>
                  <input className="ss-form-input" type="number" value={editForm.minStock} onChange={e => setEditForm({...editForm, minStock: e.target.value})} placeholder="5" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                  <button type="button" className="ss-btn-ghost" style={{ padding: '10px 20px' }} onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                  <button type="submit" className="ss-btn-primary" style={{ padding: '10px 24px' }}>Update Product</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Adjust Stock Modal */}
        {isAdjustModalOpen && (
          <div className="ss-modal-overlay">
            <div className="ss-modal" style={{ width: '350px' }}>
              <div className="ss-modal-head">
                <div className="ss-card-title">Adjust Stock</div>
                <button className="ss-btn-ghost" onClick={() => setIsAdjustModalOpen(false)}>{Icon.close}</button>
              </div>
              <form onSubmit={handleAdjustStock} style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" onClick={() => setAdjustType('Add')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', background: adjustType === 'Add' ? 'var(--accent)' : 'transparent', color: adjustType === 'Add' ? '#fff' : 'inherit' }}>Add</button>
                  <button type="button" onClick={() => setAdjustType('Reduce')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: adjustType === 'Reduce' ? 'var(--neg)' : 'transparent', color: adjustType === 'Reduce' ? '#fff' : 'var(--text-primary)' }}>Reduce</button>
                </div>
                <input className="ss-form-input" type="number" value={adjustAmount} onChange={e => setAdjustAmount(e.target.value)} placeholder="Amount" required />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" className="ss-btn-ghost" onClick={() => setIsAdjustModalOpen(false)}>Cancel</button>
                  <button type="submit" className="ss-btn-primary">Confirm</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default ProductDetails;
