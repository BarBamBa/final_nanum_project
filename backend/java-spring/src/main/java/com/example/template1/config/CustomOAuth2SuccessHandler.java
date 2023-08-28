package com.example.template1.config;

import com.example.template1.model.Users;
import com.example.template1.model.dto.TokenInfo;
import com.example.template1.service.CustomOAuth2UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

@RequiredArgsConstructor
@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    public static final String REDIRECT_URI = "http://localhost:5173/login/oauth2/callback";
    public static final String REFRESH_TOKEN_NAME = "refresh_token";
    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(1);
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofMinutes(30);

    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtTokenProvider jwtTokenProvider;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException{
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttributes().get("email") + "";
        Users user = customOAuth2UserService.getUserByEmail(email);
        TokenInfo tokeninfo = jwtTokenProvider.generateToken(user);
        response.sendRedirect(UriComponentsBuilder.fromUriString(REDIRECT_URI)
                        .queryParam("access_token", tokeninfo.getAccessToken())
                        .queryParam("refresh_token", tokeninfo.getRefreshToken())
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString());
    }
}
