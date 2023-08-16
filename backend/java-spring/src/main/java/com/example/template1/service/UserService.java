package com.example.template1.service;

import com.example.template1.model.Users;
import com.example.template1.model.dto.UsersDto;
import com.example.template1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UsersRepository usersRepository;

    public Users saveUser(UsersDto dto) {
        Users users = Users.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .address(dto.getAddress())
                .nickname(dto.getNickname())
                .phone(dto.getPhone())
                .gender(dto.getGender())
                .build();
        System.out.println(users.getId());

        return usersRepository.save(users);
    }
}
