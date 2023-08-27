package com.example.template1.repository;

import com.example.template1.model.Applicants;
import com.example.template1.model.Board;
import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ApplicantsRepository extends JpaRepository<Applicants, Long> {

    boolean existsByVolunteerId(Long volunteer_id);
    boolean existsByUsersAndVolunteerAndSelectedDay(Users users, Volunteer volunteer, LocalDateTime selectedDay);
    List<Applicants> findAllByOrderByCreateAtDesc();
    List<Applicants> findAllByUsersOrderByCreateAtDesc(Users users);
}
