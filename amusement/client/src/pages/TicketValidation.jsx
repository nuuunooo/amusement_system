import React from "react";
import "./TicketValidation.css";
import EmployeeSideBar from "../components/EmployeeSideBar";

const TicketValidation = () => {
  return (
    <div className="process-page">
      <EmployeeSideBar />

      <div className="page-content">
        <div className="card-validate">
          <div className="icon-wrapper" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M21 7v10c0 1.1-.9 2-2 2h-14c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2Zm-4 4h-6v2h6v-2Z" />
            </svg>
          </div>
          <h2>Ticket Validation</h2>
          <p className="subtitle">Enter the receipt number to validate visitor ticket</p>

          <form className="form">
            <label htmlFor="receipt-number">Receipt Number</label>
            <div className="input-group">
              <input
                type="text"
                id="receipt-number"
                name="receipt-number"
                placeholder="Enter receipt number (e.g., RCP-2024-001234)"
                aria-describedby="receiptHelp"
                autoComplete="off"
              />
              <button type="submit" aria-label="Validate receipt number">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm8.707 15.293-4.82-4.82a7.963 7.963 0 0 0 1.24-4.473 8 8 0 1 0-8 8 7.963 7.963 0 0 0 4.473-1.24l4.82 4.82a1 1 0 1 0 1.414-1.414Z"/>
                </svg>
                Validate
              </button>
            </div>

            <div className="action-buttons">
              <button type="reset" className="clear-btn">Clear Form</button>
              <button type="button" className="validate-btn">Validate Form</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketValidation;
