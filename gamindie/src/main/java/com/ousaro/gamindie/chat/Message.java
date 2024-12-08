package com.ousaro.gamindie.chat;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ousaro.gamindie.attachment.Attachment;
import com.ousaro.gamindie.commun.BaseEntity;
import com.ousaro.gamindie.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

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
public class Message extends BaseEntity {

    @NotBlank
    @Size(max = 1000)
    private String content;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime sentAt;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonBackReference
    private User owner;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Attachment> attachments;

    @ManyToOne
    @JoinColumn(name = "chatRoom_id", nullable = false)
    @JsonBackReference
    private ChatRoom chatRoom;

    public enum MessageStatus {
        SENT, DELIVERED, READ
    }

    public void updateStatus() {
        if(this.status == MessageStatus.SENT){
            this.status = MessageStatus.DELIVERED;
        } else if(this.status == MessageStatus.DELIVERED){
            this.status = MessageStatus.READ;
        }
        
    }
}
