import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useApp } from '../context/AppContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="section auth-wrap">
      <form className="auth-card glass form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <p className="error-text">{error}</p>}
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary">Create Account</button>
        <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
};

export default Register;
