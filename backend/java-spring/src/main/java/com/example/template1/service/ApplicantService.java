package com.example.template1.service;

import com.example.template1.model.*;
import com.example.template1.repository.ApplicantsRepository;
import com.example.template1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ApplicantService {

    private final ApplicantsRepository applicantsRepository;
    private final UsersRepository usersRepository;

    // 봉사활동 예약
    public void addApplicant(Users users, Volunteer volunteer, LocalDateTime selectedDay) {

        // 중복 예약 방지
        if(applicantsRepository.existsByUsersAndVolunteerAndSelectedDay(users, volunteer, selectedDay)) {
            System.out.println("#### The application already exist ####");
            return;
        }

        Applicants applicants = Applicants.builder()
                .users(users)
                .volunteer(volunteer)
                .selectedDay(selectedDay)
                .build();

        applicantsRepository.save(applicants);
    }

    // 모든 봉사활동 신청 내역 조회
    public List<Applicants> getAllVolunteer() {
        return applicantsRepository.findAllByOrderByCreateAtDesc();
    }

    // 사용자의 봉사활동 신청 내역 조회
    public List<Applicants> getAllVolunteerByUserId(Long userId) {

        // 사용자 ID 확인
        if (!usersRepository.existsById(userId)) {
            System.out.println("#### There's no User matches with request data ####");
            return null;
        }
        Users user = usersRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("not found" + userId));

        return applicantsRepository.findAllByUsersOrderByCreateAtDesc(user);
    }

    // 개별 봉사활동 신청 내역 조회
    public Applicants getMyVolunteerById(long id) {
        Applicants applicants = applicantsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));;

        return applicants;
    }

}
