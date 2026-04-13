import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
import Booking from '../models/Booking.js';
import generateSeats from '../utils/seatGenerator.js';

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    await Show.deleteMany({ movie: req.params.id });
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createShow = async (req, res) => {
  try {
    const { movie, showDate, showTime, basePrices } = req.body;
    const show = await Show.create({ movie, showDate, showTime, basePrices, seats: generateSeats() });
    res.status(201).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (_req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('movie', 'title')
      .populate('show', 'showDate showTime')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
