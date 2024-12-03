package com.ousaro.gamindie.attachment;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public record  AttachmentRequest (
    MultipartFile sourceFile,
    String name,
    String type,
    Map<String, String> metadata
) {
    
        
}
