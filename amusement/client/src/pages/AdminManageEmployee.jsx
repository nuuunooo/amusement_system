import React, { useEffect, useState } from "react";
import "./AdminManageEmployee.css";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import { getAllEmployees, deleteEmployee } from "../service/service";

const AdminManageEmployees = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredEmployees(employees);
        } else {
            setFilteredEmployees(
                employees.filter(e =>
                    (e.FirstName + " " + e.LastName + " " + e.Username + " " + e.Email)
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
            );
        }
    }, [search, employees]);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const data = await getAllEmployees();
            setEmployees(data.employees);
            setFilteredEmployees(data.employees);
            setTotal(data.total);
        } catch (err) {
            alert("Failed to fetch employees");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        try {
            await deleteEmployee(id);
            fetchEmployees();
        } catch (err) {
            alert("Failed to delete employee");
        }
    };

    const handleAddEmployeeClick = () => {
        navigate("/admin-add-employee");
    };

    return (
        <div className="process-page">
            <AdminSideBar />
            <div className="page-content">
                <div className="container-manage-employees">
                    <section className="manage-visitors" role="region" aria-label="Manage Visitors">
                        <h3>Manage Employees</h3>
                        <p className="subtitle">View, add, and manage employee records</p>
                        <div className="top-bar">
                            <div className="search-input">
                                <input
                                    type="search"
                                    placeholder="Search employees..."
                                    aria-label="Search employees"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                className="add-btn"
                                id="add-employees"
                                onClick={handleAddEmployeeClick}
                            >
                                + Add Employees
                            </button>
                        </div>
                        <div className="stats-cards" aria-live="polite" aria-atomic="true" aria-relevant="text">
                            <div className="stat-card" role="region" aria-label="Total Employees" style={{ background: '#20bf5b' }}>
                                <p className="stat-label">Total Employees</p>
                                <p className="stat-value">{total}</p>
                            </div>
                        </div>
                        <div className="visitor-records" role="region" aria-label="Employee Records Table">
                            <h4>Employee Records</h4>
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
                                        ) : filteredEmployees.length === 0 ? (
                                            <tr><td colSpan="5">No employees found.</td></tr>
                                        ) : (
                                            filteredEmployees.map(e => (
                                                <tr key={e.EmployeeID}>
                                                    <td>{e.LastName}</td>
                                                    <td>{e.FirstName}</td>
                                                    <td>{e.Email}</td>
                                                    <td>{e.FirstName + " " + e.LastName}</td>
                                                    <td style={{ textAlign: "center" }}>
                                                        <button onClick={() => handleDelete(e.EmployeeID)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>Remove</button>
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

export default AdminManageEmployees;
