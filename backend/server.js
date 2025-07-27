// server.js
import express, { json } from 'express';
import { connect } from 'mongoose';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { config } from 'dotenv';
config();

const app = express();
app.use(cors());
app.use(json());

import authRoutes from './routes/auth.route.js';
import videoRoutes from './routes/video.route.js';
import movieRoutes from './routes/movie.route.js';
import listRoutes from "./routes/userList.route.js";


app.use("/api/list", listRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 8080;

console.log("Starting server...");

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

async function startServer() {
  try {
    console.log("Connecting to DB...");
    await connectDB();
    console.log("DB connected. Starting to listen...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
}

startServer();

// MongoDB connection
// connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true, useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.log("DB error", err));

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
