package com.example.template1.config.oauth;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum OAuth2Attributes {
    GOOGLE("google", (attributes) -> {
        OAuth2UserDto oAuth2UserDto = new OAuth2UserDto();
        oAuth2UserDto.setNickname((String) attributes.get("name"));
        oAuth2UserDto.setEmail((String) attributes.get("email"));
        return oAuth2UserDto;
    });

    private final String registrationId;
    private final Function<Map<String, Object>, OAuth2UserDto> of;

    OAuth2Attributes(String registrationId, Function<Map<String, Object>, OAuth2UserDto> of) {
        this.registrationId = registrationId;
        this.of = of;
    }

    public static OAuth2UserDto extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }
}