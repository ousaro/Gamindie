package com.ousaro.gamindie.post;

import java.util.List;

import com.ousaro.gamindie.commun.BaseEntity;
import com.ousaro.gamindie.feedback.Comment;
import com.ousaro.gamindie.feedback.Likes;
import com.ousaro.gamindie.file.Attachment;
import com.ousaro.gamindie.user.User;

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

    @OneToMany(mappedBy="post")
    private List<Attachment> attachments;
    
    @OneToMany(mappedBy="post")
    private List<Comment> comments;

    @OneToMany(mappedBy="post")
    private List<Likes> likes;
    

}
