package com.ousaro.gamindie.chat;

import java.security.Principal;
import java.util.Map;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    // Real-time message handling
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(MessageRequest messageRequest, 
                            @Header("simpSessionAttributes") Map<String, Object> sessionAttributes) {
        
        // Retrieve authenticated user
        Authentication authentication = (Authentication) sessionAttributes.get("auth");

        if (authentication == null) {
            System.out.println("❌ Authentication is NULL! Message rejected.");
            return;
        }



        // Send message to the recipient
        messagingTemplate.convertAndSendToUser(
            messageRequest.recipientEmail(), // Send to recipient
            "/queue/messages",
            messageRequest
        );

        messageService.createMessage(messageRequest,authentication);



    }


    @MessageMapping("/chat.test")
    @SendToUser("/topic/test")
    public MessageRequest test(@Payload MessageRequest messageRequest) {
        System.out.println("Received message: " + messageRequest);
        return messageRequest;
    }

    // For status updates
    @MessageMapping("/chat.updateStatus")
    @SendTo("/user/status")
    public MessageResponse updateStatus(Integer messageId) {
        return messageService.updateMessageStatusAndBroadcast(messageId);
    }
}
