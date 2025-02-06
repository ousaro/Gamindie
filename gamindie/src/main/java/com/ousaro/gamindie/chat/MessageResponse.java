package com.ousaro.gamindie.chat;

import java.util.List;

import com.ousaro.gamindie.attachment.AttachmentResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse {
    
    private String content;
    private Integer id;
    private String status;
    private String sentAt;
    private Integer ownerId;
    private Integer chatRoomId;
    private List<AttachmentResponse> attachments;
}
