import React, { useState } from 'react';
import './LoginForm.css';
import wheelImage from '../assets/wheel.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../service/service';

const LoginForm = () => {
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        role: "",
        email: "",
        password: ""
    })

    const handleFormEdit = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleLogin = async (e) => {
      e.preventDefault();

        if (!formData.role || !formData.email || !formData.password) {
            alert("All fields are required.")
            return;
        }

        try {
            const data = await loginUser(formData);
            if (data.success) {
              const userInfo = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
                id: data.id
              }
              localStorage.setItem("user", JSON.stringify(userInfo))
              localStorage.setItem("token", data.token)
              alert("Login Successful.")
              
              // Redirect based on role
              switch(data.role) {
                case 'visitor':
                  navigate('/visitor-process');
                  break;
                case 'employee':
                  navigate('/employee-process');
                  break;
                case 'admin':
                  navigate('/admin-dashboard');
                  break;
                default:
                  navigate('/');
              }
            }
        } catch (err) {
            alert(err.response?.data?.message)
        }
    }

  return (
    <div className="container-login">
      <div className="form-container-login">
        <form>
          <h1>Login</h1>

          <div>
            <label htmlFor="role">Login As</label>
            <select name="role" id="userType" onChange={handleFormEdit} required>
              <option value="">-- Select Role --</option>
              <option value="visitor">Visitor</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label htmlFor="email">Name/Username</label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g angelolee@gmail.com"
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
              onChange={handleFormEdit}
            />
          </div>

          <button type="submit" onClick={handleLogin}>Login</button>

          <p>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>

      <div className="background-image"></div>
    </div>
  );
};

export default LoginForm;
