package com.ousaro.gamindie.post;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Tag(name="Book")
public class PostController {

    private final PostService service;

    @PostMapping
    public ResponseEntity<Integer> createPost(@Valid @RequestBody PostRequest request, Authentication connectedUser) {
        return ResponseEntity.ok(service.create(request, connectedUser));
    }

    @GetMapping("{post-id}")
    public ResponseEntity<PostResponse> findPostById(@PathVariable("post-id") Integer postId) {
        return ResponseEntity.ok(service.findById(postId));
    }
    
}
