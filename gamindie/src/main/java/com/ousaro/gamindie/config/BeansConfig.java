package com.ousaro.gamindie.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class BeansConfig {

    private final UserDetailsService userDetailsService;

    @Bean
    public AuthenticationProvider authenticationProvider() {
            
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(); // this is an implementation of AuthenticationProvider that retrieves user details from a UserDetailsService
        authProvider.setUserDetailsService(userDetailsService); // to fetch the user details from the userDetailsService
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
       
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // this is an implementation of PasswordEncoder that uses the BCrypt strong hashing function
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception  { // this is an implementation of AuthenticationManager that is capable of validating an Authentication object
        return config.getAuthenticationManager();
    }
    
}
