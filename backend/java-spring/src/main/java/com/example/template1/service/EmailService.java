package com.example.template1.service;

import com.example.template1.model.EmailAuth;
import com.example.template1.model.Users;
import com.example.template1.model.dto.EmailPostDto;
import com.example.template1.repository.EmailAuthRepository;
import com.example.template1.repository.UsersRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void verificationMail(String email, String token) {
        Users user = new Users();
        EmailAuth emailAuth = new EmailAuth();

        // 사용자 정보 가져오기
        if(usersRepository.existsByEmail(email)) {
            user = usersRepository.findByEmail(email);
        }

        // 토큰 정보 가져오기
        if(emailAuthRepository.existsByEmailAndAuthToken(email, token)) {
            emailAuth = emailAuthRepository.findEmailAuthByEmailAndAuthToken(email, token);
        }

        if (user == null || emailAuth == null) {
            System.out.println("#### There's no emailAuth matches with request data ####");
            return;
        }

        // 인증 토큰 검사 & 사용자 정보와 비교 후 토큰 만료 및 이메일 인증 완료
        if(!emailAuth.isExpired()) {
            user.setEmailVerify('Y');
            emailAuth.expired();
            emailAuthRepository.save(emailAuth);
            usersRepository.save(user);
            System.out.println("#### Email has verified ####");
        } else {
            emailAuth.expired();
            emailAuthRepository.save(emailAuth);
            System.out.println("#### The Token is OutDated ####");
        }
    }

    @Async
    public void sendVerificationMail(String email) throws MessagingException {

        // 사용자 이메일 확인
        if(!usersRepository.existsByEmail(email)) {
            System.out.println("#### There's no user matches with request data ####");
            return;
        }

        // 이메일 인증용 토큰 발급
        EmailAuth emailAuth = EmailAuth.builder()
                .email(email)
                .authToken(codeBuilder())
                .useToken(false)
                .build();

        emailAuthRepository.save(emailAuth);

        // 이메일 인증용 링크 구성
        String authUrl = "http://localhost:9090/api/confirm/email/" + email + "/token/" + emailAuth.getAuthToken();

        // 이메일 인증용 토큰 링크 이메일 발송
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(email);
        helper.setSubject("[나눔] 이메일 인증 메일입니다.");
        helper.setText(setContext(email, authUrl, "Verifymail"), true);

        javaMailSender.send(message);
        System.out.println("#### The Verification Mail has been sent ####");
    }

    @Async
    public void sendTemporalPasswordMail(EmailPostDto dto) throws MessagingException {
        // 사용자 임시 비밀번호 적용
        Users user = usersRepository.findByNameAndPhoneAndEmail(dto.getName(), dto.getPhone(), dto.getEmail());
        String code = codeBuilder();
        user.setPassword(passwordEncoder.encode(code));
        usersRepository.save(user);

        // 임시 비밀번호 이메일 발송
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(dto.getEmail());
        helper.setSubject("[나눔] 비밀번호 재설정 메일입니다.");
        helper.setText(setContext(dto.getEmail(), code, "TemporalPasswordMail"), true);

        javaMailSender.send(message);
        System.out.println("#### The Temporal Password Mail has been sent ####");
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
