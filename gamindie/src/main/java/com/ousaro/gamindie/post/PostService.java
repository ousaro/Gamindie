package com.ousaro.gamindie.post;



import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.user.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
    
    private final PostRepository postRepository;
    private final PostMapper postMapper;

     public Integer create(PostRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Post post = postMapper.toPost(request);
        post.setOwner(user);
        return postRepository.save(post).getId();
    }

    public PostResponse findById(Integer postId) {
        
        return postRepository.findById(postId)
            .map(postMapper::toPostResponse) // map the post to a PostResponse
            .orElseThrow(() -> new EntityNotFoundException("No Post found with id " + postId));
    }

    
}
