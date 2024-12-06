
package com.ousaro.gamindie.feedback;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ousaro.gamindie.post.Post;
import com.ousaro.gamindie.user.User;

public interface  LikeRepository extends JpaRepository<Likes, Integer> {

    boolean existsByOwnerAndPost(User owner, Post post);

    int countByPost(Post post);

    Optional<Likes> findByOwnerAndPost(User owner, Post post);

}
