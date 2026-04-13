import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema(
  {
    seatNumber: String,
    type: { type: String, enum: ['Silver', 'Gold', 'Platinum'], default: 'Silver' },
    isBooked: { type: Boolean, default: false }
  },
  { _id: false }
);

const showSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    showDate: { type: String, required: true },
    showTime: { type: String, required: true },
    basePrices: {
      Silver: { type: Number, default: 150 },
      Gold: { type: Number, default: 220 },
      Platinum: { type: Number, default: 300 }
    },
    seats: [seatSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Show', showSchema);
