package com.example.template1.model.enums;

import com.example.template1.model.dto.Oauth2UserDto;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum OAuth2Attributes {
    GOOGLE("google", (attributes) -> {
        Oauth2UserDto dto = new Oauth2UserDto();
        dto.setEmail((String) attributes.get("email"));
        dto.setNickname((String) attributes.get("name"));

        return dto;
    });

    private final String registrationId;
    private final Function<Map<String, Object>, Oauth2UserDto> of;

    OAuth2Attributes(String registrationId, Function<Map<String, Object>, Oauth2UserDto> of) {
        this.registrationId = registrationId;
        this.of = of;
    }

    public static Oauth2UserDto extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }
}