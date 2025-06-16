import React from "react";
import "./SignupForm.css";
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { signupUser } from "../service/service";

const SignupForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleFormEdit = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      const data = await signupUser(formData);
      
      if (data.success) {
        alert("Signup Successful.")
        navigate("/")
      }
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div className="container-signup">
      <div className="form-container-signup">
        <form action="">
          <h1>Sign up</h1>
          <div>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              name="username"
              required
              placeholder="e.g Firstname Lastname"
              value={formData.username}
              onChange={handleFormEdit}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g growagarden@gmail.com"
              value={formData.email}
              onChange={handleFormEdit}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="e.g growagarden123"
              value={formData.password}
              onChange={handleFormEdit}
            />
          </div>
          <button type="submit" onClick={handleSignup}>Create Account</button>
          <p>
            Already a member? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
      <div className="background-image-signup"></div>
    </div>
  );
};

export default SignupForm;
