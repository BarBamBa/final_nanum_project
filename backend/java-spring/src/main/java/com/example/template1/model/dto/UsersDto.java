package com.example.template1.model.dto;


import com.example.template1.model.Users;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class UsersDto {

    private String name;

    private String password;

    private String nickname;

    private String email;

    private String address;

    private String phone;

    private char gender;

//    public Users toEntity() {
//        return  Users.builder()
//                .name(name)
//                .password(password)
//                .email(email)
//                .address(address)
//                .phone(phone)
//                .nickname(nickname)
//                .build();
//
//    }

}
