package com.ousaro.gamindie.chat;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ousaro.gamindie.attachment.Attachment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageMapper {
    
    public Message toMessage(MessageRequest request, List<Attachment> attachments) {
        return Message.builder()
            .content(request.content())
            .status(Message.MessageStatus.SENT)
            .sentAt(LocalDateTime.now())
            .attachments(attachments)
            .build();
    }



}
