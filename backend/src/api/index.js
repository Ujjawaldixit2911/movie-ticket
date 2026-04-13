import app from '../app.js';
import connectDB from '../config/db.js';

let isConnected = false;

const connectOnce = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

export default async function handler(req, res) {
  await connectOnce();
  return app(req, res);
}
