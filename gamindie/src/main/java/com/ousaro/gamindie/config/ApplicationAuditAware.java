package com.ousaro.gamindie.config;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import com.ousaro.gamindie.user.User;


public class ApplicationAuditAware implements AuditorAware<Integer> { // Integer is the type of the user ID
    
    @SuppressWarnings("null") // Suppressing null warning because the method returns Optional, this to avoid the warning
    @Override
    public Optional<Integer> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }
        
        
        User userPrincipal = (User) authentication.getPrincipal();
        return Optional.ofNullable(userPrincipal.getId());
    }
}
