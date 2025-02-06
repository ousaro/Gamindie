package com.ousaro.gamindie.chat;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("messages")
@RequiredArgsConstructor
@Tag(name = "Message")
public class MessageController {

    private final MessageService service;

    @GetMapping("/{chatRoomId}")
    public List<MessageResponse> getAllMessages(@PathVariable Integer chatRoomId) {
        return service.getAllMessages(chatRoomId);
    }

    @PostMapping("/")
    public ResponseEntity<Integer> createMessage(@RequestBody MessageRequest request) {
        return ResponseEntity.ok(service.createMessageAndBroadcast(request).getId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Integer id) {
        service.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }


}
