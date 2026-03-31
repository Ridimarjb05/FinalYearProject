import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

function PartyDetails({ theme = 'light', onToggleTheme }) {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    type: 'Supplier',
    balance: '',
    status: 'Receivable'
  });
  const [transactionForm, setTransactionForm] = useState({
    name: '',
    amount: '',
    status: 'Paid',
    remarks: ''
  });

  useEffect(() => {
    fetchPartyDetails();
    fetchTransactions();
  }, [id]);

  useEffect(() => {
    if (party) {
      setEditForm({
        name: party.name || '',
        phone: party.phone || '',
        address: party.address || '',
        notes: party.notes || '',
        type: party.type || 'Supplier',
        balance: party.balance || '',
        status: party.status || 'Receivable'
      });
    }
  }, [party]);

  const fetchPartyDetails = async () => {
    try {
      const url = `http://localhost:8000/parties/${id}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setParty(result.party);
      } else {
        handleError(result.message || 'Failed to load party');
      }
    } catch {
      handleError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const url = `http://localhost:8000/transactions/${id}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setTransactions(result.transactions);
      }
    } catch { /* ignore */ }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, phone, type, address, notes } = editForm;
      const payload = { name, phone, type, address, notes };
      
      const response = await fetch(`http://localhost:8000/parties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      await response.json();
      handleSuccess('Party updated successfully');
      setIsEditModalOpen(false);
      fetchPartyDetails();
    } catch (err) {
      handleError(err.message || 'Update failed');
    }
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        partyId: id,
        ...transactionForm,
        amount: Number(transactionForm.amount)
      };

      const response = await fetch('http://localhost:8000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        handleSuccess('Transaction added');
        setIsTransactionModalOpen(false);
        setTransactionForm({ name: '', amount: '', status: 'Paid', remarks: '' });
        fetchTransactions();
        fetchPartyDetails();
      } else {
        handleError(result.message || 'Failed to add transaction');
      }
    } catch {
      handleError('Something went wrong');
    }
  };

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTransactionInput = (e) => {
    const { name, value } = e.target;
    setTransactionForm(prev => ({ ...prev, [name]: value }));
  };


  let receivable = 0;
  let payable = 0;
  if (party) {
    const balanceValue = Number(party.balance || 0);
    if (balanceValue > 0) {
      if ((party.status || '').toLowerCase() === 'receivable') {
        receivable = balanceValue;
      } else if ((party.status || '').toLowerCase() === 'payable') {
        payable = balanceValue;
      }
    }
  }

  return (
    <div className="ss-layout">
      <Sidebar activeSection="parties" />

      <div className="ss-main">
        <Topbar 
          title={party ? party.name : 'Loading party...'}
          onToggleTheme={onToggleTheme}
          isDark={theme === 'dark'}
          searchPlaceholder="Search transactions..."
        />

        <div className="ss-content">
          {loading ? (
            <div className="ss-card">
              <div className="ss-card-title">Loading party details...</div>
            </div>
          ) : party && (
            <div className="ss-party-layout-container">
              <div className="ss-party-header">
                <div className="ss-party-info">
                  <div className="ss-party-avatar">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="ss-party-name-wrap">
                    <h1>{party.name}</h1>
                    <div className="ss-party-type-label">{party.type}</div>
                  </div>
                </div>
                <button className="ss-btn-edit-contact" onClick={() => setIsEditModalOpen(true)}>
                  Edit Party
                </button>
              </div>

              <div className="ss-party-main-grid">
                <div className="ss-dash-left">
                  <div className="ss-card">
                    <div className="ss-card-head">
                      <div className="ss-card-title">FINANCIAL SUMMARY</div>
                    </div>
                    <div className="ss-summary-grid">
                      <div className="ss-summary-card receivable">
                        <div className="ss-summary-label">
                          <span className="ss-summary-indicator" />
                          Receivable
                        </div>
                        <div className="ss-summary-value">Rs {receivable.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="ss-summary-card payable">
                        <div className="ss-summary-label">
                          <span className="ss-summary-indicator" />
                          Payable
                        </div>
                        <div className="ss-summary-value">Rs {payable.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="ss-card">
                    <div className="ss-card-head">
                      <div className="ss-card-title">CONTACT INFORMATION</div>
                    </div>
                    
                    <div className="ss-contact-grid">
                      <div className="ss-contact-row">
                        <div className="ss-contact-label">Phone number</div>
                        <div className="ss-contact-value">{party.phone || 'Not provided'}</div>
                      </div>

                      <div className="ss-contact-row">
                        <div className="ss-contact-label">Business name</div>
                        <div className="ss-contact-value">{party.name}</div>
                      </div>

                      <div className="ss-contact-row">
                        <div className="ss-contact-label">Address</div>
                        <div className={`ss-contact-value ${!party.address ? 'italic' : ''}`}>
                          {party.address || 'Not provided'}
                        </div>
                      </div>

                      <div className="ss-contact-row">
                        <div className="ss-contact-label">Notes</div>
                        <div className={`ss-contact-value ${!party.notes ? 'italic' : ''}`}>
                          {party.notes || 'No notes available'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ss-dash-right">
                  <div className="ss-card">
                    <div className="ss-card-head">
                      <div className="ss-card-title">TRANSACTION HISTORY</div>
                      <button className="ss-btn-primary" onClick={() => setIsTransactionModalOpen(true)}>+ Add Entry</button>
                    </div>
                    
                    <div className="ss-table-wrap">
                      <div className="ss-table-head ss-transaction-grid">
                        <div>Name</div>
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div>Balance</div>
                        <div>Remarks</div>
                        <div></div>
                      </div>
                      {transactions.length === 0 ? (
                        <div className="ss-empty">No transactions found for this party.</div>
                      ) : (
                        transactions.map((t) => (
                          <div key={t._id} className="ss-table-row ss-transaction-grid">
                            <div className="ss-row-name">{t.name}</div>
                            <div style={{ color: 'var(--text-muted)' }}>
                              {new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                            </div>
                            <div style={{ fontWeight: 600 }}>Rs {t.amount.toLocaleString('en-IN')}</div>
                            <div>
                              <span className={`ss-status-badge ${t.status.toLowerCase()}`}>
                                <span className="ss-status-dot">●</span> {t.status}
                              </span>
                            </div>
                            <div style={{ fontWeight: 600 }}>Rs {(t.balanceAfter || 0).toLocaleString('en-IN')}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{t.remarks || '-'}</div>
                            <div className="ss-action-btns">
                              <button className="ss-action-btn" title="Edit">
                                {Icon.edit}
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isEditModalOpen && (
          <div className="ss-modal-overlay">
            <div className="ss-modal">
              <div className="ss-modal-head">
                <div className="ss-card-title">Edit Party Profile</div>
                <button className="ss-icon-btn" onClick={() => setIsEditModalOpen(false)}>{Icon.close}</button>
              </div>
              <form onSubmit={handleEditSubmit} style={{ marginTop: '20px', display: 'grid', gap: '16px' }}>
                <div className="ss-form-group">
                  <label className="ss-form-label">Business Name</label>
                  <input className="ss-form-input" name="name" value={editForm.name} onChange={handleEditInput} required />
                </div>
                <div className="ss-form-row">
                  <div className="ss-form-group">
                    <label className="ss-form-label">Phone Number</label>
                    <input className="ss-form-input" name="phone" value={editForm.phone} onChange={handleEditInput} />
                  </div>
                  <div className="ss-form-group">
                    <label className="ss-form-label">Category</label>
                    <select className="ss-form-select" name="type" value={editForm.type} onChange={handleEditInput}>
                      <option value="Supplier">Supplier</option>
                      <option value="Customer">Customer</option>
                    </select>
                  </div>
                </div>
                <div className="ss-form-group">
                  <label className="ss-form-label">Address</label>
                  <input className="ss-form-input" name="address" value={editForm.address} onChange={handleEditInput} />
                </div>
                <div className="ss-form-group">
                  <label className="ss-form-label">Internal Remarks</label>
                  <textarea className="ss-form-input" name="notes" value={editForm.notes} onChange={handleEditInput} style={{ minHeight: '80px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button type="button" className="ss-btn-ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                  <button type="submit" className="ss-btn-primary">Update Party</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isTransactionModalOpen && (
          <div className="ss-modal-overlay">
            <div className="ss-modal">
              <div className="ss-modal-head">
                <div className="ss-card-title">New Ledger Entry</div>
                <button className="ss-icon-btn" onClick={() => setIsTransactionModalOpen(false)}>{Icon.close}</button>
              </div>
              <form onSubmit={handleTransactionSubmit} style={{ marginTop: '20px', display: 'grid', gap: '16px' }}>
                <div className="ss-form-group">
                  <label className="ss-form-label">Transaction Label</label>
                  <input className="ss-form-input" name="name" placeholder="e.g. Bulk Sale" value={transactionForm.name} onChange={handleTransactionInput} required />
                </div>
                <div className="ss-form-row">
                  <div className="ss-form-group">
                    <label className="ss-form-label">Amount (Rs)</label>
                    <input className="ss-form-input" type="number" name="amount" placeholder="0" value={transactionForm.amount} onChange={handleTransactionInput} required />
                  </div>
                  <div className="ss-form-group">
                    <label className="ss-form-label">Status</label>
                    <select className="ss-form-select" name="status" value={transactionForm.status} onChange={handleTransactionInput}>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="ss-form-group">
                  <label className="ss-form-label">Remarks</label>
                  <input className="ss-form-input" name="remarks" placeholder="Optional notes" value={transactionForm.remarks} onChange={handleTransactionInput} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button type="button" className="ss-btn-ghost" onClick={() => setIsTransactionModalOpen(false)}>Cancel</button>
                  <button type="submit" className="ss-btn-primary">Save Entry</button>
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

export default PartyDetails;

