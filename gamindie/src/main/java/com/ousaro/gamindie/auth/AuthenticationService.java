package com.ousaro.gamindie.auth;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.email.EmailService;
import com.ousaro.gamindie.email.EmailTemplateName;
import com.ousaro.gamindie.role.RoleRepository;
import com.ousaro.gamindie.user.Token;
import com.ousaro.gamindie.user.TokenRepository;
import com.ousaro.gamindie.user.User;
import com.ousaro.gamindie.user.UserRepository;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${application.mailing.frontend.activation-url}")
    private final String activationUrl;

    public void register(RegistrationRequest request) throws MessagingException {
        var userRole = roleRepository.findByName("USER")
                // todo - better exception handling
            .orElseThrow(() -> new RuntimeException("Role User was not initialized"));

        var user = User.builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .accountLocked(false)
            .enabled(false)
            .roles(List.of(userRole))
            .build();

        userRepository.save(user);

        sendValidationEmail(user);
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(
            user.getEmail(),
            user.fullName(),
            EmailTemplateName.ACTIVATE_ACCOUNT,
            activationUrl,
            newToken,
            "Account activation"
        );
    }

    private String generateAndSaveActivationToken(User user) {
        // generate token
        String generatedToken =generateActivationCode(6);
        var token = Token.builder()
            .token(generatedToken)
            .createdAt(LocalDateTime.now())
            .expiresAt(LocalDateTime.now().plusMinutes(15))       
            .user(user)
            .build();
        
        tokenRepository.save(token);

        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom random = new SecureRandom(); // secure random is better for this because it is more random
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());// get a random index from the characters
            codeBuilder.append(characters.charAt(randomIndex)); // append the character at the random index
        }
        return codeBuilder.toString();
        
    }

}
