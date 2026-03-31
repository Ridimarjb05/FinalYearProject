import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ConfirmationModal from '../components/common/ConfirmationModal';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

function Purchase({ theme = 'light', onToggleTheme }) {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => { fetchPurchases(); }, []);

  async function fetchPurchases() {
    try {
      const response = await fetch("http://localhost:8000/purchases", {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      if (result.success) setPurchases(result.purchases);
      else handleError(result.message);
    } catch {
      handleError('Failed to load purchases');
    } finally { setLoading(false); }
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`http://localhost:8000/purchases/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess('Purchase bill deleted');
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        fetchPurchases();
      } else { handleError(result.message); }
    } catch { handleError('Failed to delete purchase'); }
  };

  const filteredPurchases = purchases.filter(p =>
    p.purchaseNo.toLowerCase().includes(search.toLowerCase()) ||
    p.partyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ss-layout">
      <Sidebar activeSection="purchase" />

      <div className="ss-main">
        <Topbar 
          title="Purchase Bills" 
          onToggleTheme={onToggleTheme}
          isDark={theme === 'dark'}
          search={search}
          setSearch={setSearch}
        />

        <div className="ss-content">
          <div className="ss-card" style={{ border: 'none', boxShadow: 'none' }}>
            <div className="ss-card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div className="ss-card-title" style={{ fontSize: '18px', fontWeight: 700 }}>Recent Purchases</div>
              <button className="ss-btn-success" onClick={() => navigate('/purchase/create')}>
                {Icon.plus} Create Purchase Bill
              </button>
            </div>

            <div className="ss-table-wrap">
              <div className="ss-table-head ss-sales-grid">
                <div>Bill No</div>
                <div>Party Name</div>
                <div>Date</div>
                <div>Status</div>
                <div>Total Amount</div>
                <div>Unpaid Amount</div>
                <div style={{ textAlign: 'center' }}>Action</div>
              </div>

              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>Loading purchases...</div>
              ) : filteredPurchases.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>No purchase bills found.</div>
                  <button className="ss-btn-primary" onClick={() => navigate('/purchase/create')}>Create your first bill</button>
                </div>
              ) : (
                filteredPurchases.map((p) => (
                  <div key={p._id} className="ss-table-row ss-sales-grid">
                    <div style={{ fontWeight: 600 }}>#{p.purchaseNo}</div>
                    <div style={{ fontWeight: 600 }}>{p.partyName}</div>
                    <div>{new Date(p.purchaseDate).toLocaleDateString()}</div>
                    <div>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, 
                        background: p.status === 'PAID' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(244, 63, 94, 0.1)', 
                        color: p.status === 'PAID' ? 'var(--pos)' : 'var(--neg)' 
                      }}>{p.status}</span>
                    </div>
                    <div style={{ fontWeight: 700 }}>Rs. {p.totalAmount.toFixed(2)}</div>
                    <div style={{ color: 'var(--text-muted)' }}>Rs. {p.status === 'PAID' ? '0.00' : p.totalAmount.toFixed(2)}</div>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                      <button className="ss-icon-btn" title="View Bill" onClick={() => navigate(`/purchase/preview/${p._id}`)}>
                        {Icon.eye}
                      </button>
                      <button className="ss-icon-btn" title="Edit Bill" style={{ color: 'var(--text-muted)' }} onClick={() => navigate(`/purchase/edit/${p._id}`)}>
                        {Icon.edit}
                      </button>
                      <button className="ss-icon-btn" title="Delete Bill" style={{ color: '#ef4444' }} onClick={() => handleDeleteClick(p._id)}>
                        {Icon.trash}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Purchase Bill"
        message="Are you sure you want to delete this bill? This action cannot be undone."
      />
      <ToastContainer />
    </div>
  );
}

export default Purchase;
