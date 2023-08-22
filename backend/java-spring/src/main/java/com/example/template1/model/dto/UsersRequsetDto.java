package com.example.template1.model.dto;

import com.example.template1.model.Users;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Data
@Getter
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class UsersRequsetDto {

    private String email;
    private String password;

        public Users toEntity() {
        return  Users.builder()
                .password(password)
                .email(email)
                .build();

    }
}
