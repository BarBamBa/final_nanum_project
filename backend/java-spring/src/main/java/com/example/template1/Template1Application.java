package com.example.template1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Template1Application {

    public static void main(String[] args) {
        SpringApplication.run(Template1Application.class, args);
    }

}
