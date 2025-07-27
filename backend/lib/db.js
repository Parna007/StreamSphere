import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Trying to connect to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;  // IMPORTANT: re-throw to fail startup on error
  }
};
