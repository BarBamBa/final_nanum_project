package com.example.template1.config.oauth;

import com.example.template1.config.jwt.JwtTokenDto;
import com.example.template1.config.jwt.JwtTokenProvider;
import com.example.template1.model.Users;
import com.example.template1.model.enums.OAuth2Attributes;
import com.example.template1.repository.UsersRepository;
import jakarta.transaction.Transactional;
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
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final JwtTokenProvider jwtTokenProvider;
    private final UsersRepository usersRepository;

    /**
     * oauth 로그인 성공 시에 sucesshandler 전에 호출되는 메소드
     * */
    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest); // OAuth 서비스(kakao, google, naver)에서 가져온 유저 정보를 담고있음

        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId(); // OAuth 서비스 이름(ex. kakao, naver, google)
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName(); // OAuth 로그인 시 키(pk)가 되는 값
        Map<String, Object> attributes = oAuth2User.getAttributes(); // OAuth 서비스의 유저 정보들

        // registrationId에 따라 유저 정보를 통해 공통된 UserProfile 객체로 만들어 줌
        OAuth2UserDto oAuth2UserDto = OAuth2Attributes.extract(registrationId, attributes);
        oAuth2UserDto.setProvider(registrationId);
        Users user = saveOrUpdate(oAuth2UserDto);

        JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(user.getId().toString());
        saveOrUpdate(user, jwtTokenDto);

        Map<String, Object> customAttribute = customAttribute(attributes, userNameAttributeName, oAuth2UserDto, registrationId);
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("USER")),
                customAttribute,
                userNameAttributeName);
    }

    private Map<String, Object> customAttribute(Map <String, Object>attributes, String userNameAttributeName, OAuth2UserDto oAuth2UserDto, String registrationId) {
        Map<String, Object> customAttribute = new LinkedHashMap<>();
        customAttribute.put(userNameAttributeName, attributes.get(userNameAttributeName));
        customAttribute.put("provider", registrationId);
        customAttribute.put("name", oAuth2UserDto.getNickname());
        customAttribute.put("email", oAuth2UserDto.getEmail());
        return customAttribute;

    }

    private Users saveOrUpdate(OAuth2UserDto oAuth2UserDto) {
        Users user;
        if (usersRepository.existsByEmail(oAuth2UserDto.getEmail())) {
            user = usersRepository.findByEmail(oAuth2UserDto.getEmail());
            user.setEmail(oAuth2UserDto.getEmail());
            user.setNickname(oAuth2UserDto.getNickname());
        } else {
            user = oAuth2UserDto.toEntity();
        }

        return usersRepository.save(user);
    }

    private Users saveOrUpdate(Users user, JwtTokenDto jwtTokenDto) {
        if (Objects.isNull(user.getId()))
            return null;

        user.setAccessToken(jwtTokenDto.getAccessToken());
        user.setAccessTokenExpireIn(jwtTokenDto.getAccessTokenExpiresIn());
        user.setRefreshToken(jwtTokenDto.getRefreshToken());
        return usersRepository.save(user);
    }

    private Users saveOrUpdate(OAuth2UserDto oAuth2UserDto, JwtTokenDto jwtTokenDto) {
        Users user;
        if (usersRepository.existsByEmail(oAuth2UserDto.getEmail())) {
            user = usersRepository.findByEmail(oAuth2UserDto.getEmail());
            user.setAccessToken(jwtTokenDto.getAccessToken());
            user.setAccessTokenExpireIn(jwtTokenDto.getAccessTokenExpiresIn());
            user.setRefreshToken(jwtTokenDto.getRefreshToken());
        } else {
            user = oAuth2UserDto.toEntity(jwtTokenDto);
        }

        return usersRepository.save(user);
    }

    public Users getUsersByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

}
