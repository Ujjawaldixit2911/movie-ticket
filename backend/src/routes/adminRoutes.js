import express from 'express';
import { createMovie, createShow, deleteMovie, getAllBookings, updateMovie } from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);
router.post('/shows', createShow);
router.get('/bookings', getAllBookings);

export default router;
