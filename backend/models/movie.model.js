import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  url: String,
  isPublic: Boolean,
  createdBy: String,
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
