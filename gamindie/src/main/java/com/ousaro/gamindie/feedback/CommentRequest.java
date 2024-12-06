package com.ousaro.gamindie.feedback;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    
    
    private String content;

    
    private Integer postId;

    private Integer parentId;
}
