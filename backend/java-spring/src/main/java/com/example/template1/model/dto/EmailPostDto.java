package com.example.template1.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
public class EmailPostDto {

    @NotNull
    @Email
    private String email;
}
