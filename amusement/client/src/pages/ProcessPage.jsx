import React, { useEffect, useRef, useState } from 'react';
import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import './ProcessPage.css';
import { useNavigate } from 'react-router-dom';
import VisitorSideBar from '../components/VisitorSideBar';
import { useContext } from 'react';
import { ProcessContext } from '../context/processContext';
import { getTickets } from '../service/service';

const ProcessPage = () => {
  const { tickets, setTickets, calendarRef, setReservationDate, reservationDate } = useContext(ProcessContext) 
  const user = JSON.parse(localStorage.getItem("user"))
  const [ticketType, setTicketType] = useState([])
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
    visitorType: 'Adult',
    ticketFor: 'One Day Pass',
    quantity: 1
  });

  useEffect(() => {
    const getAllTickets = async () => {
      const data = await getTickets();
      console.log(data)
      setTicketType(data.tickets)
    }

    getAllTickets();

    flatpickr(calendarRef.current, {
      mode: "single",
      dateFormat: "Y-m-d",
      showMonths: 2,
      defaultDate: new Date(),
      onChange: function (selectedDates, dateStr) {
        const selected = new Date(dateStr);
        const today = new Date();

        selected.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (selected < today) {
          alert("You cannot select a past date.");
          return;
        }

        setReservationDate(dateStr);
      },
    });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddTicket = () => {
    const { firstName, lastName, visitorType, ticketFor, quantity } = formData;
    const quantityInt = parseInt(quantity);

    if (!firstName || !lastName || !visitorType || !ticketFor || quantityInt <= 0) {
      alert("All fields are required.");
      return;
    }

    const ticketTypeData = ticketType.find((t) => t.TypeName === ticketFor);

    if (!ticketTypeData) {
      alert("Invalid ticket type selected.");
      return;
    }

    const ticketTypeId = ticketTypeData.TicketTypeID;
    const price = visitorType === "Adult" ? ticketTypeData.AdultPrice : ticketTypeData.ChildPrice;

    let found = false;

    const updatedTickets = tickets.map(ticket => {
      if (ticket.visitorType === visitorType && ticket.ticketFor === ticketFor) {
        found = true;
        const newQuantity = ticket.quantity + quantityInt;
        return {
          ...ticket,
          quantity: newQuantity,
          total: newQuantity * price
        };
      }
      return ticket;
  });

  if (found) {
    setTickets(updatedTickets);
  } else {
    const newTicket = {
      ticketTypeId,
      ticketFor,
      visitorType,
      price,
      quantity: quantityInt,
      price: price,
      total: price * quantityInt
    };

    console.log(newTicket.ticketTypeId)
    setTickets([...tickets, newTicket]);
  }
};

  const handleDeleteTicket = (e, index) => {
    e.preventDefault()
    const updated = tickets.filter((_, i) => i !== index);
    setTickets(updated);
  };

  const handleIncrement = (e, index) => {
    e.preventDefault();
    const updatedTickets = [...tickets];
    updatedTickets[index].quantity += 1;
    updatedTickets[index].total = updatedTickets[index].quantity * updatedTickets[index].price;
    setTickets(updatedTickets);
  };

  const handleDecrement = (e, index) => {
    e.preventDefault();
    const updatedTickets = [...tickets];
    if (updatedTickets[index].quantity > 1) {
      updatedTickets[index].quantity -= 1;
      updatedTickets[index].total = updatedTickets[index].quantity * updatedTickets[index].price;
      setTickets(updatedTickets);
    }
  };

  const handleCheckout = (event) => {
    event.preventDefault();

    if (tickets.length < 1 || !reservationDate) {
      alert("No selected date or No tickets added.")
      return;
    }

    navigate("/payment");
  }

  const subTotal = tickets.reduce((sum, ticket) => sum + ticket.total, 0);
  console.log(ticketType)

  return (
    <div className="process-page">
    <VisitorSideBar />
      <div className="page-content">
        <div className="reservation">
          <div className="header-text">
            <h1>Reserve your Visit</h1>
            <p className="header-paragraph">By reserving your visit date, you'll enjoy the peace of mind knowing that your adventure awaits, ready to unfold on your chosen day. Say goodbye to uncertainty and hello to anticipation as you count down the days to your unforgettable theme park experience.</p>
          </div>

          <div className="calendar">
            <input type="text" placeholder={"Enter your reservation date."} ref={calendarRef} required />
          </div>

          <div className="process-ticket">
            <div className="process-ticket-header">
              <h3>Process Visitor Ticket</h3>
            </div>

            <div className="process-body">
              <div className="process-input">
                <div className="input-fields">
                  <label className="input-labels">First name</label>
                  <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter your first name" readOnly />
                </div>
                <div className="input-fields">
                  <label className="input-labels">Last name</label>
                  <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter your last name" readOnly />
                </div>
              </div>

              <div className="process-input">
                <div className="input-fields">
                  <label className="input-labels">Visitor Type</label>
                  <select id="visitorType" value={formData.visitorType} onChange={handleInputChange}>
                    <option value="">-- Select Visitor Type --</option>
                    <option value="Adult">For Adult</option>
                    <option value="Child">For Child</option>
                  </select>
                </div>

                <div className="input-fields row">
                  <div className="selection">
                    <label className="input-labels">Ticket For</label>
                    <select className="dropdown" id="ticketFor" value={formData.ticketFor} onChange={handleInputChange}>
                      <option value="">-- Select Ticket Type --</option>
                      {ticketType.map((ticket) => (
                        <option key={ticket.TicketTypeID} value={ticket.TypeName}>
                          {ticket.TypeName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="selection">
                    <label className="input-labels">Quantity</label>
                    <input type="number" id="quantity" value={formData.quantity} onChange={handleInputChange} min="1" />
                  </div>
                </div>
              </div>

              <div className="add-ticket">
                <button type="button" onClick={handleAddTicket}>Add Ticket</button>
              </div>

              <form>
                <div className="display-tickets">
                  <div className="table-header">
                    <h4>Ticket Type</h4>
                    <h4>Visitor Type</h4>
                    <h4>Price</h4>
                    <h4>Quantity</h4>
                    <div className="delete-space"></div>
                  </div>
                  <div className="table-body" id="table-body">
                    {tickets.length > 0 ? (
                      tickets.map((ticket, index) => (
                        <div className='table-row' key={index}>
                          <p className="ticket-type">{ticket.ticketFor}</p>
                          <p className="visitor-type">{ticket.visitorType}</p>
                          <p className="price">₱{ticket.price}</p>
                          <div className="quantity-container">
                              <button className="decrement" onClick={(e) => handleDecrement(e, index)}>-</button>
                              <span className="quantity">{ticket.quantity}</span>
                              <button className="increment" onClick={(e) => handleIncrement(e, index)}>+</button>
                          </div>
                          <button className="delete-btn" onClick={(e) => handleDeleteTicket(e,index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red">
                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                            </svg>
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>No tickets added.</p>
                    )}
                  </div>
                  <div className="sub-total">
                    <span id="label">Sub Total: </span><span>₱{subTotal}</span>
                  </div>
                </div>
                <div className="checkout-container">
                  <button type="button" id="cancel-checkout" onClick={() => {
                    setTickets([]);
                    setFormData({
                      firstName: `${user.firstName}`,
                      lastName: `${user.lastName}`,
                      visitorType: 'Adult',
                      ticketFor: 'One Day Pass',
                      quantity: 1
                    });
                    setReservationDate("");
                    if (calendarRef.current) calendarRef.current.value = "";
                  }}>Clear</button>
                  <button type="submit" id="checkout" onClick={handleCheckout}>Checkout</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
