package com.ousaro.gamindie.user;



import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserMapper {


    public UserResponse toUserResponse(User user) {
        return UserResponse.builder()
            .id(user.getId())
            .firstName(user.getFirstname())
            .lastName(user.getLastname())
            .fullName(user.fullName())
            .dateOfBirth(user.getDateOfBirth())
            .email(user.getEmail())
            .ProfilePicture(user.getProfilePicture())
            .accountLocked(user.isAccountLocked())
            .enabled(user.isEnabled())
            .socialLinks(user.getSocialLinks())
            .bio(user.getBio())
            .savedPosts(user.getSavedPosts())
            .createdDate(user.getCreatedDate())
            .build();
    }

   

}
