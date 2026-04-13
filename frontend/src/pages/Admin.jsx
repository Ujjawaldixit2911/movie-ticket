import { useEffect, useState } from 'react';
import API from '../services/api';
import DashboardCard from '../components/DashboardCard';

const defaultMovie = {
  title: '', description: '', poster: '', genre: '', duration: '', language: '', releaseDate: '', trailerUrl: '', isFeatured: false, isTrending: false, rating: 4.0
};

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [movies, setMovies] = useState([]);
  const [movieForm, setMovieForm] = useState(defaultMovie);
  const [showForm, setShowForm] = useState({ movie: '', showDate: '', showTime: '', silver: 150, gold: 220, platinum: 300 });
  const [allBookings, setAllBookings] = useState([]);

  const loadData = async () => {
    const [statsRes, moviesRes, bookingsRes] = await Promise.all([
      API.get('/bookings/stats'),
      API.get('/movies'),
      API.get('/admin/bookings')
    ]);
    setStats(statsRes.data);
    setMovies(moviesRes.data);
    setAllBookings(bookingsRes.data);
  };

  useEffect(() => { loadData(); }, []);

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    await API.post('/admin/movies', movieForm);
    setMovieForm(defaultMovie);
    loadData();
  };

  const handleShowSubmit = async (e) => {
    e.preventDefault();
    await API.post('/admin/shows', {
      movie: showForm.movie,
      showDate: showForm.showDate,
      showTime: showForm.showTime,
      basePrices: { Silver: Number(showForm.silver), Gold: Number(showForm.gold), Platinum: Number(showForm.platinum) }
    });
    setShowForm({ movie: '', showDate: '', showTime: '', silver: 150, gold: 220, platinum: 300 });
    loadData();
  };

  const deleteMovie = async (id) => {
    await API.delete(`/admin/movies/${id}`);
    loadData();
  };

  if (!stats) return <div className="section">Loading admin...</div>;

  return (
    <section className="section narrow-top">
      <div className="section-head"><h2>Admin Dashboard</h2></div>
      <div className="dashboard-grid">
        <DashboardCard title="Total Movies" value={stats.totalMovies} />
        <DashboardCard title="Total Shows" value={stats.totalShows} />
        <DashboardCard title="Total Bookings" value={stats.totalBookings} />
        <DashboardCard title="Revenue" value={`₹${stats.totalRevenue}`} />
      </div>

      <div className="admin-grid">
        <form className="glass panel form" onSubmit={handleMovieSubmit}>
          <h3>Add Movie</h3>
          {Object.keys(defaultMovie).map((key) => (
            key === 'isFeatured' || key === 'isTrending' ? (
              <label key={key} className="check-row">
                <input type="checkbox" checked={movieForm[key]} onChange={(e) => setMovieForm({ ...movieForm, [key]: e.target.checked })} /> {key}
              </label>
            ) : (
              key === 'description' ?
                <textarea key={key} placeholder={key} value={movieForm[key]} onChange={(e) => setMovieForm({ ...movieForm, [key]: e.target.value })} />
              :
                <input key={key} placeholder={key} value={movieForm[key]} onChange={(e) => setMovieForm({ ...movieForm, [key]: e.target.value })} />
            )
          ))}
          <button className="btn btn-primary">Add Movie</button>
        </form>

        <form className="glass panel form" onSubmit={handleShowSubmit}>
          <h3>Add Show</h3>
          <select value={showForm.movie} onChange={(e) => setShowForm({ ...showForm, movie: e.target.value })}>
            <option value="">Select movie</option>
            {movies.map((movie) => <option key={movie._id} value={movie._id}>{movie.title}</option>)}
          </select>
          <input type="date" value={showForm.showDate} onChange={(e) => setShowForm({ ...showForm, showDate: e.target.value })} />
          <input type="time" value={showForm.showTime} onChange={(e) => setShowForm({ ...showForm, showTime: e.target.value })} />
          <input placeholder="Silver price" value={showForm.silver} onChange={(e) => setShowForm({ ...showForm, silver: e.target.value })} />
          <input placeholder="Gold price" value={showForm.gold} onChange={(e) => setShowForm({ ...showForm, gold: e.target.value })} />
          <input placeholder="Platinum price" value={showForm.platinum} onChange={(e) => setShowForm({ ...showForm, platinum: e.target.value })} />
          <button className="btn btn-primary">Add Show</button>
        </form>
      </div>

      <div className="glass panel">
        <h3>Manage Movies</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Genre</th><th>Flags</th><th>Action</th></tr></thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.isFeatured ? 'Featured ' : ''}{movie.isTrending ? 'Trending' : ''}</td>
                  <td><button className="btn btn-outline" onClick={() => deleteMovie(movie._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass panel">
        <h3>All Bookings</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Movie</th><th>Date</th><th>Time</th><th>Status</th><th>Total</th></tr></thead>
            <tbody>
              {allBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user?.name}</td>
                  <td>{booking.movie?.title}</td>
                  <td>{booking.show?.showDate}</td>
                  <td>{booking.show?.showTime}</td>
                  <td>{booking.status}</td>
                  <td>₹{booking.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Admin;
