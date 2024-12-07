package com.ousaro.gamindie.user;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.friendship.FriendShipService;
import com.ousaro.gamindie.post.Post;
import com.ousaro.gamindie.post.PostRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {

    private final FriendShipService friendShipService;
    private final PostRepository postRepository;

    public List<Post> getFriendPosts(Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

        // Get all the user's accepted  friendShips
        List<User> friends = friendShipService.getAcceptedRequests(connectedUser)
                .stream()
                .map(friendShip -> friendShip.getSender().getId().equals(user.getId()) 
                ? friendShip.getReceiver() // If the user is the sender, get the receiver.
                : friendShip.getSender()) // Otherwise, get the sender.
                .collect(Collectors.toList());

        //Get posts from the user's friends, avoiding duplicates
        Set<Post> uniquePosts = friends.stream()
                .flatMap(friend -> postRepository.findByOwner(friend).stream())
                .collect(Collectors.toCollection(LinkedHashSet::new));        

        // Return the unique posts as a list
        return uniquePosts.stream().collect(Collectors.toList());
    }
}
