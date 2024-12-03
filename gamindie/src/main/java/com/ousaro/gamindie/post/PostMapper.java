package com.ousaro.gamindie.post;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ousaro.gamindie.attachment.Attachment;
import com.ousaro.gamindie.attachment.AttachmentMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostMapper {

    private final AttachmentMapper AttachmentMapper; 

    public Post toPost(PostRequest request, List<Attachment> attachments) {
        return Post.builder()
            .id(request.id())
            .Content(request.Content())
            .tags(request.tags())
            .attachments(attachments)
            .build();
    }

    public PostResponse toPostResponse(Post post) {
        return PostResponse.builder()
            .id(post.getId())
            .Content(post.getContent())
            .owner(post.getOwner().fullName())
            .attachments(post.getAttachments() !=null ?
                post.getAttachments().stream()
                    .map(AttachmentMapper::toAttachmentResponse)
                    .toList() : null)
            .build();
    }

   

}
