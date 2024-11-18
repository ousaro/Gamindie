package com.ousaro.gamindie.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;



@Configuration // this for spring to know that this is a configuration class (configuration class is a class that contains bean definitions and beans are objects that form the backbone of your application and that are managed by the Spring IoC container)
@EnableWebSecurity // this for spring to know that this is a security configuration class
@RequiredArgsConstructor // this for lombok to generate a constructor with all required fields 
@EnableMethodSecurity(securedEnabled = true) // this for spring to know that this is a method security configuration class
public class SecurityConfig {
    

    private final JwtFilter jwtAuthFilter;

    private final AuthenticationProvider authenticationProvider;

    @Bean // this for spring to know that this is a bean definition method
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
           .cors(withDefaults())
           .csrf(AbstractHttpConfigurer::disable)
           .authorizeHttpRequests(req ->
                req.requestMatchers(
                                    "/auth/**",
                                    "/v2/api-docs",
                                    "/v3/api-docs",
                                    "/v3/api-docs/**",
                                    "/swagger-ressources",
                                    "/swagger-ressources/**",
                                    "/configuration/ui",
                                    "/configuration/security",
                                    "/swagger-ui/**",
                                    "/webjars/**",
                                    "/swagger-ui.html"
                ).permitAll()
                    .anyRequest()
                        .authenticated()
                )
            .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

            return null;
       
           
    }
}
