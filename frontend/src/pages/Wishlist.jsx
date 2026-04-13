import MovieCard from '../components/MovieCard';
import { useApp } from '../context/AppContext';

const Wishlist = () => {
  const { wishlist } = useApp();
  return (
    <section className="section narrow-top">
      <div className="section-head"><h2>My Wishlist</h2></div>
      <div className="movie-grid">
        {wishlist.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
      </div>
      {wishlist.length === 0 && <div className="glass panel">No movies in wishlist yet.</div>}
    </section>
  );
};

export default Wishlist;
