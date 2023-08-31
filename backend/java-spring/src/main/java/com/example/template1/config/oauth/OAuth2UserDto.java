package com.example.template1.config.oauth;

import com.example.template1.config.jwt.JwtTokenDto;
import com.example.template1.model.Users;
import com.example.template1.model.enums.Authority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuth2UserDto {
    private String email;
    private String provider;
    private String nickname;

    public Users toEntity() {
        return Users.builder()
                .email(email)
                .nickname(nickname)
                .authority(Authority.ROLE_USER)
                .emailVerify('Y')
                .build();
    }

    public Users toEntity(JwtTokenDto jwtTokenDto) {
        return Users.builder()
                .email(email)
                .nickname(nickname)
                .authority(Authority.ROLE_USER)
                .emailVerify('Y')
                .accessToken(jwtTokenDto.getAccessToken())
                .accessTokenExpireIn(jwtTokenDto.getAccessTokenExpiresIn())
                .refreshToken(jwtTokenDto.getRefreshToken())
                .build();
    }

}
