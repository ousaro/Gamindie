package com.ousaro.gamindie.chat;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface  ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    
    Optional<List<ChatRoom>> findByUser1IdAndUser2Id(Integer user1Id, Integer user2Id);

    @Query("SELECT c FROM ChatRoom c WHERE c.user1.id = :userId OR c.user2.id = :userId")
    Optional<List<ChatRoom>> findByUserId(@Param("userId") Integer userId);

    boolean existsByUser1IdAndUser2Id(Integer user1Id, Integer user2Id);
}
