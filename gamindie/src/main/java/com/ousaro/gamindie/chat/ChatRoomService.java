package com.ousaro.gamindie.chat;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.user.User;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMapper chatRoomMapper;


    public List<ChatRoomResponse> getChatRoom(Integer user1Id, Integer user2Id) {
        List<ChatRoom> chatRooms = chatRoomRepository.findByUser1IdAndUser2Id(user1Id, user2Id).orElse(null);

        List<ChatRoomResponse> chatRoomResponse = chatRooms.stream()
            .map(chatRoomMapper::toChatRoomResponse)
            .toList();

        return chatRoomResponse;
    }
    @Transactional
    public List<ChatRoomResponse> getChatRoomOwner(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<ChatRoom> chatRooms = chatRoomRepository.findByUserId(user.getId())
                .orElseThrow(null);

        List<ChatRoomResponse> chatRoomResponse = chatRooms.stream()
                .map(chatRoomMapper::toChatRoomResponse)
                .toList();

        return chatRoomResponse;
    }

    public ChatRoomResponse getChatRoomById(Integer id) {
        ChatRoom chatRoom = chatRoomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ChatRoom not found with id: " + id));
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
