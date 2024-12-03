package com.ousaro.gamindie.file;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {
    
    @Value("${application.file.upload.images-path}")
    private String imagesUploadPath;

    @Value("${application.file.upload.videos-path}")
    private String videosUploadPath;

    @Value("${application.file.upload.audios-path}")
    private String audiosUploadPath;

    @Value("${application.file.upload.documents-path}")
    private String documentsUploadPath;




    public String saveFile(
        @Nonnull MultipartFile sourceFile,
        @Nonnull String fileType,
        @Nonnull Integer userId
    ) {
        final String fileUploadSubPath = "users" + File.separator + userId;
        return uploadFile(sourceFile,fileType, fileUploadSubPath);
    }
        
        
    private String uploadFile(
        @Nonnull MultipartFile sourceFile, 
        @Nonnull String fileType,
        @Nonnull String fileUploadSubPath) {
        
        String typeUploadPath = "";

        switch(fileType){
            case "image" -> typeUploadPath = imagesUploadPath;
            case "video" -> typeUploadPath = videosUploadPath;
            case "audio" -> typeUploadPath = audiosUploadPath;
            case "document" -> typeUploadPath = documentsUploadPath;
            default -> log.warn("Unsupported file type");
        }
        
        final String finalUploadPath = typeUploadPath + File.separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);
        if(!targetFolder.exists()){
            boolean folderCreated = targetFolder.mkdirs();
            if(!folderCreated){
                log.warn("Failed to create the target folder");
                return null;
            }
        }

        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        String targetFilePath = finalUploadPath + File.separator + System.currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(targetFilePath);
        try{
            Files.write(targetPath, sourceFile.getBytes());
            log.info("File saved to" + targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("File was not saved", e);
        }
        return "";
    }
        
        
    private String getFileExtension(String fileName) {
        if(fileName == null || fileName.isEmpty()){
            return "";
        }

        int lastDotIndex = fileName.lastIndexOf(".");
        if(lastDotIndex == -1){
            return "";
        }

        return fileName.substring(lastDotIndex + 1).toLowerCase();

    }       

        
           

}
