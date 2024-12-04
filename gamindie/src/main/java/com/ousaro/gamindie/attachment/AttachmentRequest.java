package com.ousaro.gamindie.attachment;


import org.springframework.web.multipart.MultipartFile;

public record  AttachmentRequest (
    MultipartFile sourceFile,
    String name,
    String type,
    String metadata
) {
    
        
}
