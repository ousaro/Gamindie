package com.ousaro.gamindie.chat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByChatRoomIdOrderBySentAtAsc(Integer chatRoomId);

    Message findByChatRoomId(Integer chatRoomId);
}
