import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import '../styles/SalesPreview.css';
import { ToastContainer } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Sidebar from '../components/common/Sidebar';
import Topbar from '../components/common/Topbar';

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

const PurchasePreview = ({ theme, onToggleTheme }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [purchase, setPurchase] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const purchaseRef = useRef(null);

    useEffect(() => {
        const fetchPurchase = async () => {
            try {
                const response = await fetch(`http://localhost:8000/purchases/${id}`, {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                const result = await response.json();
                if (result.success) setPurchase(result.purchase);
                else handleError(result.message);
            } catch { handleError('Failed to load purchase bill'); }
            finally { setLoading(false); }
        };
        fetchPurchase();
    }, [id]);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const canvas = await html2canvas(purchaseRef.current, { scale: 2 });
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
            pdf.save(`Purchase_Bill_${purchase.purchaseNo}.pdf`);
            handleSuccess('Downloaded');
        } catch { handleError('Download failed'); }
        finally { setDownloading(false); }
    };

    if (loading) return <div>Loading...</div>;
    if (!purchase) return <div>Not Found</div>;

    const today = new Date().toLocaleDateString('en-GB');

    return (
        <div className="ss-layout">
            <Sidebar activeSection="purchase" />

            <div className="ss-main">
                <Topbar 
                    title="Purchase Bill Preview"
                    onToggleTheme={onToggleTheme}
                    isDark={theme === 'dark'}
                    backAction={() => navigate('/purchase')}
                />

                <div className="ss-content">
                    <div className="invoice-preview-container">
                        <div className="preview-actions">
                            <button className="ss-btn-success" onClick={handleDownload} disabled={downloading}>
                                {downloading ? 'Please wait...' : 'Download PDF'}
                            </button>
                        </div>
            <div className="a4-paper" ref={purchaseRef}>
                <div className="simple-header">
                    <div className="header-left">
                        <img src="/logo.png" alt="logo" style={{ maxHeight: '40px', marginBottom: '10px' }} />
                        <p>Purchase Bill Number: {purchase.purchaseNo}</p>
                        <p>Supplier's PAN : -</p>
                        <p>Supplier's Name: {purchase.partyName}</p>
                    </div>
                    <div className="header-right">
                        <p>Transactions Date: {today}</p>
                        <p>Bill Issue Date: {new Date(purchase.purchaseDate).toLocaleDateString('en-GB')}</p>
                    </div>
                </div>

                <div className="purchaser-info">
                    <p>Purchaser's Name: SmartStock Inc.</p>
                </div>

                <div className="payment-method">Method of payment: {purchase.paymentMode || 'Cash'}</div>

                <table className="grid-table">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '40px' }}>S.N.</th>
                            <th>Details</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-right">Per Unit Amount (Rs)</th>
                            <th className="text-right">Total Amount (Rs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchase.items.map((item, idx) => (
                            <tr key={idx}>
                                <td className="text-center">{idx + 1}</td>
                                <td>{item.name}</td>
                                <td className="text-center">{item.quantity} pc</td>
                                <td className="text-right">{item.rate.toFixed(2)}</td>
                                <td className="text-right">{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2" style={{ border: 'none' }}></td>
                            <td colSpan="2" className="text-right"><strong>Discount</strong></td>
                            <td className="text-right"><strong>{purchase.items.reduce((acc, item) => acc + (item.discountAmount || 0), 0).toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ border: 'none' }}></td>
                            <td colSpan="2" className="text-right"><strong>Sub Total</strong></td>
                            <td className="text-right">{purchase.subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ border: 'none' }}></td>
                            <td colSpan="2" className="text-right"><strong>Total</strong></td>
                            <td className="text-right">{purchase.totalAmount.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="simple-footer">
                    <div className="words-container">
                        ( In words : {numberToWords(Math.round(purchase.totalAmount))} ................................................................ )
                    </div>
                    <div className="signature-section">
                        <div className="signature-line"></div>
                        <p><strong>Authorized Signature</strong></p>
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

export default PurchasePreview;
