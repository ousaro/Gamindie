package com.ousaro.gamindie.file;



import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Setter;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AttachmentMetadata {
    
    @Id
    @GeneratedValue
    private Integer id;

    private String key;
    private String value;

    @ManyToOne
    @JoinColumn(name = "attachment_id")
    private Attachment attachment;
    
}
