
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




function Login(props) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Simple validation
  const validate = () => {
    const err = {};
    if (!form.email.includes('@')) err.email = 'Enter a valid email';
    if (form.password.length < 5) err.password = 'Password must be at least 5 characters';
    return err;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSuccess('');

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await fetch('https://inotebook-backend-3o0e.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.authtoken) {
        localStorage.setItem('token', data.authtoken); // ✅ Save token

        props.showAlert('Logged in successfully', 'success');
        setForm({ email: '', password: '' });

        // ✅ Navigate after small delay to ensure token is stored
        setTimeout(() => {
          navigate('/');
        }, 100);
      } else {
        setErrors({ server: data.error || 'Login failed' });
        props.showAlert('Login failed', 'danger');
      }
    } catch (error) {
      setErrors({ server: 'Network error. Please try again later.' });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3 text-center">Log In</h3>
      {success && <div className="alert alert-success">{success}</div>}
      {errors.server && <div className="alert alert-danger">{errors.server}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={form.password}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Log In</button>
      </form>
    </div>
  );
}

export default Login;