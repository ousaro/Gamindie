package com.ousaro.gamindie.post;

import org.springframework.data.jpa.domain.Specification;



public class PostSpecification {

    public static Specification<Post> withOwner(Integer ownerId) {
        return (root, query, criteriaBuilder) -> 
            criteriaBuilder.equal(root.get("owner").get("id"), ownerId);
    }

   
}