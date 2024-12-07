package com.ousaro.gamindie.friendship;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("friendships")
@RequiredArgsConstructor
public class FriendShipController {

    private final FriendShipService friendShipService;

    // Send a friend request
    @PostMapping("/send")
    public ResponseEntity<Integer> sendFriendRequest( @Valid @RequestBody FriendShipRequest request , Authentication connectedUser) {
        return  ResponseEntity.ok(friendShipService.sendFriendRequest(request, connectedUser));
    }

    // Accept a friend request
    @PostMapping("/{id}/accept")
    public ResponseEntity<Integer> acceptFriendRequest(@PathVariable Integer id) {
        return ResponseEntity.ok(friendShipService.acceptFriendRequest(id));
    }

    // Cancel a friend request
    @PostMapping("/{id}/cancel")
    public ResponseEntity<Integer> cancelFriendRequest(@PathVariable Integer id) {
        return ResponseEntity.ok(friendShipService.cancelFriendRequest(id));
    }

    // Get all friends of a user
    @GetMapping("/friends")
    public ResponseEntity<List<FriendShip>> getFriends(Authentication connectedUser) {
        List<FriendShip> friends = friendShipService.getFriends(connectedUser);
        return ResponseEntity.ok(friends);
    }


    // Get pending friend requests for a user
    @GetMapping("/pending")
    public ResponseEntity<List<FriendShip>> getPendingRequests(Authentication connectedUser) {
        List<FriendShip> pendingRequests = friendShipService.getPendingRequests(connectedUser);
        return ResponseEntity.ok(pendingRequests);
    }

     // Get pending friend requests for a user
     @GetMapping("/accepted")
    public ResponseEntity<List<FriendShip>> getAcceptedRequests(Authentication connectedUser) {
        List<FriendShip> acceptedRequests = friendShipService.getAcceptedRequests(connectedUser);
        return ResponseEntity.ok(acceptedRequests);
    }

    // Detete a friend request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFriendRequest(@PathVariable Integer id) {
        friendShipService.deleteFriendRequest(id);
        return ResponseEntity.noContent().build();
    }
}
