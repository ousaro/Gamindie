
package com.ousaro.gamindie.security;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
class JwtFilter extends OncePerRequestFilter { // to filter the requests and responses once per request


    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request, // servlet request is the request that the client sends to the server
        @NonNull HttpServletResponse response, 
        @NonNull FilterChain filterChain // to filter the requests and responses
    
    ) throws ServletException, IOException {

        if(request.getServletPath().contains("/api/v1/auth")){ // check if the request is for the auth endpoint to not filter it
            filterChain.doFilter(request, response); // dofilter to call the rest of the filterchain
            return;
        }

        final String authHeader = request.getHeader(AUTHORIZATION);
        final String jwt;
        final String userEmail;
        if(authHeader == null || !authHeader.startsWith("Bearer ")){ // check if the header is null or does not start with Bearer to not filter it
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7); // extract the jwt token from the header
        userEmail = jwtService.extractUsername(jwt); // extract the user email from the jwt token
        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) // check if the user email is not null and the authentication context is null (no user is authenticated)
        {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail); // load the user by the email
            if(jwtService.isTokenValid(jwt, userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken( // to create the authentication token for the user
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                );

                authToken.setDetails( // to set the details of the authentication token
                    new WebAuthenticationDetailsSource().buildDetails(request) // Details are the details of the authentication request like the IP address ...
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        filterChain.doFilter(request, response); // to call the rest of the filterchain
        
    }

}
