package com.auth.auth_service.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class AuthController {
    @GetMapping
    public String test() {
        return "JWT Protected API working!";
    }
}
