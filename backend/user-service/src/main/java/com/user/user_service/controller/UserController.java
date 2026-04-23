package com.user.user_service.controller;

import com.user.user_service.model.User;
import com.user.user_service.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public User createUser(
            @RequestBody User user) {

        return service.createUser(user);
    }
    

    @GetMapping("/{id}")
    public User getUser(
            @PathVariable String id) {

        return service.getUserById(id);
    }

    @PostMapping("/watchlist")
    public User addWatchlist(
            @RequestBody Map<String,String> body) {

        return service.addToWatchlist(
                body.get("userId"),
                body.get("movieId")
        );
    }

    @PostMapping("/like")
    public User likeMovie(
            @RequestBody Map<String,String> body) {

        return service.likeMovie(
                body.get("userId"),
                body.get("movieId")
        );
    }

    @PostMapping("/history")
    public User addHistory(
            @RequestBody Map<String,String> body) {

        return service.addHistory(
                body.get("userId"),
                body.get("movieId")
        );
    }

    @GetMapping("/watchlist/{userId}")
    public List<String> getWatchlist(
            @PathVariable String userId) {

        return service.getWatchlist(userId);
    }

    @GetMapping("/history/{userId}")
    public List<String> getHistory(
            @PathVariable String userId) {

        return service.getHistory(userId);
    }
}