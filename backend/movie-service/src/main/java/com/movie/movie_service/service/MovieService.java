package com.movie.movie_service.service;

import com.movie.movie_service.model.Movie;
import com.movie.movie_service.model.WatchProgress;
import com.movie.movie_service.repository.MovieRepository;
import com.movie.movie_service.repository.WatchProgressRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository repository;
    private final WatchProgressRepository progressRepository;

    public MovieService(
            MovieRepository repository,
            WatchProgressRepository progressRepository) {

        this.repository = repository;
        this.progressRepository = progressRepository;
    }

    public Movie addMovie(Movie movie) {

        movie.setViews(0);

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

        return repository.findByGenreIgnoreCase(genre);
    }

    public List<Movie> getTrendingMovies() {

        return repository.findByTrendingTrue();
    }

    // NEW — SEARCH

    public List<Movie> searchMovies(String keyword) {

        return repository
                .findByTitleContainingIgnoreCase(keyword);
    }

    // NEW — PAGINATION

    public Page<Movie> getMoviesPage(
            int page,
            int size) {

        Pageable pageable =
                PageRequest.of(page, size);

        return repository.findAll(pageable);
    }

    // NEW — PLAY MOVIE

    public Movie playMovie(String id) {

        Movie movie = getMovieById(id);

        movie.setViews(
                movie.getViews() + 1);

        return repository.save(movie);
    }

    // NEW — SAVE PROGRESS

    public WatchProgress saveProgress(
            String userId,
            String movieId,
            int seconds) {

        WatchProgress progress =
                progressRepository
                        .findByUserIdAndMovieId(
                                userId,
                                movieId)
                        .orElse(
                                WatchProgress.builder()
                                        .userId(userId)
                                        .movieId(movieId)
                                        .build()
                        );

        progress.setProgressSeconds(seconds);

        return progressRepository.save(progress);
    }

    // NEW — RECOMMENDATION

    public List<Movie>
    getRecommendedMovies(String genre) {

        return repository
                .findByGenreIgnoreCase(genre);
    }
}