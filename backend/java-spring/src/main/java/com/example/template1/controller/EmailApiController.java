package com.example.template1.controller;

import com.example.template1.model.Users;
import com.example.template1.model.dto.EmailPostDto;
import com.example.template1.repository.UsersRepository;
import com.example.template1.service.EmailService;
import com.example.template1.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class EmailApiController {

    private final EmailService emailService;
    private final UserService userService;

    @PostMapping("/verify")  // 이메일 인증 링크 메일 발송
    public ResponseEntity<?> sendVerifyEmail(@RequestBody @Valid EmailPostDto postDto) throws MessagingException {
        emailService.sendVerificationMail(postDto.getEmail());
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/password")  // 임시 비밀번호 메일 발송
//    public ResponseEntity sendTempPassword(@RequestBody @Valid EmailPostDto emailPostDto) throws MessagingException {
//        emailService.sendTemporalPasswordMail(emailPostDto);
//        return ResponseEntity.ok().build();
//    }


    @PostMapping("/password")  // 임시 비밀번호 메일 발송
    public ResponseEntity<?> sendTempPassword(@RequestBody @Valid EmailPostDto emailPostDto) throws MessagingException {
        String foundEmail = userService.findPasswordByEmailByNameAndPhone(emailPostDto.getName(), emailPostDto.getPhone(), emailPostDto.getEmail());

        if (foundEmail != null) {
            emailService.sendTemporalPasswordMail(emailPostDto);
            return ResponseEntity.ok("ok");
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "입력한 정보와 일치하는 사용자를 찾을 수 없습니다.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    @GetMapping("/confirm/email/{email}/token/{token}")  // 이메일 인증 링크 확인
    public ModelAndView checkVerifyEmail(@PathVariable String email, @PathVariable String token) {
        emailService.verificationMail(email, token);
        return new ModelAndView("VerifiedAccess");
    }
}
