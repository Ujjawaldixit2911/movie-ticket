import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'QuickShow API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

export default app;
