package com.ousaro.gamindie.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("activate_account"); // this is the name of the template file in the resources/templates folder

    private final String name; // this is the name of the template file in the resources/templates folder 

    EmailTemplateName(String name) {
            this.name = name;
    }
    
        
}
