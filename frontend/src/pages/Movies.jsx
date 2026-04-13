import { useMemo, useState } from "react";
import MovieCard from "../components/MovieCard";
import { movies } from "../assets/data";

const Movies = () => {
  const [query, setQuery] = useState("");

  const filteredMovies = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return movies;

    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(search) ||
      movie.genre.toLowerCase().includes(search) ||
      movie.language.toLowerCase().includes(search)
    );
  }, [query]);

  return (
    <section className="section narrow-top">
      <div className="section-head">
        <h2>All Movies</h2>
      </div>

      <div className="glass panel" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search by title, genre, or language"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "16px 18px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.04)",
              color: "white",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <button className="btn btn-primary" type="button">
            Search
          </button>
        </div>
      </div>

      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="muted">No movies found.</p>
        )}
      </div>
    </section>
  );
};

export default Movies;