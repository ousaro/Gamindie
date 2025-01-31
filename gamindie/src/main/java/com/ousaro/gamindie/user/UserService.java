package com.ousaro.gamindie.user;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    
    public UserResponse getProfile(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        
        return getUserById(user.getId());
    }

    public UserResponse getUserById(Integer userId) {
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new EntityNotFoundException("No User found with id " + userId));

        return userMapper.toUserResponse(user);
        
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
        .stream()
        .map(userMapper::toUserResponse)
        .collect(Collectors.toList());
    }


}
