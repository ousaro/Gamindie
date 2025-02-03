package com.ousaro.gamindie.friendship;


import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import com.ousaro.gamindie.user.User;
import com.ousaro.gamindie.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FriendShipMapper {

    private final UserRepository userRepository;
    private final FriendShipRepository friendShipRepository;

    public FriendShip toFriendShip(FriendShipRequest request, Authentication connectedUser) {
        User sender = ((User) connectedUser.getPrincipal());
        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found."));
        if (friendShipRepository.existsBySenderAndReceiver(sender, receiver)) {
            throw new IllegalStateException("Friendship request already exists.");
        }
        return FriendShip.builder()
            .sender(sender)
            .receiver(receiver)
            .status(FriendShipStatus.PENDING.toString())
            .build();
    }

    public FriendShipResponse toFriendShipResponse(FriendShip friendShip) {
        return FriendShipResponse.builder()
            .id(friendShip.getId())
            .status(friendShip.getStatus())
            .senderId(friendShip.getSender().getId())
            .senderUsername(friendShip.getSender().fullName())
            .senderAvatar(friendShip.getSender().getProfilePicture())
            .receiverId(friendShip.getReceiver().getId())
            .receiverUsername(friendShip.getReceiver().fullName())
            .receiverAvatar(friendShip.getReceiver().getProfilePicture())
            .createdData(friendShip.getCreatedData())
            .build();
    }
    
}
