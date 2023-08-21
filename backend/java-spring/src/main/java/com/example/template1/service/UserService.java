package com.example.template1.service;

import com.example.template1.model.Users;
import com.example.template1.model.dto.UsersDto;
import com.example.template1.model.dto.UsersRequsetDto;
import com.example.template1.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public Users saveUser(UsersDto dto) {
        Users users = Users.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .age(dto.getAge())
                .password(dto.getPassword())
                .address(dto.getAddress())
                .nickname(dto.getNickname())
                .phone(dto.getPhone())
                .gender(dto.getGender())
                .build();
        System.out.println(users.getId());
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        users.setPassword(encodedPassword);

        return usersRepository.save(users);
    }

    // 닉네임 중복확인
    public boolean isNicknameAvailable(String nickname) {
        Optional<Users> existingUser = usersRepository.findByNickname(nickname);
        return !existingUser.isPresent();
    }

    // 이메일 중복확인
    public boolean isEmailAvailable(String email) {
        Optional<Users> existingUser = usersRepository.findByEmail(email);
        return !existingUser.isPresent();
    }

    // 비밀번호 암호화

    public String encodePassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    public Users findBy(final UsersDto params) {
        Users entity = usersRepository.findByEmailAndPassword(params.getEmail(), params.getPassword());
        return entity;
    }




}
