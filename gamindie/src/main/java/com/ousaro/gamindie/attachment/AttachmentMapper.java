package com.ousaro.gamindie.attachment;

import org.springframework.stereotype.Service;

@Service
public class AttachmentMapper {

    public AttachmentResponse toAttachmentResponse(Attachment attachment) {
        return AttachmentResponse.builder()
            .id(attachment.getId())
            .name(attachment.getName())
            .type(attachment.getType())
            .url(attachment.getUrl())
            .build();
    }

    public Attachment toAttachment(AttachmentRequest attachmentRequest) {
        return Attachment.builder()
            .name(attachmentRequest.name())
            .type(attachmentRequest.type())
            .metadata(attachmentRequest.metadata())
            .build();
    }
}
