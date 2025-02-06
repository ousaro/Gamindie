package com.ousaro.gamindie.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final MessageService messageService;

    // Real-time message handling
    @MessageMapping("/chat.sendMessage")
    @SendTo("/user/chatroom")
    public MessageResponse sendMessage(MessageRequest messageRequest) {
        System.out.println("Received message: " + messageRequest);
        // Save message and return the response
        return messageService.createMessageAndBroadcast(messageRequest);
    }

    @MessageMapping("/chat.test")
    @SendTo("/user/test")
    public MessageRequest test(MessageRequest messageRequest) {
        System.out.println("Received message: " + messageRequest);
        return messageRequest;
    }

    // For status updates like 'read', 'delivered'
    @MessageMapping("/chat.updateStatus")
    @SendTo("/user/status")
    public MessageResponse updateStatus(Integer messageId) {
        return messageService.updateMessageStatusAndBroadcast(messageId);
    }
}
