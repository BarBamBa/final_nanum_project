package com.example.template1.service;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    private final UserService userService;

    public String sendMail() {
        return null;
    }

    private String authCodeBuilder() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < 16; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0 -> code.append((char) ((int) random.nextInt(26) + 97));
                case 1 -> code.append((char) ((int) random.nextInt(26) + 65));
                default -> code.append(random.nextInt(9));
            }
        }
        return code.toString();
    }
}
