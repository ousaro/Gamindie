package com.ousaro.gamindie.post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface  PostRepository extends JpaRepository<Post, Integer> , JpaSpecificationExecutor<Post> {


}
