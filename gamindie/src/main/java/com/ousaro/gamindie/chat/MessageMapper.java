package com.ousaro.gamindie.chat;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ousaro.gamindie.attachment.Attachment;
import com.ousaro.gamindie.attachment.AttachmentMapper;
import com.ousaro.gamindie.attachment.AttachmentResponse;
import com.ousaro.gamindie.user.User;
import com.ousaro.gamindie.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageMapper {

    private final AttachmentMapper attachmentMapper;
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    
    public Message toMessage(MessageRequest request, List<Attachment> attachments) {
         User owner = userRepository.findById(request.ownerId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + request.ownerId()));
        ChatRoom chatRoom = chatRoomRepository.findById(request.chatRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Chat room not found with id: " + request.chatRoomId()));
        return Message.builder()
            .content(request.content())
            .status(Message.MessageStatus.SENT)
            .sentAt(LocalDateTime.now())
            .owner(owner)
            .chatRoom(chatRoom)
            .attachments(attachments)
            .build();
    }

    public MessageResponse toMessageResponse(Message message) {
        List<AttachmentResponse> attachments = message.getAttachments().stream()
            .map(attachmentMapper::toAttachmentResponse)
            .toList();
        return MessageResponse.builder()
            .id(message.getId())
            .content(message.getContent())
            .status(message.getStatus().name())
            .sentAt(message.getSentAt().toString())
            .ownerId(message.getOwner().getId())
            .chatRoomId(message.getChatRoom().getId())
            .attachments(attachments)
            .build();
    }



}
