package com.ousaro.gamindie.attachment;

import java.util.Map;


import com.ousaro.gamindie.commun.BaseEntity;
import com.ousaro.gamindie.post.Post;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
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
    @ElementCollection
    @CollectionTable(name = "attachment_metadata", joinColumns = @JoinColumn(name = "attachment_id"))
    @MapKeyColumn(name = "key")
    @Column(name = "value")
    private Map<String, String> metadata;



    @ManyToOne
    @JoinColumn(name = "post_id") // this annotation is used to specify the column name of the foreign key in the database table.
    private Post post;
    
}
