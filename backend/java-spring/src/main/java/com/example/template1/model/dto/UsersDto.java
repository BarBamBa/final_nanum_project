package com.example.template1.model.dto;


import com.example.template1.model.Users;
import com.example.template1.model.enums.Authority;
import com.example.template1.repository.UsersRepository;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Getter
@Builder
@Setter
public class UsersDto {
    private Long id;

    private String name;

    private int age;

    private String password;

    private String nickname;

    private String email;

    private String address;

    private String phone;

    private char gender;

    private Authority authority;

    private LocalDateTime createAt;

    private LocalDate createAt2;// yyyy-MM-dd 형태

    private String createAt3;// yyyy-MM-dd HH:mm:ss ㅎ형태

    private LocalDateTime updateAt;


    public UsersDto(Users users) {
        this.id = users.getId();
        this.name = users.getName();
        this.age = users.getAge();
        this.password = users.getPassword();
        this.nickname = users.getNickname();
        this.email = users.getEmail();
        this.address = users.getAddress();
        this.phone = users.getPhone();
        this.gender = users.getGender();
        this.authority = users.getAuthority();
        this.createAt = users.getCreateAt();
        this.createAt2 = LocalDate.from(users.getCreateAt());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.createAt3 = users.getCreateAt().format(formatter);
        this.updateAt = users.getUpdateAt();
    }


}
