package com.example.template1.service;

import com.example.template1.model.EmailAuth;
import com.example.template1.model.Users;
import com.example.template1.repository.EmailAuthRepository;
import com.example.template1.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.chrono.ChronoLocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

import static java.time.LocalTime.now;

@Service
@EnableAsync
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final UsersRepository usersRepository;
    private final EmailAuthRepository emailAuthRepository;

    @Transactional
    public void verificationMail(String email, String token) {
        // 사용자 정보 가져오기
        Users user = usersRepository.findByEmail(email);

        // 토큰 정보 가져오기
        EmailAuth emailAuth = emailAuthRepository.findEmailAuthByEmailAndAuthToken(email, token);

        // 인증 토큰 검사 & 사용자 정보와 비교 후 토큰 만료 및 이메일 인증 완료
        if(emailAuth.getExpiration().isBefore(ChronoLocalDateTime.from(now()))) {
            user.setEmailVerify('Y');
            emailAuth.setUseToken(true);
            emailAuthRepository.save(emailAuth);
            usersRepository.save(user);
        }
    }

    @Async
    public void sendVerificationMail(String email) {
        // 이메일 인증용 토큰 발급
        EmailAuth emailAuth = EmailAuth.builder()
                .email(email)
                .authToken(codeBuilder())
                .useToken(false)
                .build();

        emailAuthRepository.save(emailAuth);

//         이메일 인증용 토큰 링크 이메일 발송
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(email);
        mail.setSubject("[나눔] 이메일 인증 메일입니다.");
        mail.setText(setContext(email, emailAuth.getAuthToken(), "VerifyEmail"));

        javaMailSender.send(mail);
    }

    @Async
    public void sendTemporalPasswordMail(String email) {
        // 사용자 임시 비밀번호 적용
        Users user = usersRepository.findByEmail(email);
        String code = codeBuilder();
        user.setPassword(code);
        usersRepository.save(user);

        // 임시 비밀번호 이메일 발송
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(email);
        mail.setSubject("[나눔] 비밀번호 재설정 메일입니다.");
        mail.setText(setContext(email, code, "TemporalPasswordMail"));

        javaMailSender.send(mail);
    }

    // 16자리 무작위 문자열 구성
    private String codeBuilder() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < 16; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0 -> code.append((char) (random.nextInt(26) + 97));
                case 1 -> code.append((char) (random.nextInt(26) + 65));
                default -> code.append(random.nextInt(9));
            }
        }
        return code.toString();
    }

    // ThymeLeaf 페이지 형식의 이메일 내용 적용
    public String setContext(String email, String code, String type) {
        Context context = new Context();
        context.setVariable("email", email);
        context.setVariable("code", code);
        return templateEngine.process(type, context);
    }
}
