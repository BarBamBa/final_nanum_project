package com.example.template1.service;

import com.example.template1.model.Applicants;
import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import com.example.template1.repository.ApplicantsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ApplicantService {
    private final ApplicantsRepository applicantsRepository;

    public Boolean existByVolunteerId(Long volunteer_id) {

        return applicantsRepository.existsByVolunteerId(volunteer_id);
    }
    public Boolean existByUserIdAndVolunteerIdAndSelectedDay(Long users_id, Long volunteer_id, LocalDateTime selectedDay) {

        return applicantsRepository.existsByUsersIdAndVolunteerIdAndSelectedDay(users_id, volunteer_id, selectedDay);
    };

    public Applicants addApplicant(Users users, Volunteer volunteer, LocalDateTime selectedDay) {
        Applicants applicants = Applicants.builder()
                .users(users)
                .volunteer(volunteer)
                .selectedDay(selectedDay)
                .build();

        return applicantsRepository.save(applicants);
    }


}
