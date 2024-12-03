package com.ousaro.gamindie.post;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PostRequest(
    Integer id, 
    @NotNull(message = "Content is required")
    @NotEmpty(message = "Content is required")
    String Content, 
    List<String> tags,
    List<Integer> attachmentIds){

}
