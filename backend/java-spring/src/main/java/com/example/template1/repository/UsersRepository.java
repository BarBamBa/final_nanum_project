package com.example.template1.repository;

import com.example.template1.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UsersRepository extends JpaRepository<Users, Long> {

    boolean existsByEmail(String email);

    Optional<Users> findByNickname(String nickname);

    Users findByEmail(String email);

    Users findByNameAndPhoneAndEmail (String name, String phone, String email);

    Users findByNameAndPhone(String name, String phone);
}
