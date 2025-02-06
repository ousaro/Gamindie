package com.ousaro.gamindie.chat;


import org.springframework.stereotype.Service;

import com.ousaro.gamindie.user.User;
import com.ousaro.gamindie.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomMapper {

    private final UserRepository userRepository;
    
     public ChatRoom toChatRoom(ChatRoomRequest request) {
        User user1 = userRepository.findById(request.user1Id())
        .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + request.user1Id()));
        User user2 = userRepository.findById(request.user2Id())
        .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + request.user2Id()));
        return ChatRoom.builder()
            .name(request.name())
            .user1(user1)
            .user2(user2)
            .isActive(request.isActive())
            .build();
    }

    public ChatRoomResponse toChatRoomResponse(ChatRoom chatRoom) {
        return ChatRoomResponse.builder()
            .id(chatRoom.getId())
            .name(chatRoom.getName())
            .user1Id(chatRoom.getUser1().getId())
            .user2Id(chatRoom.getUser2().getId())
            .isActive(chatRoom.isActive())
            .build();
    }

}
