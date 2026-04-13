import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar glass">
      <Link to="/" className="logo">QuickShow</Link>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        {user && <NavLink to="/my-bookings">My Bookings</NavLink>}
        {user && <NavLink to="/wishlist">Wishlist</NavLink>}
        {user && <NavLink to="/profile">Profile</NavLink>}
        {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-chip">Hi, {user.name.split(' ')[0]}</span>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
