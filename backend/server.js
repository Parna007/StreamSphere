// server.js
import express, { json } from 'express';
import { connect } from 'mongoose'; // This import might not be needed if connectDB handles it
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

// THIS IS THE CRUCIAL CHANGE:
// Uncomment the line below and remove or comment out 'const PORT = 8080;'
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

async function startServer() {
  try {
    await connectDB(); // Ensure connectDB() is robust and handles its own errors or throws them
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    // It's good to exit here if the server can't start
    process.exit(1);
  }
}

startServer();