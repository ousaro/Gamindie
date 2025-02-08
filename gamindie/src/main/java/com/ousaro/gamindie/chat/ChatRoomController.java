package com.ousaro.gamindie.chat;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("chatrooms")
@RequiredArgsConstructor
@Tag(name = "Chat Room")
public class ChatRoomController {

    private final ChatRoomService service;

    @GetMapping("/")
    public ResponseEntity<List<ChatRoomResponse>> getAllChatRoom() {
        return ResponseEntity.ok(service.getAllChatRoom());
    }
    @GetMapping("/{user1Id}/{user2Id}")
    public ResponseEntity<List<ChatRoomResponse>> getChatRoom(@PathVariable Integer user1Id, @PathVariable Integer user2Id) {
        return ResponseEntity.ok(service.getChatRoom(user1Id, user2Id));
    }

    @GetMapping("/owner")
    public ResponseEntity<List<ChatRoomResponse>> getChatRoomOwner(Authentication authentication) {
        return ResponseEntity.ok(service.getChatRoomOwner(authentication));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatRoomResponse> getChatRoomById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getChatRoomById(id));
    }

    @PostMapping("/")
    public ResponseEntity<Integer> createChatRoom(@RequestBody ChatRoomRequest request) {
        return ResponseEntity.ok(service.createChatRoom(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChatRoom(@PathVariable Integer id) {
        service.deleteChatRoom(id);
        return ResponseEntity.noContent().build();
    }
}
