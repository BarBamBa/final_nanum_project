package com.example.template1.controller;

import com.example.template1.model.Applicants;
import com.example.template1.model.QnA;
import com.example.template1.model.dto.ApplicantsResponse;
import com.example.template1.model.dto.QnaResponse;
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

    @GetMapping("/myVolunteer") //게시판 리스트 조회
    public ResponseEntity<List<ApplicantsResponse>> getAllMyVolunteers() {
        List<ApplicantsResponse> myVolunteers = applicantService.getAllMyVolunteer()
                .stream()
                .filter(applicants -> applicants.getStatus() == 'Y') //상태 N은 삭제상태로 설정
                .map(ApplicantsResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(myVolunteers);
    }

    @GetMapping("/myVolunteer/{id}")
    public ResponseEntity<ApplicantsResponse> findMyVolunteerById(@PathVariable long id) {
        Applicants myVoluteerById = applicantService.getMyVolunteerById(id);
        return ResponseEntity.ok()
                .body(new ApplicantsResponse(myVoluteerById));
    }
}
