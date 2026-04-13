import Booking from '../models/Booking.js';
import Show from '../models/Show.js';
import Movie from '../models/Movie.js';

const getShowDateTime = (showDate, showTime) => new Date(`${showDate}T${showTime}:00`);

export const createBooking = async (req, res) => {
  try {
    const { showId, seats } = req.body;
    const show = await Show.findById(showId).populate('movie');
    if (!show) return res.status(404).json({ message: 'Show not found' });
    if (!seats?.length) return res.status(400).json({ message: 'Select at least one seat' });

    let totalAmount = 0;

    for (const seatNo of seats) {
      const seat = show.seats.find((s) => s.seatNumber === seatNo);
      if (!seat) return res.status(400).json({ message: `Seat ${seatNo} not found` });
      if (seat.isBooked) return res.status(400).json({ message: `Seat ${seatNo} already booked` });
      seat.isBooked = true;
      totalAmount += show.basePrices[seat.type] || 150;
    }

    await show.save();

    const booking = await Booking.create({
      user: req.user._id,
      movie: show.movie._id,
      show: show._id,
      seats,
      totalAmount,
      status: 'Confirmed'
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('movie')
      .populate('show')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('show');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    if (booking.status === 'Cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    const showDateTime = getShowDateTime(booking.show.showDate, booking.show.showTime);
    if (showDateTime <= new Date()) {
      return res.status(400).json({ message: 'Cannot cancel after show start time' });
    }

    const show = await Show.findById(booking.show._id);
    show.seats = show.seats.map((seat) => {
      if (booking.seats.includes(seat.seatNumber)) seat.isBooked = false;
      return seat;
    });
    await show.save();

    booking.status = 'Cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingStats = async (_req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'Cancelled' });
    const totalRevenueResult = await Booking.aggregate([
      { $match: { status: 'Confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const totalMovies = await Movie.countDocuments();
    const totalShows = await Show.countDocuments();
    res.json({ totalBookings, confirmedBookings, cancelledBookings, totalRevenue, totalMovies, totalShows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
