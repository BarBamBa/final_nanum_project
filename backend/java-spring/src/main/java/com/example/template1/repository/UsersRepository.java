package com.example.template1.repository;

import com.example.template1.model.Users;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface UsersRepository extends JpaRepository<Users, Long> {

    boolean existsByEmail(String email);

    Optional<Users> findByNickname(String nickname);

    Users findByEmail(String email);

    Users findByNameAndPhoneAndEmail (String name, String phone, String email);

    Users findByNameAndPhone(String name, String phone);

    List<Users> findAllByOrderByCreateAtDesc();

    List<Users> findAllByIdOrderByCreateAtDesc(long id);

    List<Users> findAllByNameContainingOrderByCreateAtDesc(String name);

    List<Users> findAllByEmailContainingOrderByCreateAtDesc(String email);

    List<Users> findAllByNicknameContainingOrderByCreateAtDesc(String nickname);



}
