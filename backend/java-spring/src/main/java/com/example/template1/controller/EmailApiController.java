package com.example.template1.controller;

import com.example.template1.model.dto.EmailPostDto;
import com.example.template1.model.dto.EmailResponseDto;
import com.example.template1.repository.UsersRepository;
import com.example.template1.service.EmailService;
import com.example.template1.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailApiController {

    private final EmailService emailService;

    @GetMapping("/verify")  // 이메일 인증 링크 메일 발송
    public ResponseEntity<EmailResponseDto> sendVerifyEmail(@RequestBody EmailPostDto emailPostDto) {
        emailService.sendVerificationMail(emailPostDto.getEmail());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/password")  // 임시 비밀번호 메일 발송
    public ResponseEntity<EmailResponseDto> sendTempPassword(@RequestBody EmailPostDto emailPostDto) {
        emailService.sendTemporalPasswordMail(emailPostDto.getEmail());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/verify/email/{email}/token/{token}")  // 이메일 인증 링크 확인
    public ResponseEntity<EmailResponseDto> checkVerifyEmail(@PathVariable String email, @PathVariable String token) {
        emailService.verificationMail(email, token);
        return ResponseEntity.ok().build();
    }
}
