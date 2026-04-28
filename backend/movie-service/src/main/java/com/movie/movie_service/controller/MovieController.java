package com.movie.movie_service.controller;

import com.movie.movie_service.model.Movie;
import com.movie.movie_service.model.WatchProgress;
import com.movie.movie_service.service.MovieService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService service;

    public MovieController(MovieService service) {
        this.service = service;
    }

    @PostMapping
    public Movie addMovie(
            @RequestBody Movie movie) {

        return service.addMovie(movie);
    }

    @GetMapping
    public List<Movie> getAllMovies() {

        return service.getAllMovies();
    }

    @GetMapping("/{id}")
    public Movie getMovieById(
            @PathVariable String id) {

        return service.getMovieById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteMovie(
            @PathVariable String id) {

        service.deleteMovie(id);

        return "Movie deleted successfully";
    }

    @GetMapping("/genre/{genre}")
    public List<Movie> getByGenre(
            @PathVariable String genre) {

        return service.getByGenre(genre);
    }

    @GetMapping("/trending")
    public List<Movie> trending() {

        return service.getTrendingMovies();
    }

    // NEW — SEARCH

    @GetMapping("/search")
    public List<Movie> search(
            @RequestParam String keyword) {

        return service.searchMovies(keyword);
    }

    // NEW — PAGINATION

    @GetMapping("/page")
    public Page<Movie> page(
            @RequestParam int page,
            @RequestParam int size) {

        return service.getMoviesPage(page, size);
    }

    // NEW — PLAY

    @GetMapping("/play/{id}")
    public Movie playMovie(
            @PathVariable String id) {

        return service.playMovie(id);
    }

    // NEW — SAVE PROGRESS

    @PostMapping("/progress")
    public WatchProgress saveProgress(
            @RequestBody Map<String,Object> body) {

        return service.saveProgress(
                (String) body.get("userId"),
                (String) body.get("movieId"),
                (Integer) body.get("seconds")
        );
    }

    @GetMapping("/recommended/{genre}")
    public List<Movie> recommend(
            @PathVariable String genre) {

        return service.getRecommendedMovies(genre);
    }
}