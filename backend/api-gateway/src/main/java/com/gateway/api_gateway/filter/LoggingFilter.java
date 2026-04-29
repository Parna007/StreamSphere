package com.gateway.api_gateway.filter;
import org.springframework.cloud.gateway.filter.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Configuration
public class LoggingFilter implements GlobalFilter{
    @Override
    public Mono<Void> filter(
            ServerWebExchange exchange,
            GatewayFilterChain chain) {

        System.out.println(
                "Request URI: "
                + exchange
                .getRequest()
                .getURI()
        );

        return chain.filter(exchange);
    }
}
