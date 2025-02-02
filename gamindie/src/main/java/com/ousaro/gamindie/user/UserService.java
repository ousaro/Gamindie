package com.ousaro.gamindie.user;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.attachment.Attachment;
import com.ousaro.gamindie.attachment.AttachmentRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AttachmentRepository attachmentRepository;

    
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


    public UserResponse updateUser(UserRequest userRequest) {
        User user = userRepository.findById(userRequest.id())
        .orElseThrow(() -> new EntityNotFoundException("No User found with id " + userRequest.id()));

        // Preserve existing values if the request fields are null
        if (userRequest.bio() != null) {
            user.setBio(userRequest.bio());
        }
        if (userRequest.email() != null) {
            user.setEmail(userRequest.email());
        }
        if (userRequest.firstName() != null) {
            user.setFirstname(userRequest.firstName());
        }
        if (userRequest.lastName() != null) {
            user.setLastname(userRequest.lastName());
        }

        // Handle profile picture update
        if (userRequest.profilePrictureId() != null) {
            Attachment attachment = attachmentRepository.findById(userRequest.profilePrictureId()).orElse(null);
            user.setAttachment(attachment);
            if (attachment != null) {
                attachment.setOwner(user);
                user.setProfilePicture(attachment.getUrl());
            }
        }

        userRepository.save(user);

        return userMapper.toUserResponse(user);
    }
    
    



}
