package com.ousaro.gamindie.chat;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ChatRoomRequest(
    @NotNull(message = "user 1 is required")
    @NotEmpty(message = "user 1 is required")
    Integer user1Id,
    @NotNull(message = "user 2 is required")
    @NotEmpty(message = "user 2 is required")
    Integer user2Id,
    String name,
    Boolean isActive
    ){

}
