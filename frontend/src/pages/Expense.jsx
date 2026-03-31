import React, { useEffect, useState } from 'react';

import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ConfirmationModal from '../components/common/ConfirmationModal';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

const EMPTY_FORM = { title: '', amount: '', category: '', date: new Date().toISOString().split('T')[0], paymentMode: 'Cash', remarks: '' };

function Expense({ theme = 'light', onToggleTheme }) {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showCatForm, setShowCatForm] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editingId, setEditingId] = useState(null);
    const [catForm, setCatForm] = useState({ name: '', description: '' });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('All');

    async function fetchExpenses() {
        try {
            const response = await fetch("http://localhost:8000/expenses", {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success) setExpenses(result.expenses);
        } catch { handleError('Failed to fetch expenses'); }
    }

    async function fetchCategories() {
        try {
            const response = await fetch("http://localhost:8000/expenses/categories", {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success) setCategories(result.categories);
        } catch { handleError('Failed to fetch categories'); }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchExpenses();
        fetchCategories();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleCatInput = (e) => {
        const { name, value } = e.target;
        setCatForm(prev => ({ ...prev, [name]: value }));
    };

    const openAddForm = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
        setShowForm(true);
    };

    const openEditForm = (expense) => {
        setEditingId(expense._id);
        setForm({
            title: expense.title,
            amount: expense.amount,
            category: expense.category?._id || '',
            date: expense.date ? expense.date.split('T')[0] : '',
            paymentMode: expense.paymentMode || 'Cash',
            remarks: expense.remarks || ''
        });
        setShowForm(true);
    };

    const handleSaveExpense = async (e) => {
        e.preventDefault();
        const isEdit = !!editingId;
        const url = isEdit
            ? `http://localhost:8000/expenses/${editingId}`
            : `http://localhost:8000/expenses`;
        const method = isEdit ? 'PUT' : 'POST';
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify({ ...form, amount: Number(form.amount) })
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(isEdit ? 'Expense updated' : 'Expense added');
                setShowForm(false);
                setEditingId(null);
                setForm(EMPTY_FORM);
                fetchExpenses();
            } else { handleError(result.message); }
        } catch { handleError('Something went wrong'); }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/expenses/categories", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(catForm)
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess('Category created');
                setShowCatForm(false);
                setCatForm({ name: '', description: '' });
                fetchCategories();
                if (showForm) {
                    setForm(prev => ({ ...prev, category: result.category._id }));
                }
            } else { handleError(result.message); }
        } catch { handleError('Something went wrong'); }
    };

    const handleDeleteExpense = (id) => {
        setExpenseToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteExpense = async () => {
        if (!expenseToDelete) return;
        try {
            const response = await fetch(`http://localhost:8000/expenses/${expenseToDelete}`, {
                method: 'DELETE',
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess('Expense deleted');
                setIsDeleteModalOpen(false);
                setExpenseToDelete(null);
                fetchExpenses();
            } else { handleError(result.message); }
        } catch { handleError('Something went wrong'); }
    };

    const filteredExpenses = expenses.filter(e => {
        const titleMatch = e.title.toLowerCase().includes(search.toLowerCase());
        const catMatch = catFilter === 'All' || (e.category && e.category._id === catFilter);
        return titleMatch && catMatch;
    });

    const totalThisMonth = expenses
        .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
        .reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div className="ss-layout">
      <Sidebar activeSection="expense" />

      <div className="ss-main">
        <Topbar 
          title="Expenses" 
          onToggleTheme={onToggleTheme}
          isDark={theme === 'dark'}
          search={search}
          setSearch={setSearch}
        />

        <div className="ss-content">

            <div className="ss-card">
                <div className="ss-card-head">
                    <div className="ss-card-title">All Expenses</div>
                    <button className="ss-btn-primary" onClick={openAddForm}>{Icon.plus} New Expense</button>
                </div>

                <div className="ss-filters">
                    <select className="ss-select" value={catFilter} onChange={e=>setCatFilter(e.target.value)}>
                        <option value="All">All Categories</option>
                        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                </div>

                <div className="ss-table-wrap">
                    <div className="ss-table-head" style={{ gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr 1fr 90px'}}>
                        <div>DATE</div><div>TITLE</div><div>CATEGORY</div><div>AMOUNT</div><div>PAYMENT</div><div>REMARKS</div><div style={{ textAlign: 'center' }}>ACTION</div>
                    </div>
                    {filteredExpenses.map(e => (
                        <div key={e._id} className="ss-table-row" style={{ gridTemplateColumns: '1fr 2fr 1.5fr 1fr 1fr 1fr 90px'}}>
                            <div>{new Date(e.date).toLocaleDateString()}</div>
                            <div className="ss-row-name">{e.title}</div>
                            <div><span className="ss-badge">{e.category?.name || 'Uncategorized'}</span></div>
                            <div style={{ fontWeight: 700, color: 'var(--neg)' }}>Rs {e.amount?.toLocaleString()}</div>
                            <div>{e.paymentMode}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{e.remarks || '-'}</div>
                            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                                <button
                                    className="ss-icon-btn"
                                    title="Edit"
                                    onClick={() => openEditForm(e)}
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    {Icon.edit}
                                </button>
                                <button
                                    className="ss-icon-btn"
                                    title="Delete"
                                    onClick={() => handleDeleteExpense(e._id)}
                                    style={{ color: '#ef4444' }}
                                >
                                    {Icon.trash}
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredExpenses.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No expenses found.</div>}
                </div>
            </div>
        </div>

        {showForm && (
            <div className="ss-modal-overlay">
                <div className="ss-modal">
                    <div className="ss-modal-head">
                        <h3 style={{ margin: 0, fontSize: 16 }}>{editingId ? 'Edit Expense' : 'New Expense'}</h3>
                        <button className="ss-icon-btn" onClick={() => { setShowForm(false); setEditingId(null); }}>{Icon.close}</button>
                    </div>
                    <form onSubmit={handleSaveExpense} style={{ display: 'grid', gap: 14, marginTop: 16 }}>
                        <div className="ss-form-group">
                            <label className="ss-form-label">Expense Title</label>
                            <input className="ss-form-input" name="title" value={form.title} onChange={handleInput} required placeholder="e.g. Office Rent" />
                        </div>
                        <div className="ss-form-row">
                            <div className="ss-form-group"><label className="ss-form-label">Amount</label><input className="ss-form-input" type="number" name="amount" value={form.amount} onChange={handleInput} required /></div>
                            <div className="ss-form-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <label className="ss-form-label" style={{ marginBottom: 0 }}>Category</label>
                                    <button type="button" onClick={() => setShowCatForm(true)} style={{ fontSize: '12px', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>+ Add New</button>
                                </div>
                                <select className="ss-form-select" name="category" value={form.category} onChange={handleInput} required>
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="ss-form-row">
                            <div className="ss-form-group"><label className="ss-form-label">Date</label><input className="ss-form-input" type="date" name="date" value={form.date} onChange={handleInput} /></div>
                            <div className="ss-form-group">
                                <label className="ss-form-label">Payment Mode</label>
                                <select className="ss-form-select" name="paymentMode" value={form.paymentMode} onChange={handleInput}>
                                    <option>Cash</option><option>Bank</option><option>Cheque</option><option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="ss-form-group"><label className="ss-form-label">Remarks</label><textarea className="ss-form-input" name="remarks" value={form.remarks} onChange={handleInput} style={{ height: 60 }} /></div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button type="button" className="ss-btn-ghost" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
                            <button type="submit" className="ss-btn-primary">{editingId ? 'Update Expense' : 'Save Expense'}</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {showCatForm && (
            <div className="ss-modal-overlay">
                <div className="ss-modal" style={{ maxWidth: 400 }}>
                    <div className="ss-modal-head">
                        <h3 style={{ margin: 0, fontSize: 16 }}>Manage Category</h3>
                        <button className="ss-icon-btn" onClick={()=>setShowCatForm(false)}>{Icon.close}</button>
                    </div>
                    <div style={{ padding: '0 24px 16px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                            Create a new category for your expenses. Existing categories are listed below.
                        </div>
                    </div>
                    <form onSubmit={handleAddCategory} style={{ display: 'grid', gap: 12, marginTop: 16, borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
                        <div className="ss-form-group"><label className="ss-form-label">New Category Name</label><input className="ss-form-input" name="name" value={catForm.name} onChange={handleCatInput} required /></div>
                        <button type="submit" className="ss-btn-primary" style={{ width: '100%' }}>Add Category</button>
                    </form>
                    <div style={{ marginTop: 16 }}>
                        <div className="ss-stat-title" style={{ marginBottom: 10 }}>Current Categories</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {categories.map(c => <span key={c._id} className="ss-badge" style={{ padding: '6px 12px' }}>{c.name}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        )}

        <ConfirmationModal isOpen={isDeleteModalOpen} onClose={()=>setIsDeleteModalOpen(false)} onConfirm={confirmDeleteExpense} title="Delete Expense" message="Confirm deletion?" />
        <ToastContainer />
      </div>
    </div>
  );
}

export default Expense;
