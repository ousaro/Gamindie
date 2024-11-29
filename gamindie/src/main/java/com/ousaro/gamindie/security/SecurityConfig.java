package com.ousaro.gamindie.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import org.springframework.security.web.SecurityFilterChain;
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
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { // securityFilterChain is a bean that is used to build the security filter chain
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
                    .anyRequest().authenticated() // this to specify that any request should be authenticated
                )
            .sessionManagement(session -> session.sessionCreationPolicy(STATELESS)) // this to specify that the session should be stateless this is because we are using jwt
            .authenticationProvider(authenticationProvider) // set the authentication provider to be used
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // add the jwt filter before the UsernamePasswordAuthenticationFilter to check the jwt token before the authentication process


            return http.build();
       
           
    }
}
