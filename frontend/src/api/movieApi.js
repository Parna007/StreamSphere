import API from "./api";

export const getMovies =
  () => API.get("/api/movies");

export const getTrending =
  () => API.get("/api/movies/trending");

export const getByGenre =
  (genre) =>
    API.get(`/api/movies/genre/${genre}`);

export const searchMovies =
  (keyword) =>
    API.get(
      `/api/movies/search?keyword=${keyword}`
    );

export const playMovie =
  (id) =>
    API.get(`/api/movies/play/${id}`);