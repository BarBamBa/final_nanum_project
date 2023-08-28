package com.example.template1.service;

import com.example.template1.config.JwtTokenProvider;
import com.example.template1.model.Users;
import com.example.template1.model.dto.Oauth2UserDto;
import com.example.template1.model.dto.TokenInfo;
import com.example.template1.model.enums.OAuth2Attributes;
import com.example.template1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UsersRepository usersRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        Map<String, Object> attributes = oAuth2User.getAttributes();

        Oauth2UserDto dto = OAuth2Attributes.extract(registrationId, attributes);
        Users user = usersRepository.save(dto.toEntity());

        jwtTokenProvider.generateToken(user);

        Map<String, Object> customAttribute = customAttribute(attributes, userNameAttributeName, dto, registrationId);

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("USER")),
                customAttribute,
                userNameAttributeName);
    }

    private Map<String, Object> customAttribute(Map<String, Object> attributes, String userNameAttributeName, Oauth2UserDto dto, String regId) {
        Map<String, Object> customAttribute = new LinkedHashMap<>();
        customAttribute.put(userNameAttributeName, attributes.get(userNameAttributeName));
        customAttribute.put("provider", regId);
        customAttribute.put("name", dto.getNickname());
        customAttribute.put("email", dto.getEmail());
        return customAttribute;
    }

    public Users getUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
}
