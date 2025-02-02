package com.ousaro.gamindie.user;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.Email;

public record UserRequest(
    @NonNull Integer id,
    String bio,
    @Email String email,
    String firstName,
    String lastName,
    Integer profilePrictureId){

}
