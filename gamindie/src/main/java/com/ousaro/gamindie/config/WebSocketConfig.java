package com.ousaro.gamindie.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.ousaro.gamindie.security.JwtAuthHandshakeInterceptor;
import com.ousaro.gamindie.security.JwtService;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public WebSocketConfig(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue", "/topic"); // Use /queue for 1-to-1 messaging
        config.setApplicationDestinationPrefixes("/app"); // Client sends messages here
        config.setUserDestinationPrefix("/user"); // For private messages
    }


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
        .setAllowedOrigins("http://localhost:4200") // Allow frontend
        .addInterceptors(new JwtAuthHandshakeInterceptor(jwtService,userDetailsService)) // Add JWT interceptor; // WebSocket endpoint
        .withSockJS();
    }
}
