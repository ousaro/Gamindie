
package com.ousaro.gamindie.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Integer> { // JpaRepository is a Spring Data interface that provides CRUD operations
    
    Optional<Token> findByToken(String token); // optional because the token may not exist to avoid null pointer exceptions
    

}
