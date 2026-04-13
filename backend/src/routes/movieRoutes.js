import express from 'express';
import {
  addReview,
  getFeaturedMovies,
  getMovieById,
  getMovies,
  getTrendingMovies,
  getWishlist,
  toggleWishlist
} from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/featured', getFeaturedMovies);
router.get('/trending', getTrendingMovies);
router.get('/wishlist', protect, getWishlist);
router.get('/:id', getMovieById);
router.post('/:id/reviews', protect, addReview);
router.put('/:id/wishlist', protect, toggleWishlist);

export default router;
