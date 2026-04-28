package com.movie.movie_service.repository;

import com.movie.movie_service.model.WatchProgress;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WatchProgressRepository
        extends MongoRepository<WatchProgress, String> {

    Optional<WatchProgress>
    findByUserIdAndMovieId(
            String userId,
            String movieId);
}