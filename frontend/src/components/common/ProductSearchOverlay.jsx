import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icons';

function ProductSearchOverlay({ isOpen, onClose, products = [], onSelect, initialValue = '' }) {
    const [search, setSearch] = useState(initialValue);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const searchRef = useRef(null);

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
    );

    useEffect(() => {
        if (isOpen && searchRef.current) {
            searchRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredProducts.length));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredProducts.length) % Math.max(1, filteredProducts.length));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredProducts.length > 0) {
                onSelect(filteredProducts[selectedIndex]);
                onClose();
            }
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="ss-product-search-root">
            <div className="ss-search-card" onClick={(e) => e.stopPropagation()}>
                <div className="ss-search-header">
                    <span className="ss-search-icon-bg">{Icon.search}</span>
                    <input 
                        ref={searchRef}
                        type="text" 
                        className="ss-search-field" 
                        placeholder="Search items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="ss-results-list">
                    {filteredProducts.length === 0 ? (
                        <div className="ss-no-results">
                            No items found. Click + to add new.
                        </div>
                    ) : (
                        filteredProducts.map((p, idx) => (
                            <div 
                                key={p._id} 
                                className={`ss-result-row ${idx === selectedIndex ? 'active' : ''}`}
                                onClick={() => {
                                    onSelect(p);
                                    onClose();
                                }}
                            >
                                <div className="ss-result-main">
                                    <div className="ss-result-name">{p.name}</div>
                                    <div className="ss-result-meta">
                                        <span className="ss-result-price">Rs. {p.unitPrice?.toFixed(1)}</span>
                                        {p.sku && <span className="ss-result-dot">•</span>}
                                        {p.sku && <span className="ss-result-sku">{p.sku}</span>}
                                    </div>
                                </div>
                                <div className="ss-result-side">
                                    <span style={{ 
                                        padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 800,
                                        background: p.quantity > 5 ? 'var(--accent-soft)' : p.quantity > 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                                        color: p.quantity > 5 ? 'var(--accent)' : p.quantity > 0 ? 'var(--warn)' : 'var(--neg)',
                                        border: '1px solid currentColor',
                                        opacity: 0.8
                                    }}>
                                        {p.quantity} In Stock
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
                .ss-product-search-root {
                    width: 100%;
                    min-width: 320px;
                    z-index: 1000;
                }
                .ss-search-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    box-shadow: 0 12px 60px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1);
                    overflow: hidden;
                    animation: ss-pop-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                    border: 1px solid var(--accent-soft);
                }
                @keyframes ss-pop-in {
                    from { opacity: 0; transform: translateY(12px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .ss-search-header {
                    display: flex;
                    align-items: center;
                    padding: 6px 10px;
                    background: var(--input-bg);
                    border-bottom: 1px solid var(--border);
                    transition: all 0.2s;
                }
                .ss-search-header:focus-within {
                    background: var(--card-bg);
                    border-bottom-color: var(--accent);
                }
                .ss-search-icon-bg {
                    width: 36px;
                    height: 36px;
                    display: grid;
                    place-items: center;
                    color: var(--accent);
                    opacity: 0.7;
                }
                .ss-search-field {
                    flex: 1;
                    padding: 12px 6px;
                    background: transparent;
                    border: none;
                    color: var(--text-primary);
                    outline: none;
                    font-size: 15px;
                    font-weight: 600;
                }
                .ss-results-list {
                    max-height: 280px;
                    overflow-y: auto;
                    padding: 6px;
                }
                .ss-no-results {
                    padding: 30px;
                    text-align: center;
                    color: var(--text-muted);
                    font-size: 13px;
                    font-style: italic;
                }
                .ss-result-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 14px;
                    cursor: pointer;
                    border-radius: 10px;
                    transition: all 0.2s;
                    margin-bottom: 2px;
                }
                .ss-result-row:hover, .ss-result-row.active {
                    background: var(--hover);
                }
                .ss-result-row.active {
                    background: var(--accent-soft);
                    box-shadow: inset 0 0 0 1px var(--accent);
                }
                .ss-result-name {
                    font-weight: 700;
                    font-size: 14px;
                    color: var(--text-primary);
                    margin-bottom: 2px;
                }
                .ss-result-meta {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: var(--text-muted);
                }
                .ss-result-dot { opacity: 0.3; }
                .ss-result-sku { font-family: monospace; font-weight: 600; }
                .ss-result-price { color: var(--accent); font-weight: 700; }
            `}</style>
        </div>
    );
}

export default ProductSearchOverlay;
