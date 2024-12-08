package com.ousaro.gamindie.chat;


import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomMapper {
    
     public ChatRoom toChatRoom(ChatRoomRequest request) {
        return ChatRoom.builder()
            .isActive(request.isActive())
            .build();
    }

}
