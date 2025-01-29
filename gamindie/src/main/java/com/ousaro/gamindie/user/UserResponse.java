package com.ousaro.gamindie.user;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private Integer id;
    private String fullName;
    private LocalDate dateOfBirth;
    private String email;
    private String ProfilePicture;
    private boolean accountLocked;
    private boolean enabled;
    private String socialLinks;
    private String bio;
    private List<String> savedPosts;
    private LocalDateTime createdDate;

}
