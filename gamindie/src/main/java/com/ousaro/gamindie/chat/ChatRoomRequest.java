package com.ousaro.gamindie.chat;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ChatRoomRequest(
    @NotNull(message = "Content is required")
    @NotEmpty(message = "Content is required")
    Integer user2Id,
    Boolean isActive
    ){

}
