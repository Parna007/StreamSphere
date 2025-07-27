import mongoose from "mongoose";

const userListSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase UID
  movies: [
    {
      _id: false,
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
      title: String,
      url: String,
    }
  ],
});

export default mongoose.model("UserList", userListSchema);
