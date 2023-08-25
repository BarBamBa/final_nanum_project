package com.example.template1.repository;

import com.example.template1.model.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long> {

    EmailAuth findEmailAuthByEmailAndAuthToken(String email, String authToken);
}
