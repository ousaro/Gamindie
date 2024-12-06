package com.ousaro.gamindie.friendship;

import lombok.Getter;

@Getter
public enum FriendShipStatus {

    PENDING("pending"),
    ACCEPTED("accepted"),
    CANCELED("canceled");

    // This is the name of the status as a string value
    private final String name;

    // Constructor for the enum to initialize the string name
    FriendShipStatus(String name) {
        this.name = name;
    }
}
