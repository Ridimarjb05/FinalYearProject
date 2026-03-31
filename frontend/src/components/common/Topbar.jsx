import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icons';

function Topbar({ title, onToggleTheme, isDark, search, setSearch, placeholder = "Search anything...", backAction }) {
    const [loggedInUser] = useState(() => localStorage.getItem('loggedInUser') || '');
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLowStock = async () => {
            try {
                const response = await fetch("http://localhost:8000/products", {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                const products = await response.json();
                if (Array.isArray(products)) {
                    const lowStockItems = products.filter(p => Number(p.quantity) <= (p.minStock || 5));
                    setLowStockProducts(lowStockItems);
                }
            } catch (err) {
                console.error("Failed to fetch low stock for topbar notification", err);
            }
        };

        fetchLowStock();
        const interval = setInterval(fetchLowStock, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const userInitial = loggedInUser ? loggedInUser.charAt(0).toUpperCase() : 'R';

    return (
        <header className="ss-topbar">
            <div className="ss-topbar-title">
                {backAction && (
                    <button onClick={backAction} className="ss-icon-btn" style={{ marginRight: '16px' }}>
                        {Icon.arrowLeft}
                    </button>
                )}
                {title}
            </div>
            <div className="ss-topbar-center">
                <div className="ss-search-box">
                    <span className="ss-search-icon">{Icon.search}</span>
                    <input
                        className="ss-search"
                        placeholder={placeholder}
                        value={search}
                        onChange={(e) => setSearch && setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="ss-topbar-right">
                <div className="ss-notification-wrapper" ref={dropdownRef}>
                    <button 
                        className="ss-notification-btn" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        title="Low Stock Alerts"
                    >
                        {Icon.bell}
                        {lowStockProducts.length > 0 && <span className="ss-notification-badge" />}
                    </button>

                    {isDropdownOpen && (
                        <div className="ss-notification-dropdown">
                            <div className="ss-notif-header">
                                <h3>Low Stock Alerts</h3>
                                <span className="ss-notif-status">{lowStockProducts.length} Items</span>
                            </div>
                            <div className="ss-notif-content">
                                {lowStockProducts.length > 0 ? (
                                    lowStockProducts.map(product => (
                                        <div 
                                            key={product._id} 
                                            className="ss-notif-item"
                                            onClick={() => {
                                                navigate(`/inventory/${product._id}`);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <div className="ss-notif-info">
                                                <span className="ss-notif-pname">{product.name}</span>
                                                <span className="ss-notif-pstock">Current Stock: {product.quantity} (Limit: {product.minStock || 5})</span>
                                            </div>
                                            <div className="ss-notif-status">LOW</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="ss-notif-empty">
                                        All inventory levels are healthy!
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                
                <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />

                <button
                    className="ss-icon-btn"
                    type="button"
                    onClick={onToggleTheme}
                    title="Toggle theme"
                    style={{ border: 'none', background: 'transparent' }}
                >
                    {isDark ? Icon.sun : Icon.moon}
                </button>
                <div className="ss-avatar" style={{ cursor: 'pointer' }} onClick={() => navigate('/settings')}>
                    {userInitial}
                </div>
            </div>
        </header>
    );
}

export default Topbar;

