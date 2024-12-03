package com.ousaro.gamindie.attachment;

public enum AttachmentType {


    IMAGE("image"),
    VIDEO("video"),
    AUDIO("audio"),
    DOCUMENT("document"),
    OTHER("other");

    private final String type;

    AttachmentType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

}
