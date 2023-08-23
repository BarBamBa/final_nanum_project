package com.example.template1.model.dto;


import com.example.template1.model.Users;
import com.example.template1.repository.UsersRepository;
import lombok.*;

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
    }


}
