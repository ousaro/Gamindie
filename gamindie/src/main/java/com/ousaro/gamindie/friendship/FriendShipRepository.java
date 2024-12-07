package com.ousaro.gamindie.friendship;

import com.ousaro.gamindie.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendShipRepository extends JpaRepository<FriendShip, Integer> {

    boolean existsBySenderAndReceiver(User sender, User receiver);

   // Find friendships where the user is either the sender or the receiver
    @Query("SELECT f FROM FriendShip f WHERE f.sender = :user OR f.receiver = :user")
    List<FriendShip> findFriendsByUser(@Param("user") User user);

    @Query("SELECT f FROM FriendShip f WHERE (f.sender = :user OR f.receiver = :user) AND f.status = :status")
    List<FriendShip> findByStatusFriendShips(@Param("user") User user,@Param("status") String status);


}
