import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeRegistration.css";
import { addEmployee } from "../service/service";

const EmployeeRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addEmployee(formData);
      if (data.success) {
        alert("Employee registered!");
        navigate("/admin-manage-employee");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="employee-registration-container">
      <div className="employee-registration-card">
        <button className="back-btn" onClick={() => navigate("/admin-manage-employee")}>{"<- Back"}</button>
        <h2>Employee Registration</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="register-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistration; 