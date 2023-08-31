package com.example.template1.model.dto;

import com.example.template1.model.Users;
import com.example.template1.repository.UsersRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
public class Oauth2UserDetailDto {

    private String address;
    private String phone;
    private String name;
    private char gender;
    private int age;

    public Users toEntity(Users user) {
        user.setAddress(this.address);
        user.setPhone(this.phone);
        user.setName(this.name);
        user.setGender(this.gender);
        user.setAge(this.age);

        return user;
    }

}
