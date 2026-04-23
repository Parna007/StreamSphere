package com.movie.movie_service.service;

import com.movie.movie_service.model.Movie;
import com.movie.movie_service.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository repository;

    public MovieService(MovieRepository repository) {
        this.repository = repository;
    }

    public Movie addMovie(Movie movie) {
        return repository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return repository.findAll();
    }

    public Movie getMovieById(String id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Movie not found"));
    }

    public void deleteMovie(String id) {
        repository.deleteById(id);
    }

    public List<Movie> getByGenre(String genre) {
        return repository.findByGenre(genre);
    }

    public List<Movie> getTrendingMovies() {
        return repository.findByTrendingTrue();
    }
}