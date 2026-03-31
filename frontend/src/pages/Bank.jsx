import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

function Bank({ theme = 'light', onToggleTheme }) {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [form, setForm] = useState({
        name: '',
        type: 'Bank Account',
        openingBalance: ''
    });

    const fetchAccounts = async () => {
        try {
            const response = await fetch("http://localhost:8000/accounts", {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success) setAccounts(result.accounts);
        } catch { handleError('Failed to fetch accounts'); }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveAccount = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/accounts", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') 
                },
                body: JSON.stringify({
                    name: form.name,
                    type: form.type,
                    openingBalance: Number(form.openingBalance) || 0
                })
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess('Account created');
                setIsAddOpen(false);
                setForm({ name: '', type: 'Bank Account', openingBalance: '' });
                fetchAccounts();
            } else {
                handleError(result.message);
            }
        } catch { handleError('Failed to save account'); }
    };

    const totalBalance = accounts.reduce((sum, acc) => sum + (Number(acc.currentBalance) || 0), 0);

    const filteredAccounts = accounts.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        a.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="ss-layout">
            <Sidebar activeSection="bank" />

            <div className="ss-main">
                <Topbar 
                    title="Manage Accounts" 
                    onToggleTheme={onToggleTheme}
                    isDark={theme === 'dark'}
                />

                <div className="ss-content" style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
                        <div>
                            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Total Balance: Rs. {totalBalance.toLocaleString()}</h2>
                        </div>
                        <button className="ss-btn-primary" onClick={() => setIsAddOpen(true)}>
                            {Icon.plus} Add Account
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: 24, flex: 1, minHeight: 0 }}>
                        {/* Left List */}
                        <div style={{ width: '30%', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--card)', borderRadius: 12, border: '1px solid var(--border)', padding: 16 }}>
                            <div style={{ position: 'relative', width: '100%', marginBottom: 16 }}>
                                <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex' }}>
                                    {Icon.search}
                                </div>
                                <input 
                                    className="ss-form-input" 
                                    placeholder="Search account" 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    style={{ width: '100%', paddingLeft: 36, margin: 0 }}
                                />
                            </div>

                            <div style={{ overflowY: 'auto', flex: 1, paddingRight: 4 }}>
                                {filteredAccounts.length === 0 ? (
                                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: 20, fontSize: 13 }}>No accounts found</div>
                                ) : (
                                    filteredAccounts.map(acc => (
                                        <div 
                                            key={acc._id} 
                                            onClick={() => setSelectedAccount(acc)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                                                borderRadius: 8, cursor: 'pointer', marginBottom: 6,
                                                background: selectedAccount?._id === acc._id ? 'var(--input-bg)' : 'transparent',
                                                border: selectedAccount?._id === acc._id ? '1px solid var(--primary)' : '1px solid transparent',
                                            }}
                                        >
                                            <div style={{ 
                                                width: 36, height: 36, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', 
                                                color: 'var(--primary)', display: 'grid', placeItems: 'center' 
                                            }}>
                                                {acc.type === 'Cash' ? Icon.tag : acc.type === 'Mobile Wallet' ? Icon.check : Icon.bank}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, fontSize: 14 }}>{acc.name}</div>
                                                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{acc.type}</div>
                                            </div>
                                            <div style={{ fontWeight: 700, fontSize: 14 }}>
                                                Rs. {Number(acc.currentBalance).toLocaleString()}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Right Detail Panel */}
                        <div style={{ flex: 1, background: 'var(--card)', borderRadius: 12, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            {!selectedAccount ? (
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                    <div style={{ opacity: 0.3, marginBottom: 16 }}>{Icon.receipt}</div>
                                    <h3 style={{ fontSize: 18, color: 'var(--text-primary)', marginBottom: 8 }}>Account Not Selected</h3>
                                    <p style={{ fontSize: 14 }}>Click any account to view their transactions.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ padding: 20, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{selectedAccount.name}</h3>
                                            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{selectedAccount.type}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Current Balance</div>
                                            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--pos)' }}>Rs. {Number(selectedAccount.currentBalance).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                        <div style={{ opacity: 0.3, marginBottom: 16 }}>{Icon.calendar}</div>
                                        <p style={{ fontSize: 14 }}>No transactions to show.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {isAddOpen && (
                    <div className="ss-modal-overlay">
                        <div className="ss-modal" style={{ maxWidth: 450 }}>
                            <div className="ss-modal-head">
                                <h3 style={{ margin: 0, fontSize: 16 }}>Add Account</h3>
                                <button className="ss-icon-btn" onClick={() => setIsAddOpen(false)}>{Icon.close}</button>
                            </div>
                            <form onSubmit={handleSaveAccount} style={{ padding: 16, display: 'grid', gap: 14 }}>
                                <div className="ss-form-group">
                                    <label className="ss-form-label">Account Name *</label>
                                    <input className="ss-form-input" name="name" value={form.name} onChange={handleInput} required placeholder="e.g. Global IME" />
                                </div>
                                <div className="ss-form-group">
                                    <label className="ss-form-label">Account Type *</label>
                                    <select className="ss-form-input ss-select" name="type" value={form.type} onChange={handleInput} required>
                                        <option>Bank Account</option>
                                        <option>Cash</option>
                                        <option>Mobile Wallet</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="ss-form-group">
                                    <label className="ss-form-label">Opening Balance</label>
                                    <input className="ss-form-input" name="openingBalance" type="number" value={form.openingBalance} onChange={handleInput} placeholder="0" />
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                                    <button type="button" className="ss-btn-ghost" onClick={() => setIsAddOpen(false)}>Cancel</button>
                                    <button type="submit" className="ss-btn-primary">Save Account</button>
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

export default Bank;
