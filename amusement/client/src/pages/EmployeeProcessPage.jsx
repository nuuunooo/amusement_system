import React from "react";
import "./EmployeeProcessPage.css";
import "flatpickr/dist/flatpickr.min.css";
import EmployeeSideBar from "../components/EmployeeSideBar";

const EmployeeProcessPage = () => {
    return (
        <div className="process-page">
            <EmployeeSideBar />
            <div className="page-content">
                <div className="reservation">
                    <div className="process-ticket">
                        <div className="process-ticket-header employee">
                            <h3>Employee Information</h3>
                        </div>
                        <div className="process-body">
                            <div className="process-input-employee">
                                <div className="input-fields">
                                    <label className="input-labels">First name</label>
                                    <input type="text" placeholder="Enter your first name" readOnly />
                                </div>
                                <div className="input-fields">
                                    <label className="input-labels">Last name</label>
                                    <input type="text" placeholder="Enter your last name" readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="process-ticket">
                        <div className="process-ticket-header">
                            <h3>Process your Ticket</h3>
                        </div>
                        <div className="process-body">
                            <form>
                                <div className="process-input-employee">
                                    <div className="input-fields">
                                        <label className="input-labels">First name</label>
                                        <input type="text" placeholder="Enter your first name" />
                                    </div>
                                    <div className="input-fields">
                                        <label className="input-labels">Last name</label>
                                        <input type="text" placeholder="Enter your last name" />
                                    </div>
                                </div>
                                <div className="process-input-employee">
                                    <div className="input-fields">
                                        <label className="input-labels">Visitor Type</label>
                                        <select>
                                            <option>For Adult</option>
                                            <option>For Child</option>
                                        </select>
                                    </div>
                                    <div className="input-fields row-employee">
                                        <div className="selection">
                                            <label className="input-labels">Ticket For</label>
                                            <select className="dropdown">
                                                <option>One Day Pass</option>
                                                <option>One Year Pass</option>
                                            </select>
                                        </div>
                                        <div className="selection">
                                            <label className="input-labels">Quantity</label>
                                            <input id="quantity" type="number" value="1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="add-ticket">
                                    <button type="submit">Add Ticket</button>
                                </div>
                            </form>
                            <form>
                                <div className="display-tickets">
                                    <div className="table-header">
                                        <h4>Ticket Type</h4>
                                        <h4>Visitor Type</h4>
                                        <h4>Price</h4>
                                        <h4>Quantity</h4>
                                        <div className="delete-space"></div>
                                    </div>
                                    <div className="table-body">
                                        <div className="table-row">
                                            <p>One Day Pass</p>
                                            <p>Adult</p>
                                            <p>1,500</p>
                                            <div className="quantity-container">
                                                <button>-</button>
                                                <span>1</span>
                                                <button>+</button>
                                            </div>
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red">
                                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="table-row">
                                            <p>One Day Pass</p>
                                            <p>Child</p>
                                            <p>1,5020</p>
                                            <div className="quantity-container">
                                                <button>-</button>
                                                <span>1</span>
                                                <button>+</button>
                                            </div>
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red">
                                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sub-total">
                                        <span id="label">Sub Total: </span><span>4000</span>
                                    </div>
                                </div>
                                <div className="checkout-container">
                                    <button type="button" id="cancel-checkout">Cancel</button>
                                    <button type="submit" id="checkout">Checkout</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProcessPage;
