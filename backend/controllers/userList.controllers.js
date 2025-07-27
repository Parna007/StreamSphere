import UserList from "../models/userList.model.js";

export const addToList = async (req, res) => {
  const { userId, movie } = req.body;
  try {
    let userList = await UserList.findOne({ userId });

    if (!userList) {
      userList = new UserList({ userId, movies: [movie] });
    } else {
      const alreadyExists = userList.movies.find(
        (m) => m.movieId === movie.movieId
      );
      if (alreadyExists) return res.status(400).json({ message: "Already added" });

      userList.movies.push(movie);
    }

    await userList.save();
    res.status(200).json({ message: "Movie added to list" });
  } catch (err) {
    res.status(500).json({ message: "Error adding movie", error: err });
  }
};

export const getMyList = async (req, res) => {
  const { userId } = req.params;
  try {
    const userList = await UserList.findOne({ userId });
    res.status(200).json(userList?.movies || []);
  } catch (err) {
    res.status(500).json({ message: "Error fetching list", error: err });
  }
};
