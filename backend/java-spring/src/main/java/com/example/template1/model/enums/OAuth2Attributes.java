package com.example.template1.model.enums;

import com.example.template1.config.oauth.OAuth2UserDto;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum OAuth2Attributes {
    GOOGLE("google", (attributes) -> {
        OAuth2UserDto dto = new OAuth2UserDto();
        dto.setEmail((String) attributes.get("email"));
        dto.setNickname((String) attributes.get("name"));

        return dto;
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