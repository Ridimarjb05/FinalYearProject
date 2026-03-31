import React, { useEffect, useState } from 'react';

import { handleError } from '../utils';

import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

function History({ theme = 'light', onToggleTheme }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [startDate, endDate]); // Refresh when dates change

  const fetchLogs = async () => {
    try {
      let url = "http://localhost:8000/history?";
      if (startDate) url += `startDate=${startDate}&`;
      if (endDate) url += `endDate=${endDate}&`;

      const response = await fetch(url, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      const result = await response.json();
      if (result.success) {
        setLogs(result.logs);
      } else {
        handleError(result.message || 'Failed to load history');
      }
    } catch {
      handleError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  const filteredLogs = logs.filter(log => 
    log.resourceName.toLowerCase().includes(search.toLowerCase()) ||
    log.details.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.resource.toLowerCase().includes(search.toLowerCase())
  );

  const getActionColor = (action) => {
    switch (action) {
      case 'CREATE': return '#22c55e';
      case 'UPDATE': return '#eab308';
      case 'DELETE': return '#ef4444';
      case 'UPLOAD': return '#3b82f6';
      case 'TRANSACTION': return '#8b5cf6';
      case 'STOCK_ADJUST': return '#f59e0b';
      case 'PRICE_UPDATE': return '#06b6d4';
      default: return '#64748b';
    }
  };

  return (
    <div className="ss-layout">
      <Sidebar activeSection="history" />

      <div className="ss-main">
        <Topbar 
          title="Audit Trail" 
          onToggleTheme={onToggleTheme}
          isDark={theme === 'dark'}
          search={search}
          setSearch={setSearch}
        />

        <div className="ss-content">
          <div className="ss-card" style={{ minHeight: 'calc(100vh - 160px)', border: 'none', boxShadow: 'none' }}>
            <div className="ss-card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <div className="ss-card-title">Stock & Price Audit Logs</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Detailed tracking of all product adjustments
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div className="ss-form-group" style={{ marginBottom: 0 }}>
                        <label className="ss-form-label" style={{ fontSize: '10px' }}>From Date</label>
                        <input type="date" className="ss-form-input" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ padding: '6px 10px', fontSize: '12px' }} />
                    </div>
                    <div className="ss-form-group" style={{ marginBottom: 0 }}>
                        <label className="ss-form-label" style={{ fontSize: '10px' }}>To Date</label>
                        <input type="date" className="ss-form-input" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ padding: '6px 10px', fontSize: '12px' }} />
                    </div>
                </div>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>Loading history...</div>
            ) : filteredLogs.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>No activities found.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredLogs.map((log) => (
                  <div key={log._id} className="ss-audit-row">
                    <div className="ss-audit-icon" style={{ 
                      background: `${getActionColor(log.action)}15`, 
                      color: getActionColor(log.action)
                    }}>
                      {log.action === 'STOCK_ADJUST' ? Icon.box : log.action === 'PRICE_UPDATE' ? Icon.dollar : Icon.activity}
                    </div>
                    
                    <div className="ss-audit-info">
                      <div className="ss-audit-details">
                        {log.details}
                        {log.action === 'STOCK_ADJUST' && (
                            <span className="ss-audit-values">
                                <span className="ss-val-old">{log.oldValue}</span>
                                {Icon.chevronRight}
                                <span className="ss-val-new">{log.newValue}</span>
                            </span>
                        )}
                        {log.action === 'PRICE_UPDATE' && (
                            <span className="ss-audit-values">
                                <span className="ss-val-old">Rs. {log.oldValue}</span>
                                {Icon.chevronRight}
                                <span className="ss-val-new">Rs. {log.newValue}</span>
                            </span>
                        )}
                      </div>
                      <div className="ss-audit-meta">
                        <span className={`ss-audit-badge`} style={{ background: `${getActionColor(log.action)}15`, color: getActionColor(log.action) }}>
                            {log.action}
                        </span>
                        <span>•</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.resourceName}</span>
                        <span>•</span>
                        <span>{log.resource}</span>
                      </div>
                    </div>

                    <div className="ss-audit-time">
                      <div style={{ fontWeight: 600 }}>{new Date(log.createdAt).toLocaleDateString()}</div>
                      <div style={{ fontSize: '11px' }}>{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <style>{`
            .ss-audit-row {
                display: grid;
                grid-template-columns: auto 1fr auto;
                gap: 20px;
                padding: 16px 20px;
                align-items: center;
                background: var(--card-bg);
                border-radius: 12px;
                border: 1px solid var(--border);
                transition: transform 0.2s;
            }
            .ss-audit-row:hover {
                transform: translateX(4px);
                border-color: var(--accent);
            }
            .ss-audit-icon {
                width: 44px;
                height: 44px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .ss-audit-info {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            .ss-audit-details {
                font-weight: 600;
                font-size: 14.5px;
                display: flex;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
            }
            .ss-audit-values {
                display: flex;
                align-items: center;
                gap: 8px;
                background: var(--input-bg);
                padding: 4px 10px;
                border-radius: 8px;
                font-size: 13px;
                color: var(--text-muted);
            }
            .ss-val-old { text-decoration: line-through; opacity: 0.6; }
            .ss-val-new { font-weight: 700; color: var(--accent); }
            .ss-audit-meta {
                display: flex;
                gap: 12px;
                font-size: 12px;
                color: var(--text-muted);
                align-items: center;
            }
            .ss-audit-badge {
                padding: 2px 8px;
                border-radius: 6px;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
            .ss-audit-time {
                text-align: right;
                font-size: 13px;
                color: var(--text-muted);
            }
        `}</style>
      </div>
    </div>
  );
}

export default History;
