package com.ousaro.gamindie.chat;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("chatrooms")
@RequiredArgsConstructor
@Tag(name = "Chat Room")
public class ChatRoomController {

    private final ChatRoomService service;

    @GetMapping("/{user1Id}/{user2Id}")
    public ResponseEntity<ChatRoomResponse> getChatRoom(@PathVariable Integer user1Id, @PathVariable Integer user2Id) {
        return ResponseEntity.ok(service.getChatRoom(user1Id, user2Id));
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
