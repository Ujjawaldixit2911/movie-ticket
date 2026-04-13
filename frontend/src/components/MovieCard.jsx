import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card glass bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      <div className="relative">
        <img
          src={movie.poster || "https://via.placeholder.com/300x450"}
          alt={movie.title}
          className="w-full h-[320px] object-cover"
        />

        <span className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow">
          ₹{movie.price || 200}
        </span>
      </div>

      <div className="p-4 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>

          <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
            ⭐ {movie.rating || "N/A"}
          </span>
        </div>

        <p className="text-gray-400 text-sm mt-1">{movie.genre}</p>

        <p className="text-gray-500 text-xs mt-1">
          {movie.duration} • {movie.language}
        </p>

        <div className="flex gap-2 mt-2">
          {movie.isFeatured && (
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
              Featured
            </span>
          )}

          {movie.isTrending && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
              Trending
            </span>
          )}
        </div>

        <Link
          to={`/movies/${movie.id}`}
          className="block text-center mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium"
        >
          Book Now 🎟
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;