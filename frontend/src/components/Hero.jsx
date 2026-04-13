import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-card glass">
          <p className="hero-tag">Cinematic booking experience</p>
          <h1>Book your favorite movies with a dark premium feel.</h1>
          <p>
            Discover featured titles, explore trending picks, select your show, book seats, and manage all your bookings in one place.
          </p>
          <div className="hero-actions">
            <Link to="/movies" className="btn btn-primary">Browse Movies</Link>
            <Link to="/my-bookings" className="btn btn-outline">My Bookings</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
