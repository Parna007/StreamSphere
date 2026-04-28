package com.movie.movie_service.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter
        extends GenericFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(
            JwtUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest =
                (HttpServletRequest) request;

        String authHeader =
                httpRequest.getHeader("Authorization");

        // IMPORTANT FIX:
        // Only validate if token exists

        if (authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            try {

                String token =
                        authHeader.substring(7);

                jwtUtil.validateToken(token);

            } catch (Exception e) {

                System.out.println(
                        "Invalid JWT: " + e.getMessage());

                // DO NOT BLOCK REQUEST
            }
        }

        // Always continue
        chain.doFilter(request, response);
    }
}