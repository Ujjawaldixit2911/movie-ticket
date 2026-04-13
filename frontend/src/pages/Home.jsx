import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import { movies } from '../assets/data';

const Home = () => {
  const featured = movies.filter((movie) => movie.isFeatured);
  const trending = movies.filter((movie) => movie.isTrending);

  return (
    <div>
      <Hero />

      <section className="section">
        <div className="section-head">
          <h2>Featured Movies</h2>
        </div>
        <div className="movie-grid">
          {featured.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Trending Movies</h2>
        </div>
        <div className="movie-grid">
          {trending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;