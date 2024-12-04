package com.ousaro.gamindie.attachment;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.file.FileStorageService;
import com.ousaro.gamindie.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttachmentService {

    private final FileStorageService fileStorageService;
    private final AttachmentMapper attachmentMapper;
    private final AttachmentRepository attachmentRepository;

     public Integer uploadAttachment(AttachmentRequest request, Authentication connectedUser) {
        // Get the user id
        User user = ((User) connectedUser.getPrincipal());
        // Save the file to storage
        String fileUrl = fileStorageService.saveFile(request.sourceFile(), request.type(), user.getId());

        // Create and save the attachment entity
        Attachment attachment = attachmentMapper.toAttachment(request, fileUrl);

        // Return the response
        return attachmentRepository.save(attachment).getId();
    }
           

}
