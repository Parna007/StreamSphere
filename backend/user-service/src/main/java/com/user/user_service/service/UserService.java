package com.user.user_service.service;

import com.user.user_service.model.User;
import com.user.user_service.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User createUser(User user) {

        user.setWatchlist(new ArrayList<>());
        user.setLikedMovies(new ArrayList<>());
        user.setHistory(new ArrayList<>());

        return repository.save(user);
    }

    public User getUserById(String id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    public User addToWatchlist(
            String userId,
            String movieId) {

        User user = getUserById(userId);

        user.getWatchlist().add(movieId);

        return repository.save(user);
    }

    public User likeMovie(
            String userId,
            String movieId) {

        User user = getUserById(userId);

        user.getLikedMovies().add(movieId);

        return repository.save(user);
    }

    public User addHistory(
            String userId,
            String movieId) {

        User user = getUserById(userId);

        user.getHistory().add(movieId);

        return repository.save(user);
    }

    public List<String> getWatchlist(String userId) {

        return getUserById(userId)
                .getWatchlist();
    }

    public List<String> getHistory(String userId) {

        return getUserById(userId)
                .getHistory();
    }
}