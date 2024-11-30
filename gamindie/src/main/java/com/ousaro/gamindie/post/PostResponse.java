package com.ousaro.gamindie.post;

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
public class PostResponse {

    private Integer id;
    private String Content;
    private String owner;

}
