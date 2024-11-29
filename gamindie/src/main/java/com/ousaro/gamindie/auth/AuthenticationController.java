package com.ousaro.gamindie.auth;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("auth") // in the application.yml the context is specify to /api/v1 so this will be /api/v1/auth
@RequiredArgsConstructor
@Tag(name="Authentication") // Swagger tag
public class AuthenticationController {
    
    private final AuthenticationService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED) // 202 to indicate that the request has been accepted for processing but the processing has not been completed.
    public ResponseEntity<?> register(@Valid  @RequestBody RegistrationRequest request ) throws MessagingException { // ? is a wildcard that represents an unknown type the return type is ResponseEntity<?> because we are not returning any specific type
        authService.register(request);
        return ResponseEntity.accepted().build(); // accepted() returns a ResponseEntity with status code 202
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) { // we expect a response of type AuthenticationResponse 
        return ResponseEntity.ok(authService.authenticate(request)); // ok() returns a ResponseEntity with status code 200
    }

    
    @GetMapping("/activate-account")
    public void confirm(@RequestParam String token) throws MessagingException { // @RequestParam is used to bind a request parameter to a method parameter (activate-account?token=...)
        authService.activateAccount(token);
    }
    

}
