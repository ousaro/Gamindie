package com.ousaro.gamindie.chat;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("messages")
@RequiredArgsConstructor
@Tag(name = "Message")
public class MessageController {

    private final MessageService service;

    @GetMapping("/")
    public List<Message> getAllMessages() {
        return service.getAllMessages();
    }

    @PostMapping("/")
    public ResponseEntity<Integer> createMessage(@RequestBody MessageRequest request, Authentication connectedUser) {
        return ResponseEntity.ok(service.createMessage(request, connectedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable int id) {
        service.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }

}
