import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TrailerModal from "../components/TrailerModal";
import { movies } from "../assets/data";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);

  const movie = useMemo(() => {
    return movies.find((item) => String(item.id) === String(id));
  }, [id]);

  if (!movie) {
    return <div className="section">Movie not found.</div>;
  }

  return (
    <section className="section narrow-top">
      <div className="details-layout glass">
        <img src={movie.poster} alt={movie.title} className="details-poster" />

        <div>
          <div className="movie-top-row">
            <h1>{movie.title}</h1>
            <span className="badge rating">⭐ {movie.rating || "N/A"}</span>
          </div>

          <p className="muted">
            {movie.genre} • {movie.duration} • {movie.language}
          </p>

          <p className="muted">Release: {movie.releaseDate || "N/A"}</p>

          <p className="details-description">
            {movie.description || "No description available."}
          </p>

          <div className="hero-actions">
            {movie.trailerUrl && (
              <button
                className="btn btn-primary"
                onClick={() => setShowTrailer(true)}
              >
                Watch Trailer
              </button>
            )}

            <button
              className="btn btn-outline"
              onClick={() => navigate(`/book/${movie.id}`)}
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>

      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerUrl={movie.trailerUrl}
      />
    </section>
  );
};

export default MovieDetails;