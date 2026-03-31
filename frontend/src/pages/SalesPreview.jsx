import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import '../styles/SalesPreview.css';
import { ToastContainer } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';
import Icon from '../components/common/Icons';

const numberToWords = (num) => {
    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const h = (n) => {
        if (n === 0) return '';
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
        return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + h(n % 100) : '');
    };
    if (num === 0) return 'Zero';
    let res = '';
    if (num >= 1000) { res += h(Math.floor(num / 1000)) + ' Thousand '; num %= 1000; }
    res += h(num);
    return res.trim() + ' Only';
};

const SalesPreview = ({ theme, onToggleTheme }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const [vatBill, setVatBill] = useState(null);
    const [activeType, setActiveType] = useState('Invoice'); // 'Invoice' or 'VAT Bill'
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const paperRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Invoice
                const invResponse = await fetch(`http://localhost:8000/invoices/${id}`, {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                const invResult = await invResponse.json();
                if (invResult.success) setInvoice(invResult.invoice);
                
                // Fetch VAT Bill
                const vatResponse = await fetch(`http://localhost:8000/vat_bills/invoice/${id}`, {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                const vatResult = await vatResponse.json();
                if (vatResult.success) setVatBill(vatResult.bill);

                if (!invResult.success) handleError(invResult.message);
            } catch { handleError('Failed to load data'); }
            finally { setLoading(false); }
        };
        fetchData();
    }, [id]);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const canvas = await html2canvas(paperRef.current, { scale: 2 });
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
            pdf.save(`${activeType}_${invoice?.invoiceNo || 'Bill'}.pdf`);
            handleSuccess('Downloaded');
        } catch { handleError('Download failed'); }
        finally { setDownloading(false); }
    };

    if (loading) return <div>Loading...</div>;
    if (!invoice) return <div>Not Found</div>;

    const today = new Date().toLocaleDateString('en-GB');
    const isVat = activeType === 'VAT Bill';
    const displayData = isVat ? vatBill : invoice;

    if (isVat && !vatBill) return (
        <div className="ss-layout">
            <Sidebar activeSection="sales" />
            <div className="ss-main">
                <Topbar title="Preview" onToggleTheme={onToggleTheme} isDark={theme === 'dark'} backAction={() => navigate('/sales')} />
                <div className="ss-content">
                    <div className="invoice-preview-container">
                        <div className="preview-header-actions">
                            <div className="ss-segmented-control" style={{ width: '250px' }}>
                                <button className={activeType === 'Invoice' ? 'active' : ''} onClick={() => setActiveType('Invoice')}>Invoice</button>
                                <button className={activeType === 'VAT Bill' ? 'active' : ''} onClick={() => setActiveType('VAT Bill')}>VAT Bill</button>
                            </div>
                        </div>
                        <div style={{ padding: '40px', textAlign: 'center' }}>VAT Bill not found for this invoice.</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="ss-layout">
            <Sidebar activeSection="sales" />

            <div className="ss-main">
                <Topbar 
                    title="Invoice Preview"
                    onToggleTheme={onToggleTheme}
                    isDark={theme === 'dark'}
                    backAction={() => navigate('/sales')}
                />

                <div className="ss-content">
                    <div className="invoice-preview-container">
                        <div className="preview-header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div className="ss-segmented-control">
                                <button className={activeType === 'Invoice' ? 'active' : ''} onClick={() => setActiveType('Invoice')}>Invoice</button>
                                <button className={activeType === 'VAT Bill' ? 'active' : ''} onClick={() => setActiveType('VAT Bill')}>VAT Bill</button>
                            </div>
                            <button className="ss-btn-success" onClick={handleDownload} disabled={downloading} style={{ background: '#eab308', borderColor: '#eab308', color: '#fff', padding: '12px 24px', borderRadius: '12px', fontWeight: 600 }}>
                                {downloading ? 'Please wait...' : 'Download PDF'}
                            </button>
                        </div>
                        <div className="a4-paper" ref={paperRef}>
                            <div className="simple-header">
                                <div className="header-left">
                                    <img src="/logo.png" alt="logo" style={{ maxHeight: '40px', marginBottom: '10px' }} />
                                    {isVat && <h2 style={{ color: 'var(--accent)', marginBottom: '8px', fontSize: '18px' }}>VAT INVOICE (Tax Copy)</h2>}
                                    <p>{isVat ? 'VAT Bill No' : 'Bill Number'}: {invoice.invoiceNo}</p>
                                    <p>Seller's PAN : {invoice.businessPan || '-'}</p>
                                    <p>Seller's Name: {invoice.businessName}</p>
                                    <p>Address: {invoice.businessAddress || 'Lalitpur, Nepal'}</p>
                                </div>
                                <div className="header-right">
                                    {!isVat && (
                                        <div className="qr-code-box">
                                            <img src="/qr-code.png" alt="Payment QR" onError={(e) => e.target.style.display='none'} />
                                            <p style={{ fontSize: '10px', marginTop: '4px', textAlign: 'center' }}>Scan to Pay</p>
                                        </div>
                                    )}
                                    <p>Transactions Date: {today}</p>
                                    <p>Issue Date: {new Date(invoice.invoiceDate).toLocaleDateString('en-GB')}</p>
                                </div>
                            </div>

                            <div className="purchaser-info">
                                <p>Purchaser's Name: {invoice.partyName}</p>
                                <p>Address: -</p>
                                <p>Purchaser's PAN / TPIN: -</p>
                            </div>

                            <div className="payment-method">
                                {isVat ? 'Generated based on Cost Price + 20% Markup' : `Method of payment: ${invoice.paymentMode || 'Cash'}`}
                            </div>

                            <table className="grid-table">
                                <thead>
                                    {isVat ? (
                                        <tr>
                                            <th className="text-center" style={{ width: '40px' }}>S.N.</th>
                                            <th>Particulars</th>
                                            <th className="text-center">Qty.</th>
                                            <th className="text-right">Rate (Rs.)</th>
                                            <th className="text-right">Amount (Rs.)</th>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <th className="text-center" style={{ width: '40px' }}>S.N.</th>
                                            <th>Details</th>
                                            <th className="text-center">Quantity</th>
                                            <th className="text-right">Per Unit Amount (Rs)</th>
                                            <th className="text-right">Total Amount (Rs)</th>
                                        </tr>
                                    )}
                                </thead>
                                <tbody>
                                    {displayData.items.map((item, idx) => {
                                        if (isVat) {
                                            const lineAmt = item.purchasePrice * item.quantity;
                                            return (
                                                <tr key={idx}>
                                                    <td className="text-center">{idx + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td className="text-center">{item.quantity}</td>
                                                    <td className="text-right">{item.purchasePrice.toFixed(2)}</td>
                                                    <td className="text-right">{lineAmt.toFixed(2)}</td>
                                                </tr>
                                            );
                                        } else {
                                            return (
                                                <tr key={idx}>
                                                    <td className="text-center">{idx + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td className="text-center">{item.quantity} pc</td>
                                                    <td className="text-right">{item.rate.toFixed(2)}</td>
                                                    <td className="text-right">{item.amount.toFixed(2)}</td>
                                                </tr>
                                            );
                                        }
                                    })}
                                    
                                    {!isVat && (
                                        <tr>
                                            <td colSpan="2" style={{ border: 'none' }}></td>
                                            <td colSpan="2" className="text-right"><strong>Discount</strong></td>
                                            <td className="text-right"><strong>Rs. {((invoice.subTotal || 0) - (invoice.totalAmount || 0)).toFixed(2)}</strong></td>
                                        </tr>
                                    )}

                                    <tr>
                                        <td colSpan="2" style={{ border: 'none' }}></td>
                                        <td colSpan="2" className="text-right" style={{ background: isVat ? 'transparent' : '#f8fafc' }}>
                                            <strong>{isVat ? 'Taxable Value' : 'Total'}</strong>
                                        </td>
                                        <td className="text-right" style={{ background: isVat ? 'transparent' : '#f8fafc', fontWeight: isVat ? 600 : 800 }}>
                                            Rs. {(isVat ? vatBill.subTotalPurchase : invoice.totalAmount).toFixed(2)}
                                        </td>
                                    </tr>

                                    {isVat && (
                                        <>
                                            <tr>
                                                <td colSpan="2" style={{ border: 'none' }}></td>
                                                <td colSpan="2" className="text-right"><strong>VAT 13%</strong></td>
                                                <td className="text-right">Rs. {vatBill.totalVat.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style={{ border: 'none' }}></td>
                                                <td colSpan="2" className="text-right" style={{ background: '#f8fafc' }}><strong>GRAND TOTAL</strong></td>
                                                <td className="text-right" style={{ background: '#f8fafc', fontWeight: 800 }}>Rs. {vatBill.grandTotal.toFixed(2)}</td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>

                            <div className="simple-footer">
                                <div className="words-container">
                                    ( In words : {numberToWords(Math.round(isVat ? vatBill.grandTotal : invoice.totalAmount))} ................................................................ )
                                </div>
                                <div className="signature-section">
                                    <div className="signature-line"></div>
                                    <p><strong>{isVat ? 'Authorized Signatory' : 'Authorized Signature'}</strong></p>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesPreview;
