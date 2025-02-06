package com.ousaro.gamindie.chat;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.attachment.Attachment;
import com.ousaro.gamindie.attachment.AttachmentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;
    private final AttachmentRepository attachmentRepository;
    private final SimpMessagingTemplate messagingTemplate; // Injected for broadcasting


    public List<MessageResponse> getAllMessages(Integer chatRoomId) {
        List<Message> messages = messageRepository.findByChatRoomIdOrderBySentAtAsc(chatRoomId);
        List<MessageResponse> messageResponses = messages.stream()
                                                          .map(messageMapper::toMessageResponse)
                                                          .toList();
        return messageResponses;
    }

    @Transactional
    public MessageResponse createMessageAndBroadcast(MessageRequest request) {
       

        List<Attachment> attachments = null;
        if(request.attachmentIds() != null && !request.attachmentIds().isEmpty()) {
            attachments = attachmentRepository.findAllById(request.attachmentIds());
        }

        Message message = messageMapper.toMessage(request, attachments);
        Message savedMessage = messageRepository.save(message);
        // Update the attachments to associate them with the saved post
        if (attachments != null) {
            for (Attachment attachment : attachments) {
                attachment.setMessage(savedMessage);
            }
            attachmentRepository.saveAll(attachments);
        }

        // Convert to response
        MessageResponse response = messageMapper.toMessageResponse(savedMessage);

        // Real-time broadcasting
        messagingTemplate.convertAndSend("/topic/chatroom", response);

        return response;
    }

    @Transactional
    public MessageResponse updateMessageStatusAndBroadcast(Integer messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.updateStatus();
        messageRepository.save(message);

        MessageResponse response = messageMapper.toMessageResponse(message);
        // Broadcast status update
        messagingTemplate.convertAndSend("/topic/status", response);
        
        return response;
    }

    public void deleteMessage(int id) {
        if (!messageRepository.existsById(id)) {
            throw new IllegalArgumentException("Message not found with id: " + id);
        }
        messageRepository.deleteById(id);
    }
}
