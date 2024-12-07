package com.ousaro.gamindie.user;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ousaro.gamindie.feedback.Comment;
import com.ousaro.gamindie.feedback.Likes;
import com.ousaro.gamindie.friendship.FriendShip;
import com.ousaro.gamindie.post.Post;
import com.ousaro.gamindie.role.Role;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
@EntityListeners(AuditingEntityListener.class) // this annotation is used to automatically populate the createdDate and lastModifiedDate fields when the entity is created or updated.

// userDeails and Principal are interfaces that are implemented by the User class to provide the necessary information for the user to be authenticated and authorized by the Spring Security framework.
public class User implements UserDetails, Principal {


    @Id
    @GeneratedValue
    private Integer id;
    private String firstname;
    private String lastname;
    private LocalDate dateOfBirth;
    @Column(unique = true)
    private String email;
    private String password;
    private String ProfilePicture;
    private boolean accountLocked;
    private boolean enabled;
    private String socialLinks;
    private String bio;
    private List<String> savedPosts;

    @ManyToMany(fetch = FetchType.EAGER) // fetch = FetchType.EAGER is used to load the roles of the user when the user is loaded.
    private List<Role> roles;

    @OneToMany(mappedBy="owner", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference // Prevent infinite recursion
    private List<Post> posts;

    @OneToMany(mappedBy="owner", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference // Prevent infinite recursion
    private List<Comment> comments;

    @OneToMany(mappedBy="owner", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference // Prevent infinite recursion
    private List<Likes> likes;

    @OneToMany(mappedBy = "sender", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<FriendShip> sentFriendships;

    @OneToMany(mappedBy = "receiver", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<FriendShip> receivedFriendships;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false) // intsertable = false is used to prevent the lastModifiedDate from being updated when the entity is created.
    private LocalDateTime lastModifiedDate;

    @Override
    public String getName() {
        return email; // Principal interface method to return the name of the user which is the email. Unique identifier for the user.
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { // ? is a wildcard that represents an unknown type. Used to prevent type errors when working with collections of different types.
        return this.roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName())) // SimpleGrantedAuthority is a class that implements the GrantedAuthority interface. It is used to represent the roles of the user. 
                .collect(Collectors.toList()); 
                // UserDetails interface method to return the authorities of the user. In this case, the roles of the user.

    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // UserDetails interface method to check if the account is expired. Always true for now.
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // UserDetails interface method to check if the credentials are expired. Always true for now.
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }   

    public String fullName(){
        return firstname + " " + lastname;
    }

}
