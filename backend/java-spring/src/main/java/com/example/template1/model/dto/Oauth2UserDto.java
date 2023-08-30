package com.example.template1.model.dto;

import com.example.template1.model.Users;
import com.example.template1.model.enums.Authority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Oauth2UserDto {
    private String email;
    private String nickname;

    public Users toEntity() {
        return Users.builder()
                .email(email)
                .nickname(nickname)
                .authority(Authority.ROLE_USER)
                .emailVerify('Y')
                .build();
    }

}
