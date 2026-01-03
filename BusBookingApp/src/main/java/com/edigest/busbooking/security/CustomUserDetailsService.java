package com.edigest.busbooking.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
public class CustomUserDetailsService {

    @Bean
    public UserDetailsService userDetailsService() {
        // JWT-based auth → we don't use Spring Security users
        return username -> {
            throw new UnsupportedOperationException(
                "UserDetailsService is not used in JWT authentication"
            );
        };
    }
}