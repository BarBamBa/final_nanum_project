package com.example.template1.model.dto;

import com.example.template1.model.Board;
import com.example.template1.model.Reply;
import com.example.template1.model.Report;
import com.example.template1.model.Users;
import com.example.template1.model.enums.Authority;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public class UserResponse {
    private final Long id;

    private final String email;

    private final String nickname;

    private final String name;

    private final String address;

    private final int age;

    private final char gender;

    private final String phone;

    private final Authority authority;

    private final char status;

    private final char emailVerify;

    private final LocalDateTime createAt;

    private final LocalDate createAt2;// yyyy-MM-dd 형태

    private final String createAt3;// yyyy-MM-dd HH:mm:ss ㅎ형태

    private final LocalDateTime updateAt;




    public UserResponse(Users users) {
        this.id = users.getId();
        this.email = users.getEmail();
        this.nickname = users.getNickname();
        this.name = users.getName();
        this.address = users.getAddress();
        this.age = users.getAge();
        this.gender = users.getGender();
        this.phone = users.getPhone();
        this.authority = users.getAuthority();
        this.status = users.getStatus();
        this.emailVerify = users.getEmailVerify();
        this.createAt = users.getCreateAt();
        this.createAt2 = LocalDate.from(users.getCreateAt());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.createAt3 = users.getCreateAt().format(formatter);
        this.updateAt = users.getUpdateAt();

    }



}
