import React, { useEffect, useState } from "react";
import "./HistoryPage.css";
import VisitorSideBar from "../components/VisitorSideBar";
import { getReceipts } from "../service/service";
import html2canvas from "html2canvas";

const ReceiptCard = ({ receipt, onDownload }) => {
    const ticketDetails = receipt.ticketDetails || [];
    const total = receipt.TotalAmount || 0;
    const reservedDate = new Date(receipt.ReservedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const transactionDate = new Date(receipt.PaymentDate).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    return (
        <div style={{ marginBottom: 40 }}>
            <div id={`receipt-${receipt.ReceiptID}`} style={{
                background: '#fff',
                border: '2px dashed #e0e0e0',
                borderRadius: 16,
                display: 'flex',
                padding: 32,
                maxWidth: 800,
                marginLeft: 'auto',
                marginRight: 'auto',
                boxShadow: '0 2px 12px #0001',
                position: 'relative',
            }}>
                {/* Left Section */}
                <div style={{ flex: 1, paddingRight: 32, borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ color: '#8e24aa', fontSize: 40, marginBottom: 8 }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8e24aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
                    </div>
                    <div style={{ fontSize: 15, marginBottom: 4 }}>Receipt ID: <span style={{ fontFamily: 'monospace', color: '#333' }}>#{receipt.ReceiptID}</span></div>
                    <div style={{ fontSize: 15, marginBottom: 4 }}>Reserved Date: <span style={{ color: '#8e24aa', fontWeight: 600 }}>{reservedDate}</span></div>
                </div>
                {/* Right Section */}
                <div style={{ flex: 2, paddingLeft: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Summary of Ticket Order</div>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#fafafa', borderRadius: 12, marginBottom: 16 }}>
                        <thead>
                            <tr style={{ background: '#f5f5f5' }}>
                                <th style={{ textAlign: 'left', padding: 12, fontWeight: 600, color: '#444', fontSize: 15 }}>TICKET TYPE</th>
                                <th style={{ textAlign: 'center', padding: 12, fontWeight: 600, color: '#444', fontSize: 15 }}>QTY</th>
                                <th style={{ textAlign: 'right', padding: 12, fontWeight: 600, color: '#444', fontSize: 15 }}>PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketDetails.map((t, i) => (
                                <tr key={i}>
                                    <td style={{ padding: 10, fontSize: 15 }}>{t.type}</td>
                                    <td style={{ textAlign: 'center', padding: 10, fontSize: 15 }}>{t.qty}</td>
                                    <td style={{ textAlign: 'right', padding: 10, fontSize: 15 }}>₱{Number(t.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, borderTop: '1px dashed #bbb', borderBottom: '1px dashed #bbb', padding: '16px 0' }}>
                        <div style={{ fontWeight: 700, fontSize: 22 }}>Total:</div>
                        <div style={{ fontWeight: 700, fontSize: 28, color: '#8e24aa' }}>₱{Number(total).toFixed(2)}</div>
                    </div>
                    <div style={{ marginTop: 24, color: '#666', fontSize: 14, textAlign: 'right' }}>
                        Transaction Date: {transactionDate}
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
                <button style={{ background: '#8e24aa', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => onDownload(receipt.ReceiptID)}>
                    Download as Image
                </button>
            </div>
        </div>
    );
};

const HistoryPage = () => {
    const [receipts, setReceipts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        async function fetchReceipts() {
            const data = await getReceipts(user.id);
            // Sort receipts by ReceiptID in descending order
            const sortedReceipts = data.receipts.sort((a, b) => b.ReceiptID - a.ReceiptID);
            setReceipts(sortedReceipts);
        }
        fetchReceipts();
    }, [user.id]);

    const downloadReceipt = (id) => {
        const element = document.getElementById(`receipt-${id}`);
        html2canvas(element, { backgroundColor: null, scale: 2 }).then((canvas) => {
            const link = document.createElement("a");
            link.download = `receipt-${id}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    return (
        <div className="process-page">
            <VisitorSideBar />
            <div className="page-content">
                <div className="payment-receipts">
                    <div className="titles">
                        <h2>Receipts</h2>
                    </div>
                    <div className="details-container">
                        <div style={{ width: '100%' }}>
                            {receipts.map((r) => (
                                <ReceiptCard key={r.ReceiptID} receipt={r} onDownload={downloadReceipt} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
