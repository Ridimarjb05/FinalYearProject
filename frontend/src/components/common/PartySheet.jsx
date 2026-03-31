import React, { useState, useEffect } from 'react';
import Icon from './Icons';

function PartySheet({ isOpen, onClose, onSelect, parties = [], theme = 'light' }) {
    const [search, setSearch] = useState('');

    const filteredParties = parties.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        (p.phone && p.phone.includes(search))
    );

    if (!isOpen) return null;

    return (
        <div className={`ss-sheet-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="ss-sheet" onClick={(e) => e.stopPropagation()}>
                <div className="ss-sheet-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button className="ss-sheet-close" onClick={onClose}>{Icon.arrowLeft}</button>
                        <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Select Party</h2>
                    </div>
                </div>

                <div className="ss-sheet-body">
                    <div className="ss-sheet-search-wrap">
                        <span className="ss-sheet-search-icon">{Icon.search}</span>
                        <input 
                            type="text" 
                            className="ss-sheet-search" 
                            placeholder="Search party by name or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="ss-party-grid">
                        {filteredParties.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                No parties found.
                            </div>
                        ) : (
                            filteredParties.map(party => (
                                <div 
                                    key={party._id} 
                                    className="ss-party-card-select"
                                    onClick={() => {
                                        onSelect(party);
                                        onClose();
                                    }}
                                >
                                    <div className="ss-party-card-avatar">
                                        {party.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ss-party-card-info">
                                        <div className="ss-party-card-name">{party.name}</div>
                                        <div className="ss-party-card-phone">{party.phone || 'No phone'}</div>
                                    </div>
                                    <div className="ss-party-card-balance">
                                        <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Balance</div>
                                        <div style={{ fontWeight: 700, color: (party.balance || 0) > 0 ? 'var(--pos)' : (party.balance || 0) < 0 ? 'var(--neg)' : 'var(--text-primary)' }}>
                                            Rs. {Math.abs(party.balance || 0).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .ss-sheet-overlay {
                    position: fixed;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.25s ease;
                    backdrop-filter: blur(2px);
                }
                .ss-sheet-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }
                .ss-sheet {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                    width: 400px;
                    background: var(--card-bg);
                    box-shadow: -10px 0 30px rgba(0,0,0,0.1);
                    transform: translateX(100%);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                }
                .ss-sheet-overlay.active .ss-sheet {
                    transform: translateX(0);
                }
                .ss-sheet-header {
                    padding: 20px;
                    border-bottom: 1px solid var(--border);
                }
                .ss-sheet-close {
                    background: transparent;
                    border: none;
                    color: var(--text-primary);
                    cursor: pointer;
                    display: grid;
                    place-items: center;
                }
                .ss-sheet-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .ss-sheet-search-wrap {
                    position: relative;
                }
                .ss-sheet-search-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                }
                .ss-sheet-search {
                    width: 100%;
                    padding: 12px 14px 12px 42px;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    background: var(--input-bg);
                    color: var(--text-primary);
                    outline: none;
                    font-size: 14px;
                }
                .ss-sheet-search:focus {
                    border-color: var(--accent);
                }
                .ss-party-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .ss-party-card-select {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px;
                    border-radius: 12px;
                    border: 1px solid var(--border);
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .ss-party-card-select:hover {
                    background: var(--hover);
                    border-color: var(--accent);
                    transform: scale(1.01);
                }
                .ss-party-card-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--accent-soft);
                    color: var(--accent);
                    display: grid;
                    place-items: center;
                    font-weight: 700;
                    flex-shrink: 0;
                }
                .ss-party-card-info {
                    flex: 1;
                }
                .ss-party-card-name {
                    font-weight: 700;
                    font-size: 14px;
                    color: var(--text-primary);
                }
                .ss-party-card-phone {
                    font-size: 12px;
                    color: var(--text-muted);
                }
                .ss-party-card-balance {
                    text-align: right;
                }
            `}</style>
        </div>
    );
}

export default PartySheet;
