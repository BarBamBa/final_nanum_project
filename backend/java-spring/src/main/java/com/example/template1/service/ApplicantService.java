package com.example.template1.service;

import com.example.template1.model.*;
import com.example.template1.model.dto.ApplicantsRequest;
import com.example.template1.model.dto.ApplicantsResponse;
import com.example.template1.model.enums.Authority;
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
                .status('R')
                .build();

        applicantsRepository.save(applicants);
    }

    // 봉사활동 승인
    public void grantApp(Long userId, Long id) {

        // 사용자 ID 확인
        if(!usersRepository.existsById(userId)) {
            System.out.println("#### There's no User matches with request data ####");
            return;
        }

        Users user = usersRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("not found" + userId));

        // 관리자 권한 확인
        if(user.getAuthority().equals(Authority.ROLE_USER)) {
            System.out.println("#### There's no permission to Execute this function ####");
            return;
        }

        Applicants app = applicantsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found" + id));
        app.setStatus('Y');
        applicantsRepository.save(app);
        System.out.println("#### The Application's permission has been granted ####");
    }

    // 봉사활동 취소
    public void cancelApp(Long id) {

        // 사용자 ID 확인
//        if (!usersRepository.existsById(userId)) {
//            System.out.println("#### There's no User matches with request data ####");
//            return;
//        }

//        Users user = usersRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("not found" + userId));

//        // 봉사활동 ID 확인
//        if (!applicantsRepository.existsById(id)) {
//            System.out.println("#### There's no Applicant matches with request data ####");
//            return;
//        }

        Applicants app = applicantsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found" + id));
        app.setStatus('C');
        applicantsRepository.save(app);
        System.out.println("#### The Application has been cancelled ####");
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

    public List<Applicants> getApplicants(Users id) {
        List<Applicants> applicants = applicantsRepository.findByUsers(id);

        return applicants;
    }

}
