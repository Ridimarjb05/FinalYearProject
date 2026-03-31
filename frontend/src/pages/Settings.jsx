import React, { useState, useEffect } from 'react'

import { handleError, handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'
import '../styles/Settings.css'

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

function Settings({ theme, onToggleTheme }) {

    const [activeTab, setActiveTab] = useState('general')
    const [user, setUser] = useState({ name: '', businessName: '', email: '', pan: '', address: '' })
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })


    async function fetchUserProfile() {
        try {
            const response = await fetch('http://localhost:8000/users/profile', {
                headers: { 'Authorization': localStorage.getItem('token') }
            })
            const result = await response.json()
            if (result.success) {
                setUser(result.user)
            }
        } catch {
            handleError("Failed to fetch profile")
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUserProfile()
    }, [])

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/users/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ 
                    name: user.name, 
                    businessName: user.businessName,
                    pan: user.pan,
                    address: user.address
                })
            })
            const result = await response.json()
            if (result.success) {
                handleSuccess(result.message)
                localStorage.setItem('loggedInUser', user.name)
                localStorage.setItem('businessName', user.businessName)
            } else {
                handleError(result.message)
            }
        } catch {
            handleError("Update failed")
        }
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        if (passwords.newPassword !== passwords.confirmPassword) {
            return handleError("Passwords do not match")
        }
        try {
            const response = await fetch('http://localhost:8000/users/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ oldPassword: passwords.oldPassword, newPassword: passwords.newPassword })
            })
            const result = await response.json()
            if (result.success) {
                handleSuccess(result.message)
                setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' })
            } else {
                handleError(result.message)
            }
        } catch {
            handleError("Password update failed")
        }
    }


    const tabs = [
        { id: 'general', label: 'General', icon: Icon.settings },
        { id: 'account', label: 'My Account', icon: Icon.user },
        { id: 'business', label: 'Business Profile', icon: Icon.briefcase },
    ]

    return (
        <div className="ss-layout">
            <Sidebar activeSection="settings" />

            <div className="ss-main">
                <Topbar 
                    title="Settings" 
                    onToggleTheme={onToggleTheme}
                    isDark={theme === 'dark'}
                />

                <div className="ss-content">
                    <div className="settings-container">
                        <aside className="settings-nav">
                            <div className="settings-nav-header">Settings</div>
                            <div className="settings-nav-items">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        className={`settings-nav-button ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <span className="nav-button-icon">{tab.icon}</span>
                                        <span className="nav-button-label">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </aside>

                        <main className="settings-view">
                            {activeTab === 'general' && (
                                <div className="settings-panel animate-slide-up">
                                    <header className="panel-header">
                                        <h2>General Settings</h2>
                                        <p>Personalize your workspace preferences.</p>
                                    </header>

                                    <section className="panel-section">
                                        <div className="section-title">Appearance</div>
                                        <div className="theme-grid">
                                            <div 
                                                className={`theme-option ${theme === 'light' ? 'selected' : ''}`}
                                                onClick={() => theme !== 'light' && onToggleTheme()}
                                            >
                                                <div className="theme-preview-box light">
                                                    <div className="preview-indicator"></div>
                                                </div>
                                                <div className="theme-label">Light Mode</div>
                                            </div>
                                            <div 
                                                className={`theme-option ${theme === 'dark' ? 'selected' : ''}`}
                                                onClick={() => theme !== 'dark' && onToggleTheme()}
                                            >
                                                <div className="theme-preview-box dark">
                                                    <div className="preview-indicator"></div>
                                                </div>
                                                <div className="theme-label">Dark Mode</div>
                                            </div>
                                        </div>
                                    </section>


                                </div>
                            )}

                            {activeTab === 'account' && (
                                <div className="settings-panel animate-slide-up">
                                    <header className="panel-header">
                                        <h2>Account Settings</h2>
                                        <p>Manage your personal information and security.</p>
                                    </header>

                                    <section className="panel-section">
                                        <div className="section-title">Profile Information</div>
                                        <form onSubmit={handleUpdateProfile} className="settings-form">
                                            <div className="ss-form-group">
                                                <label className="ss-form-label">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    className="ss-form-input"
                                                    value={user.name}
                                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div className="ss-form-group">
                                                <label className="ss-form-label">Email Address</label>
                                                <input type="email" className="ss-form-input readonly" value={user.email} disabled />
                                                <p className="field-hint">Your email is used for login and cannot be changed.</p>
                                            </div>
                                            <button type="submit" className="ss-btn-success">Save Changes</button>
                                        </form>
                                    </section>

                                    <section className="panel-section">
                                        <div className="section-title">Security</div>
                                        <form onSubmit={handleUpdatePassword} className="settings-form">
                                            <div className="ss-form-group">
                                                <label className="ss-form-label">Old Password</label>
                                                <input 
                                                    type="password" 
                                                    className="ss-form-input"
                                                    value={passwords.oldPassword}
                                                    onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                            <div className="grid-2">
                                                <div className="ss-form-group">
                                                    <label className="ss-form-label">New Password</label>
                                                    <input 
                                                        type="password" 
                                                        className="ss-form-input"
                                                        value={passwords.newPassword}
                                                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                                <div className="ss-form-group">
                                                    <label className="ss-form-label">Confirm Password</label>
                                                    <input 
                                                        type="password" 
                                                        className="ss-form-input"
                                                        value={passwords.confirmPassword}
                                                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                            <button type="submit" className="ss-btn-save-new">Update Password</button>
                                        </form>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'business' && (
                                <div className="settings-panel animate-slide-up">
                                    <header className="panel-header">
                                        <h2>Business Profile</h2>
                                        <p>Customize how your business appears on invoices.</p>
                                    </header>

                                    <section className="panel-section">
                                        <div className="section-title">Business Identity</div>
                                        <form onSubmit={handleUpdateProfile} className="settings-form">
                                            <div className="ss-form-group">
                                                <label className="ss-form-label">Business Name</label>
                                                <input 
                                                    type="text" 
                                                    className="ss-form-input"
                                                    value={user.businessName}
                                                    onChange={(e) => setUser({ ...user, businessName: e.target.value })}
                                                    placeholder="SmartStock Inc."
                                                />
                                            </div>
                                            <div className="ss-form-group">
                                                <label className="ss-form-label">Registered Address</label>
                                                <input 
                                                    type="text" 
                                                    className="ss-form-input" 
                                                    placeholder="Lalitpur, Nepal" 
                                                    value={user.address || ''}
                                                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                                                />
                                            </div>
                                            <div className="ss-form-group">
                                                <label className="ss-form-label">PAN / TPIN Number</label>
                                                <input 
                                                    type="text" 
                                                    className="ss-form-input" 
                                                    placeholder="Enter 9-digit PAN" 
                                                    value={user.pan || ''}
                                                    onChange={(e) => setUser({ ...user, pan: e.target.value })}
                                                />
                                            </div>
                                            <button type="submit" className="ss-btn-success">Save Business Details</button>
                                        </form>
                                    </section>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Settings;
