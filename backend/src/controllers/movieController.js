import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

export const getMovies = async (req, res) => {
  try {
    const { search = '' } = req.query;
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { genre: { $regex: search, $options: 'i' } },
            { language: { $regex: search, $options: 'i' } }
          ]
        }
      : {};
    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedMovies = async (_req, res) => {
  const movies = await Movie.find({ isFeatured: true }).limit(8);
  res.json(movies);
};

export const getTrendingMovies = async (_req, res) => {
  const movies = await Movie.find({ isTrending: true }).limit(8);
  res.json(movies);
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const shows = await Show.find({ movie: movie._id }).sort({ showDate: 1, showTime: 1 });
    const reviews = await Review.find({ movie: movie._id }).populate('user', 'name').sort({ createdAt: -1 });

    res.json({ movie, shows, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.id;

    const existing = await Review.findOne({ user: req.user._id, movie: movieId });
    if (existing) return res.status(400).json({ message: 'You already reviewed this movie' });

    await Review.create({ user: req.user._id, movie: movieId, rating, comment });

    const reviews = await Review.find({ movie: movieId });
    const avg = reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;
    await Movie.findByIdAndUpdate(movieId, { rating: Number(avg.toFixed(1)) });

    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const movieId = req.params.id;
    const user = await User.findById(req.user._id);
    const exists = user.wishlist.some((id) => id.toString() === movieId);

    user.wishlist = exists
      ? user.wishlist.filter((id) => id.toString() !== movieId)
      : [...user.wishlist, movieId];

    await user.save();
    res.json({ wishlist: user.wishlist, message: exists ? 'Removed from wishlist' : 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
