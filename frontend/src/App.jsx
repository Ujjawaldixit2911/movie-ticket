import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import BookSeats from './pages/BookSeats';
import Checkout from './pages/Checkout';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Wishlist from './pages/Wishlist';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/book/:showId" element={<ProtectedRoute><BookSeats /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;