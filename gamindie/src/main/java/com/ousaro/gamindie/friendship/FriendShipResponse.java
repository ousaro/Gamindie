package com.ousaro.gamindie.friendship;

import java.time.LocalDateTime;

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
public class FriendShipResponse {
    
    private Integer id;
    private String status;
    private Integer senderId;
    private String senderUsername;
    private String senderAvatar;
    private Integer receiverId;
    private String receiverUsername;
    private String receiverAvatar;
    private LocalDateTime createdData; 
}
