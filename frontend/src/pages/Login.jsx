import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useApp } from '../context/AppContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="section auth-wrap">
      <form className="auth-card glass form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error-text">{error}</p>}
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary">Login</button>
        <p className="muted">Don’t have an account? <Link to="/register">Register</Link></p>
      </form>
    </section>
  );
};

export default Login;
