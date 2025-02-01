package com.ousaro.gamindie.attachment;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("attachments")
@RequiredArgsConstructor
@Tag(name="Attachment")
public class AttachmentController {
    
     private final AttachmentService service;


    @GetMapping("/")
    public ResponseEntity<List<AttachmentResponse>> getAllAttachments() {
        return ResponseEntity.ok(service.getAllAttachments());
    }



    @PostMapping("/")
    public ResponseEntity<Integer> uploadAttachment(@RequestParam("sourceFile") MultipartFile sourceFile, AttachmentRequest request, Authentication connectedUser) {       
        Integer attachmentId = service.uploadAttachment(sourceFile,request, connectedUser);
        return ResponseEntity.ok(attachmentId);
    }


    @PostMapping("/postman")
    public ResponseEntity<Integer> uploadAttachmentPostman(
            @RequestParam("sourceFile") MultipartFile sourceFile,
            @RequestParam("name") String name,
            @RequestParam("type") String type,
            @RequestParam(value = "metadata", required = false) String metadata,
            Authentication connectedUser) {

        // Manually construct AttachmentRequest
        AttachmentRequest request = new AttachmentRequest(name, type, metadata);
       
        // Pass the request to the service
        Integer attachmentId = service.uploadAttachment(sourceFile,request, connectedUser);
        return ResponseEntity.ok(attachmentId);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteAttachment(@PathVariable("id")  Integer id) {
        service.deleteAttachment(id);
        return ResponseEntity.ok().build();
    }
    
}
