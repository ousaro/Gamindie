package com.ousaro.gamindie.commun;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@SuperBuilder // super builder instead of the default builder to allow the use of the builder pattern in the subclasses
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass // this annotation is used to indicate that the class is a superclass of an entity class
@EntityListeners(AuditingEntityListener.class) // AuditingEntityListener.class: class that will listen to the events of the entity
public class BaseEntity {
    

    @Id
    @GeneratedValue
    private Integer id;


    @CreatedDate // Annotation that will be used to mark the field that will store the creation date of the entity
    @Column(nullable= false, updatable = false)
    private LocalDateTime createdData;
    

    @LastModifiedDate // Annotation that will be used to mark the field that will store the last modification date of the entity
    @Column(insertable= false)
    private LocalDateTime lastModifiedDate;

    @CreatedBy // Annotation that will be used to mark the field that will store the user who created the entity 
    @Column(nullable=false, updatable=false)
    private Integer createdBy;

    @LastModifiedBy // this annotation let us know the user who last modified the entity in the database
    @Column(insertable= false)
    private Integer lastModifiedBy;
}
