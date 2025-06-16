import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import { getAllVisitors, deleteVisitor } from "../service/service";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [visitors, setVisitors] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredVisitors, setFilteredVisitors] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVisitors();
    }, []);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredVisitors(visitors);
        } else {
            setFilteredVisitors(
                visitors.filter(v =>
                    (v.FirstName + " " + v.LastName + " " + v.Username + " " + v.Email)
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
            );
        }
    }, [search, visitors]);

    const fetchVisitors = async () => {
        setLoading(true);
        try {
            const data = await getAllVisitors();
            setVisitors(data.visitors);
            setFilteredVisitors(data.visitors);
            setTotal(data.total);
        } catch (err) {
            alert("Failed to fetch visitors");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this visitor?")) return;
        try {
            await deleteVisitor(id);
            fetchVisitors();
        } catch (err) {
            alert("Failed to delete visitor");
        }
    };

    return (
        <div className="process-page">
            <AdminSideBar />
            <div className="page-content">
                <div className="container-admin">
                    <section className="manage-visitors" role="region" aria-label="Manage Visitors">
                        <h3>Manage Visitors</h3>
                        <p className="subtitle">View, add, and manage visitor records</p>
                        <div className="top-bar">
                            <div className="search-input">
                                <input
                                    type="search"
                                    placeholder="Search visitors..."
                                    aria-label="Search visitors"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="stats-cards" aria-live="polite" aria-atomic="true" aria-relevant="text">
                            <div className="stat-card" id="visitor" role="region" aria-label="Total Visitors">
                                <p className="stat-label">Total Visitors</p>
                                <p className="stat-value">{total}</p>
                            </div>
                        </div>
                        <div className="visitor-records" role="region" aria-label="Visitor Records Table">
                            <h4>Visitor Records</h4>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Username</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan="5">Loading...</td></tr>
                                        ) : filteredVisitors.length === 0 ? (
                                            <tr><td colSpan="5">No visitors found.</td></tr>
                                        ) : (
                                            filteredVisitors.map(v => (
                                                <tr key={v.VisitorID}>
                                                    <td>{v.LastName}</td>
                                                    <td>{v.FirstName}</td>
                                                    <td>{v.Email}</td>
                                                    <td>{v.FirstName + " " + v.LastName}</td>
                                                    <td style={{ textAlign: "center" }}>
                                                        <button onClick={() => handleDelete(v.VisitorID)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>Remove</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
