package com.ousaro.gamindie.chat;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface  ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    Optional<ChatRoom> findByUser1IdAndUser2Id(Integer user1Id, Integer user2Id);
}
