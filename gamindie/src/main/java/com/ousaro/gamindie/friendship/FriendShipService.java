package com.ousaro.gamindie.friendship;

import com.ousaro.gamindie.user.User;
import com.ousaro.gamindie.user.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendShipService {

    private final FriendShipRepository friendShipRepository;
    private final UserRepository userRepository;

    // Create a new friendship request
    @Transactional // This annotation is used to indicate that the method is a transactional method
    public Integer sendFriendRequest(FriendShipRequest request , Authentication connectedUser) {
        User sender = ((User) connectedUser.getPrincipal());
        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found."));

        if (friendShipRepository.existsBySenderAndReceiver(sender, receiver)) {
            throw new IllegalStateException("Friendship request already exists.");
        }

        FriendShip friendShip = FriendShip.builder()
                .sender(sender)
                .receiver(receiver)
                .status(FriendShipStatus.PENDING)
                .build();

        return friendShipRepository.save(friendShip).getId();
    }

    // Accept a friendship request
    @Transactional
    public Integer acceptFriendRequest(Integer friendShipId) {
        FriendShip friendShip = friendShipRepository.findById(friendShipId)
                .orElseThrow(() -> new IllegalArgumentException("Friendship not found."));

        friendShip.accept();
        return friendShipRepository.save(friendShip).getId();
    }

    // Cancel a friendship request
    @Transactional
    public Integer cancelFriendRequest(Integer friendShipId) {
        FriendShip friendShip = friendShipRepository.findById(friendShipId)
                .orElseThrow(() -> new IllegalArgumentException("Friendship not found."));

        friendShip.cancel();
        return friendShipRepository.save(friendShip).getId();
    }

    // Get all friends of a user
    public List<FriendShip> getFriends(Authentication connectedUser) {
        User user =  ((User) connectedUser.getPrincipal());

        return friendShipRepository.findFriendsByUser(user);
    }

    // Get pending friend requests for a user
    public List<FriendShip> getPendingRequests(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

        return friendShipRepository.findPendingRequestsByReceiver(user);
    }
}
