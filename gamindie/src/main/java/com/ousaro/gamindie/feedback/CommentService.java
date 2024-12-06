package com.ousaro.gamindie.feedback;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ousaro.gamindie.post.Post;
import com.ousaro.gamindie.post.PostRepository;
import com.ousaro.gamindie.user.User;

import org.springframework.security.core.Authentication;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public Integer createComment(CommentRequest request, Authentication connectedUser) {
        Post post = postRepository.findById(request.getPostId())
                    .orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + request.getPostId()));

        User owner = ((User) connectedUser.getPrincipal());

        Comment parent = null;
        if (request.getParentId() != null) {
            parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Comment not found with ID: " + request.getParentId()));
        }

        Comment comment = Comment.builder()
                .content(request.getContent())
                .owner(owner)
                .post(post)
                .parent(parent)
                .build();
                
        return commentRepository.save(comment).getId();
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(Integer id) {
        return commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    public void deleteComment(Integer id) {
        commentRepository.deleteById(id);
    }
}
