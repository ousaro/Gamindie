package com.ousaro.gamindie.chat;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.attachment.Attachment;
import com.ousaro.gamindie.attachment.AttachmentRepository;
import com.ousaro.gamindie.user.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;
    private final AttachmentRepository attachmentRepository;
    private final ChatRoomRepository chatRoomRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Integer createMessage(MessageRequest request, Authentication connectedUser) {
        User owner = ((User) connectedUser.getPrincipal());

        List<Attachment> attachments = null;
        if(request.attachmentIds() != null && !request.attachmentIds().isEmpty()) {
            attachments = attachmentRepository.findAllById(request.attachmentIds());
        }

        Message message = messageMapper.toMessage(request, attachments);
        message.setOwner(owner);
        ChatRoom chatRoom = chatRoomRepository.findById(request.chatRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Chat room not found with id: " + request.chatRoomId()));
        message.setChatRoom(chatRoom);
        Message savedMessage = messageRepository.save(message);

        // Update the attachments to associate them with the saved post
        if (attachments != null) {
            for (Attachment attachment : attachments) {
                attachment.setMessage(savedMessage);
            }
            attachmentRepository.saveAll(attachments);
        }

        return savedMessage.getId();
    }

    public void deleteMessage(int id) {
        if (!messageRepository.existsById(id)) {
            throw new IllegalArgumentException("Message not found with id: " + id);
        }
        messageRepository.deleteById(id);
    }
}
