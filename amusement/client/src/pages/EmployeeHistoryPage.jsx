import React from "react";
import "./HistoryPage.css";
import EmployeeSideBar from "../components/EmployeeSideBar";

const EmployeeHistoryPage = () => {
  return (
    <div className="process-page">
      <EmployeeSideBar />
      <div className="page-content">
        <div className="payment-receipts">
          <div className="titles">
            <h2>Payment Receipts</h2>
          </div>
          <div className="details-container">
            <div className="print-container">
              <button type="button" id="print-receipt">Print Receipt</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHistoryPage;
