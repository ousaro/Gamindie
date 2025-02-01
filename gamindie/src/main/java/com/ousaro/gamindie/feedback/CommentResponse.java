package com.ousaro.gamindie.feedback;

import java.time.LocalDateTime;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {

    private Integer id;
    private String Content;
    private Integer postId;
    private Integer createdBy;
    private Integer parentId;
    private LocalDateTime createdData; 
    

}
