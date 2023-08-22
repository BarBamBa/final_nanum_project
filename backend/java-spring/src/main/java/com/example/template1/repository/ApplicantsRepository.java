package com.example.template1.repository;

import com.example.template1.model.Applicants;
import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface ApplicantsRepository extends JpaRepository<Applicants, Long> {

    boolean existsByVolunteerId(Long volunteer_id);
    boolean existsByUsersIdAndVolunteerIdAndSelectedDay(Long users_id, Long volunteer_id, LocalDateTime selectedDay);
}
