package com.ousaro.gamindie.file;

import java.util.Set;

import com.ousaro.gamindie.commun.BaseEntity;
import com.ousaro.gamindie.post.Post;


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
public class Attachment extends BaseEntity {

    private String name;
    private AttachmentType type;
    private String url;
    
    @OneToMany(mappedBy = "attachment")
    private Set<AttachmentMetadata> metadata;


    @ManyToOne
    @JoinColumn(name = "post_id") // this annotation is used to specify the column name of the foreign key in the database table.
    private Post post;
    
}
