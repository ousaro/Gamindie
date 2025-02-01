package com.ousaro.gamindie.attachment;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ousaro.gamindie.file.FileStorageService;
import com.ousaro.gamindie.user.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttachmentService {

    private final FileStorageService fileStorageService;
    private final AttachmentMapper attachmentMapper;
    private final AttachmentRepository attachmentRepository;


    public List<AttachmentResponse> getAllAttachments() {
        List<Attachment> attachments = attachmentRepository.findAll();
        List<AttachmentResponse> attachementResponses = attachments
                                               .stream()
                                               .map(attachmentMapper::toAttachmentResponse)
                                               .toList();   
        return attachementResponses;
    }

    
     public Integer uploadAttachment(MultipartFile sourceFile, AttachmentRequest request, Authentication connectedUser) {
        // Get the user id
        User user = ((User) connectedUser.getPrincipal());
        // Save the file to storage
        String fileUrl = fileStorageService.saveFile(sourceFile, request.type(), user.getId());

        // Create and save the attachment entity
        Attachment attachment = attachmentMapper.toAttachment(request, fileUrl);

        // Return the response
        return attachmentRepository.save(attachment).getId();
    }

    public void deleteAttachment(Integer id) {
        // Get the attachment
        Attachment attachment = attachmentRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException("No Attachment found with id " + id));

        // Delete the attachment
        fileStorageService.deleteFile(attachment.getUrl());
        attachmentRepository.delete(attachment);
        
    }

   
           

}
