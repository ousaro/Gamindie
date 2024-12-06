package com.ousaro.gamindie.feedback;

import com.ousaro.gamindie.commun.BaseEntity;
import com.ousaro.gamindie.post.Post;
import com.ousaro.gamindie.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Likes extends BaseEntity{
    
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable=false) // this annotation is used to specify the column name of the foreign key in the database table.
    private User owner;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable=false) // this annotation is used to specify the column name of the foreign key in the database table.
    private Post post;
}
