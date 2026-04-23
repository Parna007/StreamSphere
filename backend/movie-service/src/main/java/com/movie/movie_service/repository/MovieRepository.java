package com.movie.movie_service.repository;

import com.movie.movie_service.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieRepository
        extends MongoRepository<Movie, String> {

    List<Movie> findByGenre(String genre);

    List<Movie> findByTrendingTrue();
}