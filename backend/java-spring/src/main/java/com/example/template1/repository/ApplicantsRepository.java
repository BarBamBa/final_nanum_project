package com.example.template1.repository;

import com.example.template1.model.Applicants;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicantsRepository extends JpaRepository<Applicants, Long> {
}
