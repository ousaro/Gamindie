package com.ousaro.gamindie.feedback;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ousaro.gamindie.commun.PageResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public Integer createComment(CommentRequest request, Authentication connectedUser) {
        Comment comment = commentMapper.toComment(request, connectedUser);

        return commentRepository.save(comment).getId();
    }



    public PageResponse<CommentResponse> getTopLevelComments(int postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdData").descending());
        Page<Comment> comments = commentRepository.findByParentIsNullAndPostId(postId ,pageable);
        
        List<CommentResponse> commentResponses = comments.stream()
            .map(commentMapper::toCommentResponse)
            .toList();
            
        return new PageResponse<>(
            commentResponses,
            comments.getNumber(),
            comments.getSize(),
            comments.getTotalElements(),
            comments.getTotalPages(),
            comments.isFirst(),
            comments.isLast()
        );
    }

      public PageResponse<CommentResponse> getDirectReplies(Integer commentId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdData").descending());
        Page<Comment> replies = commentRepository.findByParentId(commentId, pageable);
        
        List<CommentResponse> replyResponses = replies.stream()
            .map(commentMapper::toCommentResponse)
            .toList();
            
        return new PageResponse<>(
            replyResponses,
            replies.getNumber(),
            replies.getSize(),
            replies.getTotalElements(),
            replies.getTotalPages(),
            replies.isFirst(),
            replies.isLast()
        );
    }




    public void deleteComment(Integer id) {
        
        commentRepository.deleteById(id);
    }



    public Long countComments(Integer postId) {
        return commentRepository.countByPostId(postId);
    }
}
