import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    backdrop: { type: String, default: '' },
    genre: { type: String, required: true },
    duration: { type: String, required: true },
    language: { type: String, default: 'English' },
    releaseDate: { type: String, default: '' },
    trailerUrl: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    rating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Movie', movieSchema);
