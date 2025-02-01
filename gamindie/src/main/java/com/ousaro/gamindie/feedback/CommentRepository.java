package com.ousaro.gamindie.feedback;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Integer> {


    // Get replies for a specific comment
    Page<Comment> findByParentId(Integer id, Pageable pageable);
        
    // Get top-level comments for a specific post
    Page<Comment> findByParentIsNullAndPostId(Integer postId, Pageable pageable);

    // Get all comments for a post (regardless of level)
    Page<Comment> findByPostId(Integer postId, Pageable pageable);

}
