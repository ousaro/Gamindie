package com.ousaro.gamindie.attachment;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ousaro.gamindie.chat.Message;
import com.ousaro.gamindie.commun.BaseEntity;
import com.ousaro.gamindie.post.Post;
import com.ousaro.gamindie.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
public class Attachment extends BaseEntity {

    private String name;
    private String type;
    private String url;
    private String metadata;



    @ManyToOne
    @JoinColumn(name = "post_id") // this annotation is used to specify the column name of the foreign key in the database table.
    @JsonBackReference
    private Post post;

    @ManyToOne
    @JoinColumn(name = "message_id") 
    @JsonBackReference
    private Message message;

    @OneToOne
    @JoinColumn(name = "owner_id") 
    @JsonBackReference
    private User owner;
    
}
