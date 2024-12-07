package com.ousaro.gamindie.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ousaro.gamindie.post.Post;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
@Tag(name="User")
public class UserController {

    private final UserService service;

    @GetMapping("/feed")
    public ResponseEntity<List<Post>> getFriendFeed(Authentication connectedUser) {
        List<Post> friendPosts = service.getFriendPosts(connectedUser);
        return ResponseEntity.ok(friendPosts);
    }
}
