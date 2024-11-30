package com.ousaro.gamindie.post;

import org.springframework.stereotype.Service;

@Service
public class PostMapper {

    public Post toPost(PostRequest request) {
        return Post.builder()
            .id(request.id())
            .Content(request.Content())
            .tags(request.tags())
            .build();
    }

    public PostResponse toPostResponse(Post post) {
        return PostResponse.builder()
            .id(post.getId())
            .Content(post.getContent())
            .owner(post.getOwner().fullName())
            .build();
    }

}
