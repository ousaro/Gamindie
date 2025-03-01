package com.ousaro.gamindie.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
@Tag(name="User")
public class UserController {

    private final UserService service;


    @GetMapping("/")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = service.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(Authentication connectedUser) {
        UserResponse user = service.getProfile(connectedUser);
        return ResponseEntity.ok(user);
    }

    @GetMapping("{user-id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("user-id") Integer userId) {
        UserResponse user = service.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/")
    public ResponseEntity<UserResponse> updateUser(@Valid @RequestBody UserRequest userRequest) {
        UserResponse user = service.updateUser(userRequest);
        return ResponseEntity.ok(user);
    }
}
