import React from 'react';
import { Icon } from '../Icons';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", cancelText = "Cancel", type = "danger" }) => {
    if (!isOpen) return null;

    return (
        <div className="ss-modal-overlay">
            <div className="ss-modal" style={{ width: '400px' }}>
                <div className="ss-modal-head">
                    <div className="ss-card-title">{title}</div>
                    <button 
                        onClick={onClose} 
                        className="ss-btn-ghost"
                        style={{ padding: '4px', borderRadius: '50%', width: '32px', height: '32px', display: 'grid', placeItems: 'center' }}
                    >
                        {Icon.close}
                    </button>
                </div>
                
                <div style={{ marginTop: '20px', marginBottom: '24px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
                        {message}
                    </p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button 
                        onClick={onClose}
                        className="ss-btn-ghost"
                    >
                        {cancelText}
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="ss-btn-primary"
                        style={type === 'danger' ? { background: 'linear-gradient(135deg, #ef4444, #f43f5e)', border: '1px solid #dc2626' } : {}}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
