package com.ousaro.gamindie.feedback;

import java.util.List;

import com.ousaro.gamindie.commun.BaseEntity;
import com.ousaro.gamindie.post.Post;
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
public class Comment extends BaseEntity {
    
    private String content;
    
    // this twos are added to make the comment reply to another comment
    @OneToMany(mappedBy = "parent")
    private List<Comment> replies;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Comment parent;


    @ManyToOne
    @JoinColumn(name = "owner_id") // this annotation is used to specify the column name of the foreign key in the database table.
    private User owner;

    @ManyToOne
    @JoinColumn(name = "post_id") // this annotation is used to specify the column name of the foreign key in the database table.
    private Post post;
    
}