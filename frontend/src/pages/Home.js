import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { getAuth } from "firebase/auth";

const Home = () => {
  const [groupedMovies, setGroupedMovies] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null); // for modal
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/movies/grouped");
        setGroupedMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };
    fetchMovies();
  }, []);

  const handleAddToList = async (movie) => {
    if (!user) return alert("Please login to save movies");

    try {
      await axios.post("http://localhost:5000/api/list/add", {
        userId: user.uid,
        movie: {
          movieId: movie._id,
          title: movie.title,
          url: movie.url
        }
      });
      alert("Added to My List");
    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };


  return (
    <div className="movie-gallery">
      {Object.entries(groupedMovies).map(([genre, movies]) => (
        <div key={genre} className="genre-section">
          <h2 className="genre-title">{genre}</h2>
          <div className="movie-row">
            {movies.map((movie) => (
              <div
                className="movie-card"
                key={movie._id}
                onClick={() => setSelectedMovie(movie)}
              >
                <div className="thumbnail">
                  <video
                    src={movie.url}
                    muted
                    preload="metadata"
                    className="movie-preview"
                  />
                  <div className="play-overlay">▶</div>
                </div>
                <p className="movie-title">{movie.title}</p>
                <div className="movie-actions">
                <AddBoxIcon
                  className="add-icon"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering modal
                    handleAddToList(movie);
                  }}
                />
              </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedMovie && (
          <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <video
                src={selectedMovie.url}
                controls
                autoPlay
                muted
                className="modal-video"
              />
              <button className="close-button" onClick={() => setSelectedMovie(null)}>
                ✖
              </button>
            </div>
          </div>
        )}

    </div>
  );
};

export default Home;
