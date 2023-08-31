package com.example.template1.config.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class JwtTokenDto {

    private String grantType;
    private String accessToken;
    private Long accessTokenExpiresIn;
    private String refreshToken;
    private String nickname;
}
