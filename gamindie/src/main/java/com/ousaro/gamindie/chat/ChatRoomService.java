package com.ousaro.gamindie.chat;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.user.User;
import com.ousaro.gamindie.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMapper chatRoomMapper;
    private final UserRepository userRepository;


    public Optional<ChatRoom> getChatRoomById(Integer id) {
        return chatRoomRepository.findById(id);
    }

    public Integer createChatRoom(ChatRoomRequest request, Authentication connectedUser) {
        User user1 = (User) connectedUser.getPrincipal();

        ChatRoom chatRoom = chatRoomMapper.toChatRoom(request);
        chatRoom.setUser1(user1);
        User user2 = userRepository.findById(request.user2Id())
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + request.user2Id()));
        chatRoom.setUser2(user2);
        chatRoom.setName(chatRoom.getUser2().getUsername());

        return chatRoomRepository.save(chatRoom).getId();
    }

    public void deleteChatRoom(Integer id) {
        if (!chatRoomRepository.existsById(id)) {
            throw new IllegalArgumentException("ChatRoom not found with id: " + id);
        }
        chatRoomRepository.deleteById(id);
    }
}
