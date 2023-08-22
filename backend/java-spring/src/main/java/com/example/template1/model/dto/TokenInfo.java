package com.example.template1.model.dto;

import com.example.template1.model.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class TokenInfo {

    private String grantType;
    private String accessToken;
    private String refreshToken;
    private String nickname;

}
