// server.js
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
config();

const app = express();
app.use(cors());
app.use(json());

import authRoutes from './routes/auth.route.js';
app.use('/api/auth', authRoutes);

// MongoDB connection
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("DB error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
