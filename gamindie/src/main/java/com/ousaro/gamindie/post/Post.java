package com.ousaro.gamindie.post;

import java.util.List;

import com.ousaro.gamindie.attachment.Attachment;
import com.ousaro.gamindie.commun.BaseEntity;
import com.ousaro.gamindie.feedback.Comment;
import com.ousaro.gamindie.feedback.Likes;
import com.ousaro.gamindie.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Post extends BaseEntity{
    
    private String Content;
    private List<String> tags;


    
    @ManyToOne
    @JoinColumn(name = "owner_id") // this annotation is used to specify the column name of the foreign key in the database table.
    private User owner;
 
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true) // cascade is used to propagate the delete operation to the associated entities.
    private List<Attachment> attachments;

    
    @OneToMany(mappedBy="post")
    private List<Comment> comments;

    @OneToMany(mappedBy="post")
    private List<Likes> likes;
    

}
