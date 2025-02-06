package com.ousaro.gamindie.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoomResponse {

    private Integer id;
    private String name;
    private Integer user1Id;
    private Integer user2Id;
    private Boolean isActive;
    

}