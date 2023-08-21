package com.example.template1.repository;

import com.example.template1.model.Users;
import com.example.template1.model.dto.UsersDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UsersRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByNickname(String nickname);
    Optional<Users> findByEmail(String email);

    Users findByEmailAndPassword(final String email, final String password);


}
