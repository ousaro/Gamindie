package com.ousaro.gamindie.feedback;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


import com.ousaro.gamindie.post.Post;
import com.ousaro.gamindie.user.User;
import com.ousaro.gamindie.post.PostRepository;


@Service
@RequiredArgsConstructor
@Transactional
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;

    public Integer toggleLike(LikeRequest request, Authentication connectedUser) {
        // Retrieve the authenticated user
        User owner = ((User) connectedUser.getPrincipal());

        // Retrieve the post to like
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + request.getPostId()));

        // Check if the like already exists
        boolean exists = likeRepository.existsByOwnerAndPost(owner, post);

        if (exists) {
            // If like exists, remove it (unlike)
            Likes existingLike = likeRepository.findByOwnerAndPost(owner, post)
                    .orElseThrow(() -> new IllegalStateException("Like record not found despite existence check"));
            likeRepository.delete(existingLike);
            return existingLike.getId();

        } else {
            // If like doesn't exist, create a new one
            Likes like = Likes.builder()
                    .owner(owner)
                    .post(post)
                    .build();
         
            return  likeRepository.save(like).getId();
        }

       
        
    }
}
