package com.example.template1.service;

import com.example.template1.model.*;
import com.example.template1.repository.ApplicantsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

    public List<Applicants> getAllMyVolunteer() { //나의자원봉사내역조회
        List<Applicants> applicantsList = applicantsRepository.findAllByOrderByCreateAtDesc();
        return applicantsList;
    }

    public Applicants getMyVolunteerById(long id) {
        Applicants applicants = applicantsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));;
        return applicants;
    }

}
