import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './Icons';

function Sidebar({ activeSection }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isReportsExpanded, setIsReportsExpanded] = useState(activeSection === 'reports');

    useEffect(() => {
        if (activeSection === 'reports') {
            setIsReportsExpanded(true);
        }
    }, [activeSection]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    const navGeneral = [
        { label: 'Home', icon: Icon.home, section: 'home', action: () => navigate('/home') },
        { label: 'Inventory', icon: Icon.box, section: 'inventory', action: () => navigate('/inventory') },
        { label: 'Parties', icon: Icon.users, section: 'parties', action: () => navigate('/parties') },
        { label: 'Images', icon: Icon.image, section: 'images', action: () => navigate('/images') },
    ];

    const navLedger = [
        { label: 'Sales', icon: Icon.dollar, section: 'sales', action: () => navigate('/sales') },
        { label: 'Purchase', icon: Icon.cart, section: 'purchase', action: () => navigate('/purchase') },
        { label: 'Expense', icon: Icon.receipt, section: 'expense', action: () => navigate('/expense') },
        { label: 'Bank', icon: Icon.bank, section: 'bank', action: () => navigate('/bank') },
    ];

    const navManagement = [
        { label: 'Audit Trail', icon: Icon.history, section: 'history', action: () => navigate('/history') },
    ];

    const reportSubItems = [
        { label: 'Sales Summary', tab: 'sales' },
        { label: 'Stock Summary', tab: 'stock' },
        { label: 'Low Stock Alerts', tab: 'low-stock' },
        { label: 'Profit & Loss', tab: 'profit-loss' },
    ];

    const currentTab = new URLSearchParams(location.search).get('tab') || 'sales';

    return (
        <aside className="ss-sidebar">
            <div className="ss-brand">
                <img src="/logo.png" alt="SmartStock" className="ss-brand-img" />
            </div>

            <div className="ss-nav-section">
                <div className="ss-nav-label">General</div>
                {navGeneral.map(item => (
                    <button 
                        key={item.label} 
                        className={`ss-nav-item ${activeSection === item.section ? 'active' : ''}`} 
                        onClick={item.action}
                    >
                        <span className="ss-nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            <div className="ss-nav-section">
                <div className="ss-nav-label">Ledger</div>
                {navLedger.map(item => (
                    <button 
                        key={item.label} 
                        className={`ss-nav-item ${activeSection === item.section ? 'active' : ''}`} 
                        onClick={item.action}
                    >
                        <span className="ss-nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            <div className="ss-nav-section">
                <div className="ss-nav-label">Management</div>
                {navManagement.map(item => (
                    <button 
                        key={item.label} 
                        className={`ss-nav-item ${activeSection === item.section ? 'active' : ''}`} 
                        onClick={item.action}
                    >
                        <span className="ss-nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}

                {/* Reports Dropdown inside Management */}
                <button 
                    className={`ss-nav-item ${activeSection === 'reports' || isReportsExpanded ? 'active' : ''}`} 
                    onClick={() => {
                        setIsReportsExpanded(!isReportsExpanded);
                    }}
                    style={{ justifyContent: 'space-between' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="ss-nav-icon">{Icon.chart}</span>
                        <span>Reports</span>
                    </div>
                    <span style={{ 
                        transform: isReportsExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        display: 'flex',
                        color: activeSection === 'reports' || isReportsExpanded ? 'var(--accent)' : 'inherit',
                        opacity: activeSection === 'reports' || isReportsExpanded ? 1 : 0.5
                    }}>{Icon.chevron}</span>
                </button>

                {isReportsExpanded && (
                    <div className="ss-nav-submenu">
                        {reportSubItems.map(sub => (
                            <button
                                key={sub.tab}
                                className={`ss-nav-subitem ${activeSection === 'reports' && currentTab === sub.tab ? 'active' : ''}`}
                                onClick={() => navigate(`/reports?tab=${sub.tab}`)}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="ss-sidebar-footer">
                <button 
                    className={`ss-nav-item ${activeSection === 'settings' ? 'active' : ''}`} 
                    onClick={() => navigate('/settings')}
                >
                    <span className="ss-nav-icon">{Icon.settings}</span>
                    <span>Settings</span>
                </button>
                <button className="ss-logout-btn" onClick={handleLogout}>
                    <span className="ss-nav-icon">{Icon.logout}</span>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
