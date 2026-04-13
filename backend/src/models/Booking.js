import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    seats: [{ type: String }],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Confirmed', 'Cancelled'],
      default: 'Confirmed'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
