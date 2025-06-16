import React, { useEffect, useState } from "react";
import "./AdminManageTickets.css";
import AdminSideBar from "../components/AdminSideBar";
import { getTickets, addTicketType, deleteTicketType } from "../service/service";

const AdminManageTickets = () => {
  const [ticketType, setTicketType] = useState("");
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getTickets();
      setTickets(data.tickets);
    } catch (err) {
      alert("Failed to fetch ticket types");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticketType || adultPrice < 0 || childPrice < 0) {
      alert("Please fill in all fields with valid values.");
      return;
    }
    try {
      await addTicketType(ticketType, adultPrice, childPrice);
      setTicketType("");
      setAdultPrice(0);
      setChildPrice(0);
      fetchTickets();
    } catch (err) {
      alert("Failed to add ticket type");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket type?")) return;
    try {
      await deleteTicketType(id);
      fetchTickets();
    } catch (err) {
      alert("Failed to delete ticket type");
    }
  };

  return (
    <div className="process-page">
      <AdminSideBar />

      <div className="page-content-tickets">
        <div className="container">
          <div className="card add-ticket-card">
            <div className="add-ticket-header">Add New Ticket Type</div>
            <form className="add-ticket-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="ticket-type">Ticket Type</label>
                <input
                  type="text"
                  id="ticket-type"
                  placeholder="e.g. Regular, VIP, Student"
                  value={ticketType}
                  onChange={e => setTicketType(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="adult-price">Adult Price ($)</label>
                <input
                  type="number"
                  id="adult-price"
                  min="0"
                  step="0.01"
                  value={adultPrice}
                  onChange={e => setAdultPrice(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="child-price">Child Price ($)</label>
                <input
                  type="number"
                  id="child-price"
                  min="0"
                  step="0.01"
                  value={childPrice}
                  onChange={e => setChildPrice(Number(e.target.value))}
                />
              </div>
              <button
                id="add-ticket"
                className="btn-add-ticket"
                type="submit"
                aria-label="Add Ticket"
              >
                Add Ticket
              </button>
            </form>
          </div>

          <div className="card existing-ticket-card">
            <div className="existing-header">Existing Ticket Types</div>
            <table aria-label="Existing ticket types table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TICKET TYPE</th>
                  <th>ADULT PRICE</th>
                  <th>CHILD PRICE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5">Loading...</td></tr>
                ) : tickets.length === 0 ? (
                  <tr><td colSpan="5">No ticket types found.</td></tr>
                ) : (
                  tickets.map(ticket => (
                    <tr key={ticket.TicketTypeID}>
                      <td>{ticket.TicketTypeID}</td>
                      <td>{ticket.TypeName}</td>
                      <td>{Number(ticket.AdultPrice).toFixed(2)}</td>
                      <td>{Number(ticket.ChildPrice).toFixed(2)}</td>
                      <td className="actions">
                        <span
                          style={{ color: 'red', cursor: 'pointer', fontWeight: 'normal' }}
                          role="button"
                          aria-label="Delete"
                          onClick={() => handleDelete(ticket.TicketTypeID)}
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageTickets;
