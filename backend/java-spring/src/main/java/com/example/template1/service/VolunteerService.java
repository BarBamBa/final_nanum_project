package com.example.template1.service;

import com.example.template1.model.Board;
import com.example.template1.model.Users;
import com.example.template1.model.Volunteer;
import com.example.template1.model.dto.VolunteerRequestDto;
import com.example.template1.repository.UsersRepository;
import com.example.template1.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class VolunteerService {
    private final ApplicantService applicantService;
    private final VolunteerRepository volunteerRepository;
    private final UsersRepository usersRepository;

    // 봉사활동 신청
    // 봉사활동 DB 등록 여부 확인 -> DB 저장 혹은 존재하는 봉사활동 불러오기 -> 신청 정보 저장
    public void volunteerValidation(VolunteerRequestDto dto, Long uid, LocalDateTime date) {

        // 사용자 ID 확인
        if (!usersRepository.existsById(uid)) {
            System.out.println("#### There's no User matches with request data ####");
            return;
        }

        Users user = usersRepository.findById(uid).orElseThrow(() -> new IllegalArgumentException("not found" + uid));

        // 예약 일자 유효성 확인
        if (date.isBefore(LocalDateTime.now())) {
            System.out.println("#### The Date is OutDated ####");
            return;
        }

        // 봉사 활동 번호 확인
        if (!volunteerRepository.existsByNumber(dto.getNumber())) {
            volunteerRepository.save(dto.toEntity());
        }

        Volunteer volunteer = volunteerRepository.findByNumber(dto.getNumber());

        // 봉사 활동 예약
        applicantService.addApplicant(user, volunteer, date);
    }

    public Volunteer getVolunteer(long id) {

        return volunteerRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
    }

    public Users findEmailValidation(long id) {

        return usersRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found : " + id));
    }


}
