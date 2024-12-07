package com.ousaro.gamindie.post;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.ousaro.gamindie.user.User;

public interface  PostRepository extends JpaRepository<Post, Integer> , JpaSpecificationExecutor<Post> {
        
        List<Post> findByOwner(User owner); // Fetch posts by a specific user
}
