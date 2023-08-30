package com.example.template1.config.oauth;

import com.example.template1.model.Users;
import com.example.template1.config.oauth.CustomOAuth2UserService;
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

@RequiredArgsConstructor
@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    public static final String REDIRECT_URI = "http://localhost:5173/oauth2login/callback";

    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException{
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String loginEmail = (String) oAuth2User.getAttributes().get("email");
        Users user = customOAuth2UserService.getUsersByEmail(loginEmail);

        response.sendRedirect(UriComponentsBuilder.fromUriString(REDIRECT_URI)
                        .queryParam("accessToken", user.getAccessToken())
                        .queryParam("tokenExpiresIn", user.getAccessTokenExpireIn())
                        .queryParam("refreshToken", user.getRefreshToken())
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString());
    }
}
