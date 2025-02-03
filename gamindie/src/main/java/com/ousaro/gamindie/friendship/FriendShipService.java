package com.ousaro.gamindie.friendship;

import com.ousaro.gamindie.commun.PageResponse;
import com.ousaro.gamindie.user.User;
import com.ousaro.gamindie.user.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendShipService {

    private final FriendShipRepository friendShipRepository;
    private final FriendShipMapper friendShipMapper;
    private final UserRepository userRepository;

    // Create a new friendship request
    @Transactional
    public Integer sendFriendRequest(FriendShipRequest request , Authentication connectedUser) {
        FriendShip friendShip = friendShipMapper.toFriendShip(request, connectedUser);

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

    // Get all friends of a user by status 
    public PageResponse<FriendShipResponse> getFriendships(int page, int size, Integer userId, String status) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("No User found with id " + userId));
    
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdData").descending());
    
        Page<FriendShip> friends = friendShipRepository.findAll(
            (root, query, criteriaBuilder) -> criteriaBuilder.and(
                criteriaBuilder.or(
                    criteriaBuilder.equal(root.get("sender"), user),
                    criteriaBuilder.equal(root.get("receiver"), user)
                ),
                criteriaBuilder.equal(root.get("status"), status)
            ), pageable
        );
    
        List<FriendShipResponse> friendShipResponses = friends.stream()
            .map(friendShipMapper::toFriendShipResponse)
            .toList();
    
        return new PageResponse<>(
            friendShipResponses,
            friends.getNumber(),
            friends.getSize(),
            friends.getTotalElements(),
            friends.getTotalPages(),
            friends.isFirst(),
            friends.isLast()
        );
    }
    
    // Get All accepted friends of a user
    public List<FriendShip> getAcceptedFrieds(Integer userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("No User found with id " + userId));
        return friendShipRepository.findByStatusFriendShips(user, FriendShipStatus.ACCEPTED.toString());
    }
   

    public void deleteFriendRequest(Integer id) {
        friendShipRepository.deleteById(id);
    }
}
