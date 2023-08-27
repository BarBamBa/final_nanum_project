package com.example.template1.controller;

import com.example.template1.model.dto.EmailPostDto;
import com.example.template1.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class EmailApiController {

    private final EmailService emailService;

    @GetMapping("/verify")  // 이메일 인증 링크 메일 발송
    public ResponseEntity sendVerifyEmail(@RequestBody @Valid EmailPostDto postDto) throws MessagingException {
        emailService.sendVerificationMail(postDto.getEmail());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/password")  // 임시 비밀번호 메일 발송
    public ResponseEntity sendTempPassword(@RequestBody @Valid EmailPostDto emailPostDto) throws MessagingException {
        emailService.sendTemporalPasswordMail(emailPostDto.getEmail());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/confirm/email/{email}/token/{token}")  // 이메일 인증 링크 확인
    public ModelAndView checkVerifyEmail(@PathVariable String email, @PathVariable String token) {
        emailService.verificationMail(email, token);
        return new ModelAndView("VerifiedAccess");
    }
}
