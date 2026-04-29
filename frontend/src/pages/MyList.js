import React, { useEffect, useState } from "react";
import axios from "axios";
//import { getAuth } from "firebase/auth";
import "../styles/myList.css";
import API from "../api/api";


const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const auth = getAuth();
  const user = auth.currentUser;
  //const API_BASE_URL = process.env.BASE_URL;


  useEffect(() => {
    const fetchList = async () => {
      if (!user) return;
      const res = await API.get(`/api/list/${user.uid}`);
      setMyList(res.data);
    };
    fetchList();
  }, [user]);

  return (
    <div className="my-list-page">
      <h2>My List</h2>
      <div className="movie-row">
        {myList.map((movie) => (
          <div key={movie.movieId}
              onClick={() => setSelectedMovie(movie)}
               className="movie-card">
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
          </div>
        ))}
      </div>
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

export default MyList;
