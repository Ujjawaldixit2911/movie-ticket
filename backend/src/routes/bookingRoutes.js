import express from 'express';
import { cancelBooking, createBooking, getBookingStats, getMyBookings } from '../controllers/bookingController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.put('/cancel/:id', protect, cancelBooking);
router.get('/stats', protect, adminOnly, getBookingStats);

export default router;
