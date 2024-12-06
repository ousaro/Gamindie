package com.ousaro.gamindie.friendship;

import com.ousaro.gamindie.commun.BaseEntity;
import com.ousaro.gamindie.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"sender_id", "receiver_id"})
})
public class FriendShip extends BaseEntity {
    
    FriendShipStatus status;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    public void accept() {
        if (status == FriendShipStatus.PENDING) {
            status = FriendShipStatus.ACCEPTED;
        } else {
            throw new IllegalStateException("Invalid status transition.");
        }
    }

    public void cancel() {
        if (status == FriendShipStatus.PENDING) {
            status = FriendShipStatus.CANCELED;
        } else {
            throw new IllegalStateException("Cannot cancel non-pending friendship.");
        }
    }

}
