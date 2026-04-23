package com.movie.movie_service.controller;

import com.movie.movie_service.model.Movie;
import com.movie.movie_service.service.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}