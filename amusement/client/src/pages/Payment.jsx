import React from "react";
import "./Payment.css";
import GcashLogo from '../assets/gcash-logo.jpg'
import Header from '../assets/header.jpg'
import VisitorSideBar from "../components/VisitorSideBar";
import { useContext, useState } from "react";
import { ProcessContext } from "../context/processContext";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../service/service";

const Payment = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const { tickets, reservationDate } = useContext(ProcessContext)
    const [paymentMethod, setPaymentMethod] = useState("Gcash")

    const subTotal = tickets.reduce((sum, ticket) => sum + ticket.total, 0);

    const handlePlaceOrder = async () => {
        if (!paymentMethod) {
            alert("No selected payment method.")
            return;
        }

        try {
            const data = await placeOrder(reservationDate, subTotal, tickets);
            if (data.success) {
                alert(data.message);
                navigate("/visitor-history");  // Navigate to history page after successful order
            }
        } catch (err) {
            alert(err.response?.data?.message || "An error occurred while placing the order");
        }
    }
 
    return (
        <div className="process-page">
            <VisitorSideBar />
            <div className="page-content">
                <div className="payment">
                    <div className="img-container">
                        <img src={Header} alt="Header" />
                    </div>
                    <div className="titles">
                        <h2>Visitor Details</h2>
                        <span>Booking Date: </span><span id="sub-title-date">{reservationDate}</span>
                    </div>
                    <div className="details-container">
                        <div className="visitor-infos">
                            <label>First Name</label>
                            <input type="text" value={user.firstName} readOnly />
                        </div>
                        <div className="visitor-infos">
                            <label>Last Name</label>
                            <input type="text" value={user.lastName} readOnly />
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
                                {tickets.map((ticket, index) => (
                                    <div className="table-row" key={index}>
                                        <p>{ticket.ticketFor}</p>
                                        <p>{ticket.visitorType}</p>
                                        <p id="price">₱{ticket.price}</p>
                                        <div className="quantity-container">
                                            <span>{ticket.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="sub-total">
                                <span id="label">Sub Total: </span><span>{subTotal}</span>
                            </div>
                        </div>
                    </div>
                    <div className="titles">
                        <h2>Payment Method</h2>
                    </div>
                    <div className="details-container">
                        <div className="payment-method">
                            <input type="radio" id="gcash" value={"Gcash"} onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="gcash">
                                <img src={GcashLogo} id="gcash-logo" alt="Gcash" />
                            </label>
                        </div>
                    </div>
                    <div className="order-container">
                        <button type="button" id="back-page" onClick={() => navigate("/visitor-process")}>Back</button>
                        <button type="submit" id="place-order" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
