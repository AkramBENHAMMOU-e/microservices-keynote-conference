package com.tp.gatewayservice.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfig {

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("conference-service", r -> r
                        .path("/conference-service/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://conference-service"))
                .route("keynote-service", r -> r
                        .path("/keynote-service/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://Keynote-service"))
                .build();
    }
}
