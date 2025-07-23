import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (form.name.trim().length < 3) err.name = 'Name must be at least 3 characters';
    if (!form.email.includes('@')) err.email = 'Enter a valid email';
    if (form.password.length < 5) err.password = 'Password must be at least 5 characters';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSuccess('');

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await fetch('https://inotebook-backend-k14d.onrender.com/api/auth/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.authtoken);
        setSuccess('Account created successfully!');
        setForm({ name: '', email: '', password: '' });
        navigate('/');
        props.showAlert("Account created successfully","success")
      } else {
        setErrors({ server: data.error || 'Signup failed' });
        props.showAlert("Signup failed","danger")
      }
    } catch (error) {
      setErrors({ server: 'Network error. Please try again later.' });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3 text-center">Sign Up</h3>

      {success && <div className="alert alert-success">{success}</div>}
      {errors.server && <div className="alert alert-danger">{errors.server}</div>}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={form.name}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={form.password}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <button type="submit" className="btn btn-success w-100">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;


