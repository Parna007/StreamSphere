import Movie from "../models/movie.model.js";

export const GetGroupedMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find({ isPublic: true });

    const grouped = { "All": allMovies };
    allMovies.forEach((movie) => {
      if (!grouped[movie.genre]) grouped[movie.genre] = [];
      grouped[movie.genre].push(movie);
    });

    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching movies");
  }
};

