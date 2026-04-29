package com.gateway.api_gateway.config;
import org.springframework.context.annotation.*;
import org.springframework.web.cors.*;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.*;

@Configuration
public class CorsConfig {
    @Bean
    public CorsWebFilter corsWebFilter() {

        CorsConfiguration config =
                new CorsConfiguration();

        config.addAllowedOrigin("*");

        config.addAllowedMethod("*");

        config.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                config
        );

        return new CorsWebFilter(source);
    }
}
