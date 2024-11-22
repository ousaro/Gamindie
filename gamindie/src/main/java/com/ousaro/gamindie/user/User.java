package com.ousaro.gamindie.user;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;

import com.ousaro.gamindie.role.Role;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.MapKeyColumn;
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
@EntityListeners(AuditingEntityListener.class)

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
    @ElementCollection // ElementCollection is used to store a collection of basic types in a separate table.
    @CollectionTable(name = "user_social_links", joinColumns = @JoinColumn(name = "user_id")) // CollectionTable is used to specify the table name and the join column for the collection of basic types.
    @MapKeyColumn(name = "social_name") // MapKeyColumn is used to specify the column name for the key of the map.
    @Column(name = "social_url") // Column is used to specify the column name for the value of the map.
    private Map<String, String> socialLinks;
    private String bio;
    private List<String> savedPosts;

    @ManyToMany(fetch = FetchType.EAGER) // fetch = FetchType.EAGER is used to load the roles of the user when the user is loaded.
    private List<Role> roles;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @Override
    public String getName() {
        return email; // Principal interface method to return the name of the user which is the email. Unique identifier for the user.
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
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

    public void Follow(User user){
        // Follow the user
    }

    public void Unfollow(User user){
        // Unfollow the user
    }

    // public void SendMessage(User user, Message message){
    //     // Send a message to the user
    // }

    public void editProfile(Map<String, String> profile){
        // Edit the profile of the user

        
    }

    public void SavePost(String postId){
        savedPosts.add(postId);
    }

}
