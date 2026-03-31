import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ConfirmationModal from '../components/common/ConfirmationModal';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';
import PartySheet from '../components/common/PartySheet';

function Sales({ theme = 'light', onToggleTheme }) {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('invoices'); // 'invoices' or 'payments'
  const [isPartySheetOpen, setIsPartySheetOpen] = useState(false);
  
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => { 
    if (activeTab === 'invoices') fetchInvoices(); 
    else fetchTransactions();
  }, [activeTab]);

  async function fetchInvoices() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/invoices", {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      if (result.success) setInvoices(result.invoices);
      else handleError(result.message);
    } catch {
      handleError('Failed to load invoices');
    } finally { setLoading(false); }
  }

  async function fetchTransactions() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/transactions", {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      if (result.success) setTransactions(result.transactions);
      else handleError(result.message);
    } catch {
      handleError('Failed to load payments');
    } finally { setLoading(false); }
  }

  async function fetchParties() {
    try {
      const response = await fetch("http://localhost:8000/parties", {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      if (result.success) setParties(result.parties);
    } catch { handleError('Failed to load parties'); }
  }

  useEffect(() => {
    fetchParties();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`http://localhost:8000/invoices/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess('Invoice deleted');
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        fetchInvoices();
      } else { handleError(result.message); }
    } catch { handleError('Failed to delete invoice'); }
  };

  const filteredInvoices = invoices.filter(inv =>
    inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
    inv.partyName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTransactions = transactions.filter(tr => {
    const pName = tr.partyName || parties.find(p => p._id === tr.partyId)?.name || '';
    return tr.name.toLowerCase().includes(search.toLowerCase()) ||
           (tr.remarks && tr.remarks.toLowerCase().includes(search.toLowerCase())) ||
           pName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="ss-layout">
      <Sidebar activeSection="sales" />

      <div className="ss-main">
        <Topbar 
          title="Sales Hub" 
          onToggleTheme={onToggleTheme}
          isDark={theme === 'dark'}
          search={search}
          setSearch={setSearch}
        />

        <div className="ss-content">
          <div className="ss-hub-header">
            <div className="ss-segmented-control">
              <button 
                className={activeTab === 'invoices' ? 'active' : ''} 
                onClick={() => setActiveTab('invoices')}
              >
                Invoices
              </button>
              <button 
                className={activeTab === 'payments' ? 'active' : ''} 
                onClick={() => setActiveTab('payments')}
              >
                Payments In
              </button>
            </div>

            <div className="ss-header-actions">
              {activeTab === 'invoices' ? (
                <button className="ss-btn-success" onClick={() => navigate('/sales/create')}>
                  {Icon.plus} New Invoice
                </button>
              ) : (
                <button 
                  className="ss-btn-success" 
                  onClick={() => setIsPartySheetOpen(true)}
                >
                  {Icon.plus} Receive Payment
                </button>
              )}
            </div>
          </div>

          <div className="ss-card" style={{ border: 'none', boxShadow: 'none' }}>
            <div className="ss-table-wrap">
              {activeTab === 'invoices' ? (
                <>
                  <div className="ss-table-head ss-sales-grid">
                    <div>Invoice No</div>
                    <div>Party Name</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Total Amount</div>
                    <div>Unpaid</div>
                    <div style={{ textAlign: 'center' }}>Action</div>
                  </div>

                  {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>Loading invoices...</div>
                  ) : filteredInvoices.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center' }}>
                      <div style={{ color: 'var(--text-muted)' }}>No invoices found.</div>
                    </div>
                  ) : (
                    filteredInvoices.map((inv) => (
                      <div key={inv._id} className="ss-table-row ss-sales-grid">
                        <div style={{ fontWeight: 600 }}>#{inv.invoiceNo}</div>
                        <div style={{ fontWeight: 600 }}>{inv.partyName}</div>
                        <div>{new Date(inv.invoiceDate).toLocaleDateString()}</div>
                        <div>
                          <span style={{ 
                            padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, 
                            background: inv.status === 'Paid' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                            color: inv.status === 'Paid' ? 'var(--pos)' : 'var(--warn)' 
                          }}>{inv.status || 'Paid'}</span>
                        </div>
                        <div style={{ fontWeight: 700 }}>Rs. {inv.totalAmount.toFixed(2)}</div>
                        <div style={{ color: 'var(--neg)', fontWeight: 600 }}>Rs. {(inv.totalAmount - (inv.paidAmount || 0)).toFixed(2)}</div>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                          <button className="ss-icon-btn" title="View" onClick={() => navigate(`/sales/preview/${inv._id}`)}>{Icon.eye}</button>
                          <button className="ss-icon-btn" title="Edit" onClick={() => navigate(`/sales/edit/${inv._id}`)}>{Icon.edit}</button>
                          <button className="ss-icon-btn" title="Delete" style={{ color: '#ef4444' }} onClick={() => handleDeleteClick(inv._id)}>{Icon.trash}</button>
                        </div>
                      </div>
                    ))
                  )}
                </>
              ) : (
                <>
                  <div className="ss-table-head ss-payments-grid">
                    <div>Date</div>
                    <div>Party Name</div>
                    <div>Description</div>
                    <div>Amount</div>
                    <div>Balance After</div>
                    <div style={{ textAlign: 'right' }}>Action</div>
                  </div>

                  {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>Loading payments...</div>
                  ) : filteredTransactions.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center' }}>
                      <div style={{ color: 'var(--text-muted)' }}>No payments found.</div>
                    </div>
                  ) : (
                    filteredTransactions.map((tr) => (
                      <div key={tr._id} className="ss-table-row ss-payments-grid">
                        <div>{new Date(tr.date).toLocaleDateString()}</div>
                        <div style={{ fontWeight: 600 }}>{tr.partyName || parties.find(p => p._id === tr.partyId)?.name || 'Unknown Party'}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{tr.name}{tr.remarks ? ` - ${tr.remarks}` : ''}</div>
                        <div style={{ fontWeight: 700, color: 'var(--pos)' }}>Rs. {tr.amount.toFixed(2)}</div>
                        <div style={{ color: 'var(--text-muted)' }}>Rs. {tr.balanceAfter.toFixed(2)}</div>
                        <div style={{ textAlign: 'right' }}>
                          <button className="ss-icon-btn" title="View Party" onClick={() => navigate(`/parties/${tr.partyId}`)}>{Icon.eye}</button>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice? This action cannot be undone."
      />

      <PartySheet 
        isOpen={isPartySheetOpen}
        onClose={() => setIsPartySheetOpen(false)}
        parties={parties}
        onSelect={(party) => {
          navigate(`/parties/${party._id}`); // Go to party details to manage payments/ledger
        }}
      />

      <style>{`
        .ss-hub-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .ss-segmented-control {
          display: flex;
          background: rgba(0, 0, 0, 0.05);
          padding: 4px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          width: fit-content; /* Ensure it only takes needed space */
        }
        .ss-segmented-control button {
          padding: 10px 28px;
          border: none;
          background: transparent;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          transition: all 0.2s;
          cursor: pointer;
          white-space: nowrap; /* Prevent wrapping */
        }
        .ss-segmented-control button.active {
          background: white;
          color: #c2410c; /* High-end orange-brown */
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        .ss-payments-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr 2fr 1fr 1.2fr 80px;
          gap: 16px;
          align-items: center;
        }
      `}</style>
      <ToastContainer />
    </div>
  );
}

export default Sales;
