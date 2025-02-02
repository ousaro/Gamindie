package com.ousaro.gamindie.feedback;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("likes")
@RequiredArgsConstructor
@Tag(name="Like")
public class LikeController {

    private final LikeService service;

    @PostMapping("/")
    public ResponseEntity<Integer> createLike(@Valid @RequestBody LikeRequest request, Authentication connectedUser) {
        return ResponseEntity.ok(service.toggleLike(request, connectedUser));
    }

    @GetMapping("/owner/{postId}")
    public ResponseEntity<Boolean> getOwnerLike(@PathVariable Integer postId,Authentication connectedUser) {
        return ResponseEntity.ok(service.getOwnerLike(postId,connectedUser));
    }

    @GetMapping("/count/{postId}")
    public ResponseEntity<Long> countLikes(@PathVariable Integer postId) {
        return ResponseEntity.ok(service.countLikes(postId));
    }

    
}
