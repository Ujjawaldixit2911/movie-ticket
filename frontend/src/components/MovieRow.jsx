import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {
  return (
    <div className="px-8 mt-10">
      <h2 className="text-2xl font-bold text-white mb-5">{title}</h2>

      <div className="flex gap-5 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}