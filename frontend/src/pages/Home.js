import React, { useEffect, useState } from "react";
import "../styles/Home.css";

import AddBoxIcon from "@mui/icons-material/AddBox";

import API from "../api/api";
import { getMovies } from "../api/movieApi";

const Home = () => {

  const [groupedMovies, setGroupedMovies] =
    useState({});

  const [selectedMovie, setSelectedMovie] =
    useState(null);

  // Get userId from localStorage (after login)
  const userId =
    localStorage.getItem("userId");

  // Fetch Movies

  useEffect(() => {

    const fetchMovies = async () => {

      try {

        const res =
          await getMovies();

        const movieList = res.data;

        groupMoviesByGenre(movieList);

      } catch (err) {

        console.error(
          "Failed to fetch movies",
          err
        );

      }

    };

    fetchMovies();

  }, []);

  // Group Movies by Genre

  const groupMoviesByGenre =
    (movieList) => {

    const grouped = {};

    movieList.forEach(movie => {

      if (!grouped[movie.genre]) {

        grouped[movie.genre] = [];

      }

      grouped[movie.genre].push(movie);

    });

    setGroupedMovies(grouped);

  };
  console.log("Grouped Movies:", groupedMovies);

  // Add To Watchlist

  const handleAddToList =
    async (movieId) => {

    if (!userId)
      return alert(
        "Please login first"
      );

    try {

      await API.post(
        "/api/users/watchlist",
        {
          userId: userId,
          movieId: movieId
        }
      );

      alert("Added to My List");

    } catch (err) {

      console.error(err);

      alert(
        err?.response?.data?.message
        || "Watchlist Error"
      );

    }
  };

  // Save History

  const saveHistory =
    async (movieId) => {

    if (!userId) return;

    try {

      await API.post(
        "/api/users/history",
        {
          userId: userId,
          movieId: movieId
        }
      );

    } catch (err) {

      console.error(
        "History error",
        err
      );

    }

  };

  // Handle Play

  const handlePlay =
    async (movie) => {

    setSelectedMovie(movie);

    saveHistory(movie.id);

    try {

      await API.get(
        `/api/movies/play/${movie.id}`
      );

    } catch (err) {

      console.error(
        "Play tracking error",
        err
      );

    }

  };

  const getYoutubeEmbedUrl = (url) => {

      if (!url) return "";

      const videoId =
        url.split("v=")[1];

      return `https://www.youtube.com/embed/${videoId}`;
    };

  return (

    <div className="movie-gallery">

      {Object.entries(
        groupedMovies
      ).map(([genre, movies]) => (

        <div
          key={genre}
          className="genre-section"
        >

          <h2 className="genre-title">

            {genre}

          </h2>

          <div className="movie-row">

            {movies.map((movie) => (

              <div
                className="movie-card"
                key={movie.id}
                onClick={() =>
                  handlePlay(movie)
                }
              >

                <div className="thumbnail">

                  {movie.videoType === "YOUTUBE" ? (

                        <iframe
                          src={getYoutubeEmbedUrl(
                            movie.videoUrl
                          )}
                          className="movie-preview"
                          frameBorder="0"
                          allow="autoplay"
                          allowFullScreen
                          title={movie.title}
                        />

                      ) : (

                        <video
                          src={movie.videoUrl}
                          muted
                          preload="metadata"
                          className="movie-preview"
                        />

                      )}

                </div>

                <p className="movie-title">

                  {movie.title}

                </p>

                <div className="movie-actions">

                  <AddBoxIcon
                    className="add-icon"
                    onClick={(e) => {

                      e.stopPropagation();

                      handleAddToList(
                        movie.id
                      );

                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      ))}

      {/* PLAYER MODAL */}

      {selectedMovie && (

  <div
    className="modal-overlay"
    onClick={() =>
      setSelectedMovie(null)
    }
  >

    <div
      className="modal-content"
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      {selectedMovie.videoType === "YOUTUBE" ? (

        <iframe
          src={
            getYoutubeEmbedUrl(
              selectedMovie.videoUrl
            )
          }
          className="modal-video"
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
          title={selectedMovie.title}
        />

          ) : (

            <video
              src={
                selectedMovie.videoUrl
              }
              controls
              autoPlay
              className="modal-video"

              onPlay={() =>
                saveHistory(
                  selectedMovie.id
                )
              }
            />

          )}

          <button
            className="close-button"
            onClick={() =>
              setSelectedMovie(null)
            }
          >

            ✖

          </button>

        </div>

  </div>

)}

    </div>

  );

};

export default Home;