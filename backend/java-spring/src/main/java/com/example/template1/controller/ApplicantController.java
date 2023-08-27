package com.example.template1.controller;

import com.example.template1.model.Applicants;
import com.example.template1.model.dto.ApplicantsResponse;
import com.example.template1.service.ApplicantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApplicantController {
    private final ApplicantService applicantService;

    // 봉사활동 예약 취소
    @GetMapping("/app/cancel")
    public ResponseEntity cancelApplicant(@RequestBody Long userId, Long id) {
        applicantService.cancelApp(userId, id);

        return ResponseEntity.ok().build();
    }

    // 봉사활동 예약 승인
    @GetMapping("/app/permit")
    public ResponseEntity grantApplicant(@RequestBody Long userId, Long id) {
        applicantService.grantApp(userId, id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/allVolunteer") // 모든 봉사활동 예약 리스트 조회
    public ResponseEntity<List<ApplicantsResponse>> getAllVolunteers() {
        List<ApplicantsResponse> myVolunteers = applicantService.getAllVolunteer()
                .stream()
                .filter(applicants -> applicants.getStatus() == 'Y') //상태 N은 삭제상태로 설정
                .map(ApplicantsResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(myVolunteers);
    }

    @GetMapping("/myVolunteer")  // 사용자의 봉사활동 예약 리스트 조회
    public ResponseEntity<List<ApplicantsResponse>> getAllVolunteersByUserId(@RequestBody Long userId) {
        List<ApplicantsResponse> myVolunteers = applicantService.getAllVolunteerByUserId(userId)
                .stream()
                .map(ApplicantsResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(myVolunteers);
    }

    @GetMapping("/myVolunteer/{id}") // 봉사활동 예약 개별 조회
    public ResponseEntity<ApplicantsResponse> findMyVolunteerById(@PathVariable Long id) {
        Applicants myVolunteerById = applicantService.getMyVolunteerById(id);
        return ResponseEntity.ok()
                .body(new ApplicantsResponse(myVolunteerById));
    }
}
