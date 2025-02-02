package com.ousaro.gamindie.feedback;


import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.post.Post;
import com.ousaro.gamindie.post.PostRepository;
import com.ousaro.gamindie.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentMapper {
    
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public Comment toComment(CommentRequest request, Authentication connectedUser) {
        Post post = postRepository.findById(request.getPostId())
        .orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + request.getPostId()));

        User owner = ((User) connectedUser.getPrincipal());

        Comment parent = null;
        if (request.getParentId() != null) {
        parent = commentRepository.findById(request.getParentId())
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with ID: " + request.getParentId()));
        }

        return Comment.builder()
            .content(request.getContent())
            .owner(owner)
            .post(post)
            .parent(parent)
            .build();
    }


    public CommentResponse toCommentResponse(Comment comment) {
        return CommentResponse.builder()
            .id(comment.getId())
            .Content(comment.getContent())
            .postId(comment.getPost().getId())
            .createdBy(comment.getCreatedBy())
            .createdByUsername(comment.getOwner().fullName())
            .createdByAvatar(comment.getOwner().getProfilePicture())
            .parentId(comment.getParent() != null ? comment.getParent().getId() : null)
            .createdData(comment.getCreatedData())
            .build();
    }

}
