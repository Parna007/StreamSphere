package com.auth.auth_service.security;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.*;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.auth.auth_service.model.UserAuth;
import com.auth.auth_service.repository.UserAuthRepository;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;
    private final UserAuthRepository repository;

    public OAuth2SuccessHandler(
            JwtUtil jwtUtil,
            UserAuthRepository repository
    ) {
        this.jwtUtil = jwtUtil;
        this.repository = repository;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oauthUser =
                (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");

        String googleId =
                oauthUser.getAttribute("sub");

        Optional<UserAuth> optionalUser =
                repository.findByProviderId(googleId);

        UserAuth user;

        if (optionalUser.isEmpty()) {

            user = UserAuth.builder()
                    .email(email)
                    .role("USER")
                    .provider("GOOGLE")
                    .providerId(googleId)
                    .build();

            repository.save(user);

        } else {

            user = optionalUser.get();
        }

        String token =
                jwtUtil.generateToken(user.getEmail(),
                user.getRole());

        response.sendRedirect(
                "http://localhost:3000/login-success?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXRoaWthZGFkMTIzNDVAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NzY4NjQ5OTksImV4cCI6MTc3Njk1MTM5OX0.FdQMO0YKBzucbRDxACmCx_IeWY5xyPj_mZRuC3V4Obk"
                        + token
        );
    }
}
