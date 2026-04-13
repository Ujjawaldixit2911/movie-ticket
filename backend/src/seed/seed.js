import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
import generateSeats from '../utils/seatGenerator.js';

dotenv.config();
await connectDB();

await User.deleteMany();
await Movie.deleteMany();
await Show.deleteMany();

const adminPassword = await bcrypt.hash('admin123', 10);
await User.create({ name: 'Admin User', email: 'admin@quickshow.com', password: adminPassword, role: 'admin' });

const movies = await Movie.insertMany([
  {
    title: 'Avengers: Endgame',
    description: 'The epic finale where the Avengers assemble one last time to restore balance.',
    poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    genre: 'Action, Sci-Fi',
    duration: '3h 2m',
    language: 'English',
    releaseDate: '2019-04-26',
    trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c',
    isFeatured: true,
    isTrending: true,
    rating: 4.8
  },
  {
    title: 'Interstellar',
    description: 'A visually stunning sci-fi journey through space, time, and survival.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    genre: 'Sci-Fi, Drama',
    duration: '2h 49m',
    language: 'English',
    releaseDate: '2014-11-07',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    isFeatured: true,
    isTrending: false,
    rating: 4.7
  },
  {
    title: 'Joker',
    description: 'The haunting origin story of Gotham’s most chaotic villain.',
    poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    genre: 'Drama, Thriller',
    duration: '2h 2m',
    language: 'English',
    releaseDate: '2019-10-04',
    trailerUrl: 'https://www.youtube.com/embed/zAGVQLHvwOY',
    isFeatured: false,
    isTrending: true,
    rating: 4.5
  },
  {
    title: 'Inception',
    description: 'A mind-bending dream heist that blurs the line between reality and imagination.',
    poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    genre: 'Action, Sci-Fi',
    duration: '2h 28m',
    language: 'English',
    releaseDate: '2010-07-16',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    isFeatured: true,
    isTrending: true,
    rating: 4.9
  },
  {
    title: '3 Idiots',
    description: 'A heartwarming college story about friendship, pressure, and chasing excellence.',
    poster: 'https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg',
    genre: 'Comedy, Drama',
    duration: '2h 50m',
    language: 'Hindi',
    releaseDate: '2009-12-25',
    trailerUrl: 'https://www.youtube.com/embed/K0eDlFX9GMc',
    isFeatured: true,
    isTrending: false,
    rating: 4.8
  },
  {
    title: 'Dune',
    description: 'A grand interstellar saga of power, destiny, and survival on Arrakis.',
    poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    genre: 'Sci-Fi, Adventure',
    duration: '2h 35m',
    language: 'English',
    releaseDate: '2021-10-22',
    trailerUrl: 'https://www.youtube.com/embed/n9xhJrPXop4',
    isFeatured: false,
    isTrending: true,
    rating: 4.4
  },
  {
    title: 'Spider-Man: No Way Home',
    description: 'Peter Parker faces multiverse chaos with emotional stakes and huge surprises.',
    poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    genre: 'Action, Adventure',
    duration: '2h 28m',
    language: 'English',
    releaseDate: '2021-12-17',
    trailerUrl: 'https://www.youtube.com/embed/JfVOs4VSpmA',
    isFeatured: true,
    isTrending: true,
    rating: 4.6
  },
  {
    title: 'The Dark Knight',
    description: 'Batman faces the Joker in one of the greatest superhero films ever made.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    genre: 'Action, Crime',
    duration: '2h 32m',
    language: 'English',
    releaseDate: '2008-07-18',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    isFeatured: false,
    isTrending: true,
    rating: 4.9
  }
]);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date();
dayAfter.setDate(dayAfter.getDate() + 2);
const formatDate = (date) => date.toISOString().split('T')[0];

for (const movie of movies.slice(0, 5)) {
  await Show.create({
    movie: movie._id,
    showDate: formatDate(tomorrow),
    showTime: '18:30',
    basePrices: { Silver: 150, Gold: 220, Platinum: 300 },
    seats: generateSeats()
  });
  await Show.create({
    movie: movie._id,
    showDate: formatDate(dayAfter),
    showTime: '21:00',
    basePrices: { Silver: 170, Gold: 240, Platinum: 320 },
    seats: generateSeats()
  });
}

console.log('Seed data inserted');
process.exit(0);
