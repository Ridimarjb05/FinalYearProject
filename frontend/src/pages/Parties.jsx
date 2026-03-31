import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ConfirmationModal from '../components/common/ConfirmationModal';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

function Parties({ theme = 'light', onToggleTheme }) {
  const [parties, setParties] = useState([]);
  const [partyModalMode, setPartyModalMode] = useState(null);
  const [selectedParty, setSelectedParty] = useState(null);
  const [activeMenuPartyId, setActiveMenuPartyId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [partyToDelete, setPartyToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All contacts');
  const [filterStatus, setFilterStatus] = useState('All transaction');
  const [form, setForm] = useState({
    name: '',
    type: 'Customer',
    phone: '',
    balance: '',
    status: 'Receivable'
  });

  const navigate = useNavigate();

  async function fetchParties() {
    try {
      const url = "http://localhost:8000/parties";
      const response = await fetch(url, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      const result = await response.json();
      if (result.success) {
        setParties(result.parties);
      } else {
        handleError(result.message || 'Failed to load parties');
      }
    } catch {
      handleError('Failed to load parties');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchParties();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddParty = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/parties";
      const payload = {
        name: form.name,
        type: form.type,
        phone: form.phone,
        balance: Number(form.balance || 0),
        status: form.status
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        handleSuccess('Party added');
        setForm({
          name: '',
          type: 'Customer',
          phone: '',
          balance: '',
          status: 'Receivable'
        });
        setPartyModalMode(null);
        fetchParties();
      } else {
        handleError(result.message || 'Failed to add party');
      }
    } catch {
      handleError('Something went wrong');
    }
  };


  const handleUpdateParty = async (e) => {
    e.preventDefault();
    if (!selectedParty) return;
    try {
      const url = `http://localhost:8000/parties/${selectedParty._id}`;
      const payload = {
        name: form.name,
        type: form.type,
        phone: form.phone,
        balance: Number(form.balance || 0),
        status: form.status
      };
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        handleSuccess('Party updated');
        setPartyModalMode(null);
        setSelectedParty(null);
        fetchParties();
      } else {
        handleError(result.message || 'Failed to update party');
      }
    } catch {
      handleError('Something went wrong');
    }
  };

  const openAddParty = () => {
    setForm({
      name: '',
      type: 'Customer',
      phone: '',
      balance: '',
      status: 'Receivable'
    });
    setSelectedParty(null);
    setPartyModalMode('add');
  };

  const openViewParty = (party) => {
    setActiveMenuPartyId(null);
    navigate(`/parties/${party._id}`);
  };

  const openEditParty = (party) => {
    setForm({
      name: party.name || '',
      type: party.type || 'Customer',
      phone: party.phone || '',
      balance: party.balance ?? '',
      status: party.status || 'Receivable'
    });
    setSelectedParty(party);
    setPartyModalMode('edit');
    setActiveMenuPartyId(null);
  };

  const handleDeleteParty = (id) => {
    setPartyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteParty = async () => {
    if (!partyToDelete) return;
    try {
      const response = await fetch(`http://localhost:8000/parties/${partyToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        handleSuccess('Party deleted');
        setIsDeleteModalOpen(false);
        setPartyToDelete(null);
        fetchParties();
      } else {
        handleError(result.message || 'Delete failed');
      }
    } catch {
      handleError('Something went wrong');
    }
  };
  const handleExportParties = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    window.location.href = `http://localhost:8000/parties/export-parties?token=${token}`;
    handleSuccess('Parties export started');
  };


  const filteredParties = parties.filter(p => {
    const searchMatch = !search.trim() || [p.name, p.type, p.phone, p.status]
      .join(' ')
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const typeMatch = filterType === 'All contacts' || p.type === filterType;

    const statusMatch = filterStatus === 'All transaction' || (p.status || '').toLowerCase() === filterStatus.toLowerCase();

    return searchMatch && typeMatch && statusMatch;
  });

  return (
    <div className="ss-layout">
      <Sidebar activeSection="parties" />

      <div className="ss-main">
        <Topbar 
          title="Parties Management" 
          onToggleTheme={onToggleTheme}
          isDark={theme === 'dark'}
          search={search}
          setSearch={setSearch}
          placeholder="Search parties..."
        />

        <div className="ss-content">
          <div className="ss-card" style={{ border: 'none', boxShadow: 'none' }}>
            <div className="ss-card-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                  {Icon.users}
                </div>
                <div>
                  <div className="ss-card-title">Parties List</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{filteredParties.length} contacts found</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="ss-btn-ghost" onClick={handleExportParties}>
                  {Icon.download} Export
                </button>
                <button className="ss-btn-primary" onClick={openAddParty}>
                  {Icon.plus} Add New Party
                </button>
              </div>
            </div>

            <div className="ss-filters-bar">
              <div className="ss-filter-group">
                <button
                  className={`ss-filter-btn ${filterType === 'All contacts' ? 'active' : ''}`}
                  onClick={() => setFilterType('All contacts')}
                >
                  All
                </button>
                <button
                  className={`ss-filter-btn ${filterType === 'Customer' ? 'active' : ''}`}
                  onClick={() => setFilterType('Customer')}
                >
                  Customers
                </button>
                <button
                  className={`ss-filter-btn ${filterType === 'Supplier' ? 'active' : ''}`}
                  onClick={() => setFilterType('Supplier')}
                >
                  Suppliers
                </button>
              </div>

              <div className="ss-filter-group">
                <button
                  className={`ss-filter-btn ${filterStatus === 'All transaction' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('All transaction')}
                >
                  All Status
                </button>
                <button
                  className={`ss-filter-btn ${filterStatus === 'receivable' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('receivable')}
                >
                  Receivables
                </button>
                <button
                  className={`ss-filter-btn ${filterStatus === 'payable' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('payable')}
                >
                  Payables
                </button>
              </div>
            </div>

            <div className="ss-table-wrap" style={{ marginTop: 20 }}>
              <div className="ss-table-head" style={{ gridTemplateColumns: '2.5fr 1fr 160px 160px 100px' }}>
                <div>Party Name</div>
                <div>Type</div>
                <div>Phone</div>
                <div style={{ textAlign: 'right' }}>Balance</div>
                <div style={{ textAlign: 'center' }}>Action</div>
              </div>
              
              {filteredParties.map(p => (
                <div key={p._id} className="ss-table-row" style={{ gridTemplateColumns: '2.5fr 1fr 160px 160px 100px' }}>
                  <div onClick={() => openViewParty(p)} style={{ cursor: 'pointer' }}>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Registered on {new Date(p.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className={`ss-badge ${p.type === 'Customer' ? 'status-active' : 'status-blocked'}`}>
                       {p.type}
                    </span>
                  </div>
                  <div>{p.phone || '--'}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: (p.status || '').toLowerCase() === 'payable' ? '#ef4444' : '#22c55e' }}>
                      NPR {Number(p.balance || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {p.status || 'Receivable'}
                    </div>
                  </div>
                    <div style={{ textAlign: 'center', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button className="ss-icon-btn" title="View Details" onClick={() => openViewParty(p)}>
                        {Icon.eye}
                      </button>
                      <button className="ss-icon-btn ss-text-danger" title="Delete Party" onClick={() => handleDeleteParty(p._id)}>
                        {Icon.trash}
                      </button>
                    </div>
                </div>
              ))}
              
              {filteredParties.length === 0 && (
                <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No parties found matching your selection.
                </div>
              )}
            </div>
          </div>
        </div>

        {partyModalMode && (
          <div className="ss-modal-overlay" onClick={() => setPartyModalMode(null)}>
            <div className="ss-modal-card" onClick={e => e.stopPropagation()}>
              <div className="ss-modal-head">
                <div className="ss-modal-title">
                  {partyModalMode === 'add' ? 'Add New Party' : 'Edit Contact'}
                </div>
                <button className="ss-icon-btn" onClick={() => setPartyModalMode(null)}>
                  {Icon.close}
                </button>
              </div>
              <form className="ss-modal-body" onSubmit={partyModalMode === 'add' ? handleAddParty : handleUpdateParty}>
                <div className="ss-form-row">
                  <div className="ss-form-group">
                    <label className="ss-form-label">Contact Name *</label>
                    <input
                      name="name"
                      className="ss-form-input"
                      placeholder="e.g. Ram Prasad"
                      value={form.name}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="ss-form-group">
                    <label className="ss-form-label">Contact Type</label>
                    <select
                      name="type"
                      className="ss-form-select"
                      value={form.type}
                      onChange={handleInput}
                    >
                      <option>Customer</option>
                      <option>Supplier</option>
                    </select>
                  </div>
                </div>
                <div className="ss-form-group">
                  <label className="ss-form-label">Phone Number</label>
                  <input
                    name="phone"
                    className="ss-form-input"
                    placeholder="98XXXXXXXX"
                    value={form.phone}
                    onChange={handleInput}
                  />
                </div>
                <div className="ss-form-row">
                  <div className="ss-form-group">
                    <label className="ss-form-label">Opening Balance</label>
                    <input
                      name="balance"
                      type="number"
                      className="ss-form-input"
                      placeholder="0.00"
                      value={form.balance}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="ss-form-group">
                    <label className="ss-form-label">Balance Type</label>
                    <select
                      name="status"
                      className="ss-form-select"
                      value={form.status}
                      onChange={handleInput}
                    >
                      <option>Receivable</option>
                      <option>Payable</option>
                    </select>
                  </div>
                </div>
                <div className="ss-modal-footer">
                  <button type="button" className="ss-btn-ghost" onClick={() => setPartyModalMode(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="ss-btn-primary">
                    {partyModalMode === 'add' ? 'Add Party' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <ToastContainer />
        <ConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteParty}
          title="Confirm Deletion"
          message="Are you sure you want to delete this party? All related data will be lost."
          confirmText="Delete Party"
        />
      </div>
    </div>
  );
}

export default Parties;
