package com.ousaro.gamindie.chat;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMapper chatRoomMapper;


    public ChatRoomResponse getChatRoom(Integer user1Id, Integer user2Id) {
        ChatRoom chatRoom = chatRoomRepository.findByUser1IdAndUser2Id(user1Id, user2Id).orElse(null);
        return chatRoomMapper.toChatRoomResponse(chatRoom);
    }

    @Transactional
    public Integer createChatRoom(ChatRoomRequest request) {
        ChatRoom chatRoom = chatRoomMapper.toChatRoom(request);
        return chatRoomRepository.save(chatRoom).getId();
    }

    public void deleteChatRoom(Integer id) {
        if (!chatRoomRepository.existsById(id)) {
            throw new IllegalArgumentException("ChatRoom not found with id: " + id);
        }
        chatRoomRepository.deleteById(id);
    }
}
