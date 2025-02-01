package com.ousaro.gamindie.post;

import java.time.LocalDateTime;
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
public class PostResponse {

    private Integer id;
    private String Content;
    private Integer ownerId;
    private String ownerFullName;
    private String ownerProfilePicture;
    private List<AttachmentResponse> attachments;
    private LocalDateTime createdData; 
    private LocalDateTime lastModifiedDate;
    private List<String> tags;

}
