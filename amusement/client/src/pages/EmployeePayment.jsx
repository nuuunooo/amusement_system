import React from "react";
import "./EmployeePayment.css";
import GcashLogo from '../assets/gcash-logo.jpg'
import Header from '../assets/header.jpg'
import EmployeeSideBar from "../components/EmployeeSideBar";

const EmployeePaymentPage = () => {
  return (
    <div className="process-page">
      <EmployeeSideBar />
      <div className="page-content">
        <div className="payment">
          <div className="img-container">
            <img src={Header} alt="Header" />
          </div>
          <div className="titles">
            <h2>Visitor Details</h2>
            <span>Booking Date: </span>
            <span id="sub-title-date">June 13, 2025</span>
          </div>
          <div className="details-container">
            <div className="visitor-infos">
              <label>First Name</label>
              <input type="text" value="" readOnly />
            </div>
            <div className="visitor-infos">
              <label>Last Name</label>
              <input type="text" value="" readOnly />
            </div>
          </div>
          <div className="titles">
            <h2>Processing Summary</h2>
          </div>
          <div className="details-container">
            <div className="display-tickets">
              <div className="table-header">
                <h4>Ticket Type</h4>
                <h4>Visitor Type</h4>
                <h4>Price</h4>
                <h4>Quantity</h4>
              </div>
              <div className="table-body">
                <div className="table-row">
                  <p>One Day Pass</p>
                  <p>Adult</p>
                  <p id="price">1,500</p>
                  <div className="quantity-container">
                    <span>1</span>
                  </div>
                </div>
                <div className="table-row">
                  <p>One Day Pass</p>
                  <p>Child</p>
                  <p id="price">1,5020</p>
                  <div className="quantity-container">
                    <span>1</span>
                  </div>
                </div>
              </div>
              <div className="sub-total">
                <span id="label">Sub Total: </span>
                <span>4000</span>
              </div>
            </div>
          </div>
          <div className="titles">
            <h2>Payment Method</h2>
          </div>
          <div className="details-container payments">
            <div className="payment-method">
              <input type="radio" id="gcash" />
              <label htmlFor="gcash">
                <img src={GcashLogo} id="gcash-logo" alt="GCash" />
              </label>
            </div>
            <div className="horizontal-line"></div>
            <div className="cash-payment">
              <span>CASH</span>
              <div className="cash-payment-container">
                <div className="payment-inputs">
                  <label>Total Amount: </label>
                  <input type="number" readOnly />
                </div>
                <div className="payment-inputs">
                  <label>Cash Received: </label>
                  <input type="number" readOnly />
                </div>
                <div className="payment-inputs">
                  <label>Change: </label>
                  <input type="number" readOnly />
                </div>
              </div>
            </div>
          </div>
          <div className="order-container">
            <button type="button" id="back-page">
              Back
            </button>
            <button type="submit" id="place-order">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePaymentPage;
