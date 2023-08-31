package com.example.template1.repository;

import com.example.template1.model.Applicants;
import com.example.template1.model.Board;
import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import com.example.template1.model.dto.ApplicantsResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ApplicantsRepository extends JpaRepository<Applicants, Long> {

    boolean existsByUsersAndVolunteerAndSelectedDay(Users users, Volunteer volunteer, LocalDateTime selectedDay);
    Applicants findByIdAndUsers(Long id, Users users);
    List<Applicants> findAllByOrderByCreateAtDesc();
    List<Applicants> findAllByUsersOrderByCreateAtDesc(Users users);
    List<Applicants> findByUsers(Users users);
    List<Applicants> findByStatusOrderByCreateAtDesc(char status);
}
