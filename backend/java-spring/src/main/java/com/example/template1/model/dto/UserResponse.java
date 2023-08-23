package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.Users;
import lombok.Getter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
public class UserResponse {

    private String name;

    private String nickname;

    private String email;

    private String address;

    private String phone;

    public UserResponse(Users users) {
        this.email = users.getEmail();
        this.name = users.getName();
        this.nickname = users.getNickname();
        this.address = users.getAddress();
        this.phone = users.getPhone();

    }

}
