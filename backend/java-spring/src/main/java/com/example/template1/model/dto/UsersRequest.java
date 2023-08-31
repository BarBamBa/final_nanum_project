package com.example.template1.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersRequest {

    private Long id;

    private String name;

    private String email;

    private String nickname;

}
