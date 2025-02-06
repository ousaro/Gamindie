package com.ousaro.gamindie.chat;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record MessageRequest(
    @NotNull(message = "Content is required")
    @NotEmpty(message = "Content is required")
    String content, 
    Integer chatRoomId,
    Integer ownerId,
    List<Integer> attachmentIds){

}
