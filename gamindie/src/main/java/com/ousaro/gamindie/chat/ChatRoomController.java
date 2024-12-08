package com.ousaro.gamindie.chat;

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

    @GetMapping("/{id}")
    public ResponseEntity<ChatRoom> getChatRoomById(@PathVariable Integer id) {
        return service.getChatRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<Integer> createChatRoom(@RequestBody ChatRoomRequest request, Authentication connectedUser) {
        return ResponseEntity.ok(service.createChatRoom(request, connectedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChatRoom(@PathVariable Integer id) {
        service.deleteChatRoom(id);
        return ResponseEntity.noContent().build();
    }
}
