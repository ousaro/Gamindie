package com.ousaro.gamindie.friendship;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ousaro.gamindie.commun.PageResponse;

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

    // Get all friends of authenticated user
    @GetMapping("/friends/{userId}")
    public ResponseEntity<PageResponse<FriendShipResponse>> getFriends(
        @PathVariable Integer userId,
        @RequestParam(name="page", defaultValue="0") int page,
        @RequestParam(name="size", defaultValue="10") int size) {
        return ResponseEntity.ok(friendShipService.getFriendships(page, size, userId, FriendShipStatus.ACCEPTED.toString()));
    }


    // Get pending friend requests for a user
    @GetMapping("/pending/{userId}")
    public ResponseEntity<PageResponse<FriendShipResponse>> getgetPendingRequestsFriends(
        @PathVariable Integer userId,
        @RequestParam(name="page", defaultValue="0") int page,
        @RequestParam(name="size", defaultValue="10") int size) {
        return ResponseEntity.ok(friendShipService.getFriendships(page, size, userId, FriendShipStatus.PENDING.toString()));
    }

    // Detete a friend request
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFriendRequest(@PathVariable Integer id) {
        friendShipService.deleteFriendRequest(id);
        return ResponseEntity.noContent().build();
    }
}
