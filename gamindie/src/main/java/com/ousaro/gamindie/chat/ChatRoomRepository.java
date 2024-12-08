package com.ousaro.gamindie.chat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface  ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    
}
