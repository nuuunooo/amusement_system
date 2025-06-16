import React, { useEffect, useState } from 'react';
import './AdminSales.css';
import AdminSideBar from '../components/AdminSideBar';
import { getSalesSummary } from '../service/service';

const AdminSales = () => {
  const [sales, setSales] = useState({
    totalSales: 0,
    monthlySales: 0,
    annualSales: 0,
  });

  useEffect(() => {
    async function fetchSales() {
      try {
        const data = await getSalesSummary();
        setSales({
          totalSales: data.totalSales || 0,
          monthlySales: data.monthlySales || 0,
          annualSales: data.annualSales || 0,
        });
      } catch (err) {
        alert("Failed to fetch sales data");
      }
    }
    fetchSales();
  }, []);

  const formatPeso = (amount) =>
    "₱" + Number(amount).toLocaleString("en-PH", { minimumFractionDigits: 0 });

  return (
    <div className='process-page'>
      <AdminSideBar />
      <div className='page-content'>
        <div style={{ margin: '40px' }}>
          <h1>Sales Report</h1>
          <div className="cards-container">
            <div className="card-sales first">
              <div className="card-info">
                <div className="card-label">Total Sales</div>
                <div className="card-value">{formatPeso(sales.totalSales)}</div>
              </div>
            </div>
            <div className="card-sales second">
              <div className="card-info">
                <div className="card-label">Monthly Sales</div>
                <div className="card-value">{formatPeso(sales.monthlySales)}</div>
              </div>
            </div>
            <div className="card-sales third">
              <div className="card-info">
                <div className="card-label">Annual Sales</div>
                <div className="card-value">{formatPeso(sales.annualSales)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSales;
