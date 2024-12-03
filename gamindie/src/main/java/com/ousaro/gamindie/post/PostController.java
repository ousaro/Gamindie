package com.ousaro.gamindie.post;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.ousaro.gamindie.commun.PageResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("posts")
@RequiredArgsConstructor
@Tag(name="Post")
public class PostController {

    private final PostService service;

    @PostMapping("/")
    public ResponseEntity<Integer> createPost(@Valid @RequestBody PostRequest request, Authentication connectedUser) {
        return ResponseEntity.ok(service.create(request, connectedUser));
    }

    @GetMapping("{post-id}")
    public ResponseEntity<PostResponse> findPostById(@PathVariable("post-id") Integer postId) {
        return ResponseEntity.ok(service.findById(postId));
    }

    @GetMapping("/")
    public ResponseEntity<PageResponse<PostResponse>> findAllPosts(
        @RequestParam(name="page", defaultValue="0") int page,
        @RequestParam(name="size", defaultValue="10") int size
    ) {
        return ResponseEntity.ok(service.findAllPosts(page,size));
    }

    @GetMapping("owner")
    public ResponseEntity<PageResponse<PostResponse>> findAllPostsByOwner(
        @RequestParam(name="page", defaultValue="0") int page,
        @RequestParam(name="size", defaultValue="10") int size,
        Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllPostsByOwner(page,size, connectedUser));
    }

    
}
